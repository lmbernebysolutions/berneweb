/**
 * export-slides.ts
 * Exportiert jeden Story-Slide als 1080×1920px PNG (9:16, Instagram-ready).
 *
 * Voraussetzung: Next.js Dev-Server läuft auf http://localhost:3000
 *
 * Ausführen:
 *   npx tsx scripts/export-slides.ts
 *
 * Output: ./exports/slides/slide-01.png … slide-07.png
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE_URL   = 'http://localhost:3000/socials-v2';
const VIEWPORT   = { width: 360, height: 640 };
const SCALE      = 3;
const OUTPUT_DIR = path.join(process.cwd(), 'exports', 'slides');

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport:          VIEWPORT,
    deviceScaleFactor: SCALE,
  });
  const page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // Overlays per CSS ausblenden
  await page.addStyleTag({
    content: `
      header, nav { display: none !important; }
      a[href="#main-content"] { display: none !important; }
      nextjs-portal,
      [data-nextjs-dialog],
      [data-next-badge],
      [id^="__next-dev"],
      [id^="__next-build"] { display: none !important; }
      .cookie-manager,
      [class*="CookieManager"],
      [class*="rcm-"],
      [class*="back-to-top"],
      [class*="BackToTop"] { display: none !important; }
      ::-webkit-scrollbar { display: none; }
    `,
  });

  // Warten bis Slides im DOM erscheinen
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll('div'))
      .some(el => el.className.includes('w-[360px]') && el.className.includes('h-[640px]'));
  }, { timeout: 15000 });

  const slideCount = await page.evaluate(() =>
    Array.from(document.querySelectorAll('div'))
      .filter(el => el.className.includes('w-[360px]') && el.className.includes('h-[640px]'))
      .length
  );

  if (slideCount === 0) {
    console.error('❌ Keine Slides gefunden.');
    await browser.close();
    process.exit(1);
  }

  console.log(`✓ ${slideCount} Slides gefunden — exportiere…\n`);

  for (let i = 0; i < slideCount; i++) {
    const num      = String(i + 1).padStart(2, '0');
    const filename = `slide-${num}.png`;
    const outPath  = path.join(OUTPUT_DIR, filename);

    // Absolute Position des Slides auf der Seite ermitteln
    const box = await page.evaluate((idx: number) => {
      const slides = Array.from(document.querySelectorAll('div'))
        .filter(el => el.className.includes('w-[360px]') && el.className.includes('h-[640px]'));
      const slide = slides[idx] as HTMLElement;
      const rect  = slide.getBoundingClientRect();
      return {
        x:      rect.left + window.scrollX,
        y:      rect.top  + window.scrollY,
        width:  rect.width,
        height: rect.height,
      };
    }, i);

    await page.screenshot({ path: outPath, clip: box, fullPage: true });

    console.log(`  ✓ ${filename}  →  ${outPath}`);
  }

  await browser.close();
  console.log(`\n✅ Fertig! ${slideCount} Slides exportiert nach:\n   ${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error('Fehler:', err);
  process.exit(1);
});
