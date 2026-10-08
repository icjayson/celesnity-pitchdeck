"use client";
/**
 * M1 — Hero "Nhà máy sống" (`#mo-dau`) và câu chuyện cuộn trang (`#sieu-thong-minh`).
 * Xem docs/implementation-plan.md mục 2 (M1) và mục 5.
 */
import { useEffect, useRef, useState } from "react";
import { StoryVisuals } from "./M1/StoryVisuals";
import { CoverVisual } from "./M1/Cover";
import { plainText } from "@/components/shared/RichText";
import type { Section } from "@/decks/types";
import { useDeck } from "@/components/deck/DeckProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";

type SceneState = 0 | 1 | 2 | 3;

/** Ba bước lấy từ bảng thuộc tính của section `sieu-thong-minh` (cột "Thuộc tính" và "Nghĩa là") */
function getSteps(sections: Section[]): { title: string; body: string }[] {
  const s = sections.find((x) => x.id === "sieu-thong-minh");
  const table = s?.blocks.find((b) => b.kind === "table");
  if (!table || table.kind !== "table") return [];
  return table.rows.slice(0, 3).map((r) => ({ title: plainText(r[0]), body: plainText(r[1]) }));
}

export default function M1({ variant }: { variant?: string }) {
  return variant === "story" ? <Story /> : <Hero />;
}

function Hero() {
  return (
    <figure className="relative -mx-4 sm:mx-0">
      <CoverVisual />
      <figcaption className="sr-only">
        Minh họa: quả cầu lưới Mô hình AI Thế giới thực với ba quỹ đạo Tự học, Dự báo trước, Nhân rộng; bên dưới là đường chân trời các nhà máy đẩy dòng dữ liệu lên mô hình.
      </figcaption>
    </figure>
  );
}

function Story() {
  const { sections, scenarios } = useDeck();
  /** Mô tả cảnh cho trình đọc màn hình (theo trạng thái) */
  const SCENE_CAPTION = scenarios.m1.captions;
  const steps = getSteps(sections);
  const reduced = useReducedMotion();
  const [active, setActive] = useState<SceneState>(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // Bước đang ở giữa khung nhìn quyết định trạng thái cảnh
  useEffect(() => {
    const els = stepRefs.current.filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const i = Number((en.target as HTMLElement).dataset.step);
          if (en.isIntersecting) setActive(i as SceneState);
          // Cuộn ngược lên trên bước 1: quay về toàn cảnh
          else if (i === 1 && en.boundingClientRect.top > window.innerHeight * 0.5) setActive(0);
        }
      },
      { rootMargin: "-48% 0px -42% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [steps.length]);

  const goTo = (i: number) => {
    stepRefs.current[i - 1]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  };

  const sceneState = active;

  return (
    <div className="relative mb-16 lg:mb-24">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
        {/* Cảnh dính: phía trên (mobile) hoặc bên trái (desktop) */}
        <div className="sticky top-0 z-10 self-start -mx-4 bg-navy-950/92 px-4 pb-3 pt-16 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-0 lg:mx-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:backdrop-blur-none">
          <figure className="mx-auto w-full max-w-[min(100%,calc((42svh)*1.54))] lg:max-w-none">
            <StoryVisuals step={sceneState === 0 ? 1 : sceneState} reduced={reduced} />
            <figcaption className="sr-only" aria-live="polite">
              {SCENE_CAPTION[sceneState === 0 ? 1 : sceneState]}
            </figcaption>
          </figure>
          <StepIndicator steps={steps} active={active} onSelect={goTo} />
        </div>

        {/* Thẻ bước cuộn qua */}
        <ol className="relative z-0 flex flex-col">
          {steps.map((st, idx) => {
            const n = idx + 1;
            const on = active === n;
            return (
              <li
                key={n}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                data-step={n}
                className={`flex py-[18svh] ${n === 3 ? "items-start pb-[22svh] lg:min-h-[140svh] lg:pb-0 lg:pt-[38svh]" : "items-center lg:min-h-[90svh] lg:py-0"} ${n === 1 ? "pt-[10svh] lg:pt-0" : ""}`}
              >
                <article
                  className={`relative w-full rounded-[var(--radius-card)] border p-6 transition-[border-color,background-color,opacity,transform] duration-500 ease-[var(--ease-brand)] sm:p-8 ${
                    on
                      ? "border-blue-500/70 bg-navy-800/90 opacity-100 shadow-[0_24px_60px_-28px_rgba(47,123,246,0.55)]"
                      : "border-navy-700 bg-navy-900/70 opacity-60"
                  }`}
                >
                  <p className="mb-3 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.14em] text-blue-300">
                    <span
                      aria-hidden
                      className={`h-px w-8 transition-colors duration-500 ${on ? "bg-orange-500" : "bg-blue-300/50"}`}
                    />
                    Bước {n} / {steps.length}
                  </p>
                  <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.015em] sm:text-[28px]">{st.title}</h3>
                  <p className="mt-3 text-[17px] leading-[1.6] text-white/85">{st.body}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function StepIndicator({
  steps,
  active,
  onSelect,
}: {
  steps: { title: string }[];
  active: number;
  onSelect: (n: number) => void;
}) {
  return (
    <nav aria-label="Các bước" className="mt-2 flex justify-center lg:mt-6">
      <ol className="flex items-center gap-2 sm:gap-3">
        {steps.map((st, idx) => {
          const n = idx + 1;
          const on = active === n;
          const label = st.title.replace(/^\d+\.\s*/, "");
          return (
            <li key={n}>
              <button
                type="button"
                onClick={() => onSelect(n)}
                aria-current={on ? "step" : undefined}
                aria-label={`Bước ${n}: ${label}`}
                className="group flex min-h-10 items-center gap-2 rounded-[var(--radius-control)] px-2 py-2 text-[13px] font-medium text-blue-300 transition-colors hover:text-white"
              >
                <span
                  aria-hidden
                  className={`h-1 rounded-full transition-all duration-500 ease-[var(--ease-brand)] ${
                    on ? "w-8 bg-orange-500" : "w-4 bg-blue-300/40 group-hover:bg-blue-300/70"
                  }`}
                />
                <span className={`hidden sm:inline ${on ? "text-white" : ""}`}>{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
