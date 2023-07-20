import styled from 'styled-components';

import { TextBody } from '@/styles/common';
import { FlexCenter } from '@/styles/layout';

export const MecaTagContainer = styled.div`
  ${FlexCenter};
  justify-content: flex-end;
`;

export const MecaQuestionTextContainer = styled(TextBody)`
  // TOOD: check firefox
  display: -webkit-box;
  width: 100%;
  margin-bottom: 0.375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 140%;
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: var(--color-gray);
`;

export const ProgressesInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 6px;
  & > div {
    min-width: 120px;
  }
  & > p {
    margin-bottom: -1px;
    color: var(--color-darkgray);
    font-size: ${({ theme }) => theme.fontSize.caption};
  }
`;
