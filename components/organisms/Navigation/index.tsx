import dynamic from 'next/dynamic';

import { useCallback, useRef, useState } from 'react';

import Avatar from '@/components/atoms/Avatar';
import IconButton from '@/components/atoms/IconButton';
import Logo from '@/components/atoms/Logo';
import Icon from '@/components/common/Icon';
import useClickAway from '@/hooks/useClickAway';
import useCustomTheme from '@/hooks/useCustomTheme';
import useModal from '@/hooks/useModal';
import useUser from '@/hooks/user/useUser';
import { HiddenText } from '@/styles/common';

import { LoginButton, LogoLink, NavBar, NavigationContentsSection, NavigationWrapper, Profile } from './styled';

const NavSelection = dynamic(() => import('./NavSelection'), { ssr: false });
const LoginDialog = dynamic(() => import('@/components/organisms/LoginDialog'), { ssr: false });

const Navigation = () => {
  const { user } = useUser();
  const { theme, toggleTheme } = useCustomTheme();
  const [isNavSelectionVisible, setIsNavSelectionVisible] = useState<boolean>(false);
  const { visible: isLoginModalVisible, close: loginModalClose, open: loginModalOpen } = useModal();
  const ref = useRef<HTMLButtonElement>(null);
  const closeSelection = useCallback(() => {
    setIsNavSelectionVisible(false);
  }, []);
  useClickAway(ref, closeSelection);
  return (
    <NavigationWrapper>
      <NavigationContentsSection>
        <LogoLink href="/" prefetch={false}>
          <Logo size="normal" />
          <HiddenText>메인 페이지 링크</HiddenText>
        </LogoLink>
        <NavBar>
          <div>
            <IconButton
              icon={theme === 'light' ? 'Lightmode' : 'Darkmode'}
              iconSize="20px"
              onClick={toggleTheme}
              name={theme === 'light' ? '라이트모드로 변경' : '다크모드로 변경'}
            />
          </div>
          {user ? (
            <Profile
              ref={ref}
              onClick={() => {
                setIsNavSelectionVisible((prev) => !prev);
              }}
            >
              <Avatar imgSrc={user.profile} imgSize={30} imgName={user.name} />
              <Icon icon="CompactDown" size="14px" color="var(--color-text)" />
              {isNavSelectionVisible && <NavSelection />}
            </Profile>
          ) : (
            <div>
              {isLoginModalVisible && <LoginDialog visible={isLoginModalVisible} onClose={loginModalClose} />}
              <LoginButton onClick={loginModalOpen}>로그인</LoginButton>
            </div>
          )}
        </NavBar>
      </NavigationContentsSection>
    </NavigationWrapper>
  );
};

export default Navigation;
