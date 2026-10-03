/**
 * Client tối giản cho API tương thích OpenAI (Chat Completions), gọi bằng fetch, không cần SDK.
 * Dùng cùng cấu hình với minder-internal-operation (proxy LiteLLM):
 *   OPENAI_API_KEY   bắt buộc, chỉ ở server
 *   OPENAI_BASE_URL  mặc định https://api.openai.com/v1
 *   CHAT_MODEL       mặc định gpt-5-mini (dự phòng: OPENAI_MODEL)
 */

export type OaiToolCall = { id: string; name: string; arguments: string };

export type OaiMessage =
  | { role: "system"; content: string }
  | { role: "user"; content: string }
  | {
      role: "assistant";
      content: string | null;
      tool_calls?: { id: string; type: "function"; function: { name: string; arguments: string } }[];
    }
  | { role: "tool"; tool_call_id: string; content: string };

export type OaiTool = {
  type: "function";
  function: { name: string; description: string; strict?: boolean; parameters: Record<string, unknown> };
};

export type OaiUsage = {
  prompt_tokens?: number;
  completion_tokens?: number;
  prompt_tokens_details?: { cached_tokens?: number } | null;
};

export class OaiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function hasApiKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function chatModel(): string {
  return process.env.CHAT_MODEL || process.env.OPENAI_MODEL || "gpt-5-mini";
}

function baseUrl(): string {
  return (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
}

/** Mô hình suy luận (gpt-5*, o-series) nhận reasoning_effort và không nhận temperature tùy chỉnh */
function isReasoningModel(model: string): boolean {
  return /^(gpt-5|o\d)(?:[.-]|$)/i.test(model);
}

/** Mô hình suy luận tiêu token suy luận ẩn từ cùng ngân sách đầu ra, nên chừa thêm khoảng trống */
const REASONING_HEADROOM = 3000;

async function post(body: Record<string, unknown>, signal?: AbortSignal): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new OaiError(0, "OPENAI_API_KEY chưa được cấu hình");
  const res = await fetch(`${baseUrl()}/chat/completions`, {
    method: "POST",
    signal,
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new OaiError(res.status, `OpenAI ${res.status}: ${text.slice(0, 300)}`);
  }
  return res;
}

function commonParams(maxTokens: number, effort: "minimal" | "low" | "medium" | "high") {
  const model = chatModel();
  return {
    model,
    max_completion_tokens: maxTokens + (isReasoningModel(model) ? REASONING_HEADROOM : 0),
    ...(isReasoningModel(model) ? { reasoning_effort: effort } : {}),
  };
}

/**
 * Gọi có streaming. `onText` nhận từng đoạn chữ. Trả về các tool call đã ghép xong, lý do kết thúc và usage.
 */
export async function streamChat(opts: {
  messages: OaiMessage[];
  tools?: OaiTool[];
  maxTokens?: number;
  effort?: "minimal" | "low" | "medium" | "high";
  signal?: AbortSignal;
  onText: (d: string) => void;
}): Promise<{ toolCalls: OaiToolCall[]; finishReason: string | null; usage: OaiUsage | null }> {
  const res = await post(
    {
      ...commonParams(opts.maxTokens ?? 1200, opts.effort ?? "low"),
      messages: opts.messages,
      ...(opts.tools?.length ? { tools: opts.tools, tool_choice: "auto", parallel_tool_calls: true } : {}),
      stream: true,
      stream_options: { include_usage: true },
    },
    opts.signal,
  );
  if (!res.body) throw new OaiError(0, "Phản hồi không có body");

  const calls: { id: string; name: string; arguments: string }[] = [];
  let finishReason: string | null = null;
  let usage: OaiUsage | null = null;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  const handle = (data: string) => {
    if (data === "[DONE]") return;
    let chunk: {
      choices?: {
        delta?: { content?: string | null; tool_calls?: { index: number; id?: string; function?: { name?: string; arguments?: string } }[] };
        finish_reason?: string | null;
      }[];
      usage?: OaiUsage | null;
    };
    try {
      chunk = JSON.parse(data);
    } catch {
      return;
    }
    if (chunk.usage) usage = chunk.usage;
    const choice = chunk.choices?.[0];
    if (!choice) return;
    const delta = choice.delta;
    if (delta?.content) opts.onText(delta.content);
    for (const tc of delta?.tool_calls ?? []) {
      const slot = (calls[tc.index] ??= { id: "", name: "", arguments: "" });
      if (tc.id) slot.id = tc.id;
      if (tc.function?.name) slot.name += tc.function.name;
      if (tc.function?.arguments) slot.arguments += tc.function.arguments;
    }
    if (choice.finish_reason) finishReason = choice.finish_reason;
  };

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (line.startsWith("data:")) handle(line.slice(5).trim());
    }
  }
  if (buf.trim().startsWith("data:")) handle(buf.trim().slice(5).trim());

  return { toolCalls: calls.filter((c) => c && c.name), finishReason, usage };
}

/** Gọi một lần, ép đầu ra theo JSON Schema (structured outputs). Trả về object đã parse và usage. */
export async function completeJson<T>(opts: {
  system: string;
  user: string;
  schemaName: string;
  schema: Record<string, unknown>;
  maxTokens?: number;
  signal?: AbortSignal;
}): Promise<{ data: T | null; usage: OaiUsage | null }> {
  const res = await post(
    {
      ...commonParams(opts.maxTokens ?? 600, "low"),
      messages: [
        { role: "system", content: opts.system },
        { role: "user", content: opts.user },
      ],
      response_format: { type: "json_schema", json_schema: { name: opts.schemaName, strict: true, schema: opts.schema } },
    },
    opts.signal,
  );
  const json = (await res.json()) as { choices?: { message?: { content?: string | null } }[]; usage?: OaiUsage };
  const text = json.choices?.[0]?.message?.content;
  if (!text) return { data: null, usage: json.usage ?? null };
  try {
    return { data: JSON.parse(text) as T, usage: json.usage ?? null };
  } catch {
    return { data: null, usage: json.usage ?? null };
  }
}
