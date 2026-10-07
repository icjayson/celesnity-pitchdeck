"use client";
import { useEffect, useRef } from "react";
import { ArrowLeftRight, ArrowDownUp, FileDown, MessageCircle, ArrowRight } from "lucide-react";
import { useDeck } from "@/components/deck/DeckProvider";
import { RichText } from "@/components/shared/RichText";
import { FactoryScene } from "@/components/art/FactoryScene";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * M14 — Lời mời và kết (docs/implementation-plan.md, mục 2).
 * variant "benefits" (#hai-ben, hai cột rời) · "paired" (#hai-ben, từng dòng đối ứng) · "package" (#hop-tac) · "closing" (#loi-moi).
 */
export default function M14({ variant }: { variant?: string }) {
  if (variant === "package") return <Package />;
  if (variant === "closing") return <Closing />;
  if (variant === "paired") return <PairedBenefits />;
  return <Benefits />;
}

/* ───────────── Lợi ích hai bên ───────────── */

const ui = {
  receive: "Nhận",
  give: "Góp",
  exchange: "Trao đổi giá trị",
  deploy: "Triển khai và chuyển giao",
  model: "Mô hình + Ứng dụng",
  shiftTitle: "Dịch chuyển chi phí",
  shiftNote: "Càng tự chủ, chi phí triển khai càng giảm",
};

function Benefits() {
  const { benefits } = useDeck();
  const sides = [
    { key: "hp", data: benefits.partner, accent: "orange" as const },
    { key: "cel", data: benefits.celesnity, accent: "blue" as const },
  ];
  return (
    <div className="mb-14 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_72px_1fr] lg:gap-0">
      <BenefitColumn side={sides[0]} />
      <div aria-hidden className="flex items-center justify-center py-1 lg:py-0">
        <div className="relative flex flex-col items-center">
          <span className="absolute inset-y-[-120px] left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line-200 to-transparent lg:block" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-line-200 bg-white text-navy-900 shadow-[0_12px_30px_-18px_rgba(10,31,68,0.5)]">
            <ArrowLeftRight size={20} strokeWidth={1.5} className="hidden lg:block" />
            <ArrowDownUp size={20} strokeWidth={1.5} className="lg:hidden" />
          </span>
        </div>
      </div>
      <BenefitColumn side={sides[1]} />
      <p className="sr-only">{ui.exchange}</p>
    </div>
  );
}

function BenefitColumn({
  side,
}: {
  side: { key: string; data: { name: string; receive: string[]; give: string[] }; accent: "orange" | "blue" };
}) {
  const isHP = side.accent === "orange";
  const bar = isHP ? "bg-orange-500" : "bg-blue-500";
  const dot = isHP ? "bg-orange-500" : "bg-blue-500";
  const tag = isHP ? "text-orange-700" : "text-blue-600";
  return (
    <article
      aria-label={side.data.name}
      className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-200 bg-white shadow-[0_20px_50px_-28px_rgba(10,31,68,0.4)]"
    >
      <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${bar}`} />
      <header className="flex items-center gap-3 px-6 pb-4 pt-7 sm:px-8">
        <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <h3 className="text-[22px] font-semibold tracking-[-0.015em]">{side.data.name}</h3>
      </header>
      <div className="grid flex-1 grid-cols-1 gap-px bg-line-200 sm:grid-cols-[1.25fr_1fr]">
        {(
          [
            [ui.receive, side.data.receive],
            [ui.give, side.data.give],
          ] as const
        ).map(([title, items]) => (
          <div key={title} className="flex flex-col gap-3 bg-white px-6 py-5 sm:px-8">
            <p className={`text-[12px] font-semibold uppercase tracking-[0.12em] ${tag}`}>{title}</p>
            <ul className="flex flex-col gap-2.5 text-[15px] leading-snug">
              {items.map((it, i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${dot} opacity-70`} />
                  <span>
                    <RichText text={it} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

/* ───────────── Lợi ích hai bên, từng dòng đối ứng ───────────── */

/** Dòng thứ i của khách hàng đối ứng dòng thứ i của Celesnity (decks/<slug>/content.vi.ts → benefits). */
function PairedBenefits() {
  const { benefits } = useDeck();
  const { partner, celesnity, rowLabels, groupTitles, columnHeads } = benefits;
  const groups = [
    {
      key: "give",
      title: groupTitles?.give ?? ui.give,
      heads: columnHeads?.give,
      labels: rowLabels?.give ?? [],
      a: partner.give,
      b: celesnity.give,
    },
    {
      key: "receive",
      title: groupTitles?.receive ?? ui.receive,
      heads: columnHeads?.receive,
      labels: rowLabels?.receive ?? [],
      a: partner.receive,
      b: celesnity.receive,
    },
  ];
  const hasLabels = groups.some((g) => g.labels.length > 0);
  // Có cột hạng mục: hạng mục · khách hàng · khoảng giữa · Celesnity
  const grid = hasLabels
    ? "lg:grid-cols-[minmax(150px,0.62fr)_minmax(0,1fr)_40px_minmax(0,1fr)]"
    : "lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)]";

  return (
    <div className="flex flex-col gap-10">
      {groups.map((g, gi) => {
        const partnerHead = g.heads?.[1] ?? partner.name;
        const celesnityHead = g.heads?.[2] ?? celesnity.name;
        return (
          <section key={g.key} aria-labelledby={`pb-${g.key}`} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span aria-hidden className="tabular flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[13px] font-semibold text-white">
                {String(gi + 1).padStart(2, "0")}
              </span>
              <h4 id={`pb-${g.key}`} className="text-[19px] font-semibold tracking-[-0.01em] text-navy-900 sm:text-[21px]">
                {g.title}
              </h4>
            </div>

            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line-200 bg-white shadow-[0_20px_50px_-28px_rgba(10,31,68,0.4)]">
              <div aria-hidden className={`hidden border-b border-line-200 bg-mist-50 lg:grid ${grid}`}>
                {hasLabels ? (
                  <div className="flex items-center px-8 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-500">
                    {g.heads?.[0] ?? ""}
                  </div>
                ) : null}
                <PairHead name={partnerHead} accent="orange" />
                <div className="flex items-center justify-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-200 bg-white text-navy-900">
                    <ArrowLeftRight size={16} strokeWidth={1.5} />
                  </span>
                </div>
                <PairHead name={celesnityHead} accent="blue" />
              </div>

              <ul>
                {Array.from({ length: Math.max(g.a.length, g.b.length) }).map((_, i) => (
                  <li key={i} className={`grid grid-cols-1 border-t border-line-200 first:border-t-0 ${grid}`}>
                    {hasLabels ? (
                      <p className="px-6 pb-1 pt-4 text-[15px] font-semibold leading-snug text-navy-900 sm:px-8 lg:py-4">
                        <RichText text={g.labels[i] ?? ""} />
                      </p>
                    ) : null}
                    <PairCell name={partnerHead} text={g.a[i] ?? ""} accent="orange" />
                    <span aria-hidden className="hidden lg:block" />
                    <PairCell name={celesnityHead} text={g.b[i] ?? ""} accent="blue" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function PairHead({ name, accent }: { name: string; accent: "orange" | "blue" }) {
  return (
    <div className="relative flex items-center gap-2.5 px-8 pb-4 pt-5">
      <span className={`absolute inset-x-0 top-0 h-1 ${accent === "orange" ? "bg-orange-500" : "bg-blue-500"}`} />
      <span className={`h-2.5 w-2.5 rounded-full ${accent === "orange" ? "bg-orange-500" : "bg-blue-500"}`} />
      <span className="text-[17px] font-semibold tracking-[-0.01em]">{name}</span>
    </div>
  );
}

function PairCell({ name, text, accent }: { name: string; text: string; accent: "orange" | "blue" }) {
  const dot = accent === "orange" ? "bg-orange-500" : "bg-blue-500";
  const tag = accent === "orange" ? "text-orange-700" : "text-blue-600";
  return (
    <div className={`flex flex-col gap-1 px-6 py-4 sm:px-8 ${accent === "blue" ? "pt-0 lg:pt-4" : ""}`}>
      <span className={`text-[12px] font-semibold uppercase tracking-[0.1em] lg:sr-only ${tag}`}>{name}</span>
      <p className="flex gap-2.5 text-[15px] leading-snug">
        <span aria-hidden className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${dot} opacity-70`} />
        <span>
          <RichText text={text} />
        </span>
      </p>
    </div>
  );
}

/* ───────────── Gói hợp tác ───────────── */

function Package() {
  const { packageParts, costShift } = useDeck();
  const [ref, inView] = useInView<HTMLElement>("-10% 0px");
  const reduced = useReducedMotion();
  const show = inView || reduced;
  return (
    <div className="flex flex-col gap-6">
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {packageParts.map((p, i) => {
          const isDeploy = i === 2;
          return (
            <li
              key={p.n}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius-card)] border border-line-200 bg-white p-6 shadow-[0_20px_50px_-28px_rgba(10,31,68,0.4)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-28px_rgba(10,31,68,0.5)] sm:p-7"
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-2xl ${
                  isDeploy ? "bg-blue-300/25" : "bg-blue-500/15"
                }`}
              />
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-[20px] ${
                    isDeploy ? "bg-blue-100 text-blue-600" : "bg-navy-900 text-blue-300"
                  }`}
                >
                  {p.n}
                </span>
                <span aria-hidden className={`h-px flex-1 ${isDeploy ? "bg-blue-300" : "bg-blue-500"}`} />
              </div>
              <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.01em]">
                <span className="sr-only">{p.n} </span>
                <RichText text={p.name} />
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-500">
                <RichText text={p.body} strongClass="font-semibold text-navy-900" />
              </p>
            </li>
          );
        })}
      </ol>

      <h3 className="pt-4 text-[22px] font-semibold tracking-tight sm:text-[26px]">Dự tính chi phí</h3>
      <figure
        ref={ref}
        className="rounded-[var(--radius-card)] border border-line-200 bg-white p-6 shadow-[0_20px_50px_-28px_rgba(10,31,68,0.4)] sm:p-8"
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-blue-600">{ui.shiftTitle}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-500" aria-hidden>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-5 rounded-full bg-blue-300" /> {ui.deploy}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-5 rounded-full bg-blue-500" /> {ui.model}
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4" aria-hidden>
          {costShift.map((row, i) => (
            <div key={row.year} className="grid grid-cols-[64px_1fr] items-center gap-3 sm:grid-cols-[88px_1fr] sm:gap-5">
              <span className="text-[15px] font-semibold">{row.year}</span>
              <div className="flex h-12 w-full overflow-hidden rounded-[var(--radius-control)] bg-mist-50">
                <Segment
                  frac={row.deploy}
                  show={show}
                  delay={i * 120}
                  reduced={reduced}
                  className="bg-blue-300 text-navy-900"
                  label={row.deployLabel}
                />
                <Segment
                  frac={row.model}
                  show={show}
                  delay={i * 120 + 60}
                  reduced={reduced}
                  className="bg-blue-500 text-white"
                  label={row.modelLabel}
                />
              </div>
            </div>
          ))}
        </div>
        <figcaption className="mt-6 flex items-center gap-2 text-[15px] text-ink-500">
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden className="shrink-0 text-blue-500" />
          <span>{ui.shiftNote}</span>
          <span className="sr-only">
            {costShift
              .map((r) => `${r.year}: ${ui.deploy} ${r.deployLabel.toLowerCase()}, ${ui.model} ${r.modelLabel.toLowerCase()}.`)
              .join(" ")}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

function Segment({
  frac,
  show,
  delay,
  reduced,
  className,
  label,
}: {
  frac: number;
  show: boolean;
  delay: number;
  reduced: boolean;
  className: string;
  label: string;
}) {
  return (
    <div
      className={`flex h-full min-w-0 items-center overflow-hidden whitespace-nowrap px-3 text-[13px] font-medium first:rounded-l-[var(--radius-control)] last:rounded-r-[var(--radius-control)] ${className}`}
      style={{
        width: show ? `${frac * 100}%` : "0%",
        transition: reduced ? "none" : `width 600ms var(--ease-brand) ${delay}ms`,
      }}
    >
      <span className={`transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>{label}</span>
    </div>
  );
}

/* ───────────── Lời mời và đoạn kết ───────────── */

function Closing() {
  const { closing, basePath } = useDeck();
  const bleedRef = useRef<HTMLDivElement>(null);
  const [sceneRef, inView] = useInView<HTMLDivElement>("-15% 0px");
  const reduced = useReducedMotion();
  const visible = inView || reduced;

  // Khối đoạn kết tràn toàn chiều rộng: cắt phần tràn ngang ở section chứa để không sinh thanh cuộn ngang.
  useEffect(() => {
    const section = bleedRef.current?.closest("section");
    if (!section) return;
    const prev = section.style.overflowX;
    section.style.overflowX = "clip";
    return () => {
      section.style.overflowX = prev;
    };
  }, []);

  return (
    <div className="mt-14">
      <div className="flex flex-col gap-3 sm:flex-row" data-hide-in-print>
        <a
          href={`${basePath}/ban-in?print=1`}
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-orange-500 px-6 text-[15px] font-semibold text-navy-900 shadow-[0_14px_30px_-16px_rgba(232,98,10,0.7)] transition-colors hover:bg-orange-600"
        >
          <FileDown size={18} strokeWidth={1.5} aria-hidden />
          {closing.pdf}
        </a>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("landing:open-assistant"))}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-navy-900 px-6 text-[15px] font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
        >
          <MessageCircle size={18} strokeWidth={1.5} aria-hidden />
          {closing.ask}
        </button>
      </div>

      {/* Full-bleed: thoát khỏi container, kéo tới đáy section (bù padding dưới của Section) */}
      <div
        ref={bleedRef}
        className="theme-dark grain relative -mb-24 ml-[calc(50%-50vw)] mt-24 w-screen sm:-mb-[120px] sm:mt-[120px] lg:-mb-[160px]"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-4 py-20 sm:px-8 sm:py-28">
          <div
            ref={sceneRef}
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(16px)",
              transition: reduced ? "none" : "opacity 600ms var(--ease-brand), transform 600ms var(--ease-brand)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-[10%] top-[20%] h-[60%] rounded-full bg-blue-500/20 blur-[90px]"
            />
            <FactoryScene state={3} steelDestination particles className="relative" />
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] sm:text-[40px] lg:text-[48px]">
              <RichText text={closing.headline} />
            </h2>
            <div className="flex flex-col gap-5">
              <p className="muted text-[15px] font-medium uppercase tracking-[0.12em]">{closing.lead}</p>
              <blockquote className="border-l-2 border-blue-500 pl-5 text-[18px] leading-relaxed text-white/90 sm:text-[20px]">
                <RichText text={closing.story} />
              </blockquote>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 border-t border-navy-700 pt-10 sm:items-center sm:text-center">
            <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-blue-300 sm:text-[17px]">
              <RichText text={closing.tagline} />
            </p>
            <p className="text-[26px] font-semibold tracking-[-0.02em] text-orange-500 sm:text-[32px]">{closing.owner}</p>
            <p className="muted text-[17px]">{closing.thanks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
