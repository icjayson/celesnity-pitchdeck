/**
 * npm run terms:check
 * Quét content/, components/, app/, lib/ (.ts, .tsx) tìm thuật ngữ cấm (docs/BUILD_BRIEF.md, "Thuật ngữ").
 * Chuẩn: "Mô hình AI Thế giới thực" · "trí thông minh" (vận hành) · "Tác nhân AI".
 * Được phép: "Luật Trí tuệ nhân tạo", "sở hữu trí tuệ" (tên pháp lý).
 * Bỏ qua một dòng: thêm chú thích `terms-check-ignore` trên chính dòng đó.
 * Thoát mã 1 nếu có vi phạm.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dirs = ["content", "components", "app", "lib"];

const rules: { re: RegExp; why: string }[] = [
  { re: /Mô hình Thế giới/giu, why: 'thiếu "AI": dùng "Mô hình AI Thế giới thực"' },
  { re: /Mô hình AI Thế giới(?! thực)/giu, why: 'thiếu "thực": dùng "Mô hình AI Thế giới thực"' },
  { re: /trí tuệ vận hành/giu, why: 'dùng "trí thông minh vận hành"' },
  { re: /tác tử/giu, why: 'dùng "Tác nhân AI"' },
  { re: /biết trước/giu, why: 'dùng "Dự báo trước"' },
  { re: /không bị khóa/giu, why: "thuật ngữ cấm" },
];
const allowed = [/Luật Trí tuệ nhân tạo/giu, /sở hữu trí tuệ/giu];

function walk(dir: string, out: string[]) {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
}

const files: string[] = [];
for (const d of dirs) walk(join(root, d), files);

const hits: string[] = [];
for (const f of files) {
  const lines = readFileSync(f, "utf8").normalize("NFC").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.includes("terms-check-ignore")) return;
    let text = line;
    for (const a of allowed) text = text.replace(a, " ");
    for (const r of rules) {
      r.re.lastIndex = 0;
      const m = r.re.exec(text);
      if (m) hits.push(`${relative(root, f)}:${i + 1}  "${m[0]}"  (${r.why})`);
    }
  });
}

console.log(`terms:check · đã quét ${files.length} file trong ${dirs.join(", ")}`);
if (hits.length) {
  console.error(`\n${hits.length} vi phạm thuật ngữ:`);
  for (const h of hits) console.error(`  - ${h}`);
  process.exit(1);
}
console.log("Đạt: không có thuật ngữ cấm.");
