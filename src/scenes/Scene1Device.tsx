import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C } from '../tokens';

interface SceneProps { onNext: () => void; onPrev: () => void; }

const SPECS = [
  {
    label: 'Display', icon: '🖥️', highlight: 'E-Ink Carta HD',
    detail: '10.3" · 227 DPI · 1404×1872\nPaper-like surface · Zero blue light\nFully readable in direct sunlight\nA2 / GL16 / GC16 refresh modes',
  },
  {
    label: 'Stylus (EMR)', icon: '✒️', highlight: '4096 pressure levels',
    detail: '200Hz report rate\nTilt + azimuth sensing\nNo battery — powered by pad\nNever runs out. Never needs charging.',
  },
  {
    label: 'Processor', icon: '⚡', highlight: 'ARM Cortex-A55',
    detail: 'Quad-core 2.0GHz\n4 GB LPDDR4 RAM\n32 GB eMMC storage\nAI models: 120 MB reserved',
  },
  {
    label: 'Connectivity', icon: '📡', highlight: 'WiFi Only — by design',
    detail: 'No cellular. No distraction.\n802.11ac WiFi · BLE 5.0\nGPS fleet tracking\nUSB-C · Pogo pin dock',
  },
  {
    label: 'AI Engine', icon: '🧠', highlight: 'On-device inference',
    detail: 'HWR-1-S: handwriting recognition\nGAP-1: gap analysis\nHDE: intelligent hint engine\nAll runs offline. No cloud needed.',
  },
  {
    label: 'Battery', icon: '🔋', highlight: '2–3 weeks typical use',
    detail: 'E-Ink uses power only when\ndisplay changes — not while static\nFull school day on 2% battery\nOTA updates at 2 AM silently',
  },
  {
    label: 'Build', icon: '🛡️', highlight: 'Military-grade durability',
    detail: 'Anthracite aluminum chassis\nTPU hexagonal corner bumpers\nMatte nano-texture surface\nDrop tested · 360g weight',
  },
];

const AI_MODELS = [
  {
    id: 'HWR-1', label: 'HWR-1', fullName: 'Handwriting Recognition', color: '#0d9488',
    detail: 'Reads Telugu + English handwriting\nin real-time as the student writes.\nTrains on real classroom data daily.\nAccuracy improves every week.',
  },
  {
    id: 'GAP-1', label: 'GAP-1', fullName: 'Gap Analysis', color: '#F59E0B',
    detail: "Identifies exactly which concept\nthe student doesn't understand.\nNot what they got wrong —\nWHY they got it wrong.",
  },
  {
    id: 'HDE', label: 'HDE', fullName: 'Hint Delivery Engine', color: '#A78BFA',
    detail: 'Delivers the right hint at\nthe right moment.\nNot the answer — the nudge\nthat builds real understanding.',
  },
  {
    id: 'CNN-GRU', label: 'CNN-GRU-CTC', fullName: 'On-device OCR Model', color: '#60A5FA',
    detail: '2.1M parameters · 8MB INT8\n<10ms on RK3566 NPU\nWorks completely offline\nBuilt specifically for Indian scripts.',
  },
];

type ViewTab = 'combined' | 'front' | 'back';

const BASE = import.meta.env.BASE_URL;

const VIEW_TABS: { id: ViewTab; label: string; img: string }[] = [
  { id: 'combined', label: 'Overview',   img: `${BASE}assets/neurapad-combined.png` },
  { id: 'front',    label: 'Front',      img: `${BASE}assets/neurapad-front.png` },
  { id: 'back',     label: 'Back',       img: `${BASE}assets/neurapad-back.png` },
];

