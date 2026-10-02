"use client";
/** M10. Thanh kéo 12 tháng (#lo-trinh): quyền vận hành chuyển dần về đội Hòa Phát. Xem docs/implementation-plan.md mục 2 và 5. */
import { useEffect, useState } from "react";
import { ScrollSteps } from "@/components/shared/ScrollSteps";
import { ArrowRight, Check, Database, Factory, Pause, Play, RotateCcw, SkipForward, UserRound } from "lucide-react";
import { m10Finale, m10Months } from "@/content/scenarios/m10";
import { useCases } from "@/content/usecases";
import { labels } from "@/content/content.vi";
import { Label } from "@/components/shared/Label";
import { onAction } from "@/lib/actions";
import { vnNumber } from "@/lib/format";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Timeline } from "./M10/Timeline";

const STEP_MS = 1200;
const chipIds = ["UC0", "UC1", "UC2", "UC3", "UC4", "UC5"];
const shortName: Record<string, string> = {
  UC0: "Hồ sơ khách hàng",
  UC1: "Lô hàng rủi ro cao",
  UC2: "So sánh phương án",
  UC3: "Bảo hành sớm",
  UC4: "Tối ưu đề xuất AI",
  UC5: "Chẩn đoán trước",
};
const liveMonth = (id: string) => {
  const uc = useCases.find((u) => u.id === id);
  const m = uc?.liveFrom.match(/T\+?(\d+)/);
  return m ? Number(m[1]) : 12;
};
/** Các bậc của đội ngũ IT theo đúng thứ tự xuất hiện trong bảng 12 tháng */
const itSteps = m10Months.reduce<{ label: string; from: number }[]>((acc, r) => {
  if (!acc.some((s) => s.label === r.it)) acc.push({ label: r.it, from: r.m });
  return acc;
}, []);
const steelRows = m10Months.filter((r) => r.steel);

