"use client";

/** Root portal: perspective → investor region OR buyer language → English depth. */
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  BUYER_LANGUAGES,
  INVESTOR_REGIONS,
  findBuyerDeck,
  findInvestorDeck,
  type Audience,
  type Depth,
  type Locale,
} from "@/lib/portalDecks";
import { SiteFooter } from "./footer/SiteFooter";

type Tone = "blue" | "orange";
type Glyph = "rise" | "pulse";

type Choice = {
  key: string;
  label: string;
  hint?: string;
  flags?: string;
  tone: Tone;
  glyph?: Glyph;
  compact?: boolean;
  href?: string;
  onSelect?: () => void;
};

type State = { audience?: Audience; locale?: Locale };

const COPY = {
  tagline: "Minder AI · Briefings",
  back: "Back",
  perspective: "Which perspective is yours?",
  investorRegion: "Where are you based?",
  language: "Which language do you speak?",
  depth: "How technical should we go?",
  investor: ["Investor", "Scale the intelligence"],
  buyer: ["Buyer", "Control the operation"],
  nonTechnical: ["Non-technical", "Focus on the decision"],
  technical: ["Technical", "Explore the architecture"],
  opens: "Opens the PDF in a new tab",
} as const;

export function DeckPortal() {
  const [state, setState] = useState<State>({});
  const { audience, locale } = state;

  let step: {
    title: string;
    choices: Choice[];
    back?: () => void;
    footnote?: string;
    compactGrid?: boolean;
  };

  if (!audience) {
    step = {
      title: COPY.perspective,
      choices: [
        {
          key: "investor",
          label: COPY.investor[0],
          hint: COPY.investor[1],
          tone: "blue",
          glyph: "rise",
          onSelect: () => setState({ audience: "investor" }),
        },
        {
          key: "buyer",
          label: COPY.buyer[0],
          hint: COPY.buyer[1],
          tone: "orange",
          glyph: "pulse",
          onSelect: () => setState({ audience: "buyer" }),
        },
      ],
    };
  } else if (audience === "investor") {
    step = {
      title: COPY.investorRegion,
      back: () => setState({}),
      compactGrid: true,
      choices: INVESTOR_REGIONS.map((region, index) => ({
        key: region.id,
        label: region.label,
        flags: region.flags,
        compact: true,
        tone: index % 2 === 0 ? "blue" : "orange",
        href: findInvestorDeck(region.id)?.url,
      })),
      footnote: COPY.opens,
    };
  } else if (!locale) {
    step = {
      title: COPY.language,
      back: () => setState({}),
      compactGrid: true,
      choices: BUYER_LANGUAGES.map((language, index) => {
        const isEnglish = language.id === "en";
        return {
          key: language.id,
          label: language.label,
          flags: language.flags,
          compact: true,
          tone: index % 2 === 0 ? "blue" : "orange",
          onSelect: isEnglish
            ? () => setState({ audience: "buyer", locale: "en" })
            : undefined,
          href: isEnglish ? undefined : findBuyerDeck(language.id)?.url,
        };
      }),
    };
  } else {
    const depthChoice = (depth: Depth): Choice => {
      const isTechnical = depth === "technical";
      const [label, hint] = isTechnical
        ? COPY.technical
        : COPY.nonTechnical;
      return {
        key: depth,
        label,
        hint,
        tone: isTechnical ? "orange" : "blue",
        glyph: isTechnical ? "pulse" : "rise",
        href: findBuyerDeck("en", depth)?.url,
      };
    };
    step = {
      title: COPY.depth,
      back: () => setState({ audience: "buyer" }),
      choices: [
        depthChoice("non-technical"),
        depthChoice("technical"),
      ],
      footnote: COPY.opens,
    };
  }

  return (
    <>
      <main className="theme-dark grain relative flex min-h-[100svh] flex-col overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[28%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 top-[60%] h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-[120px]"
        />

        <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
          <header className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/celesnity-mark.png" alt="" className="h-9 w-9" />
              <span className="text-[20px] font-semibold tracking-[-0.01em] text-white">
                Celesnity
              </span>
            </span>
            {step.back ? (
              <button
                type="button"
                onClick={step.back}
                className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-control)] border border-navy-700 bg-navy-900/60 px-4 text-[14px] font-medium text-blue-300 transition-colors hover:border-blue-400 hover:text-white"
              >
                <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
                {COPY.back}
              </button>
            ) : null}
          </header>

          <div className="flex flex-1 flex-col justify-center py-14 sm:py-20">
            <p className="text-center text-[13px] font-medium uppercase tracking-[0.14em] text-blue-300">
              {COPY.tagline}
            </p>
            <h1
              key={step.title}
              aria-live="polite"
              className="mx-auto mt-4 max-w-[16ch] text-balance text-center text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[52px] lg:max-w-none lg:whitespace-nowrap lg:text-[64px] motion-safe:animate-[portal-in_480ms_var(--ease-brand)]"
            >
              {step.title}
            </h1>

            <div
              className={`mx-auto mt-12 grid w-full max-w-[1176px] gap-4 sm:mt-16 lg:gap-5 ${
                step.compactGrid
                  ? "sm:grid-cols-2 xl:grid-cols-3"
                  : "xl:grid-cols-2 xl:gap-6"
              }`}
            >
              {step.choices.map((choice) => (
                <ChoiceCard
                  key={`${step.title}-${choice.key}`}
                  choice={choice}
                />
              ))}
            </div>

            {step.footnote ? (
              <p className="muted mt-6 text-center text-[14px]">
                {step.footnote}
              </p>
            ) : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

const TONE: Record<
  Tone,
  {
    card: string;
    ring: string;
    ringHover: string;
    stroke: string;
    dot: string;
  }
> = {
  blue: {
    card: "hover:border-blue-400 hover:shadow-[0_24px_60px_-30px_rgba(47,123,246,0.7)]",
    ring: "border-blue-400 text-blue-300",
    ringHover: "group-hover:border-blue-500 group-hover:bg-blue-500",
    stroke: "var(--color-blue-400)",
    dot: "var(--color-blue-500)",
  },
  orange: {
    card: "hover:border-orange-500 hover:shadow-[0_24px_60px_-30px_rgba(255,122,26,0.55)]",
    ring: "border-orange-500 text-orange-500",
    ringHover:
      "group-hover:bg-orange-500 group-hover:text-navy-900",
    stroke: "var(--color-orange-500)",
    dot: "var(--color-orange-600)",
  },
};

function ChoiceCard({ choice }: { choice: Choice }) {
  const tone = TONE[choice.tone];
  const disabled = !choice.onSelect && !choice.href;
  const flags = choice.flags?.split(" ") ?? [];
  const className = `group relative flex w-full min-w-0 max-w-full items-center text-left backdrop-blur transition duration-300 ease-[var(--ease-brand)] motion-safe:animate-[portal-in_480ms_var(--ease-brand)] ${
    choice.compact
      ? "min-h-[112px] gap-4 rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/70 p-5 sm:min-h-[124px] sm:p-6"
      : "min-h-[132px] gap-4 rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/70 p-5 sm:min-h-[168px] sm:gap-6 sm:p-8 lg:gap-5"
  } ${
    disabled
      ? "cursor-not-allowed opacity-45"
      : `hover:-translate-y-1 ${tone.card}`
  }`;

  const body = (
    <>
      {choice.flags ? (
        <span
          aria-hidden
          className={`flex shrink-0 flex-nowrap items-center justify-center gap-1.5 text-[24px] leading-none sm:gap-2 sm:text-[28px] ${
            flags.length > 2
              ? "w-[124px] sm:w-[148px]"
              : "w-[76px] sm:w-[88px]"
          }`}
        >
          {flags.map((flag) => (
            <span
              key={flag}
              className={flag === "🌍" ? "text-[0.88em]" : undefined}
            >
              {flag}
            </span>
          ))}
        </span>
      ) : (
        <Signal
          glyph={choice.glyph ?? "rise"}
          stroke={tone.stroke}
          dot={tone.dot}
        />
      )}
      <span className="min-w-0 flex-1">
        <span
          className={`block whitespace-normal font-semibold leading-tight tracking-[-0.02em] text-white ${
            choice.compact
              ? "text-[19px] sm:text-[22px]"
              : "text-[20px] sm:text-[28px]"
          }`}
        >
          {choice.label}
        </span>
        {choice.hint ? (
          <span className="muted mt-1.5 block whitespace-normal text-[14px] sm:text-[16px]">
            {choice.hint}
          </span>
        ) : null}
      </span>
      <span
        className={`grid shrink-0 place-items-center rounded-full border transition-colors duration-300 ${tone.ring} ${
          disabled ? "" : tone.ringHover
        } ${
          choice.compact ? "h-10 w-10" : "h-11 w-11 sm:h-14 sm:w-14"
        }`}
      >
        <ArrowRight
          size={choice.compact ? 19 : 22}
          strokeWidth={1.5}
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </>
  );

  if (choice.href) {
    return (
      <a
        href={choice.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={choice.onSelect}
      disabled={disabled}
      className={className}
    >
      {body}
    </button>
  );
}

function Signal({
  glyph,
  stroke,
  dot,
}: {
  glyph: Glyph;
  stroke: string;
  dot: string;
}) {
  const path =
    glyph === "rise"
      ? "M6 62 C40 62 72 52 110 18"
      : "M6 52 H44 C52 52 54 20 64 20 C74 20 76 52 86 52 H110";
  const end = glyph === "rise" ? { cx: 110, cy: 18 } : { cx: 110, cy: 52 };
  return (
    <svg
      viewBox="0 0 120 76"
      aria-hidden
      className="h-12 w-[60px] shrink-0 overflow-visible sm:h-[68px] sm:w-[104px] lg:w-[84px]"
    >
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={end.cx} cy={end.cy} r="9" fill={dot} opacity="0.25" />
      <circle
        cx={end.cx}
        cy={end.cy}
        r="4"
        fill="var(--color-white)"
        stroke={dot}
        strokeWidth="2"
      />
    </svg>
  );
}
