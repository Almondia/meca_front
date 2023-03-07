import { RadioBox, RadioGroupWrapper } from './styled';
import { InputProps } from './type';

export interface RadioProps extends InputProps {
  defaultChecked?: boolean;
  children: React.ReactNode;
}

const Radio = ({ children, name, value, defaultChecked, disabled }: RadioProps) => (
  <RadioBox>
    {children}
    <input type="radio" name={name} value={value} defaultChecked={defaultChecked} disabled={disabled} />
  </RadioBox>
);

const RadioGroup = ({ children }: { children: React.ReactNode }) => <RadioGroupWrapper>{children}</RadioGroupWrapper>;
RadioGroup.Radio = Radio;

export default RadioGroup;
