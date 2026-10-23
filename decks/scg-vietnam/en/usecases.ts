/**
 * Use cases of the Siam Cement Group deck (M18 variant "features"). 35 practical applications at Song Gianh Cement, grouped by the 5
 * Minder platform features available today; none needs Forecast or setpoint writes to the machine. Matches docs/scg-content-v1.md section #use-case
 * and the "version 3" table in the Song Gianh research document. Specific signals are confirmed in the survey against Siam Cement Group's signal list.
 */
import { featureVideos } from "../shots";
import type { Phase, UseCase } from "../../types";
import { PILOT_SHORT, THAI, VN_NEXT } from "./places";

export const sectorLabels: Record<string, string> = {
  "lo-nung": "Kiln line",
  "nha-may": `All of ${PILOT_SHORT}`,
  "khu-vuc": "Siam Cement Group network",
};

export const phaseLabels: Record<Phase, string> = {
  pilot: "Pilot",
  "dung-that": "Whole plant",
  "nhan-rong": "Scale-out, wave 1",
  "nam-2": "Scale-out, wave 2",
};

/** The 5 Minder platform features, in data-flow order; the part in brackets is the subtitle on the diagram */
export const FEATURES = [
  { name: "Real-time data connection (Minder hardware, data pipeline)", from: 1 },
  { name: "Real-time monitoring and measurement (dashboards, 3D plant model)", from: 1 },
  { name: "Alerts and anomaly detection (fault detection)", from: 2 },
  { name: "Proactive AI assistant (AI chat, charts, reports)", from: 2 },
  { name: "Automatic reporting (Routine)", from: 3 },
] as const;

const S = {
  quarry: "Quarrying and crushing",
  lab: "Blending silo and laboratory",
  preheater: "Preheater tower and calciner",
  kilnTower: "Preheater tower and rotary kiln",
  kiln: "Rotary kiln",
  cooler: "Cooling and waste heat power generation",
  fuel: "Coal and fuel grinding",
  grinding: "Raw grinding, cement grinding, cooling",
  dispatch: "Packing, dispatch and port",
  energy: "Energy",
  env: "Environment",
  plant: "Whole plant",
  line: "Whole line",
  maintenance: "Whole plant: maintenance",
  shift: "Rotary kiln · quarrying and crushing",
};
const KILN_LINE = new Set<string>([S.preheater, S.kilnTower, S.kiln, S.cooler]);

