import styled from 'styled-components';

import { FlexSpaceBetween } from '@/styles/layout';

export const ProgressesInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 16px;
  margin-top: 10px;
  & > div {
    min-width: 132px;
  }
  & > p {
    width: 48px;
    font-size: ${({ theme }) => theme.fontSize.caption};
  }
`;

export const CategoryCardInfoBox = styled.div`
  transform: scale(0.85);
  transform-origin: 0% 0%;
`;

export const CategoryCardSharedTagBox = styled.div`
  position: absolute;
  top: -19px;
  right: 0;
`;

export const CategoryCardBodyContainer = styled.div`
  ${FlexSpaceBetween};
  align-items: flex-end;
`;
