/**
 * Nguồn câu chữ duy nhất của deck Siam Cement Group (/scg-vi), chuyển từ docs/scg-content-v1.md.
 * Không viết cứng câu chữ trong component; sửa ở đây rồi chạy `npm run content:check -- --deck=scg-vi`.
 * Quy tắc: không nêu tên hay trích lời cá nhân phía Siam Cement Group; không nói điểm yếu của Siam Cement Group; kịch bản là minh họa.
 */
import type { Act, AppendixSection, Section } from "../../types";
import { PILOT, PILOT_SHORT, THAI, VN_NEXT } from "./places";
import { appCount, useCases } from "./usecases";

export const meta = {
  title: "Nhà máy siêu thông minh · Siam Cement Group × Celesnity",
  description: "Đề xuất hợp tác: Mô hình AI Thế giới thực và nền tảng Minder cho mạng lưới nhà máy Siam Cement Group. Tháng 10/2026.",
  tagline: "Tự học · Dự báo trước · Nhân rộng",
  footer: "NHÀ MÁY SIÊU THÔNG MINH · Siam Cement Group × Celesnity · Tháng 10/2026",
};

export const acts: Act[] = [
  { n: 1, label: "I.", title: "Một kỷ nguyên mới" },
  { n: 2, label: "II.", title: "Nhà máy siêu thông minh cho Siam Cement Group" },
  { n: 3, label: "III.", title: "Lộ trình từ một dây chuyền đến mạng lưới Siam Cement Group" },
];

