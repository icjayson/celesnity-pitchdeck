"use client";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Pause, Play } from "lucide-react";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Cổng chuyển động chung cho M2, M3, M7, M13:
 * chỉ chạy khi trong khung nhìn, không bật giảm chuyển động và người xem chưa bấm tạm dừng.
 */
export function useMotionGate<T extends Element>() {
  const [ref, inView] = useInView<T>("80px");
  const reduced = useReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  return {
    ref,
    inView,
    reduced,
    userPaused,
    toggle: () => setUserPaused((p) => !p),
    play: inView && !reduced && !userPaused,
  };
}

/**
 * Điều khiển hoạt ảnh SMIL của một <svg>: tạm dừng khi `play` = false.
 * Khi giảm chuyển động, đứng yên ở khung `staticAt` (giây) để hiện trạng thái tĩnh đẹp.
 */
export function useSmil(svgRef: RefObject<SVGSVGElement | null>, play: boolean, reduced: boolean, staticAt = 0) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof svg.pauseAnimations !== "function") return;
    if (reduced) {
      svg.pauseAnimations();
      try {
        svg.setCurrentTime(staticAt);
      } catch {
        /* một số trình duyệt không cho đặt thời gian khi chưa nạp xong */
      }
      return;
    }
    if (play) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [svgRef, play, reduced, staticAt]);
}

/** Nút tạm dừng / chạy hoạt ảnh (WCAG 2.2.2). Ẩn khi người dùng đã bật giảm chuyển động. */
export function MotionToggle({
  paused,
  onToggle,
  reduced,
  tone = "light",
  className = "",
}: {
  paused: boolean;
  onToggle: () => void;
  reduced: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (reduced) return null;
  const toneClass =
    tone === "dark"
      ? "text-blue-300 hover:text-white hover:bg-white/5"
      : "text-ink-500 hover:text-navy-900 hover:bg-navy-900/[0.04]";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={paused ? "Chạy hoạt ảnh" : "Tạm dừng hoạt ảnh"}
      title={paused ? "Chạy hoạt ảnh" : "Tạm dừng hoạt ảnh"}
      className={`inline-flex items-center gap-1.5 rounded-full p-1.5 text-[13px] font-medium transition-colors duration-300 ease-[var(--ease-brand)] ${toneClass} ${className}`}
    >
      {paused ? <Play aria-hidden size={14} strokeWidth={1.5} /> : <Pause aria-hidden size={14} strokeWidth={1.5} />}
    </button>
  );
}

/** Đồng hồ nhỏ: true sau `ms` kể từ khi `start` thành true (dùng cho gợi ý một lần). */
export function useAfter(start: boolean, ms: number) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!start || done) return;
    const t = window.setTimeout(() => setDone(true), ms);
    return () => window.clearTimeout(t);
  }, [start, ms, done]);
  return done;
}

/** <svg> có hoạt ảnh SMIL tự dừng/chạy theo `play`; trang trí nên mặc định aria-hidden. */
export function LoopSvg({
  play,
  reduced,
  staticAt = 0,
  viewBox,
  className,
  children,
}: {
  play: boolean;
  reduced: boolean;
  staticAt?: number;
  viewBox: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  useSmil(ref, play, reduced, staticAt);
  return (
    <svg ref={ref} viewBox={viewBox} className={className} aria-hidden focusable="false" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  );
}
