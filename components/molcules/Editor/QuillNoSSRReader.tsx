/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';

import React, { useMemo } from 'react';

import getCodeHighlightBlot from './CodeHighlightBlot';
import getCustomImageBlot from './CustomImageBlot';
import { ReadEditorWrapper } from './styled';

import 'react-quill/dist/quill.bubble.css';

const QuillReader = ({ content }: { content: string }) => {
  const Result = useMemo(
    () =>
      dynamic(
        async () => {
          const { default: QuillComponent } = await import('react-quill');
          QuillComponent.Quill.debug('error');
          const ImageBlot = await getCustomImageBlot(QuillComponent, true);
          const CodeBlot = await getCodeHighlightBlot(QuillComponent);
          QuillComponent.Quill.register(ImageBlot);
          QuillComponent.Quill.register(CodeBlot);
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
};

export default React.memo(QuillReader);
