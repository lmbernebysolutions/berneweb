/**
 * Match-Wizard – Konfiguration für Home (alle), Handwerk, Tech
 * Conversational Multi-Step mit Best-Match am Ende.
 */

export type WizardVariant = "home" | "handwerk" | "tech";

export interface WizardStepChoice {
  value: string;
  label: string;
  /** Optional: nächster Schritt überspringen oder zu anderem Branch */
  next?: string;
}

export interface WizardStep {
  id: string;
  question: string;
  subline?: string;
  choices: WizardStepChoice[];
}

export interface MatchResult {
  id: string;
  title: string;
  description: string;
  price?: string;
  ctaLabel: string;
  ctaHref: string;
}

// =============================================================================
// HOME – Alle Bereiche (Handwerk + Tech)
// =============================================================================

const HOME_STEPS: WizardStep[] = [
  {
    id: "focus",
    question: "Worum geht es Ihnen?",
    subline: "Wir leiten Sie zum passenden Angebot.",
    choices: [
      { value: "handwerk", label: "Website, Sichtbarkeit, KI-Telefon" },
      { value: "tech", label: "Webseite, Shop, IT-Support" },
      { value: "both", label: "Handwerk & IT" },
    ],
  },
  {
    id: "handwerk_orte",
    question: "Ihr Einsatzgebiet?",
    choices: [
      { value: "ein", label: "Ein Ort / kleine Region" },
      { value: "mehrere", label: "Mehrere Orte" },
      { value: "erzgebirge", label: "Ganz Erzgebirge" },
    ],
  },
  {
    id: "handwerk_ki",
    question: "Soll ein KI-Telefonassistent Anrufe annehmen?",
    subline: "24/7 – wenn Sie auf der Baustelle sind.",
    choices: [
      { value: "ja", label: "Ja, unbedingt" },
      { value: "nein", label: "Nein / erstmal nicht" },
    ],
  },
  {
    id: "tech_focus",
    question: "Was steht bei Ihnen im Vordergrund?",
    subline: "Wir empfehlen Ihr passendes Angebot.",
    choices: [
      { value: "web", label: "Webseite oder Online-Shop" },
      { value: "it", label: "IT-Support / Digitaler Hausmeister" },
      { value: "beides", label: "Beides" },
    ],
  },
];

// =============================================================================
// HANDWERK – nur Handwerk-Pakete
// =============================================================================

const HANDWERK_STEPS: WizardStep[] = [
  {
    id: "start",
    question: "Worum geht es Ihnen?",
    choices: [
      { value: "ein_ort", label: "Ein Ort / kleine Region" },
      { value: "mehrere_orte", label: "Mehrere Orte" },
      { value: "erzgebirge", label: "Ganz Erzgebirge" },
      { value: "ki_telefon", label: "KI-Telefonassistent" },
      { value: "info", label: "Erstmal nur informieren" },
    ],
  },
  {
    id: "orte",
    question: "Ihr Einsatzgebiet?",
    choices: [
      { value: "ein", label: "Ein Ort / kleine Region" },
      { value: "mehrere", label: "Mehrere Orte" },
      { value: "erzgebirge", label: "Ganz Erzgebirge" },
    ],
  },
  {
    id: "ki",
    question: "Soll ein KI-Telefonassistent Anrufe annehmen?",
    subline: "24/7 – kein Kunde geht mehr verloren.",
    choices: [
      { value: "ja", label: "Ja, unbedingt" },
      { value: "nein", label: "Nein / erstmal nicht" },
    ],
  },
  { id: "q4", question: "Geplanter Start?", choices: [{ value: "bald", label: "In den nächsten 3 Monaten" }, { value: "spaeter", label: "Später" }] },
  { id: "q5", question: "Branche?", choices: [{ value: "handwerk", label: "Handwerk" }, { value: "dienst", label: "Dienstleistung" }] },
  { id: "q6", question: "Bereits Webpräsenz?", choices: [{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }] },
  { id: "q7", question: "Wunsch nach Bewertungsmanagement?", choices: [{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }] },
  { id: "q8", question: "Noch etwas wichtig?", choices: [{ value: "ja", label: "Ja, habe Fragen" }, { value: "nein", label: "Nein, passt" }] },
];

// =============================================================================
// TECH – nur Solutions (Digitaler Hausmeister, Web, Shop)
// =============================================================================

const TECH_STEPS: WizardStep[] = [
  {
    id: "focus",
    question: "Was brauchen Sie am meisten?",
    subline: "Wir finden Ihr passendes Angebot.",
    choices: [
      { value: "web", label: "Webseite oder Online-Shop" },
      { value: "it", label: "IT-Support / Digitaler Hausmeister" },
      { value: "beides", label: "Beides" },
    ],
  },
];

// =============================================================================
// MATCH-ERGEBNISSE
// =============================================================================

