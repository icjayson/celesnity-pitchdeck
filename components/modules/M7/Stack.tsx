"use client";
import { useId } from "react";
import { LoopSvg } from "../shared/motion";
import { isoBox } from "../shared/iso";

export const STACK_W = 560;
export const STACK_H = 456;
/** Toạ độ góc đáy gần nhất (B) của ba tầng, từ trên xuống: ③, ②, ① */
const CX = 200;
export const SLAB_Y = [196, 314, 432];
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

type SlabStyle = { top: string; left: string; right: string; stroke: string };

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
    { top: "#FFFFFF", left: "#F6F8FC", right: "#E9EEF6", stroke: NAVY },
    { top: `url(#${uid}mid)`, left: BLUE6, right: "#1A50B8", stroke: BLUE3 },
    { top: "#0F2A5C", left: "#0A1F44", right: "#06142E", stroke: "#16367A" },
  ];

  // Vẽ từ dưới lên để tầng trên che tầng dưới
  const order = [2, 1, 0];
  const top3 = isoBox(CX, SLAB_Y[0], W, W, H).topPts;
  const bot1 = isoBox(CX, SLAB_Y[2], W, W, H).topPts;
  const loopD = `M${top3.left[0] - 2} ${top3.left[1] + 10} C ${top3.left[0] - 40} ${top3.left[1] + 50}, ${bot1.left[0] - 40} ${bot1.left[1] - 30}, ${bot1.left[0] - 4} ${bot1.left[1] + 4}`;

  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.2} viewBox={`0 0 ${STACK_W} ${STACK_H}`} className="h-auto w-full">
      <style>{SURF_CSS}</style>
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
            {/* nội dung trên mặt trên: điều tầng đó làm */}
            <Surface layer={i} near={box.topPts.near} top={box.top} on={on} />
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
        VÒNG LẶP CẢI THIỆN ↻
      </text>
    </LoopSvg>
  );
}

/* ───────────── Nội dung mặt trên ─────────────
 * Vẽ trên mặt phẳng (u, v) ∈ [0, W]², rồi chiếu isometric lên mặt trên:
 * u chạy theo cạnh lên phải, v theo cạnh lên trái, gốc ở góc gần người xem.
 */
const C30 = Math.cos(Math.PI / 6);
const ORANGE = "#FF7A1A";
const SURF_CSS = `.m7s-pulse{animation:m7s-pulse 2.4s ease-in-out infinite}
@keyframes m7s-pulse{0%,100%{opacity:.45}50%{opacity:1}}
.m7s-draw{stroke-dasharray:1;animation:m7s-draw 1.6s cubic-bezier(.22,1,.36,1) both}
@keyframes m7s-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@media (prefers-reduced-motion: reduce){.m7s-pulse,.m7s-draw{animation:none}}`;

function Surface({ layer, near, top, on }: { layer: number; near: [number, number]; top: string; on: boolean }) {
  if (layer === 1) return <ForecastSurface near={near} top={top} on={on} />;
  const m = `matrix(${C30} -0.5 ${-C30} -0.5 ${near[0]} ${near[1]})`;
  return (
    <g transform={m} style={{ opacity: on ? 1 : 0.8, transition: `opacity ${T}` }}>
      {layer === 2 ? <RecordSurface on={on} /> : <AgentSurface on={on} />}
    </g>
  );
}

const ns = { vectorEffect: "non-scaling-stroke" as const };

/** ① Ghi lại: bốn nguồn dữ liệu (giọng nói, ERP, kiểm tra, bảo hành) đổ về một kho chung */
function RecordSurface({ on }: { on: boolean }) {
  const tiles = [
    { u: 14, v: 14, glyph: "voice" },
    { u: 82, v: 14, glyph: "erp" },
    { u: 14, v: 82, glyph: "check" },
    { u: 82, v: 82, glyph: "shield" },
  ] as const;
  const S = 50;
  const c = W / 2;
  return (
    <g>
      {/* dòng dữ liệu về kho chung ở giữa */}
      {tiles.map((t) => (
        <line key={`l${t.glyph}`} x1={t.u + S / 2} y1={t.v + S / 2} x2={c} y2={c} stroke={BLUE3} strokeOpacity={0.5} strokeDasharray="2 3" {...ns} />
      ))}
      {tiles.map((t, i) => (
        <g key={t.glyph}>
          <rect x={t.u} y={t.v} width={S} height={S} rx={8} fill="rgba(47,123,246,0.28)" stroke={BLUE3} strokeOpacity={0.6} {...ns} />
          <g transform={`translate(${t.u + S / 2} ${t.v + S / 2})`} stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" {...ns}>
            {t.glyph === "voice" ? (
              <>
                <rect x={-5} y={-12} width={10} height={16} rx={5} {...ns} />
                <path d="M-10 0 a10 10 0 0 0 20 0 M0 10 v5" {...ns} />
              </>
            ) : t.glyph === "erp" ? (
              <path d="M-12 -9 h24 M-12 -3 h24 M-12 3 h24 M-12 9 h16 M-4 -12 v24" {...ns} />
            ) : t.glyph === "check" ? (
              <path d="M-11 0 l7 7 l15 -15" {...ns} />
            ) : (
              <path d="M0 -13 l11 4 v7 c0 7 -5 11 -11 14 c-6 -3 -11 -7 -11 -14 v-7 z" {...ns} />
            )}
          </g>
          {on ? <rect x={t.u} y={t.v} width={S} height={S} rx={8} fill="none" stroke="#fff" strokeWidth={1.5} className="m7s-pulse" style={{ animationDelay: `${i * 0.6}s` }} {...ns} /> : null}
        </g>
      ))}
      <circle cx={c} cy={c} r={9} fill={BLUE5} stroke="#fff" strokeWidth={1.5} {...ns} />
    </g>
  );
}

