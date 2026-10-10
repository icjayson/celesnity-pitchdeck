"use client";
/**
 * M6 kiểu "defect" (#thu-ngay): "Thử làm QA".
 * Lời báo lỗi (giọng nói / gõ / câu mẫu) → /api/extract → hồ sơ lỗi gắn VIN → ca tương tự → truy xuất theo lô → phương án → QA duyệt.
 * Nhãn trung thực: chỉ mode "ai" mới ghi "AI thật"; ca tương tự, truy xuất và phương án là mô phỏng minh họa.
 * Kịch bản sau thẻ: câu mẫu → kịch bản của câu đó; câu khác → kịch bản mặc định, kèm ghi chú.
 */
import { useRef, useState } from "react";
import { CircleAlert, ClipboardList, Info, RotateCcw } from "lucide-react";
import type { DefectStory } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { Label } from "@/components/shared/Label";
import { defectOffline, type DefectMode, type DefectResult } from "@/lib/ai/defectRules";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { RadioInput } from "./RadioInput";
import { DefectCardView, DefectOptions, DefectSimilar, DefectTrace } from "./DefectPanels";

type Phase = "idle" | "loading" | "result" | "not-fault" | "error";

function isResult(x: unknown): x is DefectResult {
  if (!x || typeof x !== "object") return false;
  const r = x as Partial<DefectResult>;
  return (
    (r.mode === "ai" || r.mode === "rules" || r.mode === "sample") &&
    !!r.card &&
    typeof r.card.la_bao_loi === "boolean" &&
    typeof r.card.vin === "string" &&
    Array.isArray(r.card.thong_tin_con_thieu)
  );
}

const normalize = (s: string) => s.trim().replace(/\s+/g, " ");

export function DefectFlow() {
  const { slug, labels, scenarios } = useDeck();
  const m6 = scenarios.m6!;
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<DefectResult | null>(null);
  const [story, setStory] = useState<{ data: DefectStory; illustrative: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);
  const reqId = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);
  if (m6.kind !== "defect") return null;
  const { copy, fallback, stories, defaultStory } = m6;

  const modeLabel: Record<DefectMode, { variant: "ai" | "sim"; text: string }> = {
    ai: { variant: "ai", text: copy.aiLabel },
    rules: { variant: "sim", text: "Chế độ offline: trích xuất theo quy tắc" },
    sample: { variant: "sim", text: "Kết quả soạn sẵn" },
  };

  const storyFor = (input: string) => {
    const own = stories[normalize(input)];
    return own ? { data: own, illustrative: false } : { data: stories[defaultStory], illustrative: true };
  };

  const run = async (raw: string) => {
    const input = raw.trim().slice(0, 300);
    if (!input) return;
    const id = ++reqId.current;
    setPhase("loading");
    setApproved(false);
    setPicked(null);
    setError(null);
    let r: DefectResult;
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
        setError(msg ?? "Chưa lập được hồ sơ lỗi. Quý vị thử lại nhé.");
        setPhase("error");
        return;
      }
      r = isResult(json) ? json : defectOffline(input, fallback);
    } catch {
      // Mất mạng hoặc API lỗi: câu mẫu → kết quả soạn sẵn, câu khác → quy tắc
      r = defectOffline(input, fallback);
    }
    if (id !== reqId.current) return;
    const s = storyFor(input);
    setResult(r);
    setStory(s);
    setPicked(s.data.options.find((o) => o.recommended)?.id ?? s.data.options[0]?.id ?? null);
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
    setStory(null);
    setApproved(false);
    setPicked(null);
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

        {phase === "not-fault" && result ? (
          <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-6">
            <Label variant={modeLabel[result.mode].variant} text={modeLabel[result.mode].text} />
            <p className="mt-4 flex items-start gap-2 text-[17px] font-semibold">
              <CircleAlert aria-hidden size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blue-600" />
              {copy.notFaultTitle}
            </p>
            <p className="mt-2 text-[15px] text-ink-500">{copy.notFaultHint}</p>
          </div>
        ) : null}

        {phase === "result" && result && story ? (
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

            <DefectCardView card={result.card} approved={approved} />

            {story.illustrative ? (
              <p className="flex items-center gap-2 text-[13px] text-ink-500">
                <Info aria-hidden size={14} strokeWidth={1.5} className="shrink-0 text-blue-600" />
                Phần sau là kịch bản minh họa cố định.
              </p>
            ) : null}

            <DefectSimilar similar={story.data.similar} simText={labels.simShort} reduced={reduced} />
            <DefectTrace key={story.data.trace.lot} trace={story.data.trace} simText={labels.simShort} reduced={reduced} />
            <DefectOptions
              options={story.data.options}
              approveNote={story.data.approveNote}
              simText={labels.simShort}
              picked={picked}
              onPick={setPicked}
              approved={approved}
              onApprove={() => setApproved(true)}
            />
            <style>{`@keyframes m6-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
          </>
        ) : null}
      </div>
    </div>
  );
}
