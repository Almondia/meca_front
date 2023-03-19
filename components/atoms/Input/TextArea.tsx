import { TextAreaBox, TextAreaWrapper } from './styled';
import { InputProps } from './type';

export interface TextAreaProps extends InputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ name, value, placeholder = '', onChange, onBlur, disabled, ariaLabel }: TextAreaProps) => (
  <TextAreaWrapper>
    <TextAreaBox
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled ?? false}
      aria-label={ariaLabel}
    />
  </TextAreaWrapper>
);

export default TextArea;
