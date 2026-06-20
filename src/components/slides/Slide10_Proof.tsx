import { motion, AnimatePresence } from 'framer-motion';
import StatCard from '../shared/StatCard';

interface Props { beatIndex: number; }

export default function Slide10_Proof({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      <div className="text-center">
        <p className="font-poppins font-semibold text-sm text-teal uppercase tracking-widest mb-2">
          Proof — What's Already Built
        </p>
        <p className="font-inter text-gray-500">This isn't a concept. Here's what's running today.</p>
      </div>

      <div className="flex gap-8 flex-wrap justify-center">
        <AnimatePresence>
          {beatIndex >= 1 && (
            <motion.div key="stat1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <StatCard value="74" label="table production schema" />
            </motion.div>
          )}
          {beatIndex >= 2 && (
            <motion.div key="stat2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <StatCard
                value="3"
                label="working applications"
                sublabels={['Web Admin Console', 'Teacher App', 'Family App']}
              />
            </motion.div>
          )}
          {beatIndex >= 3 && (
            <motion.div key="stat3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {/* TODO: replace with real HWR-1 CER figure before presenting */}
              <StatCard
                value="~72"
                label="AI handwriting model CER — early, real, improving"
                isProgress
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
