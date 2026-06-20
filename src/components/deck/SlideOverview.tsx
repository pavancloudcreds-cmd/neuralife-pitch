import { motion } from 'framer-motion';
import type { SlideMeta } from '../../types/deck';

interface SlideOverviewProps {
  slides: SlideMeta[];
  activeIndex: number;
  onJump: (index: number) => void;
  onClose: () => void;
}

export default function SlideOverview({ slides, activeIndex, onJump, onClose }: SlideOverviewProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative z-10 grid grid-cols-5 gap-3 p-6 max-w-5xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {slides.map((slide, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={slide.id}
              onClick={() => onJump(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-lg p-3 text-left transition-all ${
                slide.theme === 'dark'
                  ? 'bg-white/10 text-white'
                  : 'bg-white/90 text-gray-800'
              } ${
                isActive
                  ? 'ring-2 ring-offset-2 ring-offset-transparent ' + (slide.theme === 'dark' ? 'ring-gold' : 'ring-teal')
                  : 'ring-1 ring-white/10'
              }`}
            >
              <div className="text-xs opacity-50 mb-1 font-inter">{String(slide.id).padStart(2, '0')}</div>
              <div className="text-xs font-poppins font-semibold leading-tight">{slide.title}</div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
