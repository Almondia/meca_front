import { useRecoilState, useRecoilValue } from 'recoil';

import themeState from '@/atoms/common';
import IconButton from '@/components/atoms/IconButton';
import useCustomTheme from '@/hooks/useCustomTheme';

import { Logo, NavBar, NavigationWrapper } from './styled';

const Navigation = () => {
  const theme = useRecoilValue(themeState);
  const { toggleTheme } = useCustomTheme();

  return (
    <NavigationWrapper>
      {/* TODO: add LOGO */}
      <Logo>LOGO</Logo>
      <NavBar>
        <div>
          <IconButton icon={theme === 'light' ? 'Lightmode' : 'Darkmode'} onClick={toggleTheme} />
        </div>
        {/* TODO: add Profile Components */}
        <div>my profile</div>
      </NavBar>
    </NavigationWrapper>
  );
};

export default Navigation;
