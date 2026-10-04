import type { CalcInputs } from "../../types";
export type { CalcInputs };

/** Đầu vào mặc định của máy tính giá trị (M12), khớp docs/content-v4.md mục #gia-tri. */

export const calcDefaults: CalcInputs = {
  volumePerYear: 100_000,
  escapeRatePct: 0.5,
  costPerEscape: 800_000,
  extraCatchShare: 0.2,
  volumePerMonth: 10_000,
  earlyWeeks: 8,
  warrantyRatePct: 2,
  costPerClaim: 800_000,
  incidentsConservative: 1,
  incidentsBase: 2,
  failedChangeCostLow: 1_000_000_000,
  failedChangeCostHigh: 2_000_000_000,
  changesAvoidedConservative: 0,
  changesAvoidedBase: 1,
  programCostPerYear: 2_000_000_000,
  dossiersPerYear: 300,
  hoursPerDossier: 6,
  timeReduction: 0.25,
};

export const breakEvenGrid = {
  volumes: [100_000, 200_000],
  costs: [1_000_000_000, 2_000_000_000, 3_000_000_000],
};
