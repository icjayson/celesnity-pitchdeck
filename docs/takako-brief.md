# Takako landing deck: flow and root topic (brief)

*Draft v4, 10/10/2026. Proposed slug: `takako-vietnam`. Fourth deck after `hoa-phat`, `nestle-vietnam` and `isuzu-vietnam`.*

*Sources:*

- *Meeting note "Takako x Celesnity: Tóm tắt nhu cầu và khung Proposal Pilot" (09/10/2026).*
- *The partner's message on 10/10/2026 setting the Phase 1 scope.*
- *Jayson's decisions on 10/10/2026.*

## 0. Decisions already made (Jayson, 10/10)

1. **Three phases:**

   | Phase | Scope |
   |---|---|
   | **Giai đoạn 1** | The three areas Takako named: accounting, MES-IoT data, a small part of drawing management |
   | **Giai đoạn 2** | Extend to the other applications in the meeting note |
   | **Giai đoạn 3** | Extend to the second plant |

2. **The root is Minder AI, not the World Model.** "Mô hình AI Thế giới thực" stays out of the main flow.
3. **The rollout can be faster.** Proposal: Giai đoạn 1 in **4 weeks**.
4. **The audience is Takako's leadership.** Never name or quote an individual from Takako. Every requirement is presented as **Takako's**.
5. **No fixed set of sample questions (no golden set).** Minder AI is positioned as **a proactive operations assistant**. It follows the data itself, prepares reports itself and reports to the right person with sources. Answering questions is something it also does, not the centre of the deck.
6. **The root statement is about coverage.** Minder AI gives managers all the information they need on production, operations, accounting and engineering resources, from the data and systems Takako already owns. "Fixed templates" and "one platform, no new systems" are no longer in the root.

## 1. Content rules for this deck

- **No individual from Takako, named or quoted.** This covers the deck, FAQ, assistant knowledge, evals and file names. Add `anh Thảo` to this deck's forbidden terms.
- **Minder AI is the subject, and it acts.** Write *Minder AI theo dõi / phát hiện / soạn sẵn / báo cho / tính lại*, not *người dùng hỏi Minder AI*.
- **Proactive with data, never with guesses.** Every briefing, alert and report rests on Takako's data, cites its source and uses thresholds Takako sets. Minder AI doesn't offer "ideas". This answers Takako's worry about AI making unhelpful suggestions.
- **Minder AI reports and calculates; people decide.** It never writes to ERP, MES or the drawing store, and never controls machines.
- **Don't lead with charts or temperature alerts, and leave shop-floor process monitoring out of Giai đoạn 1.** Takako already has dashboards.
- **Response rules come from Takako's managers.** Never say "template cố định". Say: managers set the rules for each kind of response (which data, how to calculate, format and wording). Minder AI follows them, so data is accurate, output follows the agreed rules and format, and it stays consistent throughout. Managers can change the rules; Minder AI applies the change from then on.
- **No "chatbot", and no list of sample questions.**
- **Invent no numbers.**
  - KPIs come with a way to measure them and agreed targets.
  - All scenario data is labelled **"Mô phỏng minh họa"**.
- **No other client names** (leak check) unless there is consent.
- **The roles section uses organisation names**, not personal names.

## 2. What we know about Takako (from the meeting note)

- A Japanese-owned company. Two plants in Việt Nam and three abroad.
- Pure engineering and machining: drawings, mã hàng, jigs, machining programs, cycle time. Many customers and many mã hàng.
- They have finished a roughly 10-year roadmap of automation, robots, ERP and MES.
  - Their data is structured, with IoT on about 1,000 machines.
  - 100% of repair and maintenance records are in the system.
  - The plants run process-driven.
- Already presented by Celesnity, and consistent with this direction:
  - *AI chủ động, người quyết định*: alerts, email to the team responsible, suggested options;
  - scheduled workflows that pull data from several departments;
  - FDE engineers on site;
  - replaces no software.

**Takako's requirements for AI:**

