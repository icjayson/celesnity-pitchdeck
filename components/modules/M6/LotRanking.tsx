"use client";
/**
 * Hoạt ảnh "nối dữ liệu" từ hồ sơ tới các lô, rồi danh sách lô xếp hạng rủi ro (minh họa, m6Ranking).
 * Đây là chuyển động chính của module; tắt khi giảm chuyển động.
 */
import { useEffect, useState } from "react";
import { Network } from "lucide-react";
import type { CaseCard } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { Label } from "@/components/shared/Label";

const ROW = 64; // chiều cao mỗi hàng (px), dùng cho đường nối
const GAP = 8;

type Row = { lo: string; risk: number | null; reason: string; own?: boolean };

export function LotRanking({ card, reduced }: { card: CaseCard; reduced: boolean }) {
  const { labels, scenarios } = useDeck();
  const m6Ranking = scenarios.m6.kind === "case" ? scenarios.m6.ranking : [];
  const own: Row = { lo: card.lo || "chưa rõ", risk: null, reason: "Lô của hồ sơ vừa lập", own: true };
  const rows: Row[] = [own, ...m6Ranking.filter((r) => r.lo !== card.lo)];
  const [linked, setLinked] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setLinked(true);
      return;
    }
    setLinked(false);
    const id = window.setTimeout(() => setLinked(true), 40);
    return () => window.clearTimeout(id);
  }, [card, reduced]);

  const height = rows.length * ROW + (rows.length - 1) * GAP;
  const originY = height / 2;
  const ease = "var(--ease-brand)";

  return (
    <section aria-labelledby="m6-ranking-title" className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="m6-ranking-title" className="flex items-center gap-2 text-[16px] font-semibold">
          <Network aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />
          Mô hình nối dữ liệu và xếp hạng lô cùng rủi ro
        </h3>
        <Label variant="sim" text={labels.simShort} />
      </div>
      <p className="sr-only">
        Danh sách xếp hạng minh họa: lô của hồ sơ đứng đầu, sau đó{" "}
        {m6Ranking
          .filter((r) => r.lo !== card.lo)
          .map((r) => `lô ${r.lo} rủi ro ${Math.round(r.risk * 100)}% (${r.reason})`)
          .join("; ")}
        .
      </p>

      <div className="mt-5 flex gap-3" aria-hidden>
        {/* Đường nối */}
        <svg width="44" height={height} viewBox={`0 0 44 ${height}`} className="shrink-0 overflow-visible">
          <circle cx="6" cy={originY} r="5" className="fill-blue-600" />
          <circle cx="6" cy={originY} r="10" className="fill-blue-500/15" />
          {rows.map((_, i) => {
            const y = i * (ROW + GAP) + ROW / 2;
            const d = `M6 ${originY} C 26 ${originY}, 20 ${y}, 42 ${y}`;
            return (
              <path
                key={i}
                d={d}
                pathLength={1}
                fill="none"
                strokeWidth={1.5}
                className={i === 0 ? "stroke-blue-600" : "stroke-blue-300"}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: linked ? 0 : 1,
                  transition: reduced ? "none" : `stroke-dashoffset 520ms ${ease} ${i * 90}ms`,
                }}
              />
            );
          })}
        </svg>

        <ol className="flex min-w-0 flex-1 flex-col" style={{ gap: GAP }}>
          {rows.map((r, i) => (
            <li
              key={r.lo + i}
              className={`flex min-w-0 flex-col justify-center rounded-[var(--radius-control)] border px-3.5 ${
                r.own ? "border-blue-300 bg-blue-100/60" : "border-line-200 bg-mist-50"
              }`}
              style={{
                height: ROW,
                opacity: linked ? 1 : 0.35,
                transition: reduced ? "none" : `opacity 400ms ${ease} ${120 + i * 90}ms`,
              }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[15px] font-semibold tabular">
                  <span className="mr-2 text-ink-500">{i + 1}</span>Lô {r.lo}
                </span>
                <span className="shrink-0 text-[13px] tabular text-ink-500">
                  {r.risk === null ? "Đã báo lỗi" : `${Math.round(r.risk * 100)}%`}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-3">
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line-200">
                  <span
                    className={`absolute inset-y-0 left-0 rounded-full ${r.own ? "bg-blue-600" : "bg-blue-500"}`}
                    style={{
                      width: linked ? `${(r.risk ?? 1) * 100}%` : "0%",
                      transition: reduced ? "none" : `width 600ms ${ease} ${200 + i * 90}ms`,
                    }}
                  />
                </span>
                <span className="hidden w-[46%] truncate text-[12px] text-ink-500 sm:block">{r.reason}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <ul className="mt-3 flex flex-col gap-1 text-[12px] text-ink-500 sm:hidden">
        {rows.map((r, i) => (
          <li key={r.lo + i}>
            Lô {r.lo}: {r.reason}
          </li>
        ))}
      </ul>
    </section>
  );
}
