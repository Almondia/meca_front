import styled, { css, keyframes } from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const ProgressBarWrapper = styled.div<{ backgroundColor: string }>`
  position: relative;
  ${FlexCenter};
  max-width: 170px;
  height: 16px;
  border-radius: 16px;
  background-color: ${(props) => props.backgroundColor};
`;

const FillFrame = () => {
  const animation = keyframes`
    from {
      transform: scaleX(0.1);
      transform-origin: 0% 0%;
    }
    to {
      transform: scaleX(1);
      transform-origin: 0% 0%;
    }`;
  return css`
    animation: ${animation} 1s ease-in-out forwards;
  `;
};

export const ProgressStateBackground = styled.div<{ backgroundColor: string; width: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(props) => props.width};
  height: 16px;
  border-radius: 16px;
  background-color: ${(props) => props.backgroundColor};
  ${FillFrame};
`;

export const ProgressState = styled.div`
  z-index: 2;
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: white;
`;
