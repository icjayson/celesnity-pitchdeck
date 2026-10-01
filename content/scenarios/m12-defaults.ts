/** Đầu vào mặc định của máy tính giá trị (M12), khớp docs/content-v4.md mục #gia-tri. */
export type CalcInputs = {
  /** Sản lượng/năm của dòng (sp) */
  volumePerYear: number;
  /** Tỷ lệ lỗi lọt, phần trăm (0,5 nghĩa là 0,5%) */
  escapeRatePct: number;
  /** Chi phí mỗi lỗi lọt (đ) */
  costPerEscape: number;
  /** Phần lỗi lọt bắt thêm được (0,2 = 1/5) */
  extraCatchShare: number;
  /** Sản lượng/tháng của dòng (sp) */
  volumePerMonth: number;
  /** Số tuần phát hiện sớm */
  earlyWeeks: number;
  /** Tỷ lệ bảo hành, phần trăm */
  warrantyRatePct: number;
  /** Chi phí mỗi ca bảo hành (đ) */
  costPerClaim: number;
  /** Số sự cố bảo hành phát hiện sớm/năm: kịch bản thận trọng và cơ sở */
  incidentsConservative: number;
  incidentsBase: number;
  /** Chi phí một thay đổi kỹ thuật không hiệu quả (đ): thấp và cao */
  failedChangeCostLow: number;
  failedChangeCostHigh: number;
  /** Số thay đổi tránh được/năm: thận trọng và cơ sở */
  changesAvoidedConservative: number;
  changesAvoidedBase: number;
  /** Chi phí chương trình/năm (đ) */
  programCostPerYear: number;
  /** Năng suất: số hồ sơ/năm, giờ mỗi hồ sơ, phần giảm */
  dossiersPerYear: number;
  hoursPerDossier: number;
  timeReduction: number;
};

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
