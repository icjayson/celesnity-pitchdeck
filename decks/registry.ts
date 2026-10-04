/**
 * Danh sách deck (chỉ dùng ở server). Thêm khách hàng mới: tạo decks/<slug>/ rồi thêm vào decks/all.ts.
 * Không import file này từ component phía trình duyệt: mỗi trang chỉ nhận deck của mình qua DeckProvider.
 */
import "server-only";
import type { DeckAssistant, DeckData } from "./types";
import { allAssistants, allDecks } from "./all";

const has = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

export const deckSlugs = Object.keys(allDecks);

export function getDeck(slug: string): DeckData | null {
  return has(allDecks, slug) ? allDecks[slug] : null;
}

export function listDecks(): DeckData[] {
  return Object.values(allDecks);
}

/** Trợ lý AI của từng deck (ngữ cảnh riêng, không dùng chung) */
export function getAssistant(slug: string): DeckAssistant | null {
  return has(allAssistants, slug) ? allAssistants[slug] : null;
}
