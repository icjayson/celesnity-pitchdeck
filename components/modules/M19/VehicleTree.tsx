"use client";
/** M19 tab 2 "Xe → linh kiện": chọn một VIN, xem cây linh kiện chính. */
import { ArrowRight, Truck } from "lucide-react";
import { Segmented } from "../shared/Segmented";
import type { Vehicle } from "./shared";

export function VehicleTree({
  vehicles,
  vin,
  onVin,
  lotIds,
  highlightLot,
  onLot,
  reduced,
}: {
  vehicles: Vehicle[];
  vin: string;
  onVin: (v: string) => void;
  /** các lô có dữ liệu truy ngược */
  lotIds: Set<string>;
  highlightLot: string | null;
  onLot: (lot: string) => void;
  reduced: boolean;
}) {
  const v = vehicles.find((x) => x.vin === vin) ?? vehicles[0];
  if (!v) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span aria-hidden className="text-[13px] font-medium text-ink-500">
          Chọn xe
        </span>
        <Segmented<string>
          ariaLabel="Chọn xe"
          value={v.vin}
          onChange={onVin}
          options={vehicles.map((x) => ({ value: x.vin, label: x.vin, sub: x.model }))}
          className="w-full sm:w-auto"
        />
      </div>

      <article key={v.vin} className={`rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6 ${reduced ? "" : "m19-in"}`}>
        <header className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[12px] bg-navy-900 px-4 py-3 text-white">
          <span className="flex items-center gap-2">
            <Truck aria-hidden size={20} strokeWidth={1.5} className="text-blue-300" />
            <span className="tabular text-[18px] font-semibold">{v.vin}</span>
          </span>
          <span className="text-[14px] text-blue-100">
            <span className="text-blue-300">Model</span> {v.model}
          </span>
          <span className="tabular text-[14px] text-blue-100">
            <span className="text-blue-300">Ngày SX</span> {v.built}
          </span>
        </header>

        {/* Cây linh kiện: thân dọc, mỗi nhánh là một linh kiện */}
        <ul className="relative mt-3 ml-5 flex flex-col gap-2 border-l-[1.5px] border-line-200 pl-5 sm:ml-6">
          {v.parts.map((p) => {
            const linked = !!p.lot && lotIds.has(p.lot);
            const hl = !!p.lot && p.lot === highlightLot;
            const body = (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug text-navy-900">{p.name}</span>
                  <span className="tabular block text-[13px] leading-snug text-ink-500">
                    {p.serial ? (
                      <>Số seri {p.serial}</>
                    ) : (
                      <>
                        {p.supplier}
                        {p.lot ? <> · Lô {p.lot}</> : null}
                      </>
                    )}
                  </span>
                </span>
                {linked ? (
                  <span className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-blue-600">
                    <span className="hidden sm:inline">Xem lô</span>
                    <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
                  </span>
                ) : null}
              </>
            );
            const box = `flex w-full items-center gap-3 rounded-[12px] border px-3.5 py-2.5 text-left ${
              hl ? "border-orange-500 bg-orange-100" : "border-line-200 bg-mist-50"
            }`;
            return (
              <li key={p.id} className="relative">
                <span aria-hidden className="absolute -left-5 top-1/2 h-[1.5px] w-5 bg-line-200" />
                {linked ? (
                  <button
                    type="button"
                    onClick={() => onLot(p.lot!)}
                    aria-label={`${p.name}, lô ${p.lot}: xem các xe đã lắp lô này`}
                    className={`${box} motion-safe:transition-colors motion-safe:duration-200 hover:border-blue-300 hover:bg-blue-100/60`}
                  >
                    {body}
                  </button>
                ) : (
                  <div className={box}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
}
