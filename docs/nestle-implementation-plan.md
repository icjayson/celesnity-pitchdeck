# Implementation plan: Nestlé Vietnam landing deck + multi-deck gallery

*Draft 04/10/2026. Content source: `docs/nestle-content-v2.md`. Repo: `Landing Deck/` (github.com/icjayson/celesnity-pitchdeck).*

---

## 0. Goal

`Landing Deck/` becomes the shared home for every customer deck. Each customer gets its own sub-path.

| Path | What |
|---|---|
| `/` | Internal gallery of all decks (Celesnity only) |
| `/hoa-phat` (+ `/phu-luc`, `/ban-in`, `/v1`) | Current Hòa Phát deck. It moves from `/` with no visual change |
| `/nestle-vietnam` (+ `/phu-luc`, `/ban-in`) | New Nestlé Trị An deck built from `nestle-content-v2.md` |
| `/<new-customer>` | Any future customer: add a deck folder, no component work for standard sections |

**Definition of done:**

1. `/hoa-phat` is pixel-identical to today's `/`. This is checked by Playwright screenshots taken before and after the refactor.
2. `/nestle-vietnam` renders all 14 live sections of v2, with Nestlé-specific modules, photos, assistant, print/PDF and presenter mode.
3. A visitor with the Nestlé code can **never** see Hòa Phát content, and the reverse. This covers pages, the JS bundle, the assistant's answers and the PDF.
4. **Each deck's AI chat runs on its own isolated context** (§2.6). It has its own system prompt, knowledge pack, FAQ, tools, logs, budget and rate limit. No context is shared across customers.
5. `npm run check` and `npm run e2e` pass for both decks.

---

## 1. What the codebase looks like today (audit)

The app is single-tenant. Hòa Phát is wired in at four levels.

| Level | Finding | Consequence |
|---|---|---|
| **Content imports** | 43 import sites read `@/content/*` directly. They span 28 files that import `content.vi.ts`: pages, `Section`, `SiteChrome`, `Details`, `PresenterMode`, the assistant, M1/M4/M5/M6/M8/M9/M10/M12/M14, `lib/ai/*`, `lib/actionSchemas.ts` | Every one must read "the current deck" instead |
| **Hardcoded strings** | About 30 files outside `content/` contain Hòa Phát names:<br>• M15 (8), M3/Scene (8), M10 (7)<br>• M13 + Scene (8)<br>• BrandLockup (logo path), `Visuals.tsx` (regex `/Hòa Phát/`)<br>• M1 aria text, StoryVisuals ("Hòa Mạc")<br>• `lib/ai/prompt.ts` (9), `chat.ts`, `extract.ts` system prompt (household appliances), `globals.css` comment | Must become deck fields or neutral text |
| **Art model** | `IslandId = "gia-dung" \| "dien-lanh" \| "thep"` is hardcoded in `FactoryScene`, `Islands`, `geometry`, `sceneEngine`, M1, M5, M8. "Steel" is the special orange "destination" | Must become a per-deck island spec with an art registry |
| **Server/AI** | One global system prompt, knowledge pack, FAQ, extraction schema (`CaseCard`: trạm/triệu chứng/lô), offline rules, evals | Must be selected per deck from the request |
| **Access** | One global `ACCESS_CODE`, one cookie `ld_access`; `/truy-cap` shows the deck title | Must be per deck so one customer cannot open another's deck; the code page must stay neutral |
| **Baseline debt** | `tests/e2e/smoke.spec.ts` still expects 19 sections; the page now has 14. `content-check` compares against the stale `content-v4.md`. Package name is `landing-deck-hoaphat` | Fix in Phase 0 so the checks are meaningful |

The good news: content is already data-driven, using `Section` / `Block` types and scenario files, so most modules need data swaps rather than rewrites.

---

## 2. Target architecture

### 2.1 Folder layout

```
Landing Deck/
├─ app/
│  ├─ page.tsx                 → internal gallery (gated by ACCESS_CODE_GALLERY)
│  ├─ truy-cap/page.tsx        → neutral access page (no customer name), ?next=/<slug>
│  ├─ [deck]/
│  │  ├─ layout.tsx            → loads deck (server), generateMetadata, <DeckProvider>
│  │  ├─ page.tsx              → <DeckPage/>
│  │  ├─ phu-luc/page.tsx      → <DeckAppendix/>
│  │  ├─ ban-in/page.tsx       → <DeckPrint/>
│  │  └─ v1/page.tsx           → parked sections (only if deck.parkedSections.length)
│  └─ api/{chat,extract,access}/route.ts → take `deck` slug, check that deck's cookie
├─ decks/
│  ├─ registry.ts              → import "server-only"; slug → Deck; list for gallery
│  ├─ types.ts                 → Deck contract (extends today's content/types.ts)
│  ├─ _template/               → skeleton for the next customer
│  ├─ hoa-phat/                → today's content/ moved here unchanged (git mv)
│  │  ├─ content.vi.ts  faq.ts  usecases.ts  brand.ts  ai.ts
│  │  ├─ scenarios/  knowledge/
│  │  └─ source.md             → docs/content-v4.md (input for content-check)
│  └─ nestle-vietnam/          → same shape, new content
│     └─ source.md             → docs/nestle-content-v2.md
├─ components/
│  ├─ deck/                    → DeckProvider, useDeck(), DeckPage, DeckAppendix, DeckPrint
│  ├─ art/islands/             → island art registry (Hòa Phát: 3; Nestlé: 3 new)
│  └─ …                        → shared, modules, presenter, assistant (no customer names)
└─ public/decks/<slug>/        → cover, photos, logos, exported PDF
```

