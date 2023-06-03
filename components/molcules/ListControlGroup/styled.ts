import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween } from '@/styles/layout';

export const ListControlGroupWrapper = styled.div`
  ${FlexSpaceBetween};
  flex-wrap: wrap;
  gap: 20px;
`;

export const ListControlBetweenContainer = styled.div`
  ${FlexCenter};
  column-gap: 10px;
`;
