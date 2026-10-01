import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: process.env.SITE_URL ?? "http://localhost:3000" },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: "mobile", use: { viewport: { width: 375, height: 812 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "laptop", use: { viewport: { width: 1280, height: 800 } } },
    { name: "wide", use: { viewport: { width: 1920, height: 1080 } } },
  ].map((p) => ({ ...p, use: { ...devices["Desktop Chrome"], ...p.use } })),
});
