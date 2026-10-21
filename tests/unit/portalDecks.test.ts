import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  BUYER_LANGUAGES,
  INVESTOR_REGIONS,
  PORTAL_DECKS,
  PORTAL_REWRITES,
  deckPath,
  findBuyerDeck,
  findInvestorDeck,
} from "@/lib/portalDecks";

describe("deck portal routing", () => {
  it("has exactly 15 routing slots", () => {
    expect(PORTAL_DECKS).toHaveLength(15);
    expect(INVESTOR_REGIONS).toHaveLength(3);
    expect(BUYER_LANGUAGES).toHaveLength(11);
  });

  it("routes investors only by region", () => {
    for (const region of INVESTOR_REGIONS) {
      expect(findInvestorDeck(region.id)?.audience).toBe("investor");
    }
  });

  it("splits only English buyers by technical depth", () => {
    expect(findBuyerDeck("en", "non-technical")).toBeDefined();
    expect(findBuyerDeck("en", "technical")).toBeDefined();

    for (const language of BUYER_LANGUAGES.filter((item) => item.id !== "en")) {
      expect(findBuyerDeck(language.id)?.depth).toBeNull();
      expect(findBuyerDeck(language.id, "technical")).toBeUndefined();
    }
  });

  it("every assigned PDF exists in public", () => {
    for (const deck of PORTAL_DECKS) {
      if (!deck.url) continue;
      expect(existsSync(join(process.cwd(), "public", deck.url))).toBe(true);
    }
  });

  it("gives every deck a readable path", () => {
    expect(deckPath(findInvestorDeck("usa")!)).toBe("/investor-deck/usa");
    expect(deckPath(findBuyerDeck("en", "technical")!)).toBe("/sales-deck/english/technical");
    expect(deckPath(findBuyerDeck("de")!)).toBe("/sales-deck/german");

    const sources = PORTAL_REWRITES.map((rewrite) => rewrite.source);
    expect(new Set(sources).size).toBe(sources.length);
    expect(PORTAL_REWRITES).toHaveLength(PORTAL_DECKS.filter((deck) => deck.url).length);
  });
});
