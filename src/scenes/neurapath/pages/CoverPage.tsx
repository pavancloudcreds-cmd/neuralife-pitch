import type { DemoStudent } from '../demoData';
import { NP, goldTextStyle, printAdjust, navyLinen } from '../tokens';
import { bookAsset, goldRule } from './shared';
import { useSVGInline } from '../useSVGInline';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
  scholarSvg?: string;
}

export default function CoverPage({ student, forPrint, scholarSvg }: Props) {
  const fetchedSvg = useSVGInline(bookAsset('pose1-seated.svg'), NP.gold, 'none');
  const svgContent = scholarSvg ?? fetchedSvg;

  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      ...navyLinen(forPrint),
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '36px 32px',
      ...printAdjust(forPrint),
    }}>
      <div style={{
        position: 'absolute', inset: 12,
        border: '1px solid rgba(212,168,67,0.35)',
        borderRadius: 2, pointerEvents: 'none',
      }} />

      {/* Top: scholar illustration */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 20 }}>
        <div
          style={{ width: 200, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      <div style={{ ...goldRule(200, forPrint), margin: '0 auto 20px' }} />

      <div style={{
        fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-0.5px',
        ...goldTextStyle(forPrint),
      }}>
        NeuraLife
      </div>

      <div style={{ ...goldRule(60, forPrint), margin: '12px auto' }} />

      <div style={{
        fontFamily: "'Playfair Display', serif", fontSize: 20, textAlign: 'center', ...goldTextStyle(forPrint),
      }}>
        {student.fullName}
      </div>

      <div style={{
        fontFamily: "'Poppins', sans-serif", fontSize: 8, color: NP.gold, textAlign: 'center',
        letterSpacing: '0.25em', marginTop: 10,
      }}>
        NEURAPATH — ACADEMIC INTELLIGENCE REPORT
      </div>

      <div style={{ paddingBottom: 20, alignSelf: 'flex-end', width: '100%', textAlign: 'right' }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, color: NP.gold }}>2026</span>
      </div>
    </div>
  );
}
