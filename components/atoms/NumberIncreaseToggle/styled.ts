import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const NumberIncreaseToggleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  & > div {
    display: inline-flex;
    border: 1px solid var(--color-lightgray);
  }
`;

export const NumberIncreaseToggleInnerContainer = styled.div`
  ${FlexCenter};
  padding: 6px 8px;
  border-left: 1px solid var(--color-lightgray);
  border-right: 1px solid var(--color-lightgray);
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: var(--color-brand);
`;

export const NumberIncreaseToggleButton = styled(NumberIncreaseToggleInnerContainer.withComponent('button'))`
  border-radius: 0;
  border: none;
  color: var(--color-text);
  :hover {
    background-color: var(--color-lightgray);
    opacity: 0.7;
  }
`;
