import { useMemo } from 'react';

import IconTag from '@/components/@common/molecules/IconTag';
import { MecaTagType } from '@/types/domain';
import { MECA_TAGS } from '@/utils/constants';

import { MecaTagButton, MecaTagToggleGroupWrapper } from './styled';

interface MecaTagToggleGroupProps {
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
        <MecaTagButton key={option} selected={selected === option} onClick={() => handleButtonClick(option)}>
          <IconTag scale={selected === option ? 1.025 : 1} {...MECA_TAGS[option]} />
        </MecaTagButton>
      ))}
    </MecaTagToggleGroupWrapper>
  );
};

export default MecaTagToggleGroup;