| # | Requirement | How Minder AI meets it |
|---|---|---|
| 1 | Right, complete, only from plant data | Every briefing, alert and answer cites its record and system. When data is missing it says so, rather than estimating |
| 2 | Structured output | **Takako's managers set the response rules themselves:** which data to use, how to calculate, the format of each output (briefing, alert, report, answer). Minder AI follows those rules, so output is accurate and stays consistent across people, days and areas |
| 3 | Measurable return | Time saved on the work Minder AI takes over, measured against a week-1 baseline. Fee tied to KPIs |
| 4 | Absolute security | Runs in the plant on an open-weight model, with no external API calls. Outside sources come only from a whitelist. Access by role, audit log |
| 5 | Start small, stay practical | Three areas, read-only, a small set of named recipients, a few output types per area |
| 6 | Engineering and business first | No dashboards. The work is cost, machines and drawings |
| 7 | Proof of one integrated platform | One machine event leads to a cost alert and then to the drawing, all on one Minder AI (§6) |

## 3. Critique carried forward

1. **Not a fork of the Hòa Phát / Nestlé / Isuzu story.** No three waves, no World Model centre, no founding-partner or IP block, no letter. The deck must match the written proposal exactly.
2. **The number never comes from the language model.** Cost, machine hours and the what-if results come from formulas the accounting team approved. Each output shows the calculation.
3. **Proactive means more output, which means more risk of noise.** Takako is wary of AI that "brings ideas". Three controls:
   - **Thresholds and standards come from Takako**, not from the AI.
   - **Giai đoạn 1 has only 2–3 output types per area.**
   - **Each output has buttons** (Xác nhận · Không đúng · Không cần). Thresholds are tuned weekly from that feedback.
4. **The deck's floating AI assistant calls a cloud API, which contradicts requirement 4.** Turn it off for this deck, or run it offline only.
5. **Don't reuse the Isuzu "Hỏi đáp với Trợ lý Minder AI" video.** It builds a chart and is question-led.
6. **The what-if on output stays a calculation, not a plan.** Minder AI recalculates machine hours and cost when the output plan changes. Production scheduling and progress chasing belong to Giai đoạn 2.
7. **The drawing area stays small.** Minder AI spots a new revision and flags lots or orders still running on the old one. Full drawing comparison belongs to Giai đoạn 2.

## 4. Root topic: Minder AI, Takako's proactive operations assistant

> **Minder AI is Takako's proactive operations assistant.** It gives managers all the information they need on **production, operations, accounting and engineering resources**. It works only from **the data and systems Takako already owns**: ERP, MES-IoT, the drawing store, and the repair and maintenance records. It doesn't wait to be asked. It follows the data, prepares the information and sends it to the right manager. When a manager asks, it answers straight away.

**Four information areas.** This is the spine of the deck, and Giai đoạn 1 maps onto it:

| Area | What managers need | Data Takako already has | Giai đoạn 1 |
|---|---|---|---|
| **Sản xuất** | Output, cycle time, scrap by mã hàng and machine | MES-IoT | Dữ liệu máy |
| **Vận hành** | Machine status, incidents, repairs, maintenance | MES (100% of repair and maintenance records) | Dữ liệu máy |
| **Kế toán** | Actual cost, cost against standard, cost when the plan changes, regulations | ERP / accounting + MES + drawings | Giá thành |
| **Tài nguyên kỹ thuật** | Drawings and revisions; later mã hàng, jigs and machining programs | Drawing store; GĐ2: machining programs, process history | Bản vẽ |

**Cover:**

- Eyebrow: *Takako × Celesnity · Đề xuất triển khai*
- Title: **Minder AI, trợ lý vận hành chủ động của Takako**
- Subtitle: *Mọi thông tin quản lý cần về sản xuất, vận hành, kế toán và tài nguyên kỹ thuật, từ chính dữ liệu và hệ thống Takako đang sở hữu.*

**Moved out of the root statement.** "Every number has a source" is no longer in it. It stays as the answer to requirement 1. "Fixed templates" is replaced by **response rules set by Takako's managers** (§1).

**Opening from strength:** Takako has finished 10 years of digitalisation. *Dữ liệu đã sẵn sàng. Bước tiếp theo là để dữ liệu tự lên tiếng.*

**Line for the hero section:** *Từ một sự cố máy đến giá thành, Minder AI nối lại trước khi ai kịp hỏi.*

