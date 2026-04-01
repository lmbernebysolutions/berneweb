import type { Metadata } from "next";
import { IconCheck, IconLink, IconMail, IconMapPin, IconPhoneCall } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { COMPANY, VISITENKARTE_BACK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Visitenkarten — Berneby Solutions",
  description: "Druckdaten Vorder- und Rückseite (DIN-Format, Beschnitt)",
};

/**
 * Visitenkarte – Druckvorbereitung
 * ────────────────────────────────
 * Trim: 85 × 55 mm (übliches EU-Format, entspricht ca. ISO 7810 ID-1 Höhe)
 * Auflösung im Layout: 1004 × 650 CSS px ≈ 300 dpi auf Trim
 * Beschnitt: 3 mm je Seite (+36 px pro Kante bei diesem Maßstab)
 * Gesamt-Kanvas inkl. Beschnitt: 1076 × 722 px
 *
 * Safe Zone: mindestens 3 mm innerhalb der Schnittkante (hier ca. 35 px Padding
 * innerhalb der Trim-Linie).
 */
const CARD_OUTER_W = 1076;
const CARD_OUTER_H = 722;
const BLEED_PX = 36;
const BEAM_INSET = Math.round(CARD_OUTER_W * (32 / 360));
/** Trim-Breite in px (85 mm), Kalibrierung ~300 dpi */
const TRIM_W_PX = CARD_OUTER_W - 2 * BLEED_PX;
const TRIM_W_MM = 85;
const MM_PER_PT = 25.4 / 72;
const PX_PER_MM = TRIM_W_PX / TRIM_W_MM;
const SAFE_INSET_MM = 3;
const SAFE_INSET_TRIM = Math.round(SAFE_INSET_MM * PX_PER_MM);
/** 7.5–8 pt als Druckzielgröße für Kontaktzeilen auf 85 mm Trim. */
const CONTACT_TEXT_PRINT_PT = 7.8;
const CONTACT_TEXT_PRINT_PX = Math.round(CONTACT_TEXT_PRINT_PT * MM_PER_PT * PX_PER_MM);
/** Navy Muted laut Branding (Kontrast-geprüft auf Brand Navy). */
const NAVY_MUTED_HEX = "#9CAEC9";
const PRINT_LINE_TARGET_PT = 0.75;
const PRINT_LINE_PREVIEW_PX = Math.max(1, Math.round(PRINT_LINE_TARGET_PT * MM_PER_PT * PX_PER_MM));
/**
 * Wie Header/GridBeams + Hero: `BEAM_CONTAINER_CLASS` nutzt lg:px-8 (= 32px).
 * Logo-Linksbündigkeit: Beam bei BEAM_INSET, dann 32px wie TextLogo im Navbar-Container.
 */
const BEAM_TO_CONTENT_LG_PX = 32;
const CONTENT_SAFE_EDGE = BLEED_PX + SAFE_INSET_TRIM;
const LOGO_LEFT_FROM_CARD_OUTER = BEAM_INSET + BEAM_TO_CONTENT_LG_PX;
const LOGO_MARGIN_LEFT = LOGO_LEFT_FROM_CARD_OUTER - CONTENT_SAFE_EDGE;
const FRONT_CONTENT_BEAM_GAP = LOGO_MARGIN_LEFT;
/** Rueckseite: gleicher Mindestabstand Beam->Inhalt wie Front-Logo zur linken Beam. */
const BACK_CONTENT_BEAM_GAP = LOGO_MARGIN_LEFT;
/** Wie Standardseite (TextLogo size=lg): h-[3.25rem], aspect-[240/48] */
const VISITENKARTE_LOGO_H = "4.5rem";
const VISITENKARTE_LOGO_W = "22.5rem"; // 4.5rem * (240/48)
/** QR-Platzhalter 2 × 2 cm (20 mm Kantenlänge) im Trim-Maßstab (85 mm ≈ TRIM_W_PX) */
const QR_PLACEHOLDER_PX = Math.round((20 / 85) * TRIM_W_PX);
/** Logo sitzt 4–5 mm innerhalb Trim: 3 mm Safe + 1.5 mm Zusatzabstand. */
const LOGO_TOP_EXTRA_MM = 0.8;
const LOGO_TOP_EXTRA_PX = Math.round(LOGO_TOP_EXTRA_MM * PX_PER_MM);
const BRIDGE_CTA_LINE_1 = "ZUM DIGITAL-CHECK";
const LOCKED_GAP_X = 48;
const LOCKED_CANVAS_W = CARD_OUTER_W * 2 + LOCKED_GAP_X;
const BRIDGE_QR_TARGET_URL = "https://bernebysolutions.de";

