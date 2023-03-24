import { GetServerSideProps } from 'next';

import PageTitle from '@/components/layout/PageTitle';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import useCategory from '@/hooks/category/useCategory';
import { Devide, ListSection } from '@/styles/layout';
import { ssrAspect } from '@/libs/renderAspect';
import categoryApi from '@/apis/categoryApi';
import queryKey from '@/query/queryKey';
import { PAGINATION_NUM } from '@/utils/constants';

const MyCategory = () => {
  const { categoires, hasNextPage, fetchNextPage, changeSearchQuery } = useCategory();
  return (
    <ListSection>
      <PageTitle>카테고리 목록</PageTitle>
      <CategoryControl onChangeQuery={changeSearchQuery} />
      <Devide />
      <CategoryList categoryList={categoires} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ListSection>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (_, queryClient) => {
  await queryClient.prefetchInfiniteQuery(
    [queryKey.categories, 'me', ''],
    ({ pageParam = 0 }) => categoryApi.getMyCategoryList({ offset: pageParam, query: '' }),
    {
      getNextPageParam: (lastPage) => (lastPage.contents.length < PAGINATION_NUM ? false : lastPage.pageNumber + 1),
    },
  );
});

export default MyCategory;