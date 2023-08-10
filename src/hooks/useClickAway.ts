import { useCallback, useEffect, useRef } from 'react';

const OUTSIDE_ELEMENTS = ['modal-root', 'image-crop-root'];

type Event = MouseEvent | TouchEvent;

function useClickAway<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: Event) => void,
  condition?: boolean,
  isOutsideElement?: boolean,
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  const isModalElement = useCallback(
    (element: Node) =>
      !isOutsideElement && OUTSIDE_ELEMENTS.some((elementId) => document.getElementById(elementId)?.contains(element)),
    [isOutsideElement],
  );

  useEffect(() => {
    const handleClickAway = (event: Event) => {
      const { current: el } = ref;
      event.stopPropagation();
      if (el && !el.contains(event.target as Node)) {
        !isModalElement(event.target as Node) && savedHandler.current(event);
      }
    };

    const handleTouchAway = (event: Event) => {
      const { current: el } = ref;
      event.stopPropagation();
      if (el && !el.contains(event.target as Node)) {
        !isModalElement(event.target as Node) && savedHandler.current(event);
      }
    };

    if (condition === undefined || condition) {
      document.addEventListener('mousedown', handleClickAway, false);
      document.addEventListener('touchstart', handleTouchAway, false);
    }

    if (condition === false) {
      document.removeEventListener('mousedown', handleClickAway);
      document.removeEventListener('touchstart', handleTouchAway);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
      document.removeEventListener('touchstart', handleTouchAway);
    };
  }, [ref, condition, isModalElement]);
}

export default useClickAway;
