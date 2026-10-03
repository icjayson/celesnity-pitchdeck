/**
 * Gói tri thức của trợ lý, sinh tự động từ content.vi.ts + content/faq.ts + hồ sơ đề xuất đã tóm lược
 * (content/knowledge/hoaphat-brief.ts, từ ba tài liệu gốc gửi Hòa Phát).
 * Kết quả là một chuỗi cố định (xác định, không chứa thời gian hay id) để tận dụng prompt caching.
 */
import { appendix, benefits, closing, meta, packageParts, sections } from "@/content/content.vi";
import { faq } from "@/content/faq";
import { hoaphatBrief } from "@/content/knowledge/hoaphat-brief";
import type { Block } from "@/content/types";
import { plainText } from "@/components/shared/RichText";

const moduleNotes: Record<string, string> = {
  M4: "[Module tương tác: buồng mô phỏng quyết định, chạy được bằng tool run_simulation với phương án A, B, C hoặc ncc-moi]",
  M6: "[Module tương tác: \"Thử làm công nhân\", người xem nói hoặc gõ lời báo lỗi, AI thật trích xuất thẻ hồ sơ; phần xếp hạng lô là mô phỏng minh họa]",
  M9: "[Module tương tác: bộ khám phá use case, mở thẻ bằng tool open_use_case (UC0…UC5, nhan-rong, thep)]",
  M10: "[Module tương tác: thanh kéo 12 tháng, đặt bằng tool set_timeline_month (1–12)]",
  M12: "[Module tương tác: máy tính giá trị, điền bằng tool set_calculator; tính toán chạy trên trình duyệt]",
};

function rowsText(head: string[] | undefined, rows: string[][], caption?: string): string {
  const all = [...(head ? [head] : []), ...rows].filter((r) => r.some((c) => c.trim()));
  const out = all.map((r) => "| " + r.map((c) => plainText(c) || "·").join(" | ") + " |").join("\n");
  return (caption ? `${plainText(caption)}\n` : "") + out;
}

/**
 * Chuyển một khối nội dung thành văn bản thuần. Các kiểu khối mới (bảng dạng thẻ, bước, dòng thời gian…)
 * được xử lý chung theo hình dạng dữ liệu (rows / items / text) để gói tri thức không bỏ sót nội dung.
 */
function blockText(b: Block): string {
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
    case "statement":
      return [b.context, b.highlight, b.conclusion].map(plainText).join(" ");
  }
  const g = b as { text?: string; items?: string[]; ordered?: boolean; head?: string[]; rows?: string[][]; caption?: string };
  if (Array.isArray(g.rows)) return rowsText(g.head, g.rows, g.caption);
  if (Array.isArray(g.items)) return g.items.map((it, i) => `${g.ordered ? `${i + 1}.` : "-"} ${plainText(it)}`).join("\n");
  if (typeof g.text === "string") return plainText(g.text);
  return "";
}

function blocksText(blocks: Block[]): string {
  return blocks.map(blockText).filter(Boolean).join("\n\n");
}

function build(): string {
  const parts: string[] = [];
  parts.push(`# PHẦN A · TRANG ĐỀ XUẤT (nguồn chính)\n\n# ${meta.title}\n${meta.description}\nKhẩu hiệu: ${meta.tagline}`);

  parts.push(
    "## Bảng ánh xạ section (id → chủ đề)\n" +
      sections.map((s) => `- ${s.id}: ${plainText(s.eyebrow)} — ${plainText(s.title)}`).join("\n"),
  );

  for (const s of sections) {
    let t = `## Section ${s.id}: ${plainText(s.eyebrow)}\n### ${plainText(s.title)}\n\n${blocksText(s.blocks)}`;
    for (const d of s.details ?? []) t += `\n\n### Chi tiết: ${plainText(d.title)}\n\n${blocksText(d.blocks)}`;
    parts.push(t);
  }

  parts.push(
    `## Đoạn kết\n${plainText(closing.headline)}\n${plainText(closing.lead)} ${plainText(closing.story)}\n${plainText(closing.tagline)} ${plainText(closing.owner)} ${plainText(closing.thanks)}`,
  );

  parts.push(
    "## Lợi ích hai bên (section hai-ben)\n" +
      [benefits.hoaPhat, benefits.celesnity]
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

  for (const a of appendix) parts.push(`## Phụ lục ${a.id}: ${plainText(a.title)}\n\n${blocksText(a.blocks)}`);

  parts.push(
    "## Câu hỏi thường gặp và câu trả lời chuẩn\n" +
      faq.map((f) => `H: ${f.q}\nĐ: ${f.a}\n(Section liên quan: ${f.section ?? "không có"})`).join("\n\n"),
  );

  parts.push(
    "# PHẦN B · HỒ SƠ ĐỀ XUẤT CHI TIẾT (bổ sung; khi khác với PHẦN A thì theo PHẦN A)\n\n" + hoaphatBrief,
  );

  return parts.join("\n\n---\n\n");
}

/** Gói tri thức (tính một lần mỗi tiến trình). */
export const knowledgePack: string = build();
