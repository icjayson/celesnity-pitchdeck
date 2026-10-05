/** Ứng dụng của deck Nestlé Trị An (M18, M9). Khớp docs/nestle-content-v3.md mục #use-case. */
import type { Phase, UseCase } from "../types";

export const sectorLabels: Record<string, string> = {
  "dolce-gusto": "Dolce Gusto",
  "tri-an": "Toàn nhà máy Trị An",
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
      aiDoes: "Chuyển ghi nhận của ca thành báo cáo có cấu trúc; gắn lệnh sản xuất, SKU, lô; đối chiếu số đếm máy",
      data: "Ghi nhận giọng nói, số đếm máy, lệnh sản xuất",
      decides: "Trưởng ca xác nhận",
      measure: "Thời gian lập báo cáo; chênh lệch với số đếm máy",
      pass: "Giảm **≥25%** thời gian; chênh lệch nằm trong ngưỡng bộ phận Sản xuất chấp nhận",
    },
  },
  {
    id: "UC1",
    code: "Ứng dụng 02",
    name: "Truy vết sự cố môi trường",
    question: "Độ ẩm hoặc nhiệt độ vượt giới hạn thì lô, mẻ và đơn hàng nào bị ảnh hưởng?",
    liveFrom: "T+5 (thi trên dữ liệu lịch sử từ T+2)",
    sectors: ["dolce-gusto", "tri-an", "nestle-vn"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Truy vết tới lô và mẻ ngay khi sự cố xảy ra",
      aiDoes: "Nối dữ liệu môi trường với thông tin lô theo thời gian và quy tắc QA; tính thời gian lô bị ảnh hưởng",
      data: "Cảm biến môi trường, thông tin lô theo thời gian, hồ sơ QA",
      decides: "QA quyết định về lô",
      measure: "Số lô và mẻ truy vết đúng so với hồ sơ QA; thời gian truy vết",
      pass: "Truy vết đúng **≥95%** sự cố đã xảy ra trước đây",
    },
  },
  {
    id: "UC2",
    code: "Ứng dụng 03",
    name: "Kế hoạch sản xuất và phục hồi",
    question: "Lịch nào khả thi và tốt nhất? Khi mất giờ sản xuất, phục hồi bằng cách nào?",
    liveFrom: "T+6 (thi trên dữ liệu lịch sử từ T+3)",
    sectors: ["dolce-gusto", "tri-an", "nestle-vn"],
    phase: "pilot",
    primary: true,
    card: {
      opportunity: "Kế hoạch viên dành thời gian cho việc cân nhắc đánh đổi thay vì tổng hợp số liệu; phương án phục hồi có trong vài phút",
      aiDoes: "Tạo lịch đáp ứng mọi ràng buộc bắt buộc; dự báo kết quả từng lịch và từng phương án phục hồi. Mô hình ngôn ngữ chỉ giải thích, **không tự nghĩ ra lịch**",
      data: "Nhu cầu, tồn kho, công thức, công suất, bảo trì, lịch sử chuyển đổi, đơn hàng",
      decides: "Bộ phận Kế hoạch duyệt lịch; Trưởng phòng Sản xuất duyệt phương án phục hồi",
      measure: "Sản lượng đạt so với kế hoạch; giờ chuyển đổi; số đơn đúng hạn",
      pass: "**100%** lịch đề xuất đáp ứng các ràng buộc bắt buộc; trên bộ đề thi kín, kết quả **không kém** kế hoạch đã áp dụng",
    },
  },
  {
    id: "UC3",
    code: "Ứng dụng 04",
    name: "Định lượng chiết rót",
    question: "Định lượng đang lệch về đâu, điều chỉnh thế nào trong giới hạn QA và khối lượng tịnh?",
    liveFrom: "T+7",
    sectors: ["dolce-gusto", "nestle-vn"],
    phase: "dung-that",
    card: {
      opportunity: "Giảm lượng cà phê dư trên mỗi viên mà vẫn đạt khối lượng tịnh",
      aiDoes: "Phát hiện sớm sai lệch định lượng theo lô bột, SKU và điều kiện môi trường; đề xuất điều chỉnh trong giới hạn QA",
      decides: "Bộ phận Sản xuất và QA",
      pass: "Lượng gam dư trên mỗi viên giảm so với số liệu nền; **0** vi phạm khối lượng tịnh",
    },
  },
  {
    id: "UC4",
    code: "Ứng dụng 05",
    name: "Dừng máy, điểm nghẽn và chuyển đổi",
    question: "Máy nào dừng, nguyên nhân thật nằm ở đâu, và thứ tự SKU nào ít giờ chuyển đổi nhất?",
    liveFrom: "T+8",
    sectors: ["dolce-gusto", "tri-an"],
    phase: "dung-that",
    card: {
      opportunity: "Tách máy bị dừng khỏi nguyên nhân thật; giảm giờ chuyển đổi",
      aiDoes: "Nhóm các lần dừng ngắn theo trạng thái, máy, vật tư và cách phục hồi; học thời gian chuyển đổi thực tế của từng cặp SKU để đề xuất thứ tự",
      decides: "Bộ phận Sản xuất và Kế hoạch",
      pass: "Số phút dừng lặp lại và giờ chuyển đổi giảm so với số liệu nền, với cùng cơ cấu SKU",
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
      opportunity: "Phát hiện thiếu sót trước khi chạy; bảo trì đúng thời điểm",
      aiDoes: "Trước mỗi lượt chạy, kiểm tra công thức, lô nguyên liệu, bao bì, trạng thái QA release, vệ sinh và máy móc; dùng cảnh báo từ hệ thống giám sát thiết bị hiện có để so sánh các cửa sổ bảo trì theo tác động lên kế hoạch",
      decides: "Trưởng ca; bộ phận Bảo trì và Kế hoạch",
      pass: "Số lần khởi động trễ vì thiếu điều kiện giảm; tỷ lệ bảo trì theo kế hoạch tăng",
    },
  },
  {
    id: "toan-tri-an",
    code: "Nhân rộng",
    name: "Toàn nhà máy Trị An",
    question: "Jar Line (T+9) → các dây chuyền viên nén và túi khác (T+10) → khu chiết xuất và sấy, kế hoạch chung toàn nhà máy (T+11)",
    liveFrom: "T+9–T+11",
    sectors: ["tri-an"],
    phase: "nhan-rong",
  },
  {
    id: "nestle-vn",
    code: "Nestlé Việt Nam",
    name: "Nestlé Việt Nam",
    question: "Chọn nhà máy Nestlé thứ hai (T+12) → thử nghiệm do Đội ngũ IT của nhà máy Trị An dẫn dắt (năm thứ 2)",
    liveFrom: "Năm thứ 2",
    sectors: ["nestle-vn"],
    phase: "nam-2",
    note: "Hướng đề xuất",
  },
];

