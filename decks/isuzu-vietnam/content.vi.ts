/**
 * Câu chữ của deck Isuzu Việt Nam (/isuzu-vietnam), chuyển từ docs/isuzu-content-v1.md
 * (gốc: Celesnity/isuzu_nha-may-sieu-thong-minh_deck_v1.md).
 * Không viết cứng câu chữ trong component; sửa ở đây rồi chạy `npm run content:check`.
 */
import type { Act, AppendixSection, BenefitSide, Closing, CostShiftRow, DeckLabels, PackagePart, Section } from "../types";

export const meta = {
  title: "Nhà máy siêu thông minh · Isuzu Việt Nam × Celesnity",
  description: "Đề xuất hợp tác, Pilot và lộ trình use case. Tài liệu thảo luận, tháng 10/2026.",
  tagline: "Tự học · Dự báo trước · Nhân rộng",
  footer: "NHÀ MÁY SIÊU THÔNG MINH · Isuzu Việt Nam × Celesnity · Tài liệu thảo luận",
};

export const acts: Act[] = [
  { n: 1, label: "I.", title: "Một kỷ nguyên mới" },
  { n: 2, label: "II.", title: "Nhà máy siêu thông minh" },
  { n: 3, label: "III.", title: "Con đường đến \"không thể tạo ra lỗi\"" },
];

