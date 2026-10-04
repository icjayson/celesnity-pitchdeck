"use client";
/**
 * M8 — Bản đồ Tập đoàn (`#ban-do`), nền sáng.
 * Ba đảo kèm mốc thời gian; bấm đảo hoặc dùng ba tab để mở ngăn thông tin (Nơi · Vai trò · Thời gian · Câu hỏi mô hình trả lời).
 * Dữ liệu lấy từ bảng "Bảng ba mảng" trong lớp chi tiết của section `ban-do`.
 */
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ScrollSteps } from "@/components/shared/ScrollSteps";
import { CalendarRange, MapPin } from "lucide-react";
import { FactoryScene, type IslandId } from "@/components/art/FactoryScene";
import { Label } from "@/components/shared/Label";
import { plainText } from "@/components/shared/RichText";
import type { Section } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";

type Arm = {
  id: IslandId;
  num: string;
  name: string;
  place: string;
  role: string;
  time: string;
  questionsLabel: string;
  questions: string[];
  rowLabels: { place: string; role: string; time: string };
};

function getArms(sections: Section[], ORDER: IslandId[]): Arm[] {
  const s = sections.find((x) => x.id === "ban-do");
  const d = s?.details?.find((x) => plainText(x.title).startsWith("Bảng ba"));
  const t = d?.blocks.find((b) => b.kind === "table");
  if (!t || t.kind !== "table") return [];
  const row = (prefix: string) => t.rows.find((r) => plainText(r[0]).startsWith(prefix));
  const place = row("Nơi");
  const role = row("Vai trò");
  const time = row("Thời gian");
  const q = row("Câu hỏi");
  return ORDER.map((id, i) => {
    const head = plainText(t.head[i + 1] ?? "");
    const m = head.match(/^(\S+)\s+(.*)$/);
    const cell = (r: string[] | undefined) => (r ? plainText(r[i + 1] ?? "") : "");
    return {
      id,
      num: m ? m[1] : String(i + 1),
      name: m ? m[2] : head,
      place: cell(place),
      role: cell(role),
      time: cell(time),
      questionsLabel: q ? plainText(q[0]) : "",
      questions: cell(q)
        .split(/(?<=\?)\s+/)
        .map((x) => x.trim())
        .filter(Boolean),
      rowLabels: {
        place: place ? plainText(place[0]) : "",
        role: role ? plainText(role[0]) : "",
        time: time ? plainText(time[0]) : "",
      },
    };
  });
}

