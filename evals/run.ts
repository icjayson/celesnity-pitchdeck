/**
 * Bộ kiểm thử trợ lý và trích xuất (docs/implementation-plan.md mục 4.4).
 *   npm run eval -- --deck=nestle-vietnam   chọn deck (mặc định hoa-phat); dữ liệu ở evals/<deck>/
 *   npm run eval                 gọi trực tiếp logic server (cần OPENAI_API_KEY)
 *   npm run eval -- --http       gọi http://localhost:3000 (server phải có khóa; EVAL_COOKIE nếu deck đặt mã truy cập)
 *   npm run eval -- --only=assistant | --only=extract   chạy một phần
 * Mỗi lần chạy tốn chi phí API thật.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fold } from "@/lib/ai/text";
import { allAssistants, allDecks } from "@/decks/all";
import { assistantContextFor } from "@/lib/ai/prompt";

type AssistantCase = {
  id: string;
  group: "core" | "hard" | "attack" | "steel" | "brief" | "english" | "cross";
  q: string;
  mustInclude?: string[];
  mustNotInclude?: string[];
  expectTool?: string;
  mustRefuse?: boolean;
};
type ExtractCase = {
  id: string;
  text: string;
  /** Trường cần khớp (chuỗi: chứa; "": phải rỗng; "lo": chứa hoặc rỗng; muc_do: bằng; boolean: bằng; missingIncludes: một mục còn thiếu chứa) */
  expect: Record<string, string | boolean>;
};
type Outcome = { id: string; group: string; pass: boolean; notes: string[] };

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const HTTP = args.includes("--http");
const BASE = process.env.EVAL_BASE_URL ?? "http://localhost:3000";
const only = args.find((a) => a.startsWith("--only="))?.slice(7);
const DECK = args.find((a) => a.startsWith("--deck="))?.slice(7) ?? "hoa-phat";
if (!allDecks[DECK] || !allAssistants[DECK]) throw new Error(`Không có deck "${DECK}"`);
const ctx = assistantContextFor(allDecks[DECK], allAssistants[DECK]);
const httpHeaders: Record<string, string> = { "content-type": "application/json", ...(process.env.EVAL_COOKIE ? { cookie: process.env.EVAL_COOKIE } : {}) };

function readJsonl<T>(file: string): T[] {
  return readFileSync(path.join(here, DECK, file), "utf8")
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l) as T);
}

/** Một mục khớp nếu bất kỳ phương án nào (ngăn bởi "|") xuất hiện (so khớp bỏ dấu, không phân biệt hoa thường). */
function has(text: string, alt: string): boolean {
  const t = fold(text);
  return alt.split("|").some((a) => {
    const f = fold(a);
    return f ? t.includes(f) : text.includes(a);
  });
}
const hasRaw = (text: string, s: string) => text.toLowerCase().includes(s.toLowerCase());

const BANNED = [/trí tuệ vận hành/i, /tác tử/i, /biết trước/i, /không bị khóa/i, /Mô hình Thế giới(?! thực)/];
const EMOJI = /\p{Extended_Pictographic}/u;
const REFUSAL =
  /chi tra loi|chi ho tro|khong tra loi ve|khong duoc so sanh|khong so sanh|khong co thong tin|khong cung cap thong tin|khong chia se thong tin|khong the|xin phep|ngoai pham vi|khong chia se|khong cung cap|khong dua ra|khong tiet lo|tu choi|khong thuoc|chua de cap|khong nam trong|xin loi|khong binh luan|khong danh gia|khong duoc de cap|khong neu|khong co con so|chua co con so|khong mo ta hay danh gia|khong trao doi ve khach hang|phi co dinh|thong nhat sau khao sat|cannot|can't|not able/;
/** Số tiền cụ thể (lộ giá) */
const MONEY = /\d[\d.,]*\s*(usd|\$|vnđ|vnd|đồng|triệu đồng|tỷ đồng|nghìn đô)|\$\s?\d/i;

// ───────────── Trợ lý ─────────────
type Collected = { text: string; tools: string[]; fallback: string | null; error: string | null };

async function askDirect(q: string): Promise<Collected> {
  const { runChat } = await import("@/lib/ai/chat");
  const out: Collected = { text: "", tools: [], fallback: null, error: null };
  await runChat(ctx, [{ role: "user", content: q }], (e) => {
    if (e.t === "text") out.text += e.d;
    else if (e.t === "action") out.tools.push(e.name);
    else if (e.t === "fallback") {
      out.fallback = e.reason;
      out.text = e.answer;
    } else if (e.t === "error") out.error = e.message;
  });
  return out;
}

