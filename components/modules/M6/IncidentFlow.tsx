"use client";
/**
 * M6 kiểu "incident" (#thu-ngay): "Thử làm trưởng ca".
 * Lời báo sự cố (giọng nói / gõ / câu mẫu) → /api/extract → thẻ sự cố → tác động lên kế hoạch → phương án phục hồi → duyệt.
 * Nhãn trung thực: chỉ mode "ai" mới ghi "AI thật"; tác động và phương án là mô phỏng minh họa.
 */
import { useRef, useState } from "react";
import { AlertTriangle, Check, CircleAlert, CircleCheck, ClipboardList, Gauge, RotateCcw, Route } from "lucide-react";
import type { IncidentCard } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { Label } from "@/components/shared/Label";
import { incidentOffline, type IncidentMode, type IncidentResult } from "@/lib/ai/incidentRules";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { RadioInput } from "./RadioInput";

type Phase = "idle" | "loading" | "result" | "not-incident" | "error";

const severityBars: Record<IncidentCard["muc_do"], number> = { Thấp: 1, "Trung bình": 2, Cao: 3 };

function isResult(x: unknown): x is IncidentResult {
  if (!x || typeof x !== "object") return false;
  const r = x as Partial<IncidentResult>;
  return (
    (r.mode === "ai" || r.mode === "rules" || r.mode === "sample") &&
    !!r.card &&
    typeof r.card.la_su_co === "boolean" &&
    Array.isArray(r.card.thong_tin_con_thieu)
  );
}

