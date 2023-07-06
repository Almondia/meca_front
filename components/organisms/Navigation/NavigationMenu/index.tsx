import DropdownMenu from '@/components/molcules/DropdownMenu';
import useLogout from '@/hooks/useLogout';

import { NavigationMenuWrapper } from '../styled';

interface NavSelectionProps {
  menuWrapper: React.ReactNode;
}

const NavigationMenu = ({ menuWrapper }: NavSelectionProps) => {
  const { logout } = useLogout();
  return (
    <NavigationMenuWrapper>
      <DropdownMenu name="navigation menu" wrapperComponent={menuWrapper}>
        <DropdownMenu.Menu href="/categories">내 카테고리</DropdownMenu.Menu>
        <DropdownMenu.Menu href="/mypage">내 정보</DropdownMenu.Menu>
        <DropdownMenu.Menu href="" onClick={() => logout('/')}>
          로그아웃
        </DropdownMenu.Menu>
      </DropdownMenu>
    </NavigationMenuWrapper>
  );
};

export default NavigationMenu;
