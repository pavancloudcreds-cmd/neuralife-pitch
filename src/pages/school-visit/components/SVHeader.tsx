import { useEffect, useState } from 'react';
import { SV } from '../tokens';

interface Props {
  openingSectionRef: React.RefObject<HTMLElement | null>;
}

export default function SVHeader({ openingSectionRef }: Props) {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = openingSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setTitleVisible(!entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [openingSectionRef]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 56,
        background: '#fff',
        borderBottom: `1px solid ${SV.border}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* LEFT: brand lockup */}
      <div>
        <div style={{ lineHeight: 1 }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 18, color: SV.teal }}>Neura</span>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 18, color: SV.gold }}>Hub</span>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: SV.textMuted, marginTop: 2 }}>
          Edtech Private Limited
        </div>
      </div>

      {/* CENTER: page title — only when opening section is out of view */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: titleVisible ? 1 : 0,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: 14,
          color: SV.textSecondary,
        }}>
          School Feedback &amp; Interest Capture
        </span>
      </div>

      {/* RIGHT: RTIH co-brand */}
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: SV.textMuted }}>Supported by</div>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, color: SV.rtihPurple }}>
          RTIH Rajamahendravaram
        </div>
      </div>
    </header>
  );
}
