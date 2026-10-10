"use client";
/** Danh sách tin nhắn, trạng thái trống (câu gợi ý), đang soạn, lỗi. */
import { useEffect, useRef } from "react";
import { ArrowRight, BookOpenText, CircleAlert, CornerDownRight, RotateCcw, Sparkles, WifiOff } from "lucide-react";
import { useDeck } from "@/components/deck/DeckProvider";
import { plainText, renderRich } from "@/components/shared/RichText";
import type { ChatMsg } from "./useChat";
import { ThinkingStatus } from "./thinking/ThinkingStatus";

function KindTag({ m, glass }: { m: ChatMsg; glass: boolean }) {
  const muted = glass ? "text-blue-100/70" : "text-ink-500";
  if (m.kind === "offline")
    return (
      <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${muted}`}>
        <WifiOff aria-hidden size={13} strokeWidth={1.5} />
        Ngoại tuyến · câu trả lời soạn sẵn
      </span>
    );
  if (m.kind === "prepared")
    return (
      <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${muted}`}>
        <BookOpenText aria-hidden size={13} strokeWidth={1.5} />
        Câu trả lời soạn sẵn
      </span>
    );
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${glass ? "text-blue-300" : "text-blue-600"}`}>
      <Sparkles aria-hidden size={13} strokeWidth={1.5} />
      Trợ lý Minder AI
    </span>
  );
}

export function ChatMessages({
  messages,
  busy,
  reduced,
  onSuggest,
  onRetry,
  onGoToSection,
  glass = false,
}: {
  messages: ChatMsg[];
  busy: boolean;
  reduced: boolean;
  onSuggest: (q: string) => void;
  onRetry: (q: string) => void;
  onGoToSection: (id: string) => void;
  /** Kiểu kính trong suốt (khung chat neo ở trang bìa) */
  glass?: boolean;
}) {
  const { sections, faq, meta } = useDeck();
  const suggestedFaq = faq.filter((f) => f.suggested);
  const sectionName = (id: string) => {
    const s = sections.find((x) => x.id === id);
    return s ? plainText(s.eyebrow) : null;
  };
  const chip = glass
    ? "border-white/20 bg-[rgba(6,20,46,0.45)] text-white backdrop-blur-xl hover:border-blue-300/70 hover:bg-[rgba(18,43,87,0.65)]"
    : "border-line-200 bg-white text-navy-900 hover:border-blue-500 hover:bg-blue-100";
  const listRef = useRef<HTMLDivElement>(null);
  const last = messages[messages.length - 1];

  useEffect(() => {
    const el = listRef.current;
    // Chưa có tin nhắn: giữ ở đầu để lời chào và câu hỏi gợi ý hiện đầy đủ
    if (!el || messages.length === 0) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages.length, last?.text, last?.status, reduced]);

  const prevUser = (i: number) => {
    for (let j = i - 1; j >= 0; j--) if (messages[j].role === "user") return messages[j].text;
    return "";
  };

  return (
    <div ref={listRef} className={`flex-1 overflow-y-auto overscroll-contain ${glass ? "bg-transparent px-0 py-4" : "bg-mist-50 px-4 py-5 sm:px-5"}`}>
      {messages.length === 0 ? (
        <div>
          <p className={`text-[15px] leading-relaxed ${glass ? "text-white/90" : "text-navy-900"}`}>
            Celesnity sẵn sàng trả lời các câu hỏi về đề xuất <span className="font-semibold">{meta.series ?? "Nhà máy siêu thông minh"}</span>.
            Quý vị có thể chọn một câu hỏi gợi ý:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Câu hỏi gợi ý">
            {suggestedFaq.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onSuggest(f.q)}
                  className={`rounded-full border px-3.5 py-2 text-left text-[14px] leading-snug transition-colors duration-200 disabled:opacity-50 ${chip}`}
                >
                  {f.q}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ol className="flex flex-col gap-4" aria-live="polite" aria-relevant="additions text">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <li key={m.id} className="flex justify-end">
                <p
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-[14px] rounded-br-[4px] px-4 py-2.5 text-[15px] leading-relaxed ${
                    glass ? "bg-white text-navy-900" : "bg-navy-900 text-white"
                  }`}
                >
                  {m.text}
                </p>
              </li>
            ) : (
              <li key={m.id} className="flex flex-col items-start gap-1.5">
                {m.status === "streaming" && !m.text ? (
                  // chưa có chữ nào: thẻ "Đang suy nghĩ…" thay cho bong bóng trả lời
                  <ThinkingStatus glass={glass} />
                ) : (
                <>
                <KindTag m={m} glass={glass} />
                <div
                  className={`max-w-[92%] rounded-[14px] rounded-tl-[4px] border px-4 py-3 text-[15px] leading-relaxed ${
                    glass
                      ? "bg-[rgba(6,20,46,0.55)] text-white backdrop-blur-xl"
                      : "bg-white text-navy-900 shadow-[0_8px_24px_-18px_rgba(10,31,68,0.45)]"
                  } ${m.status === "error" ? "border-orange-500/40" : glass ? "border-white/[0.12]" : "border-line-200"}`}
                >
                  {m.status === "error" && !m.text ? (
                    <div className="flex flex-col items-start gap-2">
                      <p className="flex items-start gap-2 text-orange-700">
                        <CircleAlert aria-hidden size={18} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                        {m.error}
                      </p>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => onRetry(prevUser(i))}
                        className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-line-200 px-3 py-1.5 text-[13px] font-medium hover:border-blue-500 hover:bg-blue-100 disabled:opacity-50"
                      >
                        <RotateCcw aria-hidden size={14} strokeWidth={1.5} />
                        Thử lại
                      </button>
                    </div>
                  ) : m.text ? (
                    <div className="flex flex-col gap-2.5">
                      {m.text
                        .split(/\n{2,}/)
                        .filter((p) => p.trim())
                        .map((p, k) => (
                          <p key={k} className="whitespace-pre-wrap break-words">
                            {renderRich(p.trim(), "font-semibold")}
                          </p>
                        ))}
                    </div>
                  ) : null}
                  {m.error && m.text ? <p className={`mt-2 text-[13px] ${glass ? "text-blue-100/70" : "text-ink-500"}`}>{m.error}</p> : null}
                </div>
                </>
                )}
                {m.section && m.status === "done" && sectionName(m.section) ? (
                  <button
                    type="button"
                    onClick={() => onGoToSection(m.section!)}
                    className={`group mt-0.5 inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                      glass
                        ? "border-blue-300/40 bg-[rgba(31,95,214,0.35)] text-white backdrop-blur-xl hover:bg-[rgba(31,95,214,0.5)]"
                        : "border-blue-300 bg-blue-100 text-navy-900 hover:border-blue-500 hover:bg-white"
                    }`}
                  >
                    <span className="shrink-0 whitespace-nowrap">Xem phần này</span>
                    <span className={`min-w-0 truncate font-normal ${glass ? "text-blue-100/70" : "text-ink-500"}`}>· {sectionName(m.section)}</span>
                    <ArrowRight
                      aria-hidden
                      size={14}
                      strokeWidth={1.5}
                      className={`shrink-0 ${reduced ? "" : "transition-transform duration-200 group-hover:translate-x-0.5"}`}
                    />
                  </button>
                ) : null}
                {/* câu hỏi gợi ý tiếp theo: chỉ dưới câu trả lời mới nhất */}
                {i === messages.length - 1 && m.status === "done" && m.followups?.length ? (
                  <ul className="mt-1.5 flex max-w-full flex-col items-start gap-1.5" aria-label="Câu hỏi gợi ý tiếp theo">
                    {m.followups.map((q) => (
                      <li key={q}>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => onSuggest(q)}
                          className={`inline-flex max-w-full items-start gap-1.5 rounded-[14px] border px-3.5 py-1.5 text-left text-[13.5px] leading-snug transition-colors duration-200 disabled:opacity-50 ${chip}`}
                        >
                          <CornerDownRight aria-hidden size={14} strokeWidth={1.5} className={`mt-0.5 shrink-0 ${glass ? "text-blue-300" : "text-blue-500"}`} />
                          {q}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ),
          )}
        </ol>
      )}
    </div>
  );
}
