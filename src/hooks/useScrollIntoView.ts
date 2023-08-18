import { useCallback, useRef } from 'react';

const useScrollIntoView = <T extends HTMLElement>(): [React.RefObject<T>, (options: ScrollIntoViewOptions) => void] => {
  const ref = useRef<T>(null);

  const scrollIntoView = useCallback((options: ScrollIntoViewOptions) => {
    window.requestAnimationFrame(() => ref.current?.scrollIntoView(options));
  }, []);

  return [ref, scrollIntoView];
};

export default useScrollIntoView;
