import { NextResponse, type NextRequest } from "next/server";

/**
 * Mã truy cập tùy chọn (docs/implementation-plan.md, mục 6.1).
 * ACCESS_CODE rỗng → không khóa. Có mã → mọi trang cần cookie `ld_access` = SHA-256 của mã,
 * thiếu thì chuyển về /truy-cap (API trả 401).
 */
const ACCESS_COOKIE = "ld_access";

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`ld-access:${text}`));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function proxy(request: NextRequest) {
  const code = process.env.ACCESS_CODE?.trim();
  if (!code) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  if (
    pathname === "/truy-cap" ||
    pathname.startsWith("/api/access") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ACCESS_COOKIE)?.value;
  if (cookie && cookie === (await sha256Hex(code))) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "access_required" }, { status: 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = "/truy-cap";
  url.search = "";
  const next = pathname + search;
  if (next !== "/") url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|txt|xml|webmanifest)$).*)",
  ],
};
