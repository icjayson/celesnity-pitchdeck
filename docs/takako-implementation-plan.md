# Implementation plan: Takako landing deck

*Draft 10/10/2026. Brief: `docs/takako-brief.md` (v4). Content source, still to be written: `docs/takako-content-v1.md`. Proposed slug: `takako-vietnam`.*

---

## 0. Goal

Add a fourth deck at `/takako-vietnam` (+ `/phu-luc`, `/ban-in`). It positions **Minder AI as Takako's proactive operations assistant** and goes out with the pilot proposal on 16/10.

It is the first deck that is **not built around the World Model**. So this build has two parts:

1. **Loosen the shared code** that assumes the World Model story. Other decks must not change.
2. **Build a product-led layout:** what Minder AI sends, to whom, under which rules. No spheres, no islands, no "three waves".

**Definition of done**

1. `/takako-vietnam` renders all 11 sections (§4) with:
   - **M20 "Minder AI làm việc"** in three variants: `cover`, `rule`, `feed`;
   - print/PDF that includes the feed content;
   - presenter mode;
   - layout checked at 375 / 768 / 1280 / 1920 px.
2. `/hoa-phat`, `/nestle-vietnam` and `/isuzu-vietnam` show **0 diff** in their visual snapshots.
3. **Isolation both ways.** Takako's page, bundle and PDF never contain another client's name, and the reverse.
4. **No floating AI assistant on this deck.** Nothing in it calls a cloud API, consistent with "AI chạy trong nhà máy".
5. **Copy rules hold, enforced by `terms:check` / `leak:check`:**
   - no individual from Takako, named or quoted (`anh Thảo` is a forbidden term);
   - no "template cố định", no "chatbot";
   - no World Model in the main flow.
6. `npm run check` and `npm run e2e` pass.
7. `ACCESS_CODE_TAKAKO_VIETNAM` is set on Vercel **before** the first deploy. A deck with no code is open to anyone (`lib/access.ts`).

**Out of scope for v1:**

- the English or Japanese version (decision §9);
- the AI assistant and evals;
- real photos or the Takako logo (wordmark only).

---

## 1. Where the current code leans toward World Model, and how to fix it

| # | Location | Problem for Takako | Fix | Effect on old decks |
|---|---|---|---|---|
| 1 | `DeckData` (`decks/types.ts`) | Requires `benefits`, `packageParts`, `costShift`, `useCases`, `islands`, `scenarios.m1/m3/m5/m6/m10/roadmap/staffing/m17/m13`… Takako needs none of them, so it would have to ship fake data to the browser | Make template fields **optional**. Add a `useScenario(key)` helper that throws a clear error if a module sits in a deck without its data | None (types only, same data) |
| 2 | `components/modules/M1/Cover.tsx` | The only hero art is the World Model sphere with Tự học / Dự báo trước / Nhân rộng orbits | Takako's hero uses **M20 variant `cover`** (the existing `layout: "hero"` already takes a module) | None |
| 3 | `Section.tsx` hero branch + `Assistant.tsx` | A hero with no module leaves an empty slot for the chat box. The assistant is always mounted in `page.tsx` | Add `DeckData.features?.assistant` (default `true`). When `false`: don't mount `<Assistant/>`, render no `data-hero-chat-slot`, `api/chat` returns 404, and `evals` / `knowledge:check` skip the deck | None (default stays on) |
| 4 | `app/[deck]/phu-luc/page.tsx:27`, `components/assistant/ChatMessages.tsx:81` | Hard-coded "Nhà máy siêu thông minh" | Use `meta.title` (or a new `meta.series`) | Old decks pass the old string, so output is unchanged |
| 5 | `M13` variant `commitments` | Reads its list from details in sections with id `hai-ben` / `hop-tac`, so it is tied to section ids | Takako uses a new **`checklist`** block instead (§3.3) | None |
| 6 | `M5`, `M8`, `FactoryScene`, `Islands` | Factory "islands" drawn per deck | Not used in Takako | None |

**Fallback if time runs short:** fix 1 can be swapped for empty stubs inside `decks/takako-vietnam/`. That's quicker but ships junk data. Only use it if 12/10 slips.

---

## 2. Content source (do this first)

Write **`docs/takako-content-v1.md`** in the same format as `docs/isuzu-content-v1.md`:

- one `## \`#id\`` per section;
- the title is the first `###` line;
- tables carry the data;
- a `# \`/phu-luc\`` part for the appendix.

It becomes `deckSources["takako-vietnam"]` for `content:check`. The copy comes from the brief (v4) and §4 below.

**Copy rules:**

