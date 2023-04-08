import React from 'react';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import CategoryUpdateDialog from '@/components/molcules/CategoryUpdateDialog';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';

import { CategoryControlComponentsContainer, CategoryControlWrapper } from './styled';

/** 카테고리 목록 페이지 상단 컨트롤 레이아웃 */
const CategoryControl = ({ onChangeQuery }: { onChangeQuery: (query: string) => void }) => {
  const { input: searchKeyword, onInputChange: handleSearchKeywordChange } = useInput('');
  const { visible: addCategoryVisible, open: addCategoryOpen, close: addCategoryClose } = useModal();
  const handleSearchQuery = () => {
    if (searchKeyword.length >= 100) {
      return;
    }
    onChangeQuery(searchKeyword);
  };

  return (
    <CategoryControlWrapper>
      <CategoryControlComponentsContainer>
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
      </CategoryControlComponentsContainer>
      <CategoryControlComponentsContainer>
        <Button colorTheme="primary" onClick={addCategoryOpen}>
          추가하기 +
        </Button>
        {addCategoryVisible && (
          <CategoryUpdateDialog categoryTitle="" visible={addCategoryVisible} onClose={addCategoryClose} />
        )}
        <Button colorTheme="success" onClick={() => console.log('HI')}>
          <Button.RightIcon icon="Play" />
          <Button.InnerText>랜덤 플레이</Button.InnerText>
        </Button>
      </CategoryControlComponentsContainer>
    </CategoryControlWrapper>
  );
};

export default React.memo(CategoryControl);
