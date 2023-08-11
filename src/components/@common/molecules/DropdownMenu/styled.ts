import Link from 'next/link';

import styled from 'styled-components';

export const DropdownMenuWrapper = styled.div`
  .dropdown-menu {
    position: relative;
  }
`;

export const DropdownMenuContentsContainer = styled.div<{ scale: number; direction: 'left' | 'right'; width: string }>`
  position: absolute;
  top: 4px;
  ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')};
  border-radius: 2px;
  box-shadow: var(--shadow-normal);
  background-color: var(--color-background);
  transform: scale(${(props) => props.scale});
  transform-origin: top ${(props) => props.direction};
  & > * {
    width: ${(props) => props.width};
  }
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
