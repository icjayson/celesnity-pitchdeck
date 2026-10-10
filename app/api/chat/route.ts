/**
 * POST /api/chat {deck, messages} — trợ lý "Hỏi về đề xuất" của đúng một deck. Trả stream NDJSON:
 * {"t":"text","d"} · {"t":"action","name","input"} · {"t":"fallback","answer","section"} · {"t":"error","message"} · {"t":"done"}
 */
import { z } from "zod";
import { chatErrors, runChat, type ChatEvent, type ChatTurn } from "@/lib/ai/chat";
import { assistantContextFor } from "@/lib/ai/prompt";
import { getAssistant, getDeck } from "@/decks/registry";
import { sessionCookieHeader, sessionFromRequest, takeToken } from "@/lib/ai/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Vercel: cho phép stream đủ lâu (mô hình suy luận + tool có thể mất 10–30 giây) */
export const maxDuration = 60;

const MAX_TURNS_IN = 12;
const MAX_CHARS = 1000;

const Body = z.object({
  /** Slug deck: bắt buộc, không có deck mặc định */
  deck: z.string().min(1).max(64),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(MAX_CHARS),
      }),
    )
    .min(1)
    .max(40),
});

const NDJSON_HEADERS = {
  "content-type": "application/x-ndjson; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
};

function line(e: ChatEvent): string {
  return JSON.stringify(e) + "\n";
}

/** Chuẩn hóa lịch sử: tối đa 12 lượt cuối, bắt đầu bằng user, kết thúc bằng user, bỏ tin rỗng. */
function normalize(messages: ChatTurn[]): ChatTurn[] | null {
  let m = messages.map((x) => ({ role: x.role, content: x.content.trim() })).filter((x) => x.content.length > 0);
  m = m.slice(-MAX_TURNS_IN);
  while (m.length && m[0].role !== "user") m.shift();
  if (!m.length || m[m.length - 1].role !== "user") return null;
  return m;
}

function oneShot(events: ChatEvent[], status: number, headers: Record<string, string> = {}) {
  return new Response(events.map(line).join(""), { status, headers: { ...NDJSON_HEADERS, ...headers } });
}

export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  const cookieHeaders: Record<string, string> = session.isNew ? { "set-cookie": sessionCookieHeader(session.id) } : {};

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return oneShot([{ t: "error", message: chatErrors.badRequest }, { t: "done" }], 400, cookieHeaders);
  }
  const parsed = Body.safeParse(json);
  const messages = parsed.success ? normalize(parsed.data.messages) : null;
  if (!parsed.success || !messages) {
    return oneShot([{ t: "error", message: chatErrors.badRequest }, { t: "done" }], 400, cookieHeaders);
  }

  // Ngữ cảnh riêng của deck: chỉ deck có trong registry
  const slug = parsed.data.deck;
  const deck = getDeck(slug);
  const assistant = getAssistant(slug);
  if (!deck || !assistant) {
    return oneShot([{ t: "error", message: chatErrors.badRequest }, { t: "done" }], 400, cookieHeaders);
  }
  const ctx = assistantContextFor(deck, assistant);

  if (!takeToken(`${slug}:${session.id}`)) {
    return oneShot([{ t: "error", message: chatErrors.rateLimit }, { t: "done" }], 429, cookieHeaders);
  }

  const encoder = new TextEncoder();
  const abort = new AbortController();
  request.signal.addEventListener("abort", () => abort.abort());

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const emit = (e: ChatEvent) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(line(e)));
        } catch {
          closed = true;
        }
      };
      try {
        await runChat(ctx, messages, emit, { signal: abort.signal });
      } finally {
        closed = true;
        try {
          controller.close();
        } catch {
          // đã đóng
        }
      }
    },
    cancel() {
      abort.abort();
    },
  });

  return new Response(stream, { status: 200, headers: { ...NDJSON_HEADERS, ...cookieHeaders } });
}
