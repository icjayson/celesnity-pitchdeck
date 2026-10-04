/**
 * Deck Isuzu Việt Nam (/isuzu-vietnam): gom toàn bộ dữ liệu trang thành một DeckData.
 * Chỉ import ở server (app/[deck], lib/ai qua decks/registry.ts); component đọc qua useDeck().
 */
import type { DeckData } from "../types";
import { acts, appendix, benefits, closing, costShift, labels, meta, packageParts, parkedSections, sections } from "./content.vi";
import { faq } from "./faq";
import { beforeAfter, expansionMap, phaseLabels, sectorLabels, useCases } from "./usecases";
import { m1, m10, m13, m17, m19, m3, m5, m6, roadmap, staffing } from "./scenarios";

export const isuzuVietnamDeck: DeckData = {
  slug: "isuzu-vietnam",
  basePath: "/isuzu-vietnam",
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
  quickFaqIds: ["vi-sao-bat-dau-tu-body", "ai-co-thay-qa-khong", "du-lieu-roi-vn", "bo-de-thi"],
  useCases,
  sectorLabels,
  phaseLabels,
  expansionMap,
  beforeAfter,
  party: { name: "Isuzu Việt Nam", short: "Isuzu", team: "Đội IT Isuzu", environment: "Môi trường Isuzu" },
  brand: { partnerWordmark: "ISUZU VIỆT NAM" },
  islands: [
    { id: "body", label: "Công đoạn BODY", art: "truck-line" },
    { id: "go-vap", label: "Toàn nhà máy Gò Vấp", art: "truck-plant" },
    { id: "ngoai-cong", label: "Đại lý và hậu mãi", art: "dealer-network" },
  ],
  scenarios: { m5, m6, m10, roadmap, staffing, m17, m13, m3, m1, m19 },
};
