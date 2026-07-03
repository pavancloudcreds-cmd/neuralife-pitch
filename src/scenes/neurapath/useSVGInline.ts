import { useEffect, useState } from 'react';
import { processSvgOutline } from './svgOutline';

// Loads an SVG file and recolors it to a line-art outline: the target
// stroke color is applied to every drawable element, and only explicit
// white/none fills are stripped (leaving other fills — the ones the
// wreath/shield/star details need to render at all — untouched).
//
// This only runs in the browser (via useEffect + fetch). The Puppeteer PDF
// pipeline can't rely on this — renderToStaticMarkup never fires effects —
// so it calls processSvgOutline() directly against the file read from disk
// and passes the result in as a prop instead.
export function useSVGInline(
  svgPath: string,
  targetStrokeColor: string,
  targetFillColor: string = 'none'
): string {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch(svgPath)
      .then(r => r.text())
      .then(raw => {
        if (cancelled) return;
        setSvgContent(processSvgOutline(raw, targetStrokeColor, targetFillColor));
      })
      .catch(err => console.error('SVG load failed:', err, svgPath));
    return () => { cancelled = true; };
  }, [svgPath, targetStrokeColor, targetFillColor]);

  return svgContent;
}
