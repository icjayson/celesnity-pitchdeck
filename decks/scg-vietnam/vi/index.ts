/**
 * Gói tiếng Việt của deck Siam Cement Group: mọi câu chữ phụ thuộc ngôn ngữ.
 * Thư mục en/ và th/ có cùng cấu trúc và cùng tên export; decks/scg-vietnam/index.ts ráp thành DeckData.
 */
import type { DeckData } from "../../types";
import { acts, appendix, benefits, closing, costShift, labels, meta, packageParts, parkedSections, sections } from "./content";
import { faq } from "./faq";
import { beforeAfter, expansionMap, phaseLabels, sectorLabels, useCases } from "./usecases";
import { m1, m13, m3, staffing } from "./scenarios";
import { PILOT_SHORT } from "./places";

export const bundle: Omit<DeckData, "slug" | "basePath" | "locale" | "languages"> = {
  meta,
  acts,
  labels,
  sections,
  parkedSections,
  appendix,
  closing,
  benefits,
  quickLink: { label: "Use case", section: "use-case" },
  packageParts,
  costShift,
  faq,
  quickFaqIds: ["minder-la-gi", "danh-muc-ung-dung", "gui-lenh-xuong-may", "thai-lan"],
  useCases,
  sectorLabels,
  phaseLabels,
  expansionMap,
  beforeAfter,
  party: { name: "Siam Cement Group", short: "Siam Cement Group", team: "Đội Siam Cement Group", environment: "Môi trường Siam Cement Group" },
  brand: { partnerLogo: "/decks/scg-vietnam/logo-white.svg", partnerWordmark: "SIAM CEMENT GROUP", partnerLogoHeight: 34 },
  islands: [
    { id: "pilot", label: PILOT_SHORT, art: "cement-kiln" },
    { id: "viet-nam", label: "Các nhà máy Siam Cement Group tại Việt Nam", art: "network" },
    { id: "thai-lan", label: "Nhà máy Siam Cement Group tại Thái Lan", art: "cement-works" },
  ],
  scenarios: { m1, m3, m13, staffing, m7: { sources: true } },
};
