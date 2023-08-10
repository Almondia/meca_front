// import Icon from '@/components/common/atoms/Icon';
import useKeydown from '@/hooks/useKeydown';
import { ElementSizeType } from '@/types/common';

import { SearchInputWrapper, TextInputBox } from './styled';
import { InputProps } from './type';

export interface TextInputProps extends InputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  width?: ElementSizeType;
}

const Search = ({ name, value, placeholder = '', ariaLabel, width, onChange, onSearch }: TextInputProps) => {
  const { ref } = useKeydown<HTMLInputElement>(onSearch, 'Enter');
  return (
    <SearchInputWrapper>
      <TextInputBox
        ref={ref}
        name={name}
        width={width}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label={ariaLabel}
        autoComplete="off"
        enterKeyHint="search"
      />
    </SearchInputWrapper>
  );
};

export default Search;
