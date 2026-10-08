/**
 * Nguồn câu chữ duy nhất của landing page, chuyển từ docs/content-v4.md.
 * Không viết cứng câu chữ trong component; sửa ở đây rồi chạy `npm run content:check`.
 */
import type { Act, AppendixSection, Section } from "../types";

export const meta = {
  title: "Nhà máy siêu thông minh · Hòa Phát × Celesnity",
  description: "Đề xuất hợp tác, Thử nghiệm và lộ trình use case. Tháng 10/2026.",
  tagline: "Tự học · Dự báo trước · Nhân rộng",
  footer: "NHÀ MÁY SIÊU THÔNG MINH · Hòa Phát × Celesnity · Tháng 10/2026",
};

export const acts: Act[] = [
  { n: 1, label: "I.", title: "Một kỷ nguyên mới" },
  { n: 2, label: "II.", title: "Nhà máy siêu thông minh" },
  { n: 3, label: "III.", title: "Lộ trình triển khai Nhà máy Siêu Thông Minh" },
];

export const labels = {
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

export const sections: Section[] = [
  // ───────────────────────────── MỞ ĐẦU ─────────────────────────────
  {
    id: "mo-dau",
    act: 0,
    theme: "dark",
    layout: "hero",
    cover: "/decks/hoa-phat/cover-may-moc.jpg",
    eyebrow: "Hòa Phát × Celesnity",
    title: "NHÀ MÁY\nSIÊU THÔNG MINH",
    blocks: [
      { kind: "lead", text: "Hòa Phát làm chủ trí thông minh AI vận hành" },
      {
        kind: "p",
        text: "**Không chỉ đơn thuần là ứng dụng AI đại trà, Hòa Phát phải dẫn đầu thế giới về làm chủ Mô hình AI Thế giới thực tân tiến nhất**",
      },
      {
        kind: "note",
        text: "Đề xuất hợp tác, Thử nghiệm và lộ trình use case · Tháng 10/2026",
      },
      { kind: "note", text: "**Dẫn dắt:** Ông Phùng Tuấn Anh, Giám đốc AI Tập đoàn Hòa Phát" },
      { kind: "note", text: "**Chịu trách nhiệm:** Nguyễn Duy Tân & Nguyễn Công Nam Anh, Giám đốc Celesnity" },
    ],
  },
  {
    id: "thu-ngo",
    act: 0,
    theme: "light",
    eyebrow: "Thư ngỏ",
    title: "Kính gửi Chủ tịch Hội đồng Quản trị và Ban Tổng Giám đốc Tập đoàn Hòa Phát",
    blocks: [
      {
        kind: "p",
        text: "Trước hết, Celesnity xin trân trọng cảm ơn Quý vị đã dành thời gian cho đề xuất này.",
      },
      {
        kind: "p",
        text: "Hòa Phát lớn mạnh bằng cách **tự làm chủ từng mắt xích** của chuỗi giá trị: từ nguyên liệu, thép, đến đồ gia dụng và cả bo mạch bếp từ. Trong thập kỷ tới, mắt xích quyết định sức cạnh tranh của một nhà máy là **trí thông minh vận hành**: khả năng hiểu vì sao lỗi xảy ra, dự báo trước hệ quả của mỗi quyết định, và mang kinh nghiệm từ nơi này sang nơi khác. Thế hệ AI tiếp theo đang chuyển từ đọc hiểu ngôn ngữ sang thực sự thấu hiểu và có thể tương tác với thế giới vật lý, và doanh nghiệp nào làm chủ trí thông minh vận hành của chính mình sẽ giữ lợi thế lâu dài. Các công ty có thể ứng dụng các loại hình AI đại trà. Nhưng để đi trước, đón đầu xu thế công nghệ và công nghiệp tân tiến nhất của tương lai, một Mô hình AI Thế giới thực **(từ nay gọi là Mô hình)** là xu hướng tất yếu của con đường nghiên cứu AI trên toàn cầu. Hòa Phát sẽ dẫn dắt Việt Nam khi là nhà máy đầu tiên ứng dụng và làm chủ Mô hình này.",
      },
      {
        kind: "p",
        text: "Vì vậy, Celesnity trân trọng đề xuất Hòa Phát trở thành **Đối tác công nghiệp sáng lập** của chương trình **Nhà máy siêu thông minh**. Chương trình xây dựng một Mô hình AI Thế giới thực hiểu cách các nhà máy của Hòa Phát vận hành. Mô hình chạy tại Việt Nam, trên dữ liệu của Hòa Phát, và **do chính đội ngũ Hòa Phát làm chủ**.",
      },
      { kind: "p", text: "**Tầm nhìn**\nMỗi nhà máy của Hòa Phát, từ gia dụng đến thép, đều có thể **tự học** từ mỗi quyết định và kết quả thực tế, **dự báo trước** hệ quả của quyết định tiếp theo, và **nhân rộng** kinh nghiệm sang mọi dây chuyền, mọi nhà máy trong Tập đoàn." },
      { kind: "p", text: "**Cách làm**\nChương trình bắt đầu nhỏ và chắc: một dòng bếp từ tại Hòa Mạc, hoặc một khâu xử lý tại nhà máy thép tuỳ chọn. Ngay từ tháng thứ 1, đội ngũ IT của Hòa Phát làm việc cùng kỹ sư Celesnity tại nhà máy, tiếp tục đào tạo năng lực tại Hòa Phát." },
      { kind: "p", text: "**Kết quả dự kiến sau 12 tháng**\n6 ứng dụng chạy thật trên 2–3 dòng sản phẩm, mở rộng sang nhà máy điện lạnh hoặc luyện kim khác. Đội ngũ IT của Hòa Phát **tự vận hành và phát triển**, và cùng Celesnity xây dựng kế hoạch cụ thể để tiếp tục nhân rộng." },
      { kind: "p", text: "**Cam kết và lợi ích hai bên**\nDữ liệu thô lưu tại Việt Nam, dưới quyền Hòa Phát; bản vẽ, thiết kế và công thức quy trình không bao giờ rời Hòa Phát. Mô hình chỉ dự báo và so sánh; **con người có thẩm quyền phê duyệt mọi thay đổi**. Đổi lại, Celesnity được học từ những bản cập nhật mô hình mà Hòa Phát duyệt, để mô hình nền ngày càng tốt hơn, trước hết cho chính Hòa Phát; sau thử nghiệm, phí của Celesnity đi theo giá trị mà Tài chính Hòa Phát xác nhận." },
      { kind: "p", text: "**Kính đề nghị Ban Lãnh đạo**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất chủ trương:** Hòa Phát là Đối tác công nghiệp sáng lập; gia dụng là điểm khởi đầu, thép là đích đến.",
          "**Cử đầu mối:** lãnh đạo phụ trách, đầu mối dữ liệu, đầu mối R&D và Chất lượng Hòa Mạc, cùng 2 kỹ sư IT cho đội vận hành mô hình.",
          "**Cho phép khảo sát Hòa Mạc** để chốt dòng sản phẩm, bài toán, số liệu nền và phí thử nghiệm.",
        ],
      },
      {
        kind: "p",
        text: "Chúng tôi tin rằng Nhà máy siêu thông minh do một tập đoàn Việt Nam làm chủ, trên dữ liệu Việt Nam, có thể trở thành chuẩn mực mới cho sản xuất không những trong khu vực mà còn trên cả thế giới. Celesnity mong được đồng hành cùng Hòa Phát trên chặng đường đó.",
      },
      { kind: "signature", lines: ["Trân trọng,", "**Celesnity**, đơn vị phát triển nền tảng Minder AI"] },
    ],
  },
  {
    id: "tu-chu",
    act: 1,
    theme: "mist",
    eyebrow: "Hòa Phát phát triển lớn mạnh từ sự tự chủ",
    title: "Mỗi bước tiến của Hòa Phát là một lần làm chủ thêm một mắt xích của chuỗi giá trị",
    blocks: [
      {
        kind: "flow",
        steps: ["Hạ tầng", "Nguyên liệu", "Quy trình sản xuất", "Xử lý & tái chế", "Dịch vụ sau bán"],
      },
      {
        kind: "list",
        items: [
          "**Tự chủ sản xuất:** chuỗi khép kín từ nguyên liệu đến thép thành phẩm.",
          "**Tự chủ công nghệ:** tự phát triển bo mạch bếp từ; đạt chứng nhận CB và hợp tác với TÜV SÜD (25/9/2026).",
          "**Tự chủ quy mô:** dự án tủ lạnh Phú Mỹ với công suất thiết kế 1,2 triệu sản phẩm/năm.",
          "**Tự chủ số:** chương trình AI Tập đoàn với mục tiêu **+30% năng suất** trên từng công việc; **13 tác nhân AI** đang được hoàn thiện tại Dung Quất.",
        ],
      },
      { kind: "quote", emphasis: true, text: "Mắt xích tiếp theo để làm chủ:\n**trí thông minh AI vận hành**." },
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
        highlight: "Thứ làm nên sự khác biệt của chúng ta là **kinh nghiệm vận hành thực tế** của từng nhà máy.",
        conclusion: "Mô hình AI Thế giới thực cho công nghiệp của Celesnity sẽ đặt ra bộ quy chuẩn và nền móng đầu tiên mà cả ngành phải theo sau.",
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
              [
                "**AI ngôn ngữ** lớn (ChatGPT, trợ lý ảo)",
                "Đọc, viết, trả lời câu hỏi",
                "Người có mô hình ngôn ngữ; nay đang phổ biến và rẻ dần",
              ],
              [
                "**Mô hình AI Thế giới thực** *(World Model)*",
                "**Hiểu một hệ thống vật lý phản ứng thế nào với quyết định, và dự báo trước**",
                "**Người có dữ liệu quyết định vận hành thật**",
              ],
            ],
          },
          { kind: "p", text: "**Thứ tự:** Tự động hóa (những năm 2000) → AI ngôn ngữ lớn (năm 2022) → Mô hình AI Thế giới thực (năm 2027)." },
        ],
      },
    ],
  },
  {
    id: "hai-con-duong",
    act: 1,
    theme: "mist",
    eyebrow: "Câu hỏi chiến lược",
    title: "Trí thông minh vận hành của các nhà máy Hòa Phát sẽ do ai sở hữu?",
    blocks: [
      { kind: "module", id: "M3" },
      {
        kind: "quote",
        text: "Hòa Phát đã chọn tự chủ ở thép, ở bo mạch, ở chuỗi cung ứng. **Nhà máy siêu thông minh là con đường tiếp theo mà Hòa Phát hoàn toàn có thể tự chủ.**",
      },
    ],
    details: [
      {
        title: "Bảng hai con đường",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Con đường A: Thuê AI**", "**Con đường B: Tự chủ**"],
            rows: [
              ["**Mô hình**", "Thuộc nhà cung cấp", "**Mô hình AI Thế giới thực riêng của Hòa Phát**"],
              ["**Dữ liệu**", "Thường phải đưa ra hệ thống của nhà cung cấp", "**Bảo toàn, hoàn toàn kiểm soát bởi Hòa Phát**"],
              ["**Kinh nghiệm**", "Làm giàu mô hình của người khác", "**Được tích lũy thành tài sản vĩnh viễn của Hòa Phát**"],
              ["**Đội ngũ**", "Phụ thuộc chuyên gia bên ngoài", "**Kỹ sư Hòa Phát toàn quyền vận hành và phát triển**"],
              ["**Khi mở nhà máy mới**", "Mua thêm, tích hợp lại", "**Mang kinh nghiệm nhân rộng nhanh chóng**"],
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
            "Mỗi quyết định và kết quả tự trở thành dữ liệu; **thông minh hơn theo cấp số nhân theo thời gian**",
            "Dự báo tháng sau chính xác hơn tháng trước, và kỹ sư thấy được vì sao",
          ],
          [
            "**2. Dự báo trước**",
            "Dự báo hệ quả của một quyết định **trước khi** thực hiện, kèm mức độ chắc chắn",
            "Đổi linh kiện hay hiệu chỉnh máy móc, cách nào giảm lỗi nhiều hơn?",
          ],
          [
            "**3. Nhân rộng**",
            "**Kinh nghiệm của một dây chuyền được nhân rộng sang dây chuyền, nhà máy và mảng khác**, không phụ thuộc vào một người hay một nơi",
            "Mở dây chuyền mới, đổi nhà cung cấp, đổi model, bước từ gia dụng sang đến thép và nhiều hơn nữa mà không bắt đầu lại từ đầu",
          ],
        ],
      },
      { kind: "h3", text: "Khác biệt không nằm ở việc có thêm AI, mà ở chỗ **AI là chính quy trình**." },
      {
        kind: "compare",
        head: ["", "Nhà máy thông minh *(ứng dụng phần mềm có AI và tự động hóa)*", "**Nhà máy siêu thông minh** *(ứng dụng Mô hình AI Thế giới thực)*"],
        rows: [
          [
            "**AI ở đâu**",
            "Một công cụ, con người mở ra khi cần",
            "**AI là quy trình**: AI tạo hồ sơ, nối dữ liệu, kiểm tra mọi quyết định",
          ],
          [
            "**Ghi nhận dữ liệu**",
            "Cảm biến và dashboard; con người nhập tay",
            "Mọi việc làm, quyết định và kết quả **tự trở thành dữ liệu học**",
          ],
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
      {
        kind: "p",
        wide: true,
        text: "**Vòng lặp cải thiện:** quyết định đã duyệt và kết quả thực tế quay lại lớp ①, mô hình học tiếp.",
      },
      {
        kind: "p",
        wide: true,
        text: "**Điều chỉ Mô hình AI Thế giới thực làm được:** máy móc, cảm biến, quy trình ghi lại điều đã xảy ra trong một ngữ cảnh nhất định. Nền tảng dữ liệu tập trung ghi thêm **ai quyết định gì, vì sao, và điều gì xảy ra sau đó**. Học từ hàng nghìn chuỗi \"quyết định → hệ quả\", mô hình hiểu được **hệ quả**, như con người đi học và vận dụng tri thức đã học được ở trên diện rộng.",
      },
      { kind: "p", text: "**Mô hình AI Thế giới thực không phải là:**" },
      {
        kind: "chips", tone: "negative", items: [
          "Chatbot",
          "Phần mềm ERP",
          "Mô hình tạo video",
          "Mô hình ngôn ngữ video",
          "Hệ thống tự điều khiển thiết bị",
          "Thay thế mô phỏng kỹ thuật (mô phỏng nhiệt, dòng chảy, mạch vẫn do kỹ sư thực hiện, và kết quả của chúng là đầu vào cho mô hình)",
        ]
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
                "Lập hồ sơ, soạn kế hoạch kiểm tra, điều phối việc. **Mọi đề xuất đều được mô hình kiểm tra nguyên nhân và kết quả trước**",
              ],
              [
                "**② Mô hình AI Thế giới thực**: \"bộ não hiểu nhà máy\"",
                "Dự báo",
                "Học cách sản phẩm và nhà máy phản ứng với quyết định; dự báo kèm mức độ và dữ liệu chắc chắn; nói \"không biết\" khi gặp tình huống chưa có dữ liệu, không bịa ra kết quả",
              ],
              [
                "**① Nền tảng dữ liệu tập trung**: \"trí nhớ của nhà máy\"",
                "Ghi nhận lại",
                "Ghi việc bằng giọng nói tiếng Việt · nối với nền tảng được xây dựng cho riêng nhà máy, hoặc nền tảng có sẵn · phân quyền · lưu trữ mọi quyết định",
              ],
              [
                "**Con người có thẩm quyền**",
                "Quyết định",
                "Phê duyệt mọi thay đổi sản phẩm, thông số, quyết định xuất xưởng và vận hành thiết bị",
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
    eyebrow: "Bản đồ Nhà máy siêu thông minh của Hòa Phát",
    title: "Bắt đầu từ nhà máy gia dụng, mở rộng sang sản xuất điện lạnh và thép",
    blocks: [
      { kind: "module", id: "M8" },
      {
        kind: "p",
        text: "**Cùng một nền tảng · cùng một họ mô hình · cùng một đội ngũ IT của Hòa Phát.** Ở cấp Tập đoàn, AI có một mô hình của nhà máy để kiểm tra hệ quả trước khi đề xuất.",
      },
      {
        kind: "label",
        variant: "proposal",
        text: "Dây chuyền sản xuất thép là hướng đề xuất, sẽ được xác định cùng Hòa Phát sau khi có kết quả ở các nhà máy gia dụng.",
      },
      { kind: "h3", text: "Vì sao Hòa Phát nên triển khai ngay bây giờ" },
      {
        kind: "cards",
        cols: 4,
        rows: [
          ["**Chuỗi khép kín** từ thiết kế, sản xuất đến dịch vụ"],
          ["**Đa dạng lĩnh vực** nhưng chung luồng quyết định: phát hiện → tập hợp bằng chứng → duyệt thay đổi → kiểm chứng kết quả"],
          ["**Quy mô và tốc độ mở rộng** nhanh chưa từng có"],
          ["**Định hướng AI Tập đoàn** với mục tiêu +30% năng suất"],
        ],
      },
      { kind: "h3", text: "Những thành tựu nhà máy thép có thể kế thừa từ ứng dụng thành công tại nhà máy gia dụng" },
      {
        kind: "pillars",
        items: [
          "Mô hình AI Thế giới thực được triển khai thực tế",
          "Phương pháp và bộ quy chuẩn được kiểm chứng",
          "Đội ngũ IT ở Hòa Phát tự chủ vận hành mô hình AI",
          "Quy trình quản trị dữ liệu đã được Hòa Phát duyệt",
        ],
      },
    ],
    details: [
      {
        title: "Bảng ba mảng",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**① Nhà máy gia dụng**", "**② Nhà máy điện lạnh**", "**③ Nhà máy thép**"],
            rows: [
              ["**Nơi**", "Hòa Mạc", "Hưng Yên · Phú Mỹ", "Dung Quất · Hải Dương"],
              ["**Vai trò**", "Nơi bắt đầu", "Nhân rộng", "**Đích đến**"],
              ["**Thời gian**", "Tháng thứ 1–8", "Tháng thứ 9–12", "Năm thứ 2"],
              [
                "**Câu hỏi mô hình trả lời** *(ví dụ)*",
                "Lô nào cần kiểm tra ngay? Phương án sửa nào hiệu quả hơn? Nhóm sản phẩm nào sắp phát sinh bảo hành?",
                "Dây chuyền mới tăng công suất thế nào? Công đoạn nào cần theo dõi sát?",
                "Một lần dừng máy sẽ ảnh hưởng thế nào và phục hồi bằng cách nào nhanh nhất? Thay đổi nguyên liệu hay thông số tác động thế nào đến chất lượng mẻ? Lịch sản xuất nào tiêu hao năng lượng ít nhất? Đề xuất của tác nhân AI có an toàn để thực hiện không?",
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
    title: "Triển khai qua 6 ứng dụng thực tế, mở rộng từ đồ gia dụng đến thép",
    blocks: [{ kind: "module", id: "M18" }],
    details: [
      {
        title: "Bảng danh mục ứng dụng",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["#", "Ứng dụng", "Câu hỏi được trả lời", "Dùng thật từ"],
            rows: [
              ["**Ứng dụng 01**", "**Lập hồ sơ khách hàng tự động**", "Lỗi này đã có đủ bằng chứng chưa? Ai cần xử lý?", "**T+1**"],
              ["**Ứng dụng 02**", "**Dự báo lô hàng rủi ro cao**", "Lô hoặc trạm nào cần kiểm tra ngay?", "**T+5** (thử nghiệm trên lịch sử từ T+2)"],
              [
                "**Ứng dụng 03**",
                "**So sánh các phương án trước khi thực hiện**",
                "Chỉnh firmware hay đổi linh kiện, cách nào hiệu quả hơn?",
                "**T+6** (thử nghiệm trên lịch sử từ T+3)",
              ],
              ["**Ứng dụng 04**", "**Cảnh báo sớm bảo hành**", "Nhóm sản xuất nào sắp phát sinh bảo hành?", "T+7"],
              [
                "**Ứng dụng 05**",
                "**Tối ưu đề xuất của tác nhân AI**",
                "Đề xuất của tác nhân AI (của Minder, hoặc của Tập đoàn như tại Dung Quất) đã đủ an toàn để đến người duyệt chưa?",
                "T+8",
              ],
              ["**Ứng dụng 06**", "**Chẩn đoán trước yêu cầu khách hàng**", "Kỹ thuật viên nên chuẩn bị lỗi và linh kiện nào trước khi đến nhà khách?", "T+9"],
              [
                "→",
                "**Nhân rộng**",
                "Dòng thứ 2 tại Hòa Mạc (T+9) → điện lạnh Hưng Yên/Phú Mỹ (T+10) → ramp-up Phú Mỹ mới (T+11, nếu tiến độ dự án cho phép)",
                "",
              ],
              [
                "→",
                "**Thép và ống thép**",
                "Chọn use case thép đầu tiên (T+10–T+12) → thử nghiệm thép do đội Hòa Phát dẫn dắt (năm thứ 2)",
                "",
              ],
            ],
          },
        ],
      },
      {
        title: "Thẻ ứng dụng: ba ứng dụng đầu tiên",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Ứng dụng 01 Lập hồ sơ khách hàng tự động**", "**Ứng dụng 02 Dự báo lô hàng rủi ro cao**", "**Ứng dụng 03 So sánh các phương án trước khi thực hiện**"],
            rows: [
              [
                "**Cách làm thông thường**",
                "Kỹ sư gom dữ liệu thủ công từ nhiều hệ thống (sản xuất, kiểm tra, bảo hành) để lập một hồ sơ lỗi; mất nhiều giờ và dễ thiếu thông tin.",
                "Kiểm tra dàn đều hoặc chọn mẫu theo kinh nghiệm; lỗi thường chỉ lộ ra khi đã lặp lại ở cuối chuyền hoặc phát sinh bảo hành.",
                "Thử lần lượt từng phương án sửa; mỗi lần thử tốn khuôn, thẩm định, chứng nhận và nhiều tuần chờ kết quả.",
              ],
              [
                "**Với Mô hình AI Thế giới thực**",
                "Công nhân nói một câu bằng tiếng Việt; AI tự tạo hồ sơ, gắn model, phiên bản bo mạch, lô linh kiện và kết quả đo.",
                "Xếp hạng lô và trạm theo nguy cơ ngay trong lúc sản xuất, dồn nguồn lực kiểm tra vào đúng nơi có nguy cơ cao.",
                "Dự báo trước tác động của từng phương án lên lỗi và bảo hành, kèm dẫn chứng từ các thay đổi đã làm trước đây.",
              ],
              [
                "**Người quyết định**",
                "Kỹ sư chất lượng",
                "Chất lượng quyết định kiểm tra gì",
                "R&D và Chất lượng duyệt qua quy trình phát hành hiện có",
              ],
              [
                "**Đạt khi**",
                "Giảm **≥25%** thời gian",
                "Bắt thêm **≥20%** lỗi thật",
                "Chọn đúng phương án tốt hơn **≥70%**",
              ],
            ],
          },
        ],
      },
      {
        title: "Thẻ ứng dụng: ba ứng dụng tiếp theo, mở rộng ra thị trường và sang tác nhân AI của Tập đoàn",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Ứng dụng 04 Cảnh báo sớm bảo hành**", "**Ứng dụng 05 Tối ưu đề xuất của tác nhân AI**", "**Ứng dụng 06 Chẩn đoán trước yêu cầu khách hàng**"],
            rows: [
              [
                "**Cách làm thông thường**",
                "Biết có vấn đề khi yêu cầu bảo hành đã tăng, thường vài tháng sau khi sản phẩm rời nhà máy.",
                "Đề xuất của tác nhân AI đến thẳng người duyệt; người duyệt phải tự đánh giá tính khả thi và hệ quả của từng đề xuất.",
                "Kỹ thuật viên đến nhà khách rồi mới chẩn đoán; thiếu linh kiện thì phải quay lại lần thứ hai.",
              ],
              [
                "**Với Mô hình AI Thế giới thực**",
                "Dự báo đường bảo hành của từng nhóm sản xuất vài tháng trước khi yêu cầu bảo hành xuất hiện.",
                "Mô hình kiểm tra trước tính khả thi và hệ quả; người duyệt chỉ nhận những đề xuất đã qua kiểm tra.",
                "Dự báo lỗi và cách sửa có khả năng nhất trước khi đến, để chuẩn bị đúng linh kiện và sửa đúng ngay lần đầu.",
              ],
              [
                "**Người quyết định**",
                "Chất lượng và ngành hàng",
                "Người duyệt vẫn duyệt mọi việc",
                "Chuyên gia kỹ thuật",
              ],
              [
                "**Đạt khi**",
                "Sai số dự báo ở 3 tháng trong ngưỡng; phát hiện sớm **≥4 tuần**",
                "**≥50%** đề xuất có lỗi bị chặn trước khi đến người duyệt",
                "Top 3 dự báo chứa lỗi đúng **≥** mức phân loại hiện tại",
              ],
            ],
          },
        ],
      },
      {
        title: "Bản đồ mở rộng trong mảng gia dụng và điện lạnh",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Khu vực", "Mô hình hỗ trợ"],
            rows: [
              [
                "Bo mạch, nạp firmware",
                "Liên kết lỗi với phiên bản mạch và lô linh kiện; phát hiện lệch giữa model, bo mạch và firmware",
              ],
              ["Lắp ráp, kiểm tra cuối chuyền", "Nhóm các dạng lỗi lặp; phát hiện thiết bị thử bị lệch"],
              ["Ép nhựa, kim loại, sơn", "Liên kết khuôn, lô vật liệu, thông số với lỗi"],
              ["Máy lọc nước, quạt, hút mùi", "Rò rỉ, lưu lượng, tiếng ồn theo phiên bản; nhắc bảo dưỡng lõi lọc"],
              ["Tủ lạnh, tủ đông", "Thử kín, cách nhiệt, làm lạnh; bằng chứng cho bảo hành 36 tháng"],
              ["Điều hòa Funiki PowerAI, các dòng mua ngoài", "Chẩn đoán từ thiết bị kết nối; chất lượng nhà cung cấp"],
              ["R&D chi phí", "Dùng chung linh kiện, thiết kế dễ lắp, cân nhắc tự làm hay mua ngoài"],
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
    eyebrow: "Lộ trình 12 tháng và đội Hòa Phát làm chủ",
    title: "Các giai đoạn triển khai",
    blocks: [
      { kind: "module", id: "M15" },
      { kind: "h3", text: "Chi tiết theo từng tháng" },
      { kind: "module", id: "M10" },
      { kind: "h3", text: "Nhân sự theo giai đoạn" },
      { kind: "module", id: "M16" },
      { kind: "h3", text: "Thang năng lực của đội ngũ IT của Hòa Phát" },
      { kind: "module", id: "M17" },
    ],
    details: [
      {
        title: "Thang năng lực của đội ngũ IT của Hòa Phát",
        printOnly: true,
        blocks: [
          {
            kind: "steps", layout: "vertical",
            head: ["Bậc", "Đội ngũ IT của Hòa Phát làm được", "Bài kiểm tra", "Khi nào"],
            rows: [
              [
                "**1. Vận hành**",
                "Chạy luồng dữ liệu, giám sát mô hình, quản trị người dùng, xử lý sự cố thường gặp",
                "Tự chạy 1 vòng (T+4) → tự vận hành 4 tuần (T+8)",
                "T+4–T+8",
              ],
              [
                "**2. Tự huấn luyện lại**",
                "Cập nhật mô hình riêng bằng dữ liệu mới, chấm trên bộ đề, quyết định phát hành phiên bản",
                "Tự huấn luyện lại không cần hỗ trợ, kết quả không kém phiên bản trước",
                "T+12",
              ],
              [
                "**3. Đồng huấn luyện**",
                "Đóng góp vào mô hình nền chung, cùng thiết kế bộ đề thử nghiệm, đồng tác giả báo cáo kỹ thuật, **dẫn dắt mở rộng sang thép**",
                "Một vòng đóng góp qua kiểm thử bảo mật",
                "Năm thứ 2",
              ],
            ],
          },
          {
            kind: "p",
            text: "**Nguyên tắc chia vai:** IT vận hành hệ thống. Chuyên gia nghiệp vụ (R&D, Chất lượng, và sau này là kỹ sư thép) xác nhận mô hình có đúng về chuyên môn hay không.",
          },
        ],
      },
      {
        title: "Nhân sự theo giai đoạn",
        printOnly: true,
        blocks: [
          {
            kind: "cards", cols: 4,
            head: ["", "**Thử nghiệm (T+1–T+4)**", "**Triển khai (T+5–T+8)**", "**Nhân rộng (T+9–T+12)**"],
            rows: [
              [
                "**Celesnity**",
                "**~5–6 người**: quản lý triển khai 1 · kỹ sư hiện trường (FDE) tại Hòa Mạc 2 · kỹ sư AI 1 · kỹ sư dữ liệu 1 · trưởng nhóm nghiên cứu ½",
                "**~4–5 người**: quản lý 1 · FDE 1,5 · kỹ sư AI 1 · kỹ sư dữ liệu ½ · nghiên cứu ½",
                "**~3 người**: quản lý ½ · FDE 1 · kỹ sư AI 1 · nghiên cứu ½",
              ],
              [
                "**IT Hòa Phát: đội vận hành mô hình**",
                "**2 người**: kỹ sư dữ liệu, kỹ sư hạ tầng",
                "**3 người**: thêm 1 kỹ sư AI",
                "**4 người**: thêm 1 kỹ sư vận hành mô hình",
              ],
              [
                "**Chuyên gia nghiệp vụ Hòa Phát**",
                "R&D, Chất lượng: ~4 giờ/tuần mỗi người · đầu mối dữ liệu: ~2 giờ/tuần",
                "Như cũ, thêm Dịch vụ ~2 giờ/tuần",
                "Như cũ, thêm chuyên gia thép cho khảo sát",
              ],
              [
                "**Lãnh đạo Hòa Phát**",
                "Lãnh đạo phụ trách: họp tháng · Bảo trợ ngành hàng và Tài chính: tại mỗi cổng",
                "",
                "",
              ],
            ],
          },
        ],
      },
      {
        title: "Thử nghiệm 16 tuần: kết quả nhanh ở tháng thứ 1, kết quả đầy đủ ở tháng thứ 4",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            head: ["Tuần", "Việc", "Đầu ra"],
            rows: [
              [
                "**1–2**",
                "Khảo sát Hòa Mạc; R&D, Chất lượng và Tài chính chọn dòng sản phẩm và bài toán; ký thỏa thuận dữ liệu",
                "Phạm vi và số nền được thống nhất",
              ],
              [
                "**3–4**",
                "Dựng môi trường tại Việt Nam; xây từ điển sản phẩm bếp từ; **bật ghi nhận tiếng Việt và hồ sơ tự động (Ứng dụng 01)**",
                "**Cổng 1** · Ứng dụng 01 chạy trên chuyền",
              ],
              [
                "**5–8**",
                "Nối dữ liệu lịch sử 2 năm; Hòa Phát dựng **bộ đề thử nghiệm kín**; huấn luyện mô hình riêng phiên bản đầu",
                "Mô hình v0.1",
              ],
              [
                "**9–12**",
                "**Thử nghiệm trên lịch sử của chính Hòa Phát**: dự báo của mô hình được so với những gì đã thực sự xảy ra (Ứng dụng 02 với các lô cũ, Ứng dụng 03 với các thay đổi kỹ thuật cũ); R&D và QC chấm mẫu",
                "Kết quả thử nghiệm",
              ],
              [
                "**13–14**",
                "Chạy thử song song trên ca thật; IT Hòa Phát tự chạy một vòng dữ liệu và chấm điểm",
                "Bằng chứng chuyển giao",
              ],
              [
                "**15–16**",
                "Tài chính xác nhận giá trị; báo cáo trước Ban chỉ đạo",
                "**Cổng 2**: mở rộng, điều chỉnh hay dừng",
              ],
            ],
          },
          { kind: "p", text: "**Hòa Phát chỉ cần 3 việc:**" },
          {
            kind: "list",
            ordered: true,
            items: [
              "**Mở dữ liệu đã có:** chỉ đọc, không thu thập bí quyết kinh doanh, không làm gián đoạn hệ thống hiện tại.",
              "**Cử người:** 2 kỹ sư IT, và chuyên gia R&D/Chất lượng khoảng 4 giờ/tuần.",
              "**Nhận xét và đánh giá.**",
            ],
          },
          {
            kind: "p",
            text: "**Năm thứ 2:** thử nghiệm thép **do đội ngũ IT của Hòa Phát dẫn dắt**, Celesnity hỗ trợ · Hòa Phát cùng huấn luyện mô hình nền.",
          },
        ],
      },

      {
        title: "Mười hai tháng: mỗi use case là một chương",
        printOnly: true,
        blocks: [
          {
            kind: "note",
            text: "T+1 là tháng đầu tiên sau khi Hòa Phát duyệt quyền truy cập dữ liệu và môi trường tính toán.",
          },
          {
            kind: "table",
            head: ["Tháng", "Giai đoạn", "Use case gia dụng và điện lạnh", "Thép", "Dữ liệu và nền tảng", "IT Hòa Phát", "Cổng"],
            rows: [
              ["**T+1**", "Thử nghiệm: Học", "**Ứng dụng 01 dùng thật**", "", "Môi trường tại Việt Nam · từ điển sản phẩm · nối dữ liệu", "Học việc", "**Cổng 1**"],
              ["**T+2**", "Thử nghiệm: Học", "Ứng dụng 02 thử nghiệm trên lịch sử", "", "Bộ đề thử nghiệm kín", "Học việc", ""],
              ["**T+3**", "Thử nghiệm: Học", "Ứng dụng 03 thử nghiệm trên lịch sử", "", "Nối dữ liệu bảo hành", "Học việc", ""],
              ["**T+4**", "Thử nghiệm: Học", "Kết quả thử nghiệm", "", "", "**Tự chạy 1 vòng**", "**Cổng 2**"],
              ["**T+5**", "Dùng thật", "**Ứng dụng 02 dùng thật**", "", "Mở cho kỹ sư dùng", "Cùng vận hành", ""],
              ["**T+6**", "Dùng thật", "**Ứng dụng 03 dùng thật**", "", "", "Cùng vận hành", ""],
              ["**T+7**", "Dùng thật", "**Ứng dụng 04** bảo hành sớm", "", "Nối dữ liệu dịch vụ", "Cùng vận hành", ""],
              [
                "**T+8**",
                "Dùng thật",
                "**Ứng dụng 05** tối ưu đề xuất AI",
                "Kết nối thử Ứng dụng 05 với tác nhân AI của Tập đoàn*",
                "",
                "**Tự vận hành 4 tuần**",
                "**Cổng 3**",
              ],
              ["**T+9**", "Nhân rộng", "**Ứng dụng 06** chẩn đoán trước · dòng thứ 2 Hòa Mạc", "", "Dữ liệu dòng mới", "Tự vận hành", ""],
              ["**T+10**", "Nhân rộng", "Điện lạnh Hưng Yên/Phú Mỹ", "Khảo sát và chọn use case thép", "Dữ liệu điện lạnh", "Tự vận hành", ""],
              ["**T+11**", "Nhân rộng", "Ramp-up Phú Mỹ mới**", "Đánh giá dữ liệu thép", "", "Tự huấn luyện lại", ""],
              [
                "**T+12**",
                "Nhân rộng",
                "Báo cáo kỹ thuật chung",
                "**Kế hoạch thử nghiệm thép năm thứ 2**",
                "",
                "**Bắt đầu đồng huấn luyện**",
                "**Cổng 4**",
              ],
            ],
          },
          { kind: "note", text: "\\* Nếu Tập đoàn đồng ý, ví dụ với các tác nhân AI tại Dung Quất." },
          {
            kind: "note",
            text: "\\*\\* Phụ thuộc tiến độ dự án; trình bày như một nghiên cứu chuyển giao, độ chính xác được kiểm chứng riêng.",
          },
        ],
      },
      {
        title: "Đội Hòa Phát làm chủ: ai vận hành hệ thống",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Giai đoạn", "Celesnity", "Hòa Phát"],
            rows: [
              ["Thử nghiệm (T+1–T+4)", "90%", "10%"],
              ["Triển khai (T+5–T+8)", "50%", "50%"],
              ["Nhân rộng (T+9–T+12)", "20%", "**80%**"],
              ["Năm thứ 2 · Thép", "Hỗ trợ", "**Dẫn dắt**"],
            ],
          },
        ],
      },


    ],
  },
  {
    id: "demo",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Mô hình giao diện các ứng dụng tại Nhà máy của Hòa Phát trên nền tảng Minder",
    title: "Minder vận hành trên mô hình nhà máy Phú Mỹ",
    blocks: [
      {
        kind: "label",
        variant: "sim",
        text: "Dữ liệu mô phỏng phục vụ demo, không phải số liệu thật của Hòa Phát. Bố trí nhà máy là minh họa.",
      },
      {
        kind: "video",
        video: {
          src: "/decks/hoa-phat/demo-van-hanh.mp4",
          poster: "/decks/hoa-phat/demo-van-hanh.jpg",
          width: 1920,
          height: 1002,
          title: "Mô hình nhà máy, phát hiện lỗi sớm và bảng điều khiển vận hành",
          caption:
            "Mô hình nhà máy theo khu vực, dây chuyền, công đoạn và thiết bị · phát hiện sớm khi động cơ dây chuyền bắt đầu lệch khỏi trạng thái bình thường, trước khi phải dừng máy · bảng Vận hành và Dây chuyền: sản lượng, OEE, phế và hàng sửa theo công đoạn, nguyên nhân dừng máy, lệnh sản xuất",
        },
      },
      {
        kind: "video",
        video: {
          src: "/decks/hoa-phat/demo-hoi-minder.mp4",
          poster: "/decks/hoa-phat/demo-hoi-minder.jpg",
          width: 1920,
          height: 1002,
          title: "Hỏi đáp với Trợ lý Minder AI",
          caption:
            "Một câu hỏi bằng tiếng Việt → Minder truy vấn dữ liệu nhà máy và dựng biểu đồ công suất máy theo giờ cho từng dây chuyền trong 7 ngày gần nhất",
        },
      },
    ],
  },
  {
    id: "hai-ben",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Chủ quyền dữ liệu và lợi ích hai bên",
    title: "Hòa Phát bảo toàn chủ quyền dữ liệu, Celesnity làm chủ công nghệ AI Thế giới thực. Cùng bứt phá năng lực sau mỗi chu trình vận hành",
    blocks: [
      {
        kind: "statement",
        context: "Mô hình AI liên tục hoàn thiện từ thực tiễn sản xuất; ngược lại, kinh nghiệm vận hành được chuẩn hóa và nhân rộng nhờ AI.",
        highlight: "Hòa Phát có **kinh nghiệm vận hành thực tế**. Celesnity **làm chủ công nghệ AI Thế giới thực**.",
        conclusion: "**Nguyên tắc hợp tác:** bảo toàn 100% tài sản dữ liệu của mỗi bên. Chỉ chia sẻ tri thức mô hình đã qua kiểm duyệt bảo mật để tạo ra giá trị cộng hưởng hai chiều.",
      },
      { kind: "h3", text: "Chu trình luân chuyển dữ liệu và tri thức khép kín" },
      { kind: "module", id: "M13", variant: "exchange" },
      {
        kind: "note",
        text: "Mỗi bản cập nhật đều qua kiểm thử chống khôi phục dữ liệu và được Hòa Phát duyệt trước khi gửi, vì bản cập nhật đã tích hợp vào một phiên bản mô hình nền đã phát hành thì không thu hồi được.",
      },
      { kind: "h3", text: "Sáu cam kết không thay đổi" },
      { kind: "module", id: "M13", variant: "commitments" },
      { kind: "h3", text: "Sở hữu trí tuệ" },
      {
        kind: "cards", cols: 3, tone: "orange",
        head: ["Tài sản", "Chủ sở hữu", "Quyền của Hòa Phát", "Quyền của Celesnity"],
        rows: [
          [
            "Dữ liệu nội bộ, thiết kế, hồ sơ vận hành và mọi kết quả về hoạt động Hòa Phát",
            "Hòa Phát",
            "Toàn quyền",
            "Chỉ dùng để vận hành dịch vụ, trong phạm vi Hòa Phát duyệt",
          ],
          [
            "Mô hình dành riêng cho Hòa Phát",
            "Celesnity",
            "Sử dụng độc quyền trong suốt thời gian hợp tác",
            "Phát triển, huấn luyện và bảo trì; không cung cấp cho bên nào khác",
          ],
          [
            "Mô hình nền, mã huấn luyện, bộ công cụ đánh giá",
            "Celesnity",
            "Sử dụng trong suốt thời gian hợp tác",
            "Sở hữu, tiếp tục phát triển và cấp phép",
          ],
        ],
      },
      { kind: "h3", text: "Cơ chế hợp tác cộng hưởng giá trị" },
      { kind: "module", id: "M14", variant: "paired" },
      {
        kind: "p",
        wide: true,
        text: "**Đồng hành kiến tạo giá trị:** Celesnity chỉ ghi nhận hiệu quả khi Hòa Phát thu được lợi ích kinh tế thực tế; năng lực mô hình nền của Celesnity song hành trực tiếp cùng sự tự chủ công nghệ của Hòa Phát.",
      },
    ],
    details: [
      {
        title: "Chu trình luân chuyển dữ liệu và tri thức khép kín",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Bước", "Điều gì đi đâu", "Gồm những gì"],
            rows: [
              [
                "**①**",
                "**Dữ liệu gốc lưu trữ biệt lập tại Hòa Phát**",
                "Toàn bộ dữ liệu thô (bản vẽ thiết kế, hệ thống thiết bị, BOM, quy trình công nghệ) được lưu trữ và kiểm soát độc quyền bởi Hòa Phát; mô hình dành riêng cho Hòa Phát chạy ngay trong môi trường này.",
              ],
              [
                "**②**",
                "**Chuyển giao dữ liệu dưới sự phê duyệt của Hòa Phát**",
                "Chỉ gửi bản cập nhật trọng số mô hình đã qua khử nhận diện và kiểm thử an ninh; tuyệt đối không kèm dữ liệu thô và chỉ gửi khi được Hòa Phát duyệt từng lần.",
              ],
              [
                "**③**",
                "**Tái tích hợp và nâng cấp năng lực vận hành**",
                "Hòa Phát nhận lại phiên bản mô hình nền nâng cấp (được tôi luyện từ đa nhà máy), giúp mô hình dành riêng cho Hòa Phát thông minh và chính xác hơn sau mỗi vòng lặp.",
              ],
            ],
            caption: "Dữ liệu thô luôn lưu trữ nội bộ. Chỉ có tham số tri thức đã học được chuyển giao, và quay trở lại dưới dạng một mô hình thông minh hơn.",
          },
        ],
      },
      {
        title: "Sáu cam kết không thay đổi",
        printOnly: true,
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Mô hình tập trung dự báo, so sánh và tối ưu hoá. **Con người có thẩm quyền phê duyệt mọi thay đổi.** Tự động hoá bằng AI theo từng bước đồng hành cùng Hòa Phát; mỗi bước lên mức tự chủ cao hơn là quyết định riêng của Hòa Phát, qua quy trình quản lý thay đổi của nhà máy.",
              "Interlock, bảo vệ an toàn, thông số đã thẩm định, quyết định của Chất lượng và quyết định xuất xưởng **giữ nguyên quyền hiện tại**. Ngưỡng và quy tắc lấy từ tiêu chuẩn của nhà máy, **không do AI đặt**.",
              "Dữ liệu thô lưu tại Việt Nam, trong môi trường Hòa Phát duyệt. **Bản vẽ, thiết kế, hệ thống thiết bị, BOM, công thức quy trình không bao giờ rời Hòa Phát.**",
              "Hòa Phát duyệt mục đích, người truy cập, thời hạn lưu và mọi phần được chia sẻ. Dữ liệu Hòa Phát không gộp sang khách hàng khác và không dùng cho đối thủ. Mô hình dành riêng cho Hòa Phát không được cung cấp cho bên nào khác. Khi chấm dứt hợp tác, dữ liệu được trả lại hoặc xóa theo yêu cầu.",
              "Dữ liệu người lao động **không bao giờ** được dùng để xếp hạng hay kỷ luật cá nhân.",
              "Mọi công bố, mọi lần dùng tên hay logo Hòa Phát cần được đồng ý bằng văn bản (xem trước ít nhất 30 ngày).",
            ],
          },
        ],
      },
      {
        title: "Bảng lợi ích hai bên",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            caption: "Nguồn lực đóng góp",
            head: ["Hạng mục đối ứng", "**Hòa Phát đóng góp**", "**Celesnity đóng góp**"],
            rows: [
              ["**Dữ liệu và công nghệ lõi**", "**Quyền truy cập dữ liệu vận hành:** cấp quyền chỉ đọc, lưu trữ tại chỗ, chỉ mở theo phạm vi Hòa Phát phê duyệt.", "**Mô hình AI nền tảng:** cung cấp mô hình nền và tự tài trợ 100% chi phí nghiên cứu, phát triển."],
              ["**Nền tảng và nghiệp vụ**", "**Tri thức chuyên gia nghiệp vụ:** chuyên gia R&D và Chất lượng cùng giải bài toán, khoảng 4 giờ/tuần.", "**Nền tảng phần mềm:** triển khai nền tảng dữ liệu tập trung và bộ ứng dụng vận hành AI chuyên dụng."],
              ["**Hạ tầng và triển khai tại nhà máy**", "**Hạ tầng máy chủ tại chỗ:** phần cứng đặt tại Việt Nam, thuộc sở hữu Hòa Phát.", "**Đội triển khai:** 5–6 người, trong đó kỹ sư hiện trường làm việc tại nhà máy; tinh gọn dần còn 3 khi quy trình ổn định."],
              ["**Nhân lực và vận hành**", "**Đội ngũ IT vận hành:** 2–4 kỹ sư IT nòng cốt, trực tiếp vận hành hệ thống hằng ngày.", "**Hướng dẫn vận hành:** đào tạo, kèm cặp thực tế đến khi đội ngũ IT Hòa Phát hoàn toàn làm chủ việc vận hành."],
            ],
          },
          {
            kind: "table",
            caption: "Giá trị nhận lại",
            head: ["Mục tiêu giá trị", "**Hòa Phát nhận**", "**Celesnity nhận**"],
            rows: [
              ["**Kinh tế và chi phí**", "**Hiệu quả kinh tế đo được:** lợi ích đo lường minh bạch trên từng đơn vị sản phẩm, do Hòa Phát trực tiếp xác nhận.", "**Chi phí theo giá trị:** cố định chi phí trong giai đoạn thử nghiệm; sau đó gắn phí dịch vụ trực tiếp với giá trị đã được xác nhận."],
              ["**Mô hình và chủ quyền dữ liệu**", "**Mô hình AI dành riêng:** chạy tại Việt Nam và chỉ phục vụ Hòa Phát trong suốt thời gian hợp tác; dữ liệu nội bộ và mọi kết quả về hoạt động Hòa Phát thuộc sở hữu Hòa Phát.", "**Bản cập nhật tri thức mô hình:** trọng số đã qua kiểm thử an ninh, chỉ khi Hòa Phát duyệt; tuyệt đối không kèm dữ liệu thô."],
              ["**Độ hoàn thiện công nghệ**", "**Đón đầu năng lực AI tối tân:** tiếp cận trước 6 tháng các tính năng và phiên bản mô hình nền mới, được tôi luyện từ đa nhà máy.", "**Bảo chứng năng lực công nghiệp:** Mô hình AI Thế giới thực được kiểm chứng trong môi trường sản xuất công nghiệp nặng hàng đầu Việt Nam."],
              ["**Tầm nhìn dài hạn và vị thế**", "**Năng lực vận hành nội bộ:** đội ngũ IT chủ động vận hành hệ thống, sẵn sàng cùng Celesnity nhân rộng sang điện lạnh và thép.", "**Khách hàng tham chiếu chiến lược:** điển hình triển khai thành công, khi Hòa Phát đồng ý."],
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
    title: "Hòa Phát đang đầu tư vào năng lực tự triển khai trong tương lai, không mua một phần mềm riêng lẻ",
    blocks: [
      { kind: "h3", text: "Ba hạng mục triển khai chính" },
      { kind: "module", id: "M14", variant: "package" },
      {
        kind: "list",
        items: [
          "**Giai đoạn thử nghiệm:** Áp dụng mức phí cố định với phạm vi công việc xác định, thống nhất sau đợt khảo sát tại Hòa Mạc. Đảm bảo nguyên tắc nghiệm thu theo mốc: nếu không đạt chuẩn Cổng 2, dự án sẽ không chuyển sang giai đoạn tính phí tiếp theo.",
          "**Giai đoạn sau thử nghiệm:** Định giá linh hoạt theo giá trị kinh tế thực tế do Ban Tài chính Hòa Phát thẩm định và xác nhận. Mỗi dòng sản phẩm, nhà máy hay mảng vận hành mới (bao gồm cả mảng thép) đều được xây dựng phạm vi và cơ chế định giá độc lập.",
          "**Nguyên tắc hợp tác (Cam kết 3 Không):** Không ràng buộc độc quyền · Không yêu cầu góp vốn hay chia sẻ doanh thu · Tuyệt đối không chuyển dữ liệu ra khỏi lãnh thổ Việt Nam.",
          "**Nguồn lực phát triển mô hình:** Celesnity chủ động tự tài trợ chi phí nghiên cứu và hoàn thiện mô hình nền tảng; hai bên có thể đồng hành đăng ký tiếp cận các Quỹ phát triển Khoa học & Công nghệ tại Việt Nam.",
        ],
      },
      { kind: "h3", text: "Pháp lý" },
      {
        kind: "list",
        items: [
          "**Văn bản áp dụng:** Luật Trí tuệ nhân tạo 134/2025/QH15 (hiệu lực 1/3/2026) · Nghị định 142/2026/NĐ-CP · Quyết định 33/2026/QĐ-TTg (hiệu lực 15/8/2026) · Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 và Nghị định 356/2025/NĐ-CP (hiệu lực 1/1/2026).",
          "**Phân loại rủi ro:** Celesnity lập hồ sơ phân loại cho từng chức năng và thông báo Bộ KH&CN khi bắt buộc; Hòa Phát nhận hồ sơ với vai trò bên triển khai. Không gán trước mức rủi ro. Phân loại được rà soát lại khi mở rộng phạm vi.",
          "**An ninh:** theo kiến trúc nhà máy đã duyệt và mô hình phân vùng IEC 62443; bắt đầu ở chế độ chỉ đọc; ghi nhật ký mọi lần gọi mô hình.",
          "**Tuân thủ sản phẩm** (CB, an toàn điện, EMC, hiệu suất năng lượng) là một lớp riêng; báo cáo AI không thay thế được.",
        ],
      },
      { kind: "h3", text: "Quản trị" },
      { kind: "cards", cols: 3, rows: [["Ban chỉ đạo chung", "Trưởng bộ phận AI Hòa Phát chủ trì, cùng bảo trợ ngành hàng, CEO và CTO Celesnity. Họp hằng quý và tại mỗi cổng."], ["Hội đồng dữ liệu", "họp hằng tháng."], ["Nhóm làm việc chung", "họp hằng tuần, tại nhà máy."]] },
    ],
    details: [
      {
        title: "Ba thành phần của gói",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Thành phần", "Gồm những gì"],
            rows: [
              [
                "**① Mô hình AI Thế giới thực**",
                "Bản riêng của Hòa Phát, chạy tại Việt Nam; nhận các phiên bản mô hình nền mới, học được từ nhiều nhà máy",
              ],
              [
                "**② Bộ ứng dụng AI-native**",
                "Hồ sơ tự động · dự báo và so sánh trong không gian làm việc của kỹ sư · bảng chỉ tiêu · kết nối cho tác nhân AI của Tập đoàn",
              ],
              [
                "**③ Triển khai và nghiệm thu (kỹ sư thực địa)**",
                "Cấu hình theo quy trình Hòa Phát · tích hợp hệ thống · **đào tạo đội ngũ IT tới khi tự vận hành, tự huấn luyện và dẫn dắt mở rộng**",
              ],
            ],
          },
          {
            kind: "table",
            caption: "**Dự tính chi phí.** Càng tự chủ, chi phí triển khai càng giảm.",
            head: ["Dịch chuyển chi phí", "Triển khai và chuyển giao", "Mô hình + Ứng dụng"],
            rows: [
              ["**Năm thứ 1**", "Phần lớn", "Phần nhỏ"],
              ["**Năm thứ 2+**", "Phần nhỏ", "Phần lớn"],
            ],
          },
        ],
      },

    ],
  },
];

