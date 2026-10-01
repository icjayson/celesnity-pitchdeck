/**
 * Logic trợ lý "Hỏi về đề xuất" (dùng chung cho route /api/chat và evals/run.ts).
 * Vòng lặp thủ công có streaming, tối đa 3 lượt gọi mô hình; tool chỉ phát sự kiện hành động xuống trình duyệt.
 */
import Anthropic from "@anthropic-ai/sdk";
import { actionSchemas, type ActionName } from "@/lib/actionSchemas";
import { budgetAvailable, recordUsage } from "./budget";
import { getClient } from "./client";
import { fallbackAnswer } from "./faqMatch";
import { logQuestion } from "./log";
import { MODEL, systemBlocks, tools } from "./prompt";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatEvent =
  | { t: "text"; d: string }
  | { t: "action"; name: ActionName; input: unknown }
  | { t: "fallback"; answer: string; section: string | null; reason: FallbackReason }
  | { t: "error"; message: string }
  | { t: "done" };

export type FallbackReason = "no-key" | "budget" | "api-error" | "refusal" | "empty";

export const MAX_TURNS = 3;
const MAX_TOKENS = 2048;
const FALLBACK_BETA = "server-side-fallback-2026-07-01";

export const chatErrors = {
  generic: "Trợ lý đang gặp sự cố. Quý vị vui lòng thử lại sau ít phút.",
  rateLimit: "Quý vị đã gửi nhiều câu hỏi trong một giờ. Vui lòng thử lại sau.",
  badRequest: "Câu hỏi chưa hợp lệ. Quý vị vui lòng nhập câu hỏi ngắn hơn 1.000 ký tự.",
};

function lastUserText(messages: ChatTurn[]): string {
  for (let i = messages.length - 1; i >= 0; i--) if (messages[i].role === "user") return messages[i].content;
  return "";
}

function emitFallback(emit: (e: ChatEvent) => void, q: string, reason: FallbackReason) {
  const f = fallbackAnswer(q);
  emit({ t: "fallback", answer: f.answer, section: f.section, reason });
}

/**
 * Chạy một lượt hội thoại. `emit` nhận từng sự kiện theo thứ tự; luôn kết thúc bằng {t:"done"}.
 */
export async function runChat(
  messages: ChatTurn[],
  emit: (e: ChatEvent) => void,
  opts: { signal?: AbortSignal } = {},
): Promise<void> {
  const q = lastUserText(messages);
  void logQuestion(q);

  const client = getClient();
  if (!client) {
    emitFallback(emit, q, "no-key");
    emit({ t: "done" });
    return;
  }
  if (!budgetAvailable()) {
    emitFallback(emit, q, "budget");
    emit({ t: "done" });
    return;
  }

  const convo: Anthropic.Beta.BetaMessageParam[] = messages.map((m) => ({ role: m.role, content: m.content }));
  let textEmitted = false;
  let finished = false;

  try {
    for (let turn = 0; turn < MAX_TURNS && !finished; turn++) {
      const stream = client.beta.messages.stream(
        {
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: systemBlocks,
          tools,
          tool_choice: { type: "auto" },
          messages: convo,
          output_config: { effort: "low" },
          betas: [FALLBACK_BETA],
          fallbacks: "default",
        },
        { signal: opts.signal },
      );

      for await (const ev of stream) {
        if (ev.type === "content_block_delta" && ev.delta.type === "text_delta" && ev.delta.text) {
          emit({ t: "text", d: ev.delta.text });
          textEmitted = true;
        }
      }
      const message = await stream.finalMessage();
      recordUsage(message.usage);

      switch (message.stop_reason) {
        case "refusal":
          // Cả chuỗi fallback đều từ chối: không chạy tool của lượt này, dùng câu trả lời soạn sẵn
          emitFallback(emit, q, "refusal");
          finished = true;
          continue;
        case "tool_use":
          break;
        default:
          // end_turn, max_tokens, stop_sequence, pause_turn, ...: kết thúc
          finished = true;
          continue;
      }

      const toolUses = message.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
      if (toolUses.length === 0) {
        finished = true;
        continue;
      }

      const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
      for (const tu of toolUses) {
        const schema = (actionSchemas as Record<string, (typeof actionSchemas)[ActionName]>)[tu.name];
        const parsed = schema?.safeParse(tu.input);
        if (!schema || !parsed?.success) {
          results.push({
            type: "tool_result",
            tool_use_id: tu.id,
            is_error: true,
            content: `Đầu vào không hợp lệ cho ${tu.name}.`,
          });
          continue;
        }
        emit({ t: "action", name: tu.name as ActionName, input: parsed.data });
        results.push({ type: "tool_result", tool_use_id: tu.id, content: "Đã thực hiện trên trang" });
      }

      convo.push({ role: "assistant", content: message.content });
      convo.push({ role: "user", content: results });
      // Ngắt đoạn giữa hai lượt để chữ không dính nhau
      if (textEmitted) emit({ t: "text", d: "\n\n" });
    }

    if (!textEmitted) emitFallback(emit, q, "empty");
  } catch (err) {
    if (opts.signal?.aborted) {
      emit({ t: "done" });
      return;
    }
    if (err instanceof Anthropic.RateLimitError) {
      console.warn("[chat] rate limited by API");
    } else if (err instanceof Anthropic.AuthenticationError) {
      console.error("[chat] invalid API key");
    } else if (err instanceof Anthropic.APIError) {
      console.error(`[chat] API error ${err.status}: ${err.message}`);
    } else {
      console.error("[chat] unexpected error", err);
    }
    if (!textEmitted) emitFallback(emit, q, "api-error");
    else emit({ t: "error", message: chatErrors.generic });
  }
  emit({ t: "done" });
}
