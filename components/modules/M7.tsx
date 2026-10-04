"use client";
/** M7 — Ba lớp (#ba-lop). Đặc tả: docs/implementation-plan.md mục 2. */
import { useState } from "react";
import { ScrollSteps } from "@/components/shared/ScrollSteps";

/** Thứ tự khi cuộn: ① Nền tảng → ② Mô hình → ③ Tác nhân AI → Con người quyết định (chỉ số trong bảng) */
const SCROLL_ORDER = [2, 1, 0, 3];
import { ArrowLeft, UserCheck } from "lucide-react";
import { RichText, plainText } from "@/components/shared/RichText";
import { useDetailTable } from "./shared/detailContent";
import { MotionToggle, useMotionGate } from "./shared/motion";
import { LABEL_X, STACK_H, STACK_W, anchorY, LayerStack } from "./M7/Stack";

const FADE_CSS = `@keyframes m7-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.m7-in{animation:m7-in 450ms cubic-bezier(.22,1,.36,1) both}`;

/** `**③ Tác nhân AI**: "người trợ lý làm việc"` → số, tên, biệt danh */
function parseLayer(cell: string) {
  const m = cell.match(/^\*\*(.+?)\*\*(?::\s*"(.+?)")?\s*$/);
  const full = m ? m[1] : plainText(cell);
  const num = /^[①②③]/.test(full) ? full.charAt(0) : "";
  const digit = ({ "①": "1", "②": "2", "③": "3" } as Record<string, string>)[num] ?? "";
  return { num, digit, name: full.replace(/^[①②③]\s*/, ""), nick: m?.[2] ?? "" };
}

