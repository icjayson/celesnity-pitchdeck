import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_MAX_AGE, accessCodeFor, accessCookieName, safeEqual, sha256Hex } from "@/lib/access";

/**
 * POST mã truy cập (form hoặc JSON). Deck lấy từ đường dẫn `next` (/<slug>/...).
 * Đúng mã của deck đó → đặt cookie httpOnly `ld_access_<slug>` 30 ngày (chỉ mở deck đó).
 */

function safeNext(v: unknown): string {
  return typeof v === "string" && v.startsWith("/") && !v.startsWith("//") && !v.startsWith("/\\") ? v : "/";
}

export async function POST(request: NextRequest) {
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
  const slug = next.split("/")[1] ?? "";
  const expected = accessCodeFor(slug);

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
  res.cookies.set(accessCookieName(slug), await sha256Hex(expected), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  return res;
}
