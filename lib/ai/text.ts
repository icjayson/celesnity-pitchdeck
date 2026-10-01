/**
 * Xử lý chữ tiếng Việt dùng chung (server và trình duyệt, không phụ thuộc Node).
 */

/** Bỏ dấu một ký tự, giữ nguyên độ dài chuỗi (mỗi ký tự → đúng một ký tự). */
function foldChar(c: string): string {
  if (c === "đ") return "d";
  if (c === "Đ") return "D";
  const base = c.normalize("NFD").replace(/[̀-ͯ]/g, "");
  return base.length === 1 ? base : c;
}

/** Chữ thường, bỏ dấu, độ dài bằng chuỗi gốc (dùng để tìm vị trí rồi cắt trên chuỗi gốc). */
export function foldKeepLength(s: string): string {
  let out = "";
  for (const c of s.normalize("NFC")) out += foldChar(c).toLowerCase();
  return out;
}

/** Chữ thường, bỏ dấu, gom khoảng trắng. */
export function fold(s: string): string {
  return foldKeepLength(s)
    .replace(/[^a-z0-9%]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP = new Set(
  "la co khong the nao gi va toi ban oi nhe di cua cho voi thi nhu se da dang duoc bi mot cac nhung nay do ay o tai ve tu den neu khi ma con hay hoac rang thuc su qua rat lam".split(
    " ",
  ),
);

/** Tách từ khóa (đã bỏ dấu, bỏ từ dừng). */
export function tokens(s: string): string[] {
  return fold(s)
    .split(" ")
    .filter((w) => w.length > 1 && !STOP.has(w));
}
