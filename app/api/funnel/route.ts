import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Validation Schema ────────────────────────────────────────────────────────

const FunnelLeadSchema = z.object({
  painPoint: z.enum(["telefon", "fachkraefte", "sichtbarkeit", "it-chaos"]).optional(),
  painLabel: z.string().max(200).optional(),
  consequence: z.string().max(500).optional(),
  teamSize: z.string().max(50).optional(),
  contact: z.string().min(2).max(300),
  channel: z.enum(["whatsapp", "email"]),
  gdprAccepted: z.literal(true),
});

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse & validate ────────────────────────────────────────────────
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
    }

    const parsed = FunnelLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Eingabe ungültig", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { painPoint, painLabel, consequence, teamSize, contact, channel } = parsed.data;

    // ── 2. Check credentials ───────────────────────────────────────────────
    const notionToken = process.env.NOTION_API_TOKEN;
    const databaseId = process.env.NOTION_FUNNEL_DATABASE_ID;

    if (!notionToken || !databaseId) {
      console.error("[funnel] Notion credentials missing");
      return NextResponse.json({ error: "Serverkonfigurationsfehler" }, { status: 500 });
    }

    // ── 3. Write lead to Notion ────────────────────────────────────────────
    // Notion DB Spalten:
    //   Name          → Title
    //   Kanal         → Select (whatsapp | email)
    //   Schmerzpunkt  → Select (telefon | fachkraefte | sichtbarkeit | it-chaos)
    //   SchmerzLabel  → Rich Text
    //   Konsequenz    → Rich Text
    //   Teamgröße     → Rich Text
    //   Datum         → Date
    //   Status        → Select (Neu | Kontaktiert | Qualifiziert)

    const properties: Record<string, unknown> = {
      Name: {
        title: [{ text: { content: contact } }],
      },
      Kanal: {
        select: { name: channel },
      },
      Datum: {
        date: { start: new Date().toISOString().split("T")[0] },
      },
      Status: {
        select: { name: "Neu" },
      },
    };

    if (painPoint) {
      properties.Schmerzpunkt = { select: { name: painPoint } };
    }
    if (painLabel) {
      properties.SchmerzLabel = { rich_text: [{ text: { content: painLabel } }] };
    }
    if (consequence) {
      properties.Konsequenz = { rich_text: [{ text: { content: consequence } }] };
    }
    if (teamSize) {
      properties.Teamgroesse = { rich_text: [{ text: { content: teamSize } }] };
    }

    const notionRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    });

    if (!notionRes.ok) {
      const notionError = await notionRes.json().catch(() => ({}));
      console.error("[funnel] Notion API error:", JSON.stringify(notionError, null, 2));
      return NextResponse.json(
        { error: "Datenbankfehler – bitte versuchen Sie es erneut" },
        { status: 500 }
      );
    }

    // ── 4. Success ─────────────────────────────────────────────────────────
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[funnel] Unexpected error:", err);
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
