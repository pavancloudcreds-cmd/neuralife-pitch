import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C } from '../tokens';
import StatusBadge from '../components/StatusBadge';

interface SceneProps { onNext: () => void; onPrev: () => void; }

type ModelStatus = 'done' | 'building';

interface ModelCard {
  id: string;
  status: ModelStatus;
  detail: string;
}

interface Milestone {
  label: string;
  headline: string;
  schools: string;
  models: ModelCard[];
  market: string;
  impact: string;
}

const SIX: Milestone = {
  label: '6 Months', headline: 'From prototype to pilot.',
  schools: '3 pilot schools · 500 students',
  models: [
    { id: 'HWR-1-S',    status: 'done', detail: '85%+ accuracy on Telugu + English\nOn-device, offline, <10ms inference' },
    { id: 'GAP-1',      status: 'done', detail: 'Live gap detection in 3 schools\nFeeding teacher dashboards daily' },
    { id: 'HDE',        status: 'done', detail: 'Contextual hints during writing\nFirst version: 12 hint templates' },
    { id: 'CNN-GRU-CTC',status: 'done', detail: 'NPU-optimized, deployed on SmartPad\n8MB INT8 · 2.1M parameters' },
  ],
  market: 'First 500 students. First 500,000 handwriting samples.',
  impact: 'Proof: AI works. Data flywheel starts spinning.',
};

const TWELVE: Milestone = {
  label: '12 Months', headline: 'Three curricula. Expanding.',
  schools: '20 schools · 5,000 students',
  models: [
    { id: 'HWR-1-F',    status: 'done',     detail: 'Foundation variant (Class 1-5)\nLetter formation + tracing analysis' },
    { id: 'HWR-1-E',    status: 'done',     detail: 'English specialist variant\nCursive + print + mixed recognition' },
    { id: 'WSS-1',      status: 'done',     detail: 'Writing Skill Scoring model\nFeeds weekly teacher performance reports' },
    { id: 'SHE-1',      status: 'done',     detail: 'Study Habit Engine\nPredicts at-risk students 3 weeks early' },
    { id: 'Content Gen',status: 'done',     detail: 'Claude API generating all 10 segments\nFull SCERT AP curriculum covered' },
  ],
  market: '5 million handwriting samples.\nNo competitor has this data.',
  impact: 'Three AI model variants. CBSE expansion begins.',
};

const EIGHTEEN: Milestone = {
  label: '18 Months', headline: 'The dataset nobody can build.',
  schools: '100+ schools · 25,000+ students',
  models: [
    { id: 'NeuraLife Tutor', status: 'done',     detail: 'Claude chat on SmartPad\nContext-aware tutoring, <₹0.05/query' },
    { id: 'Regional LM',    status: 'building', detail: 'Telugu → Tamil → Kannada → Hindi\nRegional language expansion roadmap' },
    { id: 'Exam AI',        status: 'building', detail: 'Exam performance prediction\n3-week early warning for SA1/SA2' },
    { id: 'Teacher AI',     status: 'building', detail: 'Teacher performance insights\nLesson effectiveness scoring' },
  ],
  market: '25M+ handwriting samples across 4 Indian scripts.\nDataset worth more than the software.',
  impact: '₹7.5B Indian EdTech AI market.\nNeuraLife owns the school-grade handwriting segment.',
};

const ALL_MILESTONES = [SIX, TWELVE, EIGHTEEN];

function MilestoneView({ m }: { m: Milestone }) {
  return (
    <motion.div key={m.label}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 32, color: C.white, margin: 0 }}>
          {m.headline}
        </h2>
        <span style={{
          background: C.tealLight, color: C.tealVib,
          fontFamily: "'Inter', sans-serif", fontSize: 13,
          padding: '4px 12px', borderRadius: 100,
        }}>
          {m.schools}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, flex: 1 }}>
        {m.models.map((mod, i) => (
          <motion.div key={mod.id}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: 16,
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{
                background: 'rgba(13,148,136,0.2)', color: C.tealVib,
                fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                padding: '2px 8px', borderRadius: 4,
              }}>{mod.id}</span>
              <StatusBadge label={mod.status === 'done' ? 'Live' : 'Building'} type={mod.status === 'done' ? 'done' : 'building'} />
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted,
              lineHeight: 1.7, whiteSpace: 'pre-line', margin: 0 }}>
              {mod.detail}
            </p>
          </motion.div>
        ))}
      </div>
      <div style={{
        marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted,
          fontStyle: 'italic', margin: 0, whiteSpace: 'pre-line' }}>
          {m.market}
        </p>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
          color: C.tealVib, margin: 0, textAlign: 'right', maxWidth: 300 }}>
          {m.impact}
        </p>
      </div>
    </motion.div>
  );
}

function AllModelsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ overflow: 'auto', maxHeight: '100%' }}>
      {/* Timeline */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, position: 'relative' }}>
        {ALL_MILESTONES.map((m, i) => (
          <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: C.tealVib }}>
              {m.label}
            </div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.tealVib, margin: '8px 0' }}/>
            {i < 2 && (
              <div style={{
                position: 'absolute',
                left: `${(i + 1) * 33.33}%`, top: 28,
                width: '33.33%', height: 2,
                background: `linear-gradient(90deg, ${C.tealVib}, ${C.tealVib})`,
              }}/>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        {ALL_MILESTONES.map((m) => (
          <div key={m.label} style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.muted,
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              {m.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {m.models.map(mod => (
                <div key={mod.id} style={{
                  background: C.surface, border: `1px solid ${C.border}`,
                  borderRadius: 8, padding: '10px 12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{
                      background: 'rgba(13,148,136,0.2)', color: C.tealVib,
                      fontFamily: 'monospace', fontSize: 10, fontWeight: 700,
                      padding: '1px 6px', borderRadius: 4,
                    }}>{mod.id}</span>
                    <StatusBadge label={mod.status === 'done' ? 'Live' : 'Building'} type={mod.status === 'done' ? 'done' : 'building'} />
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.muted,
                    whiteSpace: 'pre-line', margin: 0, lineHeight: 1.5 }}>
                    {mod.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const TABS = ['6 Months', '12 Months', '18 Months', 'All Models'];

export default function Scene3Roadmap({ onNext: _onNext }: SceneProps) {
  const [tab, setTab] = useState(0);

  const milestones = [SIX, TWELVE, EIGHTEEN];

  return (
    <div style={{ width: '100%', height: '100%', background: C.dark, display: 'flex', flexDirection: 'column', padding: '28px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 8px' }}>
          ROADMAP
        </p>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 38, color: C.white, margin: 0 }}>
          The AI build. Step by step.
        </h1>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            padding: '8px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600,
            background: tab === i ? C.tealVib : C.surface,
            color: tab === i ? 'white' : C.muted,
            transition: 'all 0.2s',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab} style={{ height: '100%' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {tab < 3 ? <MilestoneView m={milestones[tab]} /> : <AllModelsView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
