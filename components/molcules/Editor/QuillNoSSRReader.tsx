/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.bubble.css';
import getCustomImageBlot from './CustomImageBlot';

const QuillNoSSRReader = ({ content }: { content: string }) => {
  const Result = dynamic(
    async () => {
      const { default: QuillComponent } = await import('react-quill');
      const ImageBlot = await getCustomImageBlot(QuillComponent, true);
      QuillComponent.Quill.register(ImageBlot);
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

export default QuillNoSSRReader;
