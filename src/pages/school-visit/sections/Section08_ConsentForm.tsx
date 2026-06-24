import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SVSection from '../components/SVSection';
import SectionLabel from '../components/SectionLabel';
import { SV } from '../tokens';

// TODO: Replace with actual Google Form embed URL before deploying
// Format: https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true
const FORM_EMBED_URL = '';

export default function Section08_ConsentForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SVSection id="consent-form" theme="light">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel number="07" title="Stay Connected" />

        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* LEFT */}
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 32,
              color: SV.textPrimary,
              margin: '0 0 12px',
              lineHeight: 1.2,
            }}>
              Tell us if you'd like to<br />know more.
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              color: SV.textSecondary,
              lineHeight: 1.7,
              marginTop: 12,
            }}>
              Fill in your details below if you are interested in staying updated on NeuraLife's
              progress or would like to be considered as one of our early pilot schools.
            </p>

            <div style={{ borderBottom: `1px solid ${SV.divider}`, margin: '24px 0' }} />

            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              color: SV.textPrimary,
              marginBottom: 10,
            }}>
              By submitting this form:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                '✓ We will contact you to share product updates',
                '✓ We may ask for a short follow-up conversation',
                '✓ You can withdraw interest at any time',
              ].map(line => (
                <div key={line} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: SV.textSecondary }}>
                  {line}
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: SV.textMuted,
              fontStyle: 'italic',
              marginTop: 12,
            }}>
              This is not a binding commitment. It is an expression of interest only.
            </p>

            {/* RTIH acknowledgement */}
            <div style={{
              background: SV.rtihLight,
              border: `1px solid ${SV.rtihPurple}4D`,
              borderRadius: 10,
              padding: 14,
              marginTop: 20,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: SV.rtihPurple,
              lineHeight: 1.6,
            }}>
              🤝 This initiative is supported by RTIH Rajamahendravaram. Your contact information is
              used only by NeuraHub Edtech Private Limited and is not shared with third parties.
            </div>
          </div>

          {/* RIGHT — form */}
          <div style={{ flex: '1.2 1 340px' }}>
            {FORM_EMBED_URL ? (
              <iframe
                src={FORM_EMBED_URL}
                width="100%"
                height="680"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                title="NeuraLife Interest Form"
                style={{ borderRadius: 12, border: `1px solid ${SV.border}`, display: 'block' }}
              >
                Loading form...
              </iframe>
            ) : (
              <div style={{
                border: `2px dashed ${SV.border}`,
                borderRadius: 12,
                padding: 40,
                textAlign: 'center',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}>
                <div style={{ fontSize: 48 }}>📋</div>
                <div style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: 16,
                  color: SV.textPrimary,
                }}>
                  Google Form — Embed Pending
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  color: SV.textSecondary,
                  maxWidth: 300,
                  lineHeight: 1.6,
                }}>
                  Replace <code style={{ background: SV.divider, padding: '2px 6px', borderRadius: 4 }}>FORM_EMBED_URL</code> in{' '}
                  <code style={{ background: SV.divider, padding: '2px 6px', borderRadius: 4 }}>Section08_ConsentForm.tsx</code>{' '}
                  with your Google Form embed link.
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  color: SV.textMuted,
                }}>
                  Format: https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </SVSection>
  );
}
