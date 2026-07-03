import type { DemoStudent } from '../demoData';
import { NP, goldTextStyle, printAdjust } from '../tokens';
import { goldRule } from './shared';

interface Props {
  student: DemoStudent;
  forPrint?: boolean;
}

const TELUGU_FONT = "'Noto Sans Telugu', serif";

export default function FeedbackTeluguPage({ student: _student, forPrint }: Props) {
  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      background: NP.navyDark,
      boxSizing: 'border-box',
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      ...printAdjust(forPrint),
    }}>
      <div style={{ textAlign: 'center', fontSize: 16, color: NP.gold, marginBottom: 6 }}>✦</div>
      <div style={{ ...goldRule('100%', forPrint), height: 0.5 }} />
      <div style={{
        fontFamily: TELUGU_FONT, fontSize: 7, color: NP.gold, textAlign: 'center',
        textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 10,
      }}>
        NeuraLife నుండి ఒక మాట
      </div>

      <div style={{
        fontFamily: TELUGU_FONT, fontWeight: 700, fontSize: 18, textAlign: 'center',
        marginTop: 20, ...goldTextStyle(forPrint),
      }}>
        "మేము మీ పిల్లవాడిని చూశాం."
      </div>

      <div style={{ flex: 1, overflow: 'hidden', marginTop: 14 }}>
        <p style={{ fontFamily: TELUGU_FONT, fontWeight: 700, fontSize: 11, color: 'white', margin: '0 0 9px' }}>
          ప్రియమైన సురేష్ & లక్ష్మి గారూ,
        </p>
        <p style={{ fontFamily: TELUGU_FONT, fontSize: 10, color: 'white', lineHeight: 1.7, margin: '0 0 9px' }}>
          మేము అర్జున్‌ని నేరుగా కలవలేదు. మేము వారిని
          డేటాలో కలిశాం. మరియు డేటా — మీరు దానిని
          సరిగ్గా, శ్రద్ధగా చూస్తే — అన్నీ చెప్తుంది.
        </p>
        <p style={{ fontFamily: TELUGU_FONT, fontSize: 10, color: 'white', lineHeight: 1.7, margin: '0 0 9px' }}>
          మేము అర్జున్‌ని మార్కుల ఆధారంగా మాత్రమే
          అంచనా వేయలేదు. వారు కష్టపడిన ప్రతి అంశాన్ని
          అర్థం చేసుకున్న తర్వాత అంచనా వేశాం. అలసిపోయినా
          హోం వర్క్ పంపించిన వారాలను చూశాం.
        </p>
        <p style={{ fontFamily: TELUGU_FONT, fontSize: 10, color: 'white', lineHeight: 1.7, margin: '0 0 9px' }}>
          నాలుగు సంవత్సరాలలో అర్జున్ 330 రోజులు బడికి
          వచ్చారు — ఆ consistency మార్కుషీట్‌లో కనపడదు.
          కానీ మేము చూశాం.
        </p>
        <p style={{ fontFamily: TELUGU_FONT, fontSize: 10, color: 'white', lineHeight: 1.7, margin: '0 0 9px' }}>
          గణితం 68% నుండి 84%కి పెరిగింది. ఆ పెరుగుదల
          పరీక్షా హాలులో జరగదు. అది ముందు రాత్రి
          జరుగుతుంది — మీ పిల్లవాడు ఆ క్షణాలు జీవించారు.
        </p>
        <p style={{ fontFamily: TELUGU_FONT, fontSize: 10, color: 'white', lineHeight: 1.7, margin: 0 }}>
          మీ పిల్లవాడిని నమ్మండి. వారు ఇప్పటికే తమ
          సామర్థ్యాన్ని మీకు చూపించారు.
        </p>
      </div>

      <div>
        <div style={{ ...goldRule(100, forPrint), marginBottom: 16 }} />
        <p style={{ fontFamily: TELUGU_FONT, fontStyle: 'italic', fontSize: 10, color: NP.gold, margin: 0 }}>
          గౌరవంతో మరియు గర్వంతో,
        </p>
        <div style={{ width: 80, height: 1, background: NP.gold, margin: '6px 0' }} />
        <p style={{ fontFamily: TELUGU_FONT, fontStyle: 'italic', fontSize: 10, color: NP.gold, margin: 0 }}>
          NeuraLife బృందం
        </p>
        <p style={{ fontFamily: TELUGU_FONT, fontStyle: 'italic', fontSize: 10, color: NP.gold, margin: 0 }}>
          విశాఖపట్నం, ఆంధ్రప్రదేశ్
        </p>
      </div>

      <div style={{ borderTop: '1px solid rgba(212,168,67,0.2)', marginTop: 16, paddingTop: 10 }}>
        <div style={{ ...goldRule('100%', forPrint), marginBottom: 8 }} />
        <p style={{
          fontFamily: TELUGU_FONT, fontSize: 7, color: 'rgba(255,255,255,0.4)',
          textAlign: 'center', lineHeight: 1.6, margin: 0,
        }}>
          ఈ లేఖ NeuraLife AI ద్వారా అర్జున్ యొక్క
          verified అకడమిక్ రికార్డు నుండి రూపొందించబడింది.
        </p>
      </div>
    </div>
  );
}
