import { motion, AnimatePresence } from 'framer-motion';
import { Database, Tablet, Link, ShieldCheck, MapPin } from 'lucide-react';

interface Props { beatIndex: number; }

const moats = [
  {
    icon: Database,
    title: 'Data Flywheel',
    desc: 'Every stroke a student writes and every correction a teacher makes trains a model nobody else has, in the regional language, in the SCERT curriculum.',
  },
  {
    icon: Tablet,
    title: 'Hardware',
    desc: 'Custom stylus capture nobody can replicate from a photo. Software-only competitors are structurally locked out of this data quality.',
  },
  {
    icon: Link,
    title: 'One Unified System',
    desc: 'Admin, teacher, parent, student on one identity, one login, one connected dataset. Competitors stitch together point solutions.',
  },
  {
    icon: ShieldCheck,
    title: 'Government Integration',
    desc: 'Built for UDISE+, APAAR, and state welfare-scheme compliance from day one. Once a school\'s reporting depends on you, switching cost becomes real.',
  },
  {
    icon: MapPin,
    title: 'Local Depth',
    desc: 'Relationships with government and private schools earned region by region — the part that\'s hardest to copy at scale.',
  },
];

export default function Slide09_Moats({ beatIndex }: Props) {
  const visibleMoats = moats.slice(0, beatIndex);
  const activeMoat = beatIndex > 0 ? beatIndex - 1 : -1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 gap-8">
      <motion.h2
        className="font-poppins font-bold text-4xl text-white text-center max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Why this gets harder to copy every single day.
      </motion.h2>

      {/* Completed moat chips */}
      {visibleMoats.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {visibleMoats.slice(0, -1).map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1"
            >
              <m.icon size={12} className="text-gold" />
              <span className="text-white text-xs font-inter">{i + 1}. {m.title}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Active moat card */}
      <AnimatePresence mode="wait">
        {activeMoat >= 0 && (
          <motion.div
            key={activeMoat}
            className="bg-white/5 border border-white/10 rounded-2xl p-7 max-w-lg w-full"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                {(() => { const Icon = moats[activeMoat].icon; return <Icon size={20} className="text-gold" />; })()}
              </div>
              <div>
                <span className="text-white/40 text-xs font-inter">{activeMoat + 1} of 5</span>
                <h3 className="font-poppins font-bold text-xl text-white">{moats[activeMoat].title}</h3>
              </div>
            </div>
            <p className="font-inter text-white/70 leading-relaxed">{moats[activeMoat].desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
