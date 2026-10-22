/**
 * ชุดภาษาไทยของ deck Siam Cement Group: ข้อความทั้งหมดที่ขึ้นกับภาษา
 * โฟลเดอร์ en/ vi/ และ th/ มีโครงสร้างและชื่อ export เดียวกัน decks/scg-vietnam/index.ts ประกอบเป็น DeckData
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
  quickLink: { label: "กรณีการใช้งาน", section: "use-case" },
  packageParts,
  costShift,
  faq,
  quickFaqIds: ["minder-la-gi", "danh-muc-ung-dung", "gui-lenh-xuong-may", "thai-lan"],
  useCases,
  sectorLabels,
  phaseLabels,
  expansionMap,
  beforeAfter,
  party: { name: "Siam Cement Group", short: "Siam Cement Group", team: "ทีม Siam Cement Group", environment: "สภาพแวดล้อมของ Siam Cement Group" },
  brand: { partnerLogo: "/decks/scg-vietnam/logo-white.svg", partnerWordmark: "SIAM CEMENT GROUP", partnerLogoHeight: 34 },
  islands: [
    { id: "pilot", label: PILOT_SHORT, art: "cement-kiln" },
    { id: "viet-nam", label: "โรงงาน Siam Cement Group ในเวียดนาม", art: "network" },
    { id: "thai-lan", label: "โรงงาน Siam Cement Group ในประเทศไทย", art: "cement-works" },
  ],
  scenarios: { m1, m3, m13, staffing, m7: { sources: true } },
};