/** f = index into FEATURES; name = short name in the list; detail = full practical application */
const rows: { f: 0 | 1 | 2 | 3 | 4; name: string; detail: string; stage: string }[] = [
  // Real-time data connection
  { f: 0, name: "Connect the ABB control system (read-only)", detail: "Connect the ABB control system in read-only mode: over 1,000 kiln, tower, mill and fan signals into Minder in real time", stage: S.line },
  { f: 0, name: "Sensors for crushers and conveyors", detail: "Install Minder at the machine with vibration and motor current sensors on crushers and conveyors that have no signals yet", stage: S.quarry },
  { f: 0, name: "Connect XRF and the laboratory", detail: "Bring automatic XRF and laboratory results into the same data stream as the kiln signals", stage: S.lab },
  { f: 0, name: "Connect fuel and co-processed waste", detail: "Connect waste receipt records, fuel stock and calorific values", stage: S.fuel },
  { f: 0, name: "Connect power and waste heat generation", detail: "Connect electricity meters, motor power and waste heat power generation", stage: S.energy },
  { f: 0, name: "Connect emission monitoring and stack cameras", detail: "Connect the 4 continuous emission monitoring systems and stack cameras", stage: S.env },
  { f: 0, name: "Connect dispatch, weighbridge and port", detail: "Connect dispatch, weighbridge, port and Auto Truck system data", stage: S.dispatch },
  // Real-time monitoring and measurement
  { f: 1, name: "3D plant model", detail: "3D model of the Song Gianh plant: from quarry to port, the status of every piece of equipment in real time", stage: S.plant },
  { f: 1, name: "Output and downtime dashboard", detail: "Output dashboard: clinker tonnes/day, cement tonnes/day, running hours, downtime causes and overall equipment effectiveness", stage: S.plant },
  { f: 1, name: "Kiln and preheater dashboard", detail: "Kiln dashboard: temperatures, cyclone pressures on both strings, O₂, CO, kiln torque, feed, shell temperature", stage: S.kilnTower },
  { f: 1, name: "Quality dashboard", detail: "Quality dashboard: lime saturation factor, silica and alumina modulus, free lime, Blaine fineness, strength by shift", stage: S.lab },
  { f: 1, name: "Alternative fuel dashboard", detail: "Alternative fuel dashboard: co-processed waste volume, thermal substitution rate", stage: S.fuel },
  { f: 1, name: "Grinding energy and waste heat dashboard", detail: "Energy dashboard: kWh/tonne for raw and cement grinding, waste heat power generation", stage: S.grinding },
  { f: 1, name: "Dispatch and silo stock dashboard", detail: "Dispatch dashboard: levels of the 4 cement silos, trucks and barges for the day", stage: S.dispatch },
  // Alerts and anomaly detection
  { f: 2, name: "Abnormal crushers and conveyors", detail: "Detect abnormal vibration or load on crushers and conveyors", stage: S.quarry },
  { f: 2, name: "XRF and free lime off target", detail: "Alert when XRF results or free lime drift off target", stage: S.lab },
  { f: 2, name: "Early cyclone blockage warning", detail: "Early warning of cyclone blockage as temperatures and pressures start to drift", stage: S.preheater },
  { f: 2, name: "Kiln shell hot spots", detail: "Detect kiln shell hot spots that are unusual compared with history", stage: S.kiln },
  { f: 2, name: "Abnormal cooler fans and boiler", detail: "Alert when cooler fans or the waste heat boiler run abnormally", stage: S.cooler },
  { f: 2, name: "Coal mill CO", detail: "Alert on a fast rise in CO or outlet temperature at the coal mill", stage: S.fuel },
  { f: 2, name: "Abnormal machine power use", detail: "Detect machines using abnormal power relative to output", stage: S.energy },
  { f: 2, name: "Emissions approaching limits", detail: "Alert when dust, SO₂ or NOx approach the 2026 limits", stage: S.env },
  // Proactive AI assistant
  { f: 3, name: "Ask for a trend, get a chart", detail: "Ask in Vietnamese \"cyclone string A temperature over the last 24 hours\"; Minder builds the chart and adds it to the dashboard", stage: S.preheater },
  { f: 3, name: "Shift handover and stop reports by voice", detail: "Hand over shifts and report stops by voice; the assistant files the record against the equipment and cause", stage: S.shift },
  { f: 3, name: "How was it handled last time?", detail: "\"How did we handle the last cyclone blockage?\": the fix from shift logs and the operating manual", stage: S.kiln },
  { f: 3, name: "Kiln stop incident report", detail: "Draft the kiln stop incident report from the data and the shift's account", stage: S.kiln },
  { f: 3, name: "Which machines push up the power bill?", detail: "\"Which machines pushed up the power bill this week?\": power use chart by machine and time of day", stage: S.energy },
  { f: 3, name: "Day shift versus night shift", detail: "Compare day and night shifts: output, downtime, quality", stage: S.plant },
  // Automatic reporting (Routine)
  { f: 4, name: "Shift and daily report", detail: "Shift and daily report to shift leads and the plant manager: output, downtime, quality", stage: S.plant },
  { f: 4, name: "Quality report by shift and batch", detail: "Quality report by shift and by batch", stage: S.lab },
  { f: 4, name: "Weekly fuel and waste report", detail: "Weekly report on fuel stock and co-processed waste", stage: S.fuel },
  { f: 4, name: "Weekly energy report", detail: "Weekly energy report: kWh/tonne, waste heat power generation", stage: S.energy },
  { f: 4, name: "Weekly maintenance report", detail: "Weekly maintenance report: equipment alerts and open work", stage: S.maintenance },
  { f: 4, name: "Monthly environment report", detail: "Monthly environment report from the continuous emission monitoring systems", stage: S.env },
  { f: 4, name: "Daily dispatch report", detail: "Daily dispatch report: trucks, barges, silo stock", stage: S.dispatch },
];

