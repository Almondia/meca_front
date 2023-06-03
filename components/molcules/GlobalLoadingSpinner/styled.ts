/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const GlobalLoadingSpinnerWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0.6;
  display: ${(props) => (props.isVisible ? 'inherit' : 'none')};
  background-color: black;
  & > div {
    ${FlexCenter};
  }
`;
