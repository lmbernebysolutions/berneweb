#!/usr/bin/env node
/**
 * Erzeugt eine eigenständige Vektor-Vorderseite der Visitenkarte als SVG.
 *
 * Bewährte Druck-Praxis:
 * - Physische Größe in mm (Endformat + 3 mm Beschnitt)
 * - viewBox in Design-Pixeln (1:1 zu /socials-visitenkarten)
 * - Logo aus berneby-logo-dark-visitenkarte.svg (B in Druck-Cyan #19F2E6)
 * - Live-Text — vor Produktion ggf. in Illustrator/Inkscape in Pfade umwandeln
 *
 * PSD: Photoshop „Datei → Öffnen“ wählt SVG; oder PDF/X aus InDesign für die Druckerei.
 *
 * Usage: node scripts/build-visitenkarte-vorder-svg.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const logoPath = join(root, "public", "berneby-logo-dark-visitenkarte.svg");
/** Wie Next/Google Fonts: drei @font-face mit gleichem family-Namen, unterschiedliche unicode-range + woff2. */
const BARLOW_800_SPLITS = [
  {
    file: "barlow-800-split-vietnamese.woff2",
    unicodeRange:
      "U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB",
  },
  {
    file: "barlow-800-split-latin-ext.woff2",
    unicodeRange:
      "U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF",
  },
  {
    file: "barlow-800-split-latin.woff2",
    unicodeRange:
      "U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  },
];
const outDir = join(root, "public", "print");
const outFile = join(outDir, "visitenkarte-vorder.svg");

const DATA = {
  line1: "DIGITAL-PARTNER",
  line2Prefix: "IM ",
  line2Accent: "ERZGEBIRGE",
};

const W = 1076;
const H = 722;
const BLEED = 36;
/** Wie page.tsx SAFE_INSET_TRIM — Abstand Schnittkante → Safe-Inhalt */
const SAFE = 28;
const INNER_X = BLEED + SAFE;
const INNER_Y = BLEED + SAFE;
const INNER_W = W - 2 * INNER_X;
const INNER_H = H - 2 * INNER_Y;
const TRIM_W = W - 2 * BLEED;
const TRIM_H = H - 2 * BLEED;
const BEAM_INSET = Math.round(W * (32 / 360));
/** lg:px-8 — gleicher Abstand Beam → Inhalt wie Header/Hero */
const BEAM_TO_CONTENT_LG = 32;
/** 2 × 2 cm auf Trim 85 mm */
const QR_PLACEHOLDER_PX = Math.round((20 / 85) * TRIM_W);

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


function extractLogoInner(svgRaw) {
  let s = svgRaw.replace(/^\uFEFF?/, "").trim();
  s = s.replace(/<title[\s\S]*?<\/title>/gi, "");
  s = s.replace(/aria-labelledby="[^"]*"/gi, "");
  s = s.replace(/role="img"/gi, "");
  const m = s.match(/<svg[^>]*>/i);
  if (!m || m.index === undefined) throw new Error("Logo SVG: kein öffnendes <svg> gefunden");
  const close = s.lastIndexOf("</svg>");
  if (close === -1) throw new Error("Logo SVG: kein schließendes </svg>");
  const start = m.index + m[0].length;
  return s.slice(start, close).trim();
}

mkdirSync(outDir, { recursive: true });

const logoInner = extractLogoInner(readFileSync(logoPath, "utf8"));
const barlowEmbeddedFontFaces = BARLOW_800_SPLITS.map(({ file, unicodeRange }) => {
  const b64 = readFileSync(join(root, "public", "fonts", file)).toString("base64");
  return `@font-face{font-family:'BarlowEmbedded';src:url("data:font/woff2;base64,${b64}")format("woff2");font-weight:800;font-style:normal;unicode-range:${unicodeRange}}`;
}).join("");
const LOGO_SCALE = 52 / 48;
const indentedLogo = logoInner
  .split("\n")
  .map((line) => "    " + line)
  .join("\n");

/** Entspricht .visitenkarte-hero-headline (6rem @ 16px) */
const HERO_FS = 96;
const HERO_LH = 0.95;
const HERO_TRACKING_EM = -0.05;
/** Entspricht mt-12 (3rem @ 16px): Abstand Logo↔Headline und Headline↔QR */
const BLOCK_VERTICAL_GAP = 48;
const LOGO_GAP = BLOCK_VERTICAL_GAP;
const LOGO_VIS_H = 52;
const logoX = BEAM_INSET + BEAM_TO_CONTENT_LG;
const headlineX = INNER_X;
const stackTop = INNER_Y;
const headlineY1 = stackTop + LOGO_VIS_H + LOGO_GAP + HERO_FS * 0.74;
const headlineY2 = headlineY1 + HERO_FS * HERO_LH;
const accentFs = HERO_FS * 1.06;
const qrCenterX = INNER_X + INNER_W / 2;
/** Unterkante der zweiten Headline-Zeile → BLOCK_VERTICAL_GAP bis QR-Oberkante (wie Live-Vorschau) */
const headlineBlockBottom = headlineY2 + HERO_FS * 0.22;
const qrY = headlineBlockBottom + BLOCK_VERTICAL_GAP;
/** QR exakt mittig */
const qrX = qrCenterX - QR_PLACEHOLDER_PX / 2;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
  width="91mm"
  height="63mm"
  viewBox="0 0 ${W} ${H}"
  role="img"
  aria-label="Berneby Solutions Visitenkarte Vorderseite">
  <title>Berneby Solutions — Visitenkarte Vorderseite</title>
  <desc>Druckdaten: 85×55 mm Endformat, 3 mm Beschnitt. Schnittkante gestrichelt.</desc>

  <defs>
    <style><![CDATA[
      ${barlowEmbeddedFontFaces}
    ]]></style>
    <filter id="vk-hero-ds" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="#283569"/>

  <rect x="${BLEED}" y="${BLEED}" width="${TRIM_W}" height="${TRIM_H}"
    fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1" stroke-dasharray="8 6"/>

  <line x1="${BEAM_INSET}" y1="0" x2="${BEAM_INSET}" y2="${H}" stroke="#19F2E6" stroke-opacity="0.2" stroke-width="1"/>
  <line x1="${W - BEAM_INSET}" y1="0" x2="${W - BEAM_INSET}" y2="${H}" stroke="#19F2E6" stroke-opacity="0.2" stroke-width="1"/>

  <g transform="translate(${logoX},${stackTop}) scale(${LOGO_SCALE})">
${indentedLogo}
  </g>

  <g filter="url(#vk-hero-ds)">
    <text x="${headlineX}" y="${headlineY1}"
      font-family="'BarlowEmbedded'"
      font-size="${HERO_FS}" font-weight="800" letter-spacing="${HERO_TRACKING_EM}em" fill="#ffffff">${escapeXml(DATA.line1)}</text>
    <text x="${headlineX}" y="${headlineY2}"
      font-family="'BarlowEmbedded'"
      font-size="${HERO_FS}" font-weight="800" letter-spacing="${HERO_TRACKING_EM}em">
      <tspan fill="#ffffff">${escapeXml(DATA.line2Prefix)}</tspan>
      <tspan fill="#19F2E6" font-size="${accentFs}">${escapeXml(DATA.line2Accent)}</tspan>
    </text>
  </g>

  <g aria-label="QR Platzhalter 2 cm">
    <rect x="${qrX}" y="${qrY}" width="${QR_PLACEHOLDER_PX}" height="${QR_PLACEHOLDER_PX}" fill="rgba(255,255,255,0.04)" stroke="#19F2E6" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="${qrX + QR_PLACEHOLDER_PX / 2}" y="${qrY + QR_PLACEHOLDER_PX / 2 + 4}" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="rgba(255,255,255,0.45)">QR 2cm</text>
  </g>
</svg>
`;

writeFileSync(outFile, svg.trim() + "\n", "utf8");
console.log(`Wrote ${outFile}`);
