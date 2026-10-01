"use client";
import { useRef, type KeyboardEvent } from "react";

export type SegOption<V extends string> = {
  value: V;
  label: string;
  sub?: string;
  badge?: string;
  /** màu khi được chọn */
  accent?: "navy" | "orange" | "white";
};

const PULSE_CSS = `@keyframes seg-pulse{0%{box-shadow:0 0 0 0 rgba(255,122,26,.55)}70%{box-shadow:0 0 0 10px rgba(255,122,26,0)}100%{box-shadow:0 0 0 0 rgba(255,122,26,0)}}
.seg-pulse{animation:seg-pulse 1.4s cubic-bezier(.22,1,.36,1) 2}`;

/** Công tắc phân đoạn có role="radiogroup": Tab vào, mũi tên để đổi lựa chọn. */
export function Segmented<V extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  tone = "light",
  pulse,
  className = "",
}: {
  options: SegOption<V>[];
  value: V;
  onChange: (v: V) => void;
  ariaLabel: string;
  tone?: "light" | "dark";
  /** giá trị cần gợi ý bằng một lần nhấp nháy nhẹ */
  pulse?: V | null;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const idx = options.findIndex((o) => o.value === value);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = options.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  const shell =
    tone === "dark"
      ? "border-navy-700 bg-navy-950/60"
      : "border-line-200 bg-white shadow-[0_10px_30px_-20px_rgba(10,31,68,0.35)]";

  const selectedCls = (a: SegOption<V>["accent"]) =>
    a === "orange"
      ? "bg-orange-500 text-navy-900"
      : a === "white"
        ? "bg-white text-navy-900"
        : tone === "dark"
          ? "bg-white text-navy-900"
          : "bg-navy-900 text-white";
  const idleCls =
    tone === "dark" ? "text-blue-300 hover:bg-white/[0.06] hover:text-white" : "text-ink-500 hover:bg-mist-50 hover:text-navy-900";

  return (
    <div role="radiogroup" aria-label={ariaLabel} className={`inline-flex max-w-full gap-1 rounded-[12px] border p-1 ${options.some((o) => o.badge) ? "mt-3" : ""} ${shell} ${className}`}>
      <style>{PULSE_CSS}</style>
      {options.map((o, i) => {
        const checked = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(o.value)}
            onKeyDown={onKey}
            className={`relative flex min-w-0 flex-1 flex-col items-center justify-center rounded-[var(--radius-control)] px-3 py-2 text-center transition-colors duration-300 ease-[var(--ease-brand)] sm:px-4 ${
              checked ? selectedCls(o.accent) : idleCls
            } ${pulse === o.value && !checked ? "seg-pulse" : ""}`}
          >
            <span className="whitespace-nowrap text-[14px] font-semibold leading-tight">{o.label}</span>
            {o.badge ? (
              <span
                className={`pointer-events-none absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-px text-[10.5px] font-semibold uppercase tracking-[0.06em] ${
                  tone === "dark" ? "bg-orange-500 text-navy-900" : "border border-orange-500/40 bg-orange-100 text-orange-700"
                }`}
              >
                {o.badge}
              </span>
            ) : null}
            {o.sub ? (
              <span className={`mt-0.5 text-[12px] leading-tight ${checked ? "opacity-75" : "opacity-90"}`}>{o.sub}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
