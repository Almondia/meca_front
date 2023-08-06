import { GetStaticProps } from 'next';

import MetaHead from '@/components/common/MetaHead';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import HomeCarousel from '@/components/organisms/HomeCarousel';
import useCategoryList from '@/hooks/category/useCategoryList';
import { isrAspect } from '@/libs/renderAspect';
import { Devide, ListSection } from '@/styles/layout';
import { getPlaceholderBlurImage } from '@/utils/placeholderHandler';

export default function Home() {
  const { categoryList, hasNextPage, fetchNextPage, changeSearchQuery, isEmpty } = useCategoryList('shared');
  return (
    <>
      <MetaHead />
      <HomeCarousel />
      <ListSection>
        <CategoryControl onChangeQuery={changeSearchQuery} isShared />
        <Devide />
        <CategoryList
          categoryList={categoryList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isEmpty={isEmpty}
        />
      </ListSection>
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
