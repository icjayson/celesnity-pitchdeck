"use client";
import { useId } from "react";
import { LoopSvg } from "../shared/motion";
import { isoBox } from "../shared/iso";

const EASE = "0.22 1 0.36 1";
const HOLD = "0 0 1 1";
const NAVY = "#0A1F44";
const INK = "#5B6B85";
const LINE = "#DCE3EE";
const BLUE5 = "#2F7BF6";
const BLUE3 = "#8DB8FF";
const BLUE1 = "#E6F0FF";

const safeId = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, "");

type ArtProps = { play: boolean; reduced: boolean };

/** Làn sóng 1: cánh tay robot lặp đúng một thao tác đã lập trình. */
export function RobotArmArt({ play, reduced }: ArtProps) {
  const dur = "3.2s";
  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.3} viewBox="0 0 200 120" className="h-full w-full">
      <line x1={10} y1={106} x2={190} y2={106} stroke={LINE} strokeWidth={1.5} strokeLinecap="round" />
      {/* băng chuyền */}
      <rect x={96} y={94} width={92} height={9} rx={4.5} fill="#fff" stroke={NAVY} strokeWidth={1.5} />
      {[105, 124, 143, 162, 180].map((x) => (
        <circle key={x} cx={x} cy={98.5} r={1.6} fill={INK} />
      ))}
      {[0, -1.6].map((b) => (
        <g key={b} opacity={0}>
          <rect x={-6} y={-11} width={12} height={10} rx={2} fill="#F6F8FC" stroke={NAVY} strokeWidth={1.5} />
          <animateMotion path="M110 94 L178 94" dur={dur} begin={`${b}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" dur={dur} begin={`${b}s`} repeatCount="indefinite" />
        </g>
      ))}
      {/* vết đường đi lặp lại */}
      <path d="M58 40 Q 86 30 86 72" fill="none" stroke={INK} strokeOpacity={0.35} strokeWidth={1} strokeDasharray="2 4" />
      {/* đế */}
      <rect x={28} y={95} width={34} height={10} rx={2.5} fill="#fff" stroke={NAVY} strokeWidth={1.5} />
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-18 45 90;24 45 90;24 45 90;-18 45 90;-18 45 90"
          keyTimes="0;0.35;0.5;0.85;1"
          calcMode="spline"
          keySplines={`${EASE};${HOLD};${EASE};${HOLD}`}
          dur={dur}
          repeatCount="indefinite"
        />
        <rect x={41} y={50} width={8} height={42} rx={4} fill="#fff" stroke={NAVY} strokeWidth={1.5} />
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-8 45 52;28 45 52;28 45 52;-8 45 52;-8 45 52"
            keyTimes="0;0.35;0.5;0.85;1"
            calcMode="spline"
            keySplines={`${EASE};${HOLD};${EASE};${HOLD}`}
            dur={dur}
            repeatCount="indefinite"
          />
          <rect x={43} y={48} width={36} height={8} rx={4} fill="#fff" stroke={NAVY} strokeWidth={1.5} />
          <path d="M73 57 L73 65 M81 57 L81 65 M72 57 L82 57" stroke={NAVY} strokeWidth={1.5} strokeLinecap="round" fill="none" />
          <circle cx={77} cy={52} r={2.5} fill={NAVY} />
        </g>
        <circle cx={45} cy={52} r={4.5} fill="#fff" stroke={NAVY} strokeWidth={1.5} />
      </g>
      <circle cx={45} cy={90} r={5} fill={NAVY} />
    </LoopSvg>
  );
}

/** Làn sóng 2: bong bóng chat, AI gõ rồi trả lời. */
export function ChatArt({ play, reduced }: ArtProps) {
  const dur = "4.8s";
  const lines = [
    { y: 68, w: 82, kt: "0;0.3;0.42;0.94;1" },
    { y: 78, w: 66, kt: "0;0.4;0.52;0.94;1" },
    { y: 88, w: 40, kt: "0;0.5;0.6;0.94;1" },
  ];
  return (
    <LoopSvg play={play} reduced={reduced} staticAt={3.6} viewBox="0 0 200 120" className="h-full w-full">
      {/* câu hỏi của người dùng */}
      <path d="M102 12 h74 a10 10 0 0 1 10 10 v8 a10 10 0 0 1 -10 10 h-74 a10 10 0 0 1 -10 -10 v-8 a10 10 0 0 1 10 -10 z M174 40 l6 7 l1 -7 z" fill={NAVY} />
      <rect x={104} y={20} width={58} height={4.5} rx={2.25} fill="#fff" opacity={0.75} />
      <rect x={104} y={29} width={38} height={4.5} rx={2.25} fill="#fff" opacity={0.45} />
      {/* trả lời của AI */}
      <circle cx={20} cy={98} r={7} fill={BLUE1} stroke={BLUE5} strokeWidth={1.5} />
      <path d="M20 94.5 L21 97 L23.5 98 L21 99 L20 101.5 L19 99 L16.5 98 L19 97 Z" fill={BLUE5} />
      <path d="M44 54 h104 a12 12 0 0 1 12 12 v26 a12 12 0 0 1 -12 12 h-104 a12 12 0 0 1 -12 -12 v-2 l-6 6 l0 -10 v-20 a12 12 0 0 1 12 -12 z" fill="#fff" stroke={BLUE3} strokeWidth={1.5} />
      <g>
        <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.27;0.3;0.97;1" dur={dur} repeatCount="indefinite" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={52 + i * 10} cy={79} r={3} fill={BLUE5} opacity={0.75}>
            <animate attributeName="cy" values="79;74;79;79" keyTimes="0;0.25;0.5;1" dur="0.9s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      {lines.map((l, i) => (
        <rect key={i} x={46} y={l.y - 2.5} height={5} rx={2.5} width={0} fill={i === 0 ? BLUE5 : NAVY} opacity={i === 0 ? 0.55 : 0.22}>
          <animate attributeName="width" values={`0;0;${l.w};${l.w};0`} keyTimes={l.kt} dur={dur} repeatCount="indefinite" />
        </rect>
      ))}
    </LoopSvg>
  );
}

/** Làn sóng 3: nhà máy và các "tương lai mờ" tỏa ra (dự báo hệ quả của quyết định). */
export function WorldModelArt({ play, reduced }: ArtProps) {
  const uid = safeId(useId());
  const factory = isoBox(52, 98, 34, 24, 16);
  const chimney = isoBox(64, 70, 6, 6, 18);
  const futures = [
    { d: "M88 74 C 108 62, 124 44, 146 40", gx: 160, gy: 48, begin: "0s" },
    { d: "M88 80 C 110 80, 128 78, 146 77", gx: 162, gy: 85, begin: "-1.2s" },
    { d: "M88 86 C 108 98, 124 108, 146 108", gx: 160, gy: 116, begin: "-2.4s" },
  ];
  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.4} viewBox="0 0 200 124" className="h-full w-full">
      <defs>
        <radialGradient id={`${uid}g`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={BLUE5} stopOpacity={0.55} />
          <stop offset="1" stopColor={BLUE5} stopOpacity={0} />
        </radialGradient>
        <filter id={`${uid}b`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={0.7} />
        </filter>
      </defs>
      <circle cx={56} cy={78} r={54} fill={`url(#${uid}g)`} />
      {futures.map((f, i) => {
        const g = isoBox(f.gx, f.gy, 16, 11, 8);
        return (
          <g key={i}>
            <path d={f.d} fill="none" stroke={BLUE3} strokeOpacity={0.55} strokeWidth={1.2} strokeDasharray="2 4">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="1.2s" repeatCount="indefinite" />
            </path>
            <circle r={1.8} fill="#fff">
              <animateMotion path={f.d} dur="2.4s" begin={f.begin} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.4s" begin={f.begin} repeatCount="indefinite" />
            </circle>
            <g filter={`url(#${uid}b)`} opacity={0.25}>
              <animate attributeName="opacity" values="0.2;0.75;0.2" dur="3.6s" begin={f.begin} repeatCount="indefinite" />
              <polygon points={g.left} fill={BLUE3} fillOpacity={0.18} stroke={BLUE3} strokeWidth={1} />
              <polygon points={g.right} fill={BLUE3} fillOpacity={0.28} stroke={BLUE3} strokeWidth={1} />
              <polygon points={g.top} fill={BLUE3} fillOpacity={0.4} stroke={BLUE3} strokeWidth={1} />
            </g>
          </g>
        );
      })}
      <g strokeLinejoin="round">
        <polygon points={factory.left} fill="#0F2A5C" stroke={BLUE3} strokeWidth={1.5} />
        <polygon points={factory.right} fill="#16367A" stroke={BLUE3} strokeWidth={1.5} />
        <polygon points={factory.top} fill="#1F4A9A" stroke={BLUE3} strokeWidth={1.5} />
        <polygon points={chimney.left} fill="#0F2A5C" stroke={BLUE3} strokeWidth={1.5} />
        <polygon points={chimney.right} fill="#16367A" stroke={BLUE3} strokeWidth={1.5} />
        <polygon points={chimney.top} fill="#1F4A9A" stroke={BLUE3} strokeWidth={1.5} />
        {[0, 1, 2].map((i) => {
          const x = 57 + i * 8;
          const y = 92 - i * 4.6;
          return <polygon key={i} points={`${x},${y} ${x + 4.3},${y - 2.5} ${x + 4.3},${y - 7.5} ${x},${y - 5}`} fill={BLUE3} opacity={0.85} />;
        })}
      </g>
    </LoopSvg>
  );
}
