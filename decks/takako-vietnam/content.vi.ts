/**
 * Câu chữ của deck Takako (/takako-vietnam), chuyển từ docs/takako-content-v1.md
 * (brief: docs/takako-brief.md · kế hoạch: docs/takako-implementation-plan.md).
 * Không viết cứng câu chữ trong component; sửa file nội dung gốc trước, rồi sửa ở đây và chạy `npm run content:check`.
 * Người đọc là Ban lãnh đạo Takako: không nêu tên, không trích lời cá nhân nào phía Takako.
 */
import type { Act, AppendixSection, BenefitSide, Closing, CostShiftRow, DeckLabels, PackagePart, Section } from "../types";

export const meta = {
  title: "Minder AI · Takako × Celesnity",
  description: "Đề xuất triển khai Minder AI, trợ lý vận hành chủ động cho Takako. Tài liệu thảo luận, tháng 10/2026.",
  tagline: "Trợ lý vận hành chủ động của Takako",
  footer: "MINDER AI · Takako × Celesnity · Tài liệu thảo luận",
  series: "Minder AI cho Takako",
};

export const acts: Act[] = [
  { n: 1, label: "I.", title: "Takako đã sẵn sàng" },
  { n: 2, label: "II.", title: "Minder AI tại Takako" },
  { n: 3, label: "III.", title: "Đo bằng con số, mở rộng từng bước" },
];

