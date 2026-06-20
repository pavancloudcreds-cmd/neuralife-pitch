import { motion, AnimatePresence } from 'framer-motion';

interface Props { beatIndex: number; }

const items = [
  { label: 'Multi-Campus Chairman Dashboard',   quarter: 'Q3 2026' },
  { label: 'Teacher SmartPad',                  quarter: 'Q4 2026' },
  { label: 'Welfare Scheme Compliance Engine',  quarter: 'Q3 2026' },
  { label: 'Tally Integration',                 quarter: 'Q3 2026' },
];

export default function Slide12_Roadmap({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      <motion.p
        className="font-poppins font-semibold text-lg text-teal uppercase tracking-widest"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Roadmap — What's Next
      </motion.p>

      <div className="flex flex-col gap-3 w-full max-w-xl">
        {items.map((item, i) => {
          if (beatIndex <= i) return null;
          const isActive = beatIndex === i + 1;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isActive ? 1 : 0.6, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex items-center justify-between gap-4 rounded-xl px-5 py-4 border transition-all ${
                isActive ? 'border-gold/40 bg-gold/5 shadow-sm' : 'border-gray-100 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-gold' : 'bg-gray-300'}`} />
                <span className="font-inter text-gray-800">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-poppins font-semibold text-amber-600 border border-amber-300 rounded-full px-2 py-0.5 bg-amber-50">
                  ROADMAP
                </span>
                <span className="text-xs font-inter text-gray-400">{item.quarter}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {beatIndex >= 5 && (
          <motion.p
            key="close"
            className="font-poppins font-semibold text-2xl text-teal text-center max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AP &amp; Telangana SCERT first. CBSE next.
            Every Indian curriculum, eventually.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
