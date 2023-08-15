import styled from 'styled-components';

import { TextSubBody } from '@/styles/common';
import { FlexCenter } from '@/styles/layout';

export const QuizStartDialogEmptyContent = styled.div`
  ${FlexCenter};
  height: 225px;
`;

export const QuizStartDialogEmptyFilteredCount = styled(TextSubBody)`
  ${FlexCenter};
  justify-content: flex-start;
  height: 60px;
`;
