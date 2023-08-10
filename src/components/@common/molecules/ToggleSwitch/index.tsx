import { useCallback, useEffect, useRef, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import { HiddenText } from '@/styles/common';

import { ToggleSwitchBackground, ToggleSwitchWrapper } from './styled';

interface ToggleSwitchProps {
  initialState: boolean;
  toggleName: string;
  onClick: () => void;
}

const ToggleSwitch = ({ initialState, toggleName, onClick }: ToggleSwitchProps) => {
  const didMountRef = useRef<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(initialState);
  const debouncedToggle = useDebounce(toggle, 300);
  const handleToggleClick = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);
  useEffect(() => {
    if (!didMountRef.current) {
      setTimeout(() => {
        didMountRef.current = true;
      }, 310);
    }
  }, []);
  useEffect(() => {
    if (didMountRef.current) {
      onClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedToggle]);

  return (
    <ToggleSwitchWrapper>
      <ToggleSwitchBackground isOn={toggle} onClick={handleToggleClick}>
        <HiddenText>{toggleName}</HiddenText>
        <div className="toggle-switch-circle" />
      </ToggleSwitchBackground>
    </ToggleSwitchWrapper>
  );
};

export default ToggleSwitch;