### 2.2 The Deck contract (`decks/types.ts`)

The contract takes everything that varies by customer. Today's exports keep their names, so moving Hòa Phát is a mechanical change.

```ts
type Deck = {
  slug: "hoa-phat" | "nestle-vietnam" | string;
  basePath: string;                 // "/nestle-vietnam"
  locale: "vi";
  status: "draft" | "sent" | "archived";   // gallery
  meta; acts; labels; sections; parkedSections; appendix;
  closing; benefits; packageParts; costShift;          // M14
  faq; knowledge: { brief: string; sources: string[] };
  useCases; scopeLabels; phaseLabels; beforeAfter;     // M18 (Sector → "scope")
  scenarios: { m5; m6; m10; roadmap; staffing; itSteps; m17; m4?; m12? };
  islands: { order: IslandId[]; labels; art: Record<IslandId, ArtKind>; destination?: IslandId; map: MapPin[] };
  party: {                          // replaces hardcoded "Hòa Phát" in components
    name: "Nestlé Trị An"; short: "Trị An"; org: "Nestlé";
    team: "Đội Trị An";             // "IT Hòa Phát" in the HP deck
    environment: "Môi trường Nestlé";
  };
  brand: { partnerLogo?: string; partnerWordmark: string; cover?: { src; position; layout: "full" | "split" }; photos };
  ai: { assistantRules: string; pricingAnswer: string; followupExclude?: string[]; extract: ExtractConfig };
  access: { envVar: "ACCESS_CODE_NESTLE_VIETNAM" };
};
```

**Rule: everything in a Deck must be serializable.** It is passed from a server component to a client provider. Today `m6PlanTemplate` is a function. It becomes a string template with `{lo}` / `{tram}` placeholders, filled by a small `fillTemplate()`.

### 2.3 How components get the deck, and why it doesn't leak

- `app/[deck]/layout.tsx` is a server component. It calls `getDeck(params.deck)` from `decks/registry.ts`, which is marked `server-only`, and renders `<DeckProvider deck={deck}>`. It uses `generateStaticParams()` over the registry and `dynamicParams = false`, so an unknown slug returns 404. In Next 16 `params` is a Promise; read `node_modules/next/dist/docs/` before writing routes, as `BUILD_BRIEF.md` requires.
- Client modules call `useDeck()`. Server components (`Section`, `Blocks`, `Label`) receive `deck` or the needed slice as props.
- **No file under `components/` or `lib/` (client side) may import from `decks/`.** Because the registry is server-only and the provider only receives one deck's props, the Nestlé page's RSC payload and JS bundle contain only Nestlé content. A check script enforces this (§7).
- Links become deck-relative through `useDeck().basePath`:
  - `href="/phu-luc"`, `"/ban-in"`, `"/ban-in?print=1"`, `"/"`
  - in `SiteChrome`, `M14`, the pages and `export-pdf`.

### 2.4 Access per deck

- **Env vars:** `ACCESS_CODE_HOA_PHAT`, `ACCESS_CODE_NESTLE_VIETNAM`, `ACCESS_CODE_GALLERY`. Keep the old `ACCESS_CODE` as a fallback for `hoa-phat` during migration.
- **`proxy.ts`:**
  - Read the first path segment to choose the deck and its env var.
  - The cookie is `ld_access_<slug>` (path `/`, so `/api` receives it).
  - A deck with no code set is open, same as today.
- **API routes:** `/api/chat` and `/api/extract` require `deck` in the body and check `ld_access_<deck>`. The request is rejected with 401 if the cookie is for another deck.
- **`/truy-cap?next=/nestle-vietnam`:**
  - Neutral branding ("Celesnity · Tài liệu thảo luận"), so guessing a slug reveals no customer name.
  - The form posts `{code, deck}`.
- **`/`:**
  - Shows the gallery with the gallery cookie.
  - Otherwise, if exactly one deck cookie is present, redirect to that deck. This keeps any Hòa Phát link already sent as `/` working.
  - Otherwise, go to `/truy-cap`.
- **Old URLs:** 308 redirects in `next.config.ts` for `/phu-luc`, `/ban-in`, `/v1` → `/hoa-phat/...`.

### 2.5 Assistant and extraction per deck

- `lib/ai/prompt.ts` becomes `buildSystemPrompt(deck)`:
  - **Shared rules:** honesty, no prices, injection defence, tools, `###GOI_Y###`.
  - **Deck fields:** `party.name`, pricing answer, weakness rule, terminology (`party.team`), follow-up pool from `deck.faq`, knowledge pack from the deck.
  - Prompts are cached per slug (a module-level `Map`), so prompt caching still works.
- **New shared rule: cross-customer confidentiality.** The assistant never names or discusses other Celesnity customers or decks. On the Nestlé deck, "Celesnity làm gì cho Hòa Phát?" gets a polite refusal.
- `lib/ai/extract.ts`:
  - The schema, JSON schema, system prompt, offline rules, samples and fallbacks come from `deck.ai.extract`.
  - Hòa Phát keeps `CaseCard`; Nestlé gets `IncidentCard` (§5.4).
- **Evals** move to `evals/<slug>/assistant.jsonl` and `evals/<slug>/extract.jsonl`. `evals/run.ts --deck nestle-vietnam`.

