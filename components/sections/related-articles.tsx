import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import type { RatgeberArticle } from "@/lib/content/ratgeber";
import { getArticleBySlug } from "@/lib/content/ratgeber";

interface RelatedArticlesProps {
  slugs: readonly string[];
  /** Optional: max number to show */
  max?: number;
}

export function RelatedArticles({ slugs, max = 4 }: RelatedArticlesProps) {
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is RatgeberArticle => a != null)
    .slice(0, max);

  if (articles.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-cyan">
        Verwandte Artikel
      </h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/ratgeber/${article.slug}`}
              className="group relative flex flex-col overflow-hidden border border-white/10 bg-brand-navy/60 p-5 backdrop-blur-md transition-all hover:border-brand-cyan/20 card-hover-glow block"
            >
              <TechCorners pattern="diagonal" variant="cyan" size="sm" />
              <span className="relative z-10 font-medium text-white group-hover:text-brand-cyan transition-colors">
                {article.title}
              </span>
              <span className="relative z-10 mt-1 flex items-center gap-1 text-xs text-white/50 group-hover:text-brand-cyan/80">
                Weiterlesen <IconArrowRight className="size-3" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
