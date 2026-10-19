import type { Metadata } from "next";
import { DeckPortal } from "@/components/portal/DeckPortal";

export const metadata: Metadata = { title: "Minder AI · Celesnity" };

/** Root portal: investor region or buyer language; only English buyers choose technical depth. */
export default function Root() {
  return <DeckPortal />;
}
