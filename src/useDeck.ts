import { useState, useEffect, useCallback } from 'react';
import { drilldownState } from './scenes/neurapath/drilldownState';

export const SCENES = [
  { id: 1, slug: 'device',      label: 'The Device'     },
  { id: 2, slug: 'neurapath',   label: 'NeuraPath'      },
  { id: 3, slug: 'impact',      label: 'The Impact'     },
  { id: 4, slug: 'roadmap',     label: 'Roadmap'        },
  { id: 5, slug: 'competition', label: 'No Competition' },
  { id: 6, slug: 'moats',       label: 'The Moats'      },
  { id: 7, slug: 'ask',         label: 'The Ask'        },
  { id: 8, slug: 'legal',       label: 'Legal Journey'  },
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
      if (drilldownState.active) return;
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
