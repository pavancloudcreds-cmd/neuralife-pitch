import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, PenTool } from 'lucide-react';
import PersonaCard from '../shared/PersonaCard';

interface Props { beatIndex: number; }

const personas = [
  { title: 'Parent',   icon: Users,          quote: "A parent can see the marks. They can't see the gap behind the marks." },
  { title: 'Student',  icon: GraduationCap,  quote: "A student doesn't know what they don't understand — until the exam tells them, too late." },
  { title: 'Teacher',  icon: PenTool,        quote: "A teacher corrects forty notebooks a night and remembers none of it by morning. The insight dies with the red pen." },
];

export default function Slide03_PersonaClassroom({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      {/* Beat 0: Header */}
      <motion.p
        className="font-poppins font-semibold text-lg text-teal uppercase tracking-widest self-start"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        The Problem — Classroom &amp; Family
      </motion.p>

      {/* Persona cards */}
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
