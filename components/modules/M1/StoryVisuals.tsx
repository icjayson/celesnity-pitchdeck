"use client";
/**
 * Ba minh họa riêng cho câu chuyện "Nhà máy siêu thông minh" (#sieu-thong-minh):
 * 1. Tự học: vòng quyết định → kết quả → học, độ chính xác tăng theo tháng.
 * 2. Dự báo trước: các nhánh tương lai của từng phương án, kèm dải độ chắc chắn.
 * 3. Nhân rộng: kinh nghiệm một dây chuyền mang sang nơi khác, không bắt đầu từ 0.
 * Chuyển động chỉ chạy khi minh họa đang hiển thị; tắt khi người dùng giảm chuyển động.
 */
import { useId } from "react";
import { useDeck } from "@/components/deck/DeckProvider";

const BLUE5 = "#2F7BF6";
const BLUE3 = "#8DB8FF";
const ORANGE = "#FF7A1A";
const NAVY8 = "#122B57";
const W = 616;
const H = 400;

const CSS = `
.m1v-grow{transform-box:fill-box;transform-origin:bottom;animation:m1v-grow 700ms cubic-bezier(.22,1,.36,1) both}
@keyframes m1v-grow{from{transform:scaleY(0)}}
.m1v-growx{transform-box:fill-box;transform-origin:left;animation:m1v-growx 900ms cubic-bezier(.22,1,.36,1) both}
@keyframes m1v-growx{from{transform:scaleX(0)}}
.m1v-draw{stroke-dasharray:1;stroke-dashoffset:0;animation:m1v-draw 1400ms cubic-bezier(.22,1,.36,1) both}
@keyframes m1v-draw{from{stroke-dashoffset:1}}
.m1v-fade{animation:m1v-fade 700ms ease both}
@keyframes m1v-fade{from{opacity:0}}
.m1v-rise{animation:m1v-rise 700ms cubic-bezier(.22,1,.36,1) both}
@keyframes m1v-rise{from{opacity:0;transform:translateX(-10px)}}
.m1v-dim{animation:m1v-dim 600ms ease both}
@keyframes m1v-dim{from{opacity:1}}
.m1v-pulse{transform-box:fill-box;transform-origin:center;animation:m1v-pulse 2.4s ease-in-out infinite}
@keyframes m1v-pulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
@media (prefers-reduced-motion: reduce){.m1v *{animation:none!important}}
`;

type P = { on: boolean; reduced: boolean };

/** Lớp chứa: ba minh họa chồng lên nhau, chuyển mờ theo bước đang xem */
export function StoryVisuals({ step, reduced }: { step: 1 | 2 | 3; reduced: boolean }) {
  return (
    <div className="m1v relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <style>{CSS}</style>
      {([1, 2, 3] as const).map((n) => {
        const on = n === step;
        const V = n === 1 ? SelfLearning : n === 2 ? Foresight : Replicate;
        return (
          <div
            key={n}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-700 ease-[var(--ease-brand)]"
            style={{ opacity: on ? 1 : 0 }}
          >
            {/* key theo trạng thái để chuyển động chạy lại mỗi lần vào bước */}
            <V key={on ? "on" : "off"} on={on} reduced={reduced} />
          </div>
        );
      })}
    </div>
  );
}

const svgProps = { viewBox: `0 0 ${W} ${H}`, className: "h-full w-full", fontFamily: "inherit" } as const;
const anim = (on: boolean, cls: string) => (on ? cls : "");

/* ───────────── 1. Tự học ───────────── */

const ACC = [0.4, 0.45, 0.49, 0.54, 0.58, 0.62, 0.66, 0.7, 0.74, 0.78, 0.82, 0.86];

