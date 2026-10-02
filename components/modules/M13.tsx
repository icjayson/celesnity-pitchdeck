"use client";
/** M13 — Chủ quyền dữ liệu (#kiem-soat) và các phần đề xuất trong #hop-tac. Đặc tả: docs/implementation-plan.md mục 2. */
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

/**
 * variant mặc định (#kiem-soat): bản đồ + so sánh nhanh ba mức.
 * "founding" (#hop-tac): thẻ đề xuất Mức 3 · "commitments" (#hop-tac): bảy cam kết.
 */
export default function M13({ variant }: { variant?: string }) {
  if (variant === "founding") return <Founding />;
  if (variant === "commitments") return <Commitments />;
  return <Sovereignty />;
}

function useLevels() {
  const { head, rows } = detailTable("hop-tac", "Ba mức tham gia");
  const levels = ([1, 2, 3] as Level[]).map((n) => {
    const h = plainText(head[n] ?? `Mức ${n}`);
    const [label, ...rest] = h.split(":");
    return { n, label: label.trim(), sub: rest.join(":").trim(), full: h };
  });
  return { rows, levels };
}

function Sovereignty() {
  const { rows, levels } = useLevels();
  const [level, setLevel] = useState<Level>(RECOMMENDED);
  const gate = useMotionGate<HTMLDivElement>();
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

      {/* So sánh nhanh: điều gì rời môi trường Hòa Phát ở mỗi mức */}
      <ol className="flex flex-col gap-3">
        {levels.map((l) => {
          const on = l.n === level;
          const v = rows[0]?.[l.n] ?? "";
          return (
            <li key={l.n}>
              <button
                type="button"
                onClick={() => setLevel(l.n)}
                aria-pressed={on}
                className={`flex w-full flex-col gap-2 rounded-[var(--radius-card)] border p-5 text-left transition-colors duration-300 sm:p-6 ${
                  on ? "border-blue-500 bg-white shadow-[0_20px_50px_-30px_rgba(10,31,68,0.5)]" : "border-line-200 bg-white/60 hover:border-blue-300"
                }`}
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-[18px] font-semibold tracking-[-0.01em] text-navy-900">
                    <span className="tabular">{l.label}</span>
                    {l.sub ? <span className="text-ink-500">: {l.sub}</span> : null}
                  </span>
                  {l.n === RECOMMENDED ? (
                    <span className="rounded-full border border-orange-500/40 bg-orange-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-orange-700">
                      Khuyến nghị
                    </span>
                  ) : null}
                </span>
                <span className="text-[13px] font-medium text-ink-500">{plainText(rows[0]?.[0] ?? "")}</span>
                <span className="text-[15px] leading-snug text-navy-900">
                  <RichText text={v} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Đề xuất hình thức hợp tác: Mức 3, Đối tác sáng lập, với toàn bộ quyền lợi. */
function Founding() {
  const { rows, levels } = useLevels();
  const l = levels[RECOMMENDED - 1];
  return (
    <section
      aria-label={`Đề xuất: ${l.full}`}
      className="relative overflow-hidden rounded-[var(--radius-card)] border border-line-200 bg-white shadow-[0_24px_60px_-40px_rgba(10,31,68,0.45)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="relative isolate flex flex-col justify-between gap-6 overflow-hidden bg-navy-900 p-6 text-white sm:p-8">
          <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 h-60 w-60 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-orange-500 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-navy-900">
              Đề xuất hình thức hợp tác
            </span>
            <h4 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] sm:text-[36px]">{l.sub}</h4>
          </div>
          <p className="text-[15px] leading-relaxed text-blue-100/90">
            Hòa Phát cùng xây mô hình nền, giữ quyền dùng lâu dài và dẫn dắt hướng phát triển.
          </p>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          {rows.map((r, i) => {
            // "Như Mức 2, cộng …" → viết đầy đủ, vì ở đây chỉ hiện Mức 3
            const raw = r[RECOMMENDED] ?? "";
            const m = /^Như Mức 2, cộng\s+/.exec(raw);
            const v = m ? `${r[2] ?? ""}, và thêm ${raw.slice(m[0].length)}` : raw;
            return (
              <div key={i} className={`flex flex-col gap-1.5 border-line-200 p-5 sm:p-6 ${i % 2 === 0 ? "sm:border-r" : ""} ${i >= 2 ? "border-t" : i === 1 ? "border-t sm:border-t-0" : ""}`}>
                <dt className="text-[13px] font-medium text-ink-500">{plainText(r[0] ?? "")}</dt>
                <dd className="text-[16px] leading-snug text-navy-900">
                  <RichText text={v} />
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

/** Bảy cam kết không thay đổi, chia hai cột. */
function Commitments() {
  const commitments = detailList("hop-tac", "Bảy cam kết không thay đổi");
  return (
    <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {commitments.map((c, i) => {
        const Icon = COMMIT_ICONS[i] ?? ClipboardCheck;
        return (
          <li key={i} className="flex items-start gap-3.5 rounded-[14px] border border-line-200 bg-white p-4 sm:p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Icon aria-hidden size={18} strokeWidth={1.5} />
            </span>
            <p className="pt-1.5 text-[15px] leading-snug text-navy-900/90">
              <RichText text={c} />
            </p>
          </li>
        );
      })}
    </ol>
  );
}
