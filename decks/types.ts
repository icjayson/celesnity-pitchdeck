export type ModuleId =
  | "M1"
  | "M2"
  | "M3"
  | "M4"
  | "M5"
  | "M6"
  | "M7"
  | "M8"
  | "M9"
  | "M10"
  | "M11"
  | "M12"
  | "M13"
  | "M14"
  | "M15"
  | "M16"
  | "M17"
  | "M18"
  | "M19";

/** Nhãn trung thực (docs/implementation-plan.md, mục 1.4) */
export type LabelVariant = "sim" | "ai" | "future" | "proposal";

/** Văn bản hỗ trợ **đậm** và *nghiêng* (xem components/shared/RichText.tsx). */
export type Rich = string;

export type Block =
  | { kind: "lead"; text: Rich }
  /** wide: rộng bằng container thay vì ~68 ký tự */
  | { kind: "p"; text: Rich; wide?: boolean }
  | { kind: "h3"; text: Rich }
  | { kind: "list"; items: Rich[]; ordered?: boolean }
  | { kind: "table"; head: Rich[]; rows: Rich[][]; caption?: Rich; printOnly?: boolean }
  /** Danh sách nhãn → giá trị (thư ngỏ) */
  | { kind: "kv"; rows: Rich[][] }
  /** Lưới thẻ: ô đầu mỗi hàng là tiêu đề thẻ, các ô sau là nội dung (có nhãn từ head nếu có) */
  | { kind: "cards"; head?: Rich[]; rows: Rich[][]; cols?: 2 | 3 | 4; tone?: "blue" | "orange" | "navy" }
  /** Các bước nối tiếp: ô đầu là nhãn bước, ô 2 là nội dung, ô 3+ là đầu ra/ghi chú */
  | { kind: "steps"; head?: Rich[]; rows: Rich[][]; layout?: "horizontal" | "vertical" }
  /** Dòng thời gian: giờ · điều xảy ra · AI làm gì · con người làm gì */
  | { kind: "timeline"; head: Rich[]; rows: Rich[][] }
  /** So sánh hai cột: nhãn · cột trái · cột phải (cột phải được làm nổi bật) */
  | { kind: "compare"; head: Rich[]; rows: Rich[][] }
  /** Các ý nhấn mạnh dạng khối nổi bật (nền navy, đánh số) */
  | { kind: "pillars"; items: Rich[] }
  /** Nhãn ngắn dạng viên */
  | { kind: "chips"; items: Rich[]; tone?: "negative" | "neutral" }
  /** emphasis: khối nhấn lớn nền navy (câu chốt quan trọng) */
  /** lines: giữ xuống dòng trong text (mỗi ý một dòng); không đặt thì hiển thị như cũ */
  | { kind: "quote"; text: Rich; emphasis?: boolean; lines?: boolean }
  /** Câu nhấn lớn kèm bối cảnh và kết luận (bố cục biên tập hai cột) */
  | { kind: "statement"; context: Rich; highlight: Rich; conclusion: Rich }
  | { kind: "note"; text: Rich }
  | { kind: "label"; variant: LabelVariant; text: Rich }
  | { kind: "flow"; steps: Rich[]; caption?: Rich }
  | { kind: "signature"; lines: Rich[] }
  | { kind: "module"; id: ModuleId; variant?: string }
  /** Ảnh (public/decks/<slug>/...). `ratio` cắt ảnh theo tỉ lệ (ví dụ "21/9"); không có thì giữ tỉ lệ gốc. */
  | { kind: "photo"; photo: Photo }
  /** Video demo (public/decks/<slug>/...): có điều khiển, không tự phát; bản in hiện ảnh poster */
  | { kind: "video"; video: Video }
  /** Ảnh đặt cạnh một nhóm khối (ảnh nhỏ không bị phóng to quá kích thước gốc) */
  | { kind: "media"; photo: Photo; blocks: Block[]; side?: "left" | "right" }
  /** Sơ đồ kiến trúc: các nhánh hội tụ sang phải, mũi tên một chiều (components/shared/Diagram.tsx) */
  | { kind: "diagram"; flow: DiagramFlow; legend?: { tone: DiagramTone; label: Rich }[]; caption?: Rich; /** px, mặc định 120 */ nodeWidth?: number };

