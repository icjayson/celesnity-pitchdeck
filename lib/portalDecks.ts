/**
 * Danh sách deck PDF của cổng chọn ở trang gốc (/), chuyển từ minder-decks.vercel.app (/api/deck-portal/public).
 * Thêm hoặc thay deck: sửa mảng PORTAL_DECKS. Mỗi tổ hợp audience × depth × locale nên có đúng một deck.
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

const BLOB = "https://ftxim29g9ylsg52g.public.blob.vercel-storage.com";

export const PORTAL_DECKS: PortalDeck[] = [
  {
    audience: "investor",
    depth: "non-technical",
    locale: "en",
    title: "Celesnity · World Model Fundraising Deck",
    url: `${BLOB}/Celesnity_World%20Model_Fundraising%20Deck_Official%20%281%29-8SHwtySS8LAKaQgSQtOJd31ersJQ27.pdf`,
  },
  {
    audience: "investor",
    depth: "technical",
    locale: "en",
    title: "Minder AI · Technical Investor Deck",
    url: `${BLOB}/Minder%20AI%20%C2%B7%20Technical%20Investor%20Deck-1xtDBdpz6Clvc4bEBKjHT82zX9cqCl.pdf`,
  },
  {
    audience: "buyer",
    depth: "non-technical",
    locale: "en",
    title: "Celesnity · Minder Applications, UK & Europe Introduction",
    url: `${BLOB}/Celesnity%20%E2%80%94%20Minder%20Applications%20_%20UK%20%26%20Europe%20Introduction%20%282%29-jq24wOjBULHD0kRrqWUAKIXOJfEVjG.pdf`,
  },
  {
    audience: "buyer",
    depth: "technical",
    locale: "en",
    title: "Minder AI · For Technology Leaders",
    url: `${BLOB}/Minder%20AI%20%C2%B7%20For%20Technology%20Leaders-KdrJuDTihu7muTG5zwgKz8tvacM9JT.pdf`,
  },
  {
    audience: "buyer",
    depth: "non-technical",
    locale: "vi",
    title: "Minder AI · Dành cho Lãnh đạo Vận hành",
    url: `${BLOB}/Minder%20AI%20%C2%B7%20Da%CC%80nh%20cho%20La%CC%83nh%20%C4%91a%CC%A3o%20Va%CC%A3%CC%82n%20ha%CC%80nh-KKEON66X3Wmyqwi60U28B5IwkuRhee.pdf`,
  },
  {
    audience: "buyer",
    depth: "technical",
    locale: "vi",
    title: "Minder AI · Dành cho Lãnh đạo Công nghệ",
    url: `${BLOB}/Minder%20AI%20%C2%B7%20Da%CC%80nh%20cho%20La%CC%83nh%20%C4%91a%CC%A3o%20Co%CC%82ng%20nghe%CC%A3%CC%82-F2BtUkoNNnXPI1qczRo2TEqQZcvAAN.pdf`,
  },
];

export function findDeck(audience: Audience, depth: Depth, locale: Locale): PortalDeck | undefined {
  return PORTAL_DECKS.find((d) => d.audience === audience && d.depth === depth && d.locale === locale);
}
