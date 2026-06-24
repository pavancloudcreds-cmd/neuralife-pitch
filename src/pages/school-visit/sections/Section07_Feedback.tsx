import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

const questions = [
  {
    num: 'Q1',
    accent: SV.teal,
    text: 'How do you currently know — by the time school starts — what happened in your school the previous day? Attendance, fees, issues?',
  },
  {
    num: 'Q2',
    accent: SV.gold,
    text: 'How much time does government reporting take your staff each term — UDISE+, welfare attendance tracking, any state compliance? Who does this work?',
  },
  {
    num: 'Q3',
    accent: SV.teal,
    text: 'When a teacher finishes correcting notebooks, does that feedback ever reach the parent? If not — why not, and would it be useful?',
  },
  {
    num: 'Q4',
    accent: SV.rtihPurple,
    text: 'How do parents currently know what their child needs help with — beyond the exam marks? What would make a difference for them?',
  },
  {
    num: 'Q5',
    accent: SV.gold,
    text: 'What software does the school currently use for management, fees, or communication? What is the most painful part of it?',
  },
  {
    num: 'Q6',
    accent: '#DC2626',
    text: 'For welfare schemes like Amma Vodi or Talliki Vandanam — how does the school currently track which students are at risk of falling below the 75% attendance threshold?',
  },
];

export default function Section07_Feedback() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SVSection id="feedback" theme="light">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel number="06" title="Questions for You" />

        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 32,
          color: SV.textPrimary,
          margin: '0 0 12px',
        }}>
          Your answers shape what we build.
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          color: SV.textSecondary,
          marginBottom: 40,
          maxWidth: 680,
        }}>
          We don't want to assume. We want to understand your school before we build anything for it.
          These are the questions we'd like to discuss with you today.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {questions.map((q, i) => (
            <motion.div
              key={q.num}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.2 }}
              style={{
                background: '#fff',
                border: `1px solid ${SV.border}`,
                borderLeft: `4px solid ${q.accent}`,
                borderRadius: 12,
                padding: 20,
              }}
            >
              <span style={{
                display: 'inline-block',
                background: q.accent + '1A',
                color: q.accent,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 13,
                borderRadius: 6,
                padding: '3px 10px',
                marginBottom: 10,
              }}>
                {q.num}
              </span>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                color: SV.textPrimary,
                lineHeight: 1.6,
                margin: 0,
              }}>
                {q.text}
              </p>
            </motion.div>
          ))}
        </div>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: SV.textMuted,
          fontStyle: 'italic',
          marginTop: 20,
        }}>
          Note: Q6 is specifically for government and aided schools. Skip if not applicable to your school.
        </p>
      </motion.div>
    </SVSection>
  );
}
