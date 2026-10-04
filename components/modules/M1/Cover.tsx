"use client";
/**
 * Minh họa trang bìa (#mo-dau): quả cầu lưới Mô hình AI Thế giới thực, ba quỹ đạo
 * Tự học · Dự báo trước · Nhân rộng, và đường chân trời các nhà máy của khách hàng
 * (gia dụng · điện lạnh · thép) đẩy dòng dữ liệu lên quả cầu.
 */
import { useId } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const W = 640;
const H = 610;
const CX = 320;
const CY = 220;
const R = 112;
const HORIZON = 486;

const BLUE5 = "#2F7BF6";
const BLUE3 = "#8DB8FF";
const BLUE1 = "#CFE1FF";
const ORANGE = "#FF7A1A";
const NAVY = "#0B1A36";

const ORBITS = [
  { label: "Tự học", rx: 214, ry: 46, rot: -16, dur: 9, lx: 92, ly: 150, dot: BLUE1 },
  { label: "Dự báo trước", rx: 196, ry: 58, rot: 14, dur: 11, lx: 548, ly: 136, dot: BLUE1 },
  { label: "Nhân rộng", rx: 238, ry: 30, rot: 0, dur: 13, lx: 92, ly: 300, dot: ORANGE },
];

/** Điểm xuất phát của dòng dữ liệu: mái và ống khói của từng nhà máy */
const SOURCES: [number, number][] = [
  [100, HORIZON - 66],
  [186, HORIZON - 74],
  [276, HORIZON - 76],
  [384, HORIZON - 44],
  [466, HORIZON - 90],
  [515, HORIZON - 74],
];

