const BASE_URL = "https://berneby.de";

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export function generateFaqSchema(faqs: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  readonly name: string;
  readonly url: string;
}

export function generateBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export interface HowToStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
}

export function generateHowToSchema(steps: readonly HowToStep[], name: string) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "HowTo" as const,
    name,
    step: steps.map((s) => ({
      "@type": "HowToStep" as const,
      position: s.step,
      name: s.title,
      text: s.description,
    })),
  };
}

// =============================================================================
// ARTICLE SCHEMA (E-E-A-T, Ratgeber)
// =============================================================================

export interface ArticleSchemaParams {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl?: string;
  articleUrl?: string;
  imageUrl?: string;
}

export function generateArticleSchema(params: ArticleSchemaParams) {
  const articleUrl = params.articleUrl ?? `${BASE_URL}/ratgeber`;
  return {
    "@context": "https://schema.org" as const,
    "@type": "Article" as const,
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    mainEntityOfPage: { "@type": "WebPage" as const, "@id": articleUrl },
    author: {
      "@type": "Person" as const,
      name: params.authorName,
      ...(params.authorUrl && { url: params.authorUrl }),
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    ...(params.imageUrl && { image: params.imageUrl }),
  };
}

// =============================================================================
// LOCAL BUSINESS SCHEMA (Location Pages)
// =============================================================================

export interface LocalBusinessSchemaParams {
  name: string;
  description: string;
  areaServed: string; // City name
  serviceRadiusKm?: number;
  addressLocality?: string;
  addressRegion?: string;
}

export function generateLocalBusinessSchema(params: LocalBusinessSchemaParams) {
  const serviceArea = params.serviceRadiusKm
    ? {
        "@type": "GeoCircle" as const,
        geoMidpoint: {
          "@type": "GeoCoordinates" as const,
          latitude: 50.5872,
          longitude: 12.7,
        },
        geoRadius: { "@type": "QuantitativeValue" as const, value: params.serviceRadiusKm, unitCode: "KMT" },
      }
    : undefined;

  return {
    "@context": "https://schema.org" as const,
    "@type": "LocalBusiness" as const,
    "@id": `${BASE_URL}/#organization`,
    name: params.name,
    description: params.description,
    areaServed: {
      "@type": "City" as const,
      name: params.areaServed,
      ...(params.addressRegion && { addressRegion: params.addressRegion }),
    },
    ...(serviceArea && { serviceArea }),
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: params.addressLocality ?? "Aue-Bad Schlema",
      addressRegion: params.addressRegion ?? "Sachsen",
      addressCountry: "DE",
    },
  };
}

// =============================================================================
// PROFESSIONAL SERVICE SCHEMA (Branchen Pages)
// =============================================================================

export interface ProfessionalServiceSchemaParams {
  name: string;
  description: string;
  serviceType: string;
}

export function generateProfessionalServiceSchema(params: ProfessionalServiceSchemaParams) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "ProfessionalService" as const,
    name: params.name,
    description: params.description,
    serviceType: params.serviceType,
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}
