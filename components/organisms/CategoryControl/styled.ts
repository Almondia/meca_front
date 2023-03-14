import styled from 'styled-components';

import { FlexSpaceBetween } from '@/styles/layout';

export const CategoryControlWrapper = styled.div`
  ${FlexSpaceBetween};
  flex-wrap: wrap;
  row-gap: 16px;
`;

export const CategoryControlComponentsContainer = styled.div`
  display: flex;
  column-gap: 10px;
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;
