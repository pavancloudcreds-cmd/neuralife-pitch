import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C } from '../tokens';

interface SceneProps { onNext: () => void; onPrev: () => void; }

const SCHOOLS = [
  { name: 'Sri Chaitanya School', board: 'SCERT AP', priority: 'High', stars: 3,
    why: 'Primary SCERT CCE engine validation. FA1-FA4 / SA1-SA2 framework testing.' },
  { name: 'Ravindra Bharathi School', board: 'SCERT AP', priority: 'Medium', stars: 2,
    why: 'Secondary validation. Broader school type coverage.' },
  { name: 'AP Residential / Social Welfare HS', board: 'SCERT AP (Govt)', priority: 'High', stars: 3,
    why: 'Welfare compliance: Amma Vodi 75% attendance. Highest social impact. Most open to free pilot.' },
  { name: 'Kendriya Vidyalaya ONGC', board: 'CBSE Central', priority: 'Medium', stars: 2,
    why: 'Validates SCERT → CBSE curriculum switch. Critical for national expansion proof.' },
  { name: 'Delhi Public School (DPS)', board: 'CBSE Private', priority: 'High', stars: 3,
    why: 'Premium segment: fees, Tally, multi-campus. SmartPad premium device positioning.' },
  { name: 'Laurel High Global School', board: 'CBSE Private', priority: 'Optional', stars: 1,
    why: 'International curriculum flexibility test. Premium urban expansion preparation.' },
];

const RTIH_ASKS = [
  {
    num: '01', color: C.tealVib,
    title: 'School Introductions — During SPARK Week',
    body: 'Facilitated access to 2–3 Rajahmundry schools for structured stakeholder interviews. Day 3 field activity. Not a sales visit — a validation research session.',
  },
  {
    num: '02', color: C.gold,
    title: 'Catalyst Incubation — Direct Entry',
    body: 'NeuraLife has working prototypes across 3 applications and an AI model in active training. We are past the ideation stage that Future Founders is designed for. Requesting evaluation for direct Catalyst entry. Seed funding: ₹30 lakhs, equity-free.',
  },
  {
    num: '03', color: C.purple,
    title: 'AI Build Grant — IP Protection',
    body: '4 core innovations ready to file as patents after DIPP recognition. Grant funds: Patent filing ₹8–12L (India + PCT) · CA fees · GST · Legal helpdesk.',
  },
];

const GRANTS = [
  { icon: '🏛️', name: 'RTIH Catalyst Programme',       amount: '₹30 Lakhs · Equity-free', for: 'For validated prototype teams',     status: 'Requesting evaluation' },
  { icon: '🌱', name: 'Startup India Seed Fund (DIPP)', amount: 'Up to ₹20 Lakhs · Equity-free', for: 'Available post-DIPP recognition', status: 'Pending DIPP recognition' },
  { icon: '💡', name: 'MEITY AI Grants',               amount: 'Variable · Project-based',      for: 'Ministry of Electronics AI initiatives', status: 'Exploring eligibility' },
  { icon: '🏆', name: 'Niti Aayog AI Challenges',     amount: '₹5–50 Lakhs · Competition-based', for: 'National EdTech AI challenges',  status: 'Monitoring open calls' },
];

const PATENTS = [
  { num: 'P-01', title: 'HWR-1 Handwriting Pipeline',
    desc: 'System and method for real-time handwriting recognition of Indian regional scripts on electromagnetic resonance stylus devices' },
  { num: 'P-02', title: 'NeuraSync Offline-Sync Protocol',
    desc: 'Differential sync protocol for AI-generated educational content over intermittent WiFi with conflict resolution for multi-device classrooms' },
  { num: 'P-03', title: 'EMR Stroke AI Inference System',
    desc: 'On-device neural network inference pipeline for analyzing pressure, velocity, and tilt data from EMR stylus strokes for learning gap detection' },
  { num: 'P-04', title: 'SCERT Period-Based Content Architecture',
    desc: 'Period-as-primary-unit curriculum architecture for AI-generated educational content aligned to teacher handbook periodization' },
];

const TABS = ['School Introductions', 'RTIH Incubation', 'Grants & IP'];

const priorityColor = (p: string) => p === 'High' ? C.tealVib : p === 'Medium' ? C.gold : C.faint;

