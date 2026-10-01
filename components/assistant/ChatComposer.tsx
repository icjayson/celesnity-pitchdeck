"use client";
/** Khung nhập: ô chữ tự giãn, micro (Web Speech vi-VN, ẩn nếu không hỗ trợ), nút gửi, thông báo chatNotice. */
import { useEffect, type RefObject } from "react";
import { ArrowUp, Mic, Square } from "lucide-react";
import { labels } from "@/content/content.vi";
import type { useSpeech } from "./useSpeech";

const MAX = 1000;

export function ChatComposer({
  inputRef,
  value,
  onChange,
  onSubmit,
  busy,
  speech,
}: {
  inputRef: RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  busy: boolean;
  speech: ReturnType<typeof useSpeech>;
}) {
  // Ô nhập tự giãn tới ~4 dòng
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }, [value, inputRef]);

  const canSend = value.trim().length > 0 && !busy;

  return (
    <form
      className="border-t border-line-200 bg-white px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:px-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSend) onSubmit();
      }}
    >
      <div className="flex items-end gap-2 rounded-[14px] border border-line-200 bg-white p-1.5 pl-3.5 transition-colors duration-200 focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_rgba(47,123,246,0.12)]">
        <label htmlFor="assistant-input" className="sr-only">
          Câu hỏi về đề xuất
        </label>
        <textarea
          id="assistant-input"
          ref={inputRef}
          rows={1}
          maxLength={MAX}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              if (canSend) onSubmit();
            }
          }}
          placeholder={speech.listening ? "Đang nghe…" : "Nhập câu hỏi của Quý vị"}
          className="max-h-[132px] min-h-[38px] flex-1 resize-none bg-transparent py-2 text-[15px] leading-snug text-navy-900 outline-none placeholder:text-ink-500 focus-visible:outline-none"
        />
        {speech.supported ? (
          <button
            type="button"
            onClick={speech.toggle}
            aria-label={speech.listening ? "Dừng nghe" : "Hỏi bằng giọng nói"}
            aria-pressed={speech.listening}
            className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[var(--radius-control)] transition-colors duration-200 ${
              speech.listening
                ? "bg-blue-100 text-blue-600 shadow-[0_0_0_3px_rgba(47,123,246,0.18)]"
                : "text-ink-500 hover:bg-mist-50 hover:text-navy-900"
            }`}
          >
            {speech.listening ? (
              <Square aria-hidden size={16} strokeWidth={1.5} />
            ) : (
              <Mic aria-hidden size={20} strokeWidth={1.5} />
            )}
          </button>
        ) : null}
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Gửi câu hỏi"
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-500 disabled:bg-line-200 disabled:text-ink-500"
        >
          <ArrowUp aria-hidden size={20} strokeWidth={1.5} />
        </button>
      </div>
      {speech.error ? (
        <p className="mt-2 text-[12px] text-orange-700" role="status">
          {speech.error}
        </p>
      ) : null}
      {value.length > MAX - 150 ? (
        <p className="mt-1.5 text-right text-[12px] tabular text-ink-500">
          {value.length}/{MAX}
        </p>
      ) : null}
      <p className="mt-2.5 text-[12px] leading-snug text-ink-500">{labels.chatNotice}</p>
    </form>
  );
}
