import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

const questions = [
  {
    num: 'Q1',
    accent: SV.teal,
    q: 'How do parents pay fees here — mostly cash, or UPI, or bank transfer?',
    listen: "Don't assume digital. Many schools in AP still run primarily on cash. Their answer shapes which demo to show.",
  },
  {
    num: 'Q2',
    accent: SV.gold,
    q: 'Do you use Tally? At the end of the day, how do you reconcile what was collected?',
    listen: 'If they use Tally manually — this is your Tally-integration hook. If not, ask what they use instead.',
  },
  {
    num: 'Q3',
    accent: SV.teal,
    q: 'How long does fee collection season take — first two weeks of term, say?',
    listen: 'You want to hear about the chaos and the queues. Long queues = manual receipt bottleneck.',
  },
  {
    num: 'Q4',
    accent: SV.rtihPurple,
    q: 'If a parent has two children in the school, how do you handle their fee account?',
    listen: "Surfaces the sibling-account gap — most systems don't link siblings. Manual double-entry is common.",
  },
];

export default function Section04_Accountant() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SVSection id="accountant" theme="light">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>

        {/* Who to talk to strip */}
        <div style={{
          background: SV.goldLight, border: `1px solid ${SV.gold}44`,
          borderLeft: `4px solid ${SV.gold}`, borderRadius: 10,
          padding: '14px 20px', marginBottom: 32,
        }}>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: '#92400E' }}>
            🧾 Talk to the Accountant last — ~10 minutes
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#78350F', marginTop: 4, lineHeight: 1.5 }}>
            Usually in a different room or building. <strong>Ask the principal to introduce you</strong> before you go — it makes the conversation 10x easier.
            If there's no dedicated accountant, the headmaster or clerk handles this.
          </div>
        </div>

        <SectionLabel number="03" title="Discovery — Accountant" color={SV.gold} />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: SV.textSecondary, margin: '0 0 36px', lineHeight: 1.6 }}>
          Keep it to 10 minutes. The goal is to understand their fee workflow and whether Tally is in the picture.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {questions.map((q, i) => (
            <motion.div
              key={q.num}
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.09 + 0.15 }}
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
