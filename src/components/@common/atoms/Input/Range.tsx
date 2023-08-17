import { useCallback, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { ElementSizeType } from '@/types/common';

import { HiddenText } from '@/styles/common';
import { FlexCenter } from '@/styles/layout';

import { InputProps } from './type';

const RangeWrapper = styled.div<{ width: ElementSizeType }>`
  ${FlexCenter};
  position: relative;
  overflow: hidden;
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
  cursor: pointer;
  :disabled {
    cursor: default;
    &::-webkit-slider-thumb {
      background-color: var(--color-subbrand);
    }
    &::-moz-range-thumb {
      background-color: var(--color-subbrand);
    }
  }
  &::-webkit-slider-thumb {
    position: relative;
    margin-top: -1px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    -webkit-appearance: none;
    background-color: var(--color-brand);
    :hover {
      opacity: 0.92;
    }
  }

  &::-moz-range-thumb {
    position: relative;
    margin-top: -1px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    -webkit-appearance: none;
    background-color: var(--color-brand);
    :hover {
      opacity: 0.92;
    }
  }
`;

const Bubble = styled.span<{ left: string }>`
  position: absolute;
  top: 6px;
  right: 0;
  left: ${(props) => props.left};
  margin-left: -28px;
  text-align: center;
  box-shadow: 0 0 4px var(--color-brand);
  border-radius: ${({ theme }) => theme.border.card};
  width: 40px;
  padding: 4px 10px;
  font-size: ${({ theme }) => theme.fontSize.caption};
`;

export interface RangeProps extends InputProps {
  width?: ElementSizeType;
  min: number;
  max: number;
  step?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Range = ({ width = '100%', min, max, step = 1, disabled, value, name, onChange }: RangeProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [bubbleLeft, setBubbleLeft] = useState<string>('0%');
  const thumbWidth = 20;

  const getBubblePosition = useCallback(() => {
    const total = max - min;
    const perc = (Number(value) - Number(min)) / total;
    const offset = thumbWidth / 2 - thumbWidth * perc;
    setBubbleLeft(`calc(${perc * 100}% + ${offset}px)`);
  }, [min, max, value]);

  useEffect(() => {
    if (Number(value) >= min && Number(value) <= max) {
      getBubblePosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, max, min]);

  return (
    <div style={{ position: 'relative' }}>
      <Bubble left={bubbleLeft}>{value}</Bubble>
      <p>&nbsp;</p>
      <br />
      <RangeWrapper width={width}>
        <RangeInner>
          <RangeInnerFilled width={((Number(value) - min) / (max - min)) * 100} />
          <RangeInnerUnfilled width={((max - Number(value)) / (max - min)) * 100} />
        </RangeInner>
        <HiddenText>
          <label htmlFor={name}>{name}</label>
        </HiddenText>
        <RangeInput
          ref={ref}
          id={name}
          name={name}
          type="range"
          step={step.toString()}
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      </RangeWrapper>
    </div>
  );
};

export default Range;
