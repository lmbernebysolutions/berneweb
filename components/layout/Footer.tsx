import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { COMPANY, FOOTER_NAV } from "@/lib/constants";
import { IconPhone, IconMail, IconMapPin, IconArrowUpRight } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-brand-navy-foreground border-t border-brand-cyan/20">
      {/* Atmospheric background */}
      <div className="noise-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-brand-cyan/4 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-8 md:px-6 md:pt-20">
        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand - takes more space */}
          <div className="md:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/50">
              Ihr Digital-Partner im Erzgebirge. Webseiten, KI-Telefon,
              Online-Sichtbarkeit – alles aus einer Hand.
            </p>
            {/* Contact info inline */}
            <div className="mt-6 space-y-2.5">
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2.5 text-sm text-white/50 transition-colors hover:text-brand-cyan"
              >
                <IconPhone className="size-4 shrink-0" stroke={1.5} />
                {COMPANY.phoneDisplay}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 text-sm text-white/50 transition-colors hover:text-brand-cyan"
              >
                <IconMail className="size-4 shrink-0" stroke={1.5} />
                {COMPANY.email}
              </a>
              <span className="flex items-center gap-2.5 text-sm text-white/50">
                <IconMapPin className="size-4 shrink-0" stroke={1.5} />
                {COMPANY.location}, {COMPANY.region}
              </span>
            </div>
          </div>

          {/* Leistungen */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Leistungen
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_NAV.leistungen.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-brand-cyan"
                  >
                    {item.label}
                    <IconArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" stroke={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Unternehmen
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_NAV.unternehmen.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-brand-cyan"
                  >
                    {item.label}
                    <IconArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" stroke={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="md:col-span-3">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-white/80">
                Projekt besprechen?
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/40">
                Kostenloses Erstgespräch, 30 Minuten, unverbindlich.
              </p>
              <Link
                href="/kontakt"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-cyan/10 px-4 py-2 text-sm font-semibold text-brand-cyan transition-colors hover:bg-brand-cyan/20"
              >
                Kontakt aufnehmen
                <IconArrowUpRight className="size-3.5" stroke={2} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {COMPANY.legal}
          </p>
          <nav className="flex gap-6" aria-label="Rechtliches">
            {FOOTER_NAV.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-white/30 transition-colors hover:text-white/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