/**
 * Các section tạm cất (không hiển thị trên trang, không vào bản in và trợ lý).
 * Muốn bật lại: chuyển phần tử về mảng `sections` đúng vị trí cũ
 * ("thu-ngay" sau "lo-trinh"; "mo-phong" sau "ba-lop"; "phong-thi" sau "thu-ngay"; "loi-moi" ở cuối (thay "thu-ngo" về sau "mo-dau"); "kiem-soat" sau "hai-ben" (cũ; chi tiết đã chuyển sang "hop-tac"); "gia-tri" sau "phong-thi").
 */
export const parkedSections: Section[] = [
  {
    id: "thu-ngay",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Use case đầu tiên: bếp từ tại Hòa Mạc",
    title: "Từ một lời báo lỗi đến một thay đổi được kiểm chứng, AI nằm trong từng bước của nhà máy",
    blocks: [
      {
        kind: "note",
        text: "Tình huống minh họa cách hệ thống làm việc. Bài toán cụ thể do R&D, Chất lượng và Tài chính Hòa Phát chọn trong khảo sát; phương án dự phòng là một dòng máy lọc nước tại Hòa Mạc.",
      },
      {
        kind: "timeline",
        head: ["Giờ", "Điều xảy ra", "AI làm gì *(không ai phải \"mở công cụ AI\")*", "Con người làm gì"],
        rows: [
          [
            "**07:40**",
            "Trạm kiểm tra báo bảo vệ nhiệt kích hoạt lặp lại",
            "Công nhân nói vào điện thoại bằng tiếng Việt. AI **tự tạo hồ sơ**, gắn model, phiên bản bo mạch, lô linh kiện, đường đo",
            "Chỉ cần nói",
          ],
          ["**07:45**", "", "**Mô hình** xếp hạng các lô khác có cùng rủi ro, kèm mức độ chắc chắn", ""],
          [
            "**08:00**",
            "",
            "**Tác nhân AI** soạn kế hoạch kiểm tra cho các lô nguy cơ cao nhất, gửi trưởng ca",
            "Trưởng ca **duyệt**",
          ],
          [
            "**10:00**",
            "R&D đề xuất 2 cách sửa: chỉnh firmware hoặc đổi linh kiện",
            "**Mô hình** so sánh cách nào giảm lỗi và bảo hành nhiều hơn, dựa trên những thay đổi trước đây",
            "Kỹ sư thử nghiệm, **quyết định**",
          ],
          [
            "**Tuần sau**",
            "Thay đổi được áp dụng",
            "AI ghi lại thay đổi và dải số máy áp dụng",
            "Người có thẩm quyền **phê duyệt**",
          ],
          [
            "**Tháng sau**",
            "Có kết quả kiểm tra và bảo hành của các lô mới",
            "Dự báo được **chấm điểm so với thực tế**; mô hình tự học",
            "Xem trên bảng chỉ tiêu",
          ],
        ],
      },
      { kind: "p", text: "**Ba câu hỏi mô hình giúp trả lời:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Những lô nào khác có cùng rủi ro?",
          "Phương án sửa nào hiệu quả hơn?",
          "Sau khi sửa, kết quả có đúng như dự báo không?",
        ],
      },
      { kind: "h3", text: "Thử làm công nhân" },
      {
        kind: "label",
        variant: "ai",
        text: "AI thật: trích xuất hồ sơ từ lời nói. Phần xếp hạng lô: mô phỏng minh họa.",
      },
      {
        kind: "p",
        text: "Ví dụ: *\"Trạm test 3, bếp lô 2409 lại nhảy bảo vệ nhiệt lần thứ tư.\"* → AI lập thẻ hồ sơ (trạm, triệu chứng, lô, mức độ, thông tin còn thiếu) → nối dữ liệu → xếp hạng lô rủi ro → soạn kế hoạch kiểm tra → **Quý vị bấm duyệt**.",
      },
      { kind: "module", id: "M6" },
    ],
  },
  {
    id: "loi-moi",
    act: 3,
    theme: "light",
    layout: "closing",
    eyebrow: "Lời mời",
    title: "Mời Hòa Phát trở thành Đối tác công nghiệp sáng lập của Nhà máy siêu thông minh",
    blocks: [
      { kind: "p", text: "**Kính đề nghị Ban Lãnh đạo:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất chủ trương:** Hòa Phát là Đối tác công nghiệp sáng lập. Gia dụng là điểm khởi đầu của chương trình Nhà máy siêu thông minh toàn Tập đoàn, với thép là đích đến.",
          "**Cử nhân sự:** lãnh đạo phụ trách · bảo trợ ngành hàng · đầu mối dữ liệu · đầu mối R&D và Chất lượng Hòa Mạc · đầu mối Tài chính · **2 kỹ sư IT cho đội vận hành mô hình**.",
          "**Cho phép khảo sát Hòa Mạc** để chốt dòng sản phẩm, bài toán, số nền và phí thử nghiệm.",
        ],
      },
      {
        kind: "steps",
        head: ["Thời gian", "Việc"],
        rows: [
          [
            "Tháng 10/2026",
            "Làm việc với Trưởng bộ phận AI và ngành hàng; thống nhất term sheet, NDA, thỏa thuận xử lý dữ liệu",
          ],
          ["Tháng 11/2026", "Khảo sát Hòa Mạc → chốt phạm vi và phí thử nghiệm"],
          ["T+1", "Thử nghiệm bắt đầu khi dữ liệu và môi trường được duyệt"],
          ["T+4", "Cổng 2: kết quả thử nghiệm trước Ban chỉ đạo"],
          ["T+8", "Cổng 3: mở cửa sang khảo sát thép"],
          ["T+12", "**Đội ngũ IT của Hòa Phát tự vận hành; bắt đầu đồng huấn luyện; kế hoạch thử nghiệm thép**"],
        ],
      },
      { kind: "module", id: "M14", variant: "closing" },
    ],
  },
  {
    id: "kiem-soat",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Hòa Phát luôn giữ quyền kiểm soát",
    title: "Dữ liệu ở lại Việt Nam, dưới quyền Hòa Phát; Hòa Phát chọn mức đóng góp",
    blocks: [
      { kind: "module", id: "M13" },
      {
        kind: "p",
        text: "**Khuyến nghị:** đăng ký **Mức 3**. Trong thử nghiệm, dữ liệu chạy ở chế độ Mức 2. Tập kiểm chứng chỉ được chia sẻ sau khi Hòa Phát đã xem kết quả Cổng 2.",
      },
      {
        kind: "note",
        text: "Bản cập nhật đã tích hợp vào một phiên bản mô hình nền đã phát hành thì không thu hồi được, nên mỗi lần đóng góp phải qua kiểm thử và được duyệt trước.",
      },
    ],
    details: [
      // Đã bỏ khỏi #hop-tac theo bản nội dung 05/10/2026; giữ ở đây cho bản cũ (/v1).
      {
        title: "Ba mức tham gia",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Mức 1: Riêng**", "**Mức 2: Đóng góp**", "**Mức 3: Đối tác sáng lập**"],
            rows: [
              [
                "**Điều gì rời môi trường Hòa Phát**",
                "Không có gì",
                "Chỉ bản cập nhật mô hình đã qua kiểm thử bảo mật",
                "Bản cập nhật mô hình và một bộ dữ liệu mẫu để kiểm chứng; dữ liệu đã xoá thông tin nhận diện, Hòa Phát duyệt từng dòng trước khi gửi",
              ],
              [
                "**Hòa Phát đóng góp**",
                "Dữ liệu cho mô hình riêng",
                "Dữ liệu, chuyên gia, hạ tầng tính toán tại Việt Nam",
                "Như Mức 2, cộng đồng đầu tư hạ tầng (thuộc sở hữu Hòa Phát) và đội ngũ IT tham gia đồng huấn luyện",
              ],
              [
                "**Quyền dùng mô hình nền**",
                "Phiên bản tại thời điểm ký",
                "Mọi phiên bản trong thời gian đóng góp",
                "Như Mức 2, cộng **3 năm** sau khi ngừng đóng góp",
              ],
              ["**Tiếp cận tính năng mới**", "—", "—", "Sớm **6 tháng**"],
              ["**Ban chỉ đạo**", "—", "Thành viên", "**Chủ trì**"],
              ["**Phí sử dụng sau chương trình**", "Giá tiêu chuẩn", "Giá ưu đãi", "Giá ưu đãi, **cố định 3 năm**"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phong-thi",
    act: 3,
    theme: "dark",
    layout: "wide",
    eyebrow: "Hòa Phát giữ đề thử nghiệm",
    title: "Mô hình phải vượt qua thử nghiệm trên dữ liệu của Hòa Phát, do Hòa Phát chấm, trước khi được dùng",
    blocks: [
      {
        kind: "p",
        text: "**Bộ đề thử nghiệm kín:** Hòa Phát giữ riêng một phần dữ liệu lịch sử kèm kết quả thật. Celesnity không xem được đáp án; mô hình làm bài, Hòa Phát chấm.",
      },
      { kind: "module", id: "M11" },
      {
        kind: "p",
        text: "**Không đạt thì sao:** dừng hoặc điều chỉnh use case đó. **Không chuyển sang giai đoạn có phí tiếp theo khi cổng chưa đạt.** Các use case khác và quy trình Ứng dụng 01 vẫn tiếp tục.",
      },
      { kind: "h3", text: "Bốn bước trước khi kỹ sư được dùng dự báo" },
      { kind: "steps", layout: "vertical", rows: [["Thử nghiệm trên lịch sử", "mô hình chỉ thấy thông tin có tại thời điểm của mỗi quyết định cũ."], ["Chuyên gia chấm", "R&D và Chất lượng chấm mẫu, kể cả những ca mô hình sai."], ["Chạy thử song song", "mô hình chạy trên ca thật nhưng không ai thấy dự báo khi quyết định; kết quả được so sánh sau."], ["Tư vấn", "kỹ sư thấy dự báo kèm bằng chứng và quyết định như trước. Mọi lần không theo dự báo đều được ghi lý do."]] },
      {
        kind: "note",
        text: "Mọi bước lên mức tự chủ cao hơn (tự thực hiện tác vụ số, rồi tác vụ vật lý) là quyết định riêng của Hòa Phát, theo quy định pháp luật.",
      },
    ],
    details: [
      {
        title: "Bảng tiêu chí đầy đủ của bốn cổng",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Cổng", "Tiêu chí", "Ngưỡng đạt", "Ai chấm"],
            rows: [
              [
                "**Cổng 1 (T+1)**",
                "Dữ liệu đủ để làm",
                "≥80% sản phẩm trong phạm vi nối được tới lô linh kiện và phiên bản; ≥2 năm lịch sử kiểm tra và bảo hành; ≥10 thay đổi kỹ thuật cũ có đủ dữ liệu theo dõi",
                "Đầu mối dữ liệu Hòa Phát",
              ],
              ["", "Sẵn sàng", "Thỏa thuận dữ liệu đã ký; môi trường tại Việt Nam đã duyệt; Ứng dụng 01 chạy trên chuyền", "Pháp chế, IT"],
              [
                "**Cổng 2 (T+4), kết thúc thử nghiệm**",
                "UC1: phát hiện lỗi",
                "Với cùng nguồn lực kiểm tra, bắt **nhiều hơn ≥20%** lỗi thật so với cách chọn mẫu hiện tại",
                "Chất lượng, chấm trên bộ đề kín",
              ],
              ["", "UC2: chọn phương án", "Chọn đúng phương án tốt hơn ở **≥70%** các cặp thay đổi cũ", "R&D"],
              [
                "",
                "Độ tin cậy",
                "Khi mô hình nói \"chắc chắn 90%\", kết quả đúng trong **85–95%** số lần",
                "Hội đồng dữ liệu",
              ],
              ["", "Hữu ích", "**≥70%** đánh giá của kỹ sư là \"hữu ích\"", "R&D, Chất lượng"],
              ["", "UC0: năng suất", "Thời gian lập một hồ sơ kỹ thuật giảm **≥25%**", "Ngành hàng"],
              ["", "An toàn", "**0** sự cố dữ liệu rời Việt Nam; kiểm thử bảo mật đạt", "IT, Pháp chế"],
              ["", "Chuyển giao", "IT Hòa Phát tự chạy 1 vòng dữ liệu và chấm điểm", "IT, Celesnity"],
              [
                "**Cổng 3 (T+8)**",
                "Dùng thật",
                "**≥20** ca thật có dùng dự báo; độ tin cậy giữ được trên dữ liệu mới",
                "Ban chỉ đạo",
              ],
              ["", "Chuyển giao", "IT Hòa Phát **tự vận hành 4 tuần** liên tục", "IT"],
              ["", "Mở cửa sang thép", "Ban chỉ đạo duyệt khảo sát use case thép đầu tiên", "Ban chỉ đạo"],
              ["**Cổng 4 (T+12)**", "Giá trị", "Tài chính xác nhận giá trị năm **≥ ngưỡng hòa vốn** (xem `#gia-tri`)", "Tài chính"],
              ["", "Tự chủ", "IT Hòa Phát **tự huấn luyện lại** mô hình riêng, không cần hỗ trợ", "Ban chỉ đạo"],
            ],
          },
        ],
      },

    ],
  },
  {
    id: "mo-phong",
    act: 2,
    theme: "dark",
    layout: "wide",
    eyebrow: "Thử ra quyết định cùng mô hình",
    title: "Ngồi vào buồng mô phỏng: chọn một phương án, xem mô hình dự báo, rồi Quý vị quyết định",
    blocks: [
      { kind: "label", variant: "sim", text: "Mô phỏng minh họa. Mô hình thật được huấn luyện trên dữ liệu Hòa Phát trong thử nghiệm." },
      {
        kind: "p",
        text: "**Tình huống:** trạm kiểm tra cuối chuyền của một dòng bếp từ báo bảo vệ nhiệt kích hoạt lặp lại.",
      },
      { kind: "module", id: "M4" },
    ],
    details: [
      {
        title: "Cách dùng buồng mô phỏng",
        printOnly: true,
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "**Chọn phương án:** A. Chỉnh firmware · B. Đổi linh kiện · C. Giữ nguyên · *Ca đặc biệt: dùng một nhà cung cấp mới chưa từng có dữ liệu*.",
              "**Xem dự báo:** tỷ lệ lỗi kiểm tra trong 8 tuần tới, kèm dải mức độ chắc chắn. Mô hình dẫn những thay đổi trước đây mà nó đã học làm căn cứ.",
              "**Quý vị duyệt:** mô hình chỉ đề xuất; người có thẩm quyền quyết định.",
              "**Bốn tuần sau:** kết quả thực tế hiện ra cạnh dự báo. Mô hình được chấm điểm và **tự học** cho lần sau.",
            ],
          },
          {
            kind: "p",
            text: "**Với nhà cung cấp mới:** mô hình trả lời *\"Chưa đủ dữ liệu để dự báo đáng tin cậy.\"* Một mô hình tốt phải biết khi nào nó không biết.",
          },
        ],
      },
    ],
  },
  {
    id: "gia-tri",
    act: 3,
    theme: "light",
    layout: "wide",
    eyebrow: "Giá trị, tính bằng số của Hòa Phát",
    title: "Giá trị được đo bằng tiền trên mỗi sản phẩm bán được; Tài chính Hòa Phát là người xác nhận",
    blocks: [
      { kind: "label", variant: "ai", text: "Nhập số của Quý vị. Tính toán chạy ngay trên trình duyệt, không lưu, không gửi đi." },
      { kind: "module", id: "M12" },
      {
        kind: "list",
        items: [
          "**Ở quy mô Tập đoàn:** giá trị nhân theo số dòng sản phẩm và nhà máy được mở rộng, chỉ sau khi từng nơi đã được kiểm chứng. Ở thép, giá trị được đo theo mẻ, theo tấn và theo giờ dừng máy, và sẽ được định lượng trong khảo sát.",
          "**Quy đổi năng suất:** mục tiêu +30% năng suất của Tập đoàn tương đương thời gian còn 77%, tức giảm 23% thời gian.",
          "**Không tính vào lợi ích:** sự kiện quá hiếm để quan sát · lợi ích đã ghi nhận ở nơi khác · số liệu của công ty khác.",
        ],
      },
    ],
    details: [
      {
        title: "Giá trị minh họa cho một dòng gia dụng khoảng 100.000 sp/năm",
        printOnly: true,
        blocks: [
          {
            kind: "note",
            text: "Giả định để hình dung, không phải số liệu Hòa Phát; số thật được thay sau Cổng 1.",
          },
          {
            kind: "table",
            head: ["Nguồn giá trị", "Giả định", "Giá trị/năm"],
            rows: [
              [
                "**Kiểm tra có mục tiêu (Ứng dụng 02)**",
                "0,5% lỗi lọt = 500 lỗi; bắt thêm 1/5 = 100 lỗi × 800.000 đ",
                "**~80 triệu đ**",
              ],
              [
                "**Phát hiện bảo hành sớm 8 tuần (Ứng dụng 04)**",
                "Dòng 10.000 sp/tháng → ~18.500 sp ít bị ảnh hưởng; 2% bảo hành × 800.000 đ",
                "**~300 triệu đ mỗi sự cố**",
              ],
              [
                "**Tránh một thay đổi kỹ thuật không hiệu quả (Ứng dụng 03)**",
                "Khuôn, thẩm định lại, chứng nhận, sửa lại",
                "**1–2 tỷ đ mỗi thay đổi**",
              ],
              ["**Năng suất kỹ sư (Ứng dụng 01)**", "300 hồ sơ/năm × 6 giờ; giảm 25%", "**~450 giờ kỹ sư/năm được giải phóng**"],
            ],
          },
          {
            kind: "table",
            head: ["Kịch bản", "Gồm những gì", "**Giá trị/năm/dòng**"],
            rows: [
              ["**Thận trọng**", "Kiểm tra có mục tiêu + 1 sự cố bảo hành phát hiện sớm", "**~0,4 tỷ đ**"],
              [
                "**Cơ sở**",
                "Kiểm tra có mục tiêu + 2 sự cố bảo hành + tránh 1 thay đổi không hiệu quả",
                "**~1,7–2,7 tỷ đ**",
              ],
            ],
          },
        ],
      },
      {
        title: "Ngưỡng hòa vốn",
        printOnly: true,
        blocks: [
          {
            kind: "p",
            text: "**Ngưỡng hòa vốn:** mức cải thiện tối thiểu mỗi sản phẩm cần đạt, bằng chi phí chương trình/năm chia cho sản lượng bán đủ điều kiện.",
          },
          {
            kind: "table",
            head: ["Chi phí chương trình/năm →", "1 tỷ đ", "2 tỷ đ", "3 tỷ đ"],
            rows: [
              ["**100.000 sp/năm**", "10.000 đ/sp", "20.000 đ/sp", "30.000 đ/sp"],
              ["**200.000 sp/năm**", "5.000 đ/sp", "10.000 đ/sp", "15.000 đ/sp"],
            ],
          },
        ],
      },
    ],
  },
];

