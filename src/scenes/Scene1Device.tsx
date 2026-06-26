import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SceneProps { onNext: () => void; onPrev: () => void; }

// ── Light theme tokens ───────────────────────────────────────
const T = {
  bg:        '#FFFFFF',
  side:      '#F6F7F9',
  border:    '#E8EAED',
  txt:       '#0F172A',
  txt2:      '#475569',
  txt3:      '#94A3B8',
  teal:      '#0B6E6E',
  tealVib:   '#0d9488',
  tealLight: '#E6F3F2',
  gold:      '#92400E',
  goldLight: '#FEF3C7',
} as const;

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
    id: 'HWR-1', label: 'HWR-1', fullName: 'Handwriting Recognition',
    color: '#0d9488', bg: '#E6F3F2',
    detail: 'Reads Telugu + English handwriting\nin real-time as the student writes.\nTrains on real classroom data daily.\nAccuracy improves every week.',
  },
  {
    id: 'GAP-1', label: 'GAP-1', fullName: 'Gap Analysis',
    color: '#B45309', bg: '#FEF3C7',
    detail: "Identifies exactly which concept\nthe student doesn't understand.\nNot what they got wrong —\nWHY they got it wrong.",
  },
  {
    id: 'HDE', label: 'HDE', fullName: 'Hint Delivery Engine',
    color: '#7C3AED', bg: '#EDE9FE',
    detail: 'Delivers the right hint at\nthe right moment.\nNot the answer — the nudge\nthat builds real understanding.',
  },
  {
    id: 'CNN-GRU', label: 'CNN-GRU-CTC', fullName: 'On-device OCR Model',
    color: '#1D4ED8', bg: '#EFF6FF',
    detail: '2.1M parameters · 8MB INT8\n<10ms on RK3566 NPU\nWorks completely offline\nBuilt specifically for Indian scripts.',
  },
];

const KEY_STATS = [
  { value: '10.3"', label: 'E-Ink HD'   },
  { value: '4096',  label: 'EMR Levels' },
  { value: '3 AI',  label: 'On-device'  },
  { value: '2–3wk', label: 'Battery'    },
];

type ViewTab = 'combined' | 'front' | 'back';
const BASE = import.meta.env.BASE_URL;

const VIEW_TABS: { id: ViewTab; label: string; img: string }[] = [
  { id: 'combined', label: 'Overview', img: `${BASE}assets/neurapad-combined.png` },
  { id: 'front',    label: 'Front',    img: `${BASE}assets/neurapad-front.png`    },
  { id: 'back',     label: 'Back',     img: `${BASE}assets/neurapad-back.png`     },
];

