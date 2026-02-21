import { NextResponse } from "next/server";

/**
 * Einfacher Liveness-Check für Monitoring.
 * GET /api/health – keine sensitiven Informationen, nur Status 200.
 */
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
