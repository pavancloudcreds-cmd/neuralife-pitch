import type { CSSProperties } from 'react';
import { NP } from '../tokens';

// import.meta.env only exists under Vite. These same components also get
// rendered via renderToStaticMarkup in the plain Node/tsx PDF script, where
// it's undefined — guard it so that path doesn't throw. The PDF script never
// actually uses the resulting URL (it always passes a preloaded/inlined
// override prop instead), so the fallback value here is never load-bearing.
const BASE_URL = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';

export const bookAsset = (file: string) => `${BASE_URL}book/${file}`;
export const printAsset = (file: string) => `${BASE_URL}print-assets/${file}`;

// Chrome's print-to-PDF pipeline (and, separately, html2canvas) both fail to
// render gradients with a `transparent` color stop — they paint as a solid
// fallback color instead of fading out. The gradient version is fine for the
// web view; forPrint swaps it for a solid gold bar with no transparency.
export const goldRule = (width: string | number = '100%', forPrint?: boolean): CSSProperties => ({
  width,
  height: 1,
  background: forPrint ? NP.gold : `linear-gradient(90deg, transparent, ${NP.gold}, transparent)`,
  border: 'none',
});
