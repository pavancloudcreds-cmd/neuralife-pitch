import { motion, AnimatePresence } from 'framer-motion';

interface Props { beatIndex: number; }

const asks = [
  'Ongoing access to government and private schools for real pilot validation',
  'A path into RTIH Catalyst Incubation or the AI Build Grant',
  'Mentorship from the AP/TS education ecosystem',
];

export default function Slide15_AskClose({ beatIndex }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      {/* Beat 0 */}
      <motion.h2
        className="font-poppins font-bold text-4xl text-white text-center max-w-2xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        We're not asking you to believe in an idea. We're asking you to help us prove it faster.
      </motion.h2>

      {/* Beats 1-3: ask cards */}
      <div className="flex flex-col gap-4 w-full max-w-xl">
        {asks.map((ask, i) => {
          if (beatIndex <= i) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 font-poppins font-bold text-gold text-sm">
                {i + 1}
              </div>
              <p className="font-inter text-white/90">{ask}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Beat 4: wordmark + contact */}
      <AnimatePresence>
        {beatIndex >= 4 && (
          <motion.div
            key="close"
            className="flex flex-col items-center gap-4 mt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-poppins font-extrabold text-3xl text-white tracking-tight">
              NeuraLife
            </div>
            <p className="font-inter text-white/60 text-sm text-center">
              pavancloudcreds@gmail.com
            </p>
            {/* QR Code placeholder — replace with qrcode.react pointing to the live URL after Part G */}
            <div className="w-24 h-24 border-2 border-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white/30 text-xs text-center font-inter leading-tight px-2">QR code<br/>(add live URL)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
