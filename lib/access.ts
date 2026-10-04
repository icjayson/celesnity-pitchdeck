/**
 * Mã truy cập theo từng deck (dùng ở proxy.ts và các route API).
 * ACCESS_CODE_<SLUG> (slug viết hoa, "-" thành "_") khóa riêng /<slug>; cookie riêng `ld_access_<slug>`.
 * Deck hoa-phat dùng ACCESS_CODE cũ khi chưa đặt ACCESS_CODE_HOA_PHAT. Không đặt mã → deck mở.
 */
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;

export function accessEnvName(slug: string): string {
  return `ACCESS_CODE_${slug.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
}

export function accessCodeFor(slug: string): string | null {
  const own = process.env[accessEnvName(slug)]?.trim();
  if (own) return own;
  if (slug === "hoa-phat") return process.env.ACCESS_CODE?.trim() || null;
  return null;
}

export function accessCookieName(slug: string): string {
  return `ld_access_${slug.replace(/[^a-z0-9-]/g, "")}`;
}

export async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`ld-access:${text}`));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** So sánh không phụ thuộc thời gian trên hai chuỗi hex cùng độ dài */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Đọc giá trị một cookie từ header Cookie */
export function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    if (part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

/** Người gửi có quyền vào deck này không (deck không đặt mã → luôn có) */
export async function hasDeckAccess(slug: string, cookieHeader: string | null): Promise<boolean> {
  const code = accessCodeFor(slug);
  if (!code) return true;
  const v = readCookie(cookieHeader, accessCookieName(slug));
  return !!v && safeEqual(v, await sha256Hex(code));
}
