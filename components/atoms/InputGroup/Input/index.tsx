import { InputWrapper } from './styled';
import TextInput from './TextInput';

const Input = ({ children }: { children: React.ReactNode }) => <InputWrapper>{children}</InputWrapper>;

Input.Text = TextInput;

export default Input;
