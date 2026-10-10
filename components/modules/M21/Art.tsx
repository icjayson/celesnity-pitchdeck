/**
 * Hình minh họa nét mảnh cho thẻ M21 (cùng phong cách M2): nền mist, nét navy 1,5px, nhấn blue; orange chỉ cho con người quyết định.
 * Tĩnh (không hoạt ảnh): đọc được ngay cả khi giảm chuyển động và ở bản in.
 */
import type { IllustrationArt } from "@/decks/types";

const NAVY = "#0A1F44";
const INK = "#5B6B85";
const LINE = "#DCE3EE";
const BLUE5 = "#2F7BF6";
const BLUE3 = "#8DB8FF";
const BLUE1 = "#E6F0FF";
const ORANGE = "#FF7A1A";
const W = "#FFFFFF";

const sw = { stroke: NAVY, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Theo dõi: ba hệ thống chảy dữ liệu về Minder AI, sóng quét bên phải */
function Watch() {
  const rows = [18, 49, 80];
  return (
    <>
      {rows.map((y) => (
        <g key={y}>
          <rect x={14} y={y} width={46} height={22} rx={5} fill={W} {...sw} />
          <line x1={22} y1={y + 8} x2={46} y2={y + 8} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
          <line x1={22} y1={y + 14} x2={38} y2={y + 14} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
          <path d={`M60 ${y + 11} C 86 ${y + 11}, 86 60, 104 60`} fill="none" stroke={BLUE3} strokeWidth={1.5} strokeDasharray="2 4" />
        </g>
      ))}
      <circle cx={124} cy={60} r={20} fill={BLUE1} stroke={BLUE5} strokeWidth={1.5} />
      <path d="M124 49 L127 57 L135 60 L127 63 L124 71 L121 63 L113 60 L121 57 Z" fill={BLUE5} />
      <path d="M154 40 A 28 28 0 0 1 154 80" fill="none" stroke={BLUE5} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M166 30 A 42 42 0 0 1 166 90" fill="none" stroke={BLUE3} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M178 22 A 54 54 0 0 1 178 98" fill="none" stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
    </>
  );
}

/** Phát hiện: đường số liệu vượt ngưỡng do quản lý đặt */
function Detect() {
  return (
    <>
      <line x1={18} y1={100} x2={186} y2={100} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={18} y1={46} x2={186} y2={46} stroke={ORANGE} strokeWidth={1.5} strokeDasharray="5 4" />
      <rect x={20} y={30} width={40} height={12} rx={6} fill={W} stroke={ORANGE} strokeWidth={1.2} />
      <line x1={27} y1={36} x2={53} y2={36} stroke={ORANGE} strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="22,84 46,78 70,82 94,70 118,74 142,58 166,32" fill="none" stroke={NAVY} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      {[
        [46, 78],
        [70, 82],
        [94, 70],
        [118, 74],
        [142, 58],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={2.5} fill={W} stroke={NAVY} strokeWidth={1.5} />
      ))}
      <circle cx={166} cy={32} r={11} fill={BLUE5} fillOpacity={0.15} />
      <circle cx={166} cy={32} r={4.5} fill={BLUE5} />
    </>
  );
}

/** Soạn sẵn: một bản tin theo đúng mẫu, có bảng số và dấu nguồn */
function Compose() {
  return (
    <>
      <rect x={52} y={10} width={96} height={100} rx={8} fill={W} {...sw} />
      <rect x={62} y={20} width={44} height={6} rx={3} fill={NAVY} />
      <line x1={62} y1={36} x2={136} y2={36} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={62} y1={44} x2={120} y2={44} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
      {[58, 70, 82].map((y, i) => (
        <g key={y}>
          <line x1={62} y1={y} x2={100} y2={y} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
          <line x1={118} y1={y} x2={136} y2={y} stroke={i === 2 ? BLUE5 : INK} strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}
      <line x1={62} y1={64} x2={138} y2={64} stroke={LINE} strokeWidth={1} />
      <line x1={62} y1={76} x2={138} y2={76} stroke={LINE} strokeWidth={1} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={68 + i * 10} cy={98} r={3.5} fill={BLUE1} stroke={BLUE5} strokeWidth={1} />
      ))}
      <path d="M160 70 L163 78 L171 81 L163 84 L160 92 L157 84 L149 81 L157 78 Z" fill={BLUE5} />
      <path d="M176 52 L178 57 L183 59 L178 61 L176 66 L174 61 L169 59 L174 57 Z" fill={BLUE3} />
    </>
  );
}

