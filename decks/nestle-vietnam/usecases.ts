/**
 * Ứng dụng giai đoạn đầu của deck Nestlé Trị An (M18 variant "detail", M10). Khớp docs/nestle-content-v4.md mục #use-case.
 * Ba ứng dụng theo quy trình Kế hoạch → Vận hành → Dự báo trước và Phục hồi, trên một nền dữ liệu chung.
 * Mục tiêu trong `kpis`/`pass` là đề xuất, chốt sau khảo sát; không có con số tiết kiệm trước khi có số liệu nền.
 */
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
    code: "Nền tảng dữ liệu",
    name: "Báo cáo ca, ngày, tuần",
    question: "Ca này, ngày này, tuần này dây chuyền chạy thế nào so với kế hoạch và so với ca trước?",
    liveFrom: "Dùng thật từ T+1",
    sectors: ["dolce-gusto", "tri-an"],
    phase: "pilot",
    primary: true,
    card: {
      images: [
        { src: "/decks/nestle-vietnam/uc0-mo-hinh-nha-may.png", width: 1912, height: 934, alt: "Minder · Mô hình nhà máy: bản đồ dây chuyền Dolce Gusto L1, L2 với 52 nút và 24 tuyến công đoạn", caption: "Minder · Mô hình nhà máy: bản đồ dây chuyền Dolce Gusto L1, L2 với 52 nút và 24 tuyến công đoạn" },
        { src: "/decks/nestle-vietnam/uc0-tong-quan-bang-dieu-khien.png", width: 1912, height: 934, alt: "Minder · Bảng điều khiển tổng quan: sản lượng theo ngày, tổn thất thời gian, cân bằng nguyên liệu, cảnh báo cần xử lý", caption: "Minder · Bảng điều khiển tổng quan: sản lượng theo ngày, tổn thất thời gian, cân bằng nguyên liệu, cảnh báo cần xử lý" },
      ],
      stage: "Ghi lại · nền cho cả ba ứng dụng",
      opportunity: "Mỗi ca có số liệu đã đối chiếu, làm nền cho mọi phân tích",
      aiDoes: "Kết nối chỉ đọc, dựng bản đồ dây chuyền, Tác nhân AI tự lập báo cáo ca, ngày, tuần",
      worldModel:
        "Đây là lớp ① của Mô hình AI Thế giới thực. Bản đồ liên kết nối nhu cầu → lệnh sản xuất → SKU → L1, L2 → thiết bị → phòng → lô → sản lượng. Mỗi ca, mỗi kế hoạch, mỗi sự cố thành một chuỗi **\"tình trạng → quyết định → kết quả\"** để mô hình học. Không có lớp này, ba ứng dụng còn lại không có dữ liệu để học.",
      needs: [
        "Tín hiệu PLC của L1, L2: số đếm, trạng thái chạy/dừng, mã dừng",
        "Quyền đọc historian hoặc OPC UA, lệnh sản xuất từ SAP/MES, sổ ca hiện tại",
        "Mẫu báo cáo ca, ngày, tuần đang dùng",
        "1 đầu mối IT/OT",
      ],
      notDo: [
        "Không thay MES, SAP hay sổ ca theo quy định GMP",
        "Không ghi ngược vào bất kỳ hệ thống nào",
        "Không dùng dữ liệu để đánh giá cá nhân",
      ],
      deliverables: [
        "Bản đồ dây chuyền Dolce Gusto L1, L2",
        "Bảng điều khiển cho Giám đốc nhà máy và Trưởng phòng Sản xuất",
        "Báo cáo ca, ngày, tuần tự gửi (PDF, email hoặc Teams)",
        "Danh mục dữ liệu được IT/OT ký duyệt",
      ],
      kpis: ["Giờ tổng hợp báo cáo mỗi tuần: đo trước và sau", "**≥90%** chỉ số trong báo cáo ca lấy tự động", "**≥95%** báo cáo gửi đúng giờ"],
      value: "Giờ công tổng hợp báo cáo tiết kiệm × số người × 52 tuần; sai lệch được thấy ngay cuối ca thay vì cuối tuần",
      decides: "Trưởng ca xác nhận báo cáo; Trưởng phòng Sản xuất duyệt mẫu",
      pass: "Trưởng ca xác nhận báo cáo đúng **4 tuần liên tiếp**; **≥90%** chỉ số lấy tự động",
    },
  },
  {
    id: "UC1",
    code: "Ứng dụng 1",
    name: "Tự động lập báo cáo và kế hoạch",
    question: "Tuần tới mỗi dây chuyền chạy SKU nào, bao nhiêu, theo thứ tự nào, và kết quả thực tế sẽ ra sao?",
    liveFrom: "Thi trên lịch sử từ T+3 · dùng thật từ T+6",
    sectors: ["dolce-gusto", "tri-an", "nestle-vn"],
    phase: "pilot",
    primary: true,
    card: {
      images: [
        { src: "/decks/nestle-vietnam/uc1-viec-dinh-ky-bao-cao-ca.png", width: 1920, height: 1077, alt: "Minder · Việc định kỳ: báo cáo ca tự lập cuối mỗi ca và lập kế hoạch sản xuất tuần chạy theo lịch", caption: "Minder · Việc định kỳ: báo cáo ca tự lập cuối mỗi ca và lập kế hoạch sản xuất tuần chạy theo lịch" },
      ],
      stage: "Khâu Kế hoạch",
      opportunity: "Kế hoạch tuần có trong vài giờ, người lập kế hoạch dành thời gian cho việc cân nhắc đánh đổi",
      aiDoes: "Bộ giải tối ưu tạo kế hoạch khả thi; mô hình dự báo kết quả từng kế hoạch",
      worldModel:
        "Học **năng lực thực tế** của L1, L2 theo SKU và ca (không lấy định mức), **thời gian chuyển đổi thật của từng cặp SKU**, và rủi ro dừng máy (từ Ứng dụng 3). Với mỗi kế hoạch khả thi, mô hình dự báo sản lượng thực tế, giờ chuyển đổi và đơn hàng có rủi ro, kèm mức độ chắc chắn. Bộ giải tối ưu bảo đảm ràng buộc; mô hình ngôn ngữ chỉ đọc đầu vào và giải thích, **không tự nghĩ ra lịch**.",
      needs: [
        "8–12 kế hoạch tuần gần nhất và sản lượng thực tế tương ứng",
        "Nhu cầu tuần từ chuỗi cung ứng (file hoặc SAP), tồn thành phẩm và vật tư",
        "Lịch sử chuyển đổi SKU; mẫu kế hoạch đang dùng",
        "Ràng buộc bắt buộc: vệ sinh, thời gian lưu bột, tương thích SKU và dây chuyền",
        "Người lập kế hoạch ~4 giờ/tuần để chấm kế hoạch nháp",
      ],
      notDo: [
        "Không thay dự báo nhu cầu của chuỗi cung ứng; chỉ dùng làm đầu vào",
        "Giai đoạn đầu không tự đẩy lệnh vào SAP hay MES; xuất file để người duyệt nhập",
        "Không thay người lập kế hoạch ra quyết định",
        "Không lập kế hoạch dài hạn (quý, năm)",
      ],
      deliverables: [
        "Tác nhân AI lập kế hoạch tuần, chạy theo lịch mỗi tuần",
        "Ma trận thời gian chuyển đổi SKU học từ dữ liệu",
        "Báo cáo thi: kế hoạch nháp so với kế hoạch đã chạy trên 8–12 tuần lịch sử",
        "4 tuần chạy song song với kế hoạch thật",
      ],
      kpis: [
        "Thời gian lập kế hoạch tuần: từ khoảng 3 ngày công xuống **≤ ½ ngày**",
        "**100%** kế hoạch nháp đáp ứng ràng buộc bắt buộc",
        "**≥70%** dòng kế hoạch được người lập kế hoạch giữ nguyên",
        "Sai số dự báo sản lượng tuần: ngưỡng chốt sau khảo sát",
      ],
      value: "Ngày công lập kế hoạch tiết kiệm × số người × 52 tuần + giờ chuyển đổi giảm × sản lượng mỗi giờ",
      decides: "Bộ phận Kế hoạch sửa và đề xuất; Trưởng phòng Sản xuất duyệt",
      pass: "Trên dữ liệu lịch sử, kế hoạch nháp đáp ứng **100%** ràng buộc và **không kém** kế hoạch đã chạy về sản lượng và giờ chuyển đổi",
    },
  },
  {
    id: "UC2",
    code: "Ứng dụng 2",
    name: "Đo lường hao hụt tự động",
    question: "Ca này hao hụt bao nhiêu kg bột, ở khâu nào, và vì sao?",
    liveFrom: "Đối chiếu với số cân từ T+2 · dùng thật từ T+6",
    sectors: ["dolce-gusto", "nestle-vn"],
    phase: "pilot",
    primary: true,
    card: {
      images: [
        { src: "/decks/nestle-vietnam/uc2-hao-hut-nguyen-lieu.webp", width: 1527, height: 2000, alt: "Minder · Bảng điều khiển Hao hụt nguyên liệu: cân bằng bột từ dữ liệu máy so với sổ ghi ca thủ công", caption: "Minder · Bảng điều khiển Hao hụt nguyên liệu: cân bằng bột từ dữ liệu máy so với sổ ghi ca thủ công" },
      ],
      stage: "Khâu Vận hành",
      opportunity: "Số hao hụt có ở mọi ca, tách theo nguyên nhân, không cần thu gom và ghi chép",
      aiDoes: "Cân bằng bột theo ca và lô từ dữ liệu máy; mô hình chỉ ra ca lệch và nguyên nhân",
      worldModel:
        "Học mức hao hụt và **gram dư trên mỗi viên** bình thường theo SKU, lô bột, độ ẩm phòng và tốc độ vít định lượng. Dự báo hao hụt kỳ vọng của mỗi ca; khi ca thực tế lệch, chỉ ra yếu tố đi kèm (lô bột, độ ẩm, chuyển đổi). Phát hiện xu hướng trôi của định lượng **trước khi** cân kiểm bắt đầu loại viên. Phép cân bằng bột là công thức; mô hình dùng cho phần dự báo và giải thích.",
      needs: [
        "Dữ liệu vít định lượng L1, L2",
        "Cân kiểm viên: khối lượng từng viên, số viên loại",
        "Lượng bột cấp theo lô (SAP, hoặc cân silo, phễu nếu có)",
        "Sự kiện chuyển đổi SKU và vệ sinh",
        "Số liệu hao hụt đã ghi 3–6 tháng gần nhất để đối chiếu",
      ],
      notDo: [
        "Không thay kiểm kê cho mục đích kế toán; vẫn cân đối chiếu định kỳ để hiệu chuẩn",
        "Không đo được bột rơi vãi ở chỗ không có điểm đo",
        "Không tự chỉnh vít định lượng; mọi điều chỉnh do Sản xuất và QA quyết định",
        "Không ảnh hưởng tới khối lượng tịnh đã đăng ký",
      ],
      deliverables: [
        "Bảng cân bằng bột theo ca, tuần và nguyên nhân",
        "Báo cáo gram dư trên mỗi viên theo SKU và dây chuyền",
        "Cảnh báo ca hoặc lô có hao hụt bất thường",
        "Số hao hụt tự điền vào báo cáo ca",
      ],
      kpis: [
        "**≥90%** số ca có số hao hụt tự động",
        "Sai lệch so với cân đối chiếu nằm trong ngưỡng chốt sau khảo sát",
        "**≥80%** hao hụt được gán nguyên nhân",
        "Gram dư trên mỗi viên giảm so với số liệu nền; **0** vi phạm khối lượng tịnh",
      ],
      value: "kg bột tiết kiệm × giá bột mỗi kg + giờ công thu gom và ghi chép tiết kiệm mỗi ca",
      decides: "Bộ phận Sản xuất; QA với mọi điều chỉnh định lượng",
      pass: "**≥90%** số ca có số hao hụt tự động, sai lệch với cân đối chiếu nằm trong ngưỡng đã chốt",
      caveat:
        "Nếu chưa có điểm đo lượng bột cấp vào, giai đoạn đầu chỉ cam kết phần **định lượng dư và viên loại**, vì hai phần này đo trực tiếp được. Khảo sát sẽ xác nhận điểm đo hiện có.",
    },
  },
  {
    id: "UC3",
    code: "Ứng dụng 3",
    name: "Cảnh báo sớm rủi ro môi trường sản xuất",
    question: "Khi nào phòng chiết rót có nguy cơ vượt ngưỡng độ ẩm, và xử lý trước thế nào để không phải dừng chuyền?",
    liveFrom: "Thi trên lịch sử từ T+2 · dùng thật từ T+5",
    sectors: ["dolce-gusto", "tri-an", "nestle-vn"],
    phase: "pilot",
    primary: true,
    card: {
      images: [
        { src: "/decks/nestle-vietnam/uc3-phat-hien-loi.png", width: 1912, height: 934, alt: "Minder · Phát hiện lỗi: học trạng thái bình thường của máy và AHU, cảnh báo sớm trước khi phải dừng chuyền", caption: "Minder · Phát hiện lỗi: học trạng thái bình thường của máy và AHU, cảnh báo sớm trước khi phải dừng chuyền" },
        { src: "/decks/nestle-vietnam/uc3-chi-tiet-canh-bao.webp", width: 2000, height: 1051, alt: "Minder · Chi tiết một cảnh báo: nguyên nhân chính, điểm bất thường so với ngưỡng, giá trị kỳ vọng của mô hình, gợi ý kiểm tra và lần xử lý trước", caption: "Minder · Chi tiết một cảnh báo: nguyên nhân chính, điểm bất thường so với ngưỡng, giá trị kỳ vọng của mô hình, gợi ý kiểm tra và lần xử lý trước" },
      ],
      stage: "Khâu Dự báo trước và Phục hồi",
      opportunity: "Biết sớm để bảo trì chủ động, thay vì dừng chuyền khi đã vượt ngưỡng",
      aiDoes: "Dự báo độ ẩm và trạng thái AHU; cảnh báo sớm; khi vẫn vượt ngưỡng thì truy vết lô và điều chỉnh kế hoạch",
      worldModel:
        "Học cách độ ẩm và nhiệt độ từng vùng **phản ứng** với trạng thái AHU (tốc độ bánh xe hút ẩm, nhiệt độ tái sinh, lưu lượng gió, chênh áp lọc), chiller, thời tiết bên ngoài, tải dây chuyền, các lần mở cửa và vệ sinh. Dự báo độ ẩm vài giờ tới kèm khoảng tin cậy, và dự báo AHU suy giảm theo ngày. **So sánh phương án trước khi làm:** bảo trì AHU trong cửa sổ dừng thứ Năm hay để tới cuối tuần thì rủi ro vượt ngưỡng bao nhiêu. Nói \"chưa đủ dữ liệu\" khi gặp tình huống chưa từng có.",
      needs: [
        "Tín hiệu độ ẩm, nhiệt độ từng vùng và AHU, chiller; tần suất ghi ≥1 phút",
        "Lịch sử 6–12 tháng nếu đã lưu",
        "Nhật ký dừng máy có mã nguyên nhân; hồ sơ các lần dừng vì môi trường",
        "Ngưỡng QA của phòng; lịch bảo trì hệ thống điều hòa không khí",
        "1 đầu mối Bảo trì ~2 giờ/tuần",
      ],
      notDo: [
        "Không điều khiển AHU hay hệ thống quản lý tòa nhà (BMS)",
        "Không đặt hay đổi ngưỡng QA; ngưỡng lấy từ tiêu chuẩn của nhà máy",
        "Không quyết định xuất hay hủy lô",
        "Không thay báo động hiện có",
        "Không cam kết \"không bao giờ dừng chuyền\": hỏng hóc cơ khí vẫn cần Bảo trì xử lý",
      ],
      deliverables: [
        "Màn giám sát môi trường phòng chiết rót và AHU",
        "Mô hình dự báo độ ẩm và phát hiện bất thường đa biến",
        "Quy tắc gửi cảnh báo: ai nhận, kênh nào, checklist nào",
        "Hồ sơ sự cố tự động, nối tới lô và kế hoạch",
        "Báo cáo thi trên lịch sử: báo trước được bao lâu",
      ],
      kpis: [
        "Báo trước **≥2 giờ** cho **≥80%** các lần vượt hoặc tiến sát ngưỡng trong dữ liệu lịch sử",
        "Số cảnh báo sai mỗi tuần không vượt mức Bảo trì chọn",
        "Truy vết đúng lô ở **≥95%** sự cố đã ghi nhận",
        "Giờ dừng vì môi trường: đo trước và sau",
      ],
      value: "Giờ dừng tránh được × sản lượng mỗi giờ × biên đóng góp mỗi hộp + chi phí giữ và xét lô tránh được",
      decides: "Bảo trì và Trưởng ca xử lý cảnh báo; QA quyết định về lô; Trưởng phòng Sản xuất duyệt điều chỉnh kế hoạch",
      pass: "Trên dữ liệu lịch sử, báo trước **≥2 giờ** cho **≥80%** các lần vượt hoặc tiến sát ngưỡng; truy vết đúng lô **≥95%**",
      caveat:
        "Một vài lần dừng chuyền chưa đủ để chứng minh thống kê, nên bài thi dùng **mọi lần độ ẩm vượt hoặc tiến sát ngưỡng**, không chỉ các lần đã dừng. Nếu lịch sử chưa được lưu, cần 4–8 tuần thu thập trước khi chốt chỉ số.",
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
  ["Viên nén", "Dừng ngắn và điểm nghẽn, sẵn sàng sản xuất trước mỗi lượt chạy"],
  ["Túi", "Chuyển đổi định dạng, hao hụt bao bì"],
  ["Kế hoạch chung", "Một lịch cho mọi dây chuyền dùng chung nguồn bột"],
];

/**
 * M18 "detail": `before` là "Bài toán", `after` là "Cách làm với Minder AI".
 * Bài toán viết bằng dữ kiện trung tính về cách làm hiện tại, không nhận định về con người.
 */
export const beforeAfter: Record<string, { before: string; after: string }> = {
  UC0: {
    before:
      "Số liệu sản lượng, dừng máy, hao hụt và môi trường nằm ở nhiều nơi: PLC, cảm biến, bảng tính, sổ ca. Báo cáo ca, ngày và tuần phải tổng hợp và đối chiếu thủ công.",
    after:
      "Minder kết nối chỉ đọc vào các nguồn của L1, L2 và dựng bản đồ dây chuyền. Tác nhân AI tự lập báo cáo cuối mỗi ca, mỗi ngày, mỗi tuần: sản lượng so với kế hoạch, các lần dừng tốn nhiều thời gian nhất, cảnh báo còn mở, việc ca sau cần chú ý, so sánh với ca trước. Trưởng ca bổ sung ghi chú bằng giọng nói tiếng Việt.",
  },
  UC1: {
    before:
      "Mỗi tuần, nhu cầu từ chuỗi cung ứng được chuyển thành kế hoạch theo dây chuyền, giờ chạy, SKU và sản lượng, rồi trình quản lý duyệt. Việc tổng hợp và cân đối hiện mất khoảng 3 ngày công của 1–2 người.",
    after:
      "Minder đọc nhu cầu tuần, tồn kho, vật tư, lịch ca, lịch vệ sinh và bảo trì. Bộ giải tối ưu tạo 2–3 kế hoạch nháp theo **đúng mẫu nhà máy đang dùng**, kèm dự báo kết quả và những thay đổi so với tuần trước. Người lập kế hoạch sửa trực tiếp, Minder kiểm tra lại ràng buộc, Trưởng phòng Sản xuất duyệt.",
  },
  UC2: {
    before:
      "Hao hụt bột cà phê hiện được thu gom, cân và ghi nhận thủ công theo ca. Số liệu phụ thuộc vào việc thu gom và ghi chép, nên khó so sánh giữa các ca và khó biết hao hụt nằm ở khâu nào.",
    after:
      "Minder tính cân bằng bột cho từng ca, từng lô từ dữ liệu máy: bột cấp vào, số viên đạt, viên bị loại ở cân kiểm, khối lượng từng viên, tồn phễu. Hao hụt được tách theo nguyên nhân (định lượng dư, viên loại, xả khi chuyển đổi SKU, vệ sinh, phần chưa giải thích được) và tự điền vào báo cáo ca.",
  },
  UC3: {
    before:
      "Độ ẩm và nhiệt độ phòng chiết rót là điều kiện bắt buộc của sản phẩm. Hệ thống hiện tại báo khi chỉ số đã vượt ngưỡng; lúc đó dây chuyền phải dừng để bảo vệ chất lượng, có thể mất cả ca sản xuất.",
    after:
      "Minder theo dõi độ ẩm, nhiệt độ từng vùng cùng trạng thái AHU, chiller và tải dây chuyền; **cảnh báo sớm** cho Bảo trì và Trưởng ca kèm checklist và lần xử lý tương tự trước đó; đề xuất cửa sổ bảo trì ít ảnh hưởng sản lượng nhất. Nếu vẫn vượt ngưỡng: tự mở hồ sơ sự cố, nối với lô, mẻ, SKU để QA quyết định, tính tác động và chuyển sang Ứng dụng 1 để điều chỉnh kế hoạch.",
  },
};
