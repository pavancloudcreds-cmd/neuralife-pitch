import { motion, AnimatePresence } from 'framer-motion';
import { Building2, UserCog, Calculator } from 'lucide-react';
import PersonaCard from '../shared/PersonaCard';

interface Props { beatIndex: number; }

const personas = [
  { title: 'Chairman',   icon: Building2,  quote: "Owns five schools. Has never seen all five on one screen." },
  { title: 'Principal',  icon: UserCog,    quote: "Spends every morning finding out yesterday's numbers, instead of acting on today's." },
  { title: 'Accountant', icon: Calculator, quote: "Re-types every receipt into Tally by hand, every single evening." },
];

export default function Slide04_PersonaAdmin({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      <motion.p
        className="font-poppins font-semibold text-lg text-teal uppercase tracking-widest self-start"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        The Problem — School Administration
      </motion.p>

      <AnimatePresence>
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          {personas.map((p, i) => {
            const shown = beatIndex > i;
            if (!shown) return null;
            const isActive = beatIndex === i + 1;
            const isPast = beatIndex > i + 1;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PersonaCard
                  title={p.title}
                  icon={p.icon}
                  quote={p.quote}
                  isActive={isActive}
                  isPast={isPast}
                />
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
}
