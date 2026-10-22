/**
 * Câu hỏi thường gặp của deck Siam Cement Group, chỉ lấy từ nội dung đề xuất (decks/scg-vietnam/content.vi.ts).
 * Dùng cho: gói tri thức của trợ lý Siam Cement Group, câu trả lời soạn sẵn khi offline / hết ngân sách / lỗi API, và câu gợi ý.
 * Không chứa thông tin của khách hàng khác, không mô tả cách Siam Cement Group đang làm hôm nay.
 */
import type { FaqItem } from "../../types";

export const faq: FaqItem[] = [
  {
    id: "nha-may-sieu-thong-minh-la-gi",
    q: "Nhà máy siêu thông minh là gì?",
    a: "Đó là nhà máy mà mỗi thay đổi điểm đặt, mỗi mẫu phòng thí nghiệm, mỗi quyết định và kết quả đều trở thành dữ liệu học cho một **Mô hình AI Thế giới thực**. Nhà máy **tự học** sau mỗi ca, **dự báo trước** hệ quả của quyết định tiếp theo, và **nhân rộng** kinh nghiệm sang nhà máy khác, quốc gia khác. Con người luôn là người phê duyệt.",
    section: "sieu-thong-minh",
    keywords: ["siêu thông minh", "là gì", "định nghĩa", "tự học", "dự báo trước", "nhân rộng"],
    suggested: true,
  },
  {
    id: "minder-la-gi",
    q: "Minder và Mô hình AI Thế giới thực khác nhau thế nào?",
    a: "**Mô hình AI Thế giới thực là bộ não**: học cách nhà máy phản ứng với quyết định và dự báo trước. **Minder là nơi con người làm việc cùng bộ não đó**: trên điện thoại và máy tính bảng, trên nền tảng, và qua Minder tại máy, nơi đọc tín hiệu hệ thống điều khiển, PLC, cảm biến và khi được duyệt thì ghi điểm đặt trở lại máy. Minder gom con người, công việc, vật tư, máy móc và kết quả vào một bản ghi duy nhất.",
    section: "minder",
    keywords: ["minder", "nền tảng", "khác nhau", "bộ não", "giao diện", "edge"],
    suggested: true,
  },
  {
    id: "gui-lenh-xuong-may",
    q: "Mô hình có tự điều khiển lò không?",
    a: "Không tự ý. Mô hình đọc, dự báo và đề xuất; **Minder chỉ gửi điểm đặt xuống hệ thống điều khiển khi người có thẩm quyền phê duyệt**, trong dải giới hạn do kỹ sư Siam Cement Group đặt, và chỉ sau Cổng 2. Thử nghiệm 4 tháng đầu là chỉ đọc. Có ba nấc: tư vấn, có phê duyệt, và tự động trong dải hẹp mà Siam Cement Group đã duyệt; lên nấc nào là quyết định riêng của Siam Cement Group. Interlock, hệ thống an toàn và quyền dừng khẩn cấp luôn đứng trên mọi lệnh của Minder.",
    section: "dieu-khien",
    keywords: ["điều khiển", "tự động", "gửi lệnh", "điểm đặt", "hệ thống điều khiển", "setpoint", "closed loop", "vòng kín", "an toàn"],
    suggested: true,
  },
  {
    id: "video-demo",
    q: "Video demo cho thấy điều gì?",
    a: "Video quay tại phòng thí nghiệm của Celesnity: camera đọc vị trí từng chi tiết trên khay, thiết bị Minder tại máy nối robot và camera, Minder Hub báo trạng thái và gửi lệnh bắt đầu chu trình, robot thực hiện rồi báo hoàn thành. Đó là cùng một vòng **đọc → hiểu → duyệt → hành động → kiểm chứng** mà Minder dùng tại lò nung, với hệ thống điều khiển thay cho robot. Video không quay tại nhà máy Siam Cement Group.",
    section: "dieu-khien",
    keywords: ["video", "demo", "robot", "minder hub", "camera"],
    suggested: true,
  },
  {
    id: "danh-muc-ung-dung",
    q: "Có bao nhiêu ứng dụng, và ứng dụng nào chạy được ngay?",
    a: "Danh mục có **35 ứng dụng thực tế** tại Sông Gianh, tất cả chạy trên 5 tính năng Minder đang có và dùng thật từ T+1 đến T+3: **kết nối dữ liệu theo thời gian thực** (7, ví dụ nối hệ thống điều khiển ở chế độ chỉ đọc), **theo dõi và đo lường** (7, ví dụ mô hình nhà máy 3D), **cảnh báo và phát hiện bất thường** (8, ví dụ cảnh báo sớm tắc cyclone), **trợ lý AI chủ động** (6, ví dụ hỏi bằng tiếng Việt và nhận biểu đồ) và **báo cáo tự động** (7, ví dụ báo cáo ca và ngày). Dự báo và Hành động có phê duyệt mở ra sau, từ T+5 và T+10.",
    section: "use-case",
    keywords: ["bao nhiêu ứng dụng", "danh mục", "chạy ngay", "use case", "khâu", "ứng dụng nào"],
    suggested: true,
  },
  {
    id: "vi-sao-bat-dau-tu-lo",
    q: "Vì sao bắt đầu từ dây chuyền lò nung?",
    a: "Lò nung là nơi tập trung phần lớn năng lượng, chất lượng clinker và rủi ro dừng máy của một nhà máy xi măng, và có nhiều dữ liệu được ghi lại liên tục. Một ứng dụng thành công ở lò cho giá trị đo được nhanh, và tạo nền để mở ra nghiền liệu, nghiền xi măng, bảo trì và năng lượng của toàn nhà máy. Dây chuyền cụ thể được chốt cùng Siam Cement Group trong khảo sát.",
    section: "use-case",
    keywords: ["vì sao", "lò nung", "bắt đầu", "pilot", "thử nghiệm", "kiln"],
    suggested: true,
  },
  {
    id: "lo-trinh-22-thang",
    q: "Lộ trình 22 tháng gồm những gì?",
    a: "Bốn giai đoạn: **Thử nghiệm** trên một dây chuyền lò (T+1–T+4, Cổng 2); **Toàn nhà máy** với Dự báo và vòng điều khiển có phê duyệt (T+5–T+10, Cổng 3); **Nhân rộng, đợt 1** sang các nhà máy Siam Cement Group tiếp theo (T+11–T+16, Cổng 4); và **Nhân rộng, đợt 2** sang một nhà máy khác trong mạng lưới, đề xuất tại Thái Lan (T+17–T+22, Cổng 5). Mỗi cổng là điểm Siam Cement Group quyết định mở rộng, điều chỉnh hay dừng.",
    section: "lo-trinh",
    keywords: ["lộ trình", "22 tháng", "giai đoạn", "cổng", "timeline", "bao lâu"],
    suggested: true,
  },
  {
    id: "thai-lan",
    q: "Nhà máy tiếp theo trong mạng lưới tham gia khi nào và thế nào?",
    a: "Từ T+15, khi đã có kết quả tại các nhà máy đầu tiên, Siam Cement Group chọn nhà máy tiếp theo trong mạng lưới (đề xuất: một nhà máy tại Thái Lan); khảo sát ở T+17 và các ứng dụng dùng thật từ T+19 đến T+22. Mô hình đã học tại các nhà máy trước được mang sang nên **không bắt đầu lại từ 0**, nhưng mỗi nhà máy mới vẫn có khảo sát và bộ đề thử nghiệm riêng. Dữ liệu ở lại môi trường riêng của Siam Cement Group tại nhà máy đó; Minder hỗ trợ tiếng Thái.",
    section: "ban-do",
    keywords: ["nhà máy tiếp theo", "mạng lưới", "thái lan", "thailand", "nhà máy thái", "kaeng khoi", "nhân rộng"],
    suggested: true,
  },
  {
    id: "du-lieu-o-dau",
    q: "Dữ liệu của Siam Cement Group nằm ở đâu?",
    a: "Dữ liệu thô ở lại **môi trường riêng của Siam Cement Group tại từng nhà máy**; mô hình dành riêng cho Siam Cement Group chạy ngay trong môi trường đó. Công thức phối liệu và thông số công nghệ không bao giờ rời Siam Cement Group. Chỉ bản cập nhật trọng số mô hình đã qua kiểm thử an ninh, và được Siam Cement Group duyệt từng lần, mới được chia sẻ.",
    section: "hai-ben",
    keywords: ["dữ liệu", "lưu ở đâu", "chủ quyền", "bảo mật", "cloud", "on-premise"],
    suggested: true,
  },
  {
    id: "so-huu-mo-hinh",
    q: "Ai sở hữu mô hình?",
    a: "Dữ liệu nội bộ và mọi kết quả về hoạt động Siam Cement Group thuộc Siam Cement Group. Mô hình dành riêng cho Siam Cement Group do Celesnity phát triển và bảo trì, Siam Cement Group sử dụng độc quyền trong suốt thời gian hợp tác và không cung cấp cho bên nào khác. Mô hình nền, nền tảng Minder và bộ công cụ đánh giá thuộc Celesnity.",
    section: "hai-ben",
    keywords: ["sở hữu", "sở hữu trí tuệ", "IP", "mô hình thuộc ai"],
  },
  {
    id: "phi",
    q: "Chi phí như thế nào?",
    a: "Giai đoạn thử nghiệm có **phí cố định**, thống nhất sau khảo sát nhà máy thử nghiệm; nếu không đạt Cổng 2 thì không chuyển sang giai đoạn tính phí tiếp theo. Sau thử nghiệm, phí đi theo **giá trị kinh tế do Tài chính Siam Cement Group xác nhận**; mỗi nhà máy mới có phạm vi và cơ chế định giá riêng.",
    section: "hop-tac",
    keywords: ["chi phí", "phí", "giá", "báo giá", "bao nhiêu tiền", "cost"],
    suggested: true,
  },
  {
    id: "scg-can-lam-gi",
    q: "Siam Cement Group cần chuẩn bị những gì cho thử nghiệm?",
    a: "Ba việc: **mở dữ liệu đã có** ở chế độ chỉ đọc; **cử người**: trưởng ca, kỹ sư Công nghệ lò và Chất lượng, khoảng 4 giờ/tuần mỗi người; và **nhận xét, đánh giá** kết quả. Lãnh đạo phụ trách họp tháng; Tài chính tham gia tại mỗi cổng.",
    section: "lo-trinh",
    keywords: ["chuẩn bị", "cần gì", "nhân sự", "đầu mối", "kỹ sư"],
  },
  {
    id: "do-luong",
    q: "Đo kết quả thế nào?",
    a: "Mỗi ứng dụng có tiêu chí đạt chốt sau khảo sát, chấm trên **bộ đề thử nghiệm kín do Siam Cement Group giữ**: ví dụ cảnh báo trước ít nhất 30 phút cho đa số lần lò lệch, chọn đúng phương án điểm đặt tốt hơn ít nhất 70% trên các thay đổi cũ, và không có lần ghi điểm đặt nào ngoài dải đã duyệt. Giá trị kinh tế (nhiệt tiêu hao, điện năng, dừng lò, nhiên liệu thay thế) do Tài chính Siam Cement Group xác nhận.",
    section: "use-case",
    keywords: ["đo", "kpi", "tiêu chí", "kết quả", "nghiệm thu", "bộ đề"],
  },
  {
    id: "he-thong-hien-co",
    q: "Minder có thay thế hệ thống hiện có không?",
    a: "Minder **thay thế hàng chục phần mềm riêng lẻ** và gom chúng thành một mô hình chung của nhà máy: lập kế hoạch, sản xuất, kiểm tra, giám sát, bảo trì, vận chuyển, bảo vệ và tối ưu. Hệ thống điều khiển và hệ thống an toàn giữ nguyên; Minder làm việc cùng các lớp điều khiển nâng cao và các mô hình AI Siam Cement Group đang có. Hệ thống cụ thể nào được kết nối sẽ do khảo sát xác định.",
    section: "minder",
    keywords: ["thay thế", "hệ thống điều khiển", "hệ thống hiện có", "tích hợp", "ERP", "SCADA"],
  },
  {
    id: "nguoi-lao-dong",
    q: "Người vận hành có bị giám sát hay chấm điểm không?",
    a: "Không. Dữ liệu người lao động **không bao giờ** được dùng để xếp hạng hay kỷ luật cá nhân. Celesnity tham vấn trước với người vận hành, khử nhận diện dữ liệu, và Minder giữ lại kinh nghiệm của người giỏi nhất để ai trực ca cũng dùng được.",
    section: "hai-ben",
    keywords: ["giám sát", "người lao động", "chấm điểm", "kỷ luật", "công nhân"],
  },
];