/** Video demo Minder theo tính năng (chỉ số trong FEATURES) */
const videos = featureVideos("Minder demo · simulated data · 2× speed", {
  0: "A data workflow watches the kiln control system and refreshes the curated tables every 30 seconds.",
  1: "Live production flow, management and kiln dashboards, and the 3D model of kiln line 1.",
  2: "The kiln drifts after a new coal lot, the alert explains what moved, and it closes itself once the kiln recovers.",
  3: "Ask about an alert, a mill's energy use, a chart or a shift handover report, with sources for every figure.",
  4: "A weekly maintenance review written by Minder, plus the Excel export of kiln stops missing a cause.",
});

const nn = (i: number) => String(i + 1).padStart(2, "0");

export const useCases: UseCase[] = [
  ...rows.map(
    (r, i): UseCase => ({
      id: `UC${i}`,
      code: `App ${nn(i)}`,
      name: r.name,
      question: r.detail,
      liveFrom: `T+${FEATURES[r.f].from}`,
      sectors: KILN_LINE.has(r.stage) ? ["lo-nung", "nha-may", "khu-vuc"] : ["nha-may", "khu-vuc"],
      phase: "pilot",
      card: {
        opportunity: r.detail,
        aiDoes: r.detail,
        decides: "",
        pass: "",
        stage: r.stage,
        minder: FEATURES[r.f].name,
        // video demo Minder gắn vào use case đầu tiên của mỗi tính năng
        video: rows.findIndex((x) => x.f === r.f) === i ? videos(r.f) : undefined,
      },
    }),
  ),
  {
    id: "nhan-rong-vn",
    code: "Scale-out",
    name: "The next Siam Cement Group plants",
    question: `${VN_NEXT[0]} (T+11–T+13) → ${VN_NEXT[1]} (T+14–T+16)`,
    liveFrom: "T+11–T+16",
    sectors: ["khu-vuc"],
    phase: "nhan-rong",
  },
  {
    id: "thai-lan",
    code: "Thailand",
    name: `Scale-out to ${THAI}`,
    question: `Survey of ${THAI} (T+17) → suitable applications in live use (T+19–T+22), data stays at the plant`,
    liveFrom: "T+17–T+22",
    sectors: ["khu-vuc"],
    phase: "nam-2",
    note: "Proposed direction",
  },
];

export const appCount = rows.length;

export const expansionMap: [string, string][] = [
  ["Quarrying and crushing", "Crusher and conveyor sensors; anomaly alerts; voice shift handover"],
  ["Laboratory", "XRF and lab results in the same data stream; quality dashboard and reports"],
  ["Preheater tower and rotary kiln", "Kiln dashboard, cyclone blockage alerts, kiln shell hot spots, trend questions"],
  ["Fuel", "Co-processed waste, thermal substitution rate, coal mill CO"],
  ["Energy and environment", "Power use by machine, waste heat, continuous emission monitoring and environment reports"],
  ["Packing, dispatch and port", "Silo stock, trucks, barges, daily dispatch report"],
  ["Other Siam Cement Group materials plants", "Tile kilns, paper machines: the same 5 Minder features"],
];

/** Before/after is not used in the "features" variant; kept so M18 receives every use case (the filter needs beforeAfter) */
export const beforeAfter: Record<string, { before: string; after: string }> = Object.fromEntries(
  rows.map((r, i) => [`UC${i}`, { before: "", after: r.detail }]),
);
