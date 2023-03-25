import React from 'react';

import { MecaPostContentBody, MecaPostContentTitle, MecaPostContentWrapper } from './styled';

export interface MecaPostContentProps {
  title?: string;
  content: string;
}

const MecaPostContent = ({ title, content }: MecaPostContentProps) => (
  <MecaPostContentWrapper>
    {title && <MecaPostContentTitle>{title}</MecaPostContentTitle>}
    <MecaPostContentBody>{content}</MecaPostContentBody>
  </MecaPostContentWrapper>
);

export default MecaPostContent;
