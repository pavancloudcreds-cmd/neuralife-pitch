import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NP } from './neurapath/tokens';
import { DEMO_STUDENT } from './neurapath/demoData';
import { drilldownState } from './neurapath/drilldownState';
import CoverPage from './neurapath/pages/CoverPage';
import PromisePage from './neurapath/pages/PromisePage';
import StudentProfilePage from './neurapath/pages/StudentProfilePage';
import AboutThisReportPage from './neurapath/pages/AboutThisReportPage';
import CareerPage from './neurapath/pages/CareerPage';
import AnalysisPage from './neurapath/pages/AnalysisPage';
import ClassPage from './neurapath/pages/ClassPage';
import JourneyPage from './neurapath/pages/JourneyPage';
import NoteForArjunPage from './neurapath/pages/NoteForArjunPage';
import FeedbackEnglishPage from './neurapath/pages/FeedbackEnglishPage';
import FeedbackTeluguPage from './neurapath/pages/FeedbackTeluguPage';
import AllTheBestPage from './neurapath/pages/AllTheBestPage';
import NeuraIDCertificatePage from './neurapath/pages/NeuraIDCertificatePage';
import BackCoverPage from './neurapath/pages/BackCoverPage';

interface SceneProps { onNext: () => void; onPrev: () => void; }

const BOOK_PAGES = [
  { id: 'cover',           label: 'Cover',                        icon: '📕', sub: 'Hard cover · Gold foil' },
  { id: 'promise',         label: 'The Promise',                  icon: '✦',  sub: 'Mission statement' },
  { id: 'profile',         label: 'Student Profile',              icon: '👤', sub: 'School · Identity · Pass photo' },
  { id: 'about-report',    label: 'About This Report',            icon: '🔍', sub: 'Methodology · Data sources' },
  { id: 'career',          label: 'Career Recommendation',        icon: '🎯', sub: 'MPC · 87% fit · EAMCET' },
  { id: 'analysis',        label: '4-Year Analysis',              icon: '📊', sub: 'All subjects · All years' },
  { id: 'class7',          label: 'Class 7 — The Beginning',      icon: '🌅', sub: 'FA1/FA2/SA1/SA2 breakdown' },
  { id: 'class8',          label: 'Class 8 — Finding Direction',  icon: '🔵', sub: 'Year-on-year growth' },
  { id: 'class9',          label: 'Class 9 — The Build-Up',       icon: '🌿', sub: 'Chapter mastery · Projections' },
  { id: 'class10',         label: 'Class 10 — The Culmination',   icon: '🏆', sub: 'Final results · EAMCET ready' },
  { id: 'journey',         label: 'The Journey',                  icon: '⭐', sub: 'More than marks' },
  { id: 'note-for-arjun',  label: 'A Note for Arjun',             icon: '✉',  sub: 'For the student · Write your future' },
  { id: 'feedback-en',     label: 'Letter — English',             icon: '✉️', sub: '"We saw your child."' },
  { id: 'feedback-te',     label: 'Letter — Telugu',              icon: '✉️', sub: '"మేము మీ పిల్లవాడిని చూశాం."' },
  { id: 'allthebest',      label: 'All the Best',                 icon: '🌅', sub: 'Farewell · Horizon' },
  { id: 'neura-cert',      label: 'NeuraID Certificate',          icon: '🎓', sub: 'Official certification' },
  { id: 'backcover',       label: 'Back Cover',                   icon: '📗', sub: 'QR · neuralife.in' },
] as const;

type PageId = typeof BOOK_PAGES[number]['id'];

