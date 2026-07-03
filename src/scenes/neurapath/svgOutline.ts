// Pure SVG recolor logic, shared between the browser (useSVGInline, via
// fetch) and the Node-side PDF generator (via fs.readFileSync). Keeping the
// transform in one place guarantees the web view and the printed PDF render
// the exact same outline.
//
// Every drawable element in these source files carries its paint as a CSS
// style attribute — style="fill:#141c34; stroke:none;" — not as separate
// fill="..."/stroke="..." XML attributes. The art is built from many
// adjacent flat-filled shapes rather than drawn strokes, but a true
// "outline" look (not a filled silhouette) means every one of those shape
// boundaries needs to become a visible stroke with no fill: fill:none,
// stroke:targetStrokeColor. STROKE_WIDTH is in viewBox units (the source is
// a 1254x1254 viewBox) — 6 units reads as a crisp, consistent-weight line
// across the different display sizes these get scaled to (70px watermark
// up to 220px cover).
const STROKE_WIDTH = 6;

export function processSvgOutline(
  rawSvg: string,
  targetStrokeColor: string,
  _targetFillColor: string = 'none'
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

  // Step 2: Replace every shape's fill+stroke style with an outline-only
  // style: no fill, a visible stroke in the target color.
  svg = svg.replace(
    /style="fill:\s*[^;]+;\s*stroke:[^;"]*;?"/g,
    `style="fill:none; stroke:${targetStrokeColor}; stroke-width:${STROKE_WIDTH}; stroke-linejoin:round;"`
  );

  return svg;
}
