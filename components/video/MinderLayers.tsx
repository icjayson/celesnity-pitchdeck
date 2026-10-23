"use client";

/**
 * Sơ đồ hai lớp của Minder cho trang /minder-video: dùng lại FlowStack của M7 (deck SCG), bản tiếng Anh, tông tối.
 * Không cần DeckProvider: chữ lấy từ uiFor("en"), nội dung từng lớp viết sẵn ở đây (bản chung, không riêng nhà máy nào).
 * Bấm khối, nhãn hoặc ô "Authorised people" để mở mô tả lớp đó trong MinderLayerDetail, như trong deck.
 */
import { uiFor } from "@/lib/i18n";
import { FLOW_ANCHOR, FLOW_H, FlowStack, LABEL_X, STACK_W, type FlowKey } from "@/components/modules/M7/Stack";
import { MotionToggle, useMotionGate } from "@/components/modules/shared/motion";

const ui = uiFor("en");

type Layer = { digit: string; name: string; role: string; nick: string; what: string };

export const LAYERS: Record<FlowKey, Layer> = {
  wm: {
    digit: "1",
    name: "World Model",
    role: "Forecast",
    nick: "the brain that understands the plant",
    what: 'Learns how machines, lines and the whole plant respond to decisions; forecasts with a level of confidence; says "I don\'t know" when it meets a situation with no data, and never makes up a result',
  },
  minder: {
    digit: "2",
    name: "Minder",
    role: "Record",
    nick: "the plant's memory",
    what: "Reads machine signals · records work by voice · connects to existing systems · manages permissions · keeps every decision and every command",
  },
  people: {
    digit: "",
    name: "Authorised people",
    role: "Decide",
    nick: "",
    what: "Approve every command sent to the machine, set setpoint limits, make quality and dispatch decisions",
  },
};

export function MinderLayersDiagram({
  active,
  onPick,
  className = "",
}: {
  active: FlowKey;
  onPick: (k: FlowKey) => void;
  className?: string;
}) {
  const gate = useMotionGate<HTMLDivElement>();

  return (
    <figure ref={gate.ref} className={`relative m-0 ${className}`}>
      <figcaption className="sr-only">
        Minder in two layers. The World Model forecasts and recommends; people, machines, software and robots carry it out;
        Minder records everything; authorised people approve. An improvement loop feeds what Minder records back to the World
        Model.
      </figcaption>
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="w-[165%] sm:w-full">
            <FlowStack
              active={active}
              onPick={onPick}
              play={gate.play}
              reduced={gate.reduced}
              sources={ui.dataSources}
              people={LAYERS.people.name}
              loopLabel={ui.improvementLoop}
              tone="dark"
            />
          </div>
        </div>
        {/* nhãn hai khối: lưới dưới sơ đồ trên điện thoại, đặt cạnh từng khối từ sm trở lên */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:pointer-events-none sm:absolute sm:inset-0 sm:mt-0 sm:block">
          {(["wm", "minder"] as const).map((k) => {
            const l = LAYERS[k];
            const on = active === k;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                aria-controls="minder-layer-detail"
                onClick={() => onPick(k)}
                style={{ left: `${(LABEL_X / STACK_W) * 100}%`, top: `${((FLOW_ANCHOR[k] - (on ? 6 : 0)) / FLOW_H) * 100}%` }}
                className={`flex items-center gap-2.5 rounded-[var(--radius-control)] border px-2.5 py-2 text-left transition-[background-color,border-color,color,top] duration-[450ms] ease-[var(--ease-brand)] sm:pointer-events-auto sm:absolute sm:max-w-[37%] sm:-translate-y-1/2 sm:px-3 ${
                  on
                    ? "border-white bg-white text-navy-900 shadow-[0_16px_40px_-20px_rgba(47,123,246,0.7)]"
                    : "border-navy-700 bg-navy-900/80 text-white hover:border-blue-400"
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold ${
                    on ? "border-blue-600/40 text-blue-600" : "border-blue-300/50 text-blue-300"
                  }`}
                >
                  {l.digit}
                </span>
                <span className="flex flex-col">
                  <span className="whitespace-nowrap text-[13px] font-semibold leading-snug sm:text-[14px]">{l.name}</span>
                  <span className={`text-[12px] ${on ? "text-ink-500" : "text-blue-300"}`}>{l.role}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <MotionToggle paused={gate.userPaused} onToggle={gate.toggle} reduced={gate.reduced} tone="dark" />
      </div>
    </figure>
  );
}

/** Mô tả lớp đang chọn, giống khung dưới sơ đồ M7 trong deck */
export function MinderLayerDetail({ active, className = "" }: { active: FlowKey; className?: string }) {
  const cur = LAYERS[active];
  const human = active === "people";
  return (
    <div
      id="minder-layer-detail"
      aria-live="polite"
      className={`rounded-[var(--radius-card)] border p-5 sm:p-7 ${
        human ? "border-orange-500/50 bg-orange-500/[0.06]" : active === "wm" ? "border-blue-400/50 bg-blue-500/[0.08]" : "border-navy-700 bg-navy-900/60"
      } ${className}`}
    >
      <div key={active} className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:gap-8">
        <div className="flex flex-col gap-1.5">
          <span
            className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.1em] ${
              human ? "bg-orange-500/20 text-orange-100" : "bg-white text-navy-900"
            }`}
          >
            {cur.role}
          </span>
          <p className="mt-1 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-white">
            {cur.digit ? (
              <span
                aria-hidden
                className="mr-2 inline-flex h-7 w-7 -translate-y-px items-center justify-center rounded-full border border-blue-300/50 align-middle text-[14px] font-semibold text-blue-300"
              >
                {cur.digit}
              </span>
            ) : null}
            {cur.name}
          </p>
          {cur.nick ? <p className="text-[15px] italic text-blue-300">“{cur.nick}”</p> : null}
        </div>
        <p className="max-w-[70ch] text-[16px] leading-relaxed text-white sm:pt-1">
          <span className="mb-1 block text-[12px] font-medium uppercase tracking-[0.1em] text-blue-300">What it does</span>
          {cur.what}
        </p>
      </div>
    </div>
  );
}
