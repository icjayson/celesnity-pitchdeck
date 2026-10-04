"use client";
/**
 * Trợ lý "Hỏi về đề xuất" (docs/implementation-plan.md mục 4).
 * Nút nổi góc phải dưới → ngăn chat (desktop 400px, mobile toàn màn hình).
 * Mở từ nơi khác: window.dispatchEvent(new CustomEvent("landing:open-assistant", { detail: "câu hỏi điền sẵn" })).
 * Desktop: khi trang bìa đang hiện, chính ngăn chat này được "neo" vào khung [data-hero-chat-slot] bên phải trang bìa.
 * Ở trang bìa ban đầu chỉ có ô nhập; gửi câu hỏi thì khung bung ra và chỉ hiện lượt hỏi–đáp mới nhất
 * (ngăn chat nổi góc phải dưới vẫn hiện đủ lịch sử).
 * Cuộn khỏi trang bìa → ngăn chat thu vào nút ✨ góc phải dưới (hoặc thành ngăn chat nổi nếu trợ lý vừa điều hướng /
 * đang trả lời, để không mất câu trả lời). Cuộn lại lên → bung ra từ nút về chỗ cũ.
 */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Sparkles, X } from "lucide-react";
import { dispatchAction } from "@/lib/actions";
import { useDeck } from "@/components/deck/DeckProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useChat } from "./useChat";
import { useSpeech } from "./useSpeech";
import { ChatComposer } from "./ChatComposer";
import { ChatMessages } from "./ChatMessages";

const OPEN_EVENT = "landing:open-assistant";
const MOBILE_MQ = "(max-width: 767px)";

const isMobile = () => typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;

/** Hình học ngăn chat khi canh bằng toạ độ (chế độ neo trang bìa và lúc chuyển cảnh) */
type Geom = { top: number; left: number; width: number; height: number; radius: number; opacity: number; transform?: string };
const DOCK_MIN_WIDTH = 1024;
/** Chiều cao khung chat mở rộng ở trang bìa so với ô dành cho nó */
const DOCK_EXPANDED_RATIO = 0.8;
const MORPH_MS = 520;

function rectGeom(r: DOMRect): Geom {
  return { top: r.top, left: r.left, width: r.width, height: r.height, radius: 20, opacity: 1 };
}
/**
 * Giữ nguyên kích thước khung, chỉ thu nhỏ + dời (transform) về tâm nút ✨ (56×56, cách mép 24px):
 * nội dung không bị dồn dòng khi thu lại.
 */
