/** Ứng dụng của deck Nestlé Trị An (M18, M9). Khớp docs/nestle-content-v2.md mục #use-case. */
import type { Phase, UseCase } from "../types";

export const sectorLabels: Record<string, string> = {
  "dolce-gusto": "Dolce Gusto",
  "tri-an": "Toàn Trị An",
  "nestle-vn": "Nestlé Việt Nam",
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
    code: "Ứng dụng 01",
    name: "Báo cáo ca tự động",
    question: "Ca này dùng bao nhiêu nguyên liệu, ra bao nhiêu sản phẩm đạt, hao hụt ở đâu?",
    liveFrom: "T+1",
    sectors: ["dolce-gusto", "tri-an"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Mỗi ca có số liệu đã đối chiếu, làm nền cho mọi phân tích tổn thất",
      aiDoes: "Cấu trúc ghi nhận của ca thành báo cáo; gắn lệnh sản xuất, SKU, lô; đối chiếu số đếm máy",
      data: "Ghi nhận giọng nói, số đếm máy, lệnh sản xuất",
      decides: "Trưởng ca xác nhận",
      measure: "Thời gian lập báo cáo; chênh lệch với số đếm máy",
      pass: "Giảm **≥25%** thời gian; chênh lệch trong ngưỡng Sản xuất chấp nhận",
    },
  },
  {
    id: "UC1",
    code: "Ứng dụng 02",
    name: "Truy vết sự cố môi trường",
    question: "Độ ẩm hoặc nhiệt độ vượt giới hạn thì lô, mẻ và đơn hàng nào bị ảnh hưởng?",
    liveFrom: "T+5 (thi trên lịch sử từ T+2)",
    sectors: ["dolce-gusto", "tri-an", "nestle-vn"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Truy vết tới lô và mẻ ngay khi sự cố xảy ra",
      aiDoes: "Nối dữ liệu môi trường với gán lô theo thời gian và quy tắc QA; tính thời gian phơi nhiễm",
      data: "Cảm biến môi trường, gán lô theo thời gian, hồ sơ QA",
      decides: "QA quyết định về lô",
      measure: "Số lô và mẻ truy đúng so với hồ sơ QA; thời gian truy vết",
      pass: "Truy đúng **≥95%** sự cố cũ",
    },
  },
  {
    id: "UC2",
    code: "Ứng dụng 03",
    name: "Kế hoạch sản xuất và phục hồi",
    question: "Lịch nào khả thi và tốt nhất? Khi mất giờ sản xuất, phục hồi bằng cách nào?",
    liveFrom: "T+6 (thi trên lịch sử từ T+3)",
    sectors: ["dolce-gusto", "tri-an", "nestle-vn"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Kế hoạch viên dành thời gian cho đánh đổi, không cho tổng hợp số liệu; phương án phục hồi có trong vài phút",
      aiDoes: "Tạo lịch thỏa mọi ràng buộc cứng; dự báo kết quả từng lịch và từng phương án phục hồi. Mô hình ngôn ngữ chỉ giải thích, **không tự nghĩ ra lịch**",
      data: "Nhu cầu, tồn kho, công thức, công suất, bảo trì, lịch sử chuyển đổi, đơn hàng",
      decides: "Kế hoạch duyệt lịch; Trưởng phòng Sản xuất duyệt phương án phục hồi",
      measure: "Sản lượng đạt so với kế hoạch; giờ chuyển đổi; số đơn đúng hạn",
      pass: "**100%** lịch thỏa ràng buộc cứng; trên bộ đề, **không kém** kế hoạch đã dùng",
    },
  },
  {
    id: "UC3",
    code: "Ứng dụng 04",
    name: "Định lượng chiết rót",
    question: "Định lượng đang lệch về đâu, chỉnh thế nào trong giới hạn QA và khối lượng tịnh?",
    liveFrom: "T+7",
    sectors: ["dolce-gusto", "nestle-vn"],
    phase: "dung-that",
    card: {
      opportunity: "Giảm lượng cà phê dư trên mỗi viên mà vẫn đạt khối lượng tịnh",
      aiDoes: "Phát hiện lệch định lượng sớm theo lô bột, SKU và điều kiện môi trường; đề xuất điều chỉnh trong giới hạn QA",
      decides: "Sản xuất và QA",
      pass: "Gam dư trên viên giảm so với số nền, **0** vi phạm khối lượng tịnh",
    },
  },
  {
    id: "UC4",
    code: "Ứng dụng 05",
    name: "Dừng ngắn, điểm nghẽn và chuyển đổi",
    question: "Máy nào dừng, nguyên nhân thật nằm ở đâu, và thứ tự SKU nào ít giờ chuyển đổi nhất?",
    liveFrom: "T+8",
    sectors: ["dolce-gusto", "tri-an"],
    phase: "dung-that",
    card: {
      opportunity: "Tách máy dừng khỏi nguyên nhân thật; giảm giờ chuyển đổi",
      aiDoes: "Nhóm dừng ngắn theo trạng thái, máy, vật tư và cách phục hồi; học thời gian chuyển đổi thật của từng cặp SKU để đề xuất thứ tự",
      decides: "Sản xuất và Kế hoạch",
      pass: "Số phút dừng lặp lại và giờ chuyển đổi giảm so với số nền, cùng cơ cấu SKU",
    },
  },
  {
    id: "UC5",
    code: "Ứng dụng 06",
    name: "Sẵn sàng sản xuất và cửa sổ bảo trì",
    question: "Lượt chạy tiếp theo đã đủ điều kiện chưa? Bảo trì lúc nào ít ảnh hưởng nhất?",
    liveFrom: "T+9",
    sectors: ["tri-an", "nestle-vn"],
    phase: "nhan-rong",
    card: {
      opportunity: "Phát hiện thiếu sót trước khi chạy; bảo trì đúng lúc",
      aiDoes: "Kiểm công thức, lô nguyên liệu, bao bì, QA release, vệ sinh, máy trước mỗi lượt chạy; dùng cảnh báo từ hệ thống giám sát thiết bị hiện có để so sánh các cửa sổ bảo trì theo tác động lên kế hoạch",
      decides: "Trưởng ca; Bảo trì và Kế hoạch",
      pass: "Số lần trễ khởi động vì thiếu điều kiện giảm; tỷ lệ bảo trì theo kế hoạch tăng",
    },
  },
  {
    id: "toan-tri-an",
    code: "Nhân rộng",
    name: "Toàn nhà máy Trị An",
    question: "Jar Line (T+9) → các dây chuyền viên nang và túi khác (T+10) → khu chiết xuất và sấy, kế hoạch chung toàn nhà máy (T+11)",
    liveFrom: "T+9–T+11",
    sectors: ["tri-an"],
    phase: "nhan-rong",
  },
  {
    id: "nestle-vn",
    code: "Nestlé Việt Nam",
    name: "Nestlé Việt Nam",
    question: "Chọn nhà máy thứ hai (T+12) → thử nghiệm do đội Trị An dẫn dắt (năm thứ 2)",
    liveFrom: "Năm thứ 2",
    sectors: ["nestle-vn"],
    phase: "nam-2",
    note: "Hướng đề xuất",
  },
];

