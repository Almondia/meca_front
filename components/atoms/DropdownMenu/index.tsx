import React from 'react';

import { DropdownContentsWrapper, DropdownMenuWrapper } from './styled';

export interface DropdownContentsProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/** 드롭다운 내용 */
const DropdownContents = ({ href, children, onClick }: DropdownContentsProps) => (
  <DropdownContentsWrapper
    href={href}
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    {children}
  </DropdownContentsWrapper>
);

/** 드롭다운 컴포넌트로 상위 relative 엘리먼트 아래 하단에 띄워짐
 *  하위에 `DropdownContents` 컴포넌트를 사용합니다.
 * `예: <DropdownMenu><DropdownMenu.Contents>hello</DropdownMenu.Contents></DropdownMenu>`
 */
const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <DropdownMenuWrapper>{children}</DropdownMenuWrapper>
);

DropdownMenu.Contents = DropdownContents;

export default DropdownMenu;
