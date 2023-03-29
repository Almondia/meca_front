import Icon from '@/components/atoms/Icon';

import { QuizClock, QuizTimerBar, QuizTimerWrapper } from './styled';

export interface QuizTimerProps {
  /** [선택] 초 단위 입력, 없을 경우 타이머 미적용 */
  second?: number;
}

const QuizTimer = ({ second }: QuizTimerProps) => (
  <QuizTimerWrapper isDisabled={!second}>
    <QuizTimerBar second={second ?? 0}>
      <div />
    </QuizTimerBar>
    <QuizClock>
      <Icon icon="Clock" color="var(--color-brand)" />
    </QuizClock>
  </QuizTimerWrapper>
);

export default QuizTimer;
