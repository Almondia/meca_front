/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';

import { memo, useMemo } from 'react';

import getCodeHighlightBlot from '../modules/CodeHighlightBlot';
import getCustomImageBlot from '../modules/CustomImageBlot';
import { ReadEditorWrapper } from '../styled';

import 'react-quill/dist/quill.bubble.css';

const QuillReader = memo(({ content }: { content: string }) => {
  const Result = useMemo(
    () =>
      dynamic(
        async () => {
          const { default: QuillComponent } = await import('react-quill');
          QuillComponent.Quill.debug('error');
          await Promise.all([
            getCustomImageBlot(QuillComponent, true).then((ImageBlot) => QuillComponent.Quill.register(ImageBlot)),
            getCodeHighlightBlot(QuillComponent).then((CodeBlot) => QuillComponent.Quill.register(CodeBlot)),
          ]);
          QuillComponent.Quill.register('blots/scroll', null);
          return () => (
            <ReadEditorWrapper className="quill-readonly">
              <QuillComponent theme="bubble" readOnly value={content.replaceAll('</span>\n ', '</span>\n&nbsp;')} />
            </ReadEditorWrapper>
          );
        },
        {
          loading: () => (
            <ReadEditorWrapper>
              <div className="quill">
                <div className="ql-container ql-bubble ql-disabled">
                  <div className="ql-editor" data-gramm="false" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>
            </ReadEditorWrapper>
          ),
          ssr: false,
        },
      ),
    [content],
  );
  return <Result />;
});

export default QuillReader;
