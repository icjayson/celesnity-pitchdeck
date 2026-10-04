/**
 * Trích xuất hồ sơ lỗi xe theo quy tắc (chế độ offline của M6 kiểu "defect"). Thuần TypeScript, chạy ở server và trình duyệt.
 * Đây KHÔNG phải AI: UI ghi nhãn "Chế độ offline: trích xuất theo quy tắc".
 * Nguyên tắc: chỉ lấy giá trị có trong lời báo, không bao giờ tự đặt VIN, lô hay mã đồ gá.
 */
import type { DefectCard } from "@/decks/types";
import { foldKeepLength } from "./text";

export type DefectMode = "ai" | "rules" | "sample";
export type DefectResult = { card: DefectCard; mode: DefectMode };

const MAX = 300;

/** Mã xe dạng "ABC-00123": 3 chữ cái (dòng xe) + số; loại các tiền tố lô/đồ gá/trạm */
const NOT_MODEL = /^(lot|jig|cfg|br|pt|gl|st|ax)$/;

/** Công đoạn theo từ khóa, xét theo thứ tự ưu tiên (mã trạm luôn thắng) */
const STAGES: { re: RegExp; stage: Exclude<DefectCard["cong_doan"], ""> }[] = [
  { re: /kiem tra cuoi|cuoi chuyen|\bqc\b|inspection|final check/, stage: "QC" },
  { re: /buong son|chay son|\bson\b|\bpaint/, stage: "PAINT" },
  { re: /noi that|\btrim\b|tap ?lo|bang dieu khien/, stage: "TRIM" },
  { re: /sat[\s-]?xi|khung gam|\bgam xe|chassis/, stage: "CHASSIS" },
  { re: /\bbody\b|than vo|cabin|moi han|diem han|\bhan\b|weld/, stage: "BODY" },
];

/** Linh kiện: không có `label` → lấy nguyên cụm trong lời báo; có `label` → tên tiếng Việt (cho câu tiếng Anh) */
const PARTS: { re: RegExp; label?: string }[] = [
  { re: /cong tac den phanh/ },
  { re: /den (?:phanh|pha|hau|xi nhan|coi|bao|lui)/ },
  { re: /ban le(?: cua)?(?: (?:trai|phai|truoc|sau|lai|phu))?(?: (?:trai|phai|cabin))?/ },
  { re: /kinh chan gio|kinh (?:cua|lai|phu|sau)(?: (?:trai|phai))?/ },
  { re: /ghe (?:lai|phu|sau)|\bghe\b/ },
  { re: /bu ?long(?: (?:banh xe|cau sau|cau truoc|nhip|khung|dong co))?|oc vit/ },
  { re: /cau (?:sau|truoc)/ },
  { re: /ong (?:phanh|dau|nhien lieu|xa)|day phanh/ },
  { re: /ma phanh|cum phanh|(?<!lo )\bphanh\b/ },
  { re: /\bcua (?:trai|phai|truoc|sau|lai|phu|cabin)(?: (?:trai|phai|cabin))?/ },
  { re: /guong(?: chieu hau)?/ },
  { re: /day dien|bo day dien|gioang(?: cua)?/ },
  { re: /\bnhip(?: la)?\b/ },
  { re: /brake light/, label: "Đèn phanh" },
  { re: /\bdoor hinges?\b|\bhinges?\b/, label: "Bản lề cửa" },
  { re: /windshield|windscreen/, label: "Kính chắn gió" },
  { re: /\bseats?\b/, label: "Ghế" },
  { re: /\bbolts?\b/, label: "Bu lông" },
  { re: /\bmirror/, label: "Gương" },
  { re: /\bdoors?\b/, label: "Cửa" },
  { re: /\bbrakes?\b/, label: "Phanh" },
];

