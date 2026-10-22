/**
 * Module data for the Siam Cement Group deck (M1, M3, M13, M15, M16).
 * Matches docs/scg-content-v1.md. 22-month roadmap: one kiln line → whole plant → plants in Vietnam → one plant in Thailand.
 * Headcounts, thresholds and month milestones are proposals, confirmed after the survey; every scenario is illustrative.
 */
import type { DeckData, StaffRow } from "../../types";
import { PILOT, PILOT_SHORT, THAI, VN_NEXT } from "./places";

type Scenarios = Required<DeckData["scenarios"]>;

// ───────────── M16: Staffing ─────────────
const staffRows: StaffRow[] = [
  {
    team: "Celesnity",
    tone: "blue",
    cells: [
      { count: 3, roles: ["Delivery manager 1", `Field engineer at ${PILOT_SHORT} 1`, "AI engineer 1"] },
      { count: 3, roles: ["Manager ½", "Field engineer 1", "AI engineer 1", "Control engineer ½"] },
      { count: 4, roles: ["Manager 1", "Field engineers at the new plants 2", "AI engineer 1"] },
      { count: 5, roles: ["Manager 1", "Field engineers at the new plant 2", "AI engineer 1", "Data engineer 1"] },
    ],
  },
  {
    team: "Siam Cement Group operating engineers and specialists",
    note: "Use Minder in their daily work at the plant",
    tone: "orange",
    cells: [
      { count: null, roles: ["Shift leads, Kiln Process, Quality ~4 hours/week each", "Data lead ~2 hours/week"] },
      { count: null, roles: ["As before", "+ Maintenance, Energy ~2 hours/week"] },
      { count: null, roles: ["Specialists at each new plant"] },
      { count: null, roles: ["Specialists at the new plant"] },
    ],
  },
];

export const staffing: Scenarios["staffing"] = {
  phases: [
    { name: "Pilot", months: "T+1–T+4" },
    { name: "Whole plant", months: "T+5–T+10" },
    { name: "Scale-out, wave 1", months: "T+11–T+16" },
    { name: "Scale-out, wave 2", months: "T+17–T+22" },
  ],
  rows: staffRows,
  leaders: { team: "Siam Cement Group leadership", text: "Group executive sponsor: monthly meeting · plant leads and Finance: at each gate" },
};

// ───────────── M13, M3, M1 ─────────────
export const m13: Scenarios["m13"] = {
  foundingNote: "Siam Cement Group co-builds the foundation model for the building materials industry, keeps long-term usage rights and helps set its direction.",
  environments: ["Siam Cement Group · Vietnam", "Siam Cement Group · Thailand"],
};

export const m3: Scenarios["m3"] = {
  captions: {
    A: "A separate rented tool for each plant; data leaves for the vendor's systems; the model and the experience belong to the vendor.",
    B: "One World Model of Siam Cement Group's own; data stays in Siam Cement Group's own environment at each plant; the experience of one plant carries to the next.",
  },
};

export const m1: Scenarios["m1"] = {
  captions: [
    `Illustration: three islands, ${PILOT_SHORT}, the Siam Cement Group plants in Vietnam and the plant in Thailand, with the glowing World Model core above, linked to each island by a fine line.`,
    "Self-learning: every setpoint change, laboratory result and kiln stop flows back to the model; forecast accuracy improves month by month from month 1.",
    "Foresight: before a setpoint changes, the model draws three heat consumption paths for three options, each with a confidence band; coordinating feed and fuel cuts the most while keeping free lime within limits.",
    `Scale-out: the experience of the kiln line at ${PILOT_SHORT} carries over to cement grinding, the other plants in Vietnam and the plant in Thailand, without starting from zero.`,
  ],
  foresight: {
    axis: "HEAT CONSUMPTION (kcal/kg clinker)",
    options: ["No change", "Reduce fuel only", "Coordinate feed and fuel"],
    pickTitle: "Lower heat consumption, clinker quality held",
    pickNote: "Confidence: high",
  },
  replicate: {
    sourceTitle: "Kiln line",
    sourceSub: PILOT_SHORT,
    targets: ["Cement grinding", VN_NEXT[0], VN_NEXT[1], THAI],
    more: "… and the next Siam Cement Group plants",
  },
  learn: {
    badge: "Better every shift",
    curve: [0.3, 0.31, 0.33, 0.35, 0.38, 0.42, 0.47, 0.53, 0.6, 0.68, 0.78, 0.9],
  },
};
