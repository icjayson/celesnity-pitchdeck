import type { Metadata } from "next";
import { DeckPortal } from "@/components/portal/DeckPortal";

export const metadata: Metadata = { title: "Buyer briefings · Celesnity" };

/** Portal step: buyer language. Each language's PDF is served at /sales-deck/<language>. */
export default function SalesDecks() {
  return <DeckPortal step="language" />;
}
