/**
 * Câu chữ của deck Nestlé Trị An (/nestle-vietnam). Nguồn đối chiếu: docs/nestle-content-v4.md.
 * Không viết cứng câu chữ trong component; sửa ở đây rồi chạy `npm run content:check`.
 */
import type { Act, AppendixSection, BenefitSide, Block, Closing, CostShiftRow, DeckLabels, PackagePart, Section } from "../types";
import { beforeAfter, expansionMap, useCases } from "./usecases";

export const meta = {
  title: "Nhà máy siêu thông minh · Nestlé Trị An × Celesnity",
  description: "Đề xuất hợp tác: ba ứng dụng giai đoạn đầu trên dây chuyền NESCAFÉ Dolce Gusto và lộ trình triển khai. Tháng 10/2026.",
  tagline: "Tự học · Dự báo trước · Nhân rộng",
  footer: "NHÀ MÁY SIÊU THÔNG MINH · Nestlé Trị An × Celesnity · Tháng 10/2026",
};

export const acts: Act[] = [
  { n: 1, label: "I.", title: "Một kỷ nguyên mới" },
  { n: 2, label: "II.", title: "Nhà máy siêu thông minh" },
  { n: 3, label: "III.", title: "Giai đoạn đầu: ba ứng dụng trên dây chuyền Dolce Gusto" },
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

/** Bản in của thẻ ứng dụng (M18 "detail"): mỗi ứng dụng một bảng nhãn → nội dung */
const join = (xs?: string[]) => (xs ?? []).join(" · ");
const useCasePrintBlocks: Block[] = useCases
  .filter((u) => u.card?.worldModel && beforeAfter[u.id])
  .flatMap((u): Block[] => {
    const c = u.card!;
    return [
      { kind: "h3", text: `${u.code} · ${u.name}` },
      {
        kind: "kv",
        rows: [
          ["Khâu", c.stage ?? ""],
          ["Thời điểm", u.liveFrom],
          ["Bài toán", beforeAfter[u.id].before],
          ["Cách làm với Minder AI", beforeAfter[u.id].after],
          ["Mô hình AI Thế giới thực", c.worldModel ?? ""],
          ["Nhà máy cung cấp", join(c.needs)],
          ["Không làm", join(c.notDo)],
          ["Sản phẩm bàn giao", join(c.deliverables)],
          ["Chỉ số đo", join(c.kpis)],
          ["Quy ra tiền", c.value ?? ""],
          ["Người quyết định", c.decides],
          ["Đạt khi", c.pass],
          ...(c.caveat ? [["Lưu ý", c.caveat]] : []),
        ],
      },
    ];
  });

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
      {
        kind: "lead",
        text: "Kết nối mọi quyết định của nhà máy cà phê Nestlé Trị An thành một quy trình vận hành liên kết toàn diện, từ lập kế hoạch, sản xuất đến phục hồi",
      },
      {
        kind: "p",
        text: "**Không chỉ ứng dụng các công cụ AI phổ biến: nhà máy Nestlé Trị An có thể là một trong những nhà máy đầu tiên của Nestlé vận hành bằng Mô hình AI Thế giới thực**",
      },
      {
        kind: "p",
        text: "**Giai đoạn đầu: ba ứng dụng trên dây chuyền NESCAFÉ Dolce Gusto:** kế hoạch sản xuất tuần · hao hụt bột tính tự động từ dữ liệu máy · dự báo trước rủi ro môi trường phòng chiết rót để không phải dừng chuyền.",
      },
      { kind: "note", text: "Đề xuất hợp tác, ba ứng dụng giai đoạn đầu và lộ trình triển khai · Tháng 10/2026" },
      { kind: "note", text: "**Dẫn dắt:** Trương Hoàng Phương, Giám đốc nhà máy Nestlé Trị An" },
      { kind: "note", text: "**Chịu trách nhiệm:** Nguyễn Duy Tân & Nguyễn Công Nam Anh, Giám đốc Celesnity" },
    ],
  },

  // ───────────────────────────── HỒI 1 ─────────────────────────────
  {
    id: "tu-chu",
    act: 1,
    theme: "mist",
    eyebrow: "Nhà máy Nestlé Trị An hôm nay",
    title: "Nhà máy Nestlé Trị An là một trong những nhà máy chế biến cà phê có quy mô và công nghệ hiện đại nhất của Nestlé trong khu vực",
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
          "**Tập đoàn:** cà phê là một trong bốn mảng chiến lược của Nestlé (2/2026); hệ thống sản xuất chung của Nestlé đã được triển khai tại gần 90% trong số 335 nhà máy.",
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
          caption: "Jar Line mới tại nhà máy Nestlé Trị An, vận hành chính thức từ tháng 8/2026",
          credit: PHOTO_CREDIT,
        },
      },
      { kind: "quote", emphasis: true, text: "Máy móc và dữ liệu đã sẵn sàng.\nBước tiếp theo: **Trí thông minh AI vận hành**." },
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
        context: "Các tập đoàn công nghệ lớn đều đang dồn sức vào nghiên cứu AI cho thế giới vật lý (ví dụ NVIDIA Cosmos, Meta V-JEPA 2).",
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
            head: ["Làn sóng", "AI làm được gì", "Người nắm lợi thế?"],
            rows: [
              ["**Tự động hóa**", "Lặp lại một thao tác đã lập trình", "Người có máy móc"],
              ["**AI ngôn ngữ** lớn (ChatGPT, trợ lý ảo)", "Đọc, viết, trả lời câu hỏi", "Người có mô hình ngôn ngữ; nay đang phổ biến và rẻ dần"],
              [
                "**Mô hình AI Thế giới thực** *(World Model)*",
                "**Hiểu một hệ thống vật lý phản ứng thế nào với quyết định, và dự báo trước**",
                "**Người có dữ liệu quyết định vận hành thật**",
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
    title: "Khi dây chuyền đã được hiện đại hoá, sự cải tiến tiếp theo có thể nằm ở đâu?",
    blocks: [
      { kind: "module", id: "M3", variant: "loop" },
      {
        kind: "quote",
        text: "Celesnity không thay thế bất kỳ hệ thống nào đang vận hành. **Mô hình đọc dữ liệu từ chính các hệ thống hiện có của nhà máy Nestlé Trị An và trả lời những câu hỏi mà từng hệ thống riêng lẻ chưa trả lời được:** một sự việc trên chuyền ảnh hưởng thế nào đến kế hoạch, và bước xử lý tiếp theo nên là gì.",
      },
    ],
    details: [
      {
        title: "Bảng hai phương án",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Phương án A: Bổ sung từng công cụ AI riêng lẻ**", "**Phương án B: Kết nối các quyết định thành một quy trình vận hành liên kết toàn diện**"],
            rows: [
              [
                "**Phạm vi**",
                "Mỗi khâu dùng một công cụ riêng: lập kế hoạch, cảnh báo môi trường, giám sát chiết rót",
                "**Kế hoạch, môi trường, chất lượng, chiết rót và đóng gói được nhìn trên cùng một bức tranh chung**",
              ],
              [
                "**Khi có sự cố**",
                "Chỉ nhận được cảnh báo khi độ ẩm đã vượt ngưỡng",
                "**Dự báo trước khi vượt ngưỡng: \"AHU-02 suy giảm, Vùng L2 có nguy cơ vượt ngưỡng sau 6 giờ; lô và kế hoạch L2 bị ảnh hưởng; có 3 phương án xử lý trước\"**",
              ],
              ["**Kinh nghiệm**", "Phân tán ở nhiều công cụ và ở kinh nghiệm của từng cá nhân", "**Được tích lũy thành tài sản lâu dài của nhà máy**"],
              ["**Theo thời gian**", "Từng công cụ phải được cập nhật và hiệu chỉnh riêng", "**Sau mỗi lần vận hành, mô hình học thêm và chính xác hơn**"],
              ["**Khi mở dây chuyền mới**", "Phải bổ sung công cụ và tích hợp lại từ đầu", "**Kinh nghiệm và bản đồ liên kết sản xuất đã ghi nhận được nhân rộng nhanh chóng, rồi tiếp tục học**"],
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
            "Mỗi kế hoạch, sai lệch và cách xử lý tự trở thành dữ liệu; **thông minh hơn theo cấp số nhân theo thời gian**",
            "Thời gian chuyển đổi thực tế của từng cặp SKU được cập nhật sau mỗi lần chạy",
          ],
          [
            "**2. Dự báo trước**",
            "Dự báo hệ quả của một quyết định **trước khi** thực hiện, kèm mức độ chắc chắn",
            "Dời lần chuyển đổi 2 giờ thì đơn hàng nào bị ảnh hưởng?",
          ],
          [
            "**3. Nhân rộng**",
            "**Kinh nghiệm của một dây chuyền được nhân rộng sang dây chuyền và nhà máy khác**, không phụ thuộc vào một người hay một nơi",
            "Cách truy vết sự cố độ ẩm đã ghi nhận ở dây chuyền Dolce Gusto được nhân rộng sang các dòng bột khác, và nhiều hơn nữa",
          ],
        ],
      },
      { kind: "h3", text: "Khác biệt không nằm ở việc có thêm AI, mà ở chỗ **AI là chính quy trình**." },
      {
        kind: "compare",
        head: ["", "Nhà máy thông minh *(ứng dụng phần mềm có AI và tự động hóa)*", "**Nhà máy siêu thông minh** *(ứng dụng Mô hình AI Thế giới thực)*"],
        rows: [
          ["**AI ở đâu**", "Một công cụ, con người mở ra khi cần", "**AI là quy trình**: AI lập báo cáo ca, truy vết sự cố, soạn phương án"],
          ["**Ghi nhận dữ liệu**", "Cảm biến và dashboard; con người nhập tay", "Mọi kế hoạch, quyết định và kết quả **tự trở thành dữ liệu học**"],
          ["**Dữ liệu được thể hiện**", "Điều gì **đã** xảy ra", "Điều gì đã, đang và **sẽ** xảy ra nếu chọn phương án A hay B"],
          ["**Năng suất và hiệu quả theo thời gian**", "Không đổi về tính ứng dụng, hiệu năng và trí tuệ", "**Thông minh hơn theo thời gian**"],
          ["**Khả năng nhân rộng khi mở dây chuyền mới**", "Bắt đầu lại từ đầu", "**Mang kinh nghiệm cũ sang**, và tiếp tục nhân rộng"],
          ["**Hoạt động của con người**", "Đi tìm dữ liệu, tổng hợp báo cáo, nhập liệu và xử lý thủ công", "Chỉ làm phần cần phán đoán và phê duyệt"],
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
      { kind: "p", text: "**Mô hình AI Thế giới thực không phải là:**" },
      {
        kind: "chips",
        tone: "negative",
        items: [
          "Chatbot",
          "Phần mềm ERP",
          "Mô hình tạo video",
          "Mô hình ngôn ngữ video",
          "Hệ thống tự điều khiển thiết bị",
          "Thay thế mô phỏng kỹ thuật (mô phỏng nhiệt, dòng chảy, mạch vẫn do kỹ sư thực hiện, và kết quả của chúng là đầu vào cho mô hình)",
        ],
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
                "Bốn Tác nhân AI của giai đoạn đầu: Báo cáo ca, Kế hoạch tuần, Hao hụt bột, Môi trường phòng chiết rót. **Mọi đề xuất đều được mô hình kiểm tra nguyên nhân và kết quả trước**",
              ],
              [
                "**② Mô hình AI Thế giới thực**: \"bộ não hiểu nhà máy\"",
                "Dự báo",
                "Học cách dây chuyền phản ứng với quyết định và sự cố; dự báo kèm mức độ và dữ liệu chắc chắn; nói \"không biết\" khi gặp tình huống chưa có dữ liệu, không bịa ra kết quả",
              ],
              [
                "**① Nền tảng dữ liệu tập trung**: \"trí nhớ của nhà máy\"",
                "Ghi nhận lại",
                "Kết nối chỉ đọc với MES, historian, ERP, QMS, bảo trì · đồng bộ mã lô, mã máy, thời gian · ghi nhận ca bằng giọng nói tiếng Việt · lưu trữ mọi quyết định",
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
    id: "ban-do",
    act: 2,
    theme: "mist",
    layout: "wide",
    eyebrow: "Bản đồ Nhà máy siêu thông minh của Nestlé Việt Nam",
    title: "Bắt đầu từ dây chuyền NESCAFÉ Dolce Gusto, mở rộng ra toàn nhà máy Nestlé Trị An, rồi các nhà máy Nestlé Việt Nam",
    blocks: [
      { kind: "module", id: "M8" },
      {
        kind: "p",
        text: "**Cùng một nền tảng · cùng một phương pháp đánh giá · cùng một Đội ngũ IT của nhà máy Trị An.** Mỗi quy trình có mô hình riêng; bản đồ liên kết sản xuất và cách truy vết tác động được dùng chung.",
      },
      {
        kind: "label",
        variant: "proposal",
        text: "Các nhà máy Nestlé khác ngoài nhà máy Trị An là hướng đề xuất, sẽ được xác định cùng Nestlé sau khi có kết quả tại nhà máy Trị An.",
      },
      { kind: "h3", text: "Vì sao nhà máy Nestlé Trị An nên triển khai ngay bây giờ" },
      {
        kind: "cards",
        cols: 4,
        rows: [
          ["**Dây chuyền mới, dữ liệu chất lượng:** Jar Line (8/2026) và dây chuyền viên nén đã có cảm biến và kiểm tra thời gian thực"],
          ["**Đủ loại quyết định trong một nhà máy:** viên nén, hũ, túi, chiết xuất, sấy cùng chung một luồng kế hoạch → vận hành → phục hồi"],
          ["**Xuất khẩu tới hơn 29 quốc gia:** mỗi giờ sản xuất mang giá trị cao"],
          ["**Hiệu quả chi phí là ưu tiên của Tập đoàn:** mục tiêu tiết kiệm 3 tỷ CHF qua chương trình Fuel for Growth đến cuối 2027"],
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
              ["**Nơi**", "Nhà máy Nestlé Trị An", "Jar Line · các dây chuyền viên nén và túi khác · khu chiết xuất và sấy", "Các nhà máy Nestlé Đồng Nai, Bình An, Bông Sen"],
              ["**Vai trò**", "Nơi bắt đầu", "Mở rộng trong nhà máy", "**Nhân rộng**"],
              ["**Thời gian**", "Tháng thứ 1–8", "Tháng thứ 9–12", "Năm thứ 2"],
              [
                "**Câu hỏi mô hình trả lời** *(ví dụ)*",
                "Lịch tuần nào khả thi và cho kết quả tốt nhất? Ca này hao hụt ở đâu, vì sao? Khi nào phòng chiết rót có nguy cơ vượt ngưỡng, xử lý trước thế nào?",
                "Khu sấy nên chạy mẻ nào trước để đủ bột cho mọi dây chuyền? Jar Line tăng tốc thì điểm nghẽn dịch chuyển đến đâu?",
                "Ở dòng bột, định lượng và độ ẩm ảnh hưởng thế nào đến sản lượng? Ở dòng chất lỏng, lịch CIP nào ít thời gian chờ nhất? Một lần dừng ảnh hưởng thế nào đến kế hoạch của cả mạng lưới?",
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
    theme: "light",
    layout: "wide",
    eyebrow: "Ba ứng dụng của giai đoạn đầu",
    title: "Ba ứng dụng cụ thể cho dây chuyền NESCAFÉ Dolce Gusto",
    blocks: [
      {
        kind: "lead",
        text: "Mỗi ứng dụng đại diện cho một mắt xích thiết yếu trong quy trình vận hành liên kết toàn diện: **Kế hoạch → Vận hành → Dự báo trước & Phục hồi**. Cả ba ứng dụng đều được chuẩn hóa trên một nền tảng dữ liệu tập trung và cùng học trên một mô hình AI duy nhất.",
      },
      { kind: "module", id: "M18", variant: "detail" },
      { kind: "h3", text: "Kiến trúc triển khai trên dây chuyền Dolce Gusto" },
      {
        kind: "table",
        head: ["Tầng", "Trên dây chuyền Dolce Gusto", "Nguyên tắc"],
        rows: [
          [
            "**Nguồn dữ liệu**",
            "PLC của L1, L2 (vít định lượng, hàn màng, cân kiểm, đóng hộp, robot xếp pallet) · cảm biến độ ẩm, nhiệt độ phòng chiết rót · AHU-01, AHU-02, chiller · SAP/MES (lệnh sản xuất, cấp bột) · nhu cầu tuần, kế hoạch tuần · sổ ca, nhật ký dừng máy",
            "Chỉ đọc; không thu thập công thức",
          ],
          ["**Kết nối**", "Historian replica hoặc OPC UA qua gateway trong mạng OT · API hoặc file định kỳ cho SAP/MES và bảng tính", "Không truy cập trực tiếp bộ điều khiển"],
          ["**① Nền tảng dữ liệu**", "Bản đồ dây chuyền (công đoạn, thiết bị, phòng, tiện ích) · kho chuỗi thời gian · kho sự kiện: dừng máy, chuyển đổi, cảnh báo, quyết định", "Đồng bộ mã lô, mã máy, thời gian"],
          [
            "**② Mô hình AI Thế giới thực**",
            "Dự báo độ ẩm và AHU (Ứng dụng 3) · hao hụt kỳ vọng và định lượng (Ứng dụng 2) · năng lực, chuyển đổi và kết quả của kế hoạch (Ứng dụng 1)",
            "Dự báo kèm mức độ chắc chắn; nói \"chưa đủ dữ liệu\" khi cần",
          ],
          ["**Tính toán và tối ưu**", "Cân bằng vật chất (Ứng dụng 2) · bộ giải tối ưu có ràng buộc tạo kế hoạch (Ứng dụng 1)", "Mọi con số truy được về dữ liệu gốc"],
          ["**③ Tác nhân AI**", "Báo cáo ca, ngày, tuần · cảnh báo kèm checklist · hồ sơ sự cố · kế hoạch tuần nháp · trả lời câu hỏi bằng tiếng Việt", "Mô hình ngôn ngữ chỉ đọc đầu vào và giải thích"],
          ["**Người duyệt**", "Trưởng ca · Bảo trì · QA · Bộ phận Kế hoạch · Trưởng phòng Sản xuất", "Con người phê duyệt mọi thay đổi"],
          ["**Hạ tầng**", "Máy chủ tại nhà máy hoặc vùng cloud Nestlé duyệt", "Mất kết nối thì dây chuyền vẫn chạy bình thường"],
        ],
      },
      {
        kind: "quote",
        lines: true,
        text: "**Tối ưu tốc độ** lập kế hoạch và báo cáo\n**Giải phóng công sức** nhờ tự động hóa thu thập dữ liệu\n**Kiểm soát chặt chẽ** rủi ro môi trường và hao hụt\n**Con người giữ toàn quyền** ra quyết định",
      },
      { kind: "p", text: "**Mở rộng sau giai đoạn 1:**" },
      {
        kind: "list",
        items: [
          "Tận dụng kiến trúc mô hình sẵn có để tối ưu bài toán dừng ngắn, điểm nghẽn và sẵn sàng vận hành",
          "Dễ dàng nhân rộng xuyên suốt chuỗi sản xuất từ khu chiết xuất, sấy, dây chuyền đóng lọ (Jar Line) cho đến toàn bộ hệ sinh thái Nestlé Việt Nam.",
        ],
      },
      { kind: "h3", text: "Demo trên nền tảng Minder AI" },
      { kind: "label", variant: "sim", text: "Dữ liệu mô phỏng phục vụ demo, không phải số liệu thật của Nestlé Việt Nam." },
      {
        kind: "video",
        video: {
          src: "/decks/nestle-vietnam/demo-nen-tang.mp4",
          poster: "/decks/nestle-vietnam/demo-nen-tang.jpg",
          width: 1920,
          height: 1004,
          title: "Không gian vận hành dây chuyền Dolce Gusto trên Minder AI",
          caption:
            "Tổng quan Site Manager · mô hình dây chuyền L1, L2 · phát hiện lỗi kèm nguyên nhân chính và cách xử lý lần trước · bảng hao hụt nguyên liệu và tổn thất thời gian",
        },
      },
      {
        kind: "video",
        video: {
          src: "/decks/nestle-vietnam/demo-hoi-minder.mp4",
          poster: "/decks/nestle-vietnam/demo-hoi-minder.jpg",
          width: 1920,
          height: 1004,
          title: "Hỏi đáp với Trợ lý Minder AI",
          caption: "Một câu hỏi bằng tiếng Việt → Minder kiểm tra dữ liệu dây chuyền, dựng biểu đồ OEE theo ca và tóm tắt kết luận",
        },
      },
    ],
    details: [
      { title: "Chi tiết ba ứng dụng và nền dữ liệu", printOnly: true, blocks: useCasePrintBlocks },
      {
        title: "Bản đồ mở rộng trong nhà máy Nestlé Trị An",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Khu vực", "Mô hình hỗ trợ"],
            rows: expansionMap.map(([a, b]) => [a, b]),
          },
        ],
      },
    ],
  },
  {
    id: "do-luong",
    act: 3,
    theme: "light",
    layout: "wide",
    eyebrow: "Giá trị kinh doanh đo được",
    title: "Mỗi ứng dụng có số liệu nền, mục tiêu, cách quy ra tiền và người xác nhận",
    blocks: [
      {
        kind: "table",
        head: ["Ứng dụng", "Chỉ số chính", "Số liệu nền", "Mục tiêu đề xuất", "Quy ra tiền", "Người xác nhận"],
        rows: [
          [
            "**Nền tảng dữ liệu · Báo cáo ca, ngày, tuần**",
            "Giờ tổng hợp báo cáo mỗi tuần; tỷ lệ chỉ số tự động",
            "Đo trong khảo sát",
            "≥90% chỉ số tự động; báo cáo có ngay cuối ca",
            "Giờ công tiết kiệm",
            "Trưởng phòng Sản xuất",
          ],
          [
            "**Ứng dụng 1 · Tự động lập báo cáo và kế hoạch**",
            "Thời gian lập kế hoạch; giờ chuyển đổi; sản lượng so với kế hoạch",
            "Khoảng 3 ngày công mỗi tuần",
            "≤ ½ ngày; 100% đáp ứng ràng buộc; ≥70% dòng được giữ nguyên",
            "Ngày công tiết kiệm + giờ chuyển đổi giảm × sản lượng mỗi giờ",
            "Bộ phận Kế hoạch",
          ],
          [
            "**Ứng dụng 2 · Đo lường hao hụt tự động**",
            "kg bột hao hụt mỗi ca theo nguyên nhân; gram dư trên mỗi viên",
            "Số liệu đã ghi 3–6 tháng gần nhất",
            "≥90% số ca có số tự động; gram dư giảm; 0 vi phạm khối lượng tịnh",
            "kg bột tiết kiệm × giá bột mỗi kg",
            "Sản xuất, QA",
          ],
          [
            "**Ứng dụng 3 · Cảnh báo sớm rủi ro môi trường sản xuất**",
            "Giờ dừng vì môi trường; thời gian báo trước",
            "Nhật ký dừng máy 6–12 tháng",
            "Báo trước ≥2 giờ cho ≥80% lần vượt hoặc tiến sát ngưỡng",
            "Giờ dừng tránh được × sản lượng mỗi giờ × biên đóng góp",
            "Bảo trì, Sản xuất",
          ],
        ],
      },
      {
        kind: "list",
        items: [
          "**Mục tiêu là đề xuất**, chốt cùng Sản xuất, Kế hoạch, QA và Tài chính sau khảo sát. Celesnity không đưa con số tiết kiệm trước khi có số liệu nền.",
          "**Đo bằng đơn vị vật lý trước** (giờ, kg, gram trên mỗi viên, số ca), quy ra tiền sau theo đơn giá do bộ phận Tài chính Nestlé cung cấp.",
          "**Không tính vào lợi ích:** sản lượng tăng do nhu cầu, kết quả của chương trình khác, hay coi mỗi cảnh báo là một lần dừng tránh được.",
          "**Không đạt Cổng 2 thì không chuyển sang giai đoạn có phí tiếp theo.**",
        ],
      },
    ],
  },
  {
    id: "lo-trinh",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Lộ trình 12 tháng và Đội ngũ IT của nhà máy Trị An làm chủ hệ thống",
    title: "Các giai đoạn triển khai",
    blocks: [
      { kind: "module", id: "M15" },
      { kind: "h3", text: "Sản phẩm bàn giao và nghiệm thu" },
      {
        kind: "table",
        head: ["Thời điểm", "Sản phẩm bàn giao", "Nghiệm thu"],
        rows: [
          ["**T+1** · Cổng 1", "Bản đồ dây chuyền L1, L2 · danh mục dữ liệu được ký · báo cáo ca, ngày, tuần chạy tự động", "IT/OT, Trưởng phòng Sản xuất"],
          ["**T+2–T+3**", "Báo cáo thi trên lịch sử của Ứng dụng 3 và Ứng dụng 1 · bảng đối chiếu hao hụt của Ứng dụng 2", "Bảo trì, Kế hoạch, Sản xuất"],
          ["**T+4** · Cổng 2", "Kết quả thi trên bộ đề thi kín · đề xuất ngưỡng cảnh báo · Đội ngũ IT của nhà máy Trị An tự vận hành 1 vòng dữ liệu", "Ban Giám đốc nhà máy"],
          ["**T+5–T+6**", "Cảnh báo sớm môi trường dùng thật · tác nhân lập kế hoạch tuần · hao hụt tự điền báo cáo ca", "Bảo trì, Kế hoạch, Sản xuất, QA"],
          ["**T+8** · Cổng 3", "Ba ứng dụng nối thành một quy trình: sự cố → tác động → điều chỉnh kế hoạch · báo cáo giá trị so với số liệu nền", "Ban Giám đốc nhà máy, bộ phận Tài chính"],
        ],
      },
      { kind: "h3", text: "Nhà máy Nestlé Trị An chỉ cần 3 việc" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Mở dữ liệu đã có:** chỉ đọc, không thu thập công thức hay bí quyết sản xuất, không làm gián đoạn hệ thống hiện tại.",
          "**Cử người:** 1 đầu mối IT/OT cho Đội ngũ IT của nhà máy Trị An; chuyên gia Kế hoạch ~4 giờ/tuần, Sản xuất và Bảo trì ~2 giờ/tuần, QA ~1 giờ/tuần.",
          "**Nhận xét, đánh giá và chấm điểm trên bộ đề thi kín.**",
        ],
      },
      { kind: "h3", text: "Chi tiết theo từng tháng" },
      { kind: "module", id: "M10" },
      { kind: "h3", text: "Ai vận hành hệ thống" },
      {
        kind: "table",
        head: ["Giai đoạn", "Celesnity", "Nhà máy Nestlé Trị An"],
        rows: [
          ["Thử nghiệm (T+1–T+4)", "90%", "10%"],
          ["Triển khai (T+5–T+8)", "50%", "50%"],
          ["Nhân rộng (T+9–T+12)", "20%", "**80%**"],
          ["Năm thứ 2: nhà máy Nestlé thứ hai", "Hỗ trợ", "**Dẫn dắt**"],
        ],
      },
      { kind: "h3", text: "Nhân sự theo giai đoạn" },
      { kind: "module", id: "M16" },
      { kind: "h3", text: "Thang năng lực của Đội ngũ IT của nhà máy Trị An" },
      { kind: "module", id: "M17" },
      {
        kind: "media",
        side: "left",
        photo: {
          src: "/decks/nestle-vietnam/doi-tri-an.jpg",
          alt: "Ba nhân viên kiểm tra sản phẩm tại dây chuyền viên nén",
          width: 1024,
          height: 681,
          caption: "Đội ngũ nhân sự của nhà máy Nestlé Trị An giữ quyền vận hành và quyết định",
          credit: PHOTO_CREDIT,
        },
        blocks: [
          {
            kind: "p",
            text: "**Nguyên tắc chia vai:** IT/OT vận hành hệ thống. Chuyên gia nghiệp vụ (Kế hoạch, Sản xuất, QA) xác nhận mô hình có đúng về chuyên môn hay không.",
          },
        ],
      },
    ],
    details: [
      {
        title: "Thang năng lực của Đội ngũ IT của nhà máy Trị An",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            layout: "vertical",
            head: ["Bậc", "Đội ngũ IT của nhà máy Trị An làm được", "Bài kiểm tra", "Khi nào"],
            rows: [
              [
                "**1. Vận hành**",
                "Chạy luồng dữ liệu, giám sát mô hình, quản trị người dùng, cập nhật ràng buộc kế hoạch, xử lý sự cố thường gặp",
                "Tự vận hành trọn 1 vòng dữ liệu (T+4) → tự vận hành liên tục 4 tuần (T+8)",
                "T+4–T+8",
              ],
              [
                "**2. Tự huấn luyện lại**",
                "Cập nhật mô hình bằng dữ liệu mới, thêm SKU và dây chuyền, chấm điểm trên bộ đề thi kín, quyết định phát hành phiên bản",
                "Tự huấn luyện lại không cần hỗ trợ, kết quả không kém phiên bản trước",
                "T+11–T+12",
              ],
              [
                "**3. Dẫn dắt nhân rộng**",
                "Dẫn dắt khảo sát và thử nghiệm tại nhà máy Nestlé thứ hai, cùng thiết kế bộ đề thi mới, đồng tác giả báo cáo kỹ thuật",
                "Nhà máy Nestlé thứ hai đạt Cổng 2 với Celesnity ở vai trò hỗ trợ",
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
                "**~5–6 người**: quản lý triển khai 1 · kỹ sư triển khai tại nhà máy (FDE) 2 · kỹ sư AI 1 · kỹ sư dữ liệu 1 · trưởng nhóm nghiên cứu ½",
                "**~4–5 người**: quản lý 1 · FDE 1,5 · kỹ sư AI 1 · kỹ sư dữ liệu ½ · nghiên cứu ½",
                "**~3 người**: quản lý ½ · FDE 1 · kỹ sư AI 1 · nghiên cứu ½",
              ],
              [
                "**Đội ngũ IT của nhà máy Trị An: vận hành hệ thống**",
                "**1 người**: đầu mối IT/OT",
                "**2 người**: + kỹ sư dữ liệu",
                "**3 người**: + kỹ sư vận hành mô hình",
              ],
              [
                "**Chuyên gia nghiệp vụ tại nhà máy Trị An**",
                "Kế hoạch ~4 giờ/tuần · Sản xuất, Bảo trì ~2 giờ/tuần mỗi người · QA, đầu mối dữ liệu ~1–2 giờ/tuần",
                "Như trên",
                "Như trên · + đầu mối các dây chuyền mới",
              ],
              ["**Lãnh đạo của nhà máy Trị An**", "Giám đốc nhà máy: họp định kỳ hằng tháng và tham dự đánh giá tại mỗi cổng nghiệm thu · Bộ phận Tài chính: tham dự đánh giá tại mỗi cổng nghiệm thu", "", ""],
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
                "Khảo sát dây chuyền Dolce Gusto. Các bộ phận Sản xuất, Kế hoạch, QA và Tài chính chốt chỉ số, số liệu nền và mục tiêu của ba ứng dụng. Ký thỏa thuận dữ liệu",
                "Phạm vi và số liệu nền được thống nhất",
              ],
              [
                "**3–4**",
                "Dựng môi trường được IT/OT duyệt. Kết nối chỉ đọc với PLC, historian, SAP/MES, cảm biến môi trường. Đồng bộ mã lô, mã máy, thời gian. **Bật nền dữ liệu và báo cáo ca**",
                "**Cổng 1** · báo cáo ca chạy trên chuyền",
              ],
              ["**5–8**", "Nối dữ liệu lịch sử. Nestlé dựng **bộ đề thi kín**. Xây bản đồ liên kết sản xuất và mô hình phiên bản đầu", "Mô hình v0.1"],
              [
                "**9–12**",
                "**Thi trên dữ liệu lịch sử của nhà máy Trị An:** Ứng dụng 3 với mọi lần độ ẩm vượt hoặc tiến sát ngưỡng; Ứng dụng 1 với các kế hoạch tuần đã chạy; Ứng dụng 2 đối chiếu với số hao hụt đã cân. So với cách làm hiện tại và với một phương án tối ưu thông thường. Chuyên gia Kế hoạch, Sản xuất, Bảo trì, QA chấm mẫu",
                "Kết quả thi",
              ],
              ["**13–14**", "Chạy song song trên ca thật. Đội ngũ IT của nhà máy Trị An tự vận hành một vòng dữ liệu và chấm điểm", "Bằng chứng chuyển giao"],
              ["**15–16**", "Bộ phận Tài chính xác nhận cách đo giá trị. Báo cáo trước Ban Giám đốc nhà máy", "**Cổng 2**: mở rộng, điều chỉnh hay dừng"],
            ],
          },
          {
            kind: "p",
            text: "**Năm thứ 2:** thử nghiệm tại nhà máy Nestlé thứ hai **do Đội ngũ IT của nhà máy Trị An dẫn dắt**, Celesnity hỗ trợ.",
          },
        ],
      },
      {
        title: "Mười hai tháng: mỗi ứng dụng là một chương",
        printOnly: true,
        blocks: [
          { kind: "note", text: "T+1 là tháng đầu tiên sau khi Nestlé duyệt quyền truy cập dữ liệu và môi trường triển khai." },
          {
            kind: "table",
            head: ["Tháng", "Giai đoạn", "Ứng dụng trên dây chuyền Dolce Gusto", "Nhân rộng", "Dữ liệu và nền tảng", "Đội ngũ IT của nhà máy Trị An", "Cổng nghiệm thu"],
            rows: [
              ["**T+1**", "Thử nghiệm: Học", "**Nền dữ liệu, báo cáo ca dùng thật**", "", "Môi trường được IT/OT duyệt · kết nối chỉ đọc · bản đồ dây chuyền L1, L2", "Học việc cùng Celesnity", "**Cổng 1**"],
              ["**T+2**", "Thử nghiệm: Học", "Ứng dụng 3 thi trên lịch sử · Ứng dụng 2 đối chiếu với số cân", "", "Bộ đề thi kín · lịch sử môi trường, AHU, cân kiểm", "Học việc cùng Celesnity", ""],
              ["**T+3**", "Thử nghiệm: Học", "Ứng dụng 1 thi trên lịch sử", "", "Nối dữ liệu kế hoạch, nhu cầu và đơn hàng", "Học việc cùng Celesnity", ""],
              ["**T+4**", "Thử nghiệm: Học", "Kết quả thi của ba ứng dụng", "", "", "**Tự vận hành trọn 1 vòng dữ liệu**", "**Cổng 2**"],
              ["**T+5**", "Dùng thật", "**Ứng dụng 3 dùng thật**", "", "Mở cho Bảo trì, QA và trưởng ca", "Cùng vận hành", ""],
              ["**T+6**", "Dùng thật", "**Ứng dụng 1 và Ứng dụng 2 dùng thật**", "", "Mở cho bộ phận Kế hoạch và Sản xuất", "Cùng vận hành", ""],
              ["**T+7**", "Dùng thật", "Nối ba ứng dụng: sự cố → tác động → điều chỉnh kế hoạch", "", "Nối sự cố với kế hoạch tuần", "Cùng vận hành", ""],
              ["**T+8**", "Dùng thật", "Đánh giá trên ca thật · báo cáo giá trị", "Khảo sát Jar Line và các dây chuyền khác", "", "**Tự vận hành liên tục 4 tuần**", "**Cổng 3**"],
              ["**T+9**", "Nhân rộng", "Ứng dụng 2 đề xuất điều chỉnh định lượng", "**Jar Line**", "Dữ liệu dây chuyền mới", "Tự vận hành", ""],
              ["**T+10**", "Nhân rộng", "", "Các dây chuyền viên nén và túi khác", "", "Tự vận hành", ""],
              ["**T+11**", "Nhân rộng", "", "Khu chiết xuất và sấy · kế hoạch chung", "Dữ liệu khu bột", "**Tự huấn luyện lại mô hình**", ""],
              ["**T+12**", "Nhân rộng", "Báo cáo kỹ thuật chung", "**Kế hoạch cho nhà máy Nestlé thứ hai**", "", "**Dẫn dắt khảo sát nhà máy Nestlé thứ hai**", "**Cổng 4**"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hop-tac",
    act: 3,
    theme: "light",
    eyebrow: "Hình thức hợp tác",
    title: "Nhà máy Nestlé Trị An đầu tư vào một năng lực vận hành mới, mở rộng từng bước dựa trên kết quả đã được kiểm chứng",
    blocks: [
      { kind: "h3", text: "Ba hạng mục triển khai chính" },
      { kind: "module", id: "M14", variant: "package" },
      {
        kind: "list",
        items: [
          "**Thử nghiệm:** phí cố định, phạm vi rõ ràng, thống nhất sau khảo sát dây chuyền Dolce Gusto. Không đạt Cổng 2 thì không chuyển sang giai đoạn có phí tiếp theo.",
          "**Sau thử nghiệm:** định giá theo giá trị bộ phận Tài chính đã xác minh. Mỗi dây chuyền, mỗi nhà máy được định giá theo phạm vi riêng. Chi phí tích hợp một lần được tách khỏi phí định kỳ.",
          "**Hướng nghiên cứu (tùy chọn):** có câu hỏi khoa học, mốc và tiêu chí đạt riêng. Ứng dụng vận hành phải tạo ra giá trị kể cả khi hướng nghiên cứu không đạt.",
          "**Ngoài phạm vi thử nghiệm đầu tiên:** thay đổi thông số an toàn thực phẩm, chu trình vệ sinh đã thẩm định, quy tắc chuyển đổi liên quan đến chất gây dị ứng, thay nguyên liệu, quyết định xuất hay hủy lô.",
          "**Không đề xuất:** độc quyền · cam kết triển khai toàn mạng lưới · đưa dữ liệu ra khỏi môi trường đã duyệt.",
          "**Nguồn tài trợ mô hình nền:** Celesnity tự tài trợ.",
        ],
      },
      { kind: "h3", text: "Sáu cam kết không thay đổi" },
      { kind: "module", id: "M13", variant: "commitments" },
      { kind: "h3", text: "Sở hữu trí tuệ" },
      {
        kind: "cards",
        cols: 3,
        tone: "orange",
        head: ["Tài sản", "Chủ sở hữu", "Quyền của Nestlé"],
        rows: [
          ["Dữ liệu vận hành, công thức, hồ sơ nhà máy", "Nestlé", "Toàn quyền"],
          ["Mô hình riêng và các kết quả về hoạt động của nhà máy Trị An", "Nestlé", "Sở hữu; Celesnity chỉ dùng để vận hành dịch vụ"],
          ["Mô hình nền, mã huấn luyện, bộ công cụ đánh giá", "Celesnity", "Giấy phép nội bộ vĩnh viễn, miễn phí bản quyền"],
        ],
      },
      { kind: "h3", text: "Pháp lý" },
      {
        kind: "list",
        items: [
          "**Văn bản áp dụng:** Luật Trí tuệ nhân tạo 134/2025/QH15 (hiệu lực 1/3/2026) · Nghị định 142/2026/NĐ-CP · Quyết định 33/2026/QĐ-TTg (hiệu lực 15/8/2026) · Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 và Nghị định 356/2025/NĐ-CP (hiệu lực 1/1/2026).",
          "**Phân loại rủi ro:** Celesnity lập hồ sơ phân loại cho từng chức năng và thông báo Bộ KH&CN khi bắt buộc; Nestlé nhận hồ sơ với vai trò bên triển khai. Không gán trước mức rủi ro. Phân loại được rà soát lại khi mở rộng phạm vi.",
          "**An ninh:** theo kiến trúc nhà máy đã duyệt, tham chiếu IEC 62443 và NIST SP 800-82; bắt đầu ở chế độ chỉ đọc; ghi nhật ký mọi lần gọi mô hình. Khi mất kết nối, nhà máy vẫn chạy bình thường qua hệ thống hiện có.",
          "**An toàn thực phẩm:** HACCP và hệ thống chất lượng của Nestlé là một lớp riêng; báo cáo AI không thay thế được.",
        ],
      },
      { kind: "h3", text: "Quản trị" },
      {
        kind: "cards",
        cols: 3,
        rows: [
          ["Ban chỉ đạo chung", "Giám đốc nhà máy chủ trì, cùng Trưởng phòng Sản xuất, đầu mối IT/OT, CEO và CTO Celesnity. Họp hằng tháng và tại mỗi cổng nghiệm thu."],
          ["Hội đồng dữ liệu", "IT/OT, QA, đầu mối dữ liệu; họp hằng tháng."],
          ["Nhóm làm việc chung", "Họp hằng tuần, tại nhà máy. Thay đổi ảnh hưởng đến sản xuất đi theo quy trình quản lý thay đổi (MoC) hiện có."],
        ],
      },
    ],
    details: [
      {
        title: "Sáu cam kết không thay đổi",
        printOnly: true,
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Mô hình tập trung dự báo, so sánh và tối ưu hoá. **Con người có thẩm quyền phê duyệt mọi thay đổi.** Tự động hoá bằng AI theo từng bước đồng hành cùng nhà máy Nestlé Trị An; mỗi bước lên mức tự chủ cao hơn là quyết định riêng của Nestlé, qua quy trình quản lý thay đổi của nhà máy.",
              "Interlock, bảo vệ an toàn, thông số đã thẩm định, quyết định QA và xuất lô **giữ nguyên quyền hiện tại**. Ngưỡng và quy tắc lấy từ tiêu chuẩn của nhà máy, **không do AI đặt**.",
              "Dữ liệu nằm trong môi trường Nestlé duyệt sau đánh giá IT/OT; không mặc định đưa ra khỏi Việt Nam. **Công thức và thông số quy trình không bao giờ rời Nestlé.**",
              "Nestlé duyệt mục đích, người truy cập, thời hạn lưu và mọi phần được chia sẻ. Dữ liệu Nestlé không gộp sang khách hàng khác và không dùng cho đối thủ. Khi chấm dứt hợp tác, Nestlé giữ mô hình riêng và giấy phép; dữ liệu được trả lại hoặc xóa theo yêu cầu.",
              "Dữ liệu người lao động **không bao giờ** được dùng để xếp hạng hay kỷ luật cá nhân.",
              "Mọi công bố, mọi lần dùng tên hay logo Nestlé cần được đồng ý bằng văn bản (xem trước ít nhất 30 ngày).",
            ],
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
              ["**① Mô hình AI Thế giới thực**", "Bản riêng của nhà máy Trị An, chạy trong môi trường Nestlé duyệt; nhận các phiên bản mô hình nền mới"],
              [
                "**② Bộ ứng dụng AI-native**",
                "Báo cáo ca, ngày, tuần · kế hoạch sản xuất tuần · cân bằng hao hụt bột · dự báo và cảnh báo môi trường phòng chiết rót, trong không gian làm việc của Kế hoạch, Sản xuất, Bảo trì, QA · bảng chỉ tiêu",
              ],
              [
                "**③ Triển khai và nghiệm thu (kỹ sư thực địa)**",
                "Cấu hình theo quy trình của nhà máy Trị An · kết nối chỉ đọc với hệ thống hiện có · **đào tạo Đội ngũ IT của nhà máy Trị An tới khi tự vận hành, tự huấn luyện lại và dẫn dắt nhân rộng**",
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
            head: ["", "**Nhà máy Nestlé Trị An**", "**Celesnity**"],
            rows: [
              [
                "**Nhận**",
                "Giá trị đo được trên dây chuyền · mô hình riêng chạy trong môi trường Nestlé duyệt · **Đội ngũ IT của nhà máy Trị An tự vận hành và huấn luyện lại** · quyền dùng mô hình nền · tiếp cận tính năng mới sớm 6 tháng · chủ trì Ban chỉ đạo · con đường mở rộng ra toàn nhà máy và các nhà máy Nestlé Việt Nam",
                "Mô hình được kiểm chứng trong sản xuất thực phẩm · bản cập nhật mô hình khi Nestlé duyệt (**không bao giờ là dữ liệu thô**) · đối tác tham chiếu khi Nestlé đồng ý · bộ đề thi làm chung · doanh thu",
              ],
              [
                "**Góp**",
                "Dữ liệu chỉ đọc, trong phạm vi Nestlé duyệt · chuyên gia Kế hoạch, Sản xuất, QA · hạ tầng theo kiến trúc Nestlé duyệt · Đội ngũ IT của nhà máy Trị An 1→3 người",
                "Mô hình nền · nền tảng dữ liệu tập trung · đội kỹ sư triển khai tại nhà máy (FDE) 3→5 người · chi phí nghiên cứu mô hình nền",
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
        text: "Nhà máy Nestlé Trị An vận hành những dây chuyền cà phê hiện đại bậc nhất của Nestlé trong khu vực. Máy móc, cảm biến và hệ thống sản xuất đều đã ở mức cao. Bước tiếp theo là kết nối các hệ thống ấy trong từng quyết định: khi một sự việc xảy ra trên chuyền, nhà máy cần biết ngay nó ảnh hưởng đến lô nào, kế hoạch nào, đơn hàng nào, và nên xử lý thế nào. Thế hệ AI tiếp theo đang chuyển từ đọc hiểu ngôn ngữ sang thực sự thấu hiểu và có thể tương tác với thế giới vật lý. Nhà máy nào kết nối được các quyết định của mình thành một quy trình vận hành liên kết toàn diện sẽ giữ lợi thế lâu dài.",
      },
      {
        kind: "p",
        text: "Các nhà máy có thể ứng dụng nhiều công cụ AI phổ biến. Nhưng để đi trước và đón đầu xu thế công nghệ của ngành sản xuất, Mô hình AI Thế giới thực **(từ nay gọi là Mô hình)** là hướng phát triển tất yếu của nghiên cứu AI trên toàn cầu. Nhà máy Nestlé Trị An có đủ điều kiện để trở thành một trong những nhà máy đầu tiên trong mạng lưới Nestlé ứng dụng và vận hành Mô hình này.",
      },
      {
        kind: "p",
        text: "Vì vậy, Celesnity trân trọng đề xuất nhà máy Nestlé Trị An trở thành **Đối tác công nghiệp sáng lập** của chương trình **Nhà máy siêu thông minh**. Chương trình xây dựng một Mô hình AI Thế giới thực hiểu cách nhà máy Trị An vận hành. Mô hình chạy trong môi trường Nestlé duyệt, trên dữ liệu của nhà máy Trị An, và **do chính Đội ngũ IT của nhà máy Trị An vận hành**.",
      },
      {
        kind: "p",
        text: "**Tầm nhìn**\nMỗi dây chuyền tại nhà máy Trị An, rồi mỗi nhà máy Nestlé tại Việt Nam, đều có thể **tự học** từ mỗi kế hoạch và kết quả thực tế, **dự báo trước** hệ quả của quyết định tiếp theo, và **nhân rộng** kinh nghiệm sang dây chuyền và nhà máy khác.",
      },
      {
        kind: "p",
        text: "**Cách làm**\nChương trình bắt đầu nhỏ và chắc: một dây chuyền NESCAFÉ Dolce Gusto, ba ứng dụng (kế hoạch sản xuất tuần, hao hụt bột, môi trường phòng chiết rót) trên một nền dữ liệu chung, mở dần theo kết quả đã kiểm chứng. Mỗi ứng dụng có bài toán, phạm vi, dữ liệu cần, sản phẩm bàn giao và chỉ số đo rõ ràng. Dữ liệu chỉ đọc, không làm gián đoạn hệ thống hiện tại. Ngay từ tháng thứ 1, Đội ngũ IT của nhà máy Trị An làm việc cùng kỹ sư Celesnity tại nhà máy, để năng lực được đào tạo và ở lại nhà máy Trị An.",
      },
      {
        kind: "p",
        text: "**Kết quả dự kiến sau 12 tháng**\nBa ứng dụng chạy thật trên dây chuyền Dolce Gusto và được nối thành một quy trình Kế hoạch → Vận hành → Phục hồi; mở rộng sang Jar Line, các dây chuyền khác và khu chiết xuất, sấy, với một kế hoạch chung cho toàn nhà máy. Đội ngũ IT của nhà máy Trị An **tự vận hành, tự huấn luyện lại và phát triển hệ thống**, và cùng Celesnity xây dựng kế hoạch cụ thể để nhân rộng sang nhà máy Nestlé thứ hai tại Việt Nam.",
      },
      {
        kind: "p",
        text: "**Cam kết của Celesnity**\nMô hình tập trung dự báo, so sánh và tối ưu hoá. Interlock, thông số an toàn thực phẩm và quyết định QA giữ nguyên quyền hiện tại. Công thức và thông số quy trình không bao giờ rời Nestlé. **Con người có thẩm quyền phê duyệt mọi thay đổi.**",
      },
      { kind: "p", text: "**Kính đề nghị Ban Giám đốc**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất định hướng:** nhà máy Nestlé Trị An tham gia với vai trò Đối tác công nghiệp sáng lập. Dây chuyền NESCAFÉ Dolce Gusto là điểm khởi đầu; toàn nhà máy và các nhà máy Nestlé Việt Nam là bước tiếp theo.",
          "**Cử đầu mối:** người phụ trách bài toán ở bộ phận Sản xuất, đầu mối Kế hoạch, QA, IT/OT, Tài chính, và 1 đầu mối IT/OT cho Đội ngũ IT vận hành hệ thống.",
          "**Cho phép khảo sát dây chuyền Dolce Gusto** để chốt danh sách dữ liệu, số liệu nền, mục tiêu của từng ứng dụng và phí thử nghiệm.",
        ],
      },
      {
        kind: "p",
        text: "**Tại buổi làm việc ở nhà máy**, Celesnity đề xuất: đi qua ba ứng dụng trên dây chuyền thật; rà danh sách dữ liệu cùng IT/OT; thống nhất cách đo số liệu nền và người xác nhận cho từng chỉ số.",
      },
      {
        kind: "p",
        text: "Chúng tôi tin rằng một nhà máy cà phê tại Việt Nam có thể trở thành một trong những nhà máy đầu tiên trong mạng lưới Nestlé toàn cầu điều hành kế hoạch và sản xuất theo một quy trình vận hành liên kết toàn diện. Celesnity mong được đồng hành cùng nhà máy Nestlé Trị An trên chặng đường đó.",
      },
      { kind: "signature", lines: ["Trân trọng,", "**Celesnity**, đơn vị phát triển nền tảng Minder AI"] },
    ],
  },
];

/** Không có section tạm cất (#mot-ngay và #pham-vi đã xoá ngày 07/10/2026) */
export const parkedSections: Section[] = [];

/** Đoạn kết (chỉ dùng ở bản in) */
export const closing: Closing = {
  headline: "Nhà máy Nestlé Trị An đã có những dây chuyền cà phê hiện đại bậc nhất. Bước tiếp theo: kết nối mọi quyết định của nhà máy thành một quy trình vận hành liên kết toàn diện.",
  lead: "Một ngày không xa:",
  story:
    "Tại nhà máy Nestlé Bình An, một kỹ sư kế hoạch mở mô hình lần đầu. Mô hình chưa biết gì về bồn chứa và chu trình CIP của nhà máy Bình An. Nhưng nó đã biết một sự cố lan qua lô, mẻ, kế hoạch và đơn hàng như thế nào, nhờ những gì đã học trên dây chuyền Dolce Gusto ở nhà máy Trị An. Hôm nay, nó bắt đầu học về nhà máy Bình An.",
  tagline: "NHÀ MÁY SIÊU THÔNG MINH: Tự học · Dự báo trước · Nhân rộng.",
  owner: "Do Đội ngũ IT của nhà máy Trị An vận hành.",
  thanks: "Celesnity mong được cùng nhà máy Nestlé Trị An xây dựng nó.",
  pdf: "Tải bản PDF",
  ask: "Hỏi trợ lý",
};

/** Lợi ích hai bên (M14 variant "benefits") */
export const benefits: { partner: BenefitSide; celesnity: BenefitSide } = {
  partner: {
    name: "Nhà máy Nestlé Trị An",
    receive: [
      "Giá trị đo được trên dây chuyền",
      "Mô hình riêng chạy trong môi trường Nestlé duyệt",
      "**Đội ngũ IT của nhà máy Trị An tự vận hành và huấn luyện lại**",
      "Quyền dùng mô hình nền",
      "Tiếp cận tính năng mới sớm 6 tháng",
      "Chủ trì Ban chỉ đạo",
      "Con đường mở rộng ra toàn nhà máy và các nhà máy Nestlé Việt Nam",
    ],
    give: [
      "Dữ liệu chỉ đọc, trong phạm vi Nestlé duyệt",
      "Chuyên gia Kế hoạch, Sản xuất, QA",
      "Hạ tầng theo kiến trúc Nestlé duyệt",
      "Đội ngũ IT của nhà máy Trị An 1→3 người",
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
    give: ["Mô hình nền", "Nền tảng dữ liệu tập trung", "Đội kỹ sư triển khai tại nhà máy (FDE) 3→5 người", "Chi phí nghiên cứu mô hình nền"],
  },
};

/** Gói hợp tác (M14 variant "package") */
export const packageParts: PackagePart[] = [
  {
    n: "①",
    name: "Mô hình AI Thế giới thực",
    body: "Bản riêng của nhà máy Trị An, chạy trong môi trường Nestlé duyệt; nhận các phiên bản mô hình nền mới",
  },
  {
    n: "②",
    name: "Bộ ứng dụng AI-native",
    body: "Báo cáo ca, ngày, tuần · kế hoạch sản xuất tuần · cân bằng hao hụt bột · dự báo và cảnh báo môi trường phòng chiết rót, trong không gian làm việc của Kế hoạch, Sản xuất, Bảo trì, QA · bảng chỉ tiêu",
  },
  {
    n: "③",
    name: "Triển khai và nghiệm thu (kỹ sư thực địa)",
    body: "Cấu hình theo quy trình của nhà máy Trị An · kết nối chỉ đọc với hệ thống hiện có · **đào tạo Đội ngũ IT của nhà máy Trị An tới khi tự vận hành, tự huấn luyện lại và dẫn dắt nhân rộng**",
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
          "**Dự báo kèm mức độ chắc chắn:** mô hình nói \"không biết\" khi gặp SKU, chuyển đổi, nguyên liệu hay chế độ vận hành chưa có dữ liệu. Khi đó người vận hành dùng quy trình hiện có.",
          "**Phân biệt nguyên nhân với trùng hợp:** người vận hành thường chọn một thông số vì đã thấy trước vấn đề, nên mô hình dùng phương pháp thống kê để tách tác động thật khỏi lý do chọn. Khi dữ liệu không đủ để phân biệt, mô hình nói rõ.",
          "**Kiểm tra ràng buộc:** bộ giải tối ưu loại mọi phương án vi phạm công suất, tương thích công thức, thời gian lưu cho phép, quy tắc vệ sinh hay giới hạn thiết bị.",
          "**Không thử nghiệm trên dây chuyền:** mô hình chỉ học từ hoạt động đã ghi lại và các thử nghiệm được bộ phận Sản xuất và QA duyệt.",
        ],
      },
      { kind: "p", text: "*Chi tiết kỹ thuật cho đội ngũ IT/OT:*" },
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
    id: "ket-noi",
    title: "Kiến trúc kết nối dữ liệu tại nhà máy",
    blocks: [
      {
        kind: "p",
        text: "Dữ liệu đi lên nền tảng **một chiều, chỉ đọc**: từ hệ thống sẵn có của nhà máy, và từ mô-đun IoT gắn thêm cho thiết bị chưa xuất được dữ liệu khi IT/OT duyệt.",
      },
      { kind: "h3", text: "Kiến trúc hệ thống tổng thể" },
      {
        kind: "diagram",
        nodeWidth: 152,
        flow: {
          branches: [
            {
              group: "Nhà máy Nestlé Trị An",
              branches: [
                {
                  group: "Dây chuyền L1",
                  branches: [
                    { nodes: [{ label: "Vít định lượng" }, { label: "Mô-đun", tone: "edge" }] },
                    { nodes: [{ label: "Hàn màng" }, { label: "Mô-đun", tone: "edge" }] },
                    { nodes: [{ label: "Cân kiểm, đóng hộp" }, { label: "Mô-đun", tone: "edge" }] },
                    { nodes: [{ label: "Robot xếp pallet" }, { label: "Mô-đun", tone: "edge" }] },
                  ],
                  then: [{ label: "Máy tính biên L1", sub: "Raspberry Pi", tone: "edge" }],
                },
                {
                  group: "Dây chuyền L2",
                  branches: [
                    { nodes: [{ label: "Vít định lượng" }, { label: "Mô-đun", tone: "edge" }] },
                    { nodes: [{ label: "Hàn màng" }, { label: "Mô-đun", tone: "edge" }] },
                    { nodes: [{ label: "Cân kiểm, đóng hộp" }, { label: "Mô-đun", tone: "edge" }] },
                    { nodes: [{ label: "Robot xếp pallet" }, { label: "Mô-đun", tone: "edge" }] },
                  ],
                  then: [{ label: "Máy tính biên L2", sub: "Raspberry Pi", tone: "edge" }],
                },
                {
                  nodes: [
                    { label: "Historian, SAP/MES", sub: "hệ thống sẵn có" },
                    { label: "Gateway mạng OT", sub: "OPC UA, API" },
                  ],
                  via: ["chỉ đọc"],
                },
              ],
              then: [],
            },
          ],
          via: "chỉ đọc",
          then: [{ label: "Nền tảng Celesnity", sub: "trong môi trường Nestlé duyệt", tone: "platform" }],
        },
        legend: [
          { tone: "plain", label: "Thiết bị và hệ thống của nhà máy" },
          { tone: "edge", label: "Celesnity lắp đặt" },
          { tone: "platform", label: "Nền tảng" },
        ],
      },
      { kind: "h3", text: "Kiến trúc kết nối thiết bị IoT & xử lý biên" },
      {
        kind: "diagram",
        flow: {
          branches: [
            {
              group: "Hệ thống sẵn có",
              branches: [
                {
                  nodes: [{ label: "PLC L1, L2" }, { label: "Historian replica", sub: "hoặc OPC UA" }],
                },
                {
                  nodes: [{ label: "SAP/MES", sub: "bảng tính kế hoạch" }, { label: "API", sub: "hoặc file định kỳ" }],
                },
              ],
              then: [{ label: "Gateway mạng OT" }],
            },
            {
              group: "Mô-đun IoT gắn thêm",
              branches: [
                {
                  nodes: [{ label: "Cảm biến", sub: "độ ẩm, nhiệt độ phòng chiết rót" }, { label: "MCU + LoRa", tone: "edge" }],
                  via: ["I/O"],
                },
                {
                  nodes: [{ label: "Máy, đèn báo", sub: "chưa nối mạng" }, { label: "MCU + LoRa", tone: "edge" }],
                  via: ["I/O"],
                },
                {
                  nodes: [{ label: "PLC", sub: "vít định lượng, hàn màng, động cơ" }, { label: "MCU + LoRa", tone: "edge" }],
                  via: ["RS485 · CAN · Ethernet"],
                },
                {
                  nodes: [{ label: "Robot xếp pallet" }, { label: "MCU + LoRa", tone: "edge" }],
                  via: ["Ethernet"],
                },
              ],
              via: "LoRa",
              then: [
                { label: "Gateway", sub: "ESP32 + LoRa", tone: "edge" },
                { label: "Raspberry Pi", sub: "mô hình tại biên", tone: "edge" },
              ],
            },
          ],
          via: "chỉ đọc",
          then: [{ label: "Nền tảng Celesnity", sub: "trong môi trường Nestlé duyệt", tone: "platform" }],
        },
        legend: [
          { tone: "plain", label: "Thiết bị và hệ thống của nhà máy" },
          { tone: "edge", label: "Celesnity lắp đặt" },
          { tone: "platform", label: "Nền tảng" },
        ],
      },
      {
        kind: "list",
        items: [
          "**Mọi mũi tên một chiều:** không ghi ngược vào PLC, robot hay thiết bị; mô-đun không gửi lệnh xuống.",
          "**Đọc PLC qua RS485, CAN hay Ethernet** chỉ dùng cho PLC chưa có historian hay OPC UA, ở chế độ chỉ đọc và khi IT/OT duyệt.",
          "**Máy tính biên** lọc và đệm dữ liệu khi mất kết nối, chạy mô hình cho cảnh báo cần phản hồi nhanh. Mất kết nối thì dây chuyền vẫn chạy bình thường.",
        ],
      },
      {
        kind: "note",
        text: "Sơ đồ minh họa. Số thiết bị, loại kết nối, vị trí lắp đặt và phần cứng được chốt cùng IT/OT trong khảo sát.",
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
            "**Nhà máy Nestlé Đồng Nai** *(dòng bột, theo công bố trước đây: NESCAFÉ, NESTEA, MAGGI, MILO)*",
            "Định lượng và lượng dư · ảnh hưởng của độ ẩm lên dòng chảy bột · thứ tự chuyển đổi · truy vết lô",
            "Cân kiểm tra, môi trường, lệnh sản xuất, hồ sơ QA",
          ],
          [
            "**Nhà máy Nestlé Bình An** *(đồ uống dạng lỏng: MILO uống liền, đồ uống dinh dưỡng, cà phê, sữa)*",
            "Thời điểm bồn sẵn sàng · lịch CIP dùng chung · phối hợp tiệt trùng và chiết rót · hao hụt khi chuyển sản phẩm",
            "Mức bồn, trạng thái vệ sinh, lịch CIP, trạng thái máy chiết rót",
          ],
          [
            "**Nhà máy Nestlé Bông Sen** *(nhà máy kết nối, hơn 40 ứng dụng nội bộ theo công bố 2021)*",
            "Kết nối quyết định giữa các ứng dụng sẵn có · bàn giao ca · chuyển đổi và vệ sinh",
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
            "Cổng 2 với bộ đề thi kín, so với cả cách làm hiện tại và phương án tối ưu thông thường; không đạt thì dừng, không chuyển sang giai đoạn có phí",
          ],
          ["Trùng lặp với hệ thống hoặc chương trình đang có", "Rà soát trong khảo sát; bổ sung vào phần chưa được phủ, hoặc chọn bài toán khác"],
          ["Mô hình nhầm trùng hợp thành nguyên nhân", "Thi trên các sự cố và kế hoạch trước đây; chuyên gia chấm; chỉ dùng ở chế độ tư vấn"],
          [
            "Kinh nghiệm từ dây chuyền Dolce Gusto không áp dụng được cho quy trình khác",
            "Mỗi nhà máy có khảo sát và bộ đề thi riêng; thứ được nhân rộng là nền tảng, phương pháp và đội ngũ, không mặc định nhân rộng độ chính xác",
          ],
          ["Thêm việc cho người vận hành", "Đo cả việc thêm và việc bớt; nhập liệu ngắn, có thể sửa"],
          ["Phụ thuộc vào Celesnity", "Đội ngũ IT của nhà máy Trị An tự vận hành từ T+8, tự huấn luyện lại mô hình từ T+11"],
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
        text: "Nestlé Việt Nam: đầu tư thêm 100 triệu USD vào nhà máy Trị An (1/2024) · tăng cường sản xuất cà phê xuất khẩu, Jar Line mới tại nhà máy Trị An (8/2026) · 30 năm Nestlé Việt Nam (4/2025) · chuyển đổi số tại nhà máy Nestlé Bông Sen (9/2021) · phân xưởng MILO tại nhà máy Nestlé Bình An (10/2014) · thông tin môi trường các nhà máy (10/2025). Nestlé: Nestlé at a glance (2025) · Báo cáo thường niên 2025 · kết quả năm 2025 và cập nhật chiến lược (2/2026) · kết quả 6 tháng 2026, chương trình Fuel for Growth (7/2026) · khánh thành sản xuất NESCAFÉ Dolce Gusto tại Việt Nam. Khác: BeverageDaily và Food Manufacturing về khoản đầu tư năm 2024. Ảnh: Nestlé Việt Nam.",
      },
      {
        kind: "note",
        text: "Công bố của doanh nghiệp xác lập năng lực được báo cáo, không phải kiểm toán độc lập. Các tình huống, mã lô và con số trong ví dụ chỉ là minh họa.",
      },
    ],
  },
];
