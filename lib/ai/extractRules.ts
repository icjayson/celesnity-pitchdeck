/**
 * Trích xuất thẻ hồ sơ theo quy tắc (chế độ offline của M6). Thuần TypeScript, chạy được ở server và trình duyệt.
 * Đây KHÔNG phải AI: UI phải ghi nhãn "Chế độ offline: trích xuất theo quy tắc".
 */
import type { CaseCard } from "@/decks/types";
import { foldKeepLength } from "./text";

export type ExtractMode = "ai" | "rules" | "sample";
export type ExtractResult = { card: CaseCard; mode: ExtractMode };

const SYMPTOMS: { re: RegExp; label: string; missing?: string }[] = [
  { re: /bao ve nhiet|qua nhiet|nong qua muc/, label: "Bảo vệ nhiệt kích hoạt", missing: "Phiên bản firmware" },
  { re: /sap nguon|mat nguon|tu tat|tat nguon/, label: "Mất nguồn đột ngột", missing: "Phiên bản bo mạch nguồn" },
  {
    re: /khong len nguon|khong vao dien|khong len dien|khong khoi dong|khong bat duoc/,
    label: "Không lên nguồn",
    missing: "Phiên bản bo mạch nguồn",
  },
  { re: /\bkeu\b|tieng on|on bat thuong|\brung\b|lach cach/, label: "Tiếng ồn bất thường", missing: "Lô linh kiện từ nhà cung cấp" },
  { re: /ro nuoc|ro ri|\bri nuoc|chay nuoc|bi ro\b/, label: "Rò rỉ nước", missing: "Vị trí rò cụ thể" },
  { re: /khet|boc khoi|chay no|\bchap\b|tia lua/, label: "Có mùi khét, nguy cơ chập cháy", missing: "Số máy cụ thể" },
  { re: /\bnut\b|nut vo|vo kinh|\bbe kinh/, label: "Nứt vỡ", missing: "Công đoạn phát hiện" },
  { re: /khong nong|khong gia nhiet/, label: "Không gia nhiệt", missing: "Kết quả đo công suất" },
  { re: /khong lam lanh|khong lanh|kem lanh/, label: "Làm lạnh kém", missing: "Kết quả thử kín" },
  { re: /tray|xuoc|bong son/, label: "Lỗi ngoại quan (trầy, xước)" },
  { re: /khong dat|\bfail\b|\btruot\b/, label: "Không đạt kiểm tra", missing: "Bước kiểm tra không đạt" },
  { re: /loi bo|hong bo|bo mach/, label: "Nghi lỗi bo mạch", missing: "Phiên bản bo mạch" },
];

const SEVERE = /khet|boc khoi|chay no|\bchap\b|giat dien|dung chuyen|lan thu (ba|bon|tu|nam|sau|\d)|lien tuc|hang loat|nhieu lan|ba cai|bon cai|lap lai/;
const MEDIUM = /hai lan|\blai\b|vai lan|\bhoai\b|\bcu\b|khong len nguon|sap nguon|mat nguon|\bnut\b/;
const FAULT_HINT = /\bloi\b|\bhong\b|\bbao\b|van de|su co|bat thuong|\bbi\b/;

function cap(s: string): string {
  const t = s.trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}

/** Thẻ soạn sẵn cho các câu mẫu của deck (so khớp đúng câu, bỏ khoảng trắng thừa). */
export function sampleCard(text: string, fallback: Record<string, CaseCard>): CaseCard | null {
  const t = text.trim().replace(/\s+/g, " ");
  return fallback[t] ?? null;
}

export function extractByRules(text: string): CaseCard {
  const src = text.normalize("NFC").trim().slice(0, 300);
  const f = foldKeepLength(src);

  // Trạm
  let tram = "";
  const tm =
    /tram(?:\s+(?:test|kiem tra|ktra|thu|do))?(?:\s+cuoi chuyen)?(?:\s+so)?\s*\d+/.exec(f) ??
    /tram(?:\s+kiem tra)?\s+cuoi chuyen/.exec(f);
  if (tm) tram = cap(src.slice(tm.index, tm.index + tm[0].length));

  // Lô
  let lo = "";
  const lm = /\blo\s*(?:so\s*)?(\d[\w-]*)/.exec(f);
  if (lm) lo = src.slice(lm.index + lm[0].length - lm[1].length, lm.index + lm[0].length);

  // Model
  let model: string | null = null;
  const mm = /\bmodel\s+([a-z0-9][a-z0-9-]*)/i.exec(f);
  if (mm) model = src.slice(mm.index + mm[0].length - mm[1].length, mm.index + mm[0].length).toUpperCase();
  else {
    const pm = /bep (?:tu )?(?:doi|don)/.exec(f);
    if (pm) model = cap(src.slice(pm.index, pm.index + pm[0].length));
  }

  // Triệu chứng
  const found = SYMPTOMS.filter((s) => s.re.test(f));
  const code = /(?:loi|ma loi|bao loi)\s+(e\s?\d{1,3})/.exec(f);
  const labels = found.map((s) => s.label);
  if (code) labels.unshift(`Báo mã lỗi ${code[1].replace(/\s/g, "").toUpperCase()}`);
  const repeated = /lan thu|lai\b|lap lai|nhieu lan|hai lan|lien tuc|hoai/.test(f);
  let trieu_chung = labels.join("; ");
  if (trieu_chung && repeated && found[0]?.label === "Bảo vệ nhiệt kích hoạt") trieu_chung = trieu_chung.replace("kích hoạt", "kích hoạt lặp lại");

  const la_bao_loi = labels.length > 0 || ((Boolean(lo) || Boolean(tram)) && FAULT_HINT.test(f));
  if (!trieu_chung && la_bao_loi) trieu_chung = "Chưa rõ triệu chứng";

  const muc_do: CaseCard["muc_do"] = SEVERE.test(f) ? "Cao" : MEDIUM.test(f) ? "Trung bình" : "Thấp";

  const missing: string[] = [];
  if (!tram) missing.push("Trạm báo lỗi");
  if (!lo) missing.push("Số lô");
  if (!model) missing.push("Model sản phẩm");
  for (const s of found) if (s.missing && !missing.includes(s.missing)) missing.push(s.missing);
  if (!found.length && la_bao_loi) missing.push("Mô tả triệu chứng");

  if (!la_bao_loi) {
    return { tram: "", trieu_chung: "", lo: "", model: null, muc_do: "Thấp", thong_tin_con_thieu: [], la_bao_loi: false };
  }
  return { tram, trieu_chung, lo, model, muc_do, thong_tin_con_thieu: missing.slice(0, 4), la_bao_loi };
}

/** Trích xuất không cần AI: câu mẫu → kết quả soạn sẵn, còn lại → quy tắc. */
export function extractOffline(text: string, fallback: Record<string, CaseCard>): ExtractResult {
  const s = sampleCard(text, fallback);
  return s ? { card: s, mode: "sample" } : { card: extractByRules(text), mode: "rules" };
}
