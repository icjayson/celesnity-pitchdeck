"use client";
/**
 * M6 "Thử làm công nhân" (#thu-ngay, nền mist). Xem docs/implementation-plan.md mục 2.
 * Lời báo lỗi (giọng nói / gõ / câu mẫu) → /api/extract → thẻ hồ sơ → nối dữ liệu → xếp hạng lô → kế hoạch → Trưởng ca duyệt.
 * Nhãn trung thực theo mode: chỉ "ai" mới ghi "AI thật".
 */
import { useRef, useState } from "react";
import { ClipboardList, CircleAlert, RotateCcw } from "lucide-react";
import type { CaseCard } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { Label } from "@/components/shared/Label";
import { extractOffline, type ExtractMode } from "@/lib/ai/extractRules";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { RadioInput } from "./M6/RadioInput";
import { CaseCardView } from "./M6/CaseCardView";
import { LotRanking } from "./M6/LotRanking";
import { InspectionPlan } from "./M6/InspectionPlan";
import { IncidentFlow } from "./M6/IncidentFlow";
import { DefectFlow } from "./M6/DefectFlow";

type Result = { card: CaseCard; mode: ExtractMode };
type Phase = "idle" | "loading" | "result" | "not-fault" | "error";

const modeLabelOf = (aiText: string): Record<ExtractMode, { variant: "ai" | "sim"; text: string }> => ({
  ai: { variant: "ai", text: aiText },
  rules: { variant: "sim", text: "Chế độ offline: trích xuất theo quy tắc" },
  sample: { variant: "sim", text: "Kết quả soạn sẵn" },
});

function isExtractResult(x: unknown): x is Result {
  if (!x || typeof x !== "object") return false;
  const r = x as Partial<Result>;
  return (
    (r.mode === "ai" || r.mode === "rules" || r.mode === "sample") &&
    !!r.card &&
    typeof r.card.la_bao_loi === "boolean" &&
    Array.isArray(r.card.thong_tin_con_thieu)
  );
}

export default function M6({ variant }: { variant?: string }) {
  void variant;
  const m6 = useDeck().scenarios.m6!;
  if (m6.kind === "incident") return <IncidentFlow />;
  if (m6.kind === "defect") return <DefectFlow />;
  return <CaseFlow fallback={m6.fallback} />;
}

/** Luồng "case": lời báo lỗi → thẻ hồ sơ → xếp hạng lô → kế hoạch kiểm tra */
function CaseFlow({ fallback }: { fallback: Record<string, CaseCard> }) {
  const { slug, scenarios } = useDeck();
  const { copy } = scenarios.m6!;
  const steps = copy.steps;
  const modeLabel = modeLabelOf(copy.aiLabel);
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);
  const reqId = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const run = async (raw: string) => {
    const input = raw.trim().slice(0, 300);
    if (!input) return;
    const id = ++reqId.current;
    setPhase("loading");
    setApproved(false);
    setError(null);

    let r: Result;
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
        setError(msg ?? "Chưa lập được hồ sơ. Quý vị thử lại nhé.");
        setPhase("error");
        return;
      }
      r = isExtractResult(json) ? json : extractOffline(input, fallback);
    } catch {
      // Mất mạng hoặc API lỗi: câu mẫu → kết quả soạn sẵn, câu khác → quy tắc
      r = extractOffline(input, fallback);
    }
    if (id !== reqId.current) return;
    setResult(r);
    setPhase(r.card.la_bao_loi ? "result" : "not-fault");
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
    setText("");
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      <RadioInput value={text} onChange={setText} onSubmit={(t) => void run(t)} busy={phase === "loading"} reduced={reduced} />

      <div ref={resultRef} className="flex min-w-0 scroll-mt-24 flex-col gap-5" aria-live="polite" aria-busy={phase === "loading"}>
        {phase === "idle" ? (
          <div className="flex h-full min-h-[320px] flex-col justify-center rounded-[var(--radius-card)] border border-dashed border-line-200 bg-white/60 p-6 sm:p-8">
            <ClipboardList aria-hidden size={28} strokeWidth={1.5} className="text-blue-600" />
            <p className="mt-4 text-[17px] font-semibold">{copy.idleTitle}</p>
            <ol className="mt-4 flex flex-col gap-2.5">
              {steps.map((s, i) => (
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

        {phase === "not-fault" && result ? (
          <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-6">
            <Label variant={modeLabel[result.mode].variant} text={modeLabel[result.mode].text} />
            <p className="mt-4 flex items-start gap-2 text-[17px] font-semibold">
              <CircleAlert aria-hidden size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blue-600" />
              {copy.notFaultTitle}
            </p>
            <p className="mt-2 text-[15px] text-ink-500">
              {copy.notFaultHint}
            </p>
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
            <CaseCardView card={result.card} approved={approved} />
            <LotRanking card={result.card} reduced={reduced} />
            <InspectionPlan card={result.card} approved={approved} onApprove={() => setApproved(true)} />
          </>
        ) : null}
      </div>
    </div>
  );
}
