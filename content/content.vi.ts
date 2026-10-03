/**
 * Nguồn câu chữ duy nhất của landing page, chuyển từ docs/content-v4.md.
 * Không viết cứng câu chữ trong component; sửa ở đây rồi chạy `npm run content:check`.
 */
import type { Act, AppendixSection, Section } from "./types";

export const meta = {
  title: "Nhà máy siêu thông minh · Hòa Phát × Celesnity",
  description: "Đề xuất hợp tác, Thử nghiệm và lộ trình use case. Tài liệu thảo luận, tháng 10/2026.",
  tagline: "Tự học · Dự báo trước · Nhân rộng",
  footer: "NHÀ MÁY SIÊU THÔNG MINH · Hòa Phát × Celesnity · Tài liệu thảo luận",
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
    cover: "/brand/cover-hoa-phat-may-moc.jpg",
    eyebrow: "Hòa Phát × Celesnity",
    title: "NHÀ MÁY\nSIÊU THÔNG MINH",
    blocks: [
      { kind: "lead", text: "Hòa Phát làm chủ trí thông minh AI vận hành" },
      { kind: "p", text: "**Tự học · Dự báo trước · Nhân rộng**" },
      {
        kind: "note",
        text: "Đề xuất hợp tác, Thử nghiệm và lộ trình use case · Tài liệu thảo luận",
      },
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
        context: "Các tập đoàn công nghệ lớn đều đang dồn sức vào AI cho thế giới vật lý (ví dụ NVIDIA Cosmos, Meta V-JEPA 2).",
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
            head: ["Làn sóng", "AI làm được gì", "Ai nắm lợi thế"],
            rows: [
              ["**Tự động hóa**", "Lặp lại một thao tác đã lập trình", "Ai có máy móc"],
              [
                "**AI ngôn ngữ** (ChatGPT, trợ lý ảo)",
                "Đọc, viết, trả lời câu hỏi",
                "Ai có mô hình ngôn ngữ; nay đang phổ biến và rẻ dần",
              ],
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
              ["**Đội ngũ**", "Phụ thuộc chuyên gia bên ngoài", "**Kỹ sư Hòa Phát toàn quyền vận hành và huấn luyện**"],
              ["**Khi mở nhà máy mới**", "Mua thêm, tích hợp lại", "**Mang kinh nghiệm sang nhanh chóng**"],
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
            "Mỗi quyết định và kết quả tự trở thành dữ liệu; **mỗi tháng thông minh hơn**",
            "Dự báo tháng sau chính xác hơn tháng trước, và kỹ sư thấy được vì sao",
          ],
          [
            "**2. Dự báo trước**",
            "Dự báo hệ quả của một quyết định **trước khi** thực hiện, kèm mức độ chắc chắn",
            "Đổi linh kiện hay chỉnh firmware, cách nào giảm lỗi nhiều hơn?",
          ],
          [
            "**3. Nhân rộng**",
            "**Kinh nghiệm của một dây chuyền được mang sang dây chuyền, nhà máy và mảng khác**, không phụ thuộc vào một người hay một nơi",
            "Mở dây chuyền mới, đổi nhà cung cấp, đổi model, bước từ gia dụng sang thép mà không bắt đầu lại từ đầu",
          ],
        ],
      },
      {
        kind: "p",
        text: "Giống **buồng mô phỏng bay**: phi công tập thao tác trước khi bay thật. Mô hình không lái máy bay; nó giúp con người thử và so sánh trước khi cam kết. **Con người luôn là người quyết định.**",
      },
      { kind: "h3", text: "Khác biệt không nằm ở việc có thêm AI, mà ở chỗ **AI là chính quy trình**." },
      {
        kind: "compare",
        head: ["", "Nhà máy thông minh *(ứng dụng AI và tự động hóa)*", "**Nhà máy siêu thông minh** *(ứng dụng Mô hình AI Thế giới thực)*"],
        rows: [
          [
            "**AI ở đâu**",
            "Một công cụ, con người mở ra khi cần",
            "**Nằm ngay trong quy trình**: AI tạo hồ sơ, nối dữ liệu, kiểm tra mọi quyết định",
          ],
          [
            "**Dữ liệu**",
            "Cảm biến và dashboard; con người nhập tay",
            "Mọi việc làm, quyết định và kết quả **tự trở thành dữ liệu học**",
          ],
          ["**Biết được gì**", "Điều gì **đã** xảy ra", "Điều gì **sẽ** xảy ra nếu chọn phương án A hay B"],
          ["**Theo thời gian**", "Đứng yên, phải sửa quy tắc bằng tay", "**Mỗi tháng thông minh hơn**"],
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
        text: "**Điều chỉ Mô hình AI Thế giới thực làm được:** máy móc ghi lại điều đã xảy ra. Nền tảng dữ liệu tập trung ghi thêm **ai quyết định gì, vì sao, và điều gì xảy ra sau đó**. Học từ hàng nghìn chuỗi \"quyết định → hệ quả\", mô hình hiểu được **hệ quả**, không chỉ thấy **tương quan**.",
      },
      { kind: "p", text: "**Mô hình AI Thế giới thực không phải là:**" },
      {
        kind: "chips", tone: "negative", items: [
          "Chatbot",
          "Mô hình tạo video",
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
                "Lập hồ sơ, soạn kế hoạch kiểm tra, điều phối việc. **Mọi đề xuất đều được mô hình kiểm tra hệ quả trước**",
              ],
              [
                "**② Mô hình AI Thế giới thực**: \"bộ não hiểu nhà máy\"",
                "Dự báo",
                "Học cách sản phẩm và nhà máy phản ứng với quyết định; dự báo kèm mức độ chắc chắn; nói \"không biết\" khi gặp tình huống chưa từng thấy",
              ],
              [
                "**① Nền tảng dữ liệu tập trung**: \"trí nhớ của nhà máy\"",
                "Ghi lại",
                "Ghi việc bằng giọng nói tiếng Việt · nối ERP, kiểm tra, bảo hành · phân quyền · lưu mọi quyết định",
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
    id: "mot-ngay",
    act: 2,
    theme: "navy",
    layout: "wide",
    eyebrow: "Một ngày trong Nhà máy siêu thông minh",
    title: "Cùng một bộ não, ở mọi nhà máy của Tập đoàn",
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
                "**07:40**",
                "**Xưởng gia dụng, Hòa Mạc**",
                "Công nhân báo một lỗi kiểm tra bằng giọng nói. AI tự lập hồ sơ; mô hình chỉ ra những lô cùng rủi ro trong vài phút. Kỹ sư chất lượng duyệt kế hoạch kiểm tra",
              ],
              [
                "**10:00**",
                "**Nhà máy thép, Dung Quất**",
                "Một tác nhân AI đề xuất dời lịch bảo trì. Trước khi đến người duyệt, mô hình kiểm tra hệ quả lên sản lượng và chất lượng. Người phụ trách quyết định với đầy đủ dự báo",
              ],
              [
                "**14:00**",
                "**R&D, Hòa Mạc**",
                "Hai phương án sửa một bo mạch được so sánh trước khi làm khuôn hay thử nghiệm. R&D chọn phương án có dự báo tốt hơn, rồi thử để xác nhận",
              ],
              [
                "**16:30**",
                "**Dây chuyền tủ lạnh mới, Phú Mỹ**",
                "Trong giai đoạn tăng công suất, mô hình mang kinh nghiệm từ các dây chuyền điện lạnh hiện có, chỉ ra những công đoạn cần theo dõi sát",
              ],
              [
                "**Cuối ngày**",
                "**Toàn Tập đoàn**",
                "Mọi quyết định trong ngày và kết quả của chúng quay về mô hình. **Ngày mai, cả Tập đoàn thông minh hơn hôm nay**",
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
        text: "**Cùng một nền tảng · cùng một họ mô hình · cùng một đội ngũ IT của Hòa Phát.** Ở cấp Tập đoàn, các tác nhân AI có một mô hình của nhà máy để kiểm tra hệ quả trước khi đề xuất.",
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
          "Mô hình AI được triển khai thực tế",
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
        title: "Bảng danh mục use case",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["#", "Use case", "Câu hỏi được trả lời", "Dùng thật từ"],
            rows: [
              ["**Ứng dụng 01**", "**Lập hồ sơ khách hàng tự động**", "Lỗi này đã có đủ bằng chứng chưa? Ai cần xử lý?", "**T+1**"],
              ["**Ứng dụng 02**", "**Dự báo lô hàng rủi ro cao**", "Lô hoặc trạm nào cần kiểm tra ngay?", "**T+5** (thi trên lịch sử từ T+2)"],
              [
                "**Ứng dụng 03**",
                "**So sánh các phương án trước khi thực hiện**",
                "Chỉnh firmware hay đổi linh kiện, cách nào hiệu quả hơn?",
                "**T+6** (thi trên lịch sử từ T+3)",
              ],
              ["UC3", "Cảnh báo sớm bảo hành", "Nhóm sản xuất nào sắp phát sinh bảo hành?", "T+7"],
              [
                "UC4",
                "Tối ưu đề xuất của tác nhân AI",
                "Đề xuất của tác nhân AI (của Minder, hoặc của Tập đoàn như tại Dung Quất) đã đủ an toàn để đến người duyệt chưa?",
                "T+8",
              ],
              ["UC5", "Chẩn đoán trước yêu cầu khách hàng", "Kỹ thuật viên nên chuẩn bị lỗi và linh kiện nào trước khi đến nhà khách?", "T+9"],
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
        title: "Thẻ use case: ba use case đầu tiên",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Ứng dụng 01 Lập hồ sơ khách hàng tự động**", "**Ứng dụng 02 Dự báo lô hàng rủi ro cao**", "**Ứng dụng 03 So sánh các phương án trước khi thực hiện**"],
            rows: [
              [
                "**Cơ hội**",
                "Rút ngắn thời gian kỹ sư tập hợp bằng chứng từ nhiều hệ thống",
                "Dồn nguồn lực kiểm tra vào đúng nơi có nguy cơ cao",
                "Dự báo trước phương án nào hiệu quả, trước khi đầu tư khuôn, thẩm định, chứng nhận",
              ],
              [
                "**AI làm gì**",
                "Từ lời báo bằng giọng nói, AI tạo hồ sơ, gắn model, phiên bản bo mạch, lô linh kiện, kết quả đo",
                "Xếp hạng lô và trạm theo nguy cơ không đạt kiểm tra hoặc bảo hành",
                "Dự báo tác động của từng phương án lên lỗi và bảo hành, kèm các thay đổi lịch sử làm dẫn chứng",
              ],
              [
                "**Dữ liệu**",
                "Ghi nhận giọng nói, BOM, kết quả kiểm tra",
                "Lô linh kiện, phiên bản, kết quả đo, sửa lại",
                "Lịch sử thay đổi kỹ thuật và kết quả sau đó",
              ],
              [
                "**Ai quyết định**",
                "Kỹ sư chất lượng",
                "Chất lượng quyết định kiểm tra gì",
                "R&D và Chất lượng duyệt qua quy trình phát hành hiện có",
              ],
              [
                "**Đo bằng**",
                "Giờ công cho mỗi hồ sơ",
                "Số lỗi thật bắt được với cùng nguồn lực kiểm tra",
                "Số thay đổi phải làm lại; thời gian ra quyết định",
              ],
              [
                "**Tiêu chí đạt**",
                "Giảm **≥25%** thời gian",
                "Bắt thêm **≥20%** lỗi thật",
                "Chọn đúng phương án tốt hơn **≥70%**",
              ],
            ],
          },
        ],
      },
      {
        title: "Thẻ use case: ba use case tiếp theo, mở rộng ra thị trường và sang tác nhân AI của Tập đoàn",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Ứng dụng 04 Cảnh báo sớm bảo hành**", "**Ứng dụng 05 Tối ưu đề xuất của tác nhân AI**", "**Ứng dụng 06 Chẩn đoán trước yêu cầu khách hàng**"],
            rows: [
              [
                "**Cơ hội**",
                "Phát hiện xu hướng sớm hơn, nên ít sản phẩm bị ảnh hưởng hơn",
                "Người duyệt chỉ nhận đề xuất đã được kiểm tra, nên năng suất tăng mà chuẩn duyệt không giảm",
                "Sửa đúng ngay lần đầu",
              ],
              [
                "**AI làm gì**",
                "Dự báo đường bảo hành của từng nhóm sản xuất, vài tháng trước khi yêu cầu bảo hành xuất hiện",
                "Kiểm tra trước tính khả thi và hệ quả của đề xuất từ tác nhân AI. **Đây là cầu nối sang thép**",
                "Dự báo lỗi và cách sửa có khả năng nhất cho từng ca dịch vụ",
              ],
              ["**Ai quyết định**", "Chất lượng và ngành hàng", "Người duyệt vẫn duyệt mọi việc", "Chuyên gia kỹ thuật"],
              [
                "**Tiêu chí đạt**",
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
                "Đóng góp vào mô hình nền chung, cùng thiết kế bộ đề thi, đồng tác giả báo cáo kỹ thuật, **dẫn dắt mở rộng sang thép**",
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
            head: ["", "**Thử nghiệm (T+1–T+4)**", "**Dùng thật (T+5–T+8)**", "**Nhân rộng (T+9–T+12)**"],
            rows: [
              [
                "**Celesnity**",
                "**~5,5 người**: quản lý triển khai 1 · kỹ sư hiện trường (FDE) tại Hòa Mạc 2 · kỹ sư AI 1 · kỹ sư dữ liệu 1 · trưởng nhóm nghiên cứu ½",
                "**~4,5 người**: quản lý 1 · FDE 1,5 · kỹ sư AI 1 · kỹ sư dữ liệu ½ · nghiên cứu ½",
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
        title: "Thử nghiệm 16 tuần: kết quả nhanh ở tháng thứ 1, kết quả thi ở tháng thứ 4",
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
                "Nối dữ liệu lịch sử 2 năm; Hòa Phát dựng **bộ đề thi kín**; huấn luyện mô hình riêng phiên bản đầu",
                "Mô hình v0.1",
              ],
              [
                "**9–12**",
                "**Thi trên lịch sử của chính Hòa Phát**: dự báo của mô hình được so với những gì đã thực sự xảy ra (Ứng dụng 02 với các lô cũ, Ứng dụng 03 với các thay đổi kỹ thuật cũ); R&D và QC chấm mẫu",
                "Kết quả thi",
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
              "**Mở dữ liệu đã có:** chỉ đọc, không lắp thêm cảm biến, không thay hệ thống hiện tại.",
              "**Cử người:** 2 kỹ sư IT, và chuyên gia R&D/Chất lượng khoảng 4 giờ/tuần.",
              "**Giữ đề thi và chấm điểm.**",
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
              ["**T+2**", "Thử nghiệm: Học", "Ứng dụng 02 thi trên lịch sử", "", "Bộ đề thi kín", "Học việc", ""],
              ["**T+3**", "Thử nghiệm: Học", "Ứng dụng 03 thi trên lịch sử", "", "Nối dữ liệu bảo hành", "Học việc", ""],
              ["**T+4**", "Thử nghiệm: Học", "Kết quả thi", "", "", "**Tự chạy 1 vòng**", "**Cổng 2**"],
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
              ["Dùng thật (T+5–T+8)", "50%", "50%"],
              ["Nhân rộng (T+9–T+12)", "20%", "**80%**"],
              ["Năm thứ 2: thép", "Hỗ trợ", "**Dẫn dắt**"],
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
    id: "hop-tac",
    act: 3,
    theme: "light",
    eyebrow: "Hình thức hợp tác",
    title: "Hòa Phát đang đầu tư vào năng lực tự triển khai trong tương lai, không mua một phần mềm riêng lẻ",
    blocks: [
      { kind: "module", id: "M13", variant: "founding" },
      { kind: "h3", text: "Ba hạng mục triển khai chính" },
      { kind: "module", id: "M14", variant: "package" },
      {
        kind: "list",
        items: [
          "**Thử nghiệm:** phí cố định, phạm vi rõ ràng, thống nhất sau khảo sát Hòa Mạc. Không đạt Cổng 2 thì không chuyển sang giai đoạn có phí tiếp theo.",
          "**Sau thử nghiệm:** định giá theo giá trị Tài chính đã xác minh. Mỗi dòng sản phẩm, nhà máy hay mảng mới (kể cả thép) được định giá theo phạm vi riêng.",
          "**Không đề xuất:** độc quyền · góp vốn hay chia doanh thu · chuyển dữ liệu ra khỏi Việt Nam.",
          "**Nguồn tài trợ mô hình nền:** Celesnity tự tài trợ. Hai bên có thể cùng nộp hồ sơ xin quỹ khoa học và công nghệ của Việt Nam.",
        ],
      },
      { kind: "h3", text: "Bảy cam kết không thay đổi" },
      { kind: "module", id: "M13", variant: "commitments" },
      { kind: "h3", text: "Sở hữu trí tuệ" },
      {
        kind: "cards", cols: 3, tone: "orange",
        head: ["Tài sản", "Chủ sở hữu", "Quyền của Hòa Phát"],
        rows: [
          ["Dữ liệu, thiết kế, hồ sơ vận hành", "Hòa Phát", "Toàn quyền"],
          [
            "Mô hình riêng và các kết quả về hoạt động Hòa Phát",
            "Hòa Phát",
            "Sở hữu; Celesnity chỉ dùng để vận hành dịch vụ",
          ],
          [
            "Mô hình nền, mã huấn luyện, bộ công cụ đánh giá",
            "Celesnity",
            "Giấy phép nội bộ vĩnh viễn, miễn phí bản quyền theo mức tham gia",
          ],
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
        title: "Bảy cam kết không thay đổi",
        printOnly: true,
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Dữ liệu thô lưu tại Việt Nam. **Bản vẽ, thiết kế, firmware, BOM, công thức quy trình không bao giờ rời Hòa Phát.**",
              "Hòa Phát duyệt mục đích, người truy cập, thời hạn lưu và mọi phần được chia sẻ.",
              "Dữ liệu người lao động **không bao giờ** được dùng để xếp hạng hay kỷ luật cá nhân.",
              "Mô hình chỉ dự báo và so sánh. **Con người có thẩm quyền phê duyệt mọi thay đổi**; mô hình không điều khiển thiết bị.",
              "Dữ liệu Hòa Phát không được dùng cho mô hình của đối thủ trực tiếp.",
              "Mã nguồn và mô hình riêng được lưu ký tại bên thứ ba. Khi chấm dứt hợp tác, Hòa Phát giữ mô hình và giấy phép.",
              "Mọi công bố cần Hòa Phát đồng ý bằng văn bản (xem trước ít nhất 30 ngày).",
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
    blocks: [
      { kind: "module", id: "M14", variant: "benefits" },
    ],
    details: [
      {
        title: "Bảng lợi ích hai bên",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Hòa Phát**", "**Celesnity**"],
            rows: [
              [
                "**Nhận**",
                "Giá trị đo được trên từng sản phẩm · mô hình riêng chạy tại Việt Nam · **đội ngũ IT tự chủ vận hành và huấn luyện** · quyền dùng mô hình nền · tiếp cận tính năng mới sớm 6 tháng · chủ trì Ban chỉ đạo · con đường sang thép",
                "Mô hình được kiểm chứng trong công nghiệp Việt Nam · bản cập nhật mô hình (**không bao giờ là dữ liệu thô**) · đối tác tham chiếu đầu tiên · bộ đề thi làm chung · doanh thu",
              ],
              [
                "**Góp**",
                "Dữ liệu (theo mức Hòa Phát chọn) · chuyên gia nghiệp vụ · hạ tầng tính toán tại Việt Nam · đội ngũ IT 2→4 người",
                "Mô hình nền · nền tảng dữ liệu tập trung · đội FDE 5,5→3 người · chi phí nghiên cứu mô hình nền",
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
    title: "Kính gửi Chủ tịch Hội đồng Quản trị và Ban Tổng Giám đốc Tập đoàn Hòa Phát",
    blocks: [
      {
        kind: "p",
        text: "Trước hết, Celesnity xin trân trọng cảm ơn Quý vị đã dành thời gian cho đề xuất này.",
      },
      {
        kind: "p",
        text: "Hòa Phát lớn mạnh bằng cách **tự làm chủ từng mắt xích** của chuỗi giá trị: từ nguyên liệu, thép, đến đồ gia dụng và cả bo mạch bếp từ. Trong thập kỷ tới, mắt xích quyết định sức cạnh tranh của một nhà máy là **trí thông minh vận hành**: khả năng hiểu vì sao lỗi xảy ra, dự báo trước hệ quả của mỗi quyết định, và mang kinh nghiệm từ nơi này sang nơi khác. Thế hệ AI tiếp theo đang chuyển từ ngôn ngữ sang thế giới vật lý, và doanh nghiệp nào làm chủ trí thông minh vận hành của chính mình sẽ giữ lợi thế lâu dài.",
      },
      {
        kind: "p",
        text: "Vì vậy, Celesnity trân trọng đề xuất Hòa Phát trở thành **Đối tác công nghiệp sáng lập** của chương trình **Nhà máy siêu thông minh**. Chương trình xây dựng một Mô hình AI Thế giới thực hiểu cách các nhà máy của Hòa Phát vận hành. Mô hình chạy tại Việt Nam, trên dữ liệu của Hòa Phát, và **do chính đội ngũ Hòa Phát làm chủ**.",
      },
      { kind: "p", text: "**Tầm nhìn**\nMỗi nhà máy của Hòa Phát, từ gia dụng đến thép, đều có thể **tự học** từ mỗi quyết định và kết quả thực tế, **dự báo trước** hệ quả của quyết định tiếp theo, và **nhân rộng** kinh nghiệm sang mọi dây chuyền, mọi nhà máy trong Tập đoàn." },
      { kind: "p", text: "**Cách làm**\nChương trình bắt đầu nhỏ và chắc: một dòng bếp từ tại Hòa Mạc, sáu ứng dụng mở dần theo bằng chứng. Ngay từ tháng thứ 1, đội ngũ IT của Hòa Phát làm việc cùng kỹ sư Celesnity tại nhà máy, để năng lực ở lại Hòa Phát chứ không nằm ở nhà cung cấp." },
      { kind: "p", text: "**Kết quả dự kiến sau 12 tháng**\n6 ứng dụng chạy thật trên 2–3 dòng sản phẩm, mở rộng sang nhà máy điện lạnh Hưng Yên và Phú Mỹ. **Đội ngũ IT của Hòa Phát tự vận hành và tự huấn luyện lại mô hình**, và có kế hoạch cụ thể để bước sang nhà máy thép." },
      { kind: "p", text: "**Cách chứng minh**\n**Hòa Phát giữ bộ đề thi kín** cho Mô hình AI Thế giới thực. Mô hình phải thi đạt trên dữ liệu của chính Hòa Phát, do Hòa Phát chấm, trước khi được dùng thật. Giai đoạn nào chưa đạt thì chương trình không chuyển sang giai đoạn có phí tiếp theo." },
      { kind: "p", text: "**Cam kết của Celesnity**\nDữ liệu thô lưu tại Việt Nam và dưới quyền Hòa Phát; bản vẽ, thiết kế và công thức quy trình không bao giờ rời Hòa Phát. Mô hình chỉ dự báo và so sánh; **con người có thẩm quyền phê duyệt mọi thay đổi**." },
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
        text: "Chúng tôi tin rằng Nhà máy siêu thông minh do một tập đoàn Việt Nam làm chủ, trên dữ liệu Việt Nam, có thể trở thành chuẩn mực mới cho sản xuất trong khu vực. Celesnity mong được đồng hành cùng Hòa Phát trên chặng đường đó.",
      },
      { kind: "signature", lines: ["Trân trọng,", "**Celesnity**, đơn vị phát triển nền tảng Minder"] },
    ],
  },
];

/**
 * Các section tạm cất (không hiển thị trên trang, không vào bản in và trợ lý).
 * Muốn bật lại: chuyển phần tử về mảng `sections` đúng vị trí cũ
 * ("mo-phong" sau "ba-lop"; "phong-thi" sau "thu-ngay"; "loi-moi" ở cuối (thay "thu-ngo" về sau "mo-dau"); "kiem-soat" sau "hai-ben" (cũ; chi tiết đã chuyển sang "hop-tac"); "gia-tri" sau "phong-thi").
 */
export const parkedSections: Section[] = [
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
          ["T+4", "Cổng 2: kết quả thi trước Ban chỉ đạo"],
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

    ],
  },
  {
    id: "phong-thi",
    act: 3,
    theme: "dark",
    layout: "wide",
    eyebrow: "Hòa Phát giữ đề thi",
    title: "Mô hình phải thi đỗ trên dữ liệu của Hòa Phát, do Hòa Phát chấm, trước khi được dùng",
    blocks: [
      {
        kind: "p",
        text: "**Bộ đề thi kín:** Hòa Phát giữ riêng một phần dữ liệu lịch sử kèm kết quả thật. Celesnity không xem được đáp án; mô hình làm bài, Hòa Phát chấm.",
      },
      { kind: "module", id: "M11" },
      {
        kind: "p",
        text: "**Không đạt thì sao:** dừng hoặc điều chỉnh use case đó. **Không chuyển sang giai đoạn có phí tiếp theo khi cổng chưa đạt.** Các use case khác và quy trình Ứng dụng 01 vẫn tiếp tục.",
      },
      { kind: "h3", text: "Bốn bước trước khi kỹ sư được dùng dự báo" },
      { kind: "steps", layout: "vertical", rows: [["Thi trên lịch sử", "mô hình chỉ thấy thông tin có tại thời điểm của mỗi quyết định cũ."], ["Chuyên gia chấm", "R&D và Chất lượng chấm mẫu, kể cả những ca mô hình sai."], ["Chạy thử song song", "mô hình chạy trên ca thật nhưng không ai thấy dự báo khi quyết định; kết quả được so sánh sau."], ["Tư vấn", "kỹ sư thấy dự báo kèm bằng chứng và quyết định như trước. Mọi lần không theo dự báo đều được ghi lý do."]] },
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

/** Lợi ích hai bên (M14 variant "benefits") */
export const benefits = {
  hoaPhat: {
    name: "Hòa Phát",
    receive: [
      "Giá trị đo được trên từng sản phẩm",
      "Mô hình riêng chạy tại Việt Nam",
      "**Đội ngũ IT tự chủ vận hành và huấn luyện**",
      "Quyền dùng mô hình nền",
      "Tiếp cận tính năng mới sớm 6 tháng",
      "Chủ trì Ban chỉ đạo",
      "Con đường sang thép",
    ],
    give: [
      "Dữ liệu (theo mức Hòa Phát chọn)",
      "Chuyên gia nghiệp vụ",
      "Hạ tầng tính toán tại Việt Nam",
      "Đội ngũ IT 2→4 người",
    ],
  },
  celesnity: {
    name: "Celesnity",
    receive: [
      "Mô hình được kiểm chứng trong công nghiệp Việt Nam",
      "Bản cập nhật mô hình (**không bao giờ là dữ liệu thô**)",
      "Đối tác tham chiếu đầu tiên",
      "Bộ đề thi làm chung",
      "Doanh thu",
    ],
    give: ["Mô hình nền", "Nền tảng dữ liệu tập trung", "Đội FDE 5,5→3 người", "Chi phí nghiên cứu mô hình nền"],
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
            "Thi trên các thay đổi cũ; chuyên gia chấm; chỉ dùng ở chế độ tư vấn",
          ],
          [
            "Kinh nghiệm gia dụng không áp dụng được cho thép",
            "Thép có khảo sát và bộ đề thi riêng; thứ mang sang là nền tảng, phương pháp và đội ngũ, không mặc định mang sang độ chính xác",
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
