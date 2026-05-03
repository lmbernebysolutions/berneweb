import { COMPANY } from "@/lib/constants";

const LLMS_TXT = `# Berneby Solutions

> Digital-Partner im Erzgebirge: Websites, lokale Sichtbarkeit, KI-Telefonassistent, IT-Service.

## Canonical
- https://www.bernebysolutions.de/

## Core Pages
- https://www.bernebysolutions.de/handwerk
- https://www.bernebysolutions.de/leistungen
- https://www.bernebysolutions.de/referenzen
- https://www.bernebysolutions.de/kontakt
- https://www.bernebysolutions.de/ueber-uns

## Topic Hubs
- https://www.bernebysolutions.de/ratgeber
- https://www.bernebysolutions.de/standorte
- https://www.bernebysolutions.de/branchen

## Fresh Content
- https://www.bernebysolutions.de/sitemap.xml

## Contact
- Tel: ${COMPANY.phoneDisplay}
- Mail: ${COMPANY.email}
`;

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

