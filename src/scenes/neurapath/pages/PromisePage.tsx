import type { DemoStudent } from '../demoData';
import { NP, printAdjust } from '../tokens';
import { goldRule } from './shared';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
}

export default function PromisePage({ student, forPrint }: Props) {
  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: NP.cream,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '48px 40px',
      ...printAdjust(forPrint),
    }}>
      {/* Top: monogram */}
      <div style={{
        width: 44, height: 44, borderRadius: '50%', border: `2px solid ${NP.gold}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: NP.gold,
      }}>
        NL
      </div>

      {/* Center */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 800, fontStyle: 'italic', fontSize: 20,
          color: NP.ink, lineHeight: 1.5, margin: '0 0 28px',
        }}>
          This is not a marksheet.<br />
          This is not a grade card.
        </p>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18,
          color: NP.ink, lineHeight: 1.6, margin: 0,
        }}>
          This is what four years of learning look like<br />
          when someone is truly paying attention.
        </p>

        <div style={{ ...goldRule(120, forPrint), margin: '32px auto' }} />

        <p style={{
          fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 11, color: NP.muted,
          textAlign: 'center', lineHeight: 1.7, margin: 0,
        }}>
          NeuraLife tracked {student.firstName}'s academic journey<br />
          from Class 7 to Class 10 — every examination, every<br />
          concept, every struggle, every improvement.
        </p>

        <p style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 10, color: NP.muted,
          textAlign: 'center', marginTop: 24, marginBottom: 0,
        }}>
          12 examinations · 48 assessment cycles · 4 years of data
        </p>
      </div>

      {/* Bottom */}
      <div style={{ fontSize: 20, color: NP.gold }}>✦</div>
    </div>
  );
}
