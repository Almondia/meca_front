/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import { ElementSizeType } from '@/types/common';

import { SelectionToggle, SelectionWrapper } from './styled';

type FixedArray<T, L extends number> = [...T[]] & { length: L };

export interface SelectionProps<T extends number> {
  innerTexts: FixedArray<string, T>;
  onClicks: FixedArray<() => void, T>;
  minWidth?: ElementSizeType;
}

const Selection = <T extends number>({ innerTexts, onClicks, minWidth }: SelectionProps<T>) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index: number) => {
    setSelected(index);
    onClicks[index]?.();
  };
  return (
    <SelectionWrapper>
      {innerTexts.map((text, index) => (
        <SelectionToggle
          key={index}
          onClick={() => handleClick(index)}
          isSelected={selected === index}
          minWidth={minWidth}
        >
          {text}
        </SelectionToggle>
      ))}
    </SelectionWrapper>
  );
};

export default Selection;
