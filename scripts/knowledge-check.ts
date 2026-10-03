/**
 * Kiểm tra bản tóm lược hồ sơ trước khi đưa vào trợ lý:
 * không có số tiền / phí của Celesnity, không có tên gọi cũ, mỗi dữ kiện đều có nguồn [Dn tr.N].
 *   npm run knowledge:check
 */
import { hoaphatBrief } from "../content/knowledge/hoaphat-brief";

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
if (problems.length) {
  console.error(`knowledge:check · ${problems.length} vấn đề / ${facts} dữ kiện`);
  problems.forEach((p) => console.error("  - " + p));
  process.exit(1);
}
console.log(`knowledge:check · Đạt: ${facts} dữ kiện, đều có nguồn, không có giá hay tên gọi cũ.`);
