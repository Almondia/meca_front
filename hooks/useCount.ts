import { useState } from 'react';

const useIncrease = (defaultNum: number, startValue: number, endValue: number) => {
  const [number, setNumber] = useState<number>(defaultNum);

  const increaseNumber = (isIncrease: boolean) => {
    if (isIncrease) {
      number < endValue && setNumber(number + 1);
      return;
    }
    number > startValue && setNumber(number - 1);
  };

  return { number, increaseNumber };
};

export default useIncrease;
