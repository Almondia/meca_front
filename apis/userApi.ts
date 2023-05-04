import { MyProfile, TokenType } from '@/types/domain';

import { authInstance, serverInstance, unauthInstance } from './config/instance';

const userApi = {
  getMe: () => authInstance.get<never, MyProfile>('/api/v1/members/me'),
  getMeFromServer: () => serverInstance.get<never, MyProfile>('/api/user'),
  logout: () => serverInstance.post<never, { deleted: boolean }>('/api/logout'),
  kakaoLogin: (code: string) =>
    unauthInstance.post<never, TokenType>(
      `/api/v1/oauth/login/kakao`,
      {},
      {
        params: {
          code,
        },
      },
    ),
  googleLogin: (code: string) =>
    unauthInstance.post<never, TokenType>(
      `/api/v1/oauth/login/google`,
      {},
      {
        params: {
          code,
        },
      },
    ),
  naverLogin: (code: string) =>
    unauthInstance.post<never, TokenType>(
      `/api/v1/oauth/login/naver`,
      {},
      {
        params: {
          code,
        },
      },
    ),
};

export default userApi;
