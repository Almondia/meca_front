import styled from 'styled-components';

import { FlexCenter, FlexColumn } from '@/styles/layout';
import Icon from '@/components/atoms/Icon';
import { ElementSizeType } from '@/types/common';

export const InputWrapper = styled.div``;

export const TextInputWrapper = styled.div<{ width?: ElementSizeType }>`
  ${FlexCenter};
  width: ${(props) => props.width ?? 'auto'};
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: ${({ theme }) => theme.border.button};
`;

export const TextInputBox = styled.input`
  flex: 1;
  line-height: 150%;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.gray};
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextInputIconBox = styled(Icon)`
  fill: ${({ theme }) => theme.gray};
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
  @media ${({ theme }) => theme.media.tablet} {
    ${FlexColumn};
    row-gap: 16px;
  }
`;

export const RadioBox = styled.label`
  color: ${({ theme }) => theme.gray};
  :hover {
    cursor: pointer;
  }
  & > input {
    vertical-align: bottom;
    appearance: none;
    width: ${({ theme }) => theme.fontSize.large};
    height: ${({ theme }) => theme.fontSize.large};
    border: max(1px, 0.1em) solid ${({ theme }) => theme.gray};
    border-radius: 50%;
    :checked {
      border: 0.35rem solid ${({ theme }) => theme.brandColor};
    }
    :focus-visible {
      outline-offset: max(2px, 0.1em);
      outline: max(2px, 0.1em) dotted ${({ theme }) => theme.gray};
    }
    :hover {
      box-shadow: 0 0 0 max(4px, 0.2em) ${({ theme }) => theme.lightGray};
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
