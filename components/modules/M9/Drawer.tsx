"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarClock, X } from "lucide-react";
import type { UseCase } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { Label } from "@/components/shared/Label";
import { RichText } from "@/components/shared/RichText";

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

/** Ngăn chi tiết use case: bên phải trên desktop, trượt từ dưới trên điện thoại. Có bẫy focus và Esc để đóng. */
export function UseCaseDrawer({ uc, onClose }: { uc: UseCase | null; onClose: () => void }) {
  const { labels, phaseLabels, sectorLabels } = useDeck();
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState<UseCase | null>(uc);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Giữ nội dung trong lúc đóng để hoạt ảnh chạy hết
  useEffect(() => {
    if (uc) {
      setShown(uc);
      const r = requestAnimationFrame(() => setOpen(true));
      return () => cancelAnimationFrame(r);
    }
    setOpen(false);
    const t = window.setTimeout(() => setShown(null), 420);
    return () => window.clearTimeout(t);
  }, [uc]);

  useEffect(() => {
    if (!uc) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const f = requestAnimationFrame(() => closeBtn.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!panel.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(f);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [uc, onClose]);

  if (!mounted || !shown) return null;
  const c = shown.card;
  const fields: [string, string | undefined, boolean?][] = c
    ? [
        ["Cơ hội", c.opportunity],
        ["AI làm gì", c.aiDoes],
        ["Dữ liệu", c.data],
        ["Ai quyết định", c.decides],
        ["Đo bằng", c.measure],
      ]
    : [];
  const titleId = `m9-drawer-${shown.id}`;

  return createPortal(
    <div className="fixed inset-0 z-[80]" aria-hidden={!uc}>
      <div
        className={`absolute inset-0 bg-navy-950/45 backdrop-blur-[2px] transition-opacity duration-400 ease-[var(--ease-brand)] ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col overflow-hidden rounded-t-[20px] bg-white text-navy-900 shadow-[0_-24px_60px_-20px_rgba(10,31,68,0.5)] transition-transform duration-500 ease-[var(--ease-brand)] sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[min(520px,100vw)] sm:rounded-none sm:rounded-l-[20px] ${
          open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full sm:translate-y-0"
        }`}
      >
        <div aria-hidden className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-line-200 sm:hidden" />
        <header className="flex shrink-0 items-start gap-4 border-b border-line-200 px-5 pb-5 pt-4 sm:px-8 sm:pt-8">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="tabular rounded-full bg-blue-100 px-2.5 py-0.5 text-[12px] font-semibold text-blue-600">{shown.code}</span>
              <span className="text-[12px] font-medium text-ink-500">{phaseLabels[shown.phase]}</span>
              {shown.note ? <Label variant="proposal" text={labels.proposal} /> : null}
            </div>
            <h3 id={titleId} className="text-[24px] font-semibold leading-tight tracking-[-0.02em]">
              {shown.name}
            </h3>
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-200 text-navy-900 transition-colors duration-300 hover:bg-mist-50"
          >
            <X size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
          <p className="text-[18px] leading-snug text-navy-900">
            <RichText text={shown.question} />
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {shown.sectors.map((s) => (
              <span key={s} className="rounded-full border border-line-200 px-2.5 py-0.5 text-[12px] text-ink-500">
                {sectorLabels[s]}
              </span>
            ))}
          </div>

          {fields.length ? (
            <dl className="mt-6 flex flex-col divide-y divide-line-200 border-y border-line-200">
              {fields
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                    <dt className="text-[13px] font-semibold text-ink-500">{k}</dt>
                    <dd className="text-[15px] leading-relaxed">
                      <RichText text={v!} />
                    </dd>
                  </div>
                ))}
            </dl>
          ) : null}

          {c ? (
            <div className="mt-6 rounded-[var(--radius-card)] border border-blue-300 bg-blue-100/60 p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-blue-600">Tiêu chí đạt</p>
              <p className="mt-1 text-[17px] leading-snug">
                <RichText text={c.pass} />
              </p>
            </div>
          ) : null}

          <div className="mt-4 flex items-center gap-3 rounded-[var(--radius-card)] border border-line-200 bg-mist-50 p-4">
            <CalendarClock size={20} strokeWidth={1.5} aria-hidden className="shrink-0 text-blue-600" />
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-500">Triển khai từ</p>
              <p className="tabular text-[16px] font-semibold">{shown.liveFrom}</p>
            </div>
          </div>
          <p className="mt-6 text-[13px] text-ink-500">Nhấn Esc để đóng.</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
