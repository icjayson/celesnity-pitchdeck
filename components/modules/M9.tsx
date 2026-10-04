"use client";
/** M9. Bộ khám phá use case (#use-case). Xem docs/implementation-plan.md mục 2 và 5. */
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, MapPinned, SearchX } from "lucide-react";
import type { Phase, UseCase } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { Label } from "@/components/shared/Label";
import { RichText } from "@/components/shared/RichText";
import { onAction } from "@/lib/actions";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { UseCaseDrawer } from "./M9/Drawer";

type All = "all";
type Sector = string;
const phaseOrder: Phase[] = ["pilot", "dung-that", "nhan-rong", "nam-2"];

function Pills<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | All;
  options: { v: T | All; text: string }[];
  onChange: (v: T | All) => void;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-24 shrink-0 text-[13px] font-semibold text-ink-500">{label}</span>
      <div role="group" aria-label={label} className="-mx-1 flex flex-wrap gap-1.5 px-1">
        {options.map((o) => {
          const on = o.v === value;
          return (
            <button
              key={o.v}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.v)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                on ? "border-navy-900 bg-navy-900 text-white" : "border-line-200 bg-white text-navy-900 hover:border-blue-300 hover:bg-blue-100"
              }`}
            >
              {o.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Card({ uc, onOpen, wide = false }: { uc: UseCase; onOpen: (id: string) => void; wide?: boolean }) {
  const { labels, phaseLabels, sectorLabels } = useDeck();
  const primary = !!uc.primary;
  /** Hướng đề xuất (chưa chốt) hiển thị nét đứt */
  const isSteel = !!uc.note;
  return (
    <button
      type="button"
      onClick={() => onOpen(uc.id)}
      aria-haspopup="dialog"
      data-uc={uc.id}
      className={`group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-card)] border text-left transition-all duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-24px_rgba(10,31,68,0.45)] ${
        primary ? "border-blue-300 bg-white p-6 sm:p-7" : isSteel ? "border-dashed border-navy-700/40 bg-mist-50 p-5" : "border-line-200 bg-white p-5"
      }`}
    >
      {primary ? (
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-blue-600),var(--color-blue-300))]" />
      ) : null}
      {primary ? <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" /> : null}
      <div className="mb-3 flex w-full flex-wrap items-center gap-2">
        <span
          className={`tabular rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${
            primary ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
          }`}
        >
          {uc.code}
        </span>
        {uc.code !== phaseLabels[uc.phase] ? <span className="text-[12px] font-medium text-ink-500">{phaseLabels[uc.phase]}</span> : null}
        {isSteel ? <Label variant="proposal" text={labels.proposal} className="ml-auto whitespace-nowrap" /> : null}
        {!isSteel ? (
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            aria-hidden
            className="ml-auto text-ink-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
          />
        ) : null}
      </div>
      <h3 className={`font-semibold leading-snug tracking-[-0.01em] text-navy-900 ${primary ? "text-[21px]" : "text-[17px]"}`}>{uc.name}</h3>
      <p className={`mt-2 mb-4 leading-snug text-ink-500 ${primary || wide ? "text-[15px]" : "line-clamp-4 text-[14px]"}`}>
        <RichText text={uc.question} />
      </p>
      {primary && uc.card ? (
        <p className="mt-auto rounded-[var(--radius-control)] bg-blue-100/70 px-3 py-2 text-[13px] leading-snug text-navy-900">
          <span className="font-semibold text-blue-600">Đạt khi: </span>
          <RichText text={uc.card.pass} />
        </p>
      ) : null}
      <div className={`${primary && uc.card ? "" : "mt-auto"} flex w-full flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-[12px] text-ink-500`}>
        <span className="tabular">
          Triển khai từ <span className="font-semibold text-navy-900">{uc.liveFrom.replace(/\s*\(.*\)/, "")}</span>
        </span>
        <span aria-hidden className="h-3 w-px bg-line-200" />
        <span className="min-w-0 truncate">{uc.sectors.map((s) => sectorLabels[s]).join(" · ")}</span>
      </div>
    </button>
  );
}

export default function M9({ variant }: { variant?: string }) {
  void variant;
  const { useCases, sectorLabels, phaseLabels, expansionMap } = useDeck();
  const sectorOrder = Object.keys(sectorLabels);
  const [sector, setSector] = useState<Sector | All>("all");
  const [phase, setPhase] = useState<Phase | All>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const reduced = useReducedMotion();

  const list = useMemo(
    () => useCases.filter((u) => (sector === "all" || u.sectors.includes(sector)) && (phase === "all" || u.phase === phase)),
    [sector, phase, useCases],
  );
  const primary = list.filter((u) => u.primary);
  const rest = list.filter((u) => !u.primary);
  const selected = useCases.find((u) => u.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  useEffect(
    () =>
      onAction("open_use_case", ({ uc }) => {
        setSector("all");
        setPhase("all");
        document.getElementById("use-case")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        setOpenId(uc);
      }),
    [reduced],
  );

  const reset = () => {
    setSector("all");
    setPhase("all");
  };

  return (
    <div className="relative">
      <div className="mb-8 flex flex-col gap-3 rounded-[var(--radius-card)] border border-line-200 bg-mist-50 p-4 sm:p-5">
        <Pills<Sector>
          label="Mảng"
          value={sector}
          onChange={setSector}
          options={[...sectorOrder.map((s) => ({ v: s as Sector | All, text: sectorLabels[s] })), { v: "all", text: "Tất cả" }]}
        />
        <Pills<Phase>
          label="Thời điểm"
          value={phase}
          onChange={setPhase}
          options={[...phaseOrder.map((p) => ({ v: p as Phase | All, text: phaseLabels[p] })), { v: "all", text: "Tất cả" }]}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} use case khớp bộ lọc
      </p>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line-200 px-6 py-14 text-center">
          <SearchX size={24} strokeWidth={1.5} aria-hidden className="text-ink-500" />
          <p className="text-[15px] text-navy-900">Chưa có use case nào khớp cả hai bộ lọc.</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-line-200 px-4 py-1.5 text-[13px] font-medium text-navy-900 transition-colors duration-300 hover:border-blue-300 hover:bg-blue-100"
          >
            Xem tất cả
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {primary.length ? (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {primary.map((u) => (
                <li key={u.id} className="flex min-w-0">
                  <Card uc={u} onOpen={setOpenId} />
                </li>
              ))}
            </ul>
          ) : null}
          {rest.length ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((u, i) => {
                // Hàng cuối còn 2 thẻ trên lưới 3 cột: thẻ cuối trải 2 cột cho cân
                const wide = i === rest.length - 1 && rest.length % 3 === 2;
                return (
                  <li key={u.id} className={`flex min-w-0 ${wide ? "lg:col-span-2" : ""}`}>
                    <Card uc={u} onOpen={setOpenId} wide={wide} />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      )}

      {/* Bản đồ mở rộng */}
      <div className="mt-8 rounded-[var(--radius-card)] border border-line-200 bg-white">
        <button
          type="button"
          aria-expanded={mapOpen}
          aria-controls="m9-expansion"
          onClick={() => setMapOpen((v) => !v)}
          className="flex w-full items-center gap-3 rounded-[var(--radius-card)] px-5 py-4 text-left transition-colors duration-300 hover:bg-mist-50 sm:px-6"
        >
          <MapPinned size={20} strokeWidth={1.5} aria-hidden className="shrink-0 text-blue-600" />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold text-navy-900">Bản đồ mở rộng</span>
            <span className="block text-[13px] text-ink-500">{expansionMap.length} khu vực trong gia dụng và điện lạnh mà cùng mô hình có thể hỗ trợ</span>
          </span>
          <ChevronDown
            size={18}
            strokeWidth={1.5}
            aria-hidden
            className={`shrink-0 text-ink-500 transition-transform duration-300 ${mapOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div
          id="m9-expansion"
          className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-brand)] ${mapOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          hidden={!mapOpen && reduced}
        >
          <div className="min-h-0 overflow-hidden">
            <ol className="grid grid-cols-1 gap-2.5 border-t border-line-200 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4" inert={!mapOpen}>
              {expansionMap.map(([area, support], i) => (
                <li key={area} className="flex min-w-0 flex-col gap-1.5 rounded-[var(--radius-control)] border border-line-200 bg-mist-50 p-3.5">
                  <span className="tabular text-[12px] font-semibold text-blue-600">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[14px] font-semibold leading-snug text-navy-900">{area}</span>
                  <span className="text-[13px] leading-snug text-ink-500">{support}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <UseCaseDrawer uc={selected} onClose={close} />
    </div>
  );
}