/** plain: thiết bị, hệ thống của khách hàng · edge: phần Celesnity lắp đặt · platform: nền tảng */
export type DiagramTone = "plain" | "edge" | "platform";

export type DiagramNode = { label: Rich; sub?: Rich; tone?: DiagramTone };

/** Chuỗi ô nối tiếp từ trái sang phải; `via[i]` là nhãn mũi tên trước ô thứ i + 1 */
export type DiagramBranch = { nodes: DiagramNode[]; via?: Rich[] };

/**
 * Các nhánh (hoặc nhóm con) xếp dọc, gộp lại rồi đi tiếp qua chuỗi `then`.
 * `group`: khung nét đứt có nhãn; chuỗi rỗng là khung không nhãn. `then` rỗng: đường gộp đi thẳng ra mép khung.
 */
export type DiagramFlow = {
  group?: Rich;
  branches: (DiagramBranch | DiagramFlow)[];
  /** Nhãn mũi tên từ điểm gộp tới ô đầu của `then` */
  via?: Rich;
  then: DiagramNode[];
};

export type Video = {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: Rich;
  caption?: Rich;
};

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: Rich;
  credit?: string;
  ratio?: string;
};

/** printOnly: chỉ hiện trong bản in/PDF (trên web đã có module tương tác thể hiện) */
export type Details = { title: Rich; blocks: Block[]; printOnly?: boolean };

export type Theme = "dark" | "navy" | "light" | "mist";

export type Section = {
  /** Mã section, khớp docs/content-v4.md (không có dấu #) */
  id: string;
  act: 0 | 1 | 2 | 3;
  /** Nhãn nhỏ phía trên tiêu đề */
  eyebrow: Rich;
  /** Tiêu đề chính của section (dòng ### trong v4) */
  title: Rich;
  theme: Theme;
  layout?: "hero" | "default" | "wide" | "closing";
  /** Ảnh nền cho section hero (đường dẫn trong public/), phủ gradient navy */
  cover?: string;
  /** Ảnh nền độ phân giải thấp: làm mềm nhẹ và phủ đậm hơn để không lộ vỡ ảnh khi phóng to */
  coverSoft?: boolean;
  /** "right": ảnh chỉ chiếm nửa phải (giữ được chủ thể ở mép trái ảnh, ví dụ biển hiệu); mặc định phủ toàn màn hình */
  coverLayout?: "full" | "right";
  /** object-position của ảnh bìa, ví dụ "20% 40%" */
  coverPosition?: string;
  blocks: Block[];
  details?: Details[];
};

export type Act = { n: 1 | 2 | 3; label: string; title: string };

export type AppendixSection = { id: string; title: Rich; blocks: Block[] };

// ───────────────────────────── Dữ liệu module (dùng chung mọi deck) ─────────────────────────────

/** Câu hỏi thường gặp của trợ lý (gói tri thức, câu trả lời soạn sẵn, câu gợi ý) */
export type FaqItem = {
  id: string;
  q: string;
  a: string;
  /** Mã section liên quan (không có dấu #) */
  section: string | null;
  keywords: string[];
  suggested?: true;
};

/** Giai đoạn của use case (M9, M18) */
export type Phase = "pilot" | "dung-that" | "nhan-rong" | "nam-2";

export type UseCase = {
  id: string;
  code: string;
  name: string;
  question: string;
  liveFrom: string;
  /** Phạm vi áp dụng: id trong `sectorLabels` của deck */
  sectors: string[];
  phase: Phase;
  primary?: boolean;
  card?: {
    opportunity: string;
    aiDoes: string;
    data?: string;
    decides: string;
    measure?: string;
    pass: string;
    /** Các trường dưới chỉ hiện ở M18 variant "detail" (thẻ use case đầy đủ) */
    /** Khâu trong quy trình, ví dụ "Khâu Kế hoạch" */
    stage?: string;
    /** Mô hình AI Thế giới thực học gì, dự báo gì trong use case này */
    worldModel?: string;
    /** Nhà máy cần cung cấp */
    needs?: string[];
    /** Không làm */
    notDo?: string[];
    /** Sản phẩm bàn giao */
    deliverables?: string[];
    /** Chỉ số đo */
    kpis?: string[];
    /** Giá trị quy ra tiền (công thức) */
    value?: string;
    /** Điều kiện hoặc giới hạn cần nói trước */
    caveat?: string;
    /** Ảnh minh hoạ trong M18 variant "detail" (ảnh chụp Minder) */
    images?: Photo[];
  };
  note?: string;
};

