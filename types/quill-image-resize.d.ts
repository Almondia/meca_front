/* eslint-disable import/prefer-default-export */
// quill-image-resize.d.ts
declare module 'quill-image-resize' {
  import { Quill } from 'react-quill';

  interface ResizeOptions {
    modules: {
      [moduleName: string]: any;
    }[];
  }

  interface ResizeModule {
    new (options?: ResizeOptions): {
      onModuleInit: () => void;
    };
  }

  const ImageResize: ResizeModule;

  export { ImageResize };
}
