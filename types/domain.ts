export type MecaTagType = 'ox' | 'desc' | 'keyword' | 'select';

export const SOCIAL_TYPES = ['kakao', 'naver', 'google'] as const;
export type SocialType = (typeof SOCIAL_TYPES)[number];