/** Một tháng trên thanh kéo 12 tháng (M10) */
export type MonthRow = {
  m: number;
  phase: string;
  useCase: string;
  /** Cột mở rộng (HP: thép; Nestlé: nhân rộng) */
  expansion: string;
  data: string;
  it: string;
  gate: string;
  /** Use case đang "dùng thật" tính đến tháng này */
  live: string[];
  share: { celesnity: number; partner: number };
  /** celesnityText: hiển thị thay cho số (ví dụ một khoảng "5–6") */
  people: { celesnity: number; partnerTeam: number; celesnityText?: string };
  itLevel: string;
};

/** Tổng quan giai đoạn (M15) */
export type RoadmapPhase = {
  id: string;
  n: string;
  name: string;
  months: string;
  /** số tháng, dùng để chia độ rộng trên dải roadmap */
  span: number;
  goal: string;
  apps: { name: string; when: string }[];
  gates: { name: string; when: string; pass: string }[];
  ops: { celesnity: number; partner: number } | null;
  opsNote: string;
  team: { celesnity: string; partnerTeam: string };
  /** số người (dùng cho biểu tượng người); celesnityText hiển thị thay cho số (ví dụ "5–6") */
  people?: { celesnity: number; partnerTeam: number; celesnityText?: string };
  outcomes: string[];
  /** Giai đoạn do khách hàng dẫn dắt */
  lead?: boolean;
};

export type StaffCell = {
  /** số người (null khi tính bằng giờ) */
  count: number | null;
  approx?: boolean;
  /** hiển thị thay cho số (ví dụ một khoảng "5–6"); count vẫn dùng cho biểu tượng người */
  text?: string;
  /** nhãn vai trò; "+" ở đầu = vai trò mới thêm */
  roles: string[];
};

export type StaffRow = {
  team: string;
  tone: "blue" | "orange";
  note?: string;
  cells: StaffCell[];
};

/** Một sự kiện trong "Một ngày" (M5). `island` là id đảo của deck hoặc "all". */
export type M5Event = {
  time: string;
  place: string;
  island: string;
  text: string;
  approve?: string;
};

/** Chữ của khung "bộ đàm" và các trạng thái M6 */
export type M6Copy = {
  channel: string;
  prompt: string;
  promptNoSpeech: string;
  placeholder: string;
  submit: string;
  micLabel: string;
  steps: [string, string, string, string];
  idleTitle: string;
  loading: string;
  notFaultTitle: string;
  notFaultHint: string;
  aiLabel: string;
};

/** Thẻ hồ sơ lỗi (M6, kiểu "case") */
export type CaseCard = {
  tram: string;
  trieu_chung: string;
  lo: string;
  model: string | null;
  muc_do: "Thấp" | "Trung bình" | "Cao";
  thong_tin_con_thieu: string[];
  la_bao_loi: boolean;
};

/** Thẻ hồ sơ lỗi xe (M6, kiểu "defect"): lời báo lỗi trên chuyền lắp ráp xe → hồ sơ gắn VIN */
export type DefectCard = {
  vin: string;
  model: string;
  cong_doan: "BODY" | "PAINT" | "TRIM" | "CHASSIS" | "QC" | "";
  tram: string;
  linh_kien: string;
  trieu_chung: string;
  lo: string;
  do_ga: string;
  ca: string;
  muc_do: "Thấp" | "Trung bình" | "Cao";
  thong_tin_con_thieu: string[];
  la_bao_loi: boolean;
};

/** Một kịch bản sau thẻ lỗi (M6 "defect"): ca tương tự → truy xuất ngược theo lô → phương án */
export type DefectStory = {
  similar: {
    count: number;
    pattern: { k: string; v: string }[];
    rca: string;
    ca: string;
    hypotheses: { name: string; evidence: string; confidence: string; lead?: boolean }[];
  };
  trace: {
    lot: string;
    groups: { label: string; tone: "plant" | "dealer" | "customer"; vins: { vin: string; date: string; qc: string; location: string }[] }[];
  };
  options: { id: string; label: string; scope: string; check: string; recommended?: boolean }[];
  approveNote: string;
};