/** Đoạn kết (hiển thị trong M14 variant "closing") */
export const closing = {
  headline: "Hòa Phát đã làm chủ từ nguyên liệu đến sản phẩm. Bước tiếp theo: làm chủ trí thông minh vận hành.",
  lead: "Một ngày không xa:",
  story:
    "Tại Dung Quất, một kỹ sư Hòa Phát mở phiên bản mô hình mới, phiên bản mà chính đội của anh đã huấn luyện. Mô hình đã học từ những dòng bếp từ ở Hòa Mạc, những dây chuyền tủ lạnh ở Phú Mỹ, và hàng nghìn quyết định của kỹ sư Hòa Phát. Hôm nay, nó bắt đầu học về thép.",
  tagline: "NHÀ MÁY SIÊU THÔNG MINH: Tự học · Dự báo trước · Nhân rộng.",
  owner: "Do Hòa Phát làm chủ.",
  thanks: "Celesnity mong được cùng Hòa Phát xây dựng nó.",
  pdf: "Tải bản PDF",
  ask: "Hỏi trợ lý",
};

/**
 * Lợi ích hai bên (M14 variant "paired" trong #hai-ben): dòng thứ i của Hòa Phát đối ứng dòng thứ i của Celesnity,
 * nên `give`, `receive` của hai bên và `rowLabels` phải dài bằng nhau.
 */