export default function Scene1Device({ onNext: _onNext }: SceneProps) {
  const [activeSpec,  setActiveSpec]  = useState(0);
  const [activeModel, setActiveModel] = useState(0);
  const [view,        setView]        = useState<ViewTab>('combined');

  const spec    = SPECS[activeSpec];
  const model   = AI_MODELS[activeModel];
  const current = VIEW_TABS.find(v => v.id === view)!;

  return (
    <>
      {/*
        Extend white behind the 60px header clearance zone in PitchDeck.tsx
        so the GoldWordmark sits on white, not the PitchDeck dark bg.
      */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60,
        background: T.bg, zIndex: 50,
        borderBottom: `1px solid ${T.border}`,
      }} />

      {/* Scene shell */}
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', background: T.bg, overflow: 'hidden',
      }}>

        {/* ── LEFT — Hardware Specs ─────────────────────────────── */}
        <div style={{
          width: '21%', height: '100%', flexShrink: 0,
          background: T.side, borderRight: `1px solid ${T.border}`,
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '18px 20px 10px' }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: T.teal,
            }}>Hardware Specs</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {SPECS.map((s, i) => (
              <button key={s.label} onClick={() => setActiveSpec(i)} style={{
                width: '100%', textAlign: 'left',
                background: i === activeSpec ? T.tealLight : 'transparent',
                border: 'none',
                borderLeft: `3px solid ${i === activeSpec ? T.tealVib : 'transparent'}`,
                cursor: 'pointer', padding: '11px 18px 11px 17px',
                transition: 'all 0.18s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16, lineHeight: 1 }}>{s.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
                      color: i === activeSpec ? T.teal : T.txt,
                    }}>{s.label}</div>
                    {i === activeSpec && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: T.tealVib, marginTop: 2 }}>
                        {s.highlight}
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeSpec}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}
              style={{
                margin: '10px 12px 14px',
                background: '#FFFFFF',
                border: `1px solid ${T.border}`,
                borderTop: `3px solid ${T.tealVib}`,
                borderRadius: 10, padding: '12px 14px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
              <div style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                fontSize: 13, color: T.teal, marginBottom: 6,
              }}>{spec.highlight}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 12,
                color: T.txt2, lineHeight: 1.75, whiteSpace: 'pre-line',
              }}>{spec.detail}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CENTER — Image Viewer ──────────────────────────────── */}
        <div style={{
          flex: 1, height: '100%', display: 'flex',
          flexDirection: 'column', background: T.bg, minWidth: 0,
        }}>
          {/* Top bar */}
          <div style={{ flexShrink: 0, padding: '14px 28px 0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 800,
                  fontSize: 26, color: T.txt, letterSpacing: '-0.02em', lineHeight: 1.1,
                }}>NeuraPad SmartPad</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 13,
                  color: T.txt3, marginTop: 4,
                }}>Purpose-built for Indian classrooms</div>
              </div>

              {/* View tabs */}
              <div style={{
                display: 'flex', background: T.side,
                border: `1px solid ${T.border}`, borderRadius: 24, padding: 3, gap: 2,
              }}>
                {VIEW_TABS.map(t => (
                  <button key={t.id} onClick={() => setView(t.id)} style={{
                    padding: '5px 16px', borderRadius: 20, border: 'none',
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: view === t.id ? T.tealVib : 'transparent',
                    color: view === t.id ? '#ffffff' : T.txt2,
                    fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 600,
                  }}>{t.label}</button>
                ))}
              </div>
            </div>

            {/* Key stat chips */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {KEY_STATS.map(s => (
                <div key={s.label} style={{
                  display: 'flex', alignItems: 'baseline', gap: 5,
                  background: T.side, border: `1px solid ${T.border}`,
                  borderRadius: 20, padding: '3px 12px',
                }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                    fontSize: 12, color: T.teal,
                  }}>{s.value}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 11, color: T.txt3,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: T.border, marginLeft: -28, marginRight: -28 }} />
          </div>

          {/* Image */}
          <div style={{
            flex: 1, minHeight: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: view === 'combined' ? '8px 12px 24px' : '8px 32px 24px',
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={view}
                src={current.img}
                alt={`NeuraPad ${view}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  maxWidth: '100%', maxHeight: '100%',
                  objectFit: 'contain', display: 'block',
                  filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.13))',
                }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT — AI Models ─────────────────────────────────── */}
        <div style={{
          width: '21%', height: '100%', flexShrink: 0,
          background: T.side, borderLeft: `1px solid ${T.border}`,
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '18px 18px 10px' }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: T.teal,
            }}>AI Models on NeuraPad</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 12px' }}>
            {AI_MODELS.map((m, i) => (
              <button key={m.id} onClick={() => setActiveModel(i)} style={{
                width: '100%', textAlign: 'left',
                background: i === activeModel ? m.bg : '#FFFFFF',
                border: `1px solid ${i === activeModel ? m.color + '55' : T.border}`,
                borderLeft: `3px solid ${i === activeModel ? m.color : 'transparent'}`,
                borderRadius: 8, cursor: 'pointer',
                padding: '10px 12px', transition: 'all 0.18s',
              }}>
                <span style={{
                  display: 'inline-block',
                  background: m.color + '22', color: m.color,
                  fontFamily: 'monospace', fontSize: 9, fontWeight: 800,
                  borderRadius: 4, padding: '2px 6px', marginBottom: 4,
                  letterSpacing: '0.06em',
                }}>{m.label}</span>
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 600,
                  fontSize: 12, color: T.txt,
                }}>{m.fullName}</div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeModel}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}
              style={{
                margin: '14px 12px 0',
                background: model.bg,
                border: `1px solid ${model.color}44`,
                borderTop: `3px solid ${model.color}`,
                borderRadius: 10, padding: '14px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
              <div style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                fontSize: 13, color: model.color, marginBottom: 8,
              }}>{model.fullName}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 12,
                color: T.txt2, lineHeight: 1.75, whiteSpace: 'pre-line',
              }}>{model.detail}</div>
            </motion.div>
          </AnimatePresence>

          <div style={{ flex: 1 }} />

          <div style={{
            margin: '0 12px 14px',
            background: '#FFFFFF', border: `1px solid ${T.border}`,
            borderRadius: 8, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: T.txt3 }}>
              Running on RK3566 NPU
            </span>
          </div>
        </div>

      </div>
    </>
  );
}
