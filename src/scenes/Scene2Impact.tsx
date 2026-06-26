import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    before: { label: 'Before NeuraLife', pain: "Gap in understanding goes invisible.\n3 weeks pass. The exam arrives.\nThe student didn't know they were lost." },
    after:  { label: 'After NeuraLife',  win:  'Gap flagged the same day it appears.\nHint delivered through NeuraPad.\nNot the answer — the nudge. The right one.' },
  },
  {
    name: 'Accountant',
    before: { label: 'Before NeuraLife', pain: 'Fee collection chaos all morning.\nTally re-entry by hand until 9 PM.\nErrors every week. Reconciliation: dread.' },
    after:  { label: 'After NeuraLife',  win:  'All payments logged automatically.\nTally export: one click at 4 PM.\nGo home on time. Every day.' },
  },
];

// ─── Systems Diagram ──────────────────────────────────────────────────────────
// Pure SVG, viewBox "0 0 900 520", hexagonal hub-and-spoke.
// Center at (450, 260). Orbit radius 190px.

const CX = 450, CY = 260;
const R  = 190;        // orbit radius
const CR = 44;         // center circle radius

// 6 nodes at 60° intervals, starting from top (270° in standard math)
const toRad = (deg: number) => (deg * Math.PI) / 180;
const nx = (deg: number) => Math.round(CX + R * Math.cos(toRad(deg)));
const ny = (deg: number) => Math.round(CY + R * Math.sin(toRad(deg)));

const NODES = [
  { icon: '📱', label: 'Teacher App', d1: 'Homework · Attendance', d2: 'NeuraGuide',        x: nx(270), y: ny(270) },
  { icon: '👨‍👩‍👧', label: 'Family App', d1: 'Parent insights',         d2: 'Student learning', x: nx(330), y: ny(330) },
  { icon: '🖥️', label: 'Web Admin',  d1: 'Fees · Payroll',           d2: 'UDISE+ compliance', x: nx(30),  y: ny(30)  },
  { icon: '📝', label: 'NeuraPad',   d1: 'Writing capture',           d2: 'AI inference',      x: nx(90),  y: ny(90)  },
  { icon: '🧠', label: 'Cloud AI',   d1: 'HWR-1 · GAP-1',            d2: 'Content gen',       x: nx(150), y: ny(150) },
  { icon: '📊', label: 'Analytics',  d1: 'Principal dashboard',       d2: 'Fleet · Reports',  x: nx(210), y: ny(210) },
];

// Line start: just outside the center circle
function lineStart(n: typeof NODES[0]) {
  const dx = n.x - CX, dy = n.y - CY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const off  = CR + 4;
  return { x: CX + (dx / dist) * off, y: CY + (dy / dist) * off };
}

