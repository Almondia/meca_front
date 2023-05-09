import styled from 'styled-components';

import { TextBody, TextBodyTitle } from '@/styles/common';
import { FlexColumn, FlexColumnCenter, TextAreaBox } from '@/styles/layout';

export const PostBodyWrapper = styled.section`
  ${FlexColumnCenter};
  row-gap: 40px;
  & > * {
    width: 100%;
  }
`;

export const PostBodyContainer = styled.div`
  ${FlexColumn};
  row-gap: 8px;
`;

export const PostBodyTitleWrapper = styled(TextBodyTitle)`
  margin: 0 0 6px 2px;
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const PostBodyContentWrapper = styled(TextBody)`
  ${TextAreaBox}
  padding: 30px;
  background-color: var(--color-brightgray);
  @media ${({ theme }) => theme.media.mobile} {
    padding: 15px;
  }
`;