function SelfLearning({ on, reduced }: P) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const learn = useDeck().scenarios.m1.learn;
  const acc = learn?.curve?.length === 12 ? learn.curve : ACC;
  const badge = learn?.badge ?? "Mỗi tháng thông minh hơn";
  // độ rộng nhãn theo số ký tự (13px, đậm)
  const badgeW = Math.round(badge.length * 6.6 + 16);
  const cx = 190;
  const cy = 210;
  const R = 98;
  const nodes = [
    { a: 0, label: "Quyết định", dx: 0, dy: -18, anchor: "middle" as const },
    { a: 120, label: "Kết quả", dx: 14, dy: 22, anchor: "start" as const },
    { a: 240, label: "Học thêm", dx: -14, dy: 22, anchor: "end" as const },
  ].map((n) => {
    const t = ((n.a - 90) * Math.PI) / 180;
    return { ...n, x: cx + R * Math.cos(t), y: cy + R * Math.sin(t) };
  });
  const loop = `M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx - 0.1} ${cy - R}`;

  const x0 = 354;
  const base = 330;
  const step = 21;
  const maxH = 200;
  const tops = acc.map((v, i) => ({ x: x0 + i * step + 3.5, y: base - v * maxH }));
  const last = tops[tops.length - 1];

  return (
    <svg {...svgProps}>
      <defs>
        <radialGradient id={`${uid}-core`}>
          <stop offset="0%" stopColor="#CFE1FF" />
          <stop offset="55%" stopColor={BLUE5} />
          <stop offset="100%" stopColor={BLUE5} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BLUE3} />
          <stop offset="100%" stopColor={BLUE5} stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* Vòng học */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={BLUE3} strokeOpacity="0.28" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={BLUE5} strokeWidth="2" pathLength={1} className={anim(on, "m1v-draw")} />
      {[60, 180, 300].map((a) => (
        <path key={a} d={`M${cx - 4} ${cy - R - 5} L${cx + 5} ${cy - R} L${cx - 4} ${cy - R + 5} Z`} fill={BLUE3} transform={`rotate(${a} ${cx} ${cy})`} />
      ))}
      {on && !reduced
        ? [0, 1.1, 2.2].map((b) => (
            <circle key={b} r="4" fill="#fff">
              <animateMotion path={loop} dur="3.3s" begin={`${b}s`} repeatCount="indefinite" />
            </circle>
          ))
        : null}
      {nodes.map((n) => (
        <g key={n.a}>
          <circle cx={n.x} cy={n.y} r="8" fill={NAVY8} stroke={BLUE3} strokeWidth="2" />
          <text x={n.x + n.dx} y={n.y + n.dy} textAnchor={n.anchor} fontSize="14" fontWeight="600" fill="#fff">
            {n.label}
          </text>
        </g>
      ))}

      {/* Lõi mô hình */}
      <circle cx={cx} cy={cy} r="58" fill={`url(#${uid}-core)`} opacity="0.55" className={on && !reduced ? "m1v-pulse" : ""} />
      <circle cx={cx} cy={cy} r="34" fill={NAVY8} stroke={BLUE5} strokeWidth="2" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">
        Mô hình
      </text>

      {/* Mũi tên sang biểu đồ */}
      <path d={`M${cx + R + 22} ${cy} H${x0 - 18}`} stroke={BLUE3} strokeOpacity="0.5" strokeDasharray="3 5" />
      <path d={`M${x0 - 22} ${cy - 4} L${x0 - 16} ${cy} L${x0 - 22} ${cy + 4}`} fill="none" stroke={BLUE3} strokeOpacity="0.7" strokeWidth="1.5" />

      {/* Biểu đồ độ chính xác */}
      <text x={x0} y={92} fontSize="12" fontWeight="600" letterSpacing="1.2" fill={BLUE3}>
        ĐỘ CHÍNH XÁC DỰ BÁO
      </text>
      <line x1={x0} x2={x0 + step * 12} y1={base} y2={base} stroke={BLUE3} strokeOpacity="0.35" />
      {acc.map((v, i) => {
        const isLast = i === acc.length - 1;
        return (
          <rect
            key={i}
            x={x0 + i * step}
            y={base - v * maxH}
            width="14"
            height={v * maxH}
            rx="3"
            fill={isLast ? ORANGE : `url(#${uid}-bar)`}
            className={anim(on, "m1v-grow")}
            style={on ? { animationDelay: `${200 + i * 70}ms` } : undefined}
          />
        );
      })}
      <polyline
        points={tops.map((t) => `${t.x},${t.y - 8}`).join(" ")}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.75"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className={anim(on, "m1v-fade")}
        style={on ? { animationDelay: "1100ms" } : undefined}
      />
      <g className={anim(on, "m1v-fade")} style={on ? { animationDelay: "1200ms" } : undefined}>
        <rect x={last.x + 6 - badgeW} y={last.y - 46} width={badgeW} height="28" rx="14" fill={ORANGE} />
        <text x={last.x + 6 - badgeW / 2} y={last.y - 27} textAnchor="middle" fontSize="13" fontWeight="600" fill="#0A1F44">
          {badge}
        </text>
      </g>
      <text x={x0} y={base + 22} fontSize="12" fill={BLUE3}>
        Tháng thứ 1
      </text>
      <text x={x0 + step * 12 - 7} y={base + 22} textAnchor="end" fontSize="12" fill={BLUE3}>
        Tháng thứ 12
      </text>
    </svg>
  );
}

