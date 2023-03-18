import { RadioBox, RadioGroupWrapper } from './styled';
import { InputProps } from './type';

export interface RadioProps extends InputProps {
  defaultChecked?: boolean;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({ children, name, value, onChange, defaultChecked, disabled }: RadioProps) => (
  <RadioBox>
    {children}
    <input
      type="radio"
      name={name}
      value={value}
      onChange={onChange}
      defaultChecked={defaultChecked}
      disabled={disabled}
    />
  </RadioBox>
);

const RadioGroup = ({ children }: { children: React.ReactNode }) => <RadioGroupWrapper>{children}</RadioGroupWrapper>;
RadioGroup.Radio = Radio;

export default RadioGroup;
