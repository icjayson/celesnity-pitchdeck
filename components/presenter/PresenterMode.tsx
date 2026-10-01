"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { X } from "lucide-react";
import { acts, sections } from "@/content/content.vi";
import { plainText } from "@/components/shared/RichText";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Chế độ trình chiếu (docs/implementation-plan.md, mục 2 "Thành phần dùng chung").
 * P bật/tắt · → ↓ PageDown Space: section kế · ← ↑ PageUp: section trước · Home/End · D: lớp chi tiết · Esc: thoát.
 * Style trình chiếu (scroll-snap, chữ lớn, ẩn [data-hide-in-presenter]) nằm trong app/globals.css.
 */
const ids = sections.map((s) => s.id);

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
}

/** Section đang chiếm phần trên khung nhìn */
function currentIndex(): number {
  const mid = window.innerHeight * 0.4;
  let best = 0;
  for (let i = 0; i < ids.length; i++) {
    const el = document.getElementById(ids[i]);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= mid) best = i;
  }
  return best;
}

export function PresenterMode() {
  const [on, setOn] = useState(false);
  const [index, setIndex] = useState(0);
  const [qr, setQr] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const indexRef = useRef(0);

  const go = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(ids.length - 1, i));
      const el = document.getElementById(ids[next]);
      if (!el) return;
      indexRef.current = next;
      setIndex(next);
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [reduced],
  );

  // Gắn cờ lên <html>
  useEffect(() => {
    const root = document.documentElement;
    if (on) root.dataset.presenter = "on";
    else delete root.dataset.presenter;
    return () => {
      delete root.dataset.presenter;
    };
  }, [on]);

  // Khi bật: căn section hiện tại vào khung, theo dõi vị trí cuộn
  useEffect(() => {
    if (!on) return;
    const start = currentIndex();
    go(start);
    const onScroll = () => {
      const i = currentIndex();
      indexRef.current = i;
      setIndex(i);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [on, go]);

  // Mã QR dẫn tới trang
  useEffect(() => {
    if (!on || qr) return;
    let cancelled = false;
    QRCode.toString(window.location.origin, {
      type: "svg",
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0a1f44", light: "#ffffff" },
    })
      .then((svg) => {
        if (!cancelled) setQr(svg);
      })
      .catch(() => {
        if (!cancelled) setQr(null);
      });
    return () => {
      cancelled = true;
    };
  }, [on, qr]);

  // Sự kiện từ mục lục
  useEffect(() => {
    const toggle = () => setOn((o) => !o);
    window.addEventListener("landing:presenter-toggle", toggle);
    return () => window.removeEventListener("landing:presenter-toggle", toggle);
  }, []);

  // Bàn phím
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;
      const key = e.key;
      if (key === "p" || key === "P") {
        e.preventDefault();
        setOn((o) => !o);
        return;
      }
      if (!on) return;
      switch (key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(indexRef.current + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go(indexRef.current - 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(ids.length - 1);
          break;
        case "d":
        case "D":
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("landing:toggle-details", { detail: ids[indexRef.current] }));
          break;
        case "Escape":
          setOn(false);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [on, go]);

  if (!on) return null;

  const s = sections[index];
  const act = s && s.act > 0 ? acts[s.act - 1] : null;

  return (
    <div
      role="status"
      aria-live="polite"
      data-hide-in-print
      data-presenter-hud
      className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-32px)] items-stretch gap-4 rounded-[var(--radius-card)] border border-white/10 bg-navy-900/80 p-3 text-white shadow-[0_20px_50px_-24px_rgba(6,20,46,0.8)] backdrop-blur-md"
    >
      <div className="flex min-w-0 flex-col justify-between gap-3 py-1 pl-1">
        <div className="min-w-0">
          <p className="tabular text-[13px] font-semibold tracking-[0.04em] text-white">
            {index + 1} / {ids.length}
            {act ? <span className="font-medium text-blue-300"> · {act.label}</span> : null}
          </p>
          <p className="max-w-[26ch] truncate text-[15px] font-medium leading-snug">{s ? plainText(s.eyebrow) : ""}</p>
        </div>
        <ul className="hidden flex-wrap gap-x-3 gap-y-1 text-[12px] text-blue-300 sm:flex" aria-label="Phím tắt">
          <li>
            <Kbd>←</Kbd> <Kbd>→</Kbd> chuyển
          </li>
          <li>
            <Kbd>D</Kbd> chi tiết
          </li>
          <li>
            <Kbd>Esc</Kbd> thoát
          </li>
        </ul>
      </div>
      {qr ? (
        <figure className="hidden shrink-0 flex-col items-center gap-1 sm:flex">
          <div
            className="h-[84px] w-[84px] overflow-hidden rounded-[var(--radius-control)] bg-white p-1 [&>svg]:h-full [&>svg]:w-full"
            role="img"
            aria-label="Mã QR mở trang này"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <figcaption className="text-[11px] text-blue-300">Mở trên điện thoại</figcaption>
        </figure>
      ) : null}
      <button
        type="button"
        onClick={() => setOn(false)}
        aria-label="Thoát chế độ trình chiếu"
        className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-[var(--radius-control)] text-blue-300 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={16} strokeWidth={1.5} aria-hidden />
      </button>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[20px] items-center justify-center rounded-[6px] border border-white/20 px-1 font-sans text-[11px] text-white">
      {children}
    </kbd>
  );
}
