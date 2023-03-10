import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween } from '@/styles/layout';
import { COLOR } from '@/styles/constants';

export const NavigationWrapper = styled.header`
  ${FlexSpaceBetween};
  align-items: center;
  padding: 4px 90px;
  background-color: ${COLOR.brand3};
  @media ${({ theme }) => theme.media.tablet} {
    padding: 4px 30px;
  }
`;

export const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${COLOR.brand1};
`;

export const NavBar = styled.nav`
  ${FlexCenter};
  column-gap: 12px;
`;
