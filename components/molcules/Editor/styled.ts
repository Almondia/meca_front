import styled from 'styled-components';

import { ElementSizeType } from '@/types/common';

const EditorWrapper = styled.div`
  position: relative;
  .ql-editor {
    font-family: var(--font-base);
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    li {
      margin-left: -2.2rem;
    }
    img {
      height: auto;
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
      line-height: 110%;
      font-weight: bold;
    }
    h1 {
      font-size: 1.75rem;
      padding-bottom: 0.3rem;
    }
    h2 {
      font-size: 1.4rem;
      padding-bottom: 0.2rem;
    }
  }

  pre.ql-syntax {
    font-size: ${({ theme }) => theme.fontSize.caption};
  }

  .ql-editor.ql-blank::before {
    left: 1rem;
  }
  .hljs {
    color: var(--color-code1);
    background-color: var(--color-code2);
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-meta .hljs-keyword,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-type,
  .hljs-variable.language_ {
    /* prettylights-syntax-keyword */
    color: var(--color-code3);
  }

  .hljs-title,
  .hljs-title.class_,
  .hljs-title.class_.inherited__,
  .hljs-title.function_ {
    /* prettylights-syntax-entity */
    color: var(--color-code4);
  }

  .hljs-attr,
  .hljs-attribute,
  .hljs-literal,
  .hljs-meta,
  .hljs-number,
  .hljs-operator,
  .hljs-variable,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-id {
    /* prettylights-syntax-constant */
    color: var(--color-code5);
  }

  .hljs-regexp,
  .hljs-string,
  .hljs-meta .hljs-string {
    /* prettylights-syntax-string */
    color: var(--color-code6);
  }

  .hljs-built_in,
  .hljs-symbol {
    /* prettylights-syntax-variable */
    color: var(--color-code7);
  }

  .hljs-comment,
  .hljs-code,
  .hljs-formula {
    /* prettylights-syntax-comment */
    color: var(--color-code8);
  }

  .hljs-name,
  .hljs-quote,
  .hljs-selector-tag,
  .hljs-selector-pseudo {
    /* prettylights-syntax-entity-tag */
    color: var(--color-code9);
  }

  .hljs-subst {
    /* prettylights-syntax-storage-modifier-import */
    color: var(--color-code10);
  }

  .hljs-section {
    /* prettylights-syntax-markup-heading */
    color: var(--color-code11);
    font-weight: bold;
  }

  .hljs-bullet {
    /* prettylights-syntax-markup-list */
    color: var(--color-code12);
  }

  .hljs-emphasis {
    /* prettylights-syntax-markup-italic */
    color: var(--color-code13);
    font-style: italic;
  }

  .hljs-strong {
    /* prettylights-syntax-markup-bold */
    color: var(--color-code14);
    font-weight: bold;
  }

  .hljs-addition {
    /* prettylights-syntax-markup-inserted */
    color: var(--color-code15);
    background-color: var(--color-code16);
  }

  .hljs-deletion {
    /* prettylights-syntax-markup-deleted */
    color: var(--color-code17);
    background-color: var(--color-code18);
  }
`;

export const WriteEditorWrapper = styled(EditorWrapper)<{ minHeight?: ElementSizeType; maxHeight?: ElementSizeType }>`
  .ql-editor {
    min-height: ${(props) => props.minHeight ?? '360px'};
    max-height: ${(props) => props.maxHeight ?? '1140px'};
    margin-bottom: 50px;
  }
  .ql-editor.ql-blank::before {
    content: '내용을 입력하세요';
    color: var(--color-gray);
  }

  .ql-editor.ql-blank::after {
    font-style: italic;
    content: '15MB 이하의 jpg/jpeg/png/gif 이미지를 업로드 할 수 있습니다.';
    color: var(--color-gray);
  }

  img {
    display: block;
  }
  .ql-toolbar {
    border-top-left-radius: ${({ theme }) => theme.border.button};
    border-top-right-radius: ${({ theme }) => theme.border.button};
  }
  .ql-container {
    border-bottom-left-radius: ${({ theme }) => theme.border.button};
    border-bottom-right-radius: ${({ theme }) => theme.border.button};
  }
  .ql-container,
  .ql-toolbar {
    border: 1px solid var(--color-gray);
  }
  .ql-toolbar .ql-stroke {
    fill: none;
    stroke: var(--color-text);
  }
  .ql-toolbar .ql-fill {
    fill: var(--color-text);
    stroke: none;
  }

  .ql-toolbar .ql-picker {
    color: var(--color-text);
  }
`;

export const ReadEditorWrapper = styled(EditorWrapper)`
  .ql-bubble > .ql-editor {
    padding: 0;
  }
`;

export const WriteEditorImageUploadButton = styled.button`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 8px;
  border: 1px var(--color-gray);
  color: var(--color-text);
  background-color: var(--color-brightgray);
  border-style: dashed solid solid solid;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;
