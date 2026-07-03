import { NP, printAdjust, navyLinen } from '../tokens';
import { printAsset, goldRule } from './shared';
import NavyLinenTexture from './NavyLinenTexture';

interface Props {
  forPrint?: boolean;
  qrSrc?: string;
}

export default function BackCoverPage({ forPrint, qrSrc }: Props) {
  return (
    <div style={{
      width: NP.PAGE_W, height: NP.PAGE_H,
      ...navyLinen(forPrint),
      boxSizing: 'border-box',
      position: 'relative',
      ...printAdjust(forPrint),
    }}>
      <NavyLinenTexture />
      <div style={{
        position: 'absolute', inset: 12, border: '1px solid rgba(212,168,67,0.3)',
        borderRadius: 2, pointerEvents: 'none',
      }} />

      {/* Real content sits in its own positioned layer, above the texture
          (which is position:absolute with zIndex:0 — without an explicit
          higher zIndex here, static-flow content doesn't reliably paint
          above a positioned sibling). */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', height: '100%', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 40,
      }}>
        {/* Centered group: QR code + scan text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{
            border: `2px solid ${NP.gold}`, padding: 10, background: 'white', borderRadius: 4,
            display: 'inline-block',
          }}>
            <img src={qrSrc ?? printAsset('qr.png')} width={90} height={90} style={{ display: 'block' }} alt="" />
          </div>

          <div style={{ ...goldRule(100, forPrint), margin: '16px auto 0' }} />
          <div style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 8, color: NP.gold, textAlign: 'center', marginTop: 12,
          }}>
            Scan for the full interactive NeuraPath experience
          </div>
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: 24, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ ...goldRule('80%', forPrint) }} />
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, color: NP.gold, textAlign: 'center', marginTop: 10 }}>
            neuralife.in
          </div>
          <div style={{
            fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 10, color: NP.gold, textAlign: 'center', marginTop: 4,
          }}>
            "Every grade remembered. Every student known."
          </div>
        </div>
      </div>
    </div>
  );
}
