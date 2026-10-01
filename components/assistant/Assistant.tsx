"use client";
/**
 * Trợ lý "Hỏi về đề xuất" (docs/implementation-plan.md mục 4).
 * Nút nổi góc phải dưới → ngăn chat (desktop 400px, mobile toàn màn hình).
 * Mở từ nơi khác: window.dispatchEvent(new CustomEvent("landing:open-assistant", { detail: "câu hỏi điền sẵn" })).
 */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { MessageCircleQuestion, X } from "lucide-react";
import { dispatchAction } from "@/lib/actions";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useChat } from "./useChat";
import { useSpeech } from "./useSpeech";
import { ChatComposer } from "./ChatComposer";
import { ChatMessages } from "./ChatMessages";

const OPEN_EVENT = "landing:open-assistant";
const MOBILE_MQ = "(max-width: 767px)";

const isMobile = () => typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const reduced = useReducedMotion();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chat = useChat({
    reducedMotion: reduced,
    onAction: ({ name, input: actionInput }) => {
      // Trên mobile ngăn chat che toàn màn hình: không tự cuộn, người xem bấm "Xem phần này"
      if (name === "scroll_to_section" && isMobile()) return;
      dispatchAction(name, actionInput);
    },
  });

  const speech = useSpeech({ onText: (t) => setInput(t) });

  const openPanel = useCallback((prefill?: string) => {
    setOpen(true);
    if (prefill) setInput(prefill.slice(0, 1000));
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });
  }, []);

  const stopSpeech = speech.stop;
  const closePanel = useCallback(() => {
    stopSpeech();
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, [stopSpeech]);

  // Mở từ sự kiện của trang (nút "Hỏi trợ lý" ở đoạn kết, chế độ trình chiếu…)
  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent<unknown>).detail;
      openPanel(typeof d === "string" ? d : undefined);
    };
    window.addEventListener(OPEN_EVENT, h);
    return () => window.removeEventListener(OPEN_EVENT, h);
  }, [openPanel]);

  // Esc đóng
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
      }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, closePanel]);

  // Khóa cuộn trang khi ngăn chat toàn màn hình (mobile)
  useEffect(() => {
    if (!open || !isMobile()) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Giữ focus trong ngăn chat khi toàn màn hình
  const onPanelKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !isMobile() || !panelRef.current) return;
    const items = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const submit = (text: string) => {
    if (!text.trim() || chat.busy) return;
    speech.stop();
    void chat.send(text);
    setInput("");
  };

  const goToSection = (id: string) => {
    dispatchAction("scroll_to_section", { id });
    if (isMobile()) closePanel();
  };

  const motion = reduced ? "" : "transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-brand)]";

  return (
    <div data-hide-in-presenter data-hide-in-print>
      {/* Nút nổi */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
        aria-label={open ? "Đóng trợ lý hỏi về đề xuất" : "Mở trợ lý hỏi về đề xuất"}
        aria-expanded={open}
        aria-controls="assistant-panel"
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-blue-500 bg-navy-900 text-white shadow-[0_0_0_6px_rgba(47,123,246,0.14),0_14px_36px_-10px_rgba(47,123,246,0.7)] hover:border-blue-400 hover:bg-navy-800 hover:shadow-[0_0_0_8px_rgba(47,123,246,0.18),0_16px_40px_-10px_rgba(47,123,246,0.8)] sm:bottom-6 sm:right-6 ${
          reduced ? "" : "transition-[background-color,box-shadow,border-color] duration-300"
        } ${open ? "max-md:hidden" : ""}`}
      >
        {open ? (
          <X aria-hidden size={22} strokeWidth={1.5} />
        ) : (
          <MessageCircleQuestion aria-hidden size={24} strokeWidth={1.5} />
        )}
      </button>

      {/* Ngăn chat */}
      <div
        id="assistant-panel"
        ref={panelRef}
        role="dialog"
        aria-modal={false}
        aria-labelledby="assistant-title"
        onKeyDown={onPanelKeyDown}
        className={`fixed inset-0 z-50 flex flex-col overflow-hidden bg-white text-navy-900 md:inset-auto md:bottom-24 md:right-6 md:h-[min(640px,calc(100dvh-8rem))] md:w-[400px] md:rounded-[var(--radius-card)] md:border md:border-line-200 md:shadow-[0_30px_80px_-30px_rgba(10,31,68,0.55)] ${motion} ${
          open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"
        }`}
      >
        <header className="theme-navy flex items-start justify-between gap-3 border-b border-navy-700 px-5 py-4">
          <div className="min-w-0">
            <h2 id="assistant-title" className="text-[17px] font-semibold leading-tight">
              Hỏi về đề xuất
            </h2>
            <p className="mt-1 flex items-center gap-2 text-[13px] text-blue-300">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(79,163,247,0.9)]" />
              Trợ lý AI của Celesnity
            </p>
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label="Đóng trợ lý"
            className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-blue-100 hover:bg-navy-800 hover:text-white"
          >
            <X aria-hidden size={20} strokeWidth={1.5} />
          </button>
        </header>

        <ChatMessages
          messages={chat.messages}
          busy={chat.busy}
          reduced={reduced}
          onSuggest={submit}
          onRetry={submit}
          onGoToSection={goToSection}
        />

        <ChatComposer
          inputRef={inputRef}
          value={input}
          onChange={setInput}
          onSubmit={() => submit(input)}
          busy={chat.busy}
          speech={speech}
        />
      </div>
    </div>
  );
}
