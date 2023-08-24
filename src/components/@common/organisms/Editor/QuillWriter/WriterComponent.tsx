/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';

import ReactQuill, { ReactQuillProps } from 'react-quill';

import DeferredComponent from '@/components/@util/DeferredComponent';

import WriterImageUploadButton from './WriterImageUploadButton';
import WriterSkeleton from './WriterSkeleton';

import getCustomImageBlot from '../modules/CustomImageBlot';
import getMarkdownActivity from '../modules/CustomMarkdownActivity';
import initHighlight from '../modules/initHighlight';

import 'react-quill/dist/quill.snow.css';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
  onImageUpload: () => void;
}

export const WriterComponent = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    QuillComponent.Quill.debug('error');
    await Promise.all([
      import('quill-image-compress').then(({ default: ImageCompress }) => {
        QuillComponent.Quill.register('modules/imageCompress', ImageCompress);
      }),
      import('quill-image-resize').then(({ default: ImageResize }) => {
        QuillComponent.Quill.register('modules/imageResize', ImageResize);
      }),
      getMarkdownActivity().then((MarkdownActivity) => {
        QuillComponent.Quill.register('modules/QuillMarkdown', MarkdownActivity);
      }),
      getCustomImageBlot(QuillComponent).then((ImageBlot) => {
        QuillComponent.Quill.register(ImageBlot);
      }),
      await initHighlight(),
    ]);
    const Quill = ({ forwardedRef, onImageUpload, ...props }: ForwardedQuillComponent) => (
      <>
        <QuillComponent ref={forwardedRef} {...props} />
        <WriterImageUploadButton onClick={onImageUpload} />
      </>
    );
    return Quill;
  },
  {
    loading: () => (
      <DeferredComponent delay={150} keepLayout>
        <WriterSkeleton />
      </DeferredComponent>
    ),
    ssr: false,
  },
);
