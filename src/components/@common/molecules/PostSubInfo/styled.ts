import styled from 'styled-components';

import { Flex, FlexColumn } from '@/styles/layout';

export const PostSubInfoWrapper = styled.div<{ rowGutter: string; columnGutter: string }>`
  ${FlexColumn};
  row-gap: ${(props) => props.rowGutter};
  & > div {
    column-gap: ${(props) => props.columnGutter};
  }
`;

export const PostSubInfoContentWrapper = styled.div`
  ${Flex};
  & > div:first-child {
    min-width: 50px;
  }
`;
