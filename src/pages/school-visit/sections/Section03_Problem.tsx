import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import InfoCard from '../components/InfoCard';
import { SV } from '../tokens';

const cards = [
  {
    icon: '📓',
    title: 'Notebooks corrected. Insight lost.',
    body: 'A teacher corrects 40-60 notebooks every week. That effort produces insight — which gaps exist, which mistakes repeat. But that insight goes nowhere. It dies with the red pen.',
    accent: SV.teal,
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parents see marks. Not understanding.',
    body: "A parent knows their child scored 34/50. They don't know why, which chapter is weak, or what to help with tonight. So they can't help.",
    accent: SV.gold,
  },
  {
    icon: '🏫',
    title: "The principal's morning starts with yesterday.",
    body: 'Every morning, a principal has to ask: how many present? How much collected? Any issues? The answer always comes late, from multiple people, in different formats.',
    accent: SV.rtihPurple,
  },
  {
    icon: '📊',
    title: 'Government reporting takes weeks.',
    body: 'UDISE+, welfare scheme attendance tracking, APAAR IDs — each one is hours of manual data entry. Every term. By the same already-stretched staff.',
    accent: SV.teal,
  },
  {
    icon: '⚠️',
    title: 'Welfare eligibility goes untracked.',
    body: "For families receiving Amma Vodi or Talliki Vandanam, a student's attendance directly affects the family's income. Schools often don't know who's at risk until it's too late.",
    accent: '#DC2626',
  },
];

export default function Section03_Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SVSection id="problem" theme="light">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel number="02" title="What We Noticed" />

        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 36,
          color: SV.textPrimary,
          margin: '0 0 12px',
          lineHeight: 1.2,
        }}>
          Five things every school in India<br />deals with, every single day.
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          color: SV.textSecondary,
          marginBottom: 48,
        }}>
          We spoke to teachers, parents, and school staff. These are the patterns we found — not assumptions, real conversations.
        </p>

        {/* 3 + 2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {cards.slice(0, 3).map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <InfoCard {...c} />
            </motion.div>
          ))}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          marginTop: 16,
          maxWidth: '66.67%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {cards.slice(3).map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: (i + 3) * 0.1 + 0.2 }}
            >
              <InfoCard {...c} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SVSection>
  );
}