export const expansionMap: [string, string][] = [
  ["Chiết xuất, cô đặc", "Liên kết lô cà phê nhân với hiệu suất chiết xuất và tải của khâu sau"],
  ["Sấy", "Liên kết điều kiện vận hành, độ ẩm và mật độ bột với khâu chiết rót"],
  ["Jar Line", "Dừng ngắn giữa chiết rót, hàn màng và đóng gói; liên kết kết quả kiểm tra với lô"],
  ["Viên nén", "Định lượng, chuyển đổi SKU, môi trường phòng kiểm soát"],
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
      "Hệ thống báo vượt ngưỡng. Việc xác định lô nào có mặt, thuộc mẻ nào, quy tắc chất lượng nào áp dụng được làm thủ công qua nhiều hệ thống.",
    after: "Ngay khi sự cố xảy ra, AI nối sự kiện với phòng, khoảng thời gian, lô, mẻ, SKU và quy tắc QA của nhà máy.",
  },
  UC2: {
    before:
      "Kế hoạch tuần được lập bằng cách ghép nhu cầu với ràng buộc sản xuất trên bảng tính. Khi có sự cố, phương án phục hồi dựa vào kinh nghiệm và được so sánh thủ công.",
    after:
      "Bộ giải tối ưu tạo các lịch khả thi; mô hình dự báo sản lượng, số lần chuyển đổi và đơn hàng có rủi ro của từng lịch. Khi có sự cố, tác nhân AI soạn phương án phục hồi kèm dự báo.",
  },
  UC3: {
    before: "Định lượng được điều chỉnh theo kết quả cân kiểm tra định kỳ; xu hướng lệch thường chỉ được phát hiện khi đã kéo dài.",
    after: "Mô hình theo dõi xu hướng định lượng theo lô bột, SKU và điều kiện môi trường, rồi đề xuất điều chỉnh trong giới hạn đã duyệt.",
  },
  UC4: {
    before: "Dừng ngắn được ghi theo máy bị dừng; nguyên nhân nằm ở máy phía trước hoặc phía sau thường khó thấy. Thời gian chuyển đổi lấy theo định mức.",
    after: "Mô hình nhóm các lần dừng ngắn theo trạng thái, máy, vật tư và cách phục hồi; học thời gian chuyển đổi thực tế của từng cặp SKU để đề xuất thứ tự.",
  },
  UC5: {
    before: "Điều kiện trước khi chạy được kiểm tra theo danh sách; lịch bảo trì và lịch sản xuất được ghép thủ công.",
    after:
      "Trước mỗi lượt chạy, hệ thống kiểm tra công thức, lô nguyên liệu, bao bì, trạng thái QA release, vệ sinh và máy móc; dùng cảnh báo từ hệ thống giám sát thiết bị hiện có để đề xuất cửa sổ bảo trì phù hợp với sản lượng và đơn hàng.",
  },
};
