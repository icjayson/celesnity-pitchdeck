/** Bộ khám phá use case (M9). Khớp docs/content-v4.md mục #use-case. */
export type Sector = "gia-dung" | "dien-lanh" | "thep" | "tap-doan";
export type Phase = "pilot" | "dung-that" | "nhan-rong" | "nam-2";

export type UseCase = {
  id: string;
  code: string;
  name: string;
  question: string;
  liveFrom: string;
  sectors: Sector[];
  phase: Phase;
  primary?: boolean;
  card?: {
    opportunity: string;
    aiDoes: string;
    data?: string;
    decides: string;
    measure?: string;
    pass: string;
  };
  note?: string;
};

export const sectorLabels: Record<Sector, string> = {
  "gia-dung": "Gia dụng",
  "dien-lanh": "Điện lạnh",
  thep: "Thép",
  "tap-doan": "Toàn Tập đoàn",
};

export const phaseLabels: Record<Phase, string> = {
  pilot: "Thử nghiệm",
  "dung-that": "Triển khai",
  "nhan-rong": "Nhân rộng",
  "nam-2": "Năm thứ 2",
};

export const useCases: UseCase[] = [
  {
    id: "UC0",
    code: "Ứng dụng 0",
    name: "Lập hồ sơ khách hàng tự động",
    question: "Lỗi này đã có đủ bằng chứng chưa? Ai cần xử lý?",
    liveFrom: "T+1",
    sectors: ["gia-dung"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Rút ngắn thời gian kỹ sư tập hợp bằng chứng từ nhiều hệ thống",
      aiDoes: "Từ lời báo bằng giọng nói, AI tạo hồ sơ, gắn model, phiên bản bo mạch, lô linh kiện, kết quả đo",
      data: "Ghi nhận giọng nói, BOM, kết quả kiểm tra",
      decides: "Kỹ sư chất lượng",
      measure: "Giờ công cho mỗi hồ sơ",
      pass: "Giảm **≥25%** thời gian",
    },
  },
  {
    id: "UC1",
    code: "Ứng dụng 1",
    name: "Dự báo lô hàng rủi ro cao",
    question: "Lô hoặc trạm nào cần kiểm tra ngay?",
    liveFrom: "T+5 (thi trên lịch sử từ T+2)",
    sectors: ["gia-dung", "dien-lanh"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Dồn nguồn lực kiểm tra vào đúng nơi có nguy cơ cao",
      aiDoes: "Xếp hạng lô và trạm theo nguy cơ không đạt kiểm tra hoặc bảo hành",
      data: "Lô linh kiện, phiên bản, kết quả đo, sửa lại",
      decides: "Chất lượng quyết định kiểm tra gì",
      measure: "Số lỗi thật bắt được với cùng nguồn lực kiểm tra",
      pass: "Bắt thêm **≥20%** lỗi thật",
    },
  },
  {
    id: "UC2",
    code: "Ứng dụng 2",
    name: "So sánh các phương án trước khi thực hiện",
    question: "Chỉnh firmware hay đổi linh kiện, cách nào hiệu quả hơn?",
    liveFrom: "T+6 (thi trên lịch sử từ T+3)",
    sectors: ["gia-dung", "dien-lanh"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Dự báo trước phương án nào hiệu quả, trước khi đầu tư khuôn, thẩm định, chứng nhận",
      aiDoes: "Dự báo tác động của từng phương án lên lỗi và bảo hành, kèm các thay đổi lịch sử làm dẫn chứng",
      data: "Lịch sử thay đổi kỹ thuật và kết quả sau đó",
      decides: "R&D và Chất lượng duyệt qua quy trình phát hành hiện có",
      measure: "Số thay đổi phải làm lại; thời gian ra quyết định",
      pass: "Chọn đúng phương án tốt hơn **≥70%**",
    },
  },
  {
    id: "UC3",
    code: "Ứng dụng 3",
    name: "Cảnh báo sớm bảo hành",
    question: "Nhóm sản xuất nào sắp phát sinh bảo hành?",
    liveFrom: "T+7",
    sectors: ["gia-dung", "dien-lanh"],
    phase: "dung-that",
    card: {
      opportunity: "Phát hiện xu hướng sớm hơn, nên ít sản phẩm bị ảnh hưởng hơn",
      aiDoes: "Dự báo đường bảo hành của từng nhóm sản xuất, vài tháng trước khi yêu cầu bảo hành xuất hiện",
      decides: "Chất lượng và ngành hàng",
      pass: "Sai số dự báo ở 3 tháng trong ngưỡng; phát hiện sớm **≥4 tuần**",
    },
  },
  {
    id: "UC4",
    code: "Ứng dụng 4",
    name: "Tối ưu đề xuất của tác nhân AI",
    question:
      "Đề xuất của tác nhân AI (của Minder, hoặc của Tập đoàn như tại Dung Quất) đã đủ an toàn để đến người duyệt chưa?",
    liveFrom: "T+8",
    sectors: ["gia-dung", "thep", "tap-doan"],
    phase: "dung-that",
    card: {
      opportunity: "Người duyệt chỉ nhận đề xuất đã được kiểm tra, nên năng suất tăng mà chuẩn duyệt không giảm",
      aiDoes: "Kiểm tra trước tính khả thi và hệ quả của đề xuất từ tác nhân AI. **Đây là cầu nối sang thép**",
      decides: "Người duyệt vẫn duyệt mọi việc",
      pass: "**≥50%** đề xuất có lỗi bị chặn trước khi đến người duyệt",
    },
  },
  {
    id: "UC5",
    code: "Ứng dụng 5",
    name: "Chẩn đoán trước yêu cầu khách hàng",
    question: "Kỹ thuật viên nên chuẩn bị lỗi và linh kiện nào trước khi đến nhà khách?",
    liveFrom: "T+9",
    sectors: ["gia-dung", "dien-lanh"],
    phase: "nhan-rong",
    card: {
      opportunity: "Sửa đúng ngay lần đầu",
      aiDoes: "Dự báo lỗi và cách sửa có khả năng nhất cho từng ca dịch vụ",
      decides: "Chuyên gia kỹ thuật",
      pass: "Top 3 dự báo chứa lỗi đúng **≥** mức phân loại hiện tại",
    },
  },
  {
    id: "nhan-rong",
    code: "Nhân rộng",
    name: "Nhân rộng",
    question:
      "Dòng thứ 2 tại Hòa Mạc (T+9) → điện lạnh Hưng Yên/Phú Mỹ (T+10) → ramp-up Phú Mỹ mới (T+11, nếu tiến độ dự án cho phép)",
    liveFrom: "T+9–T+11",
    sectors: ["gia-dung", "dien-lanh"],
    phase: "nhan-rong",
  },
  {
    id: "thep",
    code: "Thép",
    name: "Thép và ống thép",
    question: "Chọn use case thép đầu tiên (T+10–T+12) → thử nghiệm thép do đội Hòa Phát dẫn dắt (năm thứ 2)",
    liveFrom: "Năm thứ 2",
    sectors: ["thep"],
    phase: "nam-2",
    note: "Hướng đề xuất",
  },
];

export const expansionMap: [string, string][] = [
  ["Bo mạch, nạp firmware", "Liên kết lỗi với phiên bản mạch và lô linh kiện; phát hiện lệch giữa model, bo mạch và firmware"],
  ["Lắp ráp, kiểm tra cuối chuyền", "Nhóm các dạng lỗi lặp; phát hiện thiết bị thử bị lệch"],
  ["Ép nhựa, kim loại, sơn", "Liên kết khuôn, lô vật liệu, thông số với lỗi"],
  ["Máy lọc nước, quạt, hút mùi", "Rò rỉ, lưu lượng, tiếng ồn theo phiên bản; nhắc bảo dưỡng lõi lọc"],
  ["Tủ lạnh, tủ đông", "Thử kín, cách nhiệt, làm lạnh; bằng chứng cho bảo hành 36 tháng"],
  ["Điều hòa Funiki PowerAI, các dòng mua ngoài", "Chẩn đoán từ thiết bị kết nối; chất lượng nhà cung cấp"],
  ["R&D chi phí", "Dùng chung linh kiện, thiết kế dễ lắp, cân nhắc tự làm hay mua ngoài"],
];
