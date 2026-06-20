import { motion } from 'framer-motion';
import { Users, GraduationCap, PenTool, Building2, UserCog, Calculator } from 'lucide-react';

interface Props { beatIndex: number; }

const outcomes = [
  { title: 'Parent',     icon: Users,          text: "Sees not just the score, but the exact concept their child needs help with tonight — and how to actually help." },
  { title: 'Student',    icon: GraduationCap,  text: "Sees the gap the moment it appears, not the day of the exam — and earns real recognition for understanding, not just marks." },
  { title: 'Teacher',    icon: PenTool,        text: "Sees the whole class's real understanding at a glance, not a stack of corrected notebooks." },
  { title: 'Chairman',   icon: Building2,      text: "Sees every campus, on one screen, in real time." },
  { title: 'Principal',  icon: UserCog,        text: "Opens the day already knowing what yesterday actually looked like." },
  { title: 'Accountant', icon: Calculator,     text: "One click. The books match Tally. Nobody re-types anything." },
];

export default function Slide08_PersonaOutcomes({ beatIndex }: Props) {
  const shown = outcomes.slice(0, beatIndex);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-6">
      <motion.p
        className="font-poppins font-semibold text-lg text-teal uppercase tracking-widest"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        The Solution — What Changes for Everyone
      </motion.p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
        {shown.map((o, i) => {
          const isLatest = i === shown.length - 1;
          return (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`bg-white rounded-xl border p-4 flex gap-3 items-start transition-all ${
                isLatest ? 'border-teal shadow-md ring-1 ring-teal/30' : 'border-gray-100 shadow-sm'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <o.icon size={16} className="text-teal" />
              </div>
              <div>
                <div className="font-poppins font-semibold text-sm text-gray-700 mb-1">{o.title}</div>
                <p className="font-inter text-sm text-gray-600 leading-relaxed">{o.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
