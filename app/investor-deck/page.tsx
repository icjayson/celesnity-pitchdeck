import type { Metadata } from "next";
import { DeckPortal } from "@/components/portal/DeckPortal";

export const metadata: Metadata = { title: "Investor briefings · Celesnity" };

/** Portal step: investor region. Each region's PDF is served at /investor-deck/<region>. */
export default function InvestorDecks() {
  return <DeckPortal step="investor" />;
}
