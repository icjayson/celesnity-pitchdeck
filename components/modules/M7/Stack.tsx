"use client";
import { useId } from "react";
import { LoopSvg } from "../shared/motion";
import { isoBox } from "../shared/iso";

export const STACK_W = 560;
export const STACK_H = 384;
/** Toạ độ góc đáy gần nhất (B) của ba tầng, từ trên xuống: ③, ②, ① */
const CX = 200;
export const SLAB_Y = [192, 276, 360];
const W = 150;
const H = 18;
/** Đỉnh phải mặt trên của mỗi tầng: nơi kéo đường dẫn tới nhãn */
export const anchorY = (i: number) => SLAB_Y[i] - W * 0.5 - H;
export const ANCHOR_X = CX + W * 0.866;
export const LABEL_X = 352;

const NAVY = "#0A1F44";
const BLUE6 = "#1F5FD6";
const BLUE5 = "#2F7BF6";
const BLUE4 = "#4FA3F7";
const BLUE3 = "#8DB8FF";
const LINE = "#DCE3EE";
const T = "450ms cubic-bezier(0.22, 1, 0.36, 1)";

type SlabStyle = { top: string; left: string; right: string; stroke: string; inner: string };

export function LayerStack({
  active,
  onPick,
  play,
  reduced,
}: {
  /** 0 = ③, 1 = ②, 2 = ①, 3 = con người */
  active: number;
  onPick: (i: number) => void;
  play: boolean;
  reduced: boolean;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const styles: SlabStyle[] = [
    { top: "#FFFFFF", left: "#F6F8FC", right: "#E9EEF6", stroke: NAVY, inner: LINE },
    { top: `url(#${uid}mid)`, left: BLUE6, right: "#1A50B8", stroke: BLUE3, inner: "rgba(255,255,255,0.45)" },
    { top: "#0F2A5C", left: "#0A1F44", right: "#06142E", stroke: "#16367A", inner: "rgba(141,184,255,0.35)" },
  ];

  // Vẽ từ dưới lên để tầng trên che tầng dưới
  const order = [2, 1, 0];
  const top3 = isoBox(CX, SLAB_Y[0], W, W, H).topPts;
  const bot1 = isoBox(CX, SLAB_Y[2], W, W, H).topPts;
  const loopD = `M${top3.left[0] - 2} ${top3.left[1] + 10} C ${top3.left[0] - 40} ${top3.left[1] + 50}, ${bot1.left[0] - 40} ${bot1.left[1] - 30}, ${bot1.left[0] - 4} ${bot1.left[1] + 4}`;

  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.2} viewBox={`0 0 ${STACK_W} ${STACK_H}`} className="h-auto w-full">
      <defs>
        <linearGradient id={`${uid}mid`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BLUE4} />
          <stop offset="1" stopColor={BLUE5} />
        </linearGradient>
        <filter id={`${uid}glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={22} />
        </filter>
        <marker id={`${uid}arrow`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1 L8 5 L1 9" fill="none" stroke={BLUE5} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* quầng sáng của tầng ② */}
      <polygon points={isoBox(CX, SLAB_Y[1], W, W, H).top} fill={BLUE5} opacity={0.55} filter={`url(#${uid}glow)`}>
        <animate attributeName="opacity" values="0.4;0.65;0.4" dur="4s" repeatCount="indefinite" />
      </polygon>

      {order.map((i) => {
        const box = isoBox(CX, SLAB_Y[i], W, W, H);
        const inner = isoBox(CX, SLAB_Y[i] - 22, W - 44, W - 44, H);
        const s = styles[i];
        const on = active === i;
        return (
          <g
            key={i}
            onClick={() => onPick(i)}
            className="cursor-pointer"
            style={{ transform: on ? "translateY(-6px)" : "none", transition: `transform ${T}` }}
          >
            <polygon points={box.left} fill={s.left} stroke={s.stroke} strokeWidth={1.5} strokeLinejoin="round" />
            <polygon points={box.right} fill={s.right} stroke={s.stroke} strokeWidth={1.5} strokeLinejoin="round" />
            <polygon
              points={box.top}
              fill={s.top}
              stroke={on ? (i === 1 ? "#FFFFFF" : BLUE5) : s.stroke}
              strokeWidth={on ? 2 : 1.5}
              strokeLinejoin="round"
              style={{ transition: `stroke ${T}` }}
            />
            {/* ô lưới nhỏ trên mặt trên */}
            <polygon points={inner.top} fill="none" stroke={s.inner} strokeWidth={1} strokeDasharray={i === 1 ? undefined : "3 4"} />
            {i === 1 ? <circle cx={CX} cy={SLAB_Y[1] - H - W * 0.5} r={7} fill="#fff" opacity={0.9} /> : null}
          </g>
        );
      })}

      {/* đường dẫn tới nhãn + số tầng */}
      {[0, 1, 2].map((i) => {
        const y = anchorY(i) - (active === i ? 6 : 0);
        return (
          <g key={i} style={{ transition: `transform ${T}` }}>
            <line x1={ANCHOR_X + 4} y1={y} x2={LABEL_X - 6} y2={y} stroke={active === i ? NAVY : LINE} strokeWidth={1.25} style={{ transition: `stroke ${T}` }} />
            <circle cx={ANCHOR_X + 4} cy={y} r={3} fill={active === i ? NAVY : "#fff"} stroke={NAVY} strokeWidth={1.25} />
          </g>
        );
      })}

      {/* vòng học ↻: từ tầng ③ quay về tầng ① */}
      <path d={loopD} fill="none" stroke={BLUE5} strokeOpacity={0.45} strokeWidth={1.5} strokeDasharray="3 5" markerEnd={`url(#${uid}arrow)`} />
      <g>
        <circle r={9} fill={BLUE5} opacity={0.18} />
        <circle r={4} fill={BLUE5} />
        <circle r={1.8} fill="#fff" />
        <animateMotion path={loopD} dur="2.8s" repeatCount="indefinite" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.35 1" />
      </g>
      <text
        x={top3.left[0] - 56}
        y={(top3.left[1] + bot1.left[1]) / 2}
        transform={`rotate(-90 ${top3.left[0] - 56} ${(top3.left[1] + bot1.left[1]) / 2})`}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={BLUE6}
        letterSpacing="0.06em"
      >
        VÒNG HỌC ↻
      </text>
    </LoopSvg>
  );
}
