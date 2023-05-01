import styled from 'styled-components';

import { FlexColumn } from '@/styles/layout';

export const QuizResulDashBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 270px minmax(0px, auto) auto;
  gap: 1rem;
  grid-template-areas:
    'content-1 content-1 sidebar'
    'content-2 content-2 sidebar'
    'footer footer sidebar';
  @media ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'content-1'
      'sidebar'
      'content-2'
      'footer';
  }
`;

export const QuizResultUpperContentArea = styled.div`
  grid-area: content-1;
`;

export const QuizResultLowerContentArea = styled.div`
  grid-area: content-2;
`;

export const QuizResultSideArea = styled.div`
  grid-area: sidebar;
  ${FlexColumn};
  row-gap: 1rem;

  @media ${({ theme }) => theme.media.tablet} {
    display: grid;
    grid-template-columns: 3fr 4fr 3fr;
    column-gap: 1rem;
  }
  @media ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const QuizResultFooterArea = styled.div`
  grid-area: footer;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
