import { useEffect, useState } from 'react';

const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(
    () => () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    },
    [timer],
  );

  return (...args: Parameters<T>) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);
    setTimer(newTimer);
  };
};

export default useDebounce;
