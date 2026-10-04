"use client";
/**
 * Các khung sau thẻ lỗi của M6 kiểu "defect": hồ sơ lỗi, ca tương tự (Tác nhân Chất lượng),
 * truy xuất theo lô (Tác nhân Truy xuất), phương án và nút duyệt. Ca tương tự, truy xuất và phương án là mô phỏng minh họa.
 */
import { useState } from "react";
import { Check, ChevronDown, CircleCheck, FileWarning, History, Route, ScanSearch } from "lucide-react";
import type { DefectCard, DefectStory } from "@/decks/types";
import { Label } from "@/components/shared/Label";

const severityBars: Record<DefectCard["muc_do"], number> = { Thấp: 1, "Trung bình": 2, Cao: 3 };
const panel = "rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6";
const anim = "motion-safe:animate-[m6-in_.45s_var(--ease-brand)_both]";

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">{label}</dt>
      <dd className="mt-1 text-[16px] leading-snug text-navy-900">{children}</dd>
    </div>
  );
}

const Missing = () => <span className="text-ink-500">Chưa rõ</span>;
const Code = ({ v }: { v: string }) => (v ? <span className="tabular">{v}</span> : <Missing />);

function PanelHead({ id, icon, title, simText }: { id: string; icon: React.ReactNode; title: string; simText: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 id={id} className="flex items-center gap-2 text-[16px] font-semibold">
        {icon}
        {title}
      </h3>
      <Label variant="sim" text={simText} />
    </div>
  );
}

