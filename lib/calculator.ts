/**
 * Máy tính giá trị (M12): hàm thuần, không phụ thuộc React.
 * Công thức khớp docs/content-v4.md mục #gia-tri (xem content.vi.ts, section "gia-tri").
 */
import type { CalcInputs } from "@/decks/types";

type Grid = { volumes: number[]; costs: number[] };
import { vnNumber } from "./format";

/** Số ngày trung bình mỗi tháng dùng trong công thức v4 */
export const DAYS_PER_MONTH = 30.4;

/** Kiểm tra có mục tiêu (UC1): sản lượng × tỷ lệ lọt × phần bắt thêm × chi phí mỗi lỗi lọt */
export function targetedInspection(i: Pick<CalcInputs, "volumePerYear" | "escapeRatePct" | "extraCatchShare" | "costPerEscape">): number {
  return i.volumePerYear * (i.escapeRatePct / 100) * i.extraCatchShare * i.costPerEscape;
}

/** Số lỗi lọt/năm và số lỗi bắt thêm được (để hiển thị giả định) */
export function escapes(i: Pick<CalcInputs, "volumePerYear" | "escapeRatePct" | "extraCatchShare">) {
  const total = i.volumePerYear * (i.escapeRatePct / 100);
  return { total, extra: total * i.extraCatchShare };
}

/** Số sản phẩm ít bị ảnh hưởng nhờ phát hiện sớm (UC3): sản lượng/tháng × tuần sớm × 7 / 30,4 */
export function unitsLessExposed(i: Pick<CalcInputs, "volumePerMonth" | "earlyWeeks">): number {
  return (i.volumePerMonth * i.earlyWeeks * 7) / DAYS_PER_MONTH;
}

/** Giá trị mỗi sự cố bảo hành phát hiện sớm: số sp ít bị ảnh hưởng × tỷ lệ bảo hành × chi phí mỗi ca */
export function perIncident(i: Pick<CalcInputs, "volumePerMonth" | "earlyWeeks" | "warrantyRatePct" | "costPerClaim">): number {
  return unitsLessExposed(i) * (i.warrantyRatePct / 100) * i.costPerClaim;
}

/** Giờ kỹ sư được giải phóng mỗi năm (UC0) */
export function engineerHours(i: Pick<CalcInputs, "dossiersPerYear" | "hoursPerDossier" | "timeReduction">): number {
  return i.dossiersPerYear * i.hoursPerDossier * i.timeReduction;
}

/** Ngưỡng hòa vốn: chi phí chương trình/năm chia cho sản lượng bán đủ điều kiện (đ/sp) */
export function breakEvenPerUnit(cost: number, volume: number): number {
  if (volume <= 0) return Number.POSITIVE_INFINITY;
  return cost / volume;
}

/** Quy đổi năng suất: +x năng suất ⇔ thời gian còn 1/(1+x) */
export function productivity(gain: number) {
  const timeRemaining = 1 / (1 + gain);
  return { timeRemaining, timeReduction: 1 - timeRemaining };
}

export type ScenarioBreakdown = {
  /** Kiểm tra có mục tiêu (UC1) */
  inspection: number;
  /** Bảo hành phát hiện sớm (UC3) */
  warranty: number;
  /** Tránh thay đổi kỹ thuật không hiệu quả (UC2) */
  changes: number;
  total: number;
};

export type CalcResult = {
  targetedInspection: number;
  escapesTotal: number;
  escapesExtra: number;
  unitsLessExposed: number;
  perIncident: number;
  engineerHours: number;
  conservative: ScenarioBreakdown;
  baseLow: ScenarioBreakdown;
  baseHigh: ScenarioBreakdown;
  breakEven: number;
};

function scenario(inspection: number, incidents: number, perInc: number, changes: number, changeCost: number): ScenarioBreakdown {
  const warranty = incidents * perInc;
  const ch = changes * changeCost;
  return { inspection, warranty, changes: ch, total: inspection + warranty + ch };
}

/** Kịch bản Thận trọng: kiểm tra có mục tiêu + sự cố (thận trọng) + thay đổi tránh được (thận trọng) × chi phí thấp */
export function conservative(i: CalcInputs): number {
  return calculate(i).conservative.total;
}

