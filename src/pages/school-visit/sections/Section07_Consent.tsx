import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

// TODO: Replace with actual Google Form URL before first visit
// Format: https://docs.google.com/forms/d/e/FORM_ID/viewform
const FORM_URL = '';

export default function Section07_Consent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SVSection id="consent" theme="light">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>

        <SectionLabel number="06" title="Stay Connected" />

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* LEFT — what you're signing up for */}
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 32,
              color: SV.textPrimary, margin: '0 0 14px', lineHeight: 1.2 }}>
              Would you like to know<br />what we build next?
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: SV.textSecondary,
              lineHeight: 1.7, margin: '0 0 24px' }}>
              If today's conversation was useful — and you'd like to follow our progress or be considered
              as one of our first pilot schools — fill in the form. It takes two minutes.
            </p>

            <div style={{ borderBottom: `1px solid ${SV.divider}`, marginBottom: 20 }} />

            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14,
              color: SV.textPrimary, marginBottom: 10 }}>
              By filling the form:
            </div>
            {[
              "✓ We'll share product updates as we build",
              '✓ We may reach out for a short follow-up',
              '✓ You can withdraw interest at any time',
            ].map(t => (
              <div key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: SV.textSecondary, marginBottom: 6 }}>{t}</div>
            ))}
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: SV.textMuted,
              fontStyle: 'italic', marginTop: 10 }}>
              Not a binding commitment. An expression of interest only.
            </p>

            {/* RTIH card */}
            <div style={{ background: SV.rtihLight, border: `1px solid ${SV.rtihPurple}33`,
              borderRadius: 10, padding: 16, marginTop: 24 }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13,
                color: SV.rtihPurple, marginBottom: 6 }}>🤝 Supported by RTIH Rajamahendravaram</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: SV.rtihPurple,
                lineHeight: 1.6 }}>
                Your contact details are used only by NeuraHub Edtech Private Limited
                and are not shared with third parties.
              </div>
            </div>

            {/* Founder contact */}
            <div style={{ background: SV.tealLight, border: `1px solid ${SV.teal}33`,
              borderRadius: 10, padding: 16, marginTop: 12 }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13,
                color: SV.teal, marginBottom: 6 }}>📞 Or call directly</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: SV.textPrimary,
                fontWeight: 600 }}>Pavan Kumar — +91 91824 42102</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: SV.textSecondary,
                marginTop: 3 }}>Founder, NeuraHub Edtech Private Limited</div>
            </div>
          </div>

          {/* RIGHT — form CTA */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Big CTA card */}
            <div style={{ background: '#fff', border: `2px solid ${SV.teal}`,
              borderRadius: 16, padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22,
                color: SV.textPrimary, marginBottom: 8, lineHeight: 1.2 }}>
                NeuraLife School Pilot<br />Interest Form
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: SV.textSecondary,
                lineHeight: 1.6, marginBottom: 24 }}>
                Your name, school, designation, and what interests you most.
                Takes about 2 minutes. A copy goes to your email.
              </div>

              {FORM_URL ? (
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: SV.teal,
                    color: '#fff',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: 16,
                    padding: '14px 32px',
                    borderRadius: 100,
                    textDecoration: 'none',
                    letterSpacing: '0.3px',
                  }}
                >
                  Open Interest Form →
                </a>
              ) : (
                <div style={{ background: SV.divider, borderRadius: 10, padding: '14px 20px' }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14,
                    color: SV.textPrimary, marginBottom: 6 }}>Form link not yet configured</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: SV.textSecondary }}>
                    Set <code style={{ background: '#fff', padding: '1px 6px', borderRadius: 4 }}>FORM_URL</code> in{' '}
                    <code style={{ background: '#fff', padding: '1px 6px', borderRadius: 4 }}>Section07_Consent.tsx</code>
                  </div>
                </div>
              )}
            </div>

            {/* What the form asks for */}
            <div style={{ background: SV.pageBg, border: `1px solid ${SV.border}`,
              borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13,
                color: SV.textSecondary, marginBottom: 12, textTransform: 'uppercase',
                letterSpacing: '0.8px' }}>
                The form asks for
              </div>
              {[
                'Your name, designation, school name',
                'School type & board (SCERT AP / Telangana / CBSE)',
                'Mobile number & school email',
                'Which features interest you most',
                'A consent declaration (voluntary)',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 8,
                  fontFamily: 'Inter, sans-serif', fontSize: 14, color: SV.textSecondary }}>
                  <span style={{ color: SV.teal, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SVSection>
  );
}
