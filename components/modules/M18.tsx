"use client";
/**
 * M18 — Danh mục ứng dụng dạng carousel trước/sau, tự chuyển khi cuộn.
 * Variant "detail": thẻ use case gồm bài toán, giải pháp, chỉ số đo lường và ảnh minh hoạ,
 * chọn bằng tab, không ghim khi cuộn vì thẻ cao hơn màn hình.
 * Variant "features": danh sách bên trái là các tính năng Minder (card.minder); thẻ bên phải là sơ đồ cây
 * tính năng → ứng dụng thực tế (mỗi ứng dụng gắn khâu, card.stage) và một ô video bên dưới (card.video, chưa có thì ô chờ).
 * Dữ liệu: deck.useCases + deck.beforeAfter.
 */
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { ArrowRight, BadgeCheck, Factory, Gauge, Hand, ImageIcon, Sparkles, UserRound } from "lucide-react";
import type { UseCase } from "@/decks/types";
import { useDeck, useUi } from "@/components/deck/DeckProvider";
import { Photo } from "@/components/shared/Photo";
import { ZoomableImages } from "@/components/shared/Lightbox";
import { RichText } from "@/components/shared/RichText";
import { Video } from "@/components/shared/Video";
import { ScrollSteps } from "@/components/shared/ScrollSteps";
import { onAction } from "@/lib/actions";
import { useReducedMotion } from "@/lib/useReducedMotion";


export default function M18({ variant }: { variant?: string }) {
  if (variant === "detail") return <Detail />;
  if (variant === "features") return <Features />;
  return <Carousel />;
}

