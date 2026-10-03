# Nestlé Trị An landing deck: flow and root topic (brief)

*Draft, 03/10/2026. Source: Notion "Nestle Cafe Capsule Production" (30/09/2026, owners Halston Nguyen, Jayson; with HungV, Duc Huynh).*

## 1. What we know about the plant

- **Who:** Nestlé Trị An. Anh Phương is plant director and anh Trường is production manager, so the audience is **plant leadership and operations, not the board**.
- **What it makes:** coffee only. Capsules are the biggest product. It also packs Starbucks × Nestlé bagged coffee (at-home brewing) and jar coffee. It runs the newest coffee technology, including a newly opened line.
- **Process:** coffee powder is made in another area → piped to filling → controlled cold room (fixed temperature and humidity) → conveyor → capping/sealing → capsules into cartons (cases) → a robot arm palletises the cases.
- **Planning:** 1–2 people plan each week. Supply chain forecasts demand from history, which gives quantities per SKU. Production turns that into machine × hours × SKU × quantity over the last 3 days of the week. Operators then pick the recipe, purge the old material and start the line from the HMI.
- **What they told us (keep internal, never put on a slide as "your problem"):**
  - The half-year plan drifts.
  - The weekly plan takes 3 days.
  - Operators log material, output and waste by hand at end of shift.
  - Cold-room humidity has caused a half-day stop.
  - Predictive maintenance looks feasible on the new line.

## 2. Root topic

**Hòa Phát's root** was ownership: *Hòa Phát tự chủ trí thông minh vận hành.* That doesn't fit a multinational's plant team. Nestlé already owns its systems and standards, and a "rent AI vs own it" slide reads oddly to them.

**Nestlé's root:** *one closed decision loop for the coffee factory.*

> **Plan → Run → Recover on one Mô hình AI Thế giới thực.** The model understands how one event moves through the whole operation: humidity → affected coffee and packaging lots → batch → quality hold → lost output → schedule impact → recovery options → revised plan, with a manager approving each step.

- **Working title:** NHÀ MÁY CÀ PHÊ SIÊU THÔNG MINH, *Nestlé Trị An × Celesnity*.
- **Tagline (draft):** *Từ kế hoạch đến phục hồi, một vòng quyết định.*
- **Product name inside the deck:** AI Production Command cho chiết rót & đóng gói cà phê.
- **Opening from strength (the Hòa Phát rule still applies):** Trị An already has the newest lines and one of Nestlé's most important coffee portfolios. The strategic question is: *when the machines are already world-class, where does the next advantage come from?* Answer: the intelligence that connects the plan to the shop floor.
- **Upward hook:** Trị An becomes the **lighthouse for Nestlé's coffee network**. It is the first plant where plan and shop floor run as one loop, and the plant team are the champions who carry the result to region and group.
- **Brand triad:** keep **Tự học · Dự báo trước · Nhân rộng** and map it onto Plan · Run · Recover.

## 3. Flow (about 12 sections, 3 acts; Hòa Phát had 19)

| # | Section | Job | Reuses (Hòa Phát module) |
|---|---|---|---|
| 0 | **Mở đầu**: Nhà máy cà phê siêu thông minh | Title, triad, living-factory scene redrawn as a capsule line | M1 hero |
| **I** | **MỘT KỶ NGUYÊN MỚI** | | |
| 1 | **Trị An hôm nay** | Strength: Vietnam as coffee origin, newest lines, capsule / bag / jar portfolio | replaces `tu-chu` |
| 2 | **Kỷ nguyên tiếp theo** | Three waves: automation → language AI → World Model | M2 as is |
| 3 | **Câu hỏi chiến lược** | "Khi máy móc đã tốt nhất, lợi thế tiếp theo nằm ở đâu?" Answer: separate AI tools vs one model of the whole production state | M3 reframed |
| **II** | **VÒNG QUYẾT ĐỊNH KHÉP KÍN** | | |
| 4 | **Một mô hình, toàn bộ trạng thái sản xuất** | Plan · Run · Recover on one World Model instead of 5 tools | M1 story |
| 5 | **Mô hình hiểu gì** | Ontology graph: demand → order → SKU/recipe → run → line/machine (filling, capping, packing) → batch and lots (product, capsule, cap, carton) → environment → quality → output → plan | M7 reskinned |
| 6 | **Buồng mô phỏng (hero)** | Humidity excursion in Phòng lạnh 2. The model shows it step by step (lot P102 → batch B042 → 5.7 h lost → 31,400 units short → changeover +4.2 h late), then offers recovery options A–D: overtime, move to Line 3, re-sequence, accept delay. **The viewer clicks Duyệt** | M4 rebuilt, centrepiece |
| 7 | **Một ngày tại Trị An** | Future scenes: weekly plan drafted in minutes for review → "Line 2 đang chạy gì?" → 10:15 humidity → 11:00 re-plan → end-of-shift loss and yield written up automatically | M5 |
| **III** | **LỘ TRÌNH** | | |
| 8 | **Danh mục ứng dụng** | The 10 use cases grouped Plan / Run / Recover. First three: planning agent, quality & environment, loss / yield (giveaway) | M9/M18 |
| 9 | **Thử nghiệm 16 tuần trên dây chuyền mới** | Pilot on the new capsule line, then bag and jar lines, then other Nestlé VN plants | M10/M15 |
| 10 | **Nestlé giữ đề thi** | Back-test on Trị An's own history (past plans vs actual, past humidity events), scored by Nestlé | M11 |
| 11 | **Giá trị** | Levers: coffee giveaway, hours recovered, plan adherence, planning effort. **Numbers left blank; Nestlé finance confirms** | M12 |
| 12 | **Kiểm soát & lời mời** | LLM + solver (never an LLM inventing schedules). Thresholds and QA decisions come from the plant's own spec. Humans approve. Works alongside existing systems. Invite Trị An to be the founding pilot | M13 + M14 |

## 4. How it differs from the Hòa Phát build

- **Shorter and more operational.** Drop the chairman letter, the national-sovereignty story and the steel roadmap. The live simulation (section 6) carries the deck.
- **Multinational realities.** Expect corporate IT/OT and security review, global systems and procurement. So the control section matters more and commercial terms stay pilot-scoped.
- **Food safety.** The model never releases product on its own. It flags lots for QA disposition.
- **Brands.** Don't use Nestlé, Nescafé or Starbucks logos. Keep Starbucks mentions minimal because it is a licensed partnership. Label all scenario data "Mô phỏng minh họa".

## 5. Decisions for Jayson before build

1. **Language:** Vietnamese only (plant team), or Vietnamese plus an English version for region and group?
2. **Series brand:** keep "Nhà máy siêu thông minh" across clients, or give Nestlé its own name (e.g. "AI Production Command")?
3. **Commercial frame:** founding industrial partner like Hòa Phát, or a scoped paid pilot?
4. **Code:** fork the repo into its own folder (`Landing Deck Nestle/`; fastest and keeps Hòa Phát safe), or add a per-client content layer?

**Facts to verify before they go on a slide:** the plant's exact location, whether capsules are Dolce Gusto or another format, export markets, which line is the "new line", and the existing systems (ERP/MES/SCADA).
