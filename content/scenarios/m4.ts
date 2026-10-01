/** Buồng mô phỏng quyết định (M4). Toàn bộ là dữ liệu minh họa. */
export type M4OptionId = "A" | "B" | "C" | "ncc-moi";

export type M4Option = {
  id: M4OptionId;
  label: string;
  short: string;
  /** Tỷ lệ lỗi hiện tại, % */
  current: number | null;
  /** Đường dự báo 8 tuần: [tuần 0..8] trung vị, dải 80% thấp, cao */
  forecast: { week: number; mid: number; lo: number; hi: number }[] | null;
  confidence: "Cao" | "Trung bình" | null;
  /** "Thực tế" 4 tuần sau: [tuần 0..4] */
  actual: { week: number; value: number }[] | null;
  verdict: string;
  evidence: string[];
  abstain?: string;
};

function curve(start: number, end8: number, lo8: number, hi8: number) {
  return Array.from({ length: 9 }, (_, w) => {
    const t = w / 8;
    const ease = 1 - Math.pow(1 - t, 1.6);
    const mid = start + (end8 - start) * ease;
    const spread = t;
    return {
      week: w,
      mid: +mid.toFixed(2),
      lo: +(mid - (end8 - lo8) * spread).toFixed(2),
      hi: +(mid + (hi8 - end8) * spread).toFixed(2),
    };
  });
}

export const m4Options: M4Option[] = [
  {
    id: "A",
    label: "A. Chỉnh firmware",
    short: "Chỉnh firmware",
    current: 3.2,
    forecast: curve(3.2, 1.1, 0.7, 1.6),
    confidence: "Cao",
    actual: [
      { week: 0, value: 3.2 },
      { week: 1, value: 2.8 },
      { week: 2, value: 2.4 },
      { week: 3, value: 2.1 },
      { week: 4, value: 1.75 },
    ],
    verdict: "Dự báo đúng trong dải. Mô hình cập nhật.",
    evidence: [
      "Thay đổi firmware tương tự trên dòng bếp từ đôi, 2025 · minh họa",
      "Điều chỉnh ngưỡng bảo vệ nhiệt trên bo mạch thế hệ trước · minh họa",
      "Cập nhật firmware quạt tản nhiệt, lô 2024 · minh họa",
    ],
  },
  {
    id: "B",
    label: "B. Đổi linh kiện",
    short: "Đổi linh kiện",
    current: 3.2,
    forecast: curve(3.2, 1.7, 1.0, 2.5),
    confidence: "Trung bình",
    actual: [
      { week: 0, value: 3.2 },
      { week: 1, value: 2.9 },
      { week: 2, value: 2.5 },
      { week: 3, value: 2.1 },
      { week: 4, value: 1.9 },
    ],
    verdict: "Dự báo đúng trong dải.",
    evidence: [
      "Đổi cảm biến nhiệt sang nhà cung cấp thứ hai, 2025 · minh họa",
      "Thay tụ lọc nguồn trên bo mạch công suất · minh họa",
      "Đổi keo tản nhiệt cho IGBT · minh họa",
    ],
  },
  {
    id: "C",
    label: "C. Giữ nguyên",
    short: "Giữ nguyên",
    current: 3.2,
    forecast: curve(3.2, 3.3, 2.7, 4.0),
    confidence: "Cao",
    actual: [
      { week: 0, value: 3.2 },
      { week: 1, value: 3.3 },
      { week: 2, value: 3.2 },
      { week: 3, value: 3.4 },
      { week: 4, value: 3.4 },
    ],
    verdict: "Lỗi tiếp diễn như dự báo.",
    evidence: [
      "Diễn biến tỷ lệ lỗi của 6 tuần gần nhất · minh họa",
      "Các lô cùng nhà cung cấp linh kiện · minh họa",
      "Mùa nóng làm tăng tải nhiệt ở trạm kiểm tra · minh họa",
    ],
  },
  {
    id: "ncc-moi",
    label: "Nhà cung cấp mới",
    short: "Nhà cung cấp mới chưa từng có dữ liệu",
    current: null,
    forecast: null,
    confidence: null,
    actual: null,
    verdict: "",
    evidence: [],
    abstain: "Chưa đủ dữ liệu để dự báo đáng tin cậy.",
  },
];

/** Điểm của mô hình trước và sau bước "4 tuần sau" (minh họa) */
export const m4Score = { before: 82, after: 85, unit: "% dự báo nằm trong dải" };
