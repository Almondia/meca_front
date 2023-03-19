import { NumberIncreaseToggleButton, NumberIncreaseToggleInnerContainer, NumberIncreaseToggleWrapper } from './styled';

export interface NumberIncreaseToggleProps {
  value: number;
  onChange: (isIncrement: boolean) => void;
}

const NumberIncreaseToggle = ({ value, onChange }: NumberIncreaseToggleProps) => (
  <NumberIncreaseToggleWrapper>
    <NumberIncreaseToggleButton onClick={() => onChange(true)}>+</NumberIncreaseToggleButton>
    <NumberIncreaseToggleInnerContainer>{value}</NumberIncreaseToggleInnerContainer>
    <NumberIncreaseToggleButton onClick={() => onChange(false)}>-</NumberIncreaseToggleButton>
  </NumberIncreaseToggleWrapper>
);

export default NumberIncreaseToggle;
