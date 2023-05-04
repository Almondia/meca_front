/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import categoryApi from '@/apis/categoryApi';
import PageTitle from '@/components/atoms/PageTitle';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import useCategory from '@/hooks/category/useCategory';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';

const Category = () => {
  const { categoires, hasNextPage, fetchNextPage } = useCategory();
  return (
    <ListSection>
      <PageTitle>내 카테고리 목록</PageTitle>
      <CategoryControl />
      <Devide />
      <CategoryList categoryList={categoires} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ListSection>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (_, queryClient) => {
  await queryClient.prefetchInfiniteQuery([queryKey.categories, 'me'], () => categoryApi.getMyCategoryList({}), {
    getNextPageParam: (lastPage) => lastPage.hasNext,
  });
});

export default Category;