/** Thẻ sự cố (M6, kiểu "incident") */
export type IncidentCard = {
  khu_vuc: string;
  su_co: string;
  thoi_gian: string;
  day_chuyen: string;
  lo: string;
  muc_do: "Thấp" | "Trung bình" | "Cao";
  thong_tin_con_thieu: string[];
  la_su_co: boolean;
};

export type M4OptionId = "A" | "B" | "C" | "ncc-moi";

export type M4Option = {
  id: M4OptionId;
  label: string;
  short: string;
  /** Tỷ lệ lỗi hiện tại, % */
  current: number | null;
  /** Đường dự báo 8 tuần: [tuần 0..8] trung vị, dải 80% thấp, cao */
  forecast: { week: number; mid: number; lo: number; hi: number }[] | null;
  confidence: "Cao" | "Trung bình" | null;
  /** "Thực tế" 4 tuần sau: [tuần 0..4] */
  actual: { week: number; value: number }[] | null;
  verdict: string;
  evidence: string[];
  abstain?: string;
};

// ───────────────────────────── Deck ─────────────────────────────

/** Bên khách hàng: thay mọi chữ "Hòa Phát" viết cứng trong component */
export type Party = {
  /** Tên đầy đủ, ví dụ "Hòa Phát", "Nestlé Trị An" */
  name: string;
  /** Tên ngắn trong nhãn, ví dụ "Hòa Phát", "Trị An" */
  short: string;
  /** Đội vận hành của khách hàng, ví dụ "IT Hòa Phát", "Đội Trị An" */
  team: string;
  /** "Môi trường Hòa Phát", "Môi trường Nestlé" */
  environment: string;
};

export type Brand = {
  /** Logo trắng cho nền tối (đường dẫn trong public/) */
  partnerLogo?: string;
  /** Chữ thay thế khi không có logo */
  partnerWordmark: string;
  /** Chiều cao logo (px) trong cụm logo trang bìa */
  partnerLogoHeight?: number;
};

/** Đảo nhà máy trong minh họa (M1, M5, M8). Thứ tự = vị trí trái, giữa, phải. */
export type IslandSpec = {
  id: string;
  label: string;
  /** Kiểu hình vẽ trong components/art/Islands.tsx */
  art: "gia-dung" | "dien-lanh" | "thep" | "capsule-line" | "coffee-plant" | "network" | "truck-line" | "truck-plant" | "dealer-network";
};

export type DeckLabels = {
  sim: string;
  simShort: string;
  ai: string;
  future: string;
  proposal: string;
  calculatorPrivacy: string;
  chatNotice: string;
  details: string;
  hideDetails: string;
};

export type Closing = {
  headline: string;
  lead: string;
  story: string;
  tagline: string;
  owner: string;
  thanks: string;
  pdf: string;
  ask: string;
};

export type BenefitSide = { name: string; receive: string[]; give: string[] };

export type PackagePart = { n: string; name: string; body: string };
export type CostShiftRow = { year: string; deploy: number; model: number; deployLabel: string; modelLabel: string };

/**
 * Dữ liệu của một deck gửi xuống trình duyệt (phải tuần tự hóa được: không có hàm).
 * Mỗi trang /<slug> chỉ nhận đúng deck của mình qua DeckProvider.
 */
