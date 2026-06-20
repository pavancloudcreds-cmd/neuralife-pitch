import { motion } from 'framer-motion';
import TimelineTrack from '../shared/TimelineTrack';

interface Props { beatIndex: number; }

const allMarkers = [
  { date: 'Jan 2025',  label: 'First commit',           type: 'past'    as const, position: 5  },
  { date: 'Mar 2025',  label: 'Schema complete (74T)',   type: 'past'    as const, position: 18 },
  { date: 'May 2025',  label: 'Web Admin Console',       type: 'past'    as const, position: 30 },
  { date: 'Aug 2025',  label: 'Teacher App',             type: 'past'    as const, position: 43 },
  { date: 'Dec 2025',  label: 'Family App',              type: 'past'    as const, position: 56 },
  { date: 'Jun 2026',  label: 'Present — SPARK Week',   type: 'present' as const, position: 65 },
  { date: 'Sep 2026',  label: 'Pilot Deployment ✦',     type: 'future'  as const, position: 78 },
  { date: 'Mar 2027',  label: 'Scale Target ✦',         type: 'future'  as const, position: 92 },
];

const typeMap: Record<number, Array<'past' | 'present' | 'future'>> = {
  0: [],
  1: ['past'],
  2: ['past', 'present'],
  3: ['past', 'present', 'future'],
};

export default function Slide13_Timeline({ beatIndex }: Props) {
  const visibleTypes = typeMap[Math.min(beatIndex, 3)];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      <div className="text-center">
        <motion.p
          className="font-poppins font-semibold text-lg text-teal uppercase tracking-widest mb-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Timeline — Build to Market
        </motion.p>
        {beatIndex >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-inter text-gray-400"
          >
            ✦ Projected
          </motion.p>
        )}
      </div>

      <div className="w-full max-w-4xl">
        <TimelineTrack markers={allMarkers} visibleTypes={visibleTypes} />
      </div>
    </div>
  );
}
