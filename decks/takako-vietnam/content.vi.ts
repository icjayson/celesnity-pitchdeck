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
  { n: 3, label: "III.", title: "Lộ trình triển khai" },
];

export const labels: DeckLabels = {
  sim: "Mô phỏng minh họa: dữ liệu dựng để trình bày, không phải số liệu của Takako.",
  simShort: "Mô phỏng minh họa",
  ai: "Minder AI soạn",
  future: "Hình dung khi triển khai",
  proposal: "Đề xuất, chốt cùng Takako",
  calculatorPrivacy: "",
  chatNotice:
    "Trợ lý chỉ trả lời về đề xuất này. Câu hỏi trên trang được xử lý bởi dịch vụ AI quốc tế; vui lòng không nhập dữ liệu nội bộ.",
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
      { kind: "note", text: "Chỉ đọc dữ liệu · Dữ liệu thuộc Takako · Con người quyết định" },
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
        text: "Celesnity trân trọng đề xuất triển khai **Minder AI, trợ lý vận hành chủ động của Takako**. Minder AI đặt trên ERP, MES-IoT và kho bản vẽ Takako đang có, chỉ đọc dữ liệu và nối dữ liệu theo mã hàng. Minder AI tự theo dõi, phát hiện thay đổi, soạn sẵn thông tin và báo đúng người quản lý, theo **quy tắc do chính quản lý Takako đặt**.",
      },
      {
        kind: "p",
        text: "**Tầm nhìn**\nMọi thông tin quản lý cần về sản xuất, vận hành, kế toán và tài nguyên kỹ thuật đều sẵn có, đúng, đủ và nhất quán, từ chính dữ liệu Takako đang sở hữu. Minder AI **tự học** dữ liệu và quy tắc của Takako, **dự báo trước** những điều sắp xảy ra ở máy móc và mã hàng, và **nhân rộng** sang nhà máy thứ hai.",
      },
      {
        kind: "p",
        text: "**Cách làm**\nBắt đầu nhỏ và chắc: ba ứng dụng trọng tâm trong 6 tuần pilot, gồm Trợ lý vận hành sản xuất cho Sản xuất và Vận hành, Trợ lý hỗ trợ kế toán cho Kế toán, Trợ lý quản lý bản vẽ kỹ thuật cho Tài nguyên kỹ thuật. Dữ liệu chỉ đọc, không thay phần mềm nào, không thay đổi quy trình đang chạy. Kỹ sư thực địa của Celesnity làm việc tại nhà máy cùng từng phòng; ngay tuần 1, hai bên đo số nền thời gian làm việc hiện tại và quản lý đặt quy tắc cho từng phần việc.",
      },
      {
        kind: "p",
        text: "**Kết quả dự kiến sau 6 tuần pilot**\nBa ứng dụng trọng tâm chạy thật trên dữ liệu của Takako. Thời gian cho công việc Minder AI đảm nhận được đo so với số nền tuần 1, ví dụ tình trạng một máy từ khoảng 30 phút xuống dưới 2 phút. 100% output có nguồn, và tỷ lệ đúng do chính người nhận xác nhận. Tại Giai đoạn 1, Takako quyết định mở rộng sang các ứng dụng tiếp theo, rồi sang nhà máy thứ hai.",
      },
      {
        kind: "p",
        text: "**Cam kết của Celesnity**\nDữ liệu thuộc Takako và chỉ được đọc theo quy tắc, phân quyền Takako duyệt; mô hình AI qua API trong giai đoạn chuyển tiếp, chuyển dần sang **Mô hình AI \"Newcomen\"** của Celesnity từ Giai đoạn 2. Minder AI không ghi vào hệ thống, không điều khiển máy, không tự đặt ngưỡng hay công thức. Phí gắn với KPI đã chốt trước khi bắt đầu. **Quản lý Takako luôn là người quyết định.**",
      },
      { kind: "p", text: "**Kính đề nghị Ban lãnh đạo**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Thống nhất định hướng:** triển khai Minder AI theo ba giai đoạn. Ba ứng dụng trọng tâm vận hành sản xuất, hỗ trợ kế toán và quản lý bản vẽ kỹ thuật là điểm khởi đầu; nhà máy thứ hai là đích đến.",
          "**Cử đầu mối:** đầu mối Sản xuất, Kỹ thuật, Kế toán và IT, cùng quản lý phụ trách mỗi mảng để đặt quy tắc ở tuần 1.",
          "**Cho phép kết nối chỉ đọc** vào ERP, MES-IoT và kho bản vẽ để đo số nền và khởi động Giai đoạn 1 vào cuối tháng 10/2026.",
        ],
      },
      {
        kind: "p",
        text: "**Tại buổi trình bày với IT và Ban lãnh đạo**, Celesnity đề xuất: đi qua ba ứng dụng trọng tâm trên dữ liệu mô phỏng; rà danh sách dữ liệu và cách kết nối cùng IT; thống nhất KPI, cách đo số nền và người xác nhận cho từng chỉ số.",
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
            "**Chính xác từ dữ liệu gốc**",
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
            "Giá trị của độ chính xác được lượng hóa bằng thời gian xử lý: so sánh trực tiếp số nền tuần 1 và kết quả tuần 6. Cam kết KPI gắn liền với chi phí.",
            "Thời gian truy xuất / tính toán nghiệp vụ thật giảm rõ rệt (ví dụ: từ 30 phút xuống < 2 phút).",
          ],
          [
            "**Chính xác về phân quyền & truy vết**",
            "Phân quyền chặt chẽ theo vai trò; ghi nhật ký (audit log) 100% câu hỏi, kết quả xuất ra và người truy cập.",
            "Minh bạch tuyệt đối, truy vết được nguyên nhân mọi kết quả trả về.",
          ],
          [
            "**Kiểm chứng chính xác trên phạm vi giới hạn**",
            "Không triển khai ồ ạt; khoanh vùng kiểm định độ chính xác trên 3 bài toán lõi (máy móc, giá thành, bản vẽ) ở chế độ chỉ đọc.",
            "Cổng nghiệm thu sau 6 tuần pilot: chỉ mở rộng khi độ chính xác đạt yêu cầu.",
          ],
          [
            "**Chính xác theo ngữ cảnh kỹ thuật nhà máy**",
            "Không trả lời chung chung; chỉ giải quyết bài toán nghiệp vụ chuyên sâu: lịch sử sự cố máy, bóc tách nguyên nhân đội giá thành theo công đoạn, phiên bản bản vẽ đang chạy.",
            "Tần suất sử dụng và tỷ lệ đánh giá \"Đúng nghiệp vụ\" của kỹ sư, kế toán hàng tuần.",
          ],
          [
            "**Chính xác trong liên kết chuỗi dữ liệu**",
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
    title: "Trợ lý AI vận hành trên nền hạ tầng sẵn có của Takako: Giữ nguyên mọi phần mềm, không đảo lộn quy trình",
    blocks: [
      {
        kind: "lead",
        text: "Minder AI kết nối dữ liệu từ ERP, MES-IoT và kho bản vẽ theo từng mã hàng, từ đó tự động xâu chuỗi dữ liệu theo mã hàng và phân phối thông tin đúng vai trò, đúng thời điểm.",
      },
      { kind: "module", id: "M21", variant: "architecture" },
      { kind: "module", id: "M21", variant: "buoc" },
      { kind: "note", text: "Khi được hỏi, Minder AI trả lời ngay, theo cùng quy tắc và cùng nguồn dữ liệu." },
      { kind: "h3", text: "Bốn mảng thông tin quản lý cần" },
      {
        kind: "cards",
        cols: 4,
        head: ["Mảng", "Nhu cầu thông tin", "Dữ liệu sẵn có"],
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
                    { nodes: [{ label: "MES-IoT", sub: "máy, sản lượng, cycle time, sửa chữa, bảo trì" }] },
                    { nodes: [{ label: "Tài liệu kế toán", sub: "đơn giá, chi phí, định mức" }] },
                    { nodes: [{ label: "Kho bản vẽ", sub: "mã hàng, phiên bản, ghi chú thay đổi" }] },
                    { nodes: [{ label: "Nguồn bên ngoài được phép", sub: "văn bản pháp luật theo danh sách được phép" }] },
                  ],
                  then: [],
                },
              ],
              via: "chỉ đọc",
              then: [
                { label: "Minder AI", sub: "xâu chuỗi theo mã hàng", tone: "platform" },
                { label: "Quy tắc do Quản lý phê duyệt", tone: "edge" },
                { label: "Quản lý theo vai trò", sub: "Sản xuất · Ban lãnh đạo · Kỹ thuật · Kế toán" },
              ],
            },
            legend: [
              { tone: "plain", label: "Hệ thống và người dùng của Takako" },
              { tone: "platform", label: "Minder AI" },
              { tone: "edge", label: "Quy tắc do Quản lý phê duyệt" },
            ],
          },
          {
            kind: "steps",
            head: ["Bước", "Minder AI làm gì"],
            rows: [
              ["**Giám sát liên tục**", "Đọc dữ liệu từ ERP, MES-IoT và kho bản vẽ, liên tục và theo lịch quản lý đặt"],
              ["**Phát hiện biến động**", "Nhận ra thay đổi vượt ngưỡng Takako thiết lập: sự cố máy, giá thành, phiên bản bản vẽ"],
              ["**Tổng hợp nguyên nhân**", "Viết bản tin, cảnh báo, báo cáo theo đúng quy tắc của quản lý phụ trách"],
              ["**Báo cáo đúng người**", "Chủ động gửi cảnh báo đến đúng người phụ trách, đúng thời điểm tác nghiệp"],
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
    title: "Ba ứng dụng trọng tâm Minder AI có thể triển khai tại Takako",
    blocks: [
      { kind: "lead", text: "Bao quát toàn diện 4 mảng vận hành trọng yếu. Khai thác 100% nền dữ liệu sẵn có ở chế độ chỉ đọc." },
      { kind: "module", id: "M21", variant: "ba-viec" },
    ],
    details: [
      {
        title: "Ba ứng dụng trọng tâm",
        printOnly: true,
        blocks: [
          {
            kind: "cards",
            cols: 3,
            head: ["Phần việc", "Quản lý nhận", "Minder AI tự gửi", "Trả lời khi được hỏi", "Dữ liệu"],
            rows: [
              [
                "**Trợ lý vận hành sản xuất** · Sản xuất và Vận hành",
                "Phòng Kỹ thuật, Phòng Sản xuất",
                "Bản tin sáng về các máy cần chú ý · Báo cáo bảo trì tuần soạn sẵn",
                "\"Tình trạng máy MC-07 trong 6 tháng qua?\" · \"Sản lượng và phế phẩm của mã hàng này tuần trước?\"",
                "MES-IoT: sự cố, sửa chữa, bảo trì, cycle time, sản lượng",
              ],
              [
                "**Trợ lý hỗ trợ kế toán** · Kế toán",
                "Phòng Kế toán",
                "Cảnh báo mã hàng vượt định mức kèm nguyên nhân và cách tính · Tính lại giờ máy và chi phí khi kế hoạch sản lượng thay đổi · Báo cáo giá thành tháng soạn sẵn · Tóm tắt văn bản pháp lý mới từ nguồn được phép",
                "\"Giá thành thực của mã hàng này tháng 9?\" · \"Nếu sản lượng tăng 20% thì giờ máy và chi phí thay đổi thế nào?\"",
                "ERP, MES-IoT, kho bản vẽ, nguồn pháp lý được phép",
              ],
              [
                "**Trợ lý quản lý bản vẽ kỹ thuật** · Tài nguyên kỹ thuật",
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
    title: "Quản lý thiết lập quy tắc. Minder AI vận hành chuẩn xác, đồng nhất 100%",
    blocks: [
      {
        kind: "lead",
        text: "Mỗi loại thông tin có một quy tắc do quản lý phụ trách đặt ra: dùng dữ liệu nào, tính thế nào, trình bày ra sao, gửi cho ai và khi nào. Minder AI chỉ làm theo quy tắc, nên số liệu chuẩn xác, output đúng định dạng đã đề ra và nhất quán giữa các người nhận, các ngày và các bộ phận.",
      },
      { kind: "module", id: "M21", variant: "quy-tac" },
      {
        kind: "note",
        text: "Giao diện thực tế từ Minder AI: Mỗi quy tắc do Takako ban hành được đóng gói thành một kỹ năng chuẩn hóa — bao gồm phạm vi dữ liệu, công thức tính và chỉ dẫn thực thi mà AI tuân thủ tuyệt đối.",
      },
      {
        kind: "steps",
        cols: 2,
        head: ["Bước", "Việc", "Thực hiện bởi"],
        rows: [
          ["**Thiết lập quy tắc**", "Chuẩn hóa nguồn dữ liệu sử dụng, công thức tính, ngưỡng cảnh báo, biểu mẫu báo cáo, danh sách người nhận và tần suất gửi", "Quản lý phụ trách"],
          ["**Áp dụng**", "Mọi báo cáo chủ động và câu trả lời nghiệp vụ đều tuân thủ 100% theo đúng bộ quy tắc đã phê duyệt", "Minder AI"],
          ["**Kiểm tra**", "Minh bạch dữ liệu gốc và công thức trong từng kết quả; người nhận trực tiếp đánh dấu phản hồi", "Người nhận"],
          [
            "**Điều chỉnh**",
            "Quản lý cập nhật quy tắc khi thực tế thay đổi; hệ thống áp dụng ngay và lưu vết toàn bộ nhật ký",
            "Quản lý phụ trách",
          ],
        ],
      },
    ],
    details: [
      {
        title: "Một quy tắc mẫu",
        printOnly: true,
        blocks: [
          { kind: "photo", photo: { src: "/decks/takako-vietnam/quy-tac-ke-hoach-san-luong.webp", alt: "Quy tắc Kế hoạch sản lượng & công suất trong Minder AI", width: 2000, height: 1119, caption: "Quy tắc Kế hoạch sản lượng & công suất" } },
          { kind: "photo", photo: { src: "/decks/takako-vietnam/quy-tac-nghiep-vu-ke-toan.webp", alt: "Quy tắc Nghiệp vụ kế toán (nguồn whitelist) trong Minder AI", width: 2000, height: 1119, caption: "Quy tắc Nghiệp vụ kế toán (nguồn whitelist)" } },
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
    title: "Dữ liệu thuộc Takako. Con người luôn là người quyết định cuối cùng",
    blocks: [
      { kind: "module", id: "M21", variant: "security" },
      { kind: "h3", text: "Cách triển khai" },
      {
        kind: "kv",
        rows: [
          ["**Hạ tầng triển khai**", "Kết nối chỉ đọc tới hệ thống sẵn có của Takako; giữ nguyên mọi phần mềm, không thay đổi quy trình đang chạy."],
          ["**Mô hình trí tuệ nhân tạo**", "Mô hình AI qua API trong giai đoạn chuyển tiếp; từ Giai đoạn 2 chuyển dần sang **Mô hình AI \"Newcomen\"** do Celesnity tự nghiên cứu, phát triển và vận hành trên hạ tầng của Celesnity."],
          ["**Cơ chế kết nối dữ liệu**", "Kết nối chế độ Chỉ đọc vào ERP, MES-IoT và kho bản vẽ; không có quyền ghi, không tác động cơ sở dữ liệu gốc."],
          ["**Kết nối ngoại vi**", "Thiết lập Danh sách trắng nghiêm ngặt; chỉ truy cập các nguồn dữ liệu được Takako phê duyệt trước (ví dụ: cổng thông tin văn bản pháp quy phục vụ kế toán)."],
          ["**Kiểm soát truy cập**", "Phân quyền chặt chẽ theo vai trò; mỗi nhân sự chỉ tiếp cận thông tin và báo cáo trong đúng phạm vi nhiệm vụ."],
          ["**Nhật ký truy vết & kiểm toán**", "Ghi nhận toàn diện nhật ký hệ thống: Lưu vết 100% lượt truy vấn, kết quả phản hồi và mọi thao tác hiệu chỉnh quy tắc."],
          ["**Tiêu chuẩn & pháp lý**", "Ký kết thỏa thuận bảo mật (**NDA**) trước khi khảo sát; quy trình kiểm soát an ninh thông tin tuân thủ tiêu chuẩn **ISO/IEC 27001**."],
          ["**Chủ quyền dữ liệu**", "Dữ liệu và tri thức vận hành thuộc quyền sở hữu duy nhất của Takako; **cam kết không dùng để huấn luyện mô hình chung bên ngoài.**"],
        ],
      },
      { kind: "h3", text: "Mô hình AI của Minder AI" },
      {
        kind: "steps",
        cols: 2,
        head: ["Thời điểm", "Mô hình AI"],
        rows: [
          ["**Giai đoạn 1**", "Mô hình AI qua API trong giai đoạn chuyển tiếp, theo cùng quy tắc, phân quyền và nhật ký"],
          [
            "**Từ Giai đoạn 2**",
            "Chuyển dần sang **Mô hình AI \"Newcomen\"** do Celesnity tự nghiên cứu, phát triển và vận hành trên hạ tầng của Celesnity; chuyển theo từng loại tác vụ, đối chiếu kết quả trước khi thay",
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
    eyebrow: "Triển khai Minder AI tại Takako",
    title: "Kiểm chứng từ 3 bài toán lõi, mở rộng phạm vi ứng dụng, tiến tới nhân rộng tại nhà máy thứ hai",
    blocks: [
      { kind: "module", id: "M8" },
      {
        kind: "p",
        text: "**Đồng nhất một nền tảng Minder AI - Kế thừa trọn vẹn bộ quy tắc quản trị - Nhất quán thước đo KPI.**\nMỗi giai đoạn mở rộng thêm bài toán nghiệp vụ mới trên chính nền tảng đã được kiểm chứng chắc chắn trước đó",
      },
      {
        kind: "label",
        variant: "proposal",
        text: "Giai đoạn 2 và 3 là hướng đề xuất; phạm vi và thứ tự do Takako quyết định sau mỗi cổng.",
      },
      { kind: "h3", text: "Nền tảng sẵn sàng nhân rộng sang nhà máy thứ hai" },
      {
        kind: "pillars",
        items: [
          "Nền tảng AI đã kiểm chứng thực tế",
          "Bộ quy tắc điều hành đã chuẩn hóa",
          "Khung chuẩn đo lường KPI & nghiệm thu",
          "Đội ngũ nội bộ làm chủ AI",
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
              ["**Nơi**", "Nhà máy thứ nhất · Sản xuất, Kỹ thuật, Kế toán", "Nhà máy thứ nhất · các phòng ban", "Nhà máy thứ hai"],
              ["**Vai trò**", "Nơi bắt đầu", "Mở rộng ứng dụng", "**Đích đến**"],
              ["**Thời gian**", "Pilot 6 tuần", "Sau Giai đoạn 1", "Sau Giai đoạn 2"],
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
    title: "Triển khai qua 3 giai đoạn",
    blocks: [
      { kind: "module", id: "M15" },
      { kind: "h3", text: "Ứng dụng có thể triển khai ở Giai đoạn 2" },
      { kind: "module", id: "M21", variant: "gd2" },
      { kind: "h3", text: "Lộ trình chi tiết giai đoạn 1" },
      {
        kind: "timeline",
        head: ["Tuần", "Mốc tiến độ", "Minder AI", "Takako"],
        rows: [
          [
            "**1**",
            "Kết nối dữ liệu & Đo lường số nền (Baseline)",
            "Kết nối chỉ đọc (Read-only) vào ERP, MES-IoT, kho bản vẽ; đo lường chính xác thời gian xử lý tác vụ hiện tại.",
            "Quản lý thiết lập bộ quy tắc, ngưỡng kiểm soát và danh sách nhân sự phụ trách cho từng bài toán.",
          ],
          [
            "**2**",
            "Phát hành kết quả đầu tiên (Thử nghiệm hẹp)",
            "Tự động gửi bản tin, cảnh báo và dự thảo báo cáo thử nghiệm tới nhóm 2–3 nhân sự nòng cốt ở mỗi bài toán.",
            "Nhân sự tiếp nhận thẩm định độ chính xác và phản hồi trực tiếp trên từng kết quả.",
          ],
          [
            "**3–5**",
            "Vận hành thực tế diện rộng & Tinh chỉnh",
            "Mở rộng phân phối báo cáo cho toàn bộ nhân sự liên quan; phản hồi tức thì các câu hỏi truy vấn phát sinh.",
            "Quản lý theo dõi, tinh chỉnh quy tắc và ngưỡng dựa trên dữ liệu đánh giá thực tế.",
          ],
          [
            "**6**",
            "Nghiệm thu KPI & phê duyệt giai đoạn pilot",
            "Xuất báo cáo tổng kết KPI đối soát độc lập với số nền đo được ở Tuần 1.",
            "Ban lãnh đạo Takako nghiệm thu kết quả và phê duyệt triển khai Giai đoạn 2.",
          ],
        ],
      },
      { kind: "label", variant: "proposal", text: "Dự kiến khởi động: Cuối tháng 10/2026 · Nghiệm thu Giai đoạn 1: Đầu tháng 12/2026." },
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
                "**Giai đoạn 1 · Pilot 6 tuần**",
                "Ba ứng dụng trọng tâm: vận hành sản xuất, hỗ trợ kế toán, quản lý bản vẽ kỹ thuật. Minder AI học dữ liệu, công thức và quy tắc của Takako. **Tự học**",
                "Takako chấm KPI",
              ],
              [
                "**Giai đoạn 2**",
                "Nhận thêm các ứng dụng Takako đã nêu, từ báo cáo điều đã xảy ra sang cảnh báo điều sắp xảy ra. **Dự báo trước**",
                "Takako chọn ứng dụng tiếp theo",
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
          [
            "**Tuần 1**",
            "Đo số nền và chốt golden set cùng Takako: thời gian trả lời, thời gian làm báo cáo, thời gian từng quy trình, chỉ số kinh doanh hiện tại",
            "Số nền (baseline) được hai bên xác nhận",
          ],
          [
            "**Tuần 2–5**",
            "Minder AI làm việc hằng ngày; người nhận đánh dấu từng output; ghi nhận hành động tiếp theo trên MES và ERP",
            "Dữ liệu đo thật, cập nhật mỗi tuần",
          ],
          [
            "**Tuần 6**",
            "So sánh với tuần 1: chấm năm KPI pilot, báo cáo tác động lên quy trình và kinh doanh",
            "Giai đoạn 1: Takako quyết định bước tiếp theo",
          ],
        ],
      },
      { kind: "h3", text: "KPI giai đoạn và tác động lên quy trình, kinh doanh" },
      { kind: "module", id: "M21", variant: "kpi" },
      { kind: "h3", text: "Phí gắn với kết quả" },
      {
        kind: "list",
        items: [
          "**Một phần cố định nhỏ** cho kỹ sư Celesnity làm việc tại nhà máy.",
          "**Phần còn lại chỉ trả khi đạt năm KPI pilot** đã chốt trước khi bắt đầu.",
          "**Từ Giai đoạn 2:** hợp đồng theo từng giai đoạn, phí gắn thêm với tác động lên quy trình và kinh doanh đã chốt cùng Takako.",
        ],
      },
      { kind: "label", variant: "proposal", text: "Mức phí cụ thể nằm trong đề xuất gửi kèm." },
    ],
    details: [
      {
        title: "Bảng KPI chi tiết",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            caption: "Tầng 1 · Khung KPI nghiệm thu pilot (Giai đoạn 1): nghiệm thu tại Tuần 6, điều kiện giải ngân phí Pilot",
            head: ["KPI", "Cách đo", "Mục tiêu đề xuất"],
            rows: [
              [
                "**Thời gian truy xuất tình trạng máy**",
                "Số nền tuần 1 so với tuần 5 đến 6",
                "Rút ngắn từ ~30 phút xuống **dưới 2 phút**.",
              ],
              [
                "**Độ chính xác nghiệp vụ**",
                "Chấm trên golden set: bộ câu hỏi và đáp án chuẩn Takako xác nhận ở tuần 1",
                "**≥ 90%** (hoặc ngưỡng thống nhất cùng Takako, do chính người dùng thẩm định).",
              ],
              [
                "**Minh bạch nguồn gốc dữ liệu**",
                "Kiểm tra tự động",
                "**100%** kết quả có trích dẫn bản ghi gốc và công thức tính.",
              ],
              [
                "**Thời gian lập báo cáo bảo trì định kỳ**",
                "Số nền tuần 1 so với sau pilot",
                "Giảm thiểu đáng kể thời gian tổng hợp (thống nhất mục tiêu cụ thể cùng Takako).",
              ],
              [
                "**Mức độ chấp nhận & sử dụng thực tế**",
                "Số người dùng và số truy vấn mỗi tuần",
                "Đo lường tần suất đọc báo cáo, mức độ tương tác và câu hỏi truy vấn hàng tuần.",
              ],
            ],
          },
          {
            kind: "table",
            caption: "Tầng 2 · Tác động lên quy trình và kinh doanh: đo trong pilot, mục tiêu chốt ở Giai đoạn 2",
            head: ["KPI", "Cách đo", "Mục tiêu đề xuất"],
            rows: [
              [
                "**Vận hành sản xuất · Thời gian phát hiện bất thường của máy**: dừng lặp lại, cycle time tăng, mất dữ liệu",
                "Từ lúc dấu hiệu xuất hiện trên MES-IoT tới lúc quản lý phụ trách nhận cảnh báo, so với số nền tuần 1",
                "Trước ca làm việc kế tiếp, qua bản tin sáng",
              ],
              [
                "**Vận hành sản xuất · Tỷ lệ cảnh báo máy có hành động tiếp theo**",
                "Đối chiếu cảnh báo với lệnh kiểm tra, sửa chữa, bảo trì trên MES trong 48 giờ",
                "Chốt cùng Takako",
              ],
              [
                "**Hỗ trợ kế toán · Thời gian phát hiện mã hàng vượt định mức**",
                "Từ lúc chi phí phát sinh tới lúc Phòng Kế toán nhận cảnh báo, so với số nền tuần 1",
                "Trong tuần phát sinh, không chờ chốt sổ cuối tháng",
              ],
              [
                "**Hỗ trợ kế toán · Thời gian tính lại giờ máy và chi phí khi kế hoạch thay đổi**",
                "Từ lúc kế hoạch sản lượng trên ERP thay đổi tới lúc có bản tính lại",
                "Trong ngày kế hoạch thay đổi",
              ],
              [
                "**Hỗ trợ kế toán · Số ngày chốt báo cáo giá thành tháng**",
                "So với tháng gần nhất trước pilot",
                "Giảm; mức cụ thể chốt cùng Takako",
              ],
              [
                "**Quản lý bản vẽ kỹ thuật · Lệnh, lô dùng phiên bản cũ được phát hiện trước khi gia công**",
                "Đếm cảnh báo phiên bản được xác nhận đúng, đối chiếu thời điểm bắt đầu gia công",
                "Báo trước khi gia công; tỷ lệ chốt cùng Takako",
              ],
              [
                "**Kinh doanh · Giá trị chênh lệch giá thành được phát hiện sớm**",
                "Tổng chênh lệch (VND) của các mã hàng được cảnh báo trước khi chốt sổ tháng",
                "Đo số nền tuần 1, theo dõi xu hướng trong pilot; mục tiêu chốt ở Giai đoạn 2",
              ],
              [
                "**Kinh doanh · Giờ dừng máy ngoài kế hoạch**",
                "MES-IoT, trên nhóm máy được Minder AI theo dõi",
                "Đo số nền tuần 1, theo dõi xu hướng trong pilot; mục tiêu chốt ở Giai đoạn 2",
              ],
              [
                "**Kinh doanh · Phế phẩm và làm lại do sai phiên bản bản vẽ**",
                "Đối chiếu phế phẩm, làm lại với phiên bản bản vẽ của lệnh và lô",
                "Đo số nền tuần 1, theo dõi xu hướng trong pilot; mục tiêu chốt ở Giai đoạn 2",
              ],
              [
                "**Kinh doanh · Thời gian hoàn thiện báo cáo và câu trả lời nghiệp vụ**",
                "Mốc thời gian Minder AI tự ghi: từ lúc dữ liệu đủ hoặc câu hỏi được đặt tới lúc báo cáo, câu trả lời hoàn chỉnh được gửi; số nền tuần 1 lấy mẫu từ email, file và lịch sử ERP",
                "Giảm so với số nền tuần 1; tỷ lệ đúng hạn chốt cùng Takako",
              ],
            ],
          },
        ],
      },
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
                "Ba ứng dụng trọng tâm chạy thật trên dữ liệu của chính Takako sau 6 tuần · Thời gian làm việc giảm, đo bằng số nền tuần 1 · Quy tắc trả lời do quản lý Takako đặt và giữ · Lộ trình có cổng: Takako quyết định ở mỗi bước",
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
        cols: 3,
        head: ["Bên", "Vai trò"],
        rows: [
          [
            "**Takako**",
            "Chủ trì; chọn người nhận; quản lý đặt quy tắc và ngưỡng; xác nhận KPI; cấp quyền truy cập dữ liệu chỉ đọc",
          ],
          ["**Đối tác kết nối dữ liệu nhà máy**", "Đầu mối kết nối ERP, MES-IoT và kho bản vẽ"],
          ["**Celesnity**", "Nền tảng Minder AI; kỹ sư làm việc tại nhà máy; xây các phần việc; đo KPI"],
        ],
      },
      { kind: "h3", text: "Bước tiếp theo: khởi động cuối tháng 10, có kết quả đầu tháng 12" },
      {
        kind: "kv",
        rows: [
          ["**16/10/2026**", "Gửi đề xuất triển khai"],
          ["**Tuần 19/10**", "Trình bày với IT và Ban lãnh đạo Takako"],
          ["**Cuối tháng 10**", "Khởi động Giai đoạn 1: kết nối dữ liệu, đo số nền, quản lý đặt quy tắc"],
          ["**Đầu tháng 12**", "Kết quả Giai đoạn 1"],
        ],
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
      "Ba ứng dụng trọng tâm chạy thật trên dữ liệu của chính Takako sau 6 tuần",
      "Thời gian làm việc giảm, đo bằng số nền tuần 1",
      "Quy tắc trả lời do quản lý Takako đặt và giữ",
      "Lộ trình có cổng: **Takako quyết định ở mỗi bước**",
      "Dữ liệu, quy tắc và nhật ký thuộc Takako",
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
    body: "Minder AI và các ứng dụng trên cùng nền tảng: **Trợ lý vận hành sản xuất · Trợ lý hỗ trợ kế toán · Trợ lý quản lý bản vẽ kỹ thuật** ở Giai đoạn 1, thêm ứng dụng ở Giai đoạn 2. Mô hình AI qua API trong giai đoạn chuyển tiếp, chuyển dần sang Mô hình AI \"Newcomen\" của Celesnity từ Giai đoạn 2. Quy tắc trả lời do quản lý Takako đặt",
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
          "**MES-IoT:** dữ liệu máy, sản lượng, cycle time, sự cố, sửa chữa, bảo trì. Chỉ đọc.",
          "**ERP và kế toán:** qua API, database view hoặc file xuất định kỳ. Chỉ đọc.",
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
    title: "Hạ tầng và mô hình AI",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "**Mô hình AI:** qua API trong giai đoạn chuyển tiếp; từ Giai đoạn 2 chuyển dần sang **Mô hình AI \"Newcomen\"** do Celesnity tự nghiên cứu, phát triển và vận hành trên hạ tầng của Celesnity. Kết nối tới nguồn bên ngoài chỉ theo danh sách được phép.",
          "**Phân quyền và nhật ký:** quyền theo vai trò; mọi truy vấn, output và lần sửa quy tắc được ghi nhật ký.",
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
          "**Dữ liệu của Takako được bảo vệ thế nào?** Minder AI chỉ đọc dữ liệu Takako cho phép, theo quy tắc và phân quyền Takako duyệt, và ghi nhật ký mọi truy vấn. Dữ liệu thuộc Takako. Kết nối tới nguồn bên ngoài chỉ theo danh sách được phép. Mô hình AI qua API trong giai đoạn chuyển tiếp, chuyển dần sang **Mô hình AI \"Newcomen\"** của Celesnity từ Giai đoạn 2.",
          "**Nếu Minder AI sai thì sao?** Mỗi output có nguồn và cách tính để người nhận kiểm tra. Bấm \"Không đúng\" thì lỗi được ghi lại, rồi sửa dữ liệu hoặc quy tắc. Tỷ lệ đúng là một KPI của Giai đoạn 1.",
          "**Quy tắc do ai đặt, đổi thế nào?** Quản lý phụ trách từng mảng đặt quy tắc: dữ liệu dùng, cách tính, ngưỡng, định dạng, người nhận, thời điểm. Quản lý sửa khi cần; Minder AI áp dụng từ lần sau và ghi lại lịch sử thay đổi.",
          "**Minder AI có tự gửi quá nhiều thông tin không?** Giai đoạn 1 chỉ có 2–3 loại output cho mỗi phần việc. Ngưỡng do quản lý đặt và được chỉnh mỗi tuần theo nút \"Không cần\".",
          "**Tuần 1 cần gì từ Takako?** Quyền truy cập chỉ đọc vào ERP, MES-IoT và kho bản vẽ; một đầu mối ở mỗi bộ phận; quản lý đặt quy tắc ban đầu; vài giờ để đo thời gian làm việc hiện tại.",
          "**Vì sao Giai đoạn 1 chưa làm giám sát quy trình xưởng hay đôn đốc tiến độ?** Đó là các ứng dụng cần gần như mọi hệ thống. Bắt đầu từ ba ứng dụng trọng tâm có dữ liệu sẵn sàng và đo được ngay, rồi mở rộng khi Takako quyết định.",
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
