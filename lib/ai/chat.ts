/**
 * Logic trợ lý "Hỏi về đề xuất" (dùng chung cho route /api/chat và evals/run.ts).
 * Vòng lặp thủ công có streaming qua API tương thích OpenAI (proxy LiteLLM), tối đa 3 lượt gọi mô hình;
 * tool chỉ phát sự kiện hành động xuống trình duyệt.
 */
import { actionSchemas, type ActionName } from "@/lib/actionSchemas";
import { budgetAvailable, recordUsage } from "./budget";
import { fallbackAnswer } from "./faqMatch";
import { logQuestion } from "./log";
import { hasApiKey, OaiError, streamChat, type OaiMessage } from "./openai";
import { followupPool, systemPrompt, tools } from "./prompt";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatEvent =
  | { t: "text"; d: string }
  | { t: "action"; name: ActionName; input: unknown }
  | { t: "fallback"; answer: string; section: string | null; reason: FallbackReason }
  | { t: "followups"; items: string[] }
  | { t: "error"; message: string }
  | { t: "done" };

export type FallbackReason = "no-key" | "budget" | "api-error" | "refusal" | "empty";

export const MAX_TURNS = 3;

const FOLLOWUP_MARKER = "###GOI_Y###";

/**
 * Lọc chữ trước khi gửi xuống trình duyệt:
 * - dòng bắt đầu bằng "{", "`" hoặc "#" được giữ tới hết dòng; JSON / rào code bị bỏ;
 * - gặp dòng ###GOI_Y### thì phần sau đó là câu hỏi gợi ý: không hiện, gom lại trả về ở end().
 */
function makeTextFilter(out: (d: string) => void) {
  let line = "";
  let holding = false;
  let capturing = false;
  const captured: string[] = [];
  const completeLine = (raw: string) => {
    const s = raw.trim();
    if (capturing) {
      if (s) captured.push(s);
      return;
    }
    if (s.includes(FOLLOWUP_MARKER)) {
      capturing = true;
      const rest = s.slice(s.indexOf(FOLLOWUP_MARKER) + FOLLOWUP_MARKER.length).trim();
      if (rest) captured.push(rest);
      return;
    }
    if (holding && (/^\{[\s\S]*\}$/.test(s) || /^`{3}/.test(s))) return;
    if (holding) out(raw);
  };
  return {
    push(d: string) {
      for (const ch of d) {
        if (!capturing && !holding && line.trim() === "" && (ch === "{" || ch === "`" || ch === "#")) holding = true;
        line += ch;
        if (ch === "\n") {
          if (capturing || holding) {
            completeLine(line.replace(/\n$/, ""));
            if (!capturing && holding) out("\n");
          } else {
            out(line);
          }
          line = "";
          holding = false;
        }
      }
      if (!capturing && !holding && line) {
        out(line);
        line = "";
      }
    },
    /** Kết thúc lượt: xả dòng đang giữ, trả về câu hỏi gợi ý đã gom */
    end(): string[] {
      if (line) completeLine(line);
      line = "";
      holding = false;
      return captured;
    },
  };
}

/** Đổi các số thứ tự (sau ###GOI_Y###) thành câu hỏi trong danh sách được phép; bỏ câu vừa hỏi và câu trùng */
function pickFollowups(captured: string[], asked: string[]): string[] {
  const nums = (captured.join(" ").match(/\d+/g) ?? []).map(Number);
  const askedSet = new Set(asked.map((a) => a.trim().toLowerCase()));
  const out: string[] = [];
  for (const n of nums) {
    const q = followupPool[n - 1];
    if (q && !out.includes(q) && !askedSet.has(q.toLowerCase())) out.push(q);
    if (out.length === 3) break;
  }
  return out;
}
const MAX_TOKENS = 1600;

export const chatErrors = {
  generic: "Trợ lý đang gặp sự cố. Quý vị vui lòng thử lại sau ít phút.",
  rateLimit: "Quý vị đã gửi nhiều câu hỏi trong một giờ. Vui lòng thử lại sau.",
  badRequest: "Câu hỏi chưa hợp lệ. Quý vị vui lòng nhập câu hỏi ngắn hơn 1.000 ký tự.",
};

