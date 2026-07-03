// Pure SVG recolor logic, shared between the browser (useSVGInline, via
// fetch) and the Node-side PDF generator (via fs.readFileSync). Keeping the
// transform in one place guarantees the web view and the printed PDF render
// the exact same outline.
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

  // Step 2: Convert EXPLICIT white fills to targetFillColor (default
  // 'none'). These are the highlight-shading regions of the source art.
  // Left as 'none' they punch transparent gaps that let the page background
  // show through (fine for a sparse gold/amber line-art look); passing the
  // stroke color instead makes those regions solid, so the illustration
  // reads as a filled silhouette rather than a gappy outline. Note: the
  // source art's "white" is authored as near-white (#fdfdfe / #fdfefe), not
  // literal #ffffff.
  svg = svg.replace(/fill="#ffffff"/gi, `fill="${targetFillColor}"`);
  svg = svg.replace(/fill="#fff"/gi, `fill="${targetFillColor}"`);
  svg = svg.replace(/fill="white"/gi, `fill="${targetFillColor}"`);
  svg = svg.replace(/fill="#fdfdfe"/gi, `fill="${targetFillColor}"`);
  svg = svg.replace(/fill="#fdfefe"/gi, `fill="${targetFillColor}"`);

  // Step 3: Convert ALL stroke colors to target color (whether explicit or added).
  svg = svg.replace(/stroke="[^"]*"/g, `stroke="${targetStrokeColor}"`);

  // Step 4: For elements with NO explicit stroke, add the target stroke color.
  svg = svg.replace(
    /<(path|circle|line|polyline|polygon|ellipse|rect)(\s)/g,
    (match, tag, space) => {
      if (!match.includes('stroke=')) {
        return `<${tag} stroke="${targetStrokeColor}"${space}`;
      }
      return match;
    }
  );

  // Step 5: Remove fill="none" only from container groups (g tags) — they
  // should not have fills. Keep fill="none" on actual drawing elements.
  svg = svg.replace(/<g\s([^>]*)fill="none"([^>]*)>/g, '<g $1$2>');

  return svg;
}
