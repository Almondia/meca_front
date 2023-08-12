import CheckBox from '@/components/@common/atoms/Input/CheckBox';

import RadioGroup, { ForwardRadioGroup } from './Radio';
import Range from './Range';
import Search from './Search';
import { InputWrapper } from './styled';
import TextArea from './TextArea';
import TextInput from './TextInput';
import TitleInput from './TitleInput';

const Input = ({ children }: { children: React.ReactNode }) => <InputWrapper>{children}</InputWrapper>;

Input.Text = TextInput;
Input.RadioGroup = RadioGroup;
Input.ForwardRadioGroup = ForwardRadioGroup;
Input.TextArea = TextArea;
Input.Title = TitleInput;
Input.Range = Range;
Input.Search = Search;
Input.CheckBox = CheckBox;

export default Input;
