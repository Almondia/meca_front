import type { ImageExtension } from '@/types/domain';
import type { MecaTag } from '@/types/domain/meca';

/* eslint-disable import/prefer-default-export */
export const PAGINATION_NUM = 12;

export const THUMBNAIL_BLUR_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKABMDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+rq/uUs7G8vJJYII7S2nupJrq4Fpaxx20bTO1zdNHKLa2CoftFx5bmGHfIFJUUzM8r+DetfEbVtC1IfE5vDMuux61qE9jJ4Ykg+zLoF3O02kxXNvBqOqIskC+fZwXC3kkkyWUkV4rXVs2o6qDZ7BQIKACgAoA/9k=' as const;

export const IMAGE_EXTENTIONS: ImageExtension[] = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export const PRIVATE_SSR_CDN_CACHE_VALUE = 'public, max-age=1, stale-while-revalidate=59';
export const IMMUTABLE_CDN_CACHE_VALUE = 'public, s-maxage=31536000, immutable';

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
