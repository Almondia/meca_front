import { NumberIncrementerButton, NumberIncrementerCount, NumberIncrementerWrapper } from './styled';

interface NumberIncrementerProps {
  value: number;
  onChange: (isIncrement: boolean) => void;
}

const NumberIncrementer = ({ value, onChange }: NumberIncrementerProps) => (
  <NumberIncrementerWrapper>
    <div>
      <NumberIncrementerButton onClick={() => onChange(true)}>+</NumberIncrementerButton>
      <NumberIncrementerCount>{value}</NumberIncrementerCount>
      <NumberIncrementerButton onClick={() => onChange(false)}>-</NumberIncrementerButton>
    </div>
  </NumberIncrementerWrapper>
);

export default NumberIncrementer;
