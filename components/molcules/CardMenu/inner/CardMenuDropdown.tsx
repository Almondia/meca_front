import { CardDropdownMenuLink, CardMenuDropdownWrapper } from '../styled';

export interface DropdownContentsProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/** 드롭다운 내용 */
const CardMenuDropdownContent = ({ href, children, onClick }: DropdownContentsProps) => (
  <CardDropdownMenuLink
    href={href}
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    {children}
  </CardDropdownMenuLink>
);

/** 드롭다운 컴포넌트로 상위 relative 엘리먼트 아래 하단에 띄워짐
 *  하위에 `DropdownContents` 컴포넌트를 사용합니다.
 * `예: <DropdownMenu><DropdownMenu.Contents>hello</DropdownMenu.Contents></DropdownMenu>`
 */
const CardMenuDropdown = ({ children }: { children: React.ReactNode }) => (
  <CardMenuDropdownWrapper>{children}</CardMenuDropdownWrapper>
);

CardMenuDropdown.Content = CardMenuDropdownContent;

export default CardMenuDropdown;