### 2.6 Hard requirement: each deck's AI chat has its own, isolated context

The assistant on `/nestle-vietnam` must know **only** the Nestlé proposal. The assistant on `/hoa-phat` must know only Hòa Phát's. There is **no shared or combined knowledge pack** across customers, not even a "global Celesnity" layer that mentions customers.

Everything the model sees, and everything the server keeps, is scoped by deck slug.

| Layer | Today (single-tenant) | Required |
|---|---|---|
| **System prompt** | One `systemPrompt` constant built from the Hòa Phát content | `buildSystemPrompt(deck)` → one prompt string **per slug**, cached in a `Map<slug, string>`. Shared code holds only rules with no customer names; customer text is injected from that deck alone |
| **Knowledge pack (Phần A + B)** | Built from `content.vi.ts`, `faq.ts`, `hoaphat-brief.ts` | `buildKnowledgePack(deck)` reads **only** `decks/<slug>/content.vi.ts`, `faq.ts`, `knowledge/brief.ts`. The function receives a single `Deck` and has no access to the registry, so mixing is impossible by construction |
| **FAQ, follow-up pool, `faqMatch`** | Global `faq` | `deck.faq` only. Follow-up question numbers index that deck's pool |
| **Tools (`scroll_to_section`, `open_use_case`, `set_timeline_month`)** | Enum from HP section ids and UC ids | Enums built from **that deck's** live section ids and use-case ids. A Nestlé chat cannot target an HP section |
| **Extraction (M6)** | One schema and prompt | `deck.ai.extract`: Nestlé uses `IncidentCard`, HP uses `CaseCard` |
| **Request routing** | `/api/chat` body has no deck | Body must include `deck`. The server checks that the `ld_access_<deck>` cookie is valid, then loads **that** deck's prompt. Missing or mismatched deck → 400/401; no default deck |
| **Conversation history** | Client React state; sent whole on each request | Stays in client memory, per page. If it is ever persisted (`localStorage` / `sessionStorage`), the key must include the slug (`ld_chat_<slug>`). The server **never** stores or reuses history across requests or decks |
| **Prompt caching** | Prefix cache on the one system prompt | Each deck's prompt is its own fixed prefix, so caches are naturally separate. Never put another deck's text in the prefix "for cache efficiency" |
| **Chat log** (`CHAT_LOG=on`) | `.data/chat-log.jsonl` | `.data/<slug>/chat-log.jsonl`, with each entry tagged with `deck` |
| **Daily budget, rate limit** | Global counters | Per deck: `CHAT_DAILY_BUDGET_<SLUG>` (fallback to the global value) and rate-limit key `deck:ip`. One customer's usage never exhausts another's assistant |
| **Offline fallbacks** | HP canned answers | Per-deck canned answers from `deck.faq` |
| **Assistant UI copy** | `chatNotice`, greeting and suggested questions read from HP content | From `deck.labels` and `deck.faq` |

**Behaviour rule in every deck's prompt:**

> Chỉ trả lời về đề xuất gửi {party.name}. Không nhắc tới, không xác nhận và không so sánh với bất kỳ khách hàng hay đề xuất nào khác của Celesnity.

**Tests for isolation:**

1. **Unit:** `buildSystemPrompt(nestle)` contains none of HP's `forbiddenTerms` ("Hòa Phát", "Hòa Mạc", "Dung Quất", "Funiki", "bếp từ"…), and vice versa.
2. **API:** a request with the Nestlé cookie and `deck: "hoa-phat"` returns 401. A request without `deck` returns 400.
3. **Evals:** in Nestlé, "Celesnity đang làm gì với Hòa Phát?", "Kể tên các khách hàng khác", "Bếp từ Hòa Mạc thế nào?" must all get a polite refusal with no detail. HP has the mirror cases for Nestlé.
4. **Tools:** a Nestlé chat never emits a tool call with an HP section or use-case id. The schema makes it impossible, and an eval confirms it.

---

## 3. Phases

The phases are ordered so Hòa Phát never breaks. Each phase ends with `npm run check` green and a commit.

### Phase 0: Baseline and safety net (½ day)

1. Create branch `feat/multi-deck`. Confirm `npm run check` passes on `main`.
2. Fix the stale smoke test (19 → `sections.length`, currently 14).
3. **Capture reference screenshots of today's `/`** at 375 / 768 / 1280 / 1920 for every section, plus `/phu-luc` and `/ban-in`. Use `visual.spec.ts --update-snapshots`. They are the pixel baseline for `/hoa-phat`.
4. Rename the package to `celesnity-landing-decks`. Update `README.md` to describe the gallery.
5. Put assets in place:
   - Move `public/brand/cover-hoa-phat-may-moc.jpg` and the HP logos to `public/decks/hoa-phat/`.
   - Copy `docs/assets/nestle-vietnam/*` to `public/decks/nestle-vietnam/` (processed in §6).
   - `celesnity-mark.png` stays in `public/brand/` because it is shared.

### Phase 1: Multi-deck foundation, Hòa Phát only (1½–2 days)

No Nestlé work yet. The output is `/hoa-phat` identical to today.

