import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { renderQuery } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import UserProfileHeader from '@/components/organisms/UserProfileHeader';
import queryKey from '@/query/queryKey';
import { MyProfile } from '@/types/domain';
import useUser from '@/hooks/user/useUser';

describe('UserProfileHeader', () => {
  const queryClient = new QueryClient();
  const USER: MyProfile = {
    memberId: '0187934c-bd9d-eb51-758f-3b3723a0d3a7',
    name: '임현규',
    email: 'email',
    profile: '/images/noimage.png',
    role: 'USER',
    createdAt: '2023-04-18T16:38:12.861907',
    oauthType: 'kakao',
  };
  beforeEach(() => {
    queryClient.setQueryData([queryKey.me], USER);
  });
  it('UserProfile이 UI에 식별된다.', () => {
    renderQuery(<UserProfileHeader {...USER} />, undefined, queryClient);
    const avatar = screen.getByRole('img', { name: `${USER.memberId}-avatar` });
    const name = screen.getByRole('heading', { name: USER.name });
    expect(avatar).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('UserProfile 이름을 변경하면 name heading이 변경된다.', async () => {
    const UserProfileHeaderWrapper = () => {
      const { user } = useUser();
      if (!user) {
        return null;
      }
      return <UserProfileHeader {...user} />;
    };
    renderQuery(<UserProfileHeaderWrapper />, undefined, queryClient);
    const name = screen.getByRole('heading', { name: USER.name });
    expect(name).toBeInTheDocument();
    const nameChangeButton = screen.getByRole('button', { name: '변경하기' });
    fireEvent.click(nameChangeButton);
    const nameSaveButton = screen.getByRole('button', { name: '저장하기' });
    const nameInput = screen.getByPlaceholderText(USER.name);
    expect(nameInput).toHaveValue(USER.name);
    fireEvent.change(nameInput, { target: { value: '김갑환' } });
    expect(nameInput).toHaveValue('김갑환');
    fireEvent.click(nameSaveButton);
    await waitFor(() => expect(screen.getByRole('heading', { name: '김갑환' })));
  });

  it('UserProfile 프로필을 삭제하면 기본이미지가 식별된다.', async () => {
    const UserProfileHeaderWrapper = () => {
      const { user } = useUser();
      if (!user) {
        return null;
      }
      return <UserProfileHeader {...user} />;
    };
    renderQuery(<UserProfileHeaderWrapper />, undefined, queryClient);
    const avatar = screen.getByRole('img', { name: `${USER.memberId}-avatar` }) as HTMLImageElement;
    expect(avatar.src).toContain('noimage.png');
    const imageDeleteButton = screen.getByRole('button', { name: '제거하기' });
    fireEvent.click(imageDeleteButton);
    await waitFor(() => {
      const changedAvatar = screen.getByRole('img', { name: `${USER.memberId}-avatar` }) as HTMLImageElement;
      expect(changedAvatar).toBeInTheDocument();
      expect(changedAvatar.src).toContain('noprofile.png');
    });
  });
});