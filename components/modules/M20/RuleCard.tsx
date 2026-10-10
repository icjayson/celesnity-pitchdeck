"use client";
/** Thẻ quy tắc do quản lý đặt (M20): người đặt, dữ liệu, cách tính, ngưỡng, định dạng, người nhận, thời điểm. */
import { useRef, type KeyboardEvent } from "react";
import { ListChecks } from "lucide-react";
import type { FeedRule, FeedScenario } from "@/decks/types";
import { RichText } from "@/components/shared/RichText";

/** Nút chọn phân đoạn trong khung Minder AI (radiogroup: Tab vào, mũi tên để đổi) */
export function MfSegmented({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const idx = options.findIndex((o) => o.value === value);
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = options.length;
    const map: Record<string, number> = {
      ArrowRight: (idx + 1) % n,
      ArrowDown: (idx + 1) % n,
      ArrowLeft: (idx - 1 + n) % n,
      ArrowUp: (idx - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    onChange(options[map[e.key]].value);
    refs.current[map[e.key]]?.focus();
  };
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="mf-muted-bg inline-flex max-w-full gap-0.5 rounded-[12px] p-0.5">
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.value)}
            onKeyDown={onKey}
            className={`min-h-8 rounded-[10px] px-3 text-[13px] font-medium transition-colors ${
              on ? "bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.08)]" : "mf-muted hover:bg-white/60"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function RuleCard({
  rule,
  data,
  threshold,
  onThreshold,
  headingId,
}: {
  rule: FeedRule;
  data: FeedScenario;
  /** Giá trị ngưỡng đang chọn (biến thể "rule") */
  threshold?: string;
  onThreshold?: (v: string) => void;
  headingId?: string;
}) {
  const f = data.copy.ruleFields;
  const rows: { k: string; v: React.ReactNode }[] = [
    { k: f.owner, v: <span className="font-medium">{rule.owner}</span> },
    { k: f.appliesTo, v: rule.appliesTo },
    {
      k: f.data,
      v: (
        <ul className="flex flex-col gap-1">
          {rule.data.map((d, i) => (
            <li key={i}>
              <RichText text={d} />
            </li>
          ))}
        </ul>
      ),
    },
    { k: f.method, v: <RichText text={rule.method} /> },
  ];
  if (rule.threshold) {
    const t = rule.threshold;
    rows.push({
      k: f.threshold,
      v:
        onThreshold && t.options.length > 1 ? (
          <div className="flex flex-col items-start gap-2">
            <span>{t.label}</span>
            <MfSegmented
              ariaLabel={data.copy.thresholdLabel}
              options={t.options.map((o) => ({ value: o, label: o }))}
              value={threshold ?? t.value}
              onChange={onThreshold}
            />
          </div>
        ) : (
          `${t.label} ${threshold ?? t.value}`
        ),
    });
  }
  rows.push({ k: f.format, v: rule.format.join(" · ") }, { k: f.recipients, v: rule.recipients }, { k: f.schedule, v: rule.schedule });

  return (
    <article className="mf-card flex flex-col gap-3 p-4 sm:p-5" aria-labelledby={headingId}>
      <header className="flex flex-col items-start gap-2">
        <span className="mf-rule inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 text-[12.5px] font-medium">
          <ListChecks aria-hidden size={14} strokeWidth={1.5} />
          {data.copy.ruleTitle} {rule.id}
        </span>
        <h5 id={headingId} className="text-[15px] font-semibold leading-snug tracking-[-0.01em]">
          {rule.name}
        </h5>
      </header>
      <dl className="mf-line grid grid-cols-1 gap-x-4 gap-y-2.5 border-t pt-3 sm:grid-cols-[minmax(110px,0.34fr)_1fr]">
        {rows.map((r) => (
          <div key={r.k} className="contents">
            <dt className="mf-muted text-[12.5px] font-medium leading-snug sm:pt-px">{r.k}</dt>
            <dd className="text-[13.5px] leading-snug">{r.v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
