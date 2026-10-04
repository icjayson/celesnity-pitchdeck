/**
 * Câu chữ của deck Nestlé Trị An (/nestle-vietnam), chuyển từ docs/nestle-content-v2.md.
 * Không viết cứng câu chữ trong component; sửa ở đây rồi chạy `npm run content:check`.
 */
import type { Act, AppendixSection, BenefitSide, Closing, CostShiftRow, DeckLabels, PackagePart, Section } from "../types";

export const meta = {
  title: "Nhà máy siêu thông minh · Nestlé Trị An × Celesnity",
  description: "Đề xuất hợp tác, Thử nghiệm và lộ trình use case. Tài liệu thảo luận, tháng 10/2026.",
  tagline: "Tự học · Dự báo trước · Nhân rộng",
  footer: "NHÀ MÁY SIÊU THÔNG MINH · Nestlé Trị An × Celesnity · Tài liệu thảo luận",
};

export const acts: Act[] = [
  { n: 1, label: "I.", title: "Một kỷ nguyên mới" },
  { n: 2, label: "II.", title: "Nhà máy siêu thông minh" },
  { n: 3, label: "III.", title: "Lộ trình: từ một dây chuyền đến Nestlé Việt Nam" },
];

export const labels: DeckLabels = {
  sim: "Mô phỏng minh họa — mô hình thật được huấn luyện trong thử nghiệm",
  simShort: "Mô phỏng minh họa",
  ai: "AI thật",
  future: "Hình dung tương lai",
  proposal: "Hướng đề xuất",
  calculatorPrivacy: "Nhập số của Quý vị. Tính toán chạy ngay trên trình duyệt, không lưu, không gửi đi.",
  chatNotice:
    "Trợ lý chỉ trả lời về đề xuất này. Câu hỏi được xử lý bởi dịch vụ AI quốc tế; vui lòng không nhập dữ liệu nội bộ.",
  details: "Xem chi tiết",
  hideDetails: "Thu gọn",
};

const PHOTO_CREDIT = "Ảnh: Nestlé Việt Nam";

