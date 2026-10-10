/**
 * Dữ liệu M20 "Minder AI làm việc" của deck Takako (docs/takako-content-v1.md, mục "Dữ liệu module M20").
 * Toàn bộ là minh họa: mã hàng, máy, lệnh, lô, quy tắc, ngưỡng và số liệu không phải dữ liệu của Takako.
 * Người đặt quy tắc ghi theo vai trò, không bao giờ là tên cá nhân.
 */
import type { DeckData, FeedScenario, IllustratedData } from "../types";

export const m20: FeedScenario = {
  product: "Minder AI",
  dayLabel: "Takako · Hôm nay",
  roles: [
    { id: "lanh-dao", label: "Ban lãnh đạo" },
    { id: "ke-toan", label: "Kế toán" },
    { id: "ky-thuat", label: "Kỹ thuật" },
    { id: "san-xuat", label: "Sản xuất" },
  ],
  areaLabels: {
    "san-xuat": "Sản xuất",
    "van-hanh": "Vận hành",
    "ke-toan": "Kế toán",
    "tai-nguyen-ky-thuat": "Tài nguyên kỹ thuật",
  },
  kindLabels: {
    briefing: "Bản tin",
    alert: "Cảnh báo",
    recalc: "Tính lại",
    regulation: "Văn bản mới",
    report: "Báo cáo",
  },
  rules: [
    {
      id: "QT-MAY-01",
      name: "Bản tin buổi sáng về máy",
      owner: "Trưởng phòng Kỹ thuật",
      appliesTo: "Các máy trong phạm vi Giai đoạn 1",
      data: ["MES-IoT: sự cố, dừng máy, cycle time", "MES: bản ghi sửa chữa và bảo trì"],
      method:
        "Liệt kê máy dừng lặp cùng lỗi từ 2 lần trong 6 tháng, máy có cycle time tăng trên 5% trong 2 tuần, máy mất dữ liệu quá 1 ngày",
      format: ["Máy", "Điều cần chú ý", "Lần sửa gần nhất", "Linh kiện đã thay", "Bản ghi gốc"],
      recipients: "Phòng Kỹ thuật, Phòng Sản xuất",
      schedule: "07:30 mỗi ngày làm việc",
    },
    {
      id: "QT-MAY-02",
      name: "Báo cáo bảo trì tuần",
      owner: "Trưởng phòng Kỹ thuật",
      appliesTo: "Các máy trong phạm vi Giai đoạn 1",
      data: ["MES: bản ghi sửa chữa và bảo trì", "MES-IoT: sự cố và dừng máy"],
      method: "Xếp máy cần bảo trì, thay thế, sửa chữa, đặt linh kiện theo mức nghiêm trọng",
      format: ["Máy cần bảo trì", "Thay thế", "Sửa chữa", "Đặt linh kiện"],
      recipients: "Phòng Kỹ thuật",
      schedule: "Thứ Sáu 16:00",
    },
    {
      id: "QT-GT-01",
      name: "Cảnh báo giá thành theo mã hàng",
      owner: "Trưởng phòng Kế toán",
      appliesTo: "Mọi mã hàng đang sản xuất trong tháng",
      data: [
        "ERP: đơn giá vật liệu, đơn giá giờ máy, định mức giá thành",
        "MES-IoT: cycle time, phế phẩm, sản lượng",
        "Kho bản vẽ: vật liệu theo phiên bản hiện hành",
      ],
      method: "Công thức giá thành Phòng Kế toán đã duyệt: vật liệu + giờ máy + nhân công + phế phẩm + chi phí chung",
      threshold: {
        label: "Giá thành thực cao hơn định mức trên",
        options: ["3%", "5%"],
        value: "3%",
      },
      format: ["Kết quả", "Chênh lệch", "Nguyên nhân chính", "Cách tính", "Nguồn"],
      recipients: "Phòng Kế toán; thêm Phòng Kỹ thuật khi nguyên nhân nằm ở sản xuất",
      schedule: "09:00 mỗi ngày làm việc",
    },
    {
      id: "QT-GT-02",
      name: "Tính lại khi kế hoạch thay đổi",
      owner: "Trưởng phòng Kế toán",
      appliesTo: "Kế hoạch sản lượng theo nhóm mã hàng",
      data: ["ERP: kế hoạch sản lượng, đơn giá giờ máy", "MES-IoT: cycle time bình quân 3 tháng, công suất còn trống"],
      method: "Công thức giờ máy và chi phí Phòng Kế toán đã duyệt. Chỉ tính toán, không lập kế hoạch sản xuất",
      threshold: {
        label: "Kế hoạch sản lượng trên ERP thay đổi trên",
        options: ["10%"],
        value: "10%",
      },
      format: ["Thay đổi", "Giờ máy cần thêm", "Công suất còn trống", "Chi phí", "Giả định"],
      recipients: "Phòng Kế toán, Phòng Sản xuất",
      schedule: "Khi kế hoạch trên ERP thay đổi",
    },
    {
      id: "QT-PL-01",
      name: "Văn bản pháp lý mới",
      owner: "Kế toán trưởng",
      appliesTo: "Danh mục văn bản Phòng Kế toán theo dõi",
      data: ["Cơ sở dữ liệu văn bản pháp luật trong danh sách được phép"],
      method: "Tóm tắt điểm liên quan đến quy trình của Takako, trích đúng điều khoản, không diễn giải ngoài văn bản",
      format: ["Văn bản", "Điểm liên quan", "Trích dẫn", "Việc cần xác nhận"],
      recipients: "Phòng Kế toán",
      schedule: "Khi nguồn được phép có văn bản mới",
    },
    {
      id: "QT-BV-01",
      name: "Cảnh báo phiên bản bản vẽ",
      owner: "Trưởng phòng Kỹ thuật",
      appliesTo: "Mã hàng có lệnh sản xuất đang mở",
      data: ["Kho bản vẽ: phiên bản, ngày phát hành, ghi chú thay đổi", "MES: lệnh sản xuất và lô"],
      method: "So phiên bản bản vẽ của từng lệnh với phiên bản hiện hành",
      format: ["Mã hàng", "Phiên bản mới", "Ghi chú thay đổi", "Lệnh và lô liên quan", "Nguồn"],
      recipients: "Phòng Kỹ thuật, Phòng Sản xuất",
      schedule: "Khi kho bản vẽ có phiên bản mới",
    },
    {
      id: "QT-BC-01",
      name: "Báo cáo tuần",
      owner: "Giám đốc nhà máy",
      appliesTo: "Ba ứng dụng trọng tâm của Giai đoạn 1",
      data: ["Các output trong tuần", "Phản hồi của người nhận: Xác nhận · Không đúng · Không cần"],
      method: "Tổng hợp theo mẫu Giám đốc nhà máy đã duyệt",
      format: ["Giá thành", "Máy", "Bản vẽ", "Phản hồi trong tuần"],
      recipients: "Ban lãnh đạo và các phòng",
      schedule: "Thứ Sáu 17:00",
    },
  ],
  items: [
    {
      id: "may-0730",
      time: "07:30",
      kind: "briefing",
      area: "van-hanh",
      roles: ["lanh-dao", "ky-thuat", "san-xuat"],
      ruleId: "QT-MAY-01",
      title: "Bản tin buổi sáng",
      to: "Phòng Kỹ thuật, Phòng Sản xuất",
      summary: "Hôm nay có **3 máy** cần chú ý.",
      fields: [
        {
          k: "MC-07",
          v: "Dừng 3 lần vì lỗi trục chính trong 6 tháng. Lần sửa gần nhất 12/9, đã thay vòng bi trục chính.",
        },
        { k: "MC-04", v: "Cycle time công đoạn OP-20 tăng 6% trong 2 tuần." },
        { k: "MC-12", v: "Không có dữ liệu MES từ 15/9." },
      ],
      gap: "Minder AI không đánh giá được MC-12 vì thiếu dữ liệu từ 15/9. Đề nghị kiểm tra kết nối.",
      sources: ["MES-IoT: sự cố và cycle time 6 tháng", "Bản ghi sửa chữa SC-0912-07, SC-0702-07, SC-0418-07"],
      followUp: {
        q: "Lịch sử sửa chữa MC-07 trong 6 tháng?",
        a: "Ba lần, cả ba đều ở trục chính:\n· **18/4:** lỗi trục chính, thay vòng bi.\n· **2/7:** rung trục chính, cân chỉnh.\n· **12/9:** lỗi trục chính, thay vòng bi trục chính.\nMỗi dòng có liên kết đến bản ghi gốc.",
        sources: ["SC-0418-07", "SC-0702-07", "SC-0912-07"],
      },
    },
    {
      id: "gia-thanh-0900",
      time: "09:00",
      kind: "alert",
      area: "ke-toan",
      roles: ["lanh-dao", "ke-toan", "ky-thuat"],
      ruleId: "QT-GT-01",
      title: "Cảnh báo giá thành",
      to: "Phòng Kế toán, Phòng Kỹ thuật",
      summary: "PT-2041 (piston) vượt định mức giá thành tháng 9. Nguyên nhân chính nằm ở **MC-07**, cùng máy trong bản tin 07:30.",
      fields: [
        { k: "Kết quả", v: "Giá thành thực PT-2041 tháng 9 cao hơn định mức" },
        { k: "Chênh lệch", v: "**+4,1%**, vượt ngưỡng 3%" },
        {
          k: "Nguyên nhân chính",
          v: "Cycle time công đoạn OP-30 trên MC-07 tăng từ 3,6 lên 3,9 phút sau lần dừng 12/9. Phế phẩm tăng từ 1,2% lên 1,8%.",
        },
      ],
      calc: [
        { k: "Vật liệu (theo bản vẽ rev C)", v: "0 điểm %" },
        { k: "Giờ máy", v: "+2,9 điểm %" },
        { k: "Phế phẩm", v: "+0,9 điểm %" },
        { k: "Nhân công", v: "+0,3 điểm %" },
        { k: "Chi phí chung", v: "0 điểm %" },
        { k: "Tổng chênh lệch", v: "+4,1%", total: true },
      ],
      sources: ["Bản vẽ PT-2041 rev C", "MES-IoT tháng 9: cycle time, phế phẩm", "ERP: định mức giá thành, đơn giá giờ máy 2026"],
      followUp: {
        q: "Nếu MC-07 về lại 3,6 phút thì sao?",
        a: "Chênh lệch còn khoảng **1,2%**, dưới ngưỡng 3%. Phần còn lại đến từ phế phẩm và nhân công.",
        sources: ["Cùng công thức của quy tắc QT-GT-01"],
      },
      restricted: [
        {
          role: "ky-thuat",
          hideKeys: ["Kết quả", "Chênh lệch", "calc"],
          text: "Kết quả, chênh lệch và cách tính giá thành chỉ hiện cho Phòng Kế toán.",
        },
        {
          role: "san-xuat",
          hideCard: true,
          text: "Vai trò này không xem được giá thành.",
        },
      ],
      byThreshold: {
        "3%": {
          send: true,
          note: "Ngưỡng 3%: PT-2041 vượt định mức 4,1%, nên Minder AI gửi cảnh báo lúc 09:00.",
        },
        "5%": {
          send: false,
          note: "Ngưỡng 5%: PT-2041 vượt định mức 4,1%, chưa tới ngưỡng Trưởng phòng Kế toán đặt.",
        },
      },
    },
    {
      id: "ban-ve-1100",
      time: "11:00",
      kind: "alert",
      area: "tai-nguyen-ky-thuat",
      roles: ["lanh-dao", "ky-thuat", "san-xuat"],
      ruleId: "QT-BV-01",
      title: "Bản vẽ có phiên bản mới",
      to: "Phòng Kỹ thuật, Phòng Sản xuất",
      summary: "VS-118 (valve spool) phát hành bản vẽ **rev D** lúc 10:40. Hai lệnh sản xuất còn theo rev C.",
      fields: [
        { k: "Mã hàng", v: "VS-118 (valve spool)" },
        { k: "Phiên bản mới", v: "Rev D, phát hành 10:40" },
        { k: "Ghi chú thay đổi", v: "Dung sai đường kính rãnh" },
        {
          k: "Lệnh và lô liên quan",
          v: "LSX-1182 đang chạy trên MC-05, còn 640 chi tiết · LSX-1187 chưa bắt đầu",
        },
      ],
      sources: ["Kho bản vẽ: VS-118 rev C, rev D", "MES: lệnh sản xuất đang mở"],
      followUp: {
        q: "Tháng này đã có lô nào chạy theo rev C?",
        a: "Có 3 lô: **L-0903**, **L-0917**, **L-0928**.",
        sources: ["MES: lô sản xuất trong tháng"],
      },
    },
    {
      id: "ke-hoach-1400",
      time: "14:00",
      kind: "recalc",
      area: "ke-toan",
      roles: ["lanh-dao", "ke-toan", "san-xuat"],
      ruleId: "QT-GT-02",
      title: "Tính lại theo kế hoạch",
      to: "Phòng Kế toán, Phòng Sản xuất",
      summary: "Kế hoạch tháng 11 của nhóm piston tăng **20%** (ERP cập nhật 13:40). Nhóm tiện CNC thiếu khoảng 120 giờ máy.",
      fields: [
        { k: "Giờ máy cần thêm", v: "Khoảng 310 giờ ở nhóm tiện CNC" },
        {
          k: "Công suất còn trống",
          v: "Khoảng 190 giờ, nên thiếu khoảng 120 giờ",
        },
        {
          k: "Chi phí",
          v: "Chi phí biến đổi tăng theo sản lượng; giá thành bình quân mỗi chi tiết giảm khoảng 2% nhờ chia chi phí chung",
        },
        {
          k: "Giả định",
          v: "Cycle time bình quân 3 tháng gần nhất · đơn giá giờ máy 2026 · chưa tính tăng ca",
        },
      ],
      note: "Đây là phép tính theo công thức đã duyệt, không phải kế hoạch sản xuất.",
      sources: ["ERP: kế hoạch sản lượng tháng 11", "MES-IoT: cycle time 3 tháng, công suất nhóm tiện CNC", "ERP: đơn giá giờ máy 2026"],
      restricted: [
        {
          role: "san-xuat",
          hideKeys: ["Chi phí"],
          text: "Phần chi phí chỉ hiện cho Phòng Kế toán.",
        },
      ],
    },
    {
      id: "phap-ly-1600",
      time: "16:00",
      kind: "regulation",
      area: "ke-toan",
      roles: ["lanh-dao", "ke-toan"],
      ruleId: "QT-PL-01",
      title: "Văn bản pháp lý mới",
      to: "Phòng Kế toán",
      summary: "Có văn bản hướng dẫn mới về hóa đơn điện tử trên nguồn được phép. Ba điểm liên quan đến quy trình của Takako.",
      fields: [
        {
          k: "Điểm liên quan",
          v: "Thời điểm lập hóa đơn · Xử lý hóa đơn có sai sót · Lưu trữ",
        },
        { k: "Trích dẫn", v: "Mỗi điểm dẫn đúng điều khoản của văn bản" },
        {
          k: "Việc cần xác nhận",
          v: "Kế toán trưởng xác nhận trước khi áp dụng",
        },
      ],
      sources: ["Cơ sở dữ liệu văn bản pháp luật (danh sách được phép)"],
    },
    {
      id: "bao-cao-tuan",
      time: "Thứ Sáu 17:00",
      kind: "report",
      roles: ["lanh-dao", "ke-toan", "ky-thuat", "san-xuat"],
      ruleId: "QT-BC-01",
      title: "Báo cáo tuần",
      to: "Ban lãnh đạo và các phòng",
      summary: "Tổng hợp tuần: giá thành, máy, bản vẽ và phản hồi của người nhận.",
      fields: [
        { k: "Giá thành", v: "2 mã vượt ngưỡng: PT-2041, RP-305" },
        { k: "Máy", v: "MC-07 cần bảo trì; MC-12 đã có dữ liệu trở lại" },
        { k: "Bản vẽ", v: "VS-118 rev D; 2 lệnh đã chuyển sang rev D" },
        {
          k: "Phản hồi trong tuần",
          v: "14 output: 13 được xác nhận đúng, 1 được đánh dấu không cần",
        },
      ],
      sources: ["Các output trong tuần", "Phản hồi Xác nhận · Không đúng · Không cần"],
      restricted: [
        {
          role: "ky-thuat",
          hideKeys: ["Giá thành"],
          text: "Phần giá thành chỉ hiện cho Phòng Kế toán và Ban lãnh đạo.",
        },
        {
          role: "san-xuat",
          hideKeys: ["Giá thành"],
          text: "Phần giá thành chỉ hiện cho Phòng Kế toán và Ban lãnh đạo.",
        },
      ],
    },
  ],
  coverIds: ["may-0730", "gia-thanh-0900", "ban-ve-1100"],
  ruleDemoId: "gia-thanh-0900",
  copy: {
    sidebar: ["Hôm nay", "Giá thành", "Dữ liệu máy", "Bản vẽ", "Quy tắc"],
    feedTitle: "Hôm nay Minder AI đã gửi",
    sent: "Đã gửi",
    sources: "Nguồn ({n})",
    calc: "Xem cách tính",
    ruleChip: "Theo quy tắc {id} · {owner} đặt",
    confirm: "Xác nhận",
    wrong: "Không đúng",
    notNeeded: "Không cần",
    askMore: "Hỏi thêm",
    confirmed: "Đã xác nhận",
    undo: "Đổi lại",
    roleLabel: "Xem với vai trò",
    ruleTitle: "Quy tắc",
    outputTitle: "Output theo quy tắc này",
    ruleFields: {
      owner: "Người đặt",
      appliesTo: "Áp dụng cho",
      data: "Dữ liệu dùng",
      method: "Cách tính",
      threshold: "Ngưỡng",
      format: "Định dạng",
      recipients: "Người nhận",
      schedule: "Thời điểm",
    },
    thresholdLabel: "Chọn ngưỡng",
    notSent: "Không vượt ngưỡng, Minder AI không gửi cảnh báo.",
    close: "Đóng",
    counter: "Đã xác nhận {n}/{total}",
  },
};

