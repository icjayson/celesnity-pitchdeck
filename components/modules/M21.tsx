"use client";
/**
 * M21 — Thẻ có hình minh họa (phong cách M2) và sơ đồ ranh giới bảo mật. Dữ liệu: deck.scenarios.m21.
 * Biến thể: tên một bộ thẻ trong `sets` (ví dụ "buoc", "ba-viec") · "security" (ranh giới dữ liệu trong nhà máy).
 * Bản in bỏ module; nội dung tương đương nằm trong bảng của section.
 */
import { Fragment, useRef, useState, type KeyboardEvent } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  Check,
  DraftingCompass,
  Factory,
  ListChecks,
  Lock,
  PlayCircle,
  Receipt,
  Scale,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { useDeck } from "@/components/deck/DeckProvider";
import { RichText } from "@/components/shared/RichText";
import { Photo } from "@/components/shared/Photo";
import { Video } from "@/components/shared/Video";
import type { ArchIcon, IllustratedCard, IllustratedData } from "@/decks/types";
import { IllustrationSvg } from "./M21/Art";

const GRID: Record<number, string> = {
  2: "lg:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)]",
  3: "lg:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)_32px_minmax(0,1fr)]",
  4: "lg:grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)_24px_minmax(0,1fr)_24px_minmax(0,1fr)]",
};
const GRID_PLAIN: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" };

