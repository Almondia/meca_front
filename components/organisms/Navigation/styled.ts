import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween } from '@/styles/layout';

export const NavigationWrapper = styled.header`
  ${FlexSpaceBetween};
  align-items: center;
  padding: 4px 90px;
  background-color: rgba(128, 171, 201, 0.3);
  @media ${({ theme }) => theme.media.tablet} {
    padding: 4px 30px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    padding: 4px 15px;
  }
`;

export const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.brandColor};
`;

export const NavBar = styled.nav`
  ${FlexCenter};
  column-gap: 12px;
  @media ${({ theme }) => theme.media.mobile} {
    column-gap: 4px;
  }
`;

export const Profile = styled.div`
  ${FlexCenter};
  column-gap: 6px;
  cursor: pointer;
  @media ${({ theme }) => theme.media.mobile} {
    & > p {
      display: none;
    }
  }
`;
