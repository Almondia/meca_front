import styled from 'styled-components';

import { Flex, FlexColumn } from '@/styles/layout';

export const BoxedSectionWrapper = styled.div<{ isColumn: boolean }>`
  ${(props) => (props.isColumn ? FlexColumn : Flex)};
  column-gap: 10px;
  row-gap: 12px;
  padding: 20px 48px 24px 60px;
  box-shadow: var(--shadow-normal);
  border-radius: ${({ theme }) => theme.border.card};
  background-color: var(--color-element-background);
  @media ${({ theme }) => theme.media.mobile} {
    padding: 15px 24px 20px 30px;
    row-gap: 8px;
  }
  & > *:first-child {
    ${(props) =>
      props.isColumn &&
      '::after {display: block; content: ""; padding-bottom: 8px; border-bottom: 1px solid var(--color-gray); opacity: 0.3; }'}
  }
  & > *:nth-child(2) {
    padding-top: 4px;
    line-height: inherit;
  }
`;
