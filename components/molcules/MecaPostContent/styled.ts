import styled from 'styled-components';

import { TextBodyTitle } from '@/styles/common';
import { FlexColumn, TextAreaBox } from '@/styles/layout';

export const MecaPostContentWrapper = styled.div`
  ${FlexColumn};
  row-gap: 6px;
`;

export const MecaPostContentTitle = styled(TextBodyTitle)`
  margin-left: 2px;
`;

export const MecaPostContentBody = styled.div`
  ${TextAreaBox}
  padding: 30px;
  background-color: var(--color-lightgray);
  @media ${({ theme }) => theme.media.mobile} {
    padding: 15px;
  }
`;