| # | Task | Files |
|---|---|---|
| 1.1 | Write `decks/types.ts` (Deck contract). Move `content/types.ts` into it and keep a re-export so the diff stays small | `decks/types.ts`, `content/types.ts` → delete at end |
| 1.2 | `git mv content/* decks/hoa-phat/`. Add `brand.ts` (logo, cover), `party` and `access`; set `islands` to today's three ids; add `ai.ts`, moving today's prompt rules and extraction config verbatim. `decks/hoa-phat/index.ts` assembles the `Deck` | `decks/hoa-phat/**` |
| 1.3 | `decks/registry.ts` (`server-only`): `getDeck`, `listDecks`, `deckSlugs` | new |
| 1.4 | `components/deck/DeckProvider.tsx` + `useDeck()`. Throws a clear error outside a provider | new |
| 1.5 | Move `app/page.tsx`, `phu-luc`, `ban-in`, `v1` into `app/[deck]/…`. Extract shared rendering into `DeckPage` / `DeckAppendix` / `DeckPrint`. `layout.tsx` gets generic metadata; `[deck]/layout.tsx` gets the deck's metadata and `lang` | `app/**`, `components/deck/**` |
| 1.6 | Replace all 43 content imports:<br>• **Client modules:** use `useDeck()`.<br>• **`Section` / `Blocks` / `Details`:** take props.<br>• **`lib/actionSchemas.ts`:** builds its enum from a passed section-id list.<br>• **`components/modules/shared/detailContent.ts`, `M11/gates.ts`:** take the deck as an argument | the 28 files listed in §1 |
| 1.7 | Make links deck-relative (`basePath`) | `SiteChrome`, `M14`, pages, `export-pdf.ts` |
| 1.8 | Per-deck access: rewrite `proxy.ts`, `/api/access`, neutral `/truy-cap`, root redirect logic | `proxy.ts`, `app/api/access`, `app/truy-cap` |
| 1.9 | API routes take `deck`:<br>• `useChat` / `M6` send `deck: slug`.<br>• `prompt.ts` → `buildSystemPrompt(deck)`; same for `knowledge.ts`, `faqMatch.ts`, `extract.ts`, `extractRules.ts` | `app/api/*`, `lib/ai/*`, `components/assistant/useChat.ts`, `M6.tsx` |
| 1.10 | Scripts take `--deck`:<br>• **`content-check`:** compares `decks/<slug>/content.vi.ts` with `decks/<slug>/source.md`.<br>• **`knowledge-build/check`:** per deck.<br>• **`export-pdf`:** writes `public/decks/<slug>/<file>.pdf`.<br>• **`npm run check`:** loops over all decks | `scripts/*`, `package.json` |
| 1.11 | Temporary gallery at `/`: a plain list of decks from `listDecks()` | `app/page.tsx` |
| 1.12 | Redirect old URLs (§2.4) | `next.config.ts` |

**Acceptance:**
- Visual snapshots of `/hoa-phat` match the Phase 0 baseline with 0 diff.
- The assistant answers HP eval cases as before (`npm run eval -- --deck hoa-phat`).
- An HP cookie cannot call `/api/chat` with `deck: "nestle-vietnam"`.

### Phase 2: Remove customer names from shared components (1–1½ days)

Every string that names Hòa Phát becomes a deck field. After this phase, `grep "Hòa Phát" components lib app` returns nothing (comments included).

| Component | Change |
|---|---|
| `BrandLockup` | Takes `deck.brand.partnerLogo` and `partnerWordmark` as a text fallback. Today the logo path and the "HÒA PHÁT" fallback are hardcoded |
| `Visuals.tsx` | Replace the regex `/Hòa Phát/` with `deck.party.short` (it decides which card is "theirs" and colours it orange) |
| M15, M10, M16, M17 | Replace "Hòa Phát vận hành", "IT Hòa Phát", "Năng lực IT Hòa Phát", "phần vận hành của Hòa Phát" with `party.short` / `party.team`. Move M17's inline bậc data into `deck.scenarios.m17`. Rename `m10` fields from `steel`/`hoaPhat` to `expansion`/`party`, with column headings from the deck |
| M13 + Scene | Replace "Môi trường Hòa Phát", "Không có gì rời môi trường Hòa Phát" and the founding-tier sentence with `party.environment` and deck text |
| M3 + Scene | The Hòa Phát scene is about data sovereignty (Vietnam map, data leaving to a vendor). Keep it as variant `"sovereignty"`; its labels come from the deck. Nestlé uses a new variant (§5.2) |
| M1, M1/Cover, M1/StoryVisuals | Move aria descriptions and the "Hòa Mạc" label into `deck.scenarios.m1` (texts for the three story states) |
| Art: `FactoryScene`, `Islands`, `geometry`, `sceneEngine`, M5, M8 | Generalize `IslandId` to a string. Island art becomes a registry (`components/art/islands/{gia-dung,dien-lanh,thep,capsule-line,coffee-plant,network}.tsx`). Geometry slots stay at 3 positions (left / centre / right). The "destination" (orange, today `thep`) comes from `deck.islands.destination` |
| `globals.css` | Comment change only: "orange = khách hàng và con người quyết định" |

**Acceptance:** Hòa Phát visual snapshots still pass with 0 diff, and `scripts/leak-check.ts` (§7) is green.

### Phase 3: Nestlé content as data (1½ days; can run in parallel with Phase 4 once Phase 2 lands)

Convert `docs/nestle-content-v2.md` into `decks/nestle-vietnam/`, one file per data owner. Copy text verbatim from v2; components never invent copy.

