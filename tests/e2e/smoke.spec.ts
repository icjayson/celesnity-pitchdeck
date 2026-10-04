import { test, expect, type Page } from "@playwright/test";
import { allDecks } from "../../decks/all";

/** Gom lỗi console và lỗi trang trong suốt bài kiểm tra */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

for (const [slug, deck] of Object.entries(allDecks)) {
  const sections = deck.sections;

  test.describe(`smoke ${slug}`, () => {
    test(`/${slug} tải đủ section và mọi module`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(`/${slug}`);
      await expect(page.locator("[data-section]")).toHaveCount(sections.length);

      for (const s of sections) {
        await expect(page.locator(`[data-section="${s.id}"]`)).toHaveCount(1);
      }

      const modules = page.locator("[data-module]");
      const n = await modules.count();
      expect(n).toBeGreaterThan(0);
      for (let i = 0; i < n; i++) {
        const m = modules.nth(i);
        await m.scrollIntoViewIfNeeded();
        await expect(m).toBeVisible();
      }

      expect(errors, errors.join("\n")).toEqual([]);
    });

    test("phím P bật và tắt chế độ trình chiếu", async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(`/${slug}`);
      await page.locator("body").click({ position: { x: 5, y: 5 } });
      await page.keyboard.press("p");
      await expect(page.locator("html")).toHaveAttribute("data-presenter", "on");
      const hud = page.locator("[data-presenter-hud]");
      await expect(hud).toBeVisible();
      await expect(hud).toContainText(`/ ${sections.length}`);

      await page.keyboard.press("ArrowRight");
      await expect(hud).toContainText(`2 / ${sections.length}`);

      await page.keyboard.press("Escape");
      await expect(page.locator("html")).not.toHaveAttribute("data-presenter", "on");
      await expect(hud).toHaveCount(0);
      expect(errors, errors.join("\n")).toEqual([]);
    });

    for (const path of [`/${slug}/phu-luc`, `/${slug}/ban-in`]) {
      test(`${path} tải được`, async ({ page }) => {
        const errors = trackErrors(page);
        const res = await page.goto(path);
        expect(res?.status()).toBeLessThan(400);
        await expect(page.locator("main")).toBeVisible();
        expect(errors, errors.join("\n")).toEqual([]);
      });
    }
  });
}
