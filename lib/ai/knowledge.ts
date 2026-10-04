/**
 * Gói tri thức của trợ lý cho MỘT deck: sinh từ nội dung trang, câu hỏi thường gặp và hồ sơ đề xuất của chính deck đó.
 * Không trộn nội dung giữa các khách hàng. Kết quả là chuỗi cố định (không thời gian, không id) để tận dụng prompt caching.
 */
import type { Block, DeckAssistant, DeckData } from "@/decks/types";
import { plainText } from "@/components/shared/RichText";

function rowsText(head: string[] | undefined, rows: string[][], caption?: string): string {
  const all = [...(head ? [head] : []), ...rows].filter((r) => r.some((c) => c.trim()));
  const out = all.map((r) => "| " + r.map((c) => plainText(c) || "·").join(" | ") + " |").join("\n");
  return (caption ? `${plainText(caption)}\n` : "") + out;
}

/**
 * Chuyển một khối nội dung thành văn bản thuần. Các kiểu khối mới (bảng dạng thẻ, bước, dòng thời gian…)
 * được xử lý chung theo hình dạng dữ liệu (rows / items / text) để gói tri thức không bỏ sót nội dung.
 */
function blockText(b: Block, moduleNotes: Record<string, string>): string {
  switch (b.kind) {
    case "h3":
      return `#### ${plainText(b.text)}`;
    case "label":
      return `(Nhãn: ${plainText(b.text)})`;
    case "flow":
      return b.steps.map(plainText).join(" → ") + (b.caption ? `\n${plainText(b.caption)}` : "");
    case "signature":
      return b.lines.map(plainText).join(" ");
    case "module":
      return moduleNotes[b.id] ?? "";
    case "photo":
      return b.photo.caption ? `(Ảnh: ${plainText(b.photo.caption)})` : "";
    case "media":
      return [b.photo.caption ? `(Ảnh: ${plainText(b.photo.caption)})` : "", ...b.blocks.map((x) => blockText(x, moduleNotes))].filter(Boolean).join("\n\n");
    case "statement":
      return [b.context, b.highlight, b.conclusion].map(plainText).join(" ");
  }
  const g = b as { text?: string; items?: string[]; ordered?: boolean; head?: string[]; rows?: string[][]; caption?: string };
  if (Array.isArray(g.rows)) return rowsText(g.head, g.rows, g.caption);
  if (Array.isArray(g.items)) return g.items.map((it, i) => `${g.ordered ? `${i + 1}.` : "-"} ${plainText(it)}`).join("\n");
  if (typeof g.text === "string") return plainText(g.text);
  return "";
}

function blocksText(blocks: Block[], notes: Record<string, string>): string {
  return blocks.map((b) => blockText(b, notes)).filter(Boolean).join("\n\n");
}

/** Gói tri thức của một deck (tính lại mỗi lần gọi; lib/ai/prompt.ts lưu kết quả theo slug). */
export function buildKnowledgePack(deck: DeckData, assistant: DeckAssistant): string {
  const { meta, sections, closing, benefits, packageParts, appendix, faq } = deck;
  const notes = assistant.moduleNotes;
  const parts: string[] = [];
  parts.push(`# PHẦN A · TRANG ĐỀ XUẤT (nguồn chính)\n\n# ${meta.title}\n${meta.description}\nKhẩu hiệu: ${meta.tagline}`);

  parts.push(
    "## Bảng ánh xạ section (id → chủ đề)\n" +
      sections.map((s) => `- ${s.id}: ${plainText(s.eyebrow)} — ${plainText(s.title)}`).join("\n"),
  );

  for (const s of sections) {
    let t = `## Section ${s.id}: ${plainText(s.eyebrow)}\n### ${plainText(s.title)}\n\n${blocksText(s.blocks, notes)}`;
    for (const d of s.details ?? []) t += `\n\n### Chi tiết: ${plainText(d.title)}\n\n${blocksText(d.blocks, notes)}`;
    parts.push(t);
  }

  parts.push(
    `## Đoạn kết\n${plainText(closing.headline)}\n${plainText(closing.lead)} ${plainText(closing.story)}\n${plainText(closing.tagline)} ${plainText(closing.owner)} ${plainText(closing.thanks)}`,
  );

  parts.push(
    "## Lợi ích hai bên (section hai-ben)\n" +
      [benefits.partner, benefits.celesnity]
        .map(
          (p) =>
            `${p.name} nhận: ${p.receive.map(plainText).join("; ")}.\n${p.name} góp: ${p.give.map(plainText).join("; ")}.`,
        )
        .join("\n"),
  );

  parts.push(
    "## Ba thành phần của gói (section hop-tac)\n" +
      packageParts.map((p) => `${p.n} ${plainText(p.name)}: ${plainText(p.body)}`).join("\n"),
  );

  for (const a of appendix) parts.push(`## Phụ lục ${a.id}: ${plainText(a.title)}\n\n${blocksText(a.blocks, notes)}`);

  parts.push(
    "## Câu hỏi thường gặp và câu trả lời chuẩn\n" +
      faq.map((f) => `H: ${f.q}\nĐ: ${f.a}\n(Section liên quan: ${f.section ?? "không có"})`).join("\n\n"),
  );

  parts.push(
    "# PHẦN B · HỒ SƠ ĐỀ XUẤT CHI TIẾT (bổ sung; khi khác với PHẦN A thì theo PHẦN A)\n\n" + assistant.knowledgeBrief,
  );

  return parts.join("\n\n---\n\n");
}

