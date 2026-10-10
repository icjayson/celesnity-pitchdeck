/**
 * Dữ liệu module của deck Isuzu Việt Nam (M1, M3, M5, M6, M10, M13, M15, M16, M17, M19).
 * Khớp docs/isuzu-content-v1.md. Mọi VIN, lô, nhà cung cấp, số xe là minh họa; số nhân sự và ngưỡng là đề xuất.
 */
import type { DeckData, DefectCard, DefectStory, GenealogyData, MonthRow, RoadmapPhase, StaffRow } from "../types";

type Scenarios = Required<DeckData["scenarios"]>;

// ───────────── Dữ liệu minh họa dùng chung: lô bản lề LOT-2938 và lô phanh BR-292 ─────────────
type Loc = "plant" | "dealer" | "customer";
type TraceVin = { vin: string; model: string; date: string; qc: string; location: Loc; place: string };

const DEALERS = ["Đại lý TP.HCM", "Đại lý Bình Dương", "Đại lý Đồng Nai", "Đại lý Cần Thơ", "Đại lý Đà Nẵng", "Đại lý Hà Nội"];

/** 23 xe đã lắp lô LOT-2938: 3 đã giao khách, 11 tại đại lý, 9 trong nhà máy (khớp slide 13) */
const lot2938: TraceVin[] = Array.from({ length: 23 }, (_, i) => {
  const n = 160 + i;
  const vin = `QKR-${String(n).padStart(5, "0")}`;
  const day = 2 + Math.floor(i / 2);
  const date = `${String(day).padStart(2, "0")}/09/2026`;
  if (i < 3) return { vin, model: "QKR", date, qc: "Đạt", location: "customer", place: "Khách hàng vận tải" };
  if (i < 14) return { vin, model: "QKR", date, qc: "Đạt", location: "dealer", place: DEALERS[(i - 3) % DEALERS.length] };
  return {
    vin,
    model: "QKR",
    date,
    qc: vin === "QKR-00182" ? "Phát hiện lỗi tại BODY-08" : "Chờ kiểm tra cuối",
    location: "plant",
    place: i < 19 ? "Bãi thành phẩm Gò Vấp" : "Trên chuyền, Gò Vấp",
  };
});

/** Xe đã lắp lô phanh BR-292 */
const br292: TraceVin[] = [
  { vin: "NQR-00201", model: "NQR", date: "08/09/2026", qc: "Đạt", location: "customer", place: "Khách hàng vận tải" },
  { vin: "FRR-00388", model: "FRR", date: "10/09/2026", qc: "Đạt", location: "customer", place: "Khách hàng vận tải" },
  { vin: "QKR-00182", model: "QKR", date: "21/09/2026", qc: "Chờ kiểm tra cuối", location: "plant", place: "Trên chuyền, Gò Vấp" },
  { vin: "NQR-00228", model: "NQR", date: "12/09/2026", qc: "Đạt", location: "dealer", place: "Đại lý TP.HCM" },
  { vin: "FRR-00401", model: "FRR", date: "15/09/2026", qc: "Đạt", location: "dealer", place: "Đại lý Đà Nẵng" },
  { vin: "FRR-00409", model: "FRR", date: "17/09/2026", qc: "Đạt", location: "dealer", place: "Đại lý Hà Nội" },
  { vin: "NQR-00233", model: "NQR", date: "18/09/2026", qc: "Đạt", location: "dealer", place: "Đại lý Cần Thơ" },
  { vin: "FRR-00417", model: "FRR", date: "22/09/2026", qc: "Đạt", location: "plant", place: "Bãi thành phẩm Gò Vấp" },
  { vin: "FRR-00419", model: "FRR", date: "23/09/2026", qc: "Phát hiện lỗi tại QC-02", location: "plant", place: "Khu kiểm tra cuối chuyền" },
];

const LOC_LABEL: Record<Loc, string> = { plant: "Trong nhà máy", dealer: "Tại đại lý", customer: "Đã giao khách" };

function groupsOf(vins: TraceVin[]): DefectStory["trace"]["groups"] {
  return (["plant", "dealer", "customer"] as Loc[])
    .map((loc) => ({
      label: LOC_LABEL[loc],
      tone: loc,
      vins: vins.filter((v) => v.location === loc).map(({ vin, date, qc, place }) => ({ vin, date, qc, location: place })),
    }))
    .filter((g) => g.vins.length > 0);
}