/* ───────────── 2. Dự báo trước ───────────── */

const NOW_X = 220;
const NOW_Y = 160;
/** Hình dạng ba nhánh; nhãn lấy từ deck (scenarios.m1.foresight.options) */
const OPTION_SHAPES = [
  {
    line: `M${NOW_X} ${NOW_Y} C 320 158, 450 160, 570 156`,
    band: `M${NOW_X} ${NOW_Y} C 320 146, 450 136, 570 124 L570 188 C 450 182, 320 172, ${NOW_X} ${NOW_Y} Z`,
    ly: 114,
    tone: "mute",
  },
  {
    line: `M${NOW_X} ${NOW_Y} C 310 172, 440 208, 570 218`,
    band: `M${NOW_X} ${NOW_Y} C 310 162, 440 190, 570 196 L570 240 C 440 226, 310 182, ${NOW_X} ${NOW_Y} Z`,
    ly: 190,
    tone: "blue",
  },
  {
    line: `M${NOW_X} ${NOW_Y} C 300 182, 420 268, 570 282`,
    band: `M${NOW_X} ${NOW_Y} C 300 176, 420 256, 570 266 L570 298 C 420 280, 300 188, ${NOW_X} ${NOW_Y} Z`,
    ly: 320,
    tone: "pick",
  },
] as const;

function Foresight({ on }: P) {
  const f = useDeck().scenarios.m1.foresight;
  const OPTIONS = OPTION_SHAPES.map((o, i) => ({ ...o, label: f.options[i] }));
  const history = `M40 168 L70 152 L100 170 L130 150 L160 164 L190 152 L${NOW_X} ${NOW_Y}`;
  return (
    <svg {...svgProps}>
      {/* trục */}
      <text x={40} y={70} fontSize="12" fontWeight="600" letterSpacing="1.2" fill={BLUE3}>
        {f.axis}
      </text>
      <line x1={40} x2={40} y1={82} y2={340} stroke={BLUE3} strokeOpacity="0.3" />
      <line x1={40} x2={580} y1={340} y2={340} stroke={BLUE3} strokeOpacity="0.3" />
      <text x={130} y={362} textAnchor="middle" fontSize="12" fill={BLUE3}>
        Đã xảy ra
      </text>
      <text x={395} y={362} textAnchor="middle" fontSize="12" fill={BLUE3}>
        Dự báo, trước khi thực hiện
      </text>

      {/* Hôm nay */}
      <line x1={NOW_X} x2={NOW_X} y1={92} y2={340} stroke="#fff" strokeOpacity="0.35" strokeDasharray="3 5" />
      <rect x={NOW_X - 38} y={82} width="76" height="24" rx="12" fill="#fff" />
      <text x={NOW_X} y={98} textAnchor="middle" fontSize="12" fontWeight="600" fill="#0A1F44">
        Hôm nay
      </text>

      <path d={history} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />

      {OPTIONS.map((o, i) => {
        const pick = o.tone === "pick";
        const color = pick ? ORANGE : o.tone === "blue" ? BLUE3 : "#ffffff";
        const delay = 300 + i * 250;
        return (
          <g key={o.label} className={!pick ? anim(on, "m1v-dim") : ""} style={!pick && on ? { animationDelay: "1900ms", opacity: 0.5 } : !pick ? { opacity: 0.5 } : undefined}>
            <path
              d={o.band}
              fill={color}
              fillOpacity={pick ? 0.2 : 0.08}
              className={anim(on, "m1v-fade")}
              style={on ? { animationDelay: `${delay + 500}ms` } : undefined}
            />
            <path
              d={o.line}
              fill="none"
              stroke={color}
              strokeWidth={pick ? 3 : 2}
              strokeDasharray={o.tone === "mute" ? "5 6" : undefined}
              pathLength={o.tone === "mute" ? undefined : 1}
              className={o.tone === "mute" ? anim(on, "m1v-fade") : anim(on, "m1v-draw")}
              style={on ? { animationDelay: `${delay}ms` } : undefined}
            />
            <text
              x={572}
              y={o.ly}
              textAnchor="end"
              fontSize="13"
              fontWeight={pick ? 700 : 500}
              fill={color}
              className={anim(on, "m1v-fade")}
              style={on ? { animationDelay: `${delay + 700}ms` } : undefined}
            >
              {o.label}
            </text>
          </g>
        );
      })}

      {/* Phương án được chọn */}
      <g className={anim(on, "m1v-fade")} style={on ? { animationDelay: "2000ms" } : undefined}>
        <circle cx={570} cy={282} r="6" fill={ORANGE} />
        <rect x={300} y={286} width="168" height="44" rx="10" fill={NAVY8} stroke={ORANGE} strokeOpacity="0.7" />
        <text x={314} y={304} fontSize="12" fontWeight="700" fill="#fff">
          {f.pickTitle}
        </text>
        <text x={314} y={321} fontSize="11.5" fill={BLUE3}>
          {f.pickNote}
        </text>
      </g>
    </svg>
  );
}

