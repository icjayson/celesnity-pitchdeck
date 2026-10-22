import type { ProgressStatus } from "@/decks/types";
import { RichText } from "./RichText";

/**
 * Thanh tiến độ theo bước (block "progress"): bước đã xong tô đầy, bước đang làm tô một nửa,
 * bước sau nét đứt; mốc "hôm nay" đặt ngay sau bước đã xong cuối cùng.
 * Màn hình rộng: một hàng ngang; màn hình hẹp: một cột dọc với đường tiến độ bên trái.
 */
const CHIP: Record<ProgressStatus, string> = {
  done: "bg-blue-500 text-white",
  active: "bg-orange-100 text-orange-700 ring-1 ring-orange-500/40",
  next: "bg-mist-50 text-navy-900 ring-1 ring-line-200",
  future: "bg-transparent text-ink-500 ring-1 ring-dashed ring-line-200",
};

const DOT: Record<ProgressStatus, string> = {
  done: "border-blue-500 bg-blue-500 text-white",
  active: "border-orange-500 bg-white text-orange-700 ring-4 ring-orange-100",
  next: "border-line-200 bg-white text-ink-500",
  future: "border-dashed border-line-200 bg-white text-ink-500",
};

/** Đoạn nối sau bước i (tới bước i + 1) */
function segment(cur: ProgressStatus) {
  if (cur === "done") return "bg-blue-500";
  if (cur === "active") return "bg-[linear-gradient(90deg,var(--color-orange-500),var(--color-line-200))]";
  return "bg-[repeating-linear-gradient(90deg,var(--color-line-200)_0_6px,transparent_6px_12px)]";
}
function segmentV(cur: ProgressStatus) {
  if (cur === "done") return "bg-blue-500";
  if (cur === "active") return "bg-[linear-gradient(180deg,var(--color-orange-500),var(--color-line-200))]";
  return "bg-[repeating-linear-gradient(180deg,var(--color-line-200)_0_6px,transparent_6px_12px)]";
}

export function Progress({
  items,
  now,
}: {
  items: { label: string; text: string; status: ProgressStatus; when: string }[];
  now?: string;
}) {
  const lastDone = items.reduce((acc, it, i) => (it.status === "done" ? i : acc), -1);
  const doneShare = items.length > 1 ? (lastDone + 0.5) / items.length : 0;
  return (
    <div className="flex flex-col gap-4">

      {/* Màn hình rộng: hàng ngang */}
      <ol className="relative hidden lg:grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {now && lastDone >= 0 ? (
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange-500 px-2.5 py-0.5 text-[12px] font-semibold text-navy-900"
            style={{ left: `${doneShare * 100}%` }}
          >
            <RichText text={now} />
          </span>
        ) : null}
        {items.map((it, i) => (
          <li key={i} className="relative flex flex-col gap-3 pr-4 pt-9">
            <div className="relative flex h-9 items-center">
              {i < items.length - 1 ? <span aria-hidden className={`absolute left-9 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full ${segment(it.status)}`} /> : null}
              <span className={`tabular relative z-[1] grid h-9 w-9 place-items-center rounded-full border-2 text-[14px] font-semibold ${DOT[it.status]}`}>{i + 1}</span>
            </div>
            <p className="text-[15px] font-semibold uppercase tracking-[0.06em] text-navy-900">
              <RichText text={it.label} />
            </p>
            <p className="text-[14px] leading-relaxed text-navy-900/75">
              <RichText text={it.text} />
            </p>
            <span className={`mt-auto inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[12px] font-semibold ${CHIP[it.status]}`}>
              <RichText text={it.when} />
            </span>
          </li>
        ))}
      </ol>

      {/* Màn hình hẹp: cột dọc */}
      <ol className="flex flex-col lg:hidden">
        {items.map((it, i) => (
          <li key={i} className="relative grid grid-cols-[36px_1fr] gap-4 pb-6 last:pb-0">
            {i < items.length - 1 ? <span aria-hidden className={`absolute bottom-0 left-[16px] top-9 w-1 rounded-full ${segmentV(it.status)}`} /> : null}
            <span className={`tabular relative z-[1] grid h-9 w-9 place-items-center rounded-full border-2 text-[14px] font-semibold ${DOT[it.status]}`}>{i + 1}</span>
            <div className="flex flex-col gap-1.5 pt-1">
              <p className="text-[15px] font-semibold uppercase tracking-[0.06em] text-navy-900">
                <RichText text={it.label} />
              </p>
              <p className="text-[14px] leading-relaxed text-navy-900/75">
                <RichText text={it.text} />
              </p>
              <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[12px] font-semibold ${CHIP[it.status]}`}>
                <RichText text={it.when} />
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