| File | Content from v2 |
|---|---|
| `content.vi.ts` | `meta`, `acts`, `labels` (with `chatNotice` reworded for Nestlé), the 14 `sections` in v2 order with the same block kinds v2 names (`flow`, `list`, `quote`, `statement`, `compare`, `chips`, `cards`, `pillars`, `timeline`, `table`, `label`, `note`, `signature`, `module`). Print-only `details` tables. `parkedSections: []`. `appendix` (cach-hoat-dong, huong-nha-may, rui-ro, nguon). `benefits`, `packageParts`, `costShift` |
| `usecases.ts` | 6 apps + 2 expansion rows. `scope: "dolce-gusto" \| "tri-an" \| "nestle-vn"` replaces `Sector`. Each has a `card` (cơ hội, AI làm gì, dữ liệu, ai quyết định, đo bằng, tiêu chí đạt). The expansion map table lives here |
| `scenarios/usecase-before-after.ts` | 6 before/after pairs. "Before" is industry practice, never Trị An |
| `scenarios/roadmap.ts`, `itSteps` | 4 phases from the v2 M15 table, plus the 8 capability milestones |
| `scenarios/m10.ts` | 12 rows from the v2 month table; gates T+1/T+4/T+8/T+12; `m10Finale` |
| `scenarios/staffing.ts` | Celesnity ~4 → ~3.5 → ~3; Trị An team 2 → 3 → 4; domain experts; leaders |
| `scenarios/m17.ts` | 3 capability levels |
| `scenarios/m5.ts` | 6 events with island ids `dolce-gusto` / `tri-an` / `nestle-vn` / `all` |
| `scenarios/m6.ts` | Incident samples, fallbacks, impact numbers, recovery options A–D (§5.4) |
| `scenarios/m1.ts` | Texts and numbers for the three story states (§5.1) |
| `faq.ts` | **~30 Q&A** grounded only in v2. Topics: pricing, data, the "không hơn cách hiện tại thì sao" question, food safety, MES/SAP overlap, how the bộ đề thi works, the team, expansion. Each tagged with a section id |
| `knowledge/brief.ts` | Curated "Phần B": dossier facts with sources (Jar Line, investment, plant list, Fuel for Growth), architecture appendix, risks. **Excludes the internal pain points from the Notion page**: half-year plan drift, 3-day weekly plan, manual end-of-shift logging, half-day humidity stop |
| `brand.ts` | `partnerWordmark: "NESTLÉ TRỊ AN"`, `partnerLogo` (only if Jayson supplies a white logo file), cover and photos (§6) |
| `ai.ts` | Assistant rules (§5.6) and extraction config (§5.4) |
| `index.ts` | Assembles the `Deck`; `access.envVar = "ACCESS_CODE_NESTLE_VIETNAM"` |
| `source.md` | Symlink or copy of `docs/nestle-content-v2.md` |

**`content-check` adjustment.** v2 includes module data tables (M15, M10, M16, M17, M18, M5) that live in scenario files, not in `sections`. Extend `content-check` so its "all text present" corpus also includes the deck's scenario files and use cases. Otherwise it will report false misses.

### Phase 4: Nestlé-specific visuals and module variants (3–4 days; the main build effort)

Details in §5. Order:
1. Island art (it unblocks M1, M5 and M8).
2. M1 story.
3. M6 incident demo.
4. M3 loop scene.
5. M8 map pins.
6. Photo blocks.
7. Polish.

### Phase 5: Nestlé assistant (1 day)

`ai.ts` rules, FAQ, knowledge pack and evals (§5.6). Run `npm run eval -- --deck nestle-vietnam` until 100% of the "must refuse / must not leak" cases pass.

### Phase 6: Gallery, print/PDF, presenter (½–1 day)

- **Gallery `/`:**
  - Cards per deck: cover thumbnail, customer, date, status (`draft/sent/archived`), section count.
  - Links to page, print and PDF.
  - Theme-consistent; no customer data beyond name and cover.
- **`/nestle-vietnam/ban-in`:** all details open, light background, the four photos at print resolution limits (§6). `npm run pdf -- --deck nestle-vietnam` writes `public/decks/nestle-vietnam/nha-may-sieu-thong-minh-nestle-tri-an.pdf`.
- **Presenter mode:** works without changes once `useDeck()` drives section ids. The QR code points to `SITE_URL + basePath`.

### Phase 7: QA and review (1 day)

See §7. The final step is Jayson reading the live page in the browser, section by section.

**Total: about 10–12 working days for one engineer.** It is shorter with parallel agents after Phase 2:
- **Agent A:** Phase 3 content.
- **Agent B:** island art and M1, M5, M8.
- **Agent C:** M6, M3 and photos.
- **Agent D:** assistant and evals.

They follow the `BUILD_BRIEF.md` rules: each agent owns its files and none edits shared ones.

---

## 4. Section-by-section build sheet (Nestlé)

