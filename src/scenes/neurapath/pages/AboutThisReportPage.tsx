import { NP, printAdjust } from '../tokens';
import { bookAsset, goldRule } from './shared';

interface Props {
  forPrint?: boolean;
  logoSrc?: string;
}

const TRACKED_ROWS: [string, string][] = [
  ['Formal examinations', '12 (FA1, FA2, SA1, SA2 × 3 yrs)'],
  ['Individual assessment scores', '48 scores across 6 subjects'],
  ['Daily attendance records', '4 school years · 362 days tracked'],
  ['Homework completion', 'Every assignment across 4 years'],
  ['AI gap analysis', 'Chapter-level mastery detection'],
  ['NeuraCoins (engagement)', 'Every learning session logged'],
];

export default function AboutThisReportPage({ forPrint, logoSrc }: Props) {
  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: NP.cream,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: '36px 32px',
      ...printAdjust(forPrint),
    }}>
      {/* Top: logo mark */}
      <img
        src={logoSrc ?? bookAsset('neuralife-logo.png')}
        alt="NeuraLife"
        width={44} height={44}
        style={{ display: 'block', margin: '0 auto 24px' }}
      />

      {/* Title */}
      <div style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: NP.ink,
        textAlign: 'center',
      }}>
        About This Report
      </div>
      <div style={{ ...goldRule(80, forPrint), margin: '10px auto 20px' }} />

      {/* What was tracked */}
      <div style={{
        fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.teal,
        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12,
      }}>
        What NeuraLife Tracked
      </div>

      <div>
        {TRACKED_ROWS.map(([metric, detail]) => (
          <div key={metric} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
            borderBottom: '0.5px solid rgba(212,168,67,0.15)',
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', background: 'rgba(11,110,110,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              color: NP.teal, fontSize: 10, lineHeight: 1,
            }}>
              ✓
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 10, color: NP.ink, flex: 1 }}>
              {metric}
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, color: '#6B7280' }}>
              {detail}
            </div>
          </div>
        ))}
      </div>

      {/* Methodology note */}
      <div style={{
        background: 'rgba(11,110,110,0.05)', border: '1px solid rgba(11,110,110,0.15)',
        borderRadius: 8, padding: '12px 14px', marginTop: 16,
      }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.teal,
          textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6,
        }}>
          How This Report Is Generated
        </div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 9, color: '#4B5563', lineHeight: 1.7 }}>
          Every number in this report comes from verified academic
          data recorded in NeuraLife during the school year.
          Nothing was estimated or inferred without basis. Subject
          scores are calculated from the actual marks entered by
          teachers in the NeuraLife Teacher App after each
          formal assessment.
        </div>
      </div>

      {/* Assurance box */}
      <div style={{
        background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.2)',
        borderRadius: 8, padding: '12px 14px', marginTop: 14,
      }}>
        <div style={{
          fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 10, color: '#78350F',
          lineHeight: 1.7, textAlign: 'center',
        }}>
          "If a number appears in this report, a teacher
          entered it. If an insight appears, the data earned it.
          No assumptions. No estimates."
        </div>
      </div>

      {/* Bottom */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ ...goldRule('100%', forPrint) }} />
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#94A3B8',
          textAlign: 'center', marginTop: 8,
        }}>
          Data period: June 2022 – March 2026 · School: Vikas High School
        </div>
      </div>
    </div>
  );
}
