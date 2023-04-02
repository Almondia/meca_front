import { useState } from 'react';

import { ElementSizeType } from '@/types/common';

import { InnerToggleButton, ToggleButtonWrapper } from './styled';

type FixedArray<T, L extends number> = [...T[]] & { length: L };

export interface ToggleButtonProps<T extends number> {
  innerTexts: FixedArray<string, T>;
  onClicks: FixedArray<() => void, T>;
  minWidth?: ElementSizeType;
}

const ToggleButtonGroup = <T extends number>({ innerTexts, onClicks, minWidth }: ToggleButtonProps<T>) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index: number) => {
    setSelected(index);
    onClicks[index]?.();
  };
  return (
    <ToggleButtonWrapper>
      {innerTexts.map((text, index) => (
        <InnerToggleButton onClick={() => handleClick(index)} isSelected={selected === index} minWidth={minWidth}>
          {text}
        </InnerToggleButton>
      ))}
    </ToggleButtonWrapper>
  );
};

export default ToggleButtonGroup;
