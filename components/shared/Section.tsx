import type { Act, Section as SectionT } from "@/decks/types";
import { Blocks } from "./Blocks";
import { DetailsPanel } from "./Details";
import { RichText, plainText } from "./RichText";
import { BrandLockup } from "./BrandLockup";
import { ModuleSlot } from "./ModuleSlot";

const themeClass: Record<SectionT["theme"], string> = {
  dark: "theme-dark grain",
  navy: "theme-navy grain",
  light: "theme-light",
  mist: "theme-mist",
};

/** Một section của trang (mục 3 của kế hoạch). `printMode` mở hết chi tiết, bỏ module. */
export function Section({
  s,
  acts,
  partner,
  firstOfAct = false,
  printMode = false,
}: {
  s: SectionT;
  acts: Act[];
  /** Tên ngắn của khách hàng (deck.party.short) */
  partner?: string;
  firstOfAct?: boolean;
  printMode?: boolean;
}) {
  const act = acts.find((a) => a.n === s.act);

  if (s.layout === "hero" && !printMode) {
    const rest = s.blocks.filter((b) => b.kind !== "module");
    const visual = s.blocks.find((b) => b.kind === "module");
    return (
      <section id={s.id} data-section={s.id} className={`${themeClass[s.theme]} relative isolate overflow-hidden`}>
        {s.cover ? (
          <div aria-hidden className="absolute inset-0 -z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.cover}
              alt=""
              className={`h-full w-full object-cover object-[70%_45%] ${s.coverSoft ? "scale-[1.04] blur-[1.5px]" : ""}`}
            />
            {s.coverSoft ? <div className="absolute inset-0 bg-[rgba(6,20,46,0.28)]" /> : null}
            {/* gradient navy: đậm bên trái để đọc chữ, nhạt dần sang phải để lộ ảnh */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#06142E_0%,rgba(6,20,46,0.93)_30%,rgba(6,20,46,0.7)_55%,rgba(6,20,46,0.45)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,46,0.55)_0%,rgba(6,20,46,0)_30%,rgba(6,20,46,0)_65%,#06142E_100%)]" />
          </div>
        ) : null}
        <div className={`mx-auto grid min-h-[100svh] max-w-[1280px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-28 sm:px-8 lg:gap-6 lg:pt-20 ${visual ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[minmax(0,1.5fr)_1fr]"}`}>
          <div className="relative z-10 flex flex-col gap-6">
            <BrandLockup label={plainText(s.eyebrow)} />
            <h1 className="whitespace-pre-line text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[60px] lg:text-[72px]">
              <RichText text={s.title} />
            </h1>
            {/* chú thích ở trang bìa lớn hơn 125% so với note thường (14px → 17,5px) */}
            <div className="flex flex-col gap-6 [&_p.muted]:text-[17.5px]">
              <Blocks blocks={rest} partner={partner} />
            </div>
          </div>
          {visual && visual.kind === "module" ? (
            <div className="relative">
              <ModuleSlot id={visual.id} variant={visual.variant} />
            </div>
          ) : (
            // Chỗ đặt khung chat trợ lý trên desktop (components/assistant/Assistant.tsx tự canh theo phần tử này)
            <div data-hero-chat-slot aria-hidden className="hidden h-[min(620px,72svh)] w-full max-w-[440px] justify-self-end lg:block" />
          )}
        </div>
      </section>
    );
  }

  const width = s.layout === "wide" || s.layout === "closing" ? "max-w-[1200px]" : "max-w-[1040px]";
  return (
    <section id={s.id} data-section={s.id} className={`${themeClass[s.theme]} relative`}>
      <div className={`mx-auto ${width} px-4 py-24 sm:px-8 sm:py-[120px] lg:py-[160px]`}>
        {firstOfAct && act ? (
          <p className="mb-10 flex items-center gap-3 text-[22px] font-semibold tracking-[-0.01em] text-orange-700">
            {act.label} {act.title}
          </p>
        ) : null}
        <header className="mb-12 flex flex-col gap-4">
          <p className="text-[22px] font-medium tracking-[-0.01em] text-blue-500">
            <RichText text={s.eyebrow} />
          </p>
          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[36px] lg:text-[44px]">
            <RichText text={s.title} />
          </h2>
        </header>
        <Blocks blocks={s.blocks} skipModules={printMode} partner={partner} />
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
