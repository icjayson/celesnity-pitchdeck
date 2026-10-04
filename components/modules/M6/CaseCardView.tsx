"use client";
/** Thẻ hồ sơ có cấu trúc do AI (hoặc quy tắc) trích xuất. */
import { CircleCheck, ClipboardList } from "lucide-react";
import type { CaseCard } from "@/decks/types";

const severityBars: Record<CaseCard["muc_do"], number> = { Thấp: 1, "Trung bình": 2, Cao: 3 };

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">{label}</dt>
      <dd className="mt-1 text-[16px] leading-snug text-navy-900">{children}</dd>
    </div>
  );
}

const Missing = () => <span className="text-ink-500">Chưa rõ</span>;

export function CaseCardView({ card, approved }: { card: CaseCard; approved: boolean }) {
  const bars = severityBars[card.muc_do];
  return (
    <article
      aria-label="Thẻ hồ sơ lỗi"
      className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(10,31,68,0.45)] sm:p-6"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[16px] font-semibold">
          <ClipboardList aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />
          Hồ sơ lỗi
        </h3>
        {approved ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-100 px-3 py-1 text-[13px] font-medium text-orange-700">
            <CircleCheck aria-hidden size={14} strokeWidth={1.5} />
            Đã duyệt
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-200 bg-mist-50 px-3 py-1 text-[13px] font-medium text-ink-500">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Chờ trưởng ca duyệt
          </span>
        )}
      </header>

      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <Field label="Trạm">{card.tram || <Missing />}</Field>
        <Field label="Lô">{card.lo ? <span className="tabular">Lô {card.lo}</span> : <Missing />}</Field>
        <Field label="Triệu chứng" wide>
          {card.trieu_chung || <Missing />}
        </Field>
        <Field label="Model">{card.model || <Missing />}</Field>
        <Field label="Mức độ">
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden className="flex items-end gap-[3px]">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-[5px] rounded-sm ${i <= bars ? "bg-navy-900" : "bg-line-200"}`}
                  style={{ height: 6 + i * 4 }}
                />
              ))}
            </span>
            {card.muc_do}
          </span>
        </Field>
      </dl>

      {card.thong_tin_con_thieu.length ? (
        <div className="mt-5 border-t border-line-200 pt-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">Thông tin còn thiếu</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {card.thong_tin_con_thieu.map((m) => (
              <li
                key={m}
                className="rounded-full border border-dashed border-blue-300 bg-blue-100/50 px-3 py-1 text-[13px] text-navy-900"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
