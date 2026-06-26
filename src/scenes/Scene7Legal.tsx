import { motion } from 'framer-motion';
import { C } from '../tokens';

interface SceneProps { onNext: () => void; onPrev: () => void; }

const daysLeft = Math.max(0, Math.ceil(
  (new Date('2026-07-13').getTime() - new Date().getTime()) / 86400000
));

const TIMELINE = [
  {
    done: true,
    icon: '✅',
    title: 'SPICe+ Part A — Name Reserved',
    sub: '"NEURALIFE EDTECH PRIVATE LIMITED"',
    detail: 'SRN: AC3987257 · Approved: 23 June 2026\nApproved by CRC Manesar, MCA',
  },
  {
    done: true,
    icon: '✅',
    title: 'Domain Registration',
    sub: 'neuralife.in — registered and deployed',
    detail: 'neuralife.in is live with marketing site + school admin',
  },
  {
    done: true,
    icon: '✅',
    title: 'Digital Signature Certificate (DSC)',
    sub: 'DSC issued for both directors',
    detail: 'Required for Part B filing',
  },
  {
    done: false,
    critical: true,
    icon: '⏳',
    title: 'SPICe+ Part B — Certificate of Incorporation',
    sub: `CRITICAL: Deadline 13 July 2026 — ${daysLeft} days remaining`,
    detail: 'Gates: bank account, GST, DIPP, patents, all contracts',
  },
  {
    done: false,
    icon: '⏳',
    title: 'GST Registration',
    sub: 'Unlocks after Certificate of Incorporation',
    detail: 'Required for: invoicing schools, B2B contracts',
  },
  {
    done: false,
    icon: '⏳',
    title: 'Company Bank Account',
    sub: 'Unlocks after CoI',
    detail: 'Required for: receiving payments, grants, investments',
  },
  {
    done: false,
    icon: '⏳',
    title: 'Trademark Registration',
    sub: 'Application not yet filed',
    detail: 'Protecting: NeuraLife, NeuraPad, NeuraOS wordmarks\nTimeline: file with CoI simultaneously',
  },
  {
    done: false,
    icon: '⏳',
    title: 'DIPP Startup India Recognition',
    sub: 'Unlocks after GST + CoI',
    detail: 'Enables: tax benefits, patent fee discounts (80% off),\nfast-track processing, grant eligibility',
  },
  {
    done: false,
    icon: '⏳',
    title: 'Patent Filings (4)',
    sub: 'After DIPP recognition',
    detail: 'HWR-1 · NeuraSync · EMR Stroke AI · SCERT Architecture\nIndia filing + PCT international application',
  },
];

const LOCKED = [
  '🔒 Company bank account',
  '🔒 GST registration',
  '🔒 DIPP Startup India recognition',
  '🔒 Patent filings (4 innovations ready)',
  '🔒 Legal contracts with schools',
  '🔒 Equity-free grant applications',
];

export default function Scene7Legal({ onNext: _onNext }: SceneProps) {
  return (
    <div style={{ width: '100%', height: '100%', background: C.dark, display: 'flex', overflow: 'hidden' }}>
      {/* LEFT — Timeline */}
      <div style={{ flex: '0 0 58%', padding: '28px 32px', overflowY: 'auto', borderRight: `1px solid ${C.border}` }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 8px' }}>
          LEGAL FOUNDATION
        </p>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 32, color: C.white, margin: '0 0 6px' }}>
          Legal Foundation
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, margin: '0 0 28px' }}>
          Where we are. What's left. What's urgent.
        </p>

        <div style={{ position: 'relative' }}>
          {TIMELINE.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{ display: 'flex', gap: 16, marginBottom: 16, position: 'relative' }}>
              {/* Line */}
              {i < TIMELINE.length - 1 && (
                <div style={{
                  position: 'absolute', left: 16, top: 34, width: 2, height: 'calc(100% + 8px)',
                  background: item.done ? '#34D399' : 'rgba(251,176,36,0.3)',
                  borderStyle: item.done ? 'solid' : 'dashed',
                }}/>
              )}
              {/* Circle */}
              <div style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: item.done ? 'rgba(52,211,153,0.15)' : 'rgba(251,176,36,0.08)',
                border: `2px solid ${item.done ? '#34D399' : '#FBB024'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, position: 'relative', zIndex: 1,
              }}>
                {item.icon}
                {(item as { critical?: boolean }).critical && (
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.3, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      position: 'absolute', inset: -4,
                      borderRadius: '50%', border: '2px solid #F87171',
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                background: (item as { critical?: boolean }).critical ? 'rgba(248,113,113,0.06)' : 'transparent',
                border: (item as { critical?: boolean }).critical ? '1px solid rgba(248,113,113,0.2)' : 'none',
                borderRadius: 10, padding: (item as { critical?: boolean }).critical ? '12px 16px' : '4px 0',
              }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
                  color: (item as { critical?: boolean }).critical ? '#F87171' : (item.done ? '#34D399' : C.white) }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12,
                  color: (item as { critical?: boolean }).critical ? 'rgba(248,113,113,0.9)' : C.muted, marginTop: 2 }}>
                  {item.sub}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.faint,
                  marginTop: 4, whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                  {item.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT — Urgency panel */}
      <div style={{ flex: 1, padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        {/* Countdown card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'rgba(248,113,113,0.08)',
            border: '1px solid rgba(248,113,113,0.3)',
            borderRadius: 20, padding: '28px 24px',
          }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
            color: C.danger, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>
            ⚠️ CRITICAL DEADLINE
          </p>

          <motion.div
            animate={{ color: ['#F87171', '#ff4444', '#F87171'] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 88,
              lineHeight: 1, color: C.danger }}>
              {daysLeft}
            </div>
          </motion.div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: '4px 0 16px' }}>
            days until name reservation expires
          </p>

          <div style={{ borderTop: `1px solid rgba(248,113,113,0.2)`, paddingTop: 16, marginTop: 4 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: C.white, margin: '0 0 10px' }}>
              If Part B is not filed by July 13:
            </p>
            {[
              '→ NEURALIFE EDTECH PRIVATE LIMITED name is forfeited',
              '→ Anyone can register the name',
              '→ SPICe+ Part A must be re-filed from scratch',
            ].map(line => (
              <div key={line} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13,
                color: C.danger, marginBottom: 6 }}>{line}</div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid rgba(248,113,113,0.2)`, paddingTop: 16, marginTop: 12 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
              color: C.tealVib, margin: '0 0 8px' }}>
              Next action required:
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
              Engage a CA for Part B filing today.<br/>
              RTIH may have partner CAs — ask during SPARK.
            </p>
          </div>
        </motion.div>

        {/* What Part B unlocks */}
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 14, padding: 20,
        }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
            color: C.muted, margin: '0 0 14px' }}>
            What Part B unlocks:
          </p>
          {LOCKED.map(item => (
            <div key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13,
              color: C.faint, marginBottom: 8, opacity: 0.7 }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
