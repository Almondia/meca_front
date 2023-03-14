import PageTitle from '@/components/layout/PageTitle';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import { Devide, ListSection } from '@/styles/layout';

const MyCategory = () => (
  <ListSection>
    <PageTitle>카테고리 목록</PageTitle>
    <CategoryControl />
    <Devide />
    <CategoryList />
  </ListSection>
);

export default MyCategory;
