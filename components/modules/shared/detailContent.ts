import type { Block } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";

/** Lấy khối trong lớp "Xem chi tiết" của một section (theo tiêu đề), để module dùng đúng câu chữ nguồn của deck. */
function useDetailBlocks(sectionId: string, title: string | RegExp): Block[] {
  const { sections, parkedSections } = useDeck();
  // tìm cả trong các section tạm cất (hiển thị ở /v1)
  const s = [...sections, ...parkedSections].find((x) => x.id === sectionId);
  const d = s?.details?.find((x) => (typeof title === "string" ? x.title === title : title.test(x.title)));
  return d?.blocks ?? [];
}

export function useDetailTable(sectionId: string, title: string): { head: string[]; rows: string[][] } {
  const t = useDetailBlocks(sectionId, title).find((b) => b.kind === "table");
  return t && t.kind === "table" ? { head: t.head, rows: t.rows } : { head: [], rows: [] };
}

export function useDetailList(sectionId: string, title: string | RegExp): string[] {
  const l = useDetailBlocks(sectionId, title).find((b) => b.kind === "list");
  return l && l.kind === "list" ? l.items : [];
}
