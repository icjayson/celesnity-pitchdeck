"use client";
/** M3 — Hai con đường (#hai-con-duong). Đặc tả: docs/implementation-plan.md mục 2. */
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { plainText } from "@/components/shared/RichText";
import { detailTable } from "./shared/detailContent";
import { MotionToggle, useAfter, useMotionGate } from "./shared/motion";
import { Segmented } from "./shared/Segmented";
import { PathScene } from "./M3/Scene";

type Path = "A" | "B";

const FADE_CSS = `@keyframes m3-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.m3-in{animation:m3-in 450ms cubic-bezier(.22,1,.36,1) both}`;

const CAPTION: Record<Path, string> = {
  A: "Dữ liệu đi ra hệ thống của nhà cung cấp; mô hình thuộc nhà cung cấp.",
  B: "Dữ liệu ở lại Việt Nam, trong môi trường Hòa Phát; mô hình và đội kỹ sư là của Hòa Phát.",
};

export default function M3(_props: { variant?: string }) {
  const { head, rows } = detailTable("hai-con-duong", "Bảng hai con đường");
  const [path, setPath] = useState<Path>("A");
  const [touched, setTouched] = useState(false);
  const gate = useMotionGate<HTMLDivElement>();
  const hintReady = useAfter(gate.inView, 2200);
  const showHint = hintReady && !touched && path === "A";

  const choose = (p: Path) => {
    setTouched(true);
    setPath(p);
  };

  const headA = plainText(head[1] ?? "Con đường A: Thuê AI");
  const headB = plainText(head[2] ?? "Con đường B: Tự chủ");
  const short = (h: string) => h.split(":").slice(1).join(":").trim() || h;
  const isB = path === "B";

  return (
    <div ref={gate.ref} className="flex flex-col gap-6">
      <style>{FADE_CSS}</style>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Segmented<Path>
          ariaLabel="Chọn con đường"
          value={path}
          onChange={choose}
          pulse={showHint && !gate.reduced ? "B" : null}
          options={[
            { value: "A", label: `A · ${short(headA)}`, accent: "navy" },
            { value: "B", label: `B · ${short(headB)}`, accent: "orange" },
          ]}
          className="w-full sm:w-auto sm:[&>button]:min-w-[160px]"
        />
        <p
          aria-hidden={!showHint}
          className={`flex items-center gap-1.5 text-[14px] text-ink-500 transition-opacity duration-500 ease-[var(--ease-brand)] ${
            showHint ? "opacity-100" : "opacity-0"
          }`}
        >
          <ArrowLeft aria-hidden size={16} strokeWidth={1.5} className="hidden sm:block" />
          Chọn B để thấy khác biệt
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-6">
        {/* Bản đồ */}
        <figure className="relative isolate m-0 flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-900 p-3 text-white shadow-[0_28px_60px_-30px_rgba(10,31,68,0.7)] sm:p-5">
          <span aria-hidden className="pointer-events-none absolute -left-20 top-10 -z-10 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]" />
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <PathScene path={path} play={gate.play} reduced={gate.reduced} />
          </div>
          <figcaption className="sr-only" aria-live="polite">
            {isB ? headB : headA}. {CAPTION[path]}
          </figcaption>
          <MotionToggle paused={gate.userPaused} onToggle={gate.toggle} reduced={gate.reduced} tone="dark" className="absolute bottom-3 right-3" />
        </figure>

        {/* So sánh 5 dòng */}
        <div className="flex flex-col rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-7">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
            <span aria-hidden className={`h-2 w-2 rounded-full transition-colors duration-500 ${isB ? "bg-orange-500" : "bg-ink-500"}`} />
            {isB ? headB : headA}
          </p>
          <dl className="mt-4 flex flex-col">
            {rows.map((r, i) => {
              const val = isB ? r[2] : r[1];
              return (
                <div
                  key={i}
                  className="grid grid-cols-1 gap-1 border-b border-line-200 py-3.5 last:border-b-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="text-[13px] font-medium text-ink-500 sm:pt-0.5">{plainText(r[0] ?? "")}</dt>
                  <dd key={path} className={`m3-in flex items-start gap-2.5 text-[16px] leading-snug ${isB ? "font-semibold text-navy-900" : "text-navy-900/80"}`} style={{ animationDelay: `${i * 50}ms` }}>
                    <span
                      aria-hidden
                      className={`mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full ${isB ? "bg-orange-500" : "bg-line-200"}`}
                    />
                    <span>{plainText(val ?? "")}</span>
                  </dd>
                </div>
              );
            })}
          </dl>

        </div>
      </div>
    </div>
  );
}
