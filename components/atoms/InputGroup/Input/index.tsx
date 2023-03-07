import RadioGroup from './Radio';
import { InputWrapper } from './styled';
import TextInput from './TextInput';

/**
 * Input 처리 합성 컴포넌트
 * - Text
 * - Radio
 * <br />
 *
 * > 예시
 *
 * ```html
 * <Input>
 *  <Input.Text {...props} />
 * </Input>
 * ```
 */
const Input = ({ children }: { children: React.ReactNode }) => <InputWrapper>{children}</InputWrapper>;

Input.Text = TextInput;
Input.RadioGroup = RadioGroup;
export default Input;
