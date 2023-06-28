import dynamic from 'next/dynamic';

import React, { useCallback } from 'react';

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
  const handleSearchQuery = useCallback(() => {
    if (searchKeyword.length >= 100) {
      return;
    }
    onChangeQuery?.(searchKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);
  return (
    <BetweenControlGroup>
      <BetweenControlGroup.Left>
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
