/** Use case của deck Isuzu Việt Nam (M18, M9). Khớp docs/isuzu-content-v1.md mục #use-case. */
import type { Phase, UseCase } from "../types";

export const sectorLabels: Record<string, string> = {
  body: "Chất lượng tại BODY",
  "go-vap": "Toàn nhà máy Gò Vấp",
  "ngoai-cong": "Ngoài cổng nhà máy",
};

export const phaseLabels: Record<Phase, string> = {
  pilot: "Pilot",
  "dung-that": "Dùng thật",
  "nhan-rong": "Nhân rộng",
  "nam-2": "Năm 2",
};

export const useCases: UseCase[] = [
  {
    id: "UC0",
    code: "UC0",
    name: "Hồ sơ lỗi tự động",
    question: "Lỗi này đã đủ bối cảnh chưa? Ai cần xử lý?",
    liveFrom: "T1",
    sectors: ["body", "go-vap"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Kỹ sư dành thời gian cho nguyên nhân, không cho việc gom thông tin",
      aiDoes: "Từ lời báo lỗi, tạo hồ sơ gắn VIN, model, trạm, linh kiện, lô, đồ gá, ca",
      data: "Báo lỗi, BOM theo VIN, kế hoạch sản xuất, hồ sơ lô",
      decides: "QA",
      measure: "Thời gian lập hồ sơ; số trường đầy đủ",
      pass: "Giảm **≥25%** thời gian; **≥95%** hồ sơ đủ trường bắt buộc",
    },
  },
  {
    id: "UC1",
    code: "UC1",
    name: "Tác nhân Chất lượng",
    question: "Lỗi này đã từng xảy ra chưa? Lần trước khắc phục thế nào?",
    liveFrom: "T5 (thi trên lịch sử từ T2)",
    sectors: ["body", "go-vap", "ngoai-cong"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Rút ngắn thời gian tìm nguyên nhân; dùng lại những hành động khắc phục đã hiệu quả",
      aiDoes: "Tìm ca tương tự, chỉ ra điểm chung, đưa nguyên nhân và khắc phục lần trước, kèm mức độ chắc chắn",
      data: "Lịch sử lỗi, nguyên nhân gốc, hành động khắc phục, tiêu chuẩn thao tác",
      decides: "QA kết luận nguyên nhân và khắc phục",
      measure: "Thời gian từ phát hiện đến xác định nguyên nhân",
      pass: "**≥80%** lỗi trong bộ đề có ca tương tự đúng nằm trong 5 kết quả đầu; thời gian giảm **≥30%**",
    },
  },
  {
    id: "UC2",
    code: "UC2",
    name: "Tác nhân Truy xuất: lý lịch số hai chiều",
    question: "Xe này lắp những gì? Lô này nằm trên những xe nào, xe đang ở đâu?",
    liveFrom: "T6 (thi trên lịch sử từ T3)",
    sectors: ["body", "go-vap", "ngoai-cong"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Khoanh vùng nhanh và đúng khi có một lô nghi vấn",
      aiDoes: "VIN → linh kiện, serial, lô, nhà cung cấp. Lô → VIN → ngày sản xuất → QC → vị trí xe",
      data: "BOM theo VIN, hồ sơ nhận hàng, lô CKD và nội địa, giao xe, đại lý",
      decides: "QA quyết định phạm vi; Kinh doanh và Hậu mãi phối hợp với đại lý",
      measure: "Thời gian lập danh sách xe bị ảnh hưởng; độ khớp",
      pass: "Khớp **100%** với hồ sơ đối chiếu do QA chọn; **≤15 phút** cho một lô",
    },
  },
  {
    id: "UC3",
    code: "UC3",
    name: "Cảnh báo sớm lỗi lặp",
    question: "Trạm, đồ gá hay lô nào đang có dấu hiệu của một lỗi cũ?",
    liveFrom: "T7",
    sectors: ["body", "go-vap"],
    phase: "dung-that",
    card: {
      opportunity: "Chặn lỗi trước lần lặp tiếp theo",
      aiDoes: "Theo dõi trạm, đồ gá, lô, ca; báo khi một mẫu lỗi cũ bắt đầu xuất hiện lại",
      decides: "QA",
      pass: "Trên lịch sử, **≥30%** lỗi lặp được cảnh báo trước lần lặp kế tiếp; cảnh báo sai trong ngưỡng QA đặt",
    },
  },
  {
    id: "UC4",
    code: "UC4",
    name: "Bảo trì dự báo thiết bị và đồ gá",
    question: "Thiết bị nào nên được kiểm tra trước khi ảnh hưởng đến chuyền?",
    liveFrom: "T8",
    sectors: ["go-vap"],
    phase: "dung-that",
    card: {
      opportunity: "Ít dừng chuyền ngoài kế hoạch hơn",
      aiDoes: "Dùng thời gian vận hành, lịch sử bảo trì và lỗi liên quan để dự báo rủi ro hỏng",
      decides: "Bảo trì",
      pass: "**≥50%** sự cố dừng ngoài kế hoạch trong bộ đề được cảnh báo trước **≥24 giờ**",
    },
  },
  {
    id: "UC5",
    code: "UC5",
    name: "Vật tư CKD và chất lượng nhà cung cấp",
    question: "Linh kiện nào sắp thiếu so với kế hoạch? Nhà cung cấp nào cần theo dõi?",
    liveFrom: "T9",
    sectors: ["go-vap"],
    phase: "nhan-rong",
    card: {
      opportunity: "Đúng linh kiện, đúng số lượng, đúng lúc; nhà cung cấp được chấm theo lô",
      aiDoes: "So tồn kho với kế hoạch lắp ráp; theo dõi chất lượng và giao hàng của từng nhà cung cấp",
      decides: "Mua hàng, Kho, QA",
      pass: "**≥80%** thiếu hụt trong bộ đề được cảnh báo trước **≥3 ngày**",
    },
  },
  {
    id: "nhan-rong-nha-may",
    code: "Nhân rộng",
    name: "Nhân rộng trong nhà máy",
    question: "PAINT, TRIM, CHASSIS, QC (T9–T11) → N-Series và F-Series (T10–T12)",
    liveFrom: "T9–T12",
    sectors: ["go-vap"],
    phase: "nhan-rong",
  },
  {
    id: "ngoai-cong",
    code: "Ngoài cổng",
    name: "Ngoài cổng nhà máy",
    question: "Khảo sát kết nối đại lý và hậu mãi (T10–T12) → pilot hậu mãi do đội Isuzu dẫn dắt (năm 2)",
    liveFrom: "Năm 2",
    sectors: ["ngoai-cong"],
    phase: "nam-2",
    note: "Hướng đề xuất",
  },
];

