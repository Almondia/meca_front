import styled from 'styled-components';

import { TextCaption } from '@/styles/common';
import { FlexColumn } from '@/styles/layout';

export const QuizResultItemWrapper = styled(TextCaption)`
  ${FlexColumn};
  row-gap: 20px;
  width: 95%;
  word-wrap: break-word;
  word-break: break-all;
  font-size: ${({ theme }) => theme.fontSize.sub};
  color: var(--color-darkgray);
`;

export const QuizResultItemTitleGroup = styled.div`
  display: flex;
  column-gap: 6px;
  margin-bottom: 4px;
  & > *:nth-child(2) {
    margin-bottom: -8px;
  }
`;
