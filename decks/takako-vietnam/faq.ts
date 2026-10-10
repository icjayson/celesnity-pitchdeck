/**
 * Câu hỏi thường gặp của deck Takako, chỉ lấy từ nội dung đề xuất (decks/takako-vietnam/content.vi.ts).
 * Dùng cho: gói tri thức của trợ lý, câu trả lời soạn sẵn khi offline / hết ngân sách / lỗi API, và câu gợi ý.
 * Không nêu tên hay trích lời cá nhân nào phía Takako; không mô tả điểm yếu của Takako. `keywords` viết có dấu hoặc không đều được.
 */
import type { FaqItem } from "../types";

export const faq: FaqItem[] = [
  {
    id: "minder-ai-la-gi",
    q: "Minder AI là gì?",
    a: "Minder AI là **trợ lý vận hành chủ động** của Takako. Minder AI đặt trên các hệ thống Takako đã có (ERP, MES-IoT, kho bản vẽ), chạy trong nhà máy, chỉ đọc dữ liệu, rồi tự theo dõi, phát hiện thay đổi vượt ngưỡng, soạn sẵn bản tin, cảnh báo, báo cáo và gửi đúng người quản lý, kèm nguồn và cách tính. Khi được hỏi, Minder AI trả lời ngay theo cùng quy tắc.",
    section: "minder-ai",
    keywords: ["minder", "là gì", "trợ lý", "vận hành", "chủ động", "định nghĩa"],
    suggested: true,
  },
  {
    id: "chinh-xac",
    q: "Làm sao bảo đảm Minder AI không bịa số liệu?",
    a: "Mọi kết quả dẫn tới bản ghi gốc trên ERP, MES-IoT hoặc kho bản vẽ; thiếu số liệu thì Minder AI báo thiếu, không ước lượng, không suy đoán ngoài dữ liệu. Con số tính theo công thức do chính quản lý ban hành, và mỗi output có nút **Xác nhận · Không đúng · Không cần** để đo tỷ lệ đúng trên công việc thật.",
    section: "chinh-xac",
    keywords: ["bịa", "hallucination", "chính xác", "suy đoán", "nguồn", "đúng", "tin được"],
    suggested: true,
  },
  {
    id: "quy-tac",
    q: "Quy tắc trả lời do ai đặt?",
    a: "Quản lý phụ trách từng mảng đặt quy tắc: dùng dữ liệu nào, tính thế nào, ngưỡng, định dạng, gửi cho ai và khi nào. Minder AI chỉ làm theo quy tắc, nên output nhất quán giữa các người nhận, các ngày và các bộ phận. Minder AI **không tự đặt ngưỡng, không tự đổi cách tính** và không tự thêm người nhận.",
    section: "quy-tac",
    keywords: ["quy tắc", "ai đặt", "ngưỡng", "công thức", "định dạng", "nhất quán", "template"],
    suggested: true,
  },
  {
    id: "du-lieu-ra-ngoai",
    q: "Dữ liệu của Takako có ra khỏi nhà máy không?",
    a: "Không. Minder AI và mô hình AI open-weight chạy trong nhà máy, không gọi dịch vụ AI bên ngoài. Kết nối ra ngoài chỉ tới các nguồn trong danh sách được phép, ví dụ cơ sở dữ liệu văn bản pháp luật cho Kế toán. Dữ liệu thuộc Takako và không dùng để huấn luyện mô hình chung khi chưa được Takako đồng ý.",
    section: "kiem-soat",
    keywords: ["dữ liệu", "ra ngoài", "bảo mật", "on-premise", "cloud", "open-weight", "whitelist"],
    suggested: true,
  },
  {
    id: "ba-viec",
    q: "Giai đoạn 1 gồm những phần việc nào?",
    a: "Ba phần việc: **Trợ lý giá thành** cho Kế toán, **Trợ lý dữ liệu máy** cho Sản xuất và Vận hành, **Trợ lý bản vẽ** cho Tài nguyên kỹ thuật. Ba phần việc phủ đủ bốn mảng thông tin quản lý cần, chỉ dùng dữ liệu Takako đã có, và chỉ đọc.",
    section: "ba-viec",
    keywords: ["giai đoạn 1", "phần việc", "giá thành", "dữ liệu máy", "bản vẽ", "phạm vi"],
    suggested: true,
  },
  {
    id: "bat-dau-the-nao",
    q: "Giai đoạn 1 diễn ra thế nào trong 4 tuần?",
    a: "Tuần 1 kết nối chỉ đọc và đo số nền; quản lý đặt quy tắc, ngưỡng và người nhận. Tuần 2 Minder AI gửi output đầu tiên cho 2–3 người nhận mỗi phần việc. Tuần 3 toàn bộ người nhận dùng hằng ngày. Tuần 4 đo KPI so với tuần 1, và Takako quyết định ở Cổng 1.",
    section: "lo-trinh",
    keywords: ["4 tuần", "tuần", "triển khai", "bắt đầu", "kế hoạch", "timeline", "khởi động"],
    suggested: true,
  },
  {
    id: "kpi",
    q: "KPI của Giai đoạn 1 là gì?",
    a: "Thời gian cho công việc Minder AI đảm nhận so với số nền tuần 1 (ví dụ tình trạng một máy: từ khoảng 30 phút xuống dưới 2 phút), tỷ lệ xác nhận đúng, tỷ lệ không cần, 100% output có nguồn, và mức sử dụng thật. Mục tiêu cụ thể chốt cùng Takako trước khi bắt đầu.",
    section: "gia-tri",
    keywords: ["kpi", "đo", "roi", "hiệu quả", "thời gian", "tiết kiệm", "mục tiêu"],
    suggested: true,
  },
  {
    id: "phi",
    q: "Phí được tính thế nào?",
    a: "Một phần cố định nhỏ cho kỹ sư Celesnity làm việc tại nhà máy; phần còn lại chỉ trả khi đạt KPI đã chốt trước khi bắt đầu. Không tính phí theo số người dùng. Sau Giai đoạn 1, hợp đồng theo từng giai đoạn, giá gắn với giá trị đo được. Mức phí cụ thể nằm trong đề xuất gửi kèm.",
    section: "gia-tri",
    keywords: ["phí", "giá", "chi phí", "báo giá", "bao nhiêu tiền", "thanh toán"],
  },
  {
    id: "lo-trinh",
    q: "Sau Giai đoạn 1 thì mở rộng thế nào?",
    a: "Giai đoạn 2 Minder AI nhận thêm các ứng dụng Takako đã nêu, theo ba đợt: dữ liệu đã sẵn sàng (bảo trì đầy đủ, truy vết mã hàng, kiểm tra bản vẽ), cảnh báo trước (gợi ý quy trình từ mã hàng tương tự, bảo trì dự đoán), và tối ưu (chương trình gia công, đôn đốc tiến độ). Giai đoạn 3 đưa Minder AI sang nhà máy thứ hai. **Takako quyết định ở mỗi cổng.**",
    section: "ban-do",
    keywords: ["mở rộng", "giai đoạn 2", "giai đoạn 3", "nhà máy thứ hai", "lộ trình", "roadmap"],
    suggested: true,
  },
  {
    id: "thay-erp",
    q: "Minder AI có thay ERP hay MES không?",
    a: "Không. Minder AI đặt trên các hệ thống Takako đang có, chỉ đọc dữ liệu và không thay phần mềm nào. Minder AI không ghi vào ERP, MES hay kho bản vẽ, không điều khiển máy và không thay đổi quy trình đang chạy.",
    section: "minder-ai",
    keywords: ["thay", "erp", "mes", "phần mềm", "hệ thống", "ghi", "điều khiển"],
  },
  {
    id: "sai-thi-sao",
    q: "Nếu Minder AI sai thì sao?",
    a: "Mỗi output có nguồn và cách tính để người nhận kiểm tra. Bấm \"Không đúng\" thì lỗi được ghi lại, rồi sửa dữ liệu hoặc quy tắc. Tỷ lệ đúng là một KPI của Giai đoạn 1; Takako chỉ mở rộng khi độ chính xác đạt yêu cầu ở Cổng 1.",
    section: "chinh-xac",
    keywords: ["sai", "lỗi", "không đúng", "nhầm", "kiểm tra"],
  },
  {
    id: "phan-quyen",
    q: "Mỗi người thấy được thông tin gì?",
    a: "Theo vai trò: mỗi người chỉ thấy thông tin đúng vai trò của mình. Ví dụ trong phần minh họa, Kỹ thuật thấy nguyên nhân của cảnh báo giá thành nhưng không thấy số tiền, còn Sản xuất không thấy thẻ giá thành. Nhật ký ghi lại mọi truy vấn, mọi output và mọi lần sửa quy tắc.",
    section: "kiem-soat",
    keywords: ["phân quyền", "vai trò", "ai thấy", "quyền", "nhật ký", "audit"],
  },
  {
    id: "tuan-1-can-gi",
    q: "Tuần 1 cần gì từ Takako?",
    a: "Quyền truy cập chỉ đọc vào ERP, MES-IoT và kho bản vẽ; một đầu mối ở mỗi bộ phận; quản lý đặt quy tắc ban đầu; vài giờ để đo thời gian làm việc hiện tại.",
    section: "lo-trinh",
    keywords: ["cần gì", "chuẩn bị", "tuần 1", "đầu mối", "truy cập"],
  },
  {
    id: "quyen-loi",
    q: "Quyền lợi của hai bên là gì?",
    a: "Takako nhận ba phần việc chạy thật trên dữ liệu của chính mình, thời gian làm việc giảm đo bằng số nền, giữ quy tắc, dữ liệu và quyền quyết định ở mỗi cổng. Celesnity nhận phí gắn với KPI đạt được và phản hồi nghiệp vụ để hoàn thiện Minder AI; mọi công bố cần Takako đồng ý bằng văn bản.",
    section: "hai-ben",
    keywords: ["quyền lợi", "lợi ích", "hai bên", "đôi bên", "nhận", "góp"],
  },
  {
    id: "hinh-thuc-hop-tac",
    q: "Hình thức hợp tác gồm những gì?",
    a: "Hai thành phần: **Bộ ứng dụng AI-native** (Minder AI và các ứng dụng trên cùng nền tảng), và **Triển khai và nghiệm thu** do kỹ sư thực địa của Celesnity làm tại nhà máy: kết nối dữ liệu chỉ đọc, cùng quản lý đặt quy tắc, đo số nền và KPI, nghiệm thu ở mỗi cổng.",
    section: "hop-tac",
    keywords: ["hợp tác", "gói", "thành phần", "kỹ sư thực địa", "fde", "triển khai", "nghiệm thu"],
  },
  {
    id: "giam-sat-xuong",
    q: "Vì sao Giai đoạn 1 chưa làm giám sát quy trình xưởng hay đôn đốc tiến độ?",
    a: "Đó là các ứng dụng cần gần như mọi hệ thống. Đề xuất bắt đầu từ ba phần việc có dữ liệu sẵn sàng và đo được ngay; đôn đốc tiến độ nằm ở đợt tối ưu của Giai đoạn 2, khi Takako quyết định.",
    section: "lo-trinh",
    keywords: ["giám sát", "quy trình xưởng", "tiến độ", "đôn đốc", "chưa làm"],
  },
];