export const expansionMap: [string, string][] = [
  ["BODY", "Nối lỗi lắp ráp cabin với đồ gá, trạm, lô linh kiện, ca"],
  ["PAINT", "Nối lỗi bề mặt với lô sơn, điều kiện buồng sơn, thông số quy trình"],
  ["INTERIOR / TRIM", "Nối lỗi lắp nội thất với linh kiện và nhà cung cấp"],
  ["CHASSIS", "Truy xuất động cơ, cầu, phanh theo serial và lô"],
  ["INSPECTION / QC", "Nhóm các dạng lỗi lặp; phát hiện thiết bị kiểm tra bị lệch"],
  ["Kho và CKD", "So tồn kho với kế hoạch lắp ráp; cảnh báo thiếu trước"],
  ["Nhà cung cấp", "Chấm chất lượng và giao hàng theo lô"],
  ["Đại lý và hậu mãi", "Lý lịch số khi xe vào dịch vụ; khoanh vùng xe cần kiểm tra"],
];

/**
 * "Trước" là cách làm phổ biến trong ngành lắp ráp ô tô, KHÔNG mô tả nhà máy Gò Vấp
 * (quy tắc: không nói điểm yếu của khách hàng; không nhắc cách Isuzu đang truy xuất).
 */
export const beforeAfter: Record<string, { before: string; after: string }> = {
  UC0: {
    before: "Trong ngành, hồ sơ lỗi thường được lập sau khi kỹ sư gom thông tin từ trạm, kế hoạch sản xuất và hồ sơ lô.",
    after: "Công nhân nói một câu bằng tiếng Việt. AI lập hồ sơ gắn sẵn VIN, model, trạm, linh kiện, lô, đồ gá, ca và nêu rõ thông tin còn thiếu.",
  },
  UC1: {
    before: "Câu hỏi \"lỗi này đã từng xảy ra chưa?\" thường được trả lời bằng trí nhớ của người có kinh nghiệm và việc tra lại hồ sơ cũ.",
    after: "Tác nhân Chất lượng tìm ngay các ca tương tự, chỉ ra điểm chung, nguyên nhân và hành động khắc phục lần trước, kèm mức độ chắc chắn.",
  },
  UC2: {
    before: "Khi có một lô nghi vấn, việc lập danh sách xe bị ảnh hưởng thường phải đối chiếu nhiều nguồn dữ liệu.",
    after: "Tác nhân Truy xuất lập ngay danh sách mọi VIN đã lắp lô đó, kèm ngày sản xuất, kết quả QC và vị trí hiện tại của từng xe.",
  },
  UC3: {
    before: "Lỗi lặp thường được nhận ra khi đã xuất hiện lại vài lần.",
    after: "Mô hình theo dõi trạm, đồ gá, lô và ca; báo ngay khi dấu hiệu của một lỗi cũ bắt đầu xuất hiện lại.",
  },
  UC4: {
    before: "Bảo trì thường theo lịch định kỳ hoặc sau khi thiết bị đã có biểu hiện bất thường.",
    after: "Mô hình dùng thời gian vận hành, lịch sử bảo trì và lỗi liên quan để chỉ ra thiết bị và đồ gá nên được kiểm tra trước.",
  },
  UC5: {
    before: "Tồn kho linh kiện và kế hoạch lắp ráp thường được đối chiếu theo kỳ; chất lượng nhà cung cấp được tổng hợp theo tháng.",
    after: "Hệ thống so tồn kho với kế hoạch lắp ráp mỗi ngày, cảnh báo thiếu trước, và chấm chất lượng, giao hàng của nhà cung cấp theo từng lô.",
  },
};
