import type { Block } from "@/content/types";
import { RichText } from "./RichText";
import { DataTable } from "./DataTable";
import { Label } from "./Label";
import { ModuleSlot } from "./ModuleSlot";
import { ChevronRight } from "lucide-react";
import { KeyValue, Cards, Steps, Timeline, Compare, Chips } from "./Visuals";

/** Hiển thị một dãy khối nội dung. `skipModules` dùng cho bản in. */
export function Blocks({ blocks, skipModules = false }: { blocks: Block[]; skipModules?: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} skipModules={skipModules} />
      ))}
    </div>
  );
}

function BlockView({ block: b, skipModules }: { block: Block; skipModules: boolean }) {
  switch (b.kind) {
    case "lead":
      return (
        <p className="max-w-[68ch] text-[18px] leading-relaxed sm:text-[22px]">
          <RichText text={b.text} />
        </p>
      );
    case "p":
      return (
        <p className="max-w-[68ch]">
          <RichText text={b.text} />
        </p>
      );
    case "h3":
      return (
        <h3 className="pt-4 text-[22px] font-semibold tracking-tight sm:text-[26px]">
          <RichText text={b.text} />
        </h3>
      );
    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag className={`flex max-w-[72ch] flex-col gap-3 pl-6 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-blue-500`}>
          {b.items.map((it, i) => (
            <li key={i} className="pl-1">
              <RichText text={it} />
            </li>
          ))}
        </Tag>
      );
    }
    case "table":
      if (b.printOnly && !skipModules) return null;
      return <DataTable head={b.head} rows={b.rows} caption={b.caption} />;
    case "kv":
      return <KeyValue rows={b.rows} />;
    case "cards":
      return <Cards head={b.head} rows={b.rows} cols={b.cols} tone={b.tone} />;
    case "steps":
      return <Steps head={b.head} rows={b.rows} layout={b.layout} />;
    case "timeline":
      return <Timeline head={b.head} rows={b.rows} />;
    case "compare":
      return <Compare head={b.head} rows={b.rows} />;
    case "chips":
      return <Chips items={b.items} tone={b.tone} />;
    case "quote":
      return (
        <blockquote className="max-w-[60ch] border-l-0 text-[22px] leading-snug sm:text-[28px]">
          <span aria-hidden className="mb-3 block h-1 w-12 rounded-full bg-orange-500" />
          <RichText text={b.text} />
        </blockquote>
      );
    case "note":
      return (
        <p className="muted max-w-[72ch] text-[14px] leading-relaxed">
          <RichText text={b.text} />
        </p>
      );
    case "label":
      return (
        <div>
          <Label variant={b.variant} text={b.text} />
        </div>
      );
    case "flow":
      return (
        <figure className="flex flex-col gap-4">
          <ol className="flex flex-wrap items-center gap-2 text-[15px] font-semibold sm:gap-3 sm:text-[17px]">
            {b.steps.map((s, i) => (
              <li key={i} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`rounded-full px-4 py-2 ${
                    i === b.steps.length - 1 ? "bg-orange-500 text-navy-900" : "bg-navy-900 text-white"
                  }`}
                >
                  <RichText text={s} />
                </span>
                {i < b.steps.length - 1 ? <ChevronRight aria-hidden size={18} className="text-blue-500" /> : null}
              </li>
            ))}
          </ol>
          {b.caption ? (
            <figcaption className="muted text-[14px]">
              <RichText text={b.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    case "signature":
      return (
        <div className="flex flex-col gap-1 pt-2">
          {b.lines.map((l, i) => (
            <span key={i}>
              <RichText text={l} />
            </span>
          ))}
        </div>
      );
    case "module":
      return skipModules ? null : <ModuleSlot id={b.id} variant={b.variant} />;
  }
}
