import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const NumberIncreaseToggleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const NumberIncreaseToggleInnerContainer = styled.div`
  ${FlexCenter};
  padding: 6px;
  border: 1px solid var(--color-lightgray);
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: var(--color-brand);
`;

export const NumberIncreaseToggleButton = styled(NumberIncreaseToggleInnerContainer)`
  color: var(--color-text);
  cursor: pointer;
`;
