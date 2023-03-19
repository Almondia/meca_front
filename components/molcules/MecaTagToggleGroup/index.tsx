/* eslint-disable @typescript-eslint/dot-notation */
import { useMemo } from 'react';

import MecaTag from '@/components/atoms/MecaTag';
import { MecaTagType } from '@/types/domain';
import alertToast from '@/utils/toastHandler';

import { MecaTagButton, MecaTagToggleGroupWrapper } from './styled';

export interface MecaTagToggleGroupProps {
  options: MecaTagType[];
  selected: MecaTagType;
  onToggle: (value: MecaTagType) => void;
  onlySelected?: boolean;
}

const MecaTagToggleGroup = ({ options, selected, onToggle, onlySelected }: MecaTagToggleGroupProps) => {
  const handleButtonClick = (value: MecaTagType) => {
    // FIXME: 구현되면 제거\
    if (value === 'desc') {
      alertToast('준비중입니다!', 'warning');
      return;
    }
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
