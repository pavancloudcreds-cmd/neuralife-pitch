// Woven grid overlay for the front/back covers — major grid every 24px,
// fine grid every 6px. Rendered as two separate absolutely-positioned
// layers (one for each gradient direction) rather than one element with a
// 4-layer background-image list: Chrome's print-to-PDF pipeline silently
// drops any 90deg gradient stacked in the same background-image list as a
// 0deg one (confirmed via isolated test — a single-direction stack always
// renders, a mixed-direction stack always loses the 90deg layer). Splitting
// by direction sidesteps the bug entirely and renders identically in the
// web view and the printed PDF.
//
// Render as a child of a position:relative container sized to fill it.
export default function NavyLinenTexture() {
  return (
    <>
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, #0C1428 1px),
            linear-gradient(rgba(255,255,255,0.035) 1px, #0C1428 1px)
          `,
          backgroundSize: '24px 24px, 6px 6px',
          backgroundPosition: '-1px -1px, -1px -1px',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 6px 6px',
          backgroundPosition: '-1px -1px, -1px -1px',
        }}
      />
    </>
  );
}
