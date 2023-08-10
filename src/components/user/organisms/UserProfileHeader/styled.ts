import styled from 'styled-components';

import { FlexColumn } from '@/styles/layout';

export const UserProfileWrapper = styled.section`
  display: flex;
  align-items: center;
  column-gap: 60px;
  @media ${({ theme }) => theme.media.mobile} {
    ${FlexColumn};
    align-items: flex-start;
    row-gap: 16px;
  }
`;
