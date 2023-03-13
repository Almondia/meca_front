import React from 'react';

import { ProgressBarWrapper, ProgressState, ProgressStateBackground } from './styled';

export interface ProgressBarProps {
  /** [필수] 배경색 `[0 , 1] => [기본 배경색, 진행된 막대 배경색]` */
  backgroundColor: [string, string];
  /** [필수] 텍스트를 % 또는 /(나누기)로 나타냄 */
  type: 'percentage' | 'devision';
  /** [필수] 최대 수치 */
  maxValue: number;
  /** [필수] 현재 수치 */
  currentValue: number;
}

/**
 * 현재 / 최대 수치를 입력받아 진행 척도를 나타내는 컴포넌트
 */
const ProgressBar = ({ backgroundColor, type, maxValue, currentValue }: ProgressBarProps) => (
  <ProgressBarWrapper backgroundColor={backgroundColor[0]}>
    <ProgressStateBackground
      backgroundColor={backgroundColor[1]}
      width={`${Math.max(10, (currentValue / maxValue) * 100).toFixed(1)}%`}
    />
    <ProgressState>
      {type === 'devision' ? `${currentValue} / ${maxValue}` : `${((currentValue / maxValue) * 100).toFixed(1)}%`}
    </ProgressState>
  </ProgressBarWrapper>
);

export default React.memo(ProgressBar);
