"use client";
/**
 * Xem ảnh phóng to: bấm ảnh thì mở lớp phủ toàn màn hình, ảnh vừa khung nhìn.
 * Đóng bằng nút ×, bấm ra ngoài ảnh hoặc phím Esc; nhiều ảnh thì chuyển bằng nút hoặc phím ←/→.
 */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo as PhotoT } from "@/decks/types";
import { useUi } from "@/components/deck/DeckProvider";
import { Photo } from "./Photo";

/** Lưới ảnh bấm được: hai ảnh trở lên thì chia hai cột từ sm */
export function ZoomableImages({ images }: { images: PhotoT[] }) {
  const ui = useUi();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className={`grid grid-cols-1 gap-3 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`${ui.zoomImage}: ${img.alt}`}
            className="block cursor-zoom-in rounded-[var(--radius-card)] text-left text-navy-900 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <Photo photo={img} />
          </button>
        ))}
      </div>
      {open !== null ? <Lightbox images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} /> : null}
    </>
  );
}

function Lightbox({ images, index, onIndex, onClose }: { images: PhotoT[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ui = useUi();
  const closeRef = useRef<HTMLButtonElement>(null);
  const many = images.length > 1;
  const go = (d: number) => onIndex((index + d + images.length) % images.length);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    // Bắt phím ở pha capture và chặn lan truyền: phím mũi tên không tới danh sách tính năng phía sau
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      e.stopPropagation();
      if (e.key === "Escape") onClose();
      else if (many) go(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  });

  const img = images[index];
  const btn = "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20";
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={img.alt} className="fixed inset-0 z-[100] flex flex-col bg-[rgba(6,20,46,0.94)] backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="tabular text-[13px] text-white/70">{many ? `${index + 1} / ${images.length}` : null}</p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={ui.closeImage} className={btn}>
          <X size={20} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="100vw"
          onClick={(e) => e.stopPropagation()}
          className="h-auto max-h-[calc(100svh-8.5rem)] w-full max-w-[1600px] rounded-[12px] object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
        />
        {many ? (
          <>
            <button type="button" onClick={(e) => (e.stopPropagation(), go(-1))} aria-label={ui.prevImage} className={`${btn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-4`}>
              <ChevronLeft size={22} strokeWidth={1.75} aria-hidden />
            </button>
            <button type="button" onClick={(e) => (e.stopPropagation(), go(1))} aria-label={ui.nextImage} className={`${btn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-4`}>
              <ChevronRight size={22} strokeWidth={1.75} aria-hidden />
            </button>
          </>
        ) : null}
      </div>
      <p className="px-4 pb-5 text-center text-[14px] text-white/80 sm:px-6" onClick={(e) => e.stopPropagation()}>
        {img.alt}
      </p>
    </div>,
    document.body,
  );
}
