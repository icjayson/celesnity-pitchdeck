import { test, expect } from "@playwright/test";
import { allDecks } from "../../decks/all";

/**
 * Ảnh chụp đối chiếu từng section ở mọi project trong playwright.config.ts
 * (mobile 375 · tablet 768 · laptop 1280 · wide 1920). Tạo ảnh gốc: npx playwright test visual --update-snapshots
 * Chuyển động tắt (reducedMotion) để ảnh ổn định.
 */
test.use({ reducedMotion: "reduce" });

for (const [slug, deck] of Object.entries(allDecks)) {
  const sections = deck.sections;

  test.describe(`visual ${slug}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${slug}`);
      await page.evaluate(() => document.fonts.ready);
      // Tắt chuyển động CSS còn sót và ẩn con trỏ nhập
      await page.addStyleTag({
        content: "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}",
      });
    });

    for (const s of sections) {
      test(`section #${s.id}`, async ({ page }) => {
        const el = page.locator(`[data-section="${s.id}"]`);
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await expect(el).toHaveScreenshot(`${slug}-${s.id}.png`, {
          maxDiffPixelRatio: 0.02,
          animations: "disabled",
          // Canvas hạt có thể khác nhau giữa các lần chạy
          mask: [el.locator("canvas")],
        });
      });
    }
  });
}
