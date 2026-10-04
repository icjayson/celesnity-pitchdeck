/**
 * npm run content:check [-- --deck=<slug>]
 * So nội dung mỗi deck (decks/<slug>/) với tệp markdown gốc của deck đó (decks/all.ts → deckSources):
 *  1. Mọi section `## \`#id\`` trong v4 có trong `sections`, tiêu đề (dòng ### đầu tiên) khớp.
 *  2. Mọi tiêu đề `##` trong PHỤ LỤC có trong `appendix`.
 *  3. Mọi ô bảng trong v4 có ≥ 12 chữ cái xuất hiện đâu đó trong dữ liệu deck (trang + dữ liệu module).
 * Thoát mã 1 nếu thiếu.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { allDecks, deckSources } from "../decks/all";
import type { DeckData } from "../decks/types";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

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
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\\([|_\[\]()#>-])/g, "$1")
    .replace(/[ \s]+/g, " ")
    .trim()
    .normalize("NFC");
}

const letters = (s: string) => (s.match(/\p{L}/gu) ?? []).length;

function checkDeck(slug: string, deck: DeckData, source: string): boolean {
  /** Section tạm cất vẫn được tính là "có nội dung" (chưa xóa khỏi nguồn) */
  const sections = [...deck.sections, ...deck.parkedSections];
  const appendix = deck.appendix;
  const v4 = readFileSync(resolve(root, source), "utf8").split(/\r?\n/);

  // ── Tách v4 ──
  type V4Section = { id: string; title: string | null; line: number };
  const v4Sections: V4Section[] = [];
  const v4Appendix: { title: string; line: number }[] = [];
  const v4Cells: { text: string; line: number }[] = [];

  let inAppendix = false;
  let skipTable = false;
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
    // Bảng ngay sau dòng <!-- content-check: skip-table --> là cách trình bày dữ liệu module (đã kiểm tra bằng kiểu dữ liệu), bỏ qua
    if (/<!--\s*content-check:\s*skip-table\s*-->/.test(line)) {
      skipTable = true;
      return;
    }
    if (skipTable && !/^\|/.test(line) && line.trim() !== "") skipTable = false;
    if (skipTable) return;
    if (/^\|/.test(line) && !/^\|[\s:|-]+\|?$/.test(line)) {
      const cells = line.replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/);
      // ô có nhiều dòng (<br>, gạch đầu dòng •) được so từng dòng
      for (const c of cells.flatMap((x) => x.split(/<br\s*\/?>/i))) {
        const t = norm(c.replace(/^\s*•\s*/, ""));
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
  collect(deck);
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
  if (extra.length) problems.push(`[section] có trong deck nhưng không có trong tệp gốc: ${extra.join(", ")}`);

  for (const a of v4Appendix) {
    if (!appendix.some((x) => norm(x.title) === a.title)) problems.push(`[phụ lục] thiếu "${a.title}" (v4 dòng ${a.line})`);
  }

  const missingCells = v4Cells.filter((c) => !haystack.includes(c.text));
  for (const c of missingCells) problems.push(`[ô bảng] v4 dòng ${c.line}: "${c.text}"`);

  console.log(
    `content:check [${slug}] · ${source}: ${v4Sections.length} section, ${v4Appendix.length} mục phụ lục, ${v4Cells.length} ô bảng (≥12 chữ cái)`,
  );
  console.log(`deck: ${sections.length} section, ${appendix.length} mục phụ lục`);
  if (problems.length) {
    console.error(`\n${problems.length} vấn đề:`);
    for (const p of problems) console.error(`  - ${p}`);
    return false;
  }
  console.log("Đạt: đủ section, tiêu đề khớp, đủ phụ lục và ô bảng.");
  return true;
}

const only = process.argv.find((a) => a.startsWith("--deck="))?.slice(7);
let ok = true;
for (const [slug, deck] of Object.entries(allDecks)) {
  if (only && slug !== only) continue;
  const source = deckSources[slug];
  if (!source) {
    console.error(`[${slug}] chưa khai báo tệp gốc trong decks/all.ts (deckSources)`);
    ok = false;
    continue;
  }
  ok = checkDeck(slug, deck, source) && ok;
  console.log("");
}
if (!ok) process.exit(1);
