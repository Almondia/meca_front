import Icon from '@/components/@common/atoms/Icon';
import PostBody from '@/components/@common/molecules/PostBody';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';

import { MecaPostBodyProps } from '../type';

// const OxIcon = styled(IconButtonWrapper.withComponent('div'))`
//   margin: 8px 0 0 16px;
//   background-color: var(--color-brightgray);
//   :hover {
//     background-color: var(--color-brightgray);
//   }
// `;

export const OxPostBody = ({ question, answer }: MecaPostBodyProps) => (
  <>
    <PostBody>
      <PostBody.Title>Question</PostBody.Title>
      <PostBody.Content>
        <QuillReader content={question} />
      </PostBody.Content>
    </PostBody>
    <PostBody>
      <PostBody.Title>Answer</PostBody.Title>
      {/* FIX: need fix */}
      <Icon icon={answer === 'O' ? 'O' : 'Ax'} />
    </PostBody>
  </>
);