export default function M7(_props: { variant?: string }) {
  const { rows } = useDetailTable("ba-lop", "Bảng ba lớp");
  const items = rows.map((r) => ({ ...parseLayer(r[0] ?? ""), role: plainText(r[1] ?? ""), what: r[2] ?? "" }));
  const [active, setActive] = useState(2); // mặc định mở tầng ① (bước đầu khi cuộn)
  const gate = useMotionGate<HTMLDivElement>();
  const cur = items[active];
  const isHuman = active === 3;

  const tabProps = (i: number) => ({
    id: `m7-tab-${i}`,
    "aria-pressed": active === i,
    "aria-controls": "m7-panel",
    onClick: () => setActive(i),
  });

  return (
    <ScrollSteps steps={SCROLL_ORDER.length} onStep={(i) => setActive(SCROLL_ORDER[i])}>
    <div ref={gate.ref} className="flex flex-col gap-5">
      <style>{FADE_CSS}</style>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_216px] lg:gap-6">
        {/* Sơ đồ ba tầng */}
        <figure className="relative m-0 rounded-[var(--radius-card)] border border-line-200 bg-[radial-gradient(120%_90%_at_30%_55%,#E6F0FF_0%,#FFFFFF_60%)] px-2 pb-3 pt-4 sm:px-6 sm:pt-6">
          <figcaption className="sr-only">
            Sơ đồ ba lớp xếp chồng: {items.slice(0, 3).map((it) => `${it.num} ${it.name}, vai trò ${it.role.toLowerCase()}`).join("; ")}. Bên cạnh là{" "}
            {items[3]?.name}, vai trò {items[3]?.role.toLowerCase()}. Vòng lặp cải thiện: quyết định đã duyệt và kết quả thực tế quay từ lớp ③ về lớp ①.
          </figcaption>
          <div className="relative mx-auto w-full max-w-[640px]">
            {/* trên điện thoại chỉ hiện phần khối (nhãn nằm dưới), nên cắt bớt khoảng trống bên phải */}
            <div className="overflow-hidden">
              <div className="w-[165%] sm:w-full">
                <LayerStack active={active} onPick={setActive} play={gate.play} reduced={gate.reduced} />
              </div>
            </div>
            {/* nhãn tầng: lưới dưới sơ đồ trên điện thoại, đặt cạnh từng tầng từ sm trở lên */}
            <div className="mt-3 grid grid-cols-3 gap-2 sm:pointer-events-none sm:absolute sm:inset-0 sm:mt-0 sm:block">
            {items.slice(0, 3).map((it, i) => {
              const on = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  {...tabProps(i)}
                  style={{ left: `${(LABEL_X / STACK_W) * 100}%`, top: `${((anchorY(i) - (on ? 6 : 0)) / STACK_H) * 100}%` }}
                  className={`flex flex-col items-start gap-1 rounded-[var(--radius-control)] border px-2.5 py-2 text-left transition-[background-color,border-color,color,top] duration-[450ms] ease-[var(--ease-brand)] sm:pointer-events-auto sm:absolute sm:max-w-[37%] sm:-translate-y-1/2 sm:flex-row sm:items-center sm:gap-2.5 sm:px-3 ${
                    on
                      ? "border-navy-900 bg-navy-900 text-white shadow-[0_16px_40px_-20px_rgba(10,31,68,0.6)]"
                      : "border-line-200 bg-white/90 text-navy-900 hover:border-navy-900/30"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`tabular flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold ${
                      on ? "border-blue-300 text-blue-300" : "border-blue-600/40 text-blue-600"
                    }`}
                  >
                    {it.digit}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[13px] font-semibold leading-snug sm:text-[14px]">{it.name}</span>
                    <span className={`text-[12px] ${on ? "text-blue-300" : "text-ink-500"}`}>{it.role}</span>
                  </span>
                </button>
              );
            })}
            </div>
          </div>
          <div className="flex justify-end">
            <MotionToggle paused={gate.userPaused} onToggle={gate.toggle} reduced={gate.reduced} />
          </div>
        </figure>

        {/* Con người có thẩm quyền */}
        {items[3] ? (
          <button
            type="button"
            {...tabProps(3)}
            className={`group relative flex items-center gap-4 overflow-hidden rounded-[var(--radius-card)] border p-5 text-left transition-[box-shadow,border-color,transform] duration-[450ms] ease-[var(--ease-brand)] hover:-translate-y-0.5 lg:flex-col lg:items-start lg:justify-between lg:p-6 ${
              isHuman
                ? "border-orange-500 bg-orange-100 shadow-[0_20px_50px_-24px_rgba(232,98,10,0.45)]"
                : "border-orange-500/40 bg-orange-100/70 hover:border-orange-500"
            }`}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-navy-900">
              <UserCheck aria-hidden size={24} strokeWidth={1.5} />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-700">{items[3].role}</span>
              <span className="text-[17px] font-semibold leading-snug text-navy-900">{items[3].name}</span>
              <span className="text-[14px] leading-snug text-ink-500">Phê duyệt mọi thay đổi</span>
            </span>
            <span aria-hidden className="hidden items-center gap-2 text-[13px] font-medium text-orange-700 lg:flex">
              <ArrowLeft size={16} strokeWidth={1.5} />
              cả ba lớp
            </span>
          </button>
        ) : null}
      </div>

      {/* Mô tả tầng đang mở */}
      {cur ? (
        <div
          id="m7-panel"
          role="tabpanel"
          aria-labelledby={`m7-tab-${active}`}
          aria-live="polite"
          className={`rounded-[var(--radius-card)] border p-5 sm:p-7 ${isHuman ? "border-orange-500/50 bg-white" : active === 1 ? "border-blue-300 bg-blue-100/60" : "border-line-200 bg-white"}`}
        >
          <div key={active} className="m7-in grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:gap-8">
            <div className="flex flex-col gap-1.5">
              <span
                className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.1em] ${
                  isHuman ? "bg-orange-100 text-orange-700" : "bg-navy-900 text-white"
                }`}
              >
                {cur.role}
              </span>
              <p className="mt-1 text-[20px] font-semibold leading-snug tracking-[-0.01em]">
                {cur.digit ? (
                  <span
                    aria-hidden
                    className="tabular mr-2 inline-flex h-7 w-7 -translate-y-px items-center justify-center rounded-full border border-blue-600/40 align-middle text-[14px] font-semibold text-blue-600"
                  >
                    {cur.digit}
                  </span>
                ) : null}
                {cur.name}
              </p>
              {cur.nick ? <p className="text-[15px] italic text-ink-500">“{cur.nick}”</p> : null}
            </div>
            <p className="max-w-[60ch] text-[16px] leading-relaxed sm:pt-1">
              <span className="mb-1 block text-[12px] font-medium uppercase tracking-[0.1em] text-ink-500">Làm gì</span>
              <RichText text={cur.what} />
            </p>
          </div>
        </div>
      ) : null}
    </div>
    </ScrollSteps>
  );
}
