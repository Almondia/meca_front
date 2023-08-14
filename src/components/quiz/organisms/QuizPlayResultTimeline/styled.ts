import styled from 'styled-components';

export const QuizPlayResultTimelineWrapper = styled.div`
  @media ${({ theme }) => theme.media.mobile} {
    margin-left: -12px;
  }
  & > div {
    margin-top: 6px;
  }
`;
