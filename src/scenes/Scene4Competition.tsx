import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C } from '../tokens';

interface SceneProps { onNext: () => void; onPrev: () => void; }

const GAPS = [
  {
    title: 'School ERPs',
    subtitle: 'MyClassboard · Entab · Teachmint',
    has: ['Fee management', 'Attendance tracking', 'Timetable', 'Basic reports'],
    missing: ['Zero AI', 'No learning insight', 'No parent understanding', 'No handwriting analysis', 'No content layer'],
    gap: 'They digitized the office. The classroom stayed analog.',
  },
  {
    title: 'Consumer EdTech',
    subtitle: "BYJU'S · Vedantu · Extramarks",
    has: ['Video content', 'Practice tests', 'Live classes'],
    missing: ['English-medium only', 'Disconnected from school', 'No SCERT curriculum', 'No teacher integration', 'No real handwriting data'],
    gap: "They sell content. They don't connect to the school.",
  },
  {
    title: 'Global EdTech AI',
    subtitle: 'Khanmigo · Duolingo · etc.',
    has: ['Advanced AI', 'Personalization', 'Proven at scale'],
    missing: ['English only', 'No Indian curriculum', 'No handwriting', 'No regional scripts', 'No government compliance'],
    gap: "They're built for Silicon Valley. Not Srikakulam.",
  },
  {
    title: 'Hardware',
    subtitle: 'Remarkable · Onyx Boox · Kindle',
    has: ['Premium E-Ink', 'Great writing experience', 'Long battery'],
    missing: ['Zero educational AI', 'No Indian content', 'No school integration', 'No Indian script HWR', 'No teacher/principal dashboard'],
    gap: 'Great writing devices. No intelligence. No education.',
  },
];

type CellVal = boolean | 'half';

const MATRIX_ROWS: { cap: string; erp: CellVal; edtech: CellVal; ai: CellVal; hw: CellVal }[] = [
  { cap: 'School Operations',        erp: true,    edtech: false,   ai: false, hw: false },
  { cap: 'Student Learning AI',      erp: false,   edtech: 'half',  ai: true,  hw: false },
  { cap: 'Regional Language',        erp: false,   edtech: false,   ai: false, hw: false },
  { cap: 'Handwriting Recognition',  erp: false,   edtech: false,   ai: false, hw: false },
  { cap: 'Govt Compliance',          erp: 'half',  edtech: false,   ai: false, hw: false },
  { cap: 'Hardware Integration',     erp: false,   edtech: false,   ai: false, hw: 'half' },
  { cap: 'Unified School Identity',  erp: false,   edtech: false,   ai: false, hw: false },
];

const CATCHUP = [
  { color: C.tealVib, title: 'The Data Moat',
    body: 'We collect real Indian classroom handwriting daily. Every stroke trains a model that gets better every week. By the time a competitor starts, we have 12 months of data they cannot replicate — ever.' },
  { color: C.gold, title: 'The Curriculum Depth',
    body: 'SCERT AP period-by-period architecture took months to build. We understand how teachers teach each period in Andhra Pradesh. That knowledge cannot be downloaded.' },
  { color: C.purple, title: 'The Government Lock-in',
    body: "Once a school's UDISE+, welfare compliance, and APAAR records run through NeuraLife — switching cost is real. We become infrastructure, not a product." },
  { color: C.blue, title: 'The Hardware Integration',
    body: 'Software-only players cannot get stroke-level EMR data. The AI quality gap between our data and theirs is structural, not catchable by writing better software.' },
  { color: C.tealVib, title: 'The Patent Pipeline',
    body: 'HWR-1 pipeline · NeuraSync offline protocol · EMR stroke AI inference · SCERT period architecture. Filing after DIPP recognition. Legal protection incoming.' },
];

function Cell({ val }: { val: boolean | 'half' }) {
  if (val === true)   return <span style={{ color: '#34D399', fontSize: 18 }}>✓</span>;
  if (val === 'half') return <span style={{ color: '#FBB024', fontSize: 18 }}>~</span>;
  return <span style={{ color: '#F87171', fontSize: 18 }}>✗</span>;
}