export const benefits = {
  groupTitles: { give: "Nguồn lực đóng góp", receive: "Giá trị nhận lại" },
  columnHeads: {
    give: ["Hạng mục đối ứng", "Hòa Phát đóng góp", "Celesnity đóng góp"],
    receive: ["Mục tiêu giá trị", "Hòa Phát nhận", "Celesnity nhận"],
  },
  rowLabels: {
    give: ["Dữ liệu và công nghệ lõi", "Nền tảng và nghiệp vụ", "Hạ tầng và triển khai tại nhà máy", "Nhân lực và vận hành"],
    receive: ["Kinh tế và chi phí", "Mô hình và chủ quyền dữ liệu", "Độ hoàn thiện công nghệ", "Tầm nhìn dài hạn và vị thế"],
  },
  partner: {
    name: "Hòa Phát",
    give: [
      "**Quyền truy cập dữ liệu vận hành:** cấp quyền chỉ đọc, lưu trữ tại chỗ, chỉ mở theo phạm vi Hòa Phát phê duyệt.",
      "**Tri thức chuyên gia nghiệp vụ:** chuyên gia R&D và Chất lượng cùng giải bài toán, khoảng 4 giờ/tuần.",
      "**Hạ tầng máy chủ tại chỗ:** phần cứng đặt tại Việt Nam, thuộc sở hữu Hòa Phát.",
      "**Đội ngũ IT vận hành:** 2–4 kỹ sư IT nòng cốt, trực tiếp vận hành hệ thống hằng ngày.",
    ],
    receive: [
      "**Hiệu quả kinh tế đo được:** lợi ích đo lường minh bạch trên từng đơn vị sản phẩm, do Hòa Phát trực tiếp xác nhận.",
      "**Mô hình AI dành riêng:** chạy tại Việt Nam và chỉ phục vụ Hòa Phát trong suốt thời gian hợp tác; dữ liệu nội bộ và mọi kết quả về hoạt động Hòa Phát thuộc sở hữu Hòa Phát.",
      "**Đón đầu năng lực AI tối tân:** tiếp cận trước 6 tháng các tính năng và phiên bản mô hình nền mới, được tôi luyện từ đa nhà máy.",
      "**Năng lực vận hành nội bộ:** đội ngũ IT chủ động vận hành hệ thống, sẵn sàng cùng Celesnity nhân rộng sang điện lạnh và thép.",
    ],
  },
  celesnity: {
    name: "Celesnity",
    give: [
      "**Mô hình AI nền tảng:** cung cấp mô hình nền và tự tài trợ 100% chi phí nghiên cứu, phát triển.",
      "**Nền tảng phần mềm:** triển khai nền tảng dữ liệu tập trung và bộ ứng dụng vận hành AI chuyên dụng.",
      "**Đội triển khai:** 5–6 người, trong đó kỹ sư hiện trường làm việc tại nhà máy; tinh gọn dần còn 3 khi quy trình ổn định.",
      "**Hướng dẫn vận hành:** đào tạo, kèm cặp thực tế đến khi đội ngũ IT Hòa Phát hoàn toàn làm chủ việc vận hành.",
    ],
    receive: [
      "**Chi phí theo giá trị:** cố định chi phí trong giai đoạn thử nghiệm; sau đó gắn phí dịch vụ trực tiếp với giá trị đã được xác nhận.",
      "**Bản cập nhật tri thức mô hình:** trọng số đã qua kiểm thử an ninh, chỉ khi Hòa Phát duyệt; tuyệt đối không kèm dữ liệu thô.",
      "**Bảo chứng năng lực công nghiệp:** Mô hình AI Thế giới thực được kiểm chứng trong môi trường sản xuất công nghiệp nặng hàng đầu Việt Nam.",
      "**Khách hàng tham chiếu chiến lược:** điển hình triển khai thành công, khi Hòa Phát đồng ý.",
    ],
  },
};

