import { TitleInputBox, TitleInputWrapper } from './styled';
import { InputProps } from './type';

export interface TitleInputProps extends InputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const TitleInput = ({ name, value, placeholder, onChange, ariaLabel, isValid }: TitleInputProps) => (
  <TitleInputWrapper>
    <TitleInputBox
      name={name}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      aria-label={ariaLabel}
      isValid={isValid}
    />
  </TitleInputWrapper>
);

export default TitleInput;
