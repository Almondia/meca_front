import { GetStaticProps } from 'next';

import HomeCarousel from '@/components/@common/organisms/HomeCarousel';
import MetaHead from '@/components/@util/MetaHead';
import CategoryControl from '@/components/category/organisms/CategoryControl';
import CategoryList from '@/components/category/organisms/CategoryList';
import useCategoryList from '@/hooks/category/useCategoryList';
import { isrAspect } from '@/libs/renderAspect';
import { Devide, ListPageLayout } from '@/styles/layout';
import { getPlaceholderBlurImage } from '@/utils/placeholderHandler';

export default function Home() {
  const { categoryList, hasNextPage, fetchNextPage, changeSearchQuery, isEmpty } = useCategoryList('shared');
  return (
    <>
      <MetaHead />
      <HomeCarousel />
      <ListPageLayout>
        <CategoryControl onChangeQuery={changeSearchQuery} isShared />
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
