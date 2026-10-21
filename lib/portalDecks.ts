/**
 * Static PDF registry for the root deck portal.
 *
 * There are 15 routing slots:
 * - investor: USA, Europe and Global
 * - buyer: English technical/non-technical plus one direct deck for each other language
 *
 * A slot without `url` remains visible but disabled until its translated PDF is added.
 *
 * Every step and PDF has its own path, e.g. /investor-deck/usa, /sales-deck/english/technical,
 * /sales-deck/german. PDF paths are rewritten to the file in public/briefings (see next.config.ts).
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
  /** URL segment under /investor-deck or /sales-deck */
  slug: string;
  label: string;
  flags: string;
};

export const INVESTOR_REGIONS: readonly PortalOption<InvestorRegion>[] = [
  { id: "usa", slug: "usa", label: "USA", flags: "🇺🇸" },
  { id: "europe", slug: "europe", label: "Europe", flags: "🇬🇧 🇪🇺" },
  { id: "global", slug: "global", label: "Global", flags: "🌍" },
];

export const BUYER_LANGUAGES: readonly PortalOption<Locale>[] = [
  { id: "en", slug: "english", label: "English", flags: "🇬🇧 🇺🇸 🇪🇺 🌍" },
  { id: "fr", slug: "french", label: "Français", flags: "🇫🇷 🇪🇺" },
  { id: "de", slug: "german", label: "Deutsch", flags: "🇩🇪 🇪🇺" },
  { id: "it", slug: "italian", label: "Italiano", flags: "🇮🇹 🇪🇺" },
  { id: "es", slug: "spanish", label: "Español", flags: "🇪🇸 🇪🇺" },
  { id: "pt", slug: "portuguese", label: "Português", flags: "🇵🇹 🇪🇺" },
  { id: "zh", slug: "chinese", label: "中文", flags: "🇨🇳 🇹🇼" },
  { id: "ko", slug: "korean", label: "한국어", flags: "🇰🇷" },
  { id: "ja", slug: "japanese", label: "日本語", flags: "🇯🇵" },
  { id: "th", slug: "thai", label: "ภาษาไทย", flags: "🇹🇭" },
  { id: "vi", slug: "vietnamese", label: "Tiếng Việt", flags: "🇻🇳" },
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
    title: "Minder & the World Model · For Chief Operators",
    url: `${DIR}/buyer-non-technical-en.pdf`,
  },
  {
    audience: "buyer",
    locale: "en",
    depth: "technical",
    title: "Minder & the World Model · For CTOs and Heads of Engineering",
    url: `${DIR}/buyer-technical-en.pdf`,
  },
  {
    audience: "buyer",
    locale: "fr",
    depth: null,
    title: "Minder & le World Model · Pour les dirigeants d’usine",
    url: `${DIR}/buyer-non-technical-fr.pdf`,
  },
  {
    audience: "buyer",
    locale: "de",
    depth: null,
    title: "Minder & das World Model · Für die Werksleitung",
    url: `${DIR}/buyer-non-technical-de.pdf`,
  },
  {
    audience: "buyer",
    locale: "it",
    depth: null,
    title: "Minder & il World Model · Per chi guida lo stabilimento",
    url: `${DIR}/buyer-non-technical-it.pdf`,
  },
  {
    audience: "buyer",
    locale: "es",
    depth: null,
    title: "Minder & el World Model · Para la dirección de planta",
    url: `${DIR}/buyer-non-technical-es.pdf`,
  },
  {
    audience: "buyer",
    locale: "pt",
    depth: null,
    title: "Minder & o World Model · Para a direção fabril",
    url: `${DIR}/buyer-non-technical-pt.pdf`,
  },
  {
    audience: "buyer",
    locale: "zh",
    depth: null,
    title: "Minder与世界模型 · 致工厂负责人",
    url: `${DIR}/buyer-non-technical-zh.pdf`,
  },
  {
    audience: "buyer",
    locale: "ko",
    depth: null,
    title: "Minder와 월드 모델 · 공장 경영진을 위해",
    url: `${DIR}/buyer-non-technical-ko.pdf`,
  },
  {
    audience: "buyer",
    locale: "ja",
    depth: null,
    title: "Minderと世界モデル · 工場経営者の皆さまへ",
    url: `${DIR}/buyer-non-technical-ja.pdf`,
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
    title: "Minder & World Model · Dành cho lãnh đạo nhà máy",
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

export const INVESTOR_PATH = "/investor-deck";
export const SALES_PATH = "/sales-deck";
export const ENGLISH_SALES_PATH = `${SALES_PATH}/english`;

/** Pretty path for a deck: /investor-deck/<region>, /sales-deck/english/<depth>, /sales-deck/<language> */
export function deckPath(deck: PortalDeck): string {
  if (deck.audience === "investor") {
    const region = INVESTOR_REGIONS.find((item) => item.id === deck.region);
    return `${INVESTOR_PATH}/${region?.slug}`;
  }
  const language = BUYER_LANGUAGES.find((item) => item.id === deck.locale);
  const base = `${SALES_PATH}/${language?.slug}`;
  return deck.depth ? `${base}/${deck.depth}` : base;
}

/** next.config rewrites: each deck path serves its PDF, so the address bar keeps the pretty path. */
export const PORTAL_REWRITES = PORTAL_DECKS.flatMap((deck) =>
  deck.url ? [{ source: deckPath(deck), destination: deck.url }] : [],
);
