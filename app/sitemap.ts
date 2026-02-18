import type { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/content/ratgeber";
import { getAllLocationSlugs } from "@/lib/data/locations";
import { getAllBranchenSlugs } from "@/lib/data/branchen";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://berneby.de";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/handwerk`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/tech`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/ratgeber`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/standorte`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/branchen`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/ueber-uns`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/kontakt`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const ratgeberUrls: MetadataRoute.Sitemap = getAllArticleSlugs().map((slug) => ({
    url: `${baseUrl}/ratgeber/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationUrls: MetadataRoute.Sitemap = getAllLocationSlugs().map((ort) => ({
    url: `${baseUrl}/standorte/${ort}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const branchenUrls: MetadataRoute.Sitemap = getAllBranchenSlugs().map((slug) => ({
    url: `${baseUrl}/branchen/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...ratgeberUrls, ...locationUrls, ...branchenUrls];
}
