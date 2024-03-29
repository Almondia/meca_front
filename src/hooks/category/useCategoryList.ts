import { useEffect, useState } from 'react';

import { QueryClient } from '@tanstack/react-query';

import { CategoryListPaginationResponse } from '@/types/domain/category';

import categoryApi from '@/apis/categoryApi';
import { useFlatInfiniteQuery } from '@/query/hooks/useFlatInfiniteQuery';
import queryKey from '@/query/queryKey';
import { getRemoteImageUrl } from '@/utils/imageHandler';

export type CategoryListFetcherKey = 'shared' | 'me' | 'recommended';
type BlurFn = (url: string, size: number) => Promise<{ blurDataURL: string; img: any } | undefined>;

const getQueryKey = (query: string, key: CategoryListFetcherKey) => [queryKey.categories, key, query];

const categoryListStrategy = {
  shared: {
    queryKey: (query: string) => getQueryKey(query, 'shared'),
    queryFn: categoryApi.getSharedCategoryList,
  },
  me: {
    queryKey: (query: string) => getQueryKey(query, 'me'),
    queryFn: categoryApi.getMyCategoryList,
  },
  recommended: {
    queryKey: (query: string) => getQueryKey(query, 'recommended'),
    queryFn: categoryApi.getMyRecommendedCategoryList,
  },
} as const;

const initialSearchQuries = {
  me: '',
  recommended: '',
  shared: '',
} as const;

const useCategoryList = (key: CategoryListFetcherKey, disable?: boolean, q = '') => {
  const [searchQuries, setSearchQueries] = useState<Record<CategoryListFetcherKey, string>>({
    ...initialSearchQuries,
    [key]: q,
  });

  useEffect(() => {
    setSearchQueries((prev) => ({ ...prev, [key]: q }));
  }, [q, key]);

  const currentSearchQuery = searchQuries[key];
  const currentQueryKey = getQueryKey(currentSearchQuery, key);
  const {
    data: categoryList,
    isEmpty,
    hasNextPage,
    fetchNextPage,
  } = useFlatInfiniteQuery(
    currentQueryKey,
    async ({ pageParam }) =>
      categoryListStrategy[key].queryFn({ hasNext: pageParam, containTitle: currentSearchQuery }),
    {
      enabled: !disable,
    },
  );

  return {
    categoryList,
    fetchNextPage,
    hasNextPage,
    query: currentSearchQuery,
    isEmpty,
    searchQuries,
  };
};

const genContentsWithPlaceholder = (categoryList: CategoryListPaginationResponse, blurFn: BlurFn) =>
  categoryList.contents.map(async (content) => {
    const { thumbnail } = content.category;
    const placeholderThumbnail = thumbnail && (await blurFn(getRemoteImageUrl(thumbnail), 20));
    if (!placeholderThumbnail) {
      return content;
    }
    const { img, blurDataURL } = placeholderThumbnail;
    return { ...content, category: { ...content.category, blurThumbnail: { ...img, blurDataURL } } };
  });

useCategoryList.prefetchInfiniteQuery = (key: CategoryListFetcherKey, query: string, queryClient: QueryClient) =>
  queryClient.prefetchInfiniteQuery(
    categoryListStrategy[key].queryKey(query),
    async () => categoryListStrategy[key].queryFn({ containTitle: query }),
    {
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
    },
  );

useCategoryList.prefetchInfiniteQueryWithPlaceholder = (
  key: CategoryListFetcherKey,
  queryClient: QueryClient,
  blurFn: BlurFn,
) =>
  queryClient.prefetchInfiniteQuery(
    categoryListStrategy[key].queryKey(''),
    async () => {
      const categoryList = await categoryListStrategy[key].queryFn({});
      const contentsWithBlur = await Promise.all(genContentsWithPlaceholder(categoryList, blurFn));
      return { ...categoryList, contents: contentsWithBlur };
    },
    {
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
    },
  );

useCategoryList.isEmpty = (key: CategoryListFetcherKey, queryClient: QueryClient) =>
  !queryClient.getQueryData(categoryListStrategy[key].queryKey(''));

export default useCategoryList;
