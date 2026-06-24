import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

const questions = [
  {
    num: 'Q1',
    accent: SV.teal,
    q: 'How many student notebooks do you correct in a week? How long does that take you?',
    listen: 'Listen for: 40–60 notebooks, 3–4 hours. That number is your hook for NeuraPad SmartPad.',
  },
  {
    num: 'Q2',
    accent: SV.gold,
    q: "When you find the same mistake in multiple students' work, what do you do with that information?",
    listen: 'Listen for: nothing systematic. They correct it and move on. This is the insight-loss gap.',
  },
  {
    num: 'Q3',
    accent: SV.teal,
    q: 'How do you let parents know about homework? WhatsApp group? Diary?',
    listen: 'WhatsApp groups are chaos — messages get buried. This is the parent communication gap.',
  },
  {
    num: 'Q4',
    accent: SV.rtihPurple,
    q: "If you could know — before you walked into class — which students understood yesterday's lesson and which didn't, what would you do differently?",
    listen: 'Let them imagine it before you show it. This is the mastery-visibility question — the most powerful one.',
  },
  {
    num: 'Q5',
    accent: SV.gold,
    q: "How do you currently record which chapters and topics you've covered, for your own reference?",
    listen: 'Listen for: paper register, nothing, or a personal notebook. Surfaces the period-coverage tracking gap.',
  },
];

export default function Section03_Teacher() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SVSection id="teacher" theme="light" style={{ background: '#F0F9F9' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>

        {/* Who to talk to strip */}
        <div style={{
          background: '#fff', border: `1px solid ${SV.border}`,
          borderLeft: `4px solid ${SV.teal}`, borderRadius: 10,
          padding: '14px 20px', marginBottom: 32,
        }}>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: SV.teal }}>
            📚 Talk to a Class Teacher next — ~15 minutes
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: SV.textSecondary, marginTop: 4, lineHeight: 1.5 }}>
            This is your <strong>richest conversation</strong>. Prefer a <strong>Maths or Science teacher</strong> —
            more homework, more correction, more data. Ask the principal to introduce you.
          </div>
        </div>

        <SectionLabel number="02" title="Discovery — Class Teacher" />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: SV.textSecondary, margin: '0 0 36px', lineHeight: 1.6 }}>
          Go through each question. The fourth one is the most important — pause after asking it.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {questions.map((q, i) => (
            <motion.div
              key={q.num}
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.15 }}
              style={{
                background: '#fff', border: `1px solid ${SV.border}`,
                borderLeft: `4px solid ${q.accent}`, borderRadius: 12, padding: '18px 20px',
              }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  display: 'inline-block', flexShrink: 0,
                  background: q.accent + '1A', color: q.accent,
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 12,
                  borderRadius: 6, padding: '4px 10px', marginTop: 2,
                }}>{q.num}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: SV.textPrimary,
                    lineHeight: 1.6, margin: '0 0 10px', fontWeight: 500 }}>
                    "{q.q}"
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: SV.textMuted,
                    lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                    {q.listen}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SVSection>
  );
}
