"use client";
/**
 * M20 biến thể "cover" (#mo-dau): ba thẻ lần lượt hiện trong khung Minder AI rồi lặp lại.
 * Một chuyển động chính; dừng khi ra khỏi khung nhìn; giảm chuyển động thì hiện tĩnh cả ba thẻ.
 */
import { useEffect, useState } from "react";
import type { FeedScenario } from "@/decks/types";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Frame } from "./Frame";
import { OutputCard } from "./OutputCard";

const STEP_MS = 2200;
const HOLD_MS = 3600;

export function Cover({ data, simLabel }: { data: FeedScenario; simLabel: string }) {
  const items = data.coverIds.map((id) => data.items.find((i) => i.id === id)).filter((i): i is FeedScenario["items"][number] => !!i);
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setTimeout(() => setStep((s) => (s > items.length ? 1 : s + 1)), step > items.length ? HOLD_MS : STEP_MS);
    return () => window.clearTimeout(t);
  }, [step, reduced, inView, items.length]);

  const shown = reduced ? items.length : Math.min(step, items.length);

  return (
    <figure ref={ref} className="m-0">
      <Frame product={data.product} dayLabel={data.dayLabel} simLabel={simLabel}>
        <div aria-hidden className="flex flex-col gap-3 p-3 sm:p-4">
          <p className="text-[13px] font-semibold">{data.copy.feedTitle}</p>
          {items.map((item, i) => {
            const on = i < shown;
            return (
              <div
                key={item.id}
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "none" : "translateY(10px)",
                  transition: reduced ? "none" : "opacity 450ms var(--ease-brand), transform 450ms var(--ease-brand)",
                }}
              >
                <OutputCard item={item} data={data} mode="compact" />
              </div>
            );
          })}
        </div>
      </Frame>
      <figcaption className="sr-only">
        {data.product}: {items.map((i) => `${i.time} ${i.title}`).join("; ")}
      </figcaption>
    </figure>
  );
}
