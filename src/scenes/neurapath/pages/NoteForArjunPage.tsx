import { NP, printAdjust } from '../tokens';
import { goldRule } from './shared';

interface Props {
  forPrint?: boolean;
}

export default function NoteForArjunPage({ forPrint }: Props) {
  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: 'linear-gradient(180deg, #FFFBEB, #FEF3C7)',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: '36px 32px',
      ...printAdjust(forPrint),
    }}>
      {/* Section marker */}
      <div style={{
        fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#92400E',
        textTransform: 'uppercase', letterSpacing: '0.2em', textAlign: 'center',
      }}>
        For Arjun
      </div>
      <div style={{ textAlign: 'center', fontSize: 14, color: NP.gold, marginTop: 6 }}>✦</div>

      {/* Letter heading */}
      <div style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: '#78350F',
        textAlign: 'center', marginTop: 12,
      }}>
        A Note for You.
      </div>
      <div style={{ ...goldRule(60, forPrint), margin: '10px auto 0' }} />

      {/* Letter body */}
      <div style={{
        fontFamily: "'Lora', serif", fontSize: 10, color: '#78350F', lineHeight: 1.65, marginTop: 14,
      }}>
        <p style={{ margin: '0 0 9px' }}>Arjun,</p>
        <p style={{ margin: '0 0 9px' }}>
          You have spent four years being graded, assessed,
          and measured. Every number in this report was built
          from that work — the late nights, the hard chapters,
          the days you showed up anyway.
        </p>
        <p style={{ margin: '0 0 9px' }}>
          We tracked all of it. And this is what we found:
        </p>
        <p style={{ margin: '0 0 9px' }}>
          You are someone who accelerates. Your FA1 scores
          are always lower than your SA2 scores — every year,
          every subject. That means you start slow and finish
          strong. That is not a study habit. That is character.
        </p>
        <p style={{ margin: '0 0 9px' }}>
          The MPC recommendation on page 4 is data speaking.
          But it only says what the numbers show.
        </p>
        <p style={{ margin: 0 }}>
          The person who decides what happens next is you.
        </p>
      </div>

      {/* Divider + prompt */}
      <div style={{ height: 0.5, width: '100%', background: 'rgba(212,168,67,0.4)', marginTop: 12, marginBottom: 10 }} />
      <div style={{
        fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 10, color: '#92400E',
        textAlign: 'center', marginBottom: 10,
      }}>
        What do you want to build?
      </div>

      {/* Ruled lines for the student to write on — deliberately blank */}
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{
          width: '100%', height: 1, background: 'rgba(212,168,67,0.5)', marginBottom: 18,
        }} />
      ))}

      {/* Bottom */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ ...goldRule('100%', forPrint) }} />
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#94A3B8',
          textAlign: 'center', marginTop: 8,
        }}>
          Write your answer here. This page belongs to you.
        </div>
      </div>
    </div>
  );
}