export const labels = {
  sim: "Mô phỏng minh họa — mô hình thật được huấn luyện trong thử nghiệm",
  simShort: "Mô phỏng minh họa",
  ai: "AI thật",
  future: "Hình dung tương lai",
  proposal: "Hướng đề xuất",
  calculatorPrivacy: "Nhập số của Quý vị. Tính toán chạy ngay trên trình duyệt, không lưu, không gửi đi.",
  chatNotice: "Trợ lý chỉ trả lời về đề xuất này. Câu hỏi được xử lý bởi dịch vụ AI quốc tế; vui lòng không nhập dữ liệu nội bộ.",
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
    cover: "/decks/scg-vietnam/cover-nha-may-dem.jpg",
    coverPosition: "60% 50%",
    eyebrow: "Siam Cement Group × Celesnity",
    title: "NHÀ MÁY\nSIÊU THÔNG MINH",
    blocks: [
      { kind: "lead", text: "Từ một dây chuyền lò nung đến một mạng lưới nhà máy Siam Cement Group" },
      {
        kind: "p",
        text: "**Mô hình AI Thế giới thực học cách nhà máy Siam Cement Group thực sự vận hành, dự báo mỗi quyết định sẽ thay đổi điều gì, và qua nền tảng Minder gửi lệnh đã được duyệt trở lại máy móc.**",
      },
      { kind: "note", text: "Đề xuất hợp tác, thử nghiệm và lộ trình 22 tháng · Tháng 10/2026" },
      { kind: "note", text: "Gửi Ban Lãnh đạo Siam Cement Group" },
      { kind: "note", text: "**Chịu trách nhiệm:** Nguyễn Duy Tân & Nguyễn Công Nam Anh, Giám đốc Celesnity" },
    ],
  },
  {
    id: "thu-ngo",
    act: 0,
    theme: "light",
    eyebrow: "Thư ngỏ",
    title: "Kính gửi Ban Lãnh đạo Siam Cement Group",
    blocks: [
      { kind: "p", text: "Trước hết, Celesnity xin trân trọng cảm ơn Quý vị đã dành thời gian cho đề xuất này." },
      {
        kind: "p",
        text: "Hơn một thế kỷ qua, Siam Cement Group lớn mạnh bằng cách **đi trước**: từ nhà máy xi măng đầu tiên của Thái Lan đến mạng lưới vật liệu xây dựng, hóa chất và bao bì khắp ASEAN. Tại Việt Nam, Siam Cement Group đã đầu tư **hơn 7 tỷ USD qua 28 công ty** kể từ năm 1992, và đặt Việt Nam làm **trung tâm vận hành chiến lược**, nơi năng lực số, AI và tự động hóa được chia sẻ với Thái Lan. Mục tiêu **Net Zero 2050**, và mục tiêu giảm 23% phát thải CO₂ của xi măng miền Trung đến năm 2030, đặt ra đúng bài toán mà thế hệ AI tiếp theo có thể giải: giữ lò ổn định trong khi tăng nhiên liệu thay thế và giảm nhiệt tiêu hao.",
      },
      {
        kind: "p",
        text: "Thế hệ AI tiếp theo đang chuyển từ đọc hiểu ngôn ngữ sang **thấu hiểu và tương tác với thế giới vật lý**. Với một nhà máy xi măng, điều đó có nghĩa là một mô hình hiểu lò nung phản ứng thế nào với từng thay đổi về liệu, nhiên liệu và điểm đặt, dự báo trước hệ quả, và gửi điều chỉnh đã được duyệt trở lại máy. Chúng tôi gọi đó là **Mô hình AI Thế giới thực** (từ nay gọi là **Mô hình**). Con người, máy móc và Mô hình làm việc cùng nhau trên **Minder**, nền tảng do Celesnity phát triển.",
      },
      {
        kind: "p",
        text: "Vì vậy, Celesnity trân trọng đề xuất Siam Cement Group trở thành **Đối tác công nghiệp sáng lập** của chương trình **Nhà máy siêu thông minh** cho ngành vật liệu xây dựng. Mô hình chạy trong môi trường riêng của Siam Cement Group tại từng nhà máy, trên dữ liệu của Siam Cement Group, và Siam Cement Group **làm chủ công nghệ vận hành tại từng nhà máy**.",
      },
      {
        kind: "p",
        text: `**Cách làm**\nBắt đầu nhỏ và chắc: **một dây chuyền lò nung tại ${PILOT}** trong 4 tháng thử nghiệm. Đạt cổng thì mở ra toàn nhà máy, rồi sang các nhà máy Siam Cement Group tiếp theo, trong đó có một nhà máy tại Thái Lan. Tổng cộng **22 tháng**.`,
      },
      {
        kind: "p",
        text: `**Kết quả dự kiến sau 22 tháng**\n${appCount} ứng dụng trên nền tảng Minder chạy từ những tháng đầu, từ mỏ đá đến cảng; Dự báo và Hành động có phê duyệt mở ra trên toàn nhà máy thử nghiệm; mô hình đã nhân rộng trên các nhà máy Siam Cement Group; Siam Cement Group **làm chủ công nghệ vận hành mới tại từng nhà máy**.`,
      },
      {
        kind: "p",
        text: "**Cam kết**\nDữ liệu thô ở lại môi trường riêng của Siam Cement Group tại từng nhà máy. Mô hình dự báo và đề xuất; **mọi lệnh gửi xuống máy đều có người có thẩm quyền phê duyệt**, trong giới hạn do kỹ sư Siam Cement Group đặt; hệ thống an toàn và interlock giữ nguyên. Sau thử nghiệm, phí của Celesnity đi theo giá trị mà Tài chính Siam Cement Group xác nhận.",
      },
      { kind: "p", text: "**Kính đề nghị Ban Lãnh đạo**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất chủ trương:** Siam Cement Group là Đối tác công nghiệp sáng lập; một dây chuyền lò nung là điểm khởi đầu, mạng lưới nhà máy Siam Cement Group là đích đến của giai đoạn đầu.",
          "**Cử đầu mối:** lãnh đạo phụ trách cấp Tập đoàn, đầu mối tại các nhà máy, đầu mối dữ liệu, đầu mối Công nghệ lò và Chất lượng, cùng trưởng ca và kỹ sư vận hành tại nhà máy thử nghiệm.",
          `**Cho phép khảo sát ${PILOT_SHORT}** để chốt dây chuyền, bài toán, số liệu nền và phí thử nghiệm.`,
        ],
      },
      {
        kind: "p",
        text: "Chúng tôi tin rằng một Nhà máy siêu thông minh do Siam Cement Group làm chủ, được kiểm chứng tại một nhà máy và chia sẻ trên toàn Tập đoàn, có thể trở thành chuẩn mực mới cho ngành vật liệu xây dựng trong khu vực. Celesnity mong được đồng hành cùng Siam Cement Group trên chặng đường đó.",
      },
      { kind: "signature", lines: ["Trân trọng,", "**Celesnity**, đơn vị phát triển nền tảng Minder và Mô hình AI Thế giới thực"] },
    ],
  },

  // ───────────────────────────── HỒI 1 ─────────────────────────────
  {
    id: "scg",
    act: 1,
    theme: "mist",
    eyebrow: "Siam Cement Group hôm nay",
    title: "Siam Cement Group lớn mạnh nhờ đi trước, và Việt Nam là trung tâm vận hành chiến lược của Siam Cement Group",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "Hơn 7 tỷ USD", label: "Đầu tư tại Việt Nam", note: "28 công ty, từ năm 1992" },
          { value: "~1,7 tỷ USD", label: "Doanh thu tại Việt Nam năm 2025", note: "khoảng 11% doanh thu Tập đoàn" },
          { value: "~3 triệu tấn", label: "Clinker mỗi năm tại Việt Nam", note: "và khoảng 4 triệu tấn xi măng" },
          { value: "2050", label: "Mục tiêu Net Zero", note: "ESG 4 Plus · Inclusive Green Growth" },
        ],
      },
      {
        kind: "list",
        items: [
          "**Xi măng xanh:** xi măng và clinker carbon thấp của Siam Cement Group Việt Nam được xuất khẩu sang châu Mỹ, châu Âu, châu Phi, châu Đại Dương và châu Á; các lò dùng nhiên liệu thay thế (sinh khối, RDF) và thu hồi nhiệt thải.",
          "**Xi măng Sông Gianh tròn 20 năm:** đồng xử lý 140–200 nghìn tấn chất thải mỗi năm làm nhiên liệu và nguyên liệu thay thế; đã giảm khoảng 9% CO₂ đến năm 2025, hướng tới giảm 23% vào năm 2030 so với năm 2020; đầu tư hệ thống xuất hàng tự động năm 2026.",
          "**Vận hành tối ưu theo khu vực:** Việt Nam là cơ sở sản xuất và xuất khẩu chi phí thấp của Siam Cement Group, cùng Thái Lan chia sẻ năng lực số, AI, tự động hóa và quản lý nhà máy.",
          "**Siam Cement Group đã đi trước về AI:** mô hình nền CiMie AI cho ngành xi măng, hợp tác AI điều khiển quá trình năm 2026, AI trong sản xuất bao bì, và định hướng trở thành doanh nghiệp vận hành bằng AI.",
        ],
      },
      {
        kind: "quote",
        emphasis: true,
        compact: true,
        text: "Mắt xích tiếp theo: một **Mô hình AI Thế giới thực học từ chính lò nung Siam Cement Group tại Việt Nam**, gửi điều chỉnh đã được duyệt trở lại máy, và mang kinh nghiệm đó ra toàn Tập đoàn.",
      },
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
        highlight: "Thứ làm nên khác biệt là **kinh nghiệm vận hành thực tế** của từng lò nung, từng máy nghiền, từng ca.",
        conclusion: "Siam Cement Group có hơn một thế kỷ kinh nghiệm vận hành nhà máy xi măng. Mô hình AI Thế giới thực biến kinh nghiệm đó thành tài sản số mà Siam Cement Group làm chủ.",
      },
    ],
    details: [
      {
        title: "Bảng ba làn sóng",
        key: "waves",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Làn sóng", "AI làm được gì", "Người nắm lợi thế?"],
            rows: [
              ["**Tự động hóa** (hệ thống điều khiển, PLC, vòng điều khiển)", "Giữ một điểm đặt đã lập trình", "Người có máy móc"],
              ["**AI ngôn ngữ** lớn (ChatGPT, trợ lý ảo)", "Đọc, viết, trả lời câu hỏi", "Người có mô hình ngôn ngữ; nay đang phổ biến và rẻ dần"],
              [
                "**Mô hình AI Thế giới thực** *(World Model)*",
                "**Hiểu một hệ thống vật lý phản ứng thế nào với quyết định, dự báo trước, và hành động khi được duyệt**",
                "**Người có dữ liệu quyết định vận hành thật**",
              ],
            ],
          },
          { kind: "p", text: "**Thứ tự:** Tự động hóa (những năm 2000) → AI ngôn ngữ lớn (năm 2022) → Mô hình AI Thế giới thực (năm 2027)." },
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
            "Mỗi thay đổi điểm đặt, mỗi mẫu phòng thí nghiệm, mỗi lần dừng lò tự trở thành dữ liệu; **thông minh hơn sau mỗi ca**",
            "Dự báo vôi tự do tháng sau chính xác hơn tháng trước, và kỹ sư thấy được vì sao",
          ],
          [
            "**2. Dự báo trước**",
            "Dự báo hệ quả của một quyết định **trước khi** thực hiện, kèm mức độ chắc chắn",
            "Giảm nhiên liệu hay phối hợp cấp liệu và nhiên liệu: cách nào giảm nhiệt tiêu hao mà vẫn giữ chất lượng?",
          ],
          [
            "**3. Nhân rộng**",
            "**Kinh nghiệm của một dây chuyền đi sang dây chuyền, nhà máy và quốc gia khác**, không phụ thuộc vào một người hay một nơi",
            "Từ lò nung sang nghiền xi măng, rồi sang các nhà máy Siam Cement Group tiếp theo",
          ],
        ],
      },
    ],
  },
  {
    id: "minder",
    act: 2,
    theme: "light",
    layout: "wide",
    eyebrow: "Minder và Mô hình AI Thế giới thực",
    title: "Minder là nơi quản lý toàn bộ nhà máy, vận hành bởi một Mô hình AI Thế giới thực thấu hiểu nhà máy của Siam Cement Group",
    blocks: [
      {
        kind: "cards",
        cols: 3,
        rows: [
          ["**Minder · giao diện**", "Nơi con người, máy móc, hệ thống và robot của nhà máy kết nối với nhau, qua giọng nói, màn hình và cảm biến."],
          ["**Mô hình AI Thế giới thực · bộ não**", "Dự báo sản lượng, chất lượng, năng lượng và độ ổn định của nhà máy thay đổi thế nào sau mỗi quyết định, và học từ nhiều nhà máy."],
          ["**Kết hợp**", "Mô hình là bộ não. Minder là nơi đội ngũ Siam Cement Group nhìn thấy, đặt câu hỏi và hành động cùng nó."],
        ],
      },
      { kind: "h3", text: "Minder có mặt ở mọi nơi công việc trong nhà máy diễn ra" },
      {
        kind: "cards",
        cols: 4,
        tone: "blue",
        rows: [
          ["**1 · Qua con người**", "Điện thoại, máy tính bảng: giao ca, báo sự cố, duyệt ngay tại chỗ."],
          ["**2 · Qua máy móc**", "Đọc tín hiệu hệ thống điều khiển, cảm biến; ghi điểm đặt đã duyệt trở lại máy."],
          ["**3 · Qua phần mềm**", "Theo dõi thời gian thực, tự cảnh báo, nối với hệ thống sẵn có."],
          ["**4 · Qua robot**", "Đảm nhận việc lặp lại, nặng hoặc nguy hiểm khi hiệu quả đầu tư phù hợp."],
        ],
      },
      {
        kind: "quote",
        emphasis: true,
        text: "**Minder:** con người, công việc, vật tư, máy móc và kết quả trong một bản ghi duy nhất.\n**Mô hình AI Thế giới thực:** mỗi dữ liệu ghi nhận giúp mô hình hiểu nhà máy Siam Cement Group sâu hơn.",
        lines: true,
      },
      { kind: "h3", text: "Năm năng lực, triển khai theo từng bước" },
      {
        kind: "progress",
        now: "Hôm nay · 10/2026",
        items: [
          { label: "Quan sát", text: "Bức tranh trực tiếp của toàn nhà máy.", status: "done", when: "Đang chạy" },
          { label: "Ghi nhớ", text: "Mọi quyết định, cách xử lý và kết quả đều được lưu lại, kể cả khi người giỏi nhất vắng mặt.", status: "done", when: "Đang chạy" },
          { label: "Dự báo", text: "Mỗi lựa chọn sẽ thay đổi điều gì, kèm mức độ chắc chắn.", status: "active", when: "Thử nghiệm từ 11/2026" },
          { label: "Hành động", text: "Minder gửi lệnh đã được duyệt xuống máy. Con người phê duyệt.", status: "next", when: "2027" },
          { label: "Tự vận hành", text: "Dây chuyền tự vận hành trong giới hạn được duyệt, cùng robot.", status: "future", when: "Tầm nhìn" },
        ],
      },
      {
        kind: "p",
        wide: true,
        text: "Minder thay thế hàng chục phần mềm riêng lẻ và gom chúng thành **một mô hình chung của nhà máy** gồm lập kế hoạch, sản xuất, kiểm tra, giám sát, bảo trì, vận chuyển, bảo vệ và tối ưu, để AI hiểu và ghi nhớ toàn bộ nhà máy. Minder cũng làm việc cùng các lớp điều khiển nâng cao và các mô hình AI Siam Cement Group đang có.",
      },
    ],
  },
  {
    id: "ba-lop",
    act: 2,
    theme: "light",
    eyebrow: "Cách Nhà máy siêu thông minh vận hành",
    title: "Mô hình AI Thế giới thực dự báo và đề xuất; con người, máy móc, phần mềm và robot thực hiện; Minder ghi lại; người có thẩm quyền phê duyệt",
    blocks: [
      { kind: "module", id: "M7" },
      { kind: "p", wide: true, text: "**Vòng lặp cải thiện:** quyết định đã duyệt, lệnh đã gửi xuống máy và kết quả thực tế quay lại lớp ①, mô hình học tiếp." },
      {
        kind: "p",
        wide: true,
        text: "**Điều chỉ Mô hình AI Thế giới thực làm được:** hệ thống điều khiển và cảm biến ghi lại điều đã xảy ra. Minder ghi thêm **ai quyết định gì, vì sao, và điều gì xảy ra sau đó**. Học từ hàng nghìn chuỗi \"điểm đặt → phản ứng của lò → chất lượng clinker\", mô hình hiểu được **hệ quả**, như một kỹ sư lò giàu kinh nghiệm, nhưng không bao giờ nghỉ ca.",
      },
      { kind: "p", text: "**Mô hình AI Thế giới thực không phải là:**" },
      {
        kind: "chips",
        tone: "negative",
        items: [
          "Chatbot",
          "Phần mềm ERP",
          "Mô hình tạo video",
          "Thay thế hệ thống điều khiển hay hệ thống an toàn",
          "Tự đổi điểm đặt mà không ai duyệt",
          "Thay thế mô phỏng công nghệ (mô phỏng nhiệt, cháy, dòng khí vẫn do kỹ sư thực hiện, và kết quả là đầu vào cho mô hình)",
        ],
      },
    ],
    details: [
      {
        title: "Các lớp phối hợp với nhau",
        key: "layers",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Lớp", "Vai trò", "Làm gì"],
            rows: [
              [
                "**① Mô hình AI Thế giới thực**: \"bộ não hiểu nhà máy\"",
                "Dự báo",
                "Học cách lò, máy nghiền và cả nhà máy phản ứng với quyết định; dự báo kèm mức độ chắc chắn; nói \"không biết\" khi gặp tình huống chưa có dữ liệu, không bịa ra kết quả",
              ],
              [
                "**② Minder**: \"trí nhớ của nhà máy\"",
                "Ghi nhận lại",
                "Đọc tín hiệu máy · ghi việc bằng giọng nói tiếng Việt và tiếng Thái · nối với hệ thống sẵn có · phân quyền · lưu trữ mọi quyết định và mọi lệnh",
              ],
              [
                "**Con người có thẩm quyền**",
                "Quyết định",
                "Phê duyệt mọi lệnh gửi xuống máy, đặt giới hạn điểm đặt, quyết định chất lượng và xuất hàng",
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
    eyebrow: "Bản đồ Nhà máy siêu thông minh của Siam Cement Group",
    title: "Bắt đầu từ một dây chuyền lò nung, rồi nhân rộng trên mạng lưới Siam Cement Group",
    blocks: [
      { kind: "module", id: "M8" },
      {
        kind: "p",
        text: "**Cùng một nền tảng Minder · cùng một họ mô hình · cùng một cách vận hành chuẩn của Siam Cement Group.** Mỗi nhà máy giữ môi trường dữ liệu riêng; thứ đi giữa các nhà máy là tri thức của mô hình đã được Siam Cement Group duyệt, không phải dữ liệu thô.",
      },
      {
        kind: "label",
        variant: "proposal",
        text: "Các nhà máy nhân rộng là hướng đề xuất, được chọn cùng Siam Cement Group sau khi có kết quả thử nghiệm.",
      },
      { kind: "h3", text: "Vì sao Siam Cement Group nên triển khai ngay bây giờ" },
      { kind: "cards", cols: 4, rows: [["**Việt Nam là trung tâm vận hành chiến lược** của Siam Cement Group; chiến lược tối ưu theo khu vực đã đặt việc chia sẻ năng lực số và AI giữa Việt Nam và Thái Lan"], ["**Mục tiêu giảm 23% CO₂ đến 2030:** tăng nhiên liệu thay thế mà vẫn giữ lò ổn định là đúng bài toán Mô hình AI Thế giới thực giải"], ["**Thị trường đang lớn:** tiêu thụ xi măng Việt Nam đạt kỷ lục khoảng 75 triệu tấn năm 2025 và tăng khoảng 16% trong 6 tháng đầu năm 2026"], ["**Nền AI sẵn có của Siam Cement Group:** Mô hình AI Thế giới thực bổ sung lớp hiểu nhà máy và vòng điều khiển có phê duyệt, làm việc cùng các lớp APC và mô hình AI của Siam Cement Group"]] },
      { kind: "h3", text: "Những gì nhà máy tiếp theo kế thừa từ dây chuyền đầu tiên" },
      {
        kind: "pillars",
        items: [
          "Mô hình AI Thế giới thực đã học trên lò thật",
          "Bộ đề thử nghiệm và tiêu chí nghiệm thu đã kiểm chứng",
          "Kỹ sư vận hành tại nhà máy đã làm chủ công nghệ mới",
          "Quy trình quản trị dữ liệu và quyền ghi điểm đặt đã được Siam Cement Group duyệt",
        ],
      },
    ],
    details: [
      {
        title: "Bảng ba mảng",
        key: "arms",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**① Nhà máy thử nghiệm**", "**② Nhân rộng, đợt 1**", "**③ Nhân rộng, đợt 2**"],
            rows: [
              ["**Nơi**", PILOT, `${VN_NEXT[0]} · ${VN_NEXT[1]}`, THAI],
              ["**Vai trò**", "Nơi bắt đầu: một dây chuyền lò, rồi toàn nhà máy", "Nhân rộng", "**Đích đến**"],
              ["**Thời gian**", "Tháng thứ 1–10", "Tháng thứ 11–16", "Tháng thứ 17–22"],
              [
                "**Câu hỏi mô hình trả lời** *(ví dụ)*",
                "Lò có sắp lệch khỏi trạng thái ổn định không? Đổi điểm đặt nào giảm nhiệt tiêu hao mà vẫn giữ vôi tự do? Thiết bị quay nào cần kiểm tra trước lần dừng lò?",
                "Nhà máy mới khác nhà máy đầu ở đâu? Kinh nghiệm nào dùng lại được ngay, phần nào cần học thêm?",
                "Mô hình cần điều chỉnh gì tại mỗi nhà máy mới? Các nhà máy học được gì từ nhau? Nhà máy Siam Cement Group nào nên đi tiếp?",
              ],
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────── HỒI 3 ─────────────────────────────
  {
    id: "lo-trinh",
    act: 3,
    theme: "light",
    layout: "wide",
    eyebrow: "Lộ trình 22 tháng: Siam Cement Group làm chủ công nghệ vận hành",
    title: "Một dây chuyền → toàn nhà máy → các nhà máy Siam Cement Group tiếp theo",
    blocks: [
      { kind: "h3", text: "Thời gian: 22 tháng triển khai, sau 2 tháng khảo sát" },
      {
        kind: "gantt",
        ticks: ["T-1", "T0", ...Array.from({ length: 22 }, (_, i) => `T+${i + 1}`)],
        rows: [
          { label: "Khảo sát và ký kết", sub: "T-1 đến T0", from: 1, to: 2, tone: 0 },
          { label: "Thử nghiệm: một dây chuyền lò nung", sub: `${PILOT_SHORT} · T+1 đến T+4`, from: 3, to: 6, tone: 1 },
          { label: "Minder & Mô hình AI Thế giới thực đi vào vận hành", sub: "T+1 đến T+22", from: 3, to: 24, tone: 2 },
          { label: "Toàn nhà máy: Dự báo và Hành động có phê duyệt", sub: "T+5 đến T+22", from: 7, to: 24, tone: 3 },
          { label: `Nhân rộng: ${VN_NEXT[0]}`, sub: "T+11 đến T+22", from: 13, to: 24, tone: 3 },
          { label: `Nhân rộng: ${VN_NEXT[1]}`, sub: "T+14 đến T+22", from: 16, to: 24, tone: 3 },
          { label: `Nhân rộng: ${THAI}`, sub: "T+17 đến T+22", from: 19, to: 24, tone: 4 },
        ],
        milestones: [
          { at: 3, label: "Cổng 1" },
          { at: 6, label: "Cổng 2" },
          { at: 12, label: "Cổng 3" },
          { at: 18, label: "Cổng 4" },
          { at: 24, label: "Cổng 5" },
        ],
      },
      {
        kind: "table",
        head: ["Giai đoạn", "Lộ trình", "Việc"],
        rows: [
          ["**Khảo sát và ký kết**", "T-1 đến T0", `Khảo sát ${PILOT_SHORT}; chọn dây chuyền và bài toán; ký thỏa thuận dữ liệu; chốt phí thử nghiệm.`],
          ["**Thử nghiệm**", "T+1 đến T+4", `Bật ${appCount} ứng dụng trên 5 tính năng Minder; thử nghiệm Dự báo trên lịch sử dây chuyền lò với bộ đề kín do Siam Cement Group giữ. **Cổng 1** (T+1): đọc được dữ liệu lò, chỉ đọc, với ít nhất 2 năm lịch sử. **Cổng 2** (T+4): Dự báo tốt hơn cách làm hiện tại; trưởng ca dùng Minder hằng ngày.`],
          ["**Toàn nhà máy**", "T+5 đến T+10", "Dự báo dùng thật: ổn định lò, phương án điểm đặt, nhiên liệu thay thế, vỏ lò, nghiền, xuất hàng. Hành động có phê duyệt: ghi điểm đặt, phun urê khử NOx, giữ lô. **Cổng 3** (T+10): Tài chính Siam Cement Group xác nhận giá trị; công nghệ vận hành mới vào quy trình chuẩn của nhà máy."],
          ["**Nhân rộng, đợt 1**", "T+11 đến T+16", `${VN_NEXT[0]} (T+11 đến T+13), rồi ${VN_NEXT[1]} (T+14 đến T+16): mang mô hình và cách vận hành chuẩn sang, không bắt đầu lại từ 0. **Cổng 4** (T+16): nhà máy thứ hai đạt tiêu chí nhanh hơn nhà máy đầu.`],
          ["**Nhân rộng, đợt 2**", "T+17 đến T+22", `${THAI}: khảo sát, thử nghiệm trên lịch sử của nhà máy, rồi dùng thật; dữ liệu ở lại nhà máy. **Cổng 5** (T+22): báo cáo kỹ thuật chung và kế hoạch cho các nhà máy tiếp theo.`],
        ],
      },
      { kind: "note", text: "T+1 là tháng đầu tiên sau khi Siam Cement Group duyệt quyền truy cập dữ liệu và môi trường tính toán. T-1 và T0 là hai tháng khảo sát và ký kết." },
      { kind: "h3", text: "Nhân sự theo giai đoạn" },
      { kind: "module", id: "M16" },
    ],
    details: [
      {
        title: "Thử nghiệm 16 tuần trên một dây chuyền lò nung",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            head: ["Tuần", "Việc", "Đầu ra"],
            rows: [
              ["**1–2**", `Khảo sát ${PILOT_SHORT}; Công nghệ lò, Chất lượng và Tài chính chọn dây chuyền và bài toán; ký thỏa thuận dữ liệu`, "Phạm vi và số nền được thống nhất"],
              ["**3–4**", "Dựng môi trường tại nhà máy thử nghiệm; lắp Minder tại máy ở chế độ chỉ đọc; **bật các ứng dụng trên 5 tính năng Minder: kết nối dữ liệu, theo dõi, cảnh báo, trợ lý AI, báo cáo tự động**", "**Cổng 1** · ứng dụng đầu tiên chạy tại phòng điều khiển"],
              ["**5–8**", "Nối 2 năm lịch sử lò và phòng thí nghiệm; Siam Cement Group dựng **bộ đề thử nghiệm kín**; huấn luyện mô hình riêng phiên bản đầu", "Mô hình v0.1"],
              ["**9–12**", "**Thử nghiệm trên lịch sử của chính lò Siam Cement Group**: dự báo được so với những gì đã thực sự xảy ra (dự báo ổn định lò, so sánh phương án điểm đặt); Công nghệ lò chấm mẫu", "Kết quả thử nghiệm"],
              ["**13–14**", "Chạy song song trên ca thật, không ai thấy dự báo khi quyết định; trưởng ca và kỹ sư công nghệ dùng Minder trong ca và đánh giá", "Quy trình ca mới với Minder"],
              ["**15–16**", "Tài chính xác nhận giá trị; báo cáo Ban chỉ đạo", "**Cổng 2**: mở rộng, điều chỉnh hay dừng"],
            ],
          },
          { kind: "p", text: "**Siam Cement Group chỉ cần 3 việc trong thử nghiệm:**" },
          {
            kind: "list",
            ordered: true,
            items: [
              "**Mở dữ liệu đã có:** chỉ đọc, không ghi xuống máy trong thử nghiệm, không làm gián đoạn hệ thống hiện tại.",
              "**Cử người:** trưởng ca, kỹ sư Công nghệ lò và Chất lượng, khoảng 4 giờ/tuần mỗi người.",
              "**Nhận xét và đánh giá.**",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "use-case",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Danh mục các ứng dụng",
    title: `${appCount} ứng dụng thực tế tại Sông Gianh trên 5 tính năng nền tảng Minder đang có`,
    blocks: [
      { kind: "module", id: "M18", variant: "features" },
    ],
    details: [
      {
        title: "Bảng danh mục ứng dụng",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["#", "Minder feature", "Ứng dụng thực tế", "Khâu"],
            rows: [
              ...useCases
                .filter((u) => u.card)
                .map((u) => [`**${u.code}**`, (u.card?.minder ?? "").replace(/\s*\(.*\)\s*$/, ""), u.question, u.card?.stage ?? ""]),
              ["→", "**Nhân rộng, đợt 1**", `${VN_NEXT[0]} (T+11–T+13) → ${VN_NEXT[1]} (T+14–T+16)`, ""],
              ["→", "**Nhân rộng, đợt 2**", `${THAI}: khảo sát (T+17) → dùng thật (T+19–T+22)`, ""],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dieu-khien",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Demo · từ dữ liệu máy đến lệnh xuống máy",
    title: "Mô hình đọc dữ liệu từ máy, và qua Minder gửi lệnh trở lại để máy hành động",
    blocks: [
      {
        kind: "label",
        variant: "ai",
        text: "Demo thật tại phòng thí nghiệm của Celesnity: robot công nghiệp, camera và thiết bị Minder tại máy. Không phải nhà máy Siam Cement Group.",
      },
      {
        kind: "media",
        side: "left",
        video: {
          src: "/decks/scg-vietnam/demo-dieu-khien-may-phu-de.mp4",
          poster: "/decks/scg-vietnam/demo-dieu-khien-may-phu-de.jpg",
          width: 480,
          height: 854,
          maxWidth: 380,
          title: "Minder Hub điều khiển một tế bào robot",
          caption: "Camera đọc vị trí từng chi tiết trên khay · thiết bị Minder tại máy nối robot và camera · Minder Hub báo trạng thái và gửi lệnh bắt đầu chu trình · robot thực hiện và báo hoàn thành",
        },
        blocks: [
          {
            kind: "steps",
            layout: "vertical",
            head: ["Bước", "Điều xảy ra trong demo", "Tại lò nung Siam Cement Group"],
            rows: [
              ["**Đọc**", "Camera và bộ điều khiển robot gửi trạng thái về thiết bị Minder tại máy: cổng kết nối trực tuyến, robot đã kết nối, camera đang chạy.", "Minder tại máy đọc tín hiệu hệ thống điều khiển: nhiệt độ vùng nung, O₂, áp suất, mô-men lò, cấp liệu, nhiên liệu."],
              ["**Hiểu**", "Vị trí và hướng của từng chi tiết được tính ra, thành điểm đích cho robot.", "Mô hình dự báo lò sẽ đi về đâu trong 1–2 giờ tới và so sánh các phương án điểm đặt."],
              ["**Duyệt và gửi lệnh**", "Người vận hành bấm \"Bắt đầu chu trình\" trên Minder Hub; lệnh đi xuống robot.", "Trưởng ca duyệt đề xuất; Minder ghi điểm đặt xuống hệ thống điều khiển, chỉ trong dải giới hạn Công nghệ đã duyệt."],
              ["**Hành động và báo lại**", "Robot gắp từng chi tiết; trạng thái chuyển sang \"đang chạy\" rồi \"hoàn thành\".", "hệ thống điều khiển thực hiện; Minder đọc lại phản ứng của lò và kết quả phòng thí nghiệm, đối chiếu với dự báo, mô hình học tiếp."],
            ],
          },
          {
            kind: "note",
            text: "Cùng một vòng **đọc → hiểu → duyệt → hành động → kiểm chứng** cho mọi loại máy. Interlock, hệ thống an toàn và quyền dừng khẩn cấp của nhà máy luôn đứng trên mọi lệnh của Minder.",
          },
        ],
      },
      { kind: "h3", text: "Ba nấc tự chủ, Siam Cement Group quyết định khi nào lên nấc" },
      {
        kind: "cards",
        cols: 3,
        tone: "navy",
        rows: [
          ["**Nấc 1 · Tư vấn**", "Mô hình đề xuất kèm dự báo và bằng chứng; người vận hành tự chỉnh trên hệ thống điều khiển như hôm nay. Mọi lần không theo đề xuất đều được ghi lý do."],
          ["**Nấc 2 · Có phê duyệt**", "Người có thẩm quyền bấm duyệt một đề xuất; Minder ghi điểm đặt xuống hệ thống điều khiển trong dải đã duyệt, rồi báo kết quả."],
          ["**Nấc 3 · Tự động trong giới hạn**", "Chỉ cho những điểm đặt và dải hẹp mà Siam Cement Group đã duyệt sau nhiều tháng ở nấc 2; người vận hành vẫn ngắt được bất cứ lúc nào."],
        ],
      },
    ],
  },
  {
    id: "hai-ben",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Chủ quyền dữ liệu và lợi ích hai bên",
    title: "Siam Cement Group bảo toàn chủ quyền dữ liệu tại mọi nhà máy, Celesnity làm chủ công nghệ AI Thế giới thực. Cùng bứt phá sau mỗi chu trình vận hành",
    blocks: [
      {
        kind: "statement",
        context: "Mô hình liên tục hoàn thiện từ thực tiễn sản xuất; ngược lại, kinh nghiệm vận hành của Siam Cement Group được chuẩn hóa và nhân rộng nhờ AI.",
        highlight: "Siam Cement Group có **hơn một thế kỷ kinh nghiệm vận hành**. Celesnity **làm chủ công nghệ AI Thế giới thực**.",
        conclusion: "**Nguyên tắc hợp tác:** bảo toàn 100% tài sản dữ liệu của mỗi bên. Chỉ chia sẻ tri thức mô hình đã qua kiểm duyệt bảo mật để tạo ra giá trị hai chiều.",
      },
      { kind: "h3", text: "Chu trình luân chuyển dữ liệu và tri thức khép kín" },
      { kind: "module", id: "M13", variant: "exchange" },
      {
        kind: "note",
        text: "Mỗi bản cập nhật đều qua kiểm thử chống khôi phục dữ liệu và được Siam Cement Group duyệt trước khi gửi, vì bản cập nhật đã tích hợp vào một phiên bản mô hình nền đã phát hành thì không thu hồi được.",
      },
      { kind: "h3", text: "Sáu cam kết không thay đổi" },
      { kind: "module", id: "M13", variant: "commitments" },
      { kind: "h3", text: "Sở hữu trí tuệ" },
      {
        kind: "cards",
        cols: 3,
        tone: "orange",
        head: ["Tài sản", "Chủ sở hữu", "Quyền của Siam Cement Group", "Quyền của Celesnity"],
        rows: [
          ["Dữ liệu nội bộ, công thức phối liệu, hồ sơ vận hành và mọi kết quả về hoạt động Siam Cement Group", "Siam Cement Group", "Toàn quyền", "Chỉ dùng để vận hành dịch vụ, trong phạm vi Siam Cement Group duyệt"],
          ["Mô hình dành riêng cho Siam Cement Group", "Celesnity", "Sử dụng độc quyền trong suốt thời gian hợp tác", "Phát triển, huấn luyện và bảo trì; không cung cấp cho bên nào khác"],
          ["Mô hình nền, nền tảng Minder, mã huấn luyện, bộ công cụ đánh giá", "Celesnity", "Sử dụng trong suốt thời gian hợp tác", "Sở hữu, tiếp tục phát triển và cấp phép"],
        ],
      },
      { kind: "h3", text: "Cơ chế hợp tác cộng hưởng giá trị" },
      { kind: "module", id: "M14", variant: "paired" },
      {
        kind: "p",
        wide: true,
        text: "**Đồng hành kiến tạo giá trị:** Celesnity chỉ ghi nhận hiệu quả khi Siam Cement Group thu được lợi ích kinh tế thực tế; năng lực mô hình nền của Celesnity song hành với sự tự chủ công nghệ của Siam Cement Group.",
      },
    ],
    details: [
      {
        title: "Chu trình luân chuyển dữ liệu và tri thức khép kín",
        key: "cycle",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Bước", "Điều gì đi đâu", "Gồm những gì"],
            rows: [
              ["**①**", "**Dữ liệu gốc do Siam Cement Group lưu giữ, tại từng nhà máy**", "Toàn bộ dữ liệu thô (tín hiệu máy, phòng thí nghiệm, công thức phối liệu, hồ sơ vận hành) được lưu và kiểm soát bởi Siam Cement Group; mô hình dành riêng cho Siam Cement Group chạy ngay trong môi trường này."],
              ["**②**", "**Chuyển giao tri thức dưới sự phê duyệt của Siam Cement Group**", "Chỉ gửi bản cập nhật trọng số mô hình đã qua khử nhận diện và kiểm thử an ninh; tuyệt đối không kèm dữ liệu thô và chỉ gửi khi Siam Cement Group duyệt từng lần."],
              ["**③**", "**Tái tích hợp và nâng cấp năng lực vận hành**", "Siam Cement Group nhận lại phiên bản mô hình nền nâng cấp, được tôi luyện từ nhiều nhà máy, giúp mô hình riêng của Siam Cement Group chính xác hơn sau mỗi vòng."],
            ],
            caption: "Dữ liệu thô luôn ở lại môi trường Siam Cement Group. Chỉ có tri thức mô hình đã học được chuyển giao, và quay trở lại dưới dạng một mô hình thông minh hơn.",
          },
        ],
      },
      {
        title: "Sáu cam kết không thay đổi",
        key: "commitments",
        printOnly: true,
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "Mô hình dự báo, so sánh và đề xuất. **Mọi lệnh gửi xuống máy đều có người có thẩm quyền phê duyệt**, trong dải giới hạn do kỹ sư Siam Cement Group đặt. Mỗi bước lên mức tự chủ cao hơn là quyết định riêng của Siam Cement Group, qua quy trình quản lý thay đổi của nhà máy.",
              "Interlock, hệ thống an toàn, quyền dừng khẩn cấp, quyết định của Chất lượng và quyết định xuất hàng **giữ nguyên quyền hiện tại**. Ngưỡng và giới hạn lấy từ tiêu chuẩn của nhà máy, **không do AI đặt**.",
              "Dữ liệu thô ở lại môi trường riêng của Siam Cement Group tại từng nhà máy. **Công thức phối liệu, bản vẽ, thông số công nghệ không bao giờ rời Siam Cement Group.**",
              "Siam Cement Group duyệt mục đích, người truy cập, thời hạn lưu và mọi phần được chia sẻ. Dữ liệu Siam Cement Group không gộp sang khách hàng khác và không dùng cho đối thủ. Khi chấm dứt hợp tác, dữ liệu được trả lại hoặc xóa theo yêu cầu.",
              "Dữ liệu người lao động **không bao giờ** được dùng để xếp hạng hay kỷ luật cá nhân.",
              "Mọi công bố, mọi lần dùng tên hay logo Siam Cement Group cần được đồng ý bằng văn bản (xem trước ít nhất 30 ngày).",
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
    title: "Siam Cement Group đầu tư vào công nghệ vận hành mà chính nhà máy làm chủ, không mua một phần mềm riêng lẻ",
    blocks: [
      { kind: "h3", text: "Ba hạng mục triển khai chính" },
      { kind: "module", id: "M14", variant: "package" },
      {
        kind: "list",
        items: [
          `**Giai đoạn thử nghiệm:** phí cố định với phạm vi công việc xác định, thống nhất sau khảo sát ${PILOT_SHORT}. Nếu không đạt Cổng 2, dự án không chuyển sang giai đoạn tính phí tiếp theo.`,
          "**Sau thử nghiệm:** định giá theo giá trị kinh tế thực tế do Tài chính Siam Cement Group xác nhận. Mỗi nhà máy mới có phạm vi và cơ chế định giá riêng.",
          "**Cam kết 3 Không:** không ràng buộc độc quyền · không yêu cầu góp vốn hay chia sẻ doanh thu · không chuyển dữ liệu thô ra khỏi quốc gia nơi nhà máy đặt.",
          "**Nguồn lực phát triển mô hình:** Celesnity tự tài trợ chi phí nghiên cứu và hoàn thiện mô hình nền.",
        ],
      },
      { kind: "h3", text: "Pháp lý và an ninh" },
      {
        kind: "list",
        items: [
          "**Việt Nam:** Luật Trí tuệ nhân tạo 134/2025/QH15 (hiệu lực 1/3/2026) · Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 và Nghị định 356/2025/NĐ-CP (hiệu lực 1/1/2026).",
          "**Thái Lan:** Luật Bảo vệ dữ liệu cá nhân (PDPA, B.E. 2562); dữ liệu nhà máy Thái Lan nằm trong môi trường Siam Cement Group tại Thái Lan.",
          "**An ninh:** theo kiến trúc mạng nhà máy đã duyệt và mô hình phân vùng IEC 62443; bắt đầu ở chế độ chỉ đọc; quyền ghi điểm đặt chỉ mở sau Cổng 2, theo từng điểm đặt, có nhật ký mọi lệnh.",
          "**Tiêu chuẩn của Celesnity:** thiết kế theo GDPR và Đạo luật AI của EU; lộ trình đạt ISO 27001 (6/2027) và SOC 2 (8/2027). Không tích hợp cơ chế ngắt từ xa nào.",
        ],
      },
      { kind: "h3", text: "Quản trị" },
      {
        kind: "cards",
        cols: 3,
        rows: [
          ["Ban chỉ đạo chung", "Lãnh đạo Siam Cement Group chủ trì, với đầu mối của từng nhà máy tham gia, cùng CEO và CTO Celesnity. Họp hằng quý và tại mỗi cổng."],
          ["Hội đồng dữ liệu", "Họp hằng tháng; duyệt phạm vi dữ liệu và quyền ghi điểm đặt."],
          ["Nhóm làm việc chung", "Họp hằng tuần, tại nhà máy."],
        ],
      },
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
              ["**① Mô hình AI Thế giới thực**", "Bản riêng của Siam Cement Group, chạy trong môi trường riêng của Siam Cement Group tại từng nhà máy; nhận các phiên bản mô hình nền mới, học được từ nhiều nhà máy"],
              ["**② Nền tảng Minder và bộ ứng dụng**", "Minder trên thiết bị, tại máy và trên nền tảng · 35 ứng dụng trên 5 tính năng, từ mỏ đá đến cảng · vòng điều khiển có phê duyệt"],
              ["**③ Triển khai và nghiệm thu (kỹ sư thực địa)**", "Cấu hình theo quy trình Siam Cement Group · tích hợp hệ thống · **đào tạo trưởng ca và kỹ sư tại nhà máy tới khi làm chủ công nghệ vận hành mới**"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "loi-moi",
    act: 3,
    theme: "light",
    layout: "closing",
    eyebrow: "Lời mời",
    title: "Mời Siam Cement Group trở thành Đối tác công nghiệp sáng lập của Nhà máy siêu thông minh",
    blocks: [
      { kind: "p", text: "**Kính đề nghị Ban Lãnh đạo:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất chủ trương:** Siam Cement Group là Đối tác công nghiệp sáng lập; một dây chuyền lò nung là điểm khởi đầu, mạng lưới nhà máy Siam Cement Group là đích đến của giai đoạn đầu.",
          "**Cử nhân sự:** lãnh đạo phụ trách cấp Tập đoàn · đầu mối tại các nhà máy · đầu mối dữ liệu · đầu mối Công nghệ lò và Chất lượng · đầu mối Tài chính · **trưởng ca và kỹ sư vận hành tại nhà máy thử nghiệm**.",
          `**Cho phép khảo sát ${PILOT_SHORT}** để chốt dây chuyền, bài toán, số nền và phí thử nghiệm.`,
        ],
      },
      {
        kind: "steps",
        head: ["Thời gian", "Việc"],
        rows: [
          ["T-1", "Làm việc với lãnh đạo Siam Cement Group; thống nhất term sheet, NDA, thỏa thuận xử lý dữ liệu"],
          ["T0", `Khảo sát ${PILOT_SHORT} → chốt phạm vi và phí thử nghiệm`],
          ["T+4", "Cổng 2: kết quả thử nghiệm trên dây chuyền lò"],
          ["T+10", "Cổng 3: toàn nhà máy, vòng điều khiển có phê duyệt"],
          ["T+16", "Cổng 4: nhân rộng, đợt 1"],
          ["T+22", "**Cổng 5: nhân rộng, đợt 2; Siam Cement Group làm chủ công nghệ vận hành trên các nhà máy của mình**"],
        ],
      },
      { kind: "module", id: "M14", variant: "closing" },
    ],
  },
];

/**
 * Các section tạm cất (không hiển thị trên trang, không vào bản in và trợ lý).
 * Muốn bật lại: chuyển phần tử về mảng `sections` ("hai-con-duong" sau "ky-nguyen").
 */
export const parkedSections: Section[] = [
  {
    id: "hai-con-duong",
    act: 1,
    theme: "mist",
    eyebrow: "Câu hỏi chiến lược",
    title: "Trí thông minh vận hành của các nhà máy Siam Cement Group sẽ do ai sở hữu?",
    blocks: [
      { kind: "module", id: "M3" },
      {
        kind: "quote",
        text: "Siam Cement Group đã tự xây năng lực ở xi măng, ở vật liệu xanh, ở chuỗi cung ứng khắp ASEAN. **Trí thông minh vận hành là năng lực tiếp theo mà Siam Cement Group hoàn toàn có thể tự chủ.**",
      },
    ],
    details: [
      {
        title: "Bảng hai con đường",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Con đường A: Thuê AI theo từng nhà máy**", "**Con đường B: Tự chủ**"],
            rows: [
              ["**Mô hình**", "Thuộc nhà cung cấp", "**Mô hình AI Thế giới thực riêng của Siam Cement Group**"],
              ["**Dữ liệu**", "Thường phải đưa ra hệ thống của nhà cung cấp", "**Ở lại môi trường riêng của Siam Cement Group tại từng nhà máy**"],
              ["**Kinh nghiệm**", "Làm giàu mô hình của người khác", "**Tích lũy thành tài sản vĩnh viễn của Siam Cement Group**"],
              ["**Đội ngũ**", "Phụ thuộc chuyên gia bên ngoài", "**Kỹ sư Siam Cement Group vận hành và phát triển**"],
              ["**Khi sang nhà máy mới, quốc gia mới**", "Mua thêm, tích hợp lại", "**Mang kinh nghiệm sang, không bắt đầu lại từ 0**"],
            ],
          },
        ],
      },
    ],
  },
];

/** Đoạn kết (hiển thị trong M14 variant "closing") */
export const closing = {
  headline: "Siam Cement Group đã xây hơn một thế kỷ kinh nghiệm vận hành. Bước tiếp theo: biến kinh nghiệm đó thành trí thông minh vận hành mà Siam Cement Group làm chủ.",
  lead: "Một ngày không xa:",
  story: `Tại một nhà máy Siam Cement Group ở Thái Lan, trưởng ca mở Minder trước giờ giao ca. Mô hình đã học từ lò nung tại ${PILOT_SHORT}, từ các nhà máy Siam Cement Group khác, và từ hàng nghìn quyết định của kỹ sư Siam Cement Group. Nó dự báo lò sẽ lệch sau 90 phút và đề xuất một điều chỉnh. Trưởng ca bấm duyệt. Lò giữ ổn định.`,
  tagline: "NHÀ MÁY SIÊU THÔNG MINH: Tự học · Dự báo trước · Nhân rộng.",
  owner: "Do Siam Cement Group làm chủ.",
  thanks: "Celesnity mong được cùng Siam Cement Group xây dựng nó.",
  pdf: "Tải bản PDF",
  ask: "Hỏi trợ lý",
};

/**
 * Lợi ích hai bên (M14 variant "paired" trong #hai-ben): dòng thứ i của Siam Cement Group đối ứng dòng thứ i của Celesnity.
 */
export const benefits = {
  groupTitles: { give: "Nguồn lực đóng góp", receive: "Giá trị nhận lại" },
  columnHeads: {
    give: ["Hạng mục đối ứng", "Siam Cement Group đóng góp", "Celesnity đóng góp"],
    receive: ["Mục tiêu giá trị", "Siam Cement Group nhận", "Celesnity nhận"],
  },
  rowLabels: {
    give: ["Dữ liệu và công nghệ lõi", "Nền tảng và nghiệp vụ", "Hạ tầng và triển khai tại nhà máy", "Nhân lực và vận hành"],
    receive: ["Kinh tế và chi phí", "Mô hình và chủ quyền dữ liệu", "Độ hoàn thiện công nghệ", "Tầm nhìn dài hạn và vị thế"],
  },
  partner: {
    name: "Siam Cement Group",
    give: [
      "**Quyền truy cập dữ liệu vận hành:** chỉ đọc trong thử nghiệm, lưu tại chỗ, chỉ mở theo phạm vi Siam Cement Group phê duyệt.",
      "**Tri thức chuyên gia:** Công nghệ lò, Chất lượng, Bảo trì cùng giải bài toán, khoảng 4 giờ/tuần.",
      "**Hạ tầng tại chỗ:** máy chủ và mạng tại từng nhà máy, thuộc sở hữu Siam Cement Group.",
      "**Kỹ sư vận hành tại nhà máy:** trưởng ca, công nghệ, bảo trì dùng Minder trong công việc hằng ngày.",
    ],
    receive: [
      "**Hiệu quả kinh tế đo được:** nhiệt tiêu hao, điện năng, dừng lò, nhiên liệu thay thế, do Tài chính Siam Cement Group trực tiếp xác nhận.",
      "**Mô hình AI dành riêng:** chạy trong môi trường Siam Cement Group và chỉ phục vụ Siam Cement Group trong suốt thời gian hợp tác; dữ liệu và mọi kết quả về hoạt động Siam Cement Group thuộc Siam Cement Group.",
      "**Đón đầu năng lực AI tối tân:** tiếp cận trước 6 tháng các tính năng và phiên bản mô hình nền mới.",
      "**Làm chủ công nghệ vận hành:** kỹ sư trên các nhà máy Siam Cement Group vận hành cùng Minder, sẵn sàng nhân rộng sang các nhà máy Siam Cement Group tiếp theo trong khu vực.",
    ],
  },
  celesnity: {
    name: "Celesnity",
    give: [
      "**Mô hình AI nền tảng:** cung cấp mô hình nền và tự tài trợ 100% chi phí nghiên cứu, phát triển.",
      "**Nền tảng Minder:** Minder trên thiết bị, tại máy và trên nền tảng, cùng bộ ứng dụng cho lò nung và toàn nhà máy.",
      "**Đội triển khai:** 3 người trong thử nghiệm và toàn nhà máy, trong đó kỹ sư hiện trường làm việc tại nhà máy; 4–5 người khi nhân rộng.",
      "**Hướng dẫn vận hành:** đào tạo, kèm cặp tại xưởng đến khi trưởng ca và kỹ sư làm chủ công nghệ vận hành mới.",
    ],
    receive: [
      "**Chi phí theo giá trị:** phí cố định trong thử nghiệm; sau đó gắn phí với giá trị đã được xác nhận.",
      "**Bản cập nhật tri thức mô hình:** trọng số đã qua kiểm thử an ninh, chỉ khi Siam Cement Group duyệt; tuyệt đối không kèm dữ liệu thô.",
      "**Bảo chứng năng lực công nghiệp:** Mô hình AI Thế giới thực được kiểm chứng trên lò nung xi măng, một trong những quy trình công nghiệp khó nhất.",
      "**Khách hàng tham chiếu chiến lược trong khu vực:** điển hình triển khai trên một mạng lưới nhà máy trong khu vực, khi Siam Cement Group đồng ý.",
    ],
  },
};

/** Gói hợp tác (M14 variant "package") */
export const packageParts = [
  { n: "①", name: "Mô hình AI Thế giới thực", body: "Bản riêng của Siam Cement Group, chạy trong môi trường riêng của Siam Cement Group tại từng nhà máy; nhận các phiên bản mô hình nền mới, học được từ nhiều nhà máy" },
  { n: "②", name: "Nền tảng Minder và bộ ứng dụng", body: "Minder trên thiết bị, tại máy và trên nền tảng · 35 ứng dụng trên 5 tính năng, từ mỏ đá đến cảng · vòng điều khiển có phê duyệt" },
  { n: "③", name: "Triển khai và nghiệm thu (kỹ sư thực địa)", body: "Cấu hình theo quy trình Siam Cement Group · tích hợp hệ thống · **đào tạo trưởng ca và kỹ sư tại nhà máy tới khi làm chủ công nghệ vận hành mới**" },
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
          "**Ghi lại:** mọi việc tại nhà máy thành chuỗi \"tình trạng → quyết định → kết quả\" (ví dụ: tình trạng lò → thay đổi điểm đặt → phản ứng của lò và vôi tự do).",
          "**Học:** mô hình học quy luật \"khi làm X trong tình trạng Y thì thường xảy ra Z\".",
          "**Dự báo kèm mức độ chắc chắn:** mô hình nói \"không biết\" khi gặp nguyên liệu, nhiên liệu hay chế độ vận hành chưa từng thấy.",
          "**Phân biệt nguyên nhân với trùng hợp:** người vận hành thường đổi điểm đặt vì có lý do, nên mô hình dùng phương pháp thống kê để tách tác động thật khỏi lý do chọn. Khi dữ liệu không đủ để phân biệt, mô hình nói rõ.",
          "**Kiểm tra giới hạn kỹ thuật:** một lớp kiểm tra riêng đảm bảo đề xuất không vượt dải điểm đặt, giới hạn thiết bị hay quy định môi trường.",
          "**Không thử nghiệm trên lò:** mô hình chỉ học từ hoạt động đã ghi lại và các thay đổi đã được duyệt.",
        ],
      },
      { kind: "p", text: "*Chi tiết kỹ thuật cho đội ngũ kỹ sư:*" },
      {
        kind: "list",
        items: [
          "Lõi mô hình học trong không gian biểu diễn (hướng JEPA).",
          "Độ chắc chắn được hiệu chuẩn bằng phương pháp conformal.",
          "Ước lượng tác động bằng propensity và doubly robust.",
          "Huấn luyện và kiểm tra tách theo thời gian.",
          "Minder tại máy: đọc qua OPC UA hoặc Modbus từ hệ thống điều khiển và PLC; ghi điểm đặt chỉ qua cổng đã duyệt, trong dải giới hạn, có nhật ký và xác nhận đọc lại.",
        ],
      },
    ],
  },
  {
    id: "nhan-rong-vat-lieu",
    title: "Hướng nhân rộng sang các nhà máy vật liệu khác của Siam Cement Group (đề xuất)",
    blocks: [
      {
        kind: "cards",
        cols: 3,
        head: ["Hướng", "Câu hỏi mô hình trả lời", "Dữ liệu cần"],
        rows: [
          ["Lò nung gạch ốp lát", "Đổi đường cong nhiệt hay tốc độ lò tác động thế nào tới cong vênh, kích thước và tỷ lệ loại?", "Thông số lò con lăn, men, phối liệu, kết quả phân loại"],
          ["Máy giấy và bao bì", "Thay đổi bột giấy, hơi sấy hay tốc độ máy tác động thế nào tới độ bền và đứt giấy?", "Thông số máy giấy, chất lượng cuộn, năng lượng"],
          ["Bê tông và vật liệu xanh", "Phối liệu ít clinker hơn ảnh hưởng thế nào tới cường độ?", "Phối liệu, kết quả cường độ, điều kiện bảo dưỡng"],
          ["Năng lượng toàn khu vực", "Lịch sản xuất nào tiêu hao năng lượng ít nhất mà vẫn đủ đơn hàng?", "Kế hoạch sản xuất, đo năng lượng, giá điện"],
          ["Bảo trì", "Thiết bị nào cần bảo trì trước; dời lịch bảo trì gây hệ quả gì?", "Lịch sử bảo trì, cảnh báo thiết bị, quan sát của kỹ sư"],
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
          ["Dữ liệu lò không đủ hoặc không khớp thời gian", "Cổng 1 kiểm tra trước; bắt đầu với dữ liệu có sẵn, bổ sung cảm biến chỉ khi cần"],
          ["Mô hình không hơn cách làm hiện tại", "Cổng 2 với bộ đề kín; không đạt thì dừng, không chuyển sang giai đoạn có phí"],
          ["Lệnh ghi xuống máy gây rủi ro vận hành", "Chỉ mở sau Cổng 2; từng điểm đặt; dải hẹp do Công nghệ duyệt; người duyệt từng lần; interlock và hệ thống an toàn luôn đứng trên"],
          ["Kinh nghiệm của một nhà máy không áp dụng được ở nhà máy tiếp theo", "Mỗi nhà máy mới có khảo sát và bộ đề riêng; thứ mang sang là nền tảng, phương pháp và đội ngũ, không mặc định mang sang độ chính xác"],
          ["Dữ liệu đi ra khỏi quốc gia", "Môi trường riêng tại từng nhà máy, trong phạm vi pháp lý nơi nhà máy đặt; chỉ trọng số đã kiểm thử và được Siam Cement Group duyệt mới được chia sẻ"],
          ["Phụ thuộc vào Celesnity", "Kỹ sư tại nhà máy làm chủ cách vận hành mới từ những tháng đầu; mã nguồn và mô hình được lưu ký"],
          ["Người lao động lo bị giám sát", "Tham vấn trước; khử nhận diện; không dùng để đánh giá cá nhân"],
        ],
      },
    ],
  },
  {
    id: "nguon",
    title: "Nguồn",
    blocks: [{
        kind: "p",
        text: "Siam Cement Group và Siam Cement Group Việt Nam: kết quả kinh doanh năm 2025 (1/2026) và 6 tháng đầu năm 2026 (7/2026) · Siam Cement Group tại Việt Nam: hơn 7 tỷ USD, 28 công ty, chiến lược tối ưu theo khu vực (12/2025) · doanh thu Siam Cement Group Việt Nam 2025 (2/2026) · Xi măng Sông Gianh: 20 năm, đồng xử lý chất thải, mục tiêu giảm 23% CO₂ năm 2030, hệ thống xuất hàng tự động (3/2026) · ESG 4 Plus và Inclusive Green Growth · CiMie AI và hợp tác AI điều khiển quá trình cho ngành xi măng (4/2026) · AI trong sản xuất bao bì của SCGP (6/2026) · thị trường xi măng Việt Nam 2025 và 6 tháng đầu năm 2026 (VIR, 8/2026).",
      },
      {
        kind: "note",
        text: "Công bố của doanh nghiệp và báo chí xác lập thông tin được báo cáo, không phải kiểm toán độc lập. Các nhà máy nhân rộng và nhà máy tại Thái Lan là đề xuất của Celesnity. Các tình huống và mức giá trị trong ví dụ chỉ là minh họa.",
      },],
  },
];

export const sectionIds = sections.map((s) => s.id);
