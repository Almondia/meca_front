/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from 'react';

import ReactQuill from 'react-quill';
import styled from 'styled-components';

import useFetchImage from '@/hooks/useFetchImage';
import useImage from '@/hooks/useImage';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import alertToast from '@/utils/toastHandler';

import { QuillNoSSRWriter } from './QuillNoSSRWriter';

const EditorComponentWrapper = styled.div`
  .ql-editor {
    min-height: 360px;
    max-height: 1290px;
  }
  img {
    display: block;
  }
`;

const EditorImageUploadLoaderText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: var(--color-gray);
`;

export interface EditorComponentProps {
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}

const EditorComponent = ({ contents, setContents }: EditorComponentProps) => {
  const quillInstance = useRef<ReactQuill>(null);
  const { uploadImage } = useFetchImage();
  const { getImageInfo, validImageFile } = useImage('');
  const [isImageUploadLoading, setIsImageUploadLoading] = useState<boolean>(false);

  const imageHandler = useCallback(async (_: any, blob: Blob) => {
    const file = new File([blob], Date.now().toString() + blob.type.replace('image/', '.'), { type: blob.type });
    const checkImageValid = validImageFile(file);
    if (!checkImageValid.valid) {
      alertToast(checkImageValid.message, 'warning');
      return;
    }
    const { extension, fileName } = getImageInfo(file);
    setIsImageUploadLoading(true);
    const imageFileUrl = await uploadImage({ extension, fileName, purpose: 'card' }, file);
    const quill = quillInstance.current?.getEditor();
    if (!quill) {
      return;
    }
    const index = quill.getSelection()?.index;
    if (index !== undefined && index !== null && imageFileUrl) {
      console.log(imageFileUrl);
      quill.insertEmbed(index, 'image', {
        src: getRemoteImageUrl(imageFileUrl),
        alt: fileName,
      });
      quill.insertText(index + 1, '\n', 'text', '\n');
      quill.setSelection(index + 2, 0);
      setIsImageUploadLoading(false);
    }
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image', 'video'],
        ],
      },
      imageCompress: {
        quality: 0.7,
        maxWidth: 768,
        maxHeight: 700,
        keepImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
        ignoreImageTypes: ['image/gif'],
        debug: false,
        suppressErrorLogging: false,
        insertIntoEditor: imageHandler,
      },
      imageResize: {
        toolbarStyles: {
          display: 'none',
        },
      },
    }),
    [],
  );

  return (
    <EditorComponentWrapper>
      <QuillNoSSRWriter
        forwardedRef={quillInstance}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      <EditorImageUploadLoaderText>{isImageUploadLoading ? '이미지 업로드중...' : '.'}</EditorImageUploadLoaderText>
    </EditorComponentWrapper>
  );
};

export default EditorComponent;
