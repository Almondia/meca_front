import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const NumberIncreaseToggleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const NumberIncreaseToggleInnerContainer = styled.div`
  ${FlexCenter};
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.lightGray};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.brandColor};
`;

export const NumberIncreaseToggleButton = styled(NumberIncreaseToggleInnerContainer)`
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;
