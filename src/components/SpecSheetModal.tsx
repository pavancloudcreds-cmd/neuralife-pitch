import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { drilldownState } from '../scenes/neurapath/drilldownState';

interface Props {
  open: boolean;
  onClose: () => void;
}

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

const BASE = import.meta.env.BASE_URL;
const SPEC_MD_URL = `${BASE}downloads/NeuraPad-SmartPad-Spec-ODM-RFQ.md`;

interface Row { label: string; value: string; }
interface Section {
  id: string;
  icon: string;
  title: string;
  status?: string;
  rows: Row[];
  note?: string;
}

const SECTIONS: Section[] = [
  {
    id: 'display', icon: '🖥️', title: '1 · Form Factor & Display',
    status: '✅ Confirmed — buildable today',
    rows: [
      { label: 'Screen size', value: '10.3" diagonal' },
      { label: 'Dimensions', value: '~240–248 × 180–182 × 6.8–8mm' },
      { label: 'Weight', value: '390–420g' },
      { label: 'Panel', value: 'E Ink Carta 1200 (or Carta 1000 equiv.)' },
      { label: 'Resolution', value: '1404×1872 · 227 PPI · 16-level grey' },
      { label: 'Refresh modes', value: 'A2 <20–26ms / GL16 ~120–250ms / GC16 700ms–1.8s' },
      { label: 'Frontlight', value: 'Warm 3000K + cool 6500K, ambient auto-adjust' },
      { label: 'Cover glass', value: 'Gorilla Glass 3 equivalent, 1mm' },
    ],
    note: 'Writing surface: AG-etched sheet (≥30% haze, ASTM D1003) + textured nib — must be physically sample-tested, not spec-verified.',
  },
  {
    id: 'processor', icon: '⚡', title: '2 · Processor, Memory, Edge AI',
    status: '✅ Confirmed — RK3566 already ships in a production E-Ink Android tablet',
    rows: [
      { label: 'SoC', value: 'Rockchip RK3566 — quad-core Cortex-A55, 1.8GHz' },
      { label: 'GPU', value: 'Mali-G52 2EE' },
      { label: 'NPU', value: '0.8–1.0 TOPS' },
      { label: 'RAM', value: '4GB LPDDR4' },
      { label: 'Storage', value: '32GB eMMC 5.1' },
      { label: 'AI budget', value: 'Max 512MB total, <200ms inference/stroke batch' },
      { label: 'Models', value: 'HWR-1 + GAP-1 at v1/v2; WSS-1 + SHE-1 added v2' },
    ],
  },
  {
    id: 'stylus', icon: '✒️', title: '3 · Stylus — EMR, Battery-Free',
    rows: [
      { label: 'Protocol', value: 'EMR — induction-powered, no battery' },
      { label: 'Form factor', value: 'Standard cylindrical pen barrel' },
      { label: 'Pressure levels', value: '4096' },
      { label: 'Tilt detection', value: '60°' },
      { label: 'Report rate', value: '200Hz' },
      { label: 'Latency', value: '14ms end-to-end' },
      { label: 'Storage', value: 'Magnetic snap-in slot, 2kg pull-force' },
    ],
    note: 'Write / Erase / Scroll mapping — Write: nib touches surface · Erase: flat rounded end touches surface (distinct EMR signature) · Scroll: barrel button held + flat end dragged. Off-the-shelf two-end pen mechanics, no new pen tooling.',
  },
  {
    id: 'power', icon: '🔋', title: '4 · Power',
    status: '✅ Battery capacity settled — resolves prior internal conflict',
    rows: [
      { label: 'Battery capacity', value: '6,200mAh (confirmed)' },
      { label: 'Target life', value: '2–3 weeks typical school use' },
      { label: 'Charging', value: 'USB-C, 18W fast charge, ~3.5hr full' },
      { label: 'Cycle rating', value: '500 full cycles to 80% capacity' },
      { label: '8-year target', value: '~10yr at 1 cycle/week — monitor in pilot' },
    ],
  },
  {
    id: 'location', icon: '📡', title: '5 · Location & Recovery — GPS + LoRa',
    rows: [
      { label: 'GNSS chip', value: 'Device coordinates · ~$1–5/unit bulk (✅ confirmed range)' },
      { label: 'LoRa transceiver', value: 'Semtech SX1262-class · ⚠️ bulk IC price needs RFQ' },
      { label: 'School gateway', value: 'Added to existing NeuraSync Hub, relays via 4G' },
      { label: 'No SIM / no cellular', value: 'Consistent with WiFi-only device architecture' },
    ],
    note: 'GNSS gives coordinates; LoRa reports them home over multi-km range without WiFi/cellular on the pad. Not unlimited range — a device far outside gateway range stays dark until back in range. Remote wipe remains the real data backstop.',
  },
  {
    id: 'camera', icon: '📷', title: '6 · Rear Camera — Note/Text Scanning',
    status: 'New capability — reverses prior "no camera" default',
    rows: [
      { label: 'Camera', value: 'Rear, autofocus, 5–8MP class (fixed-focus insufficient)' },
      { label: 'Cost', value: '⚠️ Needs vendor quote for autofocus module' },
      { label: 'OCR engine', value: 'Separate on-device OCR model (distinct from stroke-based HWR-1)' },
    ],
    note: 'Privacy: only accessible via a whitelisted "Scan Notes" flow, no gallery exposed, images processed on-device and not retained long-term — mirrors the 24-hour raw-stroke purge pattern.',
  },
  {
    id: 'chassis', icon: '🛡️', title: '8 · Chassis, Durability, Ports',
    rows: [
      { label: 'Build', value: 'PC + glass-fibre back, 6000-series aluminium frame' },
      { label: 'Drop rating', value: 'MIL-STD-810G, 1.2–1.5m' },
      { label: 'Ingress', value: 'IP52' },
      { label: 'Ports', value: 'USB-C (10,000 insertion cycles) · no SD · no SIM tray' },
    ],
  },
  {
    id: 'bsp', icon: '🧩', title: '9 · Software / BSP Requirement',
    rows: [
      { label: 'Hard requirement', value: 'BSP with working E-Ink display driver + digitizer HAL for Android' },
      { label: 'Access', value: 'Unlocked bootloader, fastboot/ADB, BSP source for our own AOSP build' },
      { label: 'Our build scope', value: 'App layer only — launcher, kiosk lockdown, Edge AI runtime, sync agent' },
    ],
  },
  {
    id: 'consumables', icon: '🖊️', title: '11 · Stylus Tip Consumables',
    rows: [
      { label: 'In-box', value: '3–5 spare tips shipped with every unit' },
      { label: 'Reorder', value: '"Order Consumables" flow in Web Admin Console' },
      { label: 'Pricing', value: '⚠️ Bulk per-tip cost + MOQ needed from ODM' },
    ],
  },
  {
    id: 'rma', icon: '🔧', title: '12 · RMA / Warranty Logistics',
    rows: [
      { label: 'Key question', value: 'India-based repair path, or China-only RMA?' },
      { label: 'Turnaround', value: 'Average time per path?' },
      { label: 'Warranty', value: 'What’s covered under standard 1-year vs. chargeable?' },
      { label: 'Spares kit', value: 'Bulk spare-parts kit for digitizer / battery / USB-C port?' },
    ],
  },
];

