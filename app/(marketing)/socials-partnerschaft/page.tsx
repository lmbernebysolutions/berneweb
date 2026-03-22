import { Metadata } from 'next';
import { SlideStoryBody as StoryBody } from '@/components/socials/slide-story-body';
import { BackdropNumber } from '@/components/ui/backdrop-number';
import { TechCorners } from '@/components/ui/tech-corners';
import { TextLogo } from '@/components/brand/TextLogo';
import Image from 'next/image';
import {
  IconArrowRight, IconPhoneCall, IconBolt, IconMessageDots, IconUserCheck
} from '@tabler/icons-react';
import { HausmeisterCardVisual } from '@/components/sections/HausmeisterCardVisual';

export const metadata: Metadata = { title: 'Socials Partnerschaft — Berneby Solutions' };

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
const Slide = ({ children, number, invertMount=false, mountBottom=false, footerVariant=false, beamOutRight=false, beamOutLeft=false, showLogo=false }: {
  children: React.ReactNode; number: string;
  invertMount?: boolean; mountBottom?: boolean; footerVariant?: boolean;
  beamOutRight?: boolean; beamOutLeft?: boolean; showLogo?: boolean;
}) => (
  <div className="relative w-[360px] h-[640px] bg-brand-navy overflow-visible shrink-0 shadow-2xl border border-white/10 font-sans">
    {/* Inner clip */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'}}/>
      {/* Beams */}
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
    {/* Out-beams */}
    {beamOutRight && <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[32px] h-px bg-brand-cyan/20 z-[2] pointer-events-none" aria-hidden/>}
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
// PAGE: Socials Partnerschaft
// ═══════════════════════════════════════════════════════════════════════════════
export default function SocialsPartnerschaft() {
  return (
    <div className="min-h-screen bg-[#0B0F19] p-10 font-sans" style={{fontSize:'16px'}}>
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-[30px] font-display font-bold text-brand-cyan uppercase tracking-widest">Story: Partnerschaft & Support</h1>
          <p className="text-brand-navy-muted font-mono text-[12px] mt-[8px] uppercase tracking-widest">360×640px · Export: DevTools → Device 360×640 · DPR 3</p>
        </div>

        <div className="flex flex-wrap gap-10 justify-center">

          {/* ── 01: PROBLEM ────────────────────────────────────────────────── */}
          <Slide number="01" invertMount beamOutRight showLogo>
            <StoryHeading>
              IT FRISST<br/>
              DEINE <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">ZEIT</span>?
            </StoryHeading>

            <ContentZone>
              <StoryBody>
                <strong>Updates</strong> klemmen, der Drucker streikt,<br/>
                das <strong>E-Mail-Postfach</strong> hakt.<br/>
                Wer <strong>kümmert</strong> sich eigentlich darum?
              </StoryBody>

              <div style={{marginTop:'31px', margin:'31px 24px 0 24px'}}>
                <div className="w-full flex items-center justify-center bg-brand-cyan text-brand-navy font-bold uppercase tracking-widest clip-corner shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] select-none" style={{height:44, fontSize:14}}>
                  IT NERVT? <IconArrowRight style={{marginLeft:8,width:16,height:16}} strokeWidth={2.5}/>
                </div>
              </div>
            </ContentZone>

            <Sticker bottom="80px">++ Link-Sticker ++{'\n'}🛠️ Hilfe holen</Sticker>
          </Slide>

          {/* ── 02: LÖSUNG (IT-ABTEILUNG) ────────────────────────────────── */}
          <Slide number="02" beamOutRight beamOutLeft>
            <StoryHeading>
              DEINE EXTERNE<br/>
              <span className="text-brand-cyan">IT-ABTEILUNG</span>
            </StoryHeading>

            <ContentZone>
              <Grid2x2 items={[
                { label:'Auf Abruf', icon:<IconPhoneCall style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'Proaktiv', icon:<IconBolt style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'Kurze Wege', icon:<IconMessageDots style={{width:32,height:32,color:'#03f9f9'}} /> },
                { label:'Augenhöhe', icon:<IconUserCheck style={{width:32,height:32,color:'#03f9f9'}} /> },
              ]}/>
            </ContentZone>

            <BodySlot>
              <StoryBody>
                Wir sind dein <strong>Team</strong> im Hintergrund.<br/>
                Ohne Hotline-Warteschleife, dafür<br/>
                mit <strong>schnellen Lösungen</strong> <strong>von hier</strong>.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 03: VERGLEICH ────────────────────────────────────────────── */}
          <Slide number="03" beamOutRight beamOutLeft>
            <StoryHeading>
              OHNE UNS VS.<br/>
              <span className="text-brand-cyan">MIT UNS</span>
            </StoryHeading>

            <ContentZone>
              <DualBlock
                negItems={['Niemand ist zuständig','Stundenlange Fehlersuche','Frust bei Updates']}
                posItems={['Ein fester Kontakt','Kurze WhatsApp reicht','Alles läuft stabil']}
              />
            </ContentZone>

            <BodySlot>
              <StoryBody>
                Der <strong>Unterschied</strong> ist sofort spürbar:<br/>
                Du hast wieder den <strong>Kopf frei</strong> und<br/>
                die Technik <strong>funktioniert einfach</strong>.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 04: SPECIAL COMPONENT (HAUSMEISTER CARD) ────────────────── */}
          <Slide number="04" beamOutRight beamOutLeft>
            <StoryHeading>
              EIN TICKET<br/>
              <span className="text-brand-cyan">FÜR ALLES</span>
            </StoryHeading>

            <ContentZone>
              <div style={{ margin: '0 24px' }}>
                <HausmeisterCardVisual
                  mode="story"
                  className="w-full"
                  features={[
                    "10 STUNDEN SUPPORT INKLUSIVE",
                    "WEB, OFFICE, DESIGN & NOTFÄLLE",
                    "EXPRESS-TICKET BEI PROBLEMEN",
                  ]}
                />
              </div>
            </ContentZone>
          </Slide>

          {/* ── 05: CTA ──────────────────────────────────────────────────── */}
          <Slide number="GO" mountBottom footerVariant beamOutLeft showLogo>
            <StoryHeading>
              HOL DIR DEINE<br/>
              <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">ZEIT</span> ZURÜCK.
            </StoryHeading>

            <ContentZone>
              <StoryBody>
                Lass uns schauen, wie wir deinen<br/>
                <strong>Alltag</strong> sofort <strong>entlasten</strong> können.<br/>
                <strong>Direkt</strong> und <strong>unverbindlich</strong>.
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