// ───────────── M19: Lý lịch số ─────────────
export const m19: GenealogyData = {
  tabs: { defect: "Từ một lỗi", forward: "Xe → linh kiện", backward: "Linh kiện → xe" },
  defect: {
    title: "Lỗi: bản lề cửa phải lệch",
    sub: "VIN QKR-00182 · Trạm BODY-08 · 09:40",
    nodes: [
      { id: "vin", label: "VIN", value: "QKR-00182", group: "xe" },
      { id: "model", label: "Model", value: "QKR", group: "xe" },
      { id: "process", label: "Công đoạn", value: "BODY", group: "quy-trinh" },
      { id: "station", label: "Trạm", value: "BODY-08", group: "quy-trinh" },
      { id: "component", label: "Linh kiện", value: "Bản lề cửa phải", group: "linh-kien" },
      { id: "supplier", label: "Nhà cung cấp", value: "Nhà cung cấp A", group: "linh-kien" },
      { id: "lot", label: "Lô linh kiện", value: "LOT-2938", group: "linh-kien" },
      {
        id: "operator",
        label: "Người thao tác",
        value: "Mã thao tác OP-17",
        note: "Chỉ dùng để phân tích quy trình. Không bao giờ dùng để xếp hạng hay đánh giá cá nhân.",
        group: "con-nguoi",
      },
      { id: "jig", label: "Đồ gá", value: "JIG-04", group: "quy-trinh" },
      { id: "shift", label: "Ca", value: "Ca đêm", group: "con-nguoi" },
      { id: "history", label: "Lịch sử lỗi", value: "17 ca tương tự", group: "lich-su" },
      { id: "action", label: "Hành động khắc phục", value: "CA-BODY-2026-018", group: "lich-su" },
    ],
    caption: "Từ một lỗi, mô hình nối được toàn bộ bối cảnh của chiếc xe, của trạm và của những lần tương tự trước đó.",
  },
  vehicles: [
    {
      vin: "QKR-00182",
      model: "QKR",
      built: "21/09/2026",
      parts: [
        { id: "engine", name: "Động cơ", serial: "E293829" },
        { id: "axle", name: "Cầu sau", serial: "AX-10932" },
        { id: "brake", name: "Cụm phanh", supplier: "Nhà cung cấp C", lot: "BR-292" },
        { id: "glass", name: "Kính chắn gió", supplier: "Nhà cung cấp B", lot: "GL-820" },
        { id: "seat", name: "Ghế", supplier: "Nhà cung cấp A", lot: "ST-920" },
        { id: "hinge", name: "Bản lề cửa phải", supplier: "Nhà cung cấp A", lot: "LOT-2938" },
      ],
    },
    {
      vin: "FRR-00419",
      model: "FRR",
      built: "23/09/2026",
      parts: [
        { id: "engine", name: "Động cơ", serial: "E301174" },
        { id: "axle", name: "Cầu sau", serial: "AX-11208" },
        { id: "brake", name: "Cụm phanh", supplier: "Nhà cung cấp C", lot: "BR-292" },
        { id: "glass", name: "Kính chắn gió", supplier: "Nhà cung cấp B", lot: "GL-824" },
        { id: "seat", name: "Ghế", supplier: "Nhà cung cấp A", lot: "ST-931" },
      ],
    },
    {
      vin: "QKR-00170",
      model: "QKR",
      built: "07/09/2026",
      parts: [
        { id: "engine", name: "Động cơ", serial: "E291604" },
        { id: "axle", name: "Cầu sau", serial: "AX-10871" },
        { id: "brake", name: "Cụm phanh", supplier: "Nhà cung cấp C", lot: "BR-287" },
        { id: "glass", name: "Kính chắn gió", supplier: "Nhà cung cấp B", lot: "GL-817" },
        { id: "seat", name: "Ghế", supplier: "Nhà cung cấp A", lot: "ST-915" },
        { id: "hinge", name: "Bản lề cửa phải", supplier: "Nhà cung cấp A", lot: "LOT-2938" },
      ],
    },
  ],
  lots: [
    {
      lot: "BR-292",
      part: "Cụm phanh",
      supplier: "Nhà cung cấp C",
      alert: "Nhà cung cấp C báo lô BR-292 có thể có vấn đề chất lượng",
      vins: br292,
    },
    {
      lot: "LOT-2938",
      part: "Bản lề cửa phải",
      supplier: "Nhà cung cấp A",
      alert: "Lô xuất hiện trong mẫu chung của 17 ca lỗi bản lề tại BODY-08",
      vins: lot2938,
    },
  ],
  locationLabels: LOC_LABEL,
  chain: ["Lô linh kiện", "VIN", "Ngày sản xuất", "Kết quả QC", "Vị trí hiện tại"],
  footnote: "Mô phỏng minh họa. Mã VIN, lô và nhà cung cấp không phải dữ liệu thật.",
};

