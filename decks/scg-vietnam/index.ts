/**
 * Deck Siam Cement Group, ba bản ngôn ngữ cùng nội dung:
 * /scg-vietnam (tiếng Anh, mặc định) · /scg-vietnam-vi (tiếng Việt) · /scg-vietnam-th (tiếng Thái).
 * Câu chữ của từng ngôn ngữ nằm trong en/, vi/, th/ (cùng cấu trúc, cùng tên export).
 * Chỉ import ở server (app/[deck], lib/ai qua decks/registry.ts); component đọc qua useDeck().
 */
import type { DeckData, Locale } from "../types";
import { bundle as en } from "./en";
import { bundle as vi } from "./vi";
import { bundle as th } from "./th";

export const SCG_LANGUAGES: NonNullable<DeckData["languages"]> = [
  { code: "en", label: "English", href: "/scg", flag: "🇬🇧" },
  { code: "th", label: "ไทย", href: "/scg-th", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", href: "/scg-vi", flag: "🇻🇳" },
];

const make = (slug: string, locale: Locale, b: typeof vi): DeckData => ({ ...b, slug, basePath: `/${slug}`, locale, languages: SCG_LANGUAGES });

export const scgDeck = make("scg", "en", en);
export const scgDeckVi = make("scg-vi", "vi", vi);
export const scgDeckTh = make("scg-th", "th", th);
