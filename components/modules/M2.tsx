"use client";
/** M2 — Ba làn sóng (#ky-nguyen). Đặc tả: docs/implementation-plan.md mục 2. */
import { ArrowDown, ArrowRight } from "lucide-react";
import { plainText } from "@/components/shared/RichText";
import { detailTable } from "./shared/detailContent";
import { useMotionGate } from "./shared/motion";
import { ChatArt, RobotArmArt, WorldModelArt } from "./M2/Art";

/** Tách "AI ngôn ngữ (ChatGPT, trợ lý ảo)" thành tên + phụ đề */
function splitTitle(cell: string) {
  const t = plainText(cell);
  const m = t.match(/^(.*?)\s*\((.+)\)\s*$/);
  return m ? { name: m[1], sub: m[2] } : { name: t, sub: "" };
}

const WAVE_ERAS = ["Những năm 2000", "Năm 2022", "Năm 2027"];

export default function M2(_props: { variant?: string }) {
  const { rows } = detailTable("ky-nguyen", "Bảng ba làn sóng");
  const gate = useMotionGate<HTMLDivElement>();
  const arts = [RobotArmArt, ChatArt, WorldModelArt];

  const waves = rows.slice(0, 3).map((r, i) => ({
    ...splitTitle(r[0] ?? ""),
    can: plainText(r[1] ?? ""),
    edge: plainText(r[2] ?? ""),
    Art: arts[i],
  }));

  return (
    <figure ref={gate.ref} className="relative m-0">
      <figcaption className="sr-only">
        Ba làn sóng của AI trong sản xuất, theo thứ tự.{" "}
        {waves.map((w, i) => `${WAVE_ERAS[i]}, ${w.name}: AI ${w.can.charAt(0).toLowerCase()}${w.can.slice(1)}. Ai nắm lợi thế: ${w.edge}.`).join(" ")}
      </figcaption>

      <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1.14fr)] lg:gap-2">
        {waves.map((w, i) => {
          const featured = i === 2;
          const Art = w.Art;
          return (
            <WithArrow key={i} showArrow={i > 0}>
              <article
                aria-labelledby={`m2-wave-${i}`}
                className={
                  featured
                    ? "group relative isolate flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-900 p-5 text-white shadow-[0_28px_60px_-28px_rgba(10,31,68,0.75)] transition-transform duration-500 ease-[var(--ease-brand)] hover:-translate-y-0.5 sm:p-6"
                    : "group relative flex flex-col rounded-[var(--radius-card)] border border-line-200 bg-white p-5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-24px_rgba(10,31,68,0.35)] sm:p-6"
                }
              >
                {featured ? (
                  <>
                    <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-blue-500/35 blur-[70px]" />
                    <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 -z-10 h-48 w-48 rounded-full bg-blue-500/15 blur-[60px]" />
                  </>
                ) : null}

                <p className={`tabular text-[12px] font-semibold uppercase tracking-[0.14em] ${featured ? "text-blue-300" : "text-ink-500"}`}>
                  {WAVE_ERAS[i]}
                </p>

                <div
                  className={`mt-4 h-[124px] overflow-hidden rounded-[12px] border px-2 py-1 sm:h-[136px] ${
                    featured ? "border-navy-700 bg-navy-950/40" : "border-line-200 bg-mist-50"
                  }`}
                >
                  <Art play={gate.play} reduced={gate.reduced} />
                </div>

                <h3 id={`m2-wave-${i}`} className="mt-5 text-[19px] font-semibold leading-snug tracking-[-0.01em] sm:text-[20px]">
                  {w.name}
                </h3>
                {w.sub ? (
                  <p className={`mt-0.5 text-[13px] ${featured ? "text-blue-300" : "text-ink-500"}`}>{w.sub}</p>
                ) : null}

                <dl className="mt-5 flex flex-1 flex-col gap-4 text-[15px] leading-relaxed">
                  <div>
                    <dt className={`text-[12px] font-medium uppercase tracking-[0.1em] ${featured ? "text-blue-300" : "text-ink-500"}`}>
                      AI làm được gì
                    </dt>
                    <dd className="mt-1">{w.can}</dd>
                  </div>
                  <div
                    className={
                      featured
                        ? "mt-auto rounded-[12px] border border-blue-300/30 bg-white/[0.04] p-4"
                        : "mt-auto border-t border-line-200 pt-4"
                    }
                  >
                    <dt className={`text-[12px] font-medium uppercase tracking-[0.1em] ${featured ? "text-blue-300" : "text-ink-500"}`}>
                      Ai nắm lợi thế
                    </dt>
                    <dd className={`mt-1 ${featured ? "flex items-start gap-2.5 text-[17px] font-semibold leading-snug text-white" : ""}`}>
                      {featured ? <span aria-hidden className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-orange-500" /> : null}
                      <span>{w.edge}</span>
                    </dd>
                  </div>
                </dl>
              </article>
            </WithArrow>
          );
        })}
      </div>

    </figure>
  );
}

/** Mũi tên nối giữa hai thẻ (ngang trên desktop, dọc trên điện thoại) + thẻ */
function WithArrow({ showArrow, children }: { showArrow: boolean; children: React.ReactNode }) {
  return (
    <>
      {showArrow ? (
        <div aria-hidden className="flex items-center justify-center text-ink-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line-200 bg-white">
            <ArrowDown size={14} strokeWidth={1.5} className="lg:hidden" />
            <ArrowRight size={14} strokeWidth={1.5} className="hidden lg:block" />
          </span>
        </div>
      ) : null}
      {children}
    </>
  );
}
