/**
 * Dữ liệu module của deck Nestlé Trị An (M1, M3, M5, M6, M10, M13, M15, M16, M17).
 * Khớp docs/nestle-content-v2.md. Số nhân sự và ngưỡng là đề xuất, chốt sau khảo sát; mọi kịch bản là minh họa.
 */
import type { DeckData, IncidentCard, MonthRow, RoadmapPhase, StaffRow } from "../types";

type Scenarios = DeckData["scenarios"];

// ───────────── M5: Một ngày ─────────────
export const m5: Scenarios["m5"] = {
  events: [
    {
      time: "06:00",
      place: "Dây chuyền NESCAFÉ Dolce Gusto, Trị An",
      island: "dolce-gusto",
      text: "Kiểm tra sẵn sàng trước ca: công thức, lô bột, lô vỏ viên nang, lô hộp, QA release, vệ sinh. Một lô hộp chưa nhận kho được đánh dấu trước khi chạy. Trưởng ca xử lý",
      approve: "Xác nhận sẵn sàng",
    },
    {
      time: "09:30",
      place: "Jar Line, Trị An",
      island: "tri-an",
      text: "Jar Line tăng tốc theo kế hoạch. Mô hình dự báo điểm nghẽn chuyển sang khâu cấp bột sau 3 giờ và đề xuất điều chỉnh. Trưởng ca quyết định với đầy đủ dự báo",
      approve: "Duyệt điều chỉnh",
    },
    {
      time: "11:00",
      place: "Khu sấy, Trị An",
      island: "tri-an",
      text: "Viên nang và hũ cùng cần bột. Tác nhân AI đề xuất thứ tự mẻ sấy để cả hai dây chuyền đủ bột mà không dừng chờ. Kế hoạch chọn phương án",
      approve: "Chọn thứ tự mẻ",
    },
    {
      time: "14:00",
      place: "Nhà máy Bình An",
      island: "nestle-vn",
      text: "Hai bồn cùng cần CIP. Mô hình dự báo thời điểm mỗi bồn sẵn sàng và tác động lên máy chiết rót. Kế hoạch viên chọn thứ tự",
      approve: "Chọn thứ tự CIP",
    },
    {
      time: "16:30",
      place: "Nhà máy Đồng Nai",
      island: "nestle-vn",
      text: "Độ ẩm khu đóng gói bột tăng. Mô hình dùng kinh nghiệm truy vết từ Trị An để chỉ ra các lô cần theo dõi. QA quyết định",
      approve: "Xác nhận lô theo dõi",
    },
    {
      time: "Cuối ngày",
      place: "Nestlé Việt Nam",
      island: "all",
      text: "Mọi quyết định trong ngày và kết quả của chúng quay về mô hình. **Ngày mai, mọi nhà máy thông minh hơn hôm nay**",
    },
  ],
};

// ───────────── M6: Thử làm trưởng ca ─────────────
const samples = [
  "Phòng 2 độ ẩm lại vượt, line 2 dừng từ 10 giờ 15, đang chạy lô P102.",
  "Line 2 định lượng viên Latte lệch nặng, cân kiểm tra ba lần liền vượt mục tiêu, lô P104.",
  "Máy đóng hộp line 3 dừng ngắn liên tục từ đầu ca, kẹt hộp ở cửa vào.",
];

const fallback: Record<string, IncidentCard> = {
  [samples[0]]: {
    khu_vuc: "Phòng kiểm soát 2",
    su_co: "Độ ẩm vượt giới hạn, lặp lại",
    thoi_gian: "10:15",
    day_chuyen: "Line 2",
    lo: "P102",
    muc_do: "Cao",
    thong_tin_con_thieu: ["Thời gian kết thúc sự cố", "Mẻ đang chiết rót", "Độ ẩm đo được cao nhất"],
    la_su_co: true,
  },
  [samples[1]]: {
    khu_vuc: "Khu chiết rót",
    su_co: "Định lượng lệch mục tiêu, lặp lại",
    thoi_gian: "",
    day_chuyen: "Line 2",
    lo: "P104",
    muc_do: "Trung bình",
    thong_tin_con_thieu: ["Kết quả cân kiểm tra", "Thời điểm bắt đầu lệch", "Đầu chiết rót liên quan"],
    la_su_co: true,
  },
  [samples[2]]: {
    khu_vuc: "Khu đóng gói",
    su_co: "Dừng ngắn lặp lại do kẹt hộp",
    thoi_gian: "",
    day_chuyen: "Line 3",
    lo: "",
    muc_do: "Cao",
    thong_tin_con_thieu: ["Số lô đang chạy", "Lô hộp đang dùng", "Số lần dừng trong ca"],
    la_su_co: true,
  },
};

