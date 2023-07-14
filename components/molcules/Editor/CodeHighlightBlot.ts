import hljs from 'highlight.js';
import ReactQuill from 'react-quill';

import CODE_HIGHLIGHT_LANGUAGE_LIST from './constants';

async function getCodeHighlightBlot(QuillComponent: typeof ReactQuill) {
  const EmbededBlot = await QuillComponent.Quill.import('blots/block/embed');
  class CustomCode extends EmbededBlot {
    static create(value: string | boolean) {
      const node = super.create(value) as HTMLPreElement;
      node.innerHTML = hljs.highlightAuto(typeof value !== 'string' ? '' : value, CODE_HIGHLIGHT_LANGUAGE_LIST).value;
      return node;
    }

    static value(node: HTMLElement) {
      return node.textContent;
    }
  }
  CustomCode.blotName = 'custom-code';
  CustomCode.tagName = 'pre';
  CustomCode.className = 'ql-syntax';
  return CustomCode;
}

export default getCodeHighlightBlot;
