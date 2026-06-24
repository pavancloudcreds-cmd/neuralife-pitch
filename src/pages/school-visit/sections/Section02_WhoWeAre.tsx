import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

const chips = [
  { icon: '🏢', text: 'Registered under MCA SPICe+ — SRN: AC3987257' },
  { icon: '📍', text: 'Based in Rajamahendravaram, AP' },
  { icon: '🤝', text: 'Supported by RTIH Rajamahendravaram' },
];

const contactRows = [
  { icon: '📱', text: '+91 91824 42102' },
  { icon: '🔗', text: 'in/pavankumar19992208' },
  { icon: '🎓', text: 'SPARK 2.0 Participant — RTIH' },
];

export default function Section02_WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SVSection id="who-we-are" theme="light">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel number="01" title="Who We Are" />

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left */}
          <div style={{ flex: '1.2 1 320px' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 38,
              color: SV.textPrimary,
              margin: 0,
              lineHeight: 1.2,
            }}>
              We are a registered startup<br />from Rajahmundry.
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 17,
              color: SV.textSecondary,
              lineHeight: 1.7,
              marginTop: 16,
            }}>
              NeuraHub Edtech Private Limited is building NeuraLife — an AI-powered school management
              system designed specifically for Indian schools, starting with the SCERT AP and Telangana
              curriculum. We are not a generic software company. We are building this for schools like yours.
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              {chips.map(c => (
                <span key={c.text} style={{
                  background: SV.tealLight,
                  color: SV.teal,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  borderRadius: 100,
                  padding: '8px 16px',
                }}>
                  {c.icon} {c.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Founder card */}
          <div style={{
            flex: '0.8 1 260px',
            background: '#fff',
            border: `1px solid ${SV.border}`,
            borderRadius: 16,
            padding: 28,
            borderLeft: `4px solid ${SV.teal}`,
          }}>
            {/* Avatar */}
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: SV.tealLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 22,
              color: SV.teal,
            }}>
              PK
            </div>

            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 20,
              color: SV.textPrimary,
              marginTop: 12,
            }}>
              Pavan Kumar
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: SV.textSecondary }}>
              Founder, NeuraHub Edtech
            </div>

            <div style={{ borderBottom: `1px solid ${SV.divider}`, margin: '16px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {contactRows.map(r => (
                <div key={r.text} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: SV.textSecondary }}>
                  {r.icon} {r.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SVSection>
  );
}
