/* eslint-disable @typescript-eslint/dot-notation */
import { useMemo } from 'react';

import MecaTag from '@/components/molcules/MecaTag';
import { MecaTagType } from '@/types/domain';

import { MecaTagButton, MecaTagToggleGroupWrapper } from './styled';

export interface MecaTagToggleGroupProps {
  options: MecaTagType[];
  selected: MecaTagType;
  onToggle: (value: MecaTagType) => void;
  onlySelected?: boolean;
}

const MecaTagToggleGroup = ({ options, selected, onToggle, onlySelected }: MecaTagToggleGroupProps) => {
  const handleButtonClick = (value: MecaTagType) => {
    onToggle(value);
  };
  const tagOptions = useMemo(
    () => (onlySelected ? [options.find((option) => option === selected)] : options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onlySelected],
  ) as MecaTagType[];
  return (
    <MecaTagToggleGroupWrapper>
      {tagOptions.map((option: MecaTagType) => (
        <MecaTagButton key={option} onClick={() => handleButtonClick(option)}>
          <MecaTag tagName={option} isNotOpaque={selected !== option} scale={selected === option ? 1.05 : 1} />
        </MecaTagButton>
      ))}
    </MecaTagToggleGroupWrapper>
  );
};

export default MecaTagToggleGroup;