const SYMPTOMS: { re: RegExp; label: string }[] = [
  { re: /sai mau|lech mau|khac mau|colou?r mismatch/, label: "Sai màu" },
  { re: /\blech\b(?! mau)|sai vi tri|misalign|off[\s-]?position/, label: "Lệch vị trí" },
  { re: /chay son|son (?:bi )?chay|paint (?:run|sag)|\bsags?\b|\bruns? on paint/, label: "Chảy sơn" },
  { re: /bot khi|ro son|da cam|orange peel/, label: "Rỗ, bọt sơn" },
  { re: /khong sang|khong len den|den khong len|(?:does ?n[o']?t|not|no) light/, label: "Không sáng" },
  { re: /bi ho\b|khe ho|ho khe|ho mep|ho gioang|ho keo|\bgaps?\b/, label: "Hở khe" },
  { re: /ro ri|\bleak/, label: "Rò rỉ" },
  { re: /ri set|gi set|bi ri\b|bi gi\b|\brust/, label: "Rỉ sét" },
  { re: /\bkeu\b|tieng on|on bat thuong|noise|rattle/, label: "Tiếng kêu bất thường" },
  {
    re: /luc siet (?:thap|khong dat|thieu|chua dat|duoi)|siet (?:thieu|chua du|khong du|chua dat)|thieu luc siet|low torque|under-?torque/,
    label: "Lực siết thấp",
  },
  { re: /bi long\b|long (?:bu long|oc)|\bloose/, label: "Bị lỏng" },
  { re: /tray|xuoc|scratch/, label: "Trầy xước" },
  { re: /\bmop\b|\blom\b|\bdent/, label: "Móp, lõm" },
  { re: /\bnut\b(?! (?:bam|nhan|dieu khien|khan cap|bat))|\bcrack/, label: "Nứt" },
  { re: /\brach\b|\btorn\b/, label: "Rách" },
  { re: /thieu (?:chi tiet|linh kien|oc|bu long|kep)|missing part/, label: "Thiếu chi tiết" },
  { re: /khong hoat dong|bi hong|\bhong\b|not work|does ?n[o']?t work|broken/, label: "Không hoạt động" },
];

/** Lỗi liên quan an toàn hoặc lặp lại → Cao */
const SEVERE =
  /phanh|tay lai|vo lang|day an toan|tui khi|nhien lieu|luc siet|lap lai|lan thu|nhieu xe|hang loat|lien tuc|brake|steering|airbag|torque|repeat/;
const HINT = /\bloi\b|\bbi\b|bat thuong|van de|khong dat|\bdefect|\bfault|\bissue|\bng\b/;

function cap(s: string): string {
  const t = s.trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}

/** Tìm mọi khớp (không chồng lấn, theo vị trí) của một danh sách mẫu */
function findAll<T extends { re: RegExp }>(f: string, list: T[]): { item: T; start: number; end: number }[] {
  const hits: { item: T; start: number; end: number }[] = [];
  for (const item of list) {
    const re = new RegExp(item.re.source, "g");
    for (let m = re.exec(f); m; m = re.exec(f)) {
      if (!m[0]) {
        re.lastIndex++;
        continue;
      }
      hits.push({ item, start: m.index, end: m.index + m[0].length });
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));
  const out: typeof hits = [];
  for (const h of hits) if (!out.some((o) => h.start < o.end && o.start < h.end)) out.push(h);
  return out;
}

const uniq = (xs: string[]) => [...new Set(xs.filter(Boolean))];

export function defectByRules(text: string): DefectCard {
  const src = text.normalize("NFC").trim().slice(0, MAX);
  const f = foldKeepLength(src);
  const slice = (start: number, end: number) => src.slice(start, end);

  // VIN: mã kiểu "ABC-00123" hoặc VIN đủ 17 ký tự (không có I, O, Q)
  let vin = "";
  let vinModel = "";
  const mv = [...f.matchAll(/\b([a-z]{3})(?:\s?-\s?(\d{3,6})|\s?(\d{5,6}))\b/g)].find((m) => !NOT_MODEL.test(m[1])) ?? null;
  if (mv) {
    vinModel = mv[1].toUpperCase();
    vin = `${vinModel}-${mv[2] ?? mv[3]}`;
  } else {
    const m17 = /\b(?=[a-hj-npr-z0-9]*\d)(?=[a-hj-npr-z0-9]*[a-z])[a-hj-npr-z0-9]{17}\b/.exec(f);
    if (m17) vin = m17[0].toUpperCase();
  }
  // Dòng xe nói riêng: "xe NQR", "cabin FRR"
  const mm = /\b(?:xe|cabin|model)\s(?!bus\b|tai\b|nay\b|moi\b)([a-z]{3})\b/.exec(f);
  const model = vinModel || (mm ? mm[1].toUpperCase() : "");

  // Trạm: mã "BODY-08", hoặc "trạm 5" / "buồng sơn 2"
  let tram = "";
  let stageFromCode: DefectCard["cong_doan"] = "";
  const mc = /\b(body|paint|trim|chassis|qc)\s?-\s?(\d{1,3})\b/.exec(f);
  if (mc) {
    stageFromCode = mc[1].toUpperCase() as DefectCard["cong_doan"];
    tram = `${stageFromCode}-${mc[2].padStart(2, "0")}`;
  } else {
    const mt = /\b(?:tram|buong son)\s+(?:so\s+)?\d+[a-z]?\b/.exec(f);
    if (mt) tram = cap(slice(mt.index, mt.index + mt[0].length));
  }
  const cong_doan: DefectCard["cong_doan"] = stageFromCode || (STAGES.find((s) => s.re.test(f))?.stage ?? "");

  // Lô: mã lô quen thuộc, hoặc "lô X"
  let lo = "";
  const ml = /\b(lot|br|pt|gl|st|ax)\s?-\s?(\d{2,6})\b|\blot\s(\d{2,6})\b/.exec(f);
  if (ml) lo = ml[1] ? `${ml[1].toUpperCase()}-${ml[2]}` : `LOT-${ml[3]}`;
  else {
    const mo = /\blo\s+(?:son\s+|phanh\s+|linh kien\s+|ban le\s+|hang\s+)?(?:so\s+)?([a-z]{0,5}-?\d[\w-]*)/.exec(f);
    if (mo) lo = slice(mo.index + mo[0].length - mo[1].length, mo.index + mo[0].length).toUpperCase();
  }

  // Đồ gá: "JIG-04" hoặc "đồ gá (số) X"; nhắc đồ gá mà không có mã thì để trống
  let do_ga = "";
  const mj = /\bjig\s?-?\s?(\d{1,3})\b/.exec(f);
  if (mj) do_ga = `JIG-${mj[1].padStart(2, "0")}`;
  else {
    const mg = /\bdo ga\s+(?:so\s+)?([a-z]{0,5}-?\d[\w-]*)/.exec(f);
    if (mg) do_ga = slice(mg.index + mg[0].length - mg[1].length, mg.index + mg[0].length).toUpperCase();
  }

  // Ca
  let ca = "";
  const ms = /\bca (dem|ngay|chieu|sang|toi|1|2|3|mot|hai|ba)\b/.exec(f);
  if (ms) ca = cap(slice(ms.index, ms.index + ms[0].length));
  else if (/night shift/.test(f)) ca = "Ca đêm";
  else if (/day shift/.test(f)) ca = "Ca ngày";
  else if (/(?:afternoon|evening) shift/.test(f)) ca = "Ca chiều";

  const parts = findAll(f, PARTS).slice(0, 2);
  const linh_kien = uniq(parts.map((p) => p.item.label ?? cap(slice(p.start, p.end)))).join("; ");
  const symptoms = findAll(f, SYMPTOMS);
  const trieu_chung = uniq(symptoms.map((s) => s.item.label)).slice(0, 3).join("; ");

  const la_bao_loi = symptoms.length > 0 || ((!!linh_kien || !!vin || !!tram || !!lo || !!do_ga) && HINT.test(f));
  if (!la_bao_loi) {
    return {
      vin: "",
      model: "",
      cong_doan: "",
      tram: "",
      linh_kien: "",
      trieu_chung: "",
      lo: "",
      do_ga: "",
      ca: "",
      muc_do: "Thấp",
      thong_tin_con_thieu: [],
      la_bao_loi: false,
    };
  }

  const muc_do: DefectCard["muc_do"] = SEVERE.test(f) ? "Cao" : symptoms.length ? "Trung bình" : "Thấp";
  const missing: string[] = [];
  if (!vin) missing.push("VIN");
  if (!linh_kien) missing.push("Linh kiện");
  if (!trieu_chung) missing.push("Triệu chứng");
  if (!lo) missing.push(cong_doan === "PAINT" ? "Lô sơn" : "Lô linh kiện");
  if (!tram) missing.push(cong_doan === "PAINT" ? "Buồng sơn" : cong_doan ? "Trạm" : "Công đoạn hoặc trạm");
  if (!ca) missing.push("Ca");
  return {
    vin,
    model,
    cong_doan,
    tram,
    linh_kien,
    trieu_chung,
    lo,
    do_ga,
    ca,
    muc_do,
    thong_tin_con_thieu: missing.slice(0, 4),
    la_bao_loi,
  };
}

/** Không cần AI: câu mẫu của deck → kết quả soạn sẵn, còn lại → quy tắc */
export function defectOffline(text: string, fallback: Record<string, DefectCard>): DefectResult {
  const s = fallback[text.trim().replace(/\s+/g, " ")];
  return s ? { card: s, mode: "sample" } : { card: defectByRules(text), mode: "rules" };
}
