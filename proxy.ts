import { NextResponse, type NextRequest } from "next/server";
import { accessCodeFor, accessCookieName, safeEqual, sha256Hex } from "@/lib/access";

/**
 * Mã truy cập theo từng deck: /<slug>/... cần cookie `ld_access_<slug>` khớp ACCESS_CODE_<SLUG>.
 * Mã của khách hàng này không mở được deck của khách hàng khác. Deck không đặt mã → mở.
 * Tệp trong public/decks/<slug>/ (trừ ảnh) cũng cần mã của deck đó. Route API tự kiểm tra quyền theo deck trong nội dung yêu cầu.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (
    pathname === "/" ||
    pathname === "/truy-cap" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Tệp riêng của deck trong public/decks/<slug>/ (ví dụ bản PDF) dùng mã của deck đó.
  // Ảnh và logo được matcher bỏ qua (tĩnh, công khai); PDF và tệp khác đi qua đây.
  const parts = pathname.split("/");
  const slug = (parts[1] === "decks" ? parts[2] : parts[1]) ?? "";
  const code = accessCodeFor(slug);
  if (!code) return NextResponse.next();

  const cookie = request.cookies.get(accessCookieName(slug))?.value;
  if (cookie && safeEqual(cookie, await sha256Hex(code))) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/truy-cap";
  url.search = "";
  url.searchParams.set("next", parts[1] === "decks" ? `/${slug}` : pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|txt|xml|webmanifest)$).*)",
  ],
};
