import type { Dispatch, SetStateAction } from 'react';

import { CheckBoxWrapper } from './styled';

interface CheckBoxProps {
  children: React.ReactNode;
  name: string;
  isChecked?: boolean;
  onCheck: () => void | Dispatch<SetStateAction<boolean>>;
}

const CheckBox = ({ children, name, isChecked = false, onCheck }: CheckBoxProps) => (
  <CheckBoxWrapper>
    <input id={name} type="checkbox" name={name} checked={isChecked} onChange={onCheck} />
    <label htmlFor={name}>{children}</label>
  </CheckBoxWrapper>
);

export default CheckBox;
