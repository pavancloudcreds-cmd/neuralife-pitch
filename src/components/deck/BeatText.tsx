import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface BeatTextProps {
  isActive: boolean;
  isPast: boolean;
  isFuture: boolean;
  children: ReactNode;
  className?: string;
}

export default function BeatText({ isActive, isPast, isFuture, children, className = '' }: BeatTextProps) {
  if (isFuture) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={isActive ? { opacity: 0, y: 16 } : false}
        animate={
          isActive
            ? { opacity: 1, y: 0, scale: 1 }
            : isPast
            ? { opacity: 0.4, scale: 0.92 }
            : {}
        }
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