**Brand triad mapped onto the phases:**

| Phase | Triad | Meaning |
|---|---|---|
| Giai đoạn 1 | **Tự học** | Minder AI learns Takako's data, formulas and thresholds, and starts reporting on its own |
| Giai đoạn 2 | **Dự báo trước** | From reporting what has happened to warning of what is about to happen: predictive maintenance, claims, progress |
| Giai đoạn 3 | **Nhân rộng** | Minder AI goes to work at the second plant |

## 5. Flow (10 sections in 3 acts)

*Superseded: the current flow is the 11-section content plan in `docs/takako-implementation-plan.md` §4. It adds the `quy-tac` section on response rules set by managers.*

| # | Section id | Content | Module / block |
|---|---|---|---|
| 0 | `mo-dau` | Cover (§4). Takako's systems (ERP · MES-IoT · drawing store) flow into Minder AI, which gives information to managers in four areas | M1 hero, three islands redrawn as Sổ sách · Máy · Bản vẽ |
| **I** | **TAKAKO ĐÃ SẴN SÀNG** | | |
| 1 | `tu-chu` | **Takako hôm nay:**<br>- 10 years of digitalisation<br>- about 1,000 machines connected<br>- 100% of maintenance data in the system<br>- process-driven<br>- 2 plants in VN + 3 abroad | `cards` / `flow` |
| 2 | `yeu-cau` | **Bảy yêu cầu Takako đặt ra cho AI**, with how Minder AI meets and measures each (§2) | `table` / `cards` |
| **II** | **MINDER AI LÀM VIỆC TẠI TAKAKO** | | |
| 3 | `minder-ai` | **Minder AI là gì.** The four information areas (§4 table) on top of the data and systems Takako owns. It runs in the plant, read-only, joined on mã hàng. Way of working: **theo dõi → phát hiện → soạn sẵn → báo đúng người quản lý**, and it answers straight away when asked. FDE engineers sit with each team on site | `diagram` + `steps` |
| 4 | `ba-viec` | **Giai đoạn 1: Minder AI nhận ba phần việc.** Giá thành · Dữ liệu máy · Bản vẽ, covering all four information areas. For each: what Minder AI watches, what it reports, which manager receives it and when (§6) | `cards`, 3 columns |
| 5 | `mot-ngay` | **Một ngày làm việc cùng Minder AI** (hero, §6) | **New M20** |
| 6 | `kiem-soat` | **Bảo mật và kiểm soát (for IT):**<br>- on-prem, open-weight, no external API<br>- whitelist of outside sources<br>- access by role, audit log, read-only<br>- thresholds set by Takako<br>- NDA, ISO 27001<br>- data belongs to Takako<br>- AI reports, people decide | M13 `commitments` |
| **III** | **ĐO BẰNG CON SỐ, MỞ RỘNG TỪNG BƯỚC** | | |
| 7 | `gia-tri` | **Đo trên công việc thật** (§8). No question set: every output from Minder AI is marked correct or wrong by the person who receives it. Fee tied to KPIs | `table` |
| 8 | `lo-trinh` | **Ba giai đoạn:**<br>- GĐ1 week by week (§7)<br>- GĐ2: seven applications<br>- GĐ3: the second plant<br>- a gate after each phase, where Takako decides | M10 / M15 |
| 9 | `hop-tac` | **Roles, commercial model, next steps.** Fee model: a small fixed part covering the FDE, the rest paid only when KPIs are met; no per-user pricing | M14 package, short |

**Appendix:**

- `cach-hoat-dong`, for IT: ERP / MES connection via API, DB view or export; delivery channels; on-prem hardware; MCP;
- `faq`;
- `nguon`.

**Dropped:**

- `ky-nguyen`, `sieu-thong-minh`, `ban-do`;
- the old `phong-thi` (question set) and `gia-tri` calculator;
- `hai-ben`;
- `thu-ngo`;
- the floating deck assistant.

## 6. Giai đoạn 1: three areas of work, and the M20 hero

