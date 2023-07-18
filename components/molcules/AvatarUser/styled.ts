import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const AvatarUserWrapper = styled.div`
  ${FlexCenter};
  column-gap: 10px;
`;

export const AvatarUsername = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: var(--color-darkgray);
`;
