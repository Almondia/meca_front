import { useCallback, useEffect, useRef } from 'react';

const useIntersect = <T extends HTMLElement>(
  onIntersect: () => void,
  options?: IntersectionObserverInit,
  isIntersecting?: boolean,
) => {
  const ref = useRef<T>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current || !isIntersecting) {
      return;
    }
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(ref.current);
    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, options, isIntersecting]);

  return ref;
};

export default useIntersect;
