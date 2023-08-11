import type { MyProfile } from '@/types/domain/user';

import { renderHook, waitFor } from '@testing-library/react';
import { createQueryClientWrapper } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import useProfileUpdate from '@/hooks/user/useProfileUpdate';
import { implementServer, resetServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedPutImageUploadApi, mockedPutUserApi } from '@/mock/api';

describe('useProfileUpdate', () => {
  const USER: MyProfile = {
    memberId: '0187934c-bd9d-eb51-758f-3b3723a0d3a7',
    accessToken: 'token',
    name: '임현규',
    email: 'email',
    profile: 'profile',
    createdAt: '2023-04-18T16:38:12.861907',
    oauthType: 'kakao',
  };
  const inputName = '김갑환';
  const inputProfile = 'new-profile.png';
  beforeEach(() => {
    implementServer([restHandler(mockedPutUserApi), restHandler(mockedPutImageUploadApi)]);
  });
  it('사용자의 프로필 이름을 변경할 수 있다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.me], USER);
    const { result } = renderHook(() => useProfileUpdate(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => result.current.updateProfileName(inputName));
    const changedUser = queryClient.getQueryData<MyProfile>([queryKey.me]);
    expect(changedUser).not.toEqual(USER);
    expect(changedUser).toHaveProperty('name', inputName);
    expect(changedUser).toHaveProperty('profile', USER.profile);
  });

  it('프로필 이름 변경에 실패하면 변경이 rollback 된다', async () => {
    resetServer([restHandler(mockedPutUserApi, { status: 400 })]);
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.me], USER);
    const { result } = renderHook(() => useProfileUpdate(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => result.current.updateProfileName(inputName));
    const changedUser = queryClient.getQueryData<MyProfile>([queryKey.me]);
    expect(changedUser).toEqual(USER);
    expect(changedUser).toHaveProperty('name', USER.name);
    expect(changedUser).toHaveProperty('profile', USER.profile);
  });

  it('사용자의 프로필 이미지를 변경할 수 있다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.me], USER);
    const { result } = renderHook(() => useProfileUpdate(), { wrapper: createQueryClientWrapper(queryClient) });
    const imageFile = new File(['abc'], inputProfile, { type: 'image/png' });
    await waitFor(() => result.current.updateProfileImage(imageFile));
    const changedUser = queryClient.getQueryData<MyProfile>([queryKey.me]);
    expect(changedUser).not.toEqual(USER);
    expect(changedUser).toHaveProperty('name', USER.name);
    expect(changedUser).toHaveProperty('profile', inputProfile);
  });

  it('사용자 프로필 이미지를 제거할 수 있다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.me], USER);
    const { result } = renderHook(() => useProfileUpdate(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => result.current.deleteProfileImage());
    const changedUser = queryClient.getQueryData<MyProfile>([queryKey.me]);
    expect(changedUser).toHaveProperty('profile', '');
  });
});
