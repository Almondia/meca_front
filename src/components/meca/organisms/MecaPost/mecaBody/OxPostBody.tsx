import styled from 'styled-components';

import Icon from '@/components/@common/atoms/Icon';
import { IconButtonWrapper } from '@/components/@common/molecules/IconButton/styled';
import PostSection from '@/components/@common/molecules/PostSection';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';

import { MecaPostBodyProps } from '../type';

const OxIcon = styled(IconButtonWrapper.withComponent('div'))`
  margin: 8px 0 0 16px;
  background-color: var(--color-brightgray);
  :hover {
    background-color: var(--color-brightgray);
  }
`;

export const OxPostBody = ({ question, answer }: MecaPostBodyProps) => (
  <>
    <PostSection>
      <PostSection.Title>Question</PostSection.Title>
      <PostSection.Body>
        <QuillReader content={question} />
      </PostSection.Body>
    </PostSection>
    <PostSection>
      <PostSection.Title>Answer</PostSection.Title>
      <OxIcon>
        <Icon icon={answer === 'O' ? 'O' : 'Ax'} />
      </OxIcon>
    </PostSection>
  </>
);
