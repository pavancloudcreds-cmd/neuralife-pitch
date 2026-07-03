import type { DemoStudent } from '../demoData';
import { NP, SUBJECT_COLORS, printAdjust } from '../tokens';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
}

const ROWS: { label: string; key: keyof DemoStudent['performance']; gain: string }[] = [
  { label: 'Maths',   key: 'mathematics',     gain: '↑ +16%' },
  { label: 'Phy Sci', key: 'physicalScience', gain: '↑ +16%' },
  { label: 'Biology', key: 'biology',         gain: '↑ +9%' },
  { label: 'Soc St.', key: 'socialStudies',   gain: '→ +4%' },
  { label: 'English', key: 'english',         gain: '↑ +8%' },
  { label: 'Telugu',  key: 'telugu',          gain: '→ +5%' },
];

export default function AnalysisPage({ student, forPrint }: Props) {
  const p = student.performance;
  const avg10 = Math.round(ROWS.reduce((s, r) => s + p[r.key][10], 0) / ROWS.length);

  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: '#FAFAFA',
      boxSizing: 'border-box',
      padding: 24,
      ...printAdjust(forPrint),
    }}>
      <div style={{
        fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.teal,
        textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>
        Four Years at a Glance
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: NP.ink, marginTop: 4 }}>
        Academic Performance
      </div>

      {/* Hero stats */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 16 }}>
        {[
          { v: `${avg10}%`, l: 'Class 10 Avg', c: NP.teal },
          { v: '↑ +16%', l: 'Math Growth', c: '#059669' },
          { v: '82%', l: 'EAMCET Ready', c: '#3B82F6' },
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, color: s.c }}>{s.v}</div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: NP.muted, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Subject table */}
      <div style={{ marginTop: 16, background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #E5E1D8' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Poppins', sans-serif" }}>
          <thead>
            <tr style={{ background: NP.ink }}>
              {['Subject', 'Cl.7', 'Cl.8', 'Cl.9', 'Cl.10', 'Trend'].map(h => (
                <th key={h} style={{
                  color: 'white', fontSize: 8, fontWeight: 600, padding: '8px 10px',
                  textAlign: h === 'Subject' ? 'left' : 'center',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => {
              const d = p[r.key];
              const improving = d.trend === 'IMPROVING';
              return (
                <tr key={r.label} style={{ background: i % 2 === 0 ? '#FAFAFA' : 'white' }}>
                  <td style={{ padding: '7px 10px', fontSize: 9, color: NP.ink, fontWeight: 600 }}>{r.label}</td>
                  <td style={{ padding: '7px 10px', fontSize: 9, textAlign: 'center', color: NP.muted }}>{d[7]}%</td>
                  <td style={{ padding: '7px 10px', fontSize: 9, textAlign: 'center', color: NP.muted }}>{d[8]}%</td>
                  <td style={{ padding: '7px 10px', fontSize: 9, textAlign: 'center', color: NP.muted }}>{d[9]}%</td>
                  <td style={{
                    padding: '7px 10px', fontSize: 9, textAlign: 'center', fontWeight: 700,
                    color: SUBJECT_COLORS[r.key],
                  }}>
                    {d[10]}%
                  </td>
                  <td style={{
                    padding: '7px 10px', fontSize: 8, textAlign: 'center', fontWeight: 600,
                    color: improving ? '#059669' : '#94A3B8',
                  }}>
                    {r.gain}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Trajectory summary */}
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'IMPROVING ↑', color: '#059669', bg: '#D1FAE5', text: 'Mathematics · Physical Science · Biology · English' },
          { label: 'STABLE →', color: '#B45309', bg: '#FEF3C7', text: 'Social Studies · Telugu' },
          { label: 'DECLINING ↓', color: '#B91C1C', bg: '#FEE2E2', text: 'None — all subjects maintained or improved' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: row.bg, color: row.color, fontFamily: "'Poppins', sans-serif",
              fontWeight: 600, fontSize: 7, padding: '3px 7px', borderRadius: 10, flexShrink: 0,
            }}>
              {row.label}
            </span>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: NP.ink }}>{row.text}</span>
          </div>
        ))}
      </div>

      {/* Exam readiness meters */}
      <div style={{ marginTop: 14 }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.teal,
          textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8,
        }}>
          Competitive Exam Readiness
        </div>
        {student.examReadiness.map(e => (
          <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: NP.ink, width: 90, flexShrink: 0 }}>
              {e.name}
            </span>
            <div style={{ flex: 1, height: 5, background: '#E5E1D8', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                width: `${e.score}%`, height: '100%',
                background: e.score >= 80 ? '#059669' : e.score >= 65 ? '#D4A843' : '#F87171',
              }} />
            </div>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 9, color: NP.ink, width: 30, textAlign: 'right' }}>
              {e.score}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
