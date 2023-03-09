import { MyProfile, TokenType } from '@/types/domain';

import { authInstance } from './config/instance';

const userApi = {
  getMe: () => authInstance.get<never, MyProfile>('/api/v1/members/me'),
  kakaoLogin: (code: string) =>
    authInstance.post<never, TokenType>(
      `/api/v1/oauth/kakao/login`,
      {},
      {
        params: {
          code,
        },
      },
    ),
  googleLogin: (code: string) =>
    authInstance.post<never, TokenType>(
      `/api/v1/oauth/google/login?code=${code}`,
      {},
      {
        params: {
          code,
        },
      },
    ),
  naverLogin: (code: string) =>
    authInstance.post<never, TokenType>(
      `/api/v1/oauth/naver/login?code=${code}`,
      {},
      {
        params: {
          code,
        },
      },
    ),
};

export default userApi;
