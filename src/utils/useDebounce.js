import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * Hook that debounces a value by `delay` ms.
 * Returns the debounced value.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/**
 * Hook that returns a debounced version of `callback`.
 * The returned function can be called frequently — the actual
 * callback will only fire after `delay` ms of inactivity.
 */
export function useDebouncedCallback(callback, delay = 300) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  // Keep the latest callback in a ref so we don't need it as a dep
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounced = useCallback((...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debounced;
}
