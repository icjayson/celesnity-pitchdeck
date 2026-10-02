"use client";
/** M11 — Phòng thi (docs/implementation-plan.md mục 2). Tiêu chí lấy từ bảng trong details của section `phong-thi`. */
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Lock, LockOpen, TriangleAlert, UserCheck } from "lucide-react";
import { RichText } from "@/components/shared/RichText";
import { gates } from "./M11/gates";

const FAIL_MSG = "Dừng hoặc điều chỉnh use case này. Không chuyển sang giai đoạn có phí. Ứng dụng 01 vẫn tiếp tục.";

export default function M11({ variant }: { variant?: string }) {
  const [active, setActive] = useState(0);
  const [fails, setFails] = useState<Record<string, boolean>>({});
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const failCount = (g: number) => gates[g]?.criteria.filter((_, i) => fails[`${g}-${i}`]).length ?? 0;
  const gate = gates[active];

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = gates.length;
    const map: Record<string, number> = { ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    setActive(map[e.key]);
    tabs.current[map[e.key]]?.focus();
  };

  if (!gate) return null;
  const failed = failCount(active);
  const open = failed === 0;

  return (
    <div data-variant={variant} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
        {/* phong bì niêm phong */}
        <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/70 px-6 py-8 text-center">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[60px]" />
          <Envelope />
          <div className="relative">
            <p className="text-[18px] font-semibold leading-snug text-white">Bộ đề thi kín — Hòa Phát giữ</p>
            <p className="mt-1 text-[14px] text-blue-300">Mô hình làm bài · Hòa Phát chấm · Celesnity không xem đáp án</p>
          </div>
        </div>

        {/* bốn cánh cửa */}
        <div className="flex flex-col gap-3">
          <p id={`${uid}-doors`} className="text-[14px] text-blue-300">
            Bốn cánh cửa, bốn cổng. Chọn một cổng để xem đề thi.
          </p>
          <div role="tablist" aria-labelledby={`${uid}-doors`} className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4">
            {gates.map((g, i) => {
              const on = i === active;
              const ok = failCount(i) === 0;
              return (
                <button
                  key={g.n}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`group relative flex min-h-[150px] flex-col items-center justify-end gap-1 overflow-hidden rounded-b-[var(--radius-control)] rounded-t-[999px] border px-3 pb-4 pt-10 text-center transition-[border-color,background-color,transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 ${
                    on
                      ? "border-blue-400 bg-gradient-to-b from-blue-500/25 to-navy-900 shadow-[0_20px_50px_-24px_rgba(47,123,246,0.9)]"
                      : "border-navy-700 bg-navy-900/70 hover:border-blue-300/60"
                  }`}
                >
                  {/* khung cửa */}
                  <span aria-hidden className="pointer-events-none absolute inset-x-3 bottom-3 top-3 rounded-b-[6px] rounded-t-[999px] border border-blue-300/15" />
                  <span
                    aria-hidden
                    className={`absolute top-5 flex h-8 w-8 items-center justify-center rounded-full ${ok ? "bg-orange-500 text-navy-900" : "bg-navy-800 text-blue-300 ring-1 ring-blue-300/40"}`}
                  >
                    {ok ? <LockOpen size={16} strokeWidth={1.5} /> : <Lock size={16} strokeWidth={1.5} />}
                  </span>
                  <span className="relative text-[13px] font-medium text-blue-300">Cổng {g.n}</span>
                  <span className="tabular relative text-[34px] font-semibold leading-none text-white">{g.month}</span>
                  <span className="relative min-h-[18px] text-[12px] leading-tight text-blue-300">{g.note ?? `${g.criteria.length} tiêu chí`}</span>
                  <span className="sr-only">{ok ? "Cổng mở" : "Cổng khóa"}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* đề thi của cổng đang chọn */}
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        className="overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/60"
      >
        <div className="flex flex-wrap items-center gap-4 border-b border-navy-700 px-4 py-5 sm:px-6">
          <GateLock open={open} />
          <div className="min-w-0 flex-1">
            <p className="text-[20px] font-semibold leading-tight text-white sm:text-[22px]">{gate.title}</p>
            <p className="mt-1 text-[14px] text-blue-300" aria-live="polite">
              {open ? (
                <span className="text-orange-500">Tất cả tiêu chí đạt · cổng mở</span>
              ) : (
                <>Cổng chưa mở · {failed} tiêu chí không đạt</>
              )}
            </p>
          </div>
          <p className="hidden text-[13px] text-blue-300 sm:block">Bật “Giả sử không đạt” để thử</p>
        </div>

        <ul key={active} className="m11-list divide-y divide-navy-700/70">
          {gate.criteria.map((c, i) => {
            const k = `${active}-${i}`;
            const off = !!fails[k];
            const numeric = !!c.headline && c.headline.length <= 7;
            return (
              <li
                key={k}
                className={`grid grid-cols-1 gap-3 px-4 py-5 transition-colors duration-300 sm:px-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.9fr)_auto] md:items-center md:gap-6 ${
                  off ? "bg-navy-950/60" : ""
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-white">{c.name}</p>
                  <p className="mt-1 text-[14px] leading-snug text-blue-300">
                    <RichText text={c.detail} strongClass="font-semibold text-white" />
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-blue-300 md:hidden">Ngưỡng đạt</p>
                  {c.headline ? (
                    <p
                      className={`tabular font-semibold leading-none transition-colors duration-300 ${numeric ? "text-[40px] sm:text-[44px]" : "text-[20px] leading-tight"} ${
                        off ? "text-blue-300/50 line-through decoration-1" : "text-blue-400"
                      }`}
                    >
                      {c.headline}
                    </p>
                  ) : (
                    <p className={`text-[15px] font-medium ${off ? "text-blue-300/50" : "text-white"}`}>Đủ điều kiện</p>
                  )}
                </div>
                <p className="flex items-start gap-2 text-[14px] leading-snug text-white">
                  <UserCheck aria-hidden size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blue-300" />
                  <span>
                    <span className="sr-only">Ai chấm: </span>
                    {c.who}
                  </span>
                </p>
                <Switch on={off} onChange={(v) => setFails((f) => ({ ...f, [k]: v }))} label={`Giả sử không đạt: ${c.name}`} />
                {off ? (
                  <div role="alert" className="m11-warn flex items-start gap-3 rounded-[var(--radius-control)] border border-orange-500/50 bg-orange-500/10 px-4 py-3 md:col-span-4">
                    <TriangleAlert aria-hidden size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-orange-500" />
                    <p className="text-[15px] leading-snug text-white">{FAIL_MSG}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        @keyframes m11-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .m11-list > li { animation: m11-in 450ms var(--ease-brand) both; }
        .m11-warn { animation: m11-in 350ms var(--ease-brand) both; }
        .m11-shackle { transition: transform 500ms var(--ease-brand); transform-origin: 34px 22px; }
        .m11-open .m11-shackle { transform: translateY(-6px) rotate(18deg); }
        .m11-body { transition: fill 400ms var(--ease-brand), stroke 400ms var(--ease-brand); }
      `}</style>
    </div>
  );
}

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="group inline-flex items-center gap-3 self-start rounded-full py-1 text-left md:self-center"
    >
      <span
        aria-hidden
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300 ${on ? "border-blue-300 bg-navy-700" : "border-navy-700 bg-navy-950 group-hover:border-blue-300/50"}`}
      >
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-[left,background-color] duration-300 ease-[var(--ease-brand)] ${on ? "left-[22px] bg-white" : "left-[3px] bg-blue-300/60"}`}
        />
      </span>
      <span className={`whitespace-nowrap text-[13px] ${on ? "text-white" : "text-blue-300"}`}>Giả sử không đạt</span>
    </button>
  );
}

/** Ổ khóa cổng: mở (orange) khi tất cả tiêu chí đạt */
function GateLock({ open }: { open: boolean }) {
  return (
    <span className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${open ? "m11-open bg-orange-500/15" : "bg-navy-800"}`}>
      {open ? <span aria-hidden className="absolute inset-0 rounded-full shadow-[0_0_30px_-4px_rgba(255,122,26,0.7)]" /> : null}
      <svg aria-hidden width={40} height={44} viewBox="0 0 48 52" className="relative">
        <path
          className="m11-shackle"
          d="M14 24 V16 a10 10 0 0 1 20 0 V24"
          fill="none"
          stroke={open ? "var(--color-orange-500)" : "var(--color-blue-300)"}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <rect
          className="m11-body"
          x={8}
          y={22}
          width={32}
          height={24}
          rx={5}
          fill={open ? "var(--color-orange-500)" : "var(--color-navy-700)"}
          stroke={open ? "var(--color-orange-500)" : "var(--color-blue-300)"}
          strokeWidth={1.5}
        />
        <circle cx={24} cy={32} r={3} fill={open ? "var(--color-navy-900)" : "var(--color-blue-300)"} />
        <rect x={23} y={33} width={2} height={6} rx={1} fill={open ? "var(--color-navy-900)" : "var(--color-blue-300)"} />
      </svg>
    </span>
  );
}

/** Phong bì niêm phong: thân navy, nét blue, dấu niêm phong orange = Hòa Phát */
function Envelope() {
  const scallop = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return `${(140 + Math.cos(a) * 25).toFixed(1)},${(104 + Math.sin(a) * 25).toFixed(1)}`;
  });
  return (
    <svg viewBox="0 0 280 190" className="relative h-auto w-full max-w-[280px]" aria-hidden>
      <defs>
        <linearGradient id="m11-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-navy-700)" />
          <stop offset="1" stopColor="var(--color-navy-800)" />
        </linearGradient>
        <radialGradient id="m11-seal" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ff9a4d" />
          <stop offset="0.6" stopColor="var(--color-orange-500)" />
          <stop offset="1" stopColor="var(--color-orange-600)" />
        </radialGradient>
      </defs>
      {/* tờ đề thi thò ra */}
      <g>
        <rect x={56} y={18} width={168} height={110} rx={6} fill="var(--color-mist-50)" opacity={0.92} />
        {[40, 54, 68, 82].map((y, i) => (
          <rect key={y} x={74} y={y} width={i === 0 ? 70 : 132 - i * 14} height={5} rx={2.5} fill="var(--color-line-200)" />
        ))}
        <rect x={74} y={28} width={36} height={5} rx={2.5} fill="var(--color-blue-300)" />
      </g>
      {/* thân phong bì */}
      <path d="M20 74 L140 132 L260 74 V170 a10 10 0 0 1 -10 10 H30 a10 10 0 0 1 -10 -10 Z" fill="url(#m11-env)" stroke="var(--color-blue-300)" strokeOpacity={0.5} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M20 176 L112 118 M260 176 L168 118" stroke="var(--color-blue-300)" strokeOpacity={0.3} strokeWidth={1.5} />
      {/* nắp */}
      <path d="M20 74 L140 132 L260 74" fill="none" stroke="var(--color-blue-300)" strokeOpacity={0.7} strokeWidth={1.5} strokeLinejoin="round" />
      {/* dấu niêm phong */}
      <polygon points={scallop.join(" ")} fill="url(#m11-seal)" transform="translate(0 28)" />
      <circle cx={140} cy={132} r={17} fill="none" stroke="var(--color-navy-900)" strokeOpacity={0.35} strokeWidth={1.5} />
      <g transform="translate(131 121)" stroke="var(--color-navy-900)" strokeWidth={1.8} fill="none" strokeLinecap="round">
        <path d="M4 10 V7 a5 5 0 0 1 10 0 V10" />
        <rect x={2} y={10} width={14} height={11} rx={2.5} fill="var(--color-navy-900)" fillOpacity={0.15} />
      </g>
    </svg>
  );
}
