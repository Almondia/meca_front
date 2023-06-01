import categoryApi from '@/apis/categoryApi';
import useCategoryLike from '@/hooks/category/useCategoryLike';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { useRecoilValue } from 'recoil';
import { createQueryClientWrapper } from '../utils';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import { server } from '../__mocks__/msw/server';

jest.mock('recoil', () => ({
  useRecoilValue: jest.fn(),
}));

jest.mock('@/atoms/common', () => ({
  hasAuthState: jest.fn(),
}));

describe('useCategoryLike', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const CATEGORY_ID = 'cid01';
  const INITIAL_COUNT = 4;

  it('사용자가 해당 카테고리에 추천했다면 해당 상태가 리턴된다.', async () => {
    server.use(
      rest.get(`${ENDPOINT}/categories/like`, (req, res, ctx) => {
        const categoryIds = req.url.searchParams.get('categoryIds');
        return res(ctx.status(200), ctx.json({ recommendedCategories: [categoryIds], unRecommendedCategories: [] }));
      }),
    );
    (useRecoilValue as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => useCategoryLike(CATEGORY_ID, INITIAL_COUNT), {
      wrapper: createQueryClientWrapper(),
    });
    await waitFor(() => {
      expect(result.current.hasLike).toBeTruthy();
      expect(result.current.likeCount).toEqual(INITIAL_COUNT);
    });
  });

  it('로그인하지 않았다면 해당 상태가 업데이트 되지 않으며 추천할 수 없다.', async () => {
    (useRecoilValue as jest.Mock).mockReturnValue(false);
    const spyGetCategoriesLikesState = jest.spyOn(categoryApi, 'getCategoriesLikeState');
    const spyPostLike = jest.spyOn(categoryApi, 'postCategoryLike');
    const { result } = renderHook(() => useCategoryLike(CATEGORY_ID, INITIAL_COUNT), {
      wrapper: createQueryClientWrapper(),
    });
    await waitFor(() => {
      expect(result.current.hasLike).toBeFalsy();
      expect(result.current.likeCount).toEqual(INITIAL_COUNT);
    });
    expect(spyGetCategoriesLikesState).not.toHaveBeenCalled();
    await waitFor(() => {
      result.current.postLike();
    });
    expect(spyPostLike).not.toHaveBeenCalled();
  });

  it('사용자가 해당 카테고리에 추천하지 않았을 때 추천 변경 시 추천된다.', async () => {
    server.use(
      rest.get(`${ENDPOINT}/categories/like`, (req, res, ctx) => {
        const categoryIds = req.url.searchParams.get('categoryIds');
        return res(ctx.status(200), ctx.json({ recommendedCategories: [], unRecommendedCategories: [categoryIds] }));
      }),
      rest.post(`${ENDPOINT}/categories/:categoryId/like/like`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ hasLike: true }));
      }),
    );
    (useRecoilValue as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => useCategoryLike(CATEGORY_ID, INITIAL_COUNT), {
      wrapper: createQueryClientWrapper(),
    });
    await waitFor(() => {
      expect(result.current.hasLike).toBeFalsy();
    });
    await waitFor(() => {
      result.current.postLike();
    });
    expect(result.current.hasLike).toBeTruthy();
    expect(result.current.likeCount).toEqual(INITIAL_COUNT + 1);
  });

  it('사용자가 해당 카테고리에 추천한 상태에서 추천상태 변경 시 추천이 취소된다.', async () => {
    server.use(
      rest.get(`${ENDPOINT}/categories/like`, (req, res, ctx) => {
        const categoryIds = req.url.searchParams.get('categoryIds');
        return res(ctx.status(200), ctx.json({ recommendedCategories: [categoryIds], unRecommendedCategories: [] }));
      }),
      rest.post(`${ENDPOINT}/categories/:categoryId/like/unlike`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ hasLike: false }));
      }),
    );
    (useRecoilValue as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => useCategoryLike(CATEGORY_ID, INITIAL_COUNT), {
      wrapper: createQueryClientWrapper(),
    });
    await waitFor(() => {
      expect(result.current.hasLike).toBeTruthy();
    });
    await waitFor(() => {
      result.current.postLike();
    });
    expect(result.current.hasLike).toBeFalsy();
    expect(result.current.likeCount).toEqual(INITIAL_COUNT - 1);
  });
});
