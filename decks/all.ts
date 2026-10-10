/**
 * Bảng tất cả deck, dùng cho script và evals chạy ngoài Next (tsx). Ứng dụng dùng decks/registry.ts (chỉ server).
 * Không import file này từ component phía trình duyệt.
 */
import type { DeckAssistant, DeckData } from "./types";
import { hoaPhatDeck } from "./hoa-phat";
import { hoaPhatAssistant } from "./hoa-phat/assistant";
import { nestleVietnamDeck } from "./nestle-vietnam";
import { nestleAssistant } from "./nestle-vietnam/assistant";
import { isuzuVietnamDeck } from "./isuzu-vietnam";
import { isuzuAssistant } from "./isuzu-vietnam/assistant";
import { takakoDeck } from "./takako-vietnam";
import { takakoAssistant } from "./takako-vietnam/assistant";

export const allDecks: Record<string, DeckData> = {
  [hoaPhatDeck.slug]: hoaPhatDeck,
  [nestleVietnamDeck.slug]: nestleVietnamDeck,
  [isuzuVietnamDeck.slug]: isuzuVietnamDeck,
  [takakoDeck.slug]: takakoDeck,
};

export const allAssistants: Record<string, DeckAssistant> = {
  [hoaPhatDeck.slug]: hoaPhatAssistant,
  [nestleVietnamDeck.slug]: nestleAssistant,
  [isuzuVietnamDeck.slug]: isuzuAssistant,
  [takakoDeck.slug]: takakoAssistant,
};

/** Tệp nội dung gốc (markdown) của mỗi deck, dùng cho npm run content:check */
export const deckSources: Record<string, string> = {
  "hoa-phat": "docs/content-v4.md",
  "nestle-vietnam": "docs/nestle-content-v4.md",
  "isuzu-vietnam": "docs/isuzu-content-v1.md",
  "takako-vietnam": "docs/takako-content-v1.md",
};

/** Tên riêng của khách hàng khác không được xuất hiện trong deck này (npm run leak:check) */
export const forbiddenTerms: Record<string, string[]> = {
  "hoa-phat": ["Nestlé", "Nestle", "Trị An", "Dolce Gusto", "NESCAFÉ", "Bình An", "Bông Sen", "Isuzu", "Gò Vấp", "Monozukuri", "Asakai", "QKR", "D-MAX", "mu-X", "Takako"],
  "nestle-vietnam": ["Hòa Phát", "Hoa Phat", "Hòa Mạc", "Dung Quất", "Funiki", "bếp từ", "Phú Mỹ", "Isuzu", "Gò Vấp", "Monozukuri", "Asakai", "QKR", "D-MAX", "mu-X", "Takako"],
  "isuzu-vietnam": ["Hòa Phát", "Hoa Phat", "Hòa Mạc", "Dung Quất", "Funiki", "bếp từ", "Phú Mỹ", "Nestlé", "Nestle", "Trị An", "Dolce Gusto", "NESCAFÉ", "Bình An", "Bông Sen", "Takako"],
  /** Ngoài tên khách hàng khác: không nêu tên cá nhân phía Takako, không dùng "chatbot", "template cố định" */
  "takako-vietnam": ["Hòa Phát", "Hoa Phat", "Hòa Mạc", "Dung Quất", "Funiki", "bếp từ", "Phú Mỹ", "Nestlé", "Nestle", "Trị An", "Dolce Gusto", "NESCAFÉ", "Bình An", "Bông Sen", "Isuzu", "Gò Vấp", "Monozukuri", "Asakai", "QKR", "D-MAX", "mu-X", "anh Thảo", "chatbot", "template cố định"],
};
