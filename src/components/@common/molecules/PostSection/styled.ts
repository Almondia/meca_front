import styled from 'styled-components';

import { FlexColumn, FlexColumnCenter } from '@/styles/layout';

export const PostSectionWrapper = styled.section`
  ${FlexColumnCenter};
  & > * {
    width: 100%;
  }
`;

export const PostSectionInnerContainer = styled.div`
  ${FlexColumn};
  row-gap: 12px;
`;
