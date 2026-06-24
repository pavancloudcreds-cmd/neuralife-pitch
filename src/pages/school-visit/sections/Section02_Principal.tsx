import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

const questions = [
  {
    num: 'Q1',
    accent: SV.teal,
    q: 'How do you currently know what happened in your school yesterday — by the time you come in in the morning?',
    listen: 'Listen for: morning WhatsApp pings, phone calls, waiting for staff to brief them. This is the dashboard gap.',
  },
  {
    num: 'Q2',
    accent: SV.gold,
    q: 'How long does UDISE+ or any government reporting take you per year? Who does it?',
    listen: `Listen for: "weeks", "headmaster does it personally", "multiple staff", "data entry". That's the compliance burden.`,
  },
  {
    num: 'Q3',
    accent: SV.teal,
    q: 'When a teacher is absent suddenly, what happens? How do you find a substitute?',
    listen: 'Listen for: manual scramble, phone calls, no system. This surfaces the substitution gap.',
  },
  {
    num: 'Q4',
    accent: SV.rtihPurple,
    q: "How do parents currently know what's happening with their child's learning — not just attendance, but whether they actually understood today's lesson?",
    listen: `Listen for: a pause. The honest answer is "they don't." This is the parent-communication gap.`,
  },
  {
    num: 'Q5',
    accent: SV.gold,
    q: 'What software, if any, do you use right now for school management?',
    listen: "Don't assume. They may use nothing, or Excel, or a legacy desktop app. Never name a competitor first.",
  },
  {
    num: 'Q6',
    accent: '#DC2626',
    q: 'How do you track which students are at risk of losing their Amma Vodi or Talliki Vandanam eligibility due to attendance? Is it manual?',
    listen: '⚠️ Government & aided schools only — skip if private. Ask who the welfare coordinator is.',
    govOnly: true,
  },
];

export default function Section02_Principal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SVSection id="principal" theme="light">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>

        {/* Who to talk to first — context strip */}
        <div style={{
          background: SV.tealLight, border: `1px solid ${SV.teal}33`,
          borderLeft: `4px solid ${SV.teal}`, borderRadius: 10,
          padding: '14px 20px', marginBottom: 32,
          display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: SV.teal }}>
              👋 Talk to the Principal first
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: SV.textSecondary, marginTop: 4, lineHeight: 1.5 }}>
              Arrives first. Gives permission for everything else. <strong>5 minutes maximum</strong> unless they choose to stay.
              Ask principal to introduce you to the teacher and accountant before you move on.
            </div>
          </div>
          <div style={{
            background: '#FEF3C7', border: '1px solid #F59E0B33',
            borderRadius: 8, padding: '10px 14px', flexShrink: 0,
          }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 12, color: '#92400E' }}>
              For Government Schools
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#92400E', marginTop: 3, lineHeight: 1.4 }}>
              Also ask: who handles 75% attendance<br />welfare record-keeping (Amma Vodi)?
            </div>
          </div>
        </div>

        <SectionLabel number="01" title="Discovery — Principal / Headmaster" />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: SV.textSecondary, margin: '0 0 36px', lineHeight: 1.6 }}>
          Ask these in order. Don't rush. Let them finish. Listen more than you talk.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {questions.map((q, i) => (
            <motion.div
              key={q.num}
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.07 + 0.15 }}
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
