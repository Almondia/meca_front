import Icon from '@/components/common/Icon';
import useKeydown from '@/hooks/useKeydown';
import { ElementSizeType } from '@/types/common';

import { TextInputBox, TextInputLeftIconBox, TextInputWrapper } from './styled';
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
    <TextInputWrapper>
      <TextInputLeftIconBox>
        <Icon icon="Zoomin" size="0.9rem" />
      </TextInputLeftIconBox>
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
    </TextInputWrapper>
  );
};

export default Search;
