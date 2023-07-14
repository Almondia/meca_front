/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
async function getMarkdownActivity() {
  const { default: QuillMarkdown } = await import('quilljs-markdown');
  class MarkdownActivity extends QuillMarkdown {
    onRemoveElement(range) {
      const selection = this.quillJS.getSelection();
      if (!selection) {
        return;
      }
      super.onRemoveElement(range);
    }
  }
  return MarkdownActivity;
}

export default getMarkdownActivity;
