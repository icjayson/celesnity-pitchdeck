"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Đồng hồ điểm mô hình: cung tròn blue, số đếm tabular từ `from` tới `to` khi `run` bật. */
export function ScoreGauge({ from, to, run, unit }: { from: number; to: number; run: boolean; unit: string }) {
  const reduced = useReducedMotion();
  const [val, setVal] = useState(from);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (!run) {
      setVal(from);
      return;
    }
    if (reduced) {
      setVal(to);
      return;
    }
    const start = performance.now();
    const delay = 700;
    const dur = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start - delay) / dur));
      const e = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * e);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [run, from, to, reduced]);

  const r = 40;
  const c = Math.PI * r; // nửa vòng
  const frac = val / 100;
  const done = run && Math.round(val) === to;

  return (
    <div className="flex items-center gap-4">
      <svg width={104} height={60} viewBox="0 0 104 60" aria-hidden className="shrink-0">
        <path d="M12,54 A40,40 0 0 1 92,54" fill="none" stroke="var(--color-navy-700)" strokeWidth={7} strokeLinecap="round" />
        <path
          d="M12,54 A40,40 0 0 1 92,54"
          fill="none"
          stroke="var(--color-blue-500)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={`${c * frac} ${c}`}
        />
      </svg>
      <div className="min-w-0">
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-blue-300">Điểm mô hình</p>
        <p className="flex items-baseline gap-2">
          <span className="tabular text-[34px] font-semibold leading-none text-white" aria-hidden>
            {Math.round(val)}
          </span>
          <span className="sr-only" aria-live="polite">
            {run ? `Điểm mô hình cập nhật từ ${from} lên ${to}` : `Điểm mô hình ${from}`}
          </span>
          {done && to > from ? (
            <span className="tabular rounded-full bg-blue-500/20 px-2 py-0.5 text-[13px] font-semibold text-blue-300">
              +{to - from}
            </span>
          ) : null}
        </p>
        <p className="mt-1 text-[12px] leading-snug text-blue-300">{unit}</p>
      </div>
    </div>
  );
}
