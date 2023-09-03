import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { quizPhaseState } from '@/atoms/quiz';
import useScrollIntoView from '@/hooks/useScrollIntoView';

const useQuizPhaseScrollControl = <T extends HTMLElement>() => {
  const [ref, scrollToTop] = useScrollIntoView<T>();
  const quizPhase = useRecoilValue(quizPhaseState);

  useEffect(() => {
    if (quizPhase === 'progress') {
      scrollToTop({ block: 'start', behavior: 'smooth' });
    }
    if (quizPhase === 'result') {
      scrollToTop({ block: 'start', behavior: 'auto' });
    }
  }, [quizPhase, scrollToTop]);

  return ref;
};

export default useQuizPhaseScrollControl;
