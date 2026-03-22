import { Metadata } from 'next';
import Image from 'next/image';
import { IconArrowRight, IconMapPin, IconWorld, IconStar, IconChartBar, IconTrendingUp, IconStarFilled } from '@tabler/icons-react';
import { BackdropNumber } from '@/components/ui/backdrop-number';
import { TextLogo } from '@/components/brand/TextLogo';
import { REFERENZEN, REFERENZEN_STATS } from '@/lib/data/referenzen';
import { SlideStoryBody as StoryBody, SLIDE_STORY_TEXT_MUTED, SLIDE_STORY_TEXT_STRONG } from '@/components/socials/slide-story-body';

export const metadata: Metadata = { title: 'Socials Referenzen — Berneby Solutions' };

const BERG = ["/icons/Berg1.svg","/icons/Berg2.svg","/icons/Berg3.svg","/icons/Berg4.svg"];
const BERG_FOOTER = ["/icons/Berg2.svg","/icons/Berg3.svg","/icons/Berg4.svg"];

type SlideProps = {
  children: React.ReactNode;
  number: string;
  invertMount?: boolean;
  mountBottom?: boolean;
  footerVariant?: boolean;
  beamOutRight?: boolean;
  beamOutLeft?: boolean;
  showLogo?: boolean;
};

type StoryProject = {
  id: string;
  kunde: string;
  branche: string;
  typ: string;
  url: string;
  desktopImage: string;
  phoneImage: string;
  ergebnisse: { metrik: string; wert: string; positiv: boolean }[];
};

const Logo = () => (
  <div className="absolute top-[36px] left-[48px] z-50 transform scale-[0.5] origin-top-left pointer-events-none">
    <TextLogo variant="dark" size="default" />
  </div>
);

const Slide = ({
  children,
  number,
  invertMount = false,
  mountBottom = false,
  footerVariant = false,
  beamOutRight = false,
  beamOutLeft = false,
  showLogo = false,
}: SlideProps) => (
  <div className="relative w-[360px] h-[640px] bg-brand-navy overflow-visible shrink-0 shadow-2xl border border-white/10 font-sans">
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
      <div className="absolute top-0 bottom-0 left-[32px] w-px bg-brand-cyan/20 z-[2] pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[32px] w-px bg-brand-cyan/20 z-[2] pointer-events-none" />

      {invertMount && (
        <div className="absolute top-0 h-[240px] left-[32px] right-[32px] z-[2] pointer-events-none overflow-hidden">
          <div className="relative w-full h-full scale-y-[-1]">
            {BERG.map((src) => (
              <Image key={src} src={src} alt="" fill className="object-cover object-bottom opacity-80" unoptimized />
            ))}
          </div>
        </div>
      )}

      {mountBottom && (
        <div className="absolute bottom-0 h-[240px] left-[32px] right-[32px] z-[2] pointer-events-none overflow-hidden">
          <div className="relative w-full h-full">
            {(footerVariant ? BERG_FOOTER : BERG).map((src) => (
              <Image key={src} src={src} alt="" fill className="object-cover object-bottom opacity-80" unoptimized />
            ))}
          </div>
        </div>
      )}

      <div className="absolute top-[100px] bottom-[60px] left-[32px] right-[32px] pointer-events-none z-[15]">
        <div className="absolute top-0 left-0 w-[16px] h-[16px] border-t-2 border-l-2 border-brand-cyan/40" />
        <div className="absolute top-0 right-0 w-[16px] h-[16px] border-t-2 border-r-2 border-brand-cyan/40" />
        <div className="absolute bottom-0 left-0 w-[16px] h-[16px] border-b-2 border-l-2 border-brand-cyan/40" />
        <div className="absolute bottom-0 right-0 w-[16px] h-[16px] border-b-2 border-r-2 border-brand-cyan/40" />
      </div>

      {showLogo && <Logo />}

      <div className="absolute z-[3] overflow-hidden opacity-35 pointer-events-none w-full h-full top-0 left-0">
        <BackdropNumber number={number} className="top-auto bottom-[-10%] left-1/2 -translate-x-1/2 !text-[280px]" />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '100px',
          bottom: '60px',
          left: '32px',
          right: '32px',
          zIndex: 10,
          paddingTop: '24px',
          paddingBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </div>

    {beamOutRight && (
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[32px] h-px bg-brand-cyan/20 z-[2] pointer-events-none" aria-hidden />
    )}
    {beamOutLeft && (
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[32px] h-px bg-brand-cyan/20 z-[2] pointer-events-none" aria-hidden />
    )}
  </div>
);

const StoryHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full shrink-0">
    <h1 className="font-display text-[42px] font-extrabold uppercase leading-[0.95] tracking-[0.02em] text-white ml-[-16px] overflow-visible drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
      {children}
    </h1>
  </div>
);

const ContentZone = ({ children, center = false }: { children: React.ReactNode; center?: boolean }) => (
  <div style={{ flex: 1, marginTop: '31px', display: 'flex', flexDirection: 'column', gap: '31px', justifyContent: center ? 'center' : 'flex-start' }}>
    {children}
  </div>
);

const KListItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <li style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#fff' }}>
    {icon}
    <span style={{ fontFamily: 'var(--font-geist-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.2 }}>{label}</span>
  </li>
);

const Sticker = ({ children, bottom }: { children: React.ReactNode; bottom?: string }) => (
  <div style={bottom ? { position: 'absolute', bottom, left: 0, right: 0 } : { marginTop: 'auto', margin: 'auto 0 0 0' }}>
    <div style={{ border: '1px dashed #03f9f9', background: 'rgba(3,249,249,0.05)', margin: '0 24px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest text-center">{children}</span>
    </div>
  </div>
);

const BrowserMockup = ({ imageSrc, url }: { imageSrc: string; url: string }) => (
  <div style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.4)', overflow: 'hidden' }}>
    <div style={{ height: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 8px' }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        <span className="block h-[4px] w-[4px] rounded-full bg-white/40" />
        <span className="block h-[4px] w-[4px] rounded-full bg-white/30" />
        <span className="block h-[4px] w-[4px] rounded-full bg-white/20" />
      </div>
      <span className="font-mono text-[8px] text-white/50 truncate">{url}</span>
    </div>
    <div style={{ position: 'relative', height: '104px' }}>
      <Image src={imageSrc} alt="Desktop-Ansicht der Referenz" fill className="object-cover object-top" />
    </div>
  </div>
);

const PhoneMockup = ({ imageSrc }: { imageSrc: string }) => (
  <div style={{ width: '58px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '14px', overflow: 'hidden', background: '#0f172a', flexShrink: 0 }}>
    <div style={{ height: '12px', background: 'rgba(3,249,249,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="font-mono text-[6px]" style={{ color: SLIDE_STORY_TEXT_MUTED }}>
        09:41
      </span>
    </div>
    <div style={{ position: 'relative', height: '112px' }}>
      <Image src={imageSrc} alt="Mobile-Ansicht der Referenz" fill className="object-cover object-top" />
    </div>
  </div>
);

const extractDisplayUrl = (url: string) => {
  if (!url || url === '#') {
    return 'live-projekt.de';
  }
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
};

type MockupMode = 'both' | 'desktop' | 'phone';

const ReferenceCardCompact = ({ project, mockupMode = 'both' }: { project: StoryProject; mockupMode?: MockupMode }) => (
  <div style={{ height: '200px', margin: '0 24px', border: '1px solid rgba(3,249,249,0.2)', background: 'rgba(3,249,249,0.08)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        borderBottom: '1px solid rgba(3,249,249,0.3)',
        borderLeft: '1px solid rgba(3,249,249,0.3)',
        background: 'rgba(3,249,249,0.2)',
        padding: '4px 10px',
        fontFamily: 'var(--font-geist-mono, monospace)',
        fontSize: '8px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#03f9f9',
        zIndex: 20,
      }}
    >
      {project.typ}
    </div>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(3,249,249,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(3,249,249,0.25) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
    <div style={{ position: 'relative', zIndex: 10, padding: '12px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '8px' }}>
        <p className="font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: SLIDE_STORY_TEXT_MUTED }}>
          {project.branche}
        </p>
        <h3 className="text-[16px] leading-[1.2] uppercase font-normal m-0">
          <strong className="font-bold" style={{ color: SLIDE_STORY_TEXT_STRONG }}>
            {project.kunde}
          </strong>
        </h3>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          {(mockupMode === 'both' || mockupMode === 'desktop') && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <BrowserMockup imageSrc={project.desktopImage} url={extractDisplayUrl(project.url)} />
            </div>
          )}
          {mockupMode === 'both' || mockupMode === 'phone' ? <PhoneMockup imageSrc={project.phoneImage} /> : null}
        </div>
      </div>
    </div>
  </div>
);

/** Warme Sterne wie Website-Testimonials (TestimonialGrid) */
const TESTIMONIAL_STAR_COLOR = '#ffb547';

/** Eine Rezension für Hook-Slide; Inhalt angelehnt an Live-Bewertungen (Website) */
const SLIDE_HOOK_TESTIMONIAL: { quote: string; name: string; role: string } = {
  quote:
    'Junges, motiviertes Team – professionell und zügig. Unkompliziert, Änderungen sofort umgesetzt. Patienten loben die neue Website. Weiterempfehlen, gerne wieder!',
  name: 'Annemarie S.',
  role: 'ARZTPRAXIS',
};

const MehrInfosStripe = ({ label = 'MEHR INFOS' }: { label?: string }) => (
  <div style={{ margin: '0 24px' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(3,249,249,0.3)',
        paddingBottom: '8px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-geist-mono, monospace)',
          fontSize: '13px',
          fontWeight: 700,
          color: '#03f9f9',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <IconArrowRight style={{ width: 16, height: 16, color: '#03f9f9' }} strokeWidth={2.5} />
    </div>
  </div>
);

/** Eine Karte volle Breite – wie Website-Testimonials, ohne Tag-Badge & ohne Avatar */
const StoryTestimonialCard = () => {
  const t = SLIDE_HOOK_TESTIMONIAL;
  return (
    <div
      style={{
        margin: '0 24px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
          padding: '8px 8px',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', gap: '2px', marginBottom: '6px', color: TESTIMONIAL_STAR_COLOR }} aria-hidden>
          {[0, 1, 2, 3, 4].map((s) => (
            <IconStarFilled key={s} style={{ width: 9, height: 9, flexShrink: 0 }} strokeWidth={1.5} />
          ))}
        </div>
        <p
          style={{
            fontSize: '8px',
            lineHeight: 1.35,
            color: '#ffffff',
            margin: 0,
            fontWeight: 500,
            flex: 1,
            wordBreak: 'break-word',
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '6px', paddingTop: '5px' }}>
          <div style={{ fontSize: '8px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{t.name}</div>
          <div
            style={{
              fontSize: '6px',
              color: SLIDE_STORY_TEXT_MUTED,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginTop: '2px',
              lineHeight: 1.2,
            }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
};

const PROJECTS: StoryProject[] = [
  ...REFERENZEN.slice(0, 3).map((ref, index) => ({
    id: ref.id,
    kunde: ref.kunde,
    branche: ref.branche,
    typ: ref.typ,
    url: ref.url ?? '#',
    desktopImage:
      ref.desktopImage ??
      (index === 0
        ? '/referenzen/gesund-schoen-desktop.png'
        : index === 1
          ? '/referenzen/hc-immobilien-desktop.png'
          : '/referenzen/ergotherapie-voigt-desktop.png'),
    phoneImage:
      ref.phoneImage ??
      (index === 0
        ? '/referenzen/gesund-schoen-phone.png'
        : index === 1
          ? '/referenzen/hc-immobilien-phone.png'
          : '/referenzen/ergotherapie-voigt-phone.png'),
    ergebnisse: ref.ergebnisse,
  })),
  {
    id: 'berneby-site',
    kunde: 'Berneby Solutions',
    branche: 'Agentur-Website / Showcase',
    typ: 'Webseite',
    url: 'https://berneby.website',
    desktopImage: '/screencapture-berneby-website-vercel-app-2026-02-22-23_31_18.png',
    phoneImage: '/screencapture-berneby-website-vercel-app-2026-02-22-23_31_18.png',
    ergebnisse: REFERENZEN_STATS.map((s) => ({
      metrik: s.label,
      wert: s.wert,
      positiv: true,
    })),
  },
];

export default function SocialsReferenzen() {
  return (
    <div className="min-h-screen bg-[#0B0F19] p-10 font-sans" style={{ fontSize: '16px' }}>
      <div className="max-w-[2200px] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-[30px] font-display font-bold text-brand-cyan uppercase tracking-widest">Story: Referenzen</h1>
          <p className="text-brand-navy-muted font-mono text-[12px] mt-[8px] uppercase tracking-widest">360×640px · Export: DevTools → Device 360×640 · DPR 3</p>
        </div>

        <div className="flex flex-wrap gap-10 justify-center">
          {/* ── 01: HOOK (INHALT, KEINE MOCKUPS) ───────────────────────────── */}
          <Slide number="01" invertMount beamOutRight showLogo>
            <StoryHeading>
              REFERENZEN,
              <br />
              DIE <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">BEWEISEN.</span>
            </StoryHeading>
            <ContentZone>
              <StoryBody>
                Du willst keine <strong>Show</strong>.
                <br />
                Du willst <strong>Live-Beweise</strong>
                <br />
                aus der <strong>Region</strong>.
              </StoryBody>

              <StoryTestimonialCard />
              <MehrInfosStripe label="PROJEKTE ANSEHEN" />
            </ContentZone>

            <Sticker bottom="24px">++ Link-Sticker ++{'\n'}⏱️ Zeit sparen</Sticker>
          </Slide>

          {/* ── 02: NEUE IDEE (INHALT, KEINE MOCKUPS) ─────────────────────── */}
          <Slide number="02" beamOutRight beamOutLeft>
            <StoryHeading>
              KEINE <br />
              <span className="text-brand-cyan">AUSREDEN.</span>
            </StoryHeading>

            <ContentZone>
              <StoryBody>
                <strong>Referenzen</strong> sind kein Schaufenster.
                <br />
                Du siehst <strong>echte Betriebe</strong> aus der Region,
                <br />
                live online und mit <strong>messbaren Effekten</strong>.
              </StoryBody>

              <div
                style={{
                  height: '200px',
                  margin: '0 24px',
                  marginTop: 'auto',
                  border: '1px solid rgba(3,249,249,0.2)',
                  background: 'rgba(3,249,249,0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    borderBottom: '1px solid rgba(3,249,249,0.3)',
                    borderLeft: '1px solid rgba(3,249,249,0.3)',
                    background: 'rgba(3,249,249,0.2)',
                    padding: '4px 10px',
                    fontFamily: 'var(--font-geist-mono, monospace)',
                    fontSize: '8px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#03f9f9',
                    zIndex: 20,
                  }}
                >
                  REFERENZEN
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
                    <span style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '13px', fontWeight: 700, color: 'rgba(3,249,249,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>PROJEKTE</span>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', margin: 0, padding: 0 }}>
                      <KListItem icon={<IconMapPin style={{ width: 28, height: 28, color: '#03f9f9', flexShrink: 0 }} strokeWidth={1.5} />} label="Echte Projekte" />
                      <KListItem icon={<IconWorld style={{ width: 28, height: 28, color: '#03f9f9', flexShrink: 0 }} strokeWidth={1.5} />} label="Live-Seiten" />
                      <KListItem icon={<IconMapPin style={{ width: 28, height: 28, color: '#03f9f9', flexShrink: 0 }} strokeWidth={1.5} />} label="Region" />
                    </ul>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
                    <span style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '13px', fontWeight: 700, color: 'rgba(3,249,249,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>TRUST</span>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', margin: 0, padding: 0 }}>
                      <KListItem icon={<IconStar style={{ width: 28, height: 28, color: '#03f9f9', flexShrink: 0 }} strokeWidth={1.5} />} label="Bewertungen" />
                      <KListItem icon={<IconTrendingUp style={{ width: 28, height: 28, color: '#03f9f9', flexShrink: 0 }} strokeWidth={1.5} />} label="Erfolg" />
                      <KListItem icon={<IconChartBar style={{ width: 28, height: 28, color: '#03f9f9', flexShrink: 0 }} strokeWidth={1.5} />} label="Zahlen" />
                    </ul>
                  </div>
                </div>
              </div>
            </ContentZone>
          </Slide>

          {/* ── 03–06: MOCKUPS (ENDE DER STORY) ───────────────────────────── */}
          {PROJECTS.map((project, index) => {
            const mockupMode: MockupMode = 'both';
            const projectArt = project.typ.trim().toUpperCase();

            return (
              <Slide key={project.id} number={`0${index + 4}`} beamOutRight beamOutLeft>
                <StoryHeading>
                  PROJEKT {index + 1}:
                  <br />
                  <span className="text-brand-cyan">{projectArt}</span>
                </StoryHeading>
                <ContentZone>
                  <ReferenceCardCompact project={project} mockupMode={mockupMode} />
                  <MehrInfosStripe />

                  <Sticker bottom="24px">++ Link-Sticker ++{'\n'}⏱️ Zeit sparen</Sticker>
                </ContentZone>
              </Slide>
            );
          })}
        </div>
      </div>
    </div>
  );
}
