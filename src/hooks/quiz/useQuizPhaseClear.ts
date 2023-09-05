import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { quizPhaseState, quizTimeState, quizTitleState } from '@/atoms/quiz';
import queryKey from '@/query/queryKey';

const useQuizPhaseClear = () => {
  const queryClient = useQueryClient();
  const setQuizTime = useSetRecoilState(quizTimeState);
  const setQuizTitle = useSetRecoilState(quizTitleState);
  const setQuizPhase = useSetRecoilState(quizPhaseState);
  const clearQuizResult = () => {
    setQuizTime(0);
    setQuizTitle('');
    setQuizPhase('progress');
    queryClient.setQueryData([queryKey.quiz], []);
  };
  return clearQuizResult;
};

export default useQuizPhaseClear;