// ───────────── M21: thẻ minh họa và ranh giới bảo mật ─────────────
export const m21: IllustratedData = {
  sets: {
    buoc: {
      arrows: true,
      cards: [
        {
          art: "watch",
          eyebrow: "Bước 1",
          title: "Giám sát liên tục",
          rows: [
            {
              k: "Minder AI làm gì",
              v: "Đọc dữ liệu từ ERP, MES-IoT và kho bản vẽ, liên tục và theo lịch quản lý đặt",
            },
            {
              k: "Ví dụ",
              v: "Cycle time, lịch sử sự cố máy, đơn giá định mức, phiên bản bản vẽ gắn với từng mã hàng",
            },
          ],
        },
        {
          art: "detect",
          eyebrow: "Bước 2",
          title: "Phát hiện biến động",
          rows: [
            {
              k: "Minder AI làm gì",
              v: "Nhận ra thay đổi vượt ngưỡng Takako thiết lập: sự cố máy, giá thành, phiên bản bản vẽ",
            },
            {
              k: "Ví dụ",
              v: "Mã PT-2041 đội chi phí 4,1%, vượt ngưỡng trần 3% do quản lý quy định",
            },
          ],
        },
        {
          art: "compose",
          eyebrow: "Bước 3",
          title: "Tổng hợp nguyên nhân",
          rows: [
            {
              k: "Minder AI làm gì",
              v: "Viết bản tin, cảnh báo, báo cáo theo đúng quy tắc của quản lý phụ trách",
            },
            {
              k: "Ví dụ",
              v: "Báo cáo rõ ràng: Số thực tế · Độ chênh lệch · Nguyên nhân chính · Công thức áp dụng · Link bản ghi gốc",
            },
          ],
        },
        {
          art: "deliver",
          eyebrow: "Bước 4",
          title: "Báo cáo đúng người",
          featured: true,
          rows: [
            {
              k: "Minder AI làm gì",
              v: "Chủ động gửi cảnh báo đến đúng người phụ trách, đúng thời điểm tác nghiệp",
            },
            {
              k: "Người quyết định",
              v: "Quản lý Takako xác nhận và quyết định",
            },
          ],
        },
      ],
    },
    "ba-viec": {
      layout: "rows",
      cards: [
        {
          art: "machine",
          eyebrow: "Sản xuất và Vận hành",
          title: "Trợ lý vận hành sản xuất",
          video: {
            src: "/decks/takako-vietnam/demo-san-xuat.mp4",
            poster: "/decks/takako-vietnam/demo-san-xuat.jpg",
            width: 1920,
            height: 1064,
            title: "Video demo Trợ lý vận hành sản xuất",
          },
          rows: [
            {
              k: "Minder AI tự gửi",
              v: "Bản tin sáng về các máy cần chú ý · Báo cáo bảo trì tuần soạn sẵn",
            },
            {
              k: "Trả lời khi được hỏi",
              v: '"Tình trạng máy MC-07 trong 6 tháng qua?" · "Sản lượng và phế phẩm của mã hàng này tuần trước?"',
            },
            {
              k: "Dữ liệu",
              v: "MES-IoT: sự cố, sửa chữa, bảo trì, cycle time, sản lượng",
            },
          ],
        },
        {
          art: "cost",
          eyebrow: "Kế toán",
          title: "Trợ lý hỗ trợ kế toán",
          video: {
            src: "/decks/takako-vietnam/demo-ke-toan.mp4",
            poster: "/decks/takako-vietnam/demo-ke-toan.jpg",
            width: 1920,
            height: 1064,
            title: "Video demo Trợ lý hỗ trợ kế toán",
          },
          rows: [
            {
              k: "Minder AI tự gửi",
              v: "Cảnh báo mã hàng vượt định mức kèm nguyên nhân và cách tính · Tính lại giờ máy và chi phí khi kế hoạch sản lượng thay đổi · Báo cáo giá thành tháng soạn sẵn · Tóm tắt văn bản pháp lý mới từ nguồn được phép",
            },
            {
              k: "Trả lời khi được hỏi",
              v: '"Giá thành thực của mã hàng này tháng 9?" · "Nếu sản lượng tăng 20% thì giờ máy và chi phí thay đổi thế nào?"',
            },
            {
              k: "Dữ liệu",
              v: "ERP, MES-IoT, kho bản vẽ, nguồn pháp lý được phép",
            },
          ],
        },
        {
          art: "drawing",
          eyebrow: "Tài nguyên kỹ thuật",
          title: "Trợ lý quản lý bản vẽ kỹ thuật",
          video: {
            src: "/decks/takako-vietnam/demo-ban-ve.mp4",
            poster: "/decks/takako-vietnam/demo-ban-ve.jpg",
            width: 1670,
            height: 924,
            title: "Video demo Trợ lý quản lý bản vẽ kỹ thuật",
          },
          rows: [
            {
              k: "Minder AI tự gửi",
              v: "Cảnh báo khi bản vẽ có phiên bản mới mà lệnh hoặc lô còn chạy theo phiên bản cũ",
            },
            {
              k: "Trả lời khi được hỏi",
              v: '"Bản vẽ hiện hành của mã hàng này là phiên bản nào?" · "Lô nào đã chạy theo phiên bản cũ?"',
            },
            { k: "Dữ liệu", v: "Kho bản vẽ, lệnh sản xuất" },
          ],
        },
      ],
    },
  },
  kpi: {
    quality: {
      tier: {
        label: "Tầng 1",
        name: "Khung KPI nghiệm thu pilot (Giai đoạn 1)",
        when: "Nghiệm thu tại Tuần 6",
        fee: "Điều kiện giải ngân phí Pilot",
        sub: "Takako phê duyệt để kích hoạt Giai đoạn tiếp theo",
      },
      items: [
        { name: "Thời gian truy xuất tình trạng máy", target: "Rút ngắn từ ~30 phút xuống **dưới 2 phút**." },
        { name: "Độ chính xác nghiệp vụ", target: "**≥ 90%** (hoặc ngưỡng thống nhất cùng Takako, do chính người dùng thẩm định)." },
        { name: "Minh bạch nguồn gốc dữ liệu", target: "**100%** kết quả có trích dẫn bản ghi gốc và công thức tính." },
        {
          name: "Thời gian lập báo cáo bảo trì định kỳ",
          target: "Giảm thiểu đáng kể thời gian tổng hợp (thống nhất mục tiêu cụ thể cùng Takako).",
        },
        {
          name: "Mức độ chấp nhận & sử dụng thực tế",
          target: "Đo lường tần suất đọc báo cáo, mức độ tương tác và câu hỏi truy vấn hàng tuần.",
        },
      ],
    },
    impact: {
      tier: {
        label: "Tầng 2",
        name: "Tác động lên quy trình và kinh doanh",
        sub: "Mỗi trợ lý một chuỗi, đo trong pilot; mục tiêu và phí gắn từ Giai đoạn 2",
      },
      lanes: [
        {
          icon: "production",
          app: "Trợ lý vận hành sản xuất",
          items: [
            { text: "Phát hiện bất thường của máy trước ca làm việc kế tiếp, qua bản tin sáng" },
            { text: "Cảnh báo máy có hành động tiếp theo trong 48 giờ" },
          ],
          outcome: "Giảm giờ dừng máy ngoài kế hoạch trên nhóm máy Minder AI theo dõi",
        },
        {
          icon: "accounting",
          app: "Trợ lý hỗ trợ kế toán",
          items: [
            { text: "Phát hiện mã hàng vượt định mức ngay trong tuần phát sinh, không chờ chốt sổ cuối tháng" },
            { text: "Tính lại giờ máy và chi phí trong ngày kế hoạch thay đổi", time: true },
            { text: "Rút ngắn số ngày chốt báo cáo giá thành tháng", time: true },
          ],
          outcome: "Tăng giá trị chênh lệch giá thành được phát hiện trước khi chốt sổ",
        },
        {
          icon: "engineering",
          app: "Trợ lý quản lý bản vẽ kỹ thuật",
          items: [
            { text: "Phát hiện lệnh, lô dùng phiên bản bản vẽ cũ trước khi gia công" },
            { text: "Rút ngắn thời gian xác nhận phiên bản bản vẽ hiện hành", time: true },
          ],
          outcome: "Giảm phế phẩm và làm lại do sai phiên bản bản vẽ",
        },
      ],
      shared: {
        name: "Thời gian hoàn thiện báo cáo và câu trả lời nghiệp vụ",
        target: "Trung vị theo từng loại, kèm tỷ lệ báo cáo đúng hạn",
        sub: "Cộng dồn các KPI có dấu đồng hồ ở cả ba trợ lý; đo tự động từ mốc thời gian, không cần tự khai giờ làm",
        tag: "Cộng vào thời gian hoàn thiện",
      },
    },
  },
  demos: {
    gd2: [
      {
        title: "Theo dõi dây chuyền sản xuất theo thời gian thực",
        sub: "Mô hình 3D hai nhà máy, trạng thái từng máy cập nhật trực tiếp (dữ liệu mô phỏng)",
        video: {
          src: "/decks/takako-vietnam/gd2-theo-doi-day-chuyen.mp4",
          poster: "/decks/takako-vietnam/gd2-theo-doi-day-chuyen.jpg",
          width: 1280,
          height: 616,
          title: "Theo dõi dây chuyền sản xuất theo thời gian thực",
        },
      },
      {
        title: "Tạo lịch tự động (báo cáo, đối soát…)",
        sub: "Đặt lịch để Minder AI tự soạn và gửi báo cáo, đối soát định kỳ",
        video: {
          src: "/decks/takako-vietnam/gd2-tao-lich-tu-dong.mp4",
          poster: "/decks/takako-vietnam/gd2-tao-lich-tu-dong.jpg",
          width: 1280,
          height: 616,
          title: "Tạo lịch tự động (báo cáo, đối soát…)",
        },
      },
      {
        title: "Phát hiện và dự báo điểm bất thường",
        sub: "Chấm điểm bất thường cho từng thiết bị, chỉ ra nguyên nhân chính và cảnh báo trước khi vượt ngưỡng",
        photo: {
          src: "/decks/takako-vietnam/gd2-phat-hien-bat-thuong.jpg",
          alt: "Minder AI phát hiện dòng servo tay kẹp trên robot RB-512 lệch khỏi vận hành bình thường: điểm bất thường so với ngưỡng và nguyên nhân chính",
          width: 1920,
          height: 924,
        },
      },
    ],
  },
  gallery: {
    "quy-tac": [
      {
        label: "Sản xuất và Vận hành",
        sub: "Kế hoạch sản lượng & công suất",
        photo: {
          src: "/decks/takako-vietnam/quy-tac-ke-hoach-san-luong.webp",
          alt: "Quy tắc Kế hoạch sản lượng và công suất trong Minder AI: dự báo đơn hàng so với công suất nhóm máy và chi phí phương án",
          width: 2000,
          height: 1119,
          caption: "Quy tắc **Kế hoạch sản lượng & công suất**: dự báo ERP × quy trình theo rev bản vẽ hiện hành × dừng máy MES.",
        },
      },
      {
        label: "Kế toán",
        sub: "Nghiệp vụ kế toán (nguồn whitelist)",
        photo: {
          src: "/decks/takako-vietnam/quy-tac-nghiep-vu-ke-toan.webp",
          alt: "Quy tắc Nghiệp vụ kế toán (nguồn whitelist) trong Minder AI: tên, mô tả ngắn, thông tin chi tiết và nội dung hướng dẫn",
          width: 2000,
          height: 1119,
          caption:
            "Quy tắc **Nghiệp vụ kế toán (nguồn whitelist)**: chỉ dùng tài liệu đã duyệt, không dùng internet; tra quy chế và thông tư có trích dẫn.",
        },
      },
      {
        label: "Tài nguyên kỹ thuật",
        sub: "Bản vẽ & revision",
        photo: {
          src: "/decks/takako-vietnam/quy-tac-ban-ve-revision.webp",
          alt: "Quy tắc Bản vẽ và revision trong Minder AI: rev hiện hành, ECN và lệnh sản xuất dùng bản vẽ cũ",
          width: 2000,
          height: 1119,
          caption:
            "Quy tắc **Bản vẽ & revision**: kho bản vẽ × MES (lệnh sản xuất, quy trình); rev hiện hành, ECN và lệnh còn dùng bản vẽ cũ.",
        },
      },
    ],
  },
  architecture: {
    sourcesTitle: "Hệ thống của Takako",
    sources: [
      {
        icon: "machine",
        name: "MES-IoT",
        sub: "máy, sản lượng, cycle time, sửa chữa, bảo trì",
      },
      {
        icon: "ledger",
        name: "Tài liệu kế toán",
        sub: "đơn giá, chi phí, định mức",
      },
      {
        icon: "drawing",
        name: "Kho bản vẽ",
        sub: "mã hàng, phiên bản, ghi chú thay đổi",
      },
      {
        icon: "law",
        name: "Nguồn bên ngoài được phép",
        sub: "văn bản pháp luật theo danh sách được phép",
      },
    ],
    via: "Chỉ đọc",
    core: {
      name: "Minder AI",
      sub: "Trợ lý vận hành chủ động",
      steps: ["Giám sát liên tục", "Phát hiện biến động", "Tổng hợp nguyên nhân", "Báo cáo đúng người"],
      key: "Xâu chuỗi dữ liệu theo mã hàng",
    },
    rule: {
      name: "Quy tắc do Quản lý phê duyệt",
      sub: "Vận hành tuyệt đối theo quy tắc. Không tự suy diễn, không tự đổi ngưỡng hay công thức",
      fields: ["Dữ liệu dùng", "Cách tính", "Ngưỡng", "Định dạng", "Người nhận", "Thời điểm"],
    },
    out: "Kèm nguồn",
    usersTitle: "Quản lý theo vai trò",
    users: [
      {
        icon: "production",
        name: "Sản xuất",
        sub: "sản lượng, giờ máy, lệnh theo rev",
      },
      {
        icon: "leadership",
        name: "Ban lãnh đạo",
        sub: "báo cáo tuần, KPI ở mỗi cổng",
      },
      {
        icon: "engineering",
        name: "Kỹ thuật",
        sub: "tình trạng máy, bản vẽ, phiên bản",
      },
      {
        icon: "accounting",
        name: "Kế toán",
        sub: "giá thành, chi phí, văn bản pháp lý",
      },
    ],
  },
  security: {
    boundary: "Theo quy tắc và phân quyền Takako duyệt",
    systems: [
      { name: "MES-IoT", sub: "máy, sản lượng, sửa chữa, bảo trì" },
      { name: "Tài liệu kế toán", sub: "đơn giá, chi phí, định mức" },
      { name: "Kho bản vẽ", sub: "mã hàng, phiên bản" },
    ],
    via: "Chỉ đọc",
    core: {
      name: "Minder AI",
      sub: "Mô hình AI qua API; chuyển dần sang Mô hình AI \"Newcomen\" từ Giai đoạn 2",
    },
    inside: [
      {
        name: "Quản lý theo vai trò",
        sub: "mỗi người chỉ thấy thông tin đúng vai trò",
      },
      { name: "Nhật ký", sub: "mọi truy vấn, mọi output, mọi lần sửa quy tắc" },
    ],
    allowed: {
      name: "Nguồn được phép",
      sub: "chỉ danh sách Takako duyệt, ví dụ văn bản pháp luật",
    },
    caption: "Minder AI chỉ đọc dữ liệu Takako cho phép, theo quy tắc và phân quyền Takako duyệt; mọi truy vấn được ghi nhật ký. Kết nối tới nguồn bên ngoài chỉ theo danh sách được phép.",
  },
};