type Cmyk = { c: number; m: number; y: number; k: number };
type Rgb = { r: number; g: number; b: number };
type Lab = { l: number; a: number; b: number };

function hexToRgb(hex: string): Rgb {
  const sanitized = hex.replace("#", "");
  const r = Number.parseInt(sanitized.slice(0, 2), 16);
  const g = Number.parseInt(sanitized.slice(2, 4), 16);
  const b = Number.parseInt(sanitized.slice(4, 6), 16);
  return { r, g, b };
}

function cmykToRgb({ c, m, y, k }: Cmyk): Rgb {
  const cN = c / 100;
  const mN = m / 100;
  const yN = y / 100;
  const kN = k / 100;
  const r = 255 * (1 - cN) * (1 - kN);
  const g = 255 * (1 - mN) * (1 - kN);
  const b = 255 * (1 - yN) * (1 - kN);
  return {
    r: Math.round(Math.min(255, Math.max(0, r))),
    g: Math.round(Math.min(255, Math.max(0, g))),
    b: Math.round(Math.min(255, Math.max(0, b))),
  };
}

function rgbToHex({ r, g, b }: Rgb): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

/**
 * Branded QR URL using QRCoder API.
 * Note: this embeds the API key client-side for the print preview route.
 */
function getBrandedQrSrc({
  data,
  size = 500,
  foreground = "283569",
  background = "transparent",
}: {
  data: string;
  size?: number;
  foreground?: string;
  background?: string;
}) {
  const encoded = encodeURIComponent(data);
  const base = `https://www.qrcoder.co.uk/api/v4/?key=ofWn3qI5eLQRSOj8PCZxl2ug0c6twdp7&text=${encoded}&size=${size}&foreground=${foreground}&eye_outer=${foreground}&eye_inner=${foreground}`;
  if (background === "transparent") {
    return `${base}&format=svg`;
  }
  return `${base}&background=${background}&format=png`;
}

