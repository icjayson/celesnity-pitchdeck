"use client";
/**
 * M20 biến thể "rule" (#quy-tac): quy tắc do quản lý đặt (trái) và output quy tắc đó tạo ra (phải).
 * Đổi ngưỡng: output đổi theo, kể cả trường hợp Minder AI không gửi gì.
 */
import { useId, useState } from "react";
import { BellOff } from "lucide-react";
import type { FeedScenario } from "@/decks/types";
import { RichText } from "@/components/shared/RichText";
import { Frame } from "./Frame";
import { OutputCard } from "./OutputCard";
import { RuleCard } from "./RuleCard";

export function RuleDemo({ data, simLabel }: { data: FeedScenario; simLabel: string }) {
  const uid = useId();
  const item = data.items.find((i) => i.id === data.ruleDemoId);
  const rule = item ? data.rules.find((r) => r.id === item.ruleId) : undefined;
  const [value, setValue] = useState(rule?.threshold?.value ?? "");
  if (!item || !rule) return null;
  const out = item.byThreshold?.[value];
  const send = out ? out.send : true;

  return (
    <Frame product={data.product} dayLabel={data.dayLabel} simLabel={simLabel} sidebar={data.copy.sidebar} active={data.copy.sidebar.length - 1}>
      <div className="grid grid-cols-1 gap-4 p-3 sm:p-5 lg:grid-cols-2 lg:gap-5">
        <section className="flex flex-col gap-2.5">
          <p className="mf-muted text-[12.5px] font-medium">{data.copy.ruleTitle}</p>
          <RuleCard rule={rule} data={data} threshold={value} onThreshold={setValue} headingId={`${uid}-rule`} />
        </section>
        <section className="flex flex-col gap-2.5" aria-live="polite">
          <p className="mf-muted text-[12.5px] font-medium">{data.copy.outputTitle}</p>
          {send ? (
            <OutputCard item={item} data={data} />
          ) : (
            <div className="mf-line flex flex-col items-start gap-3 rounded-[12px] border border-dashed p-5">
              <span className="mf-muted-bg flex h-9 w-9 items-center justify-center rounded-[10px]">
                <BellOff aria-hidden size={17} strokeWidth={1.5} />
              </span>
              <p className="text-[14px] font-semibold">{data.copy.notSent}</p>
            </div>
          )}
          {out ? (
            <p className="mf-muted text-[12.5px] leading-snug">
              <RichText text={out.note} />
            </p>
          ) : null}
        </section>
      </div>
    </Frame>
  );
}
