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
  | "M18";

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
  | { kind: "quote"; text: Rich; emphasis?: boolean }
  /** Câu nhấn lớn kèm bối cảnh và kết luận (bố cục biên tập hai cột) */
  | { kind: "statement"; context: Rich; highlight: Rich; conclusion: Rich }
  | { kind: "note"; text: Rich }
  | { kind: "label"; variant: LabelVariant; text: Rich }
  | { kind: "flow"; steps: Rich[]; caption?: Rich }
  | { kind: "signature"; lines: Rich[] }
  | { kind: "module"; id: ModuleId; variant?: string };

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
  blocks: Block[];
  details?: Details[];
};

export type Act = { n: 1 | 2 | 3; label: string; title: string };

export type AppendixSection = { id: string; title: Rich; blocks: Block[] };
