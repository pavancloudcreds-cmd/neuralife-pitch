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
export const SPREAD_PAIRS: Record<number, number> = { 3: 4, 11: 12, 15: 16 };

export interface PrintLeaf {
  front: PageId;
  back: PageId | null; // null = blank back side
}

// Derives the physical leaf (sheet) sequence in print order: leaf[i].front
// then leaf[i].back are two consecutive sides of one sheet, ready for
// duplex printing (front/back, flip on long edge). A page becomes a
// leaf's "back" only if it's a SPREAD_PAIRS key; every other page gets
// its own leaf with a blank back.
export function buildPrintLeaves(): PrintLeaf[] {
  const leaves: PrintLeaf[] = [];
  for (let i = 0; i < PAGE_IDS.length; i++) {
    if (i in SPREAD_PAIRS) continue; // consumed as the previous leaf's back
    const nextIsVerso = (i + 1) in SPREAD_PAIRS;
    leaves.push({
      front: PAGE_IDS[i],
      back: nextIsVerso ? PAGE_IDS[i + 1] : null,
    });
  }
  return leaves;
}
