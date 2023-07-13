/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';

import ReactQuill, { ReactQuillProps } from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import LoadSpinner from '@/components/atoms/LoadSpinner';

import getCustomImageBlot from './CustomImageBlot';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

export const QuillNoSSRWriter = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const { default: ImageCompress } = await import('quill-image-compress');
    const { default: ImageResize } = await import('quill-image-resize');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { default: QuillMarkdown } = await import('quilljs-markdown');
    const ImageBlot = await getCustomImageBlot(QuillComponent);
    QuillComponent.Quill.debug('error');
    QuillComponent.Quill.register('modules/imageCompress', ImageCompress);
    QuillComponent.Quill.register('modules/imageResize', ImageResize);
    QuillComponent.Quill.register('modules/QuillMarkdown', QuillMarkdown, true);
    QuillComponent.Quill.register(ImageBlot);
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <LoadSpinner width="100%" size="4rem" />, ssr: false },
);
