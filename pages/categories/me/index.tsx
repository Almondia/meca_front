import PageTitle from '@/components/layout/PageTitle';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import useCategory from '@/hooks/category/useCategory';
import { Devide, ListSection } from '@/styles/layout';

export { getServerSideProps } from '@/libs/getAuthenticatedUserServerSideProps';

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

export default MyCategory;
