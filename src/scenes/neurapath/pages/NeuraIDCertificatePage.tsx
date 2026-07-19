import type { DemoStudent } from '../demoData';
import { NP, goldTextStyle, printAdjust } from '../tokens';
import { bookAsset, goldRule } from './shared';
import { useSVGInline } from '../useSVGInline';
import SchoolStamp from './SchoolStamp';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
  scholarSvg?: string;
  logoSrc?: string;
}

const SCHOOL_ROWS: [string, string][] = [
  ['School', 'Vikas High School, Rajahmundry'],
  ['Board', 'SCERT AP'],
  ['Academic Year', '2022-23 to 2025-26'],
  ['NeuraLife ID', 'NID-2025-AP-084291'],
];

export default function NeuraIDCertificatePage({ student, forPrint, scholarSvg, logoSrc }: Props) {
  const fetchedSvg = useSVGInline(bookAsset('pose1-seated.svg'), '#1A2332', 'none');
  const svgContent = scholarSvg ?? fetchedSvg;

  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: NP.cream,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '36px 28px',
      ...printAdjust(forPrint),
    }}>
      {/* Scholar illustration — the NeuraLife seal */}
      <div
        style={{ width: 80, height: 90, opacity: 0.7 }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      <div style={{
        fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: NP.teal,
        textTransform: 'uppercase', letterSpacing: '0.2em', textAlign: 'center', marginTop: 12,
      }}>
        Certificate of Completion
      </div>

      <div style={{ ...goldRule(100, forPrint), margin: '16px auto' }} />

      {/* Main certification text */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: '#6B7280' }}>
          This certifies that
        </div>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 24, marginTop: 8,
          ...goldTextStyle(forPrint),
        }}>
          {student.fullName}
        </div>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: NP.teal,
          letterSpacing: '0.1em', marginTop: 4,
        }}>
          {student.neuraId}
        </div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: NP.ink, marginTop: 12 }}>
          has successfully completed Class 10
        </div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: NP.ink }}>
          under NeuraLife academic tracking
        </div>
      </div>

      {/* School + date block */}
      <div style={{
        background: 'rgba(11,110,110,0.05)', border: '1px solid rgba(11,110,110,0.15)',
        borderRadius: 8, padding: '10px 16px', width: '100%', marginTop: 16,
      }}>
        {SCHOOL_ROWS.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#94A3B8' }}>{label}</span>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: NP.ink }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Signature section */}
      <div style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center' }}>
        {/* Left — principal signature */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: 22,
            color: '#1A2332', transform: 'rotate(-2deg)', lineHeight: 1,
          }}>
            K. Ramesh Babu
          </div>
          <div style={{ width: 80, margin: '2px auto 0', borderTop: '1px solid #1A2332' }} />
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: '#94A3B8', marginTop: 4 }}>
            Principal's Signature
          </div>
        </div>

        {/* Center divider */}
        <div style={{ width: 1, height: 40, background: 'rgba(212,168,67,0.4)' }} />

        {/* Right — school stamp */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <SchoolStamp size={50} />
        </div>
      </div>

      {/* Bottom */}
      <div style={{ width: '100%' }}>
        <div style={{ ...goldRule('100%', forPrint), marginTop: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: '#94A3B8' }}>
            Issued by NeuraLife
          </span>
          <img
            src={logoSrc ?? bookAsset('neuralife-logo.png')}
            alt="NeuraLife"
            width={24} height={24}
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
