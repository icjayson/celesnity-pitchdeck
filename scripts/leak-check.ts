/**
 * npm run leak:check [-- --build]
 * Bảo đảm nội dung của mỗi khách hàng không lẫn sang khách hàng khác:
 *  1. Mỗi decks/<slug>/** không chứa tên riêng của khách hàng khác (decks/all.ts → forbiddenTerms).
 *  2. components/**, lib/**, app/** không chứa tên riêng của bất kỳ khách hàng nào (câu chữ khách hàng nằm trong decks/).
 *  3. Component và lib phía trình duyệt không import dữ liệu từ decks/ (chỉ `import type`); dữ liệu đi qua DeckProvider.
 *  4. Với --build: JS tĩnh sau `next build` (.next/static) không chứa tên riêng của khách hàng nào,
 *     vì nội dung deck chỉ được gửi theo từng trang (RSC payload), không nằm trong bundle dùng chung.
 * Thoát mã 1 nếu có vi phạm.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { forbiddenTerms } from "../decks/all";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const problems: string[] = [];

function walk(dir: string, exts: RegExp, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.test(name)) out.push(p);
  }
  return out;
}

const norm = (s: string) => s.normalize("NFC").toLowerCase();
const allNames = [...new Set(Object.values(forbiddenTerms).flat())];

// 1. Deck không chứa tên của khách hàng khác
for (const [slug, terms] of Object.entries(forbiddenTerms)) {
  for (const f of walk(join(root, "decks", slug), /\.(ts|tsx|md|json)$/)) {
    const text = norm(readFileSync(f, "utf8"));
    for (const t of terms) if (text.includes(norm(t))) problems.push(`[deck ${slug}] ${relative(root, f)} nhắc "${t}"`);
  }
}

// 2. Code dùng chung không chứa tên khách hàng
for (const dir of ["components", "lib", "app"]) {
  for (const f of walk(join(root, dir), /\.(ts|tsx|css)$/)) {
    const text = norm(readFileSync(f, "utf8"));
    for (const t of allNames) if (text.includes(norm(t))) problems.push(`[dùng chung] ${relative(root, f)} nhắc "${t}"`);
  }
}

// 3. Không import dữ liệu deck vào component / lib
const DATA_IMPORT = /^\s*import\s+(?!type\b)[^;]*from\s+["']@\/decks\/(?!types["'])/m;
for (const dir of ["components", "lib"]) {
  for (const f of walk(join(root, dir), /\.(ts|tsx)$/)) {
    if (DATA_IMPORT.test(readFileSync(f, "utf8"))) problems.push(`[import] ${relative(root, f)} import dữ liệu từ decks/ (chỉ được import type)`);
  }
}

// 4. Bundle tĩnh sau build
let scannedJs = 0;
if (process.argv.includes("--build")) {
  const staticDir = join(root, ".next", "static");
  if (!existsSync(staticDir)) problems.push("[build] chưa có .next/static: chạy `npm run build` trước");
  for (const f of walk(staticDir, /\.js$/)) {
    scannedJs++;
    const text = norm(readFileSync(f, "utf8"));
    for (const t of allNames) if (text.includes(norm(t))) problems.push(`[build] ${relative(root, f)} chứa "${t}"`);
  }
}

console.log(
  `leak:check · ${Object.keys(forbiddenTerms).length} deck · ${allNames.length} tên riêng` + (scannedJs ? ` · ${scannedJs} tệp JS tĩnh` : ""),
);
if (problems.length) {
  console.error(`\n${problems.length} vi phạm:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("Đạt: nội dung mỗi khách hàng tách riêng.");
