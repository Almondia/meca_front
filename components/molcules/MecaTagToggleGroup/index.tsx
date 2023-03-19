import MecaTag from '@/components/atoms/MecaTag';
import { MecaTagType } from '@/types/domain';
import alertToast from '@/utils/toastHandler';

import { MecaTagButton, MecaTagToggleGroupWrapper } from './styled';

export interface MecaTagToggleGroupProps {
  options: MecaTagType[];
  selected: MecaTagType;
  onToggle: (value: MecaTagType) => void;
}

const MecaTagToggleGroup = ({ options, selected, onToggle }: MecaTagToggleGroupProps) => {
  const handleButtonClick = (value: MecaTagType) => {
    // FIXME: 구현되면 제거\
    if (value === 'desc') {
      alertToast('준비중입니다!', 'warning');
      return;
    }
    onToggle(value);
  };
  return (
    <MecaTagToggleGroupWrapper>
      {options.map((option) => (
        <MecaTagButton key={option} onClick={() => handleButtonClick(option)}>
          <MecaTag tagName={option} isNotOpaque={selected !== option} scale={selected === option ? 1.05 : 1} />
        </MecaTagButton>
      ))}
    </MecaTagToggleGroupWrapper>
  );
};

export default MecaTagToggleGroup;