export const m6: Scenarios["m6"] = {
  kind: "incident",
  samples,
  fallback,
  copy: {
    channel: "Kênh báo sự cố · dây chuyền viên nang",
    prompt: "Nói vào bộ đàm hoặc gõ lời báo sự cố",
    promptNoSpeech: "Gõ lời báo sự cố như trưởng ca nói",
    placeholder: "Ví dụ: Phòng 2 độ ẩm lại vượt, line 2 dừng từ 10 giờ 15…",
    submit: "Lập thẻ sự cố",
    micLabel: "Bấm để nói lời báo sự cố",
    steps: ["Nói hoặc gõ lời báo sự cố", "AI lập thẻ sự cố", "Mô hình tính tác động lên kế hoạch", "Trưởng phòng Sản xuất duyệt phương án"],
    idleTitle: "Thẻ sự cố sẽ hiện ở đây",
    loading: "Đang lập thẻ sự cố từ lời báo…",
    notFaultTitle: "Chưa nhận ra đây là báo sự cố, Quý vị thử lại",
    notFaultHint: "Hãy nói như trưởng ca báo sự cố: khu vực hay dây chuyền nào, lô nào, hiện tượng gì, từ lúc nào. Hoặc chạm một câu mẫu.",
    aiLabel: "AI thật: trích xuất thẻ sự cố từ lời nói",
  },
  impact: [
    { label: "Thời gian không sản xuất được", value: "5,7 giờ" },
    { label: "Mục tiêu SKU Latte hôm nay", value: "Thiếu 31.400 viên" },
    { label: "Chuyển đổi sang SKU Espresso", value: "Trễ 4,2 giờ" },
    { label: "Đơn hàng", value: "2 đơn xuất khẩu có thể bị ảnh hưởng" },
  ],
  options: [
    { id: "A", label: "Tăng ca Line 2", recovered: "~28.000 viên", onTime: "1/2", cost: "4 giờ tăng ca", check: "Lịch vệ sinh Line 2 bị dời" },
    {
      id: "B",
      label: "Chuyển SKU Espresso sang Line 3",
      recovered: "~31.000 viên",
      onTime: "2/2",
      cost: "1 lần chuyển đổi thêm",
      check: "Line 3 tương thích công thức",
      recommended: true,
    },
    { id: "C", label: "Sắp xếp lại SKU ngày mai", recovered: "~19.000 viên", onTime: "1/2", cost: "Không", check: "Lô vỏ viên nang cho SKU được dời lên" },
    { id: "D", label: "Giữ kế hoạch", recovered: "0", onTime: "0/2", cost: "Không", check: "—" },
  ],
};

// ───────────── M10: 12 tháng ─────────────
const shareFor = (m: number) =>
  m <= 4 ? { celesnity: 90, partner: 10 } : m <= 8 ? { celesnity: 50, partner: 50 } : { celesnity: 20, partner: 80 };
const peopleFor = (m: number) =>
  m <= 4 ? { celesnity: 4, partnerTeam: 2 } : m <= 8 ? { celesnity: 3.5, partnerTeam: 3 } : { celesnity: 3, partnerTeam: 4 };

