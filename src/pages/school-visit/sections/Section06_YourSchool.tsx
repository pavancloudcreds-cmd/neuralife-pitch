import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

const personas = [
  {
    role: 'For the Principal',
    headline: 'Your morning dashboard is ready before you arrive.',
    detail: 'Attendance, fees collected, and any flagged issues — on your phone, by 8 AM, without asking anyone.',
    accent: SV.teal,
    icon: '🏫',
  },
  {
    role: 'For the Teacher',
    headline: 'Know which students need help before you enter the classroom.',
    detail: "Instead of guessing who understood yesterday's lesson, see it clearly. Spend your time teaching, not tracking.",
    accent: SV.gold,
    icon: '📚',
  },
  {
    role: 'For the Parent',
    headline: "A parent who didn't finish school can still help their child tonight.",
    detail: "We explain the day's lesson in simple language. Not just marks — the actual concept, in Telugu if needed.",
    accent: SV.rtihPurple,
    icon: '👨‍👩‍👧',
  },
  {
    role: 'For the Student',
    headline: 'Every page written on the SmartPad builds understanding — and recognition.',
    detail: 'Students earn coins and badges for real learning, not just exam scores. Progress becomes visible and motivating.',
    accent: SV.teal,
    icon: '🎓',
  },
  {
    role: 'For the Accountant',
    headline: "Fee collection reconciles itself. Tally doesn't need to be re-entered.",
    detail: 'All payments — cash, UPI, bank transfer — logged automatically. One click exports to Tally. No double entry.',
    accent: SV.gold,
    icon: '🧾',
  },
];

export default function Section06_YourSchool() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SVSection id="your-school" theme="teal">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>

        <SectionLabel number="05" title="What This Looks Like at Your School" color="rgba(255,255,255,0.8)" />
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 36,
          color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>
          One platform. A different<br />school experience.
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.7)',
          marginBottom: 40, lineHeight: 1.6 }}>
          Concretely — here's what changes from Monday, for each person in your school.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {personas.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.09 + 0.15 }}
              style={{
                background: '#fff', borderRadius: 14, padding: '20px 24px',
                display: 'flex', gap: 16, alignItems: 'flex-start',
                alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                maxWidth: '72%',
              }}
            >
              <div style={{ fontSize: 28, flexShrink: 0 }}>{p.icon}</div>
              <div>
                <span style={{
                  display: 'inline-block',
                  background: p.accent + '18', color: p.accent,
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 12,
                  borderRadius: 100, padding: '3px 12px', marginBottom: 8,
                }}>
                  {p.role}
                </span>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17,
                  color: SV.textPrimary, lineHeight: 1.3, marginBottom: 6 }}>
                  {p.headline}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14,
                  color: SV.textSecondary, lineHeight: 1.6 }}>
                  {p.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SVSection>
  );
}
