/**
 * POST /api/extract — {deck, text ≤ 300 ký tự} → {card, mode: "ai" | "rules" | "sample"}, theo cấu hình trích xuất của deck.
 * mode cho UI ghi nhãn trung thực: chỉ "ai" mới được ghi "AI thật".
 */
import { z } from "zod";
import { extractCard, EXTRACT_MAX_CHARS } from "@/lib/ai/extract";
import { assistantContextFor } from "@/lib/ai/prompt";
import { hasDeckAccess } from "@/lib/access";
import { getAssistant, getDeck } from "@/decks/registry";
import { sessionCookieHeader, sessionFromRequest, takeToken } from "@/lib/ai/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Vercel: cho phép stream đủ lâu (mô hình suy luận + tool có thể mất 10–30 giây) */
export const maxDuration = 60;

const Body = z.object({ deck: z.string().min(1).max(64), text: z.string().trim().min(1).max(EXTRACT_MAX_CHARS) });

export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  const headers: Record<string, string> = { "cache-control": "no-store" };
  if (session.isNew) headers["set-cookie"] = sessionCookieHeader(session.id);

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Nội dung không hợp lệ." }, { status: 400, headers });
  }
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: `Quý vị vui lòng nhập từ 1 đến ${EXTRACT_MAX_CHARS} ký tự.` }, { status: 400, headers });
  }
  const slug = parsed.data.deck;
  const deck = getDeck(slug);
  const assistant = getAssistant(slug);
  if (!deck || !assistant) return Response.json({ error: "Nội dung không hợp lệ." }, { status: 400, headers });
  if (!(await hasDeckAccess(slug, request.headers.get("cookie")))) {
    return Response.json({ error: "Cần mã truy cập." }, { status: 401, headers });
  }

  if (!takeToken(`x:${slug}:${session.id}`)) {
    return Response.json({ error: "Quý vị đã thử nhiều lần trong một giờ. Vui lòng thử lại sau." }, { status: 429, headers });
  }

  const result = await extractCard(assistantContextFor(deck, assistant), parsed.data.text);
  return Response.json(result, { headers });
}
