import { useRouter } from 'next/router';

import storage from '@/utils/storageHandler';

import { NavSelectionItem, NavSelectionWrapper } from './styled';

const NavSelection = () => {
  const router = useRouter();
  return (
    <NavSelectionWrapper>
      <NavSelectionItem href="/category">내 MeCa</NavSelectionItem>
      <NavSelectionItem href="/me">내 정보</NavSelectionItem>
      <NavSelectionItem
        href="/"
        onClick={(e) => {
          e.preventDefault();
          storage.removeItem('token');
          router.push('/', undefined, {
            shallow: false,
          });
        }}
      >
        로그아웃
      </NavSelectionItem>
    </NavSelectionWrapper>
  );
};

export default NavSelection;
