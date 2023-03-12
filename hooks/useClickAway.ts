import { useEffect, useRef } from 'react';

type Event = MouseEvent | TouchEvent;

function useClickAway<T extends HTMLElement = HTMLElement>(ref: React.RefObject<T>, handler: (event: Event) => void) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleClickAway = (event: Event) => {
      const { current: el } = ref;
      if (el && !el.contains(event.target as Node)) {
        savedHandler.current(event);
      }
    };

    const handleTouchAway = (event: Event) => {
      const { current: el } = ref;
      if (el && !el.contains(event.target as Node)) {
        savedHandler.current(event);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('touchstart', handleTouchAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
      document.removeEventListener('touchstart', handleTouchAway);
    };
  }, [ref]);
}

export default useClickAway;
