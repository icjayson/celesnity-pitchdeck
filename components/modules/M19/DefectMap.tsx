"use client";
/** M19 tab 1 "Từ một lỗi": nút lỗi ở giữa, 12 nút bối cảnh xung quanh. */
import { useMemo, useState, type CSSProperties } from "react";
import { CircleAlert, ShieldCheck } from "lucide-react";
import type { GenealogyData } from "@/decks/types";
import { GROUP, GROUP_ORDER, SLOTS, sortByGroup, type DefectNode, type Slot } from "./shared";

export function DefectMap({ data }: { data: GenealogyData["defect"] }) {
  const nodes = useMemo(() => sortByGroup(data.nodes), [data.nodes]);
  const radial = nodes.length === SLOTS.length;
  const [pinned, setPinned] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const activeId = hover ?? pinned;
  const active = nodes.find((n) => n.id === activeId) ?? null;

  const bind = (n: DefectNode): Bind => ({
    onClick: () => setPinned(n.id),
    onMouseEnter: () => setHover(n.id),
    onMouseLeave: () => setHover(null),
    onFocus: () => setPinned(n.id),
  });

  const center = (
    <div className="rounded-[14px] bg-navy-900 p-4 text-white shadow-[0_18px_40px_-20px_rgba(10,31,68,0.8)] sm:p-5">
      <p className="flex items-start gap-2 text-[16px] font-semibold leading-snug">
        <CircleAlert aria-hidden size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-orange-500" />
        <span>{data.title}</span>
      </p>
      <p className="tabular mt-1.5 text-[13px] leading-snug text-blue-300">{data.sub}</p>
    </div>
  );

  const groups = GROUP_ORDER.filter((g) => nodes.some((n) => n.group === g));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6">
        <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-4 sm:p-6">
          {/* Bố cục toả tròn (từ 640px) */}
          {radial ? (
            <div className="relative hidden h-[480px] sm:block lg:h-[520px]">
              <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
                {nodes.map((n, i) => {
                  const s = SLOTS[i];
                  const on = n.id === activeId;
                  return (
                    <line
                      key={n.id}
                      x1="50%"
                      y1="50%"
                      x2={`${s.x}%`}
                      y2={`${s.y}%`}
                      stroke={on ? GROUP[n.group].stroke : "var(--color-line-200)"}
                      strokeWidth={on ? 2 : 1.25}
                      className="motion-safe:transition-[stroke] motion-safe:duration-200"
                    />
                  );
                })}
              </svg>
              <div className="absolute left-1/2 top-1/2 w-[12.5rem] -translate-x-1/2 -translate-y-1/2 lg:w-[15rem]">{center}</div>
              {nodes.map((n, i) => (
                <NodeButton key={n.id} n={n} on={n.id === activeId} style={slotStyle(SLOTS[i])} bind={bind(n)} className="absolute w-[8rem] lg:w-[9.5rem]" />
              ))}
            </div>
          ) : null}

          {/* Lưới hai cột (điện thoại, hoặc khi số nút khác 12) */}
          <div className={`flex flex-col gap-3 ${radial ? "sm:hidden" : ""}`}>
            {center}
            <div className="grid grid-cols-2 gap-2">
              {nodes.map((n) => (
                <NodeButton key={n.id} n={n} on={n.id === activeId} bind={bind(n)} className="w-full" />
              ))}
            </div>
          </div>

          {/* Chú giải nhóm */}
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line-200 pt-3 text-[12.5px] text-ink-500">
            {groups.map((g) => (
              <li key={g} className="flex items-center gap-1.5">
                <span aria-hidden className={`h-2 w-2 rounded-full ${GROUP[g].dot}`} />
                {GROUP[g].name}
              </li>
            ))}
          </ul>
        </div>

        {/* Bảng chi tiết */}
        <div aria-live="polite" className="flex min-h-[140px] flex-col rounded-[var(--radius-card)] border border-line-200 bg-white p-5 lg:self-start">
          {active ? (
            <div key={active.id} className="flex flex-col gap-2">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500">
                <span aria-hidden className={`h-2 w-2 rounded-full ${GROUP[active.group].dot}`} />
                {GROUP[active.group].name} · {active.label}
              </p>
              <p className="tabular text-[22px] font-semibold leading-tight text-navy-900">{active.value}</p>
              {active.note ? (
                <p className="mt-2 flex items-start gap-2 rounded-[12px] bg-orange-100 px-3.5 py-3 text-[14px] leading-snug text-navy-900">
                  <ShieldCheck aria-hidden size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-orange-700" />
                  <span>{active.note}</span>
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-[14px] leading-snug text-ink-500">Chọn một nút để xem chi tiết</p>
          )}
        </div>
      </div>

      <p className="max-w-[68ch] text-[15px] leading-relaxed text-ink-500">{data.caption}</p>
    </div>
  );
}

type Bind = { onClick: () => void; onMouseEnter: () => void; onMouseLeave: () => void; onFocus: () => void };

function slotStyle(s: Slot): CSSProperties {
  if (s.side === "l") return { left: 0, top: `${s.y}%`, transform: "translateY(-50%)" };
  if (s.side === "r") return { right: 0, top: `${s.y}%`, transform: "translateY(-50%)" };
  return { left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%,-50%)" };
}

function NodeButton({
  n,
  on,
  bind,
  style,
  className = "",
}: {
  n: DefectNode;
  on: boolean;
  bind: Bind;
  style?: CSSProperties;
  className?: string;
}) {
  const g = GROUP[n.group];
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={`${n.label}: ${n.value}`}
      style={style}
      {...bind}
      className={`flex min-w-0 flex-col items-start gap-0.5 rounded-[12px] border bg-white px-3 py-2 text-left motion-safe:transition-[border-color,box-shadow,background-color] motion-safe:duration-200 ${
        on ? `${g.ring} bg-mist-50 shadow-[0_10px_24px_-14px_rgba(10,31,68,0.55)]` : "border-line-200 hover:border-blue-300"
      } ${className}`}
    >
      <span className="flex items-center gap-1.5 text-[11.5px] font-medium leading-tight text-ink-500">
        <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${g.dot}`} />
        {n.label}
      </span>
      <span className="tabular w-full break-words text-[13px] font-semibold leading-tight text-navy-900">{n.value}</span>
    </button>
  );
}
