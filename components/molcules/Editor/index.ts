import EditorComponent from './EditorComponent';
import { QuillNoSSRReader } from './QuillNoSSRWrapper';

const Editor = {
  Reader: QuillNoSSRReader,
  Writer: EditorComponent,
};

export default Editor;
