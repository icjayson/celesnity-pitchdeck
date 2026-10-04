/**
 * Kiểm tra hồ sơ đề xuất (PHẦN B) của trợ lý từng deck trước khi đưa vào trợ lý:
 * - Hòa Phát: không có số tiền / phí của Celesnity, không có tên gọi cũ, mỗi dữ kiện đều có nguồn [Dn tr.N].
 * - Nestlé Trị An: không có số tiền / phí, không có ghi chú khảo sát nội bộ của nhà máy, dữ kiện công khai có nguồn [..].
 *   npm run knowledge:check
 */
import { nestleBrief } from "../decks/nestle-vietnam/knowledge";
import { faq as nestleFaq } from "../decks/nestle-vietnam/faq";
import { hoaphatBrief } from "../decks/hoa-phat/knowledge/hoaphat-brief";
import { isuzuBrief } from "../decks/isuzu-vietnam/knowledge";
import { faq as isuzuFaq } from "../decks/isuzu-vietnam/faq";

const problems: string[] = [];
const lines = hoaphatBrief.split("\n");

const banned: [RegExp, string][] = [
  [/\bminder\b/i, "tên Minder (dùng 'Nền tảng dữ liệu tập trung')"],
  [/\bUC\s?\d\b/, "mã UC (dùng 'Ứng dụng 0N')"],
  [/\bpilot\b/i, "pilot (dùng 'thử nghiệm')"],
  [/world model|mô hình thế giới\b/i, "tên mô hình (dùng 'Mô hình AI Thế giới thực')"],
  [/\bagents?\b/i, "agent (dùng 'Tác nhân AI')"],
  [/\bACV\b|chiết khấu|đơn giá|báo giá cụ thể/i, "thông tin giá"],
  [/(phí|giá|chi phí chương trình)[^.\n]{0,40}\d[\d.,]*\s*(usd|\$|đồng|triệu|tỷ)/i, "số tiền gắn với phí/giá"],
];

lines.forEach((l, i) => {
  if (!l.startsWith("- ")) return;
  if (!/\[D[1-3] tr\.\d+(?:[–,-]\s?\d+)*\]\s*$/.test(l)) problems.push(`dòng ${i + 1}: thiếu nguồn [Dn tr.N]: ${l.slice(0, 80)}`);
  for (const [re, why] of banned) if (re.test(l)) problems.push(`dòng ${i + 1}: ${why}: ${l.slice(0, 100)}`);
});

const facts = lines.filter((l) => l.startsWith("- ")).length;

// ── Nestlé Trị An ──
/** Điều nhà máy chia sẻ riêng trong khảo sát: không bao giờ vào trợ lý hay trang */
const INTERNAL: [RegExp, string][] = [
  [/3 ngày|ba ngày/i, "thời gian lập kế hoạch tuần (ghi chú nội bộ)"],
  [/nửa ngày|half[- ]day/i, "sự cố dừng nửa ngày (ghi chú nội bộ)"],
  [/nửa năm|6 tháng một lần/i, "chu kỳ kế hoạch nửa năm (ghi chú nội bộ)"],
  [/ghi (chép )?(bằng )?tay|nhập tay/i, "ghi chép tay cuối ca (ghi chú nội bộ)"],
  [/anh Phương|anh Trường/i, "tên người tại nhà máy"],
];
const PRICE: [RegExp, string][] = [
  [/\bpilot\b/i, "pilot (dùng 'thử nghiệm')"],
  [/(phí|giá|chi phí)[^.\n]{0,40}\d[\d.,]*\s*(usd|\$|đồng|triệu|tỷ)/i, "số tiền gắn với phí/giá"],
];
const nLines = nestleBrief.split("\n");
let nFacts = 0;
let inPublic = false;
nLines.forEach((l, i) => {
  if (l.startsWith("## ")) inPublic = /nguồn công khai/i.test(l);
  if (!l.startsWith("- ")) return;
  nFacts++;
  if (inPublic && !/\[[^\]]+\]\s*$/.test(l)) problems.push(`[nestle] dòng ${i + 1}: thiếu nguồn [..]: ${l.slice(0, 80)}`);
  for (const [re, why] of [...INTERNAL, ...PRICE]) if (re.test(l)) problems.push(`[nestle] dòng ${i + 1}: ${why}: ${l.slice(0, 100)}`);
});
for (const f of nestleFaq) {
  for (const [re, why] of INTERNAL) if (re.test(f.q) || re.test(f.a)) problems.push(`[nestle faq ${f.id}] ${why}`);
}

// ── Isuzu Việt Nam ──
/** Ghi chú nội bộ của tài liệu khảo sát (cách Isuzu đang truy xuất, bảng "bài toán"): không bao giờ vào trợ lý hay trang */
const ISUZU_INTERNAL: [RegExp, string][] = [
  [/excel|bảng tính|spreadsheet/i, "công cụ Isuzu đang dùng (ghi chú nội bộ)"],
  [/bài toán cần giải quyết|pain point/i, "bảng bài toán nội bộ"],
];
const ISUZU_PRICE: [RegExp, string][] = [[/(phí|giá)[^.\n]{0,40}\d[\d.,]*\s*(usd|\$|đồng|triệu|tỷ)/i, "số tiền gắn với phí/giá"]];
const iLines = isuzuBrief.split("\n");
let iFacts = 0;
let iPublic = false;
iLines.forEach((l, i) => {
  if (l.startsWith("## ")) iPublic = /nguồn công khai/i.test(l);
  if (!l.startsWith("- ")) return;
  iFacts++;
  if (iPublic && !/\[[^\]]+\]\s*$/.test(l)) problems.push(`[isuzu] dòng ${i + 1}: thiếu nguồn [..]: ${l.slice(0, 80)}`);
  for (const [re, why] of [...ISUZU_INTERNAL, ...ISUZU_PRICE]) if (re.test(l)) problems.push(`[isuzu] dòng ${i + 1}: ${why}: ${l.slice(0, 100)}`);
});
for (const f of isuzuFaq) {
  for (const [re, why] of [...ISUZU_INTERNAL, ...ISUZU_PRICE]) if (re.test(f.q) || re.test(f.a)) problems.push(`[isuzu faq ${f.id}] ${why}`);
}

if (problems.length) {
  console.error(`knowledge:check · ${problems.length} vấn đề / ${facts} dữ kiện`);
  problems.forEach((p) => console.error("  - " + p));
  process.exit(1);
}
console.log(`knowledge:check · Đạt: Hòa Phát ${facts} dữ kiện, đều có nguồn, không có giá hay tên gọi cũ.`);
console.log(`knowledge:check · Đạt: Nestlé Trị An ${nFacts} dữ kiện, ${nestleFaq.length} câu hỏi; không có giá, không có ghi chú khảo sát nội bộ.`);
console.log(`knowledge:check · Đạt: Isuzu Việt Nam ${iFacts} dữ kiện, ${isuzuFaq.length} câu hỏi; không có giá, không có ghi chú nội bộ.`);