export type DeckData = {
  slug: string;
  basePath: string;
  meta: { title: string; description: string; tagline: string; footer: string };
  acts: Act[];
  labels: DeckLabels;
  sections: Section[];
  parkedSections: Section[];
  appendix: AppendixSection[];
  closing: Closing;
  benefits: { partner: BenefitSide; celesnity: BenefitSide };
  packageParts: PackagePart[];
  costShift: CostShiftRow[];
  faq: FaqItem[];
  /** Câu hỏi nhanh dưới ô chat ở trang bìa (id trong faq) */
  quickFaqIds: string[];
  useCases: UseCase[];
  sectorLabels: Record<string, string>;
  phaseLabels: Record<Phase, string>;
  expansionMap: [string, string][];
  beforeAfter: Record<string, { before: string; after: string }>;
  party: Party;
  brand: Brand;
  islands: IslandSpec[];
  scenarios: {
    m5: { events: M5Event[] };
    m6: (
      | {
          kind: "case";
          samples: string[];
          fallback: Record<string, CaseCard>;
          ranking: { lo: string; risk: number; reason: string }[];
          /** Kế hoạch kiểm tra: chuỗi có chỗ trống {lo} {tram} {thieu} */
          planTemplate: string[];
        }
      | {
          kind: "incident";
          samples: string[];
          fallback: Record<string, IncidentCard>;
          impact: { label: string; value: string }[];
          options: { id: string; label: string; recovered: string; onTime: string; cost: string; check: string; recommended?: boolean }[];
        }
      | {
          kind: "defect";
          samples: string[];
          fallback: Record<string, DefectCard>;
          /** Kịch bản theo câu mẫu (khóa = câu mẫu); câu khác dùng `defaultStory` */
          stories: Record<string, DefectStory>;
          defaultStory: string;
        }
    ) & { copy: M6Copy };
    m10: {
      months: MonthRow[];
      gates: { m: number; name: string }[];
      finale: { headline: string; next: string };
      /** Chip "Use case đang dùng thật": id use case + tên ngắn; `label` thay cho nhãn mặc định "Ứng dụng 0N" */
      chips: { id: string; short: string; label?: string }[];
      /** Tiêu đề nhóm chip; mặc định "Use case đang dùng thật" */
      chipsTitle?: string;
      /** Làn mở rộng (HP: thép), hiện từ tháng `opensAt` */
      lane: { title: string; opensAt: number; openNote: string; closedNote: string; pending: string };
      /** Nhãn dưới con số phần vận hành của khách hàng ở T12 */
      partnerShareNote: string;
    };
    roadmap: {
      phases: RoadmapPhase[];
      itSteps: { label: string; when: string; m: number }[];
      phaseEndMonth: Record<string, number>;
      /** Ô "Đầu ra nghiệm thu" khi giai đoạn không có cổng */
      noGateNote: string;
    };
    staffing: {
      phases: { name: string; months: string }[];
      rows: StaffRow[];
      leaders: { team: string; text: string };
    };
    m17: { name: string; when: string; can: string; test: string }[];
    /** Hình thức hợp tác (M13 "founding"): câu dưới tên mức đề xuất */
    m13: { foundingNote: string };
    /** Hai con đường (M3): chú thích cho trình đọc màn hình theo con đường */
    m3: {
      captions: { A: string; B: string };
      /** Nhãn ngắn trên nút chuyển A/B; mặc định lấy phần sau dấu ":" của tiêu đề cột trong bảng */
      toggle?: { A: string; B: string };
      /** Chữ trong khung cảnh variant "loop" */
      loop?: {
        tools: [string, string, string];
        toolNote: string;
        connectedNote: string;
        alert: string;
        isolatedNote: string;
        modelLabel: string;
        chain: [string, string, string];
        line: string;
        /** Hình dây chuyền trong khung cảnh: viên nang (mặc định) hoặc xe tải */
        lineArt?: "capsule" | "truck";
      };
    };
    /** Câu chuyện M1 (#sieu-thong-minh): mô tả cho trình đọc màn hình và chữ trong ba minh họa */
    m1: {
      /** Mô tả cảnh theo trạng thái 0 (toàn cảnh) · 1 Tự học · 2 Dự báo trước · 3 Nhân rộng */
      captions: [string, string, string, string];
      /** Hình "Dự báo trước": tên trục, ba phương án (phương án cuối là phương án được chọn), thẻ kết luận */
      foresight: { axis: string; options: [string, string, string]; pickTitle: string; pickNote: string };
      /** Hình "Nhân rộng": nguồn kinh nghiệm và bốn nơi nhận (nơi cuối là đích đến, màu orange) */
      replicate: { sourceTitle: string; sourceSub: string; targets: [string, string, string, string]; more?: string };
      /** Hình "Tự học": nhãn trên cột cuối (mặc định "Mỗi tháng thông minh hơn") và độ cao 12 cột (0–1) */
      learn?: { badge: string; curve?: number[] };
    };
    /** Gia phả số (M19): một lỗi → bối cảnh; xe → linh kiện; linh kiện → xe */
    m19?: GenealogyData;
    m4?: { title: string; options: M4Option[]; score: { before: number; after: number; unit: string } };
    m12?: { defaults: CalcInputs; breakEvenGrid: { volumes: number[]; costs: number[] } };
  };
};

