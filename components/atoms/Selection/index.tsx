/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';

import { ElementSizeType } from '@/types/common';

import { SelectionToggle, SelectionWrapper } from './styled';

type FixedArray<T, L extends number> = [...T[]] & { length: L };

export interface SelectionProps<T extends number> {
  initialSelectedIndex?: number;
  innerTexts: FixedArray<string, T>;
  onClicks: FixedArray<() => void, T>;
  minWidth?: ElementSizeType;
  forceSelectedIndex?: number;
}

const Selection = <T extends number>({
  initialSelectedIndex = 0,
  innerTexts,
  onClicks,
  minWidth,
  forceSelectedIndex,
}: SelectionProps<T>) => {
  const [selected, setSelected] = useState(initialSelectedIndex);

  useEffect(() => {
    if (forceSelectedIndex === undefined) {
      return;
    }
    setSelected(forceSelectedIndex);
  }, [forceSelectedIndex]);

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
