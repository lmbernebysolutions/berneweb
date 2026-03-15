import { Metadata } from 'next';
import { BackdropNumber } from '@/components/ui/backdrop-number';
import Image from 'next/image';
import { IconSearch, IconRobot, IconDeviceDesktop, IconCheck, IconX, IconBrandReact, IconBrandNextjs, IconPhone, IconBriefcase, IconArrowRight, IconBrandWindows, IconTarget, IconUsers, IconBrandGoogle, IconBrandMeta, IconMapPin, IconPhoneCall, IconStar, IconChartBar, IconSparkles, IconBrandAdobe, IconBrush, IconPalette, IconLayout2 } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Socials Test Canvas - Berneby Solutions',
};

const BERG_LAYERS = [
  "/icons/Berg1.svg",
  "/icons/Berg2.svg",
  "/icons/Berg3.svg",
  "/icons/Berg4.svg"
];

const FOOTER_BERG_LAYERS = [
  "/icons/Berg2.svg",
  "/icons/Berg3.svg",
  "/icons/Berg4.svg"
];

// Logo is same size as Hero, not on beams, has distance
const BernebyBLogo = () => (
  <div className="absolute top-10 left-12 z-50">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 48" height="42" width="13">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,64)"><g transform="scale(0.1)">
        <path fill="#03f9f9" fillRule="evenodd" stroke="none" d="m 3.92969,355.926 0.26953,-37.129 0.05469,-0.035 C 31.6406,317.855 53.543,297.043 53.543,271.5 53.543,245.805 31.3867,224.895 3.77734,224.219 L 4.07813,134.316 C 59.6289,138.797 103.988,181.43 104.762,242.109 105.504,300.309 61.9922,354.914 3.92969,355.926"/>
        <path fill="#03f9f9" fillRule="evenodd" stroke="none" d="M 3.77344,473.934 4.07031,444.773 C 58.0508,437.191 55.3477,367.426 4.14844,360.148 L 4.06641,319.117 C 102.242,325.789 95.7422,470.422 3.77344,473.934"/>
      </g></g>
    </svg>
  </div>
);

const Slide = ({ children, number, withBeams = true, withCorners = true, invertMount = false, mountBottom = false, footerVariant = false, centerBackdrop = false }: { children: React.ReactNode, number: string, withBeams?: boolean, withCorners?: boolean, invertMount?: boolean, mountBottom?: boolean, footerVariant?: boolean, centerBackdrop?: boolean }) => (
  <div className="relative w-[360px] h-[640px] bg-brand-navy overflow-hidden shrink-0 shadow-2xl border border-white/10 group font-sans selection:bg-brand-cyan/30">
    {/* Background Grid & Noise */}
    <div className="absolute inset-0 pointer-events-none opacity-30" style={{
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }} />
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
    }} />

    {/* Beams at exactly 32px from left and right */}
    {withBeams && (
      <>
        <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-brand-cyan/20 z-[2] pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-8 w-[1px] bg-brand-cyan/20 z-[2] pointer-events-none" />
      </>
    )}

    {/* Mountains restricted strictly between the inner edges of the beams (overflow-hidden container exactly matching beam bounded area) */}
    {invertMount && (
      <div className="absolute top-0 h-[240px] left-8 right-8 z-[2] pointer-events-none overflow-hidden">
        <div className="relative w-full h-full scale-y-[-1]">
          {BERG_LAYERS.map((src, i) => (
            <Image key={src} src={src} alt="" fill className="object-cover object-bottom opacity-80" unoptimized />
          ))}
        </div>
      </div>
    )}
    {mountBottom && (
      <div className="absolute bottom-0 h-[240px] left-8 right-8 z-[2] pointer-events-none overflow-hidden">
        <div className="relative w-full h-full">
          {(footerVariant ? FOOTER_BERG_LAYERS : BERG_LAYERS).map((src, i) => (
            <Image key={src} src={src} alt="" fill className="object-cover object-bottom opacity-80" unoptimized />
          ))}
        </div>
      </div>
    )}

    {/* Global Tech Corners EXACTLY on the inside edge of the beams, building a unified frame. */}
    {withCorners && (
      <div className="absolute top-[100px] bottom-[100px] left-8 right-8 pointer-events-none z-[15]">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-cyan/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-cyan/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-cyan/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-cyan/40" />
      </div>
    )}

    <BernebyBLogo />

    <div className="absolute z-[3] overflow-hidden opacity-35 pointer-events-none w-full h-full top-0 left-0 flex items-center justify-center">
        <BackdropNumber number={number} className="left-1/2 -translate-x-1/2 top-[28%] scale-75" />
    </div>

    {/* Content Container strictly confined inside the tech corners box. Standardized spacing! */}
    <div className="absolute top-[100px] bottom-[100px] left-8 right-8 z-10 py-6 flex flex-col justify-between">
       {children}
    </div>
  </div>
);

