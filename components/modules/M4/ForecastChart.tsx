"use client";
import { useEffect, useRef, useState } from "react";
import type { M4Option } from "@/content/scenarios/m4";
import { vnNumber } from "@/lib/format";

/** Biểu đồ hình quạt M4, vẽ bằng SVG theo pixel thật để chữ không bị co ở 375px. */
export function ForecastChart({ option, showActual }: { option: M4Option | null; showActual: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(640);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const narrow = w < 480;
  const h = Math.round(Math.min(360, Math.max(250, w * 0.56)));
  const m = { l: narrow ? 36 : 44, r: narrow ? 52 : 72, t: 20, b: 40 };
  const yMax = 4.5;
  const x = (wk: number) => m.l + (wk / 8) * (w - m.l - m.r);
  const y = (v: number) => m.t + (1 - v / yMax) * (h - m.t - m.b);

  const current = 3.2;
  const fc = option?.forecast ?? null;
  const actual = showActual ? option?.actual ?? null : null;

  const line = (pts: [number, number][]) => pts.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)},${b.toFixed(1)}`).join(" ");
  const band = fc
    ? line(fc.map((p) => [x(p.week), y(p.hi)])) +
      " " +
      fc
        .slice()
        .reverse()
        .map((p) => `L${x(p.week).toFixed(1)},${y(p.lo).toFixed(1)}`)
        .join(" ") +
      " Z"
    : "";
  const mid = fc ? line(fc.map((p) => [x(p.week), y(p.mid)])) : "";
  const act = actual ? line(actual.map((p) => [x(p.week), y(p.value)])) : "";
  const end = fc ? fc[fc.length - 1] : null;
  const lastActual = actual ? actual[actual.length - 1] : null;

  return (
    <div ref={wrapRef} className="relative w-full">
      <style>{`
        @keyframes m4-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes m4-fade { from { opacity: 0; } to { opacity: 1; } }
        .m4-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: m4-draw 1100ms var(--ease-brand) forwards; }
        .m4-draw-late { animation-delay: 150ms; }
        .m4-fade { opacity: 0; animation: m4-fade 600ms var(--ease-brand) forwards; }
        .m4-fade-late { animation-delay: 700ms; }
      `}</style>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block max-w-full" aria-hidden>
        <defs>
          <linearGradient id="m4-bandgrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-blue-300)" stopOpacity="0.1" />
            <stop offset="1" stopColor="var(--color-blue-300)" stopOpacity="0.25" />
          </linearGradient>
          <filter id="m4-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* lưới ngang */}
        {[0, 1, 2, 3, 4].map((v) => (
          <g key={v}>
            <line x1={m.l} x2={w - m.r} y1={y(v)} y2={y(v)} stroke="var(--color-navy-700)" strokeWidth={1} opacity={v === 0 ? 1 : 0.55} />
            <text x={m.l - 10} y={y(v) + 4} textAnchor="end" fontSize={12} fill="var(--color-blue-300)" className="tabular">
              {v}%
            </text>
          </g>
        ))}
        {/* trục tuần */}
        {Array.from({ length: 9 }, (_, wk) => (
          <g key={wk}>
            <line x1={x(wk)} x2={x(wk)} y1={h - m.b} y2={h - m.b + 5} stroke="var(--color-navy-700)" />
            {(!narrow || wk % 2 === 0) && (
              <text x={x(wk)} y={h - m.b + 20} textAnchor="middle" fontSize={12} fill="var(--color-blue-300)" className="tabular">
                {wk === 0 ? "Nay" : `T${wk}`}
              </text>
            )}
          </g>
        ))}
        <text x={w - m.r} y={h - 4} textAnchor="end" fontSize={11} fill="var(--color-blue-300)" opacity={0.8}>
          Tuần
        </text>

        {/* mốc hiện tại 3,2% */}
        <line
          x1={m.l}
          x2={w - m.r}
          y1={y(current)}
          y2={y(current)}
          stroke="var(--color-ink-500)"
          strokeWidth={1.5}
          strokeDasharray="5 5"
        />
        <text x={m.l + 8} y={y(current) - 8} fontSize={12} fill="var(--color-blue-300)" className="tabular">
          Hiện tại {vnNumber(current, 1)}%
        </text>

        {/* mốc tuần 4 khi xem thực tế */}
        {actual && (
          <g className="m4-fade">
            <line x1={x(4)} x2={x(4)} y1={m.t} y2={h - m.b} stroke="var(--color-orange-500)" strokeOpacity={0.35} strokeDasharray="2 4" />
            <text x={x(4) + 6} y={m.t + 10} fontSize={11} fill="var(--color-orange-500)">
              4 tuần sau
            </text>
          </g>
        )}

        {fc && end && (
          <g key={option?.id}>
            <path d={band} fill="url(#m4-bandgrad)" className="m4-fade" />
            <path d={band} fill="none" stroke="var(--color-blue-300)" strokeOpacity={0.35} strokeWidth={1} className="m4-fade" />
            <path d={mid} fill="none" stroke="var(--color-blue-500)" strokeWidth={6} opacity={0.35} filter="url(#m4-glow)" pathLength={1} className="m4-draw" />
            <path d={mid} fill="none" stroke="var(--color-blue-500)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="m4-draw" />
            <g className="m4-fade m4-fade-late">
              <circle cx={x(8)} cy={y(end.mid)} r={4.5} fill="var(--color-navy-950)" stroke="var(--color-blue-500)" strokeWidth={2} />
              <text x={x(8) + 8} y={y(end.mid) + 4} fontSize={13} fontWeight={600} fill="var(--color-white)" className="tabular">
                {vnNumber(end.mid, 1)}%
              </text>
              {!narrow && (
                <>
                  <text x={x(8) + 8} y={y(end.hi) + 4} fontSize={11} fill="var(--color-blue-300)" className="tabular">
                    {vnNumber(end.hi, 1)}%
                  </text>
                  <text x={x(8) + 8} y={y(end.lo) + 4} fontSize={11} fill="var(--color-blue-300)" className="tabular">
                    {vnNumber(end.lo, 1)}%
                  </text>
                </>
              )}
            </g>
          </g>
        )}

        {act && actual && lastActual && (
          <g key={`act-${option?.id}`}>
            <path d={act} fill="none" stroke="var(--color-orange-500)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="m4-draw" />
            {actual.map((p) => (
              <circle key={p.week} cx={x(p.week)} cy={y(p.value)} r={3.5} fill="var(--color-orange-500)" className="m4-fade m4-fade-late" />
            ))}
            <g className="m4-fade m4-fade-late">
              <rect x={x(4) - 26} y={y(lastActual.value) + 10} width={52} height={22} rx={11} fill="var(--color-orange-500)" />
              <text x={x(4)} y={y(lastActual.value) + 25} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--color-navy-900)" className="tabular">
                {vnNumber(lastActual.value, 1)}%
              </text>
            </g>
          </g>
        )}

        {!option && (
          <text x={(m.l + w - m.r) / 2} y={y(1.4)} textAnchor="middle" fontSize={14} fill="var(--color-blue-300)">
            Chọn một phương án để xem dự báo
          </text>
        )}
      </svg>
    </div>
  );
}