export const WIZARD_MATCHES: Record<string, MatchResult> = {
  geselle: {
    id: "geselle",
    title: "Geselle",
    description: "Der solide Start – professioneller One-Pager, mobile-optimiert, Kontaktformular & Google Maps.",
    price: "950 €",
    ctaLabel: "Paket anfragen",
    ctaHref: "/kontakt?paket=geselle",
  },
  meisterbetrieb: {
    id: "meisterbetrieb",
    title: "Meisterbetrieb",
    description: "50+ lokale Landingpages, SEO, Google Business – für Betriebe, die bei Google gefunden werden wollen.",
    price: "1.950 €",
    ctaLabel: "Paket anfragen",
    ctaHref: "/kontakt?paket=meisterbetrieb",
  },
  marktfuehrer: {
    id: "marktfuehrer",
    title: "Marktführer",
    description: "Alles aus Meisterbetrieb plus KI-Telefonassistent, Bewertungsmanagement & Google Ads.",
    price: "2.800 €",
    ctaLabel: "Paket anfragen",
    ctaHref: "/kontakt?paket=marktfuehrer",
  },
  hausmeister: {
    id: "hausmeister",
    title: "Digitaler Hausmeister",
    description: "10 Stunden Tech-Support – 12 Monate gültig. Web, Office, Notfälle. Ihr IT-Partner auf Abruf.",
    price: "850 €",
    ctaLabel: "Karte sichern",
    ctaHref: "/kontakt?paket=hausmeister",
  },
  webseite_shop: {
    id: "webseite_shop",
    title: "Webseite & Online-Shop",
    description: "Professionelle Webseiten, Shops, SEO – wir erstellen ein unverbindliches Angebot für Sie.",
    ctaLabel: "Angebot anfragen",
    ctaHref: "/kontakt",
  },
  individuell: {
    id: "individuell",
    title: "Individuelles Angebot",
    description: "Ihre Anforderungen sind vielfältig – wir melden uns mit einem passenden Vorschlag.",
    ctaLabel: "Erstgespräch vereinbaren",
    ctaHref: "/kontakt",
  },
};

// =============================================================================
// SCHRITT-FOLGE & MATCH-LOGIK (Home)
// =============================================================================

/** Nächster Schritt bei Home nach Antwort */
export function getHomeNextStep(stepId: string, value: string): string | null {
  if (stepId === "focus") {
    if (value === "tech") return "tech_focus";
    if (value === "handwerk" || value === "both") return "handwerk_orte";
    return null;
  }
  if (stepId === "handwerk_orte") return "handwerk_ki";
  if (stepId === "handwerk_ki") return null; // Ende → Match
  if (stepId === "tech_focus") return null; // Ende → Match
  return null;
}

/** Sammelt Antworten für Home; gibt ob Handwerk-Pfad aktiv ist */
function homeAnswersToMatch(answers: Record<string, string>): string {
  const focus = answers["focus"];
  const techFocus = answers["tech_focus"];

  // Nur Tech gewählt
  if (focus === "tech") {
    if (techFocus === "it") return "hausmeister";
    if (techFocus === "web") return "webseite_shop";
    return "individuell";
  }

  // Handwerk oder Beides: Handwerk-Match
  const orte = answers["handwerk_orte"];
  const ki = answers["handwerk_ki"];
  if (ki === "ja") return "marktfuehrer";
  if (orte === "ein") return "geselle";
  if (orte === "mehrere" || orte === "erzgebirge") return "meisterbetrieb";
  return "geselle";
}

// =============================================================================
// MATCH-LOGIK Handwerk
// =============================================================================

function handwerkAnswersToMatch(answers: Record<string, string>): string {
  const start = answers["start"];
  const orte =
    answers["orte"] ??
    (start === "ein_ort" ? "ein" : start === "mehrere_orte" ? "mehrere" : start === "erzgebirge" ? "erzgebirge" : undefined);
  const ki =
    answers["ki"] ??
    (start === "ki_telefon" ? "ja" : start === "info" ? "nein" : undefined);
  if (ki === "ja") return "marktfuehrer";
  if (orte === "ein") return "geselle";
  if (orte === "mehrere" || orte === "erzgebirge") return "meisterbetrieb";
  return "geselle";
}

// =============================================================================
// MATCH-LOGIK Tech
// =============================================================================

function techAnswersToMatch(answers: Record<string, string>): string {
  const focus = answers["focus"];
  if (focus === "it") return "hausmeister";
  if (focus === "web") return "webseite_shop";
  return "individuell";
}

// =============================================================================
// API
// =============================================================================

export function getWizardSteps(variant: WizardVariant): WizardStep[] {
  if (variant === "home") return HOME_STEPS;
  if (variant === "handwerk") return HANDWERK_STEPS;
  return TECH_STEPS;
}

/** Berechnet aus gesammelten Antworten die Match-ID */
export function computeMatch(variant: WizardVariant, answers: Record<string, string>): string {
  if (variant === "home") return homeAnswersToMatch(answers);
  if (variant === "handwerk") return handwerkAnswersToMatch(answers);
  return techAnswersToMatch(answers);
}

/** Schritt-Reihenfolge für Home (conditional): welche Step-IDs in welcher Reihenfolge für gegebene Antworten */
export function getHomeStepSequence(answers: Record<string, string>): string[] {
  const focus = answers["focus"];
  if (focus === "tech") return ["focus", "tech_focus"];
  if (focus === "handwerk" || focus === "both") return ["focus", "handwerk_orte", "handwerk_ki"];
  return ["focus"];
}

export function getHandwerkStepSequence(): string[] {
  return HANDWERK_STEPS.map((s) => s.id);
}

export function getTechStepSequence(): string[] {
  return TECH_STEPS.map((s) => s.id);
}
