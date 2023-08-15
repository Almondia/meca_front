/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import { useRecoilValue } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import Tab from '@/components/@common/molecules/Tab';
import AuthPageProvider from '@/components/@util/AuthPageProvider';
import MetaHead from '@/components/@util/MetaHead';
import CategorySearchBar from '@/components/category/molecules/CategorySearchBar';
import CategoryList from '@/components/category/organisms/CategoryList';
import CategoryListHeader from '@/components/category/organisms/CategoryListHeader';
import useCategoryList, { CategoryListFetcherKey } from '@/hooks/category/useCategoryList';
import useQueryRouter from '@/hooks/useQueryRouter';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, ListPageLayout } from '@/styles/layout';
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
      <ListPageLayout>
        <CategoryListHeader pageTitle={recommended ? '추천한 카테고리' : '내 카테고리'} />
        <Devide />
        <BetweenSection>
          <BetweenSection.Left>
            <Tab
              initialSelectedIndex={recommended ? 1 : 0}
              tabButtonProps={[
                { name: '작성 목록', onClick: () => replaceWithQuery({}) },
                { name: '추천 목록', onClick: () => replaceWithQuery(RECOMMEND_QUERY) },
              ]}
            />
          </BetweenSection.Left>
          <BetweenSection.Right>
            <CategorySearchBar query={query} onChangeQuery={changeSearchQuery} />
          </BetweenSection.Right>
        </BetweenSection>
        <CategoryList
          categoryList={categoryList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isEmpty={isEmpty}
        />
      </ListPageLayout>
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
