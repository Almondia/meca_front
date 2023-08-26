import Avatar from '@/components/@common/atoms/Avatar';
import Icon from '@/components/@common/atoms/Icon';
import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
import useLogout from '@/hooks/user/useLogout';

import { NavigationMenuWrapper, ProfileDivButton } from '../styled';

interface NavigationMenuProps {
  profile?: string;
  username?: string;
}

const ProfileButton = ({ profile, username = '', onClick }: NavigationMenuProps & { onClick: () => void }) => (
  <ProfileDivButton onClick={onClick}>
    <Avatar imgSrc={profile} imgSize={30} imgName={username} />
    <Icon icon="CompactDown" size="14px" color="var(--color-text)" />
  </ProfileDivButton>
);

const NavigationMenu = ({ profile, username }: NavigationMenuProps) => {
  const { logout } = useLogout();
  return (
    <NavigationMenuWrapper>
      <DropdownMenu
        scale={0.9}
        width="90px"
        wrapperComponent={({ onClick }) => ProfileButton({ profile, username, onClick })}
      >
        <DropdownMenu.Menu href="/category">내 카테고리</DropdownMenu.Menu>
        <DropdownMenu.Menu href="/me">내 정보</DropdownMenu.Menu>
        <DropdownMenu.Menu onClick={() => logout('/')}>로그아웃</DropdownMenu.Menu>
      </DropdownMenu>
    </NavigationMenuWrapper>
  );
};

export default NavigationMenu;
