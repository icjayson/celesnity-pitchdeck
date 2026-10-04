# Isuzu Việt Nam landing deck: flow and root topic (brief)

*Draft, 05/10/2026. Source: Notion "Isuzu Saigon" (Department: Deployment, Status: Backlog), PDF export in Downloads. Third deck in the `decks/<slug>/` registry after `hoa-phat` and `nestle-vietnam`; proposed slug `isuzu-vietnam`.*

## 1. What we know about the plant

- **Who:** Công ty TNHH Ô tô Isuzu Việt Nam (ISUZU VIETNAM CO., LTD.). The business covers commercial-vehicle assembly, distribution, imported pickups/SUVs (D-MAX, mu-X), parts, maintenance and repair, aftersales, and support for dealers and transport customers.
- **Plant:** Gò Vấp assembly plant, 695 Quang Trung, Phường 8, Gò Vấp, TP.HCM. It is Isuzu's core production site in Vietnam. It imports CKD kits, assembles and distributes:
  - light trucks (Q-Series, N-Series);
  - medium and heavy trucks (F-Series);
  - bus chassis.
- **Process (Isuzu's own published stages):** BODY (cabin) → PAINT → INTERIOR / TRIM → CHASSIS → INSPECTION / QC → rework if NG → finished vehicle.
- **End-to-end flow:** dealer/customer demand → sales forecast → production planning → local suppliers + CKD import → material/warehouse → the five stages above → dealer/customer → aftersales.
- **Culture we can build on (their words, not ours):**
  - **Isuzu Monozukuri** climbs three levels: *không bỏ sót lỗi* → *không tạo ra lỗi* → *không thể tạo ra lỗi*.
  - **Asakai**: every department shares quality issues and fixes at the start of each day.
- **Opportunity areas from the Notion page.** These are internal. They go on the page only as "cơ hội", never as "vấn đề":

  | Area | Opportunity | Minder angle |
  |---|---|---|
  | Production | Line progress, bottlenecks, takt/cycle time, plan adherence | Line state in one model |
  | Quality | Early defect detection, root cause, less repeat defect/rework | **Quality Agent**, early fault detection |
  | Traceability | VIN ↔ component, serial, supplier, production lot | **Traceability Agent**, both directions |
  | Maintenance | Less unplanned downtime, failure risk before it hits the line | Run-time based failure forecast |
  | Material / CKD | Right part, right quantity, right time | Stock vs build-plan alerts |
  | Supplier | Part quality and delivery performance | (open) |
  | Knowledge | Link SOP, defect history, corrective actions, engineer experience | (open) |
  | Aftersales | Vehicle uptime for customers | (open) |

- **The two agents already specified:**
  - **Quality Agent.** Context per defect: VIN, model, process, station, component, supplier, supplier lot, operator, jig/tool, shift, defect history, corrective actions. It answers *"Lỗi này đã từng xảy ra chưa?"*, e.g. 17 similar defects on QKR / BODY-08 / LOT-2938 / night shift / JIG-04, previous RCA "fixture positioning variation", previous CA-BODY-2026-018. **AI does not decide quality for QA.** It helps QA find historical cases, correlations and corrective actions, scope the affected production, and shorten root-cause time.
  - **Traceability Agent.** Vehicle → component (engine, axle, brake, glass and seat serials, suppliers and lots). Component → vehicle (supplier flags Brake Lot BR-292 → affected VINs). Then supplier lot → VIN → production date → QC → current location (factory / dealer / customer). That chain is the **digital genealogy** of the vehicle.
- **Assets:** an "Isuzu Demo Video" is linked from the Notion page. Get the file to embed or link.

## 2. Root topic

The earlier roots:
- **Hòa Phát:** ownership (*tự chủ trí thông minh vận hành*).
- **Nestlé:** one closed decision loop (*Plan → Run → Recover*).

**Isuzu's root:** *Monozukuri, carried by a model that remembers every vehicle.*

> **From "không bỏ sót lỗi" to "không thể tạo ra lỗi", on one Mô hình AI Thế giới thực.** Every VIN carries its full genealogy: station, jig, operator, shift, supplier lot, QC result, where the vehicle is now. Every defect and every corrective action becomes memory. The model connects one defect to its history, its pattern and every other vehicle it touches, and QA approves each step.

- **Working title:** NHÀ MÁY SIÊU THÔNG MINH, *Isuzu Việt Nam × Celesnity*.
- **Tagline (draft):** *Mỗi chiếc xe mang theo ký ức của nó.* Alternative: *Từ không bỏ sót lỗi đến không thể tạo ra lỗi.*
- **Product names inside the deck:** Minder Quality Agent, Minder Traceability Agent.
- **Brand triad mapped onto Monozukuri.** This is the spine of the deck:

  | Monozukuri level | Triad | What the model does |
  |---|---|---|
  | Không bỏ sót lỗi | **Tự học** | Every defect, RCA and CA becomes searchable memory linked to VIN, station, lot, jig and shift |
  | Không tạo ra lỗi | **Dự báo trước** | Early fault detection: jig drift, equipment run-time, suspect supplier lot, before the defect repeats |
  | Không thể tạo ra lỗi | **Nhân rộng** | A lesson from one station or model becomes SOP or prevention across lines, models and suppliers |

- **Opening from strength (rule from [[pitch-no-client-weaknesses]]).** Isuzu already has one of the most disciplined quality cultures in the industry, and Asakai is already a daily habit. The strategic question is: *khi văn hóa chất lượng đã là thói quen mỗi sáng, trí thông minh nào giúp nó nhớ mọi chiếc xe?*
- **Upward and outward hook.** The genealogy does not stop at the factory gate. A truck is a working asset for a transport customer. The expansion path runs plant quality → whole line → dealers and aftersales → **vehicle uptime for fleet customers**. Uptime plays the role steel played for Hòa Phát: the end target that makes the pilot worth doing.
- **What not to say:** the Notion page mentions tracing "trong Excel hoặc Database". That stays internal. Don't describe how Isuzu traces today.

## 3. Flow (follows the live 14-section order in the codebase)

| # | Section id | Isuzu content | Module notes |
|---|---|---|---|
| 0 | `mo-dau` | NHÀ MÁY SIÊU THÔNG MINH · Isuzu Việt Nam × Celesnity. Lead: "Mỗi chiếc xe mang theo ký ức của nó" | M1 hero. New island art: truck line |
| **I** | **MỘT KỶ NGUYÊN MỚI** | | |
| 1 | `tu-chu` | **Isuzu Việt Nam hôm nay:** Gò Vấp, five-stage flow, Q / N / F-Series + bus chassis, D-MAX / mu-X, dealer network and aftersales, Monozukuri + Asakai | `[flow]` = BODY → PAINT → TRIM → CHASSIS → QC |
| 2 | `ky-nguyen` | Three waves: automation → language AI → World Model (AI that understands the physical world) | M2 as is |
| 3 | `hai-con-duong` | "Khi chất lượng đã là văn hóa, AI nên đứng ở đâu?" Separate tools per department vs one model of every vehicle's genealogy | M3 reframed |
| **II** | **NHÀ MÁY SIÊU THÔNG MINH** | | |
| 4 | `sieu-thong-minh` | Monozukuri three levels ↔ Tự học · Dự báo trước · Nhân rộng (table above) | Centre of Act II |
| 5 | `ba-lop` | Nền tảng ghi lại (VIN, station, lot, jig, shift) → World Model (defect graph, the DEFECT tree) → Tác nhân AI (Quality, Traceability) → QA approves | M7 reskinned as defect/genealogy graph |
| 6 | `mot-ngay` | **Một ngày tại Gò Vấp:** 07:30 Asakai brief prepared automatically → 09:40 door hinge RH defect on QKR-00182 at BODY-08 → "đã từng xảy ra chưa?" → 11:00 supplier lot alert, reverse trace → 14:00 jig/equipment forecast → end of shift: every VIN's genealogy closed | M5 |
| **III** | **LỘ TRÌNH** | | |
| 7 | `ban-do` | Three scopes: one station and one model (BODY, QKR) → the whole Gò Vấp line, all series → beyond the gate: dealers, aftersales, fleet uptime | M8; island art: truck plant, dealer network |
| 8 | `use-case` | The 8 areas as "cơ hội". Wave 1: Quality + Traceability (+ Knowledge, same data). Wave 2: Maintenance, Material/CKD, Supplier. Wave 3: Production, Aftersales | M9 / M18 |
| 9 | `lo-trinh` | 16-week pilot: Quality Agent at BODY, back-tested on Isuzu's own defect and CA history, scored by Isuzu QA. Gates into Traceability, then the line | M10 / M15 / M16 / M17 |
| 10 | `thu-ngay` | **Interactive hero** (see §4) | Scenario rebuild |
| 11 | `hop-tac` | Commitments: AI never decides quality; QA approves; data stays inside Isuzu; works alongside existing systems; numbers confirmed by Isuzu | Control content lives here |
| 12 | `hai-ben` | Mutual benefits | |
| 13 | `thu-ngo` | Letter to Ban Giám đốc Isuzu Việt Nam | |

## 4. The hero scenario (thu-ngay)

One loop that uses both agents and ends with a human approval:

1. **Defect.** Door hinge RH out of spec on **QKR-00182**, station **BODY-08**.
2. **Memory.** "Lỗi này đã từng xảy ra chưa?" → 17 similar defects. Common pattern: QKR · BODY-08 · LOT-2938 · night shift · JIG-04. Previous RCA: fixture positioning variation. Previous CA: CA-BODY-2026-018.
3. **Suspect.** The model separates the two candidate causes, jig (JIG-04) and supplier lot (LOT-2938), and shows the evidence for each.
4. **Reverse trace.** Every VIN built with LOT-2938 → production date → QC result → current location: in the plant / at dealers / delivered to customers.
5. **Options.** A: hold and inspect in-plant VINs only. B: also notify dealers for the units on their lots. C: re-apply CA-BODY-2026-018 to JIG-04 and add a check. D: raise with Supplier A.
6. **Approve.** The viewer, playing QA, clicks **Duyệt**. Asakai tomorrow opens with the decision already logged against every affected VIN.

All data is labelled **"Mô phỏng minh họa"**.

## 5. How it differs from Hòa Phát and Nestlé

- **Quality-led, not plan-led.** Nestlé's centre was the plan. Isuzu's is the defect and the VIN.
- **Japanese corporate culture.** Use their own words (Monozukuri, Asakai) and borrow no other TPS vocabulary we can't verify Isuzu uses. Keep the tone modest and evidence-first: back-test on their history, QA scores the result.
- **The factory gate is not the boundary.** Dealers, aftersales and fleet customers are part of the story. Neither of the other decks has this.
- **Brands.** No Isuzu logo or truck photos we don't have rights to. Label scenario VINs, lots and suppliers as illustrative.

## 6. Decisions for Jayson before build

1. **Audience:** who is in the room? A Japanese GM, the Vietnamese plant/production director, or the QA head? This sets the tone and the language.
2. **Language:** Vietnamese only, or Vietnamese plus English (or Japanese) for Isuzu Motors?
3. **Root and tagline:** Monozukuri-led (recommended) vs genealogy-led ("Mỗi chiếc xe mang theo ký ức của nó") as the cover line.
4. **End target:** fleet uptime / aftersales (recommended) vs staying inside the plant.
5. **Commercial frame:** founding partner like Hòa Phát, or a scoped paid pilot like Nestlé?
6. **Demo video:** embed the Isuzu demo video in the deck, or keep it for the meeting?

**Facts to verify before they go on a slide:** year founded and ownership structure, plant capacity and output, exact models assembled at Gò Vấp today, dealer count, existing systems (ERP / MES / QMS / traceability), whether "Isuzu Monozukuri" and Asakai are public terms we can quote, and contact names.