function MatrixTable({ visible }: { visible: boolean }) {
  const [rows, setRows] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const t = setInterval(() => { i++; setRows(i); if (i >= MATRIX_ROWS.length) clearInterval(t); }, 120);
    return () => clearInterval(t);
  }, [visible]);

  const cols = ['School ERPs', 'EdTech', 'Global AI', 'Hardware', 'NeuraLife'];

  return (
    <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}` }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
        background: 'rgba(255,255,255,0.06)', padding: '10px 16px' }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.muted }}>Capability</div>
        {cols.map(c => (
          <div key={c} style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, textAlign: 'center',
            color: c === 'NeuraLife' ? C.tealVib : C.muted,
          }}>{c}</div>
        ))}
      </div>
      {MATRIX_ROWS.slice(0, rows).map((r, i) => (
        <motion.div key={r.cap} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
            padding: '10px 16px', borderTop: `1px solid ${C.border}`,
            background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
          }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.white }}>{r.cap}</div>
          <div style={{ textAlign: 'center' }}><Cell val={r.erp} /></div>
          <div style={{ textAlign: 'center' }}><Cell val={r.edtech} /></div>
          <div style={{ textAlign: 'center' }}><Cell val={r.ai} /></div>
          <div style={{ textAlign: 'center' }}><Cell val={r.hw} /></div>
          <div style={{ textAlign: 'center', background: 'rgba(13,148,136,0.08)' }}>
            <span style={{ color: '#34D399', fontSize: 18 }}>✓</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const daysSinceStart = Math.floor((Date.now() - new Date('2025-04-01').getTime()) / 86400000);

export default function Scene4Competition({ onNext }: SceneProps) {
  const [step, setStep] = useState(0);

  const advance = () => { if (step < 6) setStep(s => s + 1); else onNext(); };

  return (
    <div onClick={advance} style={{
      width: '100%', height: '100%', background: C.dark,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', cursor: 'pointer', padding: 40,
      userSelect: 'none', overflow: 'hidden',
    }}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', maxWidth: 800 }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 52,
              color: C.white, lineHeight: 1.2, margin: '0 0 20px' }}>
              There is no product in India<br/>doing what NeuraLife does.
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, color: C.tealVib, margin: '0 0 12px' }}>
              Not one. We checked.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.faint }}>
              Days since we started checking: {daysSinceStart}
            </p>
          </motion.div>
        )}

        {step >= 1 && step <= 4 && (
          <motion.div key={`gap-${step}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 860 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
              textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 16px', textAlign: 'center' }}>
              Gap {step} of 4
            </p>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.border}`, minHeight: 300 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px 24px', borderBottom: `1px solid ${C.border}` }}>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, color: C.white, margin: 0 }}>
                  {GAPS[step - 1].title}
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, margin: '4px 0 0' }}>
                  {GAPS[step - 1].subtitle}
                </p>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: 24, borderRight: `1px solid ${C.border}`, background: 'rgba(52,211,153,0.04)' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#34D399',
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>What they have</p>
                  {GAPS[step - 1].has.map(h => (
                    <div key={h} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, marginBottom: 8 }}>
                      ✓ {h}
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, padding: 24, background: 'rgba(248,113,113,0.04)' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#F87171',
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{"What they're missing"}</p>
                  {GAPS[step - 1].missing.map(m => (
                    <div key={m} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, marginBottom: 8 }}>
                      ✗ {m}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '16px 24px', borderTop: `1px solid ${C.border}`,
                background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: C.white, margin: 0 }}>
                  The gap: "{GAPS[step - 1].gap}"
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="matrix" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 920 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 28,
              color: C.white, marginBottom: 20, textAlign: 'center' }}>
              The Complete Picture
            </h2>
            <MatrixTable visible={step === 5} />
          </motion.div>
        )}

        {step === 6 && (
          <motion.div key="catchup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 900 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 32,
              color: C.white, marginBottom: 24, textAlign: 'center' }}>
              Even if they tried tomorrow...
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {CATCHUP.slice(0, 3).map((card, i) => (
                <motion.div key={card.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderLeft: `3px solid ${card.color}`, borderRadius: 12, padding: 20,
                  }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: card.color, margin: '0 0 10px' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 12 }}>
              {CATCHUP.slice(3).map((card, i) => (
                <motion.div key={card.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 3) * 0.1 }}
                  style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderLeft: `3px solid ${card.color}`, borderRadius: 12, padding: 20,
                  }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: card.color, margin: '0 0 10px' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step < 6 && (
        <p style={{ position: 'absolute', bottom: 60, fontFamily: "'Inter', sans-serif",
          fontSize: 13, color: C.faint }}>
          Click anywhere to continue →
        </p>
      )}
    </div>
  );
}