export const expansionMap: [string, string][] = [
  ["Chiết xuất, cô đặc", "Liên kết lô cà phê nhân với hiệu suất chiết xuất và tải khâu sau"],
  ["Sấy", "Liên kết điều kiện vận hành, độ ẩm và mật độ bột với khâu chiết rót"],
  ["Jar Line", "Dừng ngắn giữa chiết rót, hàn màng và đóng gói; liên kết kết quả kiểm tra với lô"],
  ["Viên nang", "Định lượng, chuyển đổi SKU, môi trường phòng kiểm soát"],
  ["Túi", "Chuyển đổi định dạng, hao hụt bao bì"],
  ["Kế hoạch chung", "Một lịch cho mọi dây chuyền dùng chung nguồn bột"],
];

/** "Trước" là cách làm thông thường trong ngành, KHÔNG mô tả nhà máy Trị An (quy tắc: không nói điểm yếu của khách hàng). */
export const beforeAfter: Record<string, { before: string; after: string }> = {
  UC0: {
    before:
      "Số liệu nguyên liệu, sản lượng và hao hụt được tổng hợp từ nhiều nguồn sau ca. Chênh lệch với số đếm máy thường chỉ thấy khi đối soát.",
    after: "Trưởng ca nói hoặc nhập ngắn bằng tiếng Việt. AI lập báo cáo, đối chiếu với số đếm máy và nêu rõ chênh lệch.",
  },
  UC1: {
    before:
      "Hệ thống báo vượt ngưỡng. Việc xác định lô nào có mặt, thuộc mẻ nào, quy tắc chất lượng nào áp dụng được làm bằng tay qua nhiều hệ thống.",
    after: "Ngay khi sự cố xảy ra, AI nối sự kiện với phòng, khoảng thời gian, lô, mẻ, SKU và quy tắc QA của nhà máy.",
  },
  UC2: {
    before:
      "Kế hoạch tuần được lập bằng cách ghép nhu cầu với ràng buộc sản xuất trên bảng tính. Khi có sự cố, phương án phục hồi dựa vào kinh nghiệm và được so sánh bằng tay.",
    after:
      "Bộ giải tối ưu tạo các lịch khả thi; mô hình dự báo sản lượng, số lần chuyển đổi và đơn hàng có rủi ro của từng lịch. Khi có sự cố, tác nhân AI soạn phương án phục hồi kèm dự báo.",
  },
  UC3: {
    before: "Định lượng được chỉnh theo kết quả cân kiểm tra định kỳ; xu hướng lệch thường được phát hiện sau khi đã kéo dài.",
    after: "Mô hình theo dõi xu hướng định lượng theo lô bột, SKU và điều kiện môi trường, rồi đề xuất điều chỉnh trong giới hạn đã duyệt.",
  },
  UC4: {
    before: "Dừng ngắn được ghi theo máy dừng; nguyên nhân ở máy trước hoặc sau khó thấy. Thời gian chuyển đổi lấy theo định mức.",
    after: "Mô hình nhóm dừng ngắn theo trạng thái, máy, vật tư và cách phục hồi; học thời gian chuyển đổi thật của từng cặp SKU để đề xuất thứ tự.",
  },
  UC5: {
    before: "Điều kiện trước khi chạy được kiểm theo danh sách; lịch bảo trì và lịch sản xuất được ghép tay.",
    after:
      "Hệ thống kiểm công thức, lô nguyên liệu, bao bì, QA release, vệ sinh, máy trước mỗi lượt chạy; dùng cảnh báo từ hệ thống giám sát thiết bị hiện có để đề xuất cửa sổ bảo trì theo sản lượng và đơn hàng.",
  },
};