| Area | Minder AI watches | Minder AI reports on its own | Recipient |
|---|---|---|---|
| **Giá thành** (Accounting) | Actual cost by mã hàng: drawing materials × actual MES cycle time and scrap × accounting rates. The output plan. Whitelisted legal sources | **Cost alert** when a mã hàng goes above standard by more than Takako's threshold, with the main cause and the calculation. **Recalculation** of machine hours and cost when the output plan changes. **Monthly cost report** prepared in advance. **New regulation summary**, cited from the whitelist | Accounting (+ engineering when the cause is in production) |
| **Dữ liệu máy** (MES-IoT) | Incidents, repairs, cycle time and output across the machines in scope | **Morning briefing**: machines that need attention (repeat faults, long stops), last repair, parts replaced, link to the original records. **Weekly maintenance report** prepared in advance | Engineering |
| **Bản vẽ** | New drawing revisions against production orders and lots | **Revision alert**: new rev released, list of orders or lots still on the old rev | Engineering |

**Every output:**

- follows the response rules the managers set (data, calculation, format);
- shows source chips and "Xem cách tính" where there is a calculation;
- has three buttons: **Xác nhận · Không đúng · Không cần**, which are the KPI data;
- offers **Hỏi thêm**, for when the recipient wants to dig in. The Q&A lives here.

**M20 "Một ngày làm việc cùng Minder AI":**