function rgbToLab({ r, g, b }: Rgb): Lab {
  const srgbToLinear = (v: number) => {
    const n = v / 255;
    return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };

  const rL = srgbToLinear(r);
  const gL = srgbToLinear(g);
  const bL = srgbToLinear(b);

  const x = (rL * 0.4124564 + gL * 0.3575761 + bL * 0.1804375) / 0.95047;
  const y = (rL * 0.2126729 + gL * 0.7151522 + bL * 0.072175) / 1.0;
  const z = (rL * 0.0193339 + gL * 0.119192 + bL * 0.9503041) / 1.08883;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + 16 / 116);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return {
    l: (116 * fy) - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

function deltaE76(a: Lab, b: Lab): number {
  const dl = a.l - b.l;
  const da = a.a - b.a;
  const db = a.b - b.b;
  return Math.sqrt((dl * dl) + (da * da) + (db * db));
}

/** sRGB-Komposit: SVG `fill="#fff" fill-opacity="α"` über einfarbigem Hintergrund (Source-Over). */
function compositeWhiteOverBg(bg: Rgb, whiteOpacity: number): Rgb {
  const a = whiteOpacity;
  return {
    r: Math.round(255 * a + bg.r * (1 - a)),
    g: Math.round(255 * a + bg.g * (1 - a)),
    b: Math.round(255 * a + bg.b * (1 - a)),
  };
}

/**
 * Vistaprint-nahe Vorschauwerte (CMYK-Annäherung als sRGB für die Preview-Seite).
 * Ziel: weniger Neon-Eindruck als #03f9f9, näher an 4c-Druckwirkung.
 */
const PRINT_READY_COLORS = {
  navy: "#283569",
  cyan: "#19F2E6",
  white: "#FFFFFF",
} as const;

/**
 * Referenz aus Web-Logo: #fff mit fill-opacity 0.8 über Navy #283569.
 * Für die Visitenkarte nutzen wir als drucknahen Best-Kandidaten G1 (#CAD1DA).
 */
const LOGO_SOLUTIONS_SVG_WHITE_OPACITY = 0.8;
const LOGO_SOLUTIONS_ON_NAVY_RGB = compositeWhiteOverBg(hexToRgb(PRINT_READY_COLORS.navy), LOGO_SOLUTIONS_SVG_WHITE_OPACITY);
const LOGO_SOLUTIONS_ON_NAVY_HEX = rgbToHex(LOGO_SOLUTIONS_ON_NAVY_RGB);

/** Visitenkarte: CMYK-Kandidat G1 (C12 M9 Y5 K10), sRGB #CAD1DA · ΔE zu Web-Komposit siehe Tabelle unten */
const VISITENKARTE_SECONDARY_INK_HEX = "#CAD1DA";
const VISITENKARTE_GRAY_TEXT_HEX = VISITENKARTE_SECONDARY_INK_HEX;

const BRAND_ORIGINAL_CYAN = "#03F9F9";
const CMYK_CANDIDATES: Array<{ name: string; cmyk: Cmyk }> = [
  { name: "A", cmyk: { c: 100, m: 0, y: 10, k: 0 } },
  { name: "B", cmyk: { c: 95, m: 0, y: 12, k: 0 } },
  { name: "C", cmyk: { c: 90, m: 0, y: 15, k: 0 } },
  { name: "D", cmyk: { c: 85, m: 0, y: 18, k: 0 } },
  { name: "E", cmyk: { c: 80, m: 0, y: 20, k: 0 } },
  { name: "F", cmyk: { c: 90, m: 5, y: 10, k: 0 } },
  { name: "G", cmyk: { c: 95, m: 0, y: 10, k: 2 } },
];

/** CMYK-Kandidaten für den Logo-Grau-Ton (Solutions-Komposit auf Navy) — nur Vorschau ΔE, Proof drucken. */
const GRAY_CMYK_CANDIDATES: Array<{ name: string; cmyk: Cmyk }> = [
  { name: "G1", cmyk: { c: 12, m: 9, y: 5, k: 10 } },
  { name: "G2", cmyk: { c: 15, m: 11, y: 7, k: 8 } },
  { name: "G3", cmyk: { c: 10, m: 8, y: 4, k: 14 } },
  { name: "G4", cmyk: { c: 18, m: 13, y: 9, k: 5 } },
  { name: "G5", cmyk: { c: 8, m: 6, y: 3, k: 18 } },
  { name: "G6", cmyk: { c: 20, m: 15, y: 11, k: 3 } },
  { name: "G7", cmyk: { c: 14, m: 10, y: 6, k: 12 } },
  { name: "G8", cmyk: { c: 22, m: 17, y: 12, k: 0 } },
  { name: "G9", cmyk: { c: 6, m: 5, y: 2, k: 22 } },
  { name: "G10", cmyk: { c: 16, m: 12, y: 8, k: 7 } },
];

/** Inline wie `public/berneby-logo-dark-visitenkarte.svg` — vermeidet img-Text/Preload-Probleme in der Live-Vorschau. */
function BernebyVisitenkarteLogoPreview({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 48"
      className={className}
      aria-hidden
    >
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,64)">
        <g transform="scale(0.1)">
          <path
            fill="#19F2E6"
            fillRule="evenodd"
            d="m 3.92969,355.926 0.26953,-37.129 0.05469,-0.035 C 31.6406,317.855 53.543,297.043 53.543,271.5 53.543,245.805 31.3867,224.895 3.77734,224.219 L 4.07813,134.316 C 59.6289,138.797 103.988,181.43 104.762,242.109 105.504,300.309 61.9922,354.914 3.92969,355.926"
          />
          <path
            fill="#19F2E6"
            fillRule="evenodd"
            d="M 3.77344,473.934 4.07031,444.773 C 58.0508,437.191 55.3477,367.426 4.14844,360.148 L 4.06641,319.117 C 102.242,325.789 95.7422,470.422 3.77344,473.934"
          />
        </g>
      </g>
      <g
        transform="translate(18,0)"
        style={{
          fontFamily: "'Barlow', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          letterSpacing: "0.3",
        }}
      >
        <text
          x="0"
          y="29"
          textLength="61"
          lengthAdjust="spacingAndGlyphs"
          fontSize="18"
          fontWeight="700"
          fill="#ffffff"
        >
          erneby
        </text>
        <text
          x="0"
          y="46"
          textLength="61"
          lengthAdjust="spacingAndGlyphs"
          fontSize="14"
          fontWeight="400"
          fill={VISITENKARTE_GRAY_TEXT_HEX}
        >
          Solutions
        </text>
      </g>
    </svg>
  );
}