const PAGE_INSIGHTS: Record<PageId, { reveals: string; keyPoints: string[]; why: string; designNote: string }> = {
  cover: {
    reveals: "The first emotional moment. The parent holds this and sees their child's name in gold.",
    keyPoints: ['Student name in gold foil', 'Scholar character as gold outline', 'Dark navy linen texture'],
    why: 'No school in India has ever given a student something this premium. This is the moment parents photograph and share.',
    designNote: 'Linen texture with crosshatch pattern — same as premium notebooks (Leuchtturm, Moleskine).',
  },
  promise: {
    reveals: 'Sets the emotional frame before any data is shown.',
    keyPoints: ["'This is not a marksheet'", "NeuraLife's promise to the student", '4 years tracked — stated explicitly'],
    why: 'A parent who reads this first feels: this is different. By the time they reach the data, they are ready to trust it.',
    designNote: 'Deliberately no data on this page — just intention.',
  },
  profile: {
    reveals: 'The only page with school branding. School gets credit. NeuraLife gets the rest.',
    keyPoints: ['School name + stamp area', 'NeuraID (the school-independent identity)', 'All 4 class year pills filled'],
    why: 'School hands this at the ceremony. The stamp makes it official. But the remaining 13 pages are all NeuraLife.',
    designNote: 'School branding appears ONCE. NeuraLife appears on every other page.',
  },
  'about-report': {
    reveals: 'The trust foundation. Parents understand exactly what was tracked before reading a single number.',
    keyPoints: ['12 examinations · 48 assessment scores', 'Teacher-verified data (nothing estimated)', 'AI gap analysis + NeuraCoins explained'],
    why: 'A parent who reads this page never questions the numbers that follow. It turns scepticism into trust before the data even appears.',
    designNote: "Deliberately plain — cream background, no illustrations. Data methodology doesn't need decoration.",
  },
  career: {
    reveals: 'The single most important page for most parents. Clear, specific, trusted.',
    keyPoints: ['MPC recommended at 87% fit', 'Why this path — in plain language', 'Why other paths score lower'],
    why: "A real counsellor gives a direct recommendation. Not 'you could consider.' This page does what coaches charge ₹40,000 for.",
    designNote: 'Mint green background — fresh, forward-looking, optimistic.',
  },
  analysis: {
    reveals: 'The full 4-year academic picture in one glance.',
    keyPoints: ['All 6 subjects × 4 years in one table', 'Trajectory direction per subject', 'EAMCET/NEET/POLYCET readiness'],
    why: "Parents have never seen their child's data organized this way. This page alone justifies the booklet's existence.",
    designNote: 'Clean white background — data needs room to breathe.',
  },
  class7: {
    reveals: 'The beginning. FA1/FA2/SA1/SA2 breakdown shows within-year momentum.',
    keyPoints: ['Math: FA1 61% → SA2 74% (13-point climb)', 'Biology as area to watch', '89% attendance established early'],
    why: 'A Class 7 pattern predicts Class 10 trajectory. Parents learn to read this early signal as meaningful.',
    designNote: 'Sunrise warm gradient — the warmth and hope of a beginning.',
  },
  class8: {
    reveals: 'Direction emerges. Science subjects pull ahead of Humanities.',
    keyPoints: ['Physical Science made its biggest leap (+8%)', 'FA1→SA2 acceleration pattern confirmed', 'First science vs humanities signal'],
    why: 'Class 8 is when the stream decision first becomes visible in the data — 2 years before it matters.',
    designNote: 'Sky blue — expanding horizons, growing clarity.',
  },
  class9: {
    reveals: 'The build-up. Chapter-level mastery reveals EAMCET readiness.',
    keyPoints: ['Best chapter: Light (91% mastery)', 'Gap: Chemical Bonding (58%)', 'EAMCET projection: 78-84%'],
    why: 'Chapter-level data is what coaching centres charge for. NeuraLife provides it as part of the booklet.',
    designNote: 'Deep teal — focused, determined, the serious year.',
  },
  class10: {
    reveals: 'The culmination. All subjects at peak. EAMCET chapter coverage shown.',
    keyPoints: ['Physical Science: 87% (highest in 4 years)', '12/15 Maths EAMCET chapters covered', 'Math growth: +16% over 4 years'],
    why: 'The only dark-background page. It signals: this is the achievement moment. Different from everything before.',
    designNote: 'Navy and gold — the awards ceremony page.',
  },
  journey: {
    reveals: "The whole child. Consistency, engagement, the things marks can't show.",
    keyPoints: ['330 of 362 school days attended', '88% average homework completion', '2,847 NeuraCoins earned'],
    why: "Indian parents are assessed by their children's marks. This page shows what the marks were built on.",
    designNote: 'Warm amber — celebratory, human, the whole person.',
  },
  'note-for-arjun': {
    reveals: 'The only page addressed to Arjun, not the parents. The student reads this at the ceremony.',
    keyPoints: ['Letter to the student (not parent)', 'References his FA1→SA2 acceleration pattern', '4 ruled blank lines to write his own future'],
    why: 'The ruled lines are the most photographed element in the entire booklet. Parents share them to family groups. Every share is a NeuraLife referral.',
    designNote: 'Amber background matches the Journey page on the reverse — same sheet, continuous warmth.',
  },
  'feedback-en': {
    reveals: 'The letter that makes parents cry. Specific, personal, signed.',
    keyPoints: ['"We did not assess on marks alone"', 'Specific percentages referenced', 'Signed by The NeuraLife Team'],
    why: 'No school report has ever said this to an Indian parent. This is what they photograph and send to family groups.',
    designNote: 'Full dark navy — intimate, like a letter opened alone at night.',
  },
  'feedback-te': {
    reveals: "The same letter in Telugu. The parent's language. The child's home language.",
    keyPoints: ['"మేము మీ పిల్లవాడిని చూశాం"', 'Natural colloquial Telugu', 'Noto Sans Telugu font'],
    why: 'Telugu-speaking parents receive something in their mother tongue for the first time from an education platform.',
    designNote: 'Identical to the English letter — same weight, same respect.',
  },
  allthebest: {
    reveals: 'The farewell. The horizon. The beginning of the rest.',
    keyPoints: ['Scholar Pose 3 — looking at the sunrise', 'NeuraID printed in gold', 'All 4 years summarized in 4 lines'],
    why: 'The last page a student reads. It should feel like being sent off by someone who cared.',
    designNote: 'Navy to gold gradient — from where they came, to where they are going.',
  },
  'neura-cert': {
    reveals: 'The official certification. Principal stamps and signs this at the farewell ceremony.',
    keyPoints: ['NeuraID certified in print', 'School stamp + principal signature area', 'Scholar illustration as the NeuraLife seal'],
    why: 'Parents keep this with the Transfer Certificate. It is the most "official" element in the booklet and the one they file in their records.',
    designNote: 'This is the page the school is most proud of — it is their official endorsement inside a NeuraLife product.',
  },
  backcover: {
    reveals: 'QR code to the full interactive digital NeuraPath experience.',
    keyPoints: ['QR links to digital report', 'neuralife.in', '"Every grade remembered. Every student known."'],
    why: 'The family scans this. The digital version is shared. Word of mouth begins here.',
    designNote: 'Same navy linen as front cover — closes the book symmetrically.',
  },
};

