"use client";
/**
 * M15 — Tổng quan lộ trình: dải roadmap 4 giai đoạn + carousel chi tiết từng giai đoạn.
 * Dữ liệu: deck.scenarios.roadmap. Đặt trên M10 (chi tiết theo tháng) trong section #lo-trinh.
 */
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Flag, Lock, Users, Sparkles, Target, UserRound } from "lucide-react";
import { vnNumber } from "@/lib/format";
import type { RoadmapPhase } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrollSteps } from "@/components/shared/ScrollSteps";

export default function M15(_props: { variant?: string }) {
  const { party, scenarios } = useDeck();
  const roadmapPhases = scenarios.roadmap.phases;
  const [idx, setIdx] = useState(0);
  const reduced = useReducedMotion();
  const total = roadmapPhases.length;
  const go = (i: number) => setIdx(Math.max(0, Math.min(total - 1, i)));
  const startX = useRef<number | null>(null);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(idx + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(idx - 1);
    }
  };
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
  };

  return (
    <ScrollSteps steps={total} onStep={go} perStepVh={50}>
    <div className="flex flex-col gap-5">
      {/* Dải roadmap */}
      <div>
        <div role="tablist" aria-label="Giai đoạn lộ trình" className="grid grid-cols-2 gap-2 md:flex md:gap-1.5">
          {roadmapPhases.map((p, i) => {
            const active = i === idx;
            return (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="m15-panel"
                onClick={() => go(i)}
                style={{ flexGrow: p.span, flexBasis: 0 }}
                className={`group relative flex min-w-0 flex-col gap-2 rounded-[12px] border p-3 text-left transition-all duration-300 ease-[var(--ease-brand)] sm:p-4 ${
                  active
                    ? p.lead
                      ? "border-orange-500 bg-orange-500 text-navy-900 shadow-[0_16px_36px_-20px_rgba(255,122,26,0.7)]"
                      : "border-navy-900 bg-navy-900 text-white shadow-[0_16px_36px_-20px_rgba(10,31,68,0.7)]"
                    : p.lead
                      ? "border-dashed border-orange-500/60 bg-orange-100/60 text-navy-900 hover:bg-orange-100"
                      : "border-line-200 bg-mist-50 text-navy-900 hover:border-blue-300 hover:bg-blue-100/60"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className={`tabular text-[12px] font-semibold tracking-[0.08em] ${active && !p.lead ? "text-blue-300" : "text-ink-500"} ${active && p.lead ? "!text-navy-900/70" : ""}`}>
                    {p.n} · {p.months}
                  </span>
                  {p.gates.length ? (
                    <span className={`flex items-center gap-1 text-[11px] font-semibold ${active && !p.lead ? "text-orange-500" : "text-orange-700"}`}>
                      <Lock aria-hidden size={12} strokeWidth={2} />
                      {p.gates.map((g) => g.name.replace("Cổng ", "C")).join(" · ")}
                    </span>
                  ) : null}
                </span>
                <span className="text-[16px] font-semibold leading-snug sm:text-[17px]">{p.name}</span>
                {/* tỷ lệ vận hành: phần orange = khách hàng */}
                <span aria-hidden className={`mt-1 flex h-1.5 w-full overflow-hidden rounded-full ${active && !p.lead ? "bg-white/15" : "bg-navy-900/10"}`}>
                  <span
                    className={active && !p.lead ? "bg-blue-300" : "bg-blue-300/70"}
                    style={{ width: `${p.ops ? p.ops.celesnity : 0}%` }}
                  />
                  <span className={p.lead && active ? "bg-navy-900" : "bg-orange-500"} style={{ width: `${p.ops ? p.ops.partner : 100}%` }} />
                </span>
                <span className={`text-[12px] ${active && !p.lead ? "text-blue-100/80" : "text-ink-500"} ${active && p.lead ? "!text-navy-900/80" : ""}`}>
                  {p.ops ? `${party.short} vận hành ${p.ops.partner}%` : `${party.short} dẫn dắt`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel chi tiết */}
      <div
        id="m15-panel"
        role="tabpanel"
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label={`Giai đoạn ${idx + 1} trên ${total}: ${roadmapPhases[idx].name}`}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        className="relative overflow-hidden rounded-[var(--radius-card)] outline-offset-4"
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${idx * 100}%)`,
            transition: reduced ? "none" : "transform 600ms var(--ease-brand)",
          }}
        >
          {roadmapPhases.map((p, i) => (
            <div key={p.id} className="w-full shrink-0" aria-hidden={i !== idx} inert={i !== idx}>
              <PhaseCard p={p} />
            </div>
          ))}
        </div>
      </div>

    </div>
    </ScrollSteps>
  );
}

function PhaseCard({ p }: { p: RoadmapPhase }) {
  const { party, scenarios } = useDeck();
  const dark = !p.lead;
  return (
    <article
      className={`relative overflow-hidden rounded-[var(--radius-card)] p-6 sm:p-8 ${
        dark ? "bg-navy-900 text-white" : "bg-orange-500 text-navy-900"
      }`}
    >
      <span aria-hidden className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${dark ? "bg-blue-500/25" : "bg-white/30"}`} />
      <header className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className={`tabular text-[13px] font-semibold tracking-[0.08em] ${dark ? "text-blue-300" : "text-navy-900/70"}`}>
            Giai đoạn {p.n} · {p.months}
          </span>
          <h4 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] sm:text-[32px]">{p.name}</h4>
        </div>
        <p className={`flex max-w-[44ch] items-start gap-2 text-[16px] leading-relaxed ${dark ? "text-blue-100" : "text-navy-900"}`}>
          <Target aria-hidden size={18} strokeWidth={1.5} className={`mt-1 shrink-0 ${dark ? "text-orange-500" : "text-navy-900"}`} />
          {p.goal}
        </p>
      </header>

      <div className="relative mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Box title="Ứng dụng đưa vào" icon={<Sparkles aria-hidden size={16} strokeWidth={1.5} />} dark={dark}>
          <ul className="flex flex-col gap-2.5">
            {p.apps.map((a) => (
              <li key={a.name} className="flex flex-col">
                <span className="text-[15px] font-semibold leading-snug">{a.name}</span>
                <span className={`text-[13px] ${dark ? "text-blue-300" : "text-navy-900/70"}`}>{a.when}</span>
              </li>
            ))}
          </ul>
        </Box>
        <Box title="Đầu ra nghiệm thu" icon={<Lock aria-hidden size={16} strokeWidth={1.5} />} dark={dark}>
          {p.gates.length ? (
            <ul className="flex flex-col gap-3">
              {p.gates.map((g) => (
                <li key={g.name} className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold">
                    {g.name} <span className={`tabular font-normal ${dark ? "text-blue-300" : "text-navy-900/70"}`}>· {g.when}</span>
                  </span>
                  <span className={`text-[13px] leading-snug ${dark ? "text-blue-100/85" : "text-navy-900/80"}`}>{g.pass}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14px] leading-snug">{scenarios.roadmap.noGateNote}</p>
          )}
        </Box>
        <Box title="Nguồn lực" icon={<Users aria-hidden size={16} strokeWidth={1.5} />} dark={dark}>
          {p.ops && p.people ? (
            <div className="flex flex-col">
              <div className="mb-2 flex items-end justify-between gap-3">
                <span className="text-[13px] font-medium text-white">
                  Celesnity <span className="tabular block text-[28px] font-semibold leading-none text-white">{p.ops.celesnity}%</span>
                </span>
                <span className="text-right text-[13px] font-medium text-orange-500">
                  {party.short} <span className="tabular block text-[28px] font-semibold leading-none text-orange-500">{p.ops.partner}%</span>
                </span>
              </div>
              <div
                role="img"
                aria-label={`Tỷ lệ vận hành: Celesnity ${p.ops.celesnity}%, ${party.short} ${p.ops.partner}%`}
                className="flex h-3.5 overflow-hidden rounded-full bg-white/10"
              >
                <span className="h-full bg-blue-300" style={{ width: `${p.ops.celesnity}%` }} />
                <span className="h-full border-l-2 border-navy-800 bg-orange-500" style={{ width: `${p.ops.partner}%` }} />
              </div>
              <div className="mt-4 flex flex-col gap-3 border-t border-navy-700 pt-4">
                <People count={p.people.celesnity} text={p.people.celesnityText} tone="blue" label="Celesnity" />
                <People count={p.people.partnerTeam} tone="orange" label={party.team} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-[20px] font-semibold">{party.short} dẫn dắt</p>
              <p className="text-[14px] text-navy-900/80">Celesnity hỗ trợ</p>
            </div>
          )}
        </Box>
        <Box title={`Năng lực ${party.team}`} icon={<Flag aria-hidden size={16} strokeWidth={1.5} />} dark={dark}>
          <ItLadder phase={p} dark={dark} />
        </Box>
      </div>
    </article>
  );
}

function Box({ title, icon, dark, children }: { title: string; icon: React.ReactNode; dark: boolean; children: React.ReactNode }) {
  return (
    <section
      className={`flex flex-col gap-3 rounded-[12px] p-4 xl:p-5 ${
        dark ? "border border-navy-700 bg-navy-800/70" : "border border-navy-900/15 bg-white/45"
      }`}
    >
      <h5 className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] ${dark ? "text-blue-300" : "text-navy-900/75"}`}>
        {icon}
        {title}
      </h5>
      {children}
    </section>
  );
}

/** Biểu tượng người (có nửa người cho 0,5), trên nền tối */
function People({ count, text, tone, label }: { count: number; text?: string; tone: "blue" | "orange"; label: string }) {
  const full = Math.floor(count);
  const half = count - full >= 0.5;
  const color = tone === "orange" ? "text-orange-500" : "text-blue-300";
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <div className="min-w-0">
        <p className={`text-[13px] font-semibold ${tone === "orange" ? "text-orange-500" : "text-white"}`}>{label}</p>
        <p className="tabular whitespace-nowrap text-[13px] text-blue-300">
          {tone === "orange" ? "" : "~"}
          {text ?? vnNumber(count, count % 1 ? 1 : 0)} người
        </p>
      </div>
      <div className={`flex shrink-0 items-end ${color}`} aria-hidden>
        {Array.from({ length: full }, (_, i) => (
          <UserRound key={i} size={20} strokeWidth={1.5} className="-mx-[1px]" />
        ))}
        {half ? (
          <span className="-mx-[1px] inline-block w-[10px] overflow-hidden">
            <UserRound size={20} strokeWidth={1.5} />
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Thang năng lực của đội khách hàng: mốc đã đạt tới cuối giai đoạn, mốc hiện tại nổi bật */
function ItLadder({ phase, dark }: { phase: RoadmapPhase; dark: boolean }) {
  const { phases, itSteps, phaseEndMonth } = useDeck().scenarios.roadmap;
  const end = phaseEndMonth[phase.id];
  const reached = itSteps.filter((s) => s.m <= end);
  const current = reached[reached.length - 1];
  // Giai đoạn bắt đầu ngay sau tháng cuối của giai đoạn trước
  const pi = phases.findIndex((x) => x.id === phase.id);
  const start = pi > 0 ? phaseEndMonth[phases[pi - 1].id] + 1 : 1;
  return (
    <div className="flex flex-col">
      <p className={`mb-3 text-[17px] font-semibold leading-snug ${dark ? "text-white" : "text-navy-900"}`}>{current.label}</p>
      <ol className="flex flex-col">
        {itSteps.map((s, i) => {
          const done = s.m <= end;
          const isCurrent = s === current;
          const inPhase = s.m >= start && s.m <= end;
          return (
            <li key={s.label} className="relative flex items-center justify-between gap-3 py-[3px] pl-6">
              {i < itSteps.length - 1 ? (
                <span aria-hidden className={`absolute left-[5px] top-[15px] h-full w-px ${done && itSteps[i + 1].m <= end ? (dark ? "bg-blue-300/60" : "bg-navy-900/40") : dark ? "bg-white/15" : "bg-navy-900/15"}`} />
              ) : null}
              <span
                aria-hidden
                className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full ${
                  isCurrent
                    ? "left-[-2px] h-[15px] w-[15px] bg-orange-500 ring-4 ring-orange-500/25"
                    : done
                      ? dark
                        ? "h-[11px] w-[11px] bg-blue-300"
                        : "h-[11px] w-[11px] bg-navy-900"
                      : dark
                        ? "h-[11px] w-[11px] border border-white/30 bg-navy-800"
                        : "h-[11px] w-[11px] border border-navy-900/30"
                }`}
              />
              <span
                className={`text-[14px] leading-snug ${
                  isCurrent ? "font-semibold" : inPhase ? "font-medium" : ""
                } ${done ? (dark ? "text-white" : "text-navy-900") : dark ? "text-blue-300/50" : "text-navy-900/45"}`}
              >
                {s.label}
              </span>
              <span className={`tabular shrink-0 text-[12px] ${done ? (dark ? "text-blue-300" : "text-navy-900/70") : dark ? "text-blue-300/40" : "text-navy-900/40"}`}>
                {s.when}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
