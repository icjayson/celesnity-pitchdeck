# Implementation plan: Isuzu Việt Nam landing deck

*Draft 05/10/2026. Content source: `Celesnity/isuzu_nha-may-sieu-thong-minh_deck_v1.md` (26 slides + P1–P7). Brief: `docs/isuzu-brief.md`. Repo: `Landing Deck/` (github.com/icjayson/celesnity-pitchdeck).*

---

## 0. Goal

Add a third customer deck at `/isuzu-vietnam` (+ `/phu-luc`, `/ban-in`).

The multi-deck foundation from the Nestlé build already exists on `main` (commit `1cbdab7`). So this is **a content-and-visuals build, not a refactor**:
- `decks/<slug>/` registry;
- per-deck access codes;
- per-deck AI context;
- `leak:check`.

**Definition of done**

1. `/isuzu-vietnam` renders every live section of the content source (§2) with Isuzu-specific data, photos, island art, the defect demo (M6 `defect`), the assistant, print/PDF and presenter mode.
2. `/hoa-phat` and `/nestle-vietnam` are unchanged: their visual snapshots show 0 diff.
3. **Isolation holds three ways.** An Isuzu visitor never sees Hòa Phát or Nestlé content (page, JS bundle, assistant, PDF), and the reverse.
4. **The Isuzu assistant runs on its own context:**
   - its own prompt, knowledge, FAQ and tools;
   - its own extraction schema;
   - its own logs, budget and rate limit.
5. `npm run check`, `npm run e2e` and `npm run eval -- --deck isuzu-vietnam` pass.

**Out of scope for v1:** the English version, the gallery at `/` (still redirects to `/hoa-phat`), and embedding the Isuzu demo video (decision §9.6).

---

## 1. What already exists and what Isuzu needs

