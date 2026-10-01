"use client";
import { useRef } from "react";
import type { CalcResult } from "@/lib/calculator";
import { approxMoney, billions } from "@/lib/calculator";
import { useWidth } from "./controls";

export const sourceColors = {
  inspection: "var(--color-blue-600)",
  warranty: "var(--color-blue-500)",
  changes: "var(--color-blue-400)",
  range: "var(--color-blue-300)",
};

/** Bước trục "đẹp" theo tỷ đồng */
function niceStep(max: number) {
  const raw = max / 4;
  const p = 10 ** Math.floor(Math.log10(raw));
  const m = raw / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
}

/** Biểu đồ thanh xếp chồng (ngang) theo nguồn giá trị, có đường hòa vốn orange */
export function ValueChart({ r, programCost }: { r: CalcResult; programCost: number }) {
  const box = useRef<HTMLDivElement>(null);
  const width = useWidth(box);
  const narrow = width < 420;

  const maxVal = Math.max(r.baseHigh.total, r.conservative.total, programCost, 1);
  const step = niceStep(maxVal * 1.08);
  const axisMax = Math.ceil((maxVal * 1.08) / step) * step;
  const ticks = Array.from({ length: Math.round(axisMax / step) + 1 }, (_, i) => i * step);

  const left = narrow ? 82 : 104;
  const right = 16;
  const top = 34;
  const barH = narrow ? 30 : 36;
  const gap = 30;
  const plotW = Math.max(120, width - left - right);
  const x = (v: number) => left + (v / axisMax) * plotW;
  const rows = [
    { name: "Thận trọng", s: r.conservative, extra: 0 },
    { name: "Cơ sở", s: r.baseLow, extra: r.baseHigh.total - r.baseLow.total },
  ];
  const height = top + rows.length * barH + (rows.length - 1) * gap + 34;
  const beX = x(programCost);
  const beLabel = `Chi phí chương trình ${billions(programCost).replace(/,0$/, "")} tỷ đ/năm`;
  const labelAnchor = beX > left + plotW * 0.6 ? "end" : "start";

  const tickLabel = (v: number) => (v === 0 ? "0" : `${billions(v).replace(/,0$/, "")} tỷ`);

  return (
    <figure className="m-0">
      <div ref={box} className="w-full">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="m12-chart-desc" className="block overflow-visible">
          <defs>
            <pattern id="m12-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="6" fill="var(--color-blue-100)" />
              <line x1="0" y1="0" x2="0" y2="6" stroke={sourceColors.range} strokeWidth="2.5" />
            </pattern>
          </defs>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={top - 8} y2={height - 26} stroke="var(--color-line-200)" strokeWidth={1} />
              <text x={x(t)} y={height - 8} textAnchor="middle" className="tabular" fontSize={12} fill="var(--color-ink-500)">
                {tickLabel(t)}
              </text>
            </g>
          ))}
          {rows.map((row, i) => {
            const y = top + i * (barH + gap);
            const segs = [
              { k: "inspection", v: row.s.inspection, c: sourceColors.inspection },
              { k: "warranty", v: row.s.warranty, c: sourceColors.warranty },
              { k: "changes", v: row.s.changes, c: sourceColors.changes },
              { k: "range", v: row.extra, c: "url(#m12-hatch)" },
            ];
            let acc = 0;
            return (
              <g key={row.name}>
                <text x={left - 12} y={y + barH / 2 + 4.5} textAnchor="end" fontSize={narrow ? 12.5 : 14} fontWeight={500} fill="var(--color-navy-900)">
                  {row.name}
                </text>
                <rect x={left} y={y} width={plotW} height={barH} rx={6} fill="var(--color-mist-50)" />
                {segs.map((sg) => {
                  if (sg.v <= 0) return null;
                  const x0 = x(acc);
                  acc += sg.v;
                  const w = Math.max(1.5, x(acc) - x0);
                  return (
                    <rect
                      key={sg.k}
                      x={x0}
                      y={y}
                      width={w}
                      height={barH}
                      fill={sg.c}
                      stroke="#fff"
                      strokeWidth={1}
                      style={{ transition: "x .5s var(--ease-brand), width .5s var(--ease-brand)" }}
                    />
                  );
                })}
              </g>
            );
          })}
          {/* Đường hòa vốn */}
          <line x1={beX} x2={beX} y1={top - 14} y2={height - 26} stroke="var(--color-orange-500)" strokeWidth={2} strokeDasharray="5 4" style={{ transition: "all .5s var(--ease-brand)" }} />
          <circle cx={beX} cy={top - 14} r={3.5} fill="var(--color-orange-500)" />
          <text x={labelAnchor === "end" ? beX - 8 : beX + 8} y={top - 10} textAnchor={labelAnchor} fontSize={12} fontWeight={600} fill="var(--color-orange-700)">
            {narrow ? "Hòa vốn" : beLabel}
          </text>
        </svg>
      </div>
      <figcaption id="m12-chart-desc" className="sr-only">
        Giá trị mỗi năm theo nguồn. Thận trọng: kiểm tra có mục tiêu {approxMoney(r.conservative.inspection)}, bảo hành sớm{" "}
        {approxMoney(r.conservative.warranty)}, thay đổi kỹ thuật {approxMoney(r.conservative.changes)}. Cơ sở: kiểm tra có mục tiêu{" "}
        {approxMoney(r.baseLow.inspection)}, bảo hành sớm {approxMoney(r.baseLow.warranty)}, thay đổi kỹ thuật từ{" "}
        {approxMoney(r.baseLow.changes)} đến {approxMoney(r.baseHigh.changes)}. Đường hòa vốn: {beLabel}.
      </figcaption>
    </figure>
  );
}
