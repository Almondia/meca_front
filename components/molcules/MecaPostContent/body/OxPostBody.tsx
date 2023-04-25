import styled from 'styled-components';

import Icon from '@/components/atoms/Icon';
import { IconButtonWrapper } from '@/components/atoms/IconButton/styled';

import { MecaPostContainer, MecaPostContentBody, MecaPostContentTitle, MecaPostContentWrapper } from '../styled';
import { PostBodyProps } from '../type';

const OxIcon = styled(IconButtonWrapper.withComponent('div'))`
  margin: 8px 0 0 16px;
  background-color: var(--color-brightgray);
  :hover {
    background-color: var(--color-brightgray);
  }
`;

const OxPostBody = ({ question, answer }: PostBodyProps) => (
  <MecaPostContentWrapper>
    <MecaPostContainer>
      <MecaPostContentTitle>Question</MecaPostContentTitle>
      <MecaPostContentBody>{question}</MecaPostContentBody>
    </MecaPostContainer>
    <MecaPostContainer>
      <MecaPostContentTitle>Answer</MecaPostContentTitle>
      <OxIcon>
        <Icon icon={answer === 'O' ? 'O' : 'Ax'} />
      </OxIcon>
    </MecaPostContainer>
  </MecaPostContentWrapper>
);

export default OxPostBody;