function CardShell({
  side,
  children,
}: {
  side: "front" | "back";
  children: React.ReactNode;
}) {
  return (
    <div
      data-visitenkarte-export={side}
      className="relative shrink-0 overflow-hidden shadow-2xl ring-1 ring-white/10"
      style={{ width: CARD_OUTER_W, height: CARD_OUTER_H, backgroundColor: PRINT_READY_COLORS.navy }}
    >
      {/* Beams analog Homepage-Proportion (32px bei 360px Breite) */}
      <div
        className="pointer-events-none absolute bottom-0 top-0 z-[1] w-px"
        style={{ left: BEAM_INSET, backgroundColor: "color-mix(in srgb, var(--vk-print-cyan) 20%, transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 top-0 z-[1] w-px"
        style={{ right: BEAM_INSET, backgroundColor: "color-mix(in srgb, var(--vk-print-cyan) 20%, transparent)" }}
        aria-hidden
      />

      {/* Subtile Textur */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
        aria-hidden
      />

      {/* Trim-Linie (Endformat) */}
      <div
        className="pointer-events-none absolute box-border border border-dashed border-white/25"
        style={{
          top: BLEED_PX,
          left: BLEED_PX,
          right: BLEED_PX,
          bottom: BLEED_PX,
        }}
        aria-hidden
      />

      {/* Inhalt innerhalb Trim + Safe */}
      <div
        className="absolute flex flex-col"
        style={{
          top: BLEED_PX + SAFE_INSET_TRIM,
          left: BLEED_PX + SAFE_INSET_TRIM,
          right: BLEED_PX + SAFE_INSET_TRIM,
          bottom: BLEED_PX + SAFE_INSET_TRIM,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function SocialsVisitenkartenPage() {
  const trimmedBackContactName = VISITENKARTE_BACK.contactName.slice(0, 28);
  const trimmedBackContactTitle = VISITENKARTE_BACK.contactTitle.slice(0, 44);
  const trimmedBackUsps = VISITENKARTE_BACK.uspItems.slice(0, 3).map((item) =>
    item.length > 58 ? `${item.slice(0, 55).trimEnd()}…` : item
  );

  const originalRgb = hexToRgb(BRAND_ORIGINAL_CYAN);
  const originalLab = rgbToLab(originalRgb);
  const cmykComparisons = CMYK_CANDIDATES.map((entry) => {
    const rgb = cmykToRgb(entry.cmyk);
    const hex = rgbToHex(rgb);
    const lab = rgbToLab(rgb);
    return {
      ...entry,
      hex,
      rgb,
      deltaE: deltaE76(originalLab, lab),
    };
  }).sort((a, b) => a.deltaE - b.deltaE);

  const solutionsReferenceLab = rgbToLab(LOGO_SOLUTIONS_ON_NAVY_RGB);
  const grayCmykComparisons = GRAY_CMYK_CANDIDATES.map((entry) => {
    const rgb = cmykToRgb(entry.cmyk);
    const hex = rgbToHex(rgb);
    const lab = rgbToLab(rgb);
    return {
      ...entry,
      hex,
      rgb,
      deltaE: deltaE76(solutionsReferenceLab, lab),
    };
  }).sort((a, b) => a.deltaE - b.deltaE);

  return (
    <div
      className="min-h-screen bg-[#0B0F19] p-8 font-sans md:p-10"
      style={
        {
          fontSize: 16,
          "--vk-print-cyan": PRINT_READY_COLORS.cyan,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[2400px]">
        <header className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 border border-brand-cyan/35 bg-brand-cyan/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-cyan">
            Print Preview (Locked)
          </div>
          <h1
            className="font-display text-[28px] font-bold uppercase tracking-widest md:text-[30px]"
            style={{ color: PRINT_READY_COLORS.cyan }}
          >
            Visitenkarten
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/45 md:text-[12px]">
            Vorderseite · Rückseite · {CARD_OUTER_W}×{CARD_OUTER_H}px inkl. 3&nbsp;mm Beschnitt · Trim ca. 85×55&nbsp;mm @ ~300&nbsp;dpi
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
            Für konsistente Vorschau: Browser-Zoom 100% · Export nur aus diesem Locked-Modus
          </p>
        </header>

        <div className="w-full overflow-x-auto pb-2" data-print-preview-locked="true">
          <div className="mx-auto" style={{ width: LOCKED_CANVAS_W }}>
            <div className="flex items-start justify-center gap-12" style={{ columnGap: LOCKED_GAP_X }}>
          {/* Vorderseite */}
          <div className="flex flex-col items-center gap-4">
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: PRINT_READY_COLORS.cyan }}
            >
              Vorderseite
            </p>
            <CardShell side="front">
              <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col">
                <div className="shrink-0" style={{ marginLeft: LOGO_MARGIN_LEFT, marginTop: LOGO_TOP_EXTRA_PX }}>
                  <div
                    className="shrink-0"
                    style={{ height: VISITENKARTE_LOGO_H, width: VISITENKARTE_LOGO_W }}
                  >
                    <BernebyVisitenkarteLogoPreview className="block h-full w-full object-contain object-left" />
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="flex min-h-0 flex-1 items-center">
                    <h2 className="visitenkarte-hero-headline shrink-0 pb-0">
                      <span className="block whitespace-nowrap">DIGITAL-PARTNER</span>
                      <span className="block whitespace-nowrap">
                        <span className="text-white">IM </span>
                        <span className="visitenkarte-hero-headline-accent" style={{ color: PRINT_READY_COLORS.cyan }}>
                          ERZGEBIRGE
                        </span>
                      </span>
                    </h2>
                  </div>

                  <div
                    className="flex w-full shrink-0 justify-center"
                    style={{ paddingLeft: FRONT_CONTENT_BEAM_GAP, paddingRight: FRONT_CONTENT_BEAM_GAP }}
                  >
                    <div className="flex w-fit items-center gap-8">
                      <div className="relative px-4 py-3 text-left">
                        <TechCorners pattern="diagonal" variant="cyan" size="lg" />
                        <p
                          className="font-display text-[46px] font-extrabold uppercase leading-[0.98] tracking-[0.04em] text-white"
                        >
                          {BRIDGE_CTA_LINE_1}
                        </p>
                      </div>

                      <div
                        className="group relative shrink-0 p-2"
                        style={{ width: QR_PLACEHOLDER_PX + 20, height: QR_PLACEHOLDER_PX + 20 }}
                      >
                        <div
                        aria-label="Test-QR-Code, 20 × 20 Millimeter"
                        className="box-border size-full"
                        >
                        <img
                          src={getBrandedQrSrc({
                            data: BRIDGE_QR_TARGET_URL,
                            size: 500,
                            foreground: "283569",
                            background: "transparent",
                          })}
                          alt="Test QR-Code zur Bridge-Page"
                          className="block size-full object-cover"
                          loading="eager"
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardShell>
          </div>

          {/* Rückseite */}
          <div className="flex flex-col items-center gap-4">
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: PRINT_READY_COLORS.cyan }}
            >
              Rückseite
            </p>
            <CardShell side="back">
              <div className="relative flex min-h-0 flex-1 flex-col">
                <div
                  className="pointer-events-none absolute z-20"
                  style={{
                    top: LOGO_TOP_EXTRA_PX,
                    right: -195,
                    height: VISITENKARTE_LOGO_H,
                    width: VISITENKARTE_LOGO_W,
                  }}
                  aria-hidden
                >
                  <BernebyVisitenkarteLogoPreview className="block h-full w-full object-contain object-right" />
                </div>

                <div
                  className="relative z-10 flex h-full min-h-0 flex-1 flex-col text-left"
                  style={{ marginLeft: BACK_CONTENT_BEAM_GAP, marginRight: BACK_CONTENT_BEAM_GAP }}
                >
                  <section style={{ marginTop: LOGO_TOP_EXTRA_PX }}>
                    <p
                      className="font-sans text-[28px] font-semibold uppercase tracking-[0.06em]"
                      style={{ color: VISITENKARTE_GRAY_TEXT_HEX }}
                    >
                      Persönlicher Ansprechpartner
                    </p>
                    <h3 className="mt-2 font-display text-[46px] font-extrabold uppercase leading-[0.98] tracking-[0.04em] text-white">
                      {trimmedBackContactName}
                    </h3>
                    <p
                      className="mt-1 font-display text-[30px] font-bold uppercase leading-[0.98] tracking-[0.04em]"
                      style={{ color: VISITENKARTE_GRAY_TEXT_HEX }}
                    >
                      {trimmedBackContactTitle}
                    </p>

                    {/* Druckhinweis: Strich in finalen Vektordaten mit mindestens 0.5 pt, besser 0.75 pt anlegen. */}
                    <div
                      className="mt-4 w-full max-w-[520px]"
                      style={{
                        height: PRINT_LINE_PREVIEW_PX,
                        // Preview ist Soft-Proof; Produktionsdaten: Akzentlinien final in C100 M0 Y0 K0 anlegen.
                        minHeight: 1,
                      }}
                    >
                      <div
                        className="h-full w-full"
                        style={{ backgroundColor: "color-mix(in srgb, var(--vk-print-cyan) 65%, transparent)" }}
                      />
                    </div>

                    {/* Kontaktdaten im Website-Body-Font: 7.5–8 pt Zielgroesse (hier ~7.8 pt bei 85 mm Trim). */}
                    {/* SVG-Icons in Preview; fuer Vektordruck als SVG->EPS/AI im Grafik-Workflow uebergeben. */}
                    {/* Farbhinweis: Screen-Preview nutzt Soft-Proof-Cyan; final fuer 4c-Akzente C100 M0 Y0 K0 verwenden. */}
                    <div className="mt-5 space-y-3.5">
                      <div className="flex items-center gap-3.5">
                        <IconPhoneCall
                          className="shrink-0"
                          style={{ width: 30, height: 30, color: PRINT_READY_COLORS.cyan }}
                          stroke={1.8}
                          aria-hidden
                        />
                        <p
                          className="font-sans font-medium tracking-[0.01em] text-white"
                          style={{ fontSize: CONTACT_TEXT_PRINT_PX, lineHeight: 1.1 }}
                        >
                          {COMPANY.phoneDisplay}
                        </p>
                      </div>
                      <div className="flex items-center gap-3.5">
                        <IconMail
                          className="shrink-0"
                          style={{ width: 30, height: 30, color: PRINT_READY_COLORS.cyan }}
                          stroke={1.8}
                          aria-hidden
                        />
                        <p
                          className="font-sans font-medium tracking-[0.01em] text-white"
                          style={{ fontSize: CONTACT_TEXT_PRINT_PX, lineHeight: 1.1 }}
                        >
                          {COMPANY.email}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section
                    className="relative mt-6 border bg-white/[0.03] p-5"
                    style={{ borderColor: "color-mix(in srgb, var(--vk-print-cyan) 45%, transparent)" }}
                  >
                    <ul className="relative z-10 space-y-3.5">
                      {trimmedBackUsps.map((usp) => (
                        <li key={usp} className="flex items-start gap-3">
                          <IconCheck
                            className="mt-[2px] shrink-0"
                            style={{ width: 24, height: 24, color: PRINT_READY_COLORS.cyan }}
                            stroke={2.4}
                            aria-hidden
                          />
                          <p
                            className="font-sans font-medium leading-[1.18] text-white/92"
                            style={{ fontSize: CONTACT_TEXT_PRINT_PX }}
                          >
                            {usp}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section
                    className="mt-auto border-t pt-4"
                    style={{
                      borderColor: "color-mix(in srgb, white 12%, transparent)",
                      transform: `translateY(-${LOGO_TOP_EXTRA_PX}px)`,
                    }}
                  >
                    <div className="flex w-full items-start justify-between text-white/80">
                      <div className="flex items-start gap-3">
                        <IconMapPin
                          className="mt-0.5 shrink-0"
                          style={{ width: 28, height: 28, color: PRINT_READY_COLORS.cyan }}
                          stroke={1.8}
                          aria-hidden
                        />
                        <div>
                          <p
                            className="font-sans text-[28px] font-medium leading-tight"
                            style={{ color: VISITENKARTE_GRAY_TEXT_HEX }}
                          >
                            {COMPANY.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <IconLink
                          className="mt-0.5 shrink-0"
                          style={{ width: 28, height: 28, color: PRINT_READY_COLORS.cyan }}
                          stroke={1.8}
                          aria-hidden
                        />
                        <div>
                          <p
                            className="whitespace-nowrap font-sans text-[28px] font-medium leading-tight"
                            style={{ color: VISITENKARTE_GRAY_TEXT_HEX }}
                          >
                            www.bernebysolutions.de
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </CardShell>
          </div>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-12 max-w-5xl">
          <h3 className="font-display text-[20px] font-bold uppercase tracking-wider text-white md:text-[24px]">
            Delta-E (Lab) · Marken-Cyan vs. CMYK
          </h3>
          <p className="mt-2 max-w-3xl font-mono text-[11px] uppercase tracking-wide text-white/55">
            Referenz: {BRAND_ORIGINAL_CYAN}. Niedrigeres Delta-E bedeutet näher am Original. Das ist ein mathematischer
            Richtwert, den finalen Entscheid bitte mit Testdruck treffen.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-md border border-white/15 bg-white/5 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Original (RGB Web)</p>
              <div className="mt-3 h-16 w-full border border-white/20" style={{ backgroundColor: BRAND_ORIGINAL_CYAN }} />
              <p className="mt-2 font-mono text-[11px] text-white/80">
                HEX {BRAND_ORIGINAL_CYAN} · RGB ({originalRgb.r}, {originalRgb.g}, {originalRgb.b})
              </p>
            </div>
            <div className="rounded-md border border-white/15 bg-white/5 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Bestes Match (rechnerisch)</p>
              <div
                className="mt-3 h-16 w-full border border-white/20"
                style={{ backgroundColor: cmykComparisons[0]?.hex ?? PRINT_READY_COLORS.cyan }}
              />
              <p className="mt-2 font-mono text-[11px] text-white/80">
                {cmykComparisons[0]
                  ? `${cmykComparisons[0].name}: ${cmykComparisons[0].hex} · ΔE ${cmykComparisons[0].deltaE.toFixed(2)}`
                  : "Kein Kandidat"}
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-md border border-white/15">
            <table className="w-full border-collapse">
              <thead className="bg-white/5">
                <tr className="font-mono text-[10px] uppercase tracking-wider text-white/70">
                  <th className="px-3 py-2 text-left">Rang</th>
                  <th className="px-3 py-2 text-left">Kandidat</th>
                  <th className="px-3 py-2 text-left">Farbprobe</th>
                  <th className="px-3 py-2 text-left">CMYK</th>
                  <th className="px-3 py-2 text-left">HEX (Vorschau)</th>
                  <th className="px-3 py-2 text-left">Delta-E</th>
                </tr>
              </thead>
              <tbody>
                {cmykComparisons.map((entry, idx) => (
                  <tr key={entry.name} className="border-t border-white/10 font-mono text-[11px] text-white/85">
                    <td className="px-3 py-2">{idx + 1}</td>
                    <td className="px-3 py-2">{entry.name}</td>
                    <td className="px-3 py-2">
                      <span
                        className="inline-block h-6 w-18 border border-white/25 align-middle"
                        style={{ backgroundColor: entry.hex }}
                      />
                    </td>
                    <td className="px-3 py-2">
                      C{entry.cmyk.c} M{entry.cmyk.m} Y{entry.cmyk.y} K{entry.cmyk.k}
                    </td>
                    <td className="px-3 py-2">{entry.hex}</td>
                    <td className="px-3 py-2">{entry.deltaE.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-5xl">
          <h3 className="font-display text-[20px] font-bold uppercase tracking-wider text-white md:text-[24px]">
            Delta-E (Lab) · Logo „Solutions“ (Weiß {Math.round(LOGO_SOLUTIONS_SVG_WHITE_OPACITY * 100)}% auf Navy) vs.
            CMYK
          </h3>
          <p className="mt-2 max-w-3xl font-mono text-[11px] uppercase tracking-wide text-white/55">
            Referenz: <strong className="text-white/80">berneby-logo-dark.svg</strong> („Solutions“) als{" "}
            <code className="text-white/70">#fff</code> mit Opacity 0.8 auf {PRINT_READY_COLORS.navy} → Komposit{" "}
            <strong className="text-white/90">{LOGO_SOLUTIONS_ON_NAVY_HEX}</strong>. Für Druck/Vorschau nutzen wir{" "}
            <strong className="text-white/90">G1 {VISITENKARTE_SECONDARY_INK_HEX}</strong> (Tabelle), inkl.{" "}
            <code className="text-white/70">berneby-logo-dark-visitenkarte.svg</code>.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-md border border-white/15 bg-white/5 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                Referenz (Komposit Mathematik)
              </p>
              <div
                className="mt-3 h-16 w-full border border-white/20"
                style={{ backgroundColor: LOGO_SOLUTIONS_ON_NAVY_HEX }}
              />
              <p className="mt-2 font-mono text-[11px] text-white/80">
                HEX {LOGO_SOLUTIONS_ON_NAVY_HEX} · RGB ({LOGO_SOLUTIONS_ON_NAVY_RGB.r}, {LOGO_SOLUTIONS_ON_NAVY_RGB.g},{" "}
                {LOGO_SOLUTIONS_ON_NAVY_RGB.b})
              </p>
            </div>
            <div className="rounded-md border border-white/15 bg-white/5 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Bestes CMYK-Match (rechnerisch)</p>
              <div
                className="mt-3 h-16 w-full border border-white/20"
                style={{ backgroundColor: grayCmykComparisons[0]?.hex ?? LOGO_SOLUTIONS_ON_NAVY_HEX }}
              />
              <p className="mt-2 font-mono text-[11px] text-white/80">
                {grayCmykComparisons[0]
                  ? `${grayCmykComparisons[0].name}: ${grayCmykComparisons[0].hex} · ΔE ${grayCmykComparisons[0].deltaE.toFixed(2)}`
                  : "Kein Kandidat"}
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-md border border-white/15">
            <table className="w-full border-collapse">
              <thead className="bg-white/5">
                <tr className="font-mono text-[10px] uppercase tracking-wider text-white/70">
                  <th className="px-3 py-2 text-left">Rang</th>
                  <th className="px-3 py-2 text-left">Kandidat</th>
                  <th className="px-3 py-2 text-left">Farbprobe</th>
                  <th className="px-3 py-2 text-left">CMYK</th>
                  <th className="px-3 py-2 text-left">HEX (Vorschau)</th>
                  <th className="px-3 py-2 text-left">Delta-E</th>
                </tr>
              </thead>
              <tbody>
                {grayCmykComparisons.map((entry, idx) => (
                  <tr key={entry.name} className="border-t border-white/10 font-mono text-[11px] text-white/85">
                    <td className="px-3 py-2">{idx + 1}</td>
                    <td className="px-3 py-2">{entry.name}</td>
                    <td className="px-3 py-2">
                      <span
                        className="inline-block h-6 w-18 border border-white/25 align-middle"
                        style={{ backgroundColor: entry.hex }}
                      />
                    </td>
                    <td className="px-3 py-2">
                      C{entry.cmyk.c} M{entry.cmyk.m} Y{entry.cmyk.y} K{entry.cmyk.k}
                    </td>
                    <td className="px-3 py-2">{entry.hex}</td>
                    <td className="px-3 py-2">{entry.deltaE.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside
          className="mx-auto mt-14 max-w-2xl border p-6"
          style={{
            borderStyle: "solid",
            borderColor: "color-mix(in srgb, var(--vk-print-cyan) 20%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--vk-print-cyan) 5%, transparent)",
          }}
        >
          <p
            className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest"
            style={{ color: PRINT_READY_COLORS.cyan }}
          >
            Export &amp; Druck
          </p>
          <ol className="list-decimal space-y-2 pl-5 font-mono text-[12px] leading-relaxed text-blue-100/90">
            <li>
              Dev-Server: <strong className="text-white">pnpm dev</strong>
            </li>
            <li>
              <strong className="text-white">Vektor Vorderseite (SVG):</strong> gebaute Datei unter{" "}
              <strong className="text-white">/print/visitenkarte-vorder.svg</strong> — neu erzeugen mit{" "}
              <strong className="text-white">pnpm run build:visitenkarte-svg</strong> (nach Logo-/Textänderungen).
            </li>
            <li>
              <strong className="text-white">PSD:</strong> SVG in Photoshop öffnen und als PSD speichern; für
              Profi-Druck oft <strong className="text-white">PDF/X</strong> aus Illustrator/InDesign bevorzugt.
            </li>
            <li>
              PNGs (nur Locked-Modus): <strong className="text-white">pnpm run capture:visitenkarten</strong> →{" "}
              <strong className="text-white">exports/visitenkarten/</strong>
            </li>
            <li>
              Optional höhere Auflösung:{" "}
              <strong className="text-white">VISITENKARTE_CAPTURE_DPR=4 pnpm run capture:visitenkarten</strong>
            </li>
            <li>
              In der Druckerei: <strong className="text-white">3 mm Beschnitt</strong> aktivieren; Schnittkante =
              gestrichelte Linie; Farbraum CMYK nach Wunsch der Druckerei.
            </li>
          </ol>
        </aside>
      </div>
    </div>
  );
}