const P1 = "Thử nghiệm: Học";
const P2 = "Dùng thật";
const P3 = "Nhân rộng";
const rawMonths: Omit<MonthRow, "share" | "people">[] = [
  { m: 1, phase: P1, useCase: "Ứng dụng 01 dùng thật", expansion: "", data: "Môi trường được IT/OT duyệt · kết nối chỉ đọc · bản đồ trạng thái dây chuyền", it: "Học việc", gate: "Cổng 1", live: ["UC0"], itLevel: "Học việc" },
  { m: 2, phase: P1, useCase: "Ứng dụng 02 thi trên lịch sử", expansion: "", data: "Bộ đề thi kín", it: "Học việc", gate: "", live: ["UC0"], itLevel: "Học việc" },
  { m: 3, phase: P1, useCase: "Ứng dụng 03 thi trên lịch sử", expansion: "", data: "Nối dữ liệu kế hoạch và đơn hàng", it: "Học việc", gate: "", live: ["UC0"], itLevel: "Học việc" },
  { m: 4, phase: P1, useCase: "Kết quả thi", expansion: "", data: "", it: "Tự chạy 1 vòng", gate: "Cổng 2", live: ["UC0"], itLevel: "Bậc 1: tự chạy 1 vòng" },
  { m: 5, phase: P2, useCase: "Ứng dụng 02 dùng thật", expansion: "", data: "Mở cho QA và trưởng ca", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1"], itLevel: "Cùng vận hành" },
  { m: 6, phase: P2, useCase: "Ứng dụng 03 dùng thật", expansion: "", data: "Mở cho Kế hoạch", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1", "UC2"], itLevel: "Cùng vận hành" },
  { m: 7, phase: P2, useCase: "Ứng dụng 04 định lượng", expansion: "", data: "Nối dữ liệu cân kiểm tra", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1", "UC2", "UC3"], itLevel: "Cùng vận hành" },
  { m: 8, phase: P2, useCase: "Ứng dụng 05 dừng ngắn, chuyển đổi", expansion: "Khảo sát Jar Line và các dây chuyền khác", data: "", it: "Tự vận hành 4 tuần", gate: "Cổng 3", live: ["UC0", "UC1", "UC2", "UC3", "UC4"], itLevel: "Bậc 1: tự vận hành 4 tuần" },
  { m: 9, phase: P3, useCase: "Ứng dụng 06 sẵn sàng, bảo trì", expansion: "Jar Line", data: "Dữ liệu dây chuyền mới", it: "Tự vận hành", gate: "", live: ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"], itLevel: "Tự vận hành" },
  { m: 10, phase: P3, useCase: "Các dây chuyền viên nang và túi khác", expansion: "Các dây chuyền viên nang và túi khác", data: "", it: "Tự vận hành", gate: "", live: ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"], itLevel: "Tự vận hành" },
  { m: 11, phase: P3, useCase: "Khu chiết xuất và sấy · kế hoạch chung", expansion: "Khu chiết xuất và sấy · kế hoạch chung", data: "Dữ liệu khu bột", it: "Tự huấn luyện lại", gate: "", live: ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"], itLevel: "Bậc 2: tự huấn luyện lại" },
  { m: 12, phase: P3, useCase: "Báo cáo kỹ thuật chung", expansion: "Kế hoạch cho nhà máy Nestlé thứ hai", data: "", it: "Dẫn dắt khảo sát nhà máy thứ hai", gate: "Cổng 4", live: ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"], itLevel: "Bậc 3: dẫn dắt khảo sát nhà máy thứ hai" },
];

export const m10: Scenarios["m10"] = {
  months: rawMonths.map((r) => ({ ...r, share: shareFor(r.m), people: peopleFor(r.m) })),
  gates: [
    { m: 1, name: "Cổng 1" },
    { m: 4, name: "Cổng 2" },
    { m: 8, name: "Cổng 3" },
    { m: 12, name: "Cổng 4" },
  ],
  finale: {
    headline: "Đội Trị An tự vận hành; kế hoạch chung cho toàn nhà máy",
    next: "Năm thứ 2: đội Trị An dẫn dắt nhân rộng sang nhà máy Nestlé thứ hai",
  },
  chips: [
    { id: "UC0", short: "Báo cáo ca" },
    { id: "UC1", short: "Truy vết sự cố" },
    { id: "UC2", short: "Kế hoạch, phục hồi" },
    { id: "UC3", short: "Định lượng" },
    { id: "UC4", short: "Dừng ngắn, chuyển đổi" },
    { id: "UC5", short: "Sẵn sàng, bảo trì" },
  ],
  lane: {
    title: "Làn nhân rộng",
    opensAt: 8,
    openNote: "mở từ T+8",
    closedNote: "xuất hiện từ T+8",
    pending: "Sau Cổng 3, hệ thống mở rộng ra toàn nhà máy Trị An.",
  },
  partnerShareNote: "phần vận hành của đội Trị An",
};

// ───────────── M15: Tổng quan giai đoạn ─────────────
const phases: RoadmapPhase[] = [
  {
    id: "thu-nghiem",
    n: "01",
    name: "Thử nghiệm",
    months: "T+1–T+4",
    span: 4,
    goal: "Chứng minh trên dữ liệu của chính Trị An, với bộ đề thi kín do Nestlé giữ",
    apps: [
      { name: "Báo cáo ca tự động", when: "Dùng thật từ T+1" },
      { name: "Truy vết sự cố môi trường", when: "Thi trên lịch sử từ T+2" },
      { name: "Kế hoạch sản xuất và phục hồi", when: "Thi trên lịch sử từ T+3" },
    ],
    gates: [
      { name: "Cổng 1", when: "T+1", pass: "Dữ liệu đủ để làm; thỏa thuận dữ liệu đã ký" },
      { name: "Cổng 2", when: "T+4", pass: "Truy đúng lô ở ≥95% sự cố cũ; lịch đề xuất thỏa 100% ràng buộc cứng và không kém kế hoạch đã dùng" },
    ],
    ops: { celesnity: 90, partner: 10 },
    opsNote: "Đội Trị An học việc, tự chạy 1 vòng dữ liệu ở T+4",
    team: { celesnity: "~4 người", partnerTeam: "2 người" },
    people: { celesnity: 4, partnerTeam: 2 },
    outcomes: ["Mô hình v0.1", "Kết quả thi trên lịch sử", "Bằng chứng chuyển giao"],
  },
  {
    id: "trien-khai",
    n: "02",
    name: "Triển khai",
    months: "T+5–T+8",
    span: 4,
    goal: "Dùng dự báo cho quyết định thật trên dây chuyền Dolce Gusto; mở thêm định lượng, dừng ngắn và chuyển đổi",
    apps: [
      { name: "Truy vết sự cố môi trường", when: "Triển khai từ T+5" },
      { name: "Kế hoạch sản xuất và phục hồi", when: "Triển khai từ T+6" },
      { name: "Định lượng chiết rót", when: "Triển khai từ T+7" },
      { name: "Dừng ngắn, điểm nghẽn và chuyển đổi", when: "Triển khai từ T+8" },
    ],
    gates: [{ name: "Cổng 3", when: "T+8", pass: "≥20 ca thật dùng dự báo; đội Trị An tự vận hành 4 tuần" }],
    ops: { celesnity: 50, partner: 50 },
    opsNote: "Hai bên cùng vận hành",
    team: { celesnity: "~3,5 người", partnerTeam: "3 người" },
    people: { celesnity: 3.5, partnerTeam: 3 },
    outcomes: ["Dự báo dùng trên ca thật", "Đội Trị An tự vận hành 4 tuần", "Duyệt mở rộng toàn nhà máy"],
  },
  {
    id: "nhan-rong",
    n: "03",
    name: "Nhân rộng",
    months: "T+9–T+12",
    span: 4,
    goal: "Mở rộng ra toàn nhà máy Trị An; một kế hoạch chung cho mọi dây chuyền dùng chung nguồn bột",
    apps: [
      { name: "Sẵn sàng sản xuất và cửa sổ bảo trì", when: "Triển khai từ T+9" },
      { name: "Jar Line", when: "T+9" },
      { name: "Các dây chuyền viên nang và túi khác", when: "T+10" },
      { name: "Khu chiết xuất và sấy", when: "T+11" },
    ],
    gates: [{ name: "Cổng 4", when: "T+12", pass: "Tài chính xác nhận giá trị ≥ ngưỡng hòa vốn; đội Trị An tự huấn luyện lại" }],
    ops: { celesnity: 20, partner: 80 },
    opsNote: "Đội Trị An tự vận hành, tự huấn luyện lại ở T+11",
    team: { celesnity: "~3 người", partnerTeam: "4 người" },
    people: { celesnity: 3, partnerTeam: 4 },
    outcomes: ["Báo cáo kỹ thuật chung", "Kế hoạch chung toàn nhà máy", "Kế hoạch cho nhà máy thứ hai"],
  },
  {
    id: "nam-2",
    n: "04",
    name: "Năm thứ 2 · Nestlé Việt Nam",
    months: "Năm thứ 2",
    span: 3,
    goal: "Đội Trị An dẫn dắt mang vòng quyết định sang nhà máy Nestlé thứ hai tại Việt Nam",
    apps: [
      { name: "Nhà máy thứ hai (Đồng Nai, Bình An hoặc Bông Sen)", when: "Chọn qua khảo sát" },
      { name: "Khảo sát và bộ đề thi riêng cho nhà máy mới", when: "Hướng đề xuất, xác định cùng Nestlé" },
    ],
    gates: [],
    ops: null,
    opsNote: "Trị An dẫn dắt · Celesnity hỗ trợ",
    team: { celesnity: "Hỗ trợ", partnerTeam: "Dẫn dắt" },
    outcomes: ["Thử nghiệm tại nhà máy thứ hai", "Đo chi phí chuyển giao", "Đồng tác giả báo cáo kỹ thuật"],
    lead: true,
  },
];

export const roadmap: Scenarios["roadmap"] = {
  phases,
  itSteps: [
    { label: "Học việc", when: "T+1", m: 1 },
    { label: "Tự chạy 1 vòng", when: "T+4", m: 4 },
    { label: "Cùng vận hành", when: "T+5", m: 5 },
    { label: "Tự vận hành 4 tuần", when: "T+8", m: 8 },
    { label: "Tự vận hành", when: "T+9", m: 9 },
    { label: "Tự huấn luyện lại", when: "T+11", m: 11 },
    { label: "Dẫn dắt khảo sát nhà máy thứ hai", when: "T+12", m: 12 },
    { label: "Dẫn dắt nhân rộng", when: "Năm thứ 2", m: 13 },
  ],
  phaseEndMonth: { "thu-nghiem": 4, "trien-khai": 8, "nhan-rong": 12, "nam-2": 13 },
  noGateNote: "Ban chỉ đạo duyệt khảo sát và phạm vi thử nghiệm tại nhà máy thứ hai",
};

// ───────────── M16: Nhân sự ─────────────
const staffRows: StaffRow[] = [
  {
    team: "Celesnity",
    tone: "blue",
    cells: [
      { count: 4, approx: true, roles: ["Quản lý triển khai ½", "FDE tại Trị An 1,5", "Kỹ sư AI 1", "Kỹ sư dữ liệu ½", "Nghiên cứu ½"] },
      { count: 3.5, approx: true, roles: ["Quản lý ½", "FDE 1", "Kỹ sư AI 1", "Kỹ sư dữ liệu ½", "Nghiên cứu ½"] },
      { count: 3, approx: true, roles: ["Quản lý ½", "FDE 1", "Kỹ sư AI 1", "Nghiên cứu ½"] },
    ],
  },
  {
    team: "Đội Trị An",
    note: "Vận hành hệ thống",
    tone: "orange",
    cells: [
      { count: 2, roles: ["Đầu mối IT/OT", "Kỹ sư quy trình (CI)"] },
      { count: 3, roles: ["+ Kỹ sư dữ liệu"] },
      { count: 4, roles: ["+ Kỹ sư vận hành mô hình"] },
    ],
  },
  {
    team: "Chuyên gia nghiệp vụ Trị An",
    tone: "orange",
    cells: [
      { count: null, roles: ["Kế hoạch, Sản xuất ~4 giờ/tuần mỗi người", "QA, đầu mối dữ liệu ~2 giờ/tuần"] },
      { count: null, roles: ["Như cũ", "+ Bảo trì ~2 giờ/tuần"] },
      { count: null, roles: ["Như cũ", "+ Đầu mối các dây chuyền mới"] },
    ],
  },
];

export const staffing: Scenarios["staffing"] = {
  phases: [
    { name: "Thử nghiệm", months: "T+1–T+4" },
    { name: "Triển khai", months: "T+5–T+8" },
    { name: "Nhân rộng", months: "T+9–T+12" },
  ],
  rows: staffRows,
  leaders: { team: "Lãnh đạo Trị An", text: "Giám đốc nhà máy: họp tháng và tại mỗi cổng · Tài chính: tại mỗi cổng" },
};

// ───────────── M17: Thang năng lực ─────────────
export const m17: Scenarios["m17"] = [
  {
    name: "Vận hành",
    when: "T+4–T+8",
    can: "Chạy luồng dữ liệu, giám sát mô hình, quản trị người dùng, cập nhật ràng buộc kế hoạch, xử lý sự cố thường gặp",
    test: "Tự chạy 1 vòng (T+4) → tự vận hành 4 tuần (T+8)",
  },
  {
    name: "Tự huấn luyện lại",
    when: "T+11–T+12",
    can: "Cập nhật mô hình bằng dữ liệu mới, thêm SKU và dây chuyền, chấm trên bộ đề, quyết định phát hành phiên bản",
    test: "Tự huấn luyện lại không cần hỗ trợ, kết quả không kém phiên bản trước",
  },
  {
    name: "Dẫn dắt nhân rộng",
    when: "Năm thứ 2",
    can: "Dẫn dắt khảo sát và thử nghiệm tại nhà máy thứ hai, cùng thiết kế bộ đề thi mới, đồng tác giả báo cáo kỹ thuật",
    test: "Nhà máy thứ hai qua Cổng 2 với Celesnity ở vai trò hỗ trợ",
  },
];

// ───────────── M13, M3, M1 ─────────────
export const m13: Scenarios["m13"] = {
  foundingNote: "Trị An tham gia định hình sản phẩm, giữ quyền dùng mô hình nền lâu dài và chủ trì Ban chỉ đạo.",
};

export const m3: Scenarios["m3"] = {
  captions: {
    A: "Mỗi bài toán một công cụ; mỗi công cụ thấy một phần của nhà máy. Cảnh báo độ ẩm dừng lại ở công cụ cảnh báo.",
    B: "Một mô hình thấy toàn bộ trạng thái sản xuất, từ kế hoạch đến đơn hàng. Cảnh báo độ ẩm được truy tới lô, tính tác động và có bốn phương án phục hồi.",
  },
  loop: {
    tools: ["Kế hoạch", "Môi trường", "Chiết rót"],
    toolNote: "Công cụ riêng",
    connectedNote: "Nối vào mô hình",
    alert: "Độ ẩm vượt 65%",
    isolatedNote: "Cảnh báo dừng ở một công cụ",
    modelLabel: "Mô hình AI Thế giới thực",
    chain: ["Lô P102 · mẻ B042 cần QA xem xét", "Thiếu 31.400 viên, 2 đơn hàng", "4 phương án phục hồi"],
    line: "Dây chuyền viên nang",
  },
};

export const m1: Scenarios["m1"] = {
  captions: [
    "Minh họa: ba đảo Dây chuyền Dolce Gusto, Toàn nhà máy Trị An và Nestlé Việt Nam, phía trên là lõi Mô hình AI Thế giới thực phát sáng, nối với từng đảo bằng đường mảnh.",
    "Tự học: vòng quyết định, kết quả, học thêm quay quanh mô hình; sai số dự báo sản lượng giảm dần từ tháng thứ 1 đến tháng thứ 12.",
    "Dự báo trước: sau một sự cố, mô hình vẽ ba nhánh sản lượng còn thiếu cho ba phương án (giữ kế hoạch, tăng ca, chuyển sang Line 3) kèm dải độ chắc chắn; chuyển sang Line 3 bù được nhiều nhất.",
    "Nhân rộng: kinh nghiệm của dây chuyền Dolce Gusto tại Trị An được mang sang Jar Line, dây chuyền túi, khu chiết xuất và sấy, rồi các nhà máy Nestlé khác, không bắt đầu lại từ 0.",
  ],
  foresight: {
    axis: "SẢN LƯỢNG CÒN THIẾU",
    options: ["Giữ kế hoạch", "Tăng ca Line 2", "Chuyển sang Line 3"],
    pickTitle: "Bù sản lượng nhiều nhất",
    pickNote: "Độ chắc chắn: cao",
  },
  replicate: {
    sourceTitle: "Dolce Gusto",
    sourceSub: "Dây chuyền viên nang, Trị An",
    targets: ["Jar Line", "Dây chuyền túi", "Khu chiết xuất và sấy", "Nhà máy Nestlé khác"],
  },
};