export function CoverVisual() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduced = useReducedMotion();
  const anim = !reduced;
  const ellipse = (rx: number, ry: number) =>
    `M${CX - rx} ${CY} A${rx} ${ry} 0 1 0 ${CX + rx} ${CY} A${rx} ${ry} 0 1 0 ${CX - rx} ${CY}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-hidden fontFamily="inherit">
      <defs>
        <radialGradient id={`${uid}glow`} cx="50%" cy="42%" r="50%">
          <stop offset="0%" stopColor={BLUE5} stopOpacity="0.45" />
          <stop offset="60%" stopColor={BLUE5} stopOpacity="0.08" />
          <stop offset="100%" stopColor={BLUE5} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}core`} cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#1E4FA8" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#0E2A5E" stopOpacity="0.9" />
          <stop offset="100%" stopColor={NAVY} stopOpacity="0.85" />
        </radialGradient>
        <linearGradient id={`${uid}beam`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={BLUE3} stopOpacity="0" />
          <stop offset="100%" stopColor={BLUE3} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${uid}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BLUE3} stopOpacity="0.35" />
          <stop offset="100%" stopColor={BLUE3} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}sphere`}>
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>
        <mask id={`${uid}floorMask`}>
          <rect x="0" y={HORIZON} width={W} height={H - HORIZON} fill={`url(#${uid}floor)`} />
        </mask>
      </defs>

      {/* quầng sáng */}
      <circle cx={CX} cy={CY} r={214} fill={`url(#${uid}glow)`} />

      {/* sàn lưới phối cảnh */}
      <g mask={`url(#${uid}floorMask)`} stroke={BLUE3} strokeWidth="1">
        {Array.from({ length: 17 }, (_, i) => {
          const x = -160 + i * 60;
          return <line key={`v${i}`} x1={CX + (x - CX) * 0.18} y1={HORIZON} x2={x} y2={H} />;
        })}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = HORIZON + Math.pow(i / 5, 1.8) * (H - HORIZON);
          return <line key={`h${i}`} x1={0} y1={y} x2={W} y2={y} />;
        })}
      </g>

      {/* dòng dữ liệu từ nhà máy lên mô hình */}
      {SOURCES.map(([x, sy], i) => {
        const d = `M${x} ${sy} C ${x} ${sy - 70}, ${CX + (x - CX) * 0.35} ${CY + R + 40}, ${CX + (x - CX) * 0.25} ${CY + R - 6}`;
        return (
          <g key={x}>
            <path d={d} fill="none" stroke={`url(#${uid}beam)`} strokeWidth="1.2" />
            {anim ? (
              <circle r="2.4" fill={BLUE1}>
                <animateMotion path={d} dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ) : null}
          </g>
        );
      })}

      {/* đường chân trời các nhà máy */}
      <Skyline />

      {/* quỹ đạo phía sau quả cầu */}
      {ORBITS.map((o, i) => (
        <g key={`back${i}`} transform={`rotate(${o.rot} ${CX} ${CY})`}>
          <path d={ellipse(o.rx, o.ry)} fill="none" stroke={BLUE3} strokeOpacity="0.22" strokeWidth="1" />
        </g>
      ))}

      {/* quả cầu lưới */}
      <circle cx={CX} cy={CY} r={R} fill={`url(#${uid}core)`} />
      <g clipPath={`url(#${uid}sphere)`} fill="none" stroke={BLUE3} strokeWidth="1">
        {[-60, -36, -12, 12, 36, 60].map((lat) => {
          const t = (lat * Math.PI) / 180;
          const rx = R * Math.cos(t);
          return <ellipse key={lat} cx={CX} cy={CY + R * Math.sin(t)} rx={rx} ry={rx * 0.2} strokeOpacity="0.35" />;
        })}
        {[0, 30, 60, 90, 120, 150].map((ph) => {
          const vals = Array.from({ length: 13 }, (_, k) => (R * Math.abs(Math.cos(((ph + k * 15) * Math.PI) / 180))).toFixed(1)).join(";");
          const rx0 = (R * Math.abs(Math.cos((ph * Math.PI) / 180))).toFixed(1);
          return (
            <ellipse key={ph} cx={CX} cy={CY} rx={rx0} ry={R} strokeOpacity="0.45">
              {anim ? <animate attributeName="rx" values={vals} dur="14s" repeatCount="indefinite" /> : null}
            </ellipse>
          );
        })}
      </g>
      {/* mạng nút trên mặt cầu */}
      <Network anim={anim} />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={BLUE3} strokeOpacity="0.8" strokeWidth="1.5" />
      <circle cx={CX} cy={CY} r={R + 10} fill="none" stroke={BLUE3} strokeOpacity="0.15" strokeDasharray="2 6" />

      {/* quỹ đạo phía trước + điểm sáng chạy + nhãn */}
      {ORBITS.map((o, i) => {
        const front = `M${CX - o.rx} ${CY} A${o.rx} ${o.ry} 0 0 0 ${CX + o.rx} ${CY}`;
        return (
          <g key={`front${i}`}>
            <g transform={`rotate(${o.rot} ${CX} ${CY})`}>
              <path d={front} fill="none" stroke={o.dot === ORANGE ? ORANGE : BLUE3} strokeOpacity={o.dot === ORANGE ? 0.7 : 0.55} strokeWidth="1.4" />
              {anim ? (
                <circle r="4.5" fill={o.dot}>
                  <animateMotion path={ellipse(o.rx, o.ry)} dur={`${o.dur}s`} begin={`${-i * 2}s`} repeatCount="indefinite" />
                </circle>
              ) : (
                <circle cx={CX + o.rx * 0.7} cy={CY + o.ry * 0.71} r="4.5" fill={o.dot} />
              )}
            </g>
            <Chip x={o.lx} y={o.ly} label={o.label} accent={o.dot === ORANGE} />
          </g>
        );
      })}

      {/* nhãn lõi */}
      <g>
        <rect x={CX - 92} y={CY + R + 18} width="184" height="28" rx="14" fill={NAVY} stroke={BLUE3} strokeOpacity="0.5" />
        <circle cx={CX - 74} cy={CY + R + 32} r="3.5" fill={BLUE5} />
        <text x={CX + 6} y={CY + R + 36.5} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#fff">
          Mô hình AI Thế giới thực
        </text>
      </g>
    </svg>
  );
}

