import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';
import { ElementSizeType } from '@/types/common';

import { InputProps } from './type';

export interface RangeProps extends InputProps {
  /** [선택] default: 100% */
  width?: ElementSizeType;
  /** [필수] 정수 입력 */
  min: number;
  /** [필수] 정수 입력 */
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeWrapper = styled.div<{ width: ElementSizeType }>`
  ${FlexCenter};
  position: relative;
  width: ${(props) => props.width ?? '100%'};
  height: 24px;
  border-radius: 10px;
`;

const RangeInner = styled.div`
  ${FlexCenter};
  position: relative;
  width: 100%;
  height: 5px;
`;

const RangeInnerAbsBox = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  width: ${(props) => props.width}%;
  height: 5px;
  content: '';
  opacity: 0.5;
`;

const RangeInnerFilled = styled(RangeInnerAbsBox)`
  left: 0;
  background-color: var(--color-brand);
`;

const RangeInnerUnfilled = styled(RangeInnerAbsBox)`
  right: 0;
  background-color: var(--color-gray);
`;

const RangeInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  &::-webkit-slider-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    -webkit-appearance: none;
    background-color: var(--color-brand);
  }
  &::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    -moz-appearance: none;
    background-color: var(--color-brand);
  }
`;

/**
 * 정수 range를 범위로 가지는 1방향 range input 컴포넌트
 */
const Range = ({ width = '100%', min, max, value, name, onChange }: RangeProps) => (
  <RangeWrapper width={width}>
    <RangeInner>
      <RangeInnerFilled width={((Number(value) - min) / (max - min)) * 100} />
      <RangeInnerUnfilled width={((max - Number(value)) / (max - min)) * 100} />
    </RangeInner>
    <RangeInput name={name} type="range" min={min} max={max} value={value} onChange={onChange} />
  </RangeWrapper>
);

export default Range;
