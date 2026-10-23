import type { Metadata } from "next";
import { MinderLeaflet } from "@/components/leaflet/MinderLeaflet";

export const metadata: Metadata = { title: "Minder leaflet · Celesnity" };

/** Tờ rơi gấp 3 của Minder (bản tiếng Việt): xem 3D, đóng mở và xoay nhiều chiều. Ảnh từng mặt trong public/minder-leaflet. */
export default function MinderLeafletPage() {
  return <MinderLeaflet />;
}
