import { useEffect, useState } from 'react';

import Card from '@/components/molcules/Card';
import Chart from '@/components/molcules/Chart';
import QuizTimeline from '@/components/organisms/QuizTimeline';
import useQuizKeyword from '@/hooks/quiz/useQuizKeyword';
import useQuizResult from '@/hooks/quiz/useQuizResult';
import { COLOR } from '@/styles/constants';
import { QuizType } from '@/types/domain';

import {
  QuizResulDashBoard,
  QuizResultAnswerRateDougnutArea,
  QuizResultContentArea,
  QuizResultScoreRateBarArea,
  QuizResultTimeRateDougnutArea,
  QuizResultWordCloudArea,
} from './styled';

export interface QuizResultProps {
  quizList: QuizType[];
  maxQuizTime: number;
}

const QuizResult = ({ quizList, maxQuizTime }: QuizResultProps) => {
  const { getQuizTypeRateResult, getAnswerRateResult } = useQuizResult();
  const { quizPhaseKeywords: quizKeywords, isQuizPhaseKeywordsLoading, fetchQuizPhaseKeywords } = useQuizKeyword();
  const [{ avgTime, avgScore }] = useState(getAnswerRateResult());
  const [quizTypeRate] = useState(getQuizTypeRateResult());

  useEffect(() => {
    fetchQuizPhaseKeywords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizResulDashBoard>
      <QuizResultAnswerRateDougnutArea>
        <Card>
          <Card.Title>전체 정답률</Card.Title>
          <Card.Body>
            <Chart.DoughnutChart
              labels={['오답률', '정답률']}
              fillColors={[COLOR.success, COLOR.error]}
              values={[avgScore, 1 - avgScore]}
              minHeights={['200px', '180px', '140px']}
            />
          </Card.Body>
        </Card>
      </QuizResultAnswerRateDougnutArea>
      <QuizResultTimeRateDougnutArea>
        <Card>
          <Card.Title>평균 소요 시간</Card.Title>
          <Card.Body>
            <Chart.RadialChart
              value={avgTime}
              maxValue={maxQuizTime}
              label={{ pre: '평균', post: 'S' }}
              minHeights={['160px', '180px', '180px']}
            />
          </Card.Body>
        </Card>
      </QuizResultTimeRateDougnutArea>
      <QuizResultScoreRateBarArea>
        <Card>
          <Card.Title>유형별 점수 비율</Card.Title>
          <Card.Body>
            <Chart.GroupBarChart
              legends={['점수 비율', '문제수']}
              axisNames={quizTypeRate.names}
              firstValues={quizTypeRate.answerRate}
              secondValues={quizTypeRate.count}
              minHeights={['224px', '180px', '200px']}
            />
          </Card.Body>
        </Card>
      </QuizResultScoreRateBarArea>
      <QuizResultWordCloudArea>
        <Card>
          <Card.Title>Keyword Cloud</Card.Title>
          <Card.Body>
            <Chart.WordCloud
              words={[...Object.entries(quizKeywords.keywords).map(([text, value]) => ({ text, value }))]}
              maxheight="140px"
              isLoading={isQuizPhaseKeywordsLoading}
            />
          </Card.Body>
        </Card>
      </QuizResultWordCloudArea>
      <QuizResultContentArea>
        <Card>
          <Card.Title>Quiz Timeline</Card.Title>
          <Card.Body>
            <QuizTimeline quizList={quizList} />
          </Card.Body>
        </Card>
      </QuizResultContentArea>
    </QuizResulDashBoard>
  );
};

export default QuizResult;
