import { QuizBoxBody, QuizBoxHeader, QuizBoxWrapper } from './styled';

export interface QuizBoxProps {
  header: string;
  body: React.ReactNode;
  isColumn?: boolean;
}

const QuizBox = ({ body, header, isColumn }: QuizBoxProps) => (
  <QuizBoxWrapper isColumn={isColumn ?? false}>
    <QuizBoxHeader>{header}</QuizBoxHeader>
    <QuizBoxBody>{body}</QuizBoxBody>
  </QuizBoxWrapper>
);

export default QuizBox;
