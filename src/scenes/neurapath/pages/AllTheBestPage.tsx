import type { DemoStudent } from '../demoData';
import { NP, printAdjust } from '../tokens';
import { bookAsset, goldRule } from './shared';
import { useSVGInline } from '../useSVGInline';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
  scholarSvg?: string;
}

export default function AllTheBestPage({ student, forPrint, scholarSvg }: Props) {
  const fetchedSvg = useSVGInline(bookAsset('pose3-horizon.svg'), '#FFFFFF', '#FFFFFF');
  const svgContent = scholarSvg ?? fetchedSvg;

  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: 'linear-gradient(180deg, #0F172A 0%, #1E3A5F 35%, #7C2D12 70%, #F59E0B 100%)',
      boxSizing: 'border-box',
      padding: '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      ...printAdjust(forPrint),
    }}>
      <div style={{
        fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.gold, textAlign: 'center',
        textTransform: 'uppercase', letterSpacing: '0.15em',
      }}>
        From All of Us at NeuraLife
      </div>

      <div style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 28, color: 'white',
        textAlign: 'center', lineHeight: 1.2, marginTop: 10,
      }}>
        All the Best,<br />{student.firstName}.
      </div>

      <p style={{
        fontFamily: "'Lora', serif", fontSize: 10, color: 'rgba(255,255,255,0.88)', textAlign: 'center',
        lineHeight: 1.9, margin: '16px 0 0', maxWidth: 300,
      }}>
        You came to us in Class 7 with questions.
        You leave with answers.
        <br /><br />
        From Class 7 to Class 10 — 4 years, 6 subjects,
        12 examinations, 48 assessment cycles.
        <br /><br />
        Every morning you sat down to study.
        Every chapter you revised before the exam.
        Every day you chose to come to school.
        All of those moments are in here.
        They added up to this.
        Now go add more.
      </p>

      <div style={{ ...goldRule(80, forPrint), margin: '16px auto 0' }} />
      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: NP.gold, marginTop: 8 }}>
        {student.neuraId}
      </div>

      <div style={{ flex: 1, position: 'relative', width: '100%' }}>
        <div
          style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: 180, height: 180,
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      <p style={{
        fontFamily: "'Poppins', sans-serif", fontSize: 8, color: 'rgba(255,255,255,0.5)',
        textAlign: 'center', margin: 0,
      }}>
        Every grade remembered. Every student known.
      </p>
    </div>
  );
}
