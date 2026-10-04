"use client";
/**
 * M19 — Lý lịch số (#ly-lich-so). Dữ liệu: scenarios.m19 của deck.
 * Ba tab tĩnh, không gọi mạng: "Từ một lỗi", "Xe → linh kiện", "Linh kiện → xe".
 * Dữ liệu: useDeck().scenarios.m19. Bản in (printMode) bỏ module, section in bảng trong details.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useDeck } from "@/components/deck/DeckProvider";
import { Label } from "@/components/shared/Label";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Segmented } from "./shared/Segmented";
import { DefectMap } from "./M19/DefectMap";
import { VehicleTree } from "./M19/VehicleTree";
import { LotTrace } from "./M19/LotTrace";
import { FADE_CSS } from "./M19/shared";

type Tab = "defect" | "forward" | "backward";

export default function M19(_props: { variant?: string }) {
  const { scenarios, labels } = useDeck();
  const data = scenarios.m19;
  const reduced = useReducedMotion();

  const [tab, setTab] = useState<Tab>("defect");
  const [vin, setVin] = useState(data?.vehicles[0]?.vin ?? "");
  const [lot, setLot] = useState(data?.lots[0]?.lot ?? "");
  /** dấu vết khi nhảy giữa hai tab: lô vừa xem (tab 2) hoặc VIN vừa rời (tab 3) */
  const [highlightLot, setHighlightLot] = useState<string | null>(null);
  const [highlightVin, setHighlightVin] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const jumped = useRef(false);

  const lotIds = useMemo(() => new Set(data?.lots.map((l) => l.lot) ?? []), [data]);
  const vinIds = useMemo(() => new Set(data?.vehicles.map((v) => v.vin) ?? []), [data]);

  // Sau khi nhảy tab bằng một liên kết, đưa focus về khung nội dung để bàn phím không bị lạc
  useEffect(() => {
    if (!jumped.current) return;
    jumped.current = false;
    panelRef.current?.focus({ preventScroll: true });
    panelRef.current?.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, [tab, reduced]);

  if (!data) return null;

  const tabs: { value: Tab; label: string }[] = [
    { value: "defect", label: data.tabs.defect },
    { value: "forward", label: data.tabs.forward },
    { value: "backward", label: data.tabs.backward },
  ];
  const current = tabs.find((t) => t.value === tab)!;

  const choose = (t: Tab) => {
    setHighlightLot(null);
    setHighlightVin(null);
    setTab(t);
  };
  const toLot = (l: string) => {
    setHighlightVin(vin);
    setHighlightLot(null);
    setLot(l);
    jumped.current = true;
    setTab("backward");
  };
  const toVin = (v: string) => {
    setHighlightLot(lot);
    setHighlightVin(null);
    setVin(v);
    jumped.current = true;
    setTab("forward");
  };

  const footnoteHasSim = data.footnote.trim().toLowerCase().startsWith(labels.simShort.trim().toLowerCase());

  return (
    <div className="flex flex-col gap-5">
      <style>{FADE_CSS}</style>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented<Tab> ariaLabel="Chọn góc nhìn lý lịch" value={tab} onChange={choose} options={tabs} className="w-full sm:w-auto" />
        {footnoteHasSim ? null : <Label variant="sim" text={labels.simShort} />}
      </div>

      <div
        ref={panelRef}
        role="region"
        aria-label={current.label}
        tabIndex={-1}
        className="rounded-[var(--radius-card)] outline-offset-4"
      >
        <div key={tab} className={reduced ? "" : "m19-in"}>
          {tab === "defect" ? <DefectMap data={data.defect} /> : null}
          {tab === "forward" ? (
            <VehicleTree
              vehicles={data.vehicles}
              vin={vin}
              onVin={(v) => {
                setHighlightLot(null);
                setVin(v);
              }}
              lotIds={lotIds}
              highlightLot={highlightLot}
              onLot={toLot}
              reduced={reduced}
            />
          ) : null}
          {tab === "backward" ? (
            <LotTrace
              lots={data.lots}
              lot={lot}
              onLot={(l) => {
                setHighlightVin(null);
                setLot(l);
              }}
              chain={data.chain}
              locationLabels={data.locationLabels}
              vinIds={vinIds}
              highlightVin={highlightVin}
              onVin={toVin}
              reduced={reduced}
            />
          ) : null}
        </div>
      </div>

      <div>
        <Label variant="sim" text={data.footnote} />
      </div>
    </div>
  );
}
