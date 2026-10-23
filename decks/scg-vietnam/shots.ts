/**
 * Video demo Minder cho thẻ tính năng (M18 variant "features"), dùng chung cho ba ngôn ngữ.
 * Khoá = chỉ số tính năng trong FEATURES; tiêu đề và chú thích do từng ngôn ngữ truyền vào.
 * Video quay trên bản demo SCG Song Gianh (dữ liệu mô phỏng, phụ đề tiếng Anh), tua nhanh 2×.
 */
import type { Video } from "../types";

const FILES: Record<number, string> = {
  0: "minder-video-data-connection",
  1: "minder-video-monitoring",
  2: "minder-video-fault-detection",
  3: "minder-video-ai-assistant",
  4: "minder-video-routines",
};

export function featureVideos(title: string, captions: Record<number, string>) {
  return (f: number): Video | undefined => {
    const file = FILES[f];
    if (!file) return undefined;
    return {
      src: `/decks/scg-vietnam/${file}.mp4`,
      poster: `/decks/scg-vietnam/${file}.jpg`,
      width: 1600,
      height: 900,
      title,
      caption: captions[f],
    };
  };
}
