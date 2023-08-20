import { GetStaticProps } from 'next';

import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { sharedCategorySearcQueryState } from '@/atoms/category';
import HomeCarousel from '@/components/@common/organisms/HomeCarousel';
import MetaHead from '@/components/@util/MetaHead';
import CategoryList from '@/components/category/organisms/CategoryList';
import CategoryListSearchGroup from '@/components/category/organisms/CategoryListSearchGroup';
import useCategoryList from '@/hooks/category/useCategoryList';
import useQueryRouter from '@/hooks/useQueryRouter';
import { isrAspect } from '@/libs/renderAspect';
import { Devide, ListPageLayout } from '@/styles/layout';
import { getPlaceholderBlurImage } from '@/utils/placeholderHandler';

export default function Home() {
  const [searchQuery, setSearchQuery] = useRecoilState(sharedCategorySearcQueryState);
  const { q, replaceWithQuery } = useQueryRouter<'q'>({ q: searchQuery });
  const { categoryList, hasNextPage, fetchNextPage, searchQuries, isEmpty } = useCategoryList('shared', false, q);

  useEffect(() => {
    setSearchQuery(q ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <>
      <MetaHead />
      <HomeCarousel />
      <ListPageLayout>
        <CategoryListSearchGroup
          categoryType="shared"
          searchQueries={searchQuries}
          onReplaceWithSearchQuery={replaceWithQuery}
        />
        <Devide />
        <CategoryList
          categoryList={categoryList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isEmpty={isEmpty}
        />
      </ListPageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = isrAspect(async (_, queryClient) => {
  await useCategoryList.prefetchInfiniteQueryWithPlaceholder('shared', queryClient, getPlaceholderBlurImage);
  const revalidate = useCategoryList.isEmpty('shared', queryClient) ? 60 : 3600;
  return {
    revalidate,
  };
});
