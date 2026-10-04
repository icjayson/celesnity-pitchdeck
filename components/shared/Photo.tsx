import Image from "next/image";
import type { Photo as PhotoT } from "@/decks/types";
import { RichText } from "./RichText";

/**
 * Ảnh trong section: bo góc thẻ, bóng ngả navy, chú thích nhỏ bên dưới.
 * Không phóng ảnh to hơn kích thước gốc (max-width = chiều rộng ảnh).
 */
export function Photo({ photo, className = "" }: { photo: PhotoT; className?: string }) {
  const { src, alt, width, height, caption, credit, ratio } = photo;
  return (
    <figure className={`flex w-full flex-col gap-3 ${className}`} style={{ maxWidth: ratio ? undefined : width }}>
      <div
        className="relative overflow-hidden rounded-[var(--radius-card)] border border-current/10 bg-current/[0.04] shadow-[0_24px_60px_-34px_rgba(10,31,68,0.55)]"
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={`(max-width: 768px) 100vw, ${Math.min(width, 1200)}px`}
          className={ratio ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full"}
        />
      </div>
      {caption || credit ? (
        <figcaption className="muted flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[14px]">
          {caption ? (
            <span>
              <RichText text={caption} />
            </span>
          ) : null}
          {credit ? <span className="text-[12px]">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
