#!/usr/bin/env node
/**
 * Export Visitenkarten-Slides als PNG (volle Druckfläche inkl. Beschnitt).
 *
 * Voraussetzung: pnpm dev (http://localhost:3000)
 *
 * Usage:
 *   node scripts/capture-visitenkarten.mjs [outDir]
 *
 * Markup: Elemente mit data-visitenkarte-export="front" | "back"
 */

import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { resolve } from "path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const ROUTE = "/socials-visitenkarten";
const OUT_DIR = process.argv[2] ?? "exports/visitenkarten";
const DPR = Math.min(8, Math.max(1, Number(process.env.VISITENKARTE_CAPTURE_DPR ?? 3) || 3));
/**
 * Default viewport uses the project's design baseline where html font-size ~= 16px
 * (globals.css uses calc(100vw/85) from >=1290px, so 1360px => 16px).
 */
const VIEWPORT_W = Math.max(1000, Number(process.env.VISITENKARTE_VIEWPORT_W ?? 1360) || 1360);
const VIEWPORT_H = Math.max(700, Number(process.env.VISITENKARTE_VIEWPORT_H ?? 1000) || 1000);

const outPath = resolve(process.cwd(), OUT_DIR);
mkdirSync(outPath, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
    deviceScaleFactor: DPR,
  });
  const page = await context.newPage();
  page.setDefaultNavigationTimeout(120_000);

  console.log(`→ ${BASE_URL}${ROUTE} (DPR=${DPR})`);
  await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "load" });

  await page.addStyleTag({
    content:
      ".fixed.z-\\[100\\], .fixed.z-50.bottom-6, nextjs-portal, #nextjs__container, #nextjs-portal, [data-nextjs-dev-tools-button], [data-nextjs-toast], [data-next-badge-root], [class*='nextjs-'], [id*='nextjs'] { display: none !important; visibility: hidden !important; opacity: 0 !important; }",
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(1500);

  const lockedMode = page.locator('[data-print-preview-locked="true"]').first();
  if ((await lockedMode.count()) === 0) {
    console.error('✗ Export abgebrochen: Print Preview (Locked) nicht aktiv/gefunden.');
    await browser.close();
    process.exit(1);
  }

  for (const side of ["front", "back"]) {
    const el = page.locator(`[data-visitenkarte-export="${side}"]`).first();
    const count = await el.count();
    if (count === 0) {
      console.error(`✗ Kein Element data-visitenkarte-export="${side}"`);
      await browser.close();
      process.exit(1);
    }

    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const box = await el.boundingBox();
    if (!box) {
      console.error(`✗ ${side}: kein boundingBox`);
      continue;
    }

    const file = resolve(outPath, `visitenkarte-${side}.png`);
    await page.screenshot({
      path: file,
      type: "png",
      clip: { x: box.x, y: box.y, width: box.width, height: box.height },
      animations: "disabled",
      caret: "hide",
    });
    const w = Math.round(box.width * DPR);
    const h = Math.round(box.height * DPR);
    console.log(`  ✓ visitenkarte-${side}.png → ${file} (${w}×${h} px)`);
  }

  await browser.close();
  console.log(`\n✅ Fertig: ${outPath}`);
})().catch((err) => {
  console.error("✗", err.message);
  process.exit(1);
});