export default function Scene6Ask({ onNext: _onNext }: SceneProps) {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%', background: C.dark, display: 'flex', flexDirection: 'column', padding: '28px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 6px' }}>THE ASK</p>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 36, color: C.white, margin: 0 }}>
          Three specific asks. All actionable.
        </h1>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexShrink: 0 }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            padding: '8px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600,
            background: tab === i ? C.tealVib : C.surface,
            color: tab === i ? 'white' : C.muted,
            transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

            {tab === 0 && (
              <div>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, color: C.white, margin: '0 0 6px' }}>
                  We need the door opened.
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, margin: '0 0 20px' }}>
                  Not a one-time visit. A standing relationship.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {SCHOOLS.map(s => (
                    <div key={s.name} style={{
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${priorityColor(s.priority)}`,
                      borderRadius: 12, padding: 16,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: C.white }}>
                          {s.name}
                        </div>
                        <span style={{ color: C.gold, fontSize: 12, flexShrink: 0, marginLeft: 8 }}>
                          {'★'.repeat(s.stars)}{'☆'.repeat(3 - s.stars)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <span style={{
                          background: 'rgba(13,148,136,0.15)', color: C.tealVib,
                          fontFamily: "'Inter', sans-serif", fontSize: 11,
                          padding: '2px 8px', borderRadius: 100,
                        }}>{s.board}</span>
                        <span style={{
                          background: `${priorityColor(s.priority)}1A`, color: priorityColor(s.priority),
                          fontFamily: "'Inter', sans-serif", fontSize: 11,
                          padding: '2px 8px', borderRadius: 100,
                        }}>{s.priority}</span>
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.5 }}>
                        {s.why}
                      </p>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.tealVib,
                  fontStyle: 'italic', marginTop: 16 }}>
                  Our goal: 2–3 meaningful introductions. One SCERT AP. One CBSE. Quality over quantity.
                </p>
              </div>
            )}

            {tab === 1 && (
              <div>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, color: C.white, margin: '0 0 6px' }}>
                  {"We're not asking you to believe in an idea."}
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, margin: '0 0 24px' }}>
                  {"We're asking you to help us prove it faster."}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {RTIH_ASKS.map(a => (
                    <motion.div key={a.num} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      style={{
                        background: C.surface, border: `1px solid ${C.border}`,
                        borderLeft: `4px solid ${a.color}`, borderRadius: 12, padding: '20px 24px',
                        display: 'flex', gap: 20, alignItems: 'flex-start',
                      }}>
                      <span style={{
                        fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 36,
                        color: a.color, lineHeight: 1, flexShrink: 0,
                      }}>{a.num}</span>
                      <div>
                        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: C.white, margin: '0 0 8px' }}>
                          {a.title}
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.6, margin: 0 }}>
                          {a.body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {tab === 2 && (
              <div style={{ display: 'flex', gap: 32 }}>
                {/* Left — Grants */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: C.white, margin: '0 0 16px' }}>
                    Equity-Free Grants Available
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {GRANTS.map(g => (
                      <div key={g.name} style={{
                        background: C.surface, border: `1px solid ${C.border}`,
                        borderRadius: 10, padding: 16,
                      }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{ fontSize: 20 }}>{g.icon}</span>
                          <div>
                            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: C.white }}>{g.name}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.tealVib, margin: '3px 0' }}>{g.amount}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.muted }}>{g.for}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.faint, marginTop: 4 }}>Status: {g.status}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Patents */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: C.white, margin: '0 0 4px' }}>
                    Our IP Pipeline
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, margin: '0 0 16px' }}>
                    Filing order: DIPP recognition first → then PCT
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {PATENTS.map(p => (
                      <div key={p.num} style={{
                        background: C.surface, border: `1px solid ${C.border}`,
                        borderLeft: `3px solid ${C.gold}`, borderRadius: 10, padding: 16,
                      }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{
                            background: 'rgba(245,158,11,0.15)', color: C.gold,
                            fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                            padding: '2px 8px', borderRadius: 4, flexShrink: 0,
                          }}>{p.num}</span>
                          <div>
                            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, color: C.white, marginBottom: 4 }}>{p.title}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{p.desc}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#FBB024', marginTop: 6 }}>⏳ Filing after DIPP</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
