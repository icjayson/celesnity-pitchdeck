/**
 * POST /api/extract — {text ≤ 300 ký tự} → {card: CaseCard, mode: "ai" | "rules" | "sample"}.
 * mode cho UI ghi nhãn trung thực: chỉ "ai" mới được ghi "AI thật".
 */
import { z } from "zod";
import { extractCase, EXTRACT_MAX_CHARS } from "@/lib/ai/extract";
import { sessionCookieHeader, sessionFromRequest, takeToken } from "@/lib/ai/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({ text: z.string().trim().min(1).max(EXTRACT_MAX_CHARS) });

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
  if (!takeToken(`x:${session.id}`)) {
    return Response.json({ error: "Quý vị đã thử nhiều lần trong một giờ. Vui lòng thử lại sau." }, { status: 429, headers });
  }

  const result = await extractCase(parsed.data.text);
  return Response.json(result, { headers });
}