function towardLauncher(g: Geom): Geom {
  const size = 56;
  const cx = window.innerWidth - 24 - size / 2;
  const cy = window.innerHeight - 24 - size / 2;
  const s = size / Math.max(g.width, g.height);
  const dx = cx - g.left - (g.width * s) / 2;
  const dy = cy - g.top - (g.height * s) / 2;
  return { ...g, opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(${s})` };
}
/** Vị trí ngăn chat nổi (khớp các lớp md:bottom-24 md:right-6 md:w-[400px] md:h-[min(640px,calc(100dvh-8rem))]) */
function floatGeom(): Geom {
  const h = Math.min(640, window.innerHeight - 128);
  return { top: window.innerHeight - 96 - h, left: window.innerWidth - 24 - 400, width: 400, height: h, radius: 20, opacity: 1 };
}

export function Assistant() {
  const { faq, quickFaqIds } = useDeck();
  /** Câu hỏi nhanh dưới ô nhập ở trang bìa */
  const quickPrompts = quickFaqIds.map((id) => faq.find((f) => f.id === id)?.q).filter((q): q is string => !!q);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;
  const [input, setInput] = useState("");
  /** Tooltip "Trợ lý Minder AI" tự hiện 5 giây, ẩn 5 giây, lặp lại (khi ngăn chat đang đóng) */
  const [hintOn, setHintOn] = useState(false);
  useEffect(() => {
    if (open) {
      setHintOn(false);
      return;
    }
    let on = false;
    // lần đầu hiện sau 5 giây để không chen vào lúc trang vừa mở
    const id = window.setInterval(() => {
      on = !on;
      setHintOn(on);
    }, 5000);
    return () => window.clearInterval(id);
  }, [open]);
  const reduced = useReducedMotion();
  /** Ngăn chat đang neo ở trang bìa */
  const [docked, setDocked] = useState(false);
  /** Toạ độ khi neo hoặc đang chuyển cảnh; null = dùng lớp CSS thường (nút nổi / ngăn nổi) */
  const [geom, setGeom] = useState<Geom | null>(null);
  const [morphing, setMorphing] = useState(false);
  /** Ở trang bìa: false = chỉ ô nhập; true = khung chat với lượt hỏi–đáp mới nhất */
  const [dockExpanded, setDockExpanded] = useState(false);
  const dockExpandedRef = useRef(false);
  dockExpandedRef.current = dockExpanded;
  const composerWrapRef = useRef<HTMLDivElement>(null);
  /** Canh lại khung neo theo trạng thái thu gọn/mở rộng (gán trong effect neo) */
  const resyncRef = useRef<() => void>(() => undefined);
  const dockedRef = useRef(false);
  const morphTimer = useRef<number | null>(null);
  const dismissedRef = useRef(false);
  const lastActionAt = useRef(0);
  const busyRef = useRef(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chat = useChat({
    reducedMotion: reduced,
    onAction: ({ name, input: actionInput }) => {
      // Mobile (ngăn chat toàn màn hình) hoặc đang hỏi ở trang bìa: không tự cuộn trang,
      // để câu trả lời hiện ngay tại chỗ; người xem bấm "Xem phần này" để tới section
      if (name === "scroll_to_section" && (isMobile() || dockedRef.current)) return;
      lastActionAt.current = Date.now();
      dispatchAction(name, actionInput);
    },
  });

  busyRef.current = chat.busy;

  const speech = useSpeech({ onText: (t) => setInput(t) });

  // ── Neo vào trang bìa (desktop) ──
  useEffect(() => {
    let raf = 0;
    let first = true;
    const finishMorph = (after: () => void) => {
      if (morphTimer.current) window.clearTimeout(morphTimer.current);
      morphTimer.current = window.setTimeout(() => {
        morphTimer.current = null;
        setMorphing(false);
        after();
      }, reduced ? 0 : MORPH_MS);
    };

    const undock = (toFloat: boolean) => {
      dockedRef.current = false;
      setDocked(false);
      dockExpandedRef.current = false;
      setDockExpanded(false);
      if (reduced) {
        setGeom(null);
        if (toFloat) setOpen(true);
        return;
      }
      setMorphing(true);
      if (toFloat) {
        setOpen(true);
        setGeom(floatGeom());
        finishMorph(() => setGeom(null));
      } else {
        setGeom((g) => (g ? towardLauncher({ ...g, transform: undefined }) : null));
        finishMorph(() => setGeom(null));
      }
    };

    /** Khung neo: mở rộng = cả ô trang bìa; thu gọn = chỉ ô nhập, đặt giữa theo chiều dọc */
    const dockGeom = (r: DOMRect): Geom => {
      const g = rectGeom(r);
      if (dockExpandedRef.current) {
        // khung mở rộng cao 80% ô trang bìa, canh giữa; câu trả lời dài thì cuộn bên trong
        const h = Math.round(r.height * DOCK_EXPANDED_RATIO);
        return { ...g, top: r.top + (r.height - h) / 2, height: h };
      }
      // đo trực tiếp phần ô nhập (offsetHeight không bị transform ảnh hưởng)
      const h = Math.min((composerWrapRef.current?.offsetHeight ?? 110) + 2, r.height);
      return { ...g, top: r.top + (r.height - h) / 2, height: h };
    };

    resyncRef.current = () => {
      if (!dockedRef.current) return;
      const slot = document.querySelector<HTMLElement>("[data-hero-chat-slot]");
      if (!slot) return;
      if (!reduced) setMorphing(true);
      setGeom(dockGeom(slot.getBoundingClientRect()));
      if (!reduced) finishMorph(() => undefined);
    };

    const tick = () => {
      raf = 0;
      const slot = document.querySelector<HTMLElement>("[data-hero-chat-slot]");
      const r = slot?.getBoundingClientRect();
      const canDock = !!slot && !!r && r.width > 0 && window.innerWidth >= DOCK_MIN_WIDTH;
      const inHero = canDock && r!.bottom > window.innerHeight * 0.5 && r!.top < window.innerHeight * 0.6;
      if (!inHero) dismissedRef.current = false;
      if (!inHero) first = false;

      if (inHero && !dismissedRef.current) {
        if (!dockedRef.current) {
          // vào trang bìa: bung ra từ nút ✨ (hoặc từ ngăn nổi nếu đang mở)
          dockedRef.current = true;
          setDocked(true);
          // lần đầu (vừa tải trang) hoặc giảm chuyển động: đặt thẳng vào chỗ, không hiệu ứng
          if (reduced || first) {
            setOpen(false);
            setGeom(dockGeom(r!));
            first = false;
            return;
          }
          const target = dockGeom(r!);
          const from = openRef.current ? floatGeom() : towardLauncher(target);
          setOpen(false);
          setMorphing(false);
          setGeom(from);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              setMorphing(true);
              setGeom(dockGeom(slot!.getBoundingClientRect()));
              // hết hiệu ứng: canh lại theo vị trí khung hiện tại
              finishMorph(() => {
                if (dockedRef.current) setGeom(dockGeom(slot!.getBoundingClientRect()));
              });
            }),
          );
        } else {
          // luôn bám theo khung (kể cả lúc đang bung ra) để không lệch khi trang còn đang cuộn
          setGeom(dockGeom(r!));
        }
      } else if (dockedRef.current) {
        const recentNav = Date.now() - lastActionAt.current < 2500;
        undock(recentNav || busyRef.current);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (morphTimer.current) window.clearTimeout(morphTimer.current);
    };
  }, [reduced]);

  // Thu gọn ↔ mở rộng (hoặc ô nhập đổi chiều cao): canh lại khung neo có hiệu ứng
  // Sau khi React vẽ lại (vừa neo vào trang bìa, hoặc thu gọn ↔ mở rộng), đo lại ở khung hình kế tiếp
  // để chiều cao khung khớp nội dung thật (nhãn + ô nhập + câu hỏi nhanh)
  useEffect(() => {
    if (!docked) return;
    const id = requestAnimationFrame(() => resyncRef.current());
    return () => cancelAnimationFrame(id);
  }, [docked, dockExpanded]);

  // Đo chiều cao phần ô nhập
  useEffect(() => {
    const el = composerWrapRef.current;
    if (!el) return;
    // phần ô nhập đổi chiều cao (hiện/ẩn câu hỏi nhanh, ô chữ giãn dòng): canh lại khung neo
    let last = el.offsetHeight;
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight;
      if (Math.abs(h - last) > 1) {
        last = h;
        resyncRef.current();
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
    if (dockedRef.current && dockExpandedRef.current) {
      // ở trang bìa: ✕ thu khung về chỉ còn ô nhập
      setDockExpanded(false);
      return;
    }
    setOpen(false);
    if (dockedRef.current) {
      // đóng khung ở trang bìa: thu vào nút ✨, không tự bung lại tới khi rời trang bìa
      dismissedRef.current = true;
      dockedRef.current = false;
      setDocked(false);
      setMorphing(!reduced);
      setGeom((g) => (reduced || !g ? null : towardLauncher({ ...g, transform: undefined })));
      if (!reduced)
        window.setTimeout(() => {
          setMorphing(false);
          setGeom(null);
        }, MORPH_MS);
    }
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, [stopSpeech, reduced]);

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
    if (!open && !docked) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
      }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, docked, closePanel]);

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
    if (dockedRef.current) setDockExpanded(true);
  };

  const goToSection = (id: string) => {
    lastActionAt.current = Date.now();
    dispatchAction("scroll_to_section", { id });
    if (isMobile()) closePanel();
  };

  /** Trang bìa, chưa hỏi gì (hoặc đã thu gọn): chỉ hiện ô nhập */
  const compactDock = docked && !dockExpanded;
  /** Trang bìa chỉ hiện lượt hỏi–đáp mới nhất */
  const lastUserIdx = chat.messages.map((m) => m.role).lastIndexOf("user");
  const latestExchange = lastUserIdx >= 0 ? chat.messages.slice(lastUserIdx) : chat.messages;

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
        className={`group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-blue-500 bg-navy-900 text-white shadow-[0_0_0_6px_rgba(47,123,246,0.14),0_14px_36px_-10px_rgba(47,123,246,0.7)] hover:border-blue-400 hover:bg-navy-800 hover:shadow-[0_0_0_8px_rgba(47,123,246,0.18),0_16px_40px_-10px_rgba(47,123,246,0.8)] sm:bottom-6 sm:right-6 ${
          reduced ? "" : "transition-[background-color,box-shadow,border-color] duration-300"
        } ${open ? "max-md:hidden" : ""} ${
          docked ? "pointer-events-none scale-50 opacity-0" : "scale-100 opacity-100"
        } ${reduced ? "" : "transition-[opacity,transform] duration-300"} ${!docked && morphing ? "delay-300" : ""}`}
        tabIndex={docked ? -1 : 0}
      >
        {open ? (
          <X aria-hidden size={22} strokeWidth={1.5} />
        ) : (
          <Sparkles aria-hidden size={24} strokeWidth={1.5} />
        )}
        {/* tooltip nhỏ phía trên nút, hiện khi rê chuột hoặc focus bàn phím */}
        {!open && !docked ? (
          <span
            aria-hidden
            className={`pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-[8px] border border-line-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-navy-900 shadow-[0_8px_24px_-8px_rgba(10,31,68,0.45)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${
              hintOn ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            } ${reduced ? "" : "transition-[opacity,transform] duration-300"}`}
          >
            Trợ lý Minder AI
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent border-t-white" />
          </span>
        ) : null}
      </button>

      {/* Ngăn chat */}
      <div
        id="assistant-panel"
        ref={panelRef}
        role="dialog"
        aria-modal={false}
        aria-labelledby="assistant-title"
        onKeyDown={onPanelKeyDown}
        className={
          geom
            ? `fixed z-40 flex flex-col overflow-hidden border ${
                docked
                  ? // trang bìa: không có khung nền bao ngoài, chỉ các bong bóng kính và ô nhập
                    "border-transparent bg-transparent text-white"
                  : "border-line-200 bg-white text-navy-900 shadow-[0_30px_80px_-30px_rgba(10,31,68,0.55)]"
              } ${
                geom.opacity === 0 && !morphing ? "pointer-events-none invisible" : "visible"
              }`
            : `fixed inset-0 z-50 flex flex-col overflow-hidden bg-white text-navy-900 md:inset-auto md:bottom-24 md:right-6 md:h-[min(640px,calc(100dvh-8rem))] md:w-[400px] md:rounded-[var(--radius-card)] md:border md:border-line-200 md:shadow-[0_30px_80px_-30px_rgba(10,31,68,0.55)] ${motion} ${
                open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"
              }`
        }
        style={
          geom
            ? {
                top: geom.top,
                left: geom.left,
                width: geom.width,
                height: geom.height,
                borderRadius: geom.radius,
                opacity: geom.opacity,
                transform: geom.transform ?? "none",
                transformOrigin: "top left",
                transition: morphing
                  ? `top ${MORPH_MS}ms var(--ease-brand), left ${MORPH_MS}ms var(--ease-brand), width ${MORPH_MS}ms var(--ease-brand), height ${MORPH_MS}ms var(--ease-brand), transform ${MORPH_MS}ms var(--ease-brand), border-radius ${MORPH_MS}ms var(--ease-brand), opacity ${MORPH_MS - 80}ms ease`
                  : "none",
              }
            : undefined
        }
      >
        <header
          className={`flex items-center justify-between gap-3 border-b px-5 py-3.5 ${
            docked ? "border-transparent bg-transparent px-0 pt-0 text-white" : "theme-navy border-navy-700"
          } ${docked ? "hidden" : ""}`}
        >
          <div className="min-w-0">
            <h2 id="assistant-title" className="flex items-center gap-2 text-[17px] font-semibold leading-tight">
              <Sparkles aria-hidden size={18} strokeWidth={1.5} className="text-blue-300" />
              Trợ lý Minder AI
            </h2>
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label={docked ? "Thu gọn khung chat" : "Đóng trợ lý"}
            className={`-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-blue-100 hover:text-white ${
              docked ? "hover:bg-white/10" : "hover:bg-navy-800"
            }`}
          >
            <X aria-hidden size={20} strokeWidth={1.5} />
          </button>
        </header>

        {compactDock ? null : (
        <ChatMessages
          messages={docked ? latestExchange : chat.messages}
          busy={chat.busy}
          reduced={reduced}
          onSuggest={submit}
          onRetry={submit}
          onGoToSection={goToSection}
          glass={docked}
        />
        )}

        <div ref={composerWrapRef} className={docked ? "[&>form]:border-t-0 [&>form]:px-0 [&>form]:pt-0" : ""}>
        {compactDock ? (
          <p className="mb-3 flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-white">
            <Sparkles aria-hidden size={17} strokeWidth={1.5} className="text-blue-300" />
            Trợ lý Minder AI
          </p>
        ) : null}
        <ChatComposer
          inputRef={inputRef}
          value={input}
          onChange={setInput}
          onSubmit={() => submit(input)}
          busy={chat.busy}
          speech={speech}
          glass={docked}
        />
        {compactDock ? (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Câu hỏi nhanh">
            {quickPrompts.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  disabled={chat.busy}
                  onClick={() => submit(q)}
                  className="rounded-full border border-white/20 bg-[rgba(6,20,46,0.45)] px-3.5 py-1.5 text-left text-[13px] leading-snug text-white/90 backdrop-blur-xl transition-colors duration-200 hover:border-blue-300/70 hover:bg-[rgba(18,43,87,0.65)] hover:text-white disabled:opacity-50"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        </div>
      </div>
    </div>
  );
}
