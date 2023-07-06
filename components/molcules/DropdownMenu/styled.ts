import Link from 'next/link';

import styled from 'styled-components';

export const DropdownMenuWrapper = styled.div<{ top: string; right: string; scale: number }>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  z-index: 2;
  transform: scale(${(props) => props.scale});
`;

export const DropdownMenuContentsContainer = styled.div`
  position: absolute;
  top: 45px;
  right: -5px;
  width: 140px;
  border-radius: 2px;
  box-shadow: var(--shadow-normal);
  background-color: var(--color-background);
`;

export const DropdownMenuContentWrapper = styled(Link)`
  display: block;
  padding: 12px 18px;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: var(--color-text);
  :hover {
    background-color: var(--color-gray100);
    color: var(--color-brand);
  }
`;
