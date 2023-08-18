import styled from 'styled-components';

import { FlexCenter, FlexColumnCenter } from '@/styles/layout';

export const QuizPlayFallbackWrapper = styled.div`
  ${FlexColumnCenter};
  gap: 24px;
  width: 100%;
  min-height: 300px;
`;

export const QuizPlayFallbackLinkButtonContainer = styled.div`
  ${FlexCenter};
  width: 100%;
  margin-top: 30px;
  column-gap: 12px;
`;