export function DefectCardView({ card, approved }: { card: DefectCard; approved: boolean }) {
  const bars = severityBars[card.muc_do];
  return (
    <article
      aria-label="Hồ sơ lỗi"
      className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(10,31,68,0.45)] sm:p-6"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[16px] font-semibold">
          <FileWarning aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />
          Hồ sơ lỗi
        </h3>
        {approved ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-100 px-3 py-1 text-[13px] font-medium text-orange-700">
            <CircleCheck aria-hidden size={14} strokeWidth={1.5} />
            QA đã duyệt
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-200 bg-mist-50 px-3 py-1 text-[13px] font-medium text-ink-500">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Chờ QA duyệt
          </span>
        )}
      </header>
      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <Field label="VIN">
          <Code v={card.vin} />
        </Field>
        <Field label="Model">
          <Code v={card.model} />
        </Field>
        <Field label="Công đoạn">
          <Code v={card.cong_doan} />
        </Field>
        <Field label="Trạm">
          <Code v={card.tram} />
        </Field>
        <Field label="Linh kiện">{card.linh_kien || <Missing />}</Field>
        <Field label="Triệu chứng">{card.trieu_chung || <Missing />}</Field>
        <Field label="Lô">
          <Code v={card.lo} />
        </Field>
        <Field label="Đồ gá">
          <Code v={card.do_ga} />
        </Field>
        <Field label="Ca">{card.ca || <Missing />}</Field>
        <Field label="Mức độ">
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden className="flex items-end gap-[3px]">
              {[1, 2, 3].map((i) => (
                <span key={i} className={`w-[5px] rounded-sm ${i <= bars ? "bg-navy-900" : "bg-line-200"}`} style={{ height: 6 + i * 4 }} />
              ))}
            </span>
            {card.muc_do}
          </span>
        </Field>
      </dl>
      {card.thong_tin_con_thieu.length ? (
        <div className="mt-5 border-t border-line-200 pt-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">Thông tin còn thiếu</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {card.thong_tin_con_thieu.map((m) => (
              <li key={m} className="rounded-full border border-dashed border-blue-300 bg-blue-100/50 px-3 py-1 text-[13px] text-navy-900">
                {m}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export function DefectSimilar({ similar, simText, reduced }: { similar: DefectStory["similar"]; simText: string; reduced: boolean }) {
  return (
    <section aria-labelledby="m6-similar" className={panel}>
      <PanelHead
        id="m6-similar"
        icon={<History aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />}
        title="Tác nhân Chất lượng: lỗi này đã từng xảy ra chưa?"
        simText={simText}
      />
      <p className="mt-4 flex items-baseline gap-2">
        <span className="tabular text-[32px] font-semibold leading-none text-navy-900">{similar.count}</span>
        <span className="text-[15px] text-ink-500">ca tương tự trong lịch sử lỗi</span>
      </p>
      <ul aria-label="Mẫu chung" className="mt-3 flex flex-wrap gap-2">
        {similar.pattern.map((p) => (
          <li key={p.k} className="rounded-full border border-blue-300 bg-blue-100/50 px-3 py-1 text-[13px] text-navy-900">
            <span className="text-ink-500">{p.k}: </span>
            <span className="font-medium">{p.v}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-[12px] border border-line-200 bg-mist-50 p-3.5">
          <dt className="text-[12px] font-medium uppercase tracking-[0.06em] text-ink-500">Nguyên nhân gốc lần trước</dt>
          <dd className="mt-1 text-[15px] font-semibold leading-snug text-navy-900">{similar.rca}</dd>
        </div>
        <div className="rounded-[12px] border border-line-200 bg-mist-50 p-3.5">
          <dt className="text-[12px] font-medium uppercase tracking-[0.06em] text-ink-500">Hành động khắc phục lần trước</dt>
          <dd className="mt-1 text-[15px] font-semibold leading-snug text-navy-900">{similar.ca}</dd>
        </div>
      </dl>
      <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">Giả thuyết</p>
      <ul className="mt-2 flex flex-col gap-2">
        {similar.hypotheses.map((h, i) => (
          <li
            key={h.name}
            className={`rounded-[12px] border p-3.5 ${h.lead ? "border-blue-500 bg-blue-100/60" : "border-line-200 bg-white"} ${reduced ? "" : anim}`}
            style={reduced ? undefined : { animationDelay: `${i * 90}ms` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[15px] font-semibold text-navy-900">{h.name}</span>
              <span className="flex items-center gap-2">
                {h.lead ? <span className="text-[12px] font-medium text-blue-600">Giả thuyết dẫn đầu</span> : null}
                <span className="rounded-full border border-line-200 bg-white px-2.5 py-0.5 text-[12px] text-navy-900">Độ tin cậy: {h.confidence}</span>
              </span>
            </div>
            <p className="mt-1 text-[13px] text-ink-500">{h.evidence}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const toneClass: Record<DefectStory["trace"]["groups"][number]["tone"], string> = {
  plant: "text-blue-600",
  dealer: "text-navy-900",
  customer: "text-orange-700",
};

export function DefectTrace({ trace, simText, reduced }: { trace: DefectStory["trace"]; simText: string; reduced: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const total = trace.groups.reduce((n, g) => n + g.vins.length, 0);
  const openGroup = trace.groups.find((g) => g.label === open) ?? null;
  return (
    <section aria-labelledby="m6-trace" className={panel}>
      <PanelHead
        id="m6-trace"
        icon={<ScanSearch aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />}
        title={`Tác nhân Truy xuất: mọi xe đã lắp lô ${trace.lot}`}
        simText={simText}
      />
      <p className="mt-3 text-[14px] text-ink-500">
        <span className="tabular font-semibold text-navy-900">{total}</span> xe. Chạm từng nhóm để xem danh sách VIN.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {trace.groups.map((g, i) => {
          const on = open === g.label;
          return (
            <button
              key={g.label}
              type="button"
              aria-expanded={on}
              aria-controls="m6-trace-rows"
              onClick={() => setOpen(on ? null : g.label)}
              className={`flex items-center justify-between gap-3 rounded-[12px] border p-3.5 text-left transition-colors duration-200 ${
                on ? "border-blue-500 bg-blue-100/60" : "border-line-200 bg-mist-50 hover:border-blue-300"
              } ${reduced ? "" : anim}`}
              style={reduced ? undefined : { animationDelay: `${i * 90}ms` }}
            >
              <span className="flex flex-col">
                <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-ink-500">{g.label}</span>
                <span className={`tabular text-[26px] font-semibold leading-tight ${toneClass[g.tone]}`}>{g.vins.length}</span>
              </span>
              <ChevronDown
                aria-hidden
                size={18}
                strokeWidth={1.5}
                className={`shrink-0 text-ink-500 transition-transform duration-200 ${on ? "rotate-180" : ""}`}
              />
            </button>
          );
        })}
      </div>
      <div id="m6-trace-rows">
        {openGroup ? (
          <div className="mt-4 overflow-x-auto rounded-[12px] border border-line-200">
            <table className="w-full min-w-[480px] text-left text-[13px]">
              <caption className="sr-only">
                {openGroup.label}: các xe đã lắp lô {trace.lot}
              </caption>
              <thead className="bg-mist-50 text-[12px] uppercase tracking-[0.06em] text-ink-500">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">VIN</th>
                  <th scope="col" className="px-3 py-2 font-medium">Ngày SX</th>
                  <th scope="col" className="px-3 py-2 font-medium">QC</th>
                  <th scope="col" className="px-3 py-2 font-medium">Nơi</th>
                </tr>
              </thead>
              <tbody>
                {openGroup.vins.map((v) => (
                  <tr key={v.vin} className="border-t border-line-200 text-navy-900">
                    <td className="tabular whitespace-nowrap px-3 py-2 font-medium">{v.vin}</td>
                    <td className="tabular whitespace-nowrap px-3 py-2">{v.date}</td>
                    <td className="px-3 py-2">{v.qc}</td>
                    <td className="px-3 py-2">{v.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function DefectOptions({
  options,
  approveNote,
  simText,
  picked,
  onPick,
  approved,
  onApprove,
}: {
  options: DefectStory["options"];
  approveNote: string;
  simText: string;
  picked: string | null;
  onPick: (id: string) => void;
  approved: boolean;
  onApprove: () => void;
}) {
  const pickedOption = options.find((o) => o.id === picked) ?? null;
  return (
    <section aria-labelledby="m6-options" className={panel}>
      <PanelHead
        id="m6-options"
        icon={<Route aria-hidden size={20} strokeWidth={1.5} className="text-blue-600" />}
        title="Phương án"
        simText={simText}
      />
      <div role="radiogroup" aria-label="Chọn phương án" className="mt-4 flex flex-col gap-2">
        {options.map((o) => {
          const on = picked === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={on}
              disabled={approved}
              onClick={() => onPick(o.id)}
              className={`grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-[12px] border p-3.5 text-left transition-colors duration-200 disabled:cursor-default ${
                on ? "border-blue-500 bg-blue-100/60" : "border-line-200 bg-white hover:border-blue-300"
              }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${on ? "border-blue-600 bg-blue-600" : "border-line-200"}`}
              >
                {on ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold text-navy-900">
                  {o.id}. {o.label}
                </span>
                {o.recommended ? <span className="text-[12px] font-medium text-blue-600">Mô hình đề xuất</span> : null}
              </span>
              <span className="col-start-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-500">
                <span>
                  Phạm vi: <span className="font-medium text-navy-900">{o.scope}</span>
                </span>
                <span>{o.check}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line-200 pt-5">
        {approved ? (
          <p role="status" className="flex items-start gap-2 text-[15px] font-medium text-orange-700">
            <CircleCheck aria-hidden size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            Đã duyệt phương án {pickedOption?.id}. {approveNote}
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={onApprove}
              disabled={!pickedOption}
              className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-orange-500 px-5 py-2.5 text-[15px] font-semibold text-navy-900 shadow-[0_12px_28px_-14px_rgba(232,98,10,0.8)] transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
            >
              <Check aria-hidden size={18} strokeWidth={1.5} />
              Duyệt phương án {pickedOption?.id ?? ""}
            </button>
            <span className="text-[13px] text-ink-500">Tác nhân AI chỉ đề xuất; QA quyết định.</span>
          </>
        )}
      </div>
    </section>
  );
}