/** Đầu vào máy tính giá trị (M12) */
export type CalcInputs = {
  /** Sản lượng/năm của dòng (sp) */
  volumePerYear: number;
  /** Tỷ lệ lỗi lọt, phần trăm (0,5 nghĩa là 0,5%) */
  escapeRatePct: number;
  /** Chi phí mỗi lỗi lọt (đ) */
  costPerEscape: number;
  /** Phần lỗi lọt bắt thêm được (0,2 = 1/5) */
  extraCatchShare: number;
  /** Sản lượng/tháng của dòng (sp) */
  volumePerMonth: number;
  /** Số tuần phát hiện sớm */
  earlyWeeks: number;
  /** Tỷ lệ bảo hành, phần trăm */
  warrantyRatePct: number;
  /** Chi phí mỗi ca bảo hành (đ) */
  costPerClaim: number;
  /** Số sự cố bảo hành phát hiện sớm/năm: kịch bản thận trọng và cơ sở */
  incidentsConservative: number;
  incidentsBase: number;
  /** Chi phí một thay đổi kỹ thuật không hiệu quả (đ): thấp và cao */
  failedChangeCostLow: number;
  failedChangeCostHigh: number;
  /** Số thay đổi tránh được/năm: thận trọng và cơ sở */
  changesAvoidedConservative: number;
  changesAvoidedBase: number;
  /** Chi phí chương trình/năm (đ) */
  programCostPerYear: number;
  /** Năng suất: số hồ sơ/năm, giờ mỗi hồ sơ, phần giảm */
  dossiersPerYear: number;
  hoursPerDossier: number;
  timeReduction: number;
};

// ───────────────────────────── Trợ lý AI (chỉ ở server) ─────────────────────────────

/**
 * Cấu hình trợ lý của MỘT deck. Mỗi khách hàng một bản riêng: quy tắc, gói tri thức, câu hỏi thường gặp,
 * tool và trích xuất đều chỉ lấy từ deck đó (docs/nestle-implementation-plan.md mục 2.6).
 */
export type DeckAssistant = {
  /** Quy tắc hệ thống; `live` = id các section đang hiển thị (để bật/tắt nhắc tool của section tạm cất) */
  rules: (live: Set<string>) => string;
  /** Dòng nhắc ngôn ngữ đặt cuối hội thoại */
  languageNudge: { en: string; vi: string };
  /** Hồ sơ đề xuất chi tiết (PHẦN B của gói tri thức) */
  knowledgeBrief: string;
  /** Ghi chú cho từng module tương tác trong gói tri thức */
  moduleNotes: Record<string, string>;
  /** Mô tả tool open_use_case (liệt kê mã use case của deck) */
  useCaseToolDescription: string;
  /** Tool riêng của section có thể tạm cất (mô tả); không có thì không bật */
  simulationToolDescription?: string;
  calculatorToolDescription?: string;
  /** Section có id trong danh sách này bị loại khỏi câu hỏi gợi ý khi đang tạm cất */
  followupExcludeSections?: string[];
  /** Câu hỏi gợi ý chứa cụm này bị loại (ví dụ nhắc module đã tạm cất) */
  followupExcludePattern?: RegExp;
  /** Trích xuất của M6 */
  extract: { kind: "case" | "incident" | "defect"; system: string };
};

// ───────────────────────────── Gia phả số (M19) ─────────────────────────────

export type GenealogyData = {
  tabs: { defect: string; forward: string; backward: string };
  /** Tab "Từ một lỗi": nút trung tâm và các nút bối cảnh */
  defect: {
    title: string;
    sub: string;
    nodes: { id: string; label: string; value: string; note?: string; group: "xe" | "quy-trinh" | "linh-kien" | "con-nguoi" | "lich-su" }[];
    caption: string;
  };
  /** Tab "Xe → linh kiện": một VIN và các linh kiện chính */
  vehicles: {
    vin: string;
    model: string;
    built: string;
    parts: { id: string; name: string; serial?: string; supplier?: string; lot?: string }[];
  }[];
  /** Tab "Linh kiện → xe": một lô và danh sách xe đã lắp lô đó */
  lots: {
    lot: string;
    part: string;
    supplier: string;
    alert: string;
    vins: { vin: string; model: string; date: string; qc: string; location: "plant" | "dealer" | "customer"; place: string }[];
  }[];
  locationLabels: { plant: string; dealer: string; customer: string };
  chain: string[];
  footnote: string;
};
