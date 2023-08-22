import { GetServerSideProps } from 'next';

import { useRecoilValue } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import MetaHead from '@/components/@util/MetaHead';
import CategoryList from '@/components/category/organisms/CategoryList';
import CategoryListHeader from '@/components/category/organisms/CategoryListHeader';
import CategoryListSearchGroup from '@/components/category/organisms/CategoryListSearchGroup';
import useCategoryList, { CategoryListFetcherKey } from '@/hooks/category/useCategoryList';
import useQueryRouter from '@/hooks/useQueryRouter';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, ListPageLayout } from '@/styles/layout';

interface CategoryProps {
  recommended: string;
  searchQuery: string;
}

const Category = ({ recommended = '', searchQuery = '' }: CategoryProps) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const {
    recommended: recommendedQuery,
    q,
    replaceWithQuery,
  } = useQueryRouter<'recommended' | 'q'>({ recommended, q: searchQuery });
  const isRecommendedRequest = !!recommendedQuery;
  const categoryListQueryKey: CategoryListFetcherKey = isRecommendedRequest ? 'recommended' : 'me';
  const { categoryList, isEmpty, hasNextPage, fetchNextPage, searchQuries } = useCategoryList(
    categoryListQueryKey,
    !hasAuth,
    q,
  );
  return (
    <>
      <MetaHead title="내 카테고리 목록" description="로그인 후 이용할 수 있어요!" />
      <ListPageLayout>
        <CategoryListHeader
          hasAddButton={!isRecommendedRequest}
          pageTitle={isRecommendedRequest ? '추천한 카테고리' : '내 카테고리'}
        />
        <Devide />
        <CategoryListSearchGroup
          categoryType={categoryListQueryKey}
          searchQueries={searchQuries}
          onReplaceWithSearchQuery={replaceWithQuery}
        />
        <CategoryList
          categoryList={categoryList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isEmpty={isEmpty}
          isMine={categoryListQueryKey === 'me'}
        />
      </ListPageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const recommended = context?.query?.recommended;
  const q = context?.query?.q;
  const searchQuery = !q || typeof q !== 'string' ? '' : q;
  const isRecommendedRequest = recommended === 'true';
  const queryKey: CategoryListFetcherKey = isRecommendedRequest ? 'recommended' : 'me';
  await useCategoryList.prefetchInfiniteQuery(queryKey, searchQuery, queryClient);
  return {
    recommended: isRecommendedRequest ? 'true' : '',
    searchQuery,
    cached: !useCategoryList.isEmpty(queryKey, queryClient),
  };
});

export default Category;
