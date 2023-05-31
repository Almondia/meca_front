import useLogout from '@/hooks/useLogout';

import { NavSelectionItem, NavSelectionWrapper } from './styled';

const NavSelection = () => {
  const { logout } = useLogout();
  return (
    <NavSelectionWrapper>
      <NavSelectionItem href="/categories">내 카테고리</NavSelectionItem>
      <NavSelectionItem href="/mypage">내 정보</NavSelectionItem>
      <NavSelectionItem
        href="/"
        onClick={(e) => {
          e.preventDefault();
          logout('/');
        }}
      >
        로그아웃
      </NavSelectionItem>
    </NavSelectionWrapper>
  );
};

export default NavSelection;