// ───────────── M6: Thử làm QA ─────────────
const samples = [
  "Trạm BODY-08, xe QKR-00182 bản lề cửa phải bị lệch, lô LOT-2938, đồ gá JIG-04, ca đêm.",
  "Cabin NQR ở buồng sơn bị chảy sơn cửa trái, chưa rõ lô sơn.",
  "Kiểm tra cuối chuyền: đèn phanh không sáng trên xe FRR-00419, nghi lô phanh BR-292.",
];

const fallback: Record<string, DefectCard> = {
  [samples[0]]: {
    vin: "QKR-00182",
    model: "QKR",
    cong_doan: "BODY",
    tram: "BODY-08",
    linh_kien: "Bản lề cửa phải",
    trieu_chung: "Lệch vị trí lắp",
    lo: "LOT-2938",
    do_ga: "JIG-04",
    ca: "Ca đêm",
    muc_do: "Cao",
    thong_tin_con_thieu: ["Độ lệch đo được", "Số xe cùng ca đã kiểm tra"],
    la_bao_loi: true,
  },
  [samples[1]]: {
    vin: "",
    model: "NQR",
    cong_doan: "PAINT",
    tram: "",
    linh_kien: "Cửa trái cabin",
    trieu_chung: "Chảy sơn",
    lo: "",
    do_ga: "",
    ca: "",
    muc_do: "Trung bình",
    thong_tin_con_thieu: ["VIN", "Lô sơn", "Buồng sơn", "Ca"],
    la_bao_loi: true,
  },
  [samples[2]]: {
    vin: "FRR-00419",
    model: "FRR",
    cong_doan: "QC",
    tram: "",
    linh_kien: "Đèn phanh",
    trieu_chung: "Không sáng khi đạp phanh",
    lo: "BR-292",
    do_ga: "",
    ca: "",
    muc_do: "Cao",
    thong_tin_con_thieu: ["Trạm kiểm tra", "Ca", "Kết quả đo công tắc đèn phanh"],
    la_bao_loi: true,
  },
};

