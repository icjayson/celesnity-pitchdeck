/**
 * Tổng quan lộ trình theo giai đoạn (M15). Tổng hợp từ bảng 12 tháng, nhân sự, thang năng lực
 * và tiêu chí các cổng trong content.vi.ts — không thêm số mới.
 */
import type { RoadmapPhase } from "../../types";
export type { RoadmapPhase };

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "thu-nghiem",
    n: "01",
    name: "Thử nghiệm",
    months: "T+1–T+4",
    span: 4,
    goal: "Chứng minh trên dữ liệu của chính Hòa Phát, với bộ đề thi kín do Hòa Phát giữ",
    apps: [
      { name: "Lập hồ sơ khách hàng tự động", when: "Triển khai từ T+1" },
      { name: "Dự báo lô hàng rủi ro cao", when: "Thi trên lịch sử từ T+2" },
      { name: "So sánh các phương án trước khi thực hiện", when: "Thi trên lịch sử từ T+3" },
    ],
    gates: [
      { name: "Cổng 1", when: "T+1", pass: "Dữ liệu đủ để làm; thỏa thuận dữ liệu đã ký" },
      { name: "Cổng 2", when: "T+4", pass: "Bắt thêm ≥20% lỗi thật; chọn đúng phương án ≥70%" },
    ],
    ops: { celesnity: 90, partner: 10 },
    opsNote: "IT Hòa Phát học việc, tự chạy 1 vòng dữ liệu ở T+4",
    team: { celesnity: "~5,5 người", partnerTeam: "2 người" },
    people: { celesnity: 5.5, partnerTeam: 2 },
    outcomes: ["Mô hình v0.1", "Kết quả thi trên lịch sử", "Bằng chứng chuyển giao"],
  },
  {
    id: "trien-khai",
    n: "02",
    name: "Triển khai",
    months: "T+5–T+8",
    span: 4,
    goal: "Kỹ sư dùng dự báo cho quyết định thật, mở rộng ra bảo hành và tác nhân AI của Tập đoàn",
    apps: [
      { name: "Dự báo lô hàng rủi ro cao", when: "Triển khai từ T+5" },
      { name: "So sánh các phương án trước khi thực hiện", when: "Triển khai từ T+6" },
      { name: "Cảnh báo sớm bảo hành", when: "Triển khai từ T+7" },
      { name: "Tối ưu đề xuất của tác nhân AI", when: "Triển khai từ T+8" },
    ],
    gates: [{ name: "Cổng 3", when: "T+8", pass: "≥20 ca thật dùng dự báo; IT tự vận hành 4 tuần" }],
    ops: { celesnity: 50, partner: 50 },
    opsNote: "Hai bên cùng vận hành; T+8 kết nối thử với tác nhân AI của Tập đoàn",
    team: { celesnity: "~4,5 người", partnerTeam: "3 người" },
    people: { celesnity: 4.5, partnerTeam: 3 },
    outcomes: ["Dự báo dùng trên ca thật", "IT Hòa Phát tự vận hành 4 tuần", "Mở cửa khảo sát thép"],
  },
  {
    id: "nhan-rong",
    n: "03",
    name: "Nhân rộng",
    months: "T+9–T+12",
    span: 4,
    goal: "Nhân rộng sang dòng sản phẩm mới và điện lạnh; đội ngũ IT của Hòa Phát tự chủ",
    apps: [
      { name: "Chẩn đoán trước yêu cầu khách hàng", when: "Triển khai từ T+9" },
      { name: "Dòng thứ 2 tại Hòa Mạc", when: "T+9" },
      { name: "Điện lạnh Hưng Yên/Phú Mỹ", when: "T+10" },
      { name: "Ramp-up Phú Mỹ mới", when: "T+11, nếu tiến độ dự án cho phép" },
    ],
    gates: [{ name: "Cổng 4", when: "T+12", pass: "Tài chính xác nhận giá trị ≥ ngưỡng hòa vốn; IT tự huấn luyện lại" }],
    ops: { celesnity: 20, partner: 80 },
    opsNote: "IT Hòa Phát tự vận hành, tự huấn luyện lại ở T+11, bắt đầu đồng huấn luyện ở T+12",
    team: { celesnity: "~3 người", partnerTeam: "4 người" },
    people: { celesnity: 3, partnerTeam: 4 },
    outcomes: ["Báo cáo kỹ thuật chung", "Chọn use case thép đầu tiên", "Kế hoạch thử nghiệm thép năm thứ 2"],
  },
  {
    id: "nam-2",
    n: "04",
    name: "Năm thứ 2 · Thép",
    months: "Năm thứ 2",
    span: 3,
    goal: "Thử nghiệm thép do đội ngũ IT của Hòa Phát dẫn dắt; Hòa Phát cùng huấn luyện mô hình nền",
    apps: [
      { name: "Dây chuyền sản xuất thép", when: "Hướng đề xuất, xác định cùng Hòa Phát" },
      { name: "Tối ưu đề xuất của tác nhân AI tại Dung Quất", when: "Nếu Tập đoàn đồng ý" },
    ],
    gates: [],
    ops: null,
    opsNote: "Hòa Phát dẫn dắt · Celesnity hỗ trợ",
    team: { celesnity: "Hỗ trợ", partnerTeam: "Dẫn dắt" },
    outcomes: ["Thử nghiệm thép", "Đồng huấn luyện mô hình nền", "Đồng tác giả báo cáo kỹ thuật"],
    lead: true,
  },
];

/** Các mốc năng lực của đội ngũ IT của Hòa Phát (khớp bảng 12 tháng). `m` = tháng; 13 = năm thứ 2. */
export const itSteps: { label: string; when: string; m: number }[] = [
  { label: "Học việc", when: "T+1", m: 1 },
  { label: "Tự chạy 1 vòng", when: "T+4", m: 4 },
  { label: "Cùng vận hành", when: "T+5", m: 5 },
  { label: "Tự vận hành 4 tuần", when: "T+8", m: 8 },
  { label: "Tự vận hành", when: "T+9", m: 9 },
  { label: "Tự huấn luyện lại", when: "T+11", m: 11 },
  { label: "Bắt đầu đồng huấn luyện", when: "T+12", m: 12 },
  { label: "Dẫn dắt mở rộng sang thép", when: "Năm thứ 2", m: 13 },
];

/** Tháng cuối của mỗi giai đoạn, để biết đội ngũ IT đã đạt tới mốc nào */
export const phaseEndMonth: Record<string, number> = {
  "thu-nghiem": 4,
  "trien-khai": 8,
  "nhan-rong": 12,
  "nam-2": 13,
};
