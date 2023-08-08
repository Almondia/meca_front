import PostSection from '@/components/@common/molecules/PostSection';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';

import { MecaPostBodyProps } from '../type';

export const DefaultPostBody = ({ question, answer }: MecaPostBodyProps) => (
  <>
    <PostSection>
      <PostSection.Title>Question</PostSection.Title>
      <PostSection.Body>
        <QuillReader content={question} />
      </PostSection.Body>
    </PostSection>
    <PostSection>
      <PostSection.Title>Answer</PostSection.Title>
      <PostSection.Body>{answer}</PostSection.Body>
    </PostSection>
  </>
);
