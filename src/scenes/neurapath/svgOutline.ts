// Pure SVG recolor logic, shared between the browser (useSVGInline, via
// fetch) and the Node-side PDF generator (via fs.readFileSync). Keeping the
// transform in one place guarantees the web view and the printed PDF render
// the exact same outline.
// Every drawable element in these source files carries its paint as a CSS
// style attribute — style="fill:#141c34; stroke:none;" — not as separate
// fill="..."/stroke="..." XML attributes. A color is "near-white" if it's
// one of the two highlight-shading hex values the art actually uses
// (#fdfdfe / #fdfefe) or literal white — everything else is the navy "ink".
const NEAR_WHITE_FILL = /^(#ffffff|#fff|white|#fdfdfe|#fdfefe)$/i;

export function processSvgOutline(
  rawSvg: string,
  targetStrokeColor: string,
  targetFillColor: string = 'none'
): string {
  let svg = rawSvg;

  // Step 1: Remove width/height attributes on root SVG so it scales with
  // its container instead of rendering at its own intrinsic 1254x1254 size.
  svg = svg.replace(/<svg([^>]*)>/, (_match, attrs) => {
    const cleaned = attrs
      .replace(/\s*width="[^"]*"/, '')
      .replace(/\s*height="[^"]*"/, '');
    return `<svg${cleaned} style="width:100%;height:100%">`;
  });

  // Step 2: Recolor each element's fill.
  //
  // This artwork is built entirely from adjacent flat-filled shapes (no
  // actual <path> strokes) — the "line art" look comes from the contrast
  // between the navy "ink" regions and the near-white "highlight" regions,
  // not from a stroke outline. So recoloring works on the two fill tones
  // directly:
  //   - "ink" (anything not near-white) becomes targetStrokeColor — this is
  //     the visible line-art color (gold on the cover, amber on Journey,
  //     navy for the profile watermark, white on the farewell page).
  //   - "highlight" (near-white) becomes targetFillColor — 'none' (the
  //     default) punches it transparent so it disappears into the page
  //     background, giving a sparse gold/amber/navy silhouette with
  //     cut-out shading. Passing an explicit color instead (AllTheBest's
  //     all-white silhouette) makes highlight regions match the ink color
  //     too, so the whole illustration reads as one solid-color shape
  //     regardless of what's behind it (needed since that page's gradient
  //     background isn't uniformly dark).
  svg = svg.replace(/style="fill:\s*([^;]+);\s*stroke:[^;"]*;?"/g, (_match, fillValue) => {
    const fill = fillValue.trim();
    const newFill = NEAR_WHITE_FILL.test(fill) ? targetFillColor : targetStrokeColor;
    return `style="fill:${newFill}; stroke:none;"`;
  });

  return svg;
}
