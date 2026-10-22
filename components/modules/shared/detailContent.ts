import type { Block } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";

type DetailLike = { title: string; key?: string };

/** Khối chi tiết khớp `key` (ổn định qua các bản dịch) hoặc tiêu đề (deck cũ chưa đặt key) */
export function matchDetail(x: DetailLike, title: string | RegExp, key?: string) {
  if (key && x.key === key) return true;
  return typeof title === "string" ? x.title === title : title.test(x.title);
}

/** Lấy khối trong lớp "Xem chi tiết" của một section (theo key hoặc tiêu đề), để module dùng đúng câu chữ nguồn của deck. */
function useDetailBlocks(sectionId: string, title: string | RegExp, key?: string): Block[] {
  const { sections, parkedSections } = useDeck();
  // tìm cả trong các section tạm cất (hiển thị ở /v1)
  const s = [...sections, ...parkedSections].find((x) => x.id === sectionId);
  const d = s?.details?.find((x) => matchDetail(x, title, key));
  return d?.blocks ?? [];
}

export function useDetailTable(sectionId: string, title: string | RegExp, key?: string): { head: string[]; rows: string[][]; caption?: string } {
  const t = useDetailBlocks(sectionId, title, key).find((b) => b.kind === "table");
  return t && t.kind === "table" ? { head: t.head, rows: t.rows, caption: t.caption } : { head: [], rows: [] };
}

/** `sectionId` có thể là danh sách: lấy danh sách đầu tiên tìm thấy theo thứ tự đó. */
export function useDetailList(sectionId: string | string[], title: string | RegExp, key?: string): string[] {
  const { sections, parkedSections } = useDeck();
  const all = [...sections, ...parkedSections];
  for (const id of Array.isArray(sectionId) ? sectionId : [sectionId]) {
    const d = all.find((x) => x.id === id)?.details?.find((x) => matchDetail(x, title, key));
    const l = d?.blocks.find((b) => b.kind === "list");
    if (l && l.kind === "list") return l.items;
  }
  return [];
}