/* ───────────── 3. Nhân rộng ───────────── */

/** Vị trí bốn nơi nhận; nhãn lấy từ deck (scenarios.m1.replicate.targets), nơi cuối là đích đến */
const TARGET_SLOTS = [
  { y: 72, fill: 0.62 },
  { y: 158, fill: 0.68 },
  { y: 244, fill: 0.58 },
  { y: 330, fill: 0.45, steel: true },
];

function Replicate({ on, reduced }: P) {
  const r = useDeck().scenarios.m1.replicate;
  const TARGETS = TARGET_SLOTS.map((t, i) => ({ ...t, label: r.targets[i] }));
  const sx = 222;
  const sy = 200;
  const tx = 392;
  return (
    <svg {...svgProps}>
      {/* Nguồn: kinh nghiệm một dây chuyền */}
      <text x={40} y={128} fontSize="12" fontWeight="600" letterSpacing="1.2" fill={BLUE3}>
        KINH NGHIỆM ĐÃ HỌC
      </text>
      <rect x={52} y={146} width="180" height="96" rx="14" fill={NAVY8} stroke={BLUE3} strokeOpacity="0.25" />
      <rect x={46} y={152} width="180" height="96" rx="14" fill={NAVY8} stroke={BLUE3} strokeOpacity="0.4" />
      <rect x={40} y={158} width="180" height="96" rx="14" fill="#0E2550" stroke={BLUE5} strokeWidth="2" />
      <text x={58} y={190} fontSize="14.5" fontWeight="700" fill="#fff">
        {r.sourceTitle}
      </text>
      <text x={58} y={210} fontSize="12.5" fill={BLUE3}>
        {r.sourceSub}
      </text>
      <rect x={58} y={224} width="144" height="7" rx="3.5" fill={BLUE5} />

      {TARGETS.map((t, i) => {
        const path = `M${sx} ${sy} C ${sx + 90} ${sy}, ${tx - 90} ${t.y}, ${tx} ${t.y}`;
        const color = t.steel ? ORANGE : BLUE3;
        const delay = 250 + i * 260;
        return (
          <g key={t.label}>
            <path d={path} fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="1.5" pathLength={1} className={anim(on, "m1v-draw")} style={on ? { animationDelay: `${delay - 200}ms` } : undefined} />
            {on && !reduced ? (
              <circle r="4" fill={t.steel ? ORANGE : "#fff"}>
                <animateMotion path={path} dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
              </circle>
            ) : null}
            <g className={anim(on, "m1v-rise")} style={on ? { animationDelay: `${delay}ms` } : undefined}>
              <rect x={tx} y={t.y - 30} width="184" height="60" rx="12" fill={NAVY8} stroke={color} strokeOpacity={t.steel ? 0.9 : 0.5} strokeWidth={t.steel ? 2 : 1.5} />
              <text x={tx + 16} y={t.y - 6} fontSize="14" fontWeight="600" fill="#fff">
                {t.label}
              </text>
              <rect x={tx + 16} y={t.y + 8} width="152" height="7" rx="3.5" fill="#fff" fillOpacity="0.12" />
              <rect
                x={tx + 16}
                y={t.y + 8}
                width={152 * t.fill}
                height="7"
                rx="3.5"
                fill={t.steel ? ORANGE : BLUE5}
                className={anim(on, "m1v-growx")}
                style={on ? { animationDelay: `${delay + 300}ms` } : undefined}
              />
            </g>
          </g>
        );
      })}

      <text x={40} y={388} fontSize="12" fill={BLUE3} className={anim(on, "m1v-fade")} style={on ? { animationDelay: "1500ms" } : undefined}>
        Thanh màu: kinh nghiệm mang sang, không bắt đầu lại từ 0
      </text>
      {r.more ? (
        <text x={tx + 184} y={388} textAnchor="end" fontSize="13" fontWeight="600" fill="#fff" className={anim(on, "m1v-fade")} style={on ? { animationDelay: "1500ms" } : undefined}>
          {r.more}
        </text>
      ) : null}
    </svg>
  );
}
