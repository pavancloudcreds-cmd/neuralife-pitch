import type { DemoStudent } from '../demoData';
import { NP, SUBJECT_COLORS, SUBJECT_LABELS, printAdjust } from '../tokens';
import { goldRule } from './shared';

type ClassYear = 7 | 8 | 9 | 10;
type ClKey = 'cl7' | 'cl8' | 'cl9' | 'cl10';

interface Props {
  student: DemoStudent;
  classYear: ClassYear;
  forPrint?: boolean;
}

const CL_KEY: Record<ClassYear, ClKey> = { 7: 'cl7', 8: 'cl8', 9: 'cl9', 10: 'cl10' };

const THEMES: Record<ClassYear, {
  bg: string; watermarkColor: string; borderColor: string; themeName: string;
  themeColor: string; dark: boolean; yearLabel: string;
}> = {
  7:  { bg: 'linear-gradient(180deg, #FFF7ED, #FED7AA)', watermarkColor: '#F97316', borderColor: '#F97316', themeName: 'The Beginning', themeColor: '#7C2D12', dark: false, yearLabel: '2022-2023' },
  8:  { bg: 'linear-gradient(180deg, #EFF6FF, #DBEAFE)', watermarkColor: '#3B82F6', borderColor: '#3B82F6', themeName: 'Finding Direction', themeColor: '#1E3A5F', dark: false, yearLabel: '2023-2024' },
  9:  { bg: 'linear-gradient(180deg, #F0FDFA, #CCFBF1)', watermarkColor: '#0D9488', borderColor: '#0D9488', themeName: 'The Build-Up', themeColor: '#134E4A', dark: false, yearLabel: '2024-2025' },
  10: { bg: 'linear-gradient(180deg, #0F172A, #1E3A5F)', watermarkColor: '#F59E0B', borderColor: NP.gold, themeName: 'The Culmination', themeColor: 'white', dark: true, yearLabel: '2025-2026' },
};

const SUBJECT_KEYS = Object.keys(SUBJECT_LABELS) as (keyof typeof SUBJECT_LABELS)[];

interface AssessmentBarSetProps {
  subject: string;
  data: { fa1: number; fa2: number; sa1: number; sa2: number };
  color: string;
  isDark: boolean;
}

