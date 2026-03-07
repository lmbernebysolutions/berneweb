/**
 * Einheitliche Container-Typen für die gesamte Website.
 * Alle großen Karten/Container (außer kleine wie Zeilen-Container, Badges, Avatare) nutzen einen dieser Typen.
 *
 * Typ A – Neutral: Standard-Karten, Listen, Social-Buttons
 * Typ B – Akzent: Hervorgehobene Karten (Handwerk, Mit uns, Referenz, Zitat)
 * Typ C – Nur Struktur: border-l-4 etc., kein Vollrahmen (StatementSectionV3, WarumBernebyV3)
 */

export const CONTAINER_A =
  "border border-white/10 bg-white/[0.03] transition-all hover:border-brand-cyan/20 card-hover-glow";

export const CONTAINER_A_NO_GLOW =
  "border border-white/10 bg-white/[0.03] transition-all hover:border-brand-cyan/20";

/** Ohne Hover, ohne TechCorners – z. B. „Ohne Uns“-Panel */
export const CONTAINER_A_STATIC =
  "border border-white/10 bg-white/[0.03]";

export const CONTAINER_B =
  "border border-brand-cyan/20 bg-brand-navy/60 backdrop-blur-md transition-all hover:border-brand-cyan/40 hover:shadow-[0_0_40px_rgba(3,249,249,0.12)]";

export const CONTAINER_B_STATIC =
  "border border-brand-cyan/20 bg-brand-navy/60 backdrop-blur-md";

/** Nur Struktur (z. B. border-l-4) – keine Klassen hier, Komponenten behalten ihre border-l-4. */
export const CONTAINER_C = null;
