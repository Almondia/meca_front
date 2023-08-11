import styled from 'styled-components';

import Icon from '@/components/@common/atoms/Icon';
import { IconButtonWrapper } from '@/components/@common/molecules/IconButton/styled';
import PostSection from '@/components/@common/molecules/PostSection';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';

import { MecaPostBodyProps } from '../type';

const OxIconWrapper = styled(IconButtonWrapper.withComponent('div'))`
  margin: 4px 0 0 16px;
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
      <OxIconWrapper iconSize={20} hasHoverEffect>
        <Icon icon={answer === 'O' ? 'O' : 'Ax'} />
      </OxIconWrapper>
    </PostSection>
  </>
);
