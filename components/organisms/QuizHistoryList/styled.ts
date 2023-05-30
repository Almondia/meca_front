import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const QuizHistoryListWrapper = styled.div<{ excludeRows: string[] }>`
  ${(props) => props.excludeRows.map((row) => `.${row} { display: none }`)};
`;

export const QuizHistoryTable = styled.div`
  width: 100%;
  overflow-x: auto;
  table {
    margin-top: 10px;
    width: 100%;
    min-width: 768px;
    border-collapse: collapse;
    @media ${({ theme }) => theme.media.tablet} {
      transform: scale(0.9);
    }
  }
  th,
  td {
    text-align: left;
  }
  th {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  thead {
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
    padding: 18px 0;
    vertical-align: middle;
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
