import { Check, X, Sparkles, UserRound, ArrowRight } from "lucide-react";
import { RichText } from "./RichText";

const has = (s?: string) => !!s && s.trim() !== "";

/** Nhãn → giá trị, dạng danh sách định nghĩa (thay bảng 2 cột không tiêu đề) */
export function KeyValue({ rows }: { rows: string[][] }) {
  return (
    <dl className="grid max-w-[920px] grid-cols-1 gap-x-10 sm:grid-cols-[200px_1fr]">
      {rows.map((r, i) => (
        <div key={i} className="contents">
          <dt className="pt-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-orange-700 sm:border-t sm:border-current/10 sm:pb-5">
            <RichText text={r[0]} strongClass="font-semibold" />
          </dt>
          <dd className="border-b border-current/10 pb-5 pt-1 text-[17px] sm:border-b-0 sm:border-t sm:pt-5">
            <RichText text={r[1]} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Lưới thẻ. Ô đầu mỗi hàng là tiêu đề; các ô sau là nội dung, có nhãn từ head khi có từ 3 cột. */
export function Cards({
  head,
  rows,
  cols = 3,
  tone = "blue",
  partner,
}: {
  head?: string[];
  rows: string[][];
  cols?: 2 | 3 | 4;
  tone?: "blue" | "orange" | "navy";
  /** Tên ngắn của khách hàng: thẻ có tiêu đề nhắc tên này (và không nhắc Celesnity) có viền orange */
  partner?: string;
}) {
  const grid = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[cols];
  const bar = { blue: "bg-blue-500", orange: "bg-orange-500", navy: "bg-navy-700" }[tone];
  const labelled = (head?.length ?? 0) > 2;
  /** Thẻ 4 cột chỉ có một dòng ngắn: giữ 2 cột trên mobile */
  const compact = cols === 4 && rows.every((r) => r.length === 1);
  return (
    <div className={compact ? "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" : `grid grid-cols-1 gap-4 ${grid}`}>
      {rows.map((r, i) => {
        const filled = r.slice(1).filter(has).length;
        const showLabels = labelled && filled > 1;
        const isPartner = tone === "blue" && !!partner && r[0].toLowerCase().includes(partner.toLowerCase()) && !/Celesnity/.test(r[0]);
        return (
        <article
          key={i}
          className={`vis-card relative flex flex-col gap-3 overflow-hidden rounded-[var(--radius-card)] ${compact ? "p-4 sm:p-6" : "p-6"}`}
        >
          <span aria-hidden className={`absolute inset-x-0 top-0 h-[3px] ${isPartner ? "bg-orange-500" : bar}`} />
          <h4 className={r.length === 1 ? `pt-2 font-normal leading-snug ${compact ? "text-[15px] sm:text-[18px]" : "text-[18px]"}` : "text-[17px] font-semibold leading-snug"}>
            <RichText text={r[0]} />
          </h4>
          {r.slice(1).map((c, j) =>
            has(c) ? (
              <div key={j} className="flex flex-col gap-1">
                {showLabels && has(head?.[j + 1]) ? (
                  <span className="muted text-[12px] font-semibold uppercase tracking-[0.08em]">
                    <RichText text={head![j + 1]} />
                  </span>
                ) : null}
                <p className="text-[15px] leading-relaxed opacity-90">
                  <RichText text={c} />
                </p>
              </div>
            ) : null,
          )}
        </article>
        );
      })}
    </div>
  );
}

/** Các bước nối tiếp, có số thứ tự và đường nối */
export function Steps({ head, rows, layout = "horizontal" }: { head?: string[]; rows: string[][]; layout?: "horizontal" | "vertical" }) {
  const horizontal = layout === "horizontal";
  return (
    <ol className={horizontal ? `grid grid-cols-1 gap-4 sm:grid-cols-2 ${rows.length >= 4 ? "lg:grid-cols-3 xl:grid-cols-" + Math.min(rows.length, 6) : "lg:grid-cols-" + rows.length}` : "flex flex-col gap-0"}>
      {rows.map((r, i) => (
        <li key={i} className={horizontal ? "vis-card relative flex flex-col gap-3 rounded-[var(--radius-card)] p-5" : "relative grid grid-cols-[44px_1fr] gap-4 pb-8 last:pb-0"}>
          {horizontal ? (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[14px] font-semibold text-white tabular">
                  {i + 1}
                </span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-blue-500">
                  <RichText text={head?.[0] && /^\**\d/.test(r[0]) ? `${head[0]} ${r[0]}` : r[0]} />
                </span>
              </div>
              {has(r[1]) ? (
                <p className="text-[15px] leading-relaxed">
                  <RichText text={r[1]} />
                </p>
              ) : null}
              {r.slice(2).map((c, j) =>
                has(c) ? (
                  <p key={j} className="mt-auto flex items-start gap-2 border-t border-current/10 pt-3 text-[14px] font-medium">
                    {head?.[j + 2] ? (
                      <span className="muted shrink-0 text-[12px] font-semibold uppercase tracking-[0.06em] leading-[1.7]">
                        <RichText text={head[j + 2]} />
                      </span>
                    ) : (
                      <ArrowRight aria-hidden size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-orange-500" />
                    )}
                    <span>
                      <RichText text={c} />
                    </span>
                  </p>
                ) : null,
              )}
            </>
          ) : (
            <>
              <div className="relative flex flex-col items-center">
                <span className="z-10 flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 text-[15px] font-semibold text-blue-500 tabular">
                  {i + 1}
                </span>
                {i < rows.length - 1 ? <span aria-hidden className="absolute bottom-[-32px] top-11 w-px bg-current/15" /> : null}
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-[17px] font-semibold">
                  <RichText text={r[0].replace(/^(\*\*)?\d+\.\s*/, "$1")} />
                </p>
                {r.slice(1).map((c, j) =>
                  has(c) ? (
                    <p key={j} className="text-[15px] leading-relaxed opacity-90">
                      {head?.[j + 1] ? (
                        <span className="muted mr-2 text-[12px] font-semibold uppercase tracking-[0.06em]">
                          <RichText text={head[j + 1]} />
                        </span>
                      ) : null}
                      <RichText text={c} />
                    </p>
                  ) : null,
                )}
              </div>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Dòng thời gian một ca: giờ · điều xảy ra · AI làm gì (blue) · con người làm gì (orange) */
export function Timeline({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <ol className="relative flex flex-col">
      {rows.map((r, i) => (
        <li key={i} className="relative grid grid-cols-[72px_1fr] gap-4 pb-6 last:pb-0 sm:grid-cols-[96px_1fr] sm:gap-6">
          <div className="relative flex flex-col items-end pt-1">
            <span className="text-[17px] font-semibold tabular sm:text-[20px]">
              <RichText text={r[0]} />
            </span>
            <span aria-hidden className="absolute -right-[9px] top-3 z-10 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/15 sm:-right-[13px]" />
          </div>
          <div className="vis-card flex flex-col gap-3 rounded-[var(--radius-card)] border-l-0 p-5 sm:flex-row sm:items-start sm:gap-5">
            {has(r[1]) ? (
              <p className="text-[15px] font-medium sm:w-[28%] sm:shrink-0">
                <RichText text={r[1]} />
              </p>
            ) : null}
            <p className="flex flex-1 items-start gap-2 text-[15px] leading-relaxed">
              <Sparkles aria-hidden size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-blue-500" />
              <span>
                <span className="sr-only">{head[2]}: </span>
                <RichText text={r[2]} />
              </span>
            </p>
            {has(r[3]) ? (
              <p className="flex items-start gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 text-[14px] font-medium text-orange-700 sm:shrink-0">
                <UserRound aria-hidden size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                <span>
                  <span className="sr-only">{head[3]}: </span>
                  <RichText text={r[3]} />
                </span>
              </p>
            ) : null}
          </div>
          {i < rows.length - 1 ? (
            <span aria-hidden className="absolute bottom-0 left-[76px] top-4 w-px bg-current/15 sm:left-[106px]" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** So sánh hai cột; cột phải là phương án được đề xuất */
export function Compare({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {[1, 2].map((col) => {
        const right = col === 2;
        return (
          <section
            key={col}
            className={`flex flex-col rounded-[var(--radius-card)] p-6 sm:p-8 ${
              right ? "compare-right" : "compare-left"
            }`}
          >
            <h4 className={`mb-5 text-[21px] font-semibold leading-snug ${right ? "" : "opacity-80"}`}>
              <RichText text={head[col]} />
            </h4>
            <dl className="flex flex-col">
              {rows.map((r, i) => (
                <div key={i} className="flex flex-col gap-1 border-t border-current/15 py-4 first:border-t-0 first:pt-0">
                  <dt className={`text-[14px] font-semibold uppercase tracking-[0.08em] ${right ? "text-white/75" : "muted"}`}>
                    <RichText text={r[0]} strongClass="font-semibold" />
                  </dt>
                  <dd className="flex items-start gap-2.5 text-[17px] leading-relaxed">
                    {right ? (
                      <Check aria-hidden size={18} strokeWidth={2} className="mt-1 shrink-0 text-white" />
                    ) : null}
                    <span className={right ? "" : "opacity-75"}>
                      <RichText text={r[col]} />
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}

/** Nhãn dạng viên; tone "negative" cho danh sách "không phải là" */
export function Chips({ items, tone = "neutral" }: { items: string[]; tone?: "negative" | "neutral" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <li key={i} className="vis-card flex items-start gap-2 rounded-full px-4 py-2 text-[15px]">
          {tone === "negative" ? (
            <X aria-hidden size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-ink-500" />
          ) : (
            <Check aria-hidden size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-blue-500" />
          )}
          <span>
            <RichText text={it} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Các ý nhấn mạnh: khối nền navy, đánh số, dấu tick orange */
export function Pillars({ items }: { items: string[] }) {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((it, i) => (
        <li
          key={i}
          className="relative flex min-h-[150px] flex-col justify-between gap-4 overflow-hidden rounded-[var(--radius-card)] bg-navy-900 p-4 text-white sm:min-h-[188px] sm:gap-6 sm:p-6 shadow-[0_24px_50px_-28px_rgba(10,31,68,0.7)]"
        >
          <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/25 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <span className="tabular text-[13px] font-semibold tracking-[0.08em] text-blue-300">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-navy-900 sm:h-9 sm:w-9">
              <Check aria-hidden size={18} strokeWidth={2} />
            </span>
          </div>
          <p className="relative text-[15px] font-semibold leading-snug tracking-[-0.01em] sm:text-[19px]">
            <RichText text={it} />
          </p>
        </li>
      ))}
    </ol>
  );
}