// ───────────── M15: ba giai đoạn ─────────────
export const roadmap: NonNullable<DeckData["scenarios"]["roadmap"]> = {
  phases: [
    {
      id: "gd1",
      n: "01",
      name: "Ba ứng dụng trọng tâm",
      months: "Pilot 6 tuần",
      span: 2,
      goal: "Minder AI nhận ba ứng dụng trọng tâm: vận hành sản xuất, hỗ trợ kế toán, quản lý bản vẽ kỹ thuật; đo KPI trên công việc thật. Tự học",
      apps: [
        { name: "Trợ lý vận hành sản xuất", when: "Output đầu tiên tuần 2" },
        { name: "Trợ lý hỗ trợ kế toán", when: "Output đầu tiên tuần 2" },
        {
          name: "Trợ lý quản lý bản vẽ kỹ thuật",
          when: "Output đầu tiên tuần 2",
        },
      ],
      gates: [
        {
          name: "Giai đoạn 1",
          when: "Tuần 6",
          pass: "Takako chấm năm KPI pilot: thời gian trả lời, độ chính xác, dẫn nguồn, thời gian làm báo cáo, mức sử dụng",
        },
      ],
      ops: { celesnity: 80, partner: 20 },
      opsNote: "Kỹ sư Celesnity vận hành tại nhà máy; quản lý Takako đặt quy tắc",
      team: { celesnity: "~2 người", partnerTeam: "Đầu mối 3 phòng" },
      people: { celesnity: 2, partnerTeam: 3 },
      outcomes: ["Ba ứng dụng trọng tâm chạy thật", "Số nền và kết quả năm KPI pilot ở tuần 6", "Bộ quy tắc của quản lý Takako"],
    },
    {
      id: "gd2",
      n: "02",
      name: "Mở rộng ứng dụng",
      months: "Sau Giai đoạn 1",
      span: 3,
      goal: "Nhận thêm các ứng dụng Takako đã nêu, từ báo cáo điều đã xảy ra sang cảnh báo điều sắp xảy ra. Dự báo trước",
      apps: [
        {
          name: "Trợ lý bảo trì đầy đủ · truy vết mã hàng · kiểm tra bản vẽ",
          when: "Đợt 2a · dữ liệu đã sẵn sàng",
        },
        {
          name: "Gợi ý quy trình từ mã hàng tương tự · bảo trì dự đoán",
          when: "Đợt 2b · cảnh báo trước",
        },
        {
          name: "Tối ưu chương trình gia công · đôn đốc tiến độ",
          when: "Đợt 2c · tối ưu",
        },
      ],
      gates: [
        {
          name: "Giai đoạn 2",
          when: "Cuối mỗi đợt",
          pass: "Mỗi ứng dụng đạt KPI riêng; Takako chọn ứng dụng tiếp theo",
        },
      ],
      ops: { celesnity: 50, partner: 50 },
      opsNote: "Hai bên cùng vận hành; đội Takako tự đặt quy tắc cho ứng dụng mới",
      team: { celesnity: "~3 người", partnerTeam: "Đầu mối mỗi ứng dụng" },
      people: { celesnity: 3, partnerTeam: 4 },
      outcomes: ["Ứng dụng mới trên cùng nền tảng", "Chuyển dần sang Mô hình AI \"Newcomen\" của Celesnity", "Đội Takako tự đặt quy tắc"],
    },
    {
      id: "gd3",
      n: "03",
      name: "Nhà máy thứ hai",
      months: "Sau Giai đoạn 2",
      span: 2,
      goal: "Minder AI và các phần việc đã chứng minh chạy tại nhà máy thứ hai. Nhân rộng",
      apps: [
        {
          name: "Các phần việc đã đạt KPI ở nhà máy thứ nhất",
          when: "Takako chọn thứ tự",
        },
        {
          name: "Lớp kết nối dữ liệu, quy tắc, cách đo KPI",
          when: "Dùng lại từ nhà máy thứ nhất",
        },
      ],
      gates: [],
      ops: null,
      opsNote: "Takako dẫn dắt · Celesnity hỗ trợ",
      team: { celesnity: "Hỗ trợ", partnerTeam: "Dẫn dắt" },
      outcomes: ["Hai nhà máy dùng chung quy tắc và cách đo", "Triển khai nhanh hơn nhà máy thứ nhất"],
      lead: true,
    },
  ],
  phaseEndMonth: { gd1: 3, gd2: 5, gd3: 6 },
  noGateNote: "Takako quyết định phạm vi và thứ tự cho nhà máy thứ hai",
};

