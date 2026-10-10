"use client";
/**
 * Thẻ output của Minder AI (M20): bản tin, cảnh báo, tính lại, văn bản mới, báo cáo.
 * Mỗi thẻ: nguồn, quy tắc do quản lý đặt, cách tính (nếu có), nút Xác nhận · Không đúng · Không cần, Hỏi thêm.
 */
import { useId, useState } from "react";
import {
  Calculator,
  Check,
  ChevronDown,
  CircleAlert,
  FileText,
  ListChecks,
  Lock,
  Scale,
  Sparkles,
  Sunrise,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { FeedItem, FeedKind, FeedScenario } from "@/decks/types";
import { RichText } from "@/components/shared/RichText";

export type Feedback = "confirm" | "wrong" | "skip";

const KIND_ICON: Record<FeedKind, LucideIcon> = {
  briefing: Sunrise,
  alert: CircleAlert,
  recalc: Calculator,
  regulation: Scale,
  report: FileText,
};

export function OutputCard({
  item,
  data,
  role,
  mode = "full",
  feedback,
  onFeedback,
  onOpenRule,
}: {
  item: FeedItem;
  data: FeedScenario;
  /** Vai trò đang xem: áp dụng phần bị ẩn theo vai trò */
  role?: string;
  /** compact: thẻ thu gọn ở trang bìa, không có thao tác */
  mode?: "full" | "compact";
  feedback?: Feedback;
  onFeedback?: (f: Feedback | undefined) => void;
  onOpenRule?: (ruleId: string) => void;
}) {
  const { copy } = data;
  const uid = useId();
  const [openSources, setOpenSources] = useState(false);
  const [openCalc, setOpenCalc] = useState(false);
  const [openAsk, setOpenAsk] = useState(false);
  const rule = data.rules.find((r) => r.id === item.ruleId);
  const limit = item.restricted?.find((r) => r.role === role && !r.hideCard);
  const hidden = new Set(limit?.hideKeys ?? []);
  const fields = item.fields.filter((f) => !hidden.has(f.k));
  const calc = hidden.has("calc") ? undefined : item.calc;
  const Icon = KIND_ICON[item.kind];
  const full = mode === "full";
  const ruleLabel = rule ? copy.ruleChip.replace("{id}", rule.id).replace("{owner}", rule.owner) : item.ruleId;

  return (
    <article className="mf-card flex flex-col gap-3 p-4 sm:p-5" aria-labelledby={`${uid}-t`}>
      {/* Đầu thẻ */}
      <header className="flex items-start gap-3">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${item.kind === "alert" ? "mf-pill-warning" : "mf-muted-bg"}`}>
          <Icon aria-hidden size={16} strokeWidth={1.5} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h5 id={`${uid}-t`} className="text-[15px] font-semibold leading-snug tracking-[-0.01em]">
            {item.title}
          </h5>
          <p className="mf-muted text-[12.5px] leading-snug">
            <span className="tabular">{item.time}</span> · {data.kindLabels[item.kind]}
            {item.area ? ` · ${data.areaLabels[item.area]}` : ""} · {item.to}
          </p>
        </div>
        <span className="mf-pill-success inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium">
          <Check aria-hidden size={12} strokeWidth={2} />
          {copy.sent}
        </span>
      </header>

      {/* Tóm tắt, kèm số trích dẫn theo kiểu giao diện Minder AI */}
      <p className="text-[14.5px] leading-relaxed">
        <RichText text={item.summary} />
        {item.sources.map((s, i) => (
          <sup key={s} title={s} className="mf-muted-bg ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 align-[2px] text-[10px] font-semibold not-italic">
            {i + 1}
          </sup>
        ))}
      </p>

      {full && fields.length ? (
        <dl className="mf-line grid grid-cols-1 gap-x-4 gap-y-2 border-t pt-3 sm:grid-cols-[minmax(110px,0.32fr)_1fr]">
          {fields.map((f) => (
            <div key={f.k} className="contents">
              <dt className="mf-muted text-[12.5px] font-medium leading-snug sm:pt-px">{f.k}</dt>
              <dd className="text-[13.5px] leading-snug">
                <RichText text={f.v} />
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {full && limit ? (
        <p className="mf-muted-bg mf-muted flex items-center gap-2 rounded-[10px] px-3 py-2 text-[13px]">
          <Lock aria-hidden size={14} strokeWidth={1.5} className="shrink-0" />
          {limit.text}
        </p>
      ) : null}

      {item.gap && full ? (
        <p className="mf-pill-warning flex items-start gap-2 rounded-[10px] px-3 py-2 text-[13px] leading-snug">
          <TriangleAlert aria-hidden size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" />
          <span>
            <RichText text={item.gap} />
          </span>
        </p>
      ) : null}

      {full && calc && openCalc ? (
        <table id={`${uid}-calc`} className="w-full text-[13px]">
          <caption className="sr-only">{copy.calc}</caption>
          <tbody>
            {calc.map((c) => (
              <tr key={c.k} className={`mf-line border-t ${c.total ? "font-semibold" : ""}`}>
                <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                  {c.k}
                </th>
                <td className="py-1.5 text-right tabular">{c.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {full && item.note ? (
        <p className="mf-muted text-[12.5px] italic leading-snug">
          <RichText text={item.note} />
        </p>
      ) : null}

      {/* Nguồn, quy tắc, cách tính */}
      <div className="flex flex-wrap items-center gap-2">
        {full ? (
          <button
            type="button"
            aria-expanded={openSources}
            aria-controls={`${uid}-src`}
            onClick={() => setOpenSources((o) => !o)}
            className="mf-btn mf-btn-outline mf-btn-sm"
          >
            {copy.sources.replace("{n}", String(item.sources.length))}
            <ChevronDown aria-hidden size={14} strokeWidth={1.5} className={`transition-transform ${openSources ? "rotate-180" : ""}`} />
          </button>
        ) : (
          <span className="mf-muted text-[12.5px]">{copy.sources.replace("{n}", String(item.sources.length))}</span>
        )}
        {full && onOpenRule && rule ? (
          <button
            type="button"
            onClick={() => onOpenRule(rule.id)}
            className="mf-rule inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 text-[12.5px] font-medium"
          >
            <ListChecks aria-hidden size={14} strokeWidth={1.5} />
            {ruleLabel}
          </button>
        ) : (
          <span className="mf-rule inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 text-[12.5px] font-medium">
            <ListChecks aria-hidden size={14} strokeWidth={1.5} />
            {ruleLabel}
          </span>
        )}
        {full && calc ? (
          <button
            type="button"
            aria-expanded={openCalc}
            aria-controls={`${uid}-calc`}
            onClick={() => setOpenCalc((o) => !o)}
            className="mf-btn mf-btn-ghost mf-btn-sm"
          >
            <Calculator aria-hidden size={14} strokeWidth={1.5} />
            {copy.calc}
          </button>
        ) : null}
      </div>

      {full && openSources ? (
        <ol id={`${uid}-src`} className="mf-muted-bg flex flex-col gap-1 rounded-[10px] px-3 py-2 text-[12.5px]">
          {item.sources.map((s, i) => (
            <li key={s} className="flex gap-2">
              <span className="mf-muted tabular">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ol>
      ) : null}

      {/* Phản hồi của người nhận: dữ liệu đo KPI */}
      {full && onFeedback ? (
        <div className="mf-line flex flex-wrap items-center gap-2 border-t pt-3">
          {feedback ? (
            <>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium ${
                  feedback === "confirm" ? "mf-pill-success" : feedback === "wrong" ? "mf-pill-warning" : "mf-muted-bg mf-muted"
                }`}
                role="status"
              >
                <Check aria-hidden size={13} strokeWidth={2} />
                {feedback === "confirm" ? copy.confirmed : feedback === "wrong" ? copy.wrong : copy.notNeeded}
              </span>
              <button type="button" onClick={() => onFeedback(undefined)} className="mf-btn mf-btn-ghost mf-btn-sm">
                {copy.undo}
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => onFeedback("confirm")} className="mf-btn mf-btn-primary">
                <Check aria-hidden size={14} strokeWidth={2} />
                {copy.confirm}
              </button>
              <button type="button" onClick={() => onFeedback("wrong")} className="mf-btn mf-btn-outline">
                {copy.wrong}
              </button>
              <button type="button" onClick={() => onFeedback("skip")} className="mf-btn mf-btn-outline">
                {copy.notNeeded}
              </button>
            </>
          )}
          {item.followUp ? (
            <button
              type="button"
              aria-expanded={openAsk}
              aria-controls={`${uid}-ask`}
              onClick={() => setOpenAsk((o) => !o)}
              className="mf-btn mf-btn-ghost ml-auto"
            >
              <Sparkles aria-hidden size={14} strokeWidth={1.5} />
              {copy.askMore}
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Hỏi thêm: một lượt hỏi–đáp soạn sẵn, theo kiểu câu trả lời của Minder AI */}
      {full && item.followUp && openAsk ? (
        <div id={`${uid}-ask`} className="flex flex-col gap-2.5">
          <p className="mf-bubble ml-auto max-w-[85%] rounded-[18px] px-3.5 py-2 text-[13.5px]">{item.followUp.q}</p>
          <div className="whitespace-pre-line text-[13.5px] leading-relaxed">
            <RichText text={item.followUp.a} />
          </div>
          {item.followUp.sources?.length ? (
            <p className="mf-muted text-[12px]">
              {copy.sources.replace("{n}", String(item.followUp.sources.length))}: {item.followUp.sources.join(" · ")}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

/** Thẻ bị ẩn theo vai trò: chỉ hiện tiêu đề và lý do */
export function LockedCard({ item, text }: { item: FeedItem; text: string }) {
  return (
    <div className="mf-line flex items-center gap-3 rounded-[12px] border border-dashed px-4 py-3">
      <span className="mf-muted-bg flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]">
        <Lock aria-hidden size={15} strokeWidth={1.5} />
      </span>
      <p className="text-[13.5px] leading-snug">
        <span className="font-medium">{item.title}</span>
        <span className="mf-muted"> · {text}</span>
      </p>
    </div>
  );
}
