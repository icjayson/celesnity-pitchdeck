/**
 * Static PDF registry for the root deck portal.
 *
 * There are 15 routing slots:
 * - investor: USA, Europe and Global
 * - buyer: English technical/non-technical plus one direct deck for each other language
 *
 * A slot without `url` remains visible but disabled until its translated PDF is added.
 */
export type Audience = "investor" | "buyer";
export type Depth = "non-technical" | "technical";
export type InvestorRegion = "usa" | "europe" | "global";
export type Locale =
  | "en"
  | "fr"
  | "de"
  | "it"
  | "es"
  | "pt"
  | "zh"
  | "ko"
  | "ja"
  | "th"
  | "vi";

export type InvestorDeck = {
  audience: "investor";
  region: InvestorRegion;
  title: string;
  url?: string;
};

export type BuyerDeck = {
  audience: "buyer";
  locale: Locale;
  /** Only English branches by technical depth. */
  depth: Depth | null;
  title: string;
  url?: string;
};

export type PortalDeck = InvestorDeck | BuyerDeck;

export type PortalOption<T extends string> = {
  id: T;
  label: string;
  flags: string;
};

export const INVESTOR_REGIONS: readonly PortalOption<InvestorRegion>[] = [
  { id: "usa", label: "USA", flags: "🇺🇸" },
  { id: "europe", label: "Europe", flags: "🇪🇺" },
  { id: "global", label: "Global", flags: "🌐" },
];

export const BUYER_LANGUAGES: readonly PortalOption<Locale>[] = [
  { id: "en", label: "English", flags: "🇬🇧 🇺🇸 🇪🇺 🌐" },
  { id: "fr", label: "Français", flags: "🇫🇷 🇪🇺" },
  { id: "de", label: "Deutsch", flags: "🇩🇪 🇪🇺" },
  { id: "it", label: "Italiano", flags: "🇮🇹 🇪🇺" },
  { id: "es", label: "Español", flags: "🇪🇸 🇪🇺" },
  { id: "pt", label: "Português", flags: "🇵🇹 🇪🇺" },
  { id: "zh", label: "中文", flags: "🇨🇳" },
  { id: "ko", label: "한국어", flags: "🇰🇷" },
  { id: "ja", label: "日本語", flags: "🇯🇵" },
  { id: "th", label: "ภาษาไทย", flags: "🇹🇭" },
  { id: "vi", label: "Tiếng Việt", flags: "🇻🇳" },
];

const DIR = "/briefings";

export const PORTAL_DECKS: PortalDeck[] = [
  // The current investor PDF remains available for all three regions.
  {
    audience: "investor",
    region: "usa",
    title: "Celesnity · The World Model for Industry · USA",
    url: `${DIR}/investor-en.pdf`,
  },
  {
    audience: "investor",
    region: "europe",
    title: "Celesnity · The World Model for Industry · Europe",
    url: `${DIR}/investor-en.pdf`,
  },
  {
    audience: "investor",
    region: "global",
    title: "Celesnity · The World Model for Industry · Global",
    url: `${DIR}/investor-en.pdf`,
  },
  {
    audience: "buyer",
    locale: "en",
    depth: "non-technical",
    title: "Celesnity · Minder & World Model, UK & Europe Introduction",
    url: `${DIR}/buyer-non-technical-en.pdf`,
  },
  {
    audience: "buyer",
    locale: "en",
    depth: "technical",
    title: "Minder AI · For Technology Leaders",
    url: `${DIR}/buyer-technical-en.pdf`,
  },
  {
    audience: "buyer",
    locale: "fr",
    depth: null,
    title: "Celesnity · Présentation acheteur",
  },
  {
    audience: "buyer",
    locale: "de",
    depth: null,
    title: "Celesnity · Präsentation für Käufer",
  },
  {
    audience: "buyer",
    locale: "it",
    depth: null,
    title: "Celesnity · Presentazione per acquirenti",
  },
  {
    audience: "buyer",
    locale: "es",
    depth: null,
    title: "Celesnity · Presentación para compradores",
  },
  {
    audience: "buyer",
    locale: "pt",
    depth: null,
    title: "Celesnity · Apresentação para compradores",
  },
  {
    audience: "buyer",
    locale: "zh",
    depth: null,
    title: "Celesnity · 买方简介",
  },
  {
    audience: "buyer",
    locale: "ko",
    depth: null,
    title: "Celesnity · 구매자 브리핑",
  },
  {
    audience: "buyer",
    locale: "ja",
    depth: null,
    title: "Celesnity · 購入者向け資料",
  },
  {
    audience: "buyer",
    locale: "th",
    depth: null,
    title: "Celesnity · เอกสารสำหรับผู้ซื้อ",
  },
  {
    audience: "buyer",
    locale: "vi",
    depth: null,
    title: "Celesnity · Minder & World Model, Dành cho Lãnh đạo Vận hành",
    url: `${DIR}/buyer-non-technical-vi.pdf`,
  },
];

export function findInvestorDeck(
  region: InvestorRegion,
): InvestorDeck | undefined {
  return PORTAL_DECKS.find(
    (deck): deck is InvestorDeck =>
      deck.audience === "investor" && deck.region === region,
  );
}

export function findBuyerDeck(
  locale: Locale,
  depth: Depth | null = null,
): BuyerDeck | undefined {
  return PORTAL_DECKS.find(
    (deck): deck is BuyerDeck =>
      deck.audience === "buyer" &&
      deck.locale === locale &&
      deck.depth === depth,
  );
}