- No individual from Takako, named or quoted. All requirements are "Takako đặt ra".
- Minder AI is the subject and acts: *theo dõi · phát hiện · soạn sẵn · báo đúng người · trả lời ngay khi được hỏi*.
- **Response rules are set by managers.** Never say "template cố định". Say: *quy tắc trả lời do chính quản lý phụ trách đặt ra: dùng dữ liệu nào, tính thế nào, trình bày ra sao, gửi cho ai, khi nào*. Minder AI follows them, so data is accurate, output follows the agreed rules and format, and stays consistent throughout.
- **Proactive with data, never with guesses.** Thresholds come from Takako's own standards.
- No invented numbers. All scenario data is labelled "Mô phỏng minh họa". KPIs give a way to measure and a target agreed with Takako.
- No other client names, and no Takako weaknesses.

---

## 3. A layout system for a product-led deck

### 3.1 Principles (how this differs from the World Model decks)

| World Model decks | Takako deck |
|---|---|
| Vision first: sphere, islands, three waves, a scroll-pinned story | **Product first.** The visuals are what Minder AI actually sends: briefings, alerts, reports, rules |
| Mostly dark: navy, grain, glow | **Mostly light** (white / mist), like an engineering spec Japanese leadership can read in print. Only two dark sections: the hero and the M20 stage |
| Illustration (isometric SVG) | **A product frame** showing the Minder AI interface (§3.4), plus diagrams, tables and stat tiles |
| Long sections with many layers of detail | Short sections, one idea each. Details only where print needs them |

**Colour meaning in the deck stays the same:**

- **blue** = Minder AI;
- **orange** = Takako and the person deciding. That covers the rule a manager set, the Xác nhận button and Takako's gate.

Orange covers no more than ~10% of any screen.

### 3.2 Section rhythm

```
0 mo-dau      DARK  hero      | title left · M20 cover right (product frame)
─ Phần I ─────────────────────────────────────────────
1 tu-chu      LIGHT default   | stats ×4 · flow · statement
2 yeu-cau     MIST  default   | 7-row requirements table
─ Phần II ────────────────────────────────────────────
3 minder-ai   LIGHT wide      | diagram · steps ×4 · cards ×4 (four information areas)
4 quy-tac     MIST  wide      | lead · M20 rule (rule ↔ output, threshold toggle) · steps ×4
5 ba-viec     LIGHT wide      | cards ×3 (three applications)
6 mot-ngay    NAVY  wide      | M20 feed (the demo stage) · details printOnly
7 kiem-soat   LIGHT default   | kv (deployment) · checklist (commitments)
─ Phần III ───────────────────────────────────────────
8 gia-tri     MIST  default   | steps ×3 · KPI table · fee model
9 lo-trinh    LIGHT wide      | steps ×3 (phases + gates) · timeline (4 weeks) · cards (GĐ2) · GĐ3
10 hop-tac    MIST  closing   | cards ×4 (roles) · list (commercial) · timeline (dates) · closing block
```

`ThemeSeam` only draws a band at light ↔ dark changes, so this sequence has just **4 seams** (0→1, 5→6, 6→7 and the footer). The page reads calmly.

### 3.3 Two new shared blocks (generic, any deck can use them)

| Block | Shape | Renders as | Used in |
|---|---|---|---|
| `stats` | `{ kind: "stats"; items: { value: Rich; label: Rich; note?: Rich }[] }` | Row of 2–4 tiles. Large number (tabular, 600), label below. Two columns on mobile | `tu-chu` |
| `checklist` | `{ kind: "checklist"; items: Rich[]; cols?: 1 \| 2 }` | List with a blue check icon in a circle, white card, 1px border. Replaces M13 `commitments` without depending on section ids | `kiem-soat` |

Both are added to the `Block` union, `Blocks.tsx` and the print view, and need no new data.

### 3.4 M20 "Minder AI làm việc" (new module, the centre of the deck)

**One module, three variants, one data source** (`scenarios.m20`).

**The product frame takes only the visual UI from the Minder Platform** (repo `minder-platform/celesnity-web`; paths below are relative to it). **Content, names and the fields of the rules follow the brief and this plan.** Nothing about what the codebase can or can't do today changes the deck.

