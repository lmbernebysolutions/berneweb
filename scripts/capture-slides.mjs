#!/usr/bin/env node
/**
 * capture-slides.mjs
 * ──────────────────
 * Captures each 360×640 Slide component from a socials page as a PNG.
 *
 * Usage:
 *   node scripts/capture-slides.mjs [route] [outDir]
 *
 * Examples:
 *   node scripts/capture-slides.mjs /socials-v2           exports/slides
 *   node scripts/capture-slides.mjs /socials-kerngeschaft exports/slides-kerngeschaft
 *
 * The script expects the Next.js dev server to already be running on http://localhost:3000.
 * If it is not, start it first with:  pnpm dev
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const BASE_URL  = process.env.BASE_URL  ?? 'http://localhost:3000';
const ROUTE     = process.argv[2]       ?? '/socials-kerngeschaft';
const OUT_DIR   = process.argv[3]       ?? 'exports/slides-kerngeschaft';

// Instagram Story canvas size
const SLIDE_W   = 360;
const SLIDE_H   = 640;

// Device pixel ratio for 1080×1920 equivalent export
const DPR       = 3;

const outPath = resolve(process.cwd(), OUT_DIR);
mkdirSync(outPath, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport:            { width: 1800, height: 900 },
    deviceScaleFactor:   DPR,
  });
  const page = await context.newPage();

  console.log(`→ Opening ${BASE_URL}${ROUTE} …`);
  await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'networkidle' });

  // Hide the cookie banner overlay without hiding the whole page (react-cookie-manager renders its banner as a fixed element)
  await page.addStyleTag({ content: '.fixed.z-\\[100\\] { display: none !important; } .fixed.z-50.bottom-6 { display: none !important; }' });

  // Wait for fonts to fully load and render
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(1500);

  // Find every top-level 360×640 slide container
  const slides = await page.locator(`div[style*="360px"][style*="640px"], div.w-\\[360px\\].h-\\[640px\\]`).all();

  // Fallback: find by exact dimensions via evaluate
  let elements = slides;
  if (elements.length === 0) {
    console.log('  Primary selector found nothing; falling back to dimension scan …');
    const handles = await page.evaluateHandle(() => {
      return Array.from(document.querySelectorAll('div')).filter(el => {
        const r = el.getBoundingClientRect();
        return Math.round(r.width) === 360 && Math.round(r.height) === 640;
      });
    });
    const jsArray = await handles.getProperties();
    for (const [, handle] of jsArray) {
      const el = handle.asElement();
      if (el) elements.push(el);
    }
  }

  if (elements.length === 0) {
    console.error('✗ No 360×640 slides found on the page. Make sure the dev server is running and the route is correct.');
    await browser.close();
    process.exit(1);
  }

  console.log(`  Found ${elements.length} slide(s).`);

  for (let i = 0; i < elements.length; i++) {
    const num     = String(i + 1).padStart(2, '0');
    const file    = resolve(outPath, `slide-${num}.png`);
    const el      = elements[i];

    // Scroll element into view so it is fully visible
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    await el.screenshot({ path: file, type: 'png' });
    console.log(`  ✓ slide-${num}.png  →  ${file}`);
  }

  await browser.close();
  console.log(`\n✅  Done. ${elements.length} slide(s) saved to: ${outPath}`);
})().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
