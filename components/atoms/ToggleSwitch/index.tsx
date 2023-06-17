import { useCallback, useEffect, useRef, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import { HiddenText } from '@/styles/common';

import { ToggleSwitchBackground, ToggleSwitchWrapper } from './styled';

export interface ToggleSwitchProps {
  /** 초기 활성화 상태 */
  initialState: boolean;
  /** 어떤 목적의 토글인지 명시 */
  toggleName: string;
  /** 토글 변경 시 호출할 핸들러 함수 */
  onClick: () => void;
}

/** on/off 기능을 하는 토글 스위치 컴포넌트 */
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
