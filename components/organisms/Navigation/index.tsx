/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';

import IconButton from '@/components/atoms/IconButton';
import useCustomTheme from '@/hooks/useCustomTheme';

import { Logo, NavBar, NavigationWrapper, Profile } from './styled';

export interface NavigationProps {
  profileImage?: string;
  loginUserName?: string;
}

const Navigation = ({ loginUserName, profileImage }: NavigationProps) => {
  const { theme, toggleTheme } = useCustomTheme();
  return (
    <NavigationWrapper>
      {/* TODO: add LOGO */}
      <Logo>LOGO</Logo>
      <NavBar>
        <div>
          <IconButton icon={theme === 'light' ? 'Lightmode' : 'Darkmode'} iconSize="20px" onClick={toggleTheme} />
        </div>
        {loginUserName ? (
          <Profile>
            <Image
              src={profileImage ?? '/images/noprofile.png'}
              alt={profileImage ?? 'profile-image'}
              width={30}
              height={30}
            />
            <p>{loginUserName}</p>
          </Profile>
        ) : (
          <div>
            <Link href="">LOGIN</Link>
          </div>
        )}
      </NavBar>
    </NavigationWrapper>
  );
};

export default Navigation;
