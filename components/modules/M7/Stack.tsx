"use client";
import { useId } from "react";
import { useUi } from "@/components/deck/DeckProvider";
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

/** Sơ đồ dòng chảy (FlowStack), từ dưới lên: ① World Model → con người, máy móc, phần mềm, robot → ② Minder → người có thẩm quyền */
export const FLOW_H = 548;
const FLOW_WM_Y = 530;
const FLOW_MINDER_Y = 250;
/** Đỉnh phải mặt trên của khối World Model và khối Minder: nơi kéo đường dẫn tới nhãn */
export const FLOW_ANCHOR = { wm: FLOW_WM_Y - W * 0.5 - H, minder: FLOW_MINDER_Y - W * 0.5 - H };

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
  const ui = useUi();
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
        {ui.improvementLoop}
      </text>
    </LoopSvg>
  );
}

export type FlowKey = "wm" | "minder" | "people";

/** Màu sơ đồ dòng chảy: nền sáng (deck) và nền navy (trang /minder-video) */
const FLOW_LIGHT = {
  minder: { top: "#0F2A5C", left: "#0A1F44", right: "#06142E", stroke: "#16367A" },
  minderOn: BLUE5,
  flow: BLUE5,
  flowOpacity: 0.45,
  people: "#FFF4EA",
  peopleOn: "#FFE9D6",
  ink: NAVY,
  loopText: BLUE6,
  lead: LINE,
  leadOn: NAVY,
  dotOff: "#fff",
};
const FLOW_DARK: typeof FLOW_LIGHT = {
  minder: { top: "#16367A", left: "#0F2A5C", right: "#0A1F44", stroke: BLUE5 },
  minderOn: BLUE3,
  flow: BLUE4,
  flowOpacity: 0.7,
  people: "rgba(255,122,26,0.14)",
  peopleOn: "rgba(255,122,26,0.3)",
  ink: "#FFFFFF",
  loopText: BLUE3,
  lead: "rgba(141,184,255,0.35)",
  leadOn: BLUE3,
  dotOff: "#0A1F44",
};

/**
 * Sơ đồ dòng chảy (deck bật scenarios.m7.sources): không có tầng tác nhân AI. Đọc từ dưới lên:
 * ① World Model dự báo, đề xuất → con người, máy móc, phần mềm, robot thực hiện → ② Minder ghi lại → người có thẩm quyền phê duyệt (trên cùng);
 * vòng cải thiện đưa những gì Minder ghi lại xuống cho World Model học.
 */
