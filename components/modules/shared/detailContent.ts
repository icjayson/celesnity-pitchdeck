import { parkedSections, sections } from "@/content/content.vi";
import type { Block } from "@/content/types";

/** Lấy khối trong lớp "Xem chi tiết" của một section (theo tiêu đề), để module dùng đúng câu chữ nguồn. */
function detailBlocks(sectionId: string, title: string): Block[] {
  // tìm cả trong các section tạm cất (hiển thị ở /v1)
  const s = [...sections, ...parkedSections].find((x) => x.id === sectionId);
  const d = s?.details?.find((x) => x.title === title);
  return d?.blocks ?? [];
}

export function detailTable(sectionId: string, title: string): { head: string[]; rows: string[][] } {
  const t = detailBlocks(sectionId, title).find((b) => b.kind === "table");
  return t && t.kind === "table" ? { head: t.head, rows: t.rows } : { head: [], rows: [] };
}

export function detailList(sectionId: string, title: string): string[] {
  const l = detailBlocks(sectionId, title).find((b) => b.kind === "list");
  return l && l.kind === "list" ? l.items : [];
}
