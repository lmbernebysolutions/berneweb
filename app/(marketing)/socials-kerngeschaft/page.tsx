import { Metadata } from 'next';
import { SlideStoryBody as StoryBody } from '@/components/socials/slide-story-body';
import { BackdropNumber } from '@/components/ui/backdrop-number';
import { TechCorners } from '@/components/ui/tech-corners';
import { TextLogo } from '@/components/brand/TextLogo';
import Image from 'next/image';
import Link from 'next/link';
import {
  IconArrowRight, IconRobot, IconCalendar, IconMail,
  IconShieldCheck, IconLock, IconServer, IconCertificate,
  IconCheck, IconX
} from '@tabler/icons-react';

// Custom SVG icons (provided by user)
const IconAutomation = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    style={style}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M13 20.693c-.905 .628 -2.36 .292 -2.675 -1.01a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.492 .362 1.716 2.219 .674 3.03" />
    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    <path d="M17 22l5 -3l-5 -3l0 6" />
  </svg>
);

const IconCloudNetwork = ({ style }: { style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    style={style}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 20h7" />
    <path d="M14 20h7" />
    <path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M12 16v2" />
    <path d="M8 16.004h-1.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-2.535" />
  </svg>
);

export const metadata: Metadata = { title: 'Socials Kerngeschäft — Berneby Solutions' };

// ─── Design System ────────────────────────────────────────────────────────────
// Identisch zu socials-v2/page.tsx
// CANVAS: 360 × 640px
// SPACING: 31px vertikal, 24px horizontal
// ─────────────────────────────────────────────────────────────────────────────

const BERG = ["/icons/Berg1.svg","/icons/Berg2.svg","/icons/Berg3.svg","/icons/Berg4.svg"];
const BERG_FOOTER = ["/icons/Berg2.svg","/icons/Berg3.svg","/icons/Berg4.svg"];

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <div className="absolute top-[36px] left-[48px] z-50 transform scale-[0.5] origin-top-left pointer-events-none">
    <TextLogo variant="dark" size="default" />
  </div>
);

