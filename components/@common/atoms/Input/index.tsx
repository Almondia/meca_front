import RadioGroup, { ForwardRadioGroup } from './Radio';
import Range from './Range';
import Search from './Search';
import { InputWrapper } from './styled';
import TextArea from './TextArea';
import TextInput from './TextInput';
import TitleInput from './TitleInput';

/**
 * Input 처리 합성 컴포넌트
 * - Text
 * - Radio
 * - TextArea
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
Input.ForwardRadioGroup = ForwardRadioGroup;
Input.TextArea = TextArea;
Input.Title = TitleInput;
Input.Range = Range;
Input.Search = Search;

export default Input;
