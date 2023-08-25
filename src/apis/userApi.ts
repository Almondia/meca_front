import type { AuthToken, MyProfile, OauthType, UserUpdateRequest } from '@/types/domain/user';

import { authInstance, serverInstance, unauthInstance } from './config/instance';

const userApi = {
  getMe: () => authInstance.get<never, MyProfile>('/api/v1/members/me'),
  getMeFromServer: () => serverInstance.get<never, MyProfile>('/api/users'),
  updateProfile: ({ name, profile }: UserUpdateRequest) =>
    authInstance.put<never, never>('/api/v1/members/me', { name, profile }),
  logout: () => serverInstance.post<never, { deleted: boolean }>('/api/users/logout'),
  oauthLogin: (code: string, authType: OauthType) =>
    unauthInstance.post<never, AuthToken>(`/api/v1/oauth/login/${authType}`, {}, { params: { code } }),
};

export default userApi;
