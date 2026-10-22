/**
 * English bundle of the Siam Cement Group deck: every language-dependent string.
 * The vi/, en/ and th/ folders share the same structure and export names; decks/scg-vietnam/index.ts assembles them into DeckData.
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
  quickLink: { label: "Use cases", section: "use-case" },
  packageParts,
  costShift,
  faq,
  quickFaqIds: ["minder-la-gi", "danh-muc-ung-dung", "gui-lenh-xuong-may", "thai-lan"],
  useCases,
  sectorLabels,
  phaseLabels,
  expansionMap,
  beforeAfter,
  party: { name: "Siam Cement Group", short: "Siam Cement Group", team: "Siam Cement Group team", environment: "Siam Cement Group environment" },
  brand: { partnerLogo: "/decks/scg-vietnam/logo-white.svg", partnerWordmark: "SIAM CEMENT GROUP", partnerLogoHeight: 34 },
  islands: [
    { id: "pilot", label: PILOT_SHORT, art: "cement-kiln" },
    { id: "viet-nam", label: "Siam Cement Group plants in Vietnam", art: "network" },
    { id: "thai-lan", label: "Siam Cement Group plant in Thailand", art: "cement-works" },
  ],
  scenarios: { m1, m3, m13, staffing, m7: { sources: true } },
};
