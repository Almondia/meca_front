import PostBody from '@/components/@common/molecules/PostBody';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';

import { MecaPostBodyProps } from '../type';

export const DefaultPostBody = ({ question, answer }: MecaPostBodyProps) => (
  <>
    <PostBody>
      <PostBody.Title>Question</PostBody.Title>
      <PostBody.Content>
        <QuillReader content={question} />
      </PostBody.Content>
    </PostBody>
    <PostBody>
      <PostBody.Title>Answer</PostBody.Title>
      <PostBody.Content>{answer}</PostBody.Content>
    </PostBody>
  </>
);
