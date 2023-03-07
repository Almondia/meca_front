import { FlexCenter } from '@/styles/layout';
import Icon from '@/components/atoms/Icon';
import styled from 'styled-components';

export const InputWrapper = styled.div``;

export const TextInputWrapper = styled.div`
  ${FlexCenter};
  width: 100%;
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
