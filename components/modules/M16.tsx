"use client";
/** M16 — Nhân sự theo giai đoạn: bảng ma trận đội × giai đoạn. Dữ liệu: content/scenarios/staffing.ts. */
import { ArrowRight, Clock, UserRound, Users } from "lucide-react";
import type { StaffCell, StaffRow } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { vnNumber } from "@/lib/format";

const toneCls = {
  blue: { dot: "bg-blue-500", text: "text-blue-600", icon: "text-blue-500", chip: "bg-blue-100 text-navy-900", plus: "bg-blue-500 text-white" },
  orange: { dot: "bg-orange-500", text: "text-orange-700", icon: "text-orange-500", chip: "bg-orange-100 text-navy-900", plus: "bg-orange-500 text-navy-900" },
};

export default function M16(_props: { variant?: string }) {
  const { phases: staffingPhases, rows: staffingRows, leaders: staffingLeaders } = useDeck().scenarios.staffing;
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line-200 bg-white shadow-[0_24px_60px_-40px_rgba(10,31,68,0.45)]">
      {/* Hàng tiêu đề giai đoạn (desktop) */}
      <div className="hidden grid-cols-[220px_repeat(3,minmax(0,1fr))] bg-mist-50 lg:grid">
        <div className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-500">Đội</div>
        {staffingPhases.map((p, i) => (
          <div key={p.name} className="flex items-center gap-2 border-l border-line-200 px-6 py-4">
            <span className="tabular flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-[12px] font-semibold text-white">{i + 1}</span>
            <span className="text-[15px] font-semibold text-navy-900">{p.name}</span>
            <span className="tabular text-[13px] text-ink-500">{p.months}</span>
            {i < staffingPhases.length - 1 ? <ArrowRight aria-hidden size={14} strokeWidth={1.5} className="ml-auto text-ink-500/60" /> : null}
          </div>
        ))}
      </div>

      {staffingRows.map((row) => (
        <Row key={row.team} row={row} />
      ))}

      {/* Lãnh đạo: chung cho mọi giai đoạn */}
      <div className="grid grid-cols-1 border-t border-line-200 lg:grid-cols-[220px_minmax(0,1fr)]">
        <TeamLabel team={staffingLeaders.team} tone="orange" />
        <div className="flex items-center gap-3 px-6 pb-6 lg:border-l lg:border-line-200 lg:py-5">
          <Users aria-hidden size={18} strokeWidth={1.5} className="shrink-0 text-orange-500" />
          <p className="text-[15px] text-navy-900">{staffingLeaders.text}</p>
          <span className="ml-auto hidden shrink-0 rounded-full bg-mist-50 px-3 py-1 text-[12px] font-medium text-ink-500 sm:inline">Cả 3 giai đoạn</span>
        </div>
      </div>
    </div>
  );
}

function TeamLabel({ team, note, tone }: { team: string; note?: string; tone: StaffRow["tone"] }) {
  return (
    <div className="flex items-start gap-3 px-6 pb-2 pt-5 lg:py-5">
      <span aria-hidden className={`mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full ${toneCls[tone].dot}`} />
      <div>
        <p className="text-[16px] font-semibold leading-snug text-navy-900">{team}</p>
        {note ? <p className="text-[13px] text-ink-500">{note}</p> : null}
      </div>
    </div>
  );
}

function Row({ row }: { row: StaffRow }) {
  const staffingPhases = useDeck().scenarios.staffing.phases;
  return (
    <div className="grid grid-cols-1 border-t border-line-200 lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]">
      <TeamLabel team={row.team} note={row.note} tone={row.tone} />
      {row.cells.map((c, i) => (
        <Cell key={i} cell={c} tone={row.tone} phase={staffingPhases[i]} />
      ))}
    </div>
  );
}

function Cell({ cell, tone, phase }: { cell: StaffCell; tone: StaffRow["tone"]; phase: { name: string; months: string } }) {
  const t = toneCls[tone];
  return (
    <div className="flex flex-col gap-3 px-6 py-4 lg:border-l lg:border-line-200 lg:py-5">
      {/* nhãn giai đoạn trên mobile */}
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500 lg:hidden">
        {phase.name} · {phase.months}
      </p>
      {cell.count !== null ? (
        <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
          <p className={`tabular whitespace-nowrap text-[30px] font-semibold leading-none tracking-[-0.02em] ${t.text}`}>
            {cell.approx ? "~" : ""}
            {cell.text ?? vnNumber(cell.count, cell.count % 1 ? 1 : 0)}
            <span className="ml-1 text-[14px] font-medium text-ink-500">người</span>
          </p>
          <PeopleIcons count={cell.count} cls={t.icon} />
        </div>
      ) : (
        <p className="flex items-center gap-2 text-[14px] font-medium text-ink-500">
          <Clock aria-hidden size={16} strokeWidth={1.5} className={t.icon} /> Theo giờ mỗi tuần
        </p>
      )}
      <ul className="flex flex-wrap gap-1.5">
        {cell.roles.map((r) => {
          const added = r.startsWith("+ ");
          return (
            <li
              key={r}
              className={`rounded-full px-2.5 py-1 text-[12.5px] font-medium leading-snug ${added ? t.plus : r === "Như cũ" ? "bg-mist-50 text-ink-500" : t.chip}`}
            >
              {r}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PeopleIcons({ count, cls }: { count: number; cls: string }) {
  const full = Math.floor(count);
  const half = count - full >= 0.5;
  return (
    <span className={`flex shrink-0 items-end ${cls}`} aria-hidden>
      {Array.from({ length: full }, (_, i) => (
        <UserRound key={i} size={18} strokeWidth={1.5} className="-mx-[1px]" />
      ))}
      {half ? (
        <span className="-mx-[1px] inline-block w-[9px] overflow-hidden">
          <UserRound size={18} strokeWidth={1.5} />
        </span>
      ) : null}
    </span>
  );
}
