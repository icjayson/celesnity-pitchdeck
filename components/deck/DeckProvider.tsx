"use client";
/**
 * Ngữ cảnh deck phía trình duyệt. Mỗi trang /<slug> chỉ nhận đúng deck của mình (props từ server),
 * nên bundle và RSC payload của một khách hàng không chứa nội dung của khách hàng khác.
 * Component không bao giờ import trực tiếp từ decks/.
 */
import { createContext, useContext, type ReactNode } from "react";
import type { DeckData } from "@/decks/types";
import { uiFor, type Ui } from "@/lib/i18n";

const DeckContext = createContext<DeckData | null>(null);

export function DeckProvider({ deck, children }: { deck: DeckData; children: ReactNode }) {
  return (
    <DeckContext.Provider value={deck}>
      {deck.locale && deck.locale !== "vi" ? <div lang={deck.locale}>{children}</div> : children}
    </DeckContext.Provider>
  );
}

export function useDeck(): DeckData {
  const d = useContext(DeckContext);
  if (!d) throw new Error("useDeck() phải nằm trong <DeckProvider> (app/[deck]/layout.tsx).");
  return d;
}

/** Chữ giao diện dùng chung theo ngôn ngữ của deck (lib/i18n.ts) */
export function useUi(): Ui {
  return uiFor(useDeck().locale);
}
