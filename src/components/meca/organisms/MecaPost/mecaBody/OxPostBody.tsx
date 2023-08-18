import styled from 'styled-components';

import Icon from '@/components/@common/atoms/Icon';
import PostSection from '@/components/@common/molecules/PostSection';
import QuillReader from '@/components/@common/organisms/Editor/QuillReader';

import { MecaPostBodyProps } from '../type';

const OxIconWrapper = styled.div`
  margin-left: 16px;
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
      <PostSection.Body boxed={false} indented={false}>
        <OxIconWrapper>
          <Icon icon={answer === 'O' ? 'O' : 'Ax'} size="24px" />
        </OxIconWrapper>
      </PostSection.Body>
    </PostSection>
  </>
);
