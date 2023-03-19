import Link from 'next/link';

import styled from 'styled-components';

export const DropdownMenuWrapper = styled.div`
  position: absolute;
  top: 45px;
  right: -5px;
  width: 140px;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadow.normal};
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const DropdownContentsWrapper = styled(Link)`
  display: block;
  padding: 12px 18px;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.textColor};
  :hover {
    background-color: ${({ theme }) => theme.lightGray};
    color: ${({ theme }) => theme.brandColor};
  }
`;
