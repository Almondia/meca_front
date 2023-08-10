import styled, { keyframes } from 'styled-components';

import { Flex, FlexCenter } from '@/styles/layout';

const fadeIn = keyframes`
  from {
    transform: translateY(200px) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: var(--color-backghround-shadow);
`;

export const ModalWrapper = styled.div`
  z-index: 15;
  ${FlexCenter};
  height: 100%;
`;

export const ModalContainer = styled.div`
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 4px;
  width: 360px;
  background: var(--color-background);
  box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.05);

  @media ${({ theme }) => theme.media.mobile} {
    padding: 20px;
  }
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const CloseIconButton = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  transform: scale(0.7);
  path {
    stroke: var(--color-text);
  }
`;

export const ModalButtonGroup = styled.div`
  ${Flex};
  justify-content: end;
  align-items: flex-end;
  column-gap: 8px;
  margin-top: 26px;
  margin-right: -8px;
  @media ${({ theme }) => theme.media.mobile} {
    margin-right: 0px;
  }
`;
