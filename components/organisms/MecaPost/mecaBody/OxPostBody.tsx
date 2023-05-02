import styled from 'styled-components';

import Icon from '@/components/atoms/Icon';
import { IconButtonWrapper } from '@/components/atoms/IconButton/styled';
import PostBody from '@/components/molcules/PostBody';

import { MecaPostBodyProps } from '../type';

const OxIcon = styled(IconButtonWrapper.withComponent('div'))`
  margin: 8px 0 0 16px;
  background-color: var(--color-brightgray);
  :hover {
    background-color: var(--color-brightgray);
  }
`;

const OxPostBody = ({ question, answer }: MecaPostBodyProps) => (
  <>
    <PostBody>
      <PostBody.Title>Question</PostBody.Title>
      <PostBody.Content>{question}</PostBody.Content>
    </PostBody>
    <PostBody>
      <PostBody.Title>Answer</PostBody.Title>
      <OxIcon>
        <Icon icon={answer === 'O' ? 'O' : 'Ax'} />
      </OxIcon>
    </PostBody>
  </>
);

export default OxPostBody;
