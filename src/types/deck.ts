export type SlideTheme = 'light' | 'dark';

export interface SlideMeta {
  id: number;
  slug: string;
  title: string;
  theme: SlideTheme;
  beatCount: number;
}

export const SLIDES: SlideMeta[] = [
  { id: 1,  slug: 'cold-open',          title: 'NeuraLife',              theme: 'dark',  beatCount: 3 },
  { id: 2,  slug: 'systemic-problem',   title: 'The Blind Spot',         theme: 'dark',  beatCount: 3 },
  { id: 3,  slug: 'persona-classroom',  title: 'Classroom & Family',     theme: 'light', beatCount: 4 },
  { id: 4,  slug: 'persona-admin',      title: 'School Administration',  theme: 'light', beatCount: 4 },
  { id: 5,  slug: 'competitive',        title: 'Competitive Landscape',  theme: 'light', beatCount: 4 },
  { id: 6,  slug: 'why-now',            title: 'Why Now',                theme: 'light', beatCount: 4 },
  { id: 7,  slug: 'solution',           title: 'The Solution',           theme: 'light', beatCount: 7 },
  { id: 8,  slug: 'persona-outcomes',   title: 'What Changes',           theme: 'light', beatCount: 7 },
  { id: 9,  slug: 'moats',              title: 'Defensibility',          theme: 'dark',  beatCount: 6 },
  { id: 10, slug: 'proof',              title: "What's Built",           theme: 'light', beatCount: 4 },
  { id: 11, slug: 'feature-spotlight',  title: 'Parent Study Guide',     theme: 'light', beatCount: 2 },
  { id: 12, slug: 'roadmap',            title: 'Roadmap',                theme: 'light', beatCount: 6 },
  { id: 13, slug: 'timeline',           title: 'Timeline',               theme: 'light', beatCount: 4 },
  { id: 14, slug: 'validation',         title: 'Validation',             theme: 'light', beatCount: 3 },
  { id: 15, slug: 'ask-close',          title: 'The Ask',                theme: 'dark',  beatCount: 5 },
];