/** Báo đúng người: output đi tới ba người nhận theo vai trò */
function Deliver() {
  const people: [number, number, boolean][] = [
    [150, 26, false],
    [168, 62, true],
    [150, 98, false],
  ];
  return (
    <>
      <rect x={18} y={36} width={52} height={48} rx={7} fill={W} {...sw} />
      <line x1={27} y1={50} x2={60} y2={50} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={27} y1={60} x2={52} y2={60} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={27} y1={70} x2={56} y2={70} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
      {people.map(([x, y]) => (
        <path key={`l${y}`} d={`M70 60 C 100 60, 104 ${y}, ${x - 16} ${y}`} fill="none" stroke={BLUE3} strokeWidth={1.5} strokeDasharray="2 4" />
      ))}
      {people.map(([x, y, lead]) => (
        <g key={y}>
          <circle cx={x} cy={y - 4} r={6} fill={lead ? "#FFF1E6" : BLUE1} stroke={lead ? ORANGE : BLUE5} strokeWidth={1.5} />
          <path d={`M${x - 10} ${y + 12} C ${x - 10} ${y + 3}, ${x + 10} ${y + 3}, ${x + 10} ${y + 12}`} fill="none" stroke={lead ? ORANGE : BLUE5} strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}

/** Giá thành: chi tiết piston và các phần đóng góp cộng thành chênh lệch */
function Cost() {
  const segs = [
    { w: 52, c: BLUE5 },
    { w: 18, c: BLUE3 },
    { w: 8, c: LINE },
  ];
  let x = 96;
  return (
    <>
      {/* piston nhìn ngang */}
      <rect x={22} y={34} width={48} height={40} rx={6} fill={W} {...sw} />
      <line x1={22} y1={44} x2={70} y2={44} stroke={INK} strokeWidth={1.2} />
      <line x1={22} y1={50} x2={70} y2={50} stroke={INK} strokeWidth={1.2} />
      <rect x={34} y={74} width={24} height={20} rx={3} fill={W} {...sw} />
      <circle cx={46} cy={60} r={5} fill={BLUE1} stroke={BLUE5} strokeWidth={1.5} />
      {/* phần đóng góp */}
      <line x1={92} y1={40} x2={186} y2={40} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={92} y1={52} x2={160} y2={52} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
      <rect x={92} y={66} width={94} height={14} rx={7} fill={W} stroke={LINE} strokeWidth={1.5} />
      {segs.map((s, i) => {
        const r = <rect key={i} x={x} y={69} width={s.w} height={8} rx={4} fill={s.c} />;
        x += s.w + 2;
        return r;
      })}
      <line x1={92} y1={94} x2={186} y2={94} stroke={NAVY} strokeWidth={1.5} strokeLinecap="round" />
      <rect x={150} y={98} width={36} height={10} rx={5} fill={BLUE5} />
    </>
  );
}

/** Dữ liệu máy: máy CNC có cửa kính, trục chính, đèn trạng thái và lịch sử sửa chữa */
function Machine() {
  return (
    <>
      <line x1={10} y1={106} x2={190} y2={106} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
      <rect x={28} y={22} width={92} height={84} rx={6} fill={W} {...sw} />
      <rect x={38} y={34} width={52} height={40} rx={4} fill="#F6F8FC" stroke={NAVY} strokeWidth={1.5} />
      <rect x={60} y={34} width={8} height={18} rx={2} fill={W} stroke={NAVY} strokeWidth={1.5} />
      <path d="M64 52 L64 58" stroke={NAVY} strokeWidth={1.5} strokeLinecap="round" />
      <rect x={52} y={62} width={24} height={6} rx={2} fill={BLUE1} stroke={BLUE5} strokeWidth={1.2} />
      <rect x={98} y={34} width={14} height={30} rx={3} fill="#F6F8FC" stroke={NAVY} strokeWidth={1.2} />
      <circle cx={105} cy={42} r={2.5} fill={BLUE5} />
      <circle cx={105} cy={50} r={2.5} fill={LINE} />
      <line x1={38} y1={86} x2={110} y2={86} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      {/* lịch sử sửa chữa */}
      {[34, 56, 78].map((y, i) => (
        <g key={y}>
          <circle cx={146} cy={y} r={4} fill={i === 2 ? BLUE5 : W} stroke={i === 2 ? BLUE5 : NAVY} strokeWidth={1.5} />
          <line x1={156} y1={y} x2={184} y2={y} stroke={i === 2 ? INK : LINE} strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}
      <line x1={146} y1={38} x2={146} y2={74} stroke={LINE} strokeWidth={1.5} />
    </>
  );
}

/** Bản vẽ: trục bậc với kích thước, ô phiên bản ở góc */
function Drawing() {
  return (
    <>
      <rect x={20} y={12} width={160} height={96} rx={6} fill={W} {...sw} />
      {[36, 60, 84].map((y) => (
        <line key={y} x1={20} y1={y} x2={180} y2={y} stroke={BLUE1} strokeWidth={1} />
      ))}
      {[60, 100, 140].map((x) => (
        <line key={x} x1={x} y1={12} x2={x} y2={108} stroke={BLUE1} strokeWidth={1} />
      ))}
      {/* trục bậc */}
      <path d="M40 50 H64 V42 H104 V36 H128 V64 H104 V58 H64 V50 Z" fill="#F6F8FC" stroke={NAVY} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={36} y1={50} x2={134} y2={50} stroke={INK} strokeWidth={1} strokeDasharray="6 3 1 3" />
      {/* kích thước */}
      <line x1={64} y1={76} x2={104} y2={76} stroke={BLUE5} strokeWidth={1.2} />
      <path d="M68 73 L64 76 L68 79 M100 73 L104 76 L100 79" fill="none" stroke={BLUE5} strokeWidth={1.2} strokeLinecap="round" />
      <line x1={64} y1={66} x2={64} y2={80} stroke={BLUE5} strokeWidth={1} />
      <line x1={104} y1={66} x2={104} y2={80} stroke={BLUE5} strokeWidth={1} />
      {/* ô phiên bản */}
      <rect x={140} y={84} width={34} height={18} rx={4} fill="#FFF1E6" stroke={ORANGE} strokeWidth={1.2} />
      <line x1={147} y1={93} x2={167} y2={93} stroke={ORANGE} strokeWidth={1.5} strokeLinecap="round" />
    </>
  );
}

const ART: Record<IllustrationArt, () => React.ReactElement> = {
  watch: Watch,
  detect: Detect,
  compose: Compose,
  deliver: Deliver,
  cost: Cost,
  machine: Machine,
  drawing: Drawing,
};

export function IllustrationSvg({ art }: { art: IllustrationArt }) {
  const A = ART[art];
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden focusable="false">
      <A />
    </svg>
  );
}
