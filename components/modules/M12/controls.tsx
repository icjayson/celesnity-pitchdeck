"use client";
import { useEffect, useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { vnNumber } from "@/lib/format";

/** Kiểu riêng cho thanh trượt (không dùng giao diện mặc định của trình duyệt) */
export const rangeCss = `
.m12-range{-webkit-appearance:none;appearance:none;width:100%;height:22px;background:transparent;cursor:pointer;margin:0}
.m12-range:focus{outline:none}
.m12-range::-webkit-slider-runnable-track{height:4px;border-radius:999px;background:linear-gradient(to right,var(--color-blue-500) 0 var(--fill),var(--color-line-200) var(--fill) 100%)}
.m12-range::-moz-range-track{height:4px;border-radius:999px;background:var(--color-line-200)}
.m12-range::-moz-range-progress{height:4px;border-radius:999px;background:var(--color-blue-500)}
.m12-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;margin-top:-7px;border-radius:999px;background:#fff;border:1.5px solid var(--color-blue-600);box-shadow:0 4px 10px -4px rgba(10,31,68,.45);transition:transform .3s var(--ease-brand)}
.m12-range::-moz-range-thumb{width:16px;height:16px;border-radius:999px;background:#fff;border:1.5px solid var(--color-blue-600);box-shadow:0 4px 10px -4px rgba(10,31,68,.45)}
.m12-range:hover::-webkit-slider-thumb{transform:scale(1.12)}
.m12-range:focus-visible::-webkit-slider-thumb{outline:2px solid var(--color-orange-500);outline-offset:2px}
.m12-range:focus-visible::-moz-range-thumb{outline:2px solid var(--color-orange-500);outline-offset:2px}
@keyframes m12-flash{0%{box-shadow:0 0 0 0 rgba(255,122,26,0);background:var(--color-orange-100)}30%{box-shadow:0 0 0 3px rgba(255,122,26,.55);background:var(--color-orange-100)}100%{box-shadow:0 0 0 0 rgba(255,122,26,0);background:transparent}}
.m12-flash{animation:m12-flash 1.6s var(--ease-brand) 1}
@media (prefers-reduced-motion: reduce){.m12-flash{animation:none;background:var(--color-orange-100)}}
`;

/** Đọc số kiểu Việt Nam: "100.000" → 100000; "0,5" → 0.5; "0.5" → 0.5 */
export function parseVn(raw: string): number | null {
  let s = raw.trim().replace(/\s|đ|%/g, "");
  if (!s) return null;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export type FieldDef = {
  key: string;
  label: string;
  unit: string;
  /** Giá trị gốc = giá trị hiển thị × scale */
  scale: number;
  min: number;
  max: number;
  step: number;
  digits: number;
  hint?: string;
};

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const roundTo = (x: number, digits: number) => Number(x.toFixed(digits));

/** Ô số gõ được, định dạng kiểu Việt Nam khi rời ô */
function NumberBox({
  id,
  value,
  digits,
  min,
  hardMax,
  step,
  unit,
  label,
  onChange,
}: {
  id: string;
  value: number;
  digits: number;
  min: number;
  hardMax: number;
  step: number;
  unit: string;
  label: string;
  onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const shown = draft ?? vnNumber(value, digits);
  const commit = () => {
    if (draft === null) return;
    const n = parseVn(draft);
    if (n === null) {
      setError(true);
      return;
    }
    setError(false);
    onChange(roundTo(clamp(n, min, hardMax), digits));
    setDraft(null);
  };
  return (
    <div
      className={`flex h-9 min-w-0 items-center rounded-[var(--radius-control)] border bg-white pr-2.5 transition-colors duration-300 focus-within:border-blue-500 ${
        error ? "border-orange-600" : "border-line-200 hover:border-blue-300"
      }`}
    >
      <input
        id={id}
        type="text"
        inputMode="decimal"
        aria-label={`${label} (${unit})`}
        aria-invalid={error || undefined}
        className="tabular w-full min-w-0 bg-transparent py-1 pl-2.5 text-right text-[15px] font-medium text-navy-900 outline-none"
        value={shown}
        onFocus={(e) => {
          setDraft(vnNumber(value, digits));
          requestAnimationFrame(() => e.target.select());
        }}
        onChange={(e) => {
          setDraft(e.target.value);
          setError(false);
        }}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            commit();
            (e.target as HTMLInputElement).blur();
          } else if (e.key === "Escape") {
            setDraft(null);
            setError(false);
          } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const next = roundTo(clamp(value + (e.key === "ArrowUp" ? step : -step), min, hardMax), digits);
            onChange(next);
            setDraft(vnNumber(next, digits));
          }
        }}
      />
      <span className="ml-1.5 shrink-0 text-[13px] text-ink-500">{unit}</span>
    </div>
  );
}

