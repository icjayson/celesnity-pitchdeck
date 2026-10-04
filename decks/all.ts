/**
 * Bảng tất cả deck, dùng cho script và evals chạy ngoài Next (tsx). Ứng dụng dùng decks/registry.ts (chỉ server).
 * Không import file này từ component phía trình duyệt.
 */
import type { DeckAssistant, DeckData } from "./types";
import { hoaPhatDeck } from "./hoa-phat";
import { hoaPhatAssistant } from "./hoa-phat/assistant";
import { nestleVietnamDeck } from "./nestle-vietnam";
import { nestleAssistant } from "./nestle-vietnam/assistant";

export const allDecks: Record<string, DeckData> = {
  [hoaPhatDeck.slug]: hoaPhatDeck,
  [nestleVietnamDeck.slug]: nestleVietnamDeck,
};

export const allAssistants: Record<string, DeckAssistant> = {
  [hoaPhatDeck.slug]: hoaPhatAssistant,
  [nestleVietnamDeck.slug]: nestleAssistant,
};

/** Tệp nội dung gốc (markdown) của mỗi deck, dùng cho npm run content:check */
export const deckSources: Record<string, string> = {
  "hoa-phat": "docs/content-v4.md",
  "nestle-vietnam": "docs/nestle-content-v2.md",
};

/** Tên riêng của khách hàng khác không được xuất hiện trong deck này (npm run leak:check) */
export const forbiddenTerms: Record<string, string[]> = {
  "hoa-phat": ["Nestlé", "Nestle", "Trị An", "Dolce Gusto", "NESCAFÉ", "Bình An", "Bông Sen"],
  "nestle-vietnam": ["Hòa Phát", "Hoa Phat", "Hòa Mạc", "Dung Quất", "Funiki", "bếp từ", "Phú Mỹ"],
};
