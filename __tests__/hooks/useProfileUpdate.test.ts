import { renderHook, waitFor } from '@testing-library/react';
import { createQueryClientWrapper } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import useProfileUpdate from '@/hooks/user/useProfileUpdate';
import { MyProfile } from '@/types/domain';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';

describe('useUpdateProfile', () => {
  const USER: MyProfile = {
    memberId: '0187934c-bd9d-eb51-758f-3b3723a0d3a7',
    name: '임현규',
    email: 'email',
    profile: 'profile',
    role: 'USER',
    createdAt: '2023-04-18T16:38:12.861907',
    oauthType: 'kakao',
  };
  const inputName = '김갑환';
  const inputProfile = 'new-profile';
  it('사용자의 프로필을 변경할 수 있다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.me], USER);
    const { result } = renderHook(() => useProfileUpdate(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => result.current.updateProfile({ name: inputName, profile: inputProfile }));
    const changedUser = queryClient.getQueryData<MyProfile>([queryKey.me]);
    expect(changedUser).not.toEqual(USER);
    expect(changedUser).toHaveProperty('name', inputName);
    expect(changedUser).toHaveProperty('profile', inputProfile);
  });

  it('프로필 변경에 실패하면 변경이 rollback 된다', async () => {
    server.resetHandlers(
      rest.put(`${ENDPOINT}/members/me`, (_, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'bad-request', status: 400 }));
      }),
    );
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.me], USER);
    const { result } = renderHook(() => useProfileUpdate(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => result.current.updateProfile({ name: inputName, profile: inputProfile }));
    const changedUser = queryClient.getQueryData<MyProfile>([queryKey.me]);
    expect(changedUser).toEqual(USER);
    expect(changedUser).toHaveProperty('name', USER.name);
    expect(changedUser).toHaveProperty('profile', USER.profile);
  });

  it('없는 param에 대해서는 업데이트 하지 않는다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.me], USER);
    const { result } = renderHook(() => useProfileUpdate(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => result.current.updateProfile({ profile: inputProfile }));
    const changedUser = queryClient.getQueryData<MyProfile>([queryKey.me]);
    expect(changedUser).not.toEqual(USER);
    expect(changedUser).toHaveProperty('name', USER.name);
    expect(changedUser).toHaveProperty('profile', inputProfile);
  });
});