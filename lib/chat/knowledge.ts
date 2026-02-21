/**
 * Chat – Wissensbasis für FAQ-Modus (Phase 1: exaktes/Ähnlichkeits-Match ohne Embeddings).
 * FAQ aus constants; Ratgeber-Links aus ratgeber.ts.
 */

import { HOME_MINI_FAQ, FAQ_ITEMS } from "@/lib/constants";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/content/ratgeber";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface RatgeberLink {
  title: string;
  slug: string;
  description: string;
}

/** Alle FAQ-Einträge (Home-Mini + vollständige FAQ) für Retrieval. */
export function getFaqEntries(): FaqEntry[] {
  const home = HOME_MINI_FAQ.map((item) => ({ question: item.question, answer: item.answer }));
  const full = FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer }));
  const seen = new Set<string>();
  const result: FaqEntry[] = [];
  for (const entry of [...home, ...full]) {
    const key = entry.question.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(entry);
  }
  return result;
}

/** Ratgeber-Artikel als Links (title, slug, description) für „Weiterlesen“. */
export function getRatgeberLinks(): RatgeberLink[] {
  const slugs = getAllArticleSlugs();
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => a != null)
    .map((a) => ({ title: a.title, slug: a.slug, description: a.description }));
}

/**
 * Einfaches FAQ-Match: User-Text mit Fragen abgleichen (Kleinbuchstaben, Trim).
 * Gibt passende Antwort oder null.
 */
export function matchFaqQuery(userText: string): { answer: string; question: string } | null {
  const normalized = userText.trim().toLowerCase();
  if (normalized.length < 2) return null;
  const entries = getFaqEntries();
  for (const entry of entries) {
    const q = entry.question.trim().toLowerCase();
    if (q === normalized || q.includes(normalized) || normalized.includes(q)) {
      return { answer: entry.answer, question: entry.question };
    }
  }
  return null;
}
