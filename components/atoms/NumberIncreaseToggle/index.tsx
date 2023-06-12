import { NumberIncreaseToggleButton, NumberIncreaseToggleInnerContainer, NumberIncreaseToggleWrapper } from './styled';

export interface NumberIncreaseToggleProps {
  value: number;
  onChange: (isIncrement: boolean) => void;
}

const NumberIncreaseToggle = ({ value, onChange }: NumberIncreaseToggleProps) => (
  <NumberIncreaseToggleWrapper>
    <div>
      <NumberIncreaseToggleButton onClick={() => onChange(true)}>+</NumberIncreaseToggleButton>
      <NumberIncreaseToggleInnerContainer>{value}</NumberIncreaseToggleInnerContainer>
      <NumberIncreaseToggleButton onClick={() => onChange(false)}>-</NumberIncreaseToggleButton>
    </div>
  </NumberIncreaseToggleWrapper>
);

export default NumberIncreaseToggle;