export default function M8(_props: { variant?: string }) {
  const { sections, labels, islands } = useDeck();
  const order = islands.map((x) => x.id);
  /** Đảo cuối là đích đến (orange) */
  const destId = order[order.length - 1];
  const nameOf = (id: IslandId) => islands.find((x) => x.id === id)?.label ?? id;
  const arms = getArms(sections, order);
  const [selected, setSelected] = useState<IslandId>(order[0]);
  const pick = (id: IslandId) => {
    setSelected(id);
  };
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  if (!arms.length) return null;

  const current = arms.find((a) => a.id === selected) ?? arms[0];
  const isDest = current.id === destId;

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % arms.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + arms.length) % arms.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = arms.length - 1;
    else return;
    e.preventDefault();
    pick(arms[next].id);
    tabRefs.current[next]?.focus();
  };

  const notes = Object.fromEntries(
    arms.map((a) => [
      a.id,
      <>
        <span className="tabular text-[12px] font-medium text-ink-500 sm:text-[13px]">{a.time}</span>
        {a.id === destId ? (
          <>
            <span className="text-[12px] font-semibold text-orange-700 sm:text-[13px]">{a.role}</span>
            <span className="hidden sm:block">
              <Label variant="proposal" text={labels.proposal} className="whitespace-nowrap" />
            </span>
          </>
        ) : null}
      </>,
    ]),
  ) as Partial<Record<IslandId, ReactNode>>;

  return (
    <ScrollSteps steps={arms.length} onStep={(i) => setSelected(arms[i].id)} perStepVh={45}>
    <div className="mb-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-12">
      <div className="flex min-w-0 flex-col gap-6">
        <figure className="relative pb-12 sm:pb-16">
          <FactoryScene
            tone="light"
            state={3}
            steelDestination
            showLabels
            selectedIsland={selected}
            onIslandClick={pick}
            islandNotes={notes}
          />
          <figcaption className="sr-only">
            Bản đồ ba mảng: {arms.map((a) => `${a.name}, ${a.role}, ${a.time}`).join("; ")}. Tia sáng đi từ{" "}
            {order.map((id) => nameOf(id).toLowerCase()).join(" sang ")}. Bấm một đảo hoặc dùng các tab để xem chi tiết.
          </figcaption>
        </figure>
        <div className="-mt-10 flex justify-end sm:hidden">
          <Label variant="proposal" text={labels.proposal} />
        </div>

        <div
          role="tablist"
          aria-label="Ba mảng"
          className="grid grid-cols-3 gap-1 rounded-[calc(var(--radius-control)+4px)] border border-line-200 bg-mist-50 p-1"
        >
          {arms.map((a, i) => {
            const on = a.id === selected;
            return (
              <button
                key={a.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`${uid}-tab-${a.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => pick(a.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-control)] px-2 py-2 text-center transition-[background-color,color,box-shadow] duration-300 ease-[var(--ease-brand)] ${
                  on
                    ? "bg-white text-navy-900 shadow-[0_8px_20px_-12px_rgba(10,31,68,0.45)]"
                    : "text-ink-500 hover:bg-white/60 hover:text-navy-900"
                }`}
              >
                <span className="flex items-center gap-1.5 text-[14px] font-semibold leading-tight">
                  {a.id === destId ? <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" /> : null}
                  <span className="truncate">{nameOf(a.id)}</span>
                </span>
                <span className="tabular whitespace-nowrap text-[12px] font-medium text-ink-500">{a.time}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ngăn thông tin */}
      <section
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${current.id}`}
        aria-live="polite"
        className={`rounded-[var(--radius-card)] border bg-white p-6 shadow-[0_20px_50px_-24px_rgba(10,31,68,0.35)] transition-colors duration-500 sm:p-8 ${
          isDest ? "border-orange-500/40" : "border-line-200"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-[13px] font-medium ${
              isDest ? "border-orange-500/40 bg-orange-100 text-orange-700" : "border-blue-300 bg-blue-100 text-navy-900"
            }`}
          >
            <span className="sr-only">{current.rowLabels.role}: </span>
            {current.role}
          </span>
          {isDest ? <Label variant="proposal" text={labels.proposal} /> : null}
        </div>

        <h3 className="mt-4 flex items-baseline gap-3 text-[24px] font-semibold leading-tight tracking-[-0.015em] text-navy-900 sm:text-[28px]">
          <span aria-hidden className="text-blue-500">
            {current.num}
          </span>
          {current.name}
        </h3>

        <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-line-200 py-5 sm:grid-cols-2">
          <div className="flex gap-3">
            <MapPin aria-hidden size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blue-600" />
            <div>
              <dt className="text-[13px] font-medium text-ink-500">{current.rowLabels.place}</dt>
              <dd className="text-[17px] font-medium text-navy-900">{current.place}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <CalendarRange aria-hidden size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blue-600" />
            <div>
              <dt className="text-[13px] font-medium text-ink-500">{current.rowLabels.time}</dt>
              <dd className="tabular whitespace-nowrap text-[17px] font-medium text-navy-900">{current.time}</dd>
            </div>
          </div>
        </dl>

        <h4 className="mt-6 text-[13px] font-medium uppercase tracking-[0.1em] text-ink-500">{current.questionsLabel}</h4>
        <ul className="mt-3 flex flex-col gap-3">
          {current.questions.map((q) => (
            <li key={q} className="flex gap-3 text-[16px] leading-[1.55] text-navy-900">
              <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
    </ScrollSteps>
  );
}