export function IncidentFlow() {
  const { slug, labels, scenarios } = useDeck();
  const m6 = scenarios.m6!;
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<IncidentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);
  const reqId = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);
  if (m6.kind !== "incident") return null;
  const { copy, fallback, impact, options } = m6;
  const recommended = options.find((o) => o.recommended)?.id ?? options[0]?.id ?? null;

  const modeLabel: Record<IncidentMode, { variant: "ai" | "sim"; text: string }> = {
    ai: { variant: "ai", text: copy.aiLabel },
    rules: { variant: "sim", text: "Chế độ offline: trích xuất theo quy tắc" },
    sample: { variant: "sim", text: "Kết quả soạn sẵn" },
  };

  const run = async (raw: string) => {
    const input = raw.trim().slice(0, 300);
    if (!input) return;
    const id = ++reqId.current;
    setPhase("loading");
    setApproved(false);
    setPicked(null);
    setError(null);
    let r: IncidentResult;
    try {
      if (typeof navigator !== "undefined" && navigator.onLine === false) throw new Error("offline");
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ deck: slug, text: input }),
      });
      const json: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        if (id !== reqId.current) return;
        const msg = json && typeof json === "object" && "error" in json ? String((json as { error: unknown }).error) : null;
        setError(msg ?? "Chưa lập được thẻ sự cố. Quý vị thử lại nhé.");
        setPhase("error");
        return;
      }
      r = isResult(json) ? json : incidentOffline(input, fallback);
    } catch {
      // Mất mạng hoặc API lỗi: câu mẫu → kết quả soạn sẵn, câu khác → quy tắc
      r = incidentOffline(input, fallback);
    }
    if (id !== reqId.current) return;
    setResult(r);
    setPicked(recommended);
    setPhase(r.card.la_su_co ? "result" : "not-incident");
    requestAnimationFrame(() => {
      const el = resultRef.current;
      if (el && window.matchMedia("(max-width: 1023px)").matches) {
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }
    });
  };

  const reset = () => {
    reqId.current++;
    setPhase("idle");
    setResult(null);
    setApproved(false);
    setPicked(null);
    setText("");
  };

  const pickedOption = options.find((o) => o.id === picked) ?? null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      <RadioInput value={text} onChange={setText} onSubmit={(t) => void run(t)} busy={phase === "loading"} reduced={reduced} />

      <div ref={resultRef} className="flex min-w-0 scroll-mt-24 flex-col gap-5" aria-live="polite" aria-busy={phase === "loading"}>
        {phase === "idle" ? (
          <div className="flex h-full min-h-[320px] flex-col justify-center rounded-[var(--radius-card)] border border-dashed border-line-200 bg-white/60 p-6 sm:p-8">
            <ClipboardList aria-hidden size={28} strokeWidth={1.5} className="text-blue-600" />
            <p className="mt-4 text-[17px] font-semibold">{copy.idleTitle}</p>
            <ol className="mt-4 flex flex-col gap-2.5">
              {copy.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-[15px] text-ink-500">
                  <span
                    aria-hidden
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold tabular ${
                      i === 3 ? "border-orange-500/50 text-orange-700" : "border-blue-300 text-blue-600"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {phase === "loading" ? (
          <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-6" role="status">
            <p className="flex items-center gap-2 text-[15px] font-medium text-blue-600">
              <span aria-hidden className={`h-2 w-2 rounded-full bg-blue-500 ${reduced ? "" : "animate-pulse"}`} />
              {copy.loading}
            </p>
            <div aria-hidden className="mt-5 grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-2.5 w-16 rounded-full bg-line-200" />
                  <div className={`mt-2 h-4 w-4/5 rounded-full bg-mist-50 ${reduced ? "" : "animate-pulse"}`} />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {phase === "error" ? (
          <div className="rounded-[var(--radius-card)] border border-orange-500/40 bg-white p-6" role="alert">
            <p className="flex items-start gap-2 text-[15px] text-orange-700">
              <CircleAlert aria-hidden size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              {error}
            </p>
          </div>
        ) : null}

        {phase === "not-incident" && result ? (
          <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-6">
            <Label variant={modeLabel[result.mode].variant} text={modeLabel[result.mode].text} />
            <p className="mt-4 flex items-start gap-2 text-[17px] font-semibold">
              <CircleAlert aria-hidden size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blue-600" />
              {copy.notFaultTitle}
            </p>
            <p className="mt-2 text-[15px] text-ink-500">{copy.notFaultHint}</p>
          </div>
        ) : null}

        {phase === "result" && result ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Label variant={modeLabel[result.mode].variant} text={modeLabel[result.mode].text} />
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] px-2.5 py-1.5 text-[13px] font-medium text-ink-500 hover:bg-white hover:text-navy-900"
              >
                <RotateCcw aria-hidden size={14} strokeWidth={1.5} />
                Thử câu khác
              </button>
            </div>

            <IncidentCardView card={result.card} approved={approved} />

            {/* Tác động lên kế hoạch (mô phỏng minh họa) */}
            <section aria-labelledby="m6-impact" className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 id="m6-impact" className="flex items-center gap-2 text-[16px] font-semibold">
                  <Gauge aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />
                  Mô hình tính tác động lên kế hoạch
                </h3>
                <Label variant="sim" text={labels.simShort} />
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {impact.map((x, i) => (
                  <div
                    key={x.label}
                    className={`rounded-[12px] border border-line-200 bg-mist-50 p-3.5 ${reduced ? "" : "motion-safe:animate-[m6-in_.45s_var(--ease-brand)_both]"}`}
                    style={reduced ? undefined : { animationDelay: `${i * 90}ms` }}
                  >
                    <dt className="text-[12px] font-medium uppercase tracking-[0.06em] text-ink-500">{x.label}</dt>
                    <dd className="mt-1 text-[17px] font-semibold leading-snug text-navy-900">{x.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Phương án phục hồi (mô phỏng minh họa) */}
            <section aria-labelledby="m6-options" className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 id="m6-options" className="flex items-center gap-2 text-[16px] font-semibold">
                  <Route aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />
                  Tác nhân AI soạn phương án phục hồi
                </h3>
                <Label variant="sim" text={labels.simShort} />
              </div>
              <div role="radiogroup" aria-label="Chọn phương án phục hồi" className="mt-4 flex flex-col gap-2">
                {options.map((o) => {
                  const on = picked === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      disabled={approved}
                      onClick={() => setPicked(o.id)}
                      className={`grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-[12px] border p-3.5 text-left transition-colors duration-200 disabled:cursor-default sm:grid-cols-[auto_minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] ${
                        on ? "border-blue-500 bg-blue-100/60" : "border-line-200 bg-white hover:border-blue-300"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${on ? "border-blue-600 bg-blue-600" : "border-line-200"}`}
                      >
                        {on ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[15px] font-semibold text-navy-900">
                          {o.id}. {o.label}
                        </span>
                        {o.recommended ? <span className="text-[12px] font-medium text-blue-600">Mô hình dự báo tốt nhất</span> : null}
                      </span>
                      <Stat k="Sản lượng bù" v={o.recovered} />
                      <Stat k="Đơn đúng hạn" v={o.onTime} />
                      <Stat k="Chi phí thêm" v={o.cost} />
                      <span className="col-start-2 text-[13px] text-ink-500 sm:col-span-4 sm:col-start-2">Cần kiểm tra: {o.check}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line-200 pt-5">
                {approved ? (
                  <p role="status" className="flex items-center gap-2 text-[15px] font-medium text-orange-700">
                    <CircleCheck aria-hidden size={20} strokeWidth={1.5} />
                    Đã duyệt phương án {pickedOption?.id}. Cuối ngày, sản lượng thực tế được so với dự báo; mô hình tự học.
                  </p>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setApproved(true)}
                      disabled={!pickedOption}
                      className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-orange-500 px-5 py-2.5 text-[15px] font-semibold text-navy-900 shadow-[0_12px_28px_-14px_rgba(232,98,10,0.8)] transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
                    >
                      <Check aria-hidden size={18} strokeWidth={1.5} />
                      Duyệt phương án {pickedOption?.id ?? ""}
                    </button>
                    <span className="text-[13px] text-ink-500">Tác nhân AI chỉ đề xuất; Trưởng phòng Sản xuất quyết định.</span>
                  </>
                )}
              </div>
            </section>
            <style>{`@keyframes m6-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
          </>
        ) : null}
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <span className="col-start-2 flex items-baseline gap-2 sm:col-start-auto sm:flex-col sm:gap-0">
      <span className="text-[12px] text-ink-500">{k}</span>
      <span className="tabular text-[14px] font-medium text-navy-900">{v}</span>
    </span>
  );
}

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">{label}</dt>
      <dd className="mt-1 text-[16px] leading-snug text-navy-900">{children}</dd>
    </div>
  );
}

const Missing = () => <span className="text-ink-500">Chưa rõ</span>;

function IncidentCardView({ card, approved }: { card: IncidentCard; approved: boolean }) {
  const bars = severityBars[card.muc_do];
  return (
    <article
      aria-label="Thẻ sự cố"
      className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(10,31,68,0.45)] sm:p-6"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[16px] font-semibold">
          <AlertTriangle aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />
          Thẻ sự cố
        </h3>
        {approved ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-100 px-3 py-1 text-[13px] font-medium text-orange-700">
            <CircleCheck aria-hidden size={14} strokeWidth={1.5} />
            Đã duyệt phương án
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-200 bg-mist-50 px-3 py-1 text-[13px] font-medium text-ink-500">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Chờ duyệt phương án
          </span>
        )}
      </header>
      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <Field label="Khu vực">{card.khu_vuc || <Missing />}</Field>
        <Field label="Dây chuyền">{card.day_chuyen || <Missing />}</Field>
        <Field label="Sự cố" wide>
          {card.su_co || <Missing />}
        </Field>
        <Field label="Bắt đầu">{card.thoi_gian ? <span className="tabular">{card.thoi_gian}</span> : <Missing />}</Field>
        <Field label="Lô">{card.lo ? <span className="tabular">Lô {card.lo}</span> : <Missing />}</Field>
        <Field label="Mức độ">
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden className="flex items-end gap-[3px]">
              {[1, 2, 3].map((i) => (
                <span key={i} className={`w-[5px] rounded-sm ${i <= bars ? "bg-navy-900" : "bg-line-200"}`} style={{ height: 6 + i * 4 }} />
              ))}
            </span>
            {card.muc_do}
          </span>
        </Field>
      </dl>
      {card.thong_tin_con_thieu.length ? (
        <div className="mt-5 border-t border-line-200 pt-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">Thông tin còn thiếu</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {card.thong_tin_con_thieu.map((m) => (
              <li key={m} className="rounded-full border border-dashed border-blue-300 bg-blue-100/50 px-3 py-1 text-[13px] text-navy-900">
                {m}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
