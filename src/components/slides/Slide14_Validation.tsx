import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props { beatIndex: number; }

const confirmed = ['Parents', 'Students', 'Teachers (partial)'];

export default function Slide14_Validation({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-10">
      {/* Beat 0 */}
      <motion.h2
        className="font-poppins font-bold text-3xl text-gray-800 text-center max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        We didn't wait to be sure. We went and asked.
      </motion.h2>

      {/* Beat 1: confirmed list */}
      <AnimatePresence>
        {beatIndex >= 1 && (
          <motion.div
            key="confirmed"
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {confirmed.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-green-600" />
                </div>
                <span className="font-inter text-lg text-gray-700">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beat 2: in-progress + placeholder */}
      <AnimatePresence>
        {beatIndex >= 2 && (
          <motion.div
            key="inprogress"
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-inter text-gray-500">Principals, Accountants — in progress</span>
              <span className="text-xs font-inter bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">
                Updated live during SPARK week
              </span>
            </div>

            {/* Quote placeholder */}
            <div className="border-2 border-dashed border-teal/30 rounded-xl p-5 bg-teal/2">
              <p className="font-inter text-teal/40 text-sm italic text-center">
                {/* TODO: insert real Day 3 interview quote here */}
                Day 3 finding — quote to be added after interview
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
