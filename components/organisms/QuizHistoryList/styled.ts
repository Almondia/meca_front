import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import { FlexCenter } from '@/styles/layout';

export const QuizHistoryListWrapper = styled.div<{ excludeRows: string[] }>`
  ${(props) => props.excludeRows.map((row) => `.${row} { display: none }`)};
  overflow-x: auto;
`;

export const QuizHistoryTablePageController = styled.div`
  ${FlexCenter};
  column-gap: 12px;
  button {
    background-color: var(--color-lightgray);
  }
`;

export const QuizHistoryPageCursorButtonContainer = styled.div<{ isEnabled: boolean }>`
  button {
    cursor: ${(props) => (props.isEnabled ? 'pointer' : 'default')};
  }
  opacity: ${(props) => (props.isEnabled ? '1' : '0.4')};
`;

const QuizHistoryListContent = styled.div`
  width: fit-content;
  min-width: 100%;
  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    column-gap: 2px;
    padding: 8px;
    .question-info {
      min-width: 210px;
      width: 70%;
    }
    & > * {
      width: 60px;
    }
    .user {
      width: 75px;
      @media ${({ theme }) => theme.media.mobile} {
        width: 60px;
      }
    }
  }
`;

export const QuizHistoryListHeader = styled(QuizHistoryListContent)`
  border-bottom: 1px solid var(--color-lightgray);
  font-size: ${({ theme }) => theme.fontSize.sub};
`;

export const QuizHistoryInfiniteListContainer = styled.div`
  margin-top: -40px;
`;

export const QuizHistoryListItem = styled(QuizHistoryListContent)`
  border-bottom: 1px solid var(--color-lightgray);
  border-top: 1px solid var(--color-lightgray);
  & > div {
    padding: 12px 8px;
  }
`;

export const QuizHistoryListEmpty = styled.div`
  ${FlexCenter};
  width: 100%;
  min-height: 180px;
  border-bottom: 1px solid var(--color-lightgray);
  border-top: 1px solid var(--color-lightgray);
`;

export const QuizHistoryMoreButton = styled(Button)<{ visible: boolean }>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
