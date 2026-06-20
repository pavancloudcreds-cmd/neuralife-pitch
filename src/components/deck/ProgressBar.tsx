import { motion } from 'framer-motion';
import type { SlideTheme } from '../../types/deck';

interface ProgressBarProps {
  progress: number;
  theme: SlideTheme;
}

export default function ProgressBar({ progress, theme }: ProgressBarProps) {
  const trackColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(11,110,110,0.1)';
  const fillColor = theme === 'dark' ? '#F59E0B' : '#0B6E6E';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]" style={{ background: trackColor }}>
      <motion.div
        className="h-full"
        style={{ background: fillColor }}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      />
    </div>
  );
}
