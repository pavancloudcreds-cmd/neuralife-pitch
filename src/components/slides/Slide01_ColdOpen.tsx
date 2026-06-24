import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from '../shared/Particles';

interface Props { beatIndex: number; }

const wordmark = 'NeuraLife'.split('');

export default function Slide01_ColdOpen({ beatIndex }: Props) {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (beatIndex >= 2) {
      const t = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(t);
    } else {
      setShowPrompt(false);
    }
  }, [beatIndex]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <Particles />

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Beat 0: Wordmark */}
        <div className="flex mb-6">
          {wordmark.map((letter, i) => (
            <motion.span
              key={i}
              className="font-poppins font-extrabold text-7xl text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Beat 1: Tagline */}
        <AnimatePresence>
          {beatIndex >= 1 && (
            <motion.p
              key="tagline"
              className="font-inter text-2xl text-white/80 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              The AI-native Operating System for Indian Schools —{' '}
              starting with Andhra Pradesh &amp; Telangana.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Beat 2: Subtext */}
        <AnimatePresence>
          {beatIndex >= 2 && (
            <motion.p
              key="subtext"
              className="font-inter text-base text-white/50 mt-6 max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Built from real classroom data. Validated with real teachers,
              parents, and students.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Press Enter prompt */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            key="prompt"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 font-inter text-sm text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Press Enter →
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
