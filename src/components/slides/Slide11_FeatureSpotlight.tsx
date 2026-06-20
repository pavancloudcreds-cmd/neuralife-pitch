import { motion, AnimatePresence } from 'framer-motion';

interface Props { beatIndex: number; }

export default function Slide11_FeatureSpotlight({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      {/* Beat 0: Screenshot */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Placeholder — replace with real screenshot */}
        <div className="bg-gradient-to-br from-teal/10 to-teal/5 aspect-[9/16] flex flex-col items-center justify-center gap-4 p-8">
          <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0B6E6E" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="9" y1="7" x2="15" y2="7" />
              <line x1="9" y1="11" x2="15" y2="11" />
              <line x1="9" y1="15" x2="12" y2="15" />
            </svg>
          </div>
          <p className="font-inter text-teal/60 text-sm text-center">
            Parent Study Guide Screenshot
            <br />
            <span className="text-xs opacity-60">(replace /public/assets/study-guide-screenshot.png before deploying)</span>
          </p>
        </div>
      </motion.div>

      {/* Beat 1: Caption */}
      <AnimatePresence>
        {beatIndex >= 1 && (
          <motion.p
            key="caption"
            className="font-poppins font-medium text-2xl text-center max-w-2xl text-gray-800 leading-snug"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            A parent who never finished school can now understand tonight's lesson
            in 30 seconds — and help their child with confidence.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
