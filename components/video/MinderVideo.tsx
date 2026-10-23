"use client";

/**
 * Trang riêng cho video demo Minder (cùng file với phim "Minder" ở trang chủ).
 * Tự phát không tiếng ở tốc độ 1.25× như trang chủ; người xem dùng thanh điều khiển gốc để bật tiếng, tua, toàn màn hình.
 * Người xem chọn giảm chuyển động thì chỉ thấy ảnh bìa cho tới khi bấm phát.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EB_Garamond, Inter } from "next/font/google";
import type { FlowKey } from "@/components/modules/M7/Stack";
import { MinderLayerDetail, MinderLayersDiagram } from "./MinderLayers";

const heading = EB_Garamond({ subsets: ["latin"], weight: "400", display: "swap" });
const text = Inter({ subsets: ["latin"], display: "swap" });

const SRC = "/portal/minder-demo.mp4";
const POSTER = "/portal/minder-demo-poster.jpg";
const RATE = 1.25;

const COPY = {
  brand: "Celesnity",
  title: "Minder",
  subtitle: "Product demo",
  home: "Explore Minder decks",
} as const;

export function MinderVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [layer, setLayer] = useState<FlowKey>("wm");

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.defaultPlaybackRate = RATE;
    el.playbackRate = RATE;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
  }, []);

  return (
    <main className={`theme-dark grain relative flex min-h-[100svh] flex-col overflow-hidden ${text.className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-[70%] h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-[120px]"
      />

      <div className="relative mx-auto flex w-full max-w-[1640px] flex-1 flex-col px-3 py-5 sm:px-5 sm:py-8 lg:px-6">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/celesnity-mark.png" alt="" className="h-9 w-9" />
            <span className="text-[20px] font-semibold tracking-[-0.01em] text-white">{COPY.brand}</span>
          </Link>
        </header>

        <div className="flex flex-1 flex-col justify-center py-6 sm:py-8">
          <p className="text-center text-[13px] font-medium uppercase tracking-[0.14em] text-blue-300">{COPY.subtitle}</p>
          <h1
            className={`${heading.className} mt-3 text-center text-[48px] font-normal leading-[1] tracking-[-0.01em] text-white sm:text-[64px] lg:text-[72px]`}
          >
            {COPY.title}
          </h1>

          {/* Sơ đồ hai lớp bên trái, video bên phải; màn hình hẹp thì video lên trước.
              Bề rộng hai cột theo tỉ lệ khung (sơ đồ 560:548, video 16:9) để hai bên cao bằng nhau. */}
          <div className="mx-auto mt-6 grid w-full items-center gap-6 sm:mt-8 lg:grid-cols-[minmax(0,1.0219fr)_minmax(0,1.7778fr)] lg:gap-8">
            <MinderLayersDiagram active={layer} onPick={setLayer} className="order-2 lg:order-1" />
            <figure className="relative order-1 w-full min-w-0 lg:order-2">
              <span aria-hidden className="pointer-events-none absolute -inset-6 rounded-[40px] bg-blue-500/15 blur-[60px]" />
            <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] border border-navy-700 bg-navy-900 shadow-[0_32px_80px_-36px_rgba(47,123,246,0.6)]">
              <video
                ref={video}
                className="absolute inset-0 h-full w-full bg-navy-900 object-contain"
                src={SRC}
                poster={POSTER}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label={`${COPY.title} ${COPY.subtitle.toLowerCase()}`}
              />
            </div>
            </figure>
          </div>

          <MinderLayerDetail active={layer} className="mt-6 sm:mt-8" />

          <p className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-[var(--radius-control)] border border-navy-700 bg-navy-900/60 px-4 text-[14px] font-medium text-blue-300 transition-colors hover:border-blue-400 hover:text-white"
            >
              {COPY.home}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