/** Một đầu vào: nhãn, thanh trượt và ô số */
export function RangeField({
  def,
  raw,
  flash,
  onChange,
}: {
  def: FieldDef;
  raw: number;
  flash: boolean;
  onChange: (raw: number) => void;
}) {
  const uid = useId();
  const id = `m12-${def.key}`;
  const shown = raw / def.scale;
  const max = Math.max(def.max, shown);
  const fill = `${(clamp((shown - def.min) / (max - def.min || 1), 0, 1) * 100).toFixed(2)}%`;
  return (
    <div
      id={`${id}-row`}
      data-field={def.key}
      className={`-mx-2 rounded-[var(--radius-control)] px-2 py-2.5 ${flash ? "m12-flash" : ""}`}
    >
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={`${uid}-r`} className="text-[14px] font-medium leading-snug text-navy-900">
          {def.label}
        </label>
        {def.hint ? <span className="shrink-0 text-[12px] text-ink-500">{def.hint}</span> : null}
      </div>
      <div className="grid grid-cols-[1fr_8.5rem] items-center gap-3 sm:grid-cols-[1fr_9.5rem]">
        <input
          id={`${uid}-r`}
          type="range"
          className="m12-range"
          style={{ ["--fill" as string]: fill }}
          min={def.min}
          max={max}
          step={def.step}
          value={shown}
          aria-valuetext={`${vnNumber(shown, def.digits)} ${def.unit}`}
          onChange={(e) => onChange(roundTo(Number(e.target.value), def.digits) * def.scale)}
        />
        <NumberBox
          id={id}
          value={shown}
          digits={def.digits}
          min={def.min}
          hardMax={def.max * 20}
          step={def.step}
          unit={def.unit}
          label={def.label}
          onChange={(v) => onChange(v * def.scale)}
        />
      </div>
    </div>
  );
}

/** Bộ đếm − / + cho số nguyên nhỏ */
export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  flash,
  fieldKey,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  flash?: boolean;
  fieldKey: string;
}) {
  const btn =
    "grid h-9 w-9 place-items-center text-navy-900 transition-colors duration-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:text-line-200 disabled:hover:bg-transparent";
  return (
    <div data-field={fieldKey} className={`flex min-w-0 flex-col gap-1.5 rounded-[var(--radius-control)] ${flash ? "m12-flash" : ""}`}>
      <span className="text-[12px] font-medium text-ink-500">{label}</span>
      <div
        role="group"
        aria-label={label}
        className="inline-flex w-fit items-center overflow-hidden rounded-[var(--radius-control)] border border-line-200 bg-white"
      >
        <button type="button" className={btn} aria-label={`Giảm: ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Minus size={16} strokeWidth={1.5} aria-hidden />
        </button>
        <output className="tabular w-10 border-x border-line-200 text-center text-[15px] font-medium leading-9 text-navy-900" aria-live="polite">
          {vnNumber(value)}
        </output>
        <button type="button" className={btn} aria-label={`Tăng: ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Plus size={16} strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}

/** Theo dõi bề rộng phần tử (để vẽ SVG theo pixel thật, chữ luôn rõ) */
export function useWidth<T extends HTMLElement>(ref: React.RefObject<T | null>, fallback = 520) {
  const [w, setW] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}