export default function M21({ variant = "" }: { variant?: string }) {
  const data = useDeck().scenarios.m21!;
  if (variant === "security" && data.security) return <Security s={data.security} />;
  if (variant === "architecture" && data.architecture) return <Architecture a={data.architecture} />;
  if (data.gallery?.[variant]) return <Gallery items={data.gallery[variant]} />;
  const set = data.sets[variant];
  if (!set) return null;
  const n = set.cards.length;
  if (set.layout === "rows") {
    return (
      <div className="flex flex-col gap-5">
        {set.cards.map((c) => (
          <Row key={c.title} c={c} />
        ))}
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-1 gap-4 ${set.arrows ? `${GRID[n] ?? GRID[3]} lg:gap-0` : GRID_PLAIN[n] ?? GRID_PLAIN[3]}`}>
      {set.cards.map((c, i) => (
        <Fragment key={c.title}>
          {set.arrows && i > 0 ? (
            <div aria-hidden className="flex items-center justify-center text-ink-500">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line-200 bg-white">
                <ArrowDown size={14} strokeWidth={1.5} className="lg:hidden" />
                <ArrowRight size={14} strokeWidth={1.5} className="hidden lg:block" />
              </span>
            </div>
          ) : null}
          <Card c={c} />
        </Fragment>
      ))}
    </div>
  );
}

function Card({ c }: { c: IllustratedCard }) {
  const f = !!c.featured;
  return (
    <article
      className={`flex h-full flex-col rounded-[var(--radius-card)] border p-5 sm:p-6 ${
        f
          ? "border-navy-700 bg-gradient-to-b from-navy-800 to-navy-900 text-white shadow-[0_32px_70px_-36px_rgba(10,31,68,0.9)]"
          : "border-line-200 bg-white shadow-[0_20px_50px_-34px_rgba(10,31,68,0.4)]"
      }`}
    >
      {c.eyebrow ? (
        <p className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${f ? "text-blue-300" : "text-ink-500"}`}>{c.eyebrow}</p>
      ) : null}
      <div className={`mt-3 h-[120px] overflow-hidden rounded-[12px] border px-2 py-1 sm:h-[128px] ${f ? "border-navy-700 bg-white/95" : "border-line-200 bg-mist-50"}`}>
        <IllustrationSvg art={c.art} />
      </div>
      <h3 className="mt-5 text-[19px] font-semibold leading-snug tracking-[-0.01em]">
        <RichText text={c.title} />
      </h3>
      {c.sub ? <p className={`mt-0.5 text-[13px] ${f ? "text-blue-300" : "text-ink-500"}`}>{c.sub}</p> : null}
      <dl className="mt-4 flex flex-1 flex-col gap-3.5 text-[15px] leading-relaxed">
        {c.rows.map((r, i) => (
          <div key={r.k} className={i === c.rows.length - 1 && c.rows.length > 1 ? `mt-auto border-t pt-3.5 ${f ? "border-navy-700" : "border-line-200"}` : ""}>
            <dt className={`text-[12px] font-medium uppercase tracking-[0.1em] ${f ? "text-blue-300" : "text-ink-500"}`}>{r.k}</dt>
            <dd className="mt-1">
              <RichText text={r.v} />
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Ranh giới dữ liệu: mọi thứ trong khung nét đứt nằm trong nhà máy; ra ngoài chỉ tới nguồn được phép */
function Security({ s }: { s: NonNullable<IllustratedData["security"]> }) {
  const node = "rounded-[12px] border border-line-200 bg-white px-4 py-3 shadow-[0_12px_30px_-24px_rgba(10,31,68,0.5)]";
  const Arrow = () => (
    <div aria-hidden className="flex items-center justify-center text-blue-500">
      <ArrowDown size={18} strokeWidth={1.5} className="lg:hidden" />
      <ArrowRight size={18} strokeWidth={1.5} className="hidden lg:block" />
    </div>
  );
  return (
    <figure className="m-0 flex flex-col gap-4">
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_44px_minmax(0,0.42fr)]">
        {/* Trong nhà máy */}
        <div className="relative rounded-[20px] border-2 border-dashed border-navy-900/25 bg-mist-50/70 p-4 pt-11 sm:p-6 sm:pt-12">
          <p className="absolute left-4 top-3.5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-navy-900 sm:left-6">
            <Lock aria-hidden size={15} strokeWidth={1.75} className="text-orange-500" />
            {s.boundary}
          </p>
          <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[minmax(0,1fr)_28px_minmax(0,1.05fr)_28px_minmax(0,1fr)]">
            <ul className="flex flex-col gap-2.5">
              {s.systems.map((x) => (
                <li key={x.name} className={node}>
                  <p className="text-[15px] font-semibold leading-snug">{x.name}</p>
                  <p className="text-[13px] leading-snug text-ink-500">{x.sub}</p>
                </li>
              ))}
            </ul>
            <div aria-hidden className="flex flex-col items-center justify-center gap-1 text-blue-500">
              <ArrowDown size={18} strokeWidth={1.5} className="lg:hidden" />
              <ArrowRight size={18} strokeWidth={1.5} className="hidden lg:block" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-500 lg:hidden">{s.via}</span>
            </div>
            <div className="relative overflow-hidden rounded-[16px] bg-navy-900 px-5 py-6 text-white shadow-[0_24px_50px_-26px_rgba(10,31,68,0.9)]">
              <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/35 blur-2xl" />
              <p className="relative text-[12px] font-semibold uppercase tracking-[0.12em] text-blue-300">{s.via}</p>
              <p className="relative mt-2 text-[22px] font-semibold tracking-[-0.015em]">{s.core.name}</p>
              <p className="relative mt-1 text-[14px] leading-snug text-blue-100">{s.core.sub}</p>
            </div>
            <Arrow />
            <ul className="flex flex-col gap-2.5">
              {s.inside.map((x) => (
                <li key={x.name} className={node}>
                  <p className="text-[15px] font-semibold leading-snug">{x.name}</p>
                  <p className="text-[13px] leading-snug text-ink-500">{x.sub}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Arrow />
        {/* Ra ngoài */}
        <div className="flex flex-col justify-center gap-3">
          <div className="rounded-[12px] border border-blue-500/50 bg-blue-100/60 px-4 py-3">
            <p className="flex items-center gap-2 text-[15px] font-semibold">
              <ShieldCheck aria-hidden size={17} strokeWidth={1.5} className="text-blue-600" />
              {s.allowed.name}
            </p>
            <p className="mt-0.5 flex items-start gap-2 text-[13px] leading-snug text-ink-500">
              <Check aria-hidden size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-blue-600" />
              {s.allowed.sub}
            </p>
          </div>
          <div className="rounded-[12px] border border-dashed border-line-200 bg-white/60 px-4 py-3 opacity-80">
            <p className="flex items-center gap-2 text-[15px] font-semibold text-ink-500 line-through decoration-ink-500/60">
              {s.blocked.name}
            </p>
            <p className="mt-0.5 flex items-start gap-2 text-[13px] leading-snug text-ink-500">
              <X aria-hidden size={14} strokeWidth={2} className="mt-0.5 shrink-0" />
              {s.blocked.sub}
            </p>
          </div>
        </div>
      </div>
      <figcaption className="muted text-[14px] leading-relaxed">
        <RichText text={s.caption} />
      </figcaption>
    </figure>
  );
}

/* ───────────── Sơ đồ kiến trúc ───────────── */

const ARCH_ICON: Record<ArchIcon, LucideIcon> = {
  ledger: Receipt,
  machine: Activity,
  drawing: DraftingCompass,
  law: Scale,
  accounting: Calculator,
  engineering: Wrench,
  production: Factory,
  leadership: BriefcaseBusiness,
};

/** Đường nối có chấm dữ liệu chạy: ngang trên desktop, dọc trên điện thoại */
function Flow({ label, tone = "blue" }: { label?: string; tone?: "blue" | "orange" }) {
  const line = tone === "orange" ? "border-orange-500/60" : "border-blue-500/50";
  const dot = tone === "orange" ? "bg-orange-500" : "bg-blue-500";
  const text = tone === "orange" ? "text-orange-700" : "text-blue-600";
  return (
    <div aria-hidden className="flex flex-col items-center justify-center gap-2 py-1 lg:px-2 lg:py-0">
      {label ? <span className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] ${text}`}>{label}</span> : null}
      <div className="relative hidden w-full items-center lg:flex">
        <span className={`h-0 flex-1 border-t-2 border-dashed ${line}`} />
        <ArrowRight size={16} strokeWidth={2} className={`-ml-1 shrink-0 ${tone === "orange" ? "text-orange-500" : "text-blue-500"}`} />
        <span className={`arch-dot-x absolute top-1/2 -mt-[4px] h-2 w-2 rounded-full ${dot} shadow-[0_0_0_4px_rgba(47,123,246,0.15)]`} />
      </div>
      <div className="relative flex h-10 flex-col items-center lg:hidden">
        <span className={`w-0 flex-1 border-l-2 border-dashed ${line}`} />
        <ArrowDown size={16} strokeWidth={2} className={`-mt-1 ${tone === "orange" ? "text-orange-500" : "text-blue-500"}`} />
        <span className={`arch-dot-y absolute left-1/2 -ml-[4px] h-2 w-2 rounded-full ${dot}`} />
      </div>
    </div>
  );
}

function ArchNode({ icon, name, sub, tone = "plain" }: { icon: ArchIcon; name: string; sub: string; tone?: "plain" | "user" }) {
  const Icon = ARCH_ICON[icon];
  return (
    <li className="flex items-start gap-3 rounded-[14px] border border-line-200 bg-white p-3.5 shadow-[0_14px_30px_-24px_rgba(10,31,68,0.5)]">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${
          tone === "user" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-600"
        }`}
      >
        <Icon aria-hidden size={18} strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold leading-snug">{name}</p>
        <p className="text-[13px] leading-snug text-ink-500">{sub}</p>
      </div>
    </li>
  );
}

function Architecture({ a }: { a: NonNullable<IllustratedData["architecture"]> }) {
  return (
    <figure className="m-0 flex flex-col gap-4">
      <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1.2fr)_96px_minmax(0,1fr)] lg:gap-0">
        {/* Hệ thống của khách hàng */}
        <div className="rounded-[20px] border border-dashed border-navy-900/20 bg-white/60 p-3 sm:p-4">
          <p className="mb-3 px-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">{a.sourcesTitle}</p>
          <ul className="flex flex-col gap-2.5">
            {a.sources.map((x) => (
              <ArchNode key={x.name} {...x} />
            ))}
          </ul>
        </div>

        <Flow label={a.via} />

        {/* Minder AI và quy tắc do quản lý đặt */}
        <div className="flex flex-col items-stretch">
          <div className="rounded-[16px] border border-orange-500/40 bg-orange-100/70 p-4">
            <p className="flex items-center gap-2 text-[15px] font-semibold text-navy-900">
              <ListChecks aria-hidden size={17} strokeWidth={1.5} className="text-orange-700" />
              {a.rule.name}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-ink-500">{a.rule.sub}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {a.rule.fields.map((f) => (
                <li key={f} className="rounded-full border border-orange-500/30 bg-white px-2.5 py-0.5 text-[12px] font-medium text-orange-700">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden className="relative mx-auto h-7 w-px overflow-hidden bg-orange-500/50">
            <span className="arch-dot-y absolute -left-[2.5px] h-1.5 w-1.5 rounded-full bg-orange-500" />
          </div>
          <div className="relative overflow-hidden rounded-[20px] bg-navy-900 p-5 text-white shadow-[0_36px_80px_-36px_rgba(10,31,68,0.95)] sm:p-6">
            <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/35 blur-3xl" />
            <span aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-blue-400/15 blur-3xl" />
            <div className="relative flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-blue-500/20 text-blue-300 ring-1 ring-blue-300/30">
                <Sparkles aria-hidden size={20} strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[22px] font-semibold leading-tight tracking-[-0.015em]">{a.core.name}</p>
                <p className="text-[13px] text-blue-300">{a.core.sub}</p>
              </div>
            </div>
            <ol className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
              {a.core.steps.map((st, i) => (
                <li key={st} className="flex flex-col gap-1 rounded-[12px] border border-navy-700 bg-navy-800/70 px-3 py-2.5">
                  <span className="tabular text-[11px] font-semibold text-blue-300">0{i + 1}</span>
                  <span className="whitespace-nowrap text-[14px] font-semibold leading-snug">{st}</span>
                </li>
              ))}
            </ol>
            <p className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/[0.06] px-3 py-1 text-[12.5px] font-medium text-blue-100">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-300" />
              {a.core.key}
            </p>
          </div>
        </div>

        <Flow label={a.out} tone="orange" />

        {/* Người nhận theo vai trò */}
        <div className="rounded-[20px] border border-line-200 bg-white/60 p-3 sm:p-4">
          <p className="mb-3 px-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">{a.usersTitle}</p>
          <ul className="flex flex-col gap-2.5">
            {a.users.map((x) => (
              <ArchNode key={x.name} {...x} tone="user" />
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="muted text-[14px] leading-relaxed">
        <RichText text={a.caption} />
      </figcaption>
    </figure>
  );
}

/* ───────────── Hàng: nội dung (cột 1) + video (cột 2–3) ───────────── */

function Row({ c }: { c: IllustratedCard }) {
  return (
    <article className="grid grid-cols-1 gap-5 rounded-[var(--radius-card)] border border-line-200 bg-white p-5 shadow-[0_20px_50px_-34px_rgba(10,31,68,0.4)] sm:p-6 lg:grid-cols-3 lg:gap-8">
      <div className="flex flex-col">
        {c.eyebrow ? <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-500">{c.eyebrow}</p> : null}
        <div className="mt-3 h-[112px] overflow-hidden rounded-[12px] border border-line-200 bg-mist-50 px-2 py-1">
          <IllustrationSvg art={c.art} />
        </div>
        <h3 className="mt-5 text-[19px] font-semibold leading-snug tracking-[-0.01em]">
          <RichText text={c.title} />
        </h3>
        {c.sub ? <p className="mt-0.5 text-[13px] text-ink-500">{c.sub}</p> : null}
        <dl className="mt-4 flex flex-1 flex-col gap-3.5 text-[15px] leading-relaxed">
          {c.rows.map((r) => (
            <div key={r.k}>
              <dt className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink-500">{r.k}</dt>
              <dd className="mt-1">
                <RichText text={r.v} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-col justify-center lg:col-span-2">
        {c.video ? (
          <Video video={c.video} />
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-line-200 bg-mist-50 text-ink-500">
            <PlayCircle aria-hidden size={44} strokeWidth={1.25} className="text-blue-500" />
            <p className="px-6 text-center text-[15px] font-medium">{c.videoPlaceholder ?? "Video demo"}</p>
          </div>
        )}
      </div>
    </article>
  );
}

/* ───────────── Ảnh chụp có tab ───────────── */

function Gallery({ items }: { items: NonNullable<IllustratedData["gallery"]>[string] }) {
  const [idx, setIdx] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = items.length;
    const map: Record<string, number> = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    setIdx(map[e.key]);
    refs.current[map[e.key]]?.focus();
  };
  const cur = items[idx];
  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="Quy tắc" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {items.map((it, i) => {
          const on = i === idx;
          return (
            <button
              key={it.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setIdx(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex flex-col items-start gap-0.5 rounded-[12px] border p-3.5 text-left transition-colors duration-300 ${
                on ? "border-navy-900 bg-navy-900 text-white shadow-[0_16px_36px_-20px_rgba(10,31,68,0.7)]" : "border-line-200 bg-white hover:border-blue-300 hover:bg-blue-100/50"
              }`}
            >
              <span className="flex items-center gap-2 text-[15px] font-semibold leading-snug">
                <ListChecks aria-hidden size={16} strokeWidth={1.5} className={on ? "text-orange-500" : "text-orange-700"} />
                {it.label}
              </span>
              {it.sub ? <span className={`text-[13px] leading-snug ${on ? "text-blue-100" : "text-ink-500"}`}>{it.sub}</span> : null}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" aria-label={cur.label}>
        <Photo photo={cur.photo} />
      </div>
    </div>
  );
}
