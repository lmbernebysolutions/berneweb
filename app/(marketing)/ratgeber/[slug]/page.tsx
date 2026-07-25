import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { BreadcrumbNav } from "@/components/sections/breadcrumb-nav";
import { RelatedArticles } from "@/components/sections/related-articles";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  RATGEBER_DEFAULT_AUTHOR,
} from "@/lib/content/ratgeber";
import { generateBreadcrumbSchema, generateArticleSchema } from "@/lib/seo/schema";
import { COMPANY, SITE_URL } from "@/lib/constants";

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
      url: `${SITE_URL}/ratgeber/${article.slug}`,
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

function resolveAuthor(article: NonNullable<ReturnType<typeof getArticleBySlug>>) {
  const author = article.author ?? RATGEBER_DEFAULT_AUTHOR;
  return {
    name: author.name,
    role: author.role,
    url: author.url,
    image: author.image ?? RATGEBER_DEFAULT_AUTHOR.image,
  };
}

export default async function RatgeberArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const author = resolveAuthor(article);

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
    authorName: author.name,
    authorUrl: author.url.startsWith("http") ? author.url : `${SITE_URL}${author.url}`,
    articleUrl: `${SITE_URL}/ratgeber/${article.slug}`,
  });

  return (
    <>
      <Section
        bg="subtle"
        className="pt-20 sm:pt-24 md:pt-24 lg:pt-24 min-[1920px]:pt-32"
        contentClassName="pt-4 sm:pt-5 md:pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32"
      >
        <div className="mb-8">
          <BreadcrumbNav items={breadcrumbItems} />
        </div>

        <article>
          <header className="mb-12">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
              {article.cluster === "digitalisierung-handwerk" && "Digitalisierung Handwerk"}
              {article.cluster === "it-service-handwerk" && "IT-Service Handwerk"}
              {article.cluster === "ki-im-handwerk" && "KI im Handwerk"}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              {article.title}
            </h1>

            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                Key Takeaways
              </p>
              <ul className="space-y-2 text-base text-white/80 sm:text-lg">
                {article.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-cyan" aria-hidden />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href={author.url}
                className="group inline-flex items-center gap-3 rounded-sm border border-white/15 bg-white/[0.03] px-3 py-2 transition-colors hover:border-brand-cyan/40 hover:bg-brand-cyan/5"
              >
                {author.image ? (
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/20">
                    <Image
                      src={author.image}
                      alt={`Porträt ${author.name}`}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </span>
                ) : null}
                <span className="min-w-0 text-left">
                  <span className="block text-sm font-bold text-white group-hover:text-brand-cyan">
                    {author.name}
                  </span>
                  <span className="block text-xs text-white/60">{author.role}</span>
                </span>
              </Link>
              <p className="text-sm text-brand-navy-muted">
                Zuletzt aktualisiert: {formatDate(article.dateModified)}
              </p>
            </div>
          </header>

          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-brand-cyan prose-a:no-underline hover:prose-a:underline
              prose-ul:text-white/80 prose-ol:text-white/80
              prose-li:text-white/80"
            dangerouslySetInnerHTML={{
              // Content is sourced from our own curated local content files.
              __html: article.content.trim(),
            }}
          />

          <footer className="mt-16 space-y-12">
            <RelatedArticles slugs={relatedSlugs} max={4} />

            {pillarArticle && article.slug !== article.pillarSlug && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-cyan mb-4">
                  Zum Thema
                </h3>
                <Button
                  asChild
                  variant="outline"
                  className="w-full max-w-full justify-start border-brand-cyan/30 text-left normal-case tracking-normal whitespace-normal break-words leading-snug hover:bg-brand-cyan hover:!text-white"
                >
                  <Link href={`/ratgeber/${article.pillarSlug}`}>
                    <span className="min-w-0">{pillarArticle.title}</span>
                    <IconArrowRight className="ml-2 size-4 shrink-0 max-[359px]:hidden" />
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
        showRatgeberLink={false}
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