/** Kịch bản Cơ sở: trả về cận thấp và cận cao theo chi phí một thay đổi không hiệu quả */
export function base(i: CalcInputs): { low: number; high: number } {
  const r = calculate(i);
  return { low: r.baseLow.total, high: r.baseHigh.total };
}

export function calculate(i: CalcInputs): CalcResult {
  const insp = targetedInspection(i);
  const esc = escapes(i);
  const perInc = perIncident(i);
  const costLo = Math.min(i.failedChangeCostLow, i.failedChangeCostHigh);
  const costHi = Math.max(i.failedChangeCostLow, i.failedChangeCostHigh);
  return {
    targetedInspection: insp,
    escapesTotal: esc.total,
    escapesExtra: esc.extra,
    unitsLessExposed: unitsLessExposed(i),
    perIncident: perInc,
    engineerHours: engineerHours(i),
    conservative: scenario(insp, i.incidentsConservative, perInc, i.changesAvoidedConservative, costLo),
    baseLow: scenario(insp, i.incidentsBase, perInc, i.changesAvoidedBase, costLo),
    baseHigh: scenario(insp, i.incidentsBase, perInc, i.changesAvoidedBase, costHi),
    breakEven: breakEvenPerUnit(i.programCostPerYear, i.volumePerYear),
  };
}

/** Bảng hòa vốn 2×3 (hàng: sản lượng, cột: chi phí) */
export function breakEvenTable(grid: Grid): number[][] {
  const { volumes, costs } = grid;
  return volumes.map((v) => costs.map((c) => breakEvenPerUnit(c, v)));
}

/** Ô gần nhất trong bảng hòa vốn với lựa chọn hiện tại (so sánh theo tỷ lệ, log) */
export function nearestGridCell(volume: number, cost: number, grid: Grid) {
  const { volumes, costs } = grid;
  const near = (arr: number[], x: number) => {
    let best = 0;
    let bestD = Infinity;
    arr.forEach((a, idx) => {
      const d = Math.abs(Math.log(Math.max(x, 1)) - Math.log(a));
      if (d < bestD) {
        bestD = d;
        best = idx;
      }
    });
    return best;
  };
  return { row: near(volumes, volume), col: near(costs, cost) };
}

/* ───────────── Làm tròn hiển thị (khớp cách viết trong v4) ───────────── */

/** Làm tròn "đẹp": bước = 5 × 10^(⌊log10(n/2)⌋ − 1). 18.421 → 18.500; 294,7 → 300; 80 → 80 */
export function niceRound(n: number): number {
  if (!Number.isFinite(n) || n === 0) return 0;
  const abs = Math.abs(n);
  const step = Math.max(1, 5 * 10 ** (Math.floor(Math.log10(abs / 2)) - 1));
  return Math.sign(n) * Math.round(abs / step) * step;
}

/** Số gần đúng: "~18.500" */
export function approxNumber(n: number): string {
  return `~${vnNumber(niceRound(n))}`;
}

/** Tiền gần đúng theo nguồn giá trị: "~80 triệu đ", "~300 triệu đ", "~1,5 tỷ đ" */
export function approxMoney(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `~${vnNumber(n / 1_000_000_000, 1).replace(/,0$/, "")} tỷ đ`;
  if (abs >= 1_000_000) return `~${vnNumber(niceRound(n / 1_000_000))} triệu đ`;
  return `~${vnNumber(niceRound(n))} đ`;
}

/** Số tỷ, một chữ số thập phân: 0,375 tỷ → "0,4" */
export function billions(n: number): string {
  return vnNumber(Math.round(n / 100_000_000) / 10, 1);
}

/** Giá trị kịch bản: "~0,4 tỷ đ" */
export function approxScenario(n: number): string {
  return `~${billions(n)} tỷ đ`;
}

/** Khoảng giá trị kịch bản: "~1,7–2,7 tỷ đ" (gộp khi hai cận bằng nhau) */
export function approxScenarioRange(low: number, high: number): string {
  const a = billions(Math.min(low, high));
  const b = billions(Math.max(low, high));
  return a === b ? `~${a} tỷ đ` : `~${a}–${b} tỷ đ`;
}

/** Đ/sp: "20.000 đ/sp" */
export function perUnit(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `${vnNumber(Math.round(n))} đ/sp`;
}

/** Phần trăm làm tròn: 0,769 → "77%" */
export function pct(x: number): string {
  return `${vnNumber(Math.round(x * 100))}%`;
}
