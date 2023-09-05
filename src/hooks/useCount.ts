import { useCallback, useState } from 'react';

const useIncrease = (defaultNum: number, startValue: number, endValue: number) => {
  const [number, setNumber] = useState<number>(defaultNum);

  const increaseNumber = useCallback(
    (isIncrease: boolean) => {
      if (isIncrease) {
        setNumber((prev) => (prev < endValue ? prev + 1 : prev));
        return;
      }
      setNumber((prev) => (prev > startValue ? prev - 1 : prev));
    },
    [startValue, endValue],
  );

  const resetNumber = useCallback(() => {
    setNumber(defaultNum);
  }, [defaultNum]);

  return { number, increaseNumber, resetNumber };
};

export default useIncrease;
