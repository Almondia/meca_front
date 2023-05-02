import styled from 'styled-components';

import Icon from '@/components/common/Icon';
import { COLOR } from '@/styles/constants';
import { FlexCenter, FlexColumn } from '@/styles/layout';
import { ElementSizeType } from '@/types/common';

export const InputWrapper = styled.div``;

export const TextInputWrapper = styled.div<{ width?: ElementSizeType }>`
  ${FlexCenter};
  width: ${(props) => props.width ?? 'auto'};
  padding: 4px 15px;
  border: 1px solid var(--color-gray);
  border-radius: ${({ theme }) => theme.border.button};
  color: var(--color-text);
`;

export const TextInputBox = styled.input`
  flex: 1;
  line-height: 150%;
  font-family: 'Pretendard';
  font-size: ${({ theme }) => theme.fontSize.main};
  border: none;
  background-color: transparent;
  color: var(--color-text);
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--color-gray);
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextInputIconBox = styled(Icon)`
  fill: var(--color-gray);
`;

export const TextInputLeftIconBox = styled(TextInputIconBox)`
  margin-right: 10px;
`;
export const TextInputRightIconBox = styled(TextInputIconBox)`
  margin-left: 10px;
`;

export const RadioGroupWrapper = styled.fieldset`
  display: flex;
  column-gap: 40px;
  @media ${({ theme }) => theme.media.mobile} {
    ${FlexColumn};
    row-gap: 16px;
  }
`;

export const RadioBox = styled.label`
  color: var(--color-gray);
  :hover {
    cursor: pointer;
  }
  & > input {
    vertical-align: bottom;
    appearance: none;
    width: ${({ theme }) => theme.fontSize.large};
    height: ${({ theme }) => theme.fontSize.large};
    border: max(1px, 0.1em) solid var(--color-gray);
    border-radius: 50%;
    :checked {
      border: 0.35rem solid var(--color-brand);
    }
    :focus-visible {
      outline-offset: max(2px, 0.1em);
      outline: max(2px, 0.1em) dotted var(--color-gray);
    }
    :hover {
      box-shadow: 0 0 0 max(4px, 0.2em) var(--color-lightgray);
    }
  }
`;

export const TextAreaWrapper = styled(TextInputWrapper)``;

export const TextAreaBox = styled(TextInputBox.withComponent('textarea'))`
  min-height: 120px;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const TitleInputWrapper = styled.div`
  width: 100%;
`;

export const TitleInputBox = styled(TextInputBox)<{ isValid: boolean }>`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: var(--color-gray);
  box-shadow: 0 4px 0 -3px var(--color-gray);
  :focus {
    box-shadow: 0 4px 0 -2px ${(props) => (props.isValid ? 'var(--color-brand)' : COLOR.error)};
  }
  @media ${({ theme }) => theme.media.mobile} {
    font-size: 1.5rem;
  }
`;