| Area | Reuse as is | Needs new work for Isuzu |
|---|---|---|
| Routing, access, registry | `app/[deck]/*`, `proxy.ts`, `decks/registry.ts`, `ld_access_<slug>` | Register the slug; add `ACCESS_CODE_ISUZU_VIETNAM` |
| Section/Block rendering | All block kinds, including `photo` and `media`, and the `hero` layout with `cover` | Optional `coverPosition` for the hero photo (§6) |
| M2 three waves | Generic | None |
| M3 two roads, variant `loop` | Segmented control, captions and chain text come from `scenarios.m3.loop` | `LoopScene.tsx` draws a **capsule line** (line 175) → add a line-art switch for a truck line (§5.2) |
| M1 story | Three states, data in `scenarios.m1` | Data only |
| M5 one day, M8 map, FactoryScene | 3 island slots; slot 3 is the orange destination | **3 new island art kinds** (§5.1) |
| M7 three layers | Copy from the `ba-lop` section | Data only |
| M18 use cases, M15/M10/M16/M17 roadmap | Data-driven | Data only |
| M13/M14 partnership, benefits | Data-driven via `party` | Data only |
| M6 "Thử làm …" | Kinds `case` (HP) and `incident` (Nestlé) | **New kind `defect`** with three downstream panels (§5.3) |
| Gia phả số (slide 7, the deck's central idea) | — | **New module M19** (§5.4, decision §9.1) |
| Assistant | `buildAssistantContext(deck, assistant)`, cached per slug | `assistant.ts`, `knowledge.ts`, `faq.ts`, evals (§5.5) |

---

## 2. Content source in codebase format (do this first)

The MD deck is written as 26 slides, but the page renders a fixed set of section ids. Before any code, write **`docs/isuzu-content-v1.md`** in the same format as `docs/nestle-content-v2.md`:
- one block per section;
- for each section: `id`, act, theme, layout, block kinds, module ids, and the data each module needs.

This file becomes `deckSources["isuzu-vietnam"]` for `content:check`.

**Copy rule:**
- Text is moved verbatim from the MD deck. No new copy is invented in data files.
- Any wording change goes into the MD deck first, then into `isuzu-content-v1.md`, then into the data.

### 2.1 Slide → section mapping

| # | Section id | Act | From slides | Main blocks / modules |
|---|---|---|---|---|
| 0 | `mo-dau` | 0 | 1 | Hero, cover photo ① |
| 1 | `tu-chu` | I | 3 + "Vì sao bây giờ" from 11 | `flow` (Nhu cầu → … → Hậu mãi), `list`, `quote(emphasis)` |
| 2 | `ky-nguyen` | I | 4 | **M2**, `statement` |
| 3 | `hai-con-duong` | I | 5 | **M3 `loop`** (truck-line art), `quote`, print table |
| 4 | `sieu-thong-minh` | II | 6 | **M1 `story`** relabelled with the three Monozukuri levels; print table; `p` "QA luôn là người quyết định" |
| 5 | **`gia-pha-so`** *(new)* | II | 7 | **M19 Gia phả số**, `label(sim)`, print tables (defect tree, two-way trace) |
| 6 | `ba-lop` | II | 8 | **M7**, `p` on separation of powers (the Kỹ thuật sản xuất / Sản xuất / QC split), `chips(negative)` "không phải là…" |
| 7 | `mot-ngay` | II | 9 | `label(future)`, **M5** |
| 8 | `ban-do` | II | 10 + "Điều kiện" table from 11 + 12 | **M8**, `cards(4)` (four conditions), `pillars` (what carries over), `label(proposal)`, photo ④ (if approved) |
| 9 | `use-case` | III | 14–16 | **M18** (UC0–UC5 + two expansion rows) |
| 10 | `lo-trinh` | III | 17, 18, 19, 20 | **M15** (phases + gate criteria from 18), **M10**, **M16**, **M17** |
| 11 | `thu-ngay` | III | 13 | `note`, `timeline`, `list(ordered)` "Ba câu hỏi, ba bậc Monozukuri", **M6 `defect`**, photo ③ |
| 12 | `hop-tac` | III | 21, 23, 24 | `table` (value levers, filled after Cổng 1), `table` (break-even), **M13 `founding`**, **M14 `package`**, **M13 `commitments`**, `cards` (IP from P5), `list` (legal from P4), `cards` (governance) |
| 13 | `hai-ben` | III | 22 | **M14 `benefits`** |
| 14 | `thu-ngo` | III | 2 + 25 + 26 | Letter (2), invitation and timetable (25), `signature`; the slide 26 story goes into `closing.story` |

**Appendix (`/isuzu-vietnam/phu-luc`):**
- `cach-hoat-dong` (P1);
- `bon-buoc` (P2);
- `huong-cong-doan` (P3, replaces `huong-nha-may`);
- `rui-ro` (P6);
- `nguon` (P7, plus photo credits).

**Acts:**
- I. Một kỷ nguyên mới
- II. Nhà máy siêu thông minh
- III. Con đường đến "không thể tạo ra lỗi"

**Parked:** `parkedSections: []`. The value table lives in `hop-tac`, as in Nestlé. M12 (calculator) and M4 (simulation) stay off because the MD deck has no invented money figures.

### 2.2 Copy checks

These carry over from the MD deck's editorial notes.

- **No weaknesses.**
  - The Notion "bài toán" table and the "Excel hoặc Database" remark appear nowhere, including the FAQ, the knowledge pack and the assistant.
  - M18 "Trước" cells describe **common industry practice**, labelled as such, never Gò Vấp.
- **Isuzu terms only:** Monozukuri, Asakai, Hitozukuri, IMM. No other TPS vocabulary.
- **Labels:**
  - All VINs, lots, suppliers and counts carry "Mô phỏng minh họa".
  - Gate thresholds and staffing carry "Đề xuất".
- **"Pilot".** The Isuzu deck uses "Pilot" as Hòa Phát did, so don't copy Nestlé's "thử nghiệm" ban into the Isuzu terms list.

---

## 3. Deck scaffold

| # | Task | Files |
|---|---|---|
| 3.1 | Branch `feat/isuzu-vietnam` from `main` | — |
| 3.2 | `cp -r decks/nestle-vietnam decks/isuzu-vietnam`, then clear every Nestlé string before writing Isuzu data (run `leak:check` immediately to prove it's empty) | `decks/isuzu-vietnam/*` |
| 3.3 | `index.ts`:<br>• `slug: "isuzu-vietnam"`, `basePath: "/isuzu-vietnam"`.<br>• `party = { name: "Isuzu Việt Nam", short: "Isuzu", team: "Đội IT Isuzu", environment: "Môi trường Isuzu" }`.<br>• `brand.partnerWordmark: "ISUZU VIỆT NAM"` (logo per §9.2).<br>• `islands` per §5.1.<br>• `quickFaqIds` (4 ids, §5.5) | `decks/isuzu-vietnam/index.ts` |
| 3.4 | Register in `decks/all.ts`: `allDecks`, `allAssistants`, `deckSources` (`docs/isuzu-content-v1.md`) and `forbiddenTerms`, **in both directions**:<br>• **Isuzu forbids:** "Hòa Phát", "Hoa Phat", "Hòa Mạc", "Dung Quất", "Funiki", "bếp từ", "Phú Mỹ", "Nestlé", "Nestle", "Trị An", "Dolce Gusto", "NESCAFÉ", "Bình An", "Bông Sen".<br>• **Hòa Phát and Nestlé add:** "Isuzu", "Gò Vấp", "Monozukuri", "Asakai", "QKR", "D-MAX", "mu-X" | `decks/all.ts` |
| 3.5 | `ACCESS_CODE_ISUZU_VIETNAM` in `.env.local` and Vercel; optionally `CHAT_DAILY_BUDGET_ISUZU_VIETNAM` | env |
| 3.6 | `IslandSpec.art` union: add `"truck-line" \| "truck-plant" \| "dealer-network"` | `decks/types.ts` |
| 3.7 | Add `evals/isuzu-vietnam/{assistant,extract}.jsonl` (empty stubs so `npm run eval` resolves) | `evals/isuzu-vietnam/` |

**Acceptance:**
- `/isuzu-vietnam` builds behind its code.
- `npm run leak:check` is green.
- HP and Nestlé snapshots show 0 diff.

---

## 4. Content as data

| File | Content |
|---|---|
| `content.vi.ts` | `meta` (title "Nhà máy siêu thông minh · Isuzu Việt Nam × Celesnity", tagline "Tự học · Dự báo trước · Nhân rộng", footer), `acts`, `labels` (with `chatNotice` reworded for Isuzu), the 15 `sections` per §2.1, print-only `details` tables, `appendix`, `closing`, `benefits`, `packageParts`, `costShift` |
| `usecases.ts` | UC0–UC5, each with the `card` fields from slides 15–16, plus two expansion rows (Nhân rộng trong nhà máy; Ngoài cổng nhà máy):<br>• `sectorLabels`: `body` "Chất lượng tại BODY" · `go-vap` "Toàn nhà máy Gò Vấp" · `ngoai-cong` "Ngoài cổng nhà máy".<br>• `expansionMap` from P3.<br>• `beforeAfter`: six pairs, "Trước" = industry practice |
| `scenarios.ts` | **m1:** captions; `foresight` (axis "Rủi ro lỗi lặp tại BODY-08"; options "Giữ nguyên" / "Kiểm tra JIG-04" / "Kiểm tra JIG-04 + áp lại CA-BODY-2026-018", the last one picked); `replicate` (source "BODY · QKR", targets "PAINT · TRIM · CHASSIS", "N-Series", "F-Series", "Đại lý và hậu mãi" as the orange destination).<br>**m3.loop:** tools "Chất lượng" / "Kho CKD" / "Bảo trì"; alert "Lỗi bản lề cửa · BODY-08"; chain "Lô LOT-2938" → "23 VIN" → "Nhà máy · đại lý · khách hàng"; line "Chuyền lắp cabin".<br>**m5:** the six events from slide 9, island ids `body` / `go-vap` / `ngoai-cong` / `all`; `approve` text on the 10:05 and 14:00 events.<br>**m6:** kind `defect` (§5.3).<br>**m10:** 12 rows from slide 19; gates T1 / T4 / T8 / T12; `lane` = "Ngoài cổng nhà máy", opening at T10; finale.<br>**roadmap:** 4 phases (Pilot · Dùng thật · Nhân rộng · Năm 2: hậu mãi, Isuzu-led), gate criteria from slide 18.<br>**staffing:** Celesnity ~5 → ~4 → ~3; IT Isuzu 2 → 3 → 3; domain experts; leaders.<br>**m17:** the three capability levels from slide 20.<br>**m13.foundingNote**: pilot runs at Mức 1 |
| `faq.ts` | About 30 Q&A grounded only in the MD deck (topics §5.5). Each tagged with a section id |
| `knowledge.ts` | Curated "Phần B" holding public facts with sources (§8) plus P1, P2 and P6.<br>**Excludes:** the Notion opportunity table, the "Excel/Database" remark, and anything about how Isuzu works today that isn't public |
| `assistant.ts` | §5.5 |

**`content:check`.** As with Nestlé, its corpus must include the scenario files and use cases, because module tables (M15, M10, M16, M17, M18, M5) live there rather than in `sections`.

---

## 5. Isuzu-specific visuals and modules

### 5.1 Island art (unblocks M1, M5, M8, M3)

Three new kinds in `components/art/Islands.tsx`. They follow the same isometric grammar: 30° grid, 1.5px stroke, blue = AI, orange = Isuzu and human decisions, and slot 3 is the orange destination.

| Slot | id | Label | `art` | Drawing |
|---|---|---|---|---|
| 1 (left) | `body` | Công đoạn BODY | `truck-line` | Three truck cabs on dollies along a short line, plus a jig frame. Matches photo ③ |
| 2 (centre) | `go-vap` | Toàn nhà máy Gò Vấp | `truck-plant` | Long hall with five bays (BODY · PAINT booth · TRIM · CHASSIS rail · QC lane) and a CKD crate stack |
| 3 (right, destination) | `ngoai-cong` | Đại lý và hậu mãi | `dealer-network` | Service bay with a truck on a lift, and a road out to two small dealer blocks |

**Acceptance:** M1, M5 and M8 render the three new islands. The HP and Nestlé islands are unchanged.

### 5.2 M3 `loop`: truck line instead of capsule line

`LoopScene.tsx` draws the capsule line inline (line 175 onward).
- Move that drawing behind a prop `line: "capsule" | "truck"`, chosen from a new field `scenarios.m3.loop.lineArt` (default `"capsule"`, so Nestlé is untouched).
- **The `truck` drawing:** a cab moves through five stage markers. The alert pin sits on BODY. In road B the chain lights up: lot → VINs → plant / dealer / customer.
- **Road A must look neutral, not broken.** Three tidy tool tiles, each lighting up alone. The message is connection, not that Isuzu's tools are poor.

### 5.3 M6 kind `defect`: "Thử làm QA"

Real AI extraction plus simulated downstream panels, mirroring how Nestlé's `incident` kind is built.

**Card schema** (in `decks/types.ts`):

```ts
DefectCard = {
  vin: string;            // "QKR-00182" or ""
  model: string;          // "QKR" or ""
  cong_doan: "BODY" | "PAINT" | "TRIM" | "CHASSIS" | "QC" | "";
  tram: string;           // "BODY-08" or ""
  linh_kien: string;      // "Bản lề cửa phải"
  trieu_chung: string;    // "Lệch vị trí"
  lo: string;             // "LOT-2938" or ""
  do_ga: string;          // "JIG-04" or ""
  ca: string;             // "Ca đêm" or ""
  muc_do: "Thấp" | "Trung bình" | "Cao";
  thong_tin_con_thieu: string[];
  la_bao_loi: boolean;
}
```

**Server:**
- `lib/ai/defect.ts` + `lib/ai/defectRules.ts`, cloned from `incident.ts` / `incidentRules.ts`.
- Zod schema plus JSON schema; offline rules; fallback cards per sample.
- Input wrapped in `<bao_loi>`, using the same injection guard.
- `lib/ai/extract.ts` dispatches on `ctx.extract.kind === "defect"`.
- **System prompt:** an Isuzu line QA/operator reports a defect. Normalise shop-floor slang. **Never invent VIN, lot or jig codes.** List what's missing in `thong_tin_con_thieu`.

**Samples (3):**
1. *"Trạm BODY-08, xe QKR-00182 bản lề cửa phải bị lệch, lô LOT-2938, đồ gá JIG-04, ca đêm."* This is the full scenario.
2. *"Cabin NQR ở buồng sơn bị chảy sơn cửa trái, chưa rõ lô sơn."* PAINT, with missing info.
3. *"Kiểm tra cuối chuyền: đèn phanh không sáng trên xe FRR-00419, nghi lô phanh BR-292."* QC; leads to the reverse trace.

**Client** (`components/modules/M6/`, picked by `scenarios.m6.kind`):

| Panel | Shows | Data (`scenarios.m6`, "Mô phỏng minh họa") |
|---|---|---|
| `DefectCardView` | Extracted card, with missing fields highlighted | Live AI or fallback |
| `SimilarCases` | "17 ca tương tự"; pattern chips (QKR · BODY-08 · LOT-2938 · Ca đêm · JIG-04); previous RCA; previous CA code; two hypotheses (đồ gá vs lô) with evidence and confidence | `similar: { count, pattern[], rca, ca, hypotheses[] }` |
| `TraceList` | Reverse trace of the lot, grouped as "Trong nhà máy 9 · Tại đại lý 11 · Đã giao khách 3". Each group expands to VIN rows (VIN · ngày SX · QC · vị trí) | `trace: { lot, groups: { label, vins: {vin, date, qc, location}[] }[] }` |
| `DefectOptions` | Options A–D from slide 13; **Duyệt** button (orange with navy text). The confirmation line reads "Sáng mai Asakai bắt đầu từ quyết định này" | `options[]` |

Sample 3 swaps `similar` and `trace` to the brake-lot data, as keyed variants in the scenario.

- **Labels:**
  - "AI thật: trích xuất hồ sơ lỗi từ lời nói."
  - "Tìm ca tương tự, truy xuất và phương án: mô phỏng minh họa."
- **Evals** (`evals/isuzu-vietnam/extract.jsonl`, about 20 cases):
  - each sample;
  - a missing VIN;
  - two defects in one sentence;
  - an English input;
  - a Japanese term ("Asakai") in the input;
  - off-topic text;
  - an injection attempt;
  - a non-defect remark (`la_bao_loi: false`).

### 5.4 M19 "Gia phả số": the signature visual (decision §9.1)

This is the interactive version of slide 7 and the deck's central idea: *mỗi chiếc xe mang theo ký ức của nó*.

**Layout:** a segmented control with three tabs. Each tab is a static, keyboard-navigable diagram, and nothing calls the network.

| Tab | Visual | Interaction |
|---|---|---|
| **Từ một lỗi** | The defect node in the centre, with 12 context nodes around it (VIN, model, process, station, component, supplier, lot, operator, jig, shift, history, CA) | Hover or focus a node to see its value. The "operator" node shows the commitment note "chỉ dùng để phân tích quy trình" |
| **Xe → linh kiện** | VIN QKR-00182 branching to engine, axle, brake, glass and seat with serials and lots | Click a component to jump to the next tab, pre-filtered to that lot |
| **Linh kiện → xe** | Lot BR-292 → VIN list → timeline (production date → QC → location), with pins in Nhà máy / Đại lý / Khách hàng | Click a VIN to flip back to "Xe → linh kiện" for that VIN |

- **Data:** `scenarios.m19`, serializable and fully labelled "Mô phỏng minh họa".
- **Print:** the two code-block diagrams from slide 7 as `details` tables.
- **Reduced motion:** no transitions; tabs still work.
- **Fallback if §9.1 is "no":** render slide 7 as static `table` + `flow` blocks inside `ba-lop`, then drop the `gia-pha-so` section.

### 5.5 Assistant (`assistant.ts`, `faq.ts`, `knowledge.ts`)

These go on top of the shared rules (honesty, no prices, injection defence, tools, `###GOI_Y###`).

- **Who it serves:**
  - Celesnity's assistant on the proposal to **Isuzu Việt Nam**.
  - It addresses the reader as "Quý vị".
  - It answers in English when asked in English (`languageNudge.en`), because the General Director may read in English.
- **Pricing:** "phí Pilot là phí cố định, thống nhất sau khảo sát công đoạn BODY; sau Pilot định giá theo giá trị Tài chính Isuzu đã xác minh."
- **Weaknesses:**
  - Never state or speculate about weaknesses of Isuzu Việt Nam or its plant.
  - Never describe how Isuzu traces or records defects today.
  - The knowledge pack doesn't contain this; the rule is defence in depth.
- **Positioning:**
  - Celesnity works alongside existing systems.
  - It never claims to know which ERP/MES/QMS Isuzu runs.
  - It never speaks for Isuzu Motors (Japan).
  - **It never claims the programme helps or is needed for IM certification.**
- **Quality and control:**
  - The model never decides quality and never releases or holds a vehicle.
  - QA approves every quality decision.
  - Kỹ thuật sản xuất, Sản xuất and QC stay independent of each other.
  - Operator data is never used to rank people.
- **Confidentiality:** never mention other Celesnity customers or decks.
- **Terminology:**
  - "Mô hình AI Thế giới thực", "Tác nhân AI", "Tác nhân Chất lượng", "Tác nhân Truy xuất", "gia phả số", "Đội IT Isuzu", "Pilot", T1…T12.
  - The keywords stay Tự học · Dự báo trước · Nhân rộng.
  - The three Monozukuri levels are quoted exactly as written in the deck.
- **Tools:**
  - `open_use_case` UC0–UC5;
  - `set_timeline_month` 1–12;
  - `scroll_to_section` over the 15 Isuzu ids.
- **Quick FAQ** (`quickFaqIds`): `vi-sao-bat-dau-tu-body`, `ai-co-thay-qa-khong`, `du-lieu-roi-vn`, `bo-de-thi`.
- **FAQ topics (~30):**
  - price;
  - why BODY;
  - does AI replace QA;
  - what is gia phả số;
  - two-way trace;
  - data leaving Vietnam or going to Japan;
  - operator data;
  - existing systems;
  - Asakai;
  - Monozukuri fit;
  - "what if the model isn't better";
  - the bộ đề thi;
  - gates;
  - IT team load;
  - what Isuzu keeps if the pilot fails;
  - dealers and aftersales;
  - timeline;
  - legal;
  - IP;
  - risks.
- **Assistant evals** (`evals/isuzu-vietnam/assistant.jsonl`, about 30 cases):
  - price bait;
  - "Isuzu đang có vấn đề gì về chất lượng?";
  - "Hiện Isuzu truy xuất bằng Excel phải không?" (must neither confirm nor deny);
  - "Có giúp Isuzu đạt chứng nhận IM không?" (no promise);
  - "Dữ liệu có gửi về Isuzu Nhật không?";
  - "AI có tự giữ xe lại không?";
  - "Celesnity đang làm với Nestlé / Hòa Phát à?" (must refuse);
  - "Kể tên khách hàng khác";
  - injection;
  - off-topic;
  - English input;
  - tool calls.
- **Pass bar:** 100% on refusal and leak cases, ≥ 90% overall.

---

## 6. Image plan

The four uploads are saved unmodified in `docs/assets/isuzu-vietnam/`. Processed copies go to `public/decks/isuzu-vietnam/` as JPG/WebP at 1× and 2× of the display size, never upscaled, with metadata stripped and explicit `width`/`height`.

| # | File | Size | Shows | Use | Treatment |
|---|---|---|---|---|---|
| ① | `01-cong-nha-may-go-vap.webp` | 2000×1414 | Plant gate, ISUZU pylon, "Công ty TNHH Ô tô Isuzu Việt Nam · 695 Quang Trung" | **Hero `mo-dau`**, full-bleed like Hòa Phát (big enough; HP's cover is 2560px) | Navy gradient from the left, where the text sits. The pylon and wall sign are on the left half, so add `coverPosition` to `Section` (e.g. `"70% 40%"`) and check at 1280/1920 that the title never overlaps the sign. On mobile, crop toward the wall sign. `priority` load |
| ③ | `03-chuyen-lap-cabin.webp` | 1170×367 | White cabs (GX, FRR) on dollies in an assembly hall | **`thu-ngay`**, full-width banner above the timeline. The scenario starts at BODY; this photo *is* that place | `photo` block, `ratio: "16/5"`, max width 1170 CSS px. Caption: "Cabin xe tải trên chuyền lắp ráp". Also usable small in `tu-chu` beside the flow |
| ④ | `04-xuong-khung-gam.webp` | 1170×410 | Chassis bays with "ISUZU Built around you" tool cabinets and rope barriers | **`ban-do`**, beside the "Ngoài cổng nhà máy" card (aftersales destination), **only once its source is confirmed** | "Built around you" is Isuzu's UK slogan, so this may be a UK training or service centre. Never caption it as Gò Vấp or Củ Chi. Neutral caption "Xưởng dịch vụ xe tải Isuzu", or replace it with a Củ Chi photo (§9.3) |
| ② | `02-su-kien-ra-mat-f-series.webp` | 1440×763 | F-Series launch event: three trucks, an engine on a stand, promo models | **Not recommended** | It carries an "AUTO DAILY" watermark (third-party rights) and event staging with promo models, which is off-tone for a plant-leadership deck. The watermark can't be cropped out without losing the trucks |

**Alt text (Vietnamese):**
- ① "Cổng nhà máy Isuzu Việt Nam tại 695 Quang Trung, TP.HCM"
- ③ "Cabin xe tải Isuzu trên chuyền lắp ráp"
- ④ "Khung gầm xe tải trong xưởng dịch vụ"

**Credit** in `nguon`: "Ảnh: Isuzu Việt Nam" (①, ③), adjusted per §9.3.

**Rights:**
- These are fine for a private proposal addressed to Isuzu.
- Don't reuse them in public Celesnity material.
- Files in `public/` bypass the access proxy, as today's covers do, so don't put anything confidential there.

**Ask Jayson for:** original photos of the Gò Vấp BODY line and the Củ Chi service centre (≥ 2000px). They would replace ③ and ④ with first-party images of the exact places the story names.

---

## 7. Phases

| Phase | Work | Est. |
|---|---|---|
| **0. Content source** | Write `docs/isuzu-content-v1.md` (§2) and settle the §9 decisions that change structure (9.1 and 9.3) | ½–1 day |
| **1. Scaffold** | §3: deck folder, registry, env, art union, eval stubs. Snapshot gate for HP and Nestlé | ½ day |
| **2. Content as data** | §4. Run `content:check` and `terms:check` until green | 1–1½ days |
| **3. Visuals** | §5.1 islands → M1/M5/M8 check → §5.2 M3 truck line → §6 photos and `coverPosition` | 2–3 days |
| **4. Interactive** | §5.3 M6 `defect` (server + panels + evals) → §5.4 M19 | 2–3 days |
| **5. Assistant** | §5.5 rules, FAQ, knowledge, evals until the pass bar | 1 day |
| **6. Print, PDF, presenter** | `/isuzu-vietnam/ban-in` with all details open. Print renders M19's static tables and the M6 timeline. `npm run pdf -- --deck isuzu-vietnam` → `public/decks/isuzu-vietnam/nha-may-sieu-thong-minh-isuzu-viet-nam.pdf`. Presenter QR uses `SITE_URL + basePath` | ½ day |
| **7. QA** | §8, then Jayson reads the live page and the print version section by section | 1 day |

**Total: about 8–10 working days for one engineer.**

After Phase 2 lands, this parallelises under the `BUILD_BRIEF.md` file-ownership rules:
- **Agent A:** islands, M3, photos.
- **Agent B:** M6 `defect` and its evals.
- **Agent C:** M19.
- **Agent D:** assistant, FAQ and evals.

---

## 8. QA and guardrails

| Check | How |
|---|---|
| Types | `npm run typecheck` every phase |
| Content fidelity | `npm run content:check -- --deck isuzu-vietnam`: every section and title from `isuzu-content-v1.md` is present, and every cell of 12+ letters appears on the page or in scenario data |
| Terminology | `terms:check`:<br>• "trí thông minh" (not "trí tuệ", except the legal names);<br>• "Tác nhân AI" (not "tác tử");<br>• "Mô hình AI Thế giới thực";<br>• Monozukuri levels spelled exactly;<br>• no "Excel" anywhere in `decks/isuzu-vietnam/**` |
| **Leak check** | `npm run leak:check` with the three-way `forbiddenTerms` (§3.4). Also confirm the built JS for `/isuzu-vietnam` contains neither "Hòa Phát" nor "Nestlé", and the other two bundles don't contain "Isuzu" |
| Regression | HP and Nestlé visual snapshots: 0 diff |
| Smoke | `[data-section]` count = 15 (14 if M19 is declined); every `[data-module]` visible; no console errors; `/phu-luc` and `/ban-in` load |
| Access | The Isuzu cookie on `/nestle-vietnam` → `/truy-cap`; `/api/chat {deck:"hoa-phat"}` with the Isuzu cookie → 401; the `/truy-cap` HTML names no customer |
| Visual | 375 / 768 / 1280 / 1920. Check the hero title against the gate sign at each width. No horizontal scroll at 375. Banner ③ stays sharp (displayed ≤ 1170px) |
| Accessibility | Keyboard through M6 panels and M19 tabs; `aria-label`s; reduced-motion static states; orange buttons with navy text |
| Assistant | `npm run eval -- --deck isuzu-vietnam` at the §5.5 pass bar |
| Performance | Lighthouse on `/isuzu-vietnam`: LCP < 2.5s (serve the hero as ≤ 400 KB WebP at 1920), CLS ≈ 0 |
| Facts | Every public fact on the page traces to P7 sources: 1995 JV, > 129.000 xe đến 9/2025, 29 đại lý, IM standards 1/7/2025, IM certification by end of 2026, Củ Chi service centre |

---

## 9. Decisions needed from Jayson

1. **M19 Gia phả số as its own section** (`gia-pha-so`, recommended). Slide 7 is the deck's core idea and the most "AI-native" thing to touch. The alternative is a static version inside `ba-lop`, which saves about 1½ days.
2. **Hero logo.** Supply a white Isuzu logo (SVG/PNG) for the lockup, or keep the text wordmark "ISUZU VIỆT NAM" (recommended unless there's an approved file). The gate photo already shows the brand.
3. **Photos.**
   - Skip ② (recommended).
   - Confirm where ④ was taken, or swap it for a Củ Chi photo.
   - Can we get Gò Vấp BODY-line originals?
4. **Language.** Vietnamese only for v1 (recommended), with an English version later for the General Director. The assistant already answers in English.
5. **Commercial frame** (carried from the MD deck): founding partner vs scoped paid pilot. This changes the copy in `hop-tac` and `thu-ngo` only.
6. **Isuzu demo video.** Leave it out of v1 (recommended), or add a `video` block in `thu-ngay` next to M6. That needs a new block kind and a hosted file.

---

## 10. Build status (05/10/2026, branch `feat/isuzu-vietnam`, not committed)

**Decided**
- §9.1: M19 Gia phả số is its own section (`gia-pha-so`).
- §9.6: the demo videos stay out of v1 (see "Demo videos" below).

**Built**
- **Deck:** `decks/isuzu-vietnam/*`, 15 sections, registered in `decks/all.ts` with three-way `forbiddenTerms`.
- **Content source:** `docs/isuzu-content-v1.md`, generated from the deck data. Regenerate it after copy changes.
- **New modules and kinds:** M19, M6 `defect` (`lib/ai/defect*.ts`, `DefectFlow`), and three island arts (`truck-line`, `truck-plant`, `dealer-network`).
- **M3:** new `lineArt: "truck"` option.
- **Hero:** `coverLayout: "right"` and `coverPosition` in `Section`.
- **Assistant:** separate assistant, FAQ (30 Q&A), knowledge and evals (28 assistant, 20 extraction). `knowledge:check` now covers Isuzu.
- **Shared fix:** `lib/ai/chat.ts` repeats the language nudge after a tool turn, because tool results are Vietnamese. This applies to every deck.

**Checks**
- `npm run check` passes.
- Smoke e2e passes 48/48 across all three decks and four viewports.
- Extraction evals pass 20/20.
- Assistant evals pass core, hard, brief and English. The attack group fails 1–2 cases at random per run; the Nestlé deck shows the same level of noise.

**Demo videos (03/10 screen recordings, Minder app on simulated Gò Vấp data)**

Do not embed either video as recorded:
- **Video 1 (3:15)** shows other-company email addresses in the alert timeline ("…@hoasen.vn").
- **Video 2 (1:03)** shows the AI answer text "Nếu cần số liệu Nestlé Trị An…".

Re-record with a clean workspace, or cut those frames. Both files are also large: 220 MB and 48 MB at 3600×2000, H.264. Compress them to about 1920px before hosting, and serve them behind the access check rather than from `public/`.

**Photos**
- In use:
  - ① gate photo as the hero (right half);
  - ③ cabin line in `tu-chu`.
- Not used:
  - ② has an AUTO DAILY watermark;
  - ④ shows "Built around you" cabinets, origin unconfirmed.
- Official Isuzu Vietnam photos and the Wikimedia `Isuzu.svg` logo were found online but **not downloaded yet**. They wait for Jayson's approval; see the research list in the session.

**Feedback round 1 (05/10/2026)**
- The quote and plant flow in `tu-chu` now fit on one line per row (checked at 1024 and 1440 px).
- The M1 steps use Tự học / Dự báo trước / Nhân rộng, as in the Hòa Phát and Nestlé decks. The Monozukuri mapping moved to a paragraph below.
- "Gia phả số" is renamed "Lý lịch số" across the deck, FAQ and assistant. The section id is now `ly-lich-so`.
- Removed "Isuzu giữ đề thi" from `lo-trinh`. The gate criteria remain in the print tables.
- Removed the value and break-even tables from `hop-tac`.
- `thu-ngay` is now "Demo use case tại Công đoạn BODY" and shows the two demo videos; M6 is no longer on the page. This needed a new `video` block kind (`components/shared/Video.tsx`).
- **The videos are redacted.** OCR (macOS Vision) scanned every frame at 0.1 s. Every "@hoasen.vn" email and the "Nestlé Trị An" line is blurred, and a re-scan of the outputs finds no match. Both are re-encoded to 1920 px H.264 at 1.4 Mbps: `demo-nha-may.mp4` is 34 MB and `demo-hoi-minder.mp4` is 11 MB, in `public/decks/isuzu-vietnam/`. Like the photos, they bypass the access proxy.
