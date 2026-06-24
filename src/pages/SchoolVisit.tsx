import { useCallback, useEffect, useRef, useState } from 'react';
import SVHeader from './school-visit/components/SVHeader';
import Section01_Opening from './school-visit/sections/Section01_Opening';
import Section02_WhoWeAre from './school-visit/sections/Section02_WhoWeAre';
import Section03_Problem from './school-visit/sections/Section03_Problem';
import Section04_WhatWeBuilding from './school-visit/sections/Section04_WhatWeBuilding';
import Section05_Progress from './school-visit/sections/Section05_Progress';
import Section06_ForYourSchool from './school-visit/sections/Section06_ForYourSchool';
import Section07_Feedback from './school-visit/sections/Section07_Feedback';
import Section08_ConsentForm from './school-visit/sections/Section08_ConsentForm';
import { SV } from './school-visit/tokens';

const SECTION_LABELS = [
  'Opening', 'Who We Are', 'The Problem', 'What We Built',
  'Progress', 'For Your School', 'Questions', 'Stay Connected',
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
          position: 'absolute',
          right: 22,
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          padding: '4px 8px',
          borderRadius: 6,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          {label}
        </div>
      )}
      <div style={{
        width: active ? 12 : 8,
        height: active ? 12 : 8,
        borderRadius: '50%',
        background: active ? SV.teal : 'transparent',
        border: active ? `2px solid ${SV.teal}` : `2px solid ${SV.textMuted}`,
        opacity: active ? 1 : 0.4,
        transition: 'all 0.2s',
      }} />
    </div>
  );
}

export default function SchoolVisit() {
  const openingRef = useRef<HTMLElement>(null);
  // Single mutable ref holds all 8 section DOM nodes
  const sectionNodes = useRef<(HTMLElement | null)[]>(Array(8).fill(null));
  const [activeSection, setActiveSection] = useState(0);

  // Allow body scroll for this page, restore on unmount
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // IntersectionObserver to track active section
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
      { threshold: 0.35 }
    );
    nodes.forEach(n => { if (n) obs.observe(n); });
    return () => obs.disconnect();
  }, []);

  const setRef = useCallback((i: number) => (el: HTMLElement | null) => {
    sectionNodes.current[i] = el;
    if (i === 0 && el) {
      // also sync the openingRef for SVHeader's IntersectionObserver
      (openingRef as React.MutableRefObject<HTMLElement | null>).current = el;
    }
  }, []);

  const scrollTo = (i: number) => {
    sectionNodes.current[i]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: SV.pageBg, position: 'relative' }}>
      <SVHeader openingSectionRef={openingRef} />

      <Section01_Opening ref={setRef(0)} />
      <div ref={setRef(1)}><Section02_WhoWeAre /></div>
      <div ref={setRef(2)}><Section03_Problem /></div>
      <div ref={setRef(3)}><Section04_WhatWeBuilding /></div>
      <div ref={setRef(4)}><Section05_Progress /></div>
      <div ref={setRef(5)}><Section06_ForYourSchool /></div>
      <div ref={setRef(6)}><Section07_Feedback /></div>
      <div ref={setRef(7)}><Section08_ConsentForm /></div>

      {/* Fixed right-side nav dots — hidden on mobile */}
      <div
        className="hidden-mobile-nav"
        style={{
          position: 'fixed',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 200,
        }}
      >
        {SECTION_LABELS.map((label, i) => (
          <NavDot key={label} label={label} active={activeSection === i} onClick={() => scrollTo(i)} />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) { .hidden-mobile-nav { display: none !important; } }
      `}</style>
    </div>
  );
}
