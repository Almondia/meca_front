/* eslint-disable import/prefer-default-export */
import { QueryFunction, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

import { CursorPaginationType } from '@/types/domain';

interface QueryFnData extends CursorPaginationType {
  contents: any[];
  [key: string]: any;
}

export function useFlatInfiniteQuery<
  TQueryFnData extends QueryFnData = QueryFnData,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  option?: UseInfiniteQueryOptions<TQueryFnData, TError, TQueryFnData, TQueryFnData, TQueryKey>,
) {
  const {
    data,
    isFetching,
    isError,
    fetchNextPage: originFetchNextPage,
    ...rest
  } = useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
    ...option,
  });
  const flatted = data
    ? data.pages
        .flatMap((page) => page)
        .reduce((prev, current) => ({ ...current, contents: prev.contents.concat(current.contents) }))
    : ({ contents: [], hasNext: undefined, pageSize: 0 } as unknown as TQueryFnData);
  const isEmpty = flatted.contents.length === 0;
  const fetchNextPage =
    !option?.enabled || isFetching || isError ? ((() => {}) as typeof originFetchNextPage) : originFetchNextPage;
  return { data: flatted, isEmpty, fetchNextPage, isFetching, isError, ...rest };
}
