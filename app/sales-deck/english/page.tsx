import type { Metadata } from "next";
import { DeckPortal } from "@/components/portal/DeckPortal";

export const metadata: Metadata = { title: "Buyer briefings · English · Celesnity" };

/** Portal step: English depth. PDFs are served at /sales-deck/english/<depth>. */
export default function EnglishSalesDecks() {
  return <DeckPortal step="depth" />;
}
