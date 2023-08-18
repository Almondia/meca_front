import { useEffect } from 'react';

import Input from '@/components/@common/atoms/Input';
import useScrollIntoView from '@/hooks/useScrollIntoView';

import { DescriptionWrapper, InputGroupWrapper, LabelWrapper, ValidationWrapper } from './styled';

interface ValidationProps {
  children: React.ReactNode;
  visible?: boolean;
}

const Label = ({ children }: { children: React.ReactNode }) => <LabelWrapper>{children}</LabelWrapper>;

const Validation = ({ children, visible = false }: ValidationProps) => {
  const [ref, scrollIntoView] = useScrollIntoView<HTMLDivElement>();
  useEffect(() => {
    if (visible) {
      visible && scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [visible, scrollIntoView]);
  return visible ? <ValidationWrapper ref={ref}>{children}</ValidationWrapper> : <div />;
};

const Description = ({ descLists }: { descLists: string[] }) => (
  <DescriptionWrapper>
    {descLists.map((desc, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={desc + index}>* {desc}</li>
    ))}
  </DescriptionWrapper>
);

const InputGroup = ({ children }: { children: React.ReactNode }) => <InputGroupWrapper>{children}</InputGroupWrapper>;

InputGroup.Label = Label;
InputGroup.Input = Input;
InputGroup.Validation = Validation;
InputGroup.Description = Description;

export default InputGroup;