// ─── Slide Shell ──────────────────────────────────────────────────────────────
// beamOutRight: horizontale Line am rechten Rand, vertikal zentriert, nach rechts „raus"
// beamOutLeft:  horizontale Line am linken Rand, vertikal zentriert, von Slide-Rand (0) bis Beam (32px)
const Slide = ({ children, number, invertMount=false, mountBottom=false, footerVariant=false, beamOutRight=false, beamOutLeft=false, showLogo=false }: {
  children: React.ReactNode; number: string;
  invertMount?: boolean; mountBottom?: boolean; footerVariant?: boolean;
  beamOutRight?: boolean; beamOutLeft?: boolean; showLogo?: boolean;
}) => (
  <div className="relative w-[360px] h-[640px] bg-brand-navy overflow-visible shrink-0 shadow-2xl border border-white/10 font-sans">
    {/* Inner clip — keeps grid, noise, mountains, content clipped to slide bounds */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'}}/>
      {/* Beams — 32px from edge */}
      <div className="absolute top-0 bottom-0 left-[32px] w-px bg-brand-cyan/20 z-[2] pointer-events-none"/>
      <div className="absolute top-0 bottom-0 right-[32px] w-px bg-brand-cyan/20 z-[2] pointer-events-none"/>
      {/* Mountains */}
      {invertMount && <div className="absolute top-0 h-[240px] left-[32px] right-[32px] z-[2] pointer-events-none overflow-hidden"><div className="relative w-full h-full scale-y-[-1]">{BERG.map(s=><Image key={s} src={s} alt="" fill className="object-cover object-bottom opacity-80" unoptimized/>)}</div></div>}
      {mountBottom && <div className="absolute bottom-0 h-[240px] left-[32px] right-[32px] z-[2] pointer-events-none overflow-hidden"><div className="relative w-full h-full">{(footerVariant?BERG_FOOTER:BERG).map(s=><Image key={s} src={s} alt="" fill className="object-cover object-bottom opacity-80" unoptimized/>)}</div></div>}
      {/* Tech Corners */}
      <div className="absolute top-[100px] bottom-[60px] left-[32px] right-[32px] pointer-events-none z-[15]">
        <div className="absolute top-0 left-0 w-[16px] h-[16px] border-t-2 border-l-2 border-brand-cyan/40"/>
        <div className="absolute top-0 right-0 w-[16px] h-[16px] border-t-2 border-r-2 border-brand-cyan/40"/>
        <div className="absolute bottom-0 left-0 w-[16px] h-[16px] border-b-2 border-l-2 border-brand-cyan/40"/>
        <div className="absolute bottom-0 right-0 w-[16px] h-[16px] border-b-2 border-r-2 border-brand-cyan/40"/>
      </div>
      {showLogo && <Logo />}
      {/* Backdrop number */}
      <div className="absolute z-[3] overflow-hidden opacity-35 pointer-events-none w-full h-full top-0 left-0">
        <BackdropNumber number={number} className="top-auto bottom-[-10%] left-1/2 -translate-x-1/2 !text-[280px]"/>
      </div>
      {/* Content area */}
      <div style={{position:'absolute',top:'100px',bottom:'60px',left:'32px',right:'32px',zIndex:10,paddingTop:'24px',paddingBottom:'24px',display:'flex',flexDirection:'column'}}>
        {children}
      </div>
    </div>
    {/* Out-beams — same line settings (w-px bg-brand-cyan/20), vertically centered, extending out of slide */}
    {beamOutRight && <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[32px] h-px bg-brand-cyan/20 z-[2] pointer-events-none" aria-hidden/>}
    {/* Left: from slide left edge (0) to left beam (32px), connecting edge to beam line */}
    {beamOutLeft  && <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[32px] h-px bg-brand-cyan/20 z-[2] pointer-events-none" aria-hidden/>}
  </div>
);

// ─── Components ───────────────────────────────────────────────────────────────
const StoryHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full shrink-0">
    <h1 className="font-display text-[42px] font-extrabold uppercase leading-[0.95] tracking-[0.02em] text-white ml-[-16px] overflow-visible drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
      {children}
    </h1>
  </div>
);

const ContentZone = ({ children, center=false }: { children: React.ReactNode; center?: boolean }) => (
  <div style={{flex:1, marginTop:'31px', display:'flex', flexDirection:'column', justifyContent: center ? 'center' : 'flex-start'}}>
    {children}
  </div>
);

const Sticker = ({ children, bottom }: { children: React.ReactNode; bottom?: string }) => (
  <div style={bottom ? {position:'absolute', bottom, left:0, right:0} : {marginTop:'auto', margin:'auto 0 0 0'}}>
    <div style={{border:'1px dashed #03f9f9', background:'rgba(3,249,249,0.05)', margin:'0 24px', padding:'12px', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest text-center">{children}</span>
    </div>
  </div>
);

const BodySlot = ({ children }: { children: React.ReactNode }) => (
  <div style={{marginTop:'31px', flexShrink:0}}>{children}</div>
);

const BlockMD = ({ badge, cyan=true, children }: { badge: string; cyan?: boolean; children: React.ReactNode }) => (
  <div style={{
    height:'200px', margin:'0 24px', border:`1px solid ${cyan?'rgba(3,249,249,0.2)':'rgba(255,255,255,0.1)'}`,
    background: cyan?'rgba(3,249,249,0.15)':'rgba(0,0,0,0.3)', position:'relative', overflow:'hidden', flexShrink:0,
  }}>
    <div style={{
      position:'absolute', top:0, right:0, borderBottom:`1px solid ${cyan?'rgba(3,249,249,0.3)':'rgba(255,255,255,0.1)'}`,
      borderLeft:`1px solid ${cyan?'rgba(3,249,249,0.3)':'rgba(255,255,255,0.1)'}`,
      background: cyan?'rgba(3,249,249,0.2)':'rgba(0,0,0,0.4)',
      padding:'4px 10px', fontFamily:"var(--font-geist-mono, monospace)", fontSize:'8px', fontWeight:700,
      textTransform:'uppercase', letterSpacing:'0.1em', color: cyan?'#03f9f9':'rgba(255,255,255,0.4)', zIndex:20,
    }}>{badge}</div>
    {children}
  </div>
);

const Grid2x2 = ({ items }: { items: { icon: React.ReactNode; label: string }[] }) => (
  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', margin:'0 24px', flexShrink:0}}>
    {items.map((item, i) => (
      <div key={i} style={{height:'96px', border:'1px solid rgba(255,255,255,0.1)', background:'rgba(26,35,66,0.3)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px', position:'relative'}}>
        <TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand={false} />
        {item.icon}
        <span style={{fontFamily:"var(--font-geist-mono, monospace)", fontSize:'11px', fontWeight:700, color:'#03f9f9', textTransform:'uppercase', letterSpacing:'0.08em', textAlign:'center', lineHeight:1.2, padding:'0 4px'}}>{item.label}</span>
      </div>
    ))}
  </div>
);

const DualBlock = ({ negItems, posItems }: { negItems: string[]; posItems: string[] }) => (
  <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
    {/* OHNE UNS */}
    <div style={{height:'106px', margin:'0 24px', border:'2px solid rgba(255,255,255,0.05)', background:'rgba(0,0,0,0.3)', position:'relative', overflow:'hidden', flexShrink:0}}>
      <div style={{position:'absolute',inset:0,opacity:1,pointerEvents:'none',backgroundImage:'repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.015) 10px,rgba(255,255,255,0.015) 20px)'}}/>
      <div style={{position:'absolute',top:0,right:0,borderBottom:'1px solid rgba(255,255,255,0.1)',borderLeft:'1px solid rgba(255,255,255,0.1)',background:'rgba(0,0,0,0.4)',padding:'3px 10px',fontFamily:"var(--font-geist-mono, monospace)",fontSize:'7px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.4)',zIndex:20}}>STATUS_OFFLINE</div>
      <ul style={{padding:'20px 10px 4px',display:'flex',flexDirection:'column',gap:'5px'}}>
        {negItems.map((t,i) => (<li key={i} style={{borderLeft:'2px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.02)',padding:'3px 8px',fontSize:'12px',fontWeight:500,lineHeight:1.2,color:'rgba(156,174,201,1)'}}>{t}</li>))}
      </ul>
    </div>
    {/* MIT UNS */}
    <div style={{height:'106px', margin:'0 24px', border:'2px solid rgba(3,249,249,0.3)', background:'rgba(3,249,249,0.05)', boxShadow:'0 0 30px rgba(3,249,249,0.1)', position:'relative', overflow:'hidden', flexShrink:0}}>
      <div style={{position:'absolute',inset:0,opacity:0.05,pointerEvents:'none',backgroundImage:'linear-gradient(rgba(3,249,249,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(3,249,249,0.1) 1px,transparent 1px)',backgroundSize:'20px 20px'}}/>
      <TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand={false} />
      <div style={{position:'absolute',top:0,right:0,borderBottom:'2px solid rgba(3,249,249,0.4)',borderLeft:'2px solid rgba(3,249,249,0.4)',background:'rgba(3,249,249,0.2)',padding:'3px 10px',fontFamily:"var(--font-geist-mono, monospace)",fontSize:'7px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#03f9f9',zIndex:20,boxShadow:'0 0 10px rgba(3,249,249,0.3)'}}>SYSTEM_ONLINE</div>
      <ul style={{padding:'20px 10px 4px',display:'flex',flexDirection:'column',gap:'5px'}}>
        {posItems.map((t,i) => (<li key={i} style={{borderLeft:'2px solid #03f9f9',background:'rgba(3,249,249,0.1)',padding:'3px 8px',fontSize:'12px',fontWeight:700,lineHeight:1.2,color:'#fff'}}>{t}</li>))}
      </ul>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: Socials Kerngeschäft
// ═══════════════════════════════════════════════════════════════════════════════
export default function SocialsKerngeschaft() {
  return (
    <div className="min-h-screen bg-[#0B0F19] p-10 font-sans" style={{fontSize:'16px'}}>
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-[30px] font-display font-bold text-brand-cyan uppercase tracking-widest">Story: Kerngeschäft</h1>
          <p className="text-brand-navy-muted font-mono text-[12px] mt-[8px] uppercase tracking-widest">360×640px · Export: DevTools → Device 360×640 · DPR 3</p>
        </div>

        <div className="flex flex-wrap gap-10 justify-center">

          {/* ── 01: PROBLEM — beamOutRight only ───────────────────────────── */}
          <Slide number="01" invertMount beamOutRight showLogo>
            <StoryHeading>
              DEIN ECHTES <br/>
              <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">KERNGESCHÄFT?</span>
            </StoryHeading>

            <ContentZone>
              <StoryBody>
                <strong>Telefon</strong> klingelt, <strong>E-Mails</strong> stauen sich,<br/>
                <strong>digitale Unordnung</strong> bremst dich aus.<br/>
                Du willst eigentlich nur <strong>arbeiten</strong>.
              </StoryBody>

              <div style={{marginTop:'31px', margin:'31px 24px 0 24px'}}>
                <div className="w-full flex items-center justify-center bg-brand-cyan text-brand-navy font-bold uppercase tracking-widest clip-corner shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] select-none" style={{height:44, fontSize:14}}>
                  ZEIT SPAREN <IconArrowRight style={{marginLeft:8,width:16,height:16}} strokeWidth={2.5}/>
                </div>
              </div>
            </ContentZone>

            <Sticker bottom="80px">++ Link-Sticker ++{'\n'}⏱️ Zeit sparen</Sticker>
          </Slide>

          {/* ── 02: LÖSUNG (AUTOMATISIERUNG) — beamOutRight + beamOutLeft ── */}
          <Slide number="02" beamOutRight beamOutLeft>
            <StoryHeading>
              WIR SCHAFFEN<br/>
              <span className="text-brand-cyan">FREIRAUM</span>
            </StoryHeading>

            <ContentZone>
              <Grid2x2 items={[
                { label:'Automatisierung', icon:<IconRobot    style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'Auto-Mail',   icon:<IconMail          style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'Sync',        icon:<IconCloudNetwork  style={{width:32,height:32,color:'#03f9f9'}} /> },
                { label:'Systeme',     icon:<IconAutomation    style={{width:32,height:32,color:'#03f9f9'}} /> },
              ]}/>
            </ContentZone>

            <BodySlot>
              <StoryBody>
                Wir <strong>automatisieren</strong> <strong>Routine-Aufgaben</strong>.<br/>
                Vom Telefonat bis zur Ablage —<br/>
                damit du den <strong>Kopf frei</strong> hast.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 03: VERTRAUEN (RECHTSSICHER) — beamOutRight + beamOutLeft ── */}
          <Slide number="03" beamOutRight beamOutLeft>
            <StoryHeading>
              100% DSGVO<br/>
              <span className="text-brand-cyan">KONFORM</span>
            </StoryHeading>

            <ContentZone>
              <BlockMD badge="COMPLIANCE" cyan>
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <div style={{ position: 'relative' }}>
                      <div className="absolute inset-0 bg-brand-cyan/20 blur-xl rounded-full" />
                      <IconShieldCheck style={{ width: 64, height: 64, color: '#03f9f9', position: 'relative', zIndex: 10 }} strokeWidth={1} />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                      gap: '8px',
                      width: '100%',
                      maxWidth: '100%',
                      alignItems: 'start',
                      justifyItems: 'center',
                      paddingLeft: '8px',
                      paddingRight: '8px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '8px', width: '100%', maxWidth: '100%' }}>
                      <div className="relative flex h-[56px] w-[56px] items-center justify-center transition-all">
                        <div className="absolute inset-0 scale-[0.6]"><TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand /></div>
                        <IconServer style={{width:28, height:28, color:'#fff', position:'relative', zIndex:10}} strokeWidth={1.5}/>
                      </div>
                      <span
                        className="text-white text-center leading-[1.2]"
                        style={{
                          fontFamily: 'var(--font-geist-mono, monospace)',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        DE-Server
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '8px', width: '100%', maxWidth: '100%' }}>
                      <div className="relative flex h-[56px] w-[56px] items-center justify-center transition-all">
                        <div className="absolute inset-0 scale-[0.6]"><TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand /></div>
                        <IconLock style={{width:28, height:28, color:'#fff', position:'relative', zIndex:10}} strokeWidth={1.5}/>
                      </div>
                      <span
                        className="text-white text-center leading-[1.2]"
                        style={{
                          fontFamily: 'var(--font-geist-mono, monospace)',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        DSGVO
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '8px', width: '100%', maxWidth: '100%' }}>
                      <div className="relative flex h-[56px] w-[56px] items-center justify-center transition-all">
                        <div className="absolute inset-0 scale-[0.6]"><TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand /></div>
                        <IconCertificate style={{width:28, height:28, color:'#fff', position:'relative', zIndex:10}} strokeWidth={1.5}/>
                      </div>
                      <span
                        className="text-white text-center leading-[1.2]"
                        style={{
                          fontFamily: 'var(--font-geist-mono, monospace)',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        Zertifiziert
                      </span>
                    </div>
                  </div>
                </div>
              </BlockMD>
            </ContentZone>

            <BodySlot>
              <StoryBody>
                <strong>Keine Sorgen</strong> um Daten.<br/>
                Unsere Lösungen sind <strong>DSGVO-konform</strong><br/>
                und sicher im <strong>deutschen Rechenzentrum</strong>.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 04: ERGEBNIS — beamOutRight + beamOutLeft ─────────────────── */}
          <Slide number="04" beamOutRight beamOutLeft>
            <StoryHeading>
              DEIN GEWINN:<br/>
              <span className="text-brand-cyan">MEHR FOKUS</span>
            </StoryHeading>

            <ContentZone>
              <DualBlock
                negItems={['Papierchaos & Zettel','Ständige Unterbrechungen','Vergessene Rückrufe']}
                posItems={['Digitale Ordnung','Ruhiges Arbeiten','Automatischer Prozess']}
              />
            </ContentZone>

            <BodySlot>
              <StoryBody>
                Endlich wieder <strong>Zeit</strong> für das,<br/>
                was Geld bringt: Dein <strong>Handwerk</strong>.<br/>
                Dein <strong>Kerngeschäft</strong>. Deine <strong>Kunden</strong>.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 05: CTA — beamOutLeft only ────────────────────────────────── */}
          <Slide number="GO" mountBottom footerVariant beamOutLeft showLogo>
            <StoryHeading>
              ZURÜCK ZUM <br/>
              <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">KERNGESCHÄFT.</span>
            </StoryHeading>

            <ContentZone>
              <StoryBody>
                Lass uns schauen, wo wir bei dir<br/>
                die größten <strong>Zeitfresser</strong> abschalten<br/>
                können. <strong>Direkt</strong> und <strong>unverbindlich</strong>.
              </StoryBody>

              <div style={{marginTop:'31px', margin:'31px 24px 0 24px'}}>
                <div className="w-full flex items-center justify-center bg-brand-cyan text-brand-navy font-bold uppercase tracking-widest clip-corner shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] select-none" style={{height:44, fontSize:14}}>
                  ERSTGESPRÄCH <IconArrowRight style={{marginLeft:8,width:16,height:16}} strokeWidth={2.5}/>
                </div>
              </div>
            </ContentZone>

            <Sticker bottom="80px">++ Link-Sticker ++{'\n'}🚀 Zum Kalender</Sticker>
          </Slide>

        </div>
      </div>
    </div>
  );
}
