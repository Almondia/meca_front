import BetweenSection from '@/components/@common/molecules/BetweenSection';
import Tab from '@/components/@common/molecules/Tab';
import CategorySearchBar from '@/components/category/molecules/CategorySearchBar';
import { CategoryListFetcherKey } from '@/hooks/category/useCategoryList';

interface CategoryListSearchGroupProps {
  categoryType: CategoryListFetcherKey;
  searchQueries: Record<CategoryListFetcherKey, string>;
  onReplaceWithSearchQuery: <T extends string>(quries: Record<T, string>) => void;
}

const defaultQueryStringByCategoryType: Record<CategoryListFetcherKey, { [key: string]: string }> = {
  me: { recommended: '' },
  recommended: { recommended: 'true' },
  shared: {},
};

const CategoryListSearchGroup = ({
  categoryType,
  searchQueries,
  onReplaceWithSearchQuery,
}: CategoryListSearchGroupProps) => {
  const handleChangeSearchQuery = (input: string) => {
    onReplaceWithSearchQuery({ ...defaultQueryStringByCategoryType[categoryType], q: input });
  };
  return (
    <BetweenSection>
      <BetweenSection.Left>
        {categoryType !== 'shared' && (
          <Tab
            forceSelectedIndex={categoryType === 'recommended' ? 1 : 0}
            initialSelectedIndex={categoryType === 'recommended' ? 1 : 0}
            tabButtonProps={[
              {
                name: '작성 목록',
                onClick: () =>
                  onReplaceWithSearchQuery({ ...defaultQueryStringByCategoryType.me, q: searchQueries.me }),
              },
              {
                name: '추천 목록',
                onClick: () =>
                  onReplaceWithSearchQuery({
                    ...defaultQueryStringByCategoryType.recommended,
                    q: searchQueries.recommended,
                  }),
              },
            ]}
          />
        )}
      </BetweenSection.Left>
      <BetweenSection.Right>
        <CategorySearchBar query={searchQueries[categoryType]} onChangeQuery={handleChangeSearchQuery} />
      </BetweenSection.Right>
    </BetweenSection>
  );
};

export default CategoryListSearchGroup;
