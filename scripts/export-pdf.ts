/**
 * npm run pdf
 * Mở trang /ban-in bằng Chromium (Playwright) và lưu public/nha-may-sieu-thong-minh.pdf.
 * Cần server đang chạy (npm run dev hoặc npm run build && npm start) và trình duyệt Playwright:
 *   npx playwright install chromium
 * Script không tự cài trình duyệt.
 */
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const url = `${base}/ban-in`;
const out = resolve(root, "public/nha-may-sieu-thong-minh.pdf");

async function main() {
  try {
    const res = await fetch(url, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")?.includes("/truy-cap")) {
      console.error(`Trang đang khóa bằng ACCESS_CODE. Tạm để trống ACCESS_CODE khi xuất PDF, hoặc chạy server không có mã.`);
      process.exit(1);
    }
    if (!res.ok) {
      console.error(`${url} trả về HTTP ${res.status}.`);
      process.exit(1);
    }
  } catch {
    console.error(`Không kết nối được ${url}. Hãy chạy server trước: npm run dev (hoặc npm run build && npm start).`);
    process.exit(1);
  }

  let browser;
  try {
    browser = await chromium.launch();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/Executable doesn't exist|browserType\.launch|playwright install/i.test(msg)) {
      console.error("Chưa cài trình duyệt Playwright. Chạy: npx playwright install chromium");
    } else {
      console.error(`Không mở được Chromium: ${msg}`);
    }
    process.exit(1);
  }

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.emulateMedia({ media: "print" });
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
    });
    console.log(`Đã xuất ${out}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