const stories: Record<string, DefectStory> = {
  [samples[0]]: {
    similar: {
      count: 17,
      pattern: [
        { k: "Model", v: "QKR" },
        { k: "Trạm", v: "BODY-08" },
        { k: "Lô", v: "LOT-2938" },
        { k: "Ca", v: "Ca đêm" },
        { k: "Đồ gá", v: "JIG-04" },
      ],
      rca: "Lệch vị trí đồ gá",
      ca: "CA-BODY-2026-018",
      hypotheses: [
        { name: "Đồ gá JIG-04", evidence: "14/17 ca xảy ra trên JIG-04, kể cả với lô khác", confidence: "Cao", lead: true },
        { name: "Lô linh kiện LOT-2938", evidence: "9/17 ca dùng LOT-2938; lô này cũng lắp đạt trên đồ gá khác", confidence: "Trung bình" },
      ],
    },
    trace: { lot: "LOT-2938", groups: groupsOf(lot2938) },
    options: [
      { id: "A", label: "Giữ và kiểm tra 9 xe trong nhà máy", scope: "9 xe", check: "Không ảnh hưởng xe đã xuất xưởng", recommended: true },
      { id: "B", label: "Báo đại lý kiểm tra 11 xe", scope: "11 xe", check: "Phối hợp Kinh doanh và Hậu mãi" },
      { id: "C", label: "Kiểm tra JIG-04 theo CA-BODY-2026-018", scope: "Trạm BODY-08", check: "Bảo trì xếp lịch vào giờ nghỉ ca" },
      { id: "D", label: "Gửi nhà cung cấp A", scope: "Lô LOT-2938", check: "Chờ kết quả đo của nhà cung cấp" },
    ],
    approveNote: "Quyết định đã gắn vào từng VIN. Sáng mai, Asakai bắt đầu từ kết quả kiểm tra.",
  },
  [samples[1]]: {
    similar: {
      count: 6,
      pattern: [
        { k: "Model", v: "NQR" },
        { k: "Công đoạn", v: "PAINT" },
        { k: "Vị trí", v: "Cửa trái" },
        { k: "Lô sơn", v: "PT-118" },
        { k: "Ca", v: "Ca chiều" },
      ],
      rca: "Độ nhớt sơn ra ngoài dải khi nhiệt độ buồng sơn tăng",
      ca: "CA-PAINT-2026-007",
      hypotheses: [
        { name: "Điều kiện buồng sơn", evidence: "5/6 ca xảy ra khi nhiệt độ buồng ở mức cao trong ngày", confidence: "Trung bình", lead: true },
        { name: "Lô sơn PT-118", evidence: "4/6 ca dùng PT-118; chưa đủ dữ liệu để tách khỏi điều kiện buồng", confidence: "Thấp" },
      ],
    },
    trace: {
      lot: "PT-118",
      groups: [
        {
          label: LOC_LABEL.plant,
          tone: "plant",
          vins: [
            { vin: "NQR-00236", date: "24/09/2026", qc: "Chờ kiểm tra cuối", location: "Trên chuyền, Gò Vấp" },
            { vin: "NQR-00237", date: "24/09/2026", qc: "Chờ kiểm tra cuối", location: "Trên chuyền, Gò Vấp" },
            { vin: "NQR-00235", date: "23/09/2026", qc: "Đạt", location: "Bãi thành phẩm Gò Vấp" },
          ],
        },
        {
          label: LOC_LABEL.dealer,
          tone: "dealer",
          vins: [{ vin: "NQR-00231", date: "22/09/2026", qc: "Đạt", location: "Đại lý Bình Dương" }],
        },
      ],
    },
    options: [
      { id: "A", label: "Kiểm tra bề mặt 3 cabin trong nhà máy", scope: "3 xe", check: "Trước khi qua công đoạn TRIM", recommended: true },
      { id: "B", label: "Theo dõi độ nhớt theo nhiệt độ buồng", scope: "Buồng sơn", check: "Theo hành động khắc phục CA-PAINT-2026-007" },
      { id: "C", label: "Tạm ngừng dùng lô PT-118", scope: "Lô PT-118", check: "Kho cấp lô thay thế" },
      { id: "D", label: "Chưa hành động, thu thêm dữ liệu", scope: "—", check: "Mô hình chưa đủ chắc chắn để tách hai giả thuyết" },
    ],
    approveNote: "Quyết định đã gắn vào từng cabin. Kết quả đo độ nhớt quay về mô hình để tách hai giả thuyết.",
  },
  [samples[2]]: {
    similar: {
      count: 4,
      pattern: [
        { k: "Model", v: "FRR" },
        { k: "Linh kiện", v: "Cụm phanh" },
        { k: "Lô", v: "BR-292" },
        { k: "Nhà cung cấp", v: "Nhà cung cấp C" },
      ],
      rca: "Công tắc đèn phanh lắp lệch hành trình",
      ca: "Chưa có hành động khắc phục cho lô này",
      hypotheses: [
        { name: "Lô phanh BR-292", evidence: "4/4 ca dùng BR-292; nhà cung cấp C vừa báo lô có thể có vấn đề", confidence: "Cao", lead: true },
        { name: "Lắp ráp tại công đoạn CHASSIS", evidence: "Các ca rải đều ở cả ba ca làm việc", confidence: "Thấp" },
      ],
    },
    trace: { lot: "BR-292", groups: groupsOf(br292) },
    options: [
      { id: "A", label: "Giữ và kiểm tra 3 xe trong nhà máy", scope: "3 xe", check: "Kiểm tra công tắc đèn phanh", recommended: true },
      { id: "B", label: "Báo đại lý kiểm tra 4 xe", scope: "4 xe", check: "Phối hợp Kinh doanh và Hậu mãi" },
      { id: "C", label: "Liên hệ khách hàng của 2 xe đã giao", scope: "2 xe", check: "Hậu mãi đặt lịch kiểm tra" },
      { id: "D", label: "Gửi nhà cung cấp C", scope: "Lô BR-292", check: "Chờ kết quả đo của nhà cung cấp" },
    ],
    approveNote: "Quyết định đã gắn vào từng VIN, kể cả 2 xe đã giao khách. Hậu mãi nhận danh sách ngay.",
  },
};

export const m6: Scenarios["m6"] = {
  kind: "defect",
  samples,
  fallback,
  stories,
  defaultStory: samples[0],
  copy: {
    channel: "Kênh báo lỗi · chuyền lắp ráp Gò Vấp",
    prompt: "Nói vào bộ đàm hoặc gõ lời báo lỗi",
    promptNoSpeech: "Gõ lời báo lỗi như công nhân hoặc QA nói",
    placeholder: "Ví dụ: Trạm BODY-08, xe QKR-00182 bản lề cửa phải bị lệch…",
    submit: "Lập hồ sơ lỗi",
    micLabel: "Bấm để nói lời báo lỗi",
    steps: ["Nói hoặc gõ lời báo lỗi", "AI lập hồ sơ lỗi gắn VIN", "Tìm ca tương tự và truy xuất mọi xe liên quan", "QA duyệt phương án"],
    idleTitle: "Hồ sơ lỗi sẽ hiện ở đây",
    loading: "Đang lập hồ sơ lỗi từ lời báo…",
    notFaultTitle: "Chưa nhận ra đây là báo lỗi, Quý vị thử lại",
    notFaultHint: "Hãy nói như khi báo lỗi trên chuyền: xe nào, trạm hay công đoạn nào, linh kiện nào, hiện tượng gì. Hoặc chạm một câu mẫu.",
    aiLabel: "AI thật: trích xuất hồ sơ lỗi từ lời nói",
  },
};