function SystemsDiagram() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setRevealed(i);
      if (i >= NODES.length) clearInterval(t);
    }, 300);
    return () => clearInterval(t);
  }, []);

  return (
    <svg
      viewBox="0 0 900 520"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        {/* Per-line gradient: bright teal → dim teal */}
        {NODES.map((n, i) => {
          const s = lineStart(n);
          return (
            <linearGradient key={i} id={`lg${i}`}
              x1={s.x} y1={s.y} x2={n.x} y2={n.y}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#0d9488" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.30" />
            </linearGradient>
          );
        })}

        {/* Glow filter for center circle */}
        <filter id="cglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Center radial fill */}
        <radialGradient id="crf" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0d9488" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.04" />
        </radialGradient>
      </defs>

      {/* Faint orbit rings */}
      <circle cx={CX} cy={CY} r={CR + 34}  fill="none" stroke="rgba(13,148,136,0.08)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={R - 10}   fill="none" stroke="rgba(13,148,136,0.05)" strokeWidth="1" strokeDasharray="4 10" />
      <circle cx={CX} cy={CY} r={R + 30}   fill="none" stroke="rgba(13,148,136,0.04)" strokeWidth="1" strokeDasharray="2 14" />

      {/* Spoke lines — fade in per reveal step */}
      {NODES.map((n, i) => {
        const s = lineStart(n);
        return (
          <motion.path
            key={`line-${i}`}
            d={`M ${s.x.toFixed(1)} ${s.y.toFixed(1)} L ${n.x} ${n.y}`}
            stroke={`url(#lg${i})`}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            fill="none"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: i < revealed ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          />
        );
      })}

      {/* Center glow halos */}
      <circle cx={CX} cy={CY} r={CR + 20} fill="url(#crf)" />

      {/* Center circle */}
      <circle cx={CX} cy={CY} r={CR}
        fill="rgba(6,13,26,0.96)"
        stroke="#0d9488" strokeWidth="2"
        filter="url(#cglow)"
      />

      {/* Pulsing ring */}
      <motion.circle cx={CX} cy={CY} r={CR}
        fill="none" stroke="#0d9488" strokeWidth="1.5"
        animate={{ r: [CR, CR + 22, CR], opacity: [0.65, 0, 0.65] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* Center text */}
      <text x={CX} y={CY - 5} textAnchor="middle" fill="#0d9488"
        fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="14">Neura</text>
      <text x={CX} y={CY + 12} textAnchor="middle" fill="#0d9488"
        fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="14">Life</text>

      {/* Peripheral node cards */}
      {NODES.map((n, i) => (
        <motion.g key={n.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: i < revealed ? 1 : 0 }}
          transition={{ duration: 0.4, delay: i < revealed ? 0.1 : 0 }}
        >
          {/* Card */}
          <rect x={n.x - 68} y={n.y - 42} width={136} height={84} rx={11} ry={11}
            fill="rgba(13,148,136,0.11)"
            stroke="rgba(13,148,136,0.45)"
            strokeWidth="1.2"
          />

          {/* Connector dot where line meets card */}
          <circle cx={n.x} cy={n.y} r={3.5} fill="#0d9488" opacity="0.9" />

          {/* Icon */}
          <text x={n.x} y={n.y - 20}
            textAnchor="middle" fontSize="19" dominantBaseline="middle">
            {n.icon}
          </text>

          {/* Node label */}
          <text x={n.x} y={n.y + 4}
            textAnchor="middle" dominantBaseline="middle"
            fill="white" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="12">
            {n.label}
          </text>

          {/* Desc line 1 */}
          <text x={n.x} y={n.y + 18}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.48)" fontFamily="Inter, sans-serif" fontSize="9">
            {n.d1}
          </text>

          {/* Desc line 2 */}
          <text x={n.x} y={n.y + 29}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.48)" fontFamily="Inter, sans-serif" fontSize="9">
            {n.d2}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

// ─── Main Scene ───────────────────────────────────────────────────────────────

export default function Scene2Impact({ onNext }: SceneProps) {
  const [step, setStep] = useState(0);

  const advance = () => {
    if (step < 6) setStep(s => s + 1);
    else onNext();
  };

  const isDiagram = step === 6;

  return (
    <div onClick={advance} style={{
      width: '100%', height: '100%', background: C.dark,
      display: 'flex', flexDirection: 'column',
      alignItems: isDiagram ? 'stretch' : 'center',
      justifyContent: isDiagram ? 'flex-start' : 'center',
      cursor: 'pointer',
      padding: isDiagram ? '16px 28px 24px' : '40px',
      userSelect: 'none',
    }}>

      {/* ── Step 0: Opening ── */}
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

      {/* ── Steps 1–5: Stakeholder before/after ── */}
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
            {/* vs */}
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

      {/* ── Step 6: Systems diagram ── */}
      {step === 6 && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', flexShrink: 0, marginBottom: 10 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: C.tealVib,
              textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 6px' }}>
              THE SYSTEM
            </p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 26,
              color: C.white, margin: 0 }}>
              Everything connected. One platform.
            </h2>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <SystemsDiagram />
          </div>
        </div>
      )}

    </div>
  );
}