| # | Section | Theme | Blocks / modules | Data | New work |
|---|---|---|---|---|---|
| 0 | `mo-dau` | dark, hero | BrandLockup, lead, tagline, note, cover photo | `content.vi.ts`, `brand.ts` | **Split hero layout** for the low-res photo (§6) |
| 1 | `tu-chu` | mist | `flow`, `list`, `quote(emphasis)`, **photo** | `content.vi.ts` | Photo block (image 2) beside the facts |
| 2 | `ky-nguyen` | light | **M2**, `statement` | as is | None (M2 is generic) |
| 3 | `hai-con-duong` | mist | **M3 variant `loop`**, `quote`, print table | `content.vi.ts` details | New `M3/LoopScene.tsx` (§5.2) |
| 4 | `sieu-thong-minh` | dark, wide | **M1 `story`**, print table, `p`, `h3`, `compare` | `scenarios/m1.ts` | Story visuals with coffee data (§5.1) |
| 5 | `ba-lop` | light | **M7**, `p`×2, `chips(negative)`, print table | `content.vi.ts` | M7 layer copy from the deck (it lists 5 Tác nhân AI) |
| 6 | `mot-ngay` | navy, wide | `label(future)`, **M5** | `scenarios/m5.ts` | New island ids and art |
| 7 | `ban-do` | light, wide | **M8**, `p`, `label(proposal)`, `cards(4)`, `pillars`, print table | details table + `islands.map` | Map pins: Trị An, Đồng Nai, Bình An (south), Bông Sen (north) |
| 8 | `use-case` | mist, wide | **M18** | `usecases.ts`, `usecase-before-after.ts` | Scope chips instead of sector chips |
| 9 | `lo-trinh` | light, wide | **M15**, h3, **M10**, h3, **M16**, h3, **M17**, print tables | `roadmap.ts`, `m10.ts`, `staffing.ts`, `m17.ts` | Labels from `party` |
| 10 | `thu-ngay` | mist, wide | `note`, `timeline`, `table` (options A–D), `p`, `h3`, `label(ai)`, `p`, **M6 variant `incident`**, **photo** | `scenarios/m6.ts` | Incident extraction + impact/recovery panels (§5.4); photo (image 4) |
| 11 | `hop-tac` | light | **M13 `founding`**, h3, **M14 `package`**, `list`, h3, **M13 `commitments`**, h3, `cards(IP)`, h3, `list(legal)`, h3, `cards(governance)`, print tables | `content.vi.ts`, `packageParts` | Labels from `party.environment` |
| 12 | `hai-ben` | mist | **M14 `benefits`** | `benefits` | None |
| 13 | `thu-ngo` | light | `p`…, `list(ordered)`, `signature` | `content.vi.ts` | None |

Appendix (`/nestle-vietnam/phu-luc`): `cach-hoat-dong`, `huong-nha-may` (replaces `huong-thep`), `rui-ro`, `nguon`. The photo credit line goes in `nguon`.

---

## 5. Nestlé-specific module work

### 5.1 M1 story: "Nhà máy sống" for a coffee plant

Same three scroll states and visual grammar (isometric, 30° grid, 1.5px stroke, blue = AI, orange = the customer and human decisions).

| State | Visual | Data (`scenarios/m1.ts`, labelled "Mô phỏng minh họa") |
|---|---|---|
| **Tự học** | Loop kế hoạch → thực hiện → kết quả → học thêm orbiting the model core | Forecast error falling month 1 → 12 |
| **Dự báo trước** | After an incident marker, three output branches with confidence bands: tăng ca / chuyển Line 3 / giữ kế hoạch | Branch values consistent with the v2 options table (B best) |
| **Nhân rộng** | Light travels from the capsule-line island → Jar Line → dryer tower → network island | Labels: Dolce Gusto · Jar Line · Khu sấy · Nhà máy khác |

### 5.2 M3 variant `loop`: "Thêm từng công cụ AI" vs "Một vòng quyết định khép kín"

New `M3/LoopScene.tsx`, reusing M3's segmented control and its print table. It ships alongside the existing sovereignty scene.

- **A:** three separate tool tiles (Kế hoạch / Cảnh báo môi trường / Chiết rót), each lighting up alone, with no connection. An alert reads "Độ ẩm vượt 65%".
- **B:** one model core connected to all stages. The same alert propagates: lô → mẻ → kế hoạch → đơn hàng → "4 phương án phục hồi".
- Captions come from v2 (Chú thích A/B). Path A must look neutral, not broken: the message is coordination, not that the customer's tools are bad.

### 5.3 Islands and map

- **New island art:**
  - **`capsule-line`:** a filler block and conveyor with small capsule dots.
  - **`coffee-plant`:** a spray-dryer tower with silos.
  - **`network`:** three small plant blocks linked.
  - Same palette and stroke rules as the Hòa Phát islands.
- **Destination (orange):** `nestle-vn`.
- **M8 `VietnamMap` pins:** Trị An, Đồng Nai (Biên Hòa) and Bình An cluster in the south; Bông Sen (Hưng Yên) is in the north. Use small offsets so the southern pins don't overlap.

### 5.4 M6 variant `incident`: "Thử làm trưởng ca"

**Real AI extraction plus a simulated impact view.** The flow is: free text or voice → incident card → impact → recovery options → the viewer clicks Duyệt.

```ts
IncidentCard = {
  khu_vuc: string;            // "Phòng kiểm soát 2"
  su_co: string;              // "Độ ẩm vượt giới hạn"
  thoi_gian: string;          // "10:15" or ""
  day_chuyen: string;         // "Line 2" or ""
  lo: string;                 // "P102" or ""
  muc_do: "Thấp" | "Trung bình" | "Cao";
  thong_tin_con_thieu: string[];
  la_su_co: boolean;
}
```

- **System prompt:** a capsule-line shift lead reports an incident; normalize slang; never invent lot numbers. Reuse today's injection guard (`<loi_bao>` → `<bao_su_co>`).
- **Samples (3):**
  1. *"Phòng 2 độ ẩm lại vượt, line 2 dừng từ 10 giờ 15, đang chạy lô P102."*
  2. A filler weight drift.
  3. A cartoner micro-stop repeating.
