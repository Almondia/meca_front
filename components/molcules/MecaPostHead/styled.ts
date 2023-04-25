import styled from 'styled-components';

import { Flex, FlexColumn } from '@/styles/layout';

export const MecaPostHeadWrapper = styled.div`
  ${FlexColumn};
  row-gap: 16px;
`;

export const MecaPostHeadContent = styled.div`
  ${Flex};
  column-gap: 40px;
  & > div:first-child {
    min-width: 50px;
  }
`;
