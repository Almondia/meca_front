import { PostBodyProps } from '../type';
import { MecaPostContainer, MecaPostContentBody, MecaPostContentTitle, MecaPostContentWrapper } from '../styled';

const DefaultPostBody = ({ question, answer }: PostBodyProps) => (
  <MecaPostContentWrapper>
    <MecaPostContainer>
      <MecaPostContentTitle>Question</MecaPostContentTitle>
      <MecaPostContentBody>{question}</MecaPostContentBody>
    </MecaPostContainer>
    <MecaPostContainer>
      <MecaPostContentTitle>Answer</MecaPostContentTitle>
      <MecaPostContentBody>{answer}</MecaPostContentBody>
    </MecaPostContainer>
  </MecaPostContentWrapper>
);

export default DefaultPostBody;
