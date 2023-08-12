import dynamic from 'next/dynamic';

import Logo from '@/components/@common/atoms/Logo';
import IconButton from '@/components/@common/molecules/IconButton';
import useCustomTheme from '@/hooks/useCustomTheme';
import useModal from '@/hooks/useModal';
import useUser from '@/hooks/user/useUser';
import { HiddenText } from '@/styles/common';

import NavigationMenu from './NavigationMenu';
import { LoginButton, LogoLink, NavBar, NavigationContentsSection, NavigationWrapper } from './styled';

const LoginDialog = dynamic(() => import('@/components/@common/organisms/LoginDialog'), { ssr: false });

const Navigation = () => {
  const { user } = useUser();
  const { theme, toggleTheme } = useCustomTheme();
  const { visible: isLoginModalVisible, close: loginModalClose, open: loginModalOpen } = useModal();
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
              iconSize={20}
              onClick={toggleTheme}
              name={theme === 'light' ? '라이트모드로 변경' : '다크모드로 변경'}
            />
          </div>
          {user ? (
            <NavigationMenu username={user.name} profile={user.profile} />
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