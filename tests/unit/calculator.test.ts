import { describe, expect, it } from "vitest";
import { calcDefaults, breakEvenGrid } from "@/content/scenarios/m12-defaults";
import {
  approxMoney,
  approxNumber,
  approxScenario,
  approxScenarioRange,
  base,
  breakEvenPerUnit,
  breakEvenTable,
  calculate,
  conservative,
  engineerHours,
  escapes,
  nearestGridCell,
  niceRound,
  pct,
  perIncident,
  perUnit,
  productivity,
  targetedInspection,
  unitsLessExposed,
} from "@/lib/calculator";

const d = calcDefaults;

describe("kiểm tra có mục tiêu (UC1)", () => {
  it("0,5% lỗi lọt = 500 lỗi; bắt thêm 1/5 = 100 lỗi", () => {
    const e = escapes(d);
    expect(e.total).toBeCloseTo(500, 6);
    expect(e.extra).toBeCloseTo(100, 6);
  });
  it("100 lỗi × 800.000 đ ≈ 80 triệu đ", () => {
    expect(targetedInspection(d)).toBeCloseTo(80_000_000, 0);
    expect(approxMoney(targetedInspection(d))).toBe("~80 triệu đ");
  });
});

describe("bảo hành sớm (UC3)", () => {
  it("10.000 sp/tháng × 8 tuần × 7 / 30,4 ≈ 18.421 → ~18.500 sp", () => {
    expect(unitsLessExposed(d)).toBeCloseTo(18_421.05, 1);
    expect(approxNumber(unitsLessExposed(d))).toBe("~18.500");
  });
  it("mỗi sự cố ≈ 295 triệu → ~300 triệu đ", () => {
    expect(perIncident(d)).toBeCloseTo(294_736_842, 0);
    expect(approxMoney(perIncident(d))).toBe("~300 triệu đ");
  });
});

describe("kịch bản", () => {
  it("Thận trọng ≈ 0,375 tỷ → ~0,4 tỷ đ", () => {
    expect(conservative(d)).toBeCloseTo(374_736_842, 0);
    expect(approxScenario(conservative(d))).toBe("~0,4 tỷ đ");
  });
  it("Cơ sở ≈ 1,67–2,67 tỷ → ~1,7–2,7 tỷ đ", () => {
    const b = base(d);
    expect(b.low).toBeCloseTo(1_669_473_684, 0);
    expect(b.high).toBeCloseTo(2_669_473_684, 0);
    expect(approxScenarioRange(b.low, b.high)).toBe("~1,7–2,7 tỷ đ");
  });
  it("tách theo nguồn giá trị cộng đúng tổng", () => {
    const r = calculate(d);
    for (const s of [r.conservative, r.baseLow, r.baseHigh]) {
      expect(s.inspection + s.warranty + s.changes).toBeCloseTo(s.total, 3);
    }
    expect(r.conservative.changes).toBe(0);
    expect(r.baseLow.changes).toBe(1_000_000_000);
    expect(r.baseHigh.changes).toBe(2_000_000_000);
  });
  it("tự sắp cận khi chi phí thấp > cao", () => {
    const r = calculate({ ...d, failedChangeCostLow: 2e9, failedChangeCostHigh: 1e9 });
    expect(r.baseLow.total).toBeLessThan(r.baseHigh.total);
  });
  it("1–2 tỷ đ mỗi thay đổi", () => {
    expect(approxMoney(d.failedChangeCostLow)).toBe("~1 tỷ đ");
    expect(approxMoney(d.failedChangeCostHigh)).toBe("~2 tỷ đ");
  });
});

describe("năng suất kỹ sư (UC0)", () => {
  it("300 hồ sơ × 6 giờ × 25% = 450 giờ", () => {
    expect(engineerHours(d)).toBe(450);
  });
  it("+30% năng suất ⇔ thời gian còn 77%, giảm 23%", () => {
    const p = productivity(0.3);
    expect(p.timeRemaining).toBeCloseTo(1 / 1.3, 10);
    expect(pct(p.timeRemaining)).toBe("77%");
    expect(pct(p.timeReduction)).toBe("23%");
  });
});

describe("hòa vốn", () => {
  it("chi phí / sản lượng", () => {
    expect(breakEvenPerUnit(2e9, 100_000)).toBe(20_000);
    expect(perUnit(calculate(d).breakEven)).toBe("20.000 đ/sp");
    expect(breakEvenPerUnit(1e9, 0)).toBe(Infinity);
  });
  it("bảng 2×3 khớp v4", () => {
    const t = breakEvenTable();
    expect(t.map((r) => r.map(perUnit))).toEqual([
      ["10.000 đ/sp", "20.000 đ/sp", "30.000 đ/sp"],
      ["5.000 đ/sp", "10.000 đ/sp", "15.000 đ/sp"],
    ]);
    expect(breakEvenGrid.volumes).toEqual([100_000, 200_000]);
  });
  it("ô gần nhất với lựa chọn hiện tại", () => {
    expect(nearestGridCell(100_000, 2e9)).toEqual({ row: 0, col: 1 });
    expect(nearestGridCell(180_000, 2.8e9)).toEqual({ row: 1, col: 2 });
    expect(nearestGridCell(50_000, 0.5e9)).toEqual({ row: 0, col: 0 });
  });
});

describe("làm tròn hiển thị", () => {
  it("niceRound", () => {
    expect(niceRound(18_421)).toBe(18_500);
    expect(niceRound(294.7)).toBe(300);
    expect(niceRound(80)).toBe(80);
    expect(niceRound(7)).toBe(7);
  });
});
