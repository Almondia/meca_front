import styled from 'styled-components';

import { TextBody, TextBodyTitle } from '@/styles/common';
import { FlexColumn, FlexColumnCenter, TextAreaBox } from '@/styles/layout';

export const MecaPostContentWrapper = styled.section`
  ${FlexColumnCenter};
  row-gap: 40px;
  & > * {
    width: 100%;
  }
`;

export const MecaPostContainer = styled.div`
  ${FlexColumn};
  row-gap: 8px;
`;

export const MecaPostContentTitle = styled(TextBodyTitle)`
  margin-left: 2px;
  font-size: ${({ theme }) => theme.fontSize.large};
  font-family: ${({ theme }) => theme.fontFamily.sahitya};
`;

export const MecaPostContentBody = styled(TextBody)`
  ${TextAreaBox}
  padding: 30px;
  background-color: var(--color-brightgray);
  @media ${({ theme }) => theme.media.mobile} {
    padding: 15px;
  }
`;
