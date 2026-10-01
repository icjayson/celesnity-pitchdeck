"use client";
/**
 * Cảnh "Nhà máy sống": ba đảo isometric (Gia dụng · Điện lạnh · Thép) và lõi Mô hình AI Thế giới thực.
 * Dùng chung cho M1 (hero và câu chuyện), M5 (bản đồ thu nhỏ), M8 (bản đồ Tập đoàn), M14 (đoạn kết).
 *
 * Đảo và lõi vẽ bằng SVG (viewBox 800 × 520, co giãn theo khung); hạt và tia sáng vẽ bằng Canvas 2D phủ lên
 * (components/art/sceneEngine.ts). Canvas tạm dừng khi ngoài khung nhìn, dừng hẳn khi giảm chuyển động.
 */
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { IslandArt, paletteFor } from "./Islands";
import { SceneEngine, type EngineTargets } from "./sceneEngine";
import {
  CONNECTORS,
  CORE,
  FUTURE_BRANCHES,
  FUTURE_CHOSEN,
  FUTURE_START,
  HALF,
  HEX,
  ISLAND_IDS,
  ISLAND_POS,
  SLAB,
  VB_H,
  VB_W,
  box,
} from "./geometry";

export type IslandId = "gia-dung" | "dien-lanh" | "thep";

export type FactorySceneProps = {
  /** 0: toàn cảnh · 1: Tự học · 2: Dự báo trước · 3: Nhân rộng */
  state?: 0 | 1 | 2 | 3;
  /** Đảo được làm nổi bật; "all" = cả ba */
  highlight?: IslandId | "all" | null;
  /** Đảo thép phát sáng orange như "đích đến" (đoạn kết) */
  steelDestination?: boolean;
  /** Bản thu nhỏ, ít hạt */
  compact?: boolean;
  /** Bật hạt chuyển động (tự tắt khi giảm chuyển động) */
  particles?: boolean;
  /** Hiện nhãn tên đảo */
  showLabels?: boolean;
  /** Đảo có thể bấm */
  onIslandClick?: (id: IslandId) => void;
  selectedIsland?: IslandId | null;
  /** Hạt bay về lõi từ cả ba đảo (cuối ngày M5) */
  converge?: boolean;
  className?: string;
  /** Nền đặt cảnh: "dark" (navy, mặc định) hoặc "light" (trắng/mist, như M8) */
  tone?: "dark" | "light";
  /** Nội dung phụ hiển thị dưới nhãn tên mỗi đảo (ví dụ mốc thời gian ở M8). Chỉ hiện khi showLabels. */
  islandNotes?: Partial<Record<IslandId, ReactNode>>;
  /** Hiện nhãn "Mô hình AI Thế giới thực" cạnh lõi khi showLabels (mặc định true) */
  showCoreLabel?: boolean;
};

export const ISLAND_NAMES: Record<IslandId, string> = {
  "gia-dung": "Gia dụng",
  "dien-lanh": "Điện lạnh",
  thep: "Thép",
};

const CORE_NAME = "Mô hình AI Thế giới thực";

