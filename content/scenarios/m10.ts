/** Thanh kéo 12 tháng (M10). Khớp bảng 12 tháng trong docs/content-v4.md. */
export type MonthRow = {
  m: number;
  phase: "Thử nghiệm: Học" | "Dùng thật" | "Nhân rộng";
  useCase: string;
  steel: string;
  data: string;
  it: string;
  gate: string;
  /** Use case đang "dùng thật" tính đến tháng này */
  live: string[];
  share: { celesnity: number; hoaPhat: number };
  people: { celesnity: number; hoaPhatIT: number };
  itLevel: string;
};

const shareFor = (m: number) =>
  m <= 4 ? { celesnity: 90, hoaPhat: 10 } : m <= 8 ? { celesnity: 50, hoaPhat: 50 } : { celesnity: 20, hoaPhat: 80 };
const peopleFor = (m: number) =>
  m <= 4 ? { celesnity: 5.5, hoaPhatIT: 2 } : m <= 8 ? { celesnity: 4.5, hoaPhatIT: 3 } : { celesnity: 3, hoaPhatIT: 4 };

const raw: Omit<MonthRow, "share" | "people">[] = [
  { m: 1, phase: "Thử nghiệm: Học", useCase: "Ứng dụng 01 dùng thật", steel: "", data: "Môi trường tại Việt Nam · từ điển sản phẩm · nối dữ liệu", it: "Học việc", gate: "Cổng 1", live: ["UC0"], itLevel: "Học việc" },
  { m: 2, phase: "Thử nghiệm: Học", useCase: "Ứng dụng 02 thi trên lịch sử", steel: "", data: "Bộ đề thi kín", it: "Học việc", gate: "", live: ["UC0"], itLevel: "Học việc" },
  { m: 3, phase: "Thử nghiệm: Học", useCase: "Ứng dụng 03 thi trên lịch sử", steel: "", data: "Nối dữ liệu bảo hành", it: "Học việc", gate: "", live: ["UC0"], itLevel: "Học việc" },
  { m: 4, phase: "Thử nghiệm: Học", useCase: "Kết quả thi", steel: "", data: "", it: "Tự chạy 1 vòng", gate: "Cổng 2", live: ["UC0"], itLevel: "Bậc 1: tự chạy 1 vòng" },
  { m: 5, phase: "Dùng thật", useCase: "Ứng dụng 02 dùng thật", steel: "", data: "Mở cho kỹ sư dùng", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1"], itLevel: "Cùng vận hành" },
  { m: 6, phase: "Dùng thật", useCase: "Ứng dụng 03 dùng thật", steel: "", data: "", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1", "UC2"], itLevel: "Cùng vận hành" },
  { m: 7, phase: "Dùng thật", useCase: "Ứng dụng 04 bảo hành sớm", steel: "", data: "Nối dữ liệu dịch vụ", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1", "UC2", "UC3"], itLevel: "Cùng vận hành" },
  { m: 8, phase: "Dùng thật", useCase: "Ứng dụng 05 tối ưu đề xuất AI", steel: "Kết nối thử Ứng dụng 05 với tác nhân AI của Tập đoàn", data: "", it: "Tự vận hành 4 tuần", gate: "Cổng 3", live: ["UC0", "UC1", "UC2", "UC3", "UC4"], itLevel: "Bậc 1: tự vận hành 4 tuần" },
  { m: 9, phase: "Nhân rộng", useCase: "Ứng dụng 06 chẩn đoán trước · dòng thứ 2 Hòa Mạc", steel: "", data: "Dữ liệu dòng mới", it: "Tự vận hành", gate: "", live: ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"], itLevel: "Tự vận hành" },
  { m: 10, phase: "Nhân rộng", useCase: "Điện lạnh Hưng Yên/Phú Mỹ", steel: "Khảo sát và chọn use case thép", data: "Dữ liệu điện lạnh", it: "Tự vận hành", gate: "", live: ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"], itLevel: "Tự vận hành" },
  { m: 11, phase: "Nhân rộng", useCase: "Ramp-up Phú Mỹ mới", steel: "Đánh giá dữ liệu thép", data: "", it: "Tự huấn luyện lại", gate: "", live: ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"], itLevel: "Bậc 2: tự huấn luyện lại" },
  { m: 12, phase: "Nhân rộng", useCase: "Báo cáo kỹ thuật chung", steel: "Kế hoạch thử nghiệm thép năm thứ 2", data: "", it: "Bắt đầu đồng huấn luyện", gate: "Cổng 4", live: ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"], itLevel: "Bậc 3: bắt đầu đồng huấn luyện" },
];

export const m10Months: MonthRow[] = raw.map((r) => ({ ...r, share: shareFor(r.m), people: peopleFor(r.m) }));

export const m10Gates = [
  { m: 1, name: "Cổng 1" },
  { m: 4, name: "Cổng 2" },
  { m: 8, name: "Cổng 3" },
  { m: 12, name: "Cổng 4" },
];

export const m10Finale = {
  headline: "Đội ngũ IT của Hòa Phát tự vận hành; bắt đầu đồng huấn luyện",
  next: "Năm thứ 2: Hòa Phát dẫn dắt thử nghiệm thép",
};