function Chip({ x, y, label, accent }: { x: number; y: number; label: string; accent: boolean }) {
  const w = label.length * 7.4 + 30;
  return (
    <g>
      <rect x={x - w / 2} y={y - 14} width={w} height="28" rx="14" fill={NAVY} stroke={accent ? ORANGE : BLUE3} strokeOpacity={accent ? 0.9 : 0.5} />
      <circle cx={x - w / 2 + 14} cy={y} r="3.5" fill={accent ? ORANGE : BLUE3} />
      <text x={x + 7} y={y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#fff">
        {label}
      </text>
    </g>
  );
}

/** Các nút và cạnh trên nửa trước mặt cầu, nhấp nháy lần lượt */
function Network({ anim }: { anim: boolean }) {
  const pts: [number, number][] = [
    [-58, -52],
    [-14, -78],
    [40, -60],
    [72, -12],
    [30, 18],
    [-30, 4],
    [-72, 30],
    [-20, 62],
    [44, 70],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 4],
    [1, 5],
    [2, 4],
  ];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={CX + pts[a][0]}
          y1={CY + pts[a][1]}
          x2={CX + pts[b][0]}
          y2={CY + pts[b][1]}
          stroke={BLUE1}
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={CX + x} cy={CY + y} r={i === 4 ? 4 : 2.6} fill={i === 4 ? "#fff" : BLUE1}>
          {anim ? <animate attributeName="opacity" values="0.35;1;0.35" dur="3s" begin={`${i * 0.33}s`} repeatCount="indefinite" /> : null}
        </circle>
      ))}
    </g>
  );
}

