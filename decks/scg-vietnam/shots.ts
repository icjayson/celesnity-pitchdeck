/**
 * Ảnh chụp Minder cho thẻ tính năng (M18 variant "features"), dùng chung cho ba ngôn ngữ.
 * Khoá = chỉ số tính năng trong FEATURES; chú thích ảnh (alt) do từng ngôn ngữ truyền vào.
 */
import type { Photo } from "../types";

const FILES: Record<number, string[]> = {
  0: ["minder-data-workflow", "minder-database"],
  1: ["minder-3d", "minder-dashboard"],
  2: ["minder-fault-detail", "minder-monitor"],
  3: ["minder-ai-chat"],
  4: ["minder-routine-report", "minder-routine-excel"],
};

export function featureShots(alts: Record<number, string[]>) {
  return (f: number): Photo[] | undefined =>
    FILES[f]?.map((file, i) => ({ src: `/decks/scg-vietnam/${file}.jpg`, alt: alts[f]?.[i] ?? "", width: 1913, height: 926 }));
}