function AssessmentBarSet({ subject, data, color, isDark }: AssessmentBarSetProps) {
  const textColor = isDark ? 'rgba(255,255,255,0.9)' : '#1A2332';
  const labelColor = isDark ? 'rgba(255,255,255,0.5)' : '#94A3B8';
  const trackColor = isDark ? 'rgba(255,255,255,0.1)' : '#E8E4DC';

  const assessments = [
    { key: 'FA1', value: data.fa1 },
    { key: 'FA2', value: data.fa2 },
    { key: 'SA1', value: data.sa1 },
    { key: 'SA2', value: data.sa2 },
  ];

  return (
    <div style={{ marginBottom: 10 }}>
      {/* Subject name */}
      <div style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: 9,
        color: color,
        marginBottom: 4,
      }}>
        {subject}
      </div>

      {/* 4 assessment columns */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
        {assessments.map(({ key, value }) => (
          <div key={key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Exam name + score, one line, above the bar */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 3,
              marginBottom: 2,
            }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 6.5, color: labelColor }}>
                {key}
              </span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 8, color: textColor }}>
                {value}%
              </span>
            </div>

            {/* Track */}
            <div style={{
              width: '100%',
              height: 6,
              backgroundColor: trackColor,
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              {/* Filled portion */}
              <div style={{
                height: '100%',
                width: `${value}%`,
                backgroundColor: color,
                borderRadius: 3,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SUBJECT_PEAKS: { label: string; key: keyof typeof SUBJECT_LABELS; from: number }[] = [
  { label: 'Math',    key: 'mathematics',     from: 68 },
  { label: 'Phy Sci', key: 'physicalScience', from: 71 },
  { label: 'Biology', key: 'biology',         from: 65 },
  { label: 'Soc St.', key: 'socialStudies',   from: 79 },
  { label: 'English', key: 'english',         from: 74 },
  { label: 'Telugu',  key: 'telugu',          from: 81 },
];

export default function ClassPage({ student, classYear, forPrint }: Props) {
  const theme = THEMES[classYear];
  const clKey = CL_KEY[classYear];
  const cardBg = theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)';
  const insightBg = theme.dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.45)';

  const insights = classYear === 7 ? student.gradeInsights.cl7
    : classYear === 8 ? student.gradeInsights.cl8
    : classYear === 9 ? student.gradeInsights.cl9
    : null;

  const columns = [SUBJECT_KEYS.slice(0, 3), SUBJECT_KEYS.slice(3, 6)];

  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: theme.bg,
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      padding: '26px 24px',
      display: 'flex',
      flexDirection: 'column',
      ...printAdjust(forPrint),
    }}>
      {/* Watermark */}
      <div style={{
        position: 'absolute',
        top: classYear === 10 ? -8 : 12,
        right: classYear === 10 ? -4 : 16,
        zIndex: 0, userSelect: 'none',
        fontFamily: "'Playfair Display', serif",
        fontWeight: classYear === 10 ? 900 : 400,
        fontSize: classYear === 10 ? 110 : 72,
        opacity: classYear === 10 ? 0.22 : 1,
        color: theme.watermarkColor, lineHeight: 1,
      }}>
        {classYear}
      </div>

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 7, color: theme.themeColor,
          textTransform: 'uppercase', letterSpacing: '0.12em', opacity: theme.dark ? 0.85 : 1,
        }}>
          Class {classYear} — {theme.yearLabel}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: theme.themeColor, marginTop: 2 }}>
          {theme.themeName}
        </div>
      </div>

      {/* Assessment breakdown */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: 16 }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 7, color: theme.themeColor,
          textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, opacity: theme.dark ? 0.85 : 1,
        }}>
          Assessment Breakdown
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {columns.map((col, ci) => (
            <div key={ci} style={{ flex: 1 }}>
              {col.map(key => (
                <AssessmentBarSet
                  key={key}
                  subject={SUBJECT_LABELS[key]}
                  data={student.assessments[key][clKey]}
                  color={SUBJECT_COLORS[key]}
                  isDark={theme.dark}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Highlights cards */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 8, marginTop: 14 }}>
        {classYear <= 9 && insights && (
          <>
            <div style={{ flex: 1, background: cardBg, borderLeft: `3px solid ${theme.themeColor === 'white' ? NP.gold : theme.borderColor}`, borderRadius: 4, padding: 8 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: theme.themeColor, opacity: 0.7, textTransform: 'uppercase' }}>Strongest</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 10, color: theme.themeColor, marginTop: 2 }}>
                {insights.topSubject} — {insights.topSubjectScore}%
              </div>
            </div>
            <div style={{ flex: 1, background: cardBg, borderLeft: `3px solid ${theme.themeColor === 'white' ? NP.gold : theme.borderColor}`, borderRadius: 4, padding: 8 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: theme.themeColor, opacity: 0.7, textTransform: 'uppercase' }}>Most Improved</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 10, color: theme.themeColor, marginTop: 2 }}>
                {insights.mostImproved}: {insights.mostImprovedGain}
              </div>
            </div>
            {'needsAttention' in insights && (
              <div style={{ flex: 1, background: cardBg, borderLeft: `3px solid ${theme.themeColor === 'white' ? NP.gold : theme.borderColor}`, borderRadius: 4, padding: 8 }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: theme.themeColor, opacity: 0.7, textTransform: 'uppercase' }}>Attention Needed</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 10, color: theme.themeColor, marginTop: 2 }}>
                  {insights.needsAttention} — {insights.needsAttentionScore}%
                </div>
              </div>
            )}
            {classYear === 9 && 'projectionCl10Math' in insights && (
              <div style={{ flex: 1, background: cardBg, borderLeft: `3px solid ${theme.borderColor}`, borderRadius: 4, padding: 8 }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: theme.themeColor, opacity: 0.7, textTransform: 'uppercase' }}>Class 10 Projection</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 9, color: theme.themeColor, marginTop: 2 }}>
                  Math: {insights.projectionCl10Math}<br />EAMCET: {insights.projectionEAMCET}
                </div>
              </div>
            )}
          </>
        )}

        {classYear === 10 && (
          <>
            <div style={{ flex: 1, background: cardBg, borderLeft: `3px solid ${NP.gold}`, borderRadius: 4, padding: 8 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.gold, textTransform: 'uppercase' }}>Strongest</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 10, color: 'white', marginTop: 2 }}>
                Physical Science — 87%
              </div>
            </div>
            <div style={{ flex: 1, background: cardBg, borderLeft: `3px solid ${NP.gold}`, borderRadius: 4, padding: 8 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.gold, textTransform: 'uppercase' }}>Most Improved</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 10, color: 'white', marginTop: 2 }}>
                Mathematics: +16% over 4 years
              </div>
            </div>
            <div style={{ flex: 1, background: cardBg, borderLeft: `3px solid ${NP.gold}`, borderRadius: 4, padding: 8 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.gold, textTransform: 'uppercase' }}>EAMCET Chapter Coverage</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 8.5, color: 'white', marginTop: 2, lineHeight: 1.5 }}>
                Maths: {student.cl10Highlights.eamcetChapters.mathsCovered}/{student.cl10Highlights.eamcetChapters.mathsTotal} ✓<br />
                Physics: {student.cl10Highlights.eamcetChapters.physicsCovered}/{student.cl10Highlights.eamcetChapters.physicsTotal} ✓<br />
                Chemistry: {student.cl10Highlights.eamcetChapters.chemistryCovered}/{student.cl10Highlights.eamcetChapters.chemistryTotal} ✓
              </div>
            </div>
          </>
        )}
      </div>

      {/* 4-Year Subject Peaks (Class 10 only) — fills the space below the highlight cards */}
      {classYear === 10 && (
        <div style={{ position: 'relative', zIndex: 1, marginTop: 14 }}>
          <div style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.gold,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
          }}>
            4-Year Subject Peaks
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {SUBJECT_PEAKS.map(peak => {
              const score = student.performance[peak.key][10];
              return (
                <div key={peak.key} style={{
                  background: 'rgba(255,255,255,0.07)', border: `1px solid rgba(212,168,67,0.2)`,
                  borderRadius: 6, padding: '8px 10px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: NP.gold, textTransform: 'uppercase' }}>
                    {peak.label}
                  </div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: 'white' }}>
                    {score}%
                  </div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>
                    Cl.7: {peak.from}% → Cl.10: {score}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Counsellor insight (classes 7-9) */}
      {insights && (
        <div style={{
          position: 'relative', zIndex: 1, marginTop: 12, background: insightBg,
          borderLeft: `2.5px solid ${theme.borderColor}`, borderRadius: 4, padding: '10px 12px',
        }}>
          <div style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 6, color: theme.themeColor, opacity: 0.75,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4,
          }}>
            Academic Insight
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 9, color: theme.themeColor, lineHeight: 1.75, margin: 0 }}>
            {insights.counsellorNote}
          </p>
          {classYear === 9 && 'bestChapter' in insights && (
            <>
              <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 9, color: NP.teal, margin: '8px 0 0' }}>
                Best chapter this year: {insights.bestChapter}
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 9, color: '#B45309', margin: '2px 0 0' }}>
                Needs attention: {insights.gapChapter}
              </p>
            </>
          )}
        </div>
      )}

      {classYear === 10 && (
        <p style={{
          position: 'relative', zIndex: 1, fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 10,
          color: NP.gold, textAlign: 'center', margin: '14px 0 0',
        }}>
          "Best chapter this year — {student.cl10Highlights.bestChapter}"
        </p>
      )}

      {/* Watch in next class */}
      {classYear < 10 && insights && (
        <p style={{
          position: 'relative', zIndex: 1, fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 8,
          color: theme.themeColor, margin: '10px 0 0',
        }}>
          Watch in Class {classYear + 1}: {
            classYear === 7 ? student.gradeInsights.cl7.watchIn8
            : classYear === 8 ? student.gradeInsights.cl8.watchIn9
            : student.gradeInsights.cl9.watchIn10
          }
        </p>
      )}

      <div style={{ flex: 1 }} />

      {/* Closing quote — sits directly above the stats bar (Class 10 only) */}
      {classYear === 10 && (
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 12 }}>
          <div style={{ ...goldRule('100%', forPrint), marginBottom: 10 }} />
          <p style={{
            fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 10, color: 'white',
            textAlign: 'center', margin: 0,
          }}>
            "Class 10 is not the end. It is the first day of the rest of it."
          </p>
        </div>
      )}

      {/* Bottom stats bar */}
      <div style={{
        position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between',
        borderTop: `1px solid ${theme.dark ? 'rgba(212,168,67,0.25)' : 'rgba(0,0,0,0.1)'}`, paddingTop: 8,
        fontFamily: "'Poppins', sans-serif", fontSize: 8,
        color: theme.dark ? 'rgba(255,255,255,0.7)' : theme.themeColor,
      }}>
        {classYear === 10 ? (
          <>
            <span>Present {student.cl10Highlights.attendanceDaysPresent} of {student.cl10Highlights.totalSchoolDays} days</span>
            <span>Coins earned: {student.neuraCoinsPerYear[10]}</span>
          </>
        ) : insights && (
          <>
            <span>🗓 {insights.attendance}% Attendance</span>
            <span>📋 {insights.homework}% HW Completion</span>
            <span>⭐ {insights.coins} Coins</span>
          </>
        )}
      </div>
    </div>
  );
}
