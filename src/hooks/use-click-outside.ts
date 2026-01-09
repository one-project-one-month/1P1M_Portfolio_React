import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  callback: (event: MouseEvent | TouchEvent) => void,
) => {
  const elementRef = useRef<T>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const el = elementRef.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }
      callbackRef.current(event);
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return elementRef;
};
