import { CountIndicatorCurrentCounter, CountIndicatorMaxCounter, CountIndicatorWrapper } from './styled';

export interface CountIndicatorProps {
  currentCount: number;
  maxCount: number;
}

const CountIndicator = ({ currentCount, maxCount }: CountIndicatorProps) => (
  <CountIndicatorWrapper>
    <CountIndicatorCurrentCounter isMoreThanHalf={currentCount / maxCount >= 0.5}>
      {Math.min(currentCount, maxCount)}
    </CountIndicatorCurrentCounter>
    <CountIndicatorMaxCounter>/</CountIndicatorMaxCounter>
    <CountIndicatorMaxCounter data-testid="id-count-indicator-maxcount">{maxCount}</CountIndicatorMaxCounter>
  </CountIndicatorWrapper>
);

export default CountIndicator;
