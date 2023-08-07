import Link from 'next/link';

import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween, ListSection } from '@/styles/layout';

export const NavigationWrapper = styled.header`
  padding: 16px 0;
  background-color: rgba(128, 171, 201, 0.15);
  @media ${({ theme }) => theme.media.mobile} {
    padding: 8px 0;
  }
`;

export const NavigationContentsSection = styled(ListSection)`
  ${FlexSpaceBetween};
  padding-top: 0px;
  padding-bottom: 0px;
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
  margin-top: -2px;
  & > div:nth-child(2) {
    padding-top: 5px;
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

export const NavigationMenuWrapper = styled.div`
  position: relative;
  margin-top: 2px;
  & > div {
    position: relative;
    & > div {
      width: 120px;
      background-color: var(--color-element-background);
    }
  }
  a {
    padding: 14px 16px 14px 24px;
    text-align: left;
    font-size: ${({ theme }) => theme.fontSize.sub};
  }
`;
