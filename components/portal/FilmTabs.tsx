"use client";

/**
 * Home-page film with a tab bar on top: World Model → Minder.
 * Each tab's bar fills as its video plays; when one ends the next starts, and the last loops back.
 * Plays muted on load (browsers block sound until a click); the viewer can unmute, pause or pick a tab.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export type FilmTab = {
  key: string;
  label: string;
  src: string;
  poster: string;
  /** Playback speed, e.g. 1.25 for the Minder demo. */
  rate?: number;
};

const COPY = {
  play: "Play",
  pause: "Pause",
  mute: "Mute",
  unmute: "Unmute",
} as const;

export function FilmTabs({ tabs, label }: { tabs: readonly FilmTab[]; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const tab = tabs[active];

  /** Fill only the active segment, by current time; the others stay empty. */
  const paint = useCallback(() => {
    const el = video.current;
    const progress = el && el.duration ? el.currentTime / el.duration : 0;
    bars.current.forEach((bar, index) => {
      if (!bar) return;
      const value = index === active ? progress : 0;
      bar.style.transform = `scaleX(${value})`;
    });
  }, [active]);

  useEffect(() => {
    if (!playing) {
      paint();
      return;
    }
    let frame = requestAnimationFrame(function loop() {
      paint();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing, paint]);

  // New tab: apply its speed and sound setting, then start it. On first load, viewers who
  // prefer reduced motion get a still poster until they press play or pick a tab.
  const chosen = useRef(false);
  const soundOff = useRef(true);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.defaultPlaybackRate = tab.rate ?? 1;
    el.playbackRate = tab.rate ?? 1;
    el.muted = soundOff.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (chosen.current || !reduced) el.play().catch(() => setPlaying(false));
    paint();
  }, [tab, paint]);

  const select = (index: number) => {
    chosen.current = true;
    setActive(index);
  };

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      chosen.current = true;
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  };

  const toggleSound = () => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    soundOff.current = el.muted;
    setMuted(el.muted);
  };

  return (
    <figure className="relative mx-auto w-full min-w-0 max-w-[760px] xl:max-w-none motion-safe:animate-[portal-in_480ms_var(--ease-brand)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[40px] bg-blue-500/15 blur-[60px]"
      />

      <div
        role="tablist"
        aria-label={label}
        className="relative mb-4 grid grid-flow-col auto-cols-fr gap-1 rounded-full border border-navy-700 bg-navy-900/70 p-1 backdrop-blur"
      >
        {tabs.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => select(index)}
              className={`group relative h-11 overflow-hidden rounded-full px-4 text-[14px] font-medium transition-colors ${
                selected ? "bg-white/[0.06] text-white" : "text-blue-300/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {/* Progress fills the whole segment, left to right. */}
              <span
                aria-hidden
                ref={(el) => {
                  bars.current[index] = el;
                }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-blue-600/50 to-blue-500/70"
                style={{ transform: "scaleX(0)" }}
              />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="group relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-900 shadow-[0_32px_80px_-36px_rgba(47,123,246,0.6)]">
        <video
          ref={video}
          key={tab.key}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          src={tab.src}
          poster={tab.poster}
          muted
          playsInline
          preload="metadata"
          aria-label={`${label}: ${tab.label}`}
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={paint}
          onEnded={() => select((active + 1) % tabs.length)}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 sm:p-4">
          <ControlButton label={playing ? COPY.pause : COPY.play} onClick={toggle}>
            {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
          </ControlButton>
          <ControlButton label={muted ? COPY.unmute : COPY.mute} onClick={toggleSound}>
            {muted ? <VolumeX size={16} aria-hidden /> : <Volume2 size={16} aria-hidden />}
          </ControlButton>
        </div>
      </div>
    </figure>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-navy-900/70 text-white backdrop-blur transition-colors hover:bg-navy-900"
    >
      {children}
    </button>
  );
}
