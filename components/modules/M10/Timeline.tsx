"use client";
import { useRef } from "react";
import { useDeck } from "@/components/deck/DeckProvider";

const BAND_FIRST = "bg-blue-100 text-blue-600";
const BAND_MID = "bg-[linear-gradient(90deg,var(--color-blue-100),var(--color-orange-100))] text-navy-900";
const BAND_LAST = "bg-orange-100 text-orange-700";

/** Dải mặc định của lộ trình 12 tháng (giữ như bản đầu) */
const DEFAULT_BANDS = [
  { name: "Thử nghiệm: Học", from: 0, to: (3.5 / 11) * 100, cls: BAND_FIRST },
  { name: "Dùng thật", from: (3.5 / 11) * 100, to: (7.5 / 11) * 100, cls: BAND_MID },
  { name: "Nhân rộng", from: (7.5 / 11) * 100, to: 100, cls: BAND_LAST },
];

/** Dải theo các giai đoạn liên tiếp trong bảng tháng (lộ trình khác 12 tháng) */
function bandsFrom(months: { m: number; phase: string }[], pos: (m: number) => number) {
  const runs: { name: string; first: number; last: number }[] = [];
  for (const r of months) {
    const cur = runs[runs.length - 1];
    if (cur && cur.name === r.phase) cur.last = r.m;
    else runs.push({ name: r.phase, first: r.m, last: r.m });
  }
  const n = months.length;
  return runs.map((r, i) => ({
    name: r.name,
    from: r.first === 1 ? 0 : pos(r.first - 0.5),
    to: r.last === n ? 100 : pos(r.last + 0.5),
    cls: i === 0 ? BAND_FIRST : i === runs.length - 1 ? BAND_LAST : BAND_MID,
  }));
}

/** Trục N tháng (mặc định 12): thanh kéo (role="slider"), ổ khóa cổng và dải giai đoạn */
export function Timeline({ month, onChange }: { month: number; onChange: (m: number) => void }) {
  const { months: m10Months, gates } = useDeck().scenarios.m10!;
  const n = m10Months.length;
  const pos = (m: number) => ((m - 1) / (n - 1)) * 100;
  const bands = n === 12 ? DEFAULT_BANDS : bandsFrom(m10Months, pos);
  const keyMonths = new Set([1, n, ...gates.map((g) => g.m)]);
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const row = m10Months[month - 1];

  const fromPointer = (clientX: number) => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    onChange(Math.round(t * (n - 1)) + 1);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowLeft: month - 1,
      ArrowDown: month - 1,
      ArrowRight: month + 1,
      ArrowUp: month + 1,
      PageDown: month - 3,
      PageUp: month + 3,
      Home: 1,
      End: n,
    };
    if (e.key in map) {
      e.preventDefault();
      onChange(Math.min(n, Math.max(1, map[e.key])));
    }
  };

  return (
    <div className="select-none px-3 sm:px-4">
      {/* Thanh kéo */}
      <div
        ref={track}
        role="slider"
        tabIndex={0}
        aria-label={`Tháng trong lộ trình ${n} tháng`}
        aria-valuemin={1}
        aria-valuemax={n}
        aria-valuenow={month}
        aria-valuetext={`Tháng thứ ${month}, ${row.phase}`}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        className="group relative mt-2 h-10 cursor-pointer touch-none rounded-full outline-none focus-visible:outline-none"
      >
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-line-200" />
        <div
          className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,var(--color-blue-500),var(--color-blue-300)_55%,var(--color-orange-500))] transition-[width] duration-500 ease-[var(--ease-brand)]"
          style={{ width: `${pos(month)}%`, backgroundSize: `${(100 / Math.max(pos(month), 0.001)) * 100}% 100%` }}
        />
        {m10Months.map((r) => (
          <span
            key={r.m}
            aria-hidden
            className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300 ${
              r.m <= month ? "border-white bg-blue-500" : "border-white bg-line-200"
            }`}
            style={{ left: `${pos(r.m)}%` }}
          />
        ))}
        <span
          aria-hidden
          className="absolute top-1/2 grid h-8 min-w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-navy-900 bg-white px-1.5 text-[12px] font-semibold text-navy-900 shadow-[0_8px_20px_-8px_rgba(10,31,68,0.55)] transition-[left] duration-500 ease-[var(--ease-brand)] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-orange-500"
          style={{ left: `${pos(month)}%` }}
        >
          <span className="tabular">T+{month}</span>
        </span>
      </div>

      {/* Nhãn tháng */}
      <div className="relative mt-1 h-5" aria-hidden>
        {m10Months.map((r) => {
          const key = keyMonths.has(r.m);
          return (
            <button
              key={r.m}
              type="button"
              tabIndex={-1}
              onClick={() => onChange(r.m)}
              className={`tabular absolute -translate-x-1/2 text-[12px] leading-5 transition-colors duration-300 hover:text-navy-900 ${
                r.m === month ? "font-semibold text-navy-900" : "text-ink-500"
              } ${key ? "" : "hidden sm:block"}`}
              style={{ left: `${pos(r.m)}%` }}
            >
              T+{r.m}
            </button>
          );
        })}
      </div>

      {/* Dải giai đoạn */}
      <div className="relative mt-3 h-8">
        {bands.map((b) => {
          const on = row.phase === b.name;
          return (
            <div
              key={b.name}
              className={`absolute top-0 flex h-8 items-center justify-center overflow-hidden rounded-[8px] px-2 text-[12px] font-medium transition-all duration-500 sm:text-[13px] ${b.cls} ${
                on ? "opacity-100 ring-1 ring-navy-900/20" : "opacity-60"
              }`}
              style={{ left: `calc(${b.from}% + 2px)`, width: `calc(${b.to - b.from}% - 4px)` }}
            >
              <span className="truncate">{b.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
