import { motion, AnimatePresence } from 'framer-motion';

interface Props { beatIndex: number; }

const beats = [
  {
    active: "India digitized school administration. It never digitized a child's understanding.",
    activeClass: 'font-poppins font-bold text-5xl text-white text-center max-w-3xl',
  },
  {
    active: "Attendance, apps. Fees, apps. Messages, apps. The one thing that actually decides a child's future — whether they understand the concept, not just whether they scored marks — stays invisible. To the teacher. To the parent. To the school.",
    activeClass: 'font-inter text-xl text-white/80 text-center max-w-3xl',
  },
  {
    active: "That blind spot doesn't show up on any dashboard. It shows up years later, when a child can't keep up — and nobody can say exactly where it started.",
    activeClass: 'font-poppins font-semibold text-3xl text-gold text-center max-w-3xl',
  },
];

export default function Slide02_SystemicProblem({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      {/* Past beats */}
      <div className="flex flex-col items-center gap-4 w-full">
        {beats.slice(0, beatIndex).map((b, i) => (
          <motion.p
            key={i}
            className="font-inter text-xl text-white/40 text-center max-w-2xl"
            animate={{ opacity: 0.4, scale: 0.9 }}
            transition={{ duration: 0.35 }}
          >
            {b.active}
          </motion.p>
        ))}
      </div>

      {/* Active beat */}
      <AnimatePresence mode="wait">
        <motion.p
          key={beatIndex}
          className={beats[beatIndex]?.activeClass || ''}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45 }}
        >
          {beats[beatIndex]?.active}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
