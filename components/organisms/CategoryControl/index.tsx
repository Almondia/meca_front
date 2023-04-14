import React from 'react';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import CategoryUpdateDialog from '@/components/molcules/CategoryUpdateDialog';
import ListControlGroup from '@/components/molcules/ListControlGroup';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';

export interface CategoryControlProps {
  onChangeQuery: (query: string) => void;
  isShared?: boolean;
}

const CategoryControl = ({ onChangeQuery, isShared }: CategoryControlProps) => {
  const { input: searchKeyword, onInputChange: handleSearchKeywordChange } = useInput('');
  const { visible: addCategoryVisible, open: addCategoryOpen, close: addCategoryClose } = useModal();
  const handleSearchQuery = () => {
    if (searchKeyword.length >= 100) {
      return;
    }
    onChangeQuery(searchKeyword);
  };
  return (
    <ListControlGroup>
      <ListControlGroup.Right>
        <Input.Text
          iconLeft="Zoomin"
          name="search"
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          placeholder="제목으로 카테고리 검색"
          ariaLabel="input-category-search"
        />
        <Button colorTheme="primary" width="100px" onClick={handleSearchQuery}>
          검색
        </Button>
      </ListControlGroup.Right>
      <ListControlGroup.Left>
        {!isShared && (
          <>
            <Button colorTheme="primary" onClick={addCategoryOpen}>
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
      </ListControlGroup.Left>
    </ListControlGroup>
  );
};

export default React.memo(CategoryControl);
