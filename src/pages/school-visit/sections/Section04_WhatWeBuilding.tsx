import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';

const cards = [
  { icon: '🖥️', title: 'Web Admin Console',    desc: 'Fees, payroll, timetable, admissions, compliance reports' },
  { icon: '📱', title: 'Teacher App',           desc: 'Attendance, grading, homework — from any Android phone' },
  { icon: '👨‍👩‍👧', title: 'Family App',          desc: 'Parents track learning gaps. Students see their own progress.' },
  { icon: '📝', title: 'NeuraPad SmartPad',     desc: 'A stylus device that reads what students write — building AI' },
  { icon: '🧠', title: 'Cloud AI Engine',       desc: 'Handwriting recognition trained on real Indian classroom data' },
  { icon: '⚡', title: 'Edge AI (On-device)',   desc: 'Works offline. Syncs when internet is available.' },
];

export default function Section04_WhatWeBuilding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SVSection id="what-we-building" theme="dark">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel number="03" title="What NeuraLife Is" dark />

        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 44,
          color: '#ffffff',
          textAlign: 'center',
          margin: '0 auto 12px',
          lineHeight: 1.2,
        }}>
          One system. Every person<br />in your school. Real data.
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          color: 'rgba(255,255,255,0.65)',
          textAlign: 'center',
          maxWidth: 560,
          margin: '0 auto 56px',
          lineHeight: 1.7,
        }}>
          NeuraLife is not another app. It is a complete school operating system — connecting your
          administration, teachers, parents, and students on a single platform.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08 + 0.2 }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: 15,
                color: '#ffffff',
                marginBottom: 6,
              }}>
                {c.title}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.5,
              }}>
                {c.desc}
              </div>
            </motion.div>
          ))}
        </div>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 15,
          color: 'rgba(255,255,255,0.45)',
          textAlign: 'center',
          marginTop: 40,
        }}>
          Built first for SCERT AP and Telangana curriculum. Expanding to CBSE next. Every Indian board, eventually.
        </p>
      </motion.div>
    </SVSection>
  );
}
