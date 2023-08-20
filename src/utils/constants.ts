import type { ImageExtension } from '@/types/domain';
import type { MecaTag } from '@/types/domain/meca';

export const PAGINATION_NUM = 12;

export const THUMBNAIL_BLUR_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/Z8BAzAOZUEAQ+ESj6kXXm0AAAAASUVORK5CYII=';
export const IMAGE_EXTENTIONS: ImageExtension[] = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export const PRIVATE_SSR_CDN_CACHE_VALUE = 'max-age=30, stale-while-revalidate=120';

export const UUID_PATTERN = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

export const IDEAL_QUIZ_SCORE = 70;
export const BAD_QUIZ_SCORE = 40;

interface TagProps {
  icon: 'Ox' | 'Bubble' | 'Check' | 'Dice';
  tagColor: string;
  text: string;
}

export const MECA_TAGS: Record<MecaTag, TagProps> = {
  OX_QUIZ: {
    icon: 'Ox',
    tagColor: '#A6880D',
    text: 'OX퀴즈',
  },
  KEYWORD: {
    icon: 'Check',
    tagColor: '#7B61FF',
    text: '키워드',
  },
  MULTI_CHOICE: {
    icon: 'Dice',
    tagColor: '#64ab38',
    text: '객관식',
  },
  ESSAY: {
    icon: 'Bubble',
    tagColor: '#E78565',
    text: '주관식',
  },
};

export enum InputValidations {
  MAX_TITLE = 40,
  MIN_TITLE = 2,
  MAX_USERNAME = 10,
  MIN_USERNAME = 2,
  MAX_MULTICHOICE_QUESTION = 100,
  MAX_ESSAY_ANSWER = 500,
  MAX_KEYWORD_ANSWER = 100,
  MAX_MULTICHOICE_ANSWER = 5,
}
