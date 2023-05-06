import { GetStaticProps } from 'next';

import categoryApi from '@/apis/categoryApi';
import MetaHead from '@/components/common/MetaHead';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import HomeCarousel from '@/components/organisms/HomeCarousel';
import useSharedCategory from '@/hooks/category/useSharedCategory';
import { isrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';

export default function Home() {
  const { categories, hasNextPage, fetchNextPage, changeSearchQuery } = useSharedCategory();
  return (
    <>
      <MetaHead />
      <HomeCarousel />
      <ListSection>
        <CategoryControl onChangeQuery={changeSearchQuery} isShared />
        <Devide />
        <CategoryList categoryList={categories} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </ListSection>
    </>
  );
}

export const getStaticProps: GetStaticProps = isrAspect(async (_, queryClient) => {
  await queryClient.prefetchInfiniteQuery(
    [queryKey.categories, 'shared', ''],
    () => categoryApi.getSharedCategoryList({}),
    {
      getNextPageParam: (lastPage) => lastPage.hasNext,
    },
  );
  return {};
});
