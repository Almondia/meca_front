import dynamic from 'next/dynamic';

import React from 'react';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import BetweenControlGroup from '@/components/molcules/BetweenControlGroup';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';

const CategoryUpdateDialog = dynamic(() => import('@/components/organisms/CategoryUpdateDialog'));

export interface CategoryControlProps {
  onChangeQuery?: (query: string) => void;
  isShared?: boolean;
}

const CategoryControl = ({ onChangeQuery, isShared }: CategoryControlProps) => {
  const { input: searchKeyword, onInputChange: handleSearchKeywordChange } = useInput('');
  const { visible: addCategoryVisible, open: addCategoryOpen, close: addCategoryClose } = useModal();
  const handleSearchQuery = () => {
    if (searchKeyword.length >= 100) {
      return;
    }
    onChangeQuery?.(searchKeyword);
  };
  return (
    <BetweenControlGroup>
      <BetweenControlGroup.Left>
        <Input.Text
          width="155px"
          iconLeft="Zoomin"
          name="search"
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          placeholder="제목으로 검색"
          ariaLabel="input-category-search"
        />
        <Button colorTheme="primary" onClick={handleSearchQuery} size="small">
          검색
        </Button>
      </BetweenControlGroup.Left>
      <BetweenControlGroup.Right>
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
      </BetweenControlGroup.Right>
    </BetweenControlGroup>
  );
};

export default React.memo(CategoryControl);