// ───────────── M5: Một ngày tại Gò Vấp ─────────────
export const m5: Scenarios["m5"] = {
  events: [
    {
      time: "07:30",
      place: "Asakai",
      island: "go-vap",
      text: "Bản tóm tắt đã sẵn: lỗi hôm qua, lỗi nào khớp với ca cũ, hành động khắc phục nào đang chờ kết quả. Cuộc họp bắt đầu từ quyết định, không từ việc tổng hợp",
      approve: "Thống nhất ưu tiên",
    },
    {
      time: "09:40",
      place: "Trạm BODY-08",
      island: "body",
      text: "Công nhân báo lỗi bản lề cửa bằng giọng nói. Hồ sơ tự gắn VIN, lô, đồ gá, ca. Tác nhân Chất lượng tìm ra 17 ca tương tự và hành động khắc phục lần trước",
      approve: "QA nhận hồ sơ",
    },
    {
      time: "10:30",
      place: "Phòng QA",
      island: "body",
      text: "Tác nhân Truy xuất lập danh sách mọi xe đã lắp cùng lô và vị trí hiện tại của từng xe. QA duyệt phạm vi kiểm tra",
      approve: "Duyệt phạm vi kiểm tra",
    },
    {
      time: "14:00",
      place: "Bảo trì",
      island: "go-vap",
      text: "Mô hình báo một đồ gá có dấu hiệu giống những lần trước khi lỗi lặp lại. Bảo trì xếp lịch kiểm tra vào giờ nghỉ ca",
      approve: "Xếp lịch kiểm tra",
    },
    {
      time: "16:00",
      place: "Trung tâm dịch vụ Củ Chi",
      island: "ngoai-cong",
      text: "Một xe vào bảo dưỡng. Kỹ thuật viên mở lý lịch số của xe: lô linh kiện, kết quả QC ngày xuất xưởng, các lần bảo dưỡng trước",
      approve: "Mở lý lịch số",
    },
    {
      time: "Cuối ngày",
      place: "Toàn nhà máy",
      island: "all",
      text: "Mọi lỗi, quyết định và kết quả trong ngày quay về mô hình. **Ngày mai, Asakai bắt đầu từ một nhà máy thông minh hơn hôm nay**",
    },
  ],
};

// ───────────── M10: 12 tháng ─────────────
const shareFor = (m: number) =>
  m <= 4 ? { celesnity: 90, partner: 10 } : m <= 8 ? { celesnity: 50, partner: 50 } : { celesnity: 20, partner: 80 };
const peopleFor = (m: number) =>
  m <= 4 ? { celesnity: 5, partnerTeam: 2 } : m <= 8 ? { celesnity: 4, partnerTeam: 3 } : { celesnity: 3, partnerTeam: 3 };

