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
      return () => {};
    }
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, options, isIntersecting, handleIntersect]);

  return ref;
};

export default useIntersect;
