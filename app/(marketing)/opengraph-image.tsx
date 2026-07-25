import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { COMPANY, PAGE_META } from "@/lib/constants";

export const alt = `${COMPANY.name} – ${PAGE_META.home.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/** Fallback-OG für alle Seiten unter `app/(marketing)` ohne eigene opengraph-image. */
const TITLE_PREFIX = "DEIN DIGITALER ";
const TITLE_ACCENT = "WERKZEUGKASTEN";
const SUBTITLE = "Webdesign & IT-Service im Erzgebirge";

/** TechCorners `lg` ≈ 16px; auf 1200×630 etwas größer für Lesbarkeit. */
const CORNER = 28;
const CORNER_BORDER = "3px solid rgba(3,249,249,0.4)";

/** Schneidet transparenten/leeren Rand ab, damit das Logo optisch zentriert sitzt. */
async function loadCenteredLogo() {
  const raw = await readFile(join(process.cwd(), "public/berneby-logo-dark.png"));
  const image = sharp(raw).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const alpha = channels === 4 ? data[i + 3]! : 255;
      const lum = data[i]! + data[i + 1]! + data[i + 2]!;
      if (alpha > 20 && lum > 30) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 4;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  const cropped = await sharp(raw)
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .png()
    .toBuffer();

  const meta = await sharp(cropped).metadata();
  return {
    src: `data:image/png;base64,${cropped.toString("base64")}`,
    width: meta.width ?? 220,
    height: meta.height ?? 102,
  };
}

export default async function Image() {
  const [logo, barlowBold] = await Promise.all([
    loadCenteredLogo(),
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/barlow@5.2.5/latin-700-normal.ttf"
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`Barlow font fetch failed: ${res.status}`);
      }
      return res.arrayBuffer();
    }),
  ]);

  // Display-Breite ~ wie Header-Logo, Seitenverhältnis aus Crop beibehalten
  const logoDisplayWidth = 360;
  const logoDisplayHeight = Math.round(
    (logoDisplayWidth / logo.width) * logo.height
  );

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#283569",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(3,249,249,0.14) 0%, transparent 55%)",
          padding: "72px 96px",
        }}
      >
        {/* TechCorners – pattern "all", variant cyan */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: CORNER,
            height: CORNER,
            borderTop: CORNER_BORDER,
            borderLeft: CORNER_BORDER,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: CORNER,
            height: CORNER,
            borderTop: CORNER_BORDER,
            borderRight: CORNER_BORDER,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: CORNER,
            height: CORNER,
            borderBottom: CORNER_BORDER,
            borderLeft: CORNER_BORDER,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: CORNER,
            height: CORNER,
            borderBottom: CORNER_BORDER,
            borderRight: CORNER_BORDER,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 40,
            width: "100%",
            maxWidth: 1000,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse/Satori braucht <img> */}
          <img
            src={logo.src}
            alt=""
            width={logoDisplayWidth}
            height={logoDisplayHeight}
            style={{
              objectFit: "contain",
              display: "flex",
            }}
          />

          {/*
            Hero-Typo: font-display + font-bold + uppercase + leading-[0.95]
            letter-spacing aus .font-display → --type-tracking-display: 0.05em
            Accent: text-brand-cyan text-[1.06em]
          */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "baseline",
              fontFamily: "Barlow",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "0.05em",
              color: "#ffffff",
              textTransform: "uppercase",
              textShadow: "0 2px 12px rgba(0,0,0,0.25)",
              maxWidth: 1000,
              textAlign: "center",
            }}
          >
            <span>{TITLE_PREFIX}</span>
            <span style={{ color: "#03f9f9", fontSize: "1.06em" }}>{TITLE_ACCENT}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Barlow",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.05em",
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {SUBTITLE}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Barlow",
          data: barlowBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
