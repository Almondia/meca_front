import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const GlobalLoadSpinnerWrapper = styled.div<{ isVisible: boolean; isDeferred: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: ${(props) => (props.isDeferred ? 0.6 : 0)};
  display: ${(props) => (props.isVisible ? 'inherit' : 'none')};
  background-color: black;
  & > div {
    ${FlexCenter};
  }
`;
