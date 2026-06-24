import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

const personas = [
  {
    tag: 'For the Principal',
    statement: 'Your morning dashboard is ready before you arrive.',
    detail: 'Attendance, fees collected, and any flagged issues — on your phone, by 8 AM, without asking anyone.',
  },
  {
    tag: 'For the Teacher',
    statement: 'Know which students need help — before you enter the classroom.',
    detail: "Instead of guessing who understood yesterday's lesson, see it clearly. Spend your time teaching, not tracking.",
  },
  {
    tag: 'For the Parent',
    statement: "A parent who didn't finish school can still help their child tonight.",
    detail: "We explain the day's lesson in simple language so any parent can understand — and help. Not just marks. The actual concept.",
  },
  {
    tag: 'For the Student',
    statement: 'Every page written on the SmartPad builds understanding — and recognition.',
    detail: 'Students earn coins and badges for real learning, not just exam scores. Progress becomes visible and motivating.',
  },
  {
    tag: 'For the Accountant',
    statement: "Fee collection reconciles itself. Tally doesn't need to be re-entered.",
    detail: "All payments — cash, UPI, bank transfer — logged automatically. One click to export the day's collections to Tally.",
  },
];

export default function Section06_ForYourSchool() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SVSection id="for-your-school" theme="teal">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel number="05" title="What This Means for Your School" color="rgba(255,255,255,0.8)" />

        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 36,
          color: '#ffffff',
          margin: '0 0 48px',
          lineHeight: 1.2,
        }}>
          One platform. A different<br />school experience.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {personas.map((p, i) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }}
              style={{
                background: '#fff',
                borderRadius: 14,
                padding: 20,
                alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                maxWidth: '70%',
              }}
            >
              <span style={{
                display: 'inline-block',
                background: SV.tealLight,
                color: SV.teal,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: 12,
                borderRadius: 100,
                padding: '4px 12px',
                marginBottom: 10,
              }}>
                {p.tag}
              </span>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 18,
                color: SV.textPrimary,
                lineHeight: 1.3,
                marginBottom: 8,
              }}>
                {p.statement}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: SV.textSecondary,
                lineHeight: 1.6,
              }}>
                {p.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SVSection>
  );
}
