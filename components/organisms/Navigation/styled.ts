import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween } from '@/styles/layout';

export const NavigationWrapper = styled.header`
  padding: 8px 0;
  background-color: rgba(128, 171, 201, 0.3);
  & > div {
    ${FlexSpaceBetween};
    align-items: center;
    margin: 0 auto;
    max-width: 1440px;
    padding: 0 140px;
    @media ${({ theme }) => theme.media.tablet} {
      padding: 0 60px;
    }
    @media ${({ theme }) => theme.media.mobile} {
      padding: 0 30px;
    }
  }
`;

export const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: var(--color-brand);
`;

export const NavBar = styled.nav`
  ${FlexCenter};
  column-gap: 12px;
  @media ${({ theme }) => theme.media.mobile} {
    column-gap: 4px;
  }
`;

export const Profile = styled.div`
  position: relative;
  ${FlexCenter};
  column-gap: 6px;
  cursor: pointer;
  & > div:nth-child(2) {
    padding-top: 3px;
    :hover {
      opacity: 0.8;
    }
  }
`;