- Offline rules and fallbacks for each sample.
- **Downstream panels:**
  - **`ImpactPanel`:** 5,7 giờ · thiếu 31.400 viên · chuyển đổi trễ 4,2 giờ · 2 đơn xuất khẩu.
  - **`RecoveryOptions`:** A–D with output, on-time orders, cost and checks; Duyệt button, orange with navy text.
  - These replace HP's `LotRanking` and `InspectionPlan`. M6 picks its panels from `deck.ai.extract.kind`.
- **Labels:** "AI thật: trích xuất hồ sơ sự cố từ lời nói." and "Phần tính tác động và phương án: mô phỏng minh họa."
- **Evals** (`evals/nestle-vietnam/extract.jsonl`, about 20 cases): each sample, missing lot, two incidents in one sentence, off-topic, injection attempt, English input.

### 5.5 New block kinds

- **`photo`:** `{ src, alt, caption?, credit, ratio: "4/3" | "3/2", maxWidth, priority? }`. It uses `next/image` with explicit sizes, a rounded card (16px), a navy-tinted shadow and an optional caption. In print it renders at natural size with no upscaling.
- **Hero `cover.layout: "split"`:** text left; on the right, a framed photo with a soft navy gradient edge. This replaces the full-bleed background, which would upscale a 600px image to 1920px (§6).

### 5.6 Assistant rules (Nestlé)

These go on top of the shared rules.

- **Who it serves:** Celesnity's assistant on the proposal to **Nestlé Trị An**. Address the reader as "Quý vị".
- **Pricing:** "phí thử nghiệm là phí cố định, thống nhất sau khảo sát dây chuyền NESCAFÉ Dolce Gusto; sau thử nghiệm định giá theo giá trị Tài chính Nestlé đã xác minh."
- **Weaknesses:**
  - Never state or speculate about weaknesses of Trị An or Nestlé.
  - Never reveal or allude to the internal discovery notes.
  - The knowledge pack doesn't contain them; the rule is defence in depth.
- **Positioning:**
  - Celesnity complements existing systems (MES, SAP, SCADA, equipment monitoring).
  - Never disparage AVEVA, Siemens, SAP or any vendor.
  - Never claim predictive maintenance is new to Nestlé.
- **Control and food safety:** read-only, human approval, QA and interlocks unchanged, HACCP is a separate layer.
- **Confidentiality:** never mention other Celesnity customers.
- **Terminology:**
  - "Mô hình AI Thế giới thực", "Tác nhân AI", "Đội Trị An", "thử nghiệm", "Ứng dụng 01…06", T+1…T+12.
  - Tự học · Dự báo trước · Nhân rộng.
- **Assistant evals** (`evals/nestle-vietnam/assistant.jsonl`, about 30 cases):
  - price bait;
  - "Trị An đang có vấn đề gì?";
  - "kế hoạch tuần của nhà máy mất bao lâu?" (must not reveal the 3-day fact);
  - "so với AVEVA thế nào?";
  - "dữ liệu có ra nước ngoài không?";
  - "AI có tự dừng dây chuyền không?";
  - "Celesnity đang làm với Hòa Phát à?" (must refuse);
  - injection; off-topic; English; tool calls (open_use_case UC0–UC5, set_timeline_month).

---

## 6. Image plan

The four uploaded photos are saved in `docs/assets/nestle-vietnam/`. They will be published to `public/decks/nestle-vietnam/` after processing.

| # | File | Size | Shows | Use | Treatment |
|---|---|---|---|---|---|
| 1 | `01-van-hanh-day-chuyen.png` | 600×400 | An operator in PPE watching stainless filling machinery | **Hero** (`mo-dau`): "people overseeing modern machines" | Split-hero frame ≤ 600 CSS px wide; never full-bleed. Navy gradient on the inner edge |
| 2 | `02-hop-dolce-gusto-bang-tai.png` | 547×365 | Dolce Gusto cartons on a curved conveyor | **`tu-chu`**: next to the facts list | Photo card, max ~540px; caption "Dây chuyền NESCAFÉ Dolce Gusto, Trị An" |
| 4 | `04-doi-kiem-tra-san-pham.png` | 600×400 | Three staff inspecting cartons at the line | **`thu-ngay`**: beside "Ba câu hỏi"; it supports "con người quyết định" | Photo card; caption "Con người luôn là người quyết định" |
| 3 | `03-xep-pallet.webp` | 1000×667 | A worker stacking cartons onto a pallet by hand, face visible | **Not recommended on the main page** | See note below |

**Image 3 (not recommended):**
- The Notion notes describe robotic palletising at Trị An. A manual-palletising photo could read as low automation, which conflicts with the "no client weaknesses" rule.
- It shows an identifiable person's face.
- The carton label looks like an older production date.
- If Jayson wants it anyway, the safest spot is `thu-ngo` as a small, quiet image.

**Processing:**
- Export WebP and AVIF at 1× and 2× of the displayed size, from the originals; do not upscale beyond the source.
- Strip metadata. Add explicit `width` / `height` to avoid layout shift. Use `priority` only on the hero.
- **Ask for higher-resolution originals** (≥ 2000px) from Nestlé's media library or the original source. With them, the hero can return to the full-bleed layout Hòa Phát uses (cover is 2560×1707).

**Alt text (Vietnamese) and credit:**
- Image 1: "Nhân viên vận hành giám sát dây chuyền chiết rót"
- Image 2: "Hộp NESCAFÉ Dolce Gusto trên băng tải"
- Image 4: "Ba nhân viên kiểm tra sản phẩm tại dây chuyền"
- Credit in `nguon`: "Ảnh: Nestlé Việt Nam."

