import ReactQuill from 'react-quill';

interface CustomImageBlotProps {
  alt: string;
  src: string;
  width: string;
  height: string;
}

async function getCustomImageBlot(QuillComponent: typeof ReactQuill, readOnly?: boolean) {
  const ImageBlot = await QuillComponent.Quill.import('formats/image');
  class CustomImageBlot extends ImageBlot {
    static create(value: CustomImageBlotProps) {
      const node = super.create(value) as HTMLImageElement;
      node.setAttribute('loading', 'lazy');
      node.setAttribute('alt', value.alt);
      node.setAttribute('src', value.src);
      node.setAttribute('width', value.width);
      node.setAttribute('height', value.height);
      !readOnly &&
        node.addEventListener('load', () => {
          node.setAttribute('width', node.width.toString());
          node.setAttribute('height', node.height.toString());
          let timer: NodeJS.Timeout;
          const observer = new MutationObserver((mutationsList) => {
            const mutationRecord = mutationsList.find(
              (mutation) =>
                (mutation.type === 'attributes' && mutation.attributeName === 'style') ||
                mutation.attributeName === 'width',
            );
            if (mutationRecord) {
              node.setAttribute('height', 'auto');
              clearTimeout(timer);
              timer = setTimeout(() => {
                const { height } = mutationRecord.target as HTMLImageElement;
                node.setAttribute('height', height.toString());
              }, 200);
            }
          });
          observer.observe(node, { attributes: true });
        });
      return node;
    }

    static value(domNode: HTMLElement): CustomImageBlotProps {
      return {
        alt: domNode.getAttribute('alt') || '',
        src: domNode.getAttribute('src') || '',
        width: domNode.getAttribute('width') || '100%',
        height: domNode.getAttribute('height') || 'auto',
      };
    }
  }
  return CustomImageBlot;
}

export default getCustomImageBlot;
