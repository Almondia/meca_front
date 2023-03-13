import Link from 'next/link';

import styled from 'styled-components';

export const NavSelectionWrapper = styled.div`
  position: absolute;
  top: 45px;
  right: -5px;
  width: 140px;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadow.normal};
`;

export const NavSelectionItem = styled(Link)`
  display: block;
  padding: 12px 18px;
  font-size: ${({ theme }) => theme.fontSize.main};
  color: ${({ theme }) => theme.textColor};
  :hover {
    background-color: ${({ theme }) => theme.lightGray};
    color: ${({ theme }) => theme.brandColor};
  }
`;