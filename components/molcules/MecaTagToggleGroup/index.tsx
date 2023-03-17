import MecaTag from '@/components/atoms/MecaTag';
import { MecaTagType } from '@/types/domain';

import { MecaTagButton, MecaTagToggleGroupWrapper } from './styled';

export interface MecaTagToggleGroupProps {
  options: MecaTagType[];
  selected: MecaTagType;
  onToggle: (value: MecaTagType) => void;
}

const MecaTagToggleGroup = ({ options, selected, onToggle }: MecaTagToggleGroupProps) => {
  const handleButtonClick = (value: MecaTagType) => {
    onToggle(value);
  };
  return (
    <MecaTagToggleGroupWrapper>
      {options.map((option) => (
        <MecaTagButton onClick={() => handleButtonClick(option)}>
          <MecaTag tagName={option} isNotOpaque={selected !== option} />
        </MecaTagButton>
      ))}
    </MecaTagToggleGroupWrapper>
  );
};

export default MecaTagToggleGroup;