const P1 = "Pilot: Học";
const P2 = "Dùng thật";
const P3 = "Nhân rộng";
const ALL = ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"];
const rawMonths: Omit<MonthRow, "share" | "people">[] = [
  { m: 1, phase: P1, useCase: "UC0 dùng thật", expansion: "", data: "Môi trường tại VN · từ điển lỗi · lý lịch số", it: "Học việc", gate: "Cổng 1", live: ["UC0"], itLevel: "Học việc" },
  { m: 2, phase: P1, useCase: "UC1 thi trên lịch sử", expansion: "", data: "Bộ đề thi kín", it: "Học việc", gate: "", live: ["UC0"], itLevel: "Học việc" },
  { m: 3, phase: P1, useCase: "UC2 thi trên lịch sử", expansion: "", data: "Nối dữ liệu lô và giao xe", it: "Học việc", gate: "", live: ["UC0"], itLevel: "Học việc" },
  { m: 4, phase: P1, useCase: "Kết quả thi", expansion: "", data: "", it: "Tự chạy 1 vòng", gate: "Cổng 2", live: ["UC0"], itLevel: "Bậc 1: tự chạy 1 vòng" },
  { m: 5, phase: P2, useCase: "UC1 dùng thật", expansion: "", data: "Mở cho kỹ sư dùng", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1"], itLevel: "Cùng vận hành" },
  { m: 6, phase: P2, useCase: "UC2 dùng thật", expansion: "", data: "", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1", "UC2"], itLevel: "Cùng vận hành" },
  { m: 7, phase: P2, useCase: "UC3 lỗi lặp", expansion: "", data: "Nối dữ liệu bảo trì", it: "Cùng vận hành", gate: "", live: ["UC0", "UC1", "UC2", "UC3"], itLevel: "Cùng vận hành" },
  { m: 8, phase: P2, useCase: "UC4 bảo trì", expansion: "", data: "", it: "Tự vận hành 4 tuần", gate: "Cổng 3", live: ["UC0", "UC1", "UC2", "UC3", "UC4"], itLevel: "Bậc 1: tự vận hành 4 tuần" },
  { m: 9, phase: P3, useCase: "UC5 vật tư · PAINT", expansion: "", data: "Nối dữ liệu kho CKD", it: "Tự vận hành", gate: "", live: ALL, itLevel: "Tự vận hành" },
  { m: 10, phase: P3, useCase: "TRIM · N-Series", expansion: "Khảo sát đại lý và hậu mãi", data: "Dữ liệu các công đoạn mới", it: "Tự vận hành", gate: "", live: ALL, itLevel: "Tự vận hành" },
  { m: 11, phase: P3, useCase: "CHASSIS · F-Series", expansion: "Đánh giá dữ liệu dịch vụ", data: "", it: "Tự huấn luyện lại", gate: "", live: ALL, itLevel: "Bậc 2: tự huấn luyện lại" },
  { m: 12, phase: P3, useCase: "Đủ 5 công đoạn", expansion: "Kế hoạch pilot hậu mãi năm 2", data: "", it: "Tự chủ", gate: "Cổng 4", live: ALL, itLevel: "Bậc 2: tự chủ" },
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
    headline: "Đội IT Isuzu tự vận hành; đủ 5 công đoạn; lý lịch số cho mọi VIN mới",
    next: "Năm 2: pilot hậu mãi do đội Isuzu dẫn dắt, lý lịch số đi theo xe đến đại lý và khách hàng vận tải",
  },
  chips: [
    { id: "UC0", short: "Hồ sơ lỗi" },
    { id: "UC1", short: "Tác nhân Chất lượng" },
    { id: "UC2", short: "Tác nhân Truy xuất" },
    { id: "UC3", short: "Lỗi lặp" },
    { id: "UC4", short: "Bảo trì" },
    { id: "UC5", short: "Vật tư CKD" },
  ],
  lane: {
    title: "Ngoài cổng nhà máy",
    opensAt: 10,
    openNote: "mở từ T10",
    closedNote: "xuất hiện từ T10",
    pending: "Sau Cổng 3, Ban chỉ đạo duyệt khảo sát kết nối đại lý và hậu mãi.",
  },
  partnerShareNote: "phần vận hành của đội IT Isuzu",
};

// ───────────── M15: Tổng quan giai đoạn ─────────────
const phases: RoadmapPhase[] = [
  {
    id: "pilot",
    n: "01",
    name: "Pilot",
    months: "T1–T4",
    span: 4,
    goal: "Chứng minh trên lịch sử lỗi của chính Isuzu, với bộ đề thi kín do QA Isuzu giữ",
    apps: [
      { name: "Hồ sơ lỗi tự động", when: "Dùng thật từ T1" },
      { name: "Tác nhân Chất lượng", when: "Thi trên lịch sử từ T2" },
      { name: "Tác nhân Truy xuất", when: "Thi trên lịch sử từ T3" },
    ],
    gates: [
      { name: "Cổng 1", when: "T1", pass: "≥80% xe trong phạm vi nối được tới lô linh kiện; ≥2 năm lịch sử lỗi; thỏa thuận dữ liệu đã ký" },
      { name: "Cổng 2", when: "T4", pass: "≥80% lỗi trong bộ đề có ca đúng trong 5 kết quả đầu; truy xuất khớp 100%; IT Isuzu tự chạy 1 vòng" },
    ],
    ops: { celesnity: 90, partner: 10 },
    opsNote: "IT Isuzu học việc, tự chạy 1 vòng dữ liệu ở T4",
    team: { celesnity: "~5 người", partnerTeam: "2 người" },
    people: { celesnity: 5, partnerTeam: 2 },
    outcomes: ["Mô hình v0.1", "Kết quả thi trên lịch sử", "Bằng chứng chuyển giao"],
  },
  {
    id: "dung-that",
    n: "02",
    name: "Dùng thật",
    months: "T5–T8",
    span: 4,
    goal: "Dùng kết quả của mô hình cho quyết định thật tại BODY; mở thêm cảnh báo lỗi lặp và bảo trì dự báo",
    apps: [
      { name: "Tác nhân Chất lượng", when: "Dùng thật từ T5" },
      { name: "Tác nhân Truy xuất", when: "Dùng thật từ T6" },
      { name: "Cảnh báo sớm lỗi lặp", when: "T7" },
      { name: "Bảo trì dự báo thiết bị và đồ gá", when: "T8" },
    ],
    gates: [{ name: "Cổng 3", when: "T8", pass: "≥20 ca thật dùng kết quả của mô hình; IT Isuzu tự vận hành 4 tuần" }],
    ops: { celesnity: 50, partner: 50 },
    opsNote: "Hai bên cùng vận hành",
    team: { celesnity: "~4 người", partnerTeam: "3 người" },
    people: { celesnity: 4, partnerTeam: 3 },
    outcomes: ["Kết quả dùng trên ca thật", "IT Isuzu tự vận hành 4 tuần", "Duyệt khảo sát ngoài cổng nhà máy"],
  },
  {
    id: "nhan-rong",
    n: "03",
    name: "Nhân rộng",
    months: "T9–T12",
    span: 4,
    goal: "Mở ra đủ 5 công đoạn và mọi dòng xe tại Gò Vấp; lý lịch số cho mọi VIN mới",
    apps: [
      { name: "Vật tư CKD và chất lượng nhà cung cấp", when: "T9" },
      { name: "PAINT · TRIM · CHASSIS · QC", when: "T9–T11" },
      { name: "N-Series và F-Series", when: "T10–T12" },
    ],
    gates: [{ name: "Cổng 4", when: "T12", pass: "Tài chính xác nhận giá trị năm ≥ ngưỡng hòa vốn; IT Isuzu tự huấn luyện lại" }],
    ops: { celesnity: 20, partner: 80 },
    opsNote: "IT Isuzu tự vận hành, tự huấn luyện lại ở T11",
    team: { celesnity: "~3 người", partnerTeam: "3 người" },
    people: { celesnity: 3, partnerTeam: 3 },
    outcomes: ["Đủ 5 công đoạn", "Lý lịch số cho mọi VIN mới", "Kế hoạch pilot hậu mãi"],
  },
  {
    id: "nam-2",
    n: "04",
    name: "Năm 2 · Hậu mãi",
    months: "Năm 2",
    span: 3,
    goal: "Đội Isuzu dẫn dắt đưa lý lịch số ra đại lý, hậu mãi và khách hàng vận tải",
    apps: [
      { name: "Kết nối đại lý và trung tâm dịch vụ", when: "Hướng đề xuất, xác định cùng Isuzu" },
      { name: "Bộ đề thi riêng cho hậu mãi", when: "Hướng đề xuất, xác định cùng Isuzu" },
    ],
    gates: [],
    ops: null,
    opsNote: "Isuzu dẫn dắt · Celesnity hỗ trợ",
    team: { celesnity: "Hỗ trợ", partnerTeam: "Dẫn dắt" },
    outcomes: ["Pilot hậu mãi", "Đo số ngày xe hoạt động", "Đồng tác giả báo cáo kỹ thuật"],
    lead: true,
  },
];

export const roadmap: Scenarios["roadmap"] = {
  phases,
  itSteps: [
    { label: "Học việc", when: "T1", m: 1 },
    { label: "Tự chạy 1 vòng", when: "T4", m: 4 },
    { label: "Cùng vận hành", when: "T5", m: 5 },
    { label: "Tự vận hành 4 tuần", when: "T8", m: 8 },
    { label: "Tự vận hành", when: "T9", m: 9 },
    { label: "Tự huấn luyện lại", when: "T11", m: 11 },
    { label: "Tự chủ", when: "T12", m: 12 },
    { label: "Dẫn dắt mở rộng", when: "Năm 2", m: 13 },
  ],
  phaseEndMonth: { pilot: 4, "dung-that": 8, "nhan-rong": 12, "nam-2": 13 },
  noGateNote: "Ban chỉ đạo duyệt phạm vi pilot hậu mãi",
};

// ───────────── M16: Nhân sự ─────────────
const staffRows: StaffRow[] = [
  {
    team: "Celesnity",
    tone: "blue",
    cells: [
      { count: 5, approx: true, roles: ["Quản lý triển khai 1", "FDE tại Gò Vấp 2", "Kỹ sư AI 1", "Kỹ sư dữ liệu 1"] },
      { count: 4, approx: true, roles: ["Quản lý 1", "FDE 1,5", "Kỹ sư AI 1", "Kỹ sư dữ liệu ½"] },
      { count: 3, approx: true, roles: ["Quản lý ½", "FDE 1", "Kỹ sư AI 1", "Nghiên cứu ½"] },
    ],
  },
  {
    team: "IT Isuzu",
    note: "Đội vận hành mô hình",
    tone: "orange",
    cells: [
      { count: 2, roles: ["Kỹ sư dữ liệu", "Kỹ sư hạ tầng"] },
      { count: 3, roles: ["+ Kỹ sư AI"] },
      { count: 3, roles: ["Như cũ"] },
    ],
  },
  {
    team: "Chuyên gia nghiệp vụ Isuzu",
    tone: "orange",
    cells: [
      { count: null, roles: ["QA, Kỹ thuật sản xuất ~4 giờ/tuần mỗi người", "Đầu mối dữ liệu ~2 giờ/tuần"] },
      { count: null, roles: ["Như cũ", "+ Bảo trì ~2 giờ/tuần"] },
      { count: null, roles: ["Như cũ", "+ Kho CKD và Hậu mãi"] },
    ],
  },
];

export const staffing: Scenarios["staffing"] = {
  phases: [
    { name: "Pilot", months: "T1–T4" },
    { name: "Dùng thật", months: "T5–T8" },
    { name: "Nhân rộng", months: "T9–T12" },
  ],
  rows: staffRows,
  leaders: { team: "Lãnh đạo Isuzu", text: "Lãnh đạo phụ trách: họp tháng · IM Promotion và Tài chính: tại mỗi cổng" },
};

// ───────────── M17: Thang năng lực ─────────────
export const m17: Scenarios["m17"] = [
  {
    name: "Vận hành",
    when: "T4–T8",
    can: "Chạy luồng dữ liệu, giám sát mô hình, quản trị người dùng, xử lý sự cố thường gặp",
    test: "Tự chạy 1 vòng (T4) → tự vận hành 4 tuần (T8)",
  },
  {
    name: "Tự huấn luyện lại",
    when: "T12",
    can: "Cập nhật mô hình bằng dữ liệu mới, chấm trên bộ đề, quyết định phát hành phiên bản",
    test: "Tự huấn luyện lại không cần hỗ trợ, kết quả không kém phiên bản trước",
  },
  {
    name: "Dẫn dắt mở rộng",
    when: "Năm 2",
    can: "Đưa mô hình ra đại lý và hậu mãi, cùng thiết kế bộ đề thi mới",
    test: "Pilot hậu mãi do đội Isuzu dẫn dắt",
  },
];

// ───────────── M13, M3, M1 ─────────────
export const m13: Scenarios["m13"] = {
  foundingNote: "Pilot chạy ở Mức 1: không có gì rời môi trường Isuzu. Isuzu chọn mức chính thức sau khi đã xem kết quả Cổng 2.",
};

export const m3: Scenarios["m3"] = {
  captions: {
    A: "Mỗi bộ phận một công cụ; mỗi công cụ thấy một phần của nhà máy. Một lỗi tại BODY-08 được ghi nhận trong công cụ chất lượng.",
    B: "Một mô hình nối mọi dữ liệu bằng VIN. Cùng lỗi đó được nối tới đồ gá, lô linh kiện, mọi xe đã lắp lô ấy, và vị trí hiện tại của từng xe.",
  },
  loop: {
    tools: ["Chất lượng", "Kho CKD", "Bảo trì"],
    toolNote: "Công cụ riêng",
    connectedNote: "Nối bằng VIN",
    alert: "Lỗi bản lề cửa · BODY-08",
    isolatedNote: "Lỗi được ghi ở một công cụ",
    modelLabel: "Mô hình AI Thế giới thực",
    chain: ["17 ca tương tự · đồ gá JIG-04", "Lô LOT-2938 · 23 VIN", "Nhà máy · đại lý · khách hàng"],
    line: "Chuyền lắp ráp xe tải",
    lineArt: "truck",
  },
};

export const m1: Scenarios["m1"] = {
  captions: [
    "Minh họa: ba đảo Công đoạn BODY, Toàn nhà máy Gò Vấp và Đại lý và hậu mãi, phía trên là lõi Mô hình AI Thế giới thực phát sáng, nối với từng đảo bằng đường mảnh.",
    "Không bỏ sót lỗi, Tự học: mỗi lỗi, nguyên nhân và hành động khắc phục quay về mô hình; thời gian tìm nguyên nhân giảm dần từ tháng thứ 1 đến tháng thứ 12.",
    "Không tạo ra lỗi, Dự báo trước: trước khi lỗi bản lề lặp lại, mô hình so sánh ba phương án kèm dải độ chắc chắn; kiểm tra đồ gá JIG-04 và áp lại hành động khắc phục cũ giảm rủi ro nhiều nhất.",
    "Không thể tạo ra lỗi, Nhân rộng: bài học ở trạm BODY-08 trên dòng QKR được mang sang các công đoạn khác, N-Series, F-Series, rồi đại lý và hậu mãi.",
  ],
  foresight: {
    axis: "RỦI RO LỖI LẶP TẠI BODY-08",
    options: ["Giữ nguyên", "Kiểm tra JIG-04", "Kiểm tra JIG-04 + áp lại CA cũ"],
    pickTitle: "Giảm rủi ro lặp lại nhiều nhất",
    pickNote: "Độ chắc chắn: cao",
  },
  replicate: {
    sourceTitle: "BODY · QKR",
    sourceSub: "Trạm BODY-08, Gò Vấp",
    targets: ["PAINT · TRIM · CHASSIS", "N-Series", "F-Series", "Đại lý và hậu mãi"],
  },
};
