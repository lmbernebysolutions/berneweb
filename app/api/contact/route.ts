import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Validation Schema ────────────────────────────────────────────────────────
const ContactSchema = z.object({
  name: z.string().min(2, "Name zu kurz").max(100),
  email: z.string().email("Ungültige E-Mail").max(200),
  phone: z.string().max(50).optional(),
  message: z.string().min(10, "Nachricht zu kurz").max(2000),
});

// ─── Notion Database Schema ───────────────────────────────────────────────────
// Erwartete Spalten in der Notion-Datenbank:
//   Name     → Title
//   Email    → Email
//   Telefon  → Phone number
//   Nachricht → Text (Rich text)
//   Datum    → Date
//   Status   → Select (Optionen: Neu | In Bearbeitung | Erledigt)

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse & validate input ──────────────────────────────────────────
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Eingabe ungültig", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;

    // ── 2. Check credentials ───────────────────────────────────────────────
    const notionToken = process.env.NOTION_API_TOKEN;
    const databaseId = process.env.NOTION_CONTACT_DATABASE_ID;

    if (!notionToken || !databaseId) {
      console.error("[contact] Notion credentials missing");
      return NextResponse.json(
        { error: "Serverkonfigurationsfehler" },
        { status: 500 }
      );
    }

    // ── 3. Write to Notion ─────────────────────────────────────────────────
    // Build properties object — omit optional fields when empty to avoid Notion 400s
    const properties: Record<string, unknown> = {
      Name: {
        title: [{ text: { content: name } }],
      },
      Email: {
        email: email,
      },
      Nachricht: {
        rich_text: [{ text: { content: message } }],
      },
      Datum: {
        date: { start: new Date().toISOString().split("T")[0] },
      },
      Status: {
        select: { name: "Neu" },
      },
    };

    // Only include Telefon if provided (Notion rejects phone_number: null)
    if (phone) {
      properties.Telefon = { phone_number: phone };
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
      // Log full Notion error in server console for debugging
      console.error("[contact] Notion API error:", JSON.stringify(notionError, null, 2));
      return NextResponse.json(
        { error: "Datenbankfehler – bitte versuchen Sie es erneut", _notion: notionError },
        { status: 500 }
      );
    }

    // ── 4. Success ─────────────────────────────────────────────────────────
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