// ───────────── M16: nhân sự theo giai đoạn ─────────────
export const staffing: NonNullable<DeckData["scenarios"]["staffing"]> = {
  phases: [
    { name: "Ba ứng dụng trọng tâm", months: "Pilot 6 tuần" },
    { name: "Mở rộng ứng dụng", months: "Sau Giai đoạn 1" },
    { name: "Nhà máy thứ hai", months: "Sau Giai đoạn 2" },
  ],
  rows: [
    {
      team: "Celesnity",
      tone: "blue",
      cells: [
        {
          count: 2,
          approx: true,
          roles: ["Kỹ sư thực địa (FDE) tại nhà máy 1", "Kỹ sư AI 1"],
        },
        {
          count: 3,
          approx: true,
          roles: ["FDE 1", "Kỹ sư AI 1", "+ Kỹ sư dữ liệu 1"],
        },
        {
          count: 3,
          approx: true,
          roles: ["FDE tại nhà máy thứ hai 2", "Kỹ sư AI 1"],
        },
      ],
    },
    {
      team: "IT Takako",
      note: "Quyền truy cập và kết nối",
      tone: "orange",
      cells: [
        { count: 1, roles: ["Cấp quyền chỉ đọc", "Mở kết nối dữ liệu"] },
        { count: 1, roles: ["Như cũ"] },
        { count: 1, roles: ["+ Kết nối nhà máy thứ hai"] },
      ],
    },
    {
      team: "Quản lý và đầu mối nghiệp vụ Takako",
      tone: "orange",
      cells: [
        {
          count: null,
          roles: ["Sản xuất, Kỹ thuật, Kế toán ~2 giờ/tuần mỗi đầu mối", "Quản lý đặt quy tắc ở tuần 1"],
        },
        { count: null, roles: ["Như cũ", "+ Đầu mối của mỗi ứng dụng mới"] },
        { count: null, roles: ["Đầu mối nhà máy thứ hai"] },
      ],
    },
  ],
  leaders: {
    team: "Ban lãnh đạo Takako",
    text: "Duyệt ở mỗi giai đoạn, xem báo cáo tuần",
  },
};
