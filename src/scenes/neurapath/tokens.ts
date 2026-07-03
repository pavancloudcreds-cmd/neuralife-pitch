import type { CSSProperties } from 'react';

export const NP = {
  // Page dimensions (A4 proportion, fits on screen)
  PAGE_W: 420,
  PAGE_H: 594,

  // Colors - light theme (web view)
  bg:       '#FAFAF8',
  panel:    '#FFFFFF',
  border:   '#E8E4DC',
  ink:      '#1A2332',
  muted:    '#6B7280',
  faint:    '#9C9890',
  teal:     '#0B6E6E',
  tealVib:  '#0d9488',
  tealBg:   'rgba(11,110,110,0.08)',
  gold:     '#D4A843',
  goldDeep: '#8B6B1F',
  goldBg:   'rgba(212,168,67,0.08)',

  // Page-specific backgrounds (printed colors)
  cream:    '#FFFEF7',
  navyDark: '#0F172A',
  navyMid:  '#1E3A5F',
  sunrise1: '#FFF7ED',
  sunrise2: '#FED7AA',
  sky1:     '#EFF6FF',
  sky2:     '#DBEAFE',
  tealPg1:  '#F0FDFA',
  tealPg2:  '#CCFBF1',
  amber1:   '#FFFBEB',
  amber2:   '#FEF3C7',

  // Gold gradient CSS string
  goldGrad: 'linear-gradient(135deg, #8B6B1F 0%, #F5D67D 45%, #D4A843 70%, #8B6B1F 100%)',
} as const;

// Gold text style object (use as style prop). Web-view only: Chrome's
// print-to-PDF pipeline doesn't clip a background to text — it paints the
// full gradient as a solid rectangle instead. Use goldTextStyle(forPrint)
// wherever a component renders for both contexts.
export const GOLD_TEXT: CSSProperties = {
  background: NP.goldGrad,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

export const goldTextStyle = (forPrint?: boolean): CSSProperties =>
  forPrint ? { color: NP.gold } : GOLD_TEXT;

// Subject colors (consistent across all pages)
export const SUBJECT_COLORS = {
  mathematics:     '#1E3A5F',
  physicalScience: '#0D9488',
  biology:         '#10B981',
  socialStudies:   '#F59E0B',
  english:         '#3B82F6',
  telugu:          '#F43F5E',
} as const;

export const SUBJECT_LABELS: Record<keyof typeof SUBJECT_COLORS, string> = {
  mathematics:     'Mathematics',
  physicalScience: 'Physical Science',
  biology:         'Biology',
  socialStudies:   'Social Studies',
  english:         'English',
  telugu:          'Telugu',
};

// print-color-adjust helper — applied when a page component is rendered
// for the Puppeteer PDF pipeline (forPrint=true), so gradients/dark
// backgrounds always print instead of getting stripped to white.
export const printAdjust = (forPrint?: boolean): CSSProperties =>
  forPrint
    ? ({ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } as CSSProperties)
    : {};

// Woven linen texture for the front/back covers: major grid every 24px,
// fine grid every 6px. Uses opaque color stops (the highlight color fading
// to the base navy itself, not the `transparent` keyword) — Chrome's
// print-to-PDF pipeline has been observed to rasterize a `transparent`
// gradient stop as a solid wrong-color block instead of fading out, so
// this avoids transparency entirely and renders identically on screen and
// in the printed PDF.
export const navyLinen = (_forPrint?: boolean): CSSProperties => ({
  backgroundColor: '#0C1428',
  backgroundImage: `
    linear-gradient(
      rgba(255,255,255,0.07) 1px,
      #0C1428 1px
    ),
    linear-gradient(
      90deg,
      rgba(255,255,255,0.07) 1px,
      #0C1428 1px
    ),
    linear-gradient(
      rgba(255,255,255,0.035) 1px,
      #0C1428 1px
    ),
    linear-gradient(
      90deg,
      rgba(255,255,255,0.035) 1px,
      #0C1428 1px
    )
  `,
  backgroundSize: '24px 24px, 24px 24px, 6px 6px, 6px 6px',
  backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
});
