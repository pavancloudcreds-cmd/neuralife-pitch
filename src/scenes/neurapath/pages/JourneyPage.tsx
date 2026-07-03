import type { DemoStudent } from '../demoData';
import { NP, printAdjust } from '../tokens';
import { bookAsset } from './shared';
import { useSVGInline } from '../useSVGInline';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
  scholarSvg?: string;
}

export default function JourneyPage({ student, forPrint, scholarSvg }: Props) {
  const fetchedSvg = useSVGInline(bookAsset('pose2-celebrated.svg'), '#92400E', 'none');
  const svgContent = scholarSvg ?? fetchedSvg;
  const hw = student.homeworkByYear;
  const coins = student.neuraCoinsPerYear;

  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: 'linear-gradient(180deg, #FFFBEB, #FEF3C7)',
      boxSizing: 'border-box',
      padding: '26px 26px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      ...printAdjust(forPrint),
    }}>
      <div
        style={{ width: 80, height: 88, position: 'absolute', top: 26, right: 26 }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: '#78350F', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        The Journey
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: '#78350F', marginTop: 2 }}>
        More Than Marks
      </div>

      <div style={{ marginTop: 20, maxWidth: 260 }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 7, color: '#78350F',
          textTransform: 'uppercase', marginBottom: 8,
        }}>
          4-Year Homework Completion
        </div>
        {[7, 8, 9, 10].map(y => (
          <div key={y} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#78350F' }}>Class {y}</span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 9, color: '#78350F' }}>
                {hw[y as 7 | 8 | 9 | 10]}%
              </span>
            </div>
            <div style={{ height: 8, background: '#FDE68A', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${hw[y as 7 | 8 | 9 | 10]}%`, height: '100%', background: '#D97706' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: '#F59E0B' }}>
          ⭐ {student.neuraCoinsTotal.toLocaleString()} total
        </div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#92400E', marginTop: 3 }}>
          Cl.7: {coins[7]} · Cl.8: {coins[8]} · Cl.9: {coins[9]} · Cl.10: {coins[10]}
        </div>
      </div>

      <div style={{
        marginTop: 12, background: 'rgba(255,255,255,0.5)', borderLeft: '2px solid #D97706', padding: 10,
      }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: '#78350F', margin: 0 }}>
          330 of 362 school days attended across Class 9-10.
          Arjun chose to show up — consistently.
        </p>
      </div>

      <div style={{
        marginTop: 10, background: 'rgba(255,255,255,0.4)', borderLeft: '2px solid #F59E0B', padding: 10,
      }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 6, color: '#78350F',
          textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4,
        }}>
          What the Numbers Don't Show — But NeuraLife Recorded
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 9, color: '#78350F', lineHeight: 1.7, margin: 0 }}>
          Arjun was present for 330 of 362 school days across
          four years. That means he chose to show up — consistently,
          even on days when the syllabus was hard. That is character
          data. Not academic data.
        </p>
      </div>

      <div style={{ flex: 1 }} />

      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: '#D97706', opacity: 0.7, lineHeight: 0.6 }}>
          "
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 10, color: '#78350F', lineHeight: 1.8, margin: 0 }}>
          Behind every percentage is a student who sat down,
          opened a book, and tried. {student.firstName} did that {student.neuraCoinsTotal.toLocaleString()}
          &nbsp;times in four years. We counted.
        </p>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#92400E', marginTop: 8 }}>
          — NeuraLife Data Record
        </p>
      </div>
    </div>
  );
}
