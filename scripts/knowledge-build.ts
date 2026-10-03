/**
 * Gộp các bản tóm lược đã duyệt (knowledge/curated/D1–D3.md) thành module TS để trợ lý dùng làm ngữ cảnh.
 *   npm run knowledge:build   → content/knowledge/hoaphat-brief.ts
 * Không đọc knowledge/sources (văn bản thô, không commit). Các file *-conflicts.md chỉ để đối chiếu, không đưa vào.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = [
  { id: "D1", title: "Đề xuất Mô hình AI Thế giới thực cho Ban Lãnh đạo (bản tiếng Việt)" },
  { id: "D2", title: "Đề xuất cho Điện máy gia dụng và điện lạnh Hòa Phát (bản tiếng Việt)" },
  { id: "D3", title: "Đề xuất hợp tác Mô hình AI Thế giới thực công nghiệp (bản tiếng Anh, đã dịch)" },
];

const parts = DOCS.map((d) => {
  const md = readFileSync(path.join(root, "knowledge/curated", `${d.id}.md`), "utf8").trim();
  // bỏ tiêu đề H1 riêng của từng file, thay bằng tiêu đề thống nhất
  const body = md.replace(/^# .*\n+/, "");
  return `## Hồ sơ ${d.id}: ${d.title}\n\n${body.replace(/^## /gm, "### ")}`;
});

const brief = parts.join("\n\n---\n\n");
const out = `/** SINH TỰ ĐỘNG bởi scripts/knowledge-build.ts từ knowledge/curated/*.md. Không sửa tay. */\nexport const hoaphatBrief: string = ${JSON.stringify(brief)};\n\nexport const hoaphatBriefDocs = ${JSON.stringify(DOCS, null, 2)} as const;\n`;
mkdirSync(path.join(root, "content/knowledge"), { recursive: true });
writeFileSync(path.join(root, "content/knowledge/hoaphat-brief.ts"), out);
console.log(`knowledge:build · ${brief.split(/\s+/).length} từ · ${(brief.match(/^- /gm) ?? []).length} dữ kiện → content/knowledge/hoaphat-brief.ts`);
