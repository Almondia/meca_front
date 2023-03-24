/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';

import { useCallback, useRef, useState } from 'react';

import IconButton from '@/components/atoms/IconButton';
import useCustomTheme from '@/hooks/useCustomTheme';
import Icon from '@/components/atoms/Icon';
import useClickAway from '@/hooks/useClickAway';
import useUser from '@/hooks/useUser';

import { Logo, NavBar, NavigationWrapper, Profile } from './styled';
import NavSelection from './NavSelection';

const Navigation = () => {
  const { user } = useUser();
  const { theme, toggleTheme } = useCustomTheme();
  const [isNavSelectionVisible, setIsNavSelectionVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeSelection = useCallback(() => {
    setIsNavSelectionVisible(false);
  }, []);
  useClickAway(ref, closeSelection);
  return (
    <NavigationWrapper>
      {/* TODO: add LOGO */}
      <Logo>LOGO</Logo>
      <NavBar>
        <div>
          <IconButton icon={theme === 'light' ? 'Lightmode' : 'Darkmode'} iconSize="20px" onClick={toggleTheme} />
        </div>
        {user ? (
          <Profile
            ref={ref}
            onClick={() => {
              setIsNavSelectionVisible((prev) => !prev);
            }}
          >
            <Image
              src={user.profile ?? '/images/noprofile.png'}
              alt={user.profile ?? 'profile-image'}
              width={30}
              height={30}
            />
            <Icon icon="CompactDown" size="12px" />
            {isNavSelectionVisible && <NavSelection />}
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
