#!/usr/bin/env node
/**
 * capture-facebook-banner.mjs
 * ───────────────────────────
 * Captures the 1640x624 Facebook cover banner as PNG.
 *
 * Usage:
 *   node scripts/capture-facebook-banner.mjs [route] [outDir]
 *
 * Example:
 *   node scripts/capture-facebook-banner.mjs /socials-facebook-banner exports/facebook-banner
 */

import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { resolve } from "path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const ROUTE = process.argv[2] ?? "/socials-facebook-banner";
const OUT_DIR = process.argv[3] ?? "exports/facebook-banner";

const BANNER_W = 1640;
const BANNER_H = 624;

const outPath = resolve(process.cwd(), OUT_DIR);
mkdirSync(outPath, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1900, height: 1200 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  console.log(`→ Opening ${BASE_URL}${ROUTE} ...`);
  const response = await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "networkidle" });
  if (!response || !response.ok()) {
    throw new Error(`Failed to open ${ROUTE}: HTTP ${response?.status() ?? "no response"}`);
  }

  await page.addStyleTag({
    content: ".fixed.z-\\[100\\] { display: none !important; } .fixed.z-50.bottom-6 { display: none !important; }",
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => img.addEventListener("load", resolve, { once: true }))
      )
    );
  });
  await page.waitForTimeout(1000);

  const banner = page.locator('[data-export-target="facebook-cover"]');
  const count = await banner.count();
  if (count !== 1) {
    throw new Error(`Expected exactly one export target, found ${count}.`);
  }

  const file = resolve(outPath, "facebook-banner-1640x624.png");
  await banner.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await banner.first().screenshot({ path: file, type: "png" });

  await browser.close();
  console.log(`✅ Done. Banner saved to: ${file}`);
})().catch((err) => {
  console.error("✗", err.message);
  process.exit(1);
});
