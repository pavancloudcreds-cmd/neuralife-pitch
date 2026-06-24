import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Particles from '../../../components/shared/Particles';
import { SV } from '../tokens';

const steps = [
  { time: '00–02', label: 'Introduction',        desc: "Who we are & why we're here" },
  { time: '02–12', label: 'Discovery',            desc: 'Your world, your pain points' },
  { time: '12–24', label: 'Targeted Demo',        desc: 'Only what matches your needs' },
  { time: '24–28', label: 'Your School',          desc: 'What changes from Monday' },
  { time: '28–30', label: 'Stay Connected',       desc: 'Interest capture & contact' },
];

const facts = [
  { icon: '🏢', text: 'Registered under MCA SPICe+ — SRN: AC3987257' },
  { icon: '📍', text: 'Based in Rajamahendravaram, AP' },
  { icon: '🤝', text: 'Supported by RTIH Rajamahendravaram' },
  { icon: '🎓', text: 'SPARK 2.0 Participant — RTIH' },
];

const Section01_Intro = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      style={{ background: SV.darkBg, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      <Particles />

      {/* Top row */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '24px 32px', zIndex: 10,
      }}>
        <div>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 22, color: SV.teal }}>Neura</span>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 22, color: SV.gold }}>Hub</span>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
            Edtech Private Limited
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Supported by</div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#C084FC' }}>
            RATAN TATA INNOVATION HUB
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
            Rajamahendravaram, Andhra Pradesh
          </div>
        </div>
      </div>

      {/* Split bar */}
      <div style={{ position: 'absolute', top: 88, left: 0, right: 0, height: 2, display: 'flex', zIndex: 10 }}>
        <div style={{ flex: 1, background: SV.teal }} />
        <div style={{ flex: 1, background: SV.rtihPurple }} />
      </div>

      {/* Center content */}
      <div style={{
        position: 'relative', zIndex: 10, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '110px 32px 64px', textAlign: 'center',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 14 }}
        >
          School Visit — 30-Minute Guided Conversation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 50,
            color: '#fff', margin: 0, lineHeight: 1.15 }}
        >
          We are a startup from Rajahmundry.<br />
          <span style={{ color: SV.teal }}>Building for schools like yours.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.65)',
            maxWidth: 600, lineHeight: 1.7, marginTop: 16, marginBottom: 40 }}
        >
          NeuraHub Edtech is building NeuraLife — an AI-powered school management system designed
          for SCERT AP and Telangana schools. We are not here to sell anything today.
          We are here to understand your school first.
        </motion.p>

        {/* Fact chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}
        >
          {facts.map(f => (
            <span key={f.text} style={{
              background: 'rgba(11,110,110,0.2)', border: '1px solid rgba(11,110,110,0.4)',
              color: '#5EEAD4', fontFamily: 'Inter, sans-serif', fontSize: 13,
              borderRadius: 100, padding: '7px 16px',
            }}>
              {f.icon} {f.text}
            </span>
          ))}
        </motion.div>

        {/* 30-min timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          style={{ width: '100%', maxWidth: 760 }}
        >
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12,
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
            letterSpacing: '1.5px', marginBottom: 16 }}>
            How we'll use our 30 minutes
          </div>
          <div style={{ display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)' }}>
            {steps.map((s, i) => (
              <div key={s.label} style={{
                flex: 1,
                background: i === 0 ? 'rgba(11,110,110,0.25)' : 'rgba(255,255,255,0.04)',
                borderRight: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                padding: '14px 12px',
                textAlign: 'left',
              }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                  fontSize: 11, color: SV.teal, marginBottom: 4 }}>{s.time}</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600,
                  fontSize: 13, color: '#fff', marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11,
                  color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: 32, fontFamily: 'Inter, sans-serif',
            fontSize: 13, color: 'rgba(255,255,255,0.3)' }}
        >
          Scroll to continue ↓
        </motion.div>
      </div>
    </section>
  );
});

Section01_Intro.displayName = 'Section01_Intro';
export default Section01_Intro;