/** Gói hợp tác (M14 variant "package") */
export const packageParts = [
  {
    n: "①",
    name: "Mô hình AI Thế giới thực",
    body: "Bản riêng của Hòa Phát, chạy tại Việt Nam; nhận các phiên bản mô hình nền mới, học được từ nhiều nhà máy",
  },
  {
    n: "②",
    name: "Bộ ứng dụng AI-native",
    body: "Hồ sơ tự động · dự báo và so sánh trong không gian làm việc của kỹ sư · bảng chỉ tiêu · kết nối cho tác nhân AI của Tập đoàn",
  },
  {
    n: "③",
    name: "Triển khai và nghiệm thu (kỹ sư thực địa)",
    body: "Cấu hình theo quy trình Hòa Phát · tích hợp hệ thống · **đào tạo đội ngũ IT tới khi tự vận hành, tự huấn luyện và dẫn dắt mở rộng**",
  },
];

export const costShift = [
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
          "**Ghi lại:** mọi việc tại nhà máy thành chuỗi \"tình trạng → quyết định → kết quả\".",
          "**Học:** mô hình học quy luật \"khi làm X trong tình trạng Y thì thường xảy ra Z\".",
          "**Dự báo kèm mức độ chắc chắn:** mô hình nói \"không biết\" khi gặp phiên bản, nhà cung cấp, nguyên liệu hay sản phẩm chưa từng thấy.",
          "**Phân biệt nguyên nhân với trùng hợp:** kỹ sư thường chọn thay đổi vì có lý do, nên mô hình dùng phương pháp thống kê để tách tác động thật khỏi lý do chọn. Khi dữ liệu không đủ để phân biệt, mô hình nói rõ.",
          "**Kiểm tra quy tắc kỹ thuật:** một lớp kiểm tra riêng đảm bảo đề xuất không vi phạm BOM, firmware, giới hạn thử, chứng nhận hay giới hạn vận hành thiết bị.",
          "**Không thử nghiệm trên dây chuyền:** mô hình chỉ học từ hoạt động đã ghi lại và các thử nghiệm đã được duyệt.",
        ],
      },
      { kind: "p", text: "*Chi tiết kỹ thuật cho đội ngũ IT:*" },
      {
        kind: "list",
        items: [
          "Lõi mô hình học trong không gian biểu diễn (hướng JEPA).",
          "Độ chắc chắn được hiệu chuẩn bằng phương pháp conformal.",
          "Ước lượng tác động bằng propensity và doubly robust.",
          "Huấn luyện và kiểm tra tách theo thời gian.",
          "Kiến trúc phân lớp: kho dữ liệu quyết định, bộ mã hóa, lõi mô hình, lớp kiểm tra quy tắc, lớp phục vụ có phân quyền, vòng học.",
        ],
      },
    ],
  },
  {
    id: "huong-thep",
    title: "Hướng use case thép (đề xuất, xác định cùng Hòa Phát sau Cổng 3)",
    blocks: [
      {
        kind: "cards",
        cols: 3,
        head: ["Hướng", "Câu hỏi mô hình trả lời", "Dữ liệu cần"],
        rows: [
          [
            "Dừng máy và phục hồi",
            "Một lần dừng ảnh hưởng thế nào; cách phục hồi nào nhanh nhất?",
            "Nhật ký dừng máy, nguyên nhân, hành động phục hồi, kết quả",
          ],
          [
            "Chất lượng theo mẻ, theo cuộn",
            "Thay đổi nguyên liệu hoặc thông số tác động thế nào đến chất lượng?",
            "Hồ sơ nguyên liệu, thông số quy trình, kết quả kiểm tra",
          ],
          [
            "Năng lượng",
            "Lịch sản xuất nào tiêu hao năng lượng ít nhất mà vẫn đạt sản lượng?",
            "Kế hoạch sản xuất, đo năng lượng",
          ],
          [
            "Kiểm tra đề xuất của tác nhân AI",
            "Đề xuất của các tác nhân AI tại Dung Quất có an toàn và khả thi không?",
            "Đề xuất của tác nhân, quy tắc vận hành, kết quả",
          ],
          [
            "Bảo trì",
            "Thiết bị nào cần bảo trì trước; dời lịch bảo trì gây hệ quả gì?",
            "Lịch sử bảo trì, cảnh báo thiết bị, quan sát của kỹ sư",
          ],
        ],
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
          ["Dữ liệu không đủ liên kết", "Cổng 1 kiểm tra trước; dùng dữ liệu theo lô khi chưa có theo số máy"],
          [
            "Mô hình không hơn cách làm hiện tại",
            "Cổng 2 với bộ đề kín; không đạt thì dừng, không chuyển sang giai đoạn có phí",
          ],
          [
            "Mô hình nhầm trùng hợp thành nguyên nhân",
            "Thử nghiệm trên các thay đổi cũ; chuyên gia chấm; chỉ dùng ở chế độ tư vấn",
          ],
          [
            "Kinh nghiệm gia dụng không áp dụng được cho thép",
            "Thép có khảo sát và bộ đề thử nghiệm riêng; thứ mang sang là nền tảng, phương pháp và đội ngũ, không mặc định mang sang độ chính xác",
          ],
          ["Lộ thiết kế hoặc công thức", "Thiết kế không rời Hòa Phát; kiểm thử chống khôi phục dữ liệu trước mọi lần đóng góp"],
          [
            "Phụ thuộc vào Celesnity",
            "Đội ngũ IT tự vận hành từ T+8, tự huấn luyện từ T+12; mã nguồn và mô hình được lưu ký",
          ],
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
        text: "Hòa Phát: sơ kết 6 tháng 2026 và chương trình AI Tập đoàn (11/8/2026) · chứng nhận CB bếp từ Funiki và hợp tác TÜV SÜD (25/9/2026) · hồ sơ năng lực Điện máy Gia dụng · dự án tủ lạnh Phú Mỹ 50 triệu USD (23/4/2026) · 25 năm Điện lạnh Hòa Phát · Funiki PowerAI và HAC Smart Life · bảo hành điện tử · chính sách bảo hành tủ đông/tủ mát · Báo cáo phát triển bền vững 2025.",
      },
      {
        kind: "note",
        text: "Công bố của doanh nghiệp xác lập năng lực được báo cáo, không phải kiểm toán độc lập. Các tình huống và mức giá trị trong ví dụ chỉ là minh họa.",
      },
    ],
  },
];

export const sectionIds = sections.map((s) => s.id);
