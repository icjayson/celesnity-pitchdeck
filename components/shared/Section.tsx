import type { Section as SectionT } from "@/content/types";
import { acts } from "@/content/content.vi";
import { Blocks } from "./Blocks";
import { DetailsPanel } from "./Details";
import { RichText } from "./RichText";
import { ModuleSlot } from "./ModuleSlot";

const themeClass: Record<SectionT["theme"], string> = {
  dark: "theme-dark grain",
  navy: "theme-navy grain",
  light: "theme-light",
  mist: "theme-mist",
};

/** Một section của trang (mục 3 của kế hoạch). `printMode` mở hết chi tiết, bỏ module. */
export function Section({ s, firstOfAct = false, printMode = false }: { s: SectionT; firstOfAct?: boolean; printMode?: boolean }) {
  const act = acts.find((a) => a.n === s.act);

  if (s.layout === "hero" && !printMode) {
    const rest = s.blocks.filter((b) => b.kind !== "module");
    const visual = s.blocks.find((b) => b.kind === "module");
    return (
      <section id={s.id} data-section={s.id} className={`${themeClass[s.theme]} relative overflow-hidden`}>
        <div className="mx-auto grid min-h-[100svh] max-w-[1280px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:pt-20">
          <div className="relative z-10 flex flex-col gap-6">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-blue-300">
              <RichText text={s.eyebrow} />
            </p>
            <h1 className="text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[60px] lg:text-[72px]">
              <RichText text={s.title} />
            </h1>
            <Blocks blocks={rest} />
          </div>
          {visual && visual.kind === "module" ? (
            <div className="relative">
              <ModuleSlot id={visual.id} variant={visual.variant} />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  const width = s.layout === "wide" || s.layout === "closing" ? "max-w-[1200px]" : "max-w-[1040px]";
  return (
    <section id={s.id} data-section={s.id} className={`${themeClass[s.theme]} relative`}>
      <div className={`mx-auto ${width} px-4 py-24 sm:px-8 sm:py-[120px] lg:py-[160px]`}>
        {firstOfAct && act ? (
          <p className="mb-10 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-orange-500">
            <span aria-hidden className="h-px w-10 bg-orange-500" />
            {act.label} · {act.title}
          </p>
        ) : null}
        <header className="mb-12 flex max-w-[920px] flex-col gap-4">
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-blue-500">
            <RichText text={s.eyebrow} />
          </p>
          <h2 className="text-balance text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[36px] lg:text-[44px]">
            <RichText text={s.title} />
          </h2>
        </header>
        <Blocks blocks={s.blocks} skipModules={printMode} />
        {(() => {
          const items = (s.details ?? []).filter((d) => printMode || !d.printOnly);
          return items.length ? (
            <div className="mt-12">
              <DetailsPanel items={items} sectionId={s.id} forceOpen={printMode} />
            </div>
          ) : null;
        })()}
      </div>
    </section>
  );
}

/** Dải chuyển nền giữa hai section (tối ↔ sáng) */
export function ThemeSeam({ from, to }: { from: SectionT["theme"]; to: SectionT["theme"] }) {
  const color = (t: SectionT["theme"]) =>
    t === "dark" ? "var(--color-navy-950)" : t === "navy" ? "var(--color-navy-900)" : t === "mist" ? "var(--color-mist-50)" : "var(--color-white)";
  const isDark = (t: SectionT["theme"]) => t === "dark" || t === "navy";
  if (isDark(from) === isDark(to)) return null;
  return <div aria-hidden className="h-[120px]" style={{ background: `linear-gradient(${color(from)}, ${color(to)})` }} />;
}
