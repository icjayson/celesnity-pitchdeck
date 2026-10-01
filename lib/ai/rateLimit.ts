/** Giới hạn tần suất trong bộ nhớ theo cookie phiên (cửa sổ trượt 1 giờ). */
const WINDOW_MS = 3600_000;
const store = new Map<string, number[]>();

export const SESSION_COOKIE = "landing_sid";

export function rateLimitMax(): number {
  const v = Number(process.env.CHAT_RATE_PER_HOUR);
  return Number.isFinite(v) && v > 0 ? v : 30;
}

/** Ghi một lượt và trả về true nếu còn trong giới hạn. */
export function takeToken(key: string, max = rateLimitMax()): boolean {
  const now = Date.now();
  const hits = (store.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= max) {
    store.set(key, hits);
    return false;
  }
  hits.push(now);
  store.set(key, hits);
  // Dọn bộ nhớ thỉnh thoảng
  if (store.size > 5000) {
    for (const [k, v] of store) if (!v.some((t) => now - t < WINDOW_MS)) store.delete(k);
  }
  return true;
}

/** Đọc id phiên từ header Cookie; tạo mới nếu chưa có. */
export function sessionFromRequest(req: Request): { id: string; isNew: boolean } {
  const raw = req.headers.get("cookie") ?? "";
  const m = raw.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([A-Za-z0-9-]{8,64})`));
  if (m) return { id: m[1], isNew: false };
  return { id: crypto.randomUUID(), isNew: true };
}

export function sessionCookieHeader(id: string): string {
  return `${SESSION_COOKIE}=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}
