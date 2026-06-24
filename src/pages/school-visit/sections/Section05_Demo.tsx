import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

const demoGuide = [
  {
    pain: 'They mentioned morning info chaos',
    feature: 'Admin Console — Live Dashboard',
    what: 'Show the principal dashboard: attendance summary, fees collected today, flagged absences — all visible before 8 AM without asking anyone.',
    accent: SV.teal,
    icon: '🖥️',
  },
  {
    pain: 'They mentioned notebook correction burden',
    feature: 'NeuraPad SmartPad + Teacher App',
    what: 'Show what happens when a student writes on the SmartPad: their work is digitised, errors flagged, and a class-wide gap summary is ready before the teacher opens the next class.',
    accent: SV.gold,
    icon: '📝',
  },
  {
    pain: "They mentioned parents don't know what's happening",
    feature: 'Family App — Parent Side',
    what: "Show the parent home screen: today's concept explained in simple language, the child's mastery status per chapter, and direct messaging with the teacher.",
    accent: SV.rtihPurple,
    icon: '👨‍👩‍👧',
  },
  {
    pain: 'They mentioned UDISE+ / compliance burden',
    feature: 'Admin Console — Compliance Reports',
    what: 'Show one-click UDISE+ export: the system already has all the data (attendance, demographics, outcomes) and generates the report — no re-entry.',
    accent: SV.teal,
    icon: '📊',
  },
  {
    pain: 'They mentioned fee chaos or Tally',
    feature: 'Fee Management + Tally Export',
    what: 'Show the fee collection screen: UPI/cash/bank all logged automatically. End-of-day, one click exports to Tally-compatible format. No double entry.',
    accent: SV.gold,
    icon: '🧾',
  },
  {
    pain: 'They mentioned Amma Vodi / welfare attendance',
    feature: 'Welfare Attendance Tracker',
    what: 'Show the at-risk students view: any student below 75% attendance is flagged automatically, with the exact shortfall. Welfare coordinator sees this daily.',
    accent: '#DC2626',
    icon: '⚠️',
  },
];

export default function Section05_Demo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SVSection id="demo" theme="dark">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>

        <SectionLabel number="04" title="Targeted Demo" dark />

        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 36,
          color: '#fff', margin: '0 0 10px', lineHeight: 1.2, textAlign: 'center' }}>
          Show only what matches<br />what they just told you.
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.55)',
          textAlign: 'center', maxWidth: 540, margin: '0 auto 48px', lineHeight: 1.7 }}>
          Don't demo everything. Pick the 2–3 features that connect directly to the pain they named.
          Use this as your reference guide.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {demoGuide.map((d, i) => (
            <motion.div
              key={d.feature}
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.07 + 0.2 }}
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                borderLeft: `4px solid ${d.accent}`, borderRadius: 12, padding: '18px 20px',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}
            >
              <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12,
                  color: d.accent, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase',
                  letterSpacing: '0.8px' }}>
                  If they mentioned: {d.pain}
                </div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16,
                  color: '#fff', marginBottom: 6 }}>
                  → Show: {d.feature}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14,
                  color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  {d.what}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SVSection>
  );
}
