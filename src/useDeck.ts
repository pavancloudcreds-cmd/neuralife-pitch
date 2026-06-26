import { useState, useEffect, useCallback } from 'react';

export const SCENES = [
  { id: 1, slug: 'device',      label: 'The Device'     },
  { id: 2, slug: 'impact',      label: 'The Impact'     },
  { id: 3, slug: 'roadmap',     label: 'Roadmap'        },
  { id: 4, slug: 'competition', label: 'No Competition' },
  { id: 5, slug: 'moats',       label: 'The Moats'      },
  { id: 6, slug: 'ask',         label: 'The Ask'        },
  { id: 7, slug: 'legal',       label: 'Legal Journey'  },
] as const;

export function useDeck() {
  const [scene, setScene] = useState(0);

  const next = useCallback(() =>
    setScene(s => Math.min(s + 1, SCENES.length - 1)), []);
  const prev = useCallback(() =>
    setScene(s => Math.max(s - 1, 0)), []);
  const goTo = useCallback((i: number) => setScene(i), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault(); next();
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault(); prev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  return { scene, next, prev, goTo, total: SCENES.length };
}
