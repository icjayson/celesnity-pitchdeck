"use client";
/** M13 — Chủ quyền dữ liệu (#kiem-soat). Đặc tả: docs/implementation-plan.md mục 2. */
import { useState } from "react";
import { Ban, ClipboardCheck, FileSignature, MapPin, UserCheck, UserX, Vault, type LucideIcon } from "lucide-react";
import { RichText, plainText } from "@/components/shared/RichText";
import { detailList, detailTable } from "./shared/detailContent";
import { MotionToggle, useMotionGate } from "./shared/motion";
import { Segmented } from "./shared/Segmented";
import { SovereigntyScene, type Level } from "./M13/Scene";

const FADE_CSS = `@keyframes m13-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.m13-in{animation:m13-in 450ms cubic-bezier(.22,1,.36,1) both}`;

/** Biểu tượng cho 7 cam kết, theo đúng thứ tự trong content */
const COMMIT_ICONS: LucideIcon[] = [MapPin, ClipboardCheck, UserX, UserCheck, Ban, Vault, FileSignature];

const RECOMMENDED: Level = 3;

export default function M13(_props: { variant?: string }) {
  const { head, rows } = detailTable("kiem-soat", "Ba mức tham gia");
  const commitments = detailList("kiem-soat", "Bảy cam kết không thay đổi");
  const [level, setLevel] = useState<Level>(RECOMMENDED);
  const gate = useMotionGate<HTMLDivElement>();

  const levels = ([1, 2, 3] as Level[]).map((n) => {
    const h = plainText(head[n] ?? `Mức ${n}`);
    const [label, ...rest] = h.split(":");
    return { n, label: label.trim(), sub: rest.join(":").trim(), full: h };
  });
  const cur = levels[level - 1];
  const leaves = plainText(rows[0]?.[level] ?? "");
  const caption = level === 1 ? "Không có gì rời môi trường Hòa Phát." : `Rời đi: ${leaves.charAt(0).toLowerCase()}${leaves.slice(1)}.`;

  return (
    <div ref={gate.ref} className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-6">
      <style>{FADE_CSS}</style>

      {/* Bản đồ và lựa chọn mức */}
      <figure className="relative isolate m-0 flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-900 p-3 text-white shadow-[0_28px_60px_-30px_rgba(10,31,68,0.7)] sm:p-5">
        <span aria-hidden className="pointer-events-none absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[90px]" />
        <div className="flex flex-col gap-1 px-1">
          <Segmented<`${Level}`>
            ariaLabel="Chọn mức tham gia"
            tone="dark"
            value={`${level}`}
            onChange={(v) => setLevel(Number(v) as Level)}
            options={levels.map((l) => ({
              value: `${l.n}` as `${Level}`,
              label: l.label,
              sub: l.sub,
              badge: l.n === RECOMMENDED ? "Khuyến nghị" : undefined,
            }))}
            className="w-full"
          />
        </div>
        <div className="mt-2">
          <SovereigntyScene level={level} play={gate.play} reduced={gate.reduced} />
        </div>
        <figcaption className="mt-auto flex flex-col gap-3 border-t border-navy-700 px-1 pt-3">
          <p key={level} aria-live="polite" className="m13-in text-[15px] font-medium leading-snug text-white">
            {caption}
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-blue-300">
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-3 w-4 rounded-[4px] border-[1.5px] border-orange-500" />
              Môi trường Hòa Phát
            </li>
            <li className={`flex items-center gap-1.5 transition-opacity duration-500 ${level >= 2 ? "" : "opacity-40"}`}>
              <span aria-hidden className="h-2 w-2 rounded-full bg-blue-300" />
              Bản cập nhật mô hình
            </li>
            <li className={`flex items-center gap-1.5 transition-opacity duration-500 ${level >= 3 ? "" : "opacity-40"}`}>
              <span aria-hidden className="h-2 w-2 rotate-45 rounded-[1px] bg-blue-100" />
              Tập kiểm chứng đã khử nhận diện
            </li>
            <li className="ml-auto">
              <MotionToggle paused={gate.userPaused} onToggle={gate.toggle} reduced={gate.reduced} tone="dark" className="-mr-1" />
            </li>
          </ul>
        </figcaption>
      </figure>

      <div className="flex flex-col gap-5">
        {/* Tóm tắt mức đang chọn */}
        <section aria-label={`Tóm tắt ${cur.full}`} className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
          <div key={level} className="m13-in">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[19px] font-semibold tracking-[-0.01em]">
                <span className="tabular">{cur.label}</span>
                {cur.sub ? <span className="text-ink-500">: {cur.sub}</span> : null}
              </h3>
              {level === RECOMMENDED ? (
                <span className="rounded-full border border-orange-500/40 bg-orange-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-orange-700">
                  Khuyến nghị
                </span>
              ) : null}
            </div>
            <dl className="mt-3 flex flex-col">
              {rows.map((r, i) => {
                const v = r[level] ?? "";
                const empty = plainText(v).trim() === "—";
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-1 gap-0.5 border-b border-line-200 py-2.5 last:border-b-0 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-4 ${
                      i === 0 ? "-mx-2 rounded-[10px] border-b-0 bg-blue-100/70 px-2" : ""
                    }`}
                  >
                    <dt className="text-[13px] font-medium text-ink-500 sm:pt-px">{plainText(r[0] ?? "")}</dt>
                    <dd className={`text-[15px] leading-snug ${empty ? "text-ink-500" : "text-navy-900"} ${i === 0 ? "font-semibold" : ""}`}>
                      {empty ? <span aria-label="Không có">—</span> : <RichText text={v} />}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        {/* Bảy cam kết */}
        <section aria-labelledby="m13-commit" className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
          <h3 id="m13-commit" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
            Bảy cam kết không thay đổi
          </h3>
          <ol className="mt-3 flex flex-col">
            {commitments.map((c, i) => {
              const Icon = COMMIT_ICONS[i] ?? ClipboardCheck;
              return (
                <li key={i} className="flex items-start gap-3 border-b border-line-200 py-2.5 last:border-b-0">
                  <span className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist-50 text-navy-900 ring-1 ring-line-200">
                    <Icon aria-hidden size={16} strokeWidth={1.5} />
                  </span>
                  <p className="text-[14px] leading-snug text-navy-900/90">
                    <RichText text={c} />
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </div>
  );
}
