import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import { implementServer } from '@/mock/server';
import { mockedGetAuthUserCategoryListApi, mockedGetSharedCategoryListApi } from '@/mock/api';
import { restHandler } from '@/mock/handlers';

import useCategoryList, { CategoryListFetcherKey } from '@/hooks/category/useCategoryList';

jest.mock('@/utils/toastHandler', () => {
  return jest.fn();
});

describe('useCategoryList', () => {
  beforeEach(() => {
    implementServer([restHandler(mockedGetAuthUserCategoryListApi), restHandler(mockedGetSharedCategoryListApi)]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('개인 카테고리 목록이 조회된다.', async () => {
    const { result } = renderHook(() => useCategoryList('me', false, ''), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      const { categoryList } = result.current;
      expect(categoryList.contents).not.toHaveLength(0);
      expect(categoryList).toHaveProperty('isMine', true);
    });
  });

  it('개인 카테고리 목록 조회 실패 시 빈 목록 콘텐츠가 리턴된다.', async () => {
    implementServer([restHandler(mockedGetAuthUserCategoryListApi, { status: 400 })]);
    const { result } = renderHook(() => useCategoryList('me', false, ''), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      expect(result.current.categoryList.contents).toHaveLength(0);
      expect(result.current.isEmpty).toBeTruthy();
    });
  });

  it('query값이 존재할 경우 해당 쿼리를 포함한 제목을 가진 개인 카테고리 목록이 조회된다.', async () => {
    const { result, rerender } = renderHook(({ q }: { q: string }) => useCategoryList('me', false, q), {
      wrapper: createQueryClientWrapper(),
      initialProps: { q: 'title' },
    });
    await waitFor(() => {
      const { categoryList } = result.current;
      expect(categoryList.contents).not.toHaveLength(0);
      expect(categoryList.contents.some((c) => c.category.title.indexOf('title') === -1)).toBeFalsy();
      expect(result.current.searchQuries).toHaveProperty('me', 'title');
      expect(result.current.searchQuries).toHaveProperty('shared', '');
    });

    rerender({ q: 'title3' });

    await waitFor(() => {
      const { categoryList } = result.current;
      expect(categoryList.contents).not.toHaveLength(0);
      expect(categoryList.contents.some((c) => c.category.title.indexOf('title3') === -1)).toBeFalsy();
      expect(result.current.searchQuries).toHaveProperty('me', 'title3');
    });

    rerender({ q: 'eagaeligehagileaghaligahglaighalga' });

    await waitFor(() => {
      expect(result.current.categoryList.contents).toHaveLength(0);
    });
  });

  it('공유 카테고리 목록이 조회된다.', async () => {
    const { result } = renderHook(() => useCategoryList('shared', false, ''), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      const { categoryList } = result.current;
      expect(categoryList.contents).not.toHaveLength(0);
      expect(categoryList).not.toHaveProperty('isMine');
    });
  });

  it('query값이 존재할 경우 해당 쿼리를 포함한 제목을 가진 공유 카테고리 목록이 조회된다.', async () => {
    const { result } = renderHook(() => useCategoryList('shared', false, 'title'), {
      wrapper: createQueryClientWrapper(),
    });
    await waitFor(() => {
      const { categoryList } = result.current;
      expect(categoryList.contents).not.toHaveLength(0);
      expect(categoryList.contents.some((c) => c.category.title.indexOf('title') === -1)).toBeFalsy();
      expect(result.current.searchQuries).toHaveProperty('me', '');
      expect(result.current.searchQuries).toHaveProperty('shared', 'title');
    });
  });

  it('조회 유형(key)를 변경할 경우 해당 조회 유형에 대한 데이터만 갱신한다.', async () => {
    const { result, rerender } = renderHook(
      ({ k, q }: { k: CategoryListFetcherKey; q: string }) => useCategoryList(k, false, q),
      {
        wrapper: createQueryClientWrapper(),
        initialProps: {
          k: 'me',
          q: 'title1',
        },
      },
    );
    await waitFor(() => {
      const { categoryList } = result.current;
      expect(categoryList.contents.some((c) => c.category.title.indexOf('title1') === -1)).toBeFalsy();
      expect(categoryList).toHaveProperty('isMine', true);
    });
    expect(result.current.searchQuries).toEqual({
      me: 'title1',
      recommended: '',
      shared: '',
    });

    rerender({ k: 'recommended', q: 'title2' });

    await waitFor(() => {
      const { categoryList } = result.current;
      expect(categoryList.contents).not.toHaveLength(0);
      expect(categoryList.contents.some((c) => c.category.title.indexOf('title2') === -1)).toBeFalsy();
      expect(categoryList).not.toHaveProperty('isMine');
    });
    expect(result.current.searchQuries).toEqual({
      me: 'title1',
      recommended: 'title2',
      shared: '',
    });
  });
});