const SPINE_W = 16;
const isEdgePage = (i: number) => i === 0 || i === BOOK_PAGES.length - 1;

const FLIP_KEYFRAMES = `
@keyframes flipNext { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(-90deg); } }
@keyframes flipNextReveal { 0% { transform: rotateY(90deg); } 100% { transform: rotateY(0deg); } }
@keyframes flipPrev { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(90deg); } }
@keyframes flipPrevReveal { 0% { transform: rotateY(-90deg); } 100% { transform: rotateY(0deg); } }
`;

// Scales its children down (never up) to fit the parent's available space,
// re-measuring on resize. `width`/`height` describe the natural size of the
// content being scaled — 420x594 for a single page, or the full spread
// (page + spine + page) when showing an open-book two-page layout.
function ScaledPage({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function calculateScale() {
      const parent = containerRef.current?.parentElement;
      if (!parent) return;
      const availH = parent.clientHeight - 32; // 16px padding each side
      const availW = parent.clientWidth - 32;
      const scaleH = availH / height;
      const scaleW = availW / width;
      setScale(Math.min(scaleH, scaleW, 1)); // never scale UP, only down
    }

    calculateScale();
    const observer = new ResizeObserver(calculateScale);
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }
    return () => observer.disconnect();
  }, [width, height]);

  return (
    <div ref={containerRef} style={{
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
      width, height,
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function renderBookPage(id: PageId): ReactNode {
  switch (id) {
    case 'cover':       return <CoverPage student={DEMO_STUDENT} />;
    case 'promise':     return <PromisePage student={DEMO_STUDENT} />;
    case 'profile':      return <StudentProfilePage student={DEMO_STUDENT} />;
    case 'about-report': return <AboutThisReportPage />;
    case 'career':       return <CareerPage student={DEMO_STUDENT} />;
    case 'analysis':     return <AnalysisPage student={DEMO_STUDENT} />;
    case 'class7':       return <ClassPage student={DEMO_STUDENT} classYear={7} />;
    case 'class8':       return <ClassPage student={DEMO_STUDENT} classYear={8} />;
    case 'class9':       return <ClassPage student={DEMO_STUDENT} classYear={9} />;
    case 'class10':      return <ClassPage student={DEMO_STUDENT} classYear={10} />;
    case 'journey':      return <JourneyPage student={DEMO_STUDENT} />;
    case 'note-for-arjun': return <NoteForArjunPage />;
    case 'feedback-en':  return <FeedbackEnglishPage student={DEMO_STUDENT} />;
    case 'feedback-te':  return <FeedbackTeluguPage student={DEMO_STUDENT} />;
    case 'allthebest':   return <AllTheBestPage student={DEMO_STUDENT} />;
    case 'neura-cert':   return <NeuraIDCertificatePage student={DEMO_STUDENT} />;
    case 'backcover':    return <BackCoverPage />;
  }
}

export default function Scene2NeuraPath(_props: SceneProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [outgoingIndex, setOutgoingIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const flippingRef = useRef(false);

  const goTo = (n: number) => {
    if (flippingRef.current) return;
    if (n < 0 || n >= BOOK_PAGES.length || n === activeIndexRef.current) return;
    flippingRef.current = true;
    setFlipDirection(n > activeIndexRef.current ? 'next' : 'prev');
    setOutgoingIndex(activeIndexRef.current);
    setIsTransitioning(true);

    // Change page at the midpoint of the animation
    setTimeout(() => {
      setActiveIndex(n);
    }, 300); // halfway through 600ms animation

    // Animation complete
    setTimeout(() => {
      setIsTransitioning(false);
      flippingRef.current = false;
    }, 600);
  };

  useEffect(() => {
    drilldownState.active = true;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeIndexRef.current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeIndexRef.current - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => {
      drilldownState.active = false;
      window.removeEventListener('keydown', handler);
    };
  }, []);

  const active = BOOK_PAGES[activeIndex];
  const insight = PAGE_INSIGHTS[active.id];
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === BOOK_PAGES.length - 1;

  // A transition touching the cover or back cover (single page, TYPE 1) uses
  // a simple scale-pulse "book opening/closing" effect instead of the
  // rotating page flip, since there's no spread to hinge open/shut.
  const edgeTransition = isTransitioning && (isEdgePage(activeIndex) || isEdgePage(outgoingIndex));

  const singlePage = (pageId: PageId) => (
    <ScaledPage width={NP.PAGE_W} height={NP.PAGE_H}>
      <div style={{
        width: NP.PAGE_W, height: NP.PAGE_H, background: 'white', borderRadius: 3, overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
      }}>
        {renderBookPage(pageId)}
      </div>
    </ScaledPage>
  );

  let stage: ReactNode;
  if (edgeTransition) {
    stage = (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5 }}
        >
          {isEdgePage(activeIndex) ? singlePage(active.id) : (
            <ScaledPage width={NP.PAGE_W * 2 + SPINE_W} height={NP.PAGE_H}>
              <div style={{ display: 'flex', width: NP.PAGE_W * 2 + SPINE_W, height: NP.PAGE_H }}>
                <div style={{ width: NP.PAGE_W, height: NP.PAGE_H, background: '#FFFEF7', boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.08)' }} />
                <div style={{
                  width: SPINE_W, height: NP.PAGE_H,
                  background: 'linear-gradient(90deg, #0A0D14, #1C2333, #2A3448, #1C2333, #0A0D14)',
                  boxShadow: '-3px 0 8px rgba(0,0,0,0.4), 3px 0 8px rgba(0,0,0,0.4)',
                }} />
                <div style={{
                  width: NP.PAGE_W, height: NP.PAGE_H, background: 'white', overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 4px 0 12px rgba(0,0,0,0.08)',
                }}>
                  {renderBookPage(active.id)}
                </div>
              </div>
            </ScaledPage>
          )}
        </motion.div>
      </AnimatePresence>
    );
  } else if (isEdgePage(activeIndex)) {
    stage = singlePage(active.id);
  } else {
    // Open-book spread: static blank left page + spine + the flipping
    // content page on the right.
    const isOutPhase = isTransitioning && activeIndex === outgoingIndex;
    const contentPageId = isOutPhase ? BOOK_PAGES[outgoingIndex].id : active.id;
    const animName = isTransitioning
      ? (isOutPhase
        ? (flipDirection === 'next' ? 'flipNext' : 'flipPrev')
        : (flipDirection === 'next' ? 'flipNextReveal' : 'flipPrevReveal'))
      : undefined;

    stage = (
      <ScaledPage width={NP.PAGE_W * 2 + SPINE_W} height={NP.PAGE_H}>
        <div style={{ display: 'flex', width: NP.PAGE_W * 2 + SPINE_W, height: NP.PAGE_H, perspective: 1800 }}>
          {/* Blank left page — never flips, just sits still */}
          <div style={{
            width: NP.PAGE_W, height: NP.PAGE_H, background: '#FFFEF7',
            boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.08)', transition: 'opacity 0.15s ease',
          }} />

          {/* Spine */}
          <div style={{
            width: SPINE_W, height: NP.PAGE_H,
            background: 'linear-gradient(90deg, #0A0D14, #1C2333, #2A3448, #1C2333, #0A0D14)',
            boxShadow: '-3px 0 8px rgba(0,0,0,0.4), 3px 0 8px rgba(0,0,0,0.4)',
          }} />

          {/* Right page — the one that flips */}
          <div style={{
            width: NP.PAGE_W, height: NP.PAGE_H, position: 'relative',
            transformStyle: 'preserve-3d',
            transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
            animation: animName ? `${animName} 0.3s ${animName.includes('Reveal') ? 'ease-out' : 'ease-in'} forwards` : undefined,
          }}>
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden', overflow: 'hidden',
              background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 4px 0 12px rgba(0,0,0,0.08)',
            }}>
              {renderBookPage(contentPageId)}
            </div>
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)', background: '#F0EBE0',
            }} />
          </div>
        </div>
      </ScaledPage>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%', background: NP.bg,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      userSelect: 'none',
    }}>
      {/* Top bar */}
      <div style={{ flex: '0 0 15%', paddingLeft: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 10, color: NP.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 8px',
        }}>
          NeuraPath
        </p>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 32, color: NP.ink, margin: '0 0 6px',
        }}>
          What we give every Class 10 student.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: NP.muted, margin: 0 }}>
          The most personalised academic report in Indian education.
        </p>
      </div>

      {/* 3-column layout */}
      <div style={{ flex: '0 0 80%', display: 'flex', minHeight: 0 }}>
        {/* Left panel — Book contents */}
        <div style={{
          width: '20%', height: '100%', background: NP.panel, borderRight: `1px solid ${NP.border}`,
          display: 'flex', flexDirection: 'column', minHeight: 0,
        }}>
          <div style={{ padding: '24px 20px 12px' }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 11, color: NP.faint,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              Book Contents
            </span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {BOOK_PAGES.map((p, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                    padding: '10px 16px', border: 'none',
                    borderLeft: `3px solid ${isActive ? NP.tealVib : 'transparent'}`,
                    background: isActive ? NP.tealBg : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F9F8F6'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 12,
                        color: isActive ? NP.ink : NP.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {p.label}
                      </div>
                      <div style={{
                        fontFamily: "'Poppins', sans-serif", fontSize: 10, color: NP.faint,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {p.sub}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
            <span style={{
              background: NP.tealBg, border: `1px solid rgba(13,148,136,0.3)`,
              fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: NP.tealVib,
              padding: '6px 12px', borderRadius: 12,
            }}>
              PREMIUM EDITION
            </span>
          </div>
        </div>

        {/* Center panel — Page render */}
        <div style={{ width: '60%', background: '#F4F3EF', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{
            background: 'white', borderBottom: `1px solid ${NP.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', flexShrink: 0,
          }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: NP.muted }}>
              Page {activeIndex + 1} of {BOOK_PAGES.length} — {active.label}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => goTo(activeIndex - 1)}
                disabled={atStart}
                style={{
                  width: 32, height: 32, borderRadius: '50%', background: 'white', border: `1px solid ${NP.border}`,
                  fontSize: 18, color: NP.ink, cursor: atStart ? 'default' : 'pointer', opacity: atStart ? 0.3 : 1,
                }}
              >‹</button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                disabled={atEnd}
                style={{
                  width: 32, height: 32, borderRadius: '50%', background: 'white', border: `1px solid ${NP.border}`,
                  fontSize: 18, color: NP.ink, cursor: atEnd ? 'default' : 'pointer', opacity: atEnd ? 0.3 : 1,
                }}
              >›</button>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
            <style>{FLIP_KEYFRAMES}</style>
            {stage}
          </div>

          <div style={{
            background: 'white', borderTop: `1px solid ${NP.border}`,
            display: 'flex', justifyContent: 'center', gap: 6, padding: '12px 0', flexShrink: 0,
          }}>
            {BOOK_PAGES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                title={p.label}
                style={{
                  width: i === activeIndex ? 24 : 8, height: 8, padding: 0, border: 'none', cursor: 'pointer',
                  borderRadius: i === activeIndex ? 4 : '50%',
                  background: i === activeIndex ? NP.tealVib : NP.border,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right panel — Page insights */}
        <div style={{
          width: '20%', height: '100%', background: NP.panel, borderLeft: `1px solid ${NP.border}`,
          display: 'flex', flexDirection: 'column', minHeight: 0,
        }}>
          <div style={{ padding: '24px 20px 12px', flexShrink: 0 }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 11, color: NP.faint,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              Page Insights
            </span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ margin: '8px 12px' }}
              >
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: 9, color: NP.tealVib,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  What This Page Reveals
                </div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: NP.ink, lineHeight: 1.6, margin: '6px 0 0' }}>
                  {insight.reveals}
                </p>

                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: 9, color: NP.faint,
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 16, marginBottom: 4,
                }}>
                  Key Data on This Page
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {insight.keyPoints.map(kp => (
                    <li key={kp} style={{
                      fontFamily: "'Poppins', sans-serif", fontSize: 11, color: NP.ink, lineHeight: 1.8,
                    }}>
                      • {kp}
                    </li>
                  ))}
                </ul>

                <div style={{
                  background: '#F9F8F6', borderLeft: `3px solid ${NP.tealVib}`, borderRadius: 4,
                  padding: '10px 12px', marginTop: 12,
                }}>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.teal,
                    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4,
                  }}>
                    Why This Matters
                  </div>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                    {insight.why}
                  </p>
                </div>

                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontStyle: 'italic', fontSize: 9, color: NP.faint, marginTop: 8,
                }}>
                  ✦ {insight.designNote}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ borderTop: `1px solid ${NP.border}`, flexShrink: 0 }}>
            <a
              href={`${import.meta.env.BASE_URL}downloads/NeuraPath-Sample.pdf`}
              download="NeuraPath-Sample.pdf"
              style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                margin: '12px 16px', padding: '10px 0', borderRadius: 8,
                background: `linear-gradient(135deg, ${NP.tealVib}, ${NP.teal})`, color: 'white',
                fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 12,
              }}
            >
              ⬇ Download PDF
            </a>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingBottom: 12, flexWrap: 'wrap' }}>
              {['Print for farewell ceremony', 'A5 · 17 pages'].map(t => (
                <span key={t} style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: NP.faint }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ flex: '0 0 5%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        {[
          '💎 Premium hardcover — A5, gold foil, linen texture',
          '📚 17 pages — Given at farewell ceremony',
        ].map(t => (
          <span key={t} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, color: NP.faint,
            background: 'rgba(0,0,0,0.03)', border: `1px solid ${NP.border}`,
            borderRadius: 20, padding: '5px 14px',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
