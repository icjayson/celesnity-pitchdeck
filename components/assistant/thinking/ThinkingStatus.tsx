"use client";
/**
 * Thẻ "Đang suy nghĩ…" khi trợ lý chưa viết chữ nào: quả cầu chấm (thinking-orbs) đổi dáng theo từng giai đoạn,
 * dòng dưới đổi chữ theo giai đoạn bằng hiệu ứng xoá ghi, cả hai dòng có vệt sáng lướt qua, kèm số giây đã chờ.
 * Chuyển từ minder-platform (celesnity-web/app/_components/chat/thinking-status.tsx), bỏ phần tool,
 * dùng hệ màu của landing: bản sáng (ngăn chat nổi) và bản kính (trang bìa).
 */
import { useEffect, useState } from "react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";
import { TextWipe, prefersReducedMotion } from "./TextWipe";

const PHASES: readonly { state: OrbState; label: string }[] = [
  { state: "working", label: "Đang bắt đầu…" },
  { state: "searching", label: "Đang xem qua đề xuất…" },
  { state: "solving", label: "Đang tìm lời giải…" },
  { state: "weaving", label: "Đang kết nối các phần…" },
  { state: "composing", label: "Đang soạn câu trả lời…" },
];

/** Đủ lâu để đọc, đủ ngắn để chờ lâu vẫn thấy đang làm việc */
const PHASE_MS = 2600;

export function ThinkingStatus({ glass = false }: { glass?: boolean }) {
  const phase = PHASES[useThinkingPhase()] ?? PHASES[0];
  const seconds = useElapsedSeconds();

  return (
    <div
      className={`flex w-fit min-w-64 max-w-full items-center gap-3 rounded-[14px] py-2 pl-2.5 pr-4 ${
        glass
          ? "border border-white/[0.12] bg-[rgba(6,20,46,0.55)] backdrop-blur-xl"
          : "border border-blue-100 bg-blue-100/40 shadow-[0_8px_24px_-18px_rgba(10,31,68,0.35)]"
      }`}
      role="status"
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-[10px] ${glass ? "bg-white/10" : "bg-blue-100"}`}>
        <ThinkingOrb
          aria-label="Đang suy nghĩ"
          size={32}
          state={phase.state}
          theme={glass ? "dark" : "light"}
          color={glass ? "#8db8ff" : "#1f5fd6"}
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span
          className={`shimmer-text text-[14px] font-semibold leading-snug ${
            glass ? "text-white [--shimmer-base:#ffffff] [--shimmer-band:rgba(255,255,255,0.45)]" : "text-navy-900 [--shimmer-base:#0a1f44] [--shimmer-band:rgba(10,31,68,0.4)]"
          }`}
        >
          Đang suy nghĩ…
        </span>
        <span className="flex min-w-0 items-baseline gap-1">
          <span
            className={`shimmer-text truncate text-[12.5px] leading-snug ${
              glass ? "text-blue-100/75 [--shimmer-base:rgba(219,234,254,0.75)] [--shimmer-band:rgba(219,234,254,0.3)]" : "text-ink-500 [--shimmer-base:#5b6b85] [--shimmer-band:rgba(91,107,133,0.35)]"
            }`}
          >
            <TextWipe text={phase.label} />
          </span>
          {seconds > 0 ? (
            <span aria-hidden className={`shrink-0 text-[12.5px] tabular-nums ${glass ? "text-blue-100/60" : "text-ink-500"}`}>
              · {seconds}s
            </span>
          ) : null}
        </span>
      </span>
    </div>
  );
}

function useThinkingPhase(): number {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % PHASES.length), PHASE_MS);
    return () => clearInterval(timer);
  }, []);
  return index;
}

/** Số giây từ lúc bắt đầu chờ, tính theo mốc thời gian (tab nền bị giảm nhịp vẫn đúng) */
function useElapsedSeconds(): number {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => setSeconds(Math.max(0, Math.floor((Date.now() - startedAt) / 1000))), 1000);
    return () => clearInterval(timer);
  }, []);
  return seconds;
}
