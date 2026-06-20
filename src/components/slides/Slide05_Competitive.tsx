import { motion, AnimatePresence } from 'framer-motion';
import CompetitiveMatrix from '../shared/CompetitiveMatrix';

interface Props { beatIndex: number; }

export default function Slide05_Competitive({ beatIndex }: Props) {
  const highlightCol = beatIndex === 2 ? 0 : beatIndex === 3 ? 1 : null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-6">
      {/* Beat 0 */}
      <div className="text-center">
        <p className="font-poppins font-semibold text-sm text-teal uppercase tracking-widest mb-3">
          The Competitive Landscape
        </p>
        <h2 className="font-poppins font-bold text-4xl text-gray-800 max-w-2xl leading-tight">
          Two industries solved two different problems.
          Nobody solved this one.
        </h2>
      </div>

      {/* Beat 1+: Matrix */}
      <AnimatePresence>
        {beatIndex >= 1 && (
          <motion.div
            key="matrix"
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CompetitiveMatrix highlightCol={highlightCol} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beat 2 caption */}
      <AnimatePresence>
        {beatIndex === 2 && (
          <motion.p
            key="cap2"
            className="font-inter text-base text-gray-500 text-center max-w-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Digitize the office. Zero insight into whether a child understands anything.
          </motion.p>
        )}
        {beatIndex === 3 && (
          <motion.p
            key="cap3"
            className="font-inter text-base text-gray-500 text-center max-w-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Sell content. Disconnected from the school and curriculum. Mostly English-medium, urban, CBSE/ICSE.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
