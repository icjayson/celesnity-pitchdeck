import type { Block } from "@/decks/types";
import { RichText } from "./RichText";
import { DataTable } from "./DataTable";
import { Photo } from "./Photo";
import { Video } from "./Video";
import { Label } from "./Label";
import { ModuleSlot } from "./ModuleSlot";
import { ArrowRight, ChevronRight } from "lucide-react";
import { KeyValue, Cards, Steps, Timeline, Compare, Chips, Pillars } from "./Visuals";

/**
 * Hiển thị một dãy khối nội dung. `skipModules` dùng cho bản in.
 * `partner`: tên ngắn của khách hàng, để thẻ của khách hàng có viền orange.
 */
export function Blocks({ blocks, skipModules = false, partner }: { blocks: Block[]; skipModules?: boolean; partner?: string }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} skipModules={skipModules} partner={partner} />
      ))}
    </div>
  );
}

function BlockView({ block: b, skipModules, partner }: { block: Block; skipModules: boolean; partner?: string }) {
  switch (b.kind) {
    case "lead":
      return (
        <p className="text-[18px] leading-relaxed sm:text-[22px]">
          <RichText text={b.text} />
        </p>
      );
    case "p":
      return (
        <p className="whitespace-pre-line">
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
        <Tag className={`flex flex-col gap-3 pl-6 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-blue-500`}>
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
      return <Cards head={b.head} rows={b.rows} cols={b.cols} tone={b.tone} partner={partner} />;
    case "steps":
      return <Steps head={b.head} rows={b.rows} layout={b.layout} />;
    case "timeline":
      return <Timeline head={b.head} rows={b.rows} />;
    case "compare":
      return <Compare head={b.head} rows={b.rows} />;
    case "pillars":
      return <Pillars items={b.items} />;
    case "chips":
      return <Chips items={b.items} tone={b.tone} />;
    case "quote":
      if (b.emphasis)
        return (
          <blockquote className="relative mt-6 overflow-hidden rounded-[24px] bg-navy-950 px-6 py-12 text-white shadow-[0_40px_90px_-40px_rgba(10,31,68,0.8)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
            <span aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
            <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-orange-500" />
            <p className="relative whitespace-pre-line text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] sm:text-[48px] lg:text-[60px]">
              <RichText text={b.text} strongClass="font-semibold text-orange-500" />
            </p>
          </blockquote>
        );
      return (
        <blockquote className="border-l-0 text-[22px] leading-snug sm:text-[28px]">
          <span aria-hidden className="mb-3 block h-1 w-12 rounded-full bg-orange-500" />
          <RichText
            text={b.text}
            strongClass="font-semibold text-orange-600"
          />
        </blockquote>
      );
    case "statement":
      return (
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <p className="relative self-start pl-6 text-[26px] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[32px]">
            <span aria-hidden className="absolute bottom-1 left-0 top-1 w-1 rounded-full bg-orange-500" />
            <RichText text={b.highlight} strongClass="font-semibold text-orange-600" />
          </p>
          <div className="flex flex-col gap-5 text-[16px] leading-relaxed lg:pt-1">
            <p className="muted">
              <RichText text={b.context} />
            </p>
            <p className="flex gap-3">
              <ArrowRight aria-hidden size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-blue-500" />
              <span>
                <RichText text={b.conclusion} />
              </span>
            </p>
          </div>
        </div>
      );
    case "note":
      return (
        <p className="muted text-[14px] leading-relaxed">
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
    case "photo":
      return <Photo photo={b.photo} />;
    case "video":
      return <Video video={b.video} />;
    case "media":
      return (
        <div
          className={`grid grid-cols-1 items-start gap-8 lg:gap-12 ${
            b.side === "left" ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          }`}
        >
          <div className={`flex flex-col gap-6 ${b.side === "left" ? "lg:order-2" : ""}`}>
            {b.blocks.map((x, i) => (
              <BlockView key={i} block={x} skipModules={skipModules} partner={partner} />
            ))}
          </div>
          <Photo photo={b.photo} className={b.side === "left" ? "lg:order-1" : "lg:justify-self-end"} />
        </div>
      );
  }
}
