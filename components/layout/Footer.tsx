import Link from "next/link";
import { TextLogo } from "@/components/brand/TextLogo";
import { TechCorners } from "@/components/ui/tech-corners";
import { COMPANY, FOOTER_NAV } from "@/lib/constants";
import { IconPhone, IconMail, IconMapPin, IconArrowUpRight, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative z-20 overflow-hidden border-t border-brand-cyan/20 bg-brand-navy text-brand-navy-foreground min-h-[28rem]">
      {/* Bergsilhouette: 1:1 wie Hero (ganz rechts), kopfüber, ohne Berg1 – rauswachsen wenn im Viewport */}
      <div
        className="footer-berg absolute top-0 left-0 right-0 flex justify-end items-start pointer-events-none z-0"
        data-animate
        aria-hidden="true"
      >
        <div className="relative w-full max-w-6xl pl-4 md:pl-6 min-h-[14rem] h-56 shrink-0 scale-y-[-1]">
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
              sizes="(max-width: 1280px) 100vw, 1152px"
              className={`object-cover object-bottom select-none berg-layer-grow-on-view ${delay}`}
              style={{ transformOrigin: "bottom center" }}
              unoptimized
              aria-hidden
            />
          ))}
        </div>
      </div>

      {/* Atmospheric background */}
      <div className="noise-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-brand-cyan/4 blur-[100px]"
        aria-hidden="true"
      />

      {/* Inhalt in Beam-Breite (wie Rest der Seite), Beams im Footer nicht sichtbar; Berg kann oben leicht überdecken */}
      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-8 md:px-6 md:pt-20">
        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand - takes more space */}
          <div className="md:col-span-4">
            <TextLogo variant="light" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-brand-navy-muted">
              Ihr Digital-Partner im Erzgebirge. Webseiten, KI-Telefon,
              Online-Sichtbarkeit – alles aus einer Hand.
            </p>
            {/* Contact info inline */}
            <div className="mt-6 space-y-2.5">
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
                    {item.label}
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
              {FOOTER_NAV.unternehmen.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1 text-sm text-brand-navy-muted transition-colors hover:text-brand-cyan"
                  >
                    {item.label}
                    <IconArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" stroke={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card – SectionCard-Style, TechCorners (V2) */}
          <div className="md:col-span-3">
            <div className="group relative overflow-hidden border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <TechCorners pattern="diagonal" variant="cyan" size="sm" />

              <p className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                Projekt starten
              </p>
              <p className="relative z-10 mt-2 text-sm font-semibold text-white/80">
                Kostenloses Erstgespräch, 30 Minuten, unverbindlich.
              </p>
              <Link
                href="/kontakt"
                className="relative z-10 mt-4 inline-flex items-center gap-1.5 border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-brand-cyan transition-all hover:border-brand-cyan hover:bg-brand-cyan/20 hover:shadow-[0_0_15px_rgba(3,249,249,0.15)]"
              >
                Kontakt
                <IconArrowRight className="size-3.5" stroke={2} />
              </Link>
            </div>
          </div>
        </div>

        {/* Regional greeting */}
        <div className="mt-12 text-center">
          <p className="text-sm text-brand-navy-muted font-medium">
            Herzliche Grüße aus Aue-Bad Schlema im Erzgebirge. <span className="text-brand-warm">Glück auf!</span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-brand-navy-muted">
            &copy; {new Date().getFullYear()} {COMPANY.legal}
          </p>
          <nav className="flex gap-6" aria-label="Rechtliches">
            {FOOTER_NAV.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-brand-navy-muted transition-colors hover:text-brand-cyan"
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
