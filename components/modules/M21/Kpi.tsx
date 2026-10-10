/**
 * M21 variant "kpi": KPI hai tầng. Tầng 1 là KPI nghiệm thu, chấm và gắn phí. Tầng 2 xếp theo làn, mỗi làn là một
 * ứng dụng, đọc từ tác động quy trình sang tác động kinh doanh của ứng dụng đó. Mục thời gian của mọi làn cộng dồn
 * vào mục chung ở cuối, nên không cần đường nối chéo giữa các làn.
 */
import { ArrowDown, ArrowRight, Calculator, Clock, DraftingCompass, Factory, ShieldCheck, type LucideIcon } from "lucide-react";
import { RichText } from "@/components/shared/RichText";
import type { ArchIcon, KpiData, KpiTier } from "@/decks/types";

const APP_ICON: Partial<Record<ArchIcon, LucideIcon>> = { production: Factory, accounting: Calculator, engineering: DraftingCompass };

const LANE_GRID = "lg:grid-cols-[200px_minmax(0,1fr)_36px_minmax(0,0.5fr)]";

function TierHead({ t, chip, dark }: { t: KpiTier; chip: string; dark?: boolean }) {
  const muted = dark ? "text-white/70" : "text-ink-500";
  return (
    <div className="flex flex-col gap-1.5">
      <span className={`w-fit rounded-full px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.08em] ${chip}`}>{t.label}</span>
      <p className={`text-[17px] font-semibold leading-tight ${dark ? "text-white" : "text-navy-900"}`}>{t.name}</p>
      <p className={`text-[13px] leading-snug ${muted}`}>{[t.when, t.fee, t.sub].filter(Boolean).join(" · ")}</p>
    </div>
  );
}

export function KpiChain({ k }: { k: KpiData }) {
  const { quality: q, impact: im } = k;
  return (
    <figure className="m-0 flex flex-col gap-4">
      {/* Tầng 1: KPI nghiệm thu */}
      <section
        aria-label={`${q.tier.label} · ${q.tier.name}`}
        className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-navy-900 p-5 text-white sm:p-6"
      >
        <div className="flex items-start gap-3">
          <ShieldCheck aria-hidden size={22} strokeWidth={1.5} className="mt-7 hidden shrink-0 text-blue-300 sm:block" />
          <TierHead t={q.tier} chip="bg-white text-navy-900" dark />
        </div>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {q.items.map((it) => (
            <li key={it.name} className="flex flex-col gap-1.5 rounded-[12px] border border-white/10 bg-white/[0.06] px-4 py-3">
              <p className="text-[14.5px] font-semibold leading-snug">{it.name}</p>
              <p className="text-[13px] leading-snug text-blue-200">
                <RichText text={it.target} strongClass="font-semibold text-white" />
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div aria-hidden className="flex justify-center text-ink-500">
        <ArrowDown size={18} strokeWidth={1.5} />
      </div>

      {/* Tầng 2: mỗi làn một ứng dụng, quy trình → kinh doanh */}
      <section aria-label={`${im.tier.label} · ${im.tier.name}`} className="flex flex-col gap-4">
        <TierHead t={im.tier} chip="bg-blue-500 text-white" />

        <ol className="flex flex-col gap-3">
          {im.lanes.map((l) => {
            const Icon = APP_ICON[l.icon] ?? Factory;
            return (
              <li
                key={l.app}
                className={`vis-card grid grid-cols-1 items-center gap-3 rounded-[var(--radius-card)] p-4 sm:p-5 lg:gap-4 ${LANE_GRID}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-blue-100 text-blue-600">
                    <Icon aria-hidden size={20} strokeWidth={1.5} />
                  </span>
                  <p className="text-[15px] font-semibold leading-snug text-navy-900">{l.app}</p>
                </div>
                <ul className="grid grid-cols-1 gap-2 sm:auto-cols-fr sm:grid-flow-col">
                  {l.items.map((it) => (
                    <li key={it.text} className="flex flex-col gap-1.5 rounded-[12px] border border-line-200 bg-white px-3.5 py-3">
                      <p className="text-[14px] font-medium leading-snug text-navy-900">{it.text}</p>
                      {it.time ? (
                        <p className="mt-auto flex items-center gap-1.5 text-[12px] font-medium text-orange-700">
                          <Clock aria-hidden size={13} strokeWidth={1.75} />
                          {im.shared.tag}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <div aria-hidden className="flex justify-center text-orange-500">
                  <ArrowDown size={18} strokeWidth={1.75} className="lg:hidden" />
                  <ArrowRight size={20} strokeWidth={1.75} className="hidden lg:block" />
                </div>
                <p className="relative overflow-hidden rounded-[12px] border border-orange-500/30 bg-orange-100/60 py-3 pl-4 pr-3.5 text-[14px] font-semibold leading-snug text-navy-900">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-orange-500" />
                  {l.outcome}
                </p>
              </li>
            );
          })}
        </ol>

        <div aria-hidden className="flex justify-center text-orange-500">
          <ArrowDown size={18} strokeWidth={1.75} />
        </div>

        {/* Mục chung: cộng dồn các mục thời gian của mọi làn */}
        <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-orange-500/30 bg-orange-100/60 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
            <Clock aria-hidden size={22} strokeWidth={1.75} />
          </span>
          <div className="flex flex-col gap-0.5">
            <p className="text-[17px] font-semibold leading-snug text-navy-900">{im.shared.name}</p>
            <p className="text-[14px] leading-snug text-orange-700">{im.shared.target}</p>
            <p className="text-[13px] leading-snug text-ink-500">{im.shared.sub}</p>
          </div>
        </div>
      </section>
    </figure>
  );
}