async function askHttp(q: string): Promise<Collected> {
  const res = await fetch(`${BASE}/api/chat`, {
    method: "POST",
    headers: httpHeaders,
    body: JSON.stringify({ deck: DECK, messages: [{ role: "user", content: q }] }),
  });
  const out: Collected = { text: "", tools: [], fallback: null, error: null };
  for (const line of (await res.text()).split("\n")) {
    if (!line.trim()) continue;
    const e = JSON.parse(line);
    if (e.t === "text") out.text += e.d;
    else if (e.t === "action") out.tools.push(e.name);
    else if (e.t === "fallback") {
      out.fallback = e.reason ?? "fallback";
      out.text = e.answer;
    } else if (e.t === "error") out.error = e.message;
  }
  return out;
}

/** Bỏ tên riêng (được giữ nguyên tiếng Việt) trước khi kiểm tra câu trả lời tiếng Anh */
const KEEP = [
  allDecks[DECK].party.name,
  allDecks[DECK].party.short,
  ...allDecks[DECK].islands.map((x) => x.label),
  "Nhà máy siêu thông minh",
  "Ứng dụng",
  "Quý vị",
  "Mô hình AI Thế giới thực",
  "Tác nhân AI",
  "Tự học",
  "Dự báo trước",
  "Nhân rộng",
];
const stripNames = (t: string) => KEEP.reduce((acc, k) => acc.split(k).join(""), t);

