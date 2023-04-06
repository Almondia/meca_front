import { useCallback } from 'react';
import { css, keyframes } from 'styled-components';

import Icon from '@/components/atoms/Icon';

import { QuizClock, QuizTimerBar, QuizTimerWrapper } from './styled';

export interface QuizTimerProps {
  /** [선택] 초 단위 입력, 없을 경우 타이머 미적용 */
  second?: number;
}

const QuizTimer = ({ second }: QuizTimerProps) => {
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
    <QuizTimerWrapper isDisabled={!second}>
      <QuizTimerBar second={second ?? 0} fillAnimation={fillAnimation}>
        <div />
      </QuizTimerBar>
      <QuizClock>
        <Icon icon="Clock" color="var(--color-brand)" />
      </QuizClock>
    </QuizTimerWrapper>
  );
};

export default QuizTimer;
