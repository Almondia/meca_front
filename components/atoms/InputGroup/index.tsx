import Input from './Input';
import { DescriptionWrapper, InputGroupWrapper, LabelWrapper, ValidationWrapper } from './styled';

export interface ValidationProps {
  children: React.ReactNode;
  visible?: boolean;
}

const Label = ({ children }: { children: React.ReactNode }) => <LabelWrapper>{children}</LabelWrapper>;

const Validation = ({ children, visible = false }: ValidationProps) =>
  visible ? <ValidationWrapper>{children}</ValidationWrapper> : <div />;

const Description = ({ descLists }: { descLists: string[] }) => (
  <DescriptionWrapper>
    {descLists.map((desc, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={desc + index}>* {desc}</li>
    ))}
  </DescriptionWrapper>
);

/**
 * form input을 위해 필요한 요소들을 조합해 사용할 수 있는 합성 컴포넌트
 * - Label
 * - Input
 * - Validation
 * - Description
 * 
 * > 예시
 * 
 * ```html
 *       <InputGroup>
        <InputGroup.Label>Value를 입력하세요</InputGroup.Label>
        <InputGroup.Validation visible={!isValid}>1557을 입력했다</InputGroup.Validation>
        <InputGroup.Input>
          <InputGroup.Input.Text
            name="name"
            value={value}
            onChange={(e) => {
              e.target.value === '1557' ? setIsValid(false) : setIsValid(true);
              setValue(e.target.value);
            }}
            placeholder="placeholder"
          />
        </InputGroup.Input>
        <InputGroup.Description descLists={['1557을 입력하면 안됩니다', '안녕하세요']} />
      </InputGroup>
 * ```
 */
const InputGroup = ({ children }: { children: React.ReactNode }) => <InputGroupWrapper>{children}</InputGroupWrapper>;

InputGroup.Label = Label;
InputGroup.Input = Input;
InputGroup.Validation = Validation;
InputGroup.Description = Description;

export default InputGroup;