const CHECKLIST = [
  'Datasheet for 10.3" RK3566 E-Paper reference design',
  'Unlocked bootloader + BSP source access for evaluation units',
  'Working E-Ink display driver + digitizer HAL already in BSP',
  'Proforma Invoice — 5 evaluation units, Air Express to Hyderabad',
  'Tiered bulk pricing: 5 / 500 / 5,000 / 25,000 units',
  'NRE/tooling cost broken out separately from per-unit cost',
  'Sample-cost credit against future production order, in writing',
  'AG/matte texture samples for physical hands-on evaluation',
  'LoRa module integration feasibility + bulk unit cost',
  'Autofocus rear camera module option + bulk unit cost',
  'Stylus replacement tip bulk pricing and MOQ',
  'RMA/repair process — India-based path or China-only?',
  'BIS/CRO compliance support history for prior India clients',
];

export default function SpecSheetModal({ open, onClose }: Props) {
  useEffect(() => {
    drilldownState.active = open;
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      drilldownState.active = false;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(10,14,26,0.72)',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '4vh 3vw',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 1080, maxHeight: '92vh',
              background: T.bg, borderRadius: 18,
              boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              flexShrink: 0, padding: '22px 28px 18px',
              borderBottom: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              background: `linear-gradient(135deg, ${T.tealLight} 0%, #FFFFFF 60%)`,
            }}>
              <div>
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase', color: T.tealVib,
                  marginBottom: 6,
                }}>Hardware Specification &amp; ODM RFQ · v1.1</div>
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 24,
                  color: T.txt, letterSpacing: '-0.02em',
                }}>NeuraPad SmartPad — Full Spec Sheet</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: T.txt2, marginTop: 6,
                }}>
                  5 evaluation units → pilot batch → 500+ unit production run · target bulk price under ₹12,000/unit
                </div>
              </div>
              <button onClick={onClose} aria-label="Close" style={{
                flexShrink: 0, width: 34, height: 34, borderRadius: 10,
                border: `1px solid ${T.border}`, background: '#FFFFFF',
                color: T.txt2, fontSize: 18, cursor: 'pointer', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
              {/* Company reference strip */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '6px 20px',
                background: T.side, border: `1px solid ${T.border}`, borderRadius: 10,
                padding: '12px 16px', marginBottom: 18,
                fontFamily: "'Inter', sans-serif", fontSize: 11.5, color: T.txt2,
              }}>
                <span><strong style={{ color: T.txt }}>NeuraLife Edtech Pvt. Ltd.</strong> · CIN U58200AP2026PTC127009</span>
                <span>Ship-to: Jubilee Hills, Hyderabad, Telangana – 500034</span>
                <span>pavankumar@neuralife.in · +91 91824 42102</span>
              </div>

              {/* Section grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 14, marginBottom: 20,
              }}>
                {SECTIONS.map(s => (
                  <div key={s.id} style={{
                    border: `1px solid ${T.border}`, borderRadius: 12,
                    borderTop: `3px solid ${T.tealVib}`, padding: '14px 16px',
                    background: '#FFFFFF',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 15 }}>{s.icon}</span>
                      <span style={{
                        fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: T.txt,
                      }}>{s.title}</span>
                    </div>
                    {s.status && (
                      <div style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 10.5, color: T.tealVib,
                        fontWeight: 600, marginBottom: 8,
                      }}>{s.status}</div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: s.status ? 0 : 8 }}>
                      {s.rows.map(r => (
                        <div key={r.label} style={{
                          display: 'flex', justifyContent: 'space-between', gap: 12,
                          fontFamily: "'Inter', sans-serif", fontSize: 11.5,
                          padding: '3px 0', borderBottom: `1px dashed ${T.border}`,
                        }}>
                          <span style={{ color: T.txt3, flexShrink: 0 }}>{r.label}</span>
                          <span style={{ color: T.txt2, textAlign: 'right' }}>{r.value}</span>
                        </div>
                      ))}
                    </div>
                    {s.note && (
                      <div style={{
                        marginTop: 10, fontFamily: "'Inter', sans-serif", fontSize: 11,
                        color: T.txt2, lineHeight: 1.6, background: T.side,
                        borderRadius: 8, padding: '8px 10px',
                      }}>{s.note}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* RFQ Checklist */}
              <div style={{
                border: `1px solid ${T.border}`, borderRadius: 12,
                borderTop: `3px solid ${T.gold}`, padding: '14px 18px 16px',
                background: T.goldLight,
              }}>
                <div style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13,
                  color: T.gold, marginBottom: 10,
                }}>13 · RFQ Checklist — What We're Asking Every ODM</div>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  columnGap: 20, rowGap: 6,
                }}>
                  {CHECKLIST.map(item => (
                    <div key={item} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 7,
                      fontFamily: "'Inter', sans-serif", fontSize: 11.5, color: T.txt2, lineHeight: 1.5,
                    }}>
                      <span style={{ color: T.gold, flexShrink: 0, marginTop: 1 }}>☐</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              flexShrink: 0, padding: '14px 28px', borderTop: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: T.side,
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: T.txt3 }}>
                Document v1.1 · Draft for ODM outreach
              </span>
              <a
                href={SPEC_MD_URL}
                download="NeuraPad-SmartPad-Spec-ODM-RFQ.md"
                style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 12.5,
                  color: '#FFFFFF', background: T.tealVib, textDecoration: 'none',
                  borderRadius: 8, padding: '9px 18px', display: 'inline-flex',
                  alignItems: 'center', gap: 6,
                }}
              >⬇ Download Full Spec (.md)</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
