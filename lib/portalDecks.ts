/**
 * Danh sách deck PDF của cổng chọn ở trang gốc (/), chuyển từ minder-decks.vercel.app (/api/deck-portal/public).
 * File PDF nằm trong public/briefings/ (công khai, không cần mã truy cập).
 * Thêm hoặc thay deck: chép PDF vào public/briefings/ rồi sửa mảng PORTAL_DECKS. Mỗi tổ hợp audience × depth × locale nên có đúng một deck.
 */
export type Audience = "investor" | "buyer";
export type Depth = "non-technical" | "technical";
export type Locale = "en" | "vi";

export type PortalDeck = {
  audience: Audience;
  depth: Depth;
  locale: Locale;
  title: string;
  url: string;
};

const DIR = "/briefings";

export const PORTAL_DECKS: PortalDeck[] = [
  {
    audience: "investor",
    depth: "non-technical",
    locale: "en",
    title: "Celesnity · World Model Fundraising Deck",
    url: `${DIR}/investor-non-technical.pdf`,
  },
  {
    audience: "investor",
    depth: "technical",
    locale: "en",
    title: "Minder AI · Technical Investor Deck",
    url: `${DIR}/investor-technical.pdf`,
  },
  {
    audience: "buyer",
    depth: "non-technical",
    locale: "en",
    title: "Celesnity · Minder Applications, UK & Europe Introduction",
    url: `${DIR}/buyer-non-technical-en.pdf`,
  },
  {
    audience: "buyer",
    depth: "technical",
    locale: "en",
    title: "Minder AI · For Technology Leaders",
    url: `${DIR}/buyer-technical-en.pdf`,
  },
  {
    audience: "buyer",
    depth: "non-technical",
    locale: "vi",
    title: "Minder AI · Dành cho Lãnh đạo Vận hành",
    url: `${DIR}/buyer-non-technical-vi.pdf`,
  },
  {
    audience: "buyer",
    depth: "technical",
    locale: "vi",
    title: "Minder AI · Dành cho Lãnh đạo Công nghệ",
    url: `${DIR}/buyer-technical-vi.pdf`,
  },
];

export function findDeck(audience: Audience, depth: Depth, locale: Locale): PortalDeck | undefined {
  return PORTAL_DECKS.find((d) => d.audience === audience && d.depth === depth && d.locale === locale);
}
