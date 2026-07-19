// Single source of truth for how the 17 logical book pages map onto
// physical printed leaves (sheets). Shared by the on-screen BookViewer
// (Scene2NeuraPath, which needs to know which pages share a leaf so it can
// render them as one open spread) and the PDF generator (which needs the
// same information to impose a duplex-ready print file with blank backs
// inserted at the right spots).
export const PAGE_IDS = [
  'cover', 'promise', 'profile', 'about-report', 'career', 'analysis',
  'class7', 'class8', 'class9', 'class10', 'journey', 'note-for-arjun',
  'feedback-en', 'feedback-te', 'allthebest', 'neura-cert', 'backcover',
] as const;

export type PageId = typeof PAGE_IDS[number];

// Most pages are printed on their own single-sided leaf (blank on the
// back). A few pages are instead physically printed on the BACK of the
// *previous* page's leaf, sharing one physical sheet with it. Maps the
// verso page's index -> the recto index it shares a leaf with.
// (allthebest/neura-cert are deliberately NOT paired here — each gets its
// own single-sided leaf with a blank back.)
export const SPREAD_PAIRS: Record<number, number> = { 3: 4, 11: 12 };

// Pages whose leaf is reversed: blank on the FRONT, page content on the
// BACK — the mirror image of the (content-front, blank-back) default.
// Used for the back cover, which should be the outward-facing last surface
// of the book (like the front cover is the outward-facing first surface),
// not a page you read face-on partway through.
const BLANK_FRONT_PAGES = new Set<number>([16]); // backcover

export interface PrintLeaf {
  front: PageId | null; // null = blank front side
  back: PageId | null;  // null = blank back side
}

// Derives the physical leaf (sheet) sequence in print order: leaf[i].front
// then leaf[i].back are two consecutive sides of one sheet, ready for
// duplex printing (front/back, flip on long edge). A page becomes a
// leaf's "back" only if it's a SPREAD_PAIRS key or a BLANK_FRONT_PAGES
// entry; every other page gets its own leaf with a blank back.
export function buildPrintLeaves(): PrintLeaf[] {
  const leaves: PrintLeaf[] = [];
  for (let i = 0; i < PAGE_IDS.length; i++) {
    if (i in SPREAD_PAIRS) continue; // consumed as the previous leaf's back
    if (BLANK_FRONT_PAGES.has(i)) {
      leaves.push({ front: null, back: PAGE_IDS[i] });
      continue;
    }
    const nextIsVerso = (i + 1) in SPREAD_PAIRS;
    leaves.push({
      front: PAGE_IDS[i],
      back: nextIsVerso ? PAGE_IDS[i + 1] : null,
    });
  }
  return leaves;
}
