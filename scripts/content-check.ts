/**
 * npm run content:check
 * So content/content.vi.ts với docs/content-v4.md:
 *  1. Mọi section `## \`#id\`` trong v4 có trong `sections`, tiêu đề (dòng ### đầu tiên) khớp.
 *  2. Mọi tiêu đề `##` trong PHỤ LỤC có trong `appendix`.
 *  3. Mọi ô bảng trong v4 có ≥ 12 chữ cái xuất hiện đâu đó trong nội dung trang.
 * Thoát mã 1 nếu thiếu.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { appendix, benefits, closing, packageParts, sections } from "../content/content.vi";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const v4 = readFileSync(resolve(root, "docs/content-v4.md"), "utf8").split(/\r?\n/);

/** Bỏ ký hiệu ** * ` \ và chuẩn hóa khoảng trắng */
function norm(s: string): string {
  return s
    .replace(/\\\*/g, "*")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    // Minder Design System cấm emoji: bỏ emoji của v4 trước khi so
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\\([|_\[\]()#>-])/g, "$1")
    .replace(/[ \s]+/g, " ")
    .trim()
    .normalize("NFC");
}

const letters = (s: string) => (s.match(/\p{L}/gu) ?? []).length;

// ── Tách v4 ──
type V4Section = { id: string; title: string | null; line: number };
const v4Sections: V4Section[] = [];
const v4Appendix: { title: string; line: number }[] = [];
const v4Cells: { text: string; line: number }[] = [];

let inAppendix = false;
let current: V4Section | null = null;
v4.forEach((raw, i) => {
  const line = raw.trimEnd();
  const n = i + 1;
  if (/^#\s+`\/phu-luc`/.test(line)) {
    inAppendix = true;
    current = null;
    return;
  }
  const sec = line.match(/^##\s+`#([a-z0-9-]+)`/);
  if (sec && !inAppendix) {
    current = { id: sec[1], title: null, line: n };
    v4Sections.push(current);
    return;
  }
  if (inAppendix && /^##\s+/.test(line)) {
    v4Appendix.push({ title: norm(line.replace(/^##\s+/, "")), line: n });
    return;
  }
  if (current && current.title === null) {
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) current.title = norm(h3[1]);
  }
  if (/^\|/.test(line) && !/^\|[\s:|-]+\|?$/.test(line)) {
    const cells = line.replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/);
    for (const c of cells) {
      const t = norm(c);
      if (letters(t) >= 12) v4Cells.push({ text: t, line: n });
    }
  }
});

// Section không có ###: lấy tiêu đề # đầu tiên (ví dụ #mo-dau)
for (const s of v4Sections) {
  if (s.title !== null) continue;
  for (let i = s.line; i < v4.length; i++) {
    if (/^##\s+`#/.test(v4[i])) break;
    const h = v4[i].match(/^#\s+(.+)$/);
    if (h) {
      s.title = norm(h[1]);
      break;
    }
  }
}

// ── Gom chữ trong content.vi.ts ──
const strings: string[] = [];
function collect(v: unknown) {
  if (typeof v === "string") strings.push(norm(v));
  else if (Array.isArray(v)) v.forEach(collect);
  else if (v && typeof v === "object") Object.values(v).forEach(collect);
}
collect({ sections, appendix, closing, benefits, packageParts });
const haystack = strings.join("\n");

// ── So sánh ──
const problems: string[] = [];

for (const s of v4Sections) {
  const mine = sections.find((x) => x.id === s.id);
  if (!mine) {
    problems.push(`[section] thiếu #${s.id} (v4 dòng ${s.line})`);
    continue;
  }
  if (s.title && norm(mine.title) !== s.title) {
    problems.push(`[tiêu đề] #${s.id} lệch\n    v4:   ${s.title}\n    site: ${norm(mine.title)}`);
  }
}
const extra = sections.filter((x) => !v4Sections.some((s) => s.id === x.id)).map((x) => x.id);
if (extra.length) problems.push(`[section] có trong content.vi.ts nhưng không có trong v4: ${extra.join(", ")}`);

for (const a of v4Appendix) {
  if (!appendix.some((x) => norm(x.title) === a.title)) problems.push(`[phụ lục] thiếu "${a.title}" (v4 dòng ${a.line})`);
}

const missingCells = v4Cells.filter((c) => !haystack.includes(c.text));
for (const c of missingCells) problems.push(`[ô bảng] v4 dòng ${c.line}: "${c.text}"`);

console.log(
  `content:check · v4: ${v4Sections.length} section, ${v4Appendix.length} mục phụ lục, ${v4Cells.length} ô bảng (≥12 chữ cái)`,
);
console.log(`content.vi.ts: ${sections.length} section, ${appendix.length} mục phụ lục`);
if (problems.length) {
  console.error(`\n${problems.length} vấn đề:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("Đạt: đủ section, tiêu đề khớp, đủ phụ lục và ô bảng.");