// Einheitliches Heading, dessen erster Buchstabe exakt vom Beam durchdrungen wird.
// Es liegt ganz oben in dem Container.
const StoryHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full">
    <h1 className="font-display text-[42px] font-extrabold uppercase leading-[0.95] tracking-[0.02em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] ml-[-16px] overflow-visible">
      {children}
    </h1>
  </div>
);

// Einheitlicher Text-Block mit konstantem Abstand zum Beam
const StoryBody = ({ children }: { children: React.ReactNode }) => (
    <div className="border-l-4 border-brand-cyan pl-4 ml-6 mr-4">
        <p className="text-[13px] font-medium text-blue-100 leading-[1.6]">
            {children}
        </p>
    </div>
);


export default function SocialToolsCanvas() {
  return (
    <div className="min-h-screen bg-[#0B0F19] p-10 font-sans">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-display font-bold text-brand-cyan uppercase tracking-widest">Story Canvas: Werkzeuge & Lösungen</h1>
          <p className="text-brand-muted font-mono text-sm mt-2 uppercase tracking-widest">Format: 9:16 (1080x1920) /// 6 Slides /// Fokus: Alle Branchen</p>
        </div>

        <div className="flex flex-wrap gap-10 justify-center">

          {/* SLIDE 01: Hook */}
          <Slide number="01" invertMount>
            <StoryHeading>
              DAS FRISST<br/>
              <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">ZU VIEL ZEIT?</span>
            </StoryHeading>

            <div className="mt-8">
              <StoryBody>
                Fehlende Sichtbarkeit oder Telefonflut<br/>
                veraltete Prozesse kosten täglich<br/>
                Aufträge und Nerven.
              </StoryBody>
            </div>

            <div className="mt-auto p-4 border border-brand-cyan border-dashed bg-brand-cyan/5 flex flex-col items-center justify-center min-h-[100px] relative mx-6 mb-2">
               <span className="font-mono text-[11px] text-brand-cyan uppercase tracking-widest text-center">++ Platzhalter Umfrage ++<br/><br/>&quot;Was nervt mehr?&quot;<br/>[Telefon] vs [Büro]</span>
            </div>
          </Slide>

          {/* SLIDE 02: Lösungs-Slide */}
          <Slide number="02">
            <StoryHeading>
                WIR MACHEN<br/>
                <span className="text-brand-cyan">DIGITAL</span>
            </StoryHeading>

            <div className="flex justify-center gap-3 mt-8">
                {[IconMapPin, IconPhoneCall, IconStar, IconChartBar].map((Icon, i) => (
                    <div key={i} className="relative flex items-center justify-center w-12 h-12 border border-brand-cyan bg-brand-cyan/10 shadow-[0_0_15px_rgba(3,249,249,0.15)]">
                        <Icon className="text-brand-cyan size-6" stroke={1.5} />
                    </div>
                ))}
            </div>

            <div className="mt-8">
              <StoryBody>
                Von lokaler Sichtbarkeit bei Google<br/>
                über den 24/7 KI-Telefonassistenten<br/>
                bis hin zu automatisierten<br/>
                Bewertungen.
              </StoryBody>
            </div>

             <div className="mt-auto p-3 border border-brand-cyan border-dashed bg-brand-cyan/5 flex items-center justify-center relative mx-6 mb-2">
               <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest">++ Platzhalter Emoji-Slider 📈 ++</span>
            </div>
          </Slide>

          {/* SLIDE 03: Unter der Haube */}
          <Slide number="03">
            <StoryHeading>
              UNSER<br/>
              <span className="text-brand-cyan">TECH-STACK</span>
            </StoryHeading>

            <div className="grid grid-cols-2 gap-2 mt-[31px] px-6">
                <div className="border border-white/10 bg-brand-navy-dark/30 p-3 h-20 flex flex-col items-center justify-center gap-2 relative">
                    <IconBrandNextjs className="text-brand-cyan size-6" stroke={1.5} />
                    <span className="font-mono text-[8px] text-brand-cyan uppercase tracking-wider text-center">Next.js Engine</span>
                </div>
                 <div className="border border-white/10 bg-brand-navy-dark/30 p-3 h-20 flex flex-col items-center justify-center gap-2 relative">
                    <IconBrandReact className="text-brand-cyan size-6" stroke={1.5} />
                    <span className="font-mono text-[8px] text-brand-cyan uppercase tracking-wider text-center">React UI</span>
                </div>
                 <div className="border border-white/10 bg-brand-navy-dark/30 p-3 h-20 flex flex-col items-center justify-center gap-2 relative">
                    <svg viewBox="0 0 545 545" className="text-brand-cyan size-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="m466.383 137.073-206.469-119.2034c-6.63-3.8287-14.811-3.8287-21.441 0l-206.4586 119.2034c-5.5734 3.218-9.0144 9.169-9.0144 15.615v240.375c0 6.436 3.441 12.397 9.0144 15.615l206.4686 119.203c6.63 3.829 14.811 3.829 21.441 0l206.468-119.203c5.574-3.218 9.015-9.17 9.015-15.615v-240.375c0-6.436-3.441-12.397-9.015-15.615zm-12.969 25.25-199.316 345.223c-1.347 2.326-4.904 1.376-4.904-1.319v-226.048c0-4.517-2.414-8.695-6.33-10.963l-195.7577-113.019c-2.3263-1.347-1.3764-4.905 1.3182-4.905h398.6305c5.661 0 9.199 6.136 6.368 11.041h-.009z" />
                    </svg>
                    <span className="font-mono text-[9px] font-bold text-brand-cyan uppercase tracking-wider text-center">Cursor</span>
                </div>
                 <div className="border border-white/10 bg-brand-navy-dark/30 p-3 h-20 flex flex-col items-center justify-center gap-2 relative">
                    <IconBrandAdobe className="text-brand-cyan size-6" stroke={1.5} />
                    <span className="font-mono text-[8px] text-brand-cyan uppercase tracking-wider text-center">Adobe Creative</span>
                </div>
            </div>

            <div className="mt-[26px]">
              <StoryBody>
                Keine Baukästen, nur saubere Systeme<br/>
                gebaut für Performance und<br/>
                langfristige Stabilität.
              </StoryBody>
            </div>
          </Slide>

          {/* SLIDE 04: Der Vergleich */}
          <Slide number="04">
            <StoryHeading>
                OHNE UNS<br/>
                <span className="text-brand-cyan whitespace-nowrap">VS. MIT UNS</span>
            </StoryHeading>

            <div className="flex flex-col border border-white/10 bg-black/30 px-3 py-3 relative overflow-hidden mt-[31px] mx-6">
                <div className="absolute top-0 right-0 border-b border-l border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white/40 z-20">OHNE UNS</div>
                <ul className="space-y-2 pt-1 text-brand-navy-muted">
                    <li className="flex gap-2 items-start text-[11px] font-medium leading-tight">
                        <IconX className="size-3 text-red-500/60 shrink-0 mt-0.5" stroke={3} />
                        <span>Keine Zeit fürs Wesentliche</span>
                    </li>
                    <li className="flex gap-2 items-start text-[11px] font-medium leading-tight">
                        <IconX className="size-3 text-red-500/60 shrink-0 mt-0.5" stroke={3} />
                        <span>Verschachtelte Agenturen</span>
                    </li>
                    <li className="flex gap-2 items-start text-[11px] font-medium leading-tight">
                        <IconX className="size-3 text-red-500/60 shrink-0 mt-0.5" stroke={3} />
                        <span>Baukasten ohne Wirkung</span>
                    </li>
                </ul>
            </div>

             <div className="mt-2 flex flex-col border border-brand-cyan/20 bg-brand-cyan/15 px-3 py-3 relative overflow-hidden mx-6">
                <div className="absolute top-0 right-0 border-b border-l border-brand-cyan/30 bg-brand-cyan/20 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-brand-cyan z-20">MIT UNS</div>
                <ul className="space-y-2 pt-1 relative z-10 text-white">
                    <li className="flex gap-2 items-start text-[11px] font-bold leading-tight">
                        <IconCheck className="size-3 text-brand-cyan shrink-0 mt-0.5" stroke={3} />
                        <span>Clevere Automatisierung</span>
                    </li>
                    <li className="flex gap-2 items-start text-[11px] font-bold leading-tight">
                        <IconCheck className="size-3 text-brand-cyan shrink-0 mt-0.5" stroke={3} />
                        <span>Partner auf Augenhöhe</span>
                    </li>
                     <li className="flex gap-2 items-start text-[11px] font-bold leading-tight">
                        <IconCheck className="size-3 text-brand-cyan shrink-0 mt-0.5" stroke={3} />
                        <span>Modernster Tech-Stack</span>
                    </li>
                </ul>
            </div>

            <div className="mt-[31px]">
              <StoryBody>
                Wir schaffen klare Strukturen und<br/>
                saubere Lösungen für dein Team.
              </StoryBody>
            </div>
          </Slide>

          {/* SLIDE 05: Die Werkzeugkiste */}
          <Slide number="05">
            <StoryHeading>
              UNSERE<br/>
              <span className="text-brand-cyan">LEISTUNGEN</span>
            </StoryHeading>

            <div className="grid grid-cols-2 gap-2 mt-[31px] px-6">
                {[
                  { label: "Webdesign", icon: IconDeviceDesktop },
                  { label: "Automatisierung", icon: IconRobot },
                  { label: "Lokales SEO/GEO", icon: IconSearch },
                  { label: "IT-Support", icon: IconBriefcase },
                ].map((item, idx) => (
                    <div key={idx} className="border border-white/10 bg-brand-navy-dark/30 p-2 h-20 flex flex-col justify-center items-center relative overflow-hidden group">
                        <item.icon className="text-brand-cyan size-6 mb-1.5" stroke={1.5} />
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-white leading-tight mt-1 text-center">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-[31px]">
              <StoryBody>
                Regionale Nähe, moderner Tech-Stack<br/>
                wir bringen lokale Betriebe<br/>
                digital nach vorne.
              </StoryBody>
            </div>
          </Slide>

          {/* SLIDE 06: Performance Marketing */}
          <Slide number="06">
            <StoryHeading>
              PERFORMANCE<br/>
              <span className="text-brand-cyan">MARKETING</span>
            </StoryHeading>

            <div className="flex flex-col border border-brand-cyan/20 bg-brand-cyan/15 relative overflow-hidden mt-[31px] mx-6 h-[180px]">
                <div className="absolute top-0 right-0 border-b border-l border-brand-cyan/30 bg-brand-cyan/20 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-brand-cyan z-20">KAMPAGNEN</div>
                <div className="grid grid-cols-2 h-full">
                    {/* Marketing Links */}
                    <div className="flex items-center justify-center pt-2">
                        <ul className="space-y-4 w-fit">
                            <li className="flex gap-2 items-center text-[9px] font-bold text-white">
                                <IconBrandGoogle className="size-6 text-brand-cyan shrink-0" stroke={1.5} />
                                <span className="leading-tight font-mono uppercase tracking-wider">Ads Reach</span>
                            </li>
                            <li className="flex gap-2 items-center text-[9px] font-bold text-white">
                                <IconBrandMeta className="size-6 text-brand-cyan shrink-0" stroke={1.5} />
                                <span className="leading-tight font-mono uppercase tracking-wider">Recruiting</span>
                            </li>
                            <li className="flex gap-2 items-center text-[9px] font-bold text-white">
                                <IconTarget className="size-6 text-brand-cyan shrink-0" stroke={1.5} />
                                <span className="leading-tight font-mono uppercase tracking-wider">GEO-Fencing</span>
                            </li>
                        </ul>
                    </div>
                    {/* Design Rechts */}
                    <div className="flex items-center justify-center pt-2">
                        <ul className="space-y-4 w-fit">
                            <li className="flex gap-2 items-center text-[9px] font-bold text-white">
                                <IconPalette className="size-6 text-brand-cyan shrink-0" stroke={1.5} />
                                <span className="leading-tight font-mono uppercase tracking-wider">Branding</span>
                            </li>
                            <li className="flex gap-2 items-center text-[9px] font-bold text-white">
                                <IconLayout2 className="size-6 text-brand-cyan shrink-0" stroke={1.5} />
                                <span className="leading-tight font-mono uppercase tracking-wider">Assets</span>
                            </li>
                            <li className="flex gap-2 items-center text-[9px] font-bold text-white">
                                <IconBrush className="size-6 text-brand-cyan shrink-0" stroke={1.5} />
                                <span className="leading-tight font-mono uppercase tracking-wider">Design</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-[31px]">
              <StoryBody>
                Google Ads, Social Recruiting,<br/>
                GEO-Fencing, Branding und<br/>
                kreative Assets – alles aus einer Hand.
              </StoryBody>
            </div>
          </Slide>

           {/* SLIDE 07: CTA */}
           <Slide number="GO" mountBottom footerVariant centerBackdrop>
            <StoryHeading>
              BEREIT FÜR<br/>
              <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">MEHR ZEIT?</span>
            </StoryHeading>

            <div className="flex flex-col gap-[31px] mt-[31px]">
              <StoryBody>
                 Lass uns schauen, welche Prozesse wir bei dir im Betrieb sofort radikal automatisieren können.
              </StoryBody>

              {/* CTA Button */}
              <div className="relative z-10 w-[80%] mx-auto">
                <div className="w-full flex items-center justify-center bg-brand-cyan text-brand-navy font-bold uppercase tracking-widest min-h-11 px-6 text-sm clip-corner shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] select-none">
                    ERSTGESPRÄCH <IconArrowRight className="ml-2 size-4" stroke={2.5} />
                </div>
              </div>
            </div>

            {/* Platzhalter darunter (wiederhergestellt) */}
            <div className="relative z-10 w-[90%] mx-auto mb-4 mt-auto">
              <div className="p-2.5 border border-brand-cyan border-dashed bg-brand-cyan/10 flex items-center justify-center">
                 <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest text-center font-bold">++ Platzhalter Link-Sticker ++<br/>🚀 Zum Kalender</span>
              </div>
            </div>
          </Slide>

        </div>
      </div>
    </div>
  );
}
