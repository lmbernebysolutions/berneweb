import { IconMapPin } from "@tabler/icons-react";

/**
 * Trust-Badge "Seit 2026 im Erzgebirge" – E-E-A-T Signal
 * @see TASKLIST_PHASE_2_MID_TERM.md P2-2.4-T2
 */
export function TrustBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 border border-brand-cyan/30 bg-brand-cyan/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-cyan"
      aria-label="Seit 2026 im Erzgebirge – Ihr lokaler Digital-Partner"
    >
      <IconMapPin className="size-4 shrink-0" stroke={2} aria-hidden />
      Seit 2026 im Erzgebirge
    </div>
  );
}
