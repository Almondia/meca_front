import styled from 'styled-components';

export const QuizResulDashBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 210px minmax(45px, auto) auto;
  gap: 1rem;
  grid-template-areas:
    'wordcloud wordcloud answer-rate'
    'ratebar ratebar answer-rate'
    'ratebar ratebar time-rate';
  @media ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 3fr 4fr 3fr;
    grid-template-areas:
      'wordcloud wordcloud wordcloud'
      'answer-rate ratebar time-rate';
  }
  @media ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'wordcloud'
      'ratebar'
      'answer-rate'
      'time-rate';
  }
  position: relative;
`;

export const QuizResultWordCloudArea = styled.div`
  grid-area: wordcloud;
`;

export const QuizResultAnswerRateDougnutArea = styled.div`
  grid-area: answer-rate;
  @media ${({ theme }) => theme.media.mobile} {
    margin-bottom: -16px;
    & > article > div > div {
      transform: scale(0.9);
      transform-origin: 0% 0%;
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