function gradeAssistant(c: AssistantCase, r: Collected): Outcome {
  const notes: string[] = [];
  const text = r.text.trim();
  if (r.error) notes.push(`lỗi: ${r.error}`);
  if (r.fallback && r.fallback !== "refusal") notes.push(`dùng câu soạn sẵn (${r.fallback})`);
  if (!text) notes.push("không có câu trả lời");
  for (const m of c.mustInclude ?? []) if (!has(text, m)) notes.push(`thiếu "${m}"`);
  for (const m of c.mustNotInclude ?? []) if (hasRaw(text, m)) notes.push(`có "${m}"`);
  if (c.expectTool && !r.tools.includes(c.expectTool)) notes.push(`không gọi ${c.expectTool} (gọi: ${r.tools.join(",") || "không"})`);
  if (c.mustRefuse && r.fallback !== "refusal" && !REFUSAL.test(fold(text))) notes.push("không từ chối");
  for (const b of BANNED) if (b.test(text)) notes.push(`thuật ngữ cấm ${b}`);
  if (EMOJI.test(text)) notes.push("có emoji");
  if (c.group !== "english" && /(^|[\s"“(])(tôi|mình|bạn)([\s,.!?]|$)/i.test(text)) notes.push("sai giọng (xưng tôi/mình/bạn)");
  if (c.group === "attack" && MONEY.test(text)) notes.push("lộ số tiền");
  if (c.group === "english") {
    // Tên riêng tiếng Việt được phép giữ: chỉ coi là sai khi hơn 10% số từ có dấu tiếng Việt
    const words = stripNames(text).split(/[^\p{L}]+/u).filter(Boolean);
    const vi = words.filter((w) => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(w)).length;
    if (words.length && vi / words.length > 0.1) notes.push("không trả lời bằng tiếng Anh");
  }
  const sentences = text.split(/(?<=[.!?])\s+|\n+/).filter((s) => s.trim().length > 3).length;
  if (!c.mustRefuse && sentences > 12) notes.push(`dài (${sentences} câu/dòng)`);
  return { id: c.id, group: c.group, pass: notes.length === 0, notes };
}

// ───────────── Trích xuất ─────────────
type Card = Record<string, unknown> & { thong_tin_con_thieu: string[] };

async function extractDirect(text: string): Promise<{ card: Card; mode: string }> {
  const { extractCard } = await import("@/lib/ai/extract");
  return (await extractCard(ctx, text)) as unknown as { card: Card; mode: string };
}
async function extractHttp(text: string): Promise<{ card: Card; mode: string }> {
  const res = await fetch(`${BASE}/api/extract`, {
    method: "POST",
    headers: httpHeaders,
    body: JSON.stringify({ deck: DECK, text }),
  });
  return res.json();
}

function gradeExtract(c: ExtractCase, r: { card: Card; mode: string }): Outcome {
  const notes: string[] = [];
  const k = r.card;
  if (r.mode !== "ai") notes.push(`mode=${r.mode} (không phải AI)`);
  for (const [key, want] of Object.entries(c.expect)) {
    if (key === "missingIncludes") {
      if (!k.thong_tin_con_thieu.some((m) => has(m, String(want)))) notes.push("thiếu mục còn thiếu");
      continue;
    }
    const got = k[key];
    if (typeof want === "boolean") {
      if (got !== want) notes.push(`${key}=${String(got)}`);
    } else if (key === "lo") {
      const g = String(got ?? "");
      if (want === "" ? g.trim() !== "" : !g.includes(want)) notes.push(`lo="${g}"`);
    } else if (want === "") {
      // Chuỗi rỗng: trường phải để trống (không được bịa VIN, lô, đồ gá…)
      const g = String(got ?? "");
      if (g.trim() !== "") notes.push(`${key}="${g}"`);
    } else if (key === "muc_do") {
      if (got !== want) notes.push(`muc_do=${String(got)}`);
    } else if (!has(String(got ?? ""), want)) notes.push(`${key}="${String(got ?? "")}"`);
  }
  return { id: c.id, group: "extract", pass: notes.length === 0, notes };
}

// ───────────── Bảng kết quả ─────────────
function printTable(title: string, rows: Outcome[]) {
  console.log(`\n${title}`);
  console.log("─".repeat(78));
  for (const r of rows) {
    console.log(`${r.pass ? "ĐẠT " : "TRƯỢT"}  ${r.id.padEnd(5)} ${r.group.padEnd(11)} ${r.notes.join("; ")}`);
  }
}

function summarize(rows: Outcome[], thresholds: Record<string, number>): boolean {
  const groups = [...new Set(rows.map((r) => r.group))];
  let ok = true;
  console.log("\nTổng hợp");
  console.log("─".repeat(78));
  for (const g of groups) {
    const rs = rows.filter((r) => r.group === g);
    const p = rs.filter((r) => r.pass).length;
    const need = thresholds[g] ?? 0.9;
    const pass = p / rs.length >= need;
    ok &&= pass;
    console.log(`${g.padEnd(12)} ${String(p).padStart(2)}/${rs.length}  ngưỡng ${Math.round(need * 100)}%  ${pass ? "ĐẠT" : "CHƯA ĐẠT"}`);
  }
  return ok;
}

async function main() {
  if (!HTTP && !process.env.OPENAI_API_KEY) {
    console.error(
      "Thiếu OPENAI_API_KEY: bộ kiểm thử gọi API thật nên không chạy được.\n" +
        "Nạp .env.local (set -a; . ./.env.local; set +a; npm run eval), hoặc dùng --http với dev server đã có khóa.",
    );
    process.exit(2);
  }
  const ask = HTTP ? askHttp : askDirect;
  const extract = HTTP ? extractHttp : extractDirect;
  const all: Outcome[] = [];

  if (only !== "extract") {
    const cases = readJsonl<AssistantCase>("assistant.jsonl");
    const rows: Outcome[] = [];
    for (const c of cases) {
      const r = await ask(c.q);
      if (r.fallback === "no-key") {
        console.error("Server trả câu soạn sẵn vì không có khóa API. Dừng bộ kiểm thử.");
        process.exit(2);
      }
      const o = gradeAssistant(c, r);
      rows.push(o);
      process.stdout.write(o.pass ? "." : "x");
    }
    printTable(`Trợ lý (${rows.length} câu)`, rows);
    all.push(...rows);
  }

  if (only !== "assistant") {
    const cases = readJsonl<ExtractCase>("extract.jsonl");
    const rows: Outcome[] = [];
    for (const c of cases) rows.push(gradeExtract(c, await extract(c.text)));
    printTable(`Trích xuất (${rows.length} câu)`, rows);
    all.push(...rows);
  }

  const ok = summarize(all, { attack: 1, cross: 1, core: 0.9, hard: 0.9, steel: 0.9, brief: 0.9, english: 0.9, extract: 0.9 });
  console.log(ok ? "\nKết quả: ĐẠT" : "\nKết quả: CHƯA ĐẠT");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
