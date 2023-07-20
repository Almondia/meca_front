import styled from 'styled-components';

import { FlexCenter, FlexColumn } from '@/styles/layout';

export const QuizTimelineWrapper = styled.div`
  ${FlexColumn};
  row-gap: 1rem;
  z-index: 2;
  @media ${({ theme }) => theme.media.mobile} {
    margin-left: -4px;
  }
`;

export const QuizActivityContainer = styled.div`
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
  @media ${({ theme }) => theme.media.mobile} {
    padding: 3px 0;
    column-gap: 0.6rem;
  }
`;

export const QuizTimelineSummary = styled.div`
  ${FlexColumn};
  width: 34px;
  row-gap: 0.375rem;
  color: var(--color-gray);
  font-size: ${({ theme }) => theme.fontSize.caption};
  white-space: nowrap;
`;

export const QuizTimelineBadge = styled.div<{ color: string }>`
  position: relative;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: ${(props) => props.color};
  & > p {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    width: 4px;
    height: 420px;
    background-color: var(--color-lightgray);
    z-index: -1;
  }
`;

export const QuizTimelineContent = styled.div`
  ${FlexColumn};
  row-gap: 6px;
  width: 90%;
  word-wrap: break-word;
  word-break: break-all;
  strong {
    display: flex;
    column-gap: 6px;
    margin-bottom: 2px;
    color: var(--color-text);
    & > *:nth-child(2) {
      margin-top: -1px;
      margin-bottom: -4px;
    }
  }
`;

export const QuizTimeMoreButton = styled.button`
  ${FlexCenter};
  font-size: ${({ theme }) => theme.fontSize.main};
  color: var(--color-text);
  background-color: var(--color-lightgray);
  padding: 10px;
  :hover {
    opacity: 0.8;
  }
`;
