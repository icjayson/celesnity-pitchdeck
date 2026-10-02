"use client";
/** M12. Máy tính giá trị (#gia-tri). Xem docs/implementation-plan.md mục 2 và 5. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Clock } from "lucide-react";
import { calcDefaults, breakEvenGrid, type CalcInputs } from "@/content/scenarios/m12-defaults";
import { labels } from "@/content/content.vi";
import { Label } from "@/components/shared/Label";
import { onAction } from "@/lib/actions";
import { vnNumber } from "@/lib/format";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  approxMoney,
  approxNumber,
  approxScenarioRange,
  billions,
  breakEvenTable,
  calculate,
  nearestGridCell,
} from "@/lib/calculator";
import { RangeField, Stepper, rangeCss, type FieldDef } from "./M12/controls";
import { ValueChart, sourceColors } from "./M12/ValueChart";

type Key = keyof CalcInputs;
type FD = FieldDef & { key: Key };

const F = {
  volumePerYear: { key: "volumePerYear", label: "Sản lượng/năm của dòng", unit: "sp", scale: 1, min: 10_000, max: 500_000, step: 10_000, digits: 0 },
  escapeRatePct: { key: "escapeRatePct", label: "Tỷ lệ lỗi lọt", unit: "%", scale: 1, min: 0, max: 5, step: 0.1, digits: 1 },
  costPerEscape: { key: "costPerEscape", label: "Chi phí mỗi lỗi lọt", unit: "đ", scale: 1, min: 0, max: 5_000_000, step: 50_000, digits: 0 },
  extraCatchShare: { key: "extraCatchShare", label: "Phần lỗi lọt bắt thêm được", unit: "%", scale: 0.01, min: 0, max: 60, step: 5, digits: 0, hint: "mặc định 1/5" },
  volumePerMonth: { key: "volumePerMonth", label: "Sản lượng/tháng của dòng", unit: "sp", scale: 1, min: 1_000, max: 50_000, step: 1_000, digits: 0 },
  earlyWeeks: { key: "earlyWeeks", label: "Số tuần phát hiện sớm", unit: "tuần", scale: 1, min: 0, max: 26, step: 1, digits: 0 },
  warrantyRatePct: { key: "warrantyRatePct", label: "Tỷ lệ bảo hành", unit: "%", scale: 1, min: 0, max: 10, step: 0.1, digits: 1 },
  costPerClaim: { key: "costPerClaim", label: "Chi phí mỗi ca bảo hành", unit: "đ", scale: 1, min: 0, max: 5_000_000, step: 50_000, digits: 0 },
  failedChangeCostLow: { key: "failedChangeCostLow", label: "Chi phí một thay đổi không hiệu quả · thấp", unit: "tỷ đ", scale: 1e9, min: 0, max: 10, step: 0.1, digits: 1 },
  failedChangeCostHigh: { key: "failedChangeCostHigh", label: "Chi phí một thay đổi không hiệu quả · cao", unit: "tỷ đ", scale: 1e9, min: 0, max: 10, step: 0.1, digits: 1 },
  programCostPerYear: { key: "programCostPerYear", label: "Chi phí chương trình/năm", unit: "tỷ đ", scale: 1e9, min: 0.5, max: 6, step: 0.1, digits: 1 },
} satisfies Partial<Record<Key, FD>>;

const sameInputs = (a: CalcInputs, b: CalcInputs) => (Object.keys(a) as Key[]).every((k) => a[k] === b[k]);

function Group({ n, title, tag, children }: { n: number; title: string; tag?: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0 border-t border-line-200 pt-5 first:border-t-0 first:pt-0">
      <legend className="mb-2 flex w-full items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-navy-900">
        <span className="tabular grid h-6 w-6 place-items-center rounded-full bg-blue-100 text-[12px] text-blue-600">{n}</span>
        {title}
        {tag ? <span className="ml-auto text-[12px] font-medium normal-case tracking-normal text-ink-500">{tag}</span> : null}
      </legend>
      {children}
    </fieldset>
  );
}

function Assume({ children }: { children: React.ReactNode }) {
  return <p className="mb-1 mt-1 text-[13px] leading-snug text-ink-500">{children}</p>;
}

export default function M12({ variant }: { variant?: string }) {
  void variant;
  const [inputs, setInputs] = useState<CalcInputs>(calcDefaults);
  const [flash, setFlash] = useState<Set<Key>>(new Set());
  const rootRef = useRef<HTMLDivElement>(null);
  const flashTimer = useRef<number | undefined>(undefined);
  const reduced = useReducedMotion();

  const inputsRef = useRef(inputs);
  useEffect(() => {
    inputsRef.current = inputs;
  }, [inputs]);
  const r = useMemo(() => calculate(inputs), [inputs]);
  const grid = useMemo(() => breakEvenTable(), []);
  const near = nearestGridCell(inputs.volumePerYear, inputs.programCostPerYear);
  const isDefault = sameInputs(inputs, calcDefaults);

  const set = useCallback(<K extends Key>(k: K, v: CalcInputs[K]) => setInputs((p) => ({ ...p, [k]: v })), []);

  // Trợ lý điền số: cập nhật, cuộn tới và nháy nhẹ các ô đã đổi
  useEffect(
    () =>
      onAction("set_calculator", (partial) => {
        const prev = inputsRef.current;
        const changed: Key[] = [];
        const next = { ...prev };
        (Object.keys(partial) as Key[]).forEach((k) => {
          const v = (partial as Partial<CalcInputs>)[k];
          if (typeof v === "number" && v !== prev[k]) {
            next[k] = v;
            changed.push(k);
          }
        });
        inputsRef.current = next;
        setInputs(next);
        requestAnimationFrame(() => {
          const keys = changed.length ? changed : (Object.keys(partial) as Key[]);
          setFlash(new Set(keys));
          window.clearTimeout(flashTimer.current);
          flashTimer.current = window.setTimeout(() => setFlash(new Set()), 1800);
          const target = rootRef.current?.querySelector(`[data-field="${keys[0]}"]`) ?? rootRef.current;
          target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
        });
      }),
    [reduced],
  );
  useEffect(() => () => window.clearTimeout(flashTimer.current), []);

  const field = (d: FD) => (
    <RangeField key={d.key} def={d} raw={inputs[d.key]} flash={flash.has(d.key)} onChange={(v) => set(d.key, v)} />
  );

  const consRatio = r.conservative.total / inputs.programCostPerYear;
  const baseRatioLo = r.baseLow.total / inputs.programCostPerYear;
  const baseRatioHi = r.baseHigh.total / inputs.programCostPerYear;
  const ratio = (x: number) => `${vnNumber(x, 1)}×`;
  const big = (n: number) => billions(n);

  const consParts = [
    "Kiểm tra có mục tiêu",
    inputs.incidentsConservative > 0 ? `${vnNumber(inputs.incidentsConservative)} sự cố bảo hành phát hiện sớm` : null,
    inputs.changesAvoidedConservative > 0 ? `tránh ${vnNumber(inputs.changesAvoidedConservative)} thay đổi không hiệu quả` : null,
  ].filter(Boolean);
  const baseParts = [
    "Kiểm tra có mục tiêu",
    inputs.incidentsBase > 0 ? `${vnNumber(inputs.incidentsBase)} sự cố bảo hành` : null,
    inputs.changesAvoidedBase > 0 ? `tránh ${vnNumber(inputs.changesAvoidedBase)} thay đổi không hiệu quả` : null,
  ].filter(Boolean);

  const legend = [
    { c: sourceColors.inspection, name: "Kiểm tra có mục tiêu (Ứng dụng 02)", v: approxMoney(r.targetedInspection) },
    { c: sourceColors.warranty, name: "Bảo hành phát hiện sớm (Ứng dụng 04)", v: `${approxMoney(r.perIncident)} mỗi sự cố` },
    { c: sourceColors.changes, name: "Tránh thay đổi không hiệu quả (Ứng dụng 03)", v: `${approxScenarioRange(inputs.failedChangeCostLow, inputs.failedChangeCostHigh).replace(/,0(?=\D)/g, "")} mỗi thay đổi` },
    { c: "hatch", name: "Phần cận cao của kịch bản Cơ sở", v: `thêm ${approxMoney(r.baseHigh.total - r.baseLow.total)}` },
  ];

  return (
    <div ref={rootRef} className="relative">
      <style>{rangeCss}</style>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Label variant="sim" text={labels.simShort} />
        <p className="text-[14px] text-ink-500">Giả định minh họa, không phải số liệu Hòa Phát; số thật được thay sau Cổng 1.</p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
        {/* Đầu vào */}
        <form
          aria-label="Đầu vào của máy tính giá trị"
          onSubmit={(e) => e.preventDefault()}
          className="min-w-0 rounded-[var(--radius-card)] border border-line-200 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(10,31,68,0.35)] sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-[15px] font-semibold text-navy-900">Số của Quý vị</p>
            <button
              type="button"
              onClick={() => setInputs(calcDefaults)}
              disabled={isDefault}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-200 px-3 py-1.5 text-[13px] font-medium text-navy-900 transition-colors duration-300 hover:border-blue-300 hover:bg-blue-100 disabled:cursor-default disabled:opacity-45 disabled:hover:bg-transparent"
            >
              <RotateCcw size={14} strokeWidth={1.5} aria-hidden />
              Khôi phục mặc định
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <Group n={1} title="Kiểm tra có mục tiêu" tag="UC1">
              {field(F.volumePerYear)}
              {field(F.escapeRatePct)}
              {field(F.costPerEscape)}
              {field(F.extraCatchShare)}
              <Assume>
                <span className="tabular">{vnNumber(Math.round(r.escapesTotal))}</span> lỗi lọt/năm; bắt thêm{" "}
                <span className="tabular">{vnNumber(Math.round(r.escapesExtra))}</span> lỗi →{" "}
                <span className="font-medium text-navy-900">{approxMoney(r.targetedInspection)}/năm</span>
              </Assume>
            </Group>

            <Group n={2} title="Bảo hành sớm" tag="UC3">
              {field(F.volumePerMonth)}
              {field(F.earlyWeeks)}
              {field(F.warrantyRatePct)}
              {field(F.costPerClaim)}
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Stepper
                  fieldKey="incidentsConservative"
                  label="Sự cố/năm · Thận trọng"
                  value={inputs.incidentsConservative}
                  min={0}
                  max={12}
                  flash={flash.has("incidentsConservative")}
                  onChange={(v) => set("incidentsConservative", v)}
                />
                <Stepper
                  fieldKey="incidentsBase"
                  label="Sự cố/năm · Cơ sở"
                  value={inputs.incidentsBase}
                  min={0}
                  max={12}
                  flash={flash.has("incidentsBase")}
                  onChange={(v) => set("incidentsBase", v)}
                />
              </div>
              <Assume>
                <span className="tabular">{approxNumber(r.unitsLessExposed)}</span> sp ít bị ảnh hưởng →{" "}
                <span className="font-medium text-navy-900">{approxMoney(r.perIncident)} mỗi sự cố</span>
              </Assume>
            </Group>

            <Group n={3} title="Thay đổi kỹ thuật" tag="UC2">
              {field(F.failedChangeCostLow)}
              {field(F.failedChangeCostHigh)}
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Stepper
                  fieldKey="changesAvoidedConservative"
                  label="Tránh được/năm · Thận trọng"
                  value={inputs.changesAvoidedConservative}
                  min={0}
                  max={6}
                  flash={flash.has("changesAvoidedConservative")}
                  onChange={(v) => set("changesAvoidedConservative", v)}
                />
                <Stepper
                  fieldKey="changesAvoidedBase"
                  label="Tránh được/năm · Cơ sở"
                  value={inputs.changesAvoidedBase}
                  min={0}
                  max={6}
                  flash={flash.has("changesAvoidedBase")}
                  onChange={(v) => set("changesAvoidedBase", v)}
                />
              </div>
              <Assume>Khuôn, thẩm định lại, chứng nhận, sửa lại.</Assume>
            </Group>

            <Group n={4} title="Chi phí chương trình">
              {field(F.programCostPerYear)}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn nhanh chi phí chương trình">
                {breakEvenGrid.costs.map((c) => {
                  const on = inputs.programCostPerYear === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set("programCostPerYear", c)}
                      className={`tabular rounded-full border px-3 py-1 text-[13px] font-medium transition-colors duration-300 ${
                        on ? "border-navy-900 bg-navy-900 text-white" : "border-line-200 text-navy-900 hover:border-blue-300 hover:bg-blue-100"
                      }`}
                    >
                      {billions(c).replace(/,0$/, "")} tỷ đ
                    </button>
                  );
                })}
              </div>
              <Assume>Ngưỡng hòa vốn chia cho sản lượng/năm ở mục 1.</Assume>
            </Group>
          </div>
        </form>

        {/* Kết quả */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div aria-live="polite" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <article className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">Thận trọng</p>
              <p className="mt-3 flex items-baseline gap-1.5 text-navy-900">
                <span className="text-[24px] font-medium text-ink-500">~</span>
                <span className="tabular whitespace-nowrap text-[44px] font-semibold leading-none tracking-[-0.03em] lg:text-[38px] xl:text-[50px]">{big(r.conservative.total)}</span>
                <span className="text-[16px] font-medium text-ink-500">tỷ đ/năm</span>
              </p>
              <p className="mt-3 text-[14px] leading-snug text-ink-500">{consParts.join(" + ")}</p>
              <p className="tabular mt-3 text-[13px] text-ink-500">
                So với chi phí: <span className="font-semibold text-navy-900">{ratio(consRatio)}</span>
              </p>
            </article>
            <article className="relative overflow-hidden rounded-[var(--radius-card)] border border-blue-300 bg-blue-100/60 p-5 sm:p-6">
              <span aria-hidden className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-blue-600">Cơ sở</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-1.5 text-navy-900">
                <span className="text-[24px] font-medium text-ink-500">~</span>
                <span className="tabular whitespace-nowrap text-[44px] font-semibold leading-none tracking-[-0.03em] lg:text-[38px] xl:text-[50px]">
                  {big(Math.min(r.baseLow.total, r.baseHigh.total))}
                  {big(r.baseLow.total) !== big(r.baseHigh.total) ? (
                    <>
                      <span className="text-ink-500">–</span>
                      {big(r.baseHigh.total)}
                    </>
                  ) : null}
                </span>
                <span className="text-[16px] font-medium text-ink-500">tỷ đ/năm</span>
              </p>
              <p className="mt-3 text-[14px] leading-snug text-ink-500">{baseParts.join(" + ")}</p>
              <p className="tabular mt-3 text-[13px] text-ink-500">
                So với chi phí: <span className="font-semibold text-navy-900">{vnNumber(baseRatioLo, 1)}–{ratio(baseRatioHi)}</span>
              </p>
            </article>
          </div>

          <div className="mt-4 rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[15px] font-semibold text-navy-900">Giá trị/năm theo nguồn</p>
              <p className="text-[13px] text-ink-500">tỷ đ/năm/dòng</p>
            </div>
            <ValueChart r={r} programCost={inputs.programCostPerYear} />
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {legend.map((l) => (
                <li key={l.name} className="flex min-w-0 items-start gap-2.5 text-[13px] leading-snug">
                  <span
                    aria-hidden
                    className="mt-[3px] h-3 w-3 shrink-0 rounded-[3px]"
                    style={
                      l.c === "hatch"
                        ? { background: "repeating-linear-gradient(45deg,var(--color-blue-300) 0 2px,var(--color-blue-100) 2px 5px)" }
                        : { background: l.c }
                    }
                  />
                  <span className="min-w-0">
                    <span className="text-navy-900">{l.name}</span>
                    <span className="tabular block text-ink-500">{l.v}</span>
                  </span>
                </li>
              ))}
              <li className="flex min-w-0 items-start gap-2.5 text-[13px] leading-snug">
                <span aria-hidden className="mt-[9px] h-0 w-3 shrink-0 border-t-2 border-dashed border-orange-500" />
                <span className="text-navy-900">Đường hòa vốn: chi phí chương trình/năm</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">Ngưỡng hòa vốn</p>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="tabular text-[44px] font-semibold leading-none tracking-[-0.03em] text-orange-600">
                  {Number.isFinite(r.breakEven) ? vnNumber(Math.round(r.breakEven)) : "—"}
                </span>
                <span className="text-[16px] font-medium text-orange-700">đ/sp</span>
              </p>
              <p className="tabular mt-3 text-[13px] leading-snug text-ink-500">
                {billions(inputs.programCostPerYear).replace(/,0$/, "")} tỷ đ ÷ {vnNumber(inputs.volumePerYear)} sp. Mức cải thiện tối thiểu mỗi sản
                phẩm cần đạt; Tài chính Hòa Phát xác nhận.
              </p>
            </div>
            <div className="min-w-0 rounded-[var(--radius-card)] border border-line-200 bg-white p-5 sm:p-6">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">Bảng hòa vốn</p>
              <table className="tabular w-full table-fixed border-separate border-spacing-1 text-[13px]">
                <caption className="sr-only">
                  Ngưỡng hòa vốn đ/sp theo sản lượng/năm (hàng) và chi phí chương trình/năm (cột). Ô gần lựa chọn hiện tại được tô sáng.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-[30%] text-left font-medium text-ink-500">
                      <span className="sr-only">Sản lượng/năm</span>
                    </th>
                    {breakEvenGrid.costs.map((c) => (
                      <th key={c} scope="col" className="pb-1 text-center font-medium text-ink-500">
                        {billions(c).replace(/,0$/, "")} tỷ
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakEvenGrid.volumes.map((v, ri) => (
                    <tr key={v}>
                      <th scope="row" className="pr-1 text-left font-medium text-navy-900">
                        {vnNumber(v)}
                      </th>
                      {grid[ri].map((val, ci) => {
                        const on = near.row === ri && near.col === ci;
                        return (
                          <td
                            key={ci}
                            aria-current={on ? "true" : undefined}
                            className={`rounded-[8px] px-1 py-2 text-center transition-colors duration-300 ${
                              on ? "bg-orange-100 font-semibold text-orange-700 ring-1 ring-orange-500" : "bg-mist-50 text-navy-900"
                            }`}
                          >
                            {vnNumber(val)}
                            {on ? <span className="sr-only"> (gần lựa chọn hiện tại)</span> : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-[12px] text-ink-500">Đơn vị: đ/sp. Hàng: sản lượng/năm · cột: chi phí/năm.</p>
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2.5 rounded-[var(--radius-card)] border border-line-200 bg-mist-50 px-5 py-4 text-[14px] leading-snug text-navy-900">
            <Clock size={18} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-blue-600" />
            <span>
              <span className="tabular font-semibold">~{vnNumber(Math.round(r.engineerHours))} giờ kỹ sư/năm</span> được giải phóng nhờ hồ sơ tự động
              (UC0: {vnNumber(inputs.dossiersPerYear)} hồ sơ × {vnNumber(inputs.hoursPerDossier)} giờ, giảm {vnNumber(inputs.timeReduction * 100)}%).
              Không quy ra tiền ở đây.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
