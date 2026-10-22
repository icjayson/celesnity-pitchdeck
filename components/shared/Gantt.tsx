"use client";
import type { GanttRow } from "@/decks/types";
import { RichText } from "./RichText";
import { useUi } from "@/components/deck/DeckProvider";

/**
 * Biểu đồ Gantt theo tháng (block "gantt"): hàng năm, hàng tháng, hàng mốc phụ (ví dụ T+1…),
 * mỗi việc một thanh từ cột `from` đến cột `to` (đếm từ 1), hàng cuối là các mốc (hình thoi).
 * Bảng cuộn ngang trong khung khi màn hình hẹp; trang không cuộn ngang.
 */
const TONE: Record<NonNullable<GanttRow["tone"]>, string> = {
  0: "bg-line-200",
  1: "bg-blue-300",
  2: "bg-blue-500",
  3: "bg-blue-600",
  4: "bg-navy-900",
  5: "bg-orange-500",
};

export function Gantt({
  years,
  months,
  ticks,
  rows,
  milestones,
  corner,
  milestoneLabel,
}: {
  years?: { label: string; span: number }[];
  months?: string[];
  ticks?: string[];
  rows: GanttRow[];
  milestones?: { at: number; label: string }[];
  corner?: string;
  milestoneLabel?: string;
}) {
  const ui = useUi();
  const n = (months ?? ticks ?? []).length;
  const cols = `minmax(200px,240px) repeat(${n}, minmax(34px, 1fr))`;
  /** Vạch dọc giữa các tháng, vẽ bằng nền để thanh có thể kéo qua nhiều cột */
  const grid = { backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent calc(100% / ${n} - 1px), var(--color-line-200) calc(100% / ${n} - 1px), var(--color-line-200) calc(100% / ${n}))` };
  const span = { gridColumn: `2 / span ${n}` };
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line-200 bg-white shadow-[0_24px_60px_-40px_rgba(10,31,68,0.45)]">
      <div className="grid min-w-[980px] text-[13px]" style={{ gridTemplateColumns: cols }}>
        {/* Hàng năm (tuỳ chọn) */}
        {years?.length ? (
          <>
            <div className="border-b border-r border-line-200 bg-mist-50 px-4 py-2 font-semibold text-navy-900">{corner}</div>
            {years.map((y, i) => (
              <div key={i} className="border-b border-r border-line-200 bg-mist-50 py-2 text-center font-semibold text-navy-900 last:border-r-0" style={{ gridColumn: `span ${y.span}` }}>
                {y.label}
              </div>
            ))}
          </>
        ) : null}
        {/* Hàng tháng (tuỳ chọn) */}
        {months?.length ? (
          <>
            <div className="border-b border-r border-line-200 bg-mist-50 px-4 py-1.5 text-ink-500">{ui.month}</div>
            {months.map((m, i) => (
              <div key={i} className="tabular border-b border-r border-line-200 bg-mist-50 py-1.5 text-center text-ink-500 last:border-r-0">
                {m}
              </div>
            ))}
          </>
        ) : null}
        {/* Hàng mốc phụ (T+1…); không có hàng lịch thì đây là hàng tiêu đề */}
        {ticks ? (
          <>
            <div className={`border-b border-r border-line-200 px-4 ${months?.length ? "py-1.5 text-ink-500" : "bg-mist-50 py-2.5 font-semibold text-navy-900"}`}>
              {months?.length ? ui.roadmap : (corner ?? ui.roadmap)}
            </div>
            {ticks.map((t, i) => (
              <div
                key={i}
                className={`tabular border-b border-r border-line-200 text-center text-[12px] font-medium text-navy-900 last:border-r-0 ${months?.length ? "py-1.5" : "bg-mist-50 py-2.5"}`}
              >
                {t}
              </div>
            ))}
          </>
        ) : null}
        {/* Các việc */}
        {rows.map((r, i) => (
          <div key={i} className="contents">
            <div className="border-b border-r border-line-200 px-4 py-2.5">
              <p className="font-medium leading-snug text-navy-900">
                <RichText text={r.label} />
              </p>
              {r.sub ? (
                <p className="text-[12px] text-ink-500">
                  <RichText text={r.sub} />
                </p>
              ) : null}
            </div>
            <div className="relative border-b border-line-200" style={{ ...span, ...grid }}>
              <span
                className={`absolute top-1/2 h-5 -translate-y-1/2 rounded-[6px] ${TONE[r.tone ?? 2]}`}
                style={{ left: `calc(${((r.from - 1) / n) * 100}% + 3px)`, width: `calc(${((r.to - r.from + 1) / n) * 100}% - 6px)` }}
                title={typeof r.sub === "string" ? r.sub : undefined}
              />
            </div>
          </div>
        ))}
        {/* Mốc */}
        {milestones?.length ? (
          <>
            <div className="border-r border-line-200 px-4 py-3 font-medium text-navy-900">{milestoneLabel ?? ui.milestones}</div>
            <div className="relative h-[52px]" style={{ ...span, ...grid }}>
              {milestones.map((m) => (
                <span key={m.label} className="absolute top-2 flex -translate-x-1/2 flex-col items-center gap-1" style={{ left: `${((m.at - 0.5) / n) * 100}%` }}>
                  <span aria-hidden className="h-3 w-3 rotate-45 rounded-[2px] bg-orange-500" />
                  {/* Nhãn ở cột đầu, cột cuối canh vào trong để không bị cắt ở mép khung */}
                  <span
                    className={`whitespace-nowrap text-[11px] font-semibold text-orange-700 ${m.at === n ? "-translate-x-[35%]" : m.at === 1 ? "translate-x-[35%]" : ""}`}
                  >
                    {m.label}
                  </span>
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
