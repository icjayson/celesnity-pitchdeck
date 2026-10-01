/**
 * 40 câu hỏi thường gặp kèm câu trả lời chuẩn, lấy từ nội dung đề xuất (content.vi.ts).
 * Dùng cho: gói tri thức của trợ lý, câu trả lời soạn sẵn khi offline / hết ngân sách / lỗi API,
 * và 8 câu gợi ý (mục 4.2 của kế hoạch, `suggested: true`).
 * `keywords` viết có dấu hoặc không đều được; khi so khớp sẽ bỏ dấu.
 */
export type FaqItem = {
  id: string;
  q: string;
  a: string;
  /** Mã section liên quan (không có dấu #) */
  section: string | null;
  keywords: string[];
  suggested?: true;
};

export const faq: FaqItem[] = [
  // ───────────── 8 câu gợi ý (mục 4.2) ─────────────
  {
    id: "du-lieu-roi-vn",
    q: "Dữ liệu của Hòa Phát có rời Việt Nam không?",
    a: "Không. Dữ liệu thô lưu tại Việt Nam, dưới quyền Hòa Phát; bản vẽ, thiết kế, firmware, BOM và công thức quy trình không bao giờ rời Hòa Phát. Hòa Phát chọn mức đóng góp: ở Mức 1 không có gì rời môi trường Hòa Phát, ở Mức 2 chỉ bản cập nhật mô hình đã qua kiểm thử bảo mật. Celesnity nhận bản cập nhật mô hình, không bao giờ là dữ liệu thô.",
    section: "kiem-soat",
    keywords: ["dữ liệu", "rời", "việt nam", "nước ngoài", "lưu trữ", "chủ quyền", "ra ngoài"],
    suggested: true,
  },
  {
    id: "pilot-khong-dat",
    q: "Nếu pilot không đạt thì sao?",
    a: "Nếu một use case không đạt cổng, use case đó được dừng hoặc điều chỉnh, và chương trình không chuyển sang giai đoạn có phí tiếp theo khi cổng chưa đạt. Các use case khác và quy trình hồ sơ tự động (UC0) vẫn tiếp tục. Kể cả khi pilot không đạt, Hòa Phát vẫn giữ dữ liệu đã được làm sạch và liên kết, quy trình ghi nhận tiếng Việt, bộ đề thi kín và đội IT đã được đào tạo.",
    section: "phong-thi",
    keywords: ["không đạt", "thất bại", "trượt", "dừng", "rủi ro", "mất gì"],
    suggested: true,
  },
  {
    id: "doi-it",
    q: "Đội IT Hòa Phát cần bao nhiêu người, làm gì?",
    a: "Đội vận hành mô hình của IT Hòa Phát tăng dần: 2 người trong pilot (kỹ sư dữ liệu, kỹ sư hạ tầng), 3 người khi dùng thật (thêm 1 kỹ sư AI), 4 người khi nhân rộng (thêm 1 kỹ sư vận hành mô hình). Đội đi theo thang năng lực: vận hành (tự chạy 1 vòng ở T4, tự vận hành 4 tuần ở T8), tự huấn luyện lại (T12), rồi đồng huấn luyện và dẫn dắt mở rộng sang thép ở năm 2. Chuyên gia R&D và Chất lượng dành khoảng 4 giờ/tuần để xác nhận mô hình đúng về chuyên môn.",
    section: "lo-trinh",
    keywords: ["đội it", "bao nhiêu người", "nhân sự", "kỹ sư it", "nguồn lực", "vận hành mô hình"],
    suggested: true,
  },
  {
    id: "khi-nao-thep",
    q: "Khi nào mở rộng sang thép?",
    a: "Thép là đích đến của chương trình. Cổng 3 (T8) mở cửa sang khảo sát thép khi Ban chỉ đạo duyệt; T10–T12 khảo sát, đánh giá dữ liệu và chọn use case thép đầu tiên; T12 có kế hoạch pilot thép năm 2. Pilot thép ở năm 2 do đội IT Hòa Phát dẫn dắt, Celesnity hỗ trợ. Use case thép là hướng đề xuất, sẽ được xác định cùng Hòa Phát sau khi có kết quả ở gia dụng.",
    section: "ban-do",
    keywords: ["thép", "dung quất", "hải dương", "mở rộng", "năm 2", "ống thép", "pilot thép", "dẫn dắt", "khi nào", "bắt đầu"],
    suggested: true,
  },
  {
    id: "khac-chatgpt",
    q: "Mô hình AI Thế giới thực khác ChatGPT thế nào?",
    a: "ChatGPT thuộc làn sóng AI ngôn ngữ: đọc, viết và trả lời câu hỏi. Mô hình AI Thế giới thực hiểu một hệ thống vật lý phản ứng thế nào với quyết định, và dự báo trước hệ quả kèm mức độ chắc chắn. Nó học từ chuỗi \"tình trạng → quyết định → kết quả\" trong chính nhà máy, nên hiểu hệ quả chứ không chỉ thấy tương quan. Nó không phải chatbot, không phải mô hình tạo video và không tự điều khiển thiết bị.",
    section: "ky-nguyen",
    keywords: ["chatgpt", "khác", "ngôn ngữ", "chatbot", "world model", "mô hình ai thế giới thực là gì"],
    suggested: true,
  },
  {
    id: "ai-cham",
    q: "Ai chấm kết quả pilot?",
    a: "Hòa Phát chấm. Hòa Phát giữ riêng bộ đề thi kín gồm dữ liệu lịch sử kèm kết quả thật; Celesnity không xem được đáp án, mô hình làm bài và Hòa Phát chấm. Ở Cổng 2, Chất lượng chấm UC1, R&D chấm UC2, Hội đồng dữ liệu chấm độ tin cậy, IT và Pháp chế chấm an toàn. Tài chính Hòa Phát xác nhận giá trị ở Cổng 4.",
    section: "phong-thi",
    keywords: ["chấm", "đề thi", "đánh giá", "kiểm chứng", "ai quyết định đạt", "cổng"],
    suggested: true,
  },
  {
    id: "so-huu-mo-hinh",
    q: "Hòa Phát có sở hữu mô hình không?",
    a: "Có. Mô hình riêng và các kết quả về hoạt động Hòa Phát thuộc sở hữu Hòa Phát; Celesnity chỉ dùng để vận hành dịch vụ. Mô hình nền, mã huấn luyện và bộ công cụ đánh giá thuộc Celesnity, Hòa Phát có giấy phép nội bộ vĩnh viễn, miễn phí bản quyền theo mức tham gia. Mã nguồn và mô hình riêng được lưu ký tại bên thứ ba; khi chấm dứt hợp tác, Hòa Phát giữ mô hình và giấy phép.",
    section: "kiem-soat",
    keywords: ["sở hữu", "mô hình riêng", "quyền", "sở hữu trí tuệ", "giấy phép", "của ai"],
    suggested: true,
  },
  {
    id: "sau-12-thang",
    q: "Sau 12 tháng Hòa Phát có gì?",
    a: "Sau 12 tháng, Hòa Phát có 6 use case chạy thật trên 2–3 dòng sản phẩm, mở rộng sang điện lạnh Hưng Yên/Phú Mỹ. Đội IT Hòa Phát tự vận hành và tự huấn luyện lại mô hình riêng, bắt đầu đồng huấn luyện mô hình nền. Hòa Phát cũng có kế hoạch pilot thép năm 2 và giá trị đã được Tài chính xác nhận tại Cổng 4.",
    section: "lo-trinh",
    keywords: ["12 tháng", "sau một năm", "cuối năm", "kết quả", "t12", "đạt được gì"],
    suggested: true,
  },

  // ───────────── Tổng quan ─────────────
  {
    id: "nha-may-sieu-thong-minh",
    q: "Nhà máy siêu thông minh là gì?",
    a: "Nhà máy siêu thông minh là một nhà máy có ba thuộc tính: Tự học · Dự báo trước · Nhân rộng. Mỗi quyết định và kết quả tự trở thành dữ liệu nên mỗi tháng thông minh hơn; mô hình dự báo hệ quả của một quyết định trước khi thực hiện; và kinh nghiệm của một dây chuyền được mang sang dây chuyền, nhà máy và mảng khác. Con người luôn là người quyết định.",
    section: "sieu-thong-minh",
    keywords: ["siêu thông minh", "tự học", "dự báo trước", "nhân rộng", "chương trình"],
  },
  {
    id: "de-nghi",
    q: "Celesnity đề nghị Hòa Phát điều gì?",
    a: "Celesnity kính đề nghị Ban Lãnh đạo ba việc: thống nhất chủ trương Hòa Phát là Đối tác công nghiệp sáng lập; cử nhân sự (lãnh đạo phụ trách, bảo trợ ngành hàng, các đầu mối dữ liệu, R&D, Chất lượng, Tài chính và 2 kỹ sư IT); và cho phép khảo sát Hòa Mạc để chốt dòng sản phẩm, bài toán, số nền và phí pilot.",
    section: "loi-moi",
    keywords: ["đề nghị", "yêu cầu", "cần làm gì", "bước tiếp theo", "đối tác sáng lập", "lời mời"],
  },
  {
    id: "ai-native",
    q: "AI-native khác AI-powered thế nào?",
    a: "Ở nhà máy AI-powered, AI là một công cụ con người mở ra khi cần. Ở Nhà máy siêu thông minh (AI-native), AI nằm ngay trong quy trình: tự tạo hồ sơ, nối dữ liệu, kiểm tra mọi quyết định. Mọi việc làm, quyết định và kết quả tự trở thành dữ liệu học, nên hệ thống biết điều gì sẽ xảy ra nếu chọn phương án A hay B và mỗi tháng thông minh hơn.",
    section: "sieu-thong-minh",
    keywords: ["ai native", "ai powered", "nhà máy thông minh", "khác biệt"],
  },
  {
    id: "ba-lop",
    q: "Ba lớp của hệ thống là gì?",
    a: "Lớp ① Nền tảng Minder là trí nhớ của nhà máy: ghi việc bằng giọng nói tiếng Việt, nối ERP, kiểm tra, bảo hành và lưu mọi quyết định. Lớp ② Mô hình AI Thế giới thực là bộ não hiểu nhà máy: dự báo kèm mức độ chắc chắn và nói \"không biết\" khi gặp tình huống chưa từng thấy. Lớp ③ Tác nhân AI lập hồ sơ, soạn kế hoạch kiểm tra và điều phối việc, mọi đề xuất đều được mô hình kiểm tra hệ quả trước. Con người có thẩm quyền phê duyệt mọi thay đổi.",
    section: "ba-lop",
    keywords: ["ba lớp", "kiến trúc", "minder", "nền tảng", "tác nhân ai", "lớp"],
  },
  {
    id: "vi-sao-hoa-phat",
    q: "Vì sao chọn Hòa Phát và vì sao bây giờ?",
    a: "Hòa Phát có chuỗi khép kín từ thiết kế, sản xuất đến dịch vụ, nên nguyên nhân và hệ quả nằm trong cùng một hồ sơ. Hòa Phát đa dạng lĩnh vực, mở rộng nhanh (như dự án tủ lạnh Phú Mỹ 1,2 triệu sản phẩm/năm) và có định hướng AI Tập đoàn. Bộ đề thi và từ điển sản phẩm của ngành còn đang được xác lập, nên đối tác sáng lập cùng định nghĩa chúng; Luật Trí tuệ nhân tạo (hiệu lực 1/3/2026) đã có khung pháp lý rõ.",
    section: "ban-do",
    keywords: ["vì sao", "tại sao hòa phát", "bây giờ", "thời điểm", "sao lại"],
  },
  {
    id: "hai-con-duong",
    q: "Con đường A và con đường B khác nhau thế nào?",
    a: "Con đường A là thuê AI: mô hình thuộc nhà cung cấp, dữ liệu thường phải đưa ra hệ thống của họ, kinh nghiệm làm giàu mô hình của người khác. Con đường B là tự chủ: mô hình riêng của Hòa Phát, dữ liệu ở lại Việt Nam, kinh nghiệm tích lũy thành tài sản của Hòa Phát và kỹ sư Hòa Phát vận hành, huấn luyện. Nhà máy siêu thông minh là con đường B cho trí thông minh vận hành.",
    section: "hai-con-duong",
    keywords: ["con đường", "thuê ai", "tự chủ", "lựa chọn", "a hay b"],
  },
  {
    id: "vi-sao-gia-dung",
    q: "Vì sao bắt đầu từ gia dụng mà không phải thép?",
    a: "Gia dụng có vòng phản hồi nhanh: một thay đổi cho thấy kết quả sau vài tuần đến vài tháng, nên mô hình học và được kiểm chứng nhanh. Chuỗi thiết kế → sản xuất → kiểm tra → bảo hành nằm trong một hồ sơ và đo được bằng tiền trên từng sản phẩm. Bắt đầu ở đây không chạm vào các quy trình liên tục, nhiệt độ cao của mảng thép, và Hòa Phát tự thiết kế bo mạch, firmware bếp từ. Celesnity học ở nơi vòng phản hồi nhanh nhất, rồi mang sang nơi giá trị lớn nhất.",
    section: "ban-do",
    keywords: ["gia dụng", "bếp từ", "bắt đầu", "hòa mạc", "tại sao không thép"],
  },
  {
    id: "mo-hinh-da-chay",
    q: "Mô hình đã chạy thật ở Hòa Phát chưa?",
    a: "Chưa. Các tình huống, con số và buồng mô phỏng trên trang là mô phỏng minh họa; mô hình thật được huấn luyện trên dữ liệu Hòa Phát trong pilot. Mô hình phải thi đạt trên bộ đề kín của Hòa Phát, do Hòa Phát chấm, trước khi kỹ sư được dùng dự báo. Phần trích xuất hồ sơ từ lời nói ở mục \"Thử làm công nhân\" là AI thật.",
    section: "phong-thi",
    keywords: ["đã chạy", "chạy thật", "có thật", "minh họa", "đã dùng", "kết quả thật"],
  },

  // ───────────── Pilot và lộ trình ─────────────
  {
    id: "pilot-16-tuan",
    q: "Pilot 16 tuần gồm những gì?",
    a: "Tuần 1–2 khảo sát Hòa Mạc, chọn dòng sản phẩm và bài toán, ký thỏa thuận dữ liệu. Tuần 3–4 dựng môi trường tại Việt Nam và bật hồ sơ tự động UC0 (Cổng 1). Tuần 5–8 nối dữ liệu lịch sử 2 năm, Hòa Phát dựng bộ đề thi kín, huấn luyện mô hình v0.1. Tuần 9–12 thi trên lịch sử của chính Hòa Phát; tuần 13–14 chạy thử song song; tuần 15–16 Tài chính xác nhận giá trị và báo cáo trước Ban chỉ đạo (Cổng 2).",
    section: "lo-trinh",
    keywords: ["pilot", "16 tuần", "kéo dài", "bao lâu", "thử nghiệm", "giai đoạn đầu", "kế hoạch pilot"],
  },
  {
    id: "hoa-phat-can-lam",
    q: "Hòa Phát cần chuẩn bị những gì?",
    a: "Hòa Phát chỉ cần 3 việc. Mở dữ liệu đã có ở chế độ chỉ đọc, không lắp thêm cảm biến, không thay hệ thống hiện tại. Cử 2 kỹ sư IT và chuyên gia R&D/Chất lượng khoảng 4 giờ/tuần. Giữ đề thi và chấm điểm.",
    section: "lo-trinh",
    keywords: ["chuẩn bị", "cần làm", "đóng góp", "cảm biến", "thay hệ thống", "hòa phát cần"],
  },
  {
    id: "bon-cong",
    q: "Bốn cổng đánh giá là gì?",
    a: "Cổng 1 (T1) kiểm tra dữ liệu đủ để làm và sự sẵn sàng. Cổng 2 (T4, kết thúc pilot) chấm UC1, UC2, độ tin cậy, mức hữu ích, năng suất UC0, an toàn và chuyển giao. Cổng 3 (T8) kiểm tra dùng thật trên ít nhất 20 ca, IT tự vận hành 4 tuần và mở cửa sang thép. Cổng 4 (T12) do Tài chính xác nhận giá trị năm đạt ngưỡng hòa vốn và IT Hòa Phát tự huấn luyện lại mô hình.",
    section: "phong-thi",
    keywords: ["cổng", "bốn cổng", "tiêu chí", "ngưỡng đạt", "gate"],
  },
  {
    id: "tieu-chi-cong-2",
    q: "Tiêu chí đạt ở Cổng 2 cụ thể thế nào?",
    a: "Với cùng nguồn lực kiểm tra, UC1 phải bắt nhiều hơn ít nhất 20% lỗi thật so với cách chọn mẫu hiện tại. UC2 phải chọn đúng phương án tốt hơn ở ít nhất 70% các cặp thay đổi cũ. Khi mô hình nói \"chắc chắn 90%\", kết quả phải đúng trong 85–95% số lần; ít nhất 70% đánh giá của kỹ sư là \"hữu ích\"; thời gian lập hồ sơ giảm ít nhất 25%; 0 sự cố dữ liệu rời Việt Nam.",
    section: "phong-thi",
    keywords: ["cổng 2", "tiêu chí", "20%", "70%", "độ tin cậy", "ngưỡng"],
  },
  {
    id: "lo-trinh-12-thang",
    q: "Lộ trình 12 tháng diễn ra thế nào?",
    a: "T1–T4 là pilot học: UC0 dùng thật từ T1, UC1 và UC2 thi trên lịch sử, kết quả thi ở T4. T5–T8 là dùng thật: UC1, UC2, UC3 bảo hành sớm, UC4 kiểm tra tác nhân AI. T9–T12 là nhân rộng: UC5 dịch vụ, dòng thứ 2 Hòa Mạc, điện lạnh Hưng Yên/Phú Mỹ, khảo sát thép và kế hoạch pilot thép năm 2. T1 là tháng đầu tiên sau khi Hòa Phát duyệt quyền truy cập dữ liệu và môi trường tính toán.",
    section: "lo-trinh",
    keywords: ["lộ trình", "12 tháng", "timeline", "tháng", "kế hoạch"],
  },
  {
    id: "chia-vai",
    q: "Celesnity và Hòa Phát chia việc vận hành thế nào theo thời gian?",
    a: "Trong pilot (T1–4), Celesnity làm khoảng 90%, Hòa Phát 10%. Khi dùng thật (T5–8), hai bên chia 50–50. Khi nhân rộng (T9–12), Hòa Phát làm 80%; ở năm 2 với thép, Hòa Phát dẫn dắt và Celesnity hỗ trợ. Đội Celesnity giảm dần từ khoảng 5,5 người xuống khoảng 3 người.",
    section: "lo-trinh",
    keywords: ["chia vai", "tỷ lệ", "chuyển giao", "ai vận hành", "90%", "80%"],
  },
  {
    id: "khao-sat-hoa-mac",
    q: "Thời gian bắt đầu dự kiến là khi nào?",
    a: "Tháng 10/2026, Celesnity làm việc với Trưởng bộ phận AI và ngành hàng để thống nhất term sheet, NDA và thỏa thuận xử lý dữ liệu. Tháng 11/2026 khảo sát Hòa Mạc để chốt phạm vi và phí pilot. Pilot bắt đầu (T1) khi dữ liệu và môi trường được duyệt.",
    section: "loi-moi",
    keywords: ["khi nào bắt đầu", "thời gian", "khảo sát", "tháng 10", "tháng 11", "khởi động"],
  },

  // ───────────── Use case ─────────────
  {
    id: "sau-use-case",
    q: "Sáu use case là gì?",
    a: "UC0 Hồ sơ chất lượng tự động (dùng thật từ T1), UC1 Dự báo lô rủi ro (T5), UC2 So sánh phương án sửa trước khi làm (T6), UC3 Cảnh báo sớm bảo hành (T7), UC4 Kiểm tra đề xuất của tác nhân AI (T8) và UC5 Chẩn đoán dịch vụ (T9). Sau đó là nhân rộng sang dòng thứ 2, điện lạnh, và chọn use case thép đầu tiên. Các use case mở dần theo bằng chứng.",
    section: "use-case",
    keywords: ["use case", "sáu use case", "danh mục"],
  },
  {
    id: "uc0",
    q: "Hồ sơ chất lượng tự động (UC0) làm gì?",
    a: "Từ lời báo lỗi bằng giọng nói tiếng Việt, AI tự tạo hồ sơ, gắn model, phiên bản bo mạch, lô linh kiện và kết quả đo. Mục tiêu là rút ngắn thời gian kỹ sư tập hợp bằng chứng từ nhiều hệ thống; tiêu chí đạt là giảm ít nhất 25% thời gian lập hồ sơ. Kỹ sư chất lượng quyết định. Quý vị có thể thử ngay ở mục \"Thử làm công nhân\".",
    section: "thu-ngay",
    keywords: ["uc0", "hồ sơ", "giọng nói", "báo lỗi", "công nhân", "trích xuất"],
  },
  {
    id: "uc1",
    q: "Dự báo lô rủi ro (UC1) hoạt động thế nào?",
    a: "Mô hình xếp hạng lô và trạm theo nguy cơ không đạt kiểm tra hoặc bảo hành, dựa trên lô linh kiện, phiên bản, kết quả đo và lịch sử sửa lại. Mục tiêu là dồn nguồn lực kiểm tra vào đúng nơi có nguy cơ cao. Tiêu chí đạt là bắt thêm ít nhất 20% lỗi thật với cùng nguồn lực kiểm tra; Chất lượng quyết định kiểm tra gì.",
    section: "use-case",
    keywords: ["uc1", "lô rủi ro", "xếp hạng", "kiểm tra lô"],
  },
  {
    id: "uc2",
    q: "So sánh phương án sửa (UC2) giúp gì?",
    a: "Khi R&D có hai cách sửa, ví dụ chỉnh firmware hay đổi linh kiện, mô hình dự báo tác động của từng phương án lên lỗi và bảo hành, kèm các thay đổi lịch sử làm dẫn chứng. Nhờ đó Hòa Phát biết phương án nào hiệu quả hơn trước khi đầu tư khuôn, thẩm định, chứng nhận. Tiêu chí đạt là chọn đúng phương án tốt hơn ở ít nhất 70% trường hợp; R&D và Chất lượng duyệt qua quy trình phát hành hiện có.",
    section: "mo-phong",
    keywords: ["uc2", "phương án", "firmware", "đổi linh kiện", "so sánh"],
  },
  {
    id: "uc4-tac-nhan",
    q: "Kiểm tra đề xuất của tác nhân AI (UC4) là gì?",
    a: "UC4 kiểm tra trước tính khả thi và hệ quả của đề xuất từ tác nhân AI, của Minder hoặc của Tập đoàn như các tác nhân AI tại Dung Quất, trước khi đến người duyệt. Người duyệt chỉ nhận đề xuất đã được kiểm tra, nên năng suất tăng mà chuẩn duyệt không giảm. Tiêu chí đạt là ít nhất 50% đề xuất có lỗi bị chặn trước khi đến người duyệt. Đây là cầu nối sang thép.",
    section: "use-case",
    keywords: ["uc4", "tác nhân ai", "agent", "dung quất", "13 tác nhân", "kiểm tra đề xuất"],
  },
  {
    id: "mo-phong",
    q: "Buồng mô phỏng quyết định hoạt động thế nào?",
    a: "Quý vị chọn một phương án (A. Chỉnh firmware, B. Đổi linh kiện, C. Giữ nguyên, hoặc dùng nhà cung cấp mới), xem mô hình dự báo tỷ lệ lỗi 8 tuần tới kèm dải mức độ chắc chắn, rồi quyết định. Bốn tuần sau, kết quả thực tế hiện cạnh dự báo và mô hình tự học. Với nhà cung cấp mới chưa có dữ liệu, mô hình trả lời \"Chưa đủ dữ liệu để dự báo đáng tin cậy\". Đây là mô phỏng minh họa.",
    section: "mo-phong",
    keywords: ["mô phỏng", "buồng", "phương án", "nhà cung cấp mới", "dự báo"],
  },
  {
    id: "khong-biet",
    q: "Mô hình có biết khi nào nó không chắc không?",
    a: "Có. Mô hình dự báo kèm mức độ chắc chắn, được hiệu chuẩn để khi nói \"chắc chắn 90%\" thì đúng trong 85–95% số lần. Mô hình nói \"không biết\" khi gặp phiên bản, nhà cung cấp, nguyên liệu hay sản phẩm chưa từng thấy. Khi dữ liệu không đủ để phân biệt nguyên nhân với trùng hợp, mô hình nói rõ.",
    section: "mo-phong",
    keywords: ["không chắc", "độ tin cậy", "mức độ chắc chắn", "sai", "nhầm", "không biết"],
  },

  // ───────────── Thép ─────────────
  {
    id: "use-case-thep",
    q: "Ở thép, mô hình có thể trả lời những câu hỏi gì?",
    a: "Các hướng đề xuất ở thép gồm: dừng máy và phục hồi, chất lượng theo mẻ và theo cuộn, năng lượng, kiểm tra đề xuất của tác nhân AI tại Dung Quất, và bảo trì. Ví dụ: một lần dừng máy ảnh hưởng thế nào và phục hồi bằng cách nào nhanh nhất; lịch sản xuất nào tiêu hao năng lượng ít nhất mà vẫn đạt sản lượng. Đây là hướng đề xuất, được xác định cùng Hòa Phát sau Cổng 3.",
    section: "ban-do",
    keywords: ["thép", "use case thép", "đầu tiên", "dừng máy", "năng lượng", "mẻ", "cuộn", "bảo trì"],
  },
  {
    id: "mang-sang-thep",
    q: "Kinh nghiệm gia dụng có áp dụng được cho thép không?",
    a: "Thứ mang sang thép là nền tảng đã chạy thật, phương pháp và bộ đề thi đã kiểm chứng, đội IT Hòa Phát đã tự vận hành được mô hình, và quy trình quản trị dữ liệu đã được duyệt. Độ chính xác không mặc định mang sang: mô hình được học tiếp bằng dữ liệu thép và được kiểm chứng riêng với khảo sát và bộ đề thi riêng.",
    section: "ban-do",
    keywords: ["áp dụng", "mang sang", "thép", "độ chính xác", "chuyển giao"],
  },

  // ───────────── Giá trị và chi phí ─────────────
  {
    id: "chi-phi",
    q: "Chi phí pilot là bao nhiêu?",
    a: "Phí pilot là phí cố định với phạm vi rõ ràng, được thống nhất sau khảo sát Hòa Mạc, nên Celesnity chưa đưa con số ở giai đoạn này. Không đạt Cổng 2 thì không chuyển sang giai đoạn có phí tiếp theo. Sau pilot, giá được định theo giá trị Tài chính Hòa Phát đã xác minh, và mỗi dòng sản phẩm, nhà máy hay mảng mới được định giá theo phạm vi riêng.",
    section: "hop-tac",
    keywords: ["chi phí", "giá", "phí", "phí pilot", "bao nhiêu tiền", "mấy tỷ", "báo giá", "ngân sách", "tốn"],
  },
  {
    id: "gia-tri",
    q: "Giá trị được tính thế nào?",
    a: "Giá trị được đo bằng tiền trên mỗi sản phẩm bán được, và Tài chính Hòa Phát là người xác nhận. Nguồn giá trị gồm kiểm tra có mục tiêu (UC1), phát hiện bảo hành sớm (UC3), tránh thay đổi kỹ thuật không hiệu quả (UC2) và năng suất kỹ sư (UC0). Các con số trên trang là giả định minh họa cho một dòng khoảng 100.000 sp/năm, không phải số liệu Hòa Phát; số thật được thay sau Cổng 1. Quý vị có thể nhập số của mình vào máy tính giá trị.",
    section: "gia-tri",
    keywords: ["giá trị", "lợi ích", "roi", "tiết kiệm", "máy tính giá trị", "hòa vốn", "lỗi lọt", "tỷ lệ lỗi", "sản lượng"],
  },
  {
    id: "cam-ket-tiet-kiem",
    q: "Celesnity có cam kết tỷ lệ tiết kiệm không?",
    a: "Celesnity không cam kết một con số tiết kiệm trước. Thay vào đó, mỗi use case có tiêu chí đạt rõ ràng, được chấm trên bộ đề kín của Hòa Phát, và Tài chính Hòa Phát xác nhận giá trị. Không đạt cổng thì không chuyển sang giai đoạn có phí tiếp theo.",
    section: "phong-thi",
    keywords: ["cam kết", "đảm bảo", "bảo đảm", "tỷ lệ tiết kiệm", "chắc chắn tiết kiệm"],
  },
  {
    id: "goi-hop-tac",
    q: "Gói hợp tác gồm những gì?",
    a: "Gói gồm ba thành phần: ① Mô hình AI Thế giới thực, bản riêng của Hòa Phát chạy tại Việt Nam; ② Bộ ứng dụng AI-native (hồ sơ tự động, dự báo và so sánh, bảng chỉ tiêu, kết nối cho tác nhân AI của Tập đoàn); ③ Triển khai và chuyển giao (FDE), đào tạo đội IT tới khi tự vận hành, tự huấn luyện và dẫn dắt mở rộng. Năm 1 phần lớn chi phí là triển khai và chuyển giao; từ năm 2 phần lớn là mô hình và ứng dụng. Celesnity không đề xuất độc quyền, góp vốn hay chia doanh thu.",
    section: "hop-tac",
    keywords: ["gói", "hợp tác", "thành phần", "fde", "độc quyền", "góp vốn", "chia doanh thu", "cơ cấu"],
  },

  // ───────────── Kiểm soát, pháp lý ─────────────
  {
    id: "ba-muc",
    q: "Ba mức tham gia khác nhau thế nào?",
    a: "Mức 1 (Riêng): không có gì rời môi trường Hòa Phát. Mức 2 (Đóng góp): chỉ bản cập nhật mô hình đã qua kiểm thử bảo mật rời đi, Hòa Phát được dùng mọi phiên bản mô hình nền trong thời gian đóng góp. Mức 3 (Đối tác sáng lập): thêm tập kiểm chứng đã khử nhận diện, duyệt từng bản ghi; Hòa Phát chủ trì Ban chỉ đạo, tiếp cận tính năng mới sớm 6 tháng. Celesnity khuyến nghị Mức 3; trong pilot dữ liệu chạy ở chế độ Mức 2.",
    section: "kiem-soat",
    keywords: ["mức", "mức 1", "mức 2", "mức 3", "tham gia", "đóng góp"],
  },
  {
    id: "nguoi-lao-dong",
    q: "Dữ liệu có được dùng để đánh giá công nhân không?",
    a: "Không. Dữ liệu người lao động không bao giờ được dùng để xếp hạng hay kỷ luật cá nhân. Chương trình tham vấn trước, khử nhận diện và không dùng dữ liệu để đánh giá cá nhân.",
    section: "kiem-soat",
    keywords: ["người lao động", "công nhân", "giám sát", "kỷ luật", "đánh giá cá nhân"],
  },
  {
    id: "phap-ly",
    q: "Chương trình tuân thủ pháp luật Việt Nam thế nào?",
    a: "Chương trình áp dụng Luật Trí tuệ nhân tạo 134/2025/QH15, Nghị định 142/2026/NĐ-CP, Quyết định 33/2026/QĐ-TTg, Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 và Nghị định 356/2025/NĐ-CP. Celesnity lập hồ sơ phân loại rủi ro cho từng chức năng và thông báo Bộ KH&CN khi bắt buộc. An ninh theo kiến trúc nhà máy đã duyệt và mô hình phân vùng IEC 62443, bắt đầu ở chế độ chỉ đọc. Hợp đồng ký tại Việt Nam với Celesnity Việt Nam.",
    section: "kiem-soat",
    keywords: ["pháp lý", "luật", "tuân thủ", "nghị định", "an ninh", "bảo mật", "iec"],
  },
  {
    id: "dieu-khien-thiet-bi",
    q: "Mô hình có tự điều khiển máy móc không?",
    a: "Không. Mô hình chỉ dự báo và so sánh; con người có thẩm quyền phê duyệt mọi thay đổi và mô hình không điều khiển thiết bị. Giống buồng mô phỏng bay: mô hình giúp con người thử và so sánh trước khi cam kết. Mọi bước lên mức tự chủ cao hơn là quyết định riêng của Hòa Phát, theo quy định pháp luật.",
    section: "ba-lop",
    keywords: ["điều khiển", "tự động", "thay con người", "máy móc", "thiết bị", "tự quyết"],
  },
];

export const suggestedFaq = faq.filter((f) => f.suggested);
