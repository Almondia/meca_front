import { useRouter } from 'next/router';

import { useState } from 'react';

import Button from '@/components/atoms/Button';
import DoughnutChart from '@/components/chart/DougnutChart';
import GroupBarChart from '@/components/chart/GroupBarChart';
import RadialChart from '@/components/chart/RadialChart';
import Card from '@/components/layout/Card';
import QuizTimeline from '@/components/molcules/QuizTimeline';
import useQuizResult from '@/hooks/meca/useQuizResult';
import { COLOR } from '@/styles/constants';
import { QuizType } from '@/types/domain';

import {
  QuizResulDashBoard,
  QuizResultFooterArea,
  QuizResultLowerContentArea,
  QuizResultSideArea,
  QuizResultUpperContentArea,
} from './styled';

export interface QuizResultProps {
  quizList: QuizType[];
}

const QuizResult = ({ quizList }: QuizResultProps) => {
  const router = useRouter();
  const { getQuizTypeRateResult, getAnswerRateResult } = useQuizResult();
  const [{ avgTime, avgScore }] = useState(getAnswerRateResult());
  const [quizTypeRate] = useState(getQuizTypeRateResult());

  return (
    <QuizResulDashBoard>
      <QuizResultSideArea>
        <Card>
          <Card.Title>전체 정답률</Card.Title>
          <Card.Body>
            <DoughnutChart
              labels={['오답률', '정답률']}
              fillColors={[COLOR.success, COLOR.error]}
              values={[avgScore, 1 - avgScore]}
            />
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>유형별 점수 비율</Card.Title>
          <Card.Body>
            <GroupBarChart
              legends={['점수 비율', '문제수']}
              axisNames={quizTypeRate.names}
              firstValues={quizTypeRate.answerRate}
              secondValues={quizTypeRate.count}
            />
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>평균 소요 시간</Card.Title>
          <Card.Body>
            <RadialChart value={avgTime} label={{ pre: '평균', post: 'S' }} />
          </Card.Body>
        </Card>
      </QuizResultSideArea>
      <QuizResultUpperContentArea>
        <Card>
          <Card.Title>Keyword 워드 클라우드</Card.Title>
          <Card.Body>
            {/* TODO: 워드클라우드 컴포넌트 구성 */}
            <p>준비즁ㅎㅎ</p>
            <p>준비즁ㅎㅎ</p>
            <p>준비즁ㅎㅎ</p>
            <p>준비즁ㅎㅎ</p>
            <p>준비즁ㅎㅎ</p>
            <p>준비즁ㅎㅎ</p>
          </Card.Body>
        </Card>
      </QuizResultUpperContentArea>
      <QuizResultLowerContentArea>
        <Card>
          <Card.Title>Quiz Timeline</Card.Title>
          <Card.Body>
            <QuizTimeline quizList={quizList} />
          </Card.Body>
        </Card>
      </QuizResultLowerContentArea>
      <QuizResultFooterArea>
        <Button colorTheme="cancel" width="120px" onClick={() => router.back()}>
          뒤로가기
        </Button>
      </QuizResultFooterArea>
    </QuizResulDashBoard>
  );
};

export default QuizResult;
