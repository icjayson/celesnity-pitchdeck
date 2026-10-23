import type { Metadata } from "next";
import { MinderVideo } from "@/components/video/MinderVideo";

export const metadata: Metadata = { title: "Minder demo · Celesnity" };

/** Video demo Minder đứng riêng; mã QR "Xem video demo" trên tờ rơi trỏ về đây. */
export default function MinderVideoPage() {
  return <MinderVideo />;
}