- **Name in the frame:** **Minder AI**, as in the brief.
  - Visual asset: the logo mark drawn in `app/_components/layout/logo-mark.tsx` (#07002e plate, two white orbits, four-point star).
- **Tokens:** copy the light theme from `app/globals.css:49-149, 216-226, 408-414` into a `.minder-frame` scope:
  - background `#ffffff` · sidebar `#f9f9f9` · muted `#f3f3f3` · foreground `#0d0d0d` · muted-foreground `#5d5d5d`;
  - border `rgb(13 13 13/10%)`;
  - **primary CTA near-black `#181818`**. Blue `#0075de` is used only for links, focus and selection;
  - status: success `#00a240` · warning `#e25507` · info `#0075de` · destructive `#e02e2a`, each with its own light/dark shades;
  - radius 8 / 10 / 12 / 16px; shadow hairline + 100–400;
  - system font; weight at most 600.
- **Frame layout,** borrowing the workspace pattern:
  - a slim sidebar (268px on desktop, collapsed to icons on mobile) beside a content panel;
  - the feed groups outputs as *Mới · Trước đó*, with an unread dot;
  - sidebar labels use the deck's language: Hôm nay · Giá thành · Dữ liệu máy · Bản vẽ · Quy tắc.
- **Outside the frame** the deck keeps its own tokens (navy / blue / orange).

**Output card** (shared by all three variants). The visual style follows the product's run cards and chat answers (`app/_components/routines/routine-run-card.tsx`, `app/_components/chat/chat-message-list.tsx`):

- **Header:** time · output type (Bản tin / Cảnh báo / Tính lại / Văn bản mới / Báo cáo) · area (Sản xuất · Vận hành · Kế toán · Tài nguyên kỹ thuật) · recipient · a "Đã gửi" status pill.
- **Body:** fields in the order the rule sets (brief §6), with small numbered citation badges in the product's style.
- **Footer:**
  - a collapsible **"Nguồn (N)"** list (Bản vẽ PT-2041 rev C · MES-IoT tháng 9 · ERP: định mức giá thành);
  - the rule chip **"Theo quy tắc QT-GT-01 · Trưởng phòng Kế toán đặt"**, which opens the rule;
  - **"Xem cách tính"**, where there is a calculation.
- **Actions:**
  - **Xác nhận** in the product's near-black CTA;
  - Không đúng · Không cần as outline buttons;
  - **Hỏi thêm** opens one scripted follow-up answer drawn in the product's chat-answer style: prose, citation badges, "Nguồn (N)".
- **Rule card** (`rule` variant and drawer), with the brief's fields:
  - Quy tắc · Người đặt · Áp dụng cho · Dữ liệu dùng · Cách tính · Ngưỡng · Định dạng · Người nhận · Thời điểm;
  - visually styled like the product's settings panels.
- **Reference visuals:** `docs/mockup/celesnity-workspace.html` and `docs/redesign-shots/*.png` in the product repo.

**The three variants:**

| Variant | Where | Behaviour |
|---|---|---|
| `cover` | Hero `mo-dau` | Three cards slide into the frame in turn (07:30 machines → 09:00 cost → 11:00 drawing), then loop. One main motion, paused off-screen (`useInView`). With `useReducedMotion`, a still stack of three. No controls |
| `rule` | `quy-tac` | Two columns. **Left:** rule card QT-GT-01, with fields Áp dụng cho · Người đặt · Dữ liệu · Cách tính · Ngưỡng · Định dạng · Người nhận · Thời điểm. **Right:** the output that rule produces. A segmented control changes the threshold 3% / 5%: at 5%, PT-2041 (4%) **sends no alert** and the right side shows "Không vượt ngưỡng, Minder AI không gửi". This proves *the output follows the rule the manager sets* |
| `feed` | `mot-ngay` | **Top:** role tabs Kế toán · Kỹ thuật · Sản xuất (arrow keys). **Left:** time rail 07:30 → Friday 17:00. **Right:** the card feed. Changing role filters the feed. In *Sản xuất*, cost cards become the line "vai trò này không xem được giá thành". Clicking a rule chip opens a drawer with the full rule. An end counter reads "Đã xác nhận 3/6" |

**Data type** (`decks/types.ts`):

```ts
type FeedRole = { id: string; label: string };
type FeedRule = {
  id: string;              // "QT-GT-01"
  name: string;
  owner: string;           // role, never a personal name: "Trưởng phòng Kế toán"
  appliesTo: string;
  data: string[];
  method: string;
  threshold?: { label: string; options: string[]; value: string };
  format: string[];        // field order in the output
  recipients: string[];
  schedule: string;
};
type FeedItem = {
  id: string;
  time: string;            // "07:30" | "Thứ Sáu 17:00"
  kind: "briefing" | "alert" | "recalc" | "regulation" | "report";
  area: "san-xuat" | "van-hanh" | "ke-toan" | "tai-nguyen-ky-thuat";
  roles: string[];         // who sees it
  ruleId: string;
  title: string;
  fields: { k: string; v: Rich }[];
  calc?: { k: string; v: string }[];
  sources: string[];
  gap?: Rich;              // an honest gap in the data
  followUp?: { q: string; a: Rich };
  hiddenFor?: { role: string; text: string }[];
  /** Variant "rule": output under each threshold */
  byThreshold?: Record<string, { send: boolean; note: Rich }>;
};
type FeedScenario = { roles: FeedRole[]; rules: FeedRule[]; items: FeedItem[]; coverIds: string[] };
```

**Accessibility:**

- tabs follow the ARIA pattern;
- new cards are announced through `aria-live="polite"`;
- every button has a text label;
- status is never shown by colour alone.

**Print:** the `mot-ngay` section carries `details` with `printOnly: true`. These hold a feed table (Giờ · Minder AI gửi · Cho ai · Nội dung · Quy tắc · Nguồn) and a rule table, so the PDF tells the whole story.

**Presenter mode:** each card in the feed gets a `data-step` attribute, so pressing → goes to the next card.

---

## 4. Content plan, section by section

*Copy below is a draft for `takako-content-v1.md`. Jayson approves it before it moves into the data.*

### `mo-dau` · act 0 · dark · hero

- **Eyebrow (BrandLockup):** Takako × Celesnity · Đề xuất triển khai
- **Title:** Minder AI,\ntrợ lý vận hành chủ động của Takako
- **Lead:** Mọi thông tin quản lý cần về sản xuất, vận hành, kế toán và tài nguyên kỹ thuật, từ chính dữ liệu và hệ thống Takako đang sở hữu.
- **Note:** Chạy trong nhà máy · Chỉ đọc dữ liệu · Con người quyết định
- **Visual:** M20 `cover`
- **Brand:** `partnerWordmark: "TAKAKO"`, no logo

### Phần I · TAKAKO ĐÃ SẴN SÀNG

**`tu-chu` · light · default**

- **Eyebrow:** Takako hôm nay
- **Title:** Mười năm số hóa đã hoàn thành. Dữ liệu đã sẵn sàng.
- **`stats`:**
  - **10 năm**: lộ trình tự động hóa, robot, ERP, MES
  - **~1.000**: máy móc, thiết bị có dữ liệu IoT
  - **100%**: dữ liệu sửa chữa và bảo trì trên hệ thống
  - **5**: nhà máy, 2 tại Việt Nam và 3 ở nước ngoài
- **`statement`:**
  - context: Takako vận hành theo quy trình, với nhiều khách hàng, nhiều mã hàng và nhiều dòng chảy sản phẩm.
  - highlight: **Dữ liệu đã có. Bước tiếp theo là để dữ liệu tự đến đúng người quản lý, đúng lúc.**
  - conclusion: Minder AI làm việc đó, trên chính hệ thống Takako đang sở hữu.

**`yeu-cau` · mist · default**

- **Eyebrow:** Yêu cầu của Takako
- **Title:** Bảy yêu cầu Takako đặt ra cho AI, và cách Minder AI đáp ứng
- **`table`** (# · Yêu cầu · Minder AI đáp ứng · Đo bằng):

| # | Yêu cầu | Minder AI đáp ứng | Đo bằng |
|---|---|---|---|
| 1 | Đúng, đủ, chỉ dựa trên dữ liệu nhà máy | Mỗi output dẫn bản ghi và hệ thống gốc. Thiếu dữ liệu thì nói rõ, không ước đoán | Tỷ lệ output được xác nhận đúng |
| 2 | Câu trả lời có cấu trúc, nhất quán | Quy tắc trả lời do chính quản lý đặt: dữ liệu, cách tính, định dạng, người nhận. Minder AI làm đúng quy tắc, lần nào cũng vậy | Mọi output tuân theo quy tắc đã đặt |
| 3 | Lợi ích đo được | Đo baseline tuần 1, so sánh tuần 4. Phí gắn với KPI | Thời gian tiết kiệm trên công việc thật |
| 4 | Bảo mật tuyệt đối | Chạy trong nhà máy, mô hình open-weight, không gọi API ra ngoài, nguồn bên ngoài chỉ theo whitelist | Audit log mọi truy vấn |
| 5 | Bắt đầu nhỏ, thực tế | Ba phần việc, chỉ đọc dữ liệu, nhóm người nhận nhỏ | Cổng quyết định sau 4 tuần |
| 6 | Phục vụ kỹ thuật và nghiệp vụ | Không làm thêm dashboard. Tập trung giá thành, máy, bản vẽ | Người dùng thật mỗi tuần |
| 7 | Một nền tảng tích hợp | Một sự cố máy → cảnh báo giá thành → bản vẽ liên quan, trên cùng Minder AI | Thấy ngay trong Giai đoạn 1 |

### Phần II · MINDER AI TẠI TAKAKO

**`minder-ai` · light · wide**

- **Eyebrow:** Minder AI là gì
- **Title:** Một trợ lý vận hành đặt trên hệ thống Takako đã có, không thay phần mềm nào
- **`diagram`:**
  - Branches (`plain`): ERP · kế toán / MES-IoT · máy, sản xuất, bảo trì / Kho bản vẽ / Nguồn bên ngoài được phép (whitelist).
  - Then: **Minder AI**, trong nhà máy, chỉ đọc (`platform`) → **Quy tắc của quản lý** → **Quản lý theo vai trò**.
- **`steps` (horizontal):**
  - **Theo dõi:** dữ liệu từ các hệ thống, liên tục.
  - **Phát hiện:** thay đổi vượt ngưỡng Takako đặt.
  - **Soạn sẵn:** bản tin, cảnh báo, báo cáo theo quy tắc.
  - **Báo đúng người:** đúng quản lý, đúng lúc, kèm nguồn.
  - Note: *Khi được hỏi, Minder AI trả lời ngay, theo cùng quy tắc.*
- **h3 "Bốn mảng thông tin cho quản lý" + `cards` (cols 4, head: Mảng · Quản lý cần · Dữ liệu Takako đã có):**

| Mảng | Quản lý cần | Dữ liệu Takako đã có |
|---|---|---|
| Sản xuất | sản lượng, cycle time, phế phẩm theo mã hàng | MES-IoT |
| Vận hành | tình trạng máy, sự cố, sửa chữa, bảo trì | MES |
| Kế toán | giá thành thực, so với định mức, chi phí khi kế hoạch đổi, văn bản pháp lý | ERP + MES + bản vẽ |
| Tài nguyên kỹ thuật | bản vẽ và phiên bản | kho bản vẽ |

**`quy-tac` · mist · wide**

- **Eyebrow:** Quy tắc do quản lý đặt
- **Title:** Quản lý đặt quy tắc. Minder AI trả lời đúng quy tắc đó, lần nào cũng vậy.
- **Lead:** Mỗi loại thông tin có một quy tắc do quản lý phụ trách đặt ra: dùng dữ liệu nào, tính thế nào, trình bày ra sao, gửi cho ai, khi nào. Minder AI chỉ làm theo quy tắc, nên số liệu chuẩn xác, output đúng định dạng đã đề ra và nhất quán giữa các người, các ngày, các bộ phận.
- **M20 `rule`**
- **`steps`:**
  1. Quản lý đặt quy tắc
  2. Minder AI áp dụng cho mọi output
  3. Output nhất quán, có nguồn
  4. Quản lý chỉnh quy tắc, áp dụng từ lần sau
- **Note:** Minder AI không tự đặt ngưỡng và không tự đổi cách tính.

**`ba-viec` · light · wide**

- **Eyebrow:** Giai đoạn 1
- **Title:** Ba phần việc đầu tiên Minder AI nhận tại Takako
- **`cards`** (cols 3; head: Ứng dụng · Quản lý nhận · Minder AI tự gửi · Trả lời khi được hỏi · Dữ liệu · Đo bằng):

| Ứng dụng | Minder AI tự gửi | Trả lời khi được hỏi | Dữ liệu |
|---|---|---|---|
| **Trợ lý giá thành** (Kế toán) | cảnh báo mã hàng vượt định mức kèm nguyên nhân và cách tính · tính lại giờ máy và chi phí khi kế hoạch sản lượng đổi · báo cáo giá thành tháng soạn sẵn · tóm tắt văn bản pháp lý mới từ nguồn whitelist | giá thành, chi phí, what-if | ERP, MES-IoT, bản vẽ |
| **Trợ lý dữ liệu máy** (Sản xuất · Vận hành) | bản tin sáng các máy cần chú ý · báo cáo bảo trì tuần | "tình trạng máy X trong 6 tháng" | MES-IoT |
| **Trợ lý bản vẽ** (Tài nguyên kỹ thuật) | cảnh báo khi có rev mới mà lệnh hoặc lô còn chạy theo rev cũ | bản vẽ hiện hành của mã hàng | kho bản vẽ, lệnh sản xuất |

**`mot-ngay` · navy · wide**

- **Eyebrow:** Thử ngay
- **Title:** Một ngày làm việc cùng Minder AI
- **`label` (sim):** Dữ liệu mô phỏng phục vụ minh họa, không phải số liệu của Takako.
- **M20 `feed`.** The feed (detail in §5):

| Giờ | Minder AI gửi |
|---|---|
| 07:30 | Bản tin buổi sáng (MC-07 lặp lỗi trục chính; MC-12 thiếu dữ liệu từ 15/9) |
| 09:00 | Cảnh báo giá thành PT-2041 +4% (ngưỡng 3%), nguyên nhân ở MC-07 |
| 11:00 | VS-118 rev D, còn 2 lệnh theo rev C |
| 14:00 | Kế hoạch tháng 11 nhóm piston +20%: tính lại giờ máy và chi phí |
| 16:00 | Văn bản mới từ nguồn whitelist |
| Thứ Sáu 17:00 | Báo cáo tuần |

- **`details` printOnly:** feed table + rule table

**`kiem-soat` · light · default**

- **Eyebrow:** Bảo mật và kiểm soát
- **Title:** Dữ liệu ở lại Takako. Con người quyết định.
- **`kv`:**

| Mục | Nội dung |
|---|---|
| Nơi chạy | trong nhà máy (on-premise) |
| Mô hình AI | open-weight, chạy cục bộ, không gọi API ra ngoài |
| Kết nối | chỉ đọc ERP, MES-IoT, kho bản vẽ |
| Nguồn bên ngoài | chỉ danh sách được phép (whitelist) |
| Truy cập | theo vai trò |
| Nhật ký | mọi truy vấn và mọi output |
| Pháp lý | NDA, ISO 27001 |
| Quyền dữ liệu | dữ liệu thuộc Takako, không dùng huấn luyện mô hình chung khi chưa được đồng ý |

- **`checklist` (cols 2):**
  - Không ghi vào hệ thống nào
  - Không điều khiển máy
  - Không thay đổi quy trình đang chạy
  - Quy tắc và ngưỡng do quản lý Takako đặt
  - Mọi output có nguồn
  - Nói rõ khi thiếu dữ liệu
  - Mỗi người chỉ thấy thông tin đúng vai trò

### Phần III · ĐO BẰNG CON SỐ, MỞ RỘNG TỪNG BƯỚC

**`gia-tri` · mist · default**

- **Eyebrow:** Đo lường
- **Title:** Đo trên công việc thật, phí gắn với kết quả
- **`steps`:**
  1. Tuần 1: đo thời gian hiện tại
  2. Tuần 2–4: Minder AI làm việc
  3. Tuần 4: so sánh và chấm KPI
- **`table` KPI** (brief §8):

| KPI | Cách đo | Mục tiêu |
|---|---|---|
| Thời gian cho công việc Minder AI đảm nhận | so với baseline tuần 1 | Tình trạng máy: từ khoảng 30 phút xuống dưới 2 phút |
| Tỷ lệ xác nhận đúng | người nhận bấm Xác nhận | |
| Tỷ lệ nhiễu | người nhận bấm Không cần | |
| Output có nguồn | kiểm tra tự động | 100% |
| Mức sử dụng | người dùng và lượt dùng mỗi tuần | |

- **`p`:** Mỗi output đều có nút Xác nhận · Không đúng · Không cần; đó là dữ liệu đo KPI, không cần bộ câu hỏi riêng.
- **`p`:** Phí: một phần cố định nhỏ cho kỹ sư tại nhà máy, phần còn lại chỉ trả khi đạt KPI. Không tính theo số người dùng.

**`lo-trinh` · light · wide**

- **Eyebrow:** Lộ trình
- **Title:** Ba giai đoạn. Takako quyết định ở mỗi cổng.
- **`steps`:**

| Giai đoạn | Nội dung | Cổng |
|---|---|---|
| GĐ1 · Ba phần việc · 4 tuần | Tự học | Cổng 1 |
| GĐ2 · Mở rộng ứng dụng | Dự báo trước | Cổng 2 |
| GĐ3 · Nhà máy thứ hai | Nhân rộng | |

- **h3 "Giai đoạn 1 theo tuần" + `timeline`** (head: Tuần · Việc · Minder AI · Takako):

| Tuần | Minder AI | Takako |
|---|---|---|
| 1 | kết nối chỉ đọc, đo baseline | quản lý đặt quy tắc, người nhận, ngưỡng |
| 2 | bắt đầu gửi cho 2–3 người mỗi phần việc | |
| 3 | toàn bộ người nhận | chỉnh quy tắc theo phản hồi |
| 4 | | đo KPI, **Cổng 1** |

- **h3 "Giai đoạn 2: Minder AI nhận thêm việc" + `cards`** (cols 3, order 2a / 2b / 2c, brief §7)
- **h3 "Giai đoạn 3: nhà máy thứ hai" + `p`:** Minder AI và các phần việc đã chứng minh chạy ở nhà máy thứ hai; lớp dữ liệu, quy tắc và ngưỡng dùng lại, nên triển khai nhanh hơn.

**`hop-tac` · mist · closing**

- **Eyebrow:** Hợp tác
- **Title:** Bắt đầu cuối tháng 10, có kết quả cuối tháng 11
- **`cards`** (cols 4): Takako · Đối tác kết nối dữ liệu nhà máy · Celesnity · GIANTY (roles from brief §1, by organisation)
- **`timeline` "Bước tiếp theo":**

| Ngày | Việc |
|---|---|
| 16/10 | gửi đề xuất |
| tuần 19/10 | trình bày với IT và Ban lãnh đạo |
| cuối tháng 10 | khởi động |
| cuối tháng 11 | kết quả Giai đoạn 1 và Cổng 1 |

- **Closing block:** M14 `closing`, using `closing` data: headline "Minder AI, trợ lý vận hành chủ động của Takako", PDF link, ask.

### Appendix (`/phu-luc`)

**`cach-hoat-dong`**, for IT:

- connecting ERP / MES (API, database view, or export);
- on-prem hardware (server, GPU);
- delivery channel (email or internal channel);
- future connections over MCP;
- machine connections over CAN, Modbus or PLC in later phases.

**`cau-hoi`:** static Q&A, since the assistant is off:

- Minder AI có thay ERP/MES không?
- Dữ liệu có ra khỏi nhà máy không?
- Nếu Minder AI sai thì sao?
- Quy tắc do ai đặt, đổi thế nào?
- Tuần 1 cần gì từ Takako?
- Vì sao chưa làm giám sát quy trình xưởng?

**`nguon`:** sources of public facts, plus the note that all scenario data is illustrative.

---

## 5. Mock data (`decks/takako-vietnam/scenarios.ts`)

- **Roles:** Kế toán · Kỹ thuật · Sản xuất.
- **Rules** (owner is always a role, never a person):

| Rule | Covers | Owner |
|---|---|---|
| **QT-GT-01** | Cảnh báo giá thành theo mã hàng | Trưởng phòng Kế toán |
| **QT-GT-02** | Tính lại khi kế hoạch đổi | Trưởng phòng Kế toán |
| **QT-PL-01** | Văn bản pháp lý (whitelist) | Kế toán trưởng |
| **QT-MAY-01** | Bản tin buổi sáng về máy | Trưởng phòng Kỹ thuật |
| **QT-MAY-02** | Báo cáo bảo trì tuần | Trưởng phòng Kỹ thuật |
| **QT-BV-01** | Cảnh báo phiên bản bản vẽ | Trưởng phòng Kỹ thuật |

- **Items:** the 6 feed items above. The 07:30 → 09:00 thread (MC-07 → PT-2041) is the proof of integration.
- **Domain:**
  - mã hàng PT-2041 (piston), SH-118, RP-305, VS-118 (valve spool), CB-220, PS-410;
  - machines MC-03…MC-12;
  - 3 months of history;
  - **no** real Takako part numbers, drawings or customers.
- **Unit test** (`tests/unit/takako-m20.test.ts`):
  - every `ruleId` exists;
  - every `roles` and `hiddenFor` entry is a valid role;
  - every item has ≥ 1 source;
  - `coverIds` point at real items;
  - `byThreshold` has every option of the rule.

**If anh Đan confirms MES does not link machine time to mã hàng (due 14/10),** only `scenarios.ts` changes. The 09:00 cause becomes "phế phẩm theo lô" or "đơn giá vật liệu" instead of MC-07. The component stays the same.

---

## 6. Files

| File | Change |
|---|---|
| `decks/types.ts` | Template fields optional; `features?: { assistant?: boolean }`; `meta.series?`; `stats`, `checklist` blocks; `"M20"`; `FeedScenario` types |
| `components/deck/useScenario.ts` *(new)* | Helper that reads `scenarios[key]` and throws a clear error if it's missing |
| Modules M1, M3, M5, M6, M10, M13, M15, M16, M17, M18, M19, M8 | Use `useScenario` / optional chaining. No visual change |
| `components/shared/Blocks.tsx`, `Visuals.tsx` | Render `stats`, `checklist` |
| `components/shared/ModuleSlot.tsx` | Register M20 |
| `components/modules/M20.tsx` + `M20/` *(new)* | `Frame`, `OutputCard`, `RuleCard`, `RuleDrawer`, `Feed`, `Cover`, `RuleDemo` |
| `components/shared/Section.tsx` | Hero: render `data-hero-chat-slot` only when the assistant is on |
| `app/[deck]/page.tsx`, `phu-luc/page.tsx` | Mount `<Assistant/>` by flag; title from `meta` |
| `components/assistant/ChatMessages.tsx` | Title from `meta` |
| `app/api/chat`, `app/api/extract`, `evals/run.ts`, `scripts/knowledge-check.ts` | Skip decks without an assistant |
| `decks/takako-vietnam/` *(new)* | `content.vi.ts`, `scenarios.ts`, `index.ts` (no `assistant.ts`, `knowledge.ts`, `faq.ts`) |
| `decks/all.ts` | Register the deck and `deckSources`. `forbiddenTerms["takako-vietnam"]` = other clients' names + `"anh Thảo"`. Add `"Takako"` to the other three decks' lists |
| `docs/takako-content-v1.md` *(new)* | Content source |
| `tests/unit/takako-m20.test.ts` *(new)* | Data integrity checks |
| `.env.example` | `ACCESS_CODE_TAKAKO_VIETNAM` |

---

## 7. Schedule (ready 15/10, sent with the proposal 16/10)

| Day | Work | Output |
|---|---|---|
| Sat–Sun 10–11/10 | Write `docs/takako-content-v1.md` from §4. Jayson reviews the copy | Copy approved |
| Mon 12/10 | Shared changes (§1 fixes 1, 3, 4; `stats` and `checklist` blocks). Scaffold the deck with copy and blocks. Run e2e visual on the old decks | 0 diff on old decks; Takako renders without M20 |
| Tue 13/10 | M20: data types, `scenarios.ts`, `Frame`, `OutputCard`, `feed` variant | Interactive feed works |
| Wed 14/10 | M20 `cover` and `rule`. Print details. Presenter steps. Check at 375 / 768 / 1280 / 1920. Apply anh Đan's answers (MES ↔ mã hàng, cost standard, delivery channel) | Full deck |
| Thu 15/10 | `npm run check`, `e2e`, `npm run pdf -- --deck=takako-vietnam`. Jayson reviews. Set the access code on Vercel and deploy | Link + PDF ready |
| Fri 16/10 | Goes out with the proposal | |

**Critical path:**

1. Copy approval on 11/10.
2. The partner's data answers on 14/10.
3. **The proposal (GIANTY) must state the same scope, 4 weeks, KPIs and fee model** as the deck.

---

## 8. QA and guardrails

**Automatic:**

- `terms:check`, with these added for Takako: `anh Thảo`, `chatbot`, `template cố định`;
- `leak:check` both ways, including `-- --build`;
- `content:check -- --deck=takako-vietnam`;
- typecheck and unit tests.

**Visual:**

- e2e snapshots: 0 diff for the three old decks, new baselines for Takako;
- no horizontal scroll at 375px;
- orange ≤ 10% of each screen;
- buttons with orange fill use navy text.

**Behaviour:**

- M20 works fully by keyboard;
- motion pauses off-screen, and `useReducedMotion` shows still frames;
- the PDF contains the feed and rule tables.

**Honesty:**

- every scenario screen carries the "Mô phỏng minh họa" label;
- no client logo;
- no other client named;
- no Takako individual named.

---

## 9. Decisions for Jayson

1. **Slug:** `takako-vietnam` (consistent with the other decks) or `takako`?
2. **Assistant:** off completely (recommended), or offline with prepared answers?
3. **Language:** Vietnamese only for v1, or add a Japanese or English summary for leadership?
4. **Case studies:** none (recommended for v1, the pilot is the proof), anonymised, or named with consent?
5. **Years for GĐ2–3:** indicative quarters, or none (recommended: none, "Takako quyết định ở mỗi cổng")?
6. **Names:** the partner organisation's name in `hop-tac`, and the right Minder AI mark for the product frame.

---

## 10. Build status (10/10/2026, branch `feat/takako-vietnam`, not committed)

**Done:**

- **Shared changes:**
  - template scenario fields optional (`m1/m3/m5/m6/m10/roadmap/staffing/m17/m13`), consumers use `!` as `m12` already did;
  - `features.assistant`;
  - `meta.series` on `/phu-luc`;
  - M14 `closing` hides the assistant button and the factory scene when the deck has neither;
  - new blocks `stats` and `checklist`;
  - `.minder-frame` tokens.
- **M20** (`components/modules/M20*`): variants `cover`, `rule`, `feed`. Feed has role tabs (Ban lãnh đạo · Kế toán · Kỹ thuật · Sản xuất), a rule drawer, Xác nhận / Không đúng / Không cần, and Hỏi thêm.
- **Deck** `decks/takako-vietnam/` (11 sections + 5 appendix entries), registered in `decks/all.ts` with forbidden terms both ways (+ `anh Thảo`, `chatbot`, `template cố định`).
- **Tests:** `tests/unit/takakoM20.test.ts`.

**Checks:**

| Check | Result |
|---|---|
| `tsc` | Clean |
| `content:check` | Takako ✓, Nestlé ✓, Isuzu ✓. Hòa Phát fails 4 items that predate this branch (no Hòa Phát files touched) |
| `terms:check` | ✓ |
| `leak:check` | ✓ |
| `knowledge:check` | ✓ |
| `vitest` | 28/28 |
| Headless render, 1280 and 375 | All modules on all 4 decks render, no console errors, no horizontal overflow |

**Not done yet:**

- `npm run build` + `leak:check -- --build` (not run while the dev server was up);
- `npm run e2e` snapshot baselines;
- `npm run pdf -- --deck=takako-vietnam`;
- `ACCESS_CODE_TAKAKO_VIETNAM` on Vercel.
