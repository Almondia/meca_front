import styled from 'styled-components';

import { FlexColumn, FlexSpaceBetween } from '@/styles/layout';

export const Between = styled.div`
  ${FlexSpaceBetween};
  align-items: flex-end;
`;

export const BodyLeft = styled.div`
  ${FlexColumn};
  align-items: flex-start;
  row-gap: 16px;
`;

export const BodyRight = styled.div``;

export const UserInfo = styled.div`
  transform: scale(0.85);
  transform-origin: 0% 0%;
`;

export const PrivateStateTag = styled.div`
  position: absolute;
  top: -19px;
  right: 0;
`;

export const PrivateMenu = styled.div`
  position: absolute;
  top: 22px;
  right: 12px;
`;
