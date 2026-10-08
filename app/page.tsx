import type { Metadata } from "next";
import { DeckPortal } from "@/components/portal/DeckPortal";

export const metadata: Metadata = { title: "Minder AI · Celesnity" };

/** Trang gốc: cổng chọn deck PDF theo vai trò, ngôn ngữ và mức kỹ thuật (chuyển từ minder-decks.vercel.app). */
export default function Root() {
  return <DeckPortal />;
}
