import styled from 'styled-components';

import { ElementSizeType } from '@/types/common';

import { COLOR } from '@/styles/constants';
import { FlexCenter, FlexColumn } from '@/styles/layout';

export const InputWrapper = styled.div``;

export const TextInputWrapper = styled.div<{ width?: string }>`
  ${FlexCenter};
  width: ${(props) => props.width ?? 'auto'};
  padding: 2px 12px;
  border: 1px solid var(--color-gray);
  border-radius: ${({ theme }) => theme.border.button};
  color: var(--color-text);
`;

export const SearchInputWrapper = styled(TextInputWrapper)`
  input[type='search']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  input[type='search']::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    display: none;
  }
`;

export const TextInputBox = styled.input<{ width?: ElementSizeType }>`
  width: ${(props) => (props.width ? props.width : '100%')};
  line-height: 150%;
  font-size: ${({ theme }) => theme.fontSize.main};
  border: none;
  background-color: transparent;
  color: var(--color-text);
  :focus {
    outline: none;
  }
  ::placeholder {
    padding-top: 4px;
    font-style: italic;
    font-size: ${({ theme }) => theme.fontSize.sub};
    color: var(--color-gray);
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  display: inline-flex;
  width: fit-content;
  align-items: flex-end;
  column-gap: 4px;
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
    :disabled {
      opacity: 0.5;
    }
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
  ::placeholder {
    padding-top: 0px;
    font-style: normal;
    font-size: 2rem;
    color: var(--color-gray);
    opacity: 0.5;
  }
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2px;
  label {
    font-size: ${({ theme }) => theme.fontSize.sub};
    color: var(--color-gray);
  }
  input[type='checkbox'] {
    position: relative;
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--color-brand);
    border-radius: 2px;
    background: none;
    cursor: pointer;
    line-height: 0;
    margin: 0 0.4rem 0 0;
    outline: 0;
    padding: 0 !important;
    vertical-align: text-top;
    -webkit-appearance: none;
    opacity: 0.5;
  }

  input[type='checkbox']:hover {
    opacity: 1;
  }

  input[type='checkbox']:checked {
    background-color: var(--color-brand);
    opacity: 1;
  }

  input[type='checkbox']:before {
    content: '';
    position: absolute;
    right: 50%;
    top: 50%;
    width: 4px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    margin: -1px -1px 0 -1px;
    transform: rotate(45deg) translate(-50%, -50%);
    z-index: 2;
  }
`;
