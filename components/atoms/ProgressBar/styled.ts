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

const FillFrame = ({ width }: { width: string }) => {
  const animation = keyframes`
    from {
      width: 0;
    }
    to {
      width: ${width};
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
