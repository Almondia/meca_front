/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from 'react';

import ReactQuill from 'react-quill';
import styled from 'styled-components';

import useFetchImage from '@/hooks/useFetchImage';
import { getImageInfo, getOriginImageSize, getRemoteImageUrl, validImageFile } from '@/utils/imageHandler';
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
  const [isImageUploadLoading, setIsImageUploadLoading] = useState<boolean>(false);

  const imageHandler = useCallback(async (base64: string, blob: Blob) => {
    const quill = quillInstance.current?.getEditor();
    if (!quill) {
      return;
    }
    const file = new File([blob], Date.now().toString() + blob.type.replace('image/', '.'), { type: blob.type });
    const checkImageValid = validImageFile(file);
    if (!checkImageValid.valid) {
      alertToast(checkImageValid.message, 'warning');
      return;
    }
    const { extension, fileName } = getImageInfo(file);
    setIsImageUploadLoading(true);
    const [imageFileUrl, { width, height }] = await Promise.all([
      uploadImage({ extension, fileName, purpose: 'card' }, file),
      getOriginImageSize(base64),
    ]);
    console.log(width);
    const index = quill.getSelection()?.index;
    if (index !== undefined && index !== null && imageFileUrl) {
      quill.insertEmbed(index, 'image', {
        src: getRemoteImageUrl(imageFileUrl),
        alt: fileName,
        width: width.toString(),
        height: height.toString(),
      });
      quill.insertText(index + 1, '\n', 'text', '\n');
      quill.setSelection(index + 2, 1);
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
        quality: 0.9,
        maxWidth: 1280,
        maxHeight: 960,
        imageType: 'image/png',
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
