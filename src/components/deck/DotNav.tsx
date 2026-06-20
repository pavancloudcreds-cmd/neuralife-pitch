import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SlideMeta } from '../../types/deck';

interface DotNavProps {
  slides: SlideMeta[];
  activeIndex: number;
  onJump: (index: number) => void;
}

export default function DotNav({ slides, activeIndex, onJump }: DotNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        const accentColor = slide.theme === 'dark' ? '#F59E0B' : '#0B6E6E';

        return (
          <div key={slide.id} className="relative flex items-center justify-end">
            {hoveredIndex === i && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-6 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
              >
                {slide.title}
              </motion.div>
            )}
            <motion.button
              onClick={() => onJump(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={`Go to slide ${slide.id}: ${slide.title}`}
              className="w-2 h-2 rounded-full border transition-all"
              style={{
                background: isActive ? accentColor : 'transparent',
                borderColor: isActive ? accentColor : slide.theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(11,110,110,0.4)',
                opacity: isActive ? 1 : 0.6,
              }}
              animate={{ scale: isActive ? 1.4 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          </div>
        );
      })}
    </div>
  );
}
