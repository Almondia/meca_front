/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import { useRecoilValue } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import PageTitle from '@/components/atoms/PageTitle';
import Selection from '@/components/atoms/Selection';
import AuthPageProvider from '@/components/common/AuthPageProvider';
import MetaHead from '@/components/common/MetaHead';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import useCategoryList, { CategoryListFetcherKey } from '@/hooks/category/useCategoryList';
import useQueryRouter from '@/hooks/useQueryRouter';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, ListSection } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';

interface CategoryProps {
  isRecommendedRequest?: boolean;
}

const RECOMMEND_QUERY = { recommended: 'true' } as const;

const Category = ({ isRecommendedRequest }: CategoryProps) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const { recommended, replaceWithQuery } = useQueryRouter<'recommended'>(isRecommendedRequest ? RECOMMEND_QUERY : {});
  const { categoryList, isEmpty, hasNextPage, fetchNextPage, query, changeSearchQuery } = useCategoryList(
    recommended ? 'recommended' : 'me',
    !hasAuth,
  );
  return (
    <AuthPageProvider>
      <MetaHead title="내 카테고리 목록" description="로그인 후 이용할 수 있어요!" />
      <ListSection>
        <PageTitle>{recommended ? '추천한 카테고리' : '내 카테고리'}</PageTitle>
        <CategoryControl query={query} onChangeQuery={changeSearchQuery} />
        <Devide />
        <Selection
          initialSelectedIndex={recommended ? 1 : 0}
          innerTexts={['작성 목록', '추천 목록']}
          onClicks={[
            () => !!recommended && replaceWithQuery({}),
            () => !recommended && replaceWithQuery(RECOMMEND_QUERY),
          ]}
        />
        <CategoryList
          categoryList={categoryList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isEmpty={isEmpty}
        />
      </ListSection>
    </AuthPageProvider>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const recommended = context?.query?.recommended;
  const isRecommendedRequest = recommended === 'true';
  const queryKey: CategoryListFetcherKey = isRecommendedRequest ? 'recommended' : 'me';
  await useCategoryList.prefetchInfiniteQuery(queryKey, queryClient);
  !useCategoryList.isEmpty(queryKey, queryClient) &&
    context.res.setHeader('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
  return { isRecommendedRequest };
});

export default Category;
