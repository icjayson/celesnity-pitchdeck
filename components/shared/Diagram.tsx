import { Fragment, type CSSProperties } from "react";
import type { DiagramBranch, DiagramFlow, DiagramNode, DiagramTone, Rich } from "@/decks/types";
import { RichText } from "./RichText";

/**
 * Sơ đồ kiến trúc dạng cây hội tụ sang phải. Đường nối vẽ bằng CSS (không đo DOM), nên chạy cả ở bản in.
 * Mỗi nhánh xuất ra ở giữa chiều cao của nó; điểm gộp là cột bên phải các nhánh.
 * Điện thoại: cuộn ngang như bảng dữ liệu. Bản in: thu nhỏ cho vừa khổ giấy (app/globals.css, .diagram-scroll).
 */
export function Diagram({
  flow,
  legend,
  caption,
  nodeWidth = 120,
}: {
  flow: DiagramFlow;
  legend?: { tone: DiagramTone; label: Rich }[];
  caption?: Rich;
  nodeWidth?: number;
}) {
  return (
    <figure className="flex break-inside-avoid flex-col gap-3" style={{ "--dg-node": `${nodeWidth}px` } as CSSProperties}>
      <div className="diagram-scroll overflow-x-auto">
        <div className="w-max min-w-full pb-2 pt-1">
          <Flow flow={flow} />
        </div>
      </div>
      {legend?.length ? (
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
          {legend.map((l, i) => (
            <li key={i} className="flex items-center gap-2">
              <span aria-hidden className={`h-3.5 w-5 rounded-[4px] ${TONE[l.tone]}`} />
              <RichText text={l.label} />
            </li>
          ))}
        </ul>
      ) : null}
      {caption ? (
        <figcaption className="muted text-[14px] leading-relaxed">
          <RichText text={caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

const LINE = "bg-ink-500/50";

const TONE: Record<DiagramTone, string> = {
  plain: "vis-card",
  edge: "border border-blue-500/50 bg-blue-500/10",
  platform: "border border-navy-900 bg-navy-900 text-white",
};

const isFlow = (b: DiagramBranch | DiagramFlow): b is DiagramFlow => "branches" in b;

function Flow({ flow }: { flow: DiagramFlow }) {
  const n = flow.branches.length;
  const body = (
    <div className="flex items-center">
      <div className="flex flex-col">
        {flow.branches.map((b, i) => (
          <div key={i} className="relative flex items-center justify-end py-1 pr-6">
            {isFlow(b) ? <Flow flow={b} /> : <Branch branch={b} />}
            <span aria-hidden className={`absolute right-0 top-1/2 h-px w-6 ${LINE}`} />
            {n > 1 ? (
              <span
                aria-hidden
                className={`absolute right-0 w-px ${LINE}`}
                style={{ top: i === 0 ? "50%" : 0, bottom: i === n - 1 ? "50%" : 0 }}
              />
            ) : null}
          </div>
        ))}
      </div>
      {flow.then.map((t, i) => (
        <Fragment key={i}>
          <Arrow label={i === 0 ? flow.via : undefined} />
          <Node node={t} />
        </Fragment>
      ))}
      {/* Trong khung: nối điểm gộp (hoặc ô cuối) ra tới mép khung, nơi nhánh cha nhận tiếp */}
      {flow.group ? <span aria-hidden className={`-mr-4 h-px w-4 shrink-0 ${LINE}`} /> : null}
    </div>
  );
  if (!flow.group) return body;
  return (
    <div className="relative rounded-[14px] border border-dashed border-ink-500/45 px-4 pb-3 pt-8">
      <span className="muted absolute left-4 top-2.5 text-[11.5px] font-semibold uppercase tracking-[0.08em]">
        <RichText text={flow.group} />
      </span>
      {body}
    </div>
  );
}

function Branch({ branch }: { branch: DiagramBranch }) {
  return (
    <div className="flex items-center">
      {branch.nodes.map((node, i) => (
        <Fragment key={i}>
          {i > 0 ? <Arrow label={branch.via?.[i - 1]} /> : null}
          <Node node={node} />
        </Fragment>
      ))}
    </div>
  );
}

function Node({ node }: { node: DiagramNode }) {
  const tone = node.tone ?? "plain";
  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center rounded-[10px] px-3 py-1.5 text-center ${
        tone === "platform" ? "w-[calc(var(--dg-node)+20px)]" : "w-[var(--dg-node)]"
      } ${TONE[tone]}`}
    >
      <span className="text-[13px] font-semibold leading-snug">
        <RichText text={node.label} />
      </span>
      {node.sub ? (
        <span className={`text-[11.5px] leading-snug ${tone === "platform" ? "text-white/75" : "muted"}`}>
          <RichText text={node.sub} />
        </span>
      ) : null}
    </div>
  );
}

/** Mũi tên một chiều; nhãn (giao thức, "chỉ đọc") nằm trên đường */
function Arrow({ label }: { label?: Rich }) {
  return (
    <span className={`relative flex shrink-0 items-center ${label ? "w-[72px]" : "w-9"}`}>
      {label ? (
        <span className="muted absolute inset-x-1 bottom-full mb-1 text-center text-[11px] font-medium leading-tight">
          <RichText text={label} />
        </span>
      ) : null}
      <span className={`h-px flex-1 ${LINE}`} />
      <svg aria-hidden width="7" height="8" viewBox="0 0 7 8" className="shrink-0 fill-ink-500/80">
        <path d="M0 0 L7 4 L0 8 Z" />
      </svg>
    </span>
  );
}

/** Văn bản thuần của sơ đồ cho gói tri thức: mỗi đường đi từ nguồn tới đích một dòng */
export function diagramPaths(flow: DiagramFlow, plain: (s: string) => string): string[] {
  const nodeText = (x: DiagramNode) => plain(x.label) + (x.sub ? ` (${plain(x.sub)})` : "");
  const tail = flow.then.map(nodeText);
  const out: string[] = [];
  for (const b of flow.branches) {
    if (isFlow(b)) {
      const prefix = b.group ? `${plain(b.group)}: ` : "";
      for (const p of diagramPaths(b, plain)) out.push([prefix + p, ...tail].join(" → "));
    } else {
      out.push([...b.nodes.map(nodeText), ...tail].join(" → "));
    }
  }
  return out;
}
