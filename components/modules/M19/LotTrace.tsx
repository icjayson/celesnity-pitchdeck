"use client";
/** M19 tab 3 "Linh kiện → xe": chọn một lô, xem chuỗi truy vết, số xe theo nơi và danh sách VIN. */
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Building2, ChevronDown, Factory, TriangleAlert, UserRound } from "lucide-react";
import type { GenealogyData } from "@/decks/types";
import { Segmented } from "../shared/Segmented";
import { LOCS, type Loc, type Lot } from "./shared";

const LOC_STYLE: Record<Loc, { Icon: typeof Factory; tile: string; icon: string; dot: string }> = {
  plant: { Icon: Factory, tile: "border-line-200 bg-white", icon: "text-navy-900", dot: "bg-navy-900" },
  dealer: { Icon: Building2, tile: "border-line-200 bg-white", icon: "text-blue-600", dot: "bg-blue-600" },
  customer: { Icon: UserRound, tile: "border-orange-500/40 bg-orange-100", icon: "text-orange-700", dot: "bg-orange-500" },
};

export function LotTrace({
  lots,
  lot,
  onLot,
  chain,
  locationLabels,
  vinIds,
  highlightVin,
  onVin,
  reduced,
}: {
  lots: Lot[];
  lot: string;
  onLot: (l: string) => void;
  chain: string[];
  locationLabels: GenealogyData["locationLabels"];
  /** các VIN có dữ liệu "Xe → linh kiện" */
  vinIds: Set<string>;
  highlightVin: string | null;
  onVin: (vin: string) => void;
  reduced: boolean;
}) {
  const l = lots.find((x) => x.lot === lot) ?? lots[0];
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  if (!l) return null;

  const counts = LOCS.map((loc) => ({ loc, n: l.vins.filter((v) => v.location === loc).length }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span aria-hidden className="text-[13px] font-medium text-ink-500">
          Chọn lô
        </span>
        <Segmented<string>
          ariaLabel="Chọn lô"
          value={l.lot}
          onChange={onLot}
          options={lots.map((x) => ({ value: x.lot, label: x.lot, sub: x.part }))}
          className="w-full sm:w-auto"
        />
      </div>

      <div key={l.lot} className={`flex flex-col gap-4 ${reduced ? "" : "m19-in"}`}>
        {/* Cảnh báo */}
        <p className="flex items-start gap-2.5 rounded-[12px] border border-blue-300 bg-blue-100 px-4 py-3 text-[15px] leading-snug text-navy-900">
          <TriangleAlert aria-hidden size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blue-600" />
          <span>
            <span className="font-semibold">{l.alert}</span>
            <span className="mt-0.5 block text-[13px] text-ink-500">
              {l.part} · {l.supplier}
            </span>
          </span>
        </p>

        {/* Chuỗi truy vết */}
        <ol aria-label="Chuỗi truy vết" className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {chain.map((c, i) => (
            <li key={c} className="flex items-center gap-1.5">
              <span className="rounded-full border border-line-200 bg-white px-3 py-1 text-[13px] font-medium text-navy-900">{c}</span>
              {i < chain.length - 1 ? <ArrowRight aria-hidden size={14} strokeWidth={1.5} className="text-ink-500" /> : null}
            </li>
          ))}
        </ol>

        {/* Số xe theo nơi */}
        <dl className="grid grid-cols-3 gap-2 sm:gap-3">
          {counts.map(({ loc, n }) => {
            const s = LOC_STYLE[loc];
            return (
              <div key={loc} className={`flex flex-col gap-1 rounded-[var(--radius-card)] border p-3 sm:p-4 ${s.tile}`}>
                <dt className="flex items-center gap-1.5 text-[12px] font-medium leading-tight text-ink-500 sm:text-[13px]">
                  <s.Icon aria-hidden size={16} strokeWidth={1.5} className={`hidden shrink-0 sm:block ${s.icon}`} />
                  {locationLabels[loc]}
                </dt>
                <dd className="tabular text-[28px] font-semibold leading-none tracking-[-0.02em] text-navy-900 sm:text-[34px]">
                  {n} <span className="text-[14px] font-medium tracking-normal text-ink-500">xe</span>
                </dd>
              </div>
            );
          })}
        </dl>

        {/* Danh sách VIN theo nơi */}
        <div className="flex flex-col gap-2">
          {counts
            .filter((c) => c.n > 0)
            .map(({ loc, n }) => {
              const key = `${l.lot}:${loc}`;
              const open = !closed[key];
              const listId = `m19-${l.lot}-${loc}`;
              const rows = l.vins.filter((v) => v.location === loc);
              return (
                <section key={loc} className="overflow-hidden rounded-[var(--radius-card)] border border-line-200 bg-white">
                  <h4 className="m-0">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={listId}
                      onClick={() => setClosed((c) => ({ ...c, [key]: open }))}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-[15px] font-semibold text-navy-900 hover:bg-mist-50"
                    >
                      <span aria-hidden className={`h-2 w-2 rounded-full ${LOC_STYLE[loc].dot}`} />
                      <span className="flex-1">
                        {locationLabels[loc]} <span className="tabular font-medium text-ink-500">· {n} xe</span>
                      </span>
                      <ChevronDown
                        aria-hidden
                        size={18}
                        strokeWidth={1.5}
                        className={`text-ink-500 motion-safe:transition-transform motion-safe:duration-200 ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h4>
                  {open ? (
                    <div id={listId} className="max-h-[300px] overflow-y-auto border-t border-line-200">
                      <div
                        aria-hidden
                        className="sticky top-0 hidden grid-cols-[8.5rem_4rem_6.5rem_minmax(0,1fr)_minmax(0,1fr)] gap-3 bg-mist-50 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-500 md:grid"
                      >
                        <span>VIN</span>
                        <span>Xe</span>
                        <span>Ngày SX</span>
                        <span>QC</span>
                        <span>Nơi</span>
                      </div>
                      <ul className="divide-y divide-line-200">
                        {rows.map((r) => {
                          const clickable = vinIds.has(r.vin);
                          const hl = r.vin === highlightVin;
                          return (
                            <li
                              key={r.vin}
                              className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-0.5 px-4 py-2.5 text-[14px] md:grid-cols-[8.5rem_4rem_6.5rem_minmax(0,1fr)_minmax(0,1fr)] md:items-center ${
                                hl ? "bg-orange-100" : ""
                              }`}
                            >
                              <span className="tabular font-semibold text-navy-900">
                                {clickable ? (
                                  <button
                                    type="button"
                                    onClick={() => onVin(r.vin)}
                                    aria-label={`${r.vin}: xem linh kiện của xe này`}
                                    className="inline-flex items-center gap-1 rounded-[6px] text-blue-600 underline decoration-blue-300 underline-offset-[3px] hover:text-navy-900"
                                  >
                                    {r.vin}
                                    <ArrowUpRight aria-hidden size={14} strokeWidth={1.5} />
                                  </button>
                                ) : (
                                  r.vin
                                )}
                              </span>
                              <span className="text-right text-ink-500 md:text-left md:text-navy-900">{r.model}</span>
                              <span className="tabular col-span-2 text-[13px] text-ink-500 md:col-span-1 md:text-[14px] md:text-navy-900">
                                <span className="md:hidden">Ngày SX </span>
                                {r.date}
                              </span>
                              <span className="col-span-2 text-[13px] text-ink-500 md:col-span-1 md:text-[14px] md:text-navy-900">
                                <span className="md:hidden">QC: </span>
                                {r.qc}
                              </span>
                              <span className="col-span-2 text-[13px] text-ink-500 md:col-span-1 md:text-[14px]">
                                <span className="md:hidden">Nơi: </span>
                                {r.place}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </section>
              );
            })}
        </div>
      </div>
    </div>
  );
}
