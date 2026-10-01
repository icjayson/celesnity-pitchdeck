"use client";
/** Danh sách tin nhắn, trạng thái trống (câu gợi ý), đang soạn, lỗi. */
import { useEffect, useRef } from "react";
import { ArrowRight, CircleAlert, RotateCcw, Sparkles, WifiOff, BookOpenText } from "lucide-react";
import { sections } from "@/content/content.vi";
import { suggestedFaq } from "@/content/faq";
import { plainText, renderRich } from "@/components/shared/RichText";
import type { ChatMsg } from "./useChat";

const sectionName = (id: string) => {
  const s = sections.find((x) => x.id === id);
  return s ? plainText(s.eyebrow) : null;
};

function KindTag({ m }: { m: ChatMsg }) {
  if (m.kind === "offline")
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-500">
        <WifiOff aria-hidden size={13} strokeWidth={1.5} />
        Ngoại tuyến · câu trả lời soạn sẵn
      </span>
    );
  if (m.kind === "prepared")
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-500">
        <BookOpenText aria-hidden size={13} strokeWidth={1.5} />
        Câu trả lời soạn sẵn
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-600">
      <Sparkles aria-hidden size={13} strokeWidth={1.5} />
      Trợ lý AI
    </span>
  );
}

function Typing({ reduced }: { reduced: boolean }) {
  if (reduced) return <span className="text-[14px] text-ink-500">Đang soạn câu trả lời…</span>;
  return (
    <span className="flex items-center gap-1.5 py-1.5" aria-label="Đang soạn câu trả lời">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
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
}: {
  messages: ChatMsg[];
  busy: boolean;
  reduced: boolean;
  onSuggest: (q: string) => void;
  onRetry: (q: string) => void;
  onGoToSection: (id: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const last = messages[messages.length - 1];

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages.length, last?.text, last?.status, reduced]);

  const prevUser = (i: number) => {
    for (let j = i - 1; j >= 0; j--) if (messages[j].role === "user") return messages[j].text;
    return "";
  };

  return (
    <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain bg-mist-50 px-4 py-5 sm:px-5">
      {messages.length === 0 ? (
        <div>
          <p className="text-[15px] leading-relaxed text-navy-900">
            Celesnity sẵn sàng trả lời các câu hỏi về đề xuất <span className="font-semibold">Nhà máy siêu thông minh</span>.
            Quý vị có thể chọn một câu hỏi gợi ý:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Câu hỏi gợi ý">
            {suggestedFaq.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onSuggest(f.q)}
                  className="rounded-full border border-line-200 bg-white px-3.5 py-2 text-left text-[14px] leading-snug text-navy-900 transition-colors duration-200 hover:border-blue-500 hover:bg-blue-100 disabled:opacity-50"
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
                <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-[14px] rounded-br-[4px] bg-navy-900 px-4 py-2.5 text-[15px] leading-relaxed text-white">
                  {m.text}
                </p>
              </li>
            ) : (
              <li key={m.id} className="flex flex-col items-start gap-1.5">
                <KindTag m={m} />
                <div
                  className={`max-w-[92%] rounded-[14px] rounded-tl-[4px] border bg-white px-4 py-3 text-[15px] leading-relaxed text-navy-900 shadow-[0_8px_24px_-18px_rgba(10,31,68,0.45)] ${
                    m.status === "error" ? "border-orange-500/40" : "border-line-200"
                  }`}
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
                  ) : (
                    <Typing reduced={reduced} />
                  )}
                  {m.error && m.text ? <p className="mt-2 text-[13px] text-ink-500">{m.error}</p> : null}
                </div>
                {m.section && m.status === "done" && sectionName(m.section) ? (
                  <button
                    type="button"
                    onClick={() => onGoToSection(m.section!)}
                    className="group mt-0.5 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-300 bg-blue-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 transition-colors duration-200 hover:border-blue-500 hover:bg-white"
                  >
                    <span className="shrink-0 whitespace-nowrap">Xem phần này</span>
                    <span className="min-w-0 truncate font-normal text-ink-500">· {sectionName(m.section)}</span>
                    <ArrowRight
                      aria-hidden
                      size={14}
                      strokeWidth={1.5}
                      className={`shrink-0 ${reduced ? "" : "transition-transform duration-200 group-hover:translate-x-0.5"}`}
                    />
                  </button>
                ) : null}
              </li>
            ),
          )}
        </ol>
      )}
    </div>
  );
}
