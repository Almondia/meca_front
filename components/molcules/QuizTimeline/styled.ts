import styled from 'styled-components';

import { FlexColumn } from '@/styles/layout';

export const QuizTimelineWrapper = styled.div`
  ${FlexColumn};
  row-gap: 1rem;
  overflow: hidden;
`;

export const QuizTimelineActivity = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  column-gap: 1rem;
  padding: 6px 0;
`;

export const QuizTimelineTime = styled.div`
  color: var(--color-gray);
  font-size: ${({ theme }) => theme.fontSize.caption};
  margin: 1px 2px 0 0;
`;

export const QuizTimelineBadge = styled.div<{ color: string }>`
  position: relative;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: ${(props) => props.color};
  content: '';
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    width: 4px;
    height: 300px;
    background-color: var(--color-lightgray);
    z-index: -1;
  }
`;

export const QuizTimelineContent = styled.div`
  ${FlexColumn};
  row-gap: 6px;
  margin-top: -1px;
`;
