"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Details as DetailsT } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { Blocks } from "./Blocks";
import { RichText } from "./RichText";

/** Lớp "Xem chi tiết": bảng đầy đủ, mở ra khi cần. Phím D trong chế độ trình chiếu mở/đóng. */
export function DetailsPanel({ items, sectionId, forceOpen = false }: { items: DetailsT[]; sectionId: string; forceOpen?: boolean }) {
  const { labels, party } = useDeck();
  const [open, setOpen] = useState<number | null>(forceOpen ? -1 : null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onToggle = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id === sectionId) setOpen((o) => (o === null ? 0 : null));
    };
    window.addEventListener("landing:toggle-details", onToggle);
    return () => window.removeEventListener("landing:toggle-details", onToggle);
  }, [sectionId]);

  // Bản in: hiện thẳng nội dung, không khung và không thanh "Xem chi tiết"
  if (forceOpen)
    return (
      <div className="flex flex-col gap-8">
        {items.map((d, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h3 className="text-[22px] font-semibold tracking-tight sm:text-[26px]">
              <RichText text={d.title} />
            </h3>
            <Blocks blocks={d.blocks} skipModules partner={party.short} />
          </div>
        ))}
      </div>
    );

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {items.map((d, i) => {
        const isOpen = forceOpen || open === -1 || open === i;
        return (
          <div key={i} className="rounded-[var(--radius-card)] border border-current/10">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 rounded-[var(--radius-card)] px-5 py-4 text-left text-[15px] font-medium transition-colors hover:bg-current/[0.04]"
            >
              <span className="flex items-center gap-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-blue-500">{labels.details}</span>
                <span>
                  <RichText text={d.title} />
                </span>
              </span>
              <ChevronDown
                aria-hidden
                size={18}
                strokeWidth={1.5}
                className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-6 pt-1">
                <Blocks blocks={d.blocks} skipModules partner={party.short} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
