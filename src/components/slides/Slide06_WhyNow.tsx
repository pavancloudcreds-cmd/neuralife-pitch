import { motion } from 'framer-motion';

interface Props { beatIndex: number; }

const reasons = [
  "AI can finally read a child's handwriting accurately enough to act on it.",
  "The Andhra Pradesh government is actively building the infrastructure for exactly this — RTIH, the APAAR mandate, the statewide digital education push.",
  "Nobody has built the regional-language, SCERT-first version of this. The window is open right now — because the technology and the government push only became real at the same time.",
];

export default function Slide06_WhyNow({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      <motion.p
        className="font-poppins font-semibold text-lg text-teal uppercase tracking-widest self-start"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Why Now
      </motion.p>

      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {reasons.map((reason, i) => {
          if (beatIndex <= i) return null;
          const isActive = beatIndex === i + 1;
          const isPast = beatIndex > i + 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: isPast ? 0.5 : 1, x: 0, scale: isPast ? 0.97 : 1 }}
              transition={{ duration: 0.4 }}
              className={`flex gap-4 rounded-xl p-5 border transition-all ${
                isActive
                  ? 'border-teal bg-teal/5 shadow-md'
                  : 'border-gray-100 bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-poppins font-bold text-sm ${
                isActive ? 'bg-teal text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </div>
              <p className={`font-inter leading-relaxed ${isActive ? 'text-gray-800 text-lg' : 'text-gray-500 text-base'}`}>
                {reason}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
