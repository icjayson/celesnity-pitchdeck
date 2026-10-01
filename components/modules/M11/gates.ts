/** Đọc bảng "Bảng tiêu chí đầy đủ của bốn cổng" trong section `phong-thi` thành cấu trúc cho M11. */
import { sections } from "@/content/content.vi";
import { plainText } from "@/components/shared/RichText";

export type Criterion = {
  name: string;
  /** Văn bản ngưỡng đầy đủ (giữ **đậm**) */
  detail: string;
  /** Con số/ngưỡng nổi bật, ví dụ "≥20%"; null nếu là điều kiện chữ */
  headline: string | null;
  who: string;
};

export type Gate = { n: number; month: string; note: string | null; title: string; criteria: Criterion[] };

function headlineOf(text: string): string | null {
  const num = /≥\s?[\d.,]+%?|\d+–\d+%/;
  const bold = /\*\*([^*]+)\*\*/.exec(text)?.[1];
  if (bold) {
    const m = num.exec(bold);
    if (m) return m[0].replace(/\s/g, "");
    if (bold.length <= 22) return bold;
  }
  const m = num.exec(text);
  return m ? m[0].replace(/\s/g, "") : null;
}

function parse(): Gate[] {
  const sec = sections.find((s) => s.id === "phong-thi");
  const det = sec?.details?.find((d) => plainText(d.title).startsWith("Bảng tiêu chí đầy đủ"));
  const table = det?.blocks.find((b) => b.kind === "table");
  if (!table || table.kind !== "table") return [];
  const gates: Gate[] = [];
  for (const row of table.rows) {
    const [g, name, detail, who] = row;
    if (g && g.trim()) {
      const title = plainText(g);
      const m = /Cổng\s+(\d+)\s*\((T\d+)\)(?:,\s*(.+))?/.exec(title);
      gates.push({ n: m ? +m[1] : gates.length + 1, month: m?.[2] ?? "", note: m?.[3] ?? null, title, criteria: [] });
    }
    const cur = gates[gates.length - 1];
    if (!cur) continue;
    cur.criteria.push({ name: plainText(name), detail, headline: headlineOf(detail), who: plainText(who) });
  }
  return gates;
}

export const gates: Gate[] = parse();
