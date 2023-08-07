import styled from 'styled-components';

import { TextBody, TextBodyTitle } from '@/styles/common';
import { FlexColumn, FlexColumnCenter, TextAreaBox } from '@/styles/layout';

export const PostBodyWrapper = styled.section`
  ${FlexColumnCenter};
  & > * {
    width: 100%;
  }
`;

export const PostBodyContainer = styled.div`
  ${FlexColumn};
  row-gap: 12px;
`;

export const PostBodyTitleWrapper = styled(TextBodyTitle)`
  margin: 0 0 6px 2px;
  font-family: var(--font-sub);
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const PostBodyContentWrapper = styled(TextBody)<{ hasBackground?: boolean; hasIndent?: boolean }>`
  ${TextAreaBox}
  padding: ${(props) => (props.hasIndent ? '30px' : '0px')};
  background-color: ${(props) => (props.hasBackground ? 'var(--color-brightgray)' : 'transparent')};
  @media ${({ theme }) => theme.media.mobile} {
    padding: ${(props) => (props.hasIndent ? '15px' : '0px')};
  }
`;
