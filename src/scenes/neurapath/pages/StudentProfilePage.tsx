import type { DemoStudent } from '../demoData';
import { NP, printAdjust } from '../tokens';
import { bookAsset, goldRule } from './shared';
import { useSVGInline } from '../useSVGInline';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
  scholarSvg?: string;
  photoSrc?: string;
}

const DETAIL_ROWS = (s: DemoStudent) => [
  ['NeuraID', s.neuraId],
  ['Board', s.board],
  ['Medium', s.medium],
  ['Year', s.academicYear],
  ['Father', s.fatherName],
  ['Mother', s.motherName],
  ['DOB', s.dob],
];

export default function StudentProfilePage({ student, forPrint, scholarSvg, photoSrc }: Props) {
  const fetchedSvg = useSVGInline(bookAsset('pose1-seated.svg'), '#1A2332', 'none');
  const svgContent = scholarSvg ?? fetchedSvg;

  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: NP.cream,
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      ...printAdjust(forPrint),
    }}>
      {/* Scholar watermark — subtle, bottom-right, above the stat bar */}
      <div
        style={{
          position: 'absolute', bottom: 60, right: 16, width: 70, height: 78, opacity: 0.25,
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      {/* School header band */}
      <div style={{
        background: '#F8F7F0', borderBottom: '1px solid rgba(212,168,67,0.3)',
        padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: NP.ink, color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 8, flexShrink: 0,
        }}>
          VHS
        </div>

        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: NP.ink,
            textTransform: 'uppercase', letterSpacing: '0.12em',
          }}>
            VIKAS HIGH SCHOOL — SCERT AP
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#94A3B8', marginTop: 2 }}>
            Rajahmundry, East Godavari, Andhra Pradesh
          </div>
        </div>

        <div style={{
          width: 40, height: 40, borderRadius: '50%', border: '1.5px dashed rgba(212,168,67,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          fontFamily: "'Poppins', sans-serif", fontSize: 6, color: '#94A3B8', lineHeight: 1.3, flexShrink: 0,
        }}>
          School<br />Stamp
        </div>
      </div>

      {/* Main body */}
      <div style={{ padding: '20px 24px', display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left column */}
        <div style={{ width: '55%', paddingRight: 12 }}>
          <div style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.teal,
            textTransform: 'uppercase', letterSpacing: '0.12em',
          }}>
            Student Profile
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: NP.ink, marginTop: 2 }}>
            {student.fullName}
          </div>
          <div style={{ ...goldRule(60, forPrint), height: 1.5, margin: '8px 0 14px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {DETAIL_ROWS(student).map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 8, color: '#94A3B8', width: 52, flexShrink: 0 }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 10, color: NP.ink }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.teal,
              textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6,
            }}>
              Natural Strengths
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Physical Science ⭐', 'Mathematics', 'Telugu'].map(p => (
                <span key={p} style={{
                  background: 'rgba(11,110,110,0.1)', border: `1px solid ${NP.teal}`,
                  fontFamily: "'Poppins', sans-serif", fontSize: 8, color: NP.teal,
                  padding: '3px 8px', borderRadius: 4,
                }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{
            width: 80, height: 96, border: `2px solid ${NP.gold}`, borderRadius: 4,
            overflow: 'hidden', marginBottom: 8,
          }}>
            <img
              src={photoSrc ?? bookAsset('student-pass-photo.jpg')}
              alt={student.fullName}
              width={80} height={96}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{
            fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 8, color: NP.muted, marginBottom: 10,
          }}>
            Class 10 · 2026
          </div>

          <div style={{ display: 'flex', gap: 4 }}>
            {[7, 8, 9, 10].map(y => (
              <div key={y} style={{
                width: 24, height: 24, borderRadius: '50%', background: NP.ink, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 9,
              }}>
                {y}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stat bar */}
      <div style={{ padding: '0 24px 16px' }}>
        <div style={{
          borderTop: '1px solid rgba(212,168,67,0.2)', paddingTop: 12,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: NP.muted,
        }}>
          <span>⭐ {student.neuraCoinsTotal.toLocaleString()} NeuraCoins</span>
          <span>{student.attendanceRate}% Attendance</span>
          <span>6 Subjects</span>
        </div>

        <p style={{
          fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 9, color: NP.gold,
          textAlign: 'center', margin: '10px 0 4px',
        }}>
          "Four years. Six subjects. Thousands of moments."
        </p>

        <div style={{ textAlign: 'right', fontFamily: "'Poppins', sans-serif", fontSize: 7, color: '#94A3B8' }}>
          neuralife.in
        </div>
      </div>
    </div>
  );
}
