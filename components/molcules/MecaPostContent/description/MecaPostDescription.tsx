import React from 'react';

import { QuillNoSSRReader } from '@/components/editor/QuillNoSSRWrapper';
import { EditorContainer } from '@/styles/layout';

import { MecaPostContainer, MecaPostContentTitle, MecaPostContentWrapper } from '../styled';

const MecaPostDescription = ({ description }: { description: string }) => {
  const Editor = QuillNoSSRReader({ content: description || '내용이 없습니다.' });
  return (
    <MecaPostContentWrapper>
      <MecaPostContainer>
        <MecaPostContentTitle>Description</MecaPostContentTitle>
        <EditorContainer>
          <Editor />
        </EditorContainer>
      </MecaPostContainer>
    </MecaPostContentWrapper>
  );
};

export default MecaPostDescription;
