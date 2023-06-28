import { useCallback, useEffect, useRef } from 'react';

const useKeydown = <E extends HTMLElement>(onKeydown: () => void, key: 'Enter' | 'Esc') => {
  const ref = useRef<E>(null);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== key) {
        return;
      }
      onKeydown();
    },
    [key, onKeydown],
  );

  useEffect(() => {
    console.log('HELLO');
    const element = ref.current;
    element?.addEventListener('keydown', handleKeydown);
    return () => {
      element?.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return { ref };
};

export default useKeydown;