const EASE = "var(--ease-brand)";
const tr = (props: string[], ms = 500, delay = 0) => props.map((p) => `${p} ${ms}ms ${EASE} ${delay}ms`).join(", ");
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function FactoryScene({
  state = 0,
  highlight = null,
  steelDestination = false,
  compact = false,
  particles = true,
  showLabels = false,
  onIslandClick,
  selectedIsland = null,
  converge = false,
  className = "",
  tone = "dark",
  islandNotes,
  showCoreLabel = true,
}: FactorySceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [wrapRef, inView] = useInView<HTMLDivElement>("160px");
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SceneEngine | null>(null);
  const [hovered, setHovered] = useState<IslandId | null>(null);
  const light = tone === "light";

  const targets: EngineTargets = { state, converge, steel: steelDestination, compact, tone, highlight };
  const targetsRef = useRef(targets);
  targetsRef.current = targets;
  const animate = particles && !reduced;

  // Tạo bộ vẽ Canvas một lần, theo dõi kích thước khung
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const engine = new SceneEngine(canvas, targetsRef.current);
    engineRef.current = engine;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      engine.resize(width, height);
    });
    ro.observe(wrap);
    return () => {
      ro.disconnect();
      engine.stop();
      engineRef.current = null;
    };
  }, [wrapRef]);

  // Cập nhật đích chuyển trạng thái
  useEffect(() => {
    const e = engineRef.current;
    if (!e) return;
    e.setTargets(targetsRef.current);
    if (e.staticMode) e.renderStatic();
  }, [state, converge, steelDestination, compact, tone, highlight]);

  // Chạy, tạm dừng (ngoài khung nhìn) hoặc dừng hẳn (giảm chuyển động / tắt hạt)
  useEffect(() => {
    const e = engineRef.current;
    if (!e) return;
    if (!animate) e.renderStatic();
    else if (inView) e.start();
    else e.stop();
  }, [animate, inView]);

  const learnFrom = (id: IslandId) => converge || (state === 1 && id === "gia-dung");
  const isDim = (id: IslandId) => highlight != null && highlight !== "all" && highlight !== id;
  const strokeVar = compact ? "[--fs-stroke:1px]" : "[--fs-stroke:1.1px] sm:[--fs-stroke:1.5px]";

  const futureOn = state === 2;
  const coreStroke = light ? HEX.blue500 : HEX.blue300;
  const lineColor = light ? HEX.blue500 : HEX.blue300;

  return (
    <div ref={wrapRef} className={`relative aspect-[800/520] w-full select-none ${strokeVar} ${className}`}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
        focusable="false"
      >
        <defs>
          <radialGradient id={`${uid}-core`} cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#DCE9FF" />
            <stop offset="34%" stopColor={HEX.blue300} />
            <stop offset="100%" stopColor={HEX.blue500} />
          </radialGradient>
          <radialGradient id={`${uid}-halo`}>
            <stop offset="0%" stopColor={HEX.blue500} stopOpacity={light ? 0.22 : 0.38} />
            <stop offset="55%" stopColor={HEX.blue500} stopOpacity={light ? 0.07 : 0.12} />
            <stop offset="100%" stopColor={HEX.blue500} stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${uid}-sel`}>
            <stop offset="0%" stopColor={HEX.blue500} stopOpacity={light ? 0.2 : 0.34} />
            <stop offset="100%" stopColor={HEX.blue500} stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${uid}-dest`}>
            <stop offset="0%" stopColor={HEX.orange500} stopOpacity={light ? 0.3 : 0.42} />
            <stop offset="60%" stopColor={HEX.orange500} stopOpacity={light ? 0.1 : 0.14} />
            <stop offset="100%" stopColor={HEX.orange500} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Quầng sáng nền phía sau lõi */}
        <circle cx={CORE.x} cy={CORE.y + 10} r={150} fill={`url(#${uid}-halo)`} />

        {/* Đường nối mảnh từ mỗi đảo lên lõi */}
        <g fill="none" strokeLinecap="round">
          {ISLAND_IDS.map((id) => {
            const c = CONNECTORS[id];
            const on = learnFrom(id);
            return (
              <path
                key={id}
                d={`M${c.from[0]} ${c.from[1]}Q${c.ctrl[0]} ${c.ctrl[1]} ${c.to[0]} ${c.to[1]}`}
                stroke={lineColor}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                strokeDasharray="2 5"
                style={{ opacity: (on ? 0.75 : light ? 0.4 : 0.3) * (isDim(id) ? 0.4 : 1), transition: tr(["opacity"]) }}
              />
            );
          })}
        </g>

        {/* Quầng dưới đảo: đảo đang chọn (blue) và đích đến thép (orange) */}
        {ISLAND_IDS.map((id) => {
          const { x, y } = ISLAND_POS[id];
          const on = selectedIsland === id || hovered === id;
          return (
            <ellipse
              key={id}
              cx={x}
              cy={y + 12}
              rx={170}
              ry={96}
              fill={`url(#${uid}-sel)`}
              style={{ opacity: on ? (selectedIsland === id ? 1 : 0.6) : 0, transition: tr(["opacity"]) }}
            />
          );
        })}
        <ellipse
          cx={ISLAND_POS.thep.x}
          cy={ISLAND_POS.thep.y + 4}
          rx={190}
          ry={120}
          fill={`url(#${uid}-dest)`}
          style={{ opacity: steelDestination ? 1 : 0, transition: tr(["opacity"], 600) }}
        />

        {/* Ba đảo */}
        {ISLAND_IDS.map((id) => {
          const pal = paletteFor(id, tone);
          const dest = id === "thep" && steelDestination;
          const lift = selectedIsland === id || hovered === id;
          const style: CSSProperties = {
            stroke: dest ? HEX.orange500 : pal.stroke,
            strokeWidth: "var(--fs-stroke)",
            opacity: isDim(id) ? 0.32 : 1,
            transform: lift ? "translateY(-5px)" : "translateY(0)",
            transition: tr(["stroke", "opacity", "transform"]),
          };
          return (
            <g key={id} strokeLinejoin="round" strokeLinecap="round" style={style}>
              <IslandArt id={id} tone={tone} />
            </g>
          );
        })}

        {/* Dự báo trước: 2–3 nhánh "tương lai mờ" trước dây chuyền gia dụng; một nhánh được chọn */}
        <g style={{ opacity: futureOn ? 1 : 0, transition: tr(["opacity"]) }} fill="none" strokeLinecap="round">
          {FUTURE_BRANCHES.map((b, i) => {
            const chosen = i === FUTURE_CHOSEN;
            const d = `M${FUTURE_START[0]} ${FUTURE_START[1]}Q${b.ctrl[0]} ${b.ctrl[1]} ${b.end[0]} ${b.end[1]}`;
            const ghost = box(b.end[0], b.end[1] + 4, -7, -7, 14, 14, 13);
            // Sau khi các nhánh hiện ra, nhánh được chọn sáng lên, nhánh khác mờ đi
            const settle = futureOn ? 520 : 0;
            const branchStyle: CSSProperties = chosen
              ? {
                  stroke: futureOn ? HEX.orange500 : lineColor,
                  opacity: futureOn ? 1 : 0.3,
                  transition: `${tr(["stroke", "opacity"], 500, settle)}`,
                }
              : { stroke: lineColor, opacity: futureOn ? 0.12 : 0.3, transition: tr(["opacity"], 500, settle) };
            return (
              <g key={i} style={branchStyle}>
                <path d={d} strokeWidth={chosen ? 1.5 : 1.2} vectorEffect="non-scaling-stroke" strokeDasharray={chosen ? undefined : "3 5"} />
                <g strokeWidth={1.2} strokeLinejoin="round">
                  {[ghost.left, ghost.right, ghost.top].map((f, j) => (
                    <path
                      key={j}
                      d={f}
                      vectorEffect="non-scaling-stroke"
                      fill={chosen ? HEX.blue300 : lineColor}
                      fillOpacity={chosen ? [0.22, 0.14, 0.32][j] : [0.14, 0.08, 0.2][j]}
                    />
                  ))}
                </g>
              </g>
            );
          })}
          <circle cx={FUTURE_START[0]} cy={FUTURE_START[1]} r={3.5} fill={lineColor} stroke="none" opacity={0.85} />
        </g>

        {/* Lõi Mô hình AI Thế giới thực */}
        <g>
          <ellipse cx={CORE.x} cy={CORE.y + 8} rx={60} ry={20} fill="none" stroke={coreStroke} strokeOpacity={0.45} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <ellipse
            cx={CORE.x}
            cy={CORE.y + 8}
            rx={82}
            ry={28}
            fill="none"
            stroke={coreStroke}
            strokeOpacity={0.22}
            strokeWidth={1}
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={CORE.r}
            fill={`url(#${uid}-core)`}
            stroke={coreStroke}
            strokeOpacity={0.7}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          {/* Khối lập phương isometric bên trong: "mô hình của thế giới" */}
          <g fill="none" stroke={HEX.white} strokeOpacity={0.7} strokeWidth={1} strokeLinejoin="round" vectorEffect="non-scaling-stroke">
            <path vectorEffect="non-scaling-stroke" d="M400 98L412.1 105L412.1 119L400 126L387.9 119L387.9 105Z" />
            <path vectorEffect="non-scaling-stroke" d="M387.9 105L400 112L412.1 105M400 112L400 126" />
          </g>
          {/* Nửa trước của quỹ đạo, đè lên lõi */}
          <path
            d={`M${CORE.x - 60} ${CORE.y + 8}A60 20 0 0 0 ${CORE.x + 60} ${CORE.y + 8}`}
            fill="none"
            stroke={coreStroke}
            strokeOpacity={0.55}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Nhãn lõi */}
      {showLabels && showCoreLabel ? (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full"
          style={{ left: pct(CORE.x, VB_W), top: pct(CORE.y - CORE.r - 10, VB_H) }}
        >
          <Pill light={light} compact={compact}>
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            {CORE_NAME}
          </Pill>
        </div>
      ) : null}

      {/* Nhãn đảo và ghi chú */}
      {showLabels
        ? ISLAND_IDS.map((id) => {
            const { x, y } = ISLAND_POS[id];
            const dest = id === "thep" && steelDestination;
            const sel = selectedIsland === id;
            return (
              <div
                key={id}
                className="pointer-events-none absolute flex -translate-x-1/2 flex-col items-center gap-1.5 text-center"
                style={{ left: pct(x, VB_W), top: pct(y + HALF + SLAB + 8, VB_H), opacity: isDim(id) ? 0.5 : 1, transition: tr(["opacity"]) }}
              >
                <Pill light={light} compact={compact} selected={sel} dest={dest}>
                  {dest ? <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" /> : null}
                  {ISLAND_NAMES[id]}
                </Pill>
                {islandNotes?.[id] ? <div className="flex flex-col items-center gap-1">{islandNotes[id]}</div> : null}
              </div>
            );
          })
        : null}

      {/* Đảo là nút bấm (bàn phím: Tab, Enter/Space) */}
      {onIslandClick
        ? ISLAND_IDS.map((id) => {
            const { x, y } = ISLAND_POS[id];
            const sel = selectedIsland === id;
            return (
              <button
                key={id}
                type="button"
                aria-label={`${ISLAND_NAMES[id]}${sel ? ", đang chọn" : ""}`}
                aria-pressed={sel}
                onClick={() => onIslandClick(id)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered((h) => (h === id ? null : h))}
                onFocus={() => setHovered(id)}
                onBlur={() => setHovered((h) => (h === id ? null : h))}
                className="absolute cursor-pointer rounded-[28px] bg-transparent focus-visible:outline-offset-0"
                style={{
                  left: pct(x - 104, VB_W),
                  top: pct(y - (id === "thep" ? 120 : 92), VB_H),
                  width: pct(208, VB_W),
                  height: pct(id === "thep" ? 196 : 168, VB_H),
                }}
              />
            );
          })
        : null}
    </div>
  );
}

function Pill({
  children,
  light,
  compact,
  selected = false,
  dest = false,
}: {
  children: ReactNode;
  light: boolean;
  compact: boolean;
  selected?: boolean;
  dest?: boolean;
}) {
  const size = compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-0.5 text-[12px] sm:px-3 sm:py-1 sm:text-[13px]";
  const tone = light
    ? selected
      ? "bg-navy-900 text-white border-navy-900"
      : dest
        ? "bg-white text-navy-900 border-orange-500/70"
        : "bg-white/95 text-navy-900 border-line-200"
    : selected
      ? "bg-blue-500 text-white border-blue-300"
      : dest
        ? "bg-navy-900/90 text-white border-orange-500/80"
        : "bg-navy-900/80 text-white border-navy-700";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-medium leading-snug shadow-[0_8px_20px_-12px_rgba(10,31,68,0.45)] backdrop-blur-sm transition-colors duration-500 ${size} ${tone}`}
    >
      {children}
    </span>
  );
}