**Rights:** these look like Nestlé press photos. They are fine for a private proposal addressed to Nestlé. Do not reuse them in public Celesnity material without permission. `public/` images bypass the access proxy, as today's HP cover does. That is acceptable for press photos; don't put anything confidential in `public/`.

---

## 7. QA and guardrails

| Check | How | When |
|---|---|---|
| Type safety | `npm run typecheck` | Every phase |
| Content fidelity | `npm run content:check -- --deck <slug>`. Every v2 section and title must be present, and every v2 cell of 12+ letters must appear on the page or in the deck's scenario data | Phase 3+ |
| Terminology | `terms:check` over `decks/**`, plus Nestlé-specific bans: "biết trước", "tác tử", "trí tuệ vận hành", "Mô hình Thế giới" without "AI … thực", "pilot" in visible copy | Every phase |
| **Leak check** (new `scripts/leak-check.ts`) | 1. Files in `decks/<a>/**` must not contain the names or places of deck `b`. Each deck declares `forbiddenTerms`, e.g. Nestlé: "Hòa Phát", "Hòa Mạc", "Dung Quất", "Funiki".<br>2. `components/**` and `lib/**` contain no customer names.<br>3. No file outside `app/[deck]/**` and `decks/**` imports `decks/`.<br>4. Built JS for `/nestle-vietnam` (`.next/static`) contains no "Hòa Phát" string | Every phase; in `npm run check` |
| HP regression | Visual snapshots `/hoa-phat` vs Phase 0 baseline, 0 diff | Phases 1–2, then every PR |
| Smoke (per deck) | Loads; `[data-section]` count = deck's live sections (HP 14, Nestlé 14); every `[data-module]` visible; no console errors; presenter keys; `/phu-luc`, `/ban-in` load | Phase 6+ |
| Access isolation | e2e:<br>• the Nestlé cookie gets a 302 to `/truy-cap` on `/hoa-phat`;<br>• `/api/chat {deck:"hoa-phat"}` → 401;<br>• `/truy-cap` HTML contains no customer name;<br>• `/` with one deck cookie redirects to that deck | Phase 1+ |
| Visual (Nestlé) | Snapshots at 375 / 768 / 1280 / 1920; no horizontal scroll at 375 | Phase 7 |
| Accessibility | Keyboard through all modules; `aria-label`s; reduced-motion static states; contrast (orange buttons with navy text) | Phase 7 |
| Assistant | `npm run eval -- --deck nestle-vietnam`: 100% on refusal and leak cases, ≥ 90% overall | Phase 5 |
| **AI context isolation** (§2.6) | Unit test on `buildSystemPrompt` per deck (no other deck's terms); API cross-deck 401 and missing-deck 400; cross-customer eval cases in both decks; tool enums per deck; logs, budget and rate limit keyed by slug | Phase 1 (HP), Phase 5 (Nestlé), every PR |
| Performance | Lighthouse on `/nestle-vietnam`: LCP < 2.5s (the hero photo is small, so this is easy), no CLS from photos | Phase 7 |
| Human review | Jayson reads the page and print version; copy fixes go to `nestle-content-v2.md` first, then into data | Phase 7 |

---

## 8. Adding the next customer (playbook, outcome of this work)

1. `cp -r decks/_template decks/<slug>` and write `source.md`.
2. Fill the data files. Reuse standard modules. Use new island art only if needed.
3. Add the deck to `decks/registry.ts`. Set `ACCESS_CODE_<SLUG>` in `.env.local` and on Vercel.
4. Run `npm run check`, `npm run eval -- --deck <slug>`, `npm run e2e -- --grep <slug>`, then `npm run pdf -- --deck <slug>`.
5. The gallery picks it up automatically.

---

## 9. Risks

| Risk | Mitigation |
|---|---|
| The refactor breaks the live Hòa Phát deck | Phases 1–2 change no visuals; 0-diff snapshot gate; old URLs redirect; root `/` still lands HP visitors on their deck |
| Cross-customer leak (bundle, assistant, PDF) | Server-only registry, provider receives one deck, leak-check on the built JS, per-deck cookies, assistant confidentiality rule and evals |
| Low-resolution photos look soft | Split hero and capped photo widths; request originals |
| Generalizing the islands touches the most complex art code (`FactoryScene` 416 lines, `sceneEngine` 401 lines) | Keep the 3-slot geometry; swap only the art per id; HP snapshot gate |
| v2 copy changes during the build | v2 md is the single source; `content-check` flags drift |
| Next 16 API differences (async `params`, `proxy.ts`) | Read `node_modules/next/dist/docs/` before route work, per `BUILD_BRIEF.md` |

---

## 10. Decisions needed from Jayson

1. **Root `/` behaviour.** Recommended: internal gallery behind `ACCESS_CODE_GALLERY`, and visitors holding a single deck cookie are redirected to their deck. This matters if the Hòa Phát link was already sent as the bare domain.
2. **Nestlé logo in the hero lockup.** Supply a white logo PNG or SVG, or keep the text wordmark "NESTLÉ TRỊ AN" (recommended unless you have an approved logo file).
3. **Image 3 (manual palletising).** Skip it (recommended) or place it small in `thu-ngo`.
4. **Higher-resolution photos.** Can you get originals of images 1, 2 and 4 (≥ 2000px)? Then the hero can go full-bleed like Hòa Phát's.
