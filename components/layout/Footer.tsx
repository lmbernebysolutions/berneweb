import Link from "next/link";
import { TextLogo } from "@/components/brand/TextLogo";
import { COMPANY, FOOTER_NAV, SOCIAL_LINKS } from "@/lib/constants";
import {
  IconPhone, IconMail, IconMapPin, IconArrowUpRight, IconArrowRight,
  IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp, IconBrandGoogle,
} from "@tabler/icons-react";
import Image from "next/image";
import { CONTAINER_A } from "@/lib/container-styles";
import { ROUTE_VISIBILITY } from "@/lib/route-visibility";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = {
  Instagram: IconBrandInstagram,
  Facebook: IconBrandFacebook,
  WhatsApp: IconBrandWhatsapp,
  Google: IconBrandGoogle,
} as const;

export function Footer() {
  const unternehmenLinks = FOOTER_NAV.unternehmen.filter((item) => {
    if (item.href === "/standorte" && !ROUTE_VISIBILITY.standorte) return false;
    if (item.href === "/branchen" && !ROUTE_VISIBILITY.branchen) return false;
    return true;
  });

  return (
    <footer className="relative z-20 overflow-hidden border-t border-brand-cyan/20 bg-brand-navy text-brand-navy-foreground min-h-[28rem]">
      {/* Bergsilhouette: NUR mobile größer + links; Desktop wieder Standard */}
      <div
        className="footer-berg pointer-events-none absolute top-0 left-0 right-0 z-0 will-change-auto overflow-x-clip overflow-y-visible"
        data-animate
        aria-hidden="true"
      >
        <div className="flex w-full justify-center overflow-visible h-[clamp(28.5rem,80vw,54rem)] sm:h-52 md:h-56 lg:h-64 xl:h-72">
          <div className="relative h-full w-[169vw] sm:w-full sm:max-w-6xl max-w-none shrink-0 overflow-visible">
            <div className="absolute inset-0 -translate-x-[23vw] sm:translate-x-0 scale-y-[-1] transform-gpu">
              {[
                { src: "/icons/Berg2.svg", delay: "berg-layer-grow-on-view-delay-0" },
                { src: "/icons/Berg3.svg", delay: "berg-layer-grow-on-view-delay-1" },
                { src: "/icons/Berg4.svg", delay: "berg-layer-grow-on-view-delay-2" },
              ].map(({ src, delay }) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 169vw, (max-width: 1280px) 100vw, 1152px"
                  className={`object-cover object-bottom select-none berg-layer-grow-on-view ${delay}`}
                  style={{ transformOrigin: "bottom center" }}
                  unoptimized
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric background */}
      <div className="noise-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-brand-cyan/4 blur-[100px]"
        aria-hidden="true"
      />

      {/* Inhalt in Beam-Breite (wie Rest der Seite), Beams im Footer nicht sichtbar; Berg kann oben leicht überdecken */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-5 md:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8">
        {/* Main grid: Mobile = Brand, dann Leistungen+Unternehmen nebeneinander, dann CTA; ab md 12 Spalten */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-12 md:gap-8 lg:gap-10">
          {/* Brand - takes more space */}
          <div className="md:col-span-4">
            <TextLogo variant="dark" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-brand-navy-muted">
              Ihr Digital-Partner im Erzgebirge. Webseiten, KI-Telefon,
              Online-Sichtbarkeit – alles aus einer Hand.
            </p>

            {/* Mobile: Kontakt links + Social-Grid 2×2 rechts (hidden ab md) */}
            <div className="mt-6 flex flex-row items-start gap-3 md:hidden">
              <div className="flex-1 min-w-0 space-y-2.5">
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-2.5 text-sm text-brand-navy-muted transition-colors hover:text-brand-cyan"
                >
                  <IconPhone className="size-4 shrink-0" stroke={1.5} />
                  {COMPANY.phoneDisplay}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-sm text-brand-navy-muted transition-colors hover:text-brand-cyan"
                >
                  <IconMail className="size-4 shrink-0" stroke={1.5} />
                  {COMPANY.email}
                </a>
                <span className="flex items-center gap-2.5 text-sm text-brand-navy-muted">
                  <IconMapPin className="size-4 shrink-0" stroke={1.5} />
                  {COMPANY.location}, {COMPANY.region}
                </span>
              </div>
              {/* Social 2×2 */}
              <div className="grid grid-cols-2 gap-1.5 shrink-0">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = SOCIAL_ICONS[link.label as keyof typeof SOCIAL_ICONS];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className={cn("group tap-target relative overflow-hidden p-2 flex flex-col items-center justify-center gap-1 cursor-pointer", CONTAINER_A)}
                    >
                      <Icon className="size-4 text-brand-cyan relative z-10" stroke={1.5} />
                      <span className="text-[0.48rem] font-bold uppercase tracking-widest text-brand-navy-muted relative z-10 text-center leading-tight">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Desktop: nur Kontaktinfo, Social Icons sind in der Bottom Bar */}
            <div className="hidden md:block mt-6 space-y-2.5">
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2.5 text-sm text-brand-navy-muted transition-colors hover:text-brand-cyan"
              >
                <IconPhone className="size-4 shrink-0" stroke={1.5} />
                {COMPANY.phoneDisplay}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 text-sm text-brand-navy-muted transition-colors hover:text-brand-cyan"
              >
                <IconMail className="size-4 shrink-0" stroke={1.5} />
                {COMPANY.email}
              </a>
              <span className="flex items-center gap-2.5 text-sm text-brand-navy-muted">
                <IconMapPin className="size-4 shrink-0" stroke={1.5} />
                {COMPANY.location}, {COMPANY.region}
              </span>
            </div>
          </div>

          {/* Leistungen + Unternehmen auf Mobile nebeneinander */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:contents">
            {/* Leistungen */}
            <div className="md:col-span-3">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/80">
                Leistungen
              </h3>
              <ul className="space-y-2.5">
                {FOOTER_NAV.leistungen.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1 text-sm text-brand-navy-muted transition-colors hover:text-brand-cyan"
                    >
                      <span className="link-draw">{item.label}</span>
                      <IconArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" stroke={2} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unternehmen */}
            <div className="md:col-span-2">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan/80">
                Unternehmen
              </h3>
              <ul className="space-y-2.5">
                {unternehmenLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1 text-sm text-brand-navy-muted transition-colors hover:text-brand-cyan"
                    >
                      <span className="link-draw">{item.label}</span>
                      <IconArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" stroke={2} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA card – SectionCard-Style, TechCorners (V2) */}
          <div className="md:col-span-3">
            <div className={cn("group relative overflow-hidden p-5 backdrop-blur-sm", CONTAINER_A)}>
              <p className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                Projekt starten
              </p>
              <p className="relative z-10 mt-2 text-sm font-semibold text-white/80">
                Kostenloses Erstgespräch, 30 Minuten, unverbindlich.
              </p>
              <Link
                href="/kontakt"
                className="relative z-10 mt-4 inline-flex items-center gap-1.5 border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-brand-cyan transition-all hover:border-brand-cyan hover:bg-brand-cyan/20 hover:shadow-[0_0_15px_rgba(3,249,249,0.15)] tap-target"
              >
                Kontakt
                <IconArrowRight className="size-3.5" stroke={2} />
              </Link>
            </div>
          </div>
        </div>

        {/* Regional greeting */}
        <div className="mt-12 text-center">
          <p className="text-sm text-brand-navy-muted font-medium flex flex-wrap items-center justify-center gap-1">
            <span>Herzliche Grüße aus Aue-Bad Schlema im Erzgebirge.</span>
            <span className="text-brand-warm whitespace-nowrap">Glück auf!</span>
          </p>
        </div>

        {/* Bottom Bar: Mobile = Copyright + Legal | Desktop = 3-Spalten-Grid mit Social zentriert */}
        <div className="mt-6 border-t border-white/8 pt-6">
          {/* Mobile: flex-col, kein Social (ist oben in Brand-Spalte) */}
          <div className="flex flex-col items-center gap-3 md:grid md:grid-cols-3 md:items-center">
            <p className="text-xs text-brand-navy-muted">
              &copy; {new Date().getFullYear()} {COMPANY.legal}
            </p>

            {/* Social Icons – nur auf Desktop sichtbar, pagewide zentriert */}
            <div className="hidden md:flex justify-center gap-2">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.label as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className={cn("group tap-target relative overflow-hidden p-2 flex items-center justify-center cursor-pointer", CONTAINER_A)}
                  >
                    <Icon className="size-4 text-brand-cyan relative z-10" stroke={1.5} />
                  </a>
                );
              })}
            </div>

            <nav className="flex gap-6 md:justify-end" aria-label="Rechtliches">
              {FOOTER_NAV.legal.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs md:text-sm text-brand-navy-muted transition-colors hover:text-brand-cyan link-draw"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

      </div>
    </footer>
  );
}
