import { ENDPOINT } from '../handlers';
import { MOCK_CATEGORIES, MOCK_MEMBER_ID } from '../data';

/**
 * @description quries: [hasNext, pageSize]
 */
export const mockedGetAuthUserCategoryListApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories/me`, 'get'];
  const responseResolver = async (req, res, ctx) => {
    const hasNext = req.url.searchParams.get('hasNext');
    const pageSize = req.url.searchParams.get('pageSize');
    const result = MOCK_CATEGORIES.sort((o1, o2) => o2.createdAt - o1.createdAt);
    let nextIndex = result.findIndex((v) => v.cardId === hasNext);
    nextIndex = nextIndex === -1 ? 0 : nextIndex;
    const resData = {
      contents: [...result].slice(nextIndex, Number(pageSize)),
      pageSize,
      hasNext: result[nextIndex + 1] ? result[nextIndex + 1].cardId : undefined,
    };
    return res(ctx.json({ ...resData }));
  };
  return { uri, method, responseResolver };
};

/**
 * @description quries: [hasNext, pageSize, containTitle]
 */
export const mockedGetSharedCategoryListApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories/share`, 'get'];
  const responseResolver = async (req, res, ctx) => {
    const hasNext = req.url.searchParams.get('hasNext');
    const pageSize = req.url.searchParams.get('pageSize');
    const containTitle = req.url.searchParams.get('containTitle');
    const result = MOCK_CATEGORIES.sort((o1, o2) => o2.createdAt - o1.createdAt)
      .filter((category) => category.title.indexOf(containTitle) !== -1)
      .map((v, i) => {
        return {
          ...v,
          categoryInfo: { ...v },
          memberInfo: { memberId: MOCK_MEMBER_ID + i, profile: null, name: 'name' + i },
        };
      });
    let nextIndex = result.findIndex((v) => v.cardId === hasNext);
    nextIndex = nextIndex === -1 ? 0 : nextIndex;
    const resData = {
      contents: [...result].slice(nextIndex, Number(pageSize)),
      pageSize,
      hasNext: result[nextIndex + 1] ? result[nextIndex + 1].cardId : undefined,
    };
    return res(ctx.json({ ...resData }));
  };
  return { uri, method, responseResolver };
};

/**
 * @description request body: [title]
 */
export const mockedPostCategoryApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories`, 'post'];
  const responseResolver = async (req, res, ctx) => {
    const { title } = await req.json();
    MOCK_CATEGORIES.push({
      title: title,
      createdAt: MOCK_CATEGORIES.length,
      categoryId: 'cid' + MOCK_CATEGORIES.length,
    });
    return res(ctx.status(200));
  };
  return { uri, method, responseResolver };
};

/**
 * @description path: [id]
 */
export const mockedDeleteCategoryApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories/:id`, 'delete'];
  const responseResolver = async (req, res, ctx) => {
    const { id } = req.params;
    const idx = MOCK_CATEGORIES.findIndex((v) => v.categoryId === id);
    MOCK_CATEGORIES.splice(idx, 1);
    return res(ctx.status(200));
  };
  return { uri, method, responseResolver };
};

/**
 * @description path: [id], request body: [title]
 */
export const mockedPutCategoryApi = () => {
  const [uri, method] = [`${ENDPOINT}/categories/:id`, 'put'];
  const responseResolver = async (req, res, ctx) => {
    const { id } = req.params;
    const { title } = await req.json();
    const idx = MOCK_CATEGORIES.findIndex((v) => v.categoryId === id);
    const category = MOCK_CATEGORIES[idx];
    MOCK_CATEGORIES.splice(idx, 1);
    MOCK_CATEGORIES.push({ ...category, title: title });
    return res(
      ctx.status(200),
      ctx.json({
        title: title,
        categoryId: id,
      }),
    );
  };
  return { uri, method, responseResolver };
};

// TODO: 여러 아이디를 받아야 하는 상황이 오면 수정
/**
 * @description queries: [categoryIds]
 * @param {boolean} isRecommended
 * @property {string[]} recommendedCategories
 * @property {string[]} unRecommendedCategories
 */
export const mockedGetAreCategoriesLike = (isRecommended) => {
  const [uri, method] = [`${ENDPOINT}/categories/like`, 'get'];
  const responseResolver = async (req, res, ctx) => {
    const categoryIds = req.url.searchParams.get('categoryIds');
    if (isRecommended) {
      return res(ctx.status(200), ctx.json({ recommendedCategories: [categoryIds], unRecommendedCategories: [] }));
    }
    return res(ctx.status(200), ctx.json({ recommendedCategories: [], unRecommendedCategories: [categoryIds] }));
  };
  return { uri, method, responseResolver };
};

export const mockedPostCategoryUnlike = () => {
  const [uri, method] = [`${ENDPOINT}/categories/:categoryId/like/unlike`, 'post'];
  const responseResolver = async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ hasLike: false }));
  };
  return { uri, method, responseResolver };
};

export const mockedPostCategoryLike = () => {
  const [uri, method] = [`${ENDPOINT}/categories/:categoryId/like/like`, 'post'];
  const responseResolver = async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ hasLike: true }));
  };
  return { uri, method, responseResolver };
};
