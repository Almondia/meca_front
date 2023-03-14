import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import useInput from '@/hooks/useInput';

import { CategoryControlComponentsContainer, CategoryControlWrapper } from './styled';

/** 카테고리 목록 페이지 상단 컨트롤 레이아웃 */
const CategoryControl = () => {
  // TODO: 로직 추가
  const { input: searchKeyword, onInputChange: handleSearchKeywordChange } = useInput('');
  return (
    <CategoryControlWrapper>
      <CategoryControlComponentsContainer>
        <Input.Text
          iconLeft="Zoomin"
          name="search"
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          placeholder="제목+내용 카드 검색"
        />
        <Button colorTheme="primary" width="100px" onClick={() => console.log('HI')}>
          검색
        </Button>
      </CategoryControlComponentsContainer>
      <CategoryControlComponentsContainer>
        <Button colorTheme="primary" onClick={() => console.log('HI')}>
          추가하기 +
        </Button>
        <Button colorTheme="success" onClick={() => console.log('HI')}>
          <Button.RightIcon icon="Play" />
          <Button.InnerText>랜덤 플레이</Button.InnerText>
        </Button>
      </CategoryControlComponentsContainer>
    </CategoryControlWrapper>
  );
};

export default CategoryControl;
