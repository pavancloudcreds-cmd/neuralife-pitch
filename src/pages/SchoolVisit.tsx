import { useCallback, useEffect, useRef, useState } from 'react';
import SVHeader from './school-visit/components/SVHeader';
import Section01_Intro      from './school-visit/sections/Section01_Intro';
import Section02_Principal  from './school-visit/sections/Section02_Principal';
import Section03_Teacher    from './school-visit/sections/Section03_Teacher';
import Section04_Accountant from './school-visit/sections/Section04_Accountant';
import Section05_Demo       from './school-visit/sections/Section05_Demo';
import Section06_YourSchool from './school-visit/sections/Section06_YourSchool';
import Section07_Consent    from './school-visit/sections/Section07_Consent';
import { SV } from './school-visit/tokens';

const SECTION_LABELS = [
  'Introduction',
  'Principal Questions',
  'Teacher Questions',
  'Accountant Questions',
  'Targeted Demo',
  'Your School',
  'Stay Connected',
];

function NavDot({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {hovered && (
        <div style={{
          position: 'absolute', right: 22,
          background: 'rgba(0,0,0,0.72)', color: '#fff',
          fontFamily: 'Inter, sans-serif', fontSize: 12,
          padding: '4px 10px', borderRadius: 6,
          whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          {label}
        </div>
      )}
      <div style={{
        width: active ? 12 : 8, height: active ? 12 : 8,
        borderRadius: '50%',
        background: active ? SV.teal : 'transparent',
        border: active ? `2px solid ${SV.teal}` : `2px solid ${SV.textMuted}`,
        opacity: active ? 1 : 0.4,
        transition: 'all 0.2s',
      }} />
    </div>
  );
}

const TOTAL = 7;

export default function SchoolVisit() {
  const openingRef = useRef<HTMLElement>(null);
  const sectionNodes = useRef<(HTMLElement | null)[]>(Array(TOTAL).fill(null));
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const nodes = sectionNodes.current;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = nodes.findIndex(n => n === entry.target);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    nodes.forEach(n => { if (n) obs.observe(n); });
    return () => obs.disconnect();
  }, []);

  const setRef = useCallback((i: number) => (el: HTMLElement | null) => {
    sectionNodes.current[i] = el;
    if (i === 0 && el) {
      (openingRef as React.MutableRefObject<HTMLElement | null>).current = el;
    }
  }, []);

  const scrollTo = (i: number) => {
    sectionNodes.current[i]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: SV.pageBg, position: 'relative' }}>
      <SVHeader openingSectionRef={openingRef} />

      <Section01_Intro      ref={setRef(0)} />
      <div ref={setRef(1)}><Section02_Principal /></div>
      <div ref={setRef(2)}><Section03_Teacher /></div>
      <div ref={setRef(3)}><Section04_Accountant /></div>
      <div ref={setRef(4)}><Section05_Demo /></div>
      <div ref={setRef(5)}><Section06_YourSchool /></div>
      <div ref={setRef(6)}><Section07_Consent /></div>

      {/* Fixed right-side nav dots — hidden on mobile */}
      <div className="sv-nav-dots" style={{
        position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 10, zIndex: 200,
      }}>
        {SECTION_LABELS.map((label, i) => (
          <NavDot key={label} label={label} active={activeSection === i} onClick={() => scrollTo(i)} />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) { .sv-nav-dots { display: none !important; } }
      `}</style>
    </div>
  );
}
