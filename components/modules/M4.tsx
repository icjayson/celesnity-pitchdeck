"use client";
/** M4 — Buồng mô phỏng quyết định (docs/implementation-plan.md mục 2). Toàn bộ số liệu là minh họa, lấy từ content/scenarios/m4.ts. */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, CalendarClock, RotateCcw, ShieldQuestionMark, CircleQuestionMark, History, Gauge } from "lucide-react";
import { m4Options, m4Score, type M4OptionId } from "@/content/scenarios/m4";
import { labels } from "@/content/content.vi";
import { Label } from "@/components/shared/Label";
import { onAction } from "@/lib/actions";
import { vnNumber } from "@/lib/format";
import { ForecastChart } from "./M4/ForecastChart";
import { ScoreGauge } from "./M4/ScoreGauge";

type Phase = "forecast" | "approved" | "result";

export default function M4({ variant }: { variant?: string }) {
  const [selected, setSelected] = useState<M4OptionId | null>(null);
  const [phase, setPhase] = useState<Phase>("forecast");
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  const choose = useCallback((id: M4OptionId) => {
    setSelected(id);
    setPhase("forecast");
  }, []);

  useEffect(() => onAction("run_simulation", ({ option }) => choose(option)), [choose]);

  const opt = m4Options.find((o) => o.id === selected) ?? null;
  const abstain = !!opt?.abstain;
  const fc = opt?.forecast ?? null;
  const end = fc ? fc[fc.length - 1] : null;
  const lastActual = opt?.actual ? opt.actual[opt.actual.length - 1] : null;

  const onRadioKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = m4Options.length;
    let j = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + n) % n;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = n - 1;
    if (j < 0) return;
    e.preventDefault();
    choose(m4Options[j].id);
    radios.current[j]?.focus();
  };

  const reset = () => {
    setSelected(null);
    setPhase("forecast");
    radios.current[0]?.focus();
  };

  const focusIndex = Math.max(0, m4Options.findIndex((o) => o.id === selected));

  const description = !opt
    ? "Biểu đồ tỷ lệ lỗi kiểm tra trong 8 tuần. Hiện tại 3,2%. Chưa chọn phương án."
    : abstain
      ? `${opt.short}: mô hình từ chối dự báo. ${opt.abstain}`
      : `Phương án ${opt.short}. Hiện tại ${vnNumber(opt.current ?? 0, 1)}%. Dự báo tuần 8: ${vnNumber(end!.mid, 1)}%, dải 80% từ ${vnNumber(end!.lo, 1)}% đến ${vnNumber(end!.hi, 1)}%. Mức chắc chắn: ${opt.confidence}.` +
        (phase === "result" && lastActual
          ? ` Thực tế sau 4 tuần: ${opt.actual!.map((p) => `tuần ${p.week} ${vnNumber(p.value, 1)}%`).join(", ")}. ${opt.verdict}`
          : "");

  return (
    <div data-variant={variant} className="relative overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-950 shadow-[0_40px_90px_-40px_rgba(10,31,68,0.9)]">
      {/* quầng sáng nền */}
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[520px] rounded-full bg-blue-500/15 blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(141,184,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(141,184,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {/* đầu buồng */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-blue-300">
            <span aria-hidden className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_2px_rgba(47,123,246,0.7)]" />
            Buồng mô phỏng · bếp từ · bảo vệ nhiệt
          </p>
          <Label variant="sim" text={labels.simShort} />
        </div>

        {/* chọn phương án */}
        <div>
          <p id="m4-choose" className="mb-3 text-[14px] text-blue-300">
            Bước 1 · Chọn một phương án
          </p>
          <div role="radiogroup" aria-labelledby="m4-choose" className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {m4Options.map((o, i) => {
              const on = o.id === selected;
              const special = !!o.abstain;
              return (
                <button
                  key={o.id}
                  ref={(el) => {
                    radios.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={i === focusIndex ? 0 : -1}
                  onClick={() => choose(o.id)}
                  onKeyDown={(e) => onRadioKey(e, i)}
                  className={`group relative flex min-h-[64px] items-center gap-3 rounded-[var(--radius-control)] border px-4 py-3 text-left transition-[background-color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 ${
                    special ? "border-dashed" : ""
                  } ${
                    on
                      ? "border-blue-400 bg-blue-500/15 shadow-[0_0_0_1px_var(--color-blue-400),0_16px_40px_-20px_rgba(47,123,246,0.8)]"
                      : "border-navy-700 bg-navy-900/70 hover:border-blue-300/60 hover:bg-navy-800"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      on ? "border-blue-400 bg-blue-500" : "border-blue-300/50"
                    }`}
                  >
                    {on ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold leading-tight text-white">{o.label}</span>
                    {special ? <span className="mt-0.5 block text-[12px] leading-snug text-blue-300">Ca đặc biệt: chưa từng có dữ liệu</span> : null}
                  </span>
                  {special ? <CircleQuestionMark aria-hidden size={20} strokeWidth={1.5} className="shrink-0 text-blue-300" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* bảng điều khiển */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          {/* biểu đồ hoặc trạng thái từ chối */}
          <div className="flex min-w-0 flex-col justify-center rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/60 p-3 sm:p-5">
            {abstain && opt ? (
              <Abstain text={opt.abstain!} />
            ) : (
              <figure className="m-0">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
                  <p className="text-[14px] font-medium text-white">Tỷ lệ lỗi kiểm tra, 8 tuần tới</p>
                  <Legend showActual={phase === "result"} />
                </div>
                <ForecastChart option={opt} showActual={phase === "result"} />
                <figcaption className="sr-only" aria-live="polite">
                  {description}
                </figcaption>
              </figure>
            )}
          </div>

          {/* cột bên */}
          <div className="flex min-w-0 flex-col gap-4">
            {!opt ? (
              <div className="flex flex-1 flex-col justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-navy-700 p-5 text-[15px] text-blue-300">
                <Gauge aria-hidden size={22} strokeWidth={1.5} className="text-blue-400" />
                <p>Mô hình sẽ dự báo tỷ lệ lỗi cho từng phương án, kèm mức chắc chắn và những thay đổi cũ làm căn cứ.</p>
              </div>
            ) : abstain ? (
              <div className="flex flex-1 flex-col gap-3 rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/60 p-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-blue-300">Mức chắc chắn</p>
                <p className="text-[22px] font-semibold text-white">Không đủ để dự báo</p>
                <p className="text-[15px] text-blue-300">
                  Không có thay đổi tương tự nào trong dữ liệu đã học. Quyết định quay về con người, kèm đề nghị thu thêm dữ liệu trước.
                </p>
              </div>
            ) : (
              <>
                <div key={opt.id} className="m4-in grid grid-cols-2 gap-3">
                  <Stat k="Dự báo tuần 8" v={`${vnNumber(end!.mid, 1)}%`} sub={`Dải 80%: ${vnNumber(end!.lo, 1)}\u2060–\u2060${vnNumber(end!.hi, 1)}%`} />
                  <Stat k="Mức chắc chắn" v={opt.confidence ?? "—"} sub={`Hiện tại ${vnNumber(opt.current ?? 0, 1)}%`} dots={opt.confidence === "Cao" ? 3 : 2} />
                </div>
                <div key={`ev-${opt.id}`} className="m4-in">
                  <p className="mb-2 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-blue-300">
                    <History aria-hidden size={14} strokeWidth={1.5} />
                    Căn cứ: thay đổi tương tự trước đây
                  </p>
                  <ul className="flex flex-col gap-2">
                    {opt.evidence.map((ev, i) => {
                      const [main, tag] = ev.split(" · ");
                      return (
                        <li
                          key={i}
                          className="flex items-start gap-3 rounded-[var(--radius-control)] border border-navy-700 bg-navy-900/70 px-3 py-2.5 text-[14px] leading-snug text-white"
                          style={{ animationDelay: `${120 + i * 90}ms` }}
                        >
                          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />
                          <span className="min-w-0 flex-1">{main}</span>
                          {tag ? <span className="shrink-0 rounded-full border border-blue-300/40 px-2 py-0.5 text-[11px] text-blue-300">{tag}</span> : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}

            {/* hành động */}
            {opt && !abstain ? (
              <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/60 p-4">
                {phase === "forecast" ? (
                  <>
                    <p className="text-[14px] text-blue-300">Bước 2 · Mô hình chỉ đề xuất. Quý vị quyết định.</p>
                    <button
                      type="button"
                      onClick={() => setPhase("approved")}
                      className="m4-pulse inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-orange-500 px-5 text-[16px] font-semibold text-navy-900 transition-colors duration-300 hover:bg-orange-600"
                    >
                      <Check aria-hidden size={18} strokeWidth={1.5} />
                      Duyệt phương án
                    </button>
                  </>
                ) : (
                  <>
                    <p className="flex items-center gap-2 text-[14px] font-medium text-white">
                      <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-navy-900">
                        <Check size={13} strokeWidth={2} />
                      </span>
                      Đã duyệt: {opt.short.toLowerCase()} · con người quyết định
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                      {phase === "approved" ? (
                        <button
                          type="button"
                          onClick={() => setPhase("result")}
                          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-blue-400 bg-blue-500/15 px-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-blue-500/30"
                        >
                          <CalendarClock aria-hidden size={18} strokeWidth={1.5} />4 tuần sau
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-navy-700 px-4 text-[15px] font-medium text-blue-300 transition-colors duration-300 hover:border-blue-300/60 hover:text-white"
                      >
                        <RotateCcw aria-hidden size={16} strokeWidth={1.5} />
                        Thử phương án khác
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : null}
            {abstain ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-control)] border border-navy-700 px-4 text-[15px] font-medium text-blue-300 transition-colors duration-300 hover:border-blue-300/60 hover:text-white"
              >
                <RotateCcw aria-hidden size={16} strokeWidth={1.5} />
                Thử phương án khác
              </button>
            ) : null}
          </div>
        </div>

        {/* kết quả 4 tuần sau */}
        {opt && !abstain ? (
          <div
            className={`grid grid-cols-1 gap-4 rounded-[var(--radius-card)] border p-4 transition-[border-color,background-color] duration-500 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center ${
              phase === "result" ? "border-orange-500/40 bg-orange-500/[0.06]" : "border-navy-700 bg-navy-900/40"
            }`}
          >
            <div className="min-w-0" aria-live="polite">
              {phase === "result" && lastActual ? (
                <div className="m4-in">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-orange-500">Thực tế sau 4 tuần</p>
                  <p className="mt-1 text-[20px] font-semibold leading-snug text-white sm:text-[22px]">{opt.verdict}</p>
                  <p className="mt-1 text-[14px] text-blue-300">
                    <span className="tabular">
                      {vnNumber(opt.current ?? 0, 1)}% → {vnNumber(lastActual.value, 1)}%
                    </span>{" "}
                    ở tuần 4. Kết quả quay về mô hình; mô hình tự học cho lần sau.
                  </p>
                </div>
              ) : (
                <p className="text-[14px] text-blue-300">
                  Bước 3 · Sau khi duyệt, xem kết quả thực tế cạnh dự báo. Mô hình được chấm điểm sau mỗi lần.
                </p>
              )}
            </div>
            <ScoreGauge from={m4Score.before} to={m4Score.after} run={phase === "result"} unit={m4Score.unit} />
          </div>
        ) : null}
      </div>

      <style>{`
        @keyframes m4-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .m4-in { animation: m4-in 500ms var(--ease-brand) both; }
        .m4-in li { animation: m4-in 500ms var(--ease-brand) both; }
        @keyframes m4-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,122,26,0.55); } 100% { box-shadow: 0 0 0 14px rgba(255,122,26,0); } }
        .m4-pulse { animation: m4-pulse 900ms var(--ease-brand) 600ms 1; }
      `}</style>
    </div>
  );
}

function Stat({ k, v, sub, dots }: { k: string; v: string; sub: string; dots?: number }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/70 p-4">
      <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-blue-300">{k}</p>
      <p className="tabular mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[22px] font-semibold leading-tight text-white sm:text-[30px]">
        {v}
        {dots ? (
          <span aria-hidden className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`h-1.5 w-3 rounded-full ${i < dots ? "bg-blue-400" : "bg-navy-700"}`} />
            ))}
          </span>
        ) : null}
      </p>
      <p className="tabular mt-1 text-[13px] text-blue-300">{sub}</p>
    </div>
  );
}

function Legend({ showActual }: { showActual: boolean }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-blue-300">
      <li className="flex items-center gap-1.5">
        <span aria-hidden className="h-0.5 w-4 rounded-full bg-blue-500" />
        Dự báo
      </li>
      <li className="flex items-center gap-1.5">
        <span aria-hidden className="h-2.5 w-4 rounded-sm bg-blue-300/25" />
        Dải 80%
      </li>
      <li className="flex items-center gap-1.5">
        <span aria-hidden className="h-0 w-4 border-t-[1.5px] border-dashed border-ink-500" />
        Hiện tại
      </li>
      {showActual ? (
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="h-0.5 w-4 rounded-full bg-orange-500" />
          Thực tế
        </li>
      ) : null}
    </ul>
  );
}

function Abstain({ text }: { text: string }) {
  return (
    <div className="m4-in relative flex min-h-[300px] flex-col items-center justify-center gap-5 overflow-hidden px-4 py-10 text-center" role="status">
      <svg aria-hidden width={160} height={160} viewBox="0 0 160 160" className="absolute top-6 opacity-70">
        <circle cx={80} cy={80} r={76} fill="none" stroke="var(--color-navy-700)" strokeDasharray="2 6" />
        <circle cx={80} cy={80} r={56} fill="none" stroke="var(--color-blue-300)" strokeOpacity={0.25} strokeDasharray="4 6" className="m4-spin" />
        <circle cx={80} cy={80} r={36} fill="rgba(47,123,246,0.12)" stroke="var(--color-blue-300)" strokeOpacity={0.35} />
      </svg>
      <div className="relative mt-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-blue-300/40 bg-navy-900 shadow-[0_0_40px_-6px_rgba(47,123,246,0.7)]">
        <ShieldQuestionMark aria-hidden size={30} strokeWidth={1.5} className="text-blue-300" />
      </div>
      <div className="relative mt-8 flex max-w-[44ch] flex-col gap-3">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-blue-300">Mô hình từ chối dự báo</p>
        <p className="text-[22px] font-semibold leading-snug text-white sm:text-[26px]">“{text}”</p>
        <p className="text-[15px] text-blue-300">Một mô hình tốt phải biết khi nào nó không biết. Không có biểu đồ còn hơn một biểu đồ sai mà trông chắc chắn.</p>
      </div>
      <style>{`
        @keyframes m4-spin { to { transform: rotate(360deg); } }
        .m4-spin { transform-origin: 80px 80px; animation: m4-spin 40s linear infinite; }
      `}</style>
    </div>
  );
}
