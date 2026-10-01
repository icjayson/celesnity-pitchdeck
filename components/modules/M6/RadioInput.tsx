"use client";
/** Khung "bộ đàm": nút micro lớn (Web Speech vi-VN), ô gõ, nút lập hồ sơ, 3 câu mẫu. */
import { useEffect, useRef } from "react";
import { ArrowRight, Mic, Square } from "lucide-react";
import { m6Samples } from "@/content/scenarios/m6";
import { useSpeech } from "@/components/assistant/useSpeech";

const MAX = 300;

export function RadioInput({
  value,
  onChange,
  onSubmit,
  busy,
  reduced,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (text: string) => void;
  busy: boolean;
  reduced: boolean;
}) {
  const speech = useSpeech({
    onText: (t) => onChange(t.slice(0, MAX)),
    onEnd: (t) => {
      if (t.trim()) onSubmit(t.trim().slice(0, MAX));
    },
  });
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !busy;

  return (
    <div className="flex flex-col gap-5">
      <div className="theme-navy relative overflow-hidden rounded-[28px] border border-navy-700 p-4 shadow-[0_30px_60px_-30px_rgba(10,31,68,0.7)] sm:p-5">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative flex items-center justify-between gap-3 px-1 pb-4">
          <span className="flex min-w-0 items-center gap-2 truncate text-[12px] font-medium uppercase tracking-[0.12em] text-blue-300">
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-full ${speech.listening ? "bg-blue-400 shadow-[0_0_10px_rgba(79,163,247,1)]" : "bg-blue-300/60"}`}
            />
            <span className="truncate">Kênh báo lỗi · trạm kiểm tra</span>
          </span>
          <span className="shrink-0 whitespace-nowrap text-[12px] text-blue-300">{speech.listening ? "Đang nghe" : busy ? "Đang gửi" : "Sẵn sàng"}</span>
        </div>

        <form
          className="relative rounded-[18px] border border-navy-700 bg-navy-950 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (canSend) onSubmit(value.trim());
          }}
        >
          <label htmlFor="m6-input" className="text-[13px] text-blue-300">
            {speech.supported ? "Nói vào bộ đàm hoặc gõ lời báo lỗi" : "Gõ lời báo lỗi như công nhân nói"}
          </label>
          <textarea
            id="m6-input"
            ref={taRef}
            rows={3}
            maxLength={MAX}
            value={value}
            disabled={busy}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                if (canSend) onSubmit(value.trim());
              }
            }}
            placeholder="Ví dụ: Trạm test 3, bếp lô 2409 lại nhảy bảo vệ nhiệt…"
            className="mt-2 block min-h-[84px] w-full resize-none bg-transparent text-[17px] leading-relaxed text-white outline-none placeholder:text-blue-300/50 focus-visible:outline-none disabled:opacity-70"
          />
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-navy-700 pt-3">
            <span className="tabular text-[12px] text-blue-300/80">
              {value.length}/{MAX}
            </span>
            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-blue-600 px-4 py-2 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-blue-500 disabled:bg-navy-800 disabled:text-blue-300/60"
            >
              Lập hồ sơ
              <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
            </button>
          </div>
        </form>

        {speech.supported ? (
          <div className="relative flex flex-col items-center gap-3 pb-2 pt-6">
            <button
              type="button"
              onClick={speech.toggle}
              disabled={busy}
              aria-label={speech.listening ? "Dừng nghe" : "Bấm để nói lời báo lỗi"}
              aria-pressed={speech.listening}
              className={`relative flex h-20 w-20 items-center justify-center rounded-full border border-blue-400 text-white transition-[background-color,box-shadow] duration-300 disabled:opacity-60 ${
                speech.listening
                  ? "bg-blue-500 shadow-[0_0_0_10px_rgba(47,123,246,0.18),0_0_48px_rgba(47,123,246,0.7)]"
                  : "bg-blue-600 shadow-[0_0_0_8px_rgba(47,123,246,0.12),0_18px_40px_-12px_rgba(47,123,246,0.8)] hover:bg-blue-500"
              }`}
            >
              {speech.listening && !reduced ? (
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-blue-300/60" />
              ) : null}
              {speech.listening ? (
                <Square aria-hidden size={24} strokeWidth={1.5} />
              ) : (
                <Mic aria-hidden size={30} strokeWidth={1.5} />
              )}
            </button>
            <span className="text-[13px] text-blue-300">{speech.listening ? "Nói xong, bấm để dừng" : "Bấm để nói (tiếng Việt)"}</span>
            {speech.error ? (
              <span role="status" className="text-center text-[13px] text-blue-100">
                {speech.error}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div>
        <p className="text-[13px] font-medium text-ink-500">Câu mẫu, chạm để thử</p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {m6Samples.map((s) => (
            <li key={s}>
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  onChange(s);
                  onSubmit(s);
                }}
                className="w-full rounded-[var(--radius-control)] border border-line-200 bg-white px-4 py-3 text-left text-[15px] leading-snug text-navy-900 transition-colors duration-200 hover:border-blue-500 hover:bg-blue-100 disabled:opacity-60"
              >
                “{s}”
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
