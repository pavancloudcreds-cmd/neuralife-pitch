import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C } from '../tokens';

interface SceneProps { onNext: () => void; onPrev: () => void; }

const MOATS = [
  {
    icon: '🔄', title: 'Data Flywheel', color: '#0d9488',
    tagline: 'Gets harder to copy every day',
    detail: `Every stroke a student writes on the SmartPad trains HWR-1. Every correction a teacher makes trains GAP-1. Every parent interaction trains the summary model.

This is not a feature. It is a compounding asset.

Month 1: 50,000 handwriting samples
Month 6: 500,000 samples
Month 18: 5,000,000+ samples across Telugu, Hindi, English

No competitor can replicate this data.
Not in 5 years. Not ever. Because they would need real students, in real Indian schools, writing in real time.
That's what we have. That's what they don't.`,
  },
  {
    icon: '📡', title: 'Offline-First Architecture', color: '#F59E0B',
    tagline: 'Works where others fail',
    detail: `80% of Indian government schools have unreliable internet. Consumer EdTech apps require constant connectivity. School ERPs fail the moment WiFi goes down.

NeuraLife was designed for this from day one.

All AI inference runs on-device (HWR-1, GAP-1, HDE).
Writing is captured locally and synced when WiFi is available.
The NeuraPad works for a full school day in airplane mode.
The teacher app caches a week's worth of data.

This is not just a feature — it is the prerequisite for operating in the schools where impact is highest.`,
  },
  {
    icon: '🇮🇳', title: 'Regional Language First', color: '#A78BFA',
    tagline: 'Built for Telugu. Not translated.',
    detail: `BYJU'S was built for English. Then translated. Vedantu teaches in Hindi with captions. Extramarks has 3 languages on an afterthought tab.

NeuraLife was built for Telugu-speaking families in Andhra Pradesh and Telangana from the very first line of code.

HWR-1 was trained on Telugu script handwriting.
Parent summaries are delivered in Telugu by default.
The curriculum is SCERT AP — not CBSE adapted.

There are 92 million Telugu speakers. There is not one company in the world that has built a school AI system specifically for this population. That gap is our market.`,
  },
  {
    icon: '🏛️', title: 'Government Integration', color: '#60A5FA',
    tagline: 'We become infrastructure',
    detail: `Every government school in India reports to UDISE+. Every state welfare scheme requires 75% attendance tracking. APAAR IDs are being mandated for all students by NEP 2020.

NeuraLife handles all of this natively.

UDISE+ data exports: built.
Welfare scheme AT-RISK flagging (Amma Vodi, Talliki Vandanam): built.
APAAR ID management: architecture in place.

When a school's compliance reporting depends on NeuraLife, switching is not a technical decision — it is a political one.`,
  },
  {
    icon: '🔒', title: 'Single Unified Identity', color: '#34D399',
    tagline: 'One NeuraID. Every surface.',
    detail: `A student in class has a NeuraID. The same ID is used on the SmartPad. The parent logs in with that NeuraID. The teacher sees that student by NeuraID. The principal's dashboard tracks by NeuraID. The compliance report references that NeuraID.

This is not a login system. It is a unified identity layer that connects every surface of the school into one data model.

Competitors stitching together point solutions (one app for fees, another for attendance, another for learning) create fragmentation. The data never connects.

NeuraLife connects it all. From day one. By design.`,
  },
  {
    icon: '🤝', title: 'RTIH + AP Ecosystem', color: '#F59E0B',
    tagline: 'Institutional credibility, Day 1',
    detail: `Building an EdTech company in India is hard. Getting into schools is harder. Getting the government to pay attention is hardest.

We are a SPARK 2.0 participant at the Ratan Tata Innovation Hub — the institution that gave Tata its name in Andhra Pradesh.

RTIH opens doors to government schools that no cold outreach can. The AP government is actively building the infrastructure that NeuraLife runs on (RTIH itself is that infrastructure).

We are not asking permission to enter the ecosystem. We are already inside it.`,
  },
];

export default function Scene5Moats({ onNext: _onNext }: SceneProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ width: '100%', height: '100%', background: C.dark, display: 'flex', flexDirection: 'column', padding: '32px 40px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ marginBottom: 28, flexShrink: 0 }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 8px' }}>
          THE MOATS
        </p>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 40, color: C.white, margin: 0 }}>
          Why this gets harder to copy every day.
        </h1>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, flex: 1, position: 'relative' }}>
        {MOATS.map((m, i) => (
          <motion.div key={m.title}
            layout
            onClick={() => setActive(active === i ? null : i)}
            whileHover={{ scale: active === i ? 1 : 1.02 }}
            style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${m.color}`,
              borderRadius: 16, padding: 24, cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
            }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{m.icon}</div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: C.white, margin: '0 0 6px' }}>
              {m.title}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, margin: '0 0 12px' }}>
              {m.tagline}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.faint, margin: 0 }}>
              Click to expand →
            </p>

            {/* Pulse animation */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              style={{
                position: 'absolute', right: 16, top: 16,
                width: 8, height: 8, borderRadius: '50%',
                background: m.color,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: 'absolute', inset: 0, zIndex: 50,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 60,
            }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0C1220', border: `1px solid ${MOATS[active].color}40`,
                borderLeft: `4px solid ${MOATS[active].color}`,
                borderRadius: 20, padding: 40, maxWidth: 640, width: '100%',
                maxHeight: '70vh', overflowY: 'auto', position: 'relative',
              }}>
              <button onClick={() => setActive(null)} style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(255,255,255,0.08)', border: 'none',
                color: 'white', width: 32, height: 32, borderRadius: '50%',
                cursor: 'pointer', fontSize: 16, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>×</button>

              <div style={{ fontSize: 36, marginBottom: 12 }}>{MOATS[active].icon}</div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 26,
                color: MOATS[active].color, margin: '0 0 20px' }}>
                {MOATS[active].title}
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted,
                lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>
                {MOATS[active].detail}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
