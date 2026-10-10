/**
 * Deck Takako (/takako-vietnam): gom toàn bộ dữ liệu trang thành một DeckData.
 * Deck này không xây quanh Mô hình AI Thế giới thực: không có use case M18 hay lộ trình 12 tháng M10.
 * Trung tâm là M20 "Minder AI làm việc"; bản đồ ba giai đoạn (M8) dùng lõi "Minder AI".
 * Chỉ import ở server (app/[deck] qua decks/registry.ts); component đọc qua useDeck().
 */
import type { DeckData } from "../types";
import { acts, appendix, benefits, closing, costShift, labels, meta, packageParts, parkedSections, sections } from "./content.vi";
import { faq } from "./faq";
import { m20, m21, roadmap, staffing } from "./scenarios";

export const takakoDeck: DeckData = {
  slug: "takako-vietnam",
  basePath: "/takako-vietnam",
  meta,
  features: { assistant: true },
  acts,
  labels,
  sections,
  parkedSections,
  appendix,
  closing,
  quickLink: { label: "Bước tiếp theo", section: "hop-tac" },
  benefits,
  packageParts,
  costShift,
  faq,
  quickFaqIds: ["minder-ai-la-gi", "chinh-xac", "du-lieu-ra-ngoai", "bat-dau-the-nao"],
  useCases: [],
  sectorLabels: {},
  phaseLabels: { pilot: "Giai đoạn 1", "dung-that": "Giai đoạn 2", "nhan-rong": "Giai đoạn 3", "nam-2": "Sau Giai đoạn 3" },
  expansionMap: [],
  beforeAfter: {},
  party: { name: "Takako", short: "Takako", team: "Đội Takako", environment: "Môi trường Takako" },
  brand: { partnerWordmark: "TAKAKO", coreLabel: "Minder AI" },
  islands: [
    { id: "gd1", label: "Ba phần việc", art: "machining-cell" },
    { id: "gd2", label: "Mở rộng ứng dụng", art: "machining-plant" },
    { id: "gd3", label: "Nhà máy thứ hai", art: "second-plant" },
  ],
  scenarios: { m20, m21, roadmap, staffing },
};