export default function Scene1Device({ onNext: _onNext }: SceneProps) {
  const [activeSpec, setActiveSpec] = useState(0);
  const [activeModel, setActiveModel] = useState(0);
  const [view, setView] = useState<ViewTab>('combined');

  const model = AI_MODELS[activeModel];
  const spec = SPECS[activeSpec];
  const currentView = VIEW_TABS.find(v => v.id === view)!;

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: C.dark, overflow: 'hidden',
    }}>

      {/* ── LEFT — Hardware Specs ── */}
      <div style={{
        width: '20%', height: '100%',
        borderRight: `1px solid rgba(255,255,255,0.06)`,
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 11, color: C.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          padding: '24px 20px 12px', margin: 0,
        }}>Hardware Specs</p>

        {SPECS.map((s, i) => (
          <button key={s.label} onClick={() => setActiveSpec(i)} style={{
            width: '100%', textAlign: 'left', background: 'none', border: 'none',
            borderLeft: `3px solid ${i === activeSpec ? C.tealVib : 'transparent'}`,
            cursor: 'pointer', padding: '10px 20px',
            backgroundColor: i === activeSpec ? C.tealLight : 'transparent',
            transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: C.white, fontWeight: 500 }}>
                  {s.label}
                </div>
                {i === activeSpec && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.tealVib, marginTop: 2 }}>
                    {s.highlight}
                  </motion.div>
                )}
              </div>
            </div>
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <AnimatePresence mode="wait">
          <motion.div key={activeSpec}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            style={{
              margin: '0 16px 16px',
              background: 'rgba(11,110,110,0.08)',
              border: '1px solid rgba(11,110,110,0.2)',
              borderRadius: 10, padding: 12,
            }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: C.gold, fontWeight: 600, marginBottom: 6 }}>
              {spec.highlight}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12,
              color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, whiteSpace: 'pre-line',
            }}>
              {spec.detail}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CENTER — Image Viewer ── */}
      <div style={{ width: '60%', height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 24px 12px', flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: C.white }}>
              NeuraPad SmartPad
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, marginTop: 2 }}>
              Purpose-built for Indian students
            </div>
          </div>

          {/* View tab pills */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.06)',
            borderRadius: 20, padding: 4, gap: 2,
          }}>
            {VIEW_TABS.map(t => (
              <button key={t.id} onClick={() => setView(t.id)} style={{
                padding: '6px 18px', borderRadius: 16, border: 'none', cursor: 'pointer',
                background: view === t.id ? C.tealVib : 'transparent',
                color: view === t.id ? '#fff' : C.muted,
                fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 600,
                transition: 'all 0.2s',
              }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image fills remaining space */}
        <div style={{
          flex: 1, minHeight: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: view === 'combined' ? '8px 12px 16px' : '8px 24px 16px',
        }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={view}
              src={currentView.img}
              alt={`NeuraPad ${view}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 12px 48px rgba(0,0,0,0.65))',
              }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* ── RIGHT — AI Models ── */}
      <div style={{
        width: '20%', height: '100%',
        borderLeft: `1px solid rgba(255,255,255,0.06)`,
        display: 'flex', flexDirection: 'column',
      }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 11, color: C.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          padding: '24px 20px 12px', margin: 0,
        }}>AI Models on SmartPad</p>

        {AI_MODELS.map((m, i) => (
          <button key={m.id} onClick={() => setActiveModel(i)} style={{
            width: '100%', textAlign: 'left', background: 'none', border: 'none',
            borderLeft: `3px solid ${i === activeModel ? m.color : 'transparent'}`,
            cursor: 'pointer', padding: '10px 16px',
            backgroundColor: i === activeModel ? `${m.color}1F` : 'transparent',
            transition: 'all 0.2s',
          }}>
            <span style={{
              display: 'inline-block',
              background: `${m.color}33`, color: m.color,
              fontFamily: 'monospace', fontSize: 10, fontWeight: 700,
              borderRadius: 4, padding: '2px 6px', marginBottom: 4,
            }}>{m.label}</span>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.white, fontWeight: 500 }}>
              {m.label}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.muted }}>
              {m.fullName}
            </div>
          </button>
        ))}

        <AnimatePresence mode="wait">
          <motion.div key={activeModel}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            style={{
              margin: '16px',
              background: `${model.color}14`,
              border: `1px solid ${model.color}40`,
              borderRadius: 10, padding: 16,
            }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, color: model.color, fontWeight: 600, marginBottom: 8 }}>
              {model.fullName}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13,
              color: C.muted, lineHeight: 1.7, whiteSpace: 'pre-line',
            }}>
              {model.detail}
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={{ flex: 1 }} />
        <div style={{
          margin: '0 16px 16px',
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 8, padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: C.tealVib, fontSize: 14 }}>⚡</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.muted }}>
            Running on RK3566 NPU
          </span>
        </div>
      </div>
    </div>
  );
}
