import ReactQuill from 'react-quill';

import { createQueryString } from '@/utils/queryStringHandler';

interface CustomImageBlotProps {
  alt: string;
  src: string;
  width: string;
  height: string;
  clientWidth: string;
}

function createSrcSet(imageSrc: string) {
  const viewport = ['450w', '700w', '1000w'];
  const widthParams = [{ w: '384' }, { w: '576' }, { w: '732' }];
  return widthParams.reduce(
    (prev, width, i) =>
      `${prev} /_next/image${createQueryString({ url: imageSrc, ...width, q: '75' })} ${viewport[i]},`,
    '',
  );
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
      node.style.width = value.clientWidth;
      node.setAttribute('srcSet', createSrcSet(value.src));
      !readOnly &&
        node.addEventListener('load', () => {
          const originWidth = value.width;
          node.setAttribute('width', originWidth);
          node.setAttribute('height', value.height);
          node.setAttribute(
            'temp-width',
            !node.style.width || node.style.width === '100%'
              ? node.clientWidth.toString()
              : parseInt(node.style.width, 10).toString(),
          );
          let timer: NodeJS.Timeout;
          const observer = new MutationObserver((mutationsList) => {
            const resolvedRecord = mutationsList.find((mutation) => mutation.attributeName === 'resolved');
            if (resolvedRecord) {
              node.removeAttribute('resolved');
              return;
            }
            const mutationRecord = mutationsList.find(
              (mutation) =>
                mutation.type === 'attributes' &&
                (mutation.attributeName === 'style' || mutation.attributeName === 'width'),
            );
            if (mutationRecord) {
              const attributeWidth = node.getAttribute('width');
              const tempWidth = node.getAttribute('temp-width');
              node.style.width = `${attributeWidth === originWidth ? tempWidth : attributeWidth}px`;
              clearTimeout(timer);
              timer = setTimeout(() => {
                node.setAttribute('resolved', '');
                node.setAttribute('width', originWidth);
                node.setAttribute('temp-width', parseInt(node.style.width, 10).toString());
              }, 200);
            }
          });
          observer.observe(node, { attributes: true });
        });
      return node;
    }

    static value(domNode: HTMLElement): CustomImageBlotProps {
      console.log(domNode.style.width);
      return {
        alt: domNode.getAttribute('alt') || '',
        src: domNode.getAttribute('src') || '',
        width: domNode.getAttribute('width') || '100%',
        height: domNode.getAttribute('height') || 'auto',
        clientWidth: domNode.style.width || '100%',
      };
    }
  }
  return CustomImageBlot;
}

export default getCustomImageBlot;