/** Đường chân trời ba nhà máy: gia dụng · điện lạnh · thép (thép là đích đến, màu cam) */
function Skyline() {
  const y = HORIZON;
  const FILL = "#10264D";
  const s = { fill: FILL, stroke: BLUE3, strokeWidth: 1.4, strokeLinejoin: "round" as const };
  const o = { fill: FILL, stroke: ORANGE, strokeWidth: 1.5, strokeLinejoin: "round" as const };
  const lit = { fill: BLUE3, fillOpacity: 0.55 };
  const teeth = [0, 1, 2, 3, 4];
  return (
    <g>
      <line x1={30} y1={y} x2={610} y2={y} stroke={BLUE3} strokeOpacity="0.7" />

      {/* ── Nhà máy gia dụng: xưởng mái răng cưa + khối văn phòng ── */}
      <path
        d={`M44 ${y} V${y - 46} ${teeth.map((k) => `L${44 + k * 23 + 23} ${y - 64} V${y - 46}`).join(" ")} V${y} Z`}
        {...s}
      />
      {/* kính mái răng cưa */}
      {teeth.map((k) => (
        <path key={k} d={`M${44 + k * 23 + 23} ${y - 64} V${y - 46} L${44 + k * 23 + 13} ${y - 50} Z`} {...lit} fillOpacity={0.35} />
      ))}
      {/* cửa sổ băng + cửa xuất hàng */}
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <rect key={k} x={52 + k * 15} y={y - 36} width={9} height={6} rx={1} {...lit} />
      ))}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={56 + k * 34} y={y - 20} width={22} height={20} fill="none" stroke={BLUE3} strokeOpacity="0.7" />
          <path d={`M${56 + k * 34} ${y - 14} h22 M${56 + k * 34} ${y - 8} h22`} stroke={BLUE3} strokeOpacity="0.35" />
        </g>
      ))}
      <rect x={168} y={y - 74} width={38} height={74} {...s} />
      {[0, 1, 2, 3, 4, 5].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={174 + c * 10} y={y - 66 + r * 11} width={6} height={6} rx={1} {...lit} fillOpacity={(r + c) % 3 === 0 ? 0.2 : 0.6} />
        )),
      )}

      {/* ── Nhà máy điện lạnh: khối lớn mái phẳng, máy lạnh trên mái, cụm dàn nóng ── */}
      <rect x={232} y={y - 62} width={124} height={62} {...s} />
      {[0, 1].map((r) => (
        <rect key={r} x={242} y={y - 50 + r * 16} width={104} height={7} rx={1.5} {...lit} fillOpacity={r ? 0.35 : 0.55} />
      ))}
      <rect x={300} y={y - 18} width={26} height={18} fill="none" stroke={BLUE3} strokeOpacity="0.7" />
      {/* bông tuyết trên mặt tiền */}
      <g transform={`translate(262 ${y - 11})`} stroke={BLUE1} strokeWidth={1.3} strokeLinecap="round">
        <path d="M0 -7 V7 M-6 -3.5 L6 3.5 M-6 3.5 L6 -3.5" />
      </g>
      {/* máy lạnh trên mái */}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={248 + k * 34} y={y - 74} width={22} height={12} {...s} />
          <circle cx={259 + k * 34} cy={y - 68} r={3.5} fill="none" stroke={BLUE3} strokeOpacity="0.8" />
        </g>
      ))}
      {/* dàn nóng */}
      {[0, 1].map((k) => (
        <g key={k}>
          <rect x={364 + k * 22} y={y - 40 + k * 10} width={18} height={40 - k * 10} rx={3} {...s} />
          <circle cx={373 + k * 22} cy={y - 30 + k * 10} r={5} fill="none" stroke={BLUE3} strokeOpacity="0.8" />
          <path d={`M${368 + k * 22} ${y - 30 + k * 10} h10 M${373 + k * 22} ${y - 35 + k * 10} v10`} stroke={BLUE3} strokeOpacity="0.5" />
        </g>
      ))}

      {/* ── Nhà máy thép: lò cao, băng tải, ống khói, xưởng cán và cuộn thép ── */}
      <circle cx={480} cy={y - 50} r={70} fill={ORANGE} opacity={0.08} />
      <path d={`M424 ${y} L452 ${y - 78}`} stroke={ORANGE} strokeOpacity="0.8" strokeWidth={1.4} />
      <path d={`M432 ${y} L458 ${y - 74}`} stroke={ORANGE} strokeOpacity="0.5" strokeWidth={1.2} />
      <path d={`M446 ${y} L454 ${y - 80} H478 L486 ${y} Z`} {...o} />
      <rect x={450} y={y - 90} width={32} height={10} rx={2} {...o} />
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M${448 + k * 1.6} ${y - 18 - k * 16} H${484 - k * 1.6}`} stroke={ORANGE} strokeOpacity="0.55" />
      ))}
      <rect x={458} y={y - 14} width={16} height={14} fill={ORANGE} fillOpacity={0.5} stroke="none" />
      <rect x={494} y={y - 88} width={10} height={88} {...o} />
      <rect x={510} y={y - 74} width={10} height={74} {...o} />
      <path d={`M494 ${y - 80} h10 M510 ${y - 66} h10`} stroke={ORANGE} strokeOpacity="0.6" />
      <circle cx={499} cy={y - 98} r={7} fill={ORANGE} opacity={0.14} />
      <circle cx={505} cy={y - 110} r={9} fill={ORANGE} opacity={0.08} />
      <circle cx={515} cy={y - 84} r={6} fill={ORANGE} opacity={0.12} />
      <path d={`M526 ${y} V${y - 34} H604 V${y} Z`} {...o} />
      <rect x={540} y={y - 42} width={50} height={8} {...o} />
      <rect x={534} y={y - 26} width={62} height={6} rx={1.5} fill={ORANGE} fillOpacity={0.4} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <circle cx={542 + k * 18} cy={y - 8} r={7.5} fill={FILL} stroke={ORANGE} strokeWidth={1.4} />
          <circle cx={542 + k * 18} cy={y - 8} r={3} fill="none" stroke={ORANGE} strokeOpacity="0.7" />
        </g>
      ))}

      {/* nhãn */}
      {[
        { x: 125, label: "Nhà máy gia dụng", c: BLUE3 },
        { x: 318, label: "Nhà máy điện lạnh", c: BLUE3 },
        { x: 515, label: "Nhà máy thép", c: ORANGE },
      ].map((l) => (
        <g key={l.label}>
          <circle cx={l.x - l.label.length * 3.3 - 8} cy={y + 20} r={3} fill={l.c} />
          <text x={l.x} y={y + 24} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={l.c === ORANGE ? ORANGE : "#fff"}>
            {l.label}
          </text>
        </g>
      ))}
    </g>
  );
}