export const labels: DeckLabels = {
  sim: "Mô phỏng minh họa: dữ liệu dựng để trình bày, không phải số liệu của Takako.",
  simShort: "Mô phỏng minh họa",
  ai: "Minder AI soạn",
  future: "Hình dung khi triển khai",
  proposal: "Đề xuất, chốt cùng Takako",
  calculatorPrivacy: "",
  chatNotice:
    "Trợ lý chỉ trả lời về đề xuất này. Câu hỏi trên trang được xử lý bởi dịch vụ AI quốc tế; vui lòng không nhập dữ liệu nội bộ. Minder AI khi triển khai chạy trong nhà máy Takako.",
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
    cover: "/decks/takako-vietnam/nha-may-takako-viet-nam.webp",
    coverLayout: "right",
    coverPosition: "52% 50%",
    eyebrow: "Takako × Celesnity · Đề xuất triển khai",
    title: "Minder AI,\ntrợ lý vận hành chủ động của Takako",
    blocks: [
      {
        kind: "lead",
        text: "Mọi thông tin quản lý cần về sản xuất, vận hành, kế toán và tài nguyên kỹ thuật, từ chính dữ liệu và hệ thống Takako đang sở hữu.",
      },
      { kind: "note", text: "Chạy trong nhà máy · Chỉ đọc dữ liệu · Con người quyết định" },
    ],
  },
  {
    id: "thu-ngo",
    act: 0,
    theme: "light",
    eyebrow: "Thư ngỏ",
    title: "Kính gửi Ban lãnh đạo Takako",
    blocks: [
      { kind: "p", text: "Trước hết, Celesnity xin trân trọng cảm ơn Quý vị đã dành thời gian cho đề xuất này." },
      {
        kind: "p",
        text: "Takako đã hoàn thành chặng đường khoảng mười năm số hóa: tự động hóa, robot, ERP, MES, cùng dữ liệu IoT trên khoảng 1.000 máy móc thiết bị, và 100% dữ liệu sửa chữa, bảo trì đã nằm trên hệ thống. Với một nhà máy gia công chính xác có nhiều khách hàng, nhiều mã hàng và nhiều dòng chảy sản phẩm, đó là nền dữ liệu mà không nhiều nhà máy có được. Bước tiếp theo không phải thêm một hệ thống hay một dashboard, mà là để dữ liệu ấy **tự đến đúng người quản lý, đúng lúc**, với những con số tin được.",
      },
      {
        kind: "p",
        text: "Các nhà máy có thể dùng nhiều công cụ AI phổ biến. Nhưng với giá thành, tình trạng máy hay phiên bản bản vẽ, một câu trả lời nghe hợp lý là chưa đủ: mỗi con số phải truy được về bản ghi gốc và được tính đúng theo công thức mà quản lý đã duyệt. Vì thế Celesnity xây dựng Minder AI theo một nguyên tắc: **không suy đoán ngoài dữ liệu**.",
      },
      {
        kind: "p",
        text: "Celesnity trân trọng đề xuất triển khai **Minder AI, trợ lý vận hành chủ động của Takako**. Minder AI chạy trong nhà máy, đặt trên ERP, MES-IoT và kho bản vẽ Takako đang có, chỉ đọc dữ liệu và nối dữ liệu theo mã hàng. Minder AI tự theo dõi, phát hiện thay đổi, soạn sẵn thông tin và báo đúng người quản lý, theo **quy tắc do chính quản lý Takako đặt**.",
      },
      {
        kind: "p",
        text: "**Tầm nhìn**\nMọi thông tin quản lý cần về sản xuất, vận hành, kế toán và tài nguyên kỹ thuật đều sẵn có, đúng, đủ và nhất quán, từ chính dữ liệu Takako đang sở hữu. Minder AI **tự học** dữ liệu và quy tắc của Takako, **dự báo trước** những điều sắp xảy ra ở máy móc và mã hàng, và **nhân rộng** sang nhà máy thứ hai.",
      },
      {
        kind: "p",
        text: "**Cách làm**\nBắt đầu nhỏ và chắc: ba phần việc trong 4 tuần, gồm Trợ lý giá thành cho Kế toán, Trợ lý dữ liệu máy cho Sản xuất và Vận hành, Trợ lý bản vẽ cho Tài nguyên kỹ thuật. Dữ liệu chỉ đọc, không thay phần mềm nào, không thay đổi quy trình đang chạy. Kỹ sư thực địa của Celesnity làm việc tại nhà máy cùng từng phòng; ngay tuần 1, hai bên đo số nền thời gian làm việc hiện tại và quản lý đặt quy tắc cho từng phần việc.",
      },
      {
        kind: "p",
        text: "**Kết quả dự kiến sau 4 tuần**\nBa phần việc chạy thật trên dữ liệu của Takako. Thời gian cho công việc Minder AI đảm nhận được đo so với số nền tuần 1, ví dụ tình trạng một máy từ khoảng 30 phút xuống dưới 2 phút. 100% output có nguồn, và tỷ lệ đúng do chính người nhận xác nhận. Tại Cổng 1, Takako quyết định mở rộng sang các ứng dụng tiếp theo, rồi sang nhà máy thứ hai.",
      },
      {
        kind: "p",
        text: "**Cam kết của Celesnity**\nMinder AI và mô hình AI open-weight chạy trong nhà máy, không gọi dịch vụ AI bên ngoài; dữ liệu thuộc Takako. Minder AI không ghi vào hệ thống, không điều khiển máy, không tự đặt ngưỡng hay công thức. Phí gắn với KPI đã chốt trước khi bắt đầu. **Quản lý Takako luôn là người quyết định.**",
      },
      { kind: "p", text: "**Kính đề nghị Ban lãnh đạo**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất định hướng:** triển khai Minder AI theo ba giai đoạn. Ba phần việc giá thành, dữ liệu máy và bản vẽ là điểm khởi đầu; nhà máy thứ hai là đích đến.",
          "**Cử đầu mối:** đầu mối Kế toán, Kỹ thuật, Sản xuất và IT, cùng quản lý phụ trách mỗi mảng để đặt quy tắc ở tuần 1.",
          "**Cho phép kết nối chỉ đọc** vào ERP, MES-IoT và kho bản vẽ để đo số nền và khởi động Giai đoạn 1 vào cuối tháng 10/2026.",
        ],
      },
      {
        kind: "p",
        text: "**Tại buổi trình bày với IT và Ban lãnh đạo**, Celesnity đề xuất: đi qua ba phần việc trên dữ liệu mô phỏng; rà danh sách dữ liệu và hạ tầng trong nhà máy cùng IT; thống nhất KPI, cách đo số nền và người xác nhận cho từng chỉ số.",
      },
      {
        kind: "p",
        text: "Chúng tôi tin rằng một nhà máy gia công chính xác đã số hóa bài bản như Takako có thể là nơi đầu tiên chứng minh một trợ lý vận hành chủ động, chính xác đến từng con số. Celesnity mong được đồng hành cùng Takako trên chặng đường đó.",
      },
      { kind: "signature", lines: ["Trân trọng,", "**Celesnity**, đơn vị phát triển Minder AI"] },
    ],
  },

  // ───────────────────────────── HỒI 1 ─────────────────────────────
  {
    id: "tu-chu",
    act: 1,
    theme: "mist",
    eyebrow: "Takako hôm nay",
    title: "Mười năm số hóa đã hoàn thành. Dữ liệu đã sẵn sàng.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "10 năm", label: "lộ trình tự động hóa, robot, ERP và MES đã hoàn thành" },
          { value: "~1.000", label: "máy móc, thiết bị có dữ liệu IoT" },
          { value: "100%", label: "dữ liệu sửa chữa và bảo trì đã nằm trên hệ thống" },
          { value: "5", label: "nhà máy: 2 tại Việt Nam, 3 ở nước ngoài" },
        ],
      },
      {
        kind: "flow",
        steps: ["Yêu cầu khách hàng", "Bản vẽ và mã hàng", "Chạy thử", "Sản xuất", "Chất lượng", "Xuất hàng"],
        caption: "Mỗi mã hàng đi qua một chuỗi rõ ràng, và mỗi bước đều để lại dữ liệu trên hệ thống của Takako.",
      },
      {
        kind: "list",
        items: [
          "**Thuần kỹ thuật và gia công chính xác:** bản vẽ, mã hàng, đồ gá, chương trình gia công, cycle time.",
          "**Nhiều khách hàng, nhiều mã hàng, nhiều dòng chảy sản phẩm**, vận hành theo quy trình.",
          "**Hệ thống đã có:** ERP, MES, IoT trên máy, kho bản vẽ, cùng chart và dashboard cho quản lý.",
          "**Dữ liệu có cấu trúc**, đủ để AI làm việc ngay, không cần lắp thêm thiết bị.",
        ],
      },
      {
        kind: "statement",
        context: "Takako vận hành theo quy trình, với nhiều khách hàng, nhiều mã hàng và nhiều dòng chảy sản phẩm.",
        highlight: "Dữ liệu đã có. Bước tiếp theo là để dữ liệu **tự đến đúng người quản lý, đúng lúc.**",
        conclusion: "Minder AI làm việc đó, trên chính hệ thống Takako đang sở hữu.",
      },
    ],
  },
  {
    id: "chinh-xac",
    act: 1,
    theme: "light",
    eyebrow: "Tiêu chuẩn đảm bảo tính chính xác của Minder AI đối với dữ liệu",
    title: "Mọi thông tin Minder AI đưa ra đều truy xuất được nguồn gốc, tính đúng theo công thức của quản lý và loại trừ hoàn toàn hiện tượng suy đoán",
    blocks: [
      {
        kind: "table",
        head: ["Tiêu chuẩn chính xác", "Cách Minder AI bảo chứng", "Thước đo độ chính xác"],
        rows: [
          [
            "**Chính xác từ dữ liệu gốc** (Zero Hallucination)",
            "Mọi kết quả đều dẫn link trực tiếp tới bản ghi trên ERP, MES-IoT hoặc kho bản vẽ. Thiếu số liệu thì báo thiếu, tuyệt đối không ước lượng, không suy đoán ngoài dữ liệu.",
            "Tỷ lệ output được người phụ trách xác nhận đúng 100% nguồn gốc.",
          ],
          [
            "**Chính xác về logic và công thức tính**",
            "Tuân thủ tuyệt đối quy tắc do chính Quản lý ban hành: dùng đúng biến số, chạy đúng thuật toán duyệt sẵn, giữ nguyên định dạng báo cáo cho mọi lần xuất kết quả.",
            "100% output tuân thủ đúng quy tắc và công thức đã chốt.",
          ],
          [
            "**Chính xác về hiệu quả thực tế**",
            "Giá trị của độ chính xác được lượng hóa bằng thời gian xử lý: so sánh trực tiếp số nền tuần 1 và kết quả tuần 4. Cam kết KPI gắn liền với chi phí.",
            "Thời gian truy xuất / tính toán nghiệp vụ thật giảm rõ rệt (ví dụ: từ 30 phút xuống < 2 phút).",
          ],
          [
            "**Chính xác về phân quyền & truy vết** (Auditability)",
            "Mô hình open-weight chạy on-premise trong nhà máy. Phân quyền chặt chẽ theo vai trò; ghi nhật ký (audit log) 100% câu hỏi, kết quả xuất ra và người truy cập.",
            "Minh bạch tuyệt đối, truy vết được nguyên nhân mọi kết quả trả về.",
          ],
          [
            "**Kiểm chứng chính xác trên phạm vi giới hạn**",
            "Không triển khai ồ ạt; khoanh vùng kiểm định độ chính xác trên 3 bài toán lõi (giá thành, máy móc, bản vẽ) ở chế độ chỉ đọc (read-only).",
            "Cổng nghiệm thu sau 4 tuần: chỉ mở rộng khi độ chính xác đạt yêu cầu.",
          ],
          [
            "**Chính xác theo ngữ cảnh kỹ thuật nhà máy**",
            "Không trả lời chung chung; chỉ giải quyết bài toán nghiệp vụ chuyên sâu: bóc tách nguyên nhân đội giá thành theo công đoạn, lịch sử sự cố máy, phiên bản bản vẽ đang chạy.",
            "Tần suất sử dụng và tỷ lệ đánh giá \"Đúng nghiệp vụ\" của kỹ sư, kế toán hàng tuần.",
          ],
          [
            "**Chính xác trong liên kết chuỗi dữ liệu** (Traceability)",
            "Khớp nối dữ liệu xuyên suốt theo mã hàng (Part Number): từ một sự cố dừng máy trên MES, chỉ ra chính xác tác động đến giá thành trên ERP và bản vẽ kỹ thuật liên quan.",
            "Chuỗi dữ liệu liên phòng ban được đồng bộ chính xác, không đứt gãy.",
          ],
        ],
      },
    ],
  },

  // ───────────────────────────── HỒI 2 ─────────────────────────────
  {
    id: "minder-ai",
    act: 2,
    theme: "mist",
    layout: "wide",
    eyebrow: "Minder AI là gì",
    title: "Một trợ lý vận hành đặt trên hệ thống Takako đã có, không thay phần mềm nào",
    blocks: [
      {
        kind: "lead",
        text: "Minder AI kết nối ERP, MES-IoT và kho bản vẽ ngay trong nhà máy, nối dữ liệu theo mã hàng, rồi tự đưa thông tin đến đúng người quản lý.",
      },
      { kind: "module", id: "M21", variant: "architecture" },
      { kind: "module", id: "M21", variant: "buoc" },
      { kind: "note", text: "Khi được hỏi, Minder AI trả lời ngay, theo cùng quy tắc và cùng nguồn dữ liệu." },
      { kind: "h3", text: "Bốn mảng thông tin quản lý cần" },
      {
        kind: "cards",
        cols: 4,
        head: ["Mảng", "Quản lý cần", "Dữ liệu Takako đã có"],
        rows: [
          ["**Sản xuất**", "Sản lượng, cycle time, phế phẩm theo mã hàng và theo máy", "MES-IoT"],
          ["**Vận hành**", "Tình trạng máy, sự cố, sửa chữa, bảo trì", "MES, với 100% dữ liệu sửa chữa và bảo trì"],
          [
            "**Kế toán**",
            "Giá thành thực, chênh lệch so với định mức, chi phí khi kế hoạch thay đổi, văn bản pháp lý mới",
            "ERP, kết hợp MES-IoT và bản vẽ",
          ],
          ["**Tài nguyên kỹ thuật**", "Bản vẽ hiện hành, phiên bản, lệnh và lô liên quan", "Kho bản vẽ và lệnh sản xuất"],
        ],
      },
      {
        kind: "p",
        text: "Kỹ sư Celesnity làm việc tại nhà máy cùng từng bộ phận, hiểu cách làm việc của từng phòng và **không thay đổi quy trình đang chạy**.",
      },
    ],
    details: [
      {
        title: "Bốn bước làm việc",
        printOnly: true,
        blocks: [
          {
            kind: "diagram",
            nodeWidth: 168,
            flow: {
              branches: [
                {
                  group: "Hệ thống của Takako",
                  branches: [
                    { nodes: [{ label: "ERP · Kế toán", sub: "đơn giá, chi phí, định mức" }] },
                    { nodes: [{ label: "MES-IoT", sub: "máy, sản lượng, cycle time, sửa chữa, bảo trì" }] },
                    { nodes: [{ label: "Kho bản vẽ", sub: "mã hàng, phiên bản, ghi chú thay đổi" }] },
                    { nodes: [{ label: "Nguồn bên ngoài được phép", sub: "văn bản pháp luật theo danh sách được phép" }] },
                  ],
                  then: [],
                },
              ],
              via: "chỉ đọc",
              then: [
                { label: "Minder AI", sub: "trong nhà máy · nối theo mã hàng", tone: "platform" },
                { label: "Quy tắc do quản lý đặt", tone: "edge" },
                { label: "Quản lý theo vai trò", sub: "Kế toán · Kỹ thuật · Sản xuất · Ban lãnh đạo" },
              ],
            },
            legend: [
              { tone: "plain", label: "Hệ thống và người dùng của Takako" },
              { tone: "platform", label: "Minder AI" },
              { tone: "edge", label: "Quy tắc do quản lý đặt" },
            ],
            caption: "Minder AI đọc dữ liệu từ hệ thống sẵn có, không ghi ngược lại và không thay phần mềm nào.",
          },
          {
            kind: "steps",
            head: ["Bước", "Minder AI làm gì"],
            rows: [
              ["**Theo dõi**", "Đọc dữ liệu từ ERP, MES-IoT và kho bản vẽ, liên tục và theo lịch quản lý đặt"],
              ["**Phát hiện**", "Nhận ra thay đổi vượt ngưỡng Takako đặt: giá thành, sự cố máy, phiên bản bản vẽ"],
              ["**Soạn sẵn**", "Viết bản tin, cảnh báo, báo cáo theo đúng quy tắc của quản lý phụ trách"],
              ["**Báo đúng người**", "Gửi đúng quản lý, đúng lúc, kèm nguồn và cách tính"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ba-viec",
    act: 2,
    theme: "light",
    layout: "wide",
    eyebrow: "Giai đoạn 1",
    title: "Ba phần việc đầu tiên Minder AI nhận tại Takako",
    blocks: [
      { kind: "lead", text: "Ba phần việc phủ đủ bốn mảng thông tin, chỉ dùng dữ liệu Takako đã có, và chỉ đọc." },
      { kind: "module", id: "M21", variant: "ba-viec" },
      {
        kind: "label",
        variant: "proposal",
        text: "Ngoài phạm vi Giai đoạn 1: ghi dữ liệu vào hệ thống, điều khiển máy, giám sát quy trình xưởng, chương trình gia công. Các phần này thuộc lộ trình sau, khi Takako quyết định.",
      },
    ],
    details: [
      {
        title: "Ba phần việc",
        printOnly: true,
        blocks: [
          {
            kind: "cards",
            cols: 3,
            head: ["Phần việc", "Quản lý nhận", "Minder AI tự gửi", "Trả lời khi được hỏi", "Dữ liệu"],
            rows: [
              [
                "**Trợ lý giá thành** · Kế toán",
                "Phòng Kế toán",
                "Cảnh báo mã hàng vượt định mức kèm nguyên nhân và cách tính · Tính lại giờ máy và chi phí khi kế hoạch sản lượng thay đổi · Báo cáo giá thành tháng soạn sẵn · Tóm tắt văn bản pháp lý mới từ nguồn được phép",
                "\"Giá thành thực của mã hàng này tháng 9?\" · \"Nếu sản lượng tăng 20% thì giờ máy và chi phí thay đổi thế nào?\"",
                "ERP, MES-IoT, kho bản vẽ, nguồn pháp lý được phép",
              ],
              [
                "**Trợ lý dữ liệu máy** · Sản xuất và Vận hành",
                "Phòng Kỹ thuật, Phòng Sản xuất",
                "Bản tin sáng về các máy cần chú ý · Báo cáo bảo trì tuần soạn sẵn",
                "\"Tình trạng máy MC-07 trong 6 tháng qua?\" · \"Sản lượng và phế phẩm của mã hàng này tuần trước?\"",
                "MES-IoT: sự cố, sửa chữa, bảo trì, cycle time, sản lượng",
              ],
              [
                "**Trợ lý bản vẽ** · Tài nguyên kỹ thuật",
                "Phòng Kỹ thuật, Phòng Sản xuất",
                "Cảnh báo khi bản vẽ có phiên bản mới mà lệnh hoặc lô còn chạy theo phiên bản cũ",
                "\"Bản vẽ hiện hành của mã hàng này là phiên bản nào?\" · \"Lô nào đã chạy theo phiên bản cũ?\"",
                "Kho bản vẽ, lệnh sản xuất",
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "quy-tac",
    act: 2,
    theme: "mist",
    layout: "wide",
    eyebrow: "Quy tắc do quản lý đặt",
    title: "Quản lý đặt quy tắc. Minder AI trả lời đúng quy tắc đó, lần nào cũng vậy.",
    blocks: [
      {
        kind: "lead",
        text: "Mỗi loại thông tin có một quy tắc do quản lý phụ trách đặt ra: dùng dữ liệu nào, tính thế nào, trình bày ra sao, gửi cho ai và khi nào. Minder AI chỉ làm theo quy tắc, nên số liệu chuẩn xác, output đúng định dạng đã đề ra và nhất quán giữa các người nhận, các ngày và các bộ phận.",
      },
      { kind: "module", id: "M21", variant: "quy-tac" },
      {
        kind: "note",
        text: "Ảnh chụp từ Minder AI: mỗi quy tắc do quản lý đặt được lưu thành một kỹ năng của dự án Takako, gồm tên, mô tả, thông tin chi tiết và nội dung hướng dẫn mà Minder AI tuân theo.",
      },
      {
        kind: "steps",
        head: ["Bước", "Việc", "Ai làm"],
        rows: [
          ["**Đặt quy tắc**", "Dữ liệu dùng, cách tính, ngưỡng, định dạng, người nhận, thời điểm", "Quản lý phụ trách"],
          ["**Áp dụng**", "Mọi output và mọi câu trả lời cùng loại đều theo đúng quy tắc", "Minder AI"],
          ["**Kiểm tra**", "Mỗi output có nguồn và cách tính; bấm Xác nhận, Không đúng hoặc Không cần", "Người nhận"],
          [
            "**Điều chỉnh**",
            "Sửa quy tắc khi cần; Minder AI áp dụng từ lần sau và ghi lại ai sửa, sửa gì, khi nào",
            "Quản lý phụ trách",
          ],
        ],
      },
      { kind: "note", text: "Minder AI không tự đặt ngưỡng, không tự đổi cách tính và không tự thêm người nhận." },
    ],
    details: [
      {
        title: "Một quy tắc mẫu",
        printOnly: true,
        blocks: [
          { kind: "photo", photo: { src: "/decks/takako-vietnam/quy-tac-nghiep-vu-ke-toan.webp", alt: "Quy tắc Nghiệp vụ kế toán (nguồn whitelist) trong Minder AI", width: 2000, height: 1119, caption: "Quy tắc Nghiệp vụ kế toán (nguồn whitelist)" } },
          { kind: "photo", photo: { src: "/decks/takako-vietnam/quy-tac-ke-hoach-san-luong.webp", alt: "Quy tắc Kế hoạch sản lượng & công suất trong Minder AI", width: 2000, height: 1119, caption: "Quy tắc Kế hoạch sản lượng & công suất" } },
          { kind: "photo", photo: { src: "/decks/takako-vietnam/quy-tac-ban-ve-revision.webp", alt: "Quy tắc Bản vẽ & revision trong Minder AI", width: 2000, height: 1119, caption: "Quy tắc Bản vẽ & revision" } },
          {
            kind: "kv",
            rows: [
              ["**Quy tắc**", "QT-GT-01 · Cảnh báo giá thành theo mã hàng"],
              ["**Người đặt**", "Trưởng phòng Kế toán"],
              ["**Áp dụng cho**", "Mọi mã hàng đang sản xuất trong tháng"],
              [
                "**Dữ liệu dùng**",
                "ERP: đơn giá vật liệu, đơn giá giờ máy, định mức giá thành · MES-IoT: cycle time, phế phẩm, sản lượng · Kho bản vẽ: vật liệu theo phiên bản hiện hành",
              ],
              [
                "**Cách tính**",
                "Công thức giá thành Phòng Kế toán đã duyệt: vật liệu + giờ máy + nhân công + phế phẩm + chi phí chung",
              ],
              ["**Ngưỡng**", "Giá thành thực cao hơn định mức trên 3%"],
              ["**Định dạng**", "Kết quả · Chênh lệch · Nguyên nhân chính · Cách tính · Nguồn"],
              ["**Người nhận**", "Phòng Kế toán; thêm Phòng Kỹ thuật khi nguyên nhân nằm ở sản xuất"],
              ["**Thời điểm**", "09:00 mỗi ngày làm việc"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "kiem-soat",
    act: 2,
    theme: "light",
    eyebrow: "Bảo mật và kiểm soát",
    title: "Dữ liệu ở lại Takako. Con người quyết định.",
    blocks: [
      { kind: "module", id: "M21", variant: "security" },
      { kind: "h3", text: "Cách triển khai" },
      {
        kind: "kv",
        rows: [
          ["**Nơi chạy**", "Trong nhà máy Takako (on-premise)"],
          ["**Mô hình AI**", "Mô hình open-weight chạy cục bộ, không gọi dịch vụ AI bên ngoài"],
          ["**Kết nối**", "Chỉ đọc ERP, MES-IoT và kho bản vẽ"],
          [
            "**Nguồn bên ngoài**",
            "Chỉ các nguồn trong danh sách được phép, ví dụ cơ sở dữ liệu văn bản pháp luật cho Kế toán",
          ],
          ["**Truy cập**", "Theo vai trò: mỗi người chỉ thấy thông tin đúng vai trò của mình"],
          ["**Nhật ký**", "Ghi lại mọi truy vấn, mọi output và mọi lần sửa quy tắc"],
          ["**Pháp lý**", "Ký NDA trước khi khảo sát; quản lý bảo mật theo ISO 27001 cùng GIANTY"],
          [
            "**Quyền dữ liệu**",
            "Dữ liệu thuộc Takako, không dùng để huấn luyện mô hình chung khi chưa được Takako đồng ý",
          ],
        ],
      },
      { kind: "h3", text: "Bảy cam kết" },
      {
        kind: "checklist",
        cols: 2,
        items: [
          "Minder AI không ghi vào ERP, MES hay kho bản vẽ.",
          "Minder AI không điều khiển máy.",
          "Minder AI không thay đổi quy trình đang chạy.",
          "Quy tắc, ngưỡng và người nhận do quản lý Takako đặt.",
          "Mọi output có nguồn và cách tính.",
          "Thiếu dữ liệu thì Minder AI nói rõ, không ước đoán.",
          "Dữ liệu không dùng để đánh giá cá nhân.",
        ],
      },
    ],
  },

  // ───────────────────────────── HỒI 3 ─────────────────────────────
  {
    id: "ban-do",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Bản đồ triển khai Minder AI tại Takako",
    title: "Bắt đầu từ ba phần việc, mở rộng ứng dụng, rồi đến nhà máy thứ hai",
    blocks: [
      { kind: "module", id: "M8" },
      {
        kind: "p",
        text: "**Cùng một Minder AI · cùng bộ quy tắc của quản lý · cùng cách đo KPI.** Mỗi giai đoạn thêm việc cho Minder AI trên nền đã chứng minh ở giai đoạn trước.",
      },
      {
        kind: "label",
        variant: "proposal",
        text: "Giai đoạn 2 và 3 là hướng đề xuất; phạm vi và thứ tự do Takako quyết định sau mỗi cổng.",
      },
      { kind: "h3", text: "Những gì nhà máy thứ hai kế thừa từ nhà máy thứ nhất" },
      {
        kind: "pillars",
        items: [
          "Minder AI đã chạy thật trên dữ liệu Takako",
          "Bộ quy tắc trả lời của quản lý Takako",
          "Cách đo KPI và cổng nghiệm thu đã kiểm chứng",
          "Đội Takako đã tự đặt và chỉnh quy tắc",
        ],
      },
    ],
    details: [
      {
        title: "Bảng ba giai đoạn",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**① Giai đoạn 1**", "**② Giai đoạn 2**", "**③ Giai đoạn 3**"],
            rows: [
              ["**Nơi**", "Nhà máy thứ nhất · Kế toán, Kỹ thuật, Sản xuất", "Nhà máy thứ nhất · các phòng ban", "Nhà máy thứ hai"],
              ["**Vai trò**", "Nơi bắt đầu", "Mở rộng ứng dụng", "**Đích đến**"],
              ["**Thời gian**", "4 tuần", "Sau Cổng 1", "Sau Cổng 2"],
              [
                "**Câu hỏi Minder AI trả lời** *(ví dụ)*",
                "Giá thành thực của mã hàng này tháng 9? Máy nào cần chú ý hôm nay? Bản vẽ đang dùng có phải bản mới nhất?",
                "Máy nào có khả năng hỏng trong 2 tuần tới? Mã hàng này đang ở đâu, từ yêu cầu khách hàng đến xuất hàng? Mã hàng mới giống mã cũ nào, cần lưu ý claim gì?",
                "Nhà máy thứ hai dùng cùng quy tắc giá thành chưa? Ứng dụng nào đưa sang trước? Hai nhà máy so với nhau thế nào trên cùng KPI?",
              ],
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
    eyebrow: "Lộ trình",
    title: "Ba giai đoạn. Takako quyết định ở mỗi cổng.",
    blocks: [
      { kind: "module", id: "M15" },
      { kind: "h3", text: "Giai đoạn 1 theo tuần" },
      {
        kind: "timeline",
        head: ["Tuần", "Việc", "Minder AI", "Takako"],
        rows: [
          [
            "**1**",
            "Kết nối và đo số nền",
            "Kết nối chỉ đọc ERP, MES-IoT, kho bản vẽ; đo thời gian hiện tại",
            "Quản lý đặt quy tắc, ngưỡng và người nhận cho từng phần việc",
          ],
          [
            "**2**",
            "Output đầu tiên",
            "Gửi bản tin, cảnh báo và báo cáo cho 2–3 người nhận mỗi phần việc",
            "Người nhận đánh dấu từng output",
          ],
          ["**3**", "Dùng hằng ngày", "Gửi cho toàn bộ người nhận; trả lời câu hỏi thêm", "Quản lý chỉnh quy tắc theo phản hồi"],
          ["**4**", "Đo và quyết định", "Báo cáo KPI so với tuần 1", "**Cổng 1:** Takako quyết định Giai đoạn 2"],
        ],
      },
      { kind: "label", variant: "proposal", text: "Khởi động cuối tháng 10/2026, có kết quả cuối tháng 11/2026." },
      { kind: "h3", text: "Nhân sự theo giai đoạn" },
      { kind: "module", id: "M16" },
      { kind: "label", variant: "proposal", text: "Nhân sự và tỷ lệ vận hành là đề xuất, chốt cùng Takako trước khi khởi động." },
      { kind: "note", text: "Thứ tự ứng dụng ở Giai đoạn 2 là đề xuất, theo mức độ sẵn sàng của dữ liệu. Takako chọn thứ tự." },
    ],
    details: [
      {
        title: "Ba giai đoạn",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            head: ["Giai đoạn", "Minder AI làm gì", ""],
            rows: [
              [
                "**Giai đoạn 1 · 4 tuần**",
                "Ba phần việc: giá thành, dữ liệu máy, bản vẽ. Minder AI học dữ liệu, công thức và quy tắc của Takako. **Tự học**",
                "Cổng 1: Takako chấm KPI",
              ],
              [
                "**Giai đoạn 2**",
                "Nhận thêm các ứng dụng Takako đã nêu, từ báo cáo điều đã xảy ra sang cảnh báo điều sắp xảy ra. **Dự báo trước**",
                "Cổng 2: Takako chọn ứng dụng tiếp theo",
              ],
              [
                "**Giai đoạn 3**",
                "Minder AI và các phần việc đã chứng minh chạy tại nhà máy thứ hai. **Nhân rộng**",
                "Takako quyết định",
              ],
            ],
          },
          {
            kind: "cards",
            cols: 3,
            head: ["Đợt", "Ứng dụng", "Dữ liệu"],
            rows: [
              [
                "**Đợt 2a · dữ liệu đã sẵn sàng**",
                "Trợ lý bảo trì đầy đủ cho khoảng 1.000 máy: máy cần bảo trì, thay thế, sửa chữa, đặt linh kiện, xếp theo mức nghiêm trọng · Truy vết tình trạng mã hàng xuyên hệ thống: từ yêu cầu khách hàng, chạy thử, sản xuất, chất lượng đến xuất hàng · So sánh và kiểm tra bản vẽ: bản mới khác gì bản trong kho, sai hay cũ phiên bản",
                "MES, ERP, dữ liệu chất lượng, kho bản vẽ, tài liệu phòng ban",
              ],
              [
                "**Đợt 2b · cảnh báo trước**",
                "Gợi ý quy trình chuẩn từ mã hàng tương tự, cảnh báo claim cũ, công đoạn dễ bị bỏ, lỗi đồ gá · Bảo trì dự đoán: cảnh báo khả năng hỏng trong 1 đến 2 tuần tới",
                "Lịch sử mã hàng, quy trình, claim chất lượng, IoT, lịch sử sự cố",
              ],
              [
                "**Đợt 2c · tối ưu**",
                "Tối ưu chương trình gia công, giảm cycle time theo phương pháp cải tiến của Takako · Đôn đốc tiến độ sản xuất: từ đơn hàng đến lệnh sản xuất, công đoạn, máy và tồn kho",
                "Chương trình gia công, quy tắc cải tiến, gần như mọi hệ thống",
              ],
            ],
          },
          {
            kind: "p",
            text: "Minder AI và các phần việc đã chứng minh ở nhà máy thứ nhất chạy tại nhà máy thứ hai. Lớp kết nối dữ liệu, quy tắc của quản lý và cách đo KPI được dùng lại, nên triển khai nhanh hơn nhà máy thứ nhất.",
          },
        ],
      },
    ],
  },
  {
    id: "gia-tri",
    act: 3,
    theme: "mist",
    eyebrow: "Đo lường",
    title: "Đo trên công việc thật, phí gắn với kết quả",
    blocks: [
      {
        kind: "steps",
        head: ["Thời điểm", "Việc", "Kết quả"],
        rows: [
          ["**Tuần 1**", "Đo thời gian Takako đang dùng cho từng phần việc", "Số nền (baseline) được hai bên xác nhận"],
          ["**Tuần 2–4**", "Minder AI làm việc hằng ngày; người nhận đánh dấu từng output", "Dữ liệu đo thật, cập nhật mỗi tuần"],
          ["**Tuần 4**", "So sánh với tuần 1, chấm KPI", "Cổng 1: Takako quyết định bước tiếp theo"],
        ],
      },
      {
        kind: "table",
        head: ["KPI", "Cách đo", "Mục tiêu đề xuất"],
        rows: [
          [
            "**Thời gian cho công việc Minder AI đảm nhận**: tính giá thành một mã hàng, tổng hợp tình trạng một máy, xác nhận bản vẽ hiện hành",
            "So với số nền tuần 1",
            "Tình trạng một máy: từ khoảng 30 phút xuống dưới 2 phút. Các phần việc khác chốt cùng Takako",
          ],
          ["**Tỷ lệ xác nhận đúng**", "Phần output người nhận bấm Xác nhận", "Chốt cùng Takako, ví dụ trên 90%"],
          ["**Tỷ lệ không cần**", "Phần output người nhận bấm Không cần", "Thấp và giảm dần mỗi tuần"],
          ["**Output có nguồn**", "Kiểm tra tự động", "100%"],
          [
            "**Mức sử dụng thật**",
            "Số người nhận, số output được đọc, số câu hỏi thêm mỗi tuần",
            "Chốt cùng Takako",
          ],
        ],
      },
      {
        kind: "p",
        text: "Mỗi output của Minder AI có ba nút: **Xác nhận · Không đúng · Không cần**. Đó chính là dữ liệu đo KPI, đo ngay trên công việc hằng ngày của Takako.",
      },
      { kind: "h3", text: "Phí gắn với kết quả" },
      {
        kind: "list",
        items: [
          "**Một phần cố định nhỏ** cho kỹ sư Celesnity làm việc tại nhà máy.",
          "**Phần còn lại chỉ trả khi đạt KPI** đã chốt trước khi bắt đầu.",
          "**Không tính phí theo số người dùng.**",
          "**Sau Giai đoạn 1:** hợp đồng theo từng giai đoạn, giá gắn với giá trị đo được.",
        ],
      },
      { kind: "label", variant: "proposal", text: "Mức phí cụ thể nằm trong đề xuất gửi kèm." },
    ],
  },
  {
    id: "hai-ben",
    act: 3,
    theme: "light",
    layout: "wide",
    eyebrow: "Quyền lợi đôi bên",
    title: "Takako giữ dữ liệu và quyền quyết định; Celesnity được trả phí khi đạt KPI",
    blocks: [
      { kind: "module", id: "M14", variant: "benefits" },
      { kind: "h3", text: "Kể cả khi Giai đoạn 1 không đạt, Takako vẫn giữ" },
      {
        kind: "pillars",
        items: [
          "Số nền thời gian làm việc của ba phần việc",
          "Bộ quy tắc trả lời do quản lý Takako đặt",
          "Bản đồ dữ liệu ERP, MES-IoT và kho bản vẽ",
          "Toàn bộ dữ liệu và nhật ký, nằm trong nhà máy",
        ],
      },
    ],
    details: [
      {
        title: "Bảng quyền lợi đôi bên",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Takako**", "**Celesnity**"],
            rows: [
              [
                "**Nhận**",
                "Ba phần việc chạy thật trên dữ liệu của chính Takako sau 4 tuần · Thời gian làm việc giảm, đo bằng số nền tuần 1 · Quy tắc trả lời do quản lý Takako đặt và giữ · Lộ trình có cổng: Takako quyết định ở mỗi bước",
                "Phí gắn với KPI đạt được · Phản hồi nghiệp vụ để hoàn thiện Minder AI · Bằng chứng triển khai thực tế, chỉ công bố khi Takako đồng ý bằng văn bản",
              ],
              [
                "**Góp**",
                "Quyền truy cập chỉ đọc vào ERP, MES-IoT và kho bản vẽ · Đầu mối ở mỗi phòng, vài giờ mỗi tuần · Quản lý đặt quy tắc và ngưỡng · Phản hồi trên từng output",
                "Nền tảng Minder AI và các ứng dụng · Kỹ sư thực địa tại nhà máy · Đo và báo cáo KPI minh bạch mỗi tuần · Chuyển giao để đội Takako tự đặt và chỉnh quy tắc",
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hop-tac",
    act: 3,
    theme: "mist",
    layout: "closing",
    eyebrow: "Hình thức hợp tác",
    title: "Hai thành phần: Bộ ứng dụng AI-native, và Triển khai, nghiệm thu bởi kỹ sư thực địa",
    blocks: [
      { kind: "h3", text: "Hai thành phần của gói" },
      { kind: "module", id: "M14", variant: "package" },
      { kind: "h3", text: "Vai trò các bên" },
      {
        kind: "cards",
        cols: 4,
        head: ["Bên", "Vai trò"],
        rows: [
          [
            "**Takako**",
            "Chủ trì; chọn người nhận; quản lý đặt quy tắc và ngưỡng; xác nhận KPI; cấp quyền truy cập dữ liệu chỉ đọc",
          ],
          ["**Đối tác kết nối dữ liệu nhà máy**", "Đầu mối kết nối ERP, MES-IoT và kho bản vẽ"],
          ["**Celesnity**", "Nền tảng Minder AI; kỹ sư làm việc tại nhà máy; xây các phần việc; đo KPI"],
          ["**GIANTY**", "Quản lý dự án; tư vấn lộ trình AI; bảo mật dữ liệu"],
        ],
      },
      { kind: "h3", text: "Bước tiếp theo: khởi động cuối tháng 10, có kết quả cuối tháng 11" },
      {
        kind: "kv",
        rows: [
          ["**16/10/2026**", "Gửi đề xuất triển khai"],
          ["**Tuần 19/10**", "Trình bày với IT và Ban lãnh đạo Takako"],
          ["**Cuối tháng 10**", "Khởi động Giai đoạn 1: kết nối dữ liệu, đo số nền, quản lý đặt quy tắc"],
          ["**Cuối tháng 11**", "Kết quả Giai đoạn 1 và Cổng 1"],
        ],
      },
      {
        kind: "quote",
        text: "**Đề nghị:** Ban lãnh đạo Takako đồng ý khởi động Giai đoạn 1 vào cuối tháng 10/2026.",
      },
      { kind: "module", id: "M14", variant: "closing" },
    ],
  },
];

/** Section tạm ẩn (vẫn giữ nội dung và dữ liệu M20 feed) */
export const parkedSections: Section[] = [
  {
    id: "mot-ngay",
    act: 2,
    theme: "navy",
    layout: "wide",
    eyebrow: "Thử ngay",
    title: "Một ngày làm việc cùng Minder AI",
    blocks: [
      {
        kind: "label",
        variant: "sim",
        text: "Dữ liệu mô phỏng phục vụ minh họa, không phải số liệu của Takako. Mã hàng, máy, lệnh sản xuất, ngưỡng và quy tắc là ví dụ.",
      },
      {
        kind: "note",
        text: "Chọn vai trò để xem Minder AI gửi gì cho từng bộ phận. Bấm vào quy tắc để xem quy tắc đó do ai đặt. Bấm \"Hỏi thêm\" để hỏi tiếp ngay trên thông tin vừa nhận.",
      },
      { kind: "module", id: "M20", variant: "feed" },
    ],
    details: [
      {
        title: "Một ngày của Minder AI",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Giờ", "Minder AI gửi", "Cho ai", "Nội dung", "Theo quy tắc"],
            rows: [
              [
                "**07:30**",
                "Bản tin buổi sáng",
                "Phòng Kỹ thuật, Phòng Sản xuất",
                "MC-07 dừng 3 lần vì lỗi trục chính trong 6 tháng, lần sửa gần nhất 12/9. MC-04 có cycle time tăng 6% trong 2 tuần. MC-12 không có dữ liệu từ 15/9, cần kiểm tra kết nối",
                "QT-MAY-01 · Trưởng phòng Kỹ thuật",
              ],
              [
                "**09:00**",
                "Cảnh báo giá thành",
                "Phòng Kế toán, Phòng Kỹ thuật",
                "PT-2041 tháng 9 cao hơn định mức 4,1%, vượt ngưỡng 3%. Nguyên nhân chính: cycle time công đoạn OP-30 trên MC-07 tăng từ 3,6 lên 3,9 phút sau lần dừng ngày 12/9",
                "QT-GT-01 · Trưởng phòng Kế toán",
              ],
              [
                "**11:00**",
                "Bản vẽ có phiên bản mới",
                "Phòng Kỹ thuật, Phòng Sản xuất",
                "VS-118 phát hành bản vẽ rev D. Hai lệnh sản xuất còn theo rev C: LSX-1182 đang chạy trên MC-05 và LSX-1187 chưa bắt đầu",
                "QT-BV-01 · Trưởng phòng Kỹ thuật",
              ],
              [
                "**14:00**",
                "Tính lại theo kế hoạch",
                "Phòng Kế toán, Phòng Sản xuất",
                "Kế hoạch tháng 11 của nhóm piston tăng 20%. Nhóm tiện CNC cần thêm khoảng 310 giờ máy, thiếu khoảng 120 giờ so với công suất còn trống",
                "QT-GT-02 · Trưởng phòng Kế toán",
              ],
              [
                "**16:00**",
                "Văn bản pháp lý mới",
                "Phòng Kế toán",
                "Văn bản hướng dẫn mới về hóa đơn điện tử trên nguồn được phép: ba điểm liên quan đến quy trình của Takako, kèm trích dẫn điều khoản. Cần Kế toán trưởng xác nhận trước khi áp dụng",
                "QT-PL-01 · Kế toán trưởng",
              ],
              [
                "**Thứ Sáu 17:00**",
                "Báo cáo tuần",
                "Ban lãnh đạo và các phòng",
                "Hai mã hàng vượt định mức, một máy cần bảo trì, một bản vẽ ra phiên bản mới. Trong tuần: 14 output, 13 được xác nhận đúng, 1 được đánh dấu không cần",
                "QT-BC-01 · Giám đốc nhà máy",
              ],
            ],
          },
        ],
      },
    ],
  },
];

/** Đoạn kết (M14 "closing" và bản in) */
export const closing: Closing = {
  headline: "Minder AI, trợ lý vận hành chủ động của Takako",
  lead: "Takako × Celesnity",
  story:
    "Takako đã hoàn thành mười năm số hóa. Minder AI giúp dữ liệu đó tự đến đúng người quản lý, đúng lúc, theo đúng quy tắc Takako đặt ra.",
  tagline: "Mọi thông tin quản lý cần, từ chính dữ liệu Takako đang sở hữu.",
  owner: "Celesnity, đơn vị phát triển Minder AI",
  thanks: "Cảm ơn Ban lãnh đạo Takako đã dành thời gian.",
  pdf: "Tải bản PDF",
  ask: "Hỏi trợ lý Minder AI",
};

/** Quyền lợi đôi bên (M14 "benefits") */
export const benefits: { partner: BenefitSide; celesnity: BenefitSide } = {
  partner: {
    name: "Takako",
    receive: [
      "Ba phần việc chạy thật trên dữ liệu của chính Takako sau 4 tuần",
      "Thời gian làm việc giảm, đo bằng số nền tuần 1",
      "Quy tắc trả lời do quản lý Takako đặt và giữ",
      "Lộ trình có cổng: **Takako quyết định ở mỗi bước**",
      "Dữ liệu, quy tắc và nhật ký thuộc Takako, nằm trong nhà máy",
    ],
    give: [
      "Quyền truy cập chỉ đọc vào ERP, MES-IoT và kho bản vẽ",
      "Đầu mối ở mỗi phòng, vài giờ mỗi tuần",
      "Quản lý đặt quy tắc và ngưỡng",
      "Phản hồi trên từng output: Xác nhận · Không đúng · Không cần",
    ],
  },
  celesnity: {
    name: "Celesnity",
    receive: [
      "Phí gắn với KPI đạt được",
      "Phản hồi nghiệp vụ để hoàn thiện Minder AI; dữ liệu Takako không dùng cho khách hàng khác",
      "Bằng chứng triển khai thực tế, chỉ công bố khi Takako đồng ý bằng văn bản",
    ],
    give: [
      "Nền tảng Minder AI và các ứng dụng",
      "Kỹ sư thực địa làm việc tại nhà máy",
      "Đo và báo cáo KPI minh bạch mỗi tuần",
      "Chuyển giao để đội Takako tự đặt và chỉnh quy tắc",
    ],
  },
};

/** Hình thức hợp tác (M14 "package"): hai thành phần */
export const packageParts: PackagePart[] = [
  {
    n: "①",
    name: "Bộ ứng dụng AI-native",
    body: "Minder AI chạy trong nhà máy và các ứng dụng trên cùng nền tảng: **Trợ lý giá thành · Trợ lý dữ liệu máy · Trợ lý bản vẽ** ở Giai đoạn 1, thêm ứng dụng ở Giai đoạn 2. Quy tắc trả lời do quản lý Takako đặt",
  },
  {
    n: "②",
    name: "Triển khai và nghiệm thu (kỹ sư thực địa)",
    body: "Kỹ sư Celesnity làm việc tại nhà máy cùng từng phòng: **kết nối dữ liệu chỉ đọc · cùng quản lý đặt quy tắc · đo số nền và KPI · nghiệm thu ở mỗi cổng**. Không thay đổi quy trình đang chạy",
  },
];
export const costShift: CostShiftRow[] = [];

export const appendix: AppendixSection[] = [
  {
    id: "ket-noi",
    title: "Minder AI kết nối với hệ thống của Takako thế nào",
    blocks: [
      {
        kind: "list",
        items: [
          "**ERP và kế toán:** qua API, database view hoặc file xuất định kỳ. Chỉ đọc.",
          "**MES-IoT:** dữ liệu máy, sản lượng, cycle time, sự cố, sửa chữa, bảo trì. Chỉ đọc.",
          "**Kho bản vẽ:** thông tin phiên bản, ngày phát hành, ghi chú thay đổi, liên kết với mã hàng và lệnh sản xuất.",
          "**Nguồn bên ngoài:** chỉ các nguồn trong danh sách được phép do Takako duyệt.",
          "**Kênh nhận thông tin:** email nội bộ hoặc kênh Takako chọn; xem lại toàn bộ trong Minder AI.",
          "**Mở rộng sau này:** Minder AI kết nối thêm hệ thống qua giao thức MCP, nên phần mềm đã có sẵn tính năng AI không phải là rào cản; kết nối trực tiếp với máy qua CAN, Modbus, Ethernet hoặc PLC khi Takako cần.",
        ],
      },
    ],
  },
  {
    id: "ha-tang",
    title: "Hạ tầng triển khai trong nhà máy",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "**Máy chủ và GPU đặt tại nhà máy:** dùng hạ tầng Takako sẵn có hoặc bổ sung, chốt trước khi khởi động.",
          "**Mô hình AI:** loại open-weight, chạy cục bộ. Minder AI không gọi dịch vụ AI bên ngoài; kết nối ra ngoài chỉ tới các nguồn trong danh sách được phép.",
          "**Phân quyền và nhật ký:** quyền theo vai trò; nhật ký lưu trong nhà máy.",
          "**Kỹ sư bên ngoài vào nhà máy:** theo quy định IT và bảo mật của Takako.",
        ],
      },
    ],
  },
  {
    id: "cau-hoi",
    title: "Câu hỏi thường gặp",
    blocks: [
      {
        kind: "list",
        items: [
          "**Minder AI có thay ERP hay MES không?** Không. Minder AI đặt trên các hệ thống Takako đang có, chỉ đọc dữ liệu và không thay phần mềm nào.",
          "**Dữ liệu có ra khỏi nhà máy không?** Không. Minder AI và mô hình AI chạy trong nhà máy. Kết nối ra ngoài chỉ tới các nguồn trong danh sách được phép.",
          "**Nếu Minder AI sai thì sao?** Mỗi output có nguồn và cách tính để người nhận kiểm tra. Bấm \"Không đúng\" thì lỗi được ghi lại, rồi sửa dữ liệu hoặc quy tắc. Tỷ lệ đúng là một KPI của Giai đoạn 1.",
          "**Quy tắc do ai đặt, đổi thế nào?** Quản lý phụ trách từng mảng đặt quy tắc: dữ liệu dùng, cách tính, ngưỡng, định dạng, người nhận, thời điểm. Quản lý sửa khi cần; Minder AI áp dụng từ lần sau và ghi lại lịch sử thay đổi.",
          "**Minder AI có tự gửi quá nhiều thông tin không?** Giai đoạn 1 chỉ có 2–3 loại output cho mỗi phần việc. Ngưỡng do quản lý đặt và được chỉnh mỗi tuần theo nút \"Không cần\".",
          "**Tuần 1 cần gì từ Takako?** Quyền truy cập chỉ đọc vào ERP, MES-IoT và kho bản vẽ; một đầu mối ở mỗi bộ phận; quản lý đặt quy tắc ban đầu; vài giờ để đo thời gian làm việc hiện tại.",
          "**Vì sao Giai đoạn 1 chưa làm giám sát quy trình xưởng hay đôn đốc tiến độ?** Đó là các ứng dụng cần gần như mọi hệ thống. Bắt đầu từ ba phần việc có dữ liệu sẵn sàng và đo được ngay, rồi mở rộng khi Takako quyết định.",
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
        head: ["Rủi ro", "Cách xử lý"],
        rows: [
          [
            "**Dữ liệu máy chưa gắn được theo mã hàng**",
            "Kiểm tra ngay tuần 1; nếu chưa gắn, cảnh báo giá thành dùng dữ liệu theo lô hoặc theo tháng",
          ],
          [
            "**Chưa có định mức giá thành cho mọi mã hàng**",
            "Bắt đầu bằng so sánh với tháng trước; Phòng Kế toán bổ sung định mức dần",
          ],
          [
            "**Thông tin gửi đi quá nhiều**",
            "Mỗi phần việc chỉ 2–3 loại output; ngưỡng do quản lý đặt; chỉnh hằng tuần theo nút Không cần",
          ],
          ["**Output sai**", "Mỗi output có nguồn và cách tính; nút Không đúng ghi lại để sửa dữ liệu hoặc quy tắc"],
          [
            "**Hạ tầng trong nhà máy chưa sẵn sàng**",
            "Chốt máy chủ và GPU trước khởi động; tuần 1 chỉ cần kết nối dữ liệu",
          ],
          ["**Người dùng lo bị giám sát**", "Dữ liệu không dùng để đánh giá cá nhân; phân quyền theo vai trò"],
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
        text: "Thông tin về Takako: trao đổi giữa Takako và Celesnity ngày 09/10/2026 và phạm vi Takako xác nhận ngày 10/10/2026. Ảnh trang bìa: nhà máy Takako Việt Nam (Takako).",
      },
      {
        kind: "note",
        text: "*Các tình huống, mã hàng, máy, lệnh sản xuất, lô, quy tắc, ngưỡng và số liệu trong phần minh họa đều là mô phỏng, không phải dữ liệu của Takako.*",
      },
    ],
  },
];
