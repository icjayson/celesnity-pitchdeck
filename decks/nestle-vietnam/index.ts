/**
 * Deck Nestlé Trị An (/nestle-vietnam): gom toàn bộ dữ liệu trang thành một DeckData.
 * Chỉ import ở server (app/[deck], lib/ai qua decks/registry.ts); component đọc qua useDeck().
 */
import type { DeckData } from "../types";
import { acts, appendix, benefits, closing, costShift, labels, meta, packageParts, parkedSections, sections } from "./content.vi";
import { faq } from "./faq";
import { beforeAfter, expansionMap, phaseLabels, sectorLabels, useCases } from "./usecases";
import { m1, m10, m13, m17, m3, m5, m6, roadmap, staffing } from "./scenarios";

export const nestleVietnamDeck: DeckData = {
  slug: "nestle-vietnam",
  basePath: "/nestle-vietnam",
  meta,
  acts,
  labels,
  sections,
  parkedSections,
  appendix,
  closing,
  benefits,
  packageParts,
  costShift,
  faq,
  quickFaqIds: ["ba-use-case", "du-lieu-can", "khong-lam", "gia-tri-do"],
  useCases,
  sectorLabels,
  phaseLabels,
  expansionMap,
  beforeAfter,
  party: { name: "Nhà máy Nestlé Trị An", short: "Nhà máy Trị An", team: "Đội ngũ IT của nhà máy Trị An", environment: "Môi trường Nestlé" },
  brand: { partnerLogo: "/decks/nestle-vietnam/logo-white.svg", partnerWordmark: "NESTLÉ TRỊ AN", partnerLogoHeight: 46 },
  islands: [
    { id: "dolce-gusto", label: "Dây chuyền Dolce Gusto", art: "capsule-line" },
    { id: "tri-an", label: "Toàn nhà máy Trị An", art: "coffee-plant" },
    { id: "nestle-vn", label: "Nestlé Việt Nam", art: "network" },
  ],
  scenarios: { m5, m6, m10, roadmap, staffing, m17, m13, m3, m1 },
};
