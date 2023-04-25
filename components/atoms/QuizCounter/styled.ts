import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const QuizCounterWrapper = styled.div`
  ${FlexCenter};
  column-gap: 6px;
  width: 100px;
  @media ${({ theme }) => theme.media.mobile} {
    transform: scale(0.75);
  }
`;

export const QuizCurrentCounter = styled.h5<{ isMoreThanHalf: boolean }>`
  color: var(--color-subbrand);
  opacity: ${(props) => (props.isMoreThanHalf ? 1 : 0.6)};
`;

export const QuizMaxCounter = styled.h4`
  color: var(--color-brand);
`;
