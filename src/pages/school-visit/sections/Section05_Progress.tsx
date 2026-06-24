import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import ProgressRow from '../components/ProgressRow';
import { SV } from '../tokens';

const rows: { layer: string; status: 'done' | 'progress' | 'spec'; notes: string }[] = [
  { layer: 'Database Schema (74 tables)',  status: 'done',     notes: 'Production-ready, 74 tables, RLS security' },
  { layer: 'Web Admin Console',            status: 'done',     notes: 'Fee management, payroll, timetable, compliance' },
  { layer: 'Teacher Mobile App',           status: 'done',     notes: 'Attendance, homework, grading, report cards' },
  { layer: 'Family App — Parent Side',     status: 'done',     notes: 'Mastery tracking, messages, AI chat, leave' },
  { layer: 'Family App — Student Side',    status: 'progress', notes: 'Home and achievements done, library in progress' },
  { layer: 'AI Handwriting Model (HWR-1)', status: 'progress', notes: 'Training on Vertex AI, improving every week' },
  { layer: 'NeuraPad Hardware',            status: 'spec',     notes: 'Full bill of materials ready, ODM partner search next' },
];

const stats = [
  { value: '74', label: 'database tables',   bg: SV.tealLight,  color: SV.teal },
  { value: '3',  label: 'working apps built', bg: SV.goldLight,  color: SV.gold },
  { value: '1',  label: 'AI model in training', bg: SV.rtihLight, color: SV.rtihPurple },
];

export default function Section05_Progress() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SVSection id="progress" theme="light">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel number="04" title="Where We Are Today" />

        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 36,
          color: SV.textPrimary,
          margin: '0 0 12px',
          lineHeight: 1.2,
        }}>
          Honest progress.<br />Real build. Not just an idea.
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          color: SV.textSecondary,
          marginBottom: 40,
        }}>
          We started building in 2025. Here is exactly what is done, what is in progress, and what is coming next.
          We believe in showing you the truth.
        </p>

        {/* Progress table */}
        <div style={{
          background: '#fff',
          border: `1px solid ${SV.border}`,
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            display: 'flex',
            gap: 16,
            padding: '12px 16px',
            background: SV.teal,
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 14,
            color: '#fff',
          }}>
            <span style={{ flex: 1 }}>Layer</span>
            <span style={{ width: 130 }}>Status</span>
            <span style={{ maxWidth: 340, textAlign: 'right', flexShrink: 0 }}>Details</span>
          </div>

          {rows.map(r => (
            <ProgressRow key={r.layer} {...r} />
          ))}
        </div>

        {/* Stat chips */}
        <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: s.bg,
              borderRadius: 12,
              padding: '16px 24px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 32,
                color: s.color,
                lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: s.color,
                marginTop: 4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </SVSection>
  );
}
