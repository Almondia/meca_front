import Avatar from '@/components/@common/atoms/Avatar';
import Icon from '@/components/@common/atoms/Icon';
import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
import useLogout from '@/hooks/user/useLogout';

import { NavigationMenuWrapper, ProfileDivButton } from '../styled';

interface NavSelectionProps {
  profile?: string;
  username?: string;
}

const ProfileButton = ({ profile, username = '', onClick }: NavSelectionProps & { onClick: () => void }) => (
  <ProfileDivButton onClick={onClick}>
    <Avatar imgSrc={profile} imgSize={30} imgName={username} />
    <Icon icon="CompactDown" size="14px" color="var(--color-text)" />
  </ProfileDivButton>
);

const NavigationMenu = ({ profile, username }: NavSelectionProps) => {
  const { logout } = useLogout();
  return (
    <NavigationMenuWrapper>
      <DropdownMenu
        scale={0.9}
        width="90px"
        wrapperComponent={({ onClick }) => ProfileButton({ profile, username, onClick })}
      >
        <DropdownMenu.Menu href="/categories">내 카테고리</DropdownMenu.Menu>
        <DropdownMenu.Menu href="/mypage">내 정보</DropdownMenu.Menu>
        <DropdownMenu.Menu onClick={() => logout('/')}>로그아웃</DropdownMenu.Menu>
      </DropdownMenu>
    </NavigationMenuWrapper>
  );
};

export default NavigationMenu;
