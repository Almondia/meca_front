/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';

import ReactQuill, { ReactQuillProps } from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import LoadSpinner from '../atoms/LoadSpinner';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

export const QuillNoSSRWriter = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const { default: ImageCompress } = await import('quill-image-compress');
    QuillComponent.Quill.register('modules/imageCompress', ImageCompress);
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <LoadSpinner width="100%" size="4rem" />, ssr: false },
);

export const QuillNoSSRReader = ({ content }: { content: string }) => {
  const Result = dynamic(
    async () => {
      const { default: QuillComponent } = await import('react-quill');
      return () => <QuillComponent theme="bubble" readOnly value={content} />;
    },
    {
      loading: () => (
        <div className="quill">
          <div className="ql-container ql-bubble ql-disabled">
            <div className="ql-editor" data-gramm="false" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      ),
      ssr: false,
    },
  );
  return Result;
};
