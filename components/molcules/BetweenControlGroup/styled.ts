import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween } from '@/styles/layout';

export const BetweenControlGroupWrapper = styled.div`
  ${FlexSpaceBetween};
  flex-wrap: wrap;
  gap: 20px;
`;

export const BetweenControlInnerContainer = styled.div`
  ${FlexCenter};
  column-gap: 10px;
`;