const VI_CHARS = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
/** Từ tiếng Anh thông dụng: câu hỏi có ít nhất 2 từ này và ít từ có dấu tiếng Việt → coi là tiếng Anh */
const EN_WORDS = /^(the|a|an|is|are|does|do|did|what|how|who|when|where|why|which|if|will|can|should|of|to|in|for|with|data|need|happen|happens|leave|ever|many|much|and|or|it|this|that|be|trial|model)$/i;
function isLikelyEnglish(q: string): boolean {
  const words = q.split(/[^\p{L}']+/u).filter(Boolean);
  if (words.length < 3) return false;
  const vi = words.filter((w) => VI_CHARS.test(w)).length;
  const en = words.filter((w) => EN_WORDS.test(w)).length;
  return en >= 2 && vi / words.length < 0.3;
}

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

  if (!hasApiKey()) {
    emitFallback(emit, q, "no-key");
    emit({ t: "done" });
    return;
  }
  if (!budgetAvailable()) {
    emitFallback(emit, q, "budget");
    emit({ t: "done" });
    return;
  }

  const convo: OaiMessage[] = [
    { role: "system", content: systemPrompt },
    ...messages.map((m): OaiMessage => ({ role: m.role, content: m.content })),
  ];
  // Câu hỏi không có chữ tiếng Việt (có dấu) → nhắc trả lời bằng tiếng Anh. Đặt sau lịch sử để không phá cache tiền tố.
  convo.push({
    role: "system",
    content: isLikelyEnglish(q)
      ? "LANGUAGE: English. Write the whole answer in English. Topic: only the Nhà máy siêu thông minh proposal to Hòa Phát. The ###GOI_Y### line lists numbers only."
      : "LANGUAGE: Tiếng Việt. Chỉ nói về đề xuất Nhà máy siêu thông minh gửi Hòa Phát.",
  });  let textEmitted = false;

  try {
    for (let turn = 0; turn < MAX_TURNS; turn++) {
      let turnText = "";
      const filter = makeTextFilter((d) => {
        if (!d) return;
        turnText += d;
        if (d.trim()) textEmitted = true;
        emit({ t: "text", d });
      });
      // Lượt cuối không đưa tool để mô hình buộc phải trả lời bằng chữ
      const lastTurn = turn === MAX_TURNS - 1;
      const res = await streamChat({
        messages: convo,
        tools: lastTurn ? undefined : tools,
        maxTokens: MAX_TOKENS,
        effort: "low",
        signal: opts.signal,
        onText: (d) => filter.push(d),
      });
      const followups = pickFollowups(
        filter.end(),
        messages.filter((m) => m.role === "user").map((m) => m.content),
      );
      if (followups.length) emit({ t: "followups", items: followups });
      recordUsage(res.usage);

      if (res.finishReason === "content_filter") {
        if (!textEmitted) emitFallback(emit, q, "refusal");
        break;
      }
      if (!res.toolCalls.length) break;

      convo.push({
        role: "assistant",
        content: turnText || null,
        tool_calls: res.toolCalls.map((c) => ({ id: c.id, type: "function", function: { name: c.name, arguments: c.arguments } })),
      });
      for (const tc of res.toolCalls) {
        const schema = (actionSchemas as Record<string, (typeof actionSchemas)[ActionName]>)[tc.name];
        let input: unknown = null;
        try {
          input = JSON.parse(tc.arguments || "{}");
        } catch {
          input = null;
        }
        const parsed = schema?.safeParse(input);
        if (!schema || !parsed?.success) {
          convo.push({ role: "tool", tool_call_id: tc.id, content: `Đầu vào không hợp lệ cho ${tc.name}.` });
          continue;
        }
        emit({ t: "action", name: tc.name as ActionName, input: parsed.data });
        convo.push({ role: "tool", tool_call_id: tc.id, content: "Đã thực hiện trên trang" });
      }
      // Tool chỉ tác động lên trang, kết quả luôn "đã thực hiện": nếu lượt này đã có câu trả lời thì dừng,
      // chỉ gọi thêm lượt khi mô hình gọi tool mà chưa viết chữ.
      if (turnText.trim()) break;
      // Ngắt đoạn giữa hai lượt để chữ không dính nhau
      if (turnText) emit({ t: "text", d: "\n\n" });
    }

    if (!textEmitted) emitFallback(emit, q, "empty");
  } catch (err) {
    if (opts.signal?.aborted) {
      emit({ t: "done" });
      return;
    }
    if (err instanceof OaiError) {
      if (err.status === 429) console.warn("[chat] rate limited by API");
      else if (err.status === 401 || err.status === 403) console.error("[chat] invalid API key");
      else console.error(`[chat] API error ${err.status}: ${err.message}`);
    } else {
      console.error("[chat] unexpected error", err);
    }
    if (!textEmitted) emitFallback(emit, q, "api-error");
    else emit({ t: "error", message: chatErrors.generic });
  }
  emit({ t: "done" });
}
