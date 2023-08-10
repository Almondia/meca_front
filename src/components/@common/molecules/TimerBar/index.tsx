import { useCallback } from 'react';

import { css, keyframes } from 'styled-components';

import Icon from '@/components/@common/atoms/Icon';

import { TimerBarClock, TimerBarProgression, TimerBarWrapper } from './styled';

interface TimerBarProps {
  /** [선택] 초 단위 입력, 없을 경우 타이머 미적용 */
  second?: number;
}

const TimerBar = ({ second }: TimerBarProps) => {
  const fillAnimation = useCallback(() => {
    if (!second) {
      return undefined;
    }
    const fillFrame = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }`;
    return css`
      animation: ${fillFrame};
      animation-duration: ${second}s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    `;
  }, [second]);
  return (
    <TimerBarWrapper isDisabled={!second}>
      <TimerBarProgression second={second ?? 0} fillAnimation={fillAnimation}>
        <div />
      </TimerBarProgression>
      <TimerBarClock>
        <Icon icon="Clock" color="var(--color-brand)" />
      </TimerBarClock>
    </TimerBarWrapper>
  );
};

export default TimerBar;