export const labels: DeckLabels = {
  sim: "Mô phỏng minh họa — mô hình thật được huấn luyện trong Pilot",
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

const PHOTO_CREDIT = "Ảnh: Isuzu Việt Nam";

export const sections: Section[] = [
  // ───────────────────────────── MỞ ĐẦU ─────────────────────────────
  {
    id: "mo-dau",
    act: 0,
    theme: "dark",
    layout: "hero",
    cover: "/decks/isuzu-vietnam/cong-nha-may-go-vap.jpg",
    coverLayout: "right",
    coverPosition: "18% 50%",
    eyebrow: "Isuzu Việt Nam × Celesnity",
    title: "NHÀ MÁY\nSIÊU THÔNG MINH",
    blocks: [
      { kind: "lead", text: "Kế thừa tinh hoa Triết lý Isuzu Monozukuri" },
      { kind: "p", text: "**Tự học · Dự báo trước · Nhân rộng**" },
      { kind: "note", text: "Đề xuất hợp tác, Pilot và lộ trình use case · Tài liệu thảo luận" },
    ],
  },

  // ───────────────────────────── HỒI 1 ─────────────────────────────
  {
    id: "tu-chu",
    act: 1,
    theme: "mist",
    eyebrow: "Isuzu Việt Nam hôm nay",
    title: "Ba mươi năm vận hành theo Triết lý Isuzu Monozukuri",
    blocks: [
      {
        kind: "flow",
        steps: ["CKD", "BODY", "PAINT", "TRIM", "CHASSIS", "QC", "Đại lý"],
      },
      {
        kind: "list",
        items: [
          "**Ba mươi năm:** liên doanh Việt–Nhật thành lập năm 1995 (Isuzu, Itochu, Samco, Resco). **Hơn 129.000 xe** đến tháng 9/2025.",
          "**Dải sản phẩm rộng:** xe tải nhẹ (Q-Series, N-Series), trung và nặng (F-Series), đầu kéo, khung gầm xe buýt, D-MAX và mu-X.",
          "**Isuzu Monozukuri:** bộ tiêu chuẩn ban hành 1/7/2025, hướng tới chứng nhận IM từ Isuzu Motors vào cuối 2026.",
          "**Asakai mỗi sáng:** các bộ phận chia sẻ vấn đề chất lượng và giải pháp ngay đầu ngày.",
          "**Hướng đi:** từ nhà sản xuất xe sang nhà cung cấp giải pháp vận tải. 29 đại lý và trạm dịch vụ; trung tâm dịch vụ hậu mãi tại Củ Chi.",
        ],
      },
      {
        kind: "photo",
        photo: {
          src: "/decks/isuzu-vietnam/chuyen-lap-cabin.jpg",
          alt: "Cabin xe tải Isuzu trên chuyền lắp ráp",
          width: 1170,
          height: 367,
          ratio: "16/5",
          caption: "Cabin xe tải trên chuyền lắp ráp",
          credit: PHOTO_CREDIT,
        },
      },
      {
        kind: "quote",
        emphasis: true,
        text: "Kế thừa Triết lý Monozukuri – tinh hoa quản lý sản xuất từ Nhật Bản,\nbước tiếp theo Isuzu Việt Nam cần chính là **một trí thông minh chung** dựa trên sự kỷ luật sẵn có.",
      },
    ],
  },
  {
    id: "ky-nguyen",
    act: 1,
    theme: "light",
    eyebrow: "Kỷ nguyên tiếp theo của sản xuất",
    title: "Thế hệ AI tiếp theo không phải AI biết nói, mà là AI hiểu thế giới vật lý",
    blocks: [
      { kind: "module", id: "M2" },
      {
        kind: "statement",
        context: "Các tập đoàn công nghệ lớn đang dồn sức vào AI cho thế giới vật lý (ví dụ NVIDIA Cosmos, Meta V-JEPA 2).",
        highlight:
          "Mô hình chung về hình ảnh và ngôn ngữ sẽ ai cũng có. **Thứ không mua được là kinh nghiệm của từng nhà máy:** lỗi nào đã xảy ra, vì sao, đã khắc phục ra sao, và kết quả thế nào.",
        conclusion: "Một nhà máy ghi lại chuỗi \"phát hiện → nguyên nhân → khắc phục → kết quả\" mỗi ngày đang tạo ra đúng loại dữ liệu này.",
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
              ["**AI ngôn ngữ** (ChatGPT, trợ lý ảo)", "Đọc, viết, trả lời câu hỏi", "Ai có mô hình ngôn ngữ, và đang trở nên phổ biến, rẻ dần"],
              [
                "**Mô hình AI Thế giới thực** *(World Model)*",
                "**Hiểu một hệ thống vật lý phản ứng thế nào với quyết định, và dự báo trước**",
                "**Ai có dữ liệu vận hành thật**",
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
    title: "AI cho nhà máy Gò Vấp nên là nhiều công cụ rời, hay một mô hình hiểu mọi chiếc xe?",
    blocks: [
      { kind: "module", id: "M3", variant: "loop" },
      {
        kind: "quote",
        text: "Monozukuri vốn là một hệ thống, không phải tập hợp công cụ. **Trí thông minh vận hành kế thừa nó cũng phải là một hệ thống.**",
      },
    ],
    details: [
      {
        title: "Bảng hai con đường",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Con đường A: AI theo từng bộ phận**", "**Con đường B: Một mô hình cho mọi chiếc xe**"],
            rows: [
              ["**Dữ liệu**", "Mỗi công cụ giữ một phần: chất lượng, kho, bảo trì", "**Một lý lịch số chung, nối bằng VIN**"],
              [
                "**Một lỗi được hiểu đến đâu**",
                "Trong phạm vi công cụ nhìn thấy",
                "**Đến trạm, đồ gá, lô linh kiện, ca, và mọi xe liên quan**",
              ],
              ["**Bài học**", "Nằm trong báo cáo của một bộ phận", "**Thành trí thông minh chung, có mặt ở Asakai hôm sau**"],
              ["**Khi thêm dòng xe hay nhà cung cấp**", "Cấu hình lại từng công cụ", "**Mang kinh nghiệm cũ sang, rồi học tiếp**"],
              ["**Khi xe rời nhà máy**", "Dữ liệu dừng ở cổng", "**Lý lịch đi theo xe đến đại lý và khách hàng**"],
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
    title: "Ba cấp bậc của Isuzu Monozukuri tương ứng với ba năng lực của Nhà máy siêu thông minh",
    blocks: [
      { kind: "module", id: "M1", variant: "story" },
      {
        kind: "table",
        printOnly: true,
        head: ["Thuộc tính", "Nghĩa là", "Ví dụ"],
        rows: [
          [
            "**1. Tự học**",
            "Mỗi lỗi, nguyên nhân và hành động khắc phục tự trở thành dữ liệu, gắn với VIN, trạm, đồ gá, lô và ca",
            "Lỗi mới xuất hiện: mô hình tìm ngay các lần tương tự và cách đã xử lý",
          ],
          [
            "**2. Dự báo trước**",
            "Nhận ra dấu hiệu của một lỗi cũ **trước khi** nó lặp lại, kèm mức độ chắc chắn",
            "Đồ gá có dấu hiệu lệch, lô linh kiện nghi vấn, trạm cần kiểm tra thêm",
          ],
          [
            "**3. Nhân rộng**",
            "Bài học ở một trạm thành tiêu chuẩn cho mọi công đoạn, dòng xe và nhà cung cấp",
            "Hành động khắc phục ở BODY trên QKR được đề xuất cho N-Series và F-Series",
          ],
        ],
      },
      {
        kind: "p",
        text: "Giống **buồng mô phỏng bay**: phi công tập thao tác trước khi bay thật. Mô hình không vận hành dây chuyền; nó giúp QA và kỹ sư tìm ca cũ, tìm điểm chung và khoanh vùng xe bị ảnh hưởng trước khi quyết định. **QA luôn là người quyết định.**",
      },
      { kind: "h3", text: "Cùng một tinh thần: **Triết lý Isuzu Monozukuri** và **Nhà máy siêu thông minh**." },
      {
        kind: "compare",
        head: ["", "Triết lý Isuzu Monozukuri", "**Nhà máy siêu thông minh** *(ứng dụng Mô hình AI Thế giới thực)*"],
        rows: [
          ["**Mục tiêu**", "Liên tục làm ra sản phẩm tốt hơn; không lặp lại cùng một lỗi", "Mỗi lỗi và cách khắc phục **trở thành dữ liệu học**; mỗi tháng thông minh hơn"],
          ["**Nền tảng**", "Sản xuất theo tiêu chuẩn", "**Một bản ghi đầy đủ cho từng chiếc xe**: lý lịch số theo VIN"],
          ["**Cách tiến lên**", "Ba cấp bậc: không bỏ sót lỗi → không tạo ra lỗi → không thể tạo ra lỗi", "Ba năng lực: **Tự học → Dự báo trước → Nhân rộng**"],
          ["**Nhịp mỗi ngày**", "Asakai: các bộ phận chia sẻ vấn đề chất lượng và giải pháp ngay đầu ngày", "**Bản tóm tắt sẵn trước Asakai**; quyết định gắn vào từng VIN"],
          ["**Quản lý chất lượng**", "Kỹ thuật sản xuất, Sản xuất và QC độc lập, giám sát lẫn nhau", "Mô hình là **nguồn bằng chứng chung** cho cả ba bên; QC giữ quyền kết luận"],
          ["**Con người**", "Hitozukuri: con người chủ động học, nghĩ và hành động", "**Đội Isuzu tự vận hành mô hình**; kinh nghiệm của người giỏi thành của mọi người"],
        ],
      },
    ],
  },
  {
    id: "ly-lich-so",
    act: 2,
    theme: "light",
    layout: "wide",
    eyebrow: "Lý lịch số của từng chiếc xe",
    title: "Mỗi chiếc xe mang theo ký ức của nó",
    blocks: [
      {
        kind: "p",
        wide: true,
        text: "Từ một lỗi, mô hình nối được toàn bộ bối cảnh. Từ một chiếc xe, nó biết xe được lắp từ những gì. Từ một lô linh kiện, nó biết lô đó nằm trên những xe nào, và mỗi xe đang ở đâu: **nhà máy, đại lý hay khách hàng**.",
      },
      { kind: "module", id: "M19" },
    ],
    details: [
      {
        title: "Bối cảnh của một lỗi",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Thành phần", "Ví dụ minh họa"],
            rows: [
              ["**Xe**", "VIN QKR-00182 · Model QKR"],
              ["**Quy trình**", "Công đoạn BODY · Trạm BODY-08 · Đồ gá JIG-04"],
              ["**Linh kiện**", "Bản lề cửa phải · Nhà cung cấp A · Lô LOT-2938"],
              ["**Con người**", "Người thao tác · Ca"],
              ["**Lịch sử**", "Lịch sử lỗi · Nguyên nhân gốc · Hành động khắc phục"],
            ],
          },
        ],
      },
      {
        title: "Truy xuất hai chiều",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["**Xe → linh kiện**", "**Linh kiện → xe**"],
            rows: [
              [
                "VIN QKR-00182 → động cơ (serial), cầu (serial), phanh (nhà cung cấp C, lô BR-292), kính (nhà cung cấp B, lô GL-820), ghế (nhà cung cấp A, lô ST-920)",
                "Nhà cung cấp báo lô phanh BR-292 có vấn đề → danh sách mọi VIN đã lắp lô này",
              ],
            ],
          },
          {
            kind: "flow",
            steps: ["Lô linh kiện", "VIN", "Ngày sản xuất", "Kết quả QC", "Vị trí hiện tại: nhà máy · đại lý · khách hàng"],
          },
          { kind: "note", text: "Ví dụ minh họa; mã VIN, lô và nhà cung cấp không phải dữ liệu thật." },
        ],
      },
    ],
  },
  {
    id: "ba-lop",
    act: 2,
    theme: "light",
    eyebrow: "Ba lớp của Nhà máy siêu thông minh",
    title: "Nền tảng ghi lại, Mô hình AI Thế giới thực dự báo, Tác nhân AI hành động; QA phê duyệt",
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
        text: "**Giữ nguyên cách Isuzu phân quyền chất lượng.** Kỹ thuật sản xuất, Sản xuất và QC vẫn độc lập và giám sát lẫn nhau. Mô hình là nguồn bằng chứng chung cho cả ba bên. Quyền kết luận về chất lượng vẫn thuộc QC.",
      },
      { kind: "p", text: "**Mô hình AI Thế giới thực không phải là:**" },
      {
        kind: "chips",
        tone: "negative",
        items: ["Chatbot", "Hệ thống tự điều khiển thiết bị", "Công cụ thay quyết định xuất xưởng"],
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
                "Tác nhân Chất lượng: tìm ca cũ, điểm chung, khắc phục · Tác nhân Truy xuất: nối VIN, linh kiện, lô và vị trí xe · Soạn phương án; mọi đề xuất được kiểm tra trước",
              ],
              [
                "**② Mô hình AI Thế giới thực**: \"bộ não hiểu nhà máy\"",
                "Dự báo",
                "Học quan hệ giữa lỗi, trạm, đồ gá, lô, ca, dòng xe · Dự báo kèm mức độ chắc chắn · Nói \"không biết\" khi gặp tình huống chưa từng thấy",
              ],
              [
                "**① Nền tảng Minder**: \"trí nhớ của nhà máy\"",
                "Ghi lại",
                "Lý lịch số cho từng VIN · báo lỗi bằng giọng nói tiếng Việt · nối ERP, kho, QC · phân quyền",
              ],
              [
                "**QA và người có thẩm quyền**",
                "Quyết định",
                "Phê duyệt mọi quyết định chất lượng, mọi thay đổi tiêu chuẩn, và mọi quyết định xuất xưởng",
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
    title: "Một bộ não vận hành xuyên suốt: từ buổi họp Asakai đầu ngày đến trạm dịch vụ hậu mãi",
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
                "**07:30**",
                "**Asakai**",
                "Bản tóm tắt đã sẵn: lỗi hôm qua, lỗi nào khớp với ca cũ, hành động khắc phục nào đang chờ kết quả. Cuộc họp bắt đầu từ quyết định, không từ việc tổng hợp",
              ],
              [
                "**09:40**",
                "**Trạm BODY-08**",
                "Công nhân báo lỗi bản lề cửa bằng giọng nói. Hồ sơ tự gắn VIN, lô, đồ gá, ca. Tác nhân Chất lượng tìm ra 17 ca tương tự và hành động khắc phục lần trước",
              ],
              [
                "**10:30**",
                "**Phòng QA**",
                "Tác nhân Truy xuất lập danh sách mọi xe đã lắp cùng lô và vị trí hiện tại của từng xe. QA duyệt phạm vi kiểm tra",
              ],
              [
                "**14:00**",
                "**Bảo trì**",
                "Mô hình báo một đồ gá có dấu hiệu giống những lần trước khi lỗi lặp lại. Bảo trì xếp lịch kiểm tra vào giờ nghỉ ca",
              ],
              [
                "**16:00**",
                "**Trung tâm dịch vụ Củ Chi**",
                "Một xe vào bảo dưỡng. Kỹ thuật viên mở lý lịch số của xe: lô linh kiện, kết quả QC ngày xuất xưởng, các lần bảo dưỡng trước",
              ],
              [
                "**Cuối ngày**",
                "**Toàn nhà máy**",
                "Mọi lỗi, quyết định và kết quả trong ngày quay về mô hình. **Ngày mai, Asakai bắt đầu từ một nhà máy thông minh hơn hôm nay**",
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
    eyebrow: "Bản đồ Nhà máy siêu thông minh của Isuzu Việt Nam",
    title: "Bắt đầu ở công đoạn BODY, mở ra toàn nhà máy, đích đến là chiếc xe trên đường",
    blocks: [
      { kind: "module", id: "M8" },
      { kind: "p", text: "**Cùng một nền tảng · cùng một lý lịch số · cùng một đội IT Isuzu.**" },
      {
        kind: "label",
        variant: "proposal",
        text: "Use case ngoài cổng nhà máy là hướng đề xuất, sẽ được xác định cùng Isuzu sau khi có kết quả trong nhà máy.",
      },
      { kind: "h3", text: "Isuzu Việt Nam có đủ những điều kiện mà một Nhà máy siêu thông minh cần" },
      {
        kind: "cards",
        cols: 4,
        rows: [
          [
            "**Văn hóa ghi nhận lỗi:** Monozukuri và Asakai biến mỗi lỗi thành một chu trình phát hiện → nguyên nhân → khắc phục. Đó chính là chuỗi dữ liệu mô hình cần để học",
          ],
          [
            "**Một khóa chung cho mọi dữ liệu:** mỗi xe có một VIN và đi qua 5 công đoạn rõ ràng. VIN nối được linh kiện, lô, trạm, QC và vị trí của xe",
          ],
          [
            "**Đa dạng dòng xe:** từ xe tải nhẹ đến đầu kéo và khung gầm xe buýt. Cấu tạo khác nhau nhưng chung một kiểu quyết định chất lượng, nên bài học nhân rộng được",
          ],
          [
            "**Chuỗi kéo dài đến khách hàng:** 29 đại lý và trạm dịch vụ, trung tâm hậu mãi Củ Chi, định hướng giải pháp vận tải. Lý lịch số có nơi để đi tiếp",
          ],
        ],
      },
      { kind: "h3", text: "Vì sao bắt đầu từ chất lượng tại BODY" },
      {
        kind: "cards",
        cols: 4,
        tone: "blue",
        head: ["Lý do", "Công đoạn BODY cho phép"],
        rows: [
          ["**Vòng phản hồi ngắn**", "Lỗi phát hiện trong ca, khắc phục được kiểm chứng trong vài ngày, nên mô hình học và được chấm điểm nhanh"],
          ["**Dữ liệu đã có**", "Hồ sơ lỗi, nguyên nhân, hành động khắc phục, nội dung Asakai. Không cần lắp thêm cảm biến"],
          ["**Lỗi bắt sớm, chi phí thấp nhất**", "BODY là công đoạn đầu; lỗi chặn được ở đây không đi tiếp qua PAINT, TRIM, CHASSIS"],
          ["**Rủi ro vận hành thấp**", "Mô hình chỉ đọc dữ liệu và tư vấn; không chạm vào thiết bị hay quyết định xuất xưởng"],
        ],
      },
      { kind: "h3", text: "Những gì mang sang các công đoạn khác và ra ngoài nhà máy" },
      {
        kind: "pillars",
        items: [
          "Lý lịch số đã chạy thật",
          "Phương pháp và bộ đề thi đã kiểm chứng",
          "Đội IT Isuzu đã tự vận hành được mô hình",
          "Quy trình quản trị dữ liệu đã được Isuzu duyệt",
        ],
      },
      { kind: "note", text: "Ở mỗi công đoạn mới, độ chính xác được kiểm chứng riêng, không mặc định mang sang." },
    ],
    details: [
      {
        title: "Bảng ba phạm vi",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**① Chất lượng tại BODY**", "**② Toàn nhà máy Gò Vấp**", "**③ Ngoài cổng nhà máy**"],
            rows: [
              ["**Nơi**", "Một dòng xe (QKR)", "5 công đoạn · mọi dòng xe · Kho CKD · nhà cung cấp", "Đại lý · hậu mãi · khách hàng vận tải"],
              ["**Vai trò**", "Nơi bắt đầu", "Nhân rộng", "**Đích đến**"],
              ["**Thời gian**", "Tháng 1–8", "Tháng 9–12", "Năm 2"],
              [
                "**Câu hỏi mô hình trả lời** *(ví dụ)*",
                "Lỗi này đã từng xảy ra chưa? Lần trước khắc phục thế nào? Xe nào khác bị ảnh hưởng?",
                "Công đoạn nào cần kiểm tra thêm hôm nay? Đồ gá hay thiết bị nào sắp cần bảo trì? Linh kiện CKD nào sắp thiếu so với kế hoạch lắp ráp? Lô của nhà cung cấp nào cần theo dõi?",
                "Xe nào của khách hàng nên được kiểm tra khi có một lô nghi vấn? Kỹ thuật viên nên chuẩn bị linh kiện gì trước khi xe vào xưởng? Làm sao để xe của khách hàng chạy được nhiều ngày hơn?",
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
    eyebrow: "Danh mục use case",
    title: "Một mô hình, sáu use case, mở dần theo bằng chứng, từ trạm BODY đến chiếc xe trên đường",
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
              ["**UC0**", "**Hồ sơ lỗi tự động**", "Lỗi này đã đủ bối cảnh chưa? Ai cần xử lý?", "**T1**"],
              ["**UC1**", "**Tác nhân Chất lượng**", "Lỗi này đã từng xảy ra chưa? Lần trước khắc phục thế nào?", "**T5** (thi trên lịch sử từ T2)"],
              [
                "**UC2**",
                "**Tác nhân Truy xuất: lý lịch số hai chiều**",
                "Xe này lắp những gì? Lô này nằm trên những xe nào, xe đang ở đâu?",
                "**T6** (thi trên lịch sử từ T3)",
              ],
              ["UC3", "Cảnh báo sớm lỗi lặp", "Trạm, đồ gá hay lô nào đang có dấu hiệu của một lỗi cũ?", "T7"],
              ["UC4", "Bảo trì dự báo thiết bị và đồ gá", "Thiết bị nào nên được kiểm tra trước khi ảnh hưởng đến chuyền?", "T8"],
              ["UC5", "Vật tư CKD và chất lượng nhà cung cấp", "Linh kiện nào sắp thiếu so với kế hoạch? Nhà cung cấp nào cần theo dõi?", "T9"],
              ["→", "**Nhân rộng trong nhà máy**", "PAINT, TRIM, CHASSIS, QC (T9–T11) → N-Series và F-Series (T10–T12)", ""],
              ["→", "**Ngoài cổng nhà máy**", "Khảo sát kết nối đại lý và hậu mãi (T10–T12) → pilot hậu mãi do đội Isuzu dẫn dắt (năm 2)", ""],
            ],
          },
        ],
      },
      {
        title: "Bản đồ mở rộng theo công đoạn",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Khu vực", "Mô hình hỗ trợ"],
            rows: [
              ["BODY", "Nối lỗi lắp ráp cabin với đồ gá, trạm, lô linh kiện, ca"],
              ["PAINT", "Nối lỗi bề mặt với lô sơn, điều kiện buồng sơn, thông số quy trình"],
              ["INTERIOR / TRIM", "Nối lỗi lắp nội thất với linh kiện và nhà cung cấp"],
              ["CHASSIS", "Truy xuất động cơ, cầu, phanh theo serial và lô"],
              ["INSPECTION / QC", "Nhóm các dạng lỗi lặp; phát hiện thiết bị kiểm tra bị lệch"],
              ["Kho và CKD", "So tồn kho với kế hoạch lắp ráp; cảnh báo thiếu trước"],
              ["Nhà cung cấp", "Chấm chất lượng và giao hàng theo lô"],
              ["Đại lý và hậu mãi", "Lý lịch số khi xe vào dịch vụ; khoanh vùng xe cần kiểm tra"],
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
    eyebrow: "Pilot, mười hai tháng và đội Isuzu làm chủ",
    title: "Kết quả nhanh ở tháng 1, kết quả thi ở tháng 4, IT Isuzu tự vận hành ở tháng 12",
    blocks: [
      { kind: "module", id: "M15" },
      { kind: "h3", text: "Chi tiết theo từng tháng" },
      { kind: "module", id: "M10" },
      { kind: "h3", text: "Nhân sự theo giai đoạn" },
      { kind: "module", id: "M16" },
      { kind: "h3", text: "Thang năng lực của đội IT Isuzu" },
      { kind: "module", id: "M17" },
      {
        kind: "p",
        text: "**Nguyên tắc chia vai:** IT vận hành hệ thống. QA và Kỹ thuật sản xuất xác nhận mô hình có đúng về chuyên môn hay không. Đúng tinh thần Hitozukuri: hệ thống giúp người giỏi lên, không thay người.",
      },
      { kind: "p", text: "**Isuzu chỉ cần 3 việc:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Mở dữ liệu đã có:** chỉ đọc, không lắp thêm cảm biến, không thay hệ thống hiện tại.",
          "**Cử người:** 2 kỹ sư IT, và chuyên gia QA/Kỹ thuật sản xuất khoảng 4 giờ/tuần.",
          "**Giữ đề thi và chấm điểm.**",
        ],
      },
    ],
    details: [
      {
        title: "Pilot 16 tuần",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            head: ["Tuần", "Việc", "Đầu ra"],
            rows: [
              [
                "**1–2**",
                "Khảo sát công đoạn BODY; QA, Kỹ thuật sản xuất và Sản xuất chọn dòng xe và bài toán; ký thỏa thuận dữ liệu",
                "Phạm vi và số nền được thống nhất",
              ],
              [
                "**3–4**",
                "Dựng môi trường tại Việt Nam; xây từ điển lỗi và cấu trúc lý lịch số; **bật hồ sơ lỗi tự động (UC0)**",
                "**Cổng 1** · UC0 chạy trên chuyền",
              ],
              [
                "**5–8**",
                "Nối 2 năm lịch sử lỗi, nguyên nhân, khắc phục và hồ sơ lô; QA Isuzu dựng **bộ đề thi kín**; huấn luyện mô hình riêng phiên bản đầu",
                "Mô hình v0.1",
              ],
              ["**9–12**", "**Thi trên lịch sử của chính Isuzu:** UC1 với các lỗi cũ, UC2 với các lô cũ; QA chấm mẫu", "Kết quả thi"],
              ["**13–14**", "Chạy thử song song, đưa kết quả vào Asakai; IT Isuzu tự chạy một vòng dữ liệu và chấm điểm", "Bằng chứng chuyển giao"],
              ["**15–16**", "Tài chính xác nhận giá trị; báo cáo trước Ban chỉ đạo", "**Cổng 2**: mở rộng, điều chỉnh hay dừng"],
            ],
          },
        ],
      },
      {
        title: "Các cổng và ngưỡng đạt",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Cổng", "Tiêu chí", "Ngưỡng đạt", "Ai chấm"],
            rows: [
              [
                "**Cổng 1 (T1)**",
                "Dữ liệu đủ để làm",
                "≥80% xe trong phạm vi nối được tới lô linh kiện; ≥2 năm lịch sử lỗi; ≥30 lỗi cũ có đủ nguyên nhân và khắc phục",
                "Đầu mối dữ liệu Isuzu",
              ],
              ["", "Sẵn sàng", "Thỏa thuận dữ liệu đã ký; môi trường tại Việt Nam đã duyệt; UC0 chạy trên chuyền", "Pháp chế, IT"],
              ["**Cổng 2 (T4), kết thúc pilot**", "UC1: tìm ca tương tự", "**≥80%** lỗi trong bộ đề có ca đúng trong 5 kết quả đầu", "QA"],
              ["", "UC2: truy xuất", "Khớp **100%** với hồ sơ đối chiếu", "QA"],
              ["", "Độ tin cậy", "Khi mô hình nói \"chắc chắn 90%\", kết quả đúng trong **85–95%** số lần", "Hội đồng dữ liệu"],
              ["", "Hữu ích", "**≥70%** đánh giá của kỹ sư là \"hữu ích\"", "QA, Kỹ thuật sản xuất"],
              ["", "UC0: năng suất", "Thời gian lập hồ sơ giảm **≥25%**", "QA"],
              ["", "An toàn", "**0** sự cố dữ liệu rời Việt Nam; kiểm thử bảo mật đạt", "IT, Pháp chế"],
              ["", "Chuyển giao", "IT Isuzu tự chạy 1 vòng dữ liệu và chấm điểm", "IT, Celesnity"],
              ["**Cổng 3 (T8)**", "Dùng thật", "**≥20** ca thật có dùng kết quả của mô hình; độ tin cậy giữ được trên dữ liệu mới", "Ban chỉ đạo"],
              ["", "Chuyển giao", "IT Isuzu **tự vận hành 4 tuần** liên tục", "IT"],
              ["", "Mở ra ngoài cổng", "Ban chỉ đạo duyệt khảo sát kết nối đại lý và hậu mãi", "Ban chỉ đạo"],
              ["**Cổng 4 (T12)**", "Giá trị", "Tài chính xác nhận giá trị năm **≥ ngưỡng hòa vốn**", "Tài chính"],
              ["", "Tự chủ", "IT Isuzu **tự huấn luyện lại** mô hình riêng, không cần hỗ trợ", "Ban chỉ đạo"],
            ],
          },
          {
            kind: "p",
            text: "**Không đạt thì sao:** dừng hoặc điều chỉnh use case đó. **Không chuyển sang giai đoạn có phí tiếp theo khi cổng chưa đạt.** Các use case khác và UC0 vẫn tiếp tục.",
          },
        ],
      },
      {
        title: "Mười hai tháng: mỗi use case là một chương",
        printOnly: true,
        blocks: [
          { kind: "note", text: "T1 là tháng đầu tiên sau khi Isuzu duyệt quyền truy cập dữ liệu và môi trường tính toán." },
          {
            kind: "table",
            head: ["Tháng", "Giai đoạn", "Use case trong nhà máy", "Ngoài cổng nhà máy", "Dữ liệu và nền tảng", "IT Isuzu", "Cổng"],
            rows: [
              ["**T1**", "Pilot: Học", "**UC0 dùng thật**", "", "Môi trường tại VN · từ điển lỗi · lý lịch số", "Học việc", "**Cổng 1**"],
              ["**T2**", "Pilot: Học", "UC1 thi trên lịch sử", "", "Bộ đề thi kín", "Học việc", ""],
              ["**T3**", "Pilot: Học", "UC2 thi trên lịch sử", "", "Nối dữ liệu lô và giao xe", "Học việc", ""],
              ["**T4**", "Pilot: Học", "Kết quả thi", "", "", "**Tự chạy 1 vòng**", "**Cổng 2**"],
              ["**T5**", "Dùng thật", "**UC1 dùng thật**", "", "Mở cho kỹ sư dùng", "Cùng vận hành", ""],
              ["**T6**", "Dùng thật", "**UC2 dùng thật**", "", "", "Cùng vận hành", ""],
              ["**T7**", "Dùng thật", "**UC3** lỗi lặp", "", "Nối dữ liệu bảo trì", "Cùng vận hành", ""],
              ["**T8**", "Dùng thật", "**UC4** bảo trì", "", "", "**Tự vận hành 4 tuần**", "**Cổng 3**"],
              ["**T9**", "Nhân rộng", "**UC5** vật tư · PAINT", "", "Nối dữ liệu kho CKD", "Tự vận hành", ""],
              ["**T10**", "Nhân rộng", "TRIM · N-Series", "Khảo sát đại lý và hậu mãi", "Dữ liệu các công đoạn mới", "Tự vận hành", ""],
              ["**T11**", "Nhân rộng", "CHASSIS · F-Series", "Đánh giá dữ liệu dịch vụ", "", "Tự huấn luyện lại", ""],
              ["**T12**", "Nhân rộng", "Đủ 5 công đoạn", "**Kế hoạch pilot hậu mãi năm 2**", "", "**Tự chủ**", "**Cổng 4**"],
            ],
          },
          {
            kind: "p",
            text: "**Năm 2:** pilot hậu mãi **do đội Isuzu dẫn dắt**, Celesnity hỗ trợ: lý lịch số đi theo xe đến đại lý và khách hàng vận tải.",
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
            head: ["", "**Pilot (T1–4)**", "**Dùng thật (T5–8)**", "**Nhân rộng (T9–12)**"],
            rows: [
              [
                "**Celesnity**",
                "**~5 người**: quản lý triển khai 1 · kỹ sư hiện trường (FDE) tại Gò Vấp 2 · kỹ sư AI 1 · kỹ sư dữ liệu 1",
                "**~4 người**: quản lý 1 · FDE 1,5 · kỹ sư AI 1 · kỹ sư dữ liệu ½",
                "**~3 người**: quản lý ½ · FDE 1 · kỹ sư AI 1 · nghiên cứu ½",
              ],
              ["**IT Isuzu: đội vận hành mô hình**", "**2 người**: kỹ sư dữ liệu, kỹ sư hạ tầng", "**3 người**: thêm 1 kỹ sư AI", "**3 người**"],
              [
                "**Chuyên gia nghiệp vụ Isuzu**",
                "QA, Kỹ thuật sản xuất: ~4 giờ/tuần mỗi người · đầu mối dữ liệu: ~2 giờ/tuần",
                "Như cũ, thêm Bảo trì ~2 giờ/tuần",
                "Như cũ, thêm Kho CKD và Hậu mãi",
              ],
              ["**Lãnh đạo Isuzu**", "Lãnh đạo phụ trách: họp tháng · IM Promotion và Tài chính: tại mỗi cổng", "", ""],
            ],
          },
        ],
      },
      {
        title: "Thang năng lực của đội IT Isuzu",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            layout: "vertical",
            head: ["Bậc", "Đội IT Isuzu làm được", "Bài kiểm tra", "Khi nào"],
            rows: [
              [
                "**1. Vận hành**",
                "Chạy luồng dữ liệu, giám sát mô hình, quản trị người dùng, xử lý sự cố thường gặp",
                "Tự chạy 1 vòng (T4) → tự vận hành 4 tuần (T8)",
                "T4–T8",
              ],
              [
                "**2. Tự huấn luyện lại**",
                "Cập nhật mô hình bằng dữ liệu mới, chấm trên bộ đề, quyết định phát hành phiên bản",
                "Tự huấn luyện lại không cần hỗ trợ, kết quả không kém phiên bản trước",
                "T12",
              ],
              [
                "**3. Dẫn dắt mở rộng**",
                "Đưa mô hình ra đại lý và hậu mãi, cùng thiết kế bộ đề thi mới",
                "Pilot hậu mãi do đội Isuzu dẫn dắt",
                "Năm 2",
              ],
            ],
          },
        ],
      },
      {
        title: "Ai vận hành hệ thống",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Giai đoạn", "Celesnity", "Isuzu"],
            rows: [
              ["Pilot (T1–4)", "90%", "10%"],
              ["Dùng thật (T5–8)", "50%", "50%"],
              ["Nhân rộng (T9–12)", "20%", "**80%**"],
              ["Năm 2: hậu mãi", "Hỗ trợ", "**Dẫn dắt**"],
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
    eyebrow: "Demo use case tại Công đoạn BODY",
    title: "Minder vận hành trên mô hình nhà máy Gò Vấp",
    blocks: [
      {
        kind: "label",
        variant: "sim",
        text: "Dữ liệu mô phỏng phục vụ demo, không phải số liệu thật của Isuzu Việt Nam. Bố trí nhà máy là minh họa.",
      },
      {
        kind: "video",
        video: {
          src: "/decks/isuzu-vietnam/demo-nha-may.mp4",
          poster: "/decks/isuzu-vietnam/demo-nha-may.jpg",
          width: 1920,
          height: 1072,
          title: "Mô hình nhà máy, phát hiện lỗi, chất lượng lắp ráp và hậu mãi",
          caption: "Mô hình nhà máy theo công đoạn · cảnh báo lỗi kèm nguyên nhân chính và cách xử lý lần trước · chất lượng lắp ráp theo súng siết và VIN · hậu mãi theo đội xe",
        },
      },
      {
        kind: "video",
        video: {
          src: "/decks/isuzu-vietnam/demo-hoi-minder.mp4",
          poster: "/decks/isuzu-vietnam/demo-hoi-minder.jpg",
          width: 1920,
          height: 1076,
          title: "Hỏi đáp với Trợ lý Minder AI",
          caption: "Một câu hỏi bằng tiếng Việt → Minder truy vấn dữ liệu nhà máy, dựng biểu đồ công suất và viết kết luận cho Ban Giám đốc",
        },
      },
    ],
  },
  {
    id: "hop-tac",
    act: 3,
    theme: "light",
    eyebrow: "Hình thức hợp tác",
    title: "Isuzu mua một năng lực, không mua một phần mềm lẻ; càng tự chủ, chi phí triển khai càng giảm",
    blocks: [
      { kind: "h3", text: "Mức tham gia" },
      { kind: "module", id: "M13", variant: "founding" },
      { kind: "h3", text: "Ba thành phần của gói" },
      { kind: "module", id: "M14", variant: "package" },
      {
        kind: "list",
        items: [
          "**Pilot:** phí cố định, phạm vi rõ ràng, thống nhất sau khảo sát công đoạn BODY. Không đạt Cổng 2 thì không chuyển sang giai đoạn có phí tiếp theo.",
          "**Sau pilot:** định giá theo giá trị Tài chính đã xác minh. Mỗi công đoạn, dòng xe hay phạm vi ngoài nhà máy được định giá riêng.",
          "**Không đề xuất:** độc quyền · góp vốn hay chia doanh thu · chuyển dữ liệu ra khỏi Việt Nam.",
        ],
      },
      { kind: "h3", text: "Isuzu luôn giữ quyền kiểm soát: bảy cam kết không thay đổi" },
      { kind: "module", id: "M13", variant: "commitments" },
      { kind: "h3", text: "Sở hữu trí tuệ" },
      {
        kind: "cards",
        cols: 3,
        tone: "orange",
        head: ["Tài sản", "Chủ sở hữu", "Quyền của Isuzu"],
        rows: [
          ["Dữ liệu, bản vẽ, hồ sơ sản xuất, lý lịch số", "Isuzu", "Toàn quyền"],
          ["Mô hình riêng và các kết quả về hoạt động của Isuzu", "Isuzu", "Sở hữu; Celesnity chỉ dùng để vận hành dịch vụ"],
          ["Mô hình nền, mã huấn luyện, bộ công cụ đánh giá", "Celesnity", "Giấy phép nội bộ vĩnh viễn, miễn phí bản quyền theo mức tham gia"],
        ],
      },
      { kind: "h3", text: "Pháp lý" },
      {
        kind: "list",
        items: [
          "**Văn bản áp dụng:** Luật Trí tuệ nhân tạo 134/2025/QH15 (hiệu lực 1/3/2026) · Nghị định 142/2026/NĐ-CP · Quyết định 33/2026/QĐ-TTg (hiệu lực 15/8/2026) · Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 và Nghị định 356/2025/NĐ-CP (hiệu lực 1/1/2026).",
          "**Phân loại rủi ro:** Celesnity lập hồ sơ phân loại rủi ro cho từng chức năng và thông báo Bộ KH&CN khi bắt buộc; Isuzu nhận hồ sơ với vai trò bên triển khai. Không gán trước mức rủi ro.",
          "**An ninh:** theo kiến trúc nhà máy đã duyệt và mô hình phân vùng IEC 62443; bắt đầu ở chế độ chỉ đọc; ghi nhật ký mọi lần gọi mô hình. Mọi kết nối với hệ thống hay tiêu chuẩn của Isuzu Motors (Nhật Bản) theo quy định của Isuzu.",
          "**An toàn phương tiện:** tuân thủ an toàn phương tiện và đăng kiểm là một lớp riêng; báo cáo AI không thay thế được.",
        ],
      },
      { kind: "h3", text: "Quản trị" },
      {
        kind: "cards",
        cols: 3,
        rows: [
          [
            "Ban chỉ đạo chung",
            "Lãnh đạo phụ trách sản xuất của Isuzu chủ trì, cùng trưởng IM Promotion, CEO và CTO Celesnity. Họp hằng quý và tại mỗi cổng.",
          ],
          ["Hội đồng dữ liệu", "Họp hằng tháng."],
          ["Nhóm làm việc chung", "Họp hằng tuần, tại Gò Vấp."],
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
              "Dữ liệu thô lưu tại Việt Nam. **Bản vẽ, thông số kỹ thuật, tài liệu CKD và tiêu chuẩn của Isuzu Motors không bao giờ rời Isuzu.**",
              "Isuzu duyệt mục đích, người truy cập, thời hạn lưu và mọi phần được chia sẻ.",
              "Thông tin người thao tác chỉ dùng để phân tích quy trình. **Không bao giờ** dùng để xếp hạng hay kỷ luật cá nhân.",
              "Mô hình chỉ tìm, dự báo và so sánh. **QA phê duyệt mọi quyết định chất lượng**; mô hình không điều khiển thiết bị.",
              "Dữ liệu Isuzu không được dùng cho mô hình của đối thủ trực tiếp.",
              "Mã nguồn và mô hình riêng được lưu ký tại bên thứ ba. Khi chấm dứt hợp tác, Isuzu giữ mô hình và giấy phép.",
              "Mọi công bố cần Isuzu đồng ý bằng văn bản (xem trước ít nhất 30 ngày).",
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
                "**Điều gì rời môi trường Isuzu**",
                "Không có gì",
                "Chỉ bản cập nhật mô hình đã qua kiểm thử bảo mật",
                "Bản cập nhật, cộng tập dữ liệu kiểm chứng đã khử nhận diện, duyệt từng bản ghi",
              ],
              ["**Quyền dùng mô hình nền**", "Phiên bản tại thời điểm ký", "Mọi phiên bản trong thời gian đóng góp", "Như Mức 2, cộng **3 năm** sau khi ngừng đóng góp"],
              ["**Tiếp cận tính năng mới**", "—", "—", "Sớm **6 tháng**"],
              ["**Ban chỉ đạo**", "—", "Thành viên", "**Chủ trì**"],
              ["**Phí sử dụng sau chương trình**", "Giá tiêu chuẩn", "Giá ưu đãi", "Giá ưu đãi, **cố định 3 năm**"],
            ],
          },
          {
            kind: "p",
            text: "**Khuyến nghị:** pilot chạy ở **Mức 1**, không có gì rời môi trường Isuzu. Isuzu chọn mức chính thức sau khi đã xem kết quả Cổng 2.",
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
              ["**① Mô hình AI Thế giới thực**", "Bản riêng của Isuzu Việt Nam, chạy tại Việt Nam; nhận các phiên bản mô hình nền mới"],
              ["**② Tác nhân AI và ứng dụng**", "Hồ sơ lỗi tự động · Tác nhân Chất lượng · Tác nhân Truy xuất · bản tóm tắt Asakai · bảng chỉ tiêu"],
              [
                "**③ Triển khai và chuyển giao (FDE)**",
                "Cấu hình theo quy trình Isuzu · tích hợp hệ thống hiện có · **đào tạo đội IT tới khi tự vận hành và tự huấn luyện**",
              ],
            ],
          },
          {
            kind: "table",
            head: ["Cơ cấu chi phí", "Triển khai và chuyển giao", "Mô hình + Ứng dụng"],
            rows: [
              ["**Năm 1**", "Phần lớn", "Phần nhỏ"],
              ["**Năm 2+**", "Phần nhỏ", "Phần lớn"],
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
    title: "Một quan hệ đối tác minh bạch, và Isuzu không có gì để mất",
    blocks: [
      { kind: "module", id: "M14", variant: "benefits" },
      { kind: "h3", text: "Kể cả khi pilot không đạt, Isuzu vẫn giữ" },
      {
        kind: "list",
        items: [
          "Dữ liệu lỗi đã được làm sạch và nối theo VIN, trạm, lô",
          "Quy trình hồ sơ lỗi tự động (UC0) đang chạy",
          "Bộ đề thi kín, dùng được để đánh giá bất kỳ giải pháp AI nào khác",
          "Đội IT đã được đào tạo về vận hành dữ liệu và mô hình",
        ],
      },
    ],
    details: [
      {
        title: "Bảng lợi ích hai bên",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Isuzu Việt Nam**", "**Celesnity**"],
            rows: [
              [
                "**Nhận**",
                "Giá trị đo được trên từng xe · mô hình riêng chạy tại Việt Nam · lý lịch số cho mọi VIN · **đội IT tự vận hành và huấn luyện** · con đường ra đại lý và hậu mãi",
                "Mô hình được kiểm chứng trong ngành ô tô Việt Nam · đối tác tham chiếu đầu tiên của ngành · bộ đề thi làm chung · doanh thu",
              ],
              [
                "**Góp**",
                "Dữ liệu (theo mức Isuzu chọn) · chuyên gia QA và Kỹ thuật sản xuất · hạ tầng tính toán tại Việt Nam · đội IT 2→3 người",
                "Mô hình nền · nền tảng Minder · đội FDE 5→3 người · chi phí nghiên cứu mô hình nền",
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
    title: "Kính gửi Ban Tổng Giám đốc Công ty TNHH Ô tô Isuzu Việt Nam",
    blocks: [
      { kind: "p", text: "Trước hết, Celesnity xin trân trọng cảm ơn Quý vị đã dành thời gian cho đề xuất này." },
      {
        kind: "p",
        text: "Celesnity trân trọng đề xuất Isuzu Việt Nam trở thành **đối tác sáng lập ngành ô tô** của chương trình **Nhà máy siêu thông minh**. Chương trình xây một mô hình AI hiểu cách nhà máy Gò Vấp vận hành. Mô hình nhớ lịch sử sản xuất của từng chiếc xe và chạy tại Việt Nam, dưới quyền Isuzu.",
      },
      {
        kind: "kv",
        rows: [
          [
            "**Tầm nhìn**",
            "Mỗi lỗi được phát hiện ở Gò Vấp trở thành bài học của mọi chiếc xe sau đó. Nhà máy **tự học** từ mỗi lỗi và hành động khắc phục, **dự báo trước** lỗi sắp lặp lại, và **nhân rộng** bài học sang mọi công đoạn, dòng xe và nhà cung cấp",
          ],
          ["**Bước đầu tiên**", "Pilot **16 tuần** tại công đoạn BODY, nơi lỗi được phát hiện sớm nhất và vòng phản hồi ngắn nhất"],
          [
            "**Sau 12 tháng**",
            "6 use case chạy thật · đủ 5 công đoạn · lý lịch số cho mọi VIN mới · **đội IT Isuzu tự vận hành mô hình** · sẵn sàng kết nối hậu mãi",
          ],
          [
            "**Cách chứng minh**",
            "**QA Isuzu giữ bộ đề thi kín.** Mô hình phải thi đạt trên lịch sử lỗi của chính Isuzu trước khi được dùng",
          ],
        ],
      },
      { kind: "p", text: "**Kính đề nghị Ban Tổng Giám đốc**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất chủ trương:** chất lượng tại công đoạn BODY là điểm khởi đầu; toàn nhà máy Gò Vấp là bước nhân rộng; chiếc xe trên đường là đích đến.",
          "**Cử nhân sự:** lãnh đạo phụ trách · đầu mối QA · đầu mối Kỹ thuật sản xuất · đầu mối IM Promotion · đầu mối dữ liệu · đầu mối Tài chính · **2 kỹ sư IT cho đội vận hành mô hình**.",
          "**Cho phép khảo sát công đoạn BODY** để chốt dòng xe, bài toán, số nền và phí pilot.",
        ],
      },
      {
        kind: "table",
        head: ["Thời gian", "Việc"],
        rows: [
          ["Tháng 10/2026", "Làm việc với Ban Tổng Giám đốc, QA và IM Promotion; thống nhất NDA, thỏa thuận xử lý dữ liệu"],
          ["Tháng 11/2026", "Khảo sát công đoạn BODY → chốt phạm vi và phí pilot"],
          ["T1", "Pilot bắt đầu khi dữ liệu và môi trường được duyệt"],
          ["T4", "Cổng 2: kết quả thi trước Ban chỉ đạo"],
          ["T8", "Cổng 3: mở khảo sát đại lý và hậu mãi"],
          ["T12", "**Đội IT Isuzu tự vận hành; đủ 5 công đoạn; kế hoạch pilot hậu mãi**"],
        ],
      },
      {
        kind: "p",
        text: "Isuzu Việt Nam đã xây chất lượng từng bậc. Celesnity mong được cùng Isuzu Việt Nam xây bậc tiếp theo: một mô hình nhớ mọi chiếc xe.",
      },
      { kind: "signature", lines: ["Trân trọng,", "**Celesnity**, đơn vị phát triển nền tảng Minder"] },
    ],
  },
];

/** Không có section tạm cất */
export const parkedSections: Section[] = [];

/** Đoạn kết (chỉ dùng ở bản in) */
export const closing: Closing = {
  headline: "Isuzu Việt Nam đã xây chất lượng từng bậc. Bậc tiếp theo: một mô hình nhớ mọi chiếc xe.",
  lead: "Một ngày không xa:",
  story:
    "Một chiếc QKR vào trung tâm dịch vụ Củ Chi. Kỹ thuật viên mở lý lịch số của xe: lô linh kiện, trạm lắp, kết quả QC ngày xuất xưởng, các lần bảo dưỡng. Dấu hiệu anh đang tìm đã được xử lý tại BODY-08 từ hai năm trước, và chưa xuất hiện lại trên chiếc xe nào sản xuất sau đó.",
  tagline: "NHÀ MÁY SIÊU THÔNG MINH: Tự học · Dự báo trước · Nhân rộng.",
  owner: "Từ \"không bỏ sót lỗi\" đến \"không thể tạo ra lỗi\".",
  thanks: "Celesnity mong được cùng Isuzu Việt Nam xây dựng nó.",
  pdf: "Tải bản PDF",
  ask: "Hỏi trợ lý",
};

/** Lợi ích hai bên (M14 variant "benefits") */
export const benefits: { partner: BenefitSide; celesnity: BenefitSide } = {
  partner: {
    name: "Isuzu Việt Nam",
    receive: [
      "Giá trị đo được trên từng xe",
      "Mô hình riêng chạy tại Việt Nam",
      "Lý lịch số cho mọi VIN",
      "**Đội IT tự vận hành và huấn luyện**",
      "Con đường ra đại lý và hậu mãi",
    ],
    give: [
      "Dữ liệu (theo mức Isuzu chọn)",
      "Chuyên gia QA và Kỹ thuật sản xuất",
      "Hạ tầng tính toán tại Việt Nam",
      "Đội IT 2→3 người",
    ],
  },
  celesnity: {
    name: "Celesnity",
    receive: [
      "Mô hình được kiểm chứng trong ngành ô tô Việt Nam",
      "Đối tác tham chiếu đầu tiên của ngành",
      "Bộ đề thi làm chung",
      "Doanh thu",
    ],
    give: ["Mô hình nền", "Nền tảng Minder", "Đội FDE 5→3 người", "Chi phí nghiên cứu mô hình nền"],
  },
};

/** Gói hợp tác (M14 variant "package") */
export const packageParts: PackagePart[] = [
  {
    n: "①",
    name: "Mô hình AI Thế giới thực",
    body: "Bản riêng của Isuzu Việt Nam, chạy tại Việt Nam; nhận các phiên bản mô hình nền mới",
  },
  {
    n: "②",
    name: "Tác nhân AI và ứng dụng",
    body: "Hồ sơ lỗi tự động · Tác nhân Chất lượng · Tác nhân Truy xuất · bản tóm tắt Asakai · bảng chỉ tiêu",
  },
  {
    n: "③",
    name: "Triển khai và chuyển giao (FDE)",
    body: "Cấu hình theo quy trình Isuzu · tích hợp hệ thống hiện có · **đào tạo đội IT tới khi tự vận hành và tự huấn luyện**",
  },
];

export const costShift: CostShiftRow[] = [
  { year: "Năm 1", deploy: 0.7, model: 0.3, deployLabel: "Phần lớn", modelLabel: "Phần nhỏ" },
  { year: "Năm 2+", deploy: 0.25, model: 0.75, deployLabel: "Phần nhỏ", modelLabel: "Phần lớn" },
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
          "**Ghi lại:** mọi lỗi tại nhà máy thành chuỗi \"bối cảnh → nguyên nhân → khắc phục → kết quả\", gắn với VIN.",
          "**Học:** mô hình học quy luật \"khi đồ gá, lô hay ca ở trạng thái Y thì lỗi Z thường xuất hiện\".",
          "**Dự báo kèm mức độ chắc chắn:** mô hình nói \"không biết\" khi gặp dòng xe, nhà cung cấp hay linh kiện chưa từng thấy.",
          "**Phân biệt nguyên nhân với trùng hợp:** nhiều yếu tố thường đi cùng nhau (ví dụ một lô linh kiện chỉ dùng ở ca đêm). Mô hình tách tác động của từng yếu tố bằng phương pháp thống kê. Khi dữ liệu không đủ để phân biệt, mô hình nói rõ.",
          "**Kiểm tra quy tắc:** một lớp riêng đảm bảo đề xuất không trái tiêu chuẩn thao tác, thông số kỹ thuật hay quy định của Isuzu Motors.",
          "**Không thử nghiệm trên dây chuyền:** mô hình chỉ học từ dữ liệu đã ghi lại và các thử nghiệm đã được duyệt.",
        ],
      },
      {
        kind: "p",
        text: "*Chi tiết kỹ thuật cho đội IT: lõi mô hình học trong không gian biểu diễn (hướng JEPA) · độ chắc chắn được hiệu chuẩn bằng phương pháp conformal · ước lượng tác động bằng propensity và doubly robust · huấn luyện và kiểm tra tách theo thời gian · kiến trúc phân lớp: kho dữ liệu sự kiện, bộ mã hóa, lõi mô hình, lớp kiểm tra quy tắc, lớp phục vụ có phân quyền, vòng học.*",
      },
    ],
  },
  {
    id: "bon-buoc",
    title: "Bốn bước trước khi kỹ sư được dùng kết quả của mô hình",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thi trên lịch sử:** mô hình chỉ thấy thông tin có tại thời điểm của mỗi lỗi cũ.",
          "**Chuyên gia chấm:** QA và Kỹ thuật sản xuất chấm mẫu, kể cả những ca mô hình sai.",
          "**Chạy thử song song:** mô hình chạy trên ca thật nhưng không ai thấy kết quả khi quyết định; kết quả được so sánh sau.",
          "**Tư vấn:** kỹ sư thấy kết quả kèm bằng chứng và quyết định như trước. Mọi lần không theo đề xuất đều được ghi lý do.",
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
          ["Dữ liệu chưa nối được tới VIN hoặc lô", "Cổng 1 kiểm tra trước; bắt đầu theo lô khi chưa có theo VIN"],
          ["Mô hình không hơn cách làm hiện tại", "Cổng 2 với bộ đề kín; không đạt thì dừng, không chuyển sang giai đoạn có phí"],
          ["Mô hình nhầm trùng hợp thành nguyên nhân", "Thi trên các lỗi cũ; QA chấm; chỉ dùng ở chế độ tư vấn"],
          [
            "Kinh nghiệm ở BODY không áp dụng được cho công đoạn khác",
            "Mỗi công đoạn có bộ đề riêng; mang sang là nền tảng, phương pháp và đội ngũ, không mặc định mang sang độ chính xác",
          ],
          ["Lộ tài liệu kỹ thuật", "Tài liệu không rời Isuzu; kiểm thử chống khôi phục dữ liệu trước mọi lần đóng góp"],
          ["Phụ thuộc vào Celesnity", "Đội IT tự vận hành từ T8, tự huấn luyện từ T12; mã nguồn và mô hình được lưu ký"],
          ["Người thao tác lo bị giám sát", "Tham vấn trước; khử nhận diện; không dùng để đánh giá cá nhân"],
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
        text: "Isuzu Việt Nam: hồ sơ công ty (isuzu-vietnam.com/company-profile) · \"Isuzu Monozukuri: Bridging Manufacturing and Human Resource Development at Isuzu Vietnam\" (isuzu-vietnam.com) · \"30 năm Isuzu tại Việt Nam: Từ lắp ráp xe đến cung cấp giải pháp vận tải\" (Autopro, 27/10/2025). Ảnh: Isuzu Việt Nam.",
      },
      {
        kind: "note",
        text: "Công bố của doanh nghiệp xác lập năng lực được báo cáo, không phải kiểm toán độc lập. Các tình huống, mã VIN, lô, nhà cung cấp và số xe trong ví dụ chỉ là minh họa.",
      },
    ],
  },
];
