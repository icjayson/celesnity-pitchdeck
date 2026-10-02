/** Nhân sự theo giai đoạn (M16). Khớp bảng "Nhân sự theo giai đoạn" trong content.vi.ts. */
export const staffingPhases = [
  { name: "Thử nghiệm", months: "T+1–T+4" },
  { name: "Triển khai", months: "T+5–T+8" },
  { name: "Nhân rộng", months: "T+9–T+12" },
];

export type StaffCell = {
  /** số người (null khi tính bằng giờ) */
  count: number | null;
  approx?: boolean;
  /** nhãn vai trò; "+" ở đầu = vai trò mới thêm */
  roles: string[];
};

export type StaffRow = {
  team: string;
  tone: "blue" | "orange";
  note?: string;
  cells: StaffCell[];
};

export const staffingRows: StaffRow[] = [
  {
    team: "Celesnity",
    tone: "blue",
    cells: [
      {
        count: 5.5,
        approx: true,
        roles: ["Quản lý triển khai 1", "FDE tại Hòa Mạc 2", "Kỹ sư AI 1", "Kỹ sư dữ liệu 1", "Trưởng nhóm nghiên cứu ½"],
      },
      { count: 4.5, approx: true, roles: ["Quản lý 1", "FDE 1,5", "Kỹ sư AI 1", "Kỹ sư dữ liệu ½", "Nghiên cứu ½"] },
      { count: 3, approx: true, roles: ["Quản lý ½", "FDE 1", "Kỹ sư AI 1", "Nghiên cứu ½"] },
    ],
  },
  {
    team: "IT Hòa Phát",
    note: "Đội vận hành mô hình",
    tone: "orange",
    cells: [
      { count: 2, roles: ["Kỹ sư dữ liệu", "Kỹ sư hạ tầng"] },
      { count: 3, roles: ["+ Kỹ sư AI"] },
      { count: 4, roles: ["+ Kỹ sư vận hành mô hình"] },
    ],
  },
  {
    team: "Chuyên gia nghiệp vụ Hòa Phát",
    tone: "orange",
    cells: [
      { count: null, roles: ["R&D, Chất lượng ~4 giờ/tuần mỗi người", "Đầu mối dữ liệu ~2 giờ/tuần"] },
      { count: null, roles: ["Như cũ", "+ Dịch vụ ~2 giờ/tuần"] },
      { count: null, roles: ["Như cũ", "+ Chuyên gia thép cho khảo sát"] },
    ],
  },
];

export const staffingLeaders = {
  team: "Lãnh đạo Hòa Phát",
  text: "Lãnh đạo phụ trách: họp tháng · Bảo trợ ngành hàng và Tài chính: tại mỗi cổng",
};
