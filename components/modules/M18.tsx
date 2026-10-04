"use client";
/**
 * M18 — Danh mục ứng dụng dạng carousel trước/sau, tự chuyển khi cuộn.
 * Dữ liệu: deck.useCases + deck.beforeAfter.
 */
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowRight, BadgeCheck, Hand, Sparkles, UserRound } from "lucide-react";
import type { UseCase } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { RichText } from "@/components/shared/RichText";
import { ScrollSteps } from "@/components/shared/ScrollSteps";
import { onAction } from "@/lib/actions";
import { useReducedMotion } from "@/lib/useReducedMotion";


export default function M18(_props: { variant?: string }) {
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
