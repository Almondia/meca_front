import { memo, useMemo } from 'react';

import type { MecaTag as MecaTagType } from '@/types/domain/meca';

import IconTag from '@/components/@common/molecules/IconTag';
import InputGroup from '@/components/@common/molecules/InputGroup';
import { MECA_TAGS } from '@/utils/constants';

import { MecaTagButton, MecaTagToggleGroupWrapper } from './styled';

interface MecaTagToggleGroupProps {
  options: MecaTagType[];
  selected: MecaTagType;
  onToggle: (value: MecaTagType) => void;
  onlySelected?: boolean;
}

const MecaTagToggleGroup = memo(({ options, selected, onToggle, onlySelected }: MecaTagToggleGroupProps) => {
  const handleButtonClick = (value: MecaTagType) => {
    onToggle(value);
  };
  const tagOptions = useMemo(
    () => (onlySelected ? [options.find((option) => option === selected)] : options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onlySelected],
  ) as MecaTagType[];
  return (
    <InputGroup>
      <InputGroup.Label>{onlySelected ? '문제 유형' : '문제 유형 한가지를 선택하세요'}</InputGroup.Label>
      <MecaTagToggleGroupWrapper>
        {tagOptions.map((option: MecaTagType) => (
          <MecaTagButton key={option} selected={selected === option} onClick={() => handleButtonClick(option)}>
            <IconTag scale={selected === option ? 1.025 : 1} {...MECA_TAGS[option]} />
          </MecaTagButton>
        ))}
      </MecaTagToggleGroupWrapper>
    </InputGroup>
  );
});

export default MecaTagToggleGroup;
