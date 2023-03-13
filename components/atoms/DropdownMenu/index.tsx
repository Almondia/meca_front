import React from 'react';

import { DropdownContentsWrapper, DropdownMenuWrapper } from './styled';

export interface DropdownContentsProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const DropdownContents = ({ href, children, onClick }: DropdownContentsProps) => (
  <DropdownContentsWrapper href={href} onClick={onClick}>
    {children}
  </DropdownContentsWrapper>
);

const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <DropdownMenuWrapper>{children}</DropdownMenuWrapper>
);

DropdownMenu.Contents = DropdownContents;

export default DropdownMenu;
