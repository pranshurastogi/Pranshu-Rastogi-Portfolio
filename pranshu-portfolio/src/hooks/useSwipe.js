import { useRef, useEffect } from 'react';

export function useSwipe(onSwipeLeft, onSwipeRight, threshold = 50) {
  const elementRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  // Keep callbacks fresh without triggering effect re-runs
  const callbacksRef = useRef({ onSwipeLeft, onSwipeRight });

  useEffect(() => {
    callbacksRef.current = { onSwipeLeft, onSwipeRight };
  }, [onSwipeLeft, onSwipeRight]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleStart = (e) => {
      touchEndRef.current = null;
      touchStartRef.current = e.targetTouches[0].clientX;
    };
    const handleMove = (e) => {
      touchEndRef.current = e.targetTouches[0].clientX;
    };
    const handleEnd = () => {
      if (touchStartRef.current === null || touchEndRef.current === null) return;
      const distance = touchStartRef.current - touchEndRef.current;
      if (distance > threshold) callbacksRef.current.onSwipeLeft?.();
      else if (distance < -threshold) callbacksRef.current.onSwipeRight?.();
    };

    el.addEventListener('touchstart', handleStart, { passive: true });
    el.addEventListener('touchmove',  handleMove,  { passive: true });
    el.addEventListener('touchend',   handleEnd,   { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleStart);
      el.removeEventListener('touchmove',  handleMove);
      el.removeEventListener('touchend',   handleEnd);
    };
  }, [threshold]); // listeners only re-attach if threshold changes

  return elementRef;
}
