import Link from 'next/link';

import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween } from '@/styles/layout';

export const NavigationWrapper = styled.header`
  padding: 16px 0;
  background-color: rgba(128, 171, 201, 0.15);
  & > div {
    ${FlexSpaceBetween};
    align-items: center;
    margin: 0 auto;
    max-width: 1280px;
    padding: 0 140px;
    @media ${({ theme }) => theme.media.tablet} {
      padding: 0 60px;
    }
    @media ${({ theme }) => theme.media.mobile} {
      padding: 8px 0;
      padding: 0 30px;
    }
  }
`;

export const LogoLink = styled(Link)`
  cursor: pointer;
  margin-bottom: -2px;
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

export const LoginButton = styled.button`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSize.sub};
  color: var(--color-background);
  background-color: var(--color-text);
  :hover {
    opacity: 0.85;
    transition: opacity 0.5s ease-in-out;
  }
`;
