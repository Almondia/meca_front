import styled, { FlattenSimpleInterpolation, Keyframes } from 'styled-components';

import { COLOR } from '@/styles/constants';
import { FlexCenter } from '@/styles/layout';

export const QuizTimerWrapper = styled.div<{ isDisabled: boolean }>`
  position: relative;
  ${FlexCenter};
  width: 100%;
  height: 36px;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
`;

export const QuizClock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${FlexCenter};
  width: 32px;
  height: 32px;
  padding-top: 2px;
  border-radius: 100%;
  border: 2px solid var(--color-brand);
  background-color: var(--color-background);
`;

export const QuizTimerBar = styled.div<{ second: number; fillAnimation: () => FlattenSimpleInterpolation | undefined }>`
  position: relative;
  ${FlexCenter};
  width: 100%;
  height: 10px;
  border-radius: 8px;
  border: 2px solid ${COLOR.brand3};
  overflow: hidden;
  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 10px;
    background-color: var(--color-subbrand);
    opacity: 0.5;
  }
  & > div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-brand);
    ${(props) => props?.fillAnimation?.()};
  }
`;