export function FlowStack({
  active,
  onPick,
  play,
  reduced,
  sources,
  people,
  loopLabel,
  tone = "light",
}: {
  active: FlowKey;
  onPick: (k: FlowKey) => void;
  play: boolean;
  reduced: boolean;
  sources: string[];
  people: string;
  /** Chữ "vòng cải thiện ↻"; truyền vào để sơ đồ dùng được cả ngoài deck (trang /minder-video) */
  loopLabel: string;
  /** "dark": màu cho nền navy (trang /minder-video); mặc định là nền sáng như trong deck */
  tone?: "light" | "dark";
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const dark = tone === "dark";
  const pal = dark ? FLOW_DARK : FLOW_LIGHT;
  const slabs = [
    { key: "minder" as const, y: FLOW_MINDER_Y, layer: 2, s: pal.minder },
    { key: "wm" as const, y: FLOW_WM_Y, layer: 1, s: { top: `url(#${uid}mid)`, left: BLUE6, right: "#1A50B8", stroke: BLUE3 } },
  ];
  const topWm = isoBox(CX, FLOW_WM_Y, W, W, H).topPts;
  const topMd = isoBox(CX, FLOW_MINDER_Y, W, W, H).topPts;
  // vòng cải thiện: từ Minder (trên) quay xuống World Model (dưới)
  const loopD = `M${topMd.left[0] - 2} ${topMd.left[1] + 10} C ${topMd.left[0] - 40} ${topMd.left[1] + 50}, ${topWm.left[0] - 40} ${topWm.left[1] - 30}, ${topWm.left[0] - 4} ${topWm.left[1] + 4}`;
  const midY = (topWm.left[1] + topMd.left[1]) / 2;
  const PEOPLE_TOP = 8;
  const peopleOn = active === "people";
  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.2} viewBox={`0 0 ${STACK_W} ${FLOW_H}`} className="h-auto w-full">
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

      <polygon points={isoBox(CX, FLOW_WM_Y, W, W, H).top} fill={BLUE5} opacity={0.55} filter={`url(#${uid}glow)`}>
        <animate attributeName="opacity" values="0.4;0.65;0.4" dur="4s" repeatCount="indefinite" />
      </polygon>

      {/* chảy lên: World Model → nguồn (đề xuất được thực hiện) → Minder (mọi việc được ghi lại) */}
      {SRC_X.map((x, i) => (
        <g key={i}>
          <Flow x={x} y1={faceTopY(x, FLOW_WM_Y)} y2={SRC_TOP + SRC_H} delay={i * 0.45} color={pal.flow} opacity={pal.flowOpacity} />
          <Flow x={x} y1={SRC_TOP} y2={slabBottomY(x, FLOW_MINDER_Y) + 2} delay={i * 0.45 + 0.9} color={pal.flow} opacity={pal.flowOpacity} />
        </g>
      ))}
      {/* Minder → người có thẩm quyền */}
      <Flow x={CX} y1={faceTopY(CX, FLOW_MINDER_Y)} y2={PEOPLE_TOP + 48} delay={0.3} color={pal.flow} opacity={pal.flowOpacity} />

      {slabs.map(({ key, y, layer, s: st }) => {
        const box = isoBox(CX, y, W, W, H);
        const on = active === key;
        return (
          <g key={key} onClick={() => onPick(key)} className="cursor-pointer" style={{ transform: on ? "translateY(-6px)" : "none", transition: `transform ${T}` }}>
            <polygon points={box.left} fill={st.left} stroke={st.stroke} strokeWidth={1.5} strokeLinejoin="round" />
            <polygon points={box.right} fill={st.right} stroke={st.stroke} strokeWidth={1.5} strokeLinejoin="round" />
            <polygon
              points={box.top}
              fill={st.top}
              stroke={on ? (layer === 1 ? "#FFFFFF" : pal.minderOn) : st.stroke}
              strokeWidth={on ? 2 : 1.5}
              strokeLinejoin="round"
              style={{ transition: `stroke ${T}` }}
            />
            <Surface layer={layer} near={box.topPts.near} top={box.top} on={on} />
          </g>
        );
      })}

      <Sources labels={sources} dark={dark} />

      {/* Người có thẩm quyền */}
      <g onClick={() => onPick("people")} className="cursor-pointer">
        <rect
          x={CX - 100}
          y={PEOPLE_TOP}
          width={200}
          height={48}
          rx={12}
          fill={peopleOn ? pal.peopleOn : pal.people}
          stroke={ORANGE}
          strokeOpacity={peopleOn ? 1 : 0.5}
          strokeWidth={peopleOn ? 2 : 1.25}
          style={{ transition: `all ${T}` }}
        />
        <circle cx={CX - 76} cy={PEOPLE_TOP + 24} r={14} fill={ORANGE} />
        <g transform={`translate(${CX - 76} ${PEOPLE_TOP + 24})`} stroke={NAVY} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx={-1.5} cy={-3.5} r={3.2} />
          <path d="M-7.5 7 c0 -4.5 3 -6 6 -6 s4 1 5 2.5 M3 4.5 l2 2 l3.5 -3.5" />
        </g>
        <text x={CX - 54} y={PEOPLE_TOP + 29} fontSize={13} fontWeight={600} fill={pal.ink}>
          {people}
        </text>
      </g>

      {/* vòng cải thiện ↻: Minder ghi lại → World Model học */}
      <path d={loopD} fill="none" stroke={pal.flow} strokeOpacity={pal.flowOpacity} strokeWidth={1.5} strokeDasharray="3 5" markerEnd={`url(#${uid}arrow)`} />
      <g>
        <circle r={9} fill={BLUE5} opacity={0.18} />
        <circle r={4} fill={BLUE5} />
        <circle r={1.8} fill="#fff" />
        <animateMotion path={loopD} dur="2.8s" repeatCount="indefinite" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.35 1" />
      </g>
      <text
        x={topWm.left[0] - 56}
        y={midY}
        transform={`rotate(-90 ${topWm.left[0] - 56} ${midY})`}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={pal.loopText}
        letterSpacing="0.06em"
      >
        {loopLabel}
      </text>

      {/* đường dẫn tới nhãn hai khối */}
      {(["wm", "minder"] as const).map((k) => {
        const y = FLOW_ANCHOR[k] - (active === k ? 6 : 0);
        return (
          <g key={k}>
            <line x1={ANCHOR_X + 4} y1={y} x2={LABEL_X - 6} y2={y} stroke={active === k ? pal.leadOn : pal.lead} strokeWidth={1.25} style={{ transition: `stroke ${T}` }} />
            <circle cx={ANCHOR_X + 4} cy={y} r={3} fill={active === k ? pal.leadOn : pal.dotOff} stroke={pal.leadOn} strokeWidth={1.25} />
          </g>
        );
      })}
    </LoopSvg>
  );
}

