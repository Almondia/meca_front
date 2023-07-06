import { DropdownMenuContentWrapper } from '../styled';

export interface DropdownContentsProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/** 드롭다운 내부 링크 */
const DropdownMenuContent = ({ href = '', children, onClick }: DropdownContentsProps) => (
  <DropdownMenuContentWrapper
    href={href}
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    {children}
  </DropdownMenuContentWrapper>
);

export default DropdownMenuContent;
