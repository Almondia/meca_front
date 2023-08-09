import { memo } from 'react';

import { TextCaption } from '@/styles/common';

const QuizInstruction = memo(() => (
  <div>
    <TextCaption>&nbsp;&nbsp;- 주어진 시간 내에 정답을 제출해야 채점됩니다!</TextCaption>
    <TextCaption>&nbsp;&nbsp;- 불러온 모든 문제들을 풀면 최종 결과를 확인할 수 있습니다!</TextCaption>
    <TextCaption>&nbsp;&nbsp;- 풀이 도중 이탈 시 불러운 퀴즈 정보는 모두 만료됩니다.</TextCaption>
    <TextCaption>&nbsp;&nbsp;- 주관식 점수는 키워드 적중도로 계산되며 단순 흥미 요소입니다.</TextCaption>
  </div>
));

export default QuizInstruction;