/** Dòng chảy thẳng đứng từ y1 tới y2, chấm sáng chạy theo */
function Flow({
  x,
  y1,
  y2,
  delay,
  color = BLUE5,
  opacity = 0.45,
}: {
  x: number;
  y1: number;
  y2: number;
  delay: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeOpacity={opacity} strokeWidth={1.5} strokeDasharray="3 4" />
      <circle cx={x} r={3} fill={color}>
        <animate attributeName="cy" values={`${y1};${y2}`} dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

/** Hàng nguồn giữa hai khối: con người, máy móc, phần mềm, robot */
const SRC_X = [76, 153, 230, 307];
const SRC_TOP = 292;
const SRC_H = 52;
/** Cạnh đáy (trái/phải) của khối có góc đáy gần ở (CX, y): đi lên theo độ dốc 30° */
const slabBottomY = (x: number, y: number) => y - Math.abs(CX - x) * Math.tan(Math.PI / 6);
/** Cạnh xa (trái/phải) của mặt trên khối có góc đáy gần ở (CX, y) */
const faceTopY = (x: number, y: number) => y - H - W + Math.abs(CX - x) * Math.tan(Math.PI / 6);

function Sources({ labels, dark = false }: { labels: string[]; dark?: boolean }) {
  const glyphs = ["person", "machine", "software", "robot"] as const;
  const ink = dark ? "#E6F0FF" : NAVY;
  return (
    <g>
      {SRC_X.map((x, i) => (
        <g key={i}>
          <rect
            x={x - 34}
            y={SRC_TOP}
            width={68}
            height={SRC_H}
            rx={10}
            fill={dark ? "#0F2A5C" : "#fff"}
            stroke={dark ? "rgba(141,184,255,0.4)" : LINE}
            strokeWidth={1.25}
          />
          <g transform={`translate(${x} ${SRC_TOP + 18})`} stroke={ink} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <SourceGlyph kind={glyphs[i]} ink={ink} />
          </g>
          <text x={x} y={SRC_TOP + 43} textAnchor="middle" fontSize={11} fontWeight={600} fill={ink}>
            {labels[i]}
          </text>
        </g>
      ))}
    </g>
  );
}

function SourceGlyph({ kind, ink = NAVY }: { kind: "person" | "machine" | "software" | "robot"; ink?: string }) {
  if (kind === "person")
    return (
      <>
        <circle cx={0} cy={-4} r={4} />
        <path d="M-8 9 c0 -6 4 -8 8 -8 s8 2 8 8" />
      </>
    );
  if (kind === "machine")
    return (
      <>
        <circle cx={0} cy={0} r={4} />
        <path d="M0 -9 v3 M0 6 v3 M-9 0 h3 M6 0 h3 M-6.4 -6.4 l2.1 2.1 M4.3 4.3 l2.1 2.1 M-6.4 6.4 l2.1 -2.1 M4.3 -4.3 l2.1 -2.1" />
      </>
    );
  if (kind === "software")
    return (
      <>
        <rect x={-9} y={-7} width={18} height={14} rx={2} />
        <path d="M-9 -3 h18 M-4 1 l-2 2 l2 2 M4 1 l2 2 l-2 2" />
      </>
    );
  return (
    <>
      <rect x={-7} y={-5} width={14} height={11} rx={3} />
      <path d="M0 -5 v-3 M-9 0 v3 M9 0 v3" />
      <circle cx={-3} cy={0} r={0.8} fill={ink} />
      <circle cx={3} cy={0} r={0.8} fill={ink} />
    </>
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
          {/* phép chiếu mặt trên là phép lật gương: lật lại glyph để icon đứng đúng chiều */}
          <g transform={`translate(${t.u + S / 2} ${t.v + S / 2}) scale(1 -1)`} stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" {...ns}>
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
