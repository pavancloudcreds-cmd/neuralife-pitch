import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Particles from '../../../components/shared/Particles';
import { SV } from '../tokens';

const Section01_Opening = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      style={{ background: SV.darkBg, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      <Particles />

      {/* Top row */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '24px 32px',
        zIndex: 10,
      }}>
        {/* NeuraHub logo */}
        <div>
          <div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 24, color: SV.teal }}>Neura</span>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 24, color: SV.gold }}>Hub</span>
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
            Edtech Private Limited
          </div>
        </div>

        {/* RTIH block */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Supported by</div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: '#C084FC' }}>
            RATAN TATA INNOVATION HUB
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
            Rajamahendravaram, Andhra Pradesh
          </div>
        </div>
      </div>

      {/* Split bar */}
      <div style={{
        position: 'absolute',
        top: 96,
        left: 0,
        right: 0,
        height: 2,
        display: 'flex',
        zIndex: 10,
      }}>
        <div style={{ flex: 1, background: SV.teal }} />
        <div style={{ flex: 1, background: SV.rtihPurple }} />
      </div>

      {/* Center content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 32px 80px',
        textAlign: 'center',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: 16,
          }}
        >
          School Feedback &amp; Interest Capture
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: 52,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          Thank you for your time today.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 20,
            color: 'rgba(255,255,255,0.70)',
            maxWidth: 640,
            lineHeight: 1.7,
            marginTop: 16,
          }}
        >
          We're building something for Indian schools —<br />
          starting right here in Andhra Pradesh.<br />
          We'd like to understand your school's world<br />
          before we tell you about ours.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 40,
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            color: 'rgba(255,255,255,0.35)',
          }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll to continue ↓
        </motion.div>
      </div>
    </section>
  );
});

Section01_Opening.displayName = 'Section01_Opening';
export default Section01_Opening;
