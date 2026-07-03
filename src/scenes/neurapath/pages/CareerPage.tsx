import type { DemoStudent } from '../demoData';
import { NP, printAdjust } from '../tokens';
import { goldRule } from './shared';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
}

const OTHER_LABEL_COLOR = (score: number) => (score >= 65 ? '#059669' : '#D97706');
const OTHER_BAR_COLOR = (score: number) => (score >= 65 ? '#34D399' : '#F59E0B');

export default function CareerPage({ student, forPrint }: Props) {
  const rec = student.topRecommendation;
  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: '#F0FDF4',
      boxSizing: 'border-box',
      padding: '28px 26px',
      display: 'flex',
      flexDirection: 'column',
      ...printAdjust(forPrint),
    }}>
      <div style={{
        fontFamily: "'Poppins', sans-serif", fontSize: 7, color: '#065F46',
        textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>
        NeuraPath Recommendation
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, color: '#064E3B', marginTop: 4 }}>
        Your Path After Class 10
      </div>
      <div style={{ ...goldRule(80, forPrint), margin: '10px 0 16px' }} />

      {/* Hero card */}
      <div style={{ background: 'white', border: '1.5px solid #10B981', borderRadius: 10, padding: 18 }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 7, color: '#10B981',
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          #1 Recommendation
        </div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 32, color: '#064E3B' }}>
          MPC
        </div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, color: NP.muted, marginTop: 2 }}>
          Mathematics · Physics · Chemistry
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 12, gap: 8 }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, color: NP.muted }}>Fit Score:</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: '#059669' }}>
            {rec.fitScore}%
          </span>
          <span style={{
            background: '#D1FAE5', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 8,
            color: '#065F46', padding: '3px 9px', borderRadius: 10,
          }}>
            {rec.fitLabel}
          </span>
        </div>
        <div style={{ background: '#D1FAE5', height: 6, borderRadius: 3, marginTop: 6, overflow: 'hidden' }}>
          <div style={{ width: `${rec.fitScore}%`, height: '100%', background: 'linear-gradient(90deg, #34D399, #059669)' }} />
        </div>

        <p style={{
          fontFamily: "'Lora', serif", fontSize: 10, color: '#1E293B', lineHeight: 1.7, margin: '12px 0 0',
        }}>
          Math climbed from 68% in Class 7 to 84% in Class 10 — a
          16-point rise over four years. Physical Science at 87% is
          his strongest subject. EAMCET readiness stands at 82%
          without any coaching.
        </p>

        <div style={{ marginTop: 12 }}>
          <div style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.teal,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4,
          }}>
            Why This and Not Others
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 9, color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
            BiPC (71%): Mathematics consistently outpaces Biology —
            MPC is the stronger data signal for this profile.<br />
            Poly CSE (83%): Excellent technical fit — strong alternative
            if Arjun prefers practical learning over exam pressure.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', marginTop: 12 }}>
          {['Class 11-12: MPC', 'AP EAMCET', 'B.Tech', 'Engineering'].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{
                border: '1px solid #10B981', borderRadius: 4, padding: '3px 8px',
                fontFamily: "'Poppins', sans-serif", fontSize: 7, color: '#065F46',
              }}>
                {step}
              </div>
              {i < 3 && <span style={{ color: '#10B981', fontSize: 9 }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Other options */}
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        {student.otherPaths.map(p => (
          <div key={p.name} style={{
            flex: 1, background: 'white', border: '1px solid #E5E1D8', borderRadius: 8, padding: 10,
          }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: NP.ink }}>
              {p.name}
            </div>
            <div style={{ height: 4, borderRadius: 2, background: '#E5E1D8', margin: '6px 0', overflow: 'hidden' }}>
              <div style={{ width: `${p.score}%`, height: '100%', background: OTHER_BAR_COLOR(p.score) }} />
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: OTHER_LABEL_COLOR(p.score) }}>
              {p.score}%
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: NP.muted }}>{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
