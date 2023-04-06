import React from 'react';
import styled, { keyframes } from 'styled-components';

import { FlexCenter } from '@/styles/layout';
import { ElementSizeType } from '@/types/common';

const SpinFrame = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }`;

const LoadSpinnerWrapper = styled.div<{ width: ElementSizeType; size: ElementSizeType }>`
  grid-column: 1 / -1;
  ${FlexCenter};
  width: ${(props) => props.width};
  min-height: 60px;
  height: 40px;
  padding: 30px 0;
  & > div {
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    border: 5px solid var(--color-lightgray);
    border-right: 5px solid var(--color-brand);
    border-top: 5px solid var(--color-brand);
    border-radius: 50%;
    opacity: 0.8;
    animation: ${SpinFrame} 0.6s linear infinite;
  }
`;

export interface LoadSpinnerProps {
  width: ElementSizeType;
  size?: ElementSizeType;
}

const LoadSpinner = ({ width, size = '2.25rem' }: LoadSpinnerProps) => (
  <LoadSpinnerWrapper data-testid="id-scroll-load-spinner" width={width} size={size}>
    <div />
  </LoadSpinnerWrapper>
);

export default React.memo(LoadSpinner);
