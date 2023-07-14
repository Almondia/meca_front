import QuillReader from '@/components/molcules/Editor/QuillNoSSRReader';
import PostBody from '@/components/molcules/PostBody';

import { MecaPostBodyProps } from '../type';

const DefaultPostBody = ({ question, answer }: MecaPostBodyProps) => (
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

export default DefaultPostBody;
