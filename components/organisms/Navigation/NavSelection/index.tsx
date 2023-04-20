import useLogout from '@/hooks/useLogout';

import { NavSelectionItem, NavSelectionWrapper } from './styled';

const NavSelection = () => {
  const { logout } = useLogout();
  return (
    <NavSelectionWrapper>
      <NavSelectionItem href="/categories">내 MeCa</NavSelectionItem>
      <NavSelectionItem href="/me">내 정보</NavSelectionItem>
      <NavSelectionItem
        href="/"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        로그아웃
      </NavSelectionItem>
    </NavSelectionWrapper>
  );
};

export default NavSelection;
