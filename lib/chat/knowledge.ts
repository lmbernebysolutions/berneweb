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

const STOP_WORDS = new Set(
  "und der die das dem den des ein eine einer eines ist sind war waren wird werden kann könnte soll sollte was wie wo wann wer welcher welche".split(/\s+/)
);

function tokenize(text: string): string[] {
  return text
    .replace(/[^\wäöüß\s]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w.toLowerCase()));
}

/**
 * FAQ-Match: zuerst exakt/Teilstring, dann Wort-Überlappung (mehr Formulierungen treffen).
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

  const userWords = tokenize(normalized);
  if (userWords.length < 2) return null;

  let best: { entry: (typeof entries)[0]; score: number } | null = null;
  for (const entry of entries) {
    const qWords = tokenize(entry.question);
    const overlap = userWords.filter((w) => qWords.some((qw) => qw === w || qw.includes(w) || w.includes(qw))).length;
    const ratio = qWords.length > 0 ? overlap / qWords.length : 0;
    if (overlap >= 2 && ratio >= 0.4 && (!best || overlap > best.score)) {
      best = { entry, score: overlap };
    }
  }
  return best ? { answer: best.entry.answer, question: best.entry.question } : null;
}
