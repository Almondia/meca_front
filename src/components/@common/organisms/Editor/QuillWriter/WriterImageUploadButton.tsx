import { memo } from 'react';

import { TextOverline } from '@/styles/common';

import { WriteEditorImageUploadButton } from '../styled';

const WriterImageUploadButton = ({ onClick }: { onClick: () => void }) => (
  <WriteEditorImageUploadButton type="button" onClick={onClick}>
    <strong>이미지 업로드</strong>
    <br />
    <TextOverline>(15MB이하의 jpg/jpeg/png/gif)</TextOverline>
  </WriteEditorImageUploadButton>
);

export default memo(WriterImageUploadButton);