/** ② Dự báo: vẽ thẳng đứng trong mặt trên (cắt theo mặt): lịch sử rẽ thành ba tương lai kèm dải độ chắc chắn */
function ForecastSurface({ near, top, on }: { near: [number, number]; top: string; on: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [x0, y0] = near;
  // (x, h): x lệch ngang so với góc gần, h là độ cao phía trên góc gần
  const P = (x: number, h: number) => `${x0 + x} ${y0 - h}`;
  const hist = `M${P(-100, 72)} L${P(-85, 79)} L${P(-70, 68)} L${P(-55, 77)} L${P(-40, 70)} L${P(-25, 75)} L${P(-10, 72)}`;
  const branches = [
    { d: `M${P(-10, 72)} C ${P(30, 72)}, ${P(60, 84)}, ${P(100, 90)}`, pick: false },
    { d: `M${P(-10, 72)} C ${P(30, 72)}, ${P(60, 73)}, ${P(100, 74)}`, pick: false },
    { d: `M${P(-10, 72)} C ${P(30, 72)}, ${P(60, 62)}, ${P(100, 58)}`, pick: true },
  ];
  return (
    <g style={{ opacity: on ? 1 : 0.85, transition: `opacity ${T}` }}>
      <defs>
        <clipPath id={`${uid}clip`}>
          <polygon points={top} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}clip)`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={`M${P(-10, 72)} L${P(110, 96)} L${P(110, 52)} Z`} fill="#fff" fillOpacity={0.16} stroke="none" />
        <line x1={x0 - 10} y1={y0 - 40} x2={x0 - 10} y2={y0 - 104} stroke="#fff" strokeOpacity={0.45} strokeDasharray="2 3" />
        <path d={hist} stroke="#fff" strokeWidth={2} />
        {branches.map((b, i) => (
          <path
            key={i}
            d={b.d}
            stroke={b.pick ? "#fff" : "rgba(255,255,255,0.6)"}
            strokeWidth={b.pick ? 3 : 1.5}
            strokeDasharray={b.pick ? undefined : "4 4"}
            pathLength={b.pick ? 1 : undefined}
            className={b.pick && on ? "m7s-draw" : undefined}
          />
        ))}
        <circle cx={x0 - 10} cy={y0 - 72} r={4} fill="#fff" stroke="none" />
        <circle cx={x0 + 100} cy={y0 - 58} r={5} fill={ORANGE} stroke="#fff" strokeWidth={1.5} />
      </g>
    </g>
  );
}

/** ③ Hành động: ba việc tác nhân AI soạn sẵn; mỗi việc đã được mô hình kiểm tra, một việc chờ người duyệt */
function AgentSurface({ on }: { on: boolean }) {
  const cards = [
    { v: 16, state: "done" },
    { v: 56, state: "done" },
    { v: 96, state: "wait" },
  ] as const;
  return (
    <g>
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={14} y={c.v} width={122} height={32} rx={7} fill="#F1F5FB" stroke={LINE} {...ns} />
          <circle cx={30} cy={c.v + 16} r={8} fill={c.state === "wait" ? ORANGE : BLUE5} stroke="none" className={c.state === "wait" && on ? "m7s-pulse" : undefined} />
          {c.state === "done" ? (
            <path d={`M26 ${c.v + 16} l3 3 l6 -6`} fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...ns} />
          ) : (
            <path d={`M30 ${c.v + 12} v5 M30 ${c.v + 20} v0.5`} fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" {...ns} />
          )}
          <path d={`M46 ${c.v + 12} h${70 - i * 10} M46 ${c.v + 21} h${48 - i * 6}`} stroke={NAVY} strokeOpacity={0.35} strokeWidth={2} strokeLinecap="round" {...ns} />
        </g>
      ))}
    </g>
  );
}
