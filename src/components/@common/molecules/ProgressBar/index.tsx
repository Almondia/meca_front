import { memo } from 'react';

import { ProgressBarWrapper, ProgressState, ProgressStateBackground } from './styled';

interface ProgressBarProps {
  backgroundColor: [string, string];
  type: 'percentage' | 'devision';
  maxValue: number;
  currentValue: number;
}

const ProgressBar = memo(({ backgroundColor, type, maxValue, currentValue }: ProgressBarProps) => (
  <ProgressBarWrapper backgroundColor={backgroundColor[0]}>
    <ProgressStateBackground
      backgroundColor={backgroundColor[1]}
      width={`${Math.max(10, (currentValue / maxValue) * 100).toFixed(1)}%`}
    />
    <ProgressState>
      {type === 'devision'
        ? `${currentValue.toFixed(0)} / ${maxValue}`
        : `${((currentValue / maxValue) * 100).toFixed(1)}%`}
    </ProgressState>
  </ProgressBarWrapper>
));

export default ProgressBar;
