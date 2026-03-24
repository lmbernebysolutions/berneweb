#!/usr/bin/env node
/**
 * Ruft capture-slides.mjs für alle Story-Seiten nacheinander auf.
 *
 * Voraussetzung: pnpm dev auf PORT (Standard 3000).
 *
 * Optional: SLIDE_CAPTURE_DPR=6 für noch höhere Auflösung.
 */

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const script = join(__dirname, 'capture-slides.mjs');

/** Social-Story-Routen (360×640 Design → PNG mit DPR skaliert). /socials = Story-Canvas, 7 Slides. */
const JOBS = [
  ['/socials', 'exports/slides'],
  ['/socials-v2', 'exports/slides-v2'],
  ['/socials-kerngeschaft', 'exports/slides-kerngeschaft'],
  ['/socials-partnerschaft', 'exports/slides-partnerschaft'],
  ['/socials-referenzen', 'exports/slides-referenzen'],
];

const node = process.execPath;

for (const [route, outDir] of JOBS) {
  console.log(`\n════════ ${route} → ${outDir} ════════\n`);
  execFileSync(node, [script, route, outDir], { stdio: 'inherit', cwd: join(__dirname, '..') });
}

console.log('\n✅ Alle Story-Routen exportiert (inkl. /socials mit 7 Slides).\n');