/** Biểu tượng người, có nửa người cho 0,5 */
function People({ count, tone, label }: { count: number; tone: "blue" | "orange"; label: string }) {
  const full = Math.floor(count);
  const half = count - full >= 0.5;
  const color = tone === "orange" ? "text-orange-500" : "text-blue-500";
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <div className="min-w-0">
        <p className={`text-[13px] font-semibold ${tone === "orange" ? "text-orange-700" : "text-navy-900"}`}>{label}</p>
        <p className="tabular text-[13px] text-ink-500">
          {tone === "orange" ? "" : "~"}
          {vnNumber(count, count % 1 ? 1 : 0)} người
        </p>
      </div>
      <div className={`flex shrink-0 items-end ${color}`} aria-hidden>
        {Array.from({ length: full }, (_, i) => (
          <UserRound key={i} size={22} strokeWidth={1.5} className="-mx-[1px] transition-opacity duration-500" />
        ))}
        {half ? (
          <span className="-mx-[1px] inline-block w-[11px] overflow-hidden">
            <UserRound size={22} strokeWidth={1.5} />
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function M10({ variant }: { variant?: string }) {
  void variant;
  const [month, setMonth] = useState(1);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const [rootRef, inView] = useInView<HTMLDivElement>("-10% 0px");
  const row = m10Months[month - 1];

  // Tự chạy ~1,2 giây mỗi tháng; dừng khi ngoài khung nhìn, khi giảm chuyển động hoặc tới T12
  useEffect(() => {
    if (!playing) return;
    if (reduced || month >= 12) {
      setPlaying(false);
      return;
    }
    if (!inView) return; // tạm dừng khi ngoài khung nhìn, chạy tiếp khi quay lại
    const t = window.setTimeout(() => setMonth((m) => Math.min(12, m + 1)), STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, month, reduced, inView]);

  useEffect(
    () =>
      onAction("set_timeline_month", ({ month: m }) => {
        setPlaying(false);
        setMonth(m);
        rootRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      }),
    [reduced, rootRef],
  );

  const manual = (m: number) => {
    setPlaying(false);
    setMonth(m);
  };

  const togglePlay = () => {
    if (reduced) {
      manual(12);
      return;
    }
    if (playing) setPlaying(false);
    else {
      if (month >= 12) setMonth(1);
      setPlaying(true);
    }
  };

  const playLabel = reduced ? "Tới T12" : playing ? "Tạm dừng" : month >= 12 ? "Chạy lại" : "Tự chạy";
  const PlayIcon = reduced ? SkipForward : playing ? Pause : month >= 12 ? RotateCcw : Play;
  const finale = month === 12;
  const share = row.share;

  return (
    <>
    <ScrollSteps steps={12} onStep={(i) => setMonth(i + 1)} perStepVh={22}>
    <div ref={rootRef} className="relative">
      <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-4 shadow-[0_24px_60px_-34px_rgba(10,31,68,0.45)] sm:p-6 lg:p-8">
        {/* Đầu: tháng hiện tại và nút tự chạy */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-3" aria-live="polite">
            <span className="tabular whitespace-nowrap text-[36px] font-semibold leading-none tracking-[-0.03em] text-navy-900 sm:text-[48px]">Tháng thứ {month}</span>
            <span className="flex flex-col">
              <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-blue-600">{row.phase}</span>
              <span className="tabular text-[13px] text-ink-500">{month} / 12</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Label variant="proposal" text={labels.proposal} className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={togglePlay}
              aria-pressed={reduced ? undefined : playing}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-navy-900 pl-3.5 pr-4 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-navy-800"
            >
              <PlayIcon size={16} strokeWidth={1.5} aria-hidden />
              {playLabel}
            </button>
          </div>
        </div>

        <Timeline month={month} onChange={manual} />

        <div className="mt-8 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Việc của tháng */}
          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-[var(--radius-card)] border border-line-200 bg-mist-50 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">Việc tháng thứ {month}</p>
                {row.gate ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/50 bg-orange-100 px-2.5 py-0.5 text-[12px] font-semibold text-orange-700">
                    {row.gate} mở
                  </span>
                ) : null}
              </div>
              <p key={month} className="mt-2 text-[22px] font-semibold leading-snug tracking-[-0.01em] text-navy-900 motion-safe:animate-[m10-in_.45s_var(--ease-brand)] sm:text-[26px]">
                {row.useCase}
              </p>
              <dl className="mt-4 grid grid-cols-1 gap-3 text-[14px] sm:grid-cols-2">
                <div className="flex min-w-0 items-start gap-2">
                  <Database size={16} strokeWidth={1.5} aria-hidden className="mt-[3px] shrink-0 text-blue-600" />
                  <div className="min-w-0">
                    <dt className="text-[12px] font-medium text-ink-500">Dữ liệu và nền tảng</dt>
                    <dd className="text-navy-900">{row.data || "Tiếp tục vận hành"}</dd>
                  </div>
                </div>
                <div className="flex min-w-0 items-start gap-2">
                  <UserRound size={16} strokeWidth={1.5} aria-hidden className="mt-[3px] shrink-0 text-orange-700" />
                  <div className="min-w-0">
                    <dt className="text-[12px] font-medium text-ink-500">IT Hòa Phát</dt>
                    <dd className="text-navy-900">{row.it}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Chip use case */}
            <div className="mt-5">
              <p className="mb-2.5 text-[13px] font-semibold text-navy-900">Use case đang dùng thật</p>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {chipIds.map((id) => {
                  const on = row.live.includes(id);
                  return (
                    <li
                      key={id}
                      className={`flex min-w-0 items-center gap-2 rounded-[var(--radius-control)] border px-3 py-2 transition-all duration-500 ease-[var(--ease-brand)] ${
                        on ? "border-blue-500 bg-blue-500 text-white shadow-[0_10px_24px_-14px_rgba(47,123,246,0.9)]" : "border-line-200 bg-white text-ink-500"
                      }`}
                    >
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${on ? "bg-white/20" : "border border-line-200"}`}>
                        {on ? <Check size={12} strokeWidth={2} aria-hidden /> : null}
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="tabular block text-[13px] font-semibold">Ứng dụng {String(Number(id.slice(2)) + 1).padStart(2, "0")}</span>
                        <span className={`block truncate text-[12px] ${on ? "text-white/85" : ""}`}>{shortName[id]}</span>
                      </span>
                      <span className="sr-only">{on ? ": dùng thật" : `: từ T+${liveMonth(id)}`}</span>
                      {!on ? <span aria-hidden className="tabular ml-auto shrink-0 text-[11px]">T+{liveMonth(id)}</span> : null}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Làn thép */}
            <div
              className={`mt-5 overflow-hidden rounded-[var(--radius-card)] border transition-all duration-500 ease-[var(--ease-brand)] ${
                month >= 8 ? "border-navy-700/25 bg-white opacity-100" : "border-dashed border-line-200 bg-transparent opacity-70"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 border-b border-line-200 px-4 py-3">
                <Factory size={16} strokeWidth={1.5} aria-hidden className="text-navy-700" />
                <p className="text-[13px] font-semibold text-navy-900">Làn thép</p>
                <span className="text-[12px] text-ink-500">{month >= 8 ? "mở từ T+8" : "xuất hiện từ T+8"}</span>
              </div>
              {month >= 8 ? (
                <ol className="flex flex-col gap-0.5 px-4 py-3">
                  {steelRows.map((s) => {
                    const shown = s.m <= month;
                    const cur = s.m === month;
                    return (
                      <li
                        key={s.m}
                        className={`grid grid-cols-[2.5rem_1fr] gap-2 text-[14px] leading-snug transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}
                        aria-hidden={!shown}
                      >
                        <span className={`tabular ${cur ? "font-semibold text-navy-900" : "text-ink-500"}`}>T+{s.m}</span>
                        <span className={cur ? "font-medium text-navy-900" : "text-ink-500"}>{s.steel}</span>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="px-4 py-3 text-[13px] text-ink-500">Sau Cổng 3, mô hình bắt đầu bước sang thép.</p>
              )}
            </div>
          </div>

          {/* Ai vận hành */}
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-5">
            <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">Nguồn lực</p>
              <div className="mb-2 flex items-end justify-between gap-3">
                <span className="text-[13px] font-medium text-navy-900">
                  Celesnity <span className="tabular block text-[28px] font-semibold leading-none text-navy-900">{share.celesnity}%</span>
                </span>
                <span className="text-right text-[13px] font-medium text-orange-700">
                  Hòa Phát <span className="tabular block text-[28px] font-semibold leading-none text-orange-600">{share.hoaPhat}%</span>
                </span>
              </div>
              <div
                className="flex h-4 overflow-hidden rounded-full bg-line-200"
                role="img"
                aria-label={`Tỷ lệ vận hành: Celesnity ${share.celesnity}%, Hòa Phát ${share.hoaPhat}%`}
              >
                <div className="h-full bg-blue-300 transition-[width] duration-500 ease-[var(--ease-brand)]" style={{ width: `${share.celesnity}%` }} />
                <div className="h-full border-l-2 border-white bg-orange-500 transition-[width] duration-500 ease-[var(--ease-brand)]" style={{ width: `${share.hoaPhat}%` }} />
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t border-line-200 pt-4">
                <People count={row.people.celesnity} tone="blue" label="Celesnity" />
                <People count={row.people.hoaPhatIT} tone="orange" label="IT Hòa Phát" />
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">Năng lực IT Hòa Phát</p>
              <p className="mt-1.5 text-[17px] font-semibold text-navy-900">{row.itLevel}</p>
              <ol className="mt-4 flex flex-col">
                {itSteps.map((s, i) => {
                  const done = month >= s.from;
                  const cur = row.it === s.label;
                  return (
                    <li key={s.label} className="relative grid grid-cols-[1.25rem_1fr_auto] items-center gap-3 py-1.5">
                      {i < itSteps.length - 1 ? (
                        <span aria-hidden className={`absolute left-[9px] top-[22px] h-[calc(100%-10px)] w-px ${month >= itSteps[i + 1].from ? "bg-orange-500" : "bg-line-200"}`} />
                      ) : null}
                      <span
                        aria-hidden
                        className={`relative z-[1] h-[10px] w-[10px] justify-self-center rounded-full transition-all duration-500 ${
                          cur ? "h-[14px] w-[14px] bg-orange-500 ring-4 ring-orange-100" : done ? "bg-orange-500" : "border border-line-200 bg-white"
                        }`}
                      />
                      <span className={`text-[14px] leading-snug ${cur ? "font-semibold text-navy-900" : done ? "text-navy-900" : "text-ink-500"}`}>
                        {s.label}
                        {cur ? <span className="sr-only"> (hiện tại)</span> : null}
                      </span>
                      <span className="tabular text-[12px] text-ink-500">T+{s.from}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes m10-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
    </div>
    </ScrollSteps>
    {/* Kết ở T12 */}
    <div
      aria-live="polite"
      className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[var(--ease-brand)] ${
        finale ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        {finale ? (
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-orange-500/60 bg-orange-100 p-6 sm:p-10">
            <span aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
            <div className="relative grid grid-cols-1 items-end gap-6 lg:grid-cols-[auto_1fr] lg:gap-12">
              <div>
                <p className="tabular text-[72px] font-semibold leading-none tracking-[-0.04em] text-orange-600 sm:text-[96px]">{share.hoaPhat}%</p>
                <p className="mt-2 text-[14px] font-semibold text-orange-700">phần vận hành của Hòa Phát</p>
              </div>
              <div>
                <p className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-navy-900 sm:text-[40px]">{m10Finale.headline}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-[15px] font-semibold text-navy-900">
                  <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
                  {m10Finale.next}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
    </>
  );
}
