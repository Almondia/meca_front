import { useRef } from 'react';

const useThrottle = <T extends any[]>(callback: (...params: T) => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const throttledCallback = (...params: T) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback(...params);
        timer.current = null;
      }, delay);
    }
  };
  return throttledCallback;
};

export default useThrottle;