- **Format:** an interactive feed with a **role switcher** (Kế toán · Kỹ thuật · Sản xuất). The feed changes with the role.
- **Behaviour:** scripted, with no LLM call. It works offline and in print. It contains no charts.
- **Feed, with one connected thread from machine to cost to drawing (the proof of requirement 7):**

  | Time | Output | Recipient | Content |
  |---|---|---|---|
  | 07:30 | Morning briefing | Engineering | MC-07 stopped 3 times in 6 months with the same spindle fault; last repaired 12/9, with the parts replaced. MC-12 has **no data since 15/9**, and Minder AI says so: the honest-gap example |
  | 09:00 | Cost alert | Accounting + Engineering | PT-2041 in September ran 4% above standard (Takako's threshold: 3%). Main cause: cycle time at OP-30 on MC-07 went up, the same machine as the 07:30 item. "Xem cách tính" shows material (from drawing rev C) · machine hours (MES) · labour · scrap · overhead |
  | 11:00 | Revision alert | Engineering | VS-118 released rev D. Two orders are still running on rev C |
  | 14:00 | Recalculation | Accounting | The November plan raises the piston group by 20%. The CNC group is short of machine hours and cost rises; the assumptions are stated. Labelled "phép tính theo công thức, không phải kế hoạch sản xuất" |
  | 16:00 | New regulation summary | Accounting | A new text from a whitelisted source: what it affects, the citation, and a note that accounting must confirm |
  | Friday 17:00 | Weekly report | Accounting + Engineering | Prepared in advance: cost by mã hàng, machine status, drawing changes |

- **Role behaviour:** in the *Sản xuất* role the cost and margin items disappear, and the feed shows "vai trò này không xem được giá thành".
- **Interaction:** click **Xác nhận** or open **Hỏi thêm** (one scripted follow-up per card).
- **Mock data:**
  - about 6 mã hàng in the hydraulic and machining domain;
  - about 8 machines and 3 months of history;
  - no real Takako part numbers, drawings or customers.

## 7. Phases and timeline

**Giai đoạn 1: three areas in 4 weeks.** Kick-off at the end of October means results by the end of November, inside Takako's October–November window.

| Week | Work | What Takako sees |
|---|---|---|
| 1 | Read-only connections (ERP / accounting, MES-IoT, drawing store). Baseline measured. Agreed with each team: output types, recipients, timing, and thresholds taken from Takako's own standards | Data map, baseline, list of outputs |
| 2 | Minder AI starts reporting to 2–3 recipients per area. Follow-up questions answered | The first briefings and alerts on real Takako data |
| 3 | All pilot recipients. Thresholds and formats tuned from Xác nhận / Không đúng / Không cần | Weekly correct-rate report |
| 4 | KPIs measured, results report | **Gate 1:** Takako decides on Giai đoạn 2 |

**Dependencies:** on-prem server or GPU, IT rules for outside engineers, data access through the plant-data partner, the delivery channel (email or other).

**Giai đoạn 2: Minder AI takes on more work.** The order is a suggestion, sorted by data readiness. Takako chooses.

| Order | Application | Data |
|---|---|---|
| 2a | Full maintenance assistant for ~1,000 machines: list of machines needing maintenance, replacement or parts orders, by severity | MES maintenance data |
| 2a | Tracing a mã hàng across systems: customer request → test run → production → quality → shipping | ERP, MES, quality, department documents |
| 2a | Full drawing comparison and checking: new vs stored, wrong or old versions | Drawing store |
| 2b | Standard process suggestions from similar mã hàng, warnings about past claims and jig faults | History of mã hàng, processes, claims |
| 2b | Predictive maintenance: warns of likely failures 1–2 weeks ahead | IoT, incident history |
| 2c | Machining program optimisation and lower cycle time | Machining programs, Takako's improvement rules |
| 2c | Production progress chasing: SO / PO → order → process → machine → stock | Almost every system |

**Giai đoạn 3: the second plant.**

- Minder AI and the work proven in plant 1 run at plant 2.
- The data layer, formats and thresholds carry over, so setup is shorter.
- Takako decides at the gate.

## 8. KPIs (measured on real work; targets agreed with Takako)

| KPI | How it's measured | Proposed target |
|---|---|---|
| Time spent on the work Minder AI takes over (cost report, machine-status summary, revision check) | Baseline week 1 vs week 4 | Agreed with Takako. Machine status: from about 30 minutes to under 2 minutes |
| Correct rate | Share of outputs the recipient marks **Xác nhận** | Agreed with Takako, e.g. above 90% |
| Noise rate | Share of outputs marked **Không cần** | Low, and falling week by week |
| Outputs with a source | Automatic check | 100% |
| Real use | Recipients, outputs read, follow-up questions per week | Agreed with Takako |

## 9. Build notes

- Create `decks/takako-vietnam/` from `isuzu-vietnam`, cut to the 10 sections plus the appendix.
- **New module M20 (feed by role):**
  - add `"M20"` to `ModuleId`;
  - put the scripted data in `decks/takako-vietnam/scenarios.ts`;
  - in `/ban-in`, show every card expanded with its sources and calculation.
  - It can share the data shape of M5 (time · event · what AI does · what people do), but the interface is a card feed.
- **Floating assistant:** off, or offline only.
- **`decks/all.ts`:**
  - forbidden terms both ways, plus `anh Thảo`;
  - set `ACCESS_CODE_TAKAKO_VIETNAM`.
- **Terms:**
  - Minder AI;
  - "trợ lý vận hành chủ động";
  - "Tác nhân AI";
  - no "chatbot";
  - no World Model in the main flow.
- **Schedule:**
  - `docs/takako-content-v1.md` next;
  - deck ready by 15/10, to go out with the proposal on 16/10.

## 10. Open decisions

1. **Proposal alignment.** The proposal draft is still built around the maintenance pilot, 6 weeks and a 50-question set. It has to be rewritten to 3 areas, proactive work, 4 weeks and KPIs measured on real work.
2. **Case studies:** named with consent, anonymised, or none?
3. **Language:** for leadership, is Vietnamese enough, or do they need a Japanese or English summary?
4. **Years for Giai đoạn 2–3:** indicative quarters, or none?
5. **Names:** the correct product name ("Minder AI") and the plant-data partner's organisation name.

## 11. Facts to verify before they go on a slide

1. **Does MES link machine time, scrap and repairs to the mã hàng / production order?** If not, the 07:30 → 09:00 thread (machine → cost) has to change.
2. **Does Takako already have a cost standard per mã hàng?** Cost alerts need one, and so do Takako's thresholds.
3. **Accounting:**
   - Which ERP? Is there an API, a database view or an export?
   - How is cost calculated today?
   - Who sets prices: Takako VN, Japanese HQ, or the customer's cost-down cycle?
4. **Drawings:** storage, file format, language, how revisions are managed. Is a drawing revision linked to the production order?
5. **Delivery channel:** what does Takako use internally (email, Teams, Zalo, something else)?
6. **Infrastructure:** on-prem server or GPU? IT rules for outside engineers?
7. **Pilot setup:** which plant? Language of users and records (VI / JA)?
