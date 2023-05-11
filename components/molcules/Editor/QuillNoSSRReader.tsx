/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';

const QuillNoSSRReader = ({ content }: { content: string }) => {
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

export default QuillNoSSRReader;
