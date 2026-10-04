/**
 * Trích xuất thẻ sự cố theo quy tắc (chế độ offline của M6 kiểu "incident"). Thuần TypeScript, chạy ở server và trình duyệt.
 * Đây KHÔNG phải AI: UI ghi nhãn "Chế độ offline: trích xuất theo quy tắc".
 */
import type { IncidentCard } from "@/decks/types";
import { foldKeepLength } from "./text";

export type IncidentMode = "ai" | "rules" | "sample";
export type IncidentResult = { card: IncidentCard; mode: IncidentMode };

const MAX = 300;

const SYMPTOMS: { re: RegExp; label: string; missing?: string }[] = [
  { re: /do am|am do|hoi am/, label: "Độ ẩm vượt giới hạn", missing: "Thời gian kết thúc sự cố" },
  { re: /nhiet do|qua nong|nong qua/, label: "Nhiệt độ vượt giới hạn", missing: "Thời gian kết thúc sự cố" },
  { re: /dinh luong|can (?:nang|nhe)|thieu (?:gam|can)|du (?:gam|can)|khoi luong/, label: "Định lượng lệch mục tiêu", missing: "Kết quả cân kiểm tra" },
  { re: /dung ngan|dung lien tuc|ket hop|ket vien|ket hang|tac/, label: "Dừng ngắn lặp lại", missing: "Máy dừng đầu tiên" },
  { re: /han (?:mang|nap)|ho mieng|ro khi|khong kin/, label: "Lỗi hàn kín", missing: "Lô màng hàn" },
  { re: /\bdung\b|ngung chay|ngung may/, label: "Dây chuyền dừng", missing: "Nguyên nhân dừng" },
];

const SEVERE = /dung|ngung|lan thu (ba|bon|tu|\d)|lien tuc|nhieu lan|lap lai|vuot/;
const MEDIUM = /lech|hai lan|\blai\b/;
const HINT = /\bloi\b|su co|bat thuong|\bbao\b|van de|\bbi\b|vuot/;

function cap(s: string): string {
  const t = s.trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}

export function incidentByRules(text: string): IncidentCard {
  const src = text.normalize("NFC").trim().slice(0, MAX);
  const f = foldKeepLength(src);
  const pick = (re: RegExp) => {
    const m = re.exec(f);
    return m ? cap(src.slice(m.index, m.index + m[0].length)) : "";
  };

  const khu_vuc = pick(/phong(?:\s+kiem soat|\s+lanh)?\s*(?:so\s*)?\d+|khu (?:dong goi|chiet rot|say)/);
  const day_chuyen = pick(/line\s*\d+|day chuyen\s*(?:so\s*)?\d+/);
  const tm = /(\d{1,2})\s*(?:gio|h|:)\s*(\d{1,2})?/.exec(f);
  const thoi_gian = tm ? `${tm[1].padStart(2, "0")}:${(tm[2] ?? "00").padStart(2, "0")}` : "";
  const lm = /\blo\s*(?:so\s*)?([a-z]?\d[\w-]*)/.exec(f);
  const lo = lm ? src.slice(lm.index + lm[0].length - lm[1].length, lm.index + lm[0].length).toUpperCase() : "";

  const found = SYMPTOMS.filter((s) => s.re.test(f));
  const la_su_co = found.length > 0 || ((!!khu_vuc || !!day_chuyen || !!lo) && HINT.test(f));
  if (!la_su_co) {
    return { khu_vuc: "", su_co: "", thoi_gian: "", day_chuyen: "", lo: "", muc_do: "Thấp", thong_tin_con_thieu: [], la_su_co: false };
  }
  const su_co = found.map((s) => s.label).join("; ") || "Chưa rõ sự cố";
  const muc_do: IncidentCard["muc_do"] = SEVERE.test(f) ? "Cao" : MEDIUM.test(f) ? "Trung bình" : "Thấp";
  const missing: string[] = [];
  if (!khu_vuc) missing.push("Khu vực");
  if (!day_chuyen) missing.push("Dây chuyền");
  if (!lo) missing.push("Số lô đang chạy");
  for (const s of found) if (s.missing && !missing.includes(s.missing)) missing.push(s.missing);
  return { khu_vuc, su_co, thoi_gian, day_chuyen, lo, muc_do, thong_tin_con_thieu: missing.slice(0, 4), la_su_co };
}

/** Không cần AI: câu mẫu của deck → kết quả soạn sẵn, còn lại → quy tắc */
export function incidentOffline(text: string, fallback: Record<string, IncidentCard>): IncidentResult {
  const s = fallback[text.trim().replace(/\s+/g, " ")];
  return s ? { card: s, mode: "sample" } : { card: incidentByRules(text), mode: "rules" };
}
