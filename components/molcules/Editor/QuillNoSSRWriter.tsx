/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';

import ReactQuill, { ReactQuillProps } from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import LoadSpinner from '@/components/atoms/LoadSpinner';

import getCustomImageBlot from './CustomImageBlot';
import getMarkdownActivity from './CustomMarkdownActivity';
import initHighlight from './initHighlight';
import QuillWriterImageUploadButton from './QuillWriterImageUploadButton';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
  onImageUpload: () => void;
}

export const QuillNoSSRWriter = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    QuillComponent.Quill.debug('error');
    await Promise.all([
      await import('quill-image-compress').then(({ default: ImageCompress }) => {
        QuillComponent.Quill.register('modules/imageCompress', ImageCompress);
      }),
      await import('quill-image-resize').then(({ default: ImageResize }) => {
        QuillComponent.Quill.register('modules/imageResize', ImageResize);
      }),
      await getMarkdownActivity().then((MarkdownActivity) => {
        QuillComponent.Quill.register('modules/QuillMarkdown', MarkdownActivity);
      }),
      await initHighlight(),
    ]);
    const ImageBlot = await getCustomImageBlot(QuillComponent);
    QuillComponent.Quill.register(ImageBlot);
    const Quill = ({ forwardedRef, onImageUpload, ...props }: ForwardedQuillComponent) => (
      <>
        <QuillComponent ref={forwardedRef} {...props} />
        <QuillWriterImageUploadButton onClick={onImageUpload} />
      </>
    );
    return Quill;
  },
  { loading: () => <LoadSpinner width="100%" size="4rem" />, ssr: false },
);