export const sections: Section[] = [
  // ───────────────────────────── MỞ ĐẦU ─────────────────────────────
  {
    id: "mo-dau",
    act: 0,
    theme: "dark",
    layout: "hero",
    cover: "/decks/nestle-vietnam/van-hanh-day-chuyen.jpg",
    coverSoft: true,
    eyebrow: "Nestlé Trị An × Celesnity",
    title: "NHÀ MÁY\nSIÊU THÔNG MINH",
    blocks: [
      { kind: "lead", text: "Một vòng quyết định khép kín cho nhà máy cà phê Trị An" },
      { kind: "p", text: "**Tự học · Dự báo trước · Nhân rộng**" },
      { kind: "note", text: "Đề xuất hợp tác, Thử nghiệm và lộ trình use case · Tài liệu thảo luận" },
    ],
  },

  // ───────────────────────────── HỒI 1 ─────────────────────────────
  {
    id: "tu-chu",
    act: 1,
    theme: "mist",
    eyebrow: "Trị An hôm nay",
    title: "Trị An là một trong những nhà máy chế biến cà phê có quy mô và công nghệ hiện đại nhất của Nestlé trong khu vực",
    blocks: [
      {
        kind: "flow",
        steps: ["Cà phê nhân", "Rang và chiết xuất", "Sấy", "Chiết rót và đóng gói", "Kiểm tra", "Xuất khẩu"],
      },
      {
        kind: "list",
        items: [
          "**Danh mục:** NESCAFÉ, NESCAFÉ Dolce Gusto, Nespresso, Starbucks, Blue Bottle.",
          "**Đầu tư:** hơn 500 triệu USD từ năm 2011, trong đó 100 triệu USD bổ sung năm 2024.",
          "**Xuất khẩu:** hơn 29 quốc gia.",
          "**Jar Line mới (8/2026):** công suất ban đầu hơn 350.000 hũ/ngày cho 11 thị trường xuất khẩu; cảm biến và camera thời gian thực; kiểm tra thủy tinh trước chiết rót, dò kim loại, hàn màng cảm ứng, X-ray cuối chuyền.",
          "**Tập đoàn:** cà phê là một trong bốn mảng chiến lược của Nestlé (2/2026); hệ thống sản xuất chung đã phủ gần 90% trong 335 nhà máy.",
        ],
      },
      {
        kind: "photo",
        photo: {
          src: "/decks/nestle-vietnam/jar-line.jpg",
          alt: "Hũ NESCAFÉ Gold trên băng tải của Jar Line",
          width: 1500,
          height: 1000,
          ratio: "21/9",
          caption: "Jar Line mới tại Trị An, vận hành chính thức từ tháng 8/2026",
          credit: PHOTO_CREDIT,
        },
      },
      { kind: "quote", emphasis: true, text: "Máy móc và dữ liệu đã có.\nBước tiếp theo: **nối các quyết định của nhà máy thành một vòng**." },
    ],
  },
  {
    id: "ky-nguyen",
    act: 1,
    theme: "light",
    eyebrow: "Kỷ nguyên tiếp theo của sản xuất",
    title: "Thế hệ AI tiếp theo là AI hiểu và tương tác với thế giới vật lý",
    blocks: [
      { kind: "module", id: "M2" },
      {
        kind: "statement",
        context: "Các tập đoàn công nghệ lớn đều đang dồn sức vào AI cho thế giới vật lý (ví dụ NVIDIA Cosmos, Meta V-JEPA 2).",
        highlight: "Mô hình cho một nhà máy cụ thể không mua sẵn được. Nó phải học từ **kinh nghiệm vận hành thực tế** của chính nhà máy đó.",
        conclusion: "Nhà máy có dữ liệu quyết định vận hành tốt nhất sẽ là nơi mô hình học nhanh nhất.",
      },
    ],
    details: [
      {
        title: "Bảng ba làn sóng",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Làn sóng", "AI làm được gì", "Ai nắm lợi thế"],
            rows: [
              ["**Tự động hóa**", "Lặp lại một thao tác đã lập trình", "Ai có máy móc"],
              ["**AI ngôn ngữ** (ChatGPT, trợ lý ảo)", "Đọc, viết, trả lời câu hỏi", "Ai có mô hình ngôn ngữ; nay đang phổ biến và rẻ dần"],
              [
                "**Mô hình AI Thế giới thực** *(World Model)*",
                "**Hiểu một hệ thống vật lý phản ứng thế nào với quyết định, và dự báo trước**",
                "**Ai có dữ liệu quyết định vận hành thật**",
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hai-con-duong",
    act: 1,
    theme: "mist",
    eyebrow: "Câu hỏi chiến lược",
    title: "Khi dây chuyền đã hiện đại nhất, lợi thế tiếp theo nằm ở đâu?",
    blocks: [
      { kind: "module", id: "M3", variant: "loop" },
      {
        kind: "quote",
        text: "Celesnity không thay thế hệ thống nào. **Mô hình đọc từ các hệ thống Trị An đang có và trả lời những câu hỏi nằm giữa chúng:** sự việc này ảnh hưởng gì đến kế hoạch, và nên làm gì tiếp.",
      },
    ],
    details: [
      {
        title: "Bảng hai con đường",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Con đường A: Thêm từng công cụ AI**", "**Con đường B: Một vòng quyết định khép kín**"],
            rows: [
              [
                "**Phạm vi**",
                "Một công cụ cho kế hoạch, một cho cảnh báo môi trường, một cho chiết rót",
                "**Kế hoạch, môi trường, chất lượng, chiết rót, đóng gói trong một trạng thái chung**",
              ],
              [
                "**Khi có sự cố**",
                "\"Độ ẩm vượt 65%\"",
                "**\"Lô P102 cần QA xem xét; mục tiêu ngày thiếu 31.400 viên; có 4 phương án phục hồi\"**",
              ],
              ["**Kinh nghiệm**", "Nằm rải rác trong từng công cụ và từng người", "**Tích lũy thành một mô hình của nhà máy**"],
              ["**Theo thời gian**", "Mỗi công cụ cần chỉnh riêng", "**Mỗi lần chạy, mô hình học thêm**"],
              ["**Khi mở dây chuyền mới**", "Thêm công cụ, tích hợp lại", "**Mang bản đồ trạng thái và kinh nghiệm sang, rồi học tiếp**"],
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────── HỒI 2 ─────────────────────────────
  {
    id: "sieu-thong-minh",
    act: 2,
    theme: "dark",
    layout: "wide",
    eyebrow: "Nhà máy siêu thông minh là gì",
    title: "Một nhà máy tự học, dự báo trước, và nhân rộng kinh nghiệm",
    blocks: [
      { kind: "module", id: "M1", variant: "story" },
      {
        kind: "table",
        printOnly: true,
        head: ["Thuộc tính", "Nghĩa là", "Ví dụ"],
        rows: [
          [
            "**1. Tự học**",
            "Mỗi kế hoạch, sai lệch và cách xử lý tự trở thành dữ liệu; **mỗi tháng thông minh hơn**",
            "Thời gian chuyển đổi thực tế của từng cặp SKU được cập nhật sau mỗi lần chạy",
          ],
          [
            "**2. Dự báo trước**",
            "Dự báo hệ quả của một quyết định **trước khi** thực hiện, kèm mức độ chắc chắn",
            "Dời lần chuyển đổi 2 giờ thì đơn hàng nào bị ảnh hưởng?",
          ],
          [
            "**3. Nhân rộng**",
            "**Kinh nghiệm của một dây chuyền được mang sang dây chuyền và nhà máy khác**, không phụ thuộc vào một người hay một nơi",
            "Cách truy vết sự cố độ ẩm ở Dolce Gusto làm điểm xuất phát cho các dòng bột khác",
          ],
        ],
      },
      {
        kind: "p",
        text: "Giống **buồng mô phỏng bay**: phi công tập thao tác trước khi bay thật. Mô hình không vận hành dây chuyền; nó giúp người vận hành so sánh trước khi cam kết. **Con người luôn là người quyết định.**",
      },
      { kind: "h3", text: "Khác biệt không nằm ở việc có thêm AI, mà ở chỗ **AI là chính quy trình**." },
      {
        kind: "compare",
        head: ["", "Nhà máy thông minh *(ứng dụng AI và tự động hóa)*", "**Nhà máy siêu thông minh** *(ứng dụng Mô hình AI Thế giới thực)*"],
        rows: [
          ["**AI ở đâu**", "Một công cụ, con người mở ra khi cần", "**Nằm ngay trong quy trình**: AI lập báo cáo ca, truy vết sự cố, soạn phương án"],
          ["**Dữ liệu**", "Cảm biến và dashboard", "Mọi kế hoạch, quyết định và kết quả **tự trở thành dữ liệu học**"],
          ["**Biết được gì**", "Điều gì **đã** xảy ra", "Điều gì **sẽ** xảy ra nếu chọn phương án A hay B"],
          ["**Theo thời gian**", "Quy tắc đứng yên, phải sửa bằng tay", "**Mỗi tháng thông minh hơn**"],
          ["**Khi mở dây chuyền mới**", "Bắt đầu lại từ đầu", "**Mang kinh nghiệm cũ sang**, rồi học tiếp"],
          ["**Con người**", "Đi tìm dữ liệu, tổng hợp báo cáo", "Chỉ làm phần cần phán đoán và phê duyệt"],
        ],
      },
    ],
  },
  {
    id: "ba-lop",
    act: 2,
    theme: "light",
    eyebrow: "Ba lớp của Nhà máy siêu thông minh",
    title: "Nền tảng ghi lại, Mô hình AI Thế giới thực dự báo, Tác nhân AI hành động; con người phê duyệt",
    blocks: [
      { kind: "module", id: "M7" },
      {
        kind: "p",
        wide: true,
        text: "**Vòng lặp cải thiện:** quyết định đã duyệt và kết quả thực tế quay lại lớp ①, mô hình học tiếp.",
      },
      {
        kind: "p",
        wide: true,
        text: "**Điều chỉ Mô hình AI Thế giới thực làm được:** máy móc ghi lại điều đã xảy ra. Nền tảng dữ liệu nối thêm toàn bộ trạng thái sản xuất: nhu cầu → lệnh sản xuất → SKU và công thức → dây chuyền và máy → lô bột, lô vỏ viên nang, lô hộp → môi trường phòng kiểm soát → kết quả chất lượng → sản lượng → đơn hàng. Nền tảng cũng ghi lại **ai quyết định gì, vì sao, và điều gì xảy ra sau đó**. Học từ hàng nghìn chuỗi \"quyết định → hệ quả\", mô hình hiểu được **hệ quả**, không chỉ thấy **tương quan**.",
      },
      { kind: "p", text: "**Mô hình AI Thế giới thực không phải là:**" },
      {
        kind: "chips",
        tone: "negative",
        items: ["Chatbot", "Dashboard hay mô hình 3D", "Hệ thống thay thế MES, SAP hay SCADA", "Hệ thống tự điều khiển thiết bị"],
      },
    ],
    details: [
      {
        title: "Bảng ba lớp",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Lớp", "Vai trò", "Làm gì"],
            rows: [
              [
                "**③ Tác nhân AI**: \"người trợ lý làm việc\"",
                "Hành động",
                "Năm tác nhân: Lập kế hoạch, Điều hành ca, Chất lượng và Môi trường, Tổn thất và Sản lượng, Phục hồi. **Mọi đề xuất đều được mô hình kiểm tra hệ quả trước**",
              ],
              [
                "**② Mô hình AI Thế giới thực**: \"bộ não hiểu nhà máy\"",
                "Dự báo",
                "Học cách dây chuyền phản ứng với quyết định và sự cố; dự báo kèm mức độ chắc chắn; nói \"không biết\" khi gặp tình huống chưa từng thấy",
              ],
              [
                "**① Nền tảng dữ liệu tập trung**: \"trí nhớ của nhà máy\"",
                "Ghi lại",
                "Đọc chỉ đọc từ MES, historian, ERP, QMS, bảo trì · đồng bộ mã lô, mã máy, thời gian · ghi nhận ca bằng giọng nói tiếng Việt · lưu mọi quyết định",
              ],
              [
                "**Con người có thẩm quyền**",
                "Quyết định",
                "Duyệt kế hoạch, phương án phục hồi, quyết định chất lượng và mọi thay đổi vận hành",
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mot-ngay",
    act: 2,
    theme: "navy",
    layout: "wide",
    eyebrow: "Một ngày trong Nhà máy siêu thông minh",
    title: "Cùng một bộ não, từ một dây chuyền đến mọi nhà máy Nestlé Việt Nam",
    blocks: [
      { kind: "label", variant: "future", text: "Hình dung tương lai, minh họa cách hệ thống làm việc." },
      { kind: "module", id: "M5" },
    ],
    details: [
      {
        title: "Toàn bộ một ngày",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Giờ", "Nơi", "Điều xảy ra"],
            rows: [
              [
                "**06:00**",
                "**Dây chuyền NESCAFÉ Dolce Gusto, Trị An**",
                "Kiểm tra sẵn sàng trước ca: công thức, lô bột, lô vỏ viên nang, lô hộp, QA release, vệ sinh. Một lô hộp chưa nhận kho được đánh dấu trước khi chạy. Trưởng ca xử lý",
              ],
              [
                "**09:30**",
                "**Jar Line, Trị An**",
                "Jar Line tăng tốc theo kế hoạch. Mô hình dự báo điểm nghẽn chuyển sang khâu cấp bột sau 3 giờ và đề xuất điều chỉnh. Trưởng ca quyết định với đầy đủ dự báo",
              ],
              [
                "**11:00**",
                "**Khu sấy, Trị An**",
                "Viên nang và hũ cùng cần bột. Tác nhân AI đề xuất thứ tự mẻ sấy để cả hai dây chuyền đủ bột mà không dừng chờ. Kế hoạch chọn phương án",
              ],
              [
                "**14:00**",
                "**Nhà máy Bình An**",
                "Hai bồn cùng cần CIP. Mô hình dự báo thời điểm mỗi bồn sẵn sàng và tác động lên máy chiết rót. Kế hoạch viên chọn thứ tự",
              ],
              [
                "**16:30**",
                "**Nhà máy Đồng Nai**",
                "Độ ẩm khu đóng gói bột tăng. Mô hình dùng kinh nghiệm truy vết từ Trị An để chỉ ra các lô cần theo dõi. QA quyết định",
              ],
              [
                "**Cuối ngày**",
                "**Nestlé Việt Nam**",
                "Mọi quyết định trong ngày và kết quả của chúng quay về mô hình. **Ngày mai, mọi nhà máy thông minh hơn hôm nay**",
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ban-do",
    act: 2,
    theme: "light",
    layout: "wide",
    eyebrow: "Bản đồ Nhà máy siêu thông minh của Nestlé Việt Nam",
    title: "Bắt đầu từ dây chuyền NESCAFÉ Dolce Gusto, mở rộng ra toàn nhà máy Trị An, rồi các nhà máy Nestlé Việt Nam",
    blocks: [
      { kind: "module", id: "M8" },
      {
        kind: "p",
        text: "**Cùng một nền tảng · cùng một phương pháp đánh giá · cùng một đội Trị An.** Mỗi quy trình có mô hình riêng; bản đồ trạng thái và cách truy vết tác động được dùng chung.",
      },
      {
        kind: "label",
        variant: "proposal",
        text: "Các nhà máy ngoài Trị An là hướng đề xuất, sẽ được xác định cùng Nestlé sau khi có kết quả tại Trị An.",
      },
      { kind: "h3", text: "Vì sao Trị An nên triển khai ngay bây giờ" },
      {
        kind: "cards",
        cols: 4,
        rows: [
          ["**Dây chuyền mới, dữ liệu tốt:** Jar Line (8/2026) và dây chuyền viên nang đã có cảm biến và kiểm tra thời gian thực"],
          ["**Đủ loại quyết định trong một nhà máy:** viên nang, hũ, túi, chiết xuất, sấy cùng chung một luồng kế hoạch → vận hành → phục hồi"],
          ["**Xuất khẩu tới hơn 29 nước:** mỗi giờ sản xuất có giá trị cao"],
          ["**Chi phí chuyển đổi là ưu tiên Tập đoàn:** mục tiêu tiết kiệm 3 tỷ CHF qua chương trình Fuel for Growth đến cuối 2027"],
        ],
      },
      { kind: "h3", text: "Những gì các nhà máy Nestlé khác kế thừa từ Trị An" },
      {
        kind: "pillars",
        items: [
          "Mô hình AI được triển khai thực tế trên một dây chuyền thực phẩm",
          "Phương pháp đánh giá và bộ đề thi được kiểm chứng",
          "Đội Trị An tự vận hành hệ thống",
          "Kiến trúc dữ liệu và an ninh đã được IT/OT Nestlé duyệt",
        ],
      },
    ],
    details: [
      {
        title: "Bảng ba phạm vi",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**① Dây chuyền NESCAFÉ Dolce Gusto**", "**② Toàn nhà máy Trị An**", "**③ Nestlé Việt Nam**"],
            rows: [
              ["**Nơi**", "Trị An", "Jar Line · các dây chuyền viên nang và túi khác · khu chiết xuất và sấy", "Đồng Nai · Bình An · Bông Sen"],
              ["**Vai trò**", "Nơi bắt đầu", "Mở rộng trong nhà máy", "**Nhân rộng**"],
              ["**Thời gian**", "Tháng thứ 1–8", "Tháng thứ 9–12", "Năm thứ 2"],
              [
                "**Câu hỏi mô hình trả lời** *(ví dụ)*",
                "Sự cố này ảnh hưởng lô và đơn hàng nào? Phục hồi bằng cách nào? Lịch tuần nào khả thi và tốt hơn?",
                "Khu sấy nên chạy mẻ nào trước để đủ bột cho mọi dây chuyền? Jar Line tăng tốc thì điểm nghẽn chuyển đến đâu?",
                "Ở dòng bột, định lượng và độ ẩm ảnh hưởng thế nào đến sản lượng? Ở dòng chất lỏng, lịch CIP nào ít chờ nhất? Một lần dừng ảnh hưởng thế nào đến kế hoạch của cả mạng lưới?",
              ],
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────── HỒI 3 ─────────────────────────────
  {
    id: "use-case",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Danh mục các ứng dụng",
    title: "Triển khai qua 6 ứng dụng thực tế, mở rộng từ dây chuyền Dolce Gusto đến các nhà máy Nestlé Việt Nam",
    blocks: [{ kind: "module", id: "M18" }],
    details: [
      {
        title: "Bảng danh mục use case",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["#", "Use case", "Câu hỏi được trả lời", "Dùng thật từ"],
            rows: [
              ["**Ứng dụng 01**", "**Báo cáo ca tự động**", "Ca này dùng bao nhiêu nguyên liệu, ra bao nhiêu sản phẩm đạt, hao hụt ở đâu?", "**T+1**"],
              ["**Ứng dụng 02**", "**Truy vết sự cố môi trường**", "Độ ẩm hoặc nhiệt độ vượt giới hạn thì lô, mẻ và đơn hàng nào bị ảnh hưởng?", "**T+5** (thi trên lịch sử từ T+2)"],
              ["**Ứng dụng 03**", "**Kế hoạch sản xuất và phục hồi**", "Lịch nào khả thi và tốt nhất? Khi mất giờ sản xuất, phục hồi bằng cách nào?", "**T+6** (thi trên lịch sử từ T+3)"],
              ["Ứng dụng 04", "Định lượng chiết rót", "Định lượng đang lệch về đâu, chỉnh thế nào trong giới hạn QA và khối lượng tịnh?", "T+7"],
              ["Ứng dụng 05", "Dừng ngắn, điểm nghẽn và chuyển đổi", "Máy nào dừng, nguyên nhân thật nằm ở đâu, và thứ tự SKU nào ít giờ chuyển đổi nhất?", "T+8"],
              ["Ứng dụng 06", "Sẵn sàng sản xuất và cửa sổ bảo trì", "Lượt chạy tiếp theo đã đủ điều kiện chưa? Bảo trì lúc nào ít ảnh hưởng nhất?", "T+9"],
              ["→", "**Toàn nhà máy Trị An**", "Jar Line (T+9) → các dây chuyền viên nang và túi khác (T+10) → khu chiết xuất và sấy, kế hoạch chung toàn nhà máy (T+11)", ""],
              ["→", "**Nestlé Việt Nam**", "Chọn nhà máy thứ hai (T+12) → thử nghiệm do đội Trị An dẫn dắt (năm thứ 2)", ""],
            ],
          },
        ],
      },
      {
        title: "Bản đồ mở rộng trong nhà máy Trị An",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Khu vực", "Mô hình hỗ trợ"],
            rows: [
              ["Chiết xuất, cô đặc", "Liên kết lô cà phê nhân với hiệu suất chiết xuất và tải khâu sau"],
              ["Sấy", "Liên kết điều kiện vận hành, độ ẩm và mật độ bột với khâu chiết rót"],
              ["Jar Line", "Dừng ngắn giữa chiết rót, hàn màng và đóng gói; liên kết kết quả kiểm tra với lô"],
              ["Viên nang", "Định lượng, chuyển đổi SKU, môi trường phòng kiểm soát"],
              ["Túi", "Chuyển đổi định dạng, hao hụt bao bì"],
              ["Kế hoạch chung", "Một lịch cho mọi dây chuyền dùng chung nguồn bột"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "lo-trinh",
    act: 3,
    theme: "light",
    layout: "wide",
    eyebrow: "Lộ trình 12 tháng và đội Trị An làm chủ",
    title: "Các giai đoạn triển khai",
    blocks: [
      { kind: "module", id: "M15" },
      { kind: "h3", text: "Chi tiết theo từng tháng" },
      { kind: "module", id: "M10" },
      { kind: "h3", text: "Nhân sự theo giai đoạn" },
      { kind: "module", id: "M16" },
      { kind: "h3", text: "Thang năng lực của đội Trị An" },
      { kind: "module", id: "M17" },
      {
        kind: "media",
        side: "left",
        photo: {
          src: "/decks/nestle-vietnam/doi-tri-an.jpg",
          alt: "Ba nhân viên kiểm tra sản phẩm tại dây chuyền viên nang",
          width: 1024,
          height: 681,
          caption: "Đội Trị An giữ quyền vận hành và quyết định",
          credit: PHOTO_CREDIT,
        },
        blocks: [
          {
            kind: "p",
            text: "**Nguyên tắc chia vai:** IT/OT vận hành hệ thống. Chuyên gia nghiệp vụ (Kế hoạch, Sản xuất, QA) xác nhận mô hình có đúng về chuyên môn hay không.",
          },
          { kind: "p", text: "**Trị An chỉ cần 3 việc:**" },
          {
            kind: "list",
            ordered: true,
            items: [
              "**Mở dữ liệu đã có:** chỉ đọc, không lắp thêm cảm biến, không thay hệ thống hiện tại.",
              "**Cử người:** 2 người cho đội vận hành, và chuyên gia Kế hoạch, Sản xuất khoảng 4 giờ/tuần.",
              "**Giữ đề thi và chấm điểm.**",
            ],
          },
        ],
      },
    ],
    details: [
      {
        title: "Thang năng lực của đội Trị An",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            layout: "vertical",
            head: ["Bậc", "Đội Trị An làm được", "Bài kiểm tra", "Khi nào"],
            rows: [
              [
                "**1. Vận hành**",
                "Chạy luồng dữ liệu, giám sát mô hình, quản trị người dùng, cập nhật ràng buộc kế hoạch, xử lý sự cố thường gặp",
                "Tự chạy 1 vòng (T+4) → tự vận hành 4 tuần (T+8)",
                "T+4–T+8",
              ],
              [
                "**2. Tự huấn luyện lại**",
                "Cập nhật mô hình bằng dữ liệu mới, thêm SKU và dây chuyền, chấm trên bộ đề, quyết định phát hành phiên bản",
                "Tự huấn luyện lại không cần hỗ trợ, kết quả không kém phiên bản trước",
                "T+11–T+12",
              ],
              [
                "**3. Dẫn dắt nhân rộng**",
                "Dẫn dắt khảo sát và thử nghiệm tại nhà máy thứ hai, cùng thiết kế bộ đề thi mới, đồng tác giả báo cáo kỹ thuật",
                "Nhà máy thứ hai qua Cổng 2 với Celesnity ở vai trò hỗ trợ",
                "Năm thứ 2",
              ],
            ],
          },
        ],
      },
      {
        title: "Nhân sự theo giai đoạn",
        printOnly: true,
        blocks: [
          {
            kind: "cards",
            cols: 4,
            head: ["", "**Thử nghiệm (T+1–T+4)**", "**Triển khai (T+5–T+8)**", "**Nhân rộng (T+9–T+12)**"],
            rows: [
              [
                "**Celesnity**",
                "**~4 người**: quản lý triển khai ½ · FDE tại Trị An 1,5 · kỹ sư AI 1 · kỹ sư dữ liệu ½ · nghiên cứu ½",
                "**~3,5 người**: quản lý ½ · FDE 1 · kỹ sư AI 1 · kỹ sư dữ liệu ½ · nghiên cứu ½",
                "**~3 người**: quản lý ½ · FDE 1 · kỹ sư AI 1 · nghiên cứu ½",
              ],
              [
                "**Đội Trị An: vận hành hệ thống**",
                "**2 người**: đầu mối IT/OT, kỹ sư quy trình (CI)",
                "**3 người**: + kỹ sư dữ liệu",
                "**4 người**: + kỹ sư vận hành mô hình",
              ],
              [
                "**Chuyên gia nghiệp vụ Trị An**",
                "Kế hoạch, Sản xuất ~4 giờ/tuần mỗi người · QA, đầu mối dữ liệu ~2 giờ/tuần",
                "Như cũ · + Bảo trì ~2 giờ/tuần",
                "Như cũ · + đầu mối các dây chuyền mới",
              ],
              ["**Lãnh đạo Trị An**", "Giám đốc nhà máy: họp tháng và tại mỗi cổng · Tài chính: tại mỗi cổng", "", ""],
            ],
          },
        ],
      },
      {
        title: "Thử nghiệm 16 tuần: kết quả nhanh ở tháng thứ 1, kết quả thi ở tháng thứ 4",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            head: ["Tuần", "Việc", "Đầu ra"],
            rows: [
              [
                "**1–2**",
                "Khảo sát dây chuyền Dolce Gusto. Sản xuất, Kế hoạch, QA và Tài chính chọn bài toán và chỉ tiêu. Ký thỏa thuận dữ liệu",
                "Phạm vi và số nền được thống nhất",
              ],
              [
                "**3–4**",
                "Dựng môi trường được IT/OT duyệt. Kết nối chỉ đọc MES, historian, QA. Đồng bộ mã lô, mã máy, thời gian. **Bật Ứng dụng 01**",
                "**Cổng 1** · Ứng dụng 01 chạy trên chuyền",
              ],
              ["**5–8**", "Nối dữ liệu lịch sử. Nestlé dựng **bộ đề thi kín**. Xây bản đồ trạng thái và mô hình phiên bản đầu", "Mô hình v0.1"],
              [
                "**9–12**",
                "**Thi trên lịch sử của Trị An:** Ứng dụng 02 với các sự cố môi trường cũ; Ứng dụng 03 với các kế hoạch tuần cũ và các lần phục hồi cũ. So với cách làm hiện tại và với một phương án tối ưu thông thường. Kế hoạch, Sản xuất, QA chấm mẫu",
                "Kết quả thi",
              ],
              ["**13–14**", "Chạy song song trên ca thật. Đội Trị An tự chạy một vòng dữ liệu và chấm điểm", "Bằng chứng chuyển giao"],
              ["**15–16**", "Tài chính xác nhận cách đo giá trị. Báo cáo trước Ban Giám đốc nhà máy", "**Cổng 2**: mở rộng, điều chỉnh hay dừng"],
            ],
          },
          {
            kind: "p",
            text: "**Năm thứ 2:** thử nghiệm tại nhà máy Nestlé thứ hai **do đội Trị An dẫn dắt**, Celesnity hỗ trợ.",
          },
        ],
      },
      {
        title: "Mười hai tháng: mỗi use case là một chương",
        printOnly: true,
        blocks: [
          { kind: "note", text: "T+1 là tháng đầu tiên sau khi Nestlé duyệt quyền truy cập dữ liệu và môi trường triển khai." },
          {
            kind: "table",
            head: ["Tháng", "Giai đoạn", "Ứng dụng trên dây chuyền Dolce Gusto", "Nhân rộng", "Dữ liệu và nền tảng", "Đội Trị An", "Cổng"],
            rows: [
              ["**T+1**", "Thử nghiệm: Học", "**Ứng dụng 01 dùng thật**", "", "Môi trường được IT/OT duyệt · kết nối chỉ đọc · bản đồ trạng thái dây chuyền", "Học việc", "**Cổng 1**"],
              ["**T+2**", "Thử nghiệm: Học", "Ứng dụng 02 thi trên lịch sử", "", "Bộ đề thi kín", "Học việc", ""],
              ["**T+3**", "Thử nghiệm: Học", "Ứng dụng 03 thi trên lịch sử", "", "Nối dữ liệu kế hoạch và đơn hàng", "Học việc", ""],
              ["**T+4**", "Thử nghiệm: Học", "Kết quả thi", "", "", "**Tự chạy 1 vòng**", "**Cổng 2**"],
              ["**T+5**", "Dùng thật", "**Ứng dụng 02 dùng thật**", "", "Mở cho QA và trưởng ca", "Cùng vận hành", ""],
              ["**T+6**", "Dùng thật", "**Ứng dụng 03 dùng thật**", "", "Mở cho Kế hoạch", "Cùng vận hành", ""],
              ["**T+7**", "Dùng thật", "**Ứng dụng 04** định lượng", "", "Nối dữ liệu cân kiểm tra", "Cùng vận hành", ""],
              ["**T+8**", "Dùng thật", "**Ứng dụng 05** dừng ngắn, chuyển đổi", "Khảo sát Jar Line và các dây chuyền khác", "", "**Tự vận hành 4 tuần**", "**Cổng 3**"],
              ["**T+9**", "Nhân rộng", "**Ứng dụng 06** sẵn sàng, bảo trì", "**Jar Line**", "Dữ liệu dây chuyền mới", "Tự vận hành", ""],
              ["**T+10**", "Nhân rộng", "", "Các dây chuyền viên nang và túi khác", "", "Tự vận hành", ""],
              ["**T+11**", "Nhân rộng", "", "Khu chiết xuất và sấy · kế hoạch chung", "Dữ liệu khu bột", "**Tự huấn luyện lại**", ""],
              ["**T+12**", "Nhân rộng", "Báo cáo kỹ thuật chung", "**Kế hoạch cho nhà máy Nestlé thứ hai**", "", "**Dẫn dắt khảo sát nhà máy thứ hai**", "**Cổng 4**"],
            ],
          },
        ],
      },
      {
        title: "Đội Trị An làm chủ: ai vận hành hệ thống",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Giai đoạn", "Celesnity", "Trị An"],
            rows: [
              ["Thử nghiệm (T+1–T+4)", "90%", "10%"],
              ["Dùng thật (T+5–T+8)", "50%", "50%"],
              ["Nhân rộng (T+9–T+12)", "20%", "**80%**"],
              ["Năm thứ 2: nhà máy thứ hai", "Hỗ trợ", "**Dẫn dắt**"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "thu-ngay",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Use case đầu tiên: dây chuyền NESCAFÉ Dolce Gusto tại Trị An",
    title: "Từ một cảnh báo độ ẩm đến một kế hoạch phục hồi được duyệt, AI nằm trong từng bước của nhà máy",
    blocks: [
      {
        kind: "note",
        text: "Tình huống minh họa cách hệ thống làm việc. Bài toán cụ thể do Sản xuất, Kế hoạch, QA và Tài chính chọn trong khảo sát. Phương án dự phòng là định lượng chiết rót trên cùng dây chuyền.",
      },
      {
        kind: "timeline",
        head: ["Giờ", "Điều xảy ra", "AI làm gì *(không ai phải \"mở công cụ AI\")*", "Con người làm gì"],
        rows: [
          [
            "**10:15**",
            "Độ ẩm Phòng kiểm soát 2 vượt giới hạn cấu hình",
            "AI **tự mở hồ sơ sự cố**, gắn phòng, khoảng thời gian, lô bột P102, mẻ B042–B043, SKU Latte",
            "Không cần nhập",
          ],
          ["**10:20**", "", "**Mô hình** tra quy tắc chất lượng của nhà máy: lô cần QA xem xét trước khi tiếp tục chiết rót", "QA **quyết định** về lô"],
          [
            "**10:50**",
            "Sự cố kết thúc sau 32 phút",
            "**Mô hình** tính tác động: 5,7 giờ không sản xuất được · thiếu 31.400 viên so với mục tiêu ngày · chuyển đổi sang SKU Espresso trễ 4,2 giờ · 2 đơn xuất khẩu có thể bị ảnh hưởng",
            "",
          ],
          ["**11:00**", "", "**Tác nhân AI** soạn 4 phương án phục hồi; mô hình dự báo kết quả từng phương án", "Trưởng phòng Sản xuất **duyệt**"],
          ["**Cuối ca**", "Phương án được thực hiện", "Báo cáo ca ghi sự cố, phương án đã chọn, sản lượng thực tế", "Trưởng ca **xác nhận**"],
          ["**Cuối tuần**", "Có sản lượng thực tế của cả tuần", "Dự báo được **chấm điểm so với thực tế**; mô hình tự học", "Xem trên bảng chỉ tiêu"],
        ],
      },
      {
        kind: "table",
        caption: "Bốn phương án phục hồi *(Mô phỏng minh họa)*",
        head: ["Phương án", "Sản lượng bù", "Đơn hàng đúng hạn", "Chi phí thêm", "Cần kiểm tra"],
        rows: [
          ["**A. Tăng ca Line 2**", "~28.000 viên", "1/2", "4 giờ tăng ca", "Lịch vệ sinh Line 2 bị dời"],
          ["**B. Chuyển SKU Espresso sang Line 3**", "~31.000 viên", "2/2", "1 lần chuyển đổi thêm", "Line 3 tương thích công thức"],
          ["**C. Sắp xếp lại SKU ngày mai**", "~19.000 viên", "1/2", "Không", "Lô vỏ viên nang cho SKU được dời lên"],
          ["**D. Giữ kế hoạch**", "0", "0/2", "Không", "—"],
        ],
      },
      {
        kind: "media",
        side: "right",
        photo: {
          src: "/decks/nestle-vietnam/dolce-gusto-bang-tai.jpg",
          alt: "Hộp NESCAFÉ Dolce Gusto trên băng tải",
          width: 547,
          height: 365,
          caption: "Dây chuyền NESCAFÉ Dolce Gusto, Trị An",
          credit: PHOTO_CREDIT,
        },
        blocks: [
          { kind: "p", text: "**Ba câu hỏi mô hình giúp trả lời:**" },
          {
            kind: "list",
            ordered: true,
            items: [
              "Sự cố này ảnh hưởng những lô và đơn hàng nào?",
              "Phục hồi bằng cách nào thì tốt nhất?",
              "Sau khi thực hiện, kết quả có đúng như dự báo không?",
            ],
          },
          {
            kind: "p",
            text: "Ngưỡng độ ẩm và cách xử lý lô lấy từ tiêu chuẩn của nhà máy, không do AI đặt. Khi gặp SKU chưa từng chạy trên Line 3, mô hình trả lời *\"Chưa đủ dữ liệu chuyển đổi để dự báo đáng tin cậy.\"* Một mô hình tốt phải biết khi nào nó không biết.",
          },
        ],
      },
      { kind: "h3", text: "Thử làm trưởng ca" },
      { kind: "label", variant: "ai", text: "AI thật: trích xuất hồ sơ sự cố từ lời nói. Phần tính tác động và phương án: mô phỏng minh họa." },
      {
        kind: "p",
        text: "Ví dụ: *\"Phòng 2 độ ẩm lại vượt, line 2 dừng từ 10 giờ 15, đang chạy lô P102.\"* → AI lập thẻ sự cố (phòng, thời gian, dây chuyền, lô, mức độ, thông tin còn thiếu) → nối dữ liệu → tính tác động → soạn phương án phục hồi → **Quý vị bấm duyệt**.",
      },
      { kind: "module", id: "M6" },
    ],
  },
  {
    id: "hop-tac",
    act: 3,
    theme: "light",
    eyebrow: "Hình thức hợp tác",
    title: "Trị An đầu tư vào một năng lực vận hành mới, mở từng bước bằng kết quả đã kiểm chứng",
    blocks: [
      { kind: "module", id: "M13", variant: "founding" },
      { kind: "h3", text: "Ba hạng mục triển khai chính" },
      { kind: "module", id: "M14", variant: "package" },
      {
        kind: "list",
        items: [
          "**Thử nghiệm:** phí cố định, phạm vi rõ ràng, thống nhất sau khảo sát dây chuyền Dolce Gusto. Không đạt Cổng 2 thì không chuyển sang giai đoạn có phí tiếp theo.",
          "**Sau thử nghiệm:** định giá theo giá trị Tài chính đã xác minh. Mỗi dây chuyền, mỗi nhà máy được định giá theo phạm vi riêng. Chi phí tích hợp một lần tách khỏi phí định kỳ.",
          "**Hướng nghiên cứu (tùy chọn):** có câu hỏi khoa học, mốc và tiêu chí đạt riêng. Ứng dụng vận hành phải tạo ra giá trị kể cả khi hướng nghiên cứu không đạt.",
          "**Ngoài phạm vi thử nghiệm đầu tiên:** thay đổi thông số an toàn thực phẩm, chu trình vệ sinh đã thẩm định, quy tắc chuyển đổi liên quan đến chất gây dị ứng, thay nguyên liệu, quyết định xuất hay hủy lô.",
          "**Không đề xuất:** độc quyền · cam kết triển khai toàn mạng lưới · đưa dữ liệu ra khỏi môi trường đã duyệt.",
          "**Nguồn tài trợ mô hình nền:** Celesnity tự tài trợ.",
        ],
      },
      { kind: "h3", text: "Bảy cam kết không thay đổi" },
      { kind: "module", id: "M13", variant: "commitments" },
      { kind: "h3", text: "Sở hữu trí tuệ" },
      {
        kind: "cards",
        cols: 3,
        tone: "orange",
        head: ["Tài sản", "Chủ sở hữu", "Quyền của Nestlé"],
        rows: [
          ["Dữ liệu vận hành, công thức, hồ sơ nhà máy", "Nestlé", "Toàn quyền"],
          ["Mô hình riêng và các kết quả về hoạt động của Trị An", "Nestlé", "Sở hữu; Celesnity chỉ dùng để vận hành dịch vụ"],
          ["Mô hình nền, mã huấn luyện, bộ công cụ đánh giá", "Celesnity", "Giấy phép nội bộ vĩnh viễn, miễn phí bản quyền theo mức tham gia"],
        ],
      },
      { kind: "h3", text: "Pháp lý" },
      {
        kind: "list",
        items: [
          "**Văn bản áp dụng:** Luật Trí tuệ nhân tạo 134/2025/QH15 (hiệu lực 1/3/2026) · Nghị định 142/2026/NĐ-CP · Quyết định 33/2026/QĐ-TTg (hiệu lực 15/8/2026) · Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 và Nghị định 356/2025/NĐ-CP (hiệu lực 1/1/2026).",
          "**Phân loại rủi ro:** Celesnity lập hồ sơ phân loại cho từng chức năng và thông báo Bộ KH&CN khi bắt buộc; Nestlé nhận hồ sơ với vai trò bên triển khai. Không gán trước mức rủi ro. Phân loại được rà soát lại khi mở rộng phạm vi.",
          "**An ninh:** theo kiến trúc nhà máy đã duyệt, tham chiếu IEC 62443 và NIST SP 800-82; bắt đầu ở chế độ chỉ đọc; ghi nhật ký mọi lần gọi mô hình. Khi mất kết nối, nhà máy chạy bình thường qua hệ thống hiện có.",
          "**An toàn thực phẩm:** HACCP và hệ thống chất lượng của Nestlé là một lớp riêng; báo cáo AI không thay thế được.",
        ],
      },
      { kind: "h3", text: "Quản trị" },
      {
        kind: "cards",
        cols: 3,
        rows: [
          ["Ban chỉ đạo chung", "Giám đốc nhà máy chủ trì, cùng Trưởng phòng Sản xuất, đầu mối IT/OT, CEO và CTO Celesnity. Họp hằng tháng và tại mỗi cổng."],
          ["Hội đồng dữ liệu", "IT/OT, QA, đầu mối dữ liệu; họp hằng tháng."],
          ["Nhóm làm việc chung", "Họp hằng tuần, tại nhà máy. Thay đổi ảnh hưởng sản xuất đi theo quy trình quản lý thay đổi (MoC) hiện có."],
        ],
      },
    ],
    details: [
      {
        title: "Bảy cam kết không thay đổi",
        printOnly: true,
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "**Chỉ đọc và đề xuất.** Mô hình không ghi vào PLC, SCADA, MES hay SAP, và không điều khiển thiết bị. Mỗi bước lên mức tự chủ cao hơn là quyết định riêng của Nestlé, qua quy trình quản lý thay đổi của nhà máy.",
              "Interlock, bảo vệ an toàn, thông số đã thẩm định, quyết định QA và xuất lô **giữ nguyên quyền hiện tại**. Ngưỡng và quy tắc lấy từ tiêu chuẩn của nhà máy, **không do AI đặt**.",
              "Dữ liệu nằm trong môi trường Nestlé duyệt sau đánh giá IT/OT; không mặc định đưa ra khỏi Việt Nam. **Công thức và thông số quy trình không bao giờ rời Nestlé.**",
              "Nestlé duyệt mục đích, người truy cập, thời hạn lưu và mọi phần được chia sẻ. Dữ liệu Nestlé không gộp sang khách hàng khác và không dùng cho đối thủ.",
              "Dữ liệu người lao động **không bao giờ** được dùng để xếp hạng hay kỷ luật cá nhân.",
              "Mã nguồn và mô hình riêng được lưu ký tại bên thứ ba. Khi chấm dứt hợp tác, Nestlé giữ mô hình riêng và giấy phép; dữ liệu được trả lại hoặc xóa theo yêu cầu.",
              "Mọi công bố, mọi lần dùng tên hay logo Nestlé cần đồng ý bằng văn bản (xem trước ít nhất 30 ngày).",
            ],
          },
        ],
      },
      {
        title: "Ba mức tham gia",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Mức 1: Riêng**", "**Mức 2: Đóng góp**", "**Mức 3: Đối tác sáng lập**"],
            rows: [
              [
                "**Điều gì rời môi trường Nestlé**",
                "Không có gì",
                "Chỉ bản cập nhật mô hình đã qua kiểm thử bảo mật, khi Nestlé duyệt bằng văn bản",
                "Như Mức 2, cộng một bộ dữ liệu mẫu đã khử nhận diện để kiểm chứng; Nestlé duyệt từng phần trước khi gửi",
              ],
              [
                "**Nestlé đóng góp**",
                "Dữ liệu cho mô hình riêng",
                "Dữ liệu, chuyên gia, hạ tầng theo kiến trúc Nestlé duyệt",
                "Như Mức 2, cộng tham gia định hình sản phẩm; đội Trị An cùng thiết kế bộ đề thi",
              ],
              ["**Quyền dùng mô hình nền**", "Phiên bản tại thời điểm ký", "Mọi phiên bản trong thời gian đóng góp", "Như Mức 2, cộng **3 năm** sau khi ngừng đóng góp"],
              ["**Tiếp cận tính năng mới**", "—", "—", "Sớm **6 tháng**"],
              ["**Ban chỉ đạo**", "—", "Thành viên", "**Chủ trì**"],
              ["**Phí sử dụng sau chương trình**", "Giá tiêu chuẩn", "Giá ưu đãi", "Giá ưu đãi, **cố định 3 năm**"],
            ],
          },
          {
            kind: "p",
            text: "**Khuyến nghị:** đăng ký **Mức 3**. Suốt thử nghiệm, dữ liệu chạy ở chế độ **Mức 1**. Mọi đóng góp chỉ bắt đầu sau Cổng 2, khi Nestlé (gồm IT và Pháp chế) duyệt bằng văn bản.",
          },
        ],
      },
      {
        title: "Ba thành phần của gói",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Thành phần", "Gồm những gì"],
            rows: [
              ["**① Mô hình AI Thế giới thực**", "Bản riêng của Trị An, chạy trong môi trường Nestlé duyệt; nhận các phiên bản mô hình nền mới"],
              [
                "**② Bộ ứng dụng AI-native**",
                "Báo cáo ca tự động · truy vết sự cố · kế hoạch và phục hồi trong không gian làm việc của kế hoạch viên và trưởng ca · bảng chỉ tiêu",
              ],
              [
                "**③ Triển khai và nghiệm thu (kỹ sư thực địa)**",
                "Cấu hình theo quy trình Trị An · kết nối chỉ đọc với hệ thống hiện có · **đào tạo đội Trị An tới khi tự vận hành, tự huấn luyện lại và dẫn dắt nhân rộng**",
              ],
            ],
          },
          {
            kind: "table",
            head: ["Cơ cấu chi phí", "Triển khai và chuyển giao", "Mô hình + Ứng dụng"],
            rows: [
              ["**Năm thứ 1**", "Phần lớn", "Phần nhỏ"],
              ["**Năm thứ 2+**", "Phần nhỏ", "Phần lớn"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hai-ben",
    act: 3,
    theme: "mist",
    eyebrow: "Lợi ích hai bên",
    title: "Một quan hệ đối tác minh bạch",
    blocks: [{ kind: "module", id: "M14", variant: "benefits" }],
    details: [
      {
        title: "Bảng lợi ích hai bên",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Nestlé Trị An**", "**Celesnity**"],
            rows: [
              [
                "**Nhận**",
                "Giá trị đo được trên dây chuyền · mô hình riêng chạy trong môi trường Nestlé duyệt · **đội Trị An tự vận hành và huấn luyện lại** · quyền dùng mô hình nền · tiếp cận tính năng mới sớm 6 tháng · chủ trì Ban chỉ đạo · con đường mở rộng ra toàn nhà máy và các nhà máy Nestlé Việt Nam",
                "Mô hình được kiểm chứng trong sản xuất thực phẩm · bản cập nhật mô hình khi Nestlé duyệt (**không bao giờ là dữ liệu thô**) · đối tác tham chiếu khi Nestlé đồng ý · bộ đề thi làm chung · doanh thu",
              ],
              [
                "**Góp**",
                "Dữ liệu chỉ đọc (theo mức Nestlé chọn) · chuyên gia Kế hoạch, Sản xuất, QA · hạ tầng theo kiến trúc Nestlé duyệt · đội vận hành 2→4 người",
                "Mô hình nền · nền tảng dữ liệu tập trung · đội FDE ~4→3 người · chi phí nghiên cứu mô hình nền",
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "thu-ngo",
    act: 0,
    theme: "light",
    eyebrow: "Thư ngỏ",
    title: "Kính gửi Ban Giám đốc Nhà máy Nestlé Trị An",
    blocks: [
      { kind: "p", text: "Trước hết, Celesnity xin trân trọng cảm ơn Quý vị đã dành thời gian cho đề xuất này." },
      {
        kind: "p",
        text: "Trị An vận hành những dây chuyền cà phê hiện đại bậc nhất của Nestlé trong khu vực. Máy móc, cảm biến và hệ thống sản xuất đều đã ở mức cao. Bước tiếp theo nằm **giữa** các hệ thống. Khi một sự việc xảy ra trên chuyền, nhà máy cần biết ngay nó ảnh hưởng đến lô nào, kế hoạch nào, đơn hàng nào, và nên xử lý thế nào. Thế hệ AI tiếp theo đang chuyển từ ngôn ngữ sang thế giới vật lý. Nhà máy nào nối được các quyết định của mình thành một vòng sẽ giữ lợi thế lâu dài.",
      },
      {
        kind: "p",
        text: "Vì vậy, Celesnity trân trọng đề xuất Nestlé Trị An trở thành **Đối tác công nghiệp sáng lập** của chương trình **Nhà máy siêu thông minh**. Chương trình xây dựng một Mô hình AI Thế giới thực hiểu cách nhà máy Trị An vận hành. Mô hình chạy trong môi trường Nestlé duyệt, trên dữ liệu của Trị An, và **do chính đội Trị An vận hành**.",
      },
      {
        kind: "p",
        text: "**Tầm nhìn**\nMỗi dây chuyền tại Trị An, rồi mỗi nhà máy Nestlé tại Việt Nam, đều có thể **tự học** từ mỗi kế hoạch và kết quả thực tế, **dự báo trước** hệ quả của quyết định tiếp theo, và **nhân rộng** kinh nghiệm sang dây chuyền và nhà máy khác.",
      },
      {
        kind: "p",
        text: "**Cách làm**\nChương trình bắt đầu nhỏ và chắc: một dây chuyền NESCAFÉ Dolce Gusto, sáu ứng dụng mở dần theo bằng chứng. Dữ liệu chỉ đọc. Không thay hệ thống nào, không lắp thêm cảm biến. Ngay từ tháng thứ 1, đội Trị An làm việc cùng kỹ sư Celesnity tại nhà máy.",
      },
      {
        kind: "p",
        text: "**Kết quả dự kiến sau 12 tháng**\n6 ứng dụng chạy thật trên dây chuyền Dolce Gusto, mở rộng sang Jar Line, các dây chuyền khác và khu chiết xuất, sấy, với một kế hoạch chung cho toàn nhà máy. **Đội Trị An tự vận hành và tự huấn luyện lại mô hình**, và có kế hoạch cụ thể cho nhà máy Nestlé thứ hai tại Việt Nam.",
      },
      {
        kind: "p",
        text: "**Cách chứng minh**\n**Nestlé giữ bộ đề thi kín.** Mô hình phải thi đạt trên dữ liệu của chính Trị An, do Nestlé chấm, trước khi được dùng thật. Mô hình phải hơn cả cách làm hiện tại và một phương án tối ưu thông thường. Giai đoạn nào chưa đạt thì chương trình không chuyển sang giai đoạn có phí tiếp theo.",
      },
      {
        kind: "p",
        text: "**Cam kết của Celesnity**\nMô hình chỉ đọc và đề xuất. Điều khiển, interlock, thông số an toàn thực phẩm và quyết định QA giữ nguyên quyền hiện tại. Công thức và thông số quy trình không bao giờ rời Nestlé. **Con người có thẩm quyền phê duyệt mọi thay đổi.**",
      },
      { kind: "p", text: "**Kính đề nghị Ban Giám đốc**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất chủ trương:** Trị An là Đối tác công nghiệp sáng lập. Dây chuyền NESCAFÉ Dolce Gusto là điểm khởi đầu; toàn nhà máy và các nhà máy Nestlé Việt Nam là bước tiếp theo.",
          "**Cử đầu mối:** chủ bài toán ở Sản xuất, đầu mối Kế hoạch, QA, IT/OT, Tài chính, và 2 người cho đội vận hành hệ thống.",
          "**Cho phép khảo sát dây chuyền Dolce Gusto** để chốt bài toán, số liệu nền và phí thử nghiệm.",
        ],
      },
      {
        kind: "p",
        text: "Chúng tôi tin rằng một nhà máy cà phê tại Việt Nam có thể trở thành nơi đầu tiên trong mạng lưới Nestlé vận hành kế hoạch và sản xuất như một vòng quyết định khép kín. Celesnity mong được đồng hành cùng Trị An trên chặng đường đó.",
      },
      { kind: "signature", lines: ["Trân trọng,", "**Celesnity**, đơn vị phát triển nền tảng Minder"] },
    ],
  },
];

/** Không có section tạm cất */
export const parkedSections: Section[] = [];

/** Đoạn kết (chỉ dùng ở bản in) */
export const closing: Closing = {
  headline: "Trị An đã có những dây chuyền cà phê hiện đại bậc nhất. Bước tiếp theo: nối mọi quyết định của nhà máy thành một vòng.",
  lead: "Một ngày không xa:",
  story:
    "Tại Bình An, một kỹ sư kế hoạch mở mô hình lần đầu. Mô hình chưa biết gì về bồn chứa và chu trình CIP của Bình An. Nhưng nó đã biết một sự cố lan qua lô, mẻ, kế hoạch và đơn hàng như thế nào, nhờ những gì đã học trên dây chuyền Dolce Gusto ở Trị An. Hôm nay, nó bắt đầu học về Bình An.",
  tagline: "NHÀ MÁY SIÊU THÔNG MINH: Tự học · Dự báo trước · Nhân rộng.",
  owner: "Do đội Trị An vận hành.",
  thanks: "Celesnity mong được cùng Trị An xây dựng nó.",
  pdf: "Tải bản PDF",
  ask: "Hỏi trợ lý",
};

/** Lợi ích hai bên (M14 variant "benefits") */
export const benefits: { partner: BenefitSide; celesnity: BenefitSide } = {
  partner: {
    name: "Nestlé Trị An",
    receive: [
      "Giá trị đo được trên dây chuyền",
      "Mô hình riêng chạy trong môi trường Nestlé duyệt",
      "**Đội Trị An tự vận hành và huấn luyện lại**",
      "Quyền dùng mô hình nền",
      "Tiếp cận tính năng mới sớm 6 tháng",
      "Chủ trì Ban chỉ đạo",
      "Con đường mở rộng ra toàn nhà máy và các nhà máy Nestlé Việt Nam",
    ],
    give: [
      "Dữ liệu chỉ đọc (theo mức Nestlé chọn)",
      "Chuyên gia Kế hoạch, Sản xuất, QA",
      "Hạ tầng theo kiến trúc Nestlé duyệt",
      "Đội vận hành 2→4 người",
    ],
  },
  celesnity: {
    name: "Celesnity",
    receive: [
      "Mô hình được kiểm chứng trong sản xuất thực phẩm",
      "Bản cập nhật mô hình khi Nestlé duyệt (**không bao giờ là dữ liệu thô**)",
      "Đối tác tham chiếu khi Nestlé đồng ý",
      "Bộ đề thi làm chung",
      "Doanh thu",
    ],
    give: ["Mô hình nền", "Nền tảng dữ liệu tập trung", "Đội FDE ~4→3 người", "Chi phí nghiên cứu mô hình nền"],
  },
};

/** Gói hợp tác (M14 variant "package") */
export const packageParts: PackagePart[] = [
  {
    n: "①",
    name: "Mô hình AI Thế giới thực",
    body: "Bản riêng của Trị An, chạy trong môi trường Nestlé duyệt; nhận các phiên bản mô hình nền mới",
  },
  {
    n: "②",
    name: "Bộ ứng dụng AI-native",
    body: "Báo cáo ca tự động · truy vết sự cố · kế hoạch và phục hồi trong không gian làm việc của kế hoạch viên và trưởng ca · bảng chỉ tiêu",
  },
  {
    n: "③",
    name: "Triển khai và nghiệm thu (kỹ sư thực địa)",
    body: "Cấu hình theo quy trình Trị An · kết nối chỉ đọc với hệ thống hiện có · **đào tạo đội Trị An tới khi tự vận hành, tự huấn luyện lại và dẫn dắt nhân rộng**",
  },
];

export const costShift: CostShiftRow[] = [
  { year: "Năm thứ 1", deploy: 0.7, model: 0.3, deployLabel: "Phần lớn", modelLabel: "Phần nhỏ" },
  { year: "Năm thứ 2+", deploy: 0.25, model: 0.75, deployLabel: "Phần nhỏ", modelLabel: "Phần lớn" },
];

// ───────────────────────────── PHỤ LỤC ─────────────────────────────
export const appendix: AppendixSection[] = [
  {
    id: "cach-hoat-dong",
    title: "Mô hình AI Thế giới thực hoạt động thế nào (bản đơn giản)",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "**Ghi lại:** mọi việc tại nhà máy thành chuỗi \"tình trạng → quyết định → kết quả\", gồm cả kế hoạch bị hủy và những lần không theo đề xuất.",
          "**Học:** mô hình học quy luật \"khi làm X trong tình trạng Y thì thường xảy ra Z\".",
          "**Dự báo kèm mức độ chắc chắn:** mô hình nói \"không biết\" khi gặp SKU, chuyển đổi, nguyên liệu hay chế độ vận hành chưa từng thấy. Khi đó người vận hành dùng quy trình hiện có.",
          "**Phân biệt nguyên nhân với trùng hợp:** người vận hành thường chọn một thông số vì đã thấy trước vấn đề, nên mô hình dùng phương pháp thống kê để tách tác động thật khỏi lý do chọn. Khi dữ liệu không đủ để phân biệt, mô hình nói rõ.",
          "**Kiểm tra ràng buộc:** bộ giải tối ưu loại mọi phương án vi phạm công suất, tương thích công thức, thời gian lưu cho phép, quy tắc vệ sinh hay giới hạn thiết bị.",
          "**Không thử nghiệm trên dây chuyền:** mô hình chỉ học từ hoạt động đã ghi lại và các thử nghiệm được Sản xuất và QA duyệt.",
        ],
      },
      { kind: "p", text: "*Chi tiết kỹ thuật cho đội IT/OT:*" },
      {
        kind: "list",
        items: [
          "Kiến trúc lai: mô hình cơ học và cân bằng vật chất · mô phỏng sự kiện rời rạc · mô hình học cho phần biến động · bộ giải ràng buộc · mô hình ngôn ngữ chỉ để hiểu câu hỏi và giải thích.",
          "Lõi mô hình học trong không gian biểu diễn (hướng JEPA).",
          "Độ chắc chắn được hiệu chuẩn bằng phương pháp conformal.",
          "Ước lượng tác động bằng propensity và doubly robust.",
          "Huấn luyện và kiểm tra tách theo thời gian; có tập thi riêng cho các lần chuyển đổi và chế độ vận hành hiếm.",
          "Kết nối qua giao diện đọc đã duyệt (historian replica, OPC UA, API của MES và ERP); không cần truy cập trực tiếp bộ điều khiển.",
        ],
      },
    ],
  },
  {
    id: "huong-nha-may",
    title: "Hướng ứng dụng tại các nhà máy Nestlé Việt Nam (đề xuất, xác định cùng Nestlé sau Cổng 4)",
    blocks: [
      {
        kind: "cards",
        cols: 3,
        head: ["Nhà máy", "Câu hỏi mô hình trả lời", "Dữ liệu cần"],
        rows: [
          [
            "**Đồng Nai** *(dòng bột, theo công bố trước đây: NESCAFÉ, NESTEA, MAGGI, MILO)*",
            "Định lượng và lượng dư · ảnh hưởng của độ ẩm lên dòng chảy bột · thứ tự chuyển đổi · truy vết lô",
            "Cân kiểm tra, môi trường, lệnh sản xuất, hồ sơ QA",
          ],
          [
            "**Bình An** *(đồ uống dạng lỏng: MILO uống liền, đồ uống dinh dưỡng, cà phê, sữa)*",
            "Thời điểm bồn sẵn sàng · lịch CIP dùng chung · phối hợp tiệt trùng và chiết rót · hao hụt khi chuyển sản phẩm",
            "Mức bồn, trạng thái vệ sinh, lịch CIP, trạng thái máy chiết rót",
          ],
          [
            "**Bông Sen** *(nhà máy kết nối, hơn 40 ứng dụng nội bộ theo công bố 2021)*",
            "Nối quyết định giữa các ứng dụng sẵn có · bàn giao ca · chuyển đổi và vệ sinh",
            "Sự kiện từ các ứng dụng hiện có, kế hoạch, kết quả",
          ],
        ],
      },
      {
        kind: "note",
        text: "Tại mọi nhà máy, mô hình không quyết định một quy trình tiệt trùng là an toàn và không thay đổi yêu cầu vệ sinh. Hiện trạng sản phẩm của từng nhà máy được xác nhận qua khảo sát riêng.",
      },
    ],
  },
  {
    id: "rui-ro",
    title: "Rủi ro và cách xử lý",
    blocks: [
      {
        kind: "cards",
        cols: 3,
        tone: "navy",
        head: ["Rủi ro", "Cách xử lý"],
        rows: [
          ["Thời gian giữa các hệ thống không khớp, mã lô không nối được", "Cổng 1 kiểm tra trước; dừng nếu không khắc phục được"],
          [
            "Mô hình không hơn cách làm hiện tại",
            "Cổng 2 với bộ đề kín, so với cả cách hiện tại và phương án tối ưu thông thường; không đạt thì dừng, không chuyển sang giai đoạn có phí",
          ],
          ["Trùng lặp với hệ thống hoặc chương trình đang có", "Rà soát trong khảo sát; bổ sung vào phần chưa được phủ, hoặc chọn bài toán khác"],
          ["Mô hình nhầm trùng hợp thành nguyên nhân", "Thi trên các sự cố và kế hoạch cũ; chuyên gia chấm; chỉ dùng ở chế độ tư vấn"],
          [
            "Kinh nghiệm Dolce Gusto không áp dụng được cho quy trình khác",
            "Mỗi nhà máy có khảo sát và bộ đề riêng; thứ mang sang là nền tảng, phương pháp và đội ngũ, không mặc định mang sang độ chính xác",
          ],
          ["Thêm việc cho người vận hành", "Đo cả việc thêm và việc bớt; nhập liệu ngắn, có thể sửa"],
          ["Phụ thuộc vào Celesnity", "Đội Trị An tự vận hành từ T+8, tự huấn luyện lại từ T+11; mã nguồn và mô hình được lưu ký"],
          ["Người lao động lo bị giám sát", "Tham vấn trước; khử nhận diện; không dùng để đánh giá cá nhân"],
        ],
      },
    ],
  },
  {
    id: "nguon",
    title: "Nguồn",
    blocks: [
      {
        kind: "p",
        text: "Nestlé Việt Nam: đầu tư thêm 100 triệu USD vào nhà máy Trị An (1/2024) · tăng cường sản xuất cà phê xuất khẩu, Jar Line mới tại Trị An (8/2026) · 30 năm Nestlé Việt Nam (4/2025) · chuyển đổi số tại nhà máy Bông Sen (9/2021) · phân xưởng MILO tại Bình An (10/2014) · thông tin môi trường các nhà máy (10/2025). Nestlé: Nestlé at a glance (2025) · Báo cáo thường niên 2025 · kết quả năm 2025 và cập nhật chiến lược (2/2026) · kết quả 6 tháng 2026, chương trình Fuel for Growth (7/2026) · khánh thành sản xuất NESCAFÉ Dolce Gusto tại Việt Nam. Khác: BeverageDaily và Food Manufacturing về khoản đầu tư năm 2024. Ảnh: Nestlé Việt Nam.",
      },
      {
        kind: "note",
        text: "Công bố của doanh nghiệp xác lập năng lực được báo cáo, không phải kiểm toán độc lập. Các tình huống, mã lô và con số trong ví dụ chỉ là minh họa.",
      },
    ],
  },
];
