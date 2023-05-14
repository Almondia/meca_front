import styled from 'styled-components';

import { FlexColumn } from '@/styles/layout';

export const QuizResulDashBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 210px minmax(0px, auto) auto;
  gap: 1rem;
  grid-template-areas:
    'wordcloud wordcloud ratebar'
    'answer-rate time-rate ratebar'
    'content-1 content-1 content-1';
  @media ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 3fr 4fr 3fr;
    grid-template-areas:
      'wordcloud wordcloud wordcloud'
      'answer-rate ratebar time-rate'
      'content-1 content-1 content-1';
  }
  @media ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'wordcloud'
      'ratebar'
      'answer-rate'
      'time-rate'
      'content-1';
  }
  position: relative;
`;

export const QuizResultContentArea = styled.div`
  grid-area: content-1;
`;

export const QuizResultWordCloudArea = styled.div`
  grid-area: wordcloud;
`;

export const QuizResultAnswerRateDougnutArea = styled.div`
  grid-area: answer-rate;
  @media ${({ theme }) => theme.media.mobile} {
    & > article > div > div {
      transform: scale(0.9);
    }
  }
`;

export const QuizResultTimeRateDougnutArea = styled.div`
  grid-area: time-rate;
  @media ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export const QuizResultScoreRateBarArea = styled.div`
  grid-area: ratebar;
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
