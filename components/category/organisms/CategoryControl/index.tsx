import dynamic from 'next/dynamic';

import { memo, useEffect } from 'react';

import Button from '@/components/@common/atoms/Button';
import Input from '@/components/@common/atoms/Input';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';

const CategoryUpdateDialog = dynamic(() => import('@/components/category/organisms/CategoryUpdateDialog'));

interface CategoryControlProps {
  query?: string;
  onChangeQuery?: (query: string) => void;
  isShared?: boolean;
}

const CategoryControl = memo(({ query, onChangeQuery, isShared }: CategoryControlProps) => {
  const {
    input: searchKeyword,
    onInputChange: handleSearchKeywordChange,
    setInput: setSearchKeyword,
  } = useInput(query ?? '');
  const { visible: addCategoryVisible, open: addCategoryOpen, close: addCategoryClose } = useModal();
  useEffect(() => {
    if (query === undefined) {
      return;
    }
    setSearchKeyword(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  const handleSearchQuery = () => {
    if (searchKeyword.length >= 100) {
      return;
    }
    onChangeQuery?.(searchKeyword);
  };
  return (
    <BetweenSection>
      <BetweenSection.Left>
        <Input.Search
          width="155px"
          name="search"
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          onSearch={handleSearchQuery}
          placeholder="제목으로 검색"
          ariaLabel="input-category-search"
        />
        <Button colorTheme="primary" onClick={handleSearchQuery} size="small">
          검색
        </Button>
      </BetweenSection.Left>
      <BetweenSection.Right>
        {!isShared && (
          <>
            <Button colorTheme="primary" onClick={addCategoryOpen} size="small">
              추가하기 +
            </Button>
            {addCategoryVisible && (
              <CategoryUpdateDialog
                categoryTitle=""
                visible={addCategoryVisible}
                onClose={addCategoryClose}
                thumbnail=""
              />
            )}
          </>
        )}
      </BetweenSection.Right>
    </BetweenSection>
  );
});

export default CategoryControl;
