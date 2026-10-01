import { NextResponse, type NextRequest } from "next/server";

/** POST mã truy cập (form hoặc JSON). Đúng → đặt cookie httpOnly 30 ngày. */
const COOKIE = "ld_access";
const MAX_AGE = 60 * 60 * 24 * 30;

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`ld-access:${text}`));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** So sánh không phụ thuộc thời gian trên hai chuỗi hex cùng độ dài */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function safeNext(v: unknown): string {
  return typeof v === "string" && v.startsWith("/") && !v.startsWith("//") && !v.startsWith("/\\") ? v : "/";
}

export async function POST(request: NextRequest) {
  const expected = process.env.ACCESS_CODE?.trim();
  const isJson = request.headers.get("content-type")?.includes("application/json") ?? false;

  let input = "";
  let next = "/";
  try {
    if (isJson) {
      const body = (await request.json()) as { code?: unknown; next?: unknown };
      input = typeof body.code === "string" ? body.code : "";
      next = safeNext(body.next);
    } else {
      const form = await request.formData();
      input = String(form.get("code") ?? "");
      next = safeNext(form.get("next"));
    }
  } catch {
    input = "";
  }
  input = input.trim().slice(0, 200);

  if (!expected) {
    return isJson ? NextResponse.json({ ok: true, next }) : NextResponse.redirect(new URL(next, request.url), 303);
  }

  const ok = input.length > 0 && safeEqual(await sha256Hex(input), await sha256Hex(expected));
  if (!ok) {
    if (isJson) return NextResponse.json({ ok: false }, { status: 401 });
    const back = new URL("/truy-cap", request.url);
    back.searchParams.set("error", "1");
    if (next !== "/") back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  const res = isJson ? NextResponse.json({ ok: true, next }) : NextResponse.redirect(new URL(next, request.url), 303);
  res.cookies.set(COOKIE, await sha256Hex(expected), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
