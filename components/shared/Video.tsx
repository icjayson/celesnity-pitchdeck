import type { Video as VideoT } from "@/decks/types";
import { RichText } from "./RichText";

/**
 * Video demo trong section: khung thẻ như ảnh, có điều khiển, không tự phát (preload chỉ metadata).
 * Bản in hiện ảnh poster thay cho video.
 */
export function Video({ video }: { video: VideoT }) {
  const { src, poster, width, height, title, caption } = video;
  return (
    <figure className="flex w-full flex-col gap-3">
      <figcaption className="text-[17px] font-semibold">
        <RichText text={title} />
      </figcaption>
      <div
        className="relative overflow-hidden rounded-[var(--radius-card)] border border-current/10 bg-navy-900 shadow-[0_24px_60px_-34px_rgba(10,31,68,0.55)]"
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <video
          className="absolute inset-0 h-full w-full object-contain print:hidden"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" className="absolute inset-0 hidden h-full w-full object-contain print:block" />
      </div>
      {caption ? (
        <p className="muted text-[14px]">
          <RichText text={caption} />
        </p>
      ) : null}
    </figure>
  );
}
