import React from 'react';

import { QuillNoSSRReader } from '@/components/editor/QuillNoSSRWrapper';

import { MecaPostContainer, MecaPostContentTitle, MecaPostContentWrapper } from '../styled';

const MecaPostDescription = ({ description }: { description: string }) => {
  const Editor = QuillNoSSRReader({ content: description || '내용이 없습니다.' });
  return (
    <MecaPostContentWrapper>
      <MecaPostContainer>
        <MecaPostContentTitle>Comment</MecaPostContentTitle>
        <Editor />
      </MecaPostContainer>
    </MecaPostContentWrapper>
  );
};

export default MecaPostDescription;
