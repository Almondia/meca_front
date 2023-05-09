import styled from 'styled-components';

import { FlexSpaceBetween } from '@/styles/layout';

export const ListControlGroupWrapper = styled.div`
  ${FlexSpaceBetween};
  flex-wrap: wrap;
  gap: 20px;
`;

export const ListControlBetweenContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;