function Carousel() {
  const { useCases, beforeAfter } = useDeck();
  const items = useMemo(() => useCases.filter((u) => beforeAfter[u.id] && u.card), [useCases, beforeAfter]);
  const [idx, setIdx] = useState(0);
  const reduced = useReducedMotion();
  const total = items.length;
  const go = (i: number) => setIdx(Math.max(0, Math.min(total - 1, i)));
  const startX = useRef<number | null>(null);

  // Trợ lý AI có thể mở một ứng dụng cụ thể
  useEffect(
    () =>
      onAction("open_use_case", ({ uc }) => {
        const i = items.findIndex((u) => u.id === uc);
        if (i >= 0) setIdx(i);
      }),
    [items],
  );

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(idx + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
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
    <ScrollSteps steps={total} onStep={go} perStepVh={45}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Cột 1: danh sách ứng dụng */}
        <div role="tablist" aria-label="Các ứng dụng" aria-orientation="vertical" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
          {items.map((u, i) => {
            const on = i === idx;
            return (
              <button
                key={u.id}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="m18-panel"
                onClick={() => go(i)}
                className={`flex min-w-0 flex-col gap-1 rounded-[12px] border px-4 py-3 text-left transition-all duration-300 ease-[var(--ease-brand)] ${
                  on
                    ? "border-navy-900 bg-navy-900 text-white shadow-[0_14px_30px_-18px_rgba(10,31,68,0.7)]"
                    : "border-line-200 bg-white text-navy-900 hover:border-blue-300 hover:bg-blue-100/60"
                }`}
              >
                <span className={`tabular text-[12px] font-semibold tracking-[0.06em] ${on ? "text-blue-300" : "text-ink-500"}`}>
                  Ứng dụng {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-semibold leading-snug">{u.name}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel */}
        <div
          id="m18-panel"
          role="tabpanel"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label={`Ứng dụng ${idx + 1} trên ${total}: ${items[idx].name}`}
          onKeyDown={onKey}
          onPointerDown={onDown}
          onPointerUp={onUp}
          className="overflow-hidden rounded-[var(--radius-card)] outline-offset-4 lg:col-span-2"
        >
          <div
            className="flex"
            style={{ transform: `translateX(-${idx * 100}%)`, transition: reduced ? "none" : "transform 600ms var(--ease-brand)" }}
          >
            {items.map((u, i) => (
              <div key={u.id} className="flex w-full shrink-0" aria-hidden={i !== idx} inert={i !== idx}>
                <Slide u={u} n={i + 1} total={total} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollSteps>
  );
}

function Slide({ u, n, total }: { u: UseCase; n: number; total: number }) {
  const ba = useDeck().beforeAfter[u.id];
  const card = u.card!;
  return (
    <article className="w-full rounded-[var(--radius-card)] border border-line-200 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,31,68,0.45)] sm:p-8">
      {/* Đầu thẻ */}
      <header className="flex flex-col gap-2">
        <p className="tabular text-[13px] font-semibold text-blue-600">
          Ứng dụng {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <h4 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-navy-900 sm:text-[32px]">{u.name}</h4>
      </header>

      {/* Trước / sau */}
      <div className="relative mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="flex flex-col gap-3 rounded-[14px] border border-dashed border-line-200 bg-mist-50 p-5 sm:p-6">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-500">
            <Hand aria-hidden size={15} strokeWidth={1.5} /> Cách làm thông thường
          </p>
          <p className="text-[17px] leading-relaxed text-navy-900/75">{ba.before}</p>
        </section>
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-navy-900 shadow-[0_8px_20px_-8px_rgba(255,122,26,0.8)] md:flex"
        >
          <ArrowRight size={18} strokeWidth={2} />
        </span>
        <section className="relative flex flex-col gap-3 overflow-hidden rounded-[14px] bg-navy-900 p-5 text-white sm:p-6">
          <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/30 blur-3xl" />
          <p className="relative flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-blue-300">
            <Sparkles aria-hidden size={15} strokeWidth={1.5} /> Với Mô hình AI Thế giới thực
          </p>
          <p className="relative text-[17px] font-medium leading-relaxed">{ba.after}</p>
        </section>
      </div>

      {/* Ai quyết định + Đạt khi */}
      <footer className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <p className="flex items-start gap-2.5 rounded-[12px] bg-orange-100 px-4 py-3 text-[15px] text-navy-900">
          <UserRound aria-hidden size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-orange-700" />
          <span>
            <span className="font-semibold">Người quyết định:</span> {card.decides}
          </span>
        </p>
        <p className="flex items-start gap-2.5 rounded-[12px] bg-blue-100 px-4 py-3 text-[15px] text-navy-900">
          <BadgeCheck aria-hidden size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blue-600" />
          <span>
            <span className="font-semibold text-blue-600">Đạt khi:</span> <RichText text={card.pass} />
          </span>
        </p>
      </footer>
    </article>
  );
}

// ───────────────────────────── Variant "detail" ─────────────────────────────

function Detail() {
  const { useCases, beforeAfter } = useDeck();
  const items = useMemo(() => useCases.filter((u) => beforeAfter[u.id] && u.card), [useCases, beforeAfter]);
  const [idx, setIdx] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = items.length;

  useEffect(
    () =>
      onAction("open_use_case", ({ uc }) => {
        const i = items.findIndex((u) => u.id === uc);
        if (i >= 0) setIdx(i);
      }),
    [items],
  );

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const i = (idx + step + total) % total;
    setIdx(i);
    tabs.current[i]?.focus();
  };

  const u = items[idx];
  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="Các ứng dụng" onKeyDown={onKey} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => {
          const on = i === idx;
          return (
            <button
              key={it.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`m18d-tab-${it.id}`}
              aria-selected={on}
              aria-controls="m18d-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setIdx(i)}
              className={`flex min-w-0 flex-col gap-1 rounded-[12px] border px-4 py-3 text-left transition-colors duration-300 ease-[var(--ease-brand)] ${
                on
                  ? "border-navy-900 bg-navy-900 text-white shadow-[0_14px_30px_-18px_rgba(10,31,68,0.7)]"
                  : "border-line-200 bg-white text-navy-900 hover:border-blue-300 hover:bg-blue-100/60"
              }`}
            >
              <span className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${on ? "text-blue-300" : "text-ink-500"}`}>{it.code}</span>
              <span className="text-[15px] font-semibold leading-snug">{it.name}</span>
              {it.card?.stage && <span className={`text-[13px] ${on ? "text-white/70" : "text-ink-500"}`}>{it.card.stage}</span>}
            </button>
          );
        })}
      </div>
      <div id="m18d-panel" role="tabpanel" aria-labelledby={`m18d-tab-${u.id}`} tabIndex={0} className="outline-offset-4">
        <DetailCard key={u.id} u={u} />
      </div>
    </div>
  );
}

function DetailCard({ u }: { u: UseCase }) {
  const ba = useDeck().beforeAfter[u.id];
  const c = u.card!;
  // Một ảnh dọc (bảng điều khiển dài) không được chiếm hết bề ngang thẻ.
  const narrow = (w: number, h: number) => h > w;
  return (
    <article className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line-200 bg-white p-5 shadow-[0_24px_60px_-40px_rgba(10,31,68,0.45)] sm:p-8">
      <header className="flex flex-col gap-2">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-blue-600">{u.code}</p>
        <h4 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-navy-900 sm:text-[30px]">{u.name}</h4>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="flex flex-col gap-3 rounded-[14px] border border-dashed border-line-200 bg-mist-50 p-5">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-500">
            <Hand aria-hidden size={15} strokeWidth={1.5} /> Bài toán
          </p>
          <p className="text-[16px] leading-relaxed text-navy-900/80">
            <RichText text={ba.before} />
          </p>
        </section>
        <section className="relative flex flex-col gap-3 overflow-hidden rounded-[14px] bg-navy-900 p-5 text-white">
          <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/30 blur-3xl" />
          <p className="relative flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-blue-300">
            <Sparkles aria-hidden size={15} strokeWidth={1.5} /> Giải pháp
          </p>
          <p className="relative text-[16px] leading-relaxed">
            <RichText text={ba.after} />
          </p>
        </section>
      </div>

      {c.kpis && <ListBox icon={<Gauge aria-hidden size={15} strokeWidth={1.5} />} title="Chỉ số đo lường (mục tiêu đề xuất, chốt sau khảo sát)" items={c.kpis} />}

      {c.images && c.images.length > 0 && (
        <section className="flex flex-col gap-4 rounded-[14px] border border-line-200 bg-mist-50 p-5">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-500">
            <ImageIcon aria-hidden size={15} strokeWidth={1.5} /> Ảnh thực tế trên sản phẩm, sử dụng số liệu minh hoạ
          </p>
          {c.images.map((img) => (
            <div key={img.src} className={`mx-auto w-full ${narrow(img.width, img.height) ? "max-w-[620px]" : ""}`}>
              <Photo photo={img} />
            </div>
          ))}
        </section>
      )}
    </article>
  );
}

function ListBox({ icon, title, items, tone }: { icon: ReactNode; title: string; items: string[]; tone?: "negative" }) {
  return (
    <section className="flex flex-col gap-2.5 rounded-[14px] border border-line-200 p-5">
      <p className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] ${tone === "negative" ? "text-orange-700" : "text-ink-500"}`}>
        {icon} {title}
      </p>
      <ul className={`flex flex-col gap-1.5 pl-5 text-[15px] leading-relaxed text-navy-900 ${tone === "negative" ? "list-[square] marker:text-orange-500" : "list-disc marker:text-blue-500"}`}>
        {items.map((t, i) => (
          <li key={i}>
            <RichText text={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}

// ───────────────────────────── Variant "features" ─────────────────────────────

/** "Tên (phụ đề)" → tên + phụ đề */
function splitName(t: string) {
  const m = t.match(/^(.*?)\s*\((.+)\)\s*$/);
  return m ? { name: m[1], sub: m[2] } : { name: t, sub: "" };
}

function Features() {
  const ui = useUi();
  const { useCases, beforeAfter } = useDeck();
  const items = useMemo(() => useCases.filter((u) => beforeAfter[u.id] && u.card), [useCases, beforeAfter]);
  /** Các tính năng theo thứ tự xuất hiện; mỗi tính năng là một tab, ứng dụng của nó nằm trong sơ đồ bên phải */
  const groups = useMemo(() => {
    const out: { f: string; list: { u: UseCase; i: number }[] }[] = [];
    items.forEach((u, i) => {
      const f = u.card?.minder ?? "";
      const g = out.find((x) => x.f === f);
      if (g) g.list.push({ u, i });
      else out.push({ f, list: [{ u, i }] });
    });
    return out;
  }, [items]);
  const [gi, setGi] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Trợ lý mở một ứng dụng: chọn tính năng chứa ứng dụng đó
  useEffect(
    () =>
      onAction("open_use_case", ({ uc }) => {
        const g = groups.findIndex((x) => x.list.some(({ u }) => u.id === uc));
        if (g >= 0) setGi(g);
      }),
    [groups],
  );

  const pick = (g: number) => {
    setGi(g);
    if (window.matchMedia("(max-width: 1023px)").matches) panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const g = (gi + step + groups.length) % groups.length;
    setGi(g);
    tabs.current[g]?.focus();
  };

  const g = groups[gi];
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
      <div role="tablist" aria-label={ui.minderFeatures} aria-orientation="vertical" onKeyDown={onKey} className="flex flex-col gap-2 lg:sticky lg:top-24">
        {groups.map((x, i) => {
          const t = splitName(x.f);
          const on = i === gi;
          return (
            <button
              key={x.f}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`m18f-tab-${i}`}
              aria-selected={on}
              aria-controls="m18f-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => pick(i)}
              className={`flex min-w-0 items-start gap-3 rounded-[12px] border px-4 py-3 text-left transition-colors duration-300 ease-[var(--ease-brand)] ${
                on ? "border-navy-900 bg-navy-900 text-white shadow-[0_14px_30px_-18px_rgba(10,31,68,0.7)]" : "border-line-200 bg-white text-navy-900 hover:border-blue-300 hover:bg-blue-100/60"
              }`}
            >
              <span className={`tabular mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-semibold ${on ? "bg-blue-500 text-white" : "border border-line-200 text-ink-500"}`}>{i + 1}</span>
              <span className="min-w-0 flex-1 leading-snug">
                <span className="block text-[15px] font-semibold">{t.name}</span>
                {t.sub ? <span className={`block text-[13px] ${on ? "text-blue-300" : "text-ink-500"}`}>{t.sub}</span> : null}
              </span>
              <span className={`tabular shrink-0 text-[12px] font-medium ${on ? "text-white/80" : "text-ink-500"}`}>{x.list.length}</span>
            </button>
          );
        })}
      </div>

      <div ref={panel} id="m18f-panel" role="tabpanel" aria-labelledby={`m18f-tab-${gi}`} tabIndex={0} className="scroll-mt-24 outline-offset-4">
        <FeatureCard key={g.f} f={g.f} n={gi + 1} total={groups.length} list={g.list} />
      </div>
    </div>
  );
}

/** Thẻ của một tính năng: sơ đồ cây tính năng → ứng dụng thực tế (mỗi ứng dụng gắn khâu), rồi ô video bên dưới */
function FeatureCard({ f, n, total, list }: { f: string; n: number; total: number; list: { u: UseCase; i: number }[] }) {
  const ui = useUi();
  const t = splitName(f);
  const video = list.find(({ u }) => u.card?.video)?.u.card?.video;
  const images = list.find(({ u }) => u.card?.images?.length)?.u.card?.images;
  return (
    <article className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-line-200 bg-white p-5 shadow-[0_24px_60px_-40px_rgba(10,31,68,0.45)] sm:p-7">
      <header className="flex flex-col gap-1.5">
        <p className="tabular text-[13px] font-semibold text-blue-600">
          {ui.featureOf(n, total, list.length)}
        </p>
        <h4 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-navy-900 sm:text-[28px]">{t.name}</h4>
        {t.sub ? <p className="text-[15px] text-ink-500">{t.sub}</p> : null}
      </header>

      {/* video demo chỉ hiện khi có video thật; không có thì không chừa chỗ trống */}
      {video ? <Video video={video} /> : null}
      {/* ảnh chụp Minder: hai ảnh thì chia hai cột; bấm để phóng to */}
      {images ? <ZoomableImages images={images} /> : null}

      <figure className="m-0 rounded-[14px] bg-mist-50 p-4 sm:p-5">
        <figcaption className="sr-only">{ui.featureCaption(t.name, list.length)}</figcaption>
        <div className="inline-flex items-center gap-2 rounded-[10px] bg-navy-900 px-3 py-2 text-[14px] font-semibold text-white">
          <span className="tabular grid h-5 w-5 place-items-center rounded-full bg-blue-500 text-[11px]">{n}</span>
          Minder · {t.name}
        </div>
        <ol className="relative mt-2 flex flex-col gap-2 pl-7">
          <span aria-hidden className="absolute bottom-6 left-[13px] top-0 w-px bg-line-200" />
          {list.map(({ u, i }) => (
            <li key={u.id} className="relative">
              <span aria-hidden className="absolute -left-[14px] top-1/2 h-px w-3.5 bg-line-200" />
              <span aria-hidden className="absolute -left-[17px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-500" />
              <div className="flex flex-col gap-2 rounded-[10px] border border-line-200 bg-white px-3.5 py-2.5 sm:flex-row sm:items-center sm:gap-4">
                <p className="min-w-0 flex-1 text-[14px] leading-snug text-navy-900">
                  <span className="tabular mr-2 text-[12px] font-semibold text-ink-500">{String(i + 1).padStart(2, "0")}</span>
                  {u.question}
                </p>
                <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-blue-100 px-2.5 py-1 text-[12px] font-medium text-navy-900 sm:self-center">
                  <Factory aria-hidden size={13} strokeWidth={1.5} className="text-blue-600" />
                  {u.card?.stage}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </figure>
    </article>
  );
}
