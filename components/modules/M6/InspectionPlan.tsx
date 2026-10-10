"use client";
/** Kế hoạch kiểm tra do Tác nhân AI soạn (mẫu điền theo thẻ hồ sơ) + nút "Trưởng ca duyệt". */
import { Bot, Check, CircleCheck } from "lucide-react";
import type { CaseCard } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";

/** Điền mẫu "{khóa|chữ thay thế}" bằng dữ liệu thẻ hồ sơ */
function fill(tpl: string, card: CaseCard): string {
  const values: Record<string, string> = {
    lo: card.lo,
    tram: card.tram,
    thieu: card.thong_tin_con_thieu.join(", ").toLowerCase(),
  };
  return tpl.replace(/\{(\w+)(?:\|([^}]*))?\}/g, (_, k: string, alt?: string) => values[k] || alt || "");
}
import { Label } from "@/components/shared/Label";

export function InspectionPlan({
  card,
  approved,
  onApprove,
}: {
  card: CaseCard;
  approved: boolean;
  onApprove: () => void;
}) {
  const { labels, scenarios } = useDeck();
  const steps = (scenarios.m6?.kind === "case" ? scenarios.m6.planTemplate : []).map((t) => fill(t, card));
  return (
    <section aria-labelledby="m6-plan-title" className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="m6-plan-title" className="flex items-center gap-2 text-[16px] font-semibold">
          <Bot aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />
          Tác nhân AI soạn kế hoạch kiểm tra
        </h3>
        <Label variant="sim" text={labels.simShort} />
      </div>
      <ol className="mt-4 flex flex-col gap-2.5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-snug">
            <span
              aria-hidden
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-300 text-[12px] font-semibold tabular text-blue-600"
            >
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line-200 pt-5">
        {approved ? (
          <p role="status" className="flex items-center gap-2 text-[15px] font-medium text-orange-700">
            <CircleCheck aria-hidden size={20} strokeWidth={1.5} />
            Đã duyệt. Hồ sơ chuyển trạng thái “Đã duyệt”; con người là người quyết định.
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={onApprove}
              className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-orange-500 px-5 py-2.5 text-[15px] font-semibold text-navy-900 shadow-[0_12px_28px_-14px_rgba(232,98,10,0.8)] transition-colors duration-200 hover:bg-orange-600"
            >
              <Check aria-hidden size={18} strokeWidth={1.5} />
              Trưởng ca duyệt
            </button>
            <span className="text-[13px] text-ink-500">Tác nhân AI chỉ đề xuất; trưởng ca quyết định.</span>
          </>
        )}
      </div>
    </section>
  );
}
