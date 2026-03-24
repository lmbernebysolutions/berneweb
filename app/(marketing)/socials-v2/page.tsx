import { Metadata } from 'next';
import { SlideStoryBody as StoryBody } from '@/components/socials/slide-story-body';
import { BackdropNumber } from '@/components/ui/backdrop-number';
import { TechCorners } from '@/components/ui/tech-corners';
import { TextLogo } from '@/components/brand/TextLogo';
import Image from 'next/image';
import {
  IconSearch, IconRobot, IconDeviceDesktop, IconCheck, IconX,
  IconBrandReact, IconBrandNextjs, IconBriefcase, IconArrowRight,
  IconTarget, IconBrandGoogle, IconBrandMeta, IconMapPin, IconPhoneCall,
  IconStar, IconChartBar, IconBrandAdobe, IconBrush, IconPalette, IconLayout2
} from '@tabler/icons-react';
import { CursorLogo } from '@/components/ui/cursor-logo';

export const metadata: Metadata = { title: 'Socials V2 — Berneby Solutions' };

// ─── Design System ────────────────────────────────────────────────────────────
// CANVAS:  360 × 640px (9:16). Export → DevTools Device 360×640, DPR:3 → 1080×1920px
// BEAMS:   32px from edge (left-[32px] / right-[32px])
// CORNERS: top-[100px] / bottom-[60px]
// CONTENT: py-[24px] inside corner box = 432px usable height
// SPACING: ALL values in px-literals (zoom-independent; no rem/Tailwind scale utils)
//
// Heading (~102px for 2 lines @ 54px/0.95lh)
// → gap 31px
// → Content Zone (flex:1, auto-fills remaining space)
//   → Container SIZE-MD: h-[200px]  (grid 2×96+8=200px, BlockMD 200px)
//   → Container SIZE-LG: 2×h-[106px]+gap-[8px]=220px (OHNE/MIT UNS)
// → gap 31px
// → StoryBody (ALWAYS at same Y — guaranteed by flex-1 above)
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
// beamOutRight: horizontale Line am rechten Rand, zentriert, nach rechts „raus“
// beamOutLeft: horizontale Line am linken Rand, zentriert, nach links „raus“
const Slide = ({ children, number, invertMount=false, mountBottom=false, footerVariant=false, beamOutRight=false, beamOutLeft=false, showLogo=false }: {
  children: React.ReactNode; number: string;
  invertMount?: boolean; mountBottom?: boolean; footerVariant?: boolean;
  beamOutRight?: boolean; beamOutLeft?: boolean; showLogo?: boolean;
}) => (
  <div className="relative w-[360px] h-[640px] bg-brand-navy overflow-visible shrink-0 shadow-2xl border border-white/10 font-sans">
    {/* Inner clip — keeps content (mountains, grid) clipped */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'}}/>
      {/* Beams — 32px from edge (same line settings as outer beams) */}
      <div className="absolute top-0 bottom-0 left-[32px] w-px bg-brand-cyan/20 z-[2] pointer-events-none"/>
      <div className="absolute top-0 bottom-0 right-[32px] w-px bg-brand-cyan/20 z-[2] pointer-events-none"/>
      {/* Mountains */}
      {invertMount && <div className="absolute top-0 h-[240px] left-[32px] right-[32px] z-[2] pointer-events-none overflow-hidden"><div className="relative w-full h-full scale-y-[-1]">{BERG.map(s=><Image key={s} src={s} alt="" fill className="object-cover object-bottom opacity-80" unoptimized/>)}</div></div>}
      {mountBottom && <div className="absolute bottom-0 h-[240px] left-[32px] right-[32px] z-[2] pointer-events-none overflow-hidden"><div className="relative w-full h-full">{(footerVariant?BERG_FOOTER:BERG).map(s=><Image key={s} src={s} alt="" fill className="object-cover object-bottom opacity-80" unoptimized/>)}</div></div>}
      {/* Tech Corners — bottom reduced from 100px to 60px (+40px content area) */}
      <div className="absolute top-[100px] bottom-[60px] left-[32px] right-[32px] pointer-events-none z-[15]">
        <div className="absolute top-0 left-0 w-[16px] h-[16px] border-t-2 border-l-2 border-brand-cyan/40"/>
        <div className="absolute top-0 right-0 w-[16px] h-[16px] border-t-2 border-r-2 border-brand-cyan/40"/>
        <div className="absolute bottom-0 left-0 w-[16px] h-[16px] border-b-2 border-l-2 border-brand-cyan/40"/>
        <div className="absolute bottom-0 right-0 w-[16px] h-[16px] border-b-2 border-r-2 border-brand-cyan/40"/>
      </div>
      {showLogo && <Logo />}
      {/* Backdrop */}
      <div className="absolute z-[3] overflow-hidden opacity-35 pointer-events-none w-full h-full top-0 left-0">
        <BackdropNumber number={number} className="top-auto bottom-[-10%] left-1/2 -translate-x-1/2 !text-[280px]"/>
      </div>
      {/* Content area — top:100px, bottom:60px (asymmetric: logo needs 100px, bottom only 60px) */}
      <div style={{position:'absolute',top:'100px',bottom:'60px',left:'32px',right:'32px',zIndex:10,paddingTop:'24px',paddingBottom:'24px',display:'flex',flexDirection:'column'}}>
        {children}
      </div>
    </div>
    {/* Out-beams — same line settings (w-px bg-brand-cyan/20), centered, extending out of slide */}
    {beamOutRight && <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[32px] h-px bg-brand-cyan/20 z-[2] pointer-events-none" aria-hidden/>}
    {/* Left: from slide left edge (0) to left beam (32px), so it connects beam to edge */}
    {beamOutLeft && <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[32px] h-px bg-brand-cyan/20 z-[2] pointer-events-none" aria-hidden/>}
  </div>
);

// ─── StoryHeading ─────────────────────────────────────────────────────────────
const StoryHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full shrink-0">
    <h1 className="font-display text-[42px] font-extrabold uppercase leading-[0.95] tracking-[0.02em] text-white ml-[-16px] overflow-visible drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
      {children}
    </h1>
  </div>
);

// ─── Content Zone (flex-1) ────────────────────────────────────────────────────
// Grows to fill all space between Heading and StoryBody.
// Guarantees StoryBody always lands at same Y position regardless of content size.
const ContentZone = ({ children, center=false }: { children: React.ReactNode; center?: boolean }) => (
  <div style={{flex:1, marginTop:'31px', display:'flex', flexDirection:'column', justifyContent: center ? 'center' : 'flex-start'}}>
    {children}
  </div>
);

// ─── StoryBody slot (always at bottom) ───────────────────────────────────────
const BodySlot = ({ children }: { children: React.ReactNode }) => (
  <div style={{marginTop:'31px', flexShrink:0}}>
    {children}
  </div>
);

// ─── StoryBody ─ @/components/socials/slide-story-body (grau + <strong> weiß)

// ─── Instagram Sticker ────────────────────────────────────────────────────────
// bottom prop: absolute positioning (centered between last element and tech corner)
// no bottom prop: marginTop:auto (floats to flex-column bottom)
const Sticker = ({ children, bottom }: { children: React.ReactNode; bottom?: string }) => (
  <div style={bottom
    ? {position:'absolute', bottom, left:0, right:0}
    : {marginTop:'auto', margin:'auto 0 0 0'}
  }>
    <div style={{border:'1px dashed #03f9f9', background:'rgba(3,249,249,0.05)', margin:'0 24px', padding:'12px 18px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'9999px'}}>
      <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest text-center">{children}</span>
    </div>
  </div>
);

// ─── SIZE-MD Container (h=200px) — used for KAMPAGNEN, etc. ──────────────────
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

// ─── SIZE-SM Container (h=106px) — used for OHNE UNS / MIT UNS (dual pair) ───
// SIZE-LG total: 2 × 106px + 8px gap = 220px
// Compensates for 2-line StoryBody on Slide 04:
//   SIZE-LG 220px + 2-line body ~42px = 262px ≈ SIZE-MD 200px + 3-line body ~63px = 263px ✓
const BlockSM = ({ badge, cyan=false, red=false, children }: { badge: string; cyan?: boolean; red?: boolean; children: React.ReactNode }) => (
  <div style={{
    height:'106px', margin:'0 24px',
    border:`1px solid ${cyan?'rgba(3,249,249,0.2)':red?'rgba(239,68,68,0.2)':'rgba(255,255,255,0.1)'}`,
    background: cyan?'rgba(3,249,249,0.15)':red?'rgba(239,68,68,0.08)':'rgba(0,0,0,0.3)',
    position:'relative', overflow:'hidden', flexShrink:0,
  }}>
    {cyan && <TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand={false} />}
    <div style={{
      position:'absolute', top:0, right:0,
      borderBottom:`1px solid ${cyan?'rgba(3,249,249,0.3)':red?'rgba(239,68,68,0.3)':'rgba(255,255,255,0.1)'}`,
      borderLeft:`1px solid ${cyan?'rgba(3,249,249,0.3)':red?'rgba(239,68,68,0.3)':'rgba(255,255,255,0.1)'}`,
      background: cyan?'rgba(3,249,249,0.2)':red?'rgba(239,68,68,0.2)':'rgba(0,0,0,0.4)',
      padding:'3px 10px', fontFamily:"var(--font-geist-mono, monospace)", fontSize:'7px', fontWeight:700,
      textTransform:'uppercase', letterSpacing:'0.1em',
      color: cyan?'#03f9f9':red?'rgba(239,68,68,0.9)':'rgba(255,255,255,0.4)', zIndex:20,
    }}>{badge}</div>
    {children}
  </div>
);

// ─── 2×2 Grid (SIZE-MD equivalent: 2×96+8=200px) ────────────────────────────
// Each cell h-[96px]. Total grid height = 200px = same as BlockMD.
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

// ─── Dual Comparison Block — Website-Design 1:1 (SIZE-LG: 2×106+8=220px) ────
// OHNE UNS: dark bg + diagonal stripes + STATUS_OFFLINE badge + left-border rows
// MIT UNS:  cyan bg + grid texture + SYSTEM_ONLINE badge + cyan left-border rows + diagonal TechCorners
const DualBlock = ({
  negItems, posItems,
}: { negItems: string[]; posItems: string[] }) => (
  <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>

    {/* ── OHNE UNS — STATUS_OFFLINE, keine TechCorners */}
    <div style={{
      height:'106px', margin:'0 24px', border:'2px solid rgba(255,255,255,0.05)',
      background:'rgba(0,0,0,0.3)', position:'relative', overflow:'hidden', flexShrink:0,
    }}>
      {/* Diagonal warning stripes — identical to website */}
      <div style={{position:'absolute',inset:0,opacity:1,pointerEvents:'none',
        backgroundImage:'repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.015) 10px,rgba(255,255,255,0.015) 20px)'}}/>
      {/* STATUS_OFFLINE badge */}
      <div style={{position:'absolute',top:0,right:0,borderBottom:'1px solid rgba(255,255,255,0.1)',borderLeft:'1px solid rgba(255,255,255,0.1)',
        background:'rgba(0,0,0,0.4)',padding:'3px 10px',fontFamily:"var(--font-geist-mono, monospace)",fontSize:'7px',fontWeight:700,
        textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.4)',zIndex:20}}>STATUS_OFFLINE</div>
      <ul style={{padding:'20px 10px 4px',display:'flex',flexDirection:'column',gap:'5px'}}>
        {negItems.map((t,i) => (
          <li key={i} style={{borderLeft:'2px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.02)',
            padding:'3px 8px',fontSize:'12px',fontWeight:500,lineHeight:1.2,color:'rgba(156,174,201,1)'}}>
            {t}
          </li>
        ))}
      </ul>
    </div>

    {/* ── MIT UNS — SYSTEM_ONLINE, diagonal cyan TechCorners */}
    <div style={{
      height:'106px', margin:'0 24px', border:'2px solid rgba(3,249,249,0.3)',
      background:'rgba(3,249,249,0.05)', boxShadow:'0 0 30px rgba(3,249,249,0.1)',
      position:'relative', overflow:'hidden', flexShrink:0,
    }}>
      {/* Animated grid texture — identical to website */}
      <div style={{position:'absolute',inset:0,opacity:0.05,pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(3,249,249,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(3,249,249,0.1) 1px,transparent 1px)',
        backgroundSize:'20px 20px'}}/>
      {/* Diagonal TechCorners — only MIT UNS */}
      <TechCorners pattern="diagonal" variant="cyan" size="sm" hoverExpand={false} />
      {/* SYSTEM_ONLINE badge */}
      <div style={{position:'absolute',top:0,right:0,borderBottom:'2px solid rgba(3,249,249,0.4)',borderLeft:'2px solid rgba(3,249,249,0.4)',
        background:'rgba(3,249,249,0.2)',padding:'3px 10px',fontFamily:"var(--font-geist-mono, monospace)",fontSize:'7px',fontWeight:700,
        textTransform:'uppercase',letterSpacing:'0.1em',color:'#03f9f9',zIndex:20,
        boxShadow:'0 0 10px rgba(3,249,249,0.3)'}}>SYSTEM_ONLINE</div>
      <ul style={{padding:'20px 10px 4px',display:'flex',flexDirection:'column',gap:'5px'}}>
        {posItems.map((t,i) => (
          <li key={i} style={{borderLeft:'2px solid #03f9f9',background:'rgba(3,249,249,0.1)',
            padding:'3px 8px',fontSize:'12px',fontWeight:700,lineHeight:1.2,color:'#fff'}}>
            {t}
          </li>
        ))}
      </ul>
    </div>

  </div>
);

// ─── KAMPAGNEN list item ──────────────────────────────────────────────────────
// Icon size: 24px
const KListItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <li style={{display:'flex', gap:'8px', alignItems:'center', fontSize:'12px', fontWeight:700, color:'#fff'}}>
    {icon}
    <span style={{fontFamily:"var(--font-geist-mono, monospace)", textTransform:'uppercase', letterSpacing:'0.08em', lineHeight:1.2}}>{label}</span>
  </li>
);

// (HeroRow removed — Slide 02 now uses inline 2-col USP-Block matching KAMPAGNEN visual style)

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function SocialsV2() {
  return (
    // fontSize:16px resets the responsive html font from globals.css for this page wrapper
    // but since Tailwind rem is based on :root, we use only px-literals in slide components
    <div className="min-h-screen bg-[#0B0F19] p-10 font-sans" style={{fontSize:'16px'}}>
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-[30px] font-display font-bold text-brand-cyan uppercase tracking-widest">Story Canvas V2</h1>
          <p className="text-brand-navy-muted font-mono text-[12px] mt-[8px] uppercase tracking-widest">360×640px · Export: DevTools → Device 360×640 · DPR 3 → 1080×1920px</p>
        </div>

        <div className="flex flex-wrap gap-10 justify-center">

          {/* ── 01: Hook ──────────────────────────────────────────────────── */}
          <Slide number="01" invertMount beamOutRight>
            <StoryHeading>
              DAS FRISST<br/>
              <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">ZU VIEL ZEIT?</span>
            </StoryHeading>

            {/* Mirror Slide 07: StoryBody + CTA both INSIDE ContentZone */}
            <ContentZone>
              <StoryBody>
                Fehlende <strong>Aufträge</strong> oder <strong>Telefonflut</strong>,<br/>
                veraltete <strong>Webseite</strong> kostet täglich<br/>
                <strong>Umsatz</strong>, <strong>Zeit</strong> und <strong>Nerven</strong>.
              </StoryBody>

              <div style={{marginTop:'31px', margin:'31px 24px 0 24px'}}>
                <div className="w-full flex items-center justify-center bg-brand-cyan text-brand-navy font-bold uppercase tracking-widest clip-corner shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] select-none" style={{height:44, fontSize:14}}>
                  ZEIT SPAREN <IconArrowRight style={{marginLeft:8,width:16,height:16}} strokeWidth={2.5}/>
                </div>
              </div>
            </ContentZone>

            {/* Sticker: absolute, zentriert zwischen CTA-Button-Ende und unterem Tech-Corner */}
            <Sticker bottom="80px">++ Link-Sticker ++{'\n'}⏱️ Zeit sparen</Sticker>
          </Slide>

          {/* ── 02: WIR MACHEN DIGITAL ────────────────────────────────────── */}
          <Slide number="02" beamOutRight beamOutLeft>
            <StoryHeading>
              WIR MACHEN<br/>
              <span className="text-brand-cyan">DIGITAL</span>
            </StoryHeading>

            {/* USP-Block + StoryBody + MEHR INFOS Link all inside ContentZone */}
            <ContentZone>
              {/* 2-Spalten USP-Block — matching KAMPAGNEN visual style, h=96px */}
              <div style={{
                height:'96px', margin:'0 24px', border:'1px solid rgba(3,249,249,0.2)',
                background:'rgba(3,249,249,0.15)', position:'relative', overflow:'hidden', flexShrink:0,
              }}>
                {/* DIGITAL badge */}
                <div style={{
                  position:'absolute', top:0, right:0,
                  borderBottom:'1px solid rgba(3,249,249,0.3)', borderLeft:'1px solid rgba(3,249,249,0.3)',
                  background:'rgba(3,249,249,0.2)', padding:'3px 10px',
                  fontFamily:"var(--font-geist-mono, monospace)", fontSize:'7px', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.1em', color:'#03f9f9', zIndex:20,
                }}>DIGITAL</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', height:'100%'}}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'center', paddingTop:8}}>
                    <ul style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                      <KListItem icon={<IconMapPin   style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="NET-GEO"/>
                      <KListItem icon={<IconPhoneCall style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="KI-Telefon"/>
                    </ul>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'center', paddingTop:8}}>
                    <ul style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                      <KListItem icon={<IconStar     style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="Bewertungen"/>
                      <KListItem icon={<IconChartBar style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="Analytics"/>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{marginTop:'31px'}}>
                <StoryBody>
                  Von <strong>NET-GEO</strong> über den <strong>24/7</strong><br/>
                  <strong>KI-Telefonassistenten</strong> bis hin zu<br/>
                  <strong>automatisierten Bewertungen</strong>.
                </StoryBody>
              </div>
              {/* MEHR INFOS als Link — 13px */}
              <div style={{marginTop:'31px', margin:'31px 24px 0 24px'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(3,249,249,0.3)', paddingBottom:'8px'}}>
                  <span style={{fontFamily:"var(--font-geist-mono, monospace)", fontSize:'13px', fontWeight:700, color:'#03f9f9', textTransform:'uppercase', letterSpacing:'0.12em'}}>MEHR INFOS</span>
                  <IconArrowRight style={{width:16,height:16,color:'#03f9f9'}} strokeWidth={2.5}/>
                </div>
              </div>
            </ContentZone>

            {/* Sticker: absolute, zentriert zwischen MEHR INFOS und unterem Tech-Corner */}
            <Sticker bottom="24px">++ Link-Sticker ++{'\n'}🌐 Mehr erfahren</Sticker>
          </Slide>

          {/* ── 03: TECH-STACK ────────────────────────────────────────────── */}
          <Slide number="03" beamOutRight beamOutLeft>
            <StoryHeading>
              UNSER<br/>
              <span className="text-brand-cyan">TECH-STACK</span>
            </StoryHeading>

            {/* Grid: 2×96+8=200px = SIZE-MD ✓ */}
            <ContentZone>
              <Grid2x2 items={[
                { label:'Next.js', icon:<IconBrandNextjs style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'React',       icon:<IconBrandReact  style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'Cursor', icon:<CursorLogo style={{width:32,height:32,color:'#03f9f9'}} /> },
                { label:'Adobe', icon:<IconBrandAdobe  style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
              ]}/>
            </ContentZone>

            <BodySlot>
              <StoryBody>
                <strong>Keine Baukästen</strong>, nur <strong>saubere Systeme</strong><br/>
                gebaut für <strong>Performance</strong> und<br/>
                <strong>langfristige Stabilität</strong>.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 04: OHNE UNS VS. MIT UNS ─────────────────────────────────── */}
          <Slide number="04" beamOutRight beamOutLeft>
            <StoryHeading>
              OHNE UNS<br/>
              <span className="text-brand-cyan whitespace-nowrap">VS. MIT UNS</span>
            </StoryHeading>

            {/* DualBlock: SIZE-LG 2×106+8=220px. flex-1 fills vertically. */}
            <ContentZone>
              <DualBlock
                negItems={['Keine Zeit fürs Wesentliche','Verschachtelte Agenturen','Baukasten ohne Wirkung']}
                posItems={['Clevere Automatisierung','Partner auf Augenhöhe','Modernster Tech-Stack']}
              />
            </ContentZone>

            <BodySlot>
              <StoryBody>
                Wir schaffen <strong>klare Strukturen</strong> und<br/>
                <strong>saubere Lösungen</strong> für dein Team.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 05: LEISTUNGEN ───────────────────────────────────────────── */}
          <Slide number="05" beamOutRight beamOutLeft>
            <StoryHeading>
              UNSERE<br/>
              <span className="text-brand-cyan">LEISTUNGEN</span>
            </StoryHeading>

            {/* Grid: 2×96+8=200px = SIZE-MD ✓ */}
            <ContentZone>
              <Grid2x2 items={[
                { label:'Webdesign',   icon:<IconDeviceDesktop style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'KI-Lösung',   icon:<IconRobot         style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'SEO/GEO',     icon:<IconSearch        style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
                { label:'IT-Support',  icon:<IconBriefcase     style={{width:32,height:32,color:'#03f9f9'}} strokeWidth={1.5}/> },
              ]}/>
            </ContentZone>

            <BodySlot>
              <StoryBody>
                Mehr <strong>Aufträge</strong>, mehr <strong>Sichtbarkeit</strong> —<br/>
                wir digitalisieren <strong>lokale Betriebe</strong><br/>
                schnell und <strong>nachhaltig</strong>.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 06: NEXT GEN MARKETING ───────────────────────────────────── */}
          <Slide number="06" beamOutRight beamOutLeft>
            <StoryHeading>
              NEXT GEN<br/>
              <span className="text-brand-cyan">MARKETING</span>
            </StoryHeading>

            {/* BlockMD: h=200px = SIZE-MD ✓ */}
            <ContentZone>
              <BlockMD badge="KAMPAGNEN" cyan>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', height:'100%'}}>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0'}}>
                    <span style={{fontFamily:"var(--font-geist-mono, monospace)", fontSize:'13px', fontWeight:700, color:'rgba(3,249,249,0.7)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px'}}>PAID</span>
                    <ul style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                      <KListItem icon={<IconBrandGoogle style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="Ads Reach"/>
                      <KListItem icon={<IconBrandMeta   style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="Recruiting"/>
                      <KListItem icon={<IconTarget       style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="GEO-Fencing"/>
                    </ul>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0'}}>
                    <span style={{fontFamily:"var(--font-geist-mono, monospace)", fontSize:'13px', fontWeight:700, color:'rgba(3,249,249,0.7)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px'}}>KREATIV</span>
                    <ul style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                      <KListItem icon={<IconPalette  style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="Branding"/>
                      <KListItem icon={<IconLayout2  style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="Assets"/>
                      <KListItem icon={<IconBrush    style={{width:28,height:28,color:'#03f9f9',flexShrink:0}} strokeWidth={1.5}/>} label="Design"/>
                    </ul>
                  </div>
                </div>
              </BlockMD>
            </ContentZone>

            <BodySlot>
              <StoryBody>
                <strong>Google Ads</strong>, <strong>Social Recruiting</strong>,<br/>
                <strong>GEO-Fencing</strong>, <strong>Branding</strong> und<br/>
                <strong>kreative Assets</strong> – <strong>alles aus einer Hand</strong>.
              </StoryBody>
            </BodySlot>
          </Slide>

          {/* ── 07: CTA ───────────────────────────────────────────────────── */}
          <Slide number="GO" mountBottom footerVariant beamOutLeft>
            <StoryHeading>
              BEREIT FÜR<br/>
              <span className="text-brand-cyan drop-shadow-[0_0_12px_rgba(3,249,249,0.5)]">MEHR ZEIT?</span>
            </StoryHeading>

            <ContentZone>
              <StoryBody>
                Lass uns zeigen, was bei dir <strong>sofort</strong><br/>
                digital mehr bringt — <strong>Web</strong>, <strong>KI</strong> und<br/>
                <strong>Marketing</strong> <strong>aus einer Hand</strong>.
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

        {/* Export Guide */}
        <div className="mt-16 max-w-lg mx-auto" style={{border:'1px solid rgba(3,249,249,0.2)', background:'rgba(3,249,249,0.05)', padding:'24px'}}>
          <p className="font-mono text-brand-cyan text-[11px] uppercase tracking-widest font-bold mb-[16px]">📸 Export → 1080×1920px</p>
          <ol style={{display:'flex', flexDirection:'column', gap:'8px'}} className="text-[12px] text-blue-100 font-mono">
            <li><span className="text-brand-cyan">1.</span> Chrome: F12 → Toggle Device Toolbar</li>
            <li><span className="text-brand-cyan">2.</span> Dimensions: <strong className="text-white">360 × 640</strong> · DPR: <strong className="text-white">3</strong></li>
            <li><span className="text-brand-cyan">3.</span> Drei-Punkte-Menü → <strong className="text-white">Screenshot aufnehmen</strong></li>
            <li><span className="text-brand-cyan">4.</span> Ergebnis: <strong className="text-white">1080 × 1920px</strong> ✓</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
