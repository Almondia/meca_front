import { useEffect } from 'react';

import Icon from '@/components/@common/atoms/Icon';
import Input from '@/components/@common/atoms/Input';
import {
  CategorySearchBarIconButton,
  CategorySearchBarWrapper,
} from '@/components/category/molecules/CategorySearchBar/styled';
import useInput from '@/hooks/useInput';
import { HiddenText } from '@/styles/common';

interface CategorySearchProps {
  query?: string;
  onChangeQuery: (query: string) => void;
}

const CategorySearchBar = ({ query, onChangeQuery }: CategorySearchProps) => {
  const {
    input: searchKeyword,
    onInputChange: onSearchKeywordChange,
    setInput: setSearchKeyword,
  } = useInput(query ?? '');

  const handleSearchQueryClick = () => {
    if (searchKeyword.length >= 100) {
      return;
    }
    onChangeQuery(searchKeyword);
  };

  useEffect(() => {
    if (query === undefined) {
      return;
    }
    setSearchKeyword(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <CategorySearchBarWrapper>
      <Input.Search
        width="100%"
        name="search-category-by-query"
        value={searchKeyword}
        onChange={onSearchKeywordChange}
        onSearch={handleSearchQueryClick}
        placeholder="제목으로 검색"
        ariaLabel="input-category-search"
      />
      <CategorySearchBarIconButton onClick={handleSearchQueryClick}>
        <HiddenText>검색</HiddenText>
        <Icon icon="Zoomin" size="0.875rem" color="#FFF" />
      </CategorySearchBarIconButton>
    </CategorySearchBarWrapper>
  );
};

export default CategorySearchBar;
