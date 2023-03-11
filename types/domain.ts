export type MecaTagType = 'ox' | 'desc' | 'keyword' | 'select';

export const SOCIAL_TYPES = ['kakao', 'naver', 'google'] as const;
export type SocialType = (typeof SOCIAL_TYPES)[number];

export interface TokenType {
  accessToken: string;
  refreshToken?: string;
}

export interface MyProfile {
  memberId: number;
  role: string;
  email: string;
  name: string;
  oauthType: SocialType;
  createdAt: string;
  profile?: string;
}
