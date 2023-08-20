import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const CategoryListSearchGroupWrapper = styled.div`
  @media ${({ theme }) => theme.media.mobile} {
    & > div > div {
      width: 100%;
      & > * {
        width: 100%;
        ${FlexCenter};
      }
    }
    & > div > div:first-child {
      button {
        width: 100%;
      }
    }
  }
`;
