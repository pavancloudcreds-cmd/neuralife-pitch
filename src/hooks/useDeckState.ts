import { useState, useCallback, useEffect, useRef } from 'react';
import { SLIDES } from '../types/deck';

export function useDeckState() {
  const initialSlide = (() => {
    const hash = window.location.hash.replace('#', '');
    const found = SLIDES.findIndex(s => s.slug === hash);
    return found >= 0 ? found : 0;
  })();

  const [slideIndex, setSlideIndex] = useState(initialSlide);
  const [beatIndex, setBeatIndex] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);

  const currentSlide = SLIDES[slideIndex];

  useEffect(() => {
    window.location.hash = currentSlide.slug;
  }, [slideIndex, currentSlide.slug]);

  const next = useCallback(() => {
    if (overviewOpen) return;
    const slide = SLIDES[slideIndex];
    if (beatIndex < slide.beatCount - 1) {
      setBeatIndex(b => b + 1);
    } else if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(i => i + 1);
      setBeatIndex(0);
    }
  }, [slideIndex, beatIndex, overviewOpen]);

  const prev = useCallback(() => {
    if (overviewOpen) return;
    if (beatIndex > 0) {
      setBeatIndex(b => b - 1);
    } else if (slideIndex > 0) {
      const prevSlide = SLIDES[slideIndex - 1];
      setSlideIndex(i => i - 1);
      setBeatIndex(prevSlide.beatCount - 1);
    }
  }, [slideIndex, beatIndex, overviewOpen]);

  const jumpTo = useCallback((index: number) => {
    setSlideIndex(index);
    setBeatIndex(0);
    setOverviewOpen(false);
  }, []);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        delta > 0 ? next() : prev();
      }
      touchStartX.current = null;
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [next, prev]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOverviewOpen(o => !o);
        return;
      }
      if (overviewOpen) return;
      if (['Enter', ' ', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, overviewOpen]);

  return {
    slideIndex, beatIndex, currentSlide,
    overviewOpen, setOverviewOpen,
    next, prev, jumpTo,
    progress: (slideIndex / (SLIDES.length - 1)) * 100,
  };
}
