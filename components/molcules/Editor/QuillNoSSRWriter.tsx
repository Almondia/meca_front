/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';

import ReactQuill, { ReactQuillProps } from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import LoadSpinner from '@/components/atoms/LoadSpinner';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

export const QuillNoSSRWriter = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const { default: ImageCompress } = await import('quill-image-compress');
    const { default: ImageResize } = await import('quill-image-resize');
    QuillComponent.Quill.register('modules/imageCompress', ImageCompress);
    QuillComponent.Quill.register('modules/imageResize', ImageResize);
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <LoadSpinner width="100%" size="4rem" />, ssr: false },
);
