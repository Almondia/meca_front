import styled from 'styled-components';

import { Flex, FlexColumn } from '@/styles/layout';

export const ContentsBoxWrapper = styled.div<{ isColumn: boolean }>`
  ${(props) => (props.isColumn ? FlexColumn : Flex)};
  column-gap: 10px;
  row-gap: 20px;
  padding: 20px 48px 24px 60px;
  box-shadow: var(--shadow-normal);
  border-radius: ${({ theme }) => theme.border.card};
  @media ${({ theme }) => theme.media.mobile} {
    padding: 15px 24px 20px 30px;
    row-gap: 16px;
  }
`;

export const ContentsBoxHeader = styled.div`
  font-family: var(--font-sub);
  font-size: ${({ theme }) => theme.fontSize.huge};
`;

export const ContentsBoxBody = styled.div`
  padding-top: 4px;
`;
