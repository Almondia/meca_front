/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from 'react';

import ReactQuill from 'react-quill';
import styled from 'styled-components';

import useFetchImage from '@/hooks/useFetchImage';
import { getImageInfo, getOriginImageSize, getRemoteImageUrl, validImageFile } from '@/utils/imageHandler';
import alertToast from '@/utils/toastHandler';

import { QuillNoSSRWriter } from './QuillNoSSRWriter';

const EditorComponentWrapper = styled.div`
  .ql-editor {
    min-height: 360px;
    max-height: 1140px;
  }
  img {
    display: block;
  }
  .ql-toolbar {
    border-top-left-radius: ${({ theme }) => theme.border.button};
    border-top-right-radius: ${({ theme }) => theme.border.button};
  }
  .ql-container {
    border-bottom-left-radius: ${({ theme }) => theme.border.button};
    border-bottom-right-radius: ${({ theme }) => theme.border.button};
  }
  .ql-container,
  .ql-toolbar {
    border: 1px solid var(--color-gray);
  }
  .ql-toolbar .ql-stroke {
    fill: none;
    stroke: var(--color-text);
  }
  .ql-toolbar .ql-fill {
    fill: var(--color-text);
    stroke: none;
  }

  .ql-toolbar .ql-picker {
    color: var(--color-text);
  }
`;

export interface EditorComponentProps {
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}

const IMAGE_UPLOAD_TEXT = '[이미지 업로드중...]' as const;

const EditorComponent = ({ contents, setContents }: EditorComponentProps) => {
  const quillInstance = useRef<ReactQuill>(null);
  const { uploadImage } = useFetchImage();

  const imageHandler = useCallback(async (base64: string, blob: Blob) => {
    const quill = quillInstance.current?.getEditor();
    if (!quill) {
      return;
    }
    const index = quill.getSelection()?.index;
    if (index === undefined) {
      return;
    }
    quill.insertText(index, IMAGE_UPLOAD_TEXT);
    const file = new File([blob], Date.now().toString() + blob.type.replace('image/', '.'), { type: blob.type });
    const checkImageValid = validImageFile(file);
    if (!checkImageValid.valid) {
      quill.deleteText(index, IMAGE_UPLOAD_TEXT.length);
      alertToast(checkImageValid.message, 'warning');
      return;
    }
    const { extension, fileName } = getImageInfo(file);
    const [imageFileUrl, { width, height }] = await Promise.all([
      uploadImage({ extension, fileName, purpose: 'card' }, file),
      getOriginImageSize(base64),
    ]);
    if (!imageFileUrl) {
      quill.deleteText(index, IMAGE_UPLOAD_TEXT.length);
      return;
    }
    quill.deleteText(index, IMAGE_UPLOAD_TEXT.length);
    quill.insertEmbed(index, 'image', {
      src: getRemoteImageUrl(imageFileUrl),
      alt: fileName,
      width: width.toString(),
      height: height.toString(),
    });
    quill.insertText(index + 1, '\n', 'text', '\n');
    quill.setSelection(index + 2, 1);
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
    </EditorComponentWrapper>
  );
};

export { EditorComponent as QuillWriter };
