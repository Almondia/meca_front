/* eslint-disable react-hooks/exhaustive-deps */

import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef } from 'react';

import hljs from 'highlight.js';
import ReactQuill from 'react-quill';

import useFetchImage from '@/hooks/useFetchImage';
import { ElementSizeType } from '@/types/common';
import { getImageInfo, getOriginImageSize, getRemoteImageUrl, validImageFile } from '@/utils/imageHandler';
import alertToast from '@/utils/toastHandler';

import CODE_HIGHLIGHT_LANGUAGE_LIST from './constants';
import { QuillNoSSRWriter } from './QuillNoSSRWriter';
import { WriteEditorWrapper } from './styled';

export interface EditorComponentProps {
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
  ariaLabel?: string;
  minHeight?: ElementSizeType;
  maxHeight?: ElementSizeType;
  placeholder?: string;
}

const IMAGE_UPLOAD_TEXT = '[이미지 업로드중...]' as const;

const QuillWriter = ({
  contents,
  setContents,
  placeholder = '내용을 입력하세요',
  ariaLabel,
  minHeight,
  maxHeight,
}: EditorComponentProps) => {
  const quillInstance = useRef<ReactQuill>(null);
  const { uploadImage } = useFetchImage();
  useEffect(() => {
    setContents(contents.replaceAll('</span>\n ', '</span>\n&nbsp;'));
    (async () => {
      const { default: QuillComponent } = await import('react-quill');
      const codeBlockFormat = QuillComponent.Quill.import('formats/code-block');
      const customCodeFormat = (QuillComponent.Quill as any).imports['formats/custom-code'];
      if (customCodeFormat !== codeBlockFormat) {
        QuillComponent.Quill.register('formats/custom-code', QuillComponent.Quill.import('formats/code-block'));
      }
    })();
  }, []);

  const handleImageUploadButtonClick = useCallback(() => {
    if (quillInstance.current) {
      document.querySelector<HTMLButtonElement>('button.ql-image')?.click();
    }
  }, []);

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
    quill.insertEmbed(
      index,
      'image',
      {
        src: getRemoteImageUrl(imageFileUrl),
        alt: fileName,
        width: width.toString(),
        height: height.toString(),
      },
      'user',
    );
    quill.insertText(index + 1, '\n', 'text', '\n');
    quill.setSelection(index + 2, 1);
  }, []);

  const modules = useMemo(
    () => ({
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text, CODE_HIGHLIGHT_LANGUAGE_LIST).value,
      },
      history: {
        delay: 2000,
        maxStack: 2000,
        userOnly: true,
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image', 'video', 'code-block'],
        ],
      },
      QuillMarkdown: {
        //
      },
      imageCompress: {
        imageType: '',
        ignoreImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
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
    <WriteEditorWrapper minHeight={minHeight} maxHeight={maxHeight} aria-label={ariaLabel ?? 'editor'}>
      <QuillNoSSRWriter
        forwardedRef={quillInstance}
        value={contents}
        onChange={setContents}
        onImageUpload={handleImageUploadButtonClick}
        modules={modules}
        placeholder={placeholder}
        theme="snow"
      />
    </WriteEditorWrapper>
  );
};

export default QuillWriter;