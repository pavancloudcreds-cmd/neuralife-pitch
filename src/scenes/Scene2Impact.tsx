import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C } from '../tokens';

interface SceneProps { onNext: () => void; onPrev: () => void; }

const STAKEHOLDERS = [
  {
    name: 'Teacher',
    before: { label: 'Before NeuraLife', pain: '58 notebooks corrected every week.\nInsight produced: zero.\nThe red pen marks are made — and forgotten.' },
    after:  { label: 'After NeuraLife',  win:  'Walks into class knowing exactly\nwhich 7 students need help today.\nGap detected last night. Automatically.' },
  },
  {
    name: 'Parent',
    before: { label: 'Before NeuraLife', pain: 'Sees marks at the end of term.\n34/50. Good or bad?\nParent has no idea what to help with.' },
    after:  { label: 'After NeuraLife',  win:  'Sees the exact concept gap — in Telugu.\n"Chapter 4: Fractions — addition weak."\nHelps their child tonight. Without a tutor.' },
  },
  {
    name: 'Principal',
    before: { label: 'Before NeuraLife', pain: 'Calls 3 teachers every morning.\nWaits until 9 AM for attendance.\nMissed absences. Missed issues.' },
    after:  { label: 'After NeuraLife',  win:  'Dashboard ready by 7:30 AM.\nAttendance, fees, flagged issues.\nAll there. Without asking anyone.' },
  },
  {
    name: 'Student',
    before: { label: 'Before NeuraLife', pain: 'Gap in understanding goes invisible.\n3 weeks pass. The exam arrives.\nThe student didn\'t know they were lost.' },
    after:  { label: 'After NeuraLife',  win:  'Gap flagged the same day it appears.\nHint delivered through NeuraPad.\nNot the answer — the nudge. The right one.' },
  },
  {
    name: 'Accountant',
    before: { label: 'Before NeuraLife', pain: 'Fee collection chaos all morning.\nTally re-entry by hand until 9 PM.\nErrors every week. Reconciliation: dread.' },
    after:  { label: 'After NeuraLife',  win:  'All payments logged automatically.\nTally export: one click at 4 PM.\nGo home on time. Every day.' },
  },
];

const NODES = [
  { icon: '📱', label: 'Teacher App',  desc: 'Homework · Attendance · NeuraGuide', x: 50, y: 10 },
  { icon: '👨‍👩‍👧', label: 'Family App', desc: 'Parent insights · Student learning', x: 85, y: 35 },
  { icon: '🖥️', label: 'Web Admin',   desc: 'Fees · Payroll · UDISE+ compliance', x: 85, y: 65 },
  { icon: '📝', label: 'NeuraPad',    desc: 'Writing capture · AI inference', x: 50, y: 90 },
  { icon: '🧠', label: 'Cloud AI',    desc: 'HWR-1 · GAP-1 · Content gen', x: 15, y: 65 },
  { icon: '📊', label: 'Analytics',   desc: 'Principal dashboard · Fleet · Reports', x: 15, y: 35 },
];

function SystemsDiagram() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setRevealed(i);
      if (i >= NODES.length) clearInterval(t);
    }, 350);
    return () => clearInterval(t);
  }, []);

  const cx = 50, cy = 50;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 600, height: 420 }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
          {NODES.map((n, i) => (
            <motion.line key={i}
              x1={cx} y1={cy} x2={n.x} y2={n.y}
              stroke={i < revealed ? C.tealVib : 'transparent'}
              strokeWidth="0.3"
              strokeDasharray="2 1"
              initial={{ pathLength: 0 }} animate={{ pathLength: i < revealed ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </svg>

        {/* Center node */}
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 80, height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.3) 0%, rgba(13,148,136,0.05) 100%)',
          border: `2px solid ${C.tealVib}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
          boxShadow: `0 0 30px rgba(13,148,136,0.4)`,
        }}>
          <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 11, color: C.tealVib, textAlign: 'center' }}>
              Neura<br/>Life
            </div>
          </motion.div>
        </div>

        {/* Peripheral nodes */}
        {NODES.map((n, i) => (
          <AnimatePresence key={i}>
            {i < revealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  position: 'absolute',
                  left: `${n.x}%`, top: `${n.y}%`,
                  transform: 'translate(-50%,-50%)',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${C.border}`,
                  borderRadius: 10, padding: '8px 12px',
                  textAlign: 'center', minWidth: 90, zIndex: 2,
                }}>
                <div style={{ fontSize: 20 }}>{n.icon}</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: C.white, fontWeight: 600, marginTop: 2 }}>{n.label}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>{n.desc}</div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}

export default function Scene2Impact({ onNext }: SceneProps) {
  const [step, setStep] = useState(0);

  const advance = () => {
    if (step < 6) setStep(s => s + 1);
    else onNext();
  };

  return (
    <div onClick={advance} style={{
      width: '100%', height: '100%', background: C.dark,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', cursor: 'pointer', padding: 40,
      userSelect: 'none',
    }}>
      {step === 0 && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 20 }}>
            THE IMPACT
          </p>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 56,
            color: C.white, lineHeight: 1.15, margin: '0 0 16px' }}>
            One device.<br/>A completely different school.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, color: C.muted }}>
            Five people. One morning. Transformed.
          </p>
          <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.faint, marginTop: 60 }}>
            Click anywhere to continue →
          </motion.p>
        </motion.div>
      )}

      {step >= 1 && step <= 5 && (
        <div style={{ width: '100%', maxWidth: 900 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 20, textAlign: 'center' }}>
            {step} of 5 — {STAKEHOLDERS[step - 1].name}
          </p>
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden',
              border: `1px solid ${C.border}`, height: 300 }}>
            {/* Before */}
            <div style={{ flex: 1, background: 'rgba(248,113,113,0.06)',
              borderRight: `1px solid ${C.border}`, padding: 32 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#F87171',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                {STAKEHOLDERS[step - 1].before.label}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: C.muted,
                lineHeight: 1.7, whiteSpace: 'pre-line', margin: 0 }}>
                {STAKEHOLDERS[step - 1].before.pain}
              </p>
            </div>
            {/* vs badge */}
            <div style={{ width: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.03)', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: C.faint }}>vs</span>
            </div>
            {/* After */}
            <div style={{ flex: 1, background: 'rgba(13,148,136,0.06)', padding: 32 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                {STAKEHOLDERS[step - 1].after.label}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: C.white,
                lineHeight: 1.7, whiteSpace: 'pre-line', margin: 0 }}>
                {STAKEHOLDERS[step - 1].after.win}
              </p>
            </div>
          </motion.div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.faint,
            textAlign: 'center', marginTop: 24 }}>
            Click to see next stakeholder →
          </p>
        </div>
      )}

      {step === 6 && (
        <div style={{ width: '100%', maxWidth: 900, height: '70vh' }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8, textAlign: 'center' }}>
            THE SYSTEM
          </p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 28,
            color: C.white, textAlign: 'center', margin: '0 0 24px' }}>
            Everything connected. One platform.
          </h2>
          <SystemsDiagram />
        </div>
      )}
    </div>
  );
}
