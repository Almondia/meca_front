import PageTitle from '@/components/layout/PageTitle';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import useCategory from '@/hooks/useCategory';
import { Devide, ListSection } from '@/styles/layout';

const MyCategory = () => {
  const { categoires, hasNextPage, fetchNextPage } = useCategory();
  console.log(categoires);
  return (
    <ListSection>
      <PageTitle>카테고리 목록</PageTitle>
      <CategoryControl />
      <Devide />
      <CategoryList categoryList={categoires} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ListSection>
  );
};

export default MyCategory;
