import { useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import { HiddenText } from '@/styles/common';

import { ToggleBackground, ToggleWrapper } from './styled';

interface ToggleProps {
  initialState: boolean;
  toggleName: string;
  onToggle: (toggleState: boolean) => void;
}

const Toggle = ({ initialState, toggleName, onToggle }: ToggleProps) => {
  const [toggle, setToggle] = useState<boolean>(initialState);
  const debouncedClick = useDebounce(onToggle, 300);
  const handleToggleClick = () => {
    setToggle(!toggle);
    debouncedClick(!toggle);
  };
  return (
    <ToggleWrapper>
      <ToggleBackground isOn={toggle} onClick={handleToggleClick}>
        <HiddenText>{toggleName}</HiddenText>
        <p className="toggle-switch-circle" />
      </ToggleBackground>
    </ToggleWrapper>
  );
};

export default Toggle;
