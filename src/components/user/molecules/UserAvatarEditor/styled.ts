import styled from 'styled-components';

import { FlexCenter, FlexColumnCenter } from '@/styles/layout';

export const UserAvatarEditorWrapper = styled.div`
  ${FlexColumnCenter};
  row-gap: 12px;
  & > div:nth-child(2) {
    ${FlexCenter};
    column-gap: 12px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;
