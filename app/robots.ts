import type { MetadataRoute } from "next";
import { ROUTE_VISIBILITY } from "@/lib/route-visibility";

export default function robots(): MetadataRoute.Robots {
  const conditionalDisallow = [
    ...(!ROUTE_VISIBILITY.branchen ? ["/branchen", "/branchen/"] : []),
    ...(!ROUTE_VISIBILITY.standorte ? ["/standorte", "/standorte/"] : []),
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/font-test/", ...conditionalDisallow],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://www.bernebysolutions.de/sitemap.xml",
  };
}
