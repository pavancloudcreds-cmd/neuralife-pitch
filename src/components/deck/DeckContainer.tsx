import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeckState } from '../../hooks/useDeckState';
import { SLIDES } from '../../types/deck';
import ProgressBar from './ProgressBar';
import DotNav from './DotNav';
import SlideOverview from './SlideOverview';
import MobileView from './MobileView';

import Slide01_ColdOpen from '../slides/Slide01_ColdOpen';
import Slide02_SystemicProblem from '../slides/Slide02_SystemicProblem';
import Slide03_PersonaClassroom from '../slides/Slide03_PersonaClassroom';
import Slide04_PersonaAdmin from '../slides/Slide04_PersonaAdmin';
import Slide05_Competitive from '../slides/Slide05_Competitive';
import Slide06_WhyNow from '../slides/Slide06_WhyNow';
import Slide07_Solution from '../slides/Slide07_Solution';
import Slide08_PersonaOutcomes from '../slides/Slide08_PersonaOutcomes';
import Slide09_Moats from '../slides/Slide09_Moats';
import Slide10_Proof from '../slides/Slide10_Proof';
import Slide11_FeatureSpotlight from '../slides/Slide11_FeatureSpotlight';
import Slide12_Roadmap from '../slides/Slide12_Roadmap';
import Slide13_Timeline from '../slides/Slide13_Timeline';
import Slide14_Validation from '../slides/Slide14_Validation';
import Slide15_AskClose from '../slides/Slide15_AskClose';

const slideComponents = [
  Slide01_ColdOpen, Slide02_SystemicProblem, Slide03_PersonaClassroom,
  Slide04_PersonaAdmin, Slide05_Competitive, Slide06_WhyNow,
  Slide07_Solution, Slide08_PersonaOutcomes, Slide09_Moats,
  Slide10_Proof, Slide11_FeatureSpotlight, Slide12_Roadmap,
  Slide13_Timeline, Slide14_Validation, Slide15_AskClose,
];

const bgLight = '#F5F3EE';
const bgDark  = '#0A0E1A';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

export default function DeckContainer() {
  const { slideIndex, beatIndex, currentSlide, overviewOpen, setOverviewOpen, next, prev, jumpTo, progress } = useDeckState();
  const isDesktop = useIsDesktop();

  // Mobile: vertical scroll, all beats revealed
  if (!isDesktop) {
    return (
      <div className="w-screen h-screen overflow-y-auto overflow-x-hidden" style={{ background: bgLight }}>
        <MobileView />
      </div>
    );
  }

  const SlideComponent = slideComponents[slideIndex];
  const bg = currentSlide.theme === 'dark' ? bgDark : bgLight;

  return (
    <motion.div
      className="w-screen h-screen overflow-hidden relative"
      animate={{ backgroundColor: bg }}
      transition={{ duration: 0.5 }}
      onClick={next}
    >
      <ProgressBar progress={progress} theme={currentSlide.theme} />
      <DotNav slides={SLIDES} activeIndex={slideIndex} onJump={jumpTo} />

      <AnimatePresence mode="wait">
        <motion.div
          key={slideIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <SlideComponent beatIndex={beatIndex} />
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows for mouse users */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full flex items-center justify-center text-2xl opacity-0 hover:opacity-40 transition-opacity ${
          currentSlide.theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-gray-700'
        }`}
      >
        ‹
      </button>
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        aria-label="Next"
        className={`fixed right-14 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full flex items-center justify-center text-2xl opacity-0 hover:opacity-40 transition-opacity ${
          currentSlide.theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-gray-700'
        }`}
      >
        ›
      </button>

      <AnimatePresence>
        {overviewOpen && (
          <SlideOverview
            slides={SLIDES}
            activeIndex={slideIndex}
            onJump={jumpTo}
            onClose={() => setOverviewOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
