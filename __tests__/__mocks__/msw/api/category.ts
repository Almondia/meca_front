import type { Category, CategoryListContent, CategoryListPaginationResponse } from '@/types/domain/category';

import { ENDPOINT, ResponseResolver } from '../handlers';
import { MOCK_CATEGORIES, MOCK_CATEGORY_STATISTICS, MOCK_MEMBER_ID, MOCK_RESPONSE_MEMBER } from '../data';

export const mockedGetAuthUserCategoryListApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories/me`, 'get'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const hasNext = req.url.searchParams.get('hasNext');
    const pageSize = req.url.searchParams.get('pageSize');
    const titleQuery = req.url.searchParams.get('containTitle');
    let result = MOCK_CATEGORIES.sort((o1, o2) => (o2.categoryId > o1.categoryId ? 1 : -1));
    if (titleQuery) {
      result = result.filter((v) => v.title.indexOf(titleQuery) !== -1);
    }
    let nextIndex = result.findIndex((v) => v.categoryId === hasNext);
    nextIndex = nextIndex === -1 ? 0 : nextIndex;
    const resData: CategoryListPaginationResponse = {
      contents: [...result]
        .slice(nextIndex, Number(pageSize))
        .map((category) => ({ category, statistics: MOCK_CATEGORY_STATISTICS, likeCount: 0 })),
      pageSize: (pageSize ?? 0) as number,
      hasNext: result[nextIndex + 1] ? result[nextIndex + 1].categoryId : null,
    };
    return res(ctx.json({ ...resData }));
  };
  return { uri, method, responseResolver };
};

export const mockedGetSharedCategoryListApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories/share`, 'get'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const hasNext = req.url.searchParams.get('hasNext');
    const pageSize = req.url.searchParams.get('pageSize');
    const containTitle = req.url.searchParams.get('containTitle') ?? '';
    const result: CategoryListContent[] = MOCK_CATEGORIES.sort((o1, o2) => (o2.categoryId > o1.categoryId ? 1 : -1))
      .filter((filter) => filter.title.indexOf(containTitle) !== -1)
      .map((category, i) => {
        return {
          category,
          member: MOCK_RESPONSE_MEMBER,
          likeCount: i,
        };
      });
    let nextIndex = result.findIndex((v) => v.category.categoryId === hasNext);
    nextIndex = nextIndex === -1 ? 0 : nextIndex;
    const resData: CategoryListPaginationResponse = {
      contents: result.slice(nextIndex, Number(pageSize)),
      pageSize: (pageSize ?? 0) as number,
      hasNext: result[nextIndex + 1] ? result[nextIndex + 1].category.categoryId : null,
    };
    return res(ctx.json({ ...resData }));
  };
  return { uri, method, responseResolver };
};

export const mockedPostCategoryApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories`, 'post'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { title } = await req.json();
    const createdCategory: Category = {
      categoryId: '01234567-89ab-cdef-0123-456789abcd' + MOCK_CATEGORIES.length.toString().padStart(2, '0'),
      memberId: MOCK_MEMBER_ID,
      title: title,
      thumbnail: '',
      shared: false,
      createdAt: '2023-08-09T18:54:16.92176' + MOCK_CATEGORIES.length.toString().padStart(2, '0'),
    };
    MOCK_CATEGORIES.push(createdCategory);
    return res(ctx.json(createdCategory));
  };
  return { uri, method, responseResolver };
};

export const mockedDeleteCategoryApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories/:id`, 'delete'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { id } = req.params;
    const idx = MOCK_CATEGORIES.findIndex((v) => v.categoryId === id);
    MOCK_CATEGORIES.splice(idx, 1);
    return res(ctx.status(200));
  };
  return { uri, method, responseResolver };
};

export const mockedPutCategoryApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories/:id`, 'put'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { id } = req.params;
    let { title, thumbnail, shared } = await req.json();
    const idx = MOCK_CATEGORIES.findIndex((v) => v.categoryId === id);
    const category = MOCK_CATEGORIES[idx];
    MOCK_CATEGORIES[idx] = {
      ...category,
      title,
      thumbnail,
      shared: shared ?? category.shared,
    };
    return res(
      ctx.status(200),
      ctx.json({
        title: title,
        categoryId: id,
        shared: shared ?? category.shared,
        thumbnail,
      }),
    );
  };
  return { uri, method, responseResolver };
};

export const mockedGetCategoryLikeState = (isRecommended: boolean) => {
  const [uri, method] = [`${ENDPOINT}/categories/:id/like`, 'get'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    const { id } = req.params;
    if (isRecommended) {
      return res(ctx.status(200), ctx.json({ liked: true }));
    }
    return res(ctx.status(200), ctx.json({ liked: false }));
  };
  return { uri, method, responseResolver };
};

export const mockedPostCategoryUnlike = () => {
  const [uri, method] = [`${ENDPOINT}/categories/:categoryId/like/unlike`, 'post'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ hasLike: false }));
  };
  return { uri, method, responseResolver };
};

export const mockedPostCategoryLike = () => {
  const [uri, method] = [`${ENDPOINT}/categories/:categoryId/like/like`, 'post'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ hasLike: true }));
  };
  return { uri, method, responseResolver };
};
