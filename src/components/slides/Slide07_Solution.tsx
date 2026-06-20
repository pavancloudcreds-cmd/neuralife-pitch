import { motion, AnimatePresence } from 'framer-motion';
import ArchitectureDiagram from '../shared/ArchitectureDiagram';

interface Props { beatIndex: number; }

export default function Slide07_Solution({ beatIndex }: Props) {
  // beat 0 = manifesto, beats 1-6 = nodes 1-6
  const nodeCount = Math.max(0, beatIndex);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-6">
      <AnimatePresence>
        {beatIndex === 0 && (
          <motion.div
            key="manifesto"
            className="text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-poppins font-bold text-3xl text-gray-800 mb-3">
              Not another app. A different signal entirely.
            </h2>
            <p className="font-inter text-lg text-gray-600">
              NeuraLife doesn't just digitize the school — it reads what a child actually
              understands, directly from how they write and think, and puts that
              understanding in front of everyone who needs it.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {beatIndex >= 1 && (
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-poppins font-semibold text-sm text-teal uppercase tracking-widest text-center mb-6">
            System Architecture
          </p>
          <ArchitectureDiagram visibleCount={nodeCount} />
        </motion.div>
      )}
    </div>
  );
}
