#!/usr/bin/env node
/**
 * Konvertiert Team-Porträts (Lennard.png, Daniel.png) zu optimiertem WebP.
 * Best practices: WebP quality 82, max-width 480px für Team-Avatare (2x Retina).
 */

import sharp from "sharp";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const teamDir = join(publicDir, "team");

const SOURCES = [
  { input: "Lennard.png", output: "lennard-meyer.webp", alt: "Lennard Meyer" },
  { input: "Daniel.png", output: "daniel-hamburg.webp", alt: "Daniel Hamburg" },
];

const MAX_WIDTH = 480;
const WEBP_QUALITY = 82;

async function main() {
  await mkdir(teamDir, { recursive: true });

  for (const { input, output } of SOURCES) {
    const inputPath = join(publicDir, input);
    const outputPath = join(teamDir, output);
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);
    console.log(`✓ ${input} → team/${output}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
