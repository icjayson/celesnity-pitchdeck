"use client";
/** M5 — Một ngày trong Nhà máy siêu thông minh (docs/implementation-plan.md mục 2). Dữ liệu: content/scenarios/m5.ts. */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Check, MapPin, Pause, Play, RotateCcw } from "lucide-react";
import { m5Events } from "@/content/scenarios/m5";
import { labels } from "@/content/content.vi";
import { Label } from "@/components/shared/Label";
import { RichText } from "@/components/shared/RichText";
import { FactoryScene } from "@/components/art/FactoryScene";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useInView } from "@/lib/useInView";
import { ScrollSteps } from "@/components/shared/ScrollSteps";

/** Thang giờ của thanh kéo: 06:00 → 20:00 */
const START = 6 * 60;
const END = 20 * 60;
const toMin = (t: string) => {
  const m = /^(\d{2}):(\d{2})$/.exec(t);
  return m ? +m[1] * 60 + +m[2] : 19 * 60 + 15; // "Cuối ngày"
};
const STOPS = m5Events.map((e) => (toMin(e.time) - START) / (END - START));
const HOURS = [6, 8, 10, 12, 14, 16, 18, 20];
const STEP_MS = 3600;

export default function M5({ variant }: { variant?: string }) {
  const [idx, setIdx] = useState(0);
  const [approved, setApproved] = useState<Record<number, boolean>>({});
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const [rootRef, inView] = useInView<HTMLDivElement>("-10% 0px");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const ev = m5Events[idx];
  const last = m5Events.length - 1;
  const isEnd = ev.island === "all";
  const decisions = m5Events.filter((e) => e.approve).length;
  const approvedCount = Object.values(approved).filter(Boolean).length;

  // Tự chạy: dừng khi giảm chuyển động hoặc ra khỏi khung nhìn
  useEffect(() => {
    if (!playing || reduced || !inView) return;
    const t = window.setTimeout(() => {
      setIdx((i) => {
        if (i >= last) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, reduced, inView, idx, last]);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const go = useCallback((i: number) => {
    setIdx(Math.max(0, Math.min(last, i)));
  }, [last]);

  const nearest = (frac: number) => {
    let best = 0;
    STOPS.forEach((s, i) => {
      if (Math.abs(s - frac) < Math.abs(STOPS[best] - frac)) best = i;
    });
    return best;
  };

  const fracFromPointer = (clientX: number) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return 0;
    return Math.max(0, Math.min(1, (clientX - r.left) / r.width));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setPlaying(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    go(nearest(fracFromPointer(e.clientX)));
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    go(nearest(fracFromPointer(e.clientX)));
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onSliderKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = { ArrowRight: idx + 1, ArrowUp: idx + 1, ArrowLeft: idx - 1, ArrowDown: idx - 1, Home: 0, End: last };
    if (!(e.key in map)) return;
    e.preventDefault();
    setPlaying(false);
    go(map[e.key]);
  };

  const togglePlay = () => {
    if (playing) return setPlaying(false);
    if (idx >= last) setIdx(0);
    setPlaying(true);
  };

  const pos = STOPS[idx] * 100;

  return (
    <ScrollSteps steps={m5Events.length} onStep={go}>
    <div ref={rootRef} data-variant={variant} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Label variant="future" text={labels.future} />
        <p className="tabular text-[14px] text-blue-300" aria-live="polite">
          Đã duyệt hôm nay: <span className="font-semibold text-white">{approvedCount}</span>/{decisions} quyết định
        </p>
      </div>

      {/* thanh thời gian */}
      <div className="rounded-[var(--radius-card)] border border-navy-700 bg-navy-950/50 px-4 pb-4 pt-5 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={togglePlay}
            disabled={reduced}
            aria-label={playing ? "Dừng tự chạy" : "Tự chạy cả ngày"}
            title={reduced ? "Tự chạy tắt khi bật giảm chuyển động" : undefined}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-300/50 bg-navy-800 text-white transition-colors duration-300 hover:border-blue-300 hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {playing ? <Pause aria-hidden size={18} strokeWidth={1.5} /> : idx >= last ? <RotateCcw aria-hidden size={18} strokeWidth={1.5} /> : <Play aria-hidden size={18} strokeWidth={1.5} />}
          </button>

          <div className="relative min-w-0 flex-1 pt-7">
            {/* các mốc bấm được */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-7">
              {m5Events.map((e, i) => (
                <button
                  key={e.time}
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                    setPlaying(false);
                    go(i);
                  }}
                  aria-label={`Chuyển tới ${e.time}`}
                  style={{ left: `${STOPS[i] * 100}%` }}
                  className={`tabular pointer-events-auto absolute top-0 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[12px] font-medium transition-colors duration-300 sm:text-[13px] ${
                    i === idx ? "bg-blue-500/20 text-white" : "text-blue-300 hover:text-white"
                  } ${i === 0 ? "max-sm:translate-x-[-30%]" : ""} ${i === last ? "max-sm:translate-x-[-75%]" : ""} ${i > 0 && i < last ? "max-[480px]:hidden" : ""}`}
                >
                  {e.time}
                </button>
              ))}
            </div>

            <div
              ref={trackRef}
              role="slider"
              tabIndex={0}
              aria-label="Giờ trong ngày"
              aria-valuemin={0}
              aria-valuemax={last}
              aria-valuenow={idx}
              aria-valuetext={`${ev.time}, ${ev.place}`}
              onKeyDown={onSliderKey}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="relative h-10 cursor-pointer touch-none select-none rounded-full"
            >
              {/* rãnh */}
              <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-navy-700" />
              <div
                className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/40 to-blue-400 transition-[width] duration-500 ease-[var(--ease-brand)]"
                style={{ width: `${pos}%` }}
              />
              {/* vạch giờ */}
              {HOURS.map((h) => (
                <span
                  key={h}
                  aria-hidden
                  className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-blue-300/30"
                  style={{ left: `${((h * 60 - START) / (END - START)) * 100}%` }}
                />
              ))}
              {/* chấm mốc */}
              {STOPS.map((s, i) => (
                <span
                  key={i}
                  aria-hidden
                  className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
                    approved[i] ? "border-orange-500 bg-orange-500" : i <= idx ? "border-blue-300 bg-blue-400" : "border-blue-300/50 bg-navy-900"
                  }`}
                  style={{ left: `${s * 100}%` }}
                />
              ))}
              {/* núm */}
              <span
                aria-hidden
                className="absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-blue-500 shadow-[0_0_0_6px_rgba(47,123,246,0.18),0_8px_24px_-6px_rgba(47,123,246,0.9)] transition-[left] duration-500 ease-[var(--ease-brand)]"
                style={{ left: `${pos}%` }}
              >
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
            </div>
            <div aria-hidden className="mt-1 flex justify-between text-[11px] text-blue-300/70">
              <span className="tabular">06:00</span>
              <span className="tabular">20:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* cảnh + thẻ */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="relative min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-950/60 p-2 sm:p-3">
          <FactoryScene compact showLabels highlight={ev.island} converge={isEnd} particles={!reduced} />
          <p className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-navy-950/80 px-3 py-1 text-[12px] text-blue-300 backdrop-blur">
            <MapPin aria-hidden size={14} strokeWidth={1.5} />
            {ev.place}
          </p>
        </div>

        <div className="min-w-0" aria-live="polite">
          <article
            key={idx}
            className="m5-card relative overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-800 p-5 shadow-[0_30px_70px_-30px_rgba(6,20,46,0.9)] sm:p-7"
          >
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-500/20 blur-[60px]" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="tabular text-[44px] font-semibold leading-none tracking-[-0.02em] text-white sm:text-[56px]">{ev.time}</p>
                <p className="tabular text-[13px] text-blue-300">
                  {idx + 1}/{m5Events.length}
                </p>
              </div>
              <p className="flex items-center gap-2 text-[14px] font-medium text-blue-300">
                <MapPin aria-hidden size={16} strokeWidth={1.5} />
                {ev.place}
              </p>
              <p className="text-[16px] leading-relaxed text-white sm:text-[17px]">
                <RichText text={ev.text} />
              </p>

              {ev.approve ? (
                approved[idx] ? (
                  <div className="m5-done flex min-h-[48px] items-center gap-3 rounded-[var(--radius-control)] border border-orange-500/50 bg-orange-500/10 px-4">
                    <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-navy-900">
                      <Check size={15} strokeWidth={2} />
                    </span>
                    <span className="text-[15px] font-semibold text-white">Đã duyệt</span>
                    <span className="ml-auto text-[13px] text-blue-300">Con người quyết định</span>
                    <button
                      type="button"
                      onClick={() => setApproved((a) => ({ ...a, [idx]: false }))}
                      className="sr-only focus:not-sr-only focus:text-[13px] focus:text-blue-300"
                    >
                      Hoàn tác
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setApproved((a) => ({ ...a, [idx]: true }));
                    }}
                    className="m5-pulse inline-flex min-h-[48px] items-center justify-center gap-2 self-start rounded-[var(--radius-control)] bg-orange-500 px-5 text-[15px] font-semibold text-navy-900 transition-colors duration-300 hover:bg-orange-600 max-sm:w-full"
                  >
                    <Check aria-hidden size={18} strokeWidth={1.5} />
                    {ev.approve}
                  </button>
                )
              ) : (
                <div className="flex items-center gap-3 rounded-[var(--radius-control)] border border-blue-300/30 bg-blue-500/10 px-4 py-3 text-[14px] text-blue-100">
                  <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-blue-400 shadow-[0_0_10px_2px_rgba(79,163,247,0.7)]" />
                  <span>
                    <span className="tabular font-semibold text-white">{approvedCount}</span>/{decisions} quyết định đã duyệt hôm nay quay về mô hình. Tự học.
                  </span>
                </div>
              )}
            </div>
          </article>

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                go(idx - 1);
              }}
              disabled={idx === 0}
              className="rounded-[var(--radius-control)] px-3 py-2 text-[14px] text-blue-300 transition-colors hover:text-white disabled:opacity-30"
            >
              ← Mốc trước
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                go(idx + 1);
              }}
              disabled={idx === last}
              className="rounded-[var(--radius-control)] px-3 py-2 text-[14px] text-blue-300 transition-colors hover:text-white disabled:opacity-30"
            >
              Mốc sau →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes m5-in { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
        .m5-card { animation: m5-in 500ms var(--ease-brand) both; }
        @keyframes m5-done { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: none; } }
        .m5-done { animation: m5-done 400ms var(--ease-brand) both; }
        @keyframes m5-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,122,26,0.55); } 100% { box-shadow: 0 0 0 14px rgba(255,122,26,0); } }
        .m5-pulse { animation: m5-pulse 900ms var(--ease-brand) 500ms 1; }
      `}</style>
    </div>
    </ScrollSteps>
  );
}
