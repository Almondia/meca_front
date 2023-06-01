import styled from 'styled-components';

import { FlexCenter, FlexColumn } from '@/styles/layout';

export const QuizHistoryListWrapper = styled.div<{ excludeRows: string[] }>`
  ${(props) => props.excludeRows.map((row) => `.${row} { display: none }`)};
`;

export const QuizHistoryTable = styled.div`
  width: 100%;
  overflow-x: auto;
  table {
    margin-top: 10px;
    width: 100%;
    min-width: 468px;
    border-collapse: collapse;
  }
  th,
  td {
    text-align: left;
    @media ${({ theme }) => theme.media.tablet} {
      transform: scale(0.9);
      transform-origin: 0% 0%;
    }
    @media ${({ theme }) => theme.media.mobile} {
      transform: scale(0.8);
      transform-origin: 0% 0%;
    }
  }
  th {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  tbody:before,
  tbody:after {
    content: '';
    display: block;
    padding: 10px 0 0 0;
  }
`;

export const QuizHistoryTableContentRow = styled.tr`
  border-bottom: 1px solid var(--color-lightgray);
  border-top: 1px solid var(--color-lightgray);
  td {
    vertical-align: middle;
    min-width: 60px;
    padding: 18px 10px 18px 0;
    @media ${({ theme }) => theme.media.mobile} {
      padding: 18px 0 0 0;
    }
  }
  .quiz-content-devide {
    ${FlexColumn};
    row-gap: 6px;
    width: 25vw;
    min-width: 100px;
    @media ${({ theme }) => theme.media.mobile} {
      min-width: 150px;
    }
  }
  strong,
  em {
    color: var(--color-gray);
  }
`;

export const QuizHistoryTablePageController = styled.div`
  ${FlexCenter};
  column-gap: 12px;
  button {
    background-color: var(--color-lightgray);
  }
`;
