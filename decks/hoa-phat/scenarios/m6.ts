/** Thử làm công nhân (M6). Câu mẫu và phần xếp hạng/kế hoạch là minh họa. */
import type { CaseCard } from "../../types";
export type { CaseCard };

export const m6Samples = [
  "Trạm test 3, bếp lô 2409 lại nhảy bảo vệ nhiệt lần thứ tư.",
  "Trạm kiểm tra cuối chuyền số 1 báo bếp đôi lô 2411 không lên nguồn, đã hai lần trong ca.",
  "Ở trạm 5, quạt tản nhiệt của bếp lô 2407 kêu to bất thường.",
];

/** Kết quả soạn sẵn cho 3 câu mẫu, dùng khi offline hoặc khi API lỗi */
export const m6Fallback: Record<string, CaseCard> = {
  [m6Samples[0]]: {
    tram: "Trạm test 3",
    trieu_chung: "Bảo vệ nhiệt kích hoạt lặp lại",
    lo: "2409",
    model: null,
    muc_do: "Cao",
    thong_tin_con_thieu: ["Model sản phẩm", "Phiên bản firmware", "Nhiệt độ môi trường tại trạm"],
    la_bao_loi: true,
  },
  [m6Samples[1]]: {
    tram: "Trạm kiểm tra cuối chuyền số 1",
    trieu_chung: "Bếp không lên nguồn",
    lo: "2411",
    model: "Bếp đôi",
    muc_do: "Trung bình",
    thong_tin_con_thieu: ["Phiên bản bo mạch nguồn", "Số máy cụ thể"],
    la_bao_loi: true,
  },
  [m6Samples[2]]: {
    tram: "Trạm 5",
    trieu_chung: "Quạt tản nhiệt kêu to bất thường",
    lo: "2407",
    model: null,
    muc_do: "Thấp",
    thong_tin_con_thieu: ["Model sản phẩm", "Lô quạt từ nhà cung cấp"],
    la_bao_loi: true,
  },
};

/** Danh sách lô xếp hạng rủi ro (minh họa). Lô của hồ sơ được chèn lên đầu. */
export const m6Ranking = [
  { lo: "2410", risk: 0.71, reason: "Cùng lô cảm biến nhiệt" },
  { lo: "2408", risk: 0.54, reason: "Cùng phiên bản firmware" },
  { lo: "2412", risk: 0.33, reason: "Cùng ca lắp ráp" },
  { lo: "2405", risk: 0.12, reason: "Khác nhà cung cấp linh kiện" },
];

/** Kế hoạch kiểm tra: {khóa|chữ thay thế khi trống}. {thieu} là danh sách thông tin còn thiếu, viết thường. */
export const m6PlanTemplate: string[] = [
  "Kiểm tra lại 30 sản phẩm của lô {lo|liên quan} tại {tram|trạm báo lỗi}.",
  "Kiểm tra mẫu 20 sản phẩm của lô 2410 và 10 sản phẩm của lô 2408.",
  "Ghi lại {thieu|kết quả đo} vào hồ sơ.",
  "Báo kết quả cho kỹ sư chất lượng trước 11:00.",
];
