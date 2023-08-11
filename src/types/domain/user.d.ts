import type { TimestampedEntity } from '@/types/domain';

export type OauthType = 'kakao' | 'naver' | 'google';

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
}

export interface User {
  memberId: string;
  name: string;
  profile?: string;
}

export interface MyProfile extends User, TimestampedEntity, AuthToken {
  email: string;
  oauthType: OauthType;
}

export interface UserUpdateRequest {
  name?: string;
  profile?: string;
}
