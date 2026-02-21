import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { BreadcrumbNav } from "@/components/sections/breadcrumb-nav";
import { RelatedArticles } from "@/components/sections/related-articles";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import DOMPurify from "isomorphic-dompurify";
import {
  getArticleBySlug,
  getAllArticleSlugs,
} from "@/lib/content/ratgeber";
import { generateBreadcrumbSchema, generateArticleSchema } from "@/lib/seo/schema";
import { COMPANY } from "@/lib/constants";

const RATGEBER_ALLOWED_TAGS = ["p", "h2", "h3", "h4", "ul", "ol", "li", "a", "strong", "em", "br"];
const RATGEBER_ALLOWED_ATTR = ["href"];

const BASE_URL = "https://berneby.de";

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artikel nicht gefunden" };

  return {
    title: `${article.title} | Berneby Solutions Ratgeber`,
    description: article.description,
    alternates: { canonical: `/ratgeber/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${BASE_URL}/ratgeber/${article.slug}`,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default async function RatgeberArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Ratgeber", url: "/ratgeber" },
    { name: article.title, url: `/ratgeber/${article.slug}` },
  ];

  const pillarArticle = article.pillarSlug !== article.slug
    ? getArticleBySlug(article.pillarSlug)
    : null;

  const relatedSlugs = [
    ...(pillarArticle ? [article.pillarSlug] : []),
    ...article.relatedSlugs.filter((s) => s !== article.slug),
  ];

  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    authorName: "Lennard Meyer",
    authorUrl: `${BASE_URL}/ueber-uns`,
    articleUrl: `${BASE_URL}/ratgeber/${article.slug}`,
  });

  return (
    <>
      <Section bg="transparent" className="pt-28 sm:pt-32">
        <div className="mb-8">
          <BreadcrumbNav items={breadcrumbItems} />
        </div>

        <article>
          <header className="mb-12">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
              {article.cluster === "digitalisierung-handwerk" && "Digitalisierung Handwerk"}
              {article.cluster === "it-service-kmu" && "IT-Service KMU"}
              {article.cluster === "ki-im-handwerk" && "KI im Handwerk"}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-white/70">
              {article.description}
            </p>
            <p className="mt-4 text-sm text-brand-navy-muted">
              Zuletzt aktualisiert: {formatDate(article.dateModified)}
            </p>
          </header>

          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-brand-cyan prose-a:no-underline hover:prose-a:underline
              prose-ul:text-white/80 prose-ol:text-white/80
              prose-li:text-white/80"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content.trim(), {
                ALLOWED_TAGS: RATGEBER_ALLOWED_TAGS,
                ALLOWED_ATTR: RATGEBER_ALLOWED_ATTR,
              }),
            }}
          />

          <footer className="mt-16 space-y-12">
            <RelatedArticles slugs={relatedSlugs} max={4} />

            {pillarArticle && article.slug !== article.pillarSlug && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-cyan mb-4">
                  Zum Thema
                </h3>
                <Button asChild variant="outline" className="border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10">
                  <Link href={`/ratgeber/${article.pillarSlug}`}>
                    {pillarArticle.title} <IconArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </footer>
        </article>
      </Section>

      <div className="w-full h-px bg-brand-cyan/20 shrink-0" role="presentation" aria-hidden="true" />

      <CtaSection
        headline="Bereit für das Upgrade?"
        subline="Lassen Sie uns Ihre Digitalisierung besprechen."
        ctas={[
          { label: "Jetzt Termin vereinbaren", href: "/kontakt" },
          { label: `Anrufen: ${COMPANY.phoneDisplay}`, href: `tel:${COMPANY.phone}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
