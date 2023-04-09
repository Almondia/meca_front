/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { FlexColumnCenter } from '@/styles/layout';

export const QuizPostWrapper = styled.div`
  ${FlexColumnCenter};
  align-items: stretch;
  row-gap: 40px;
`;

export const QuizContentWrapper = styled(QuizPostWrapper)``;