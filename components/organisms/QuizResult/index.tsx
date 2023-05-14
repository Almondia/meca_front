import { useEffect, useState } from 'react';

import LoadSpinner from '@/components/atoms/LoadSpinner';
import Card from '@/components/molcules/Card';
import Chart from '@/components/molcules/Chart';
import QuizTimeline from '@/components/organisms/QuizTimeline';
import useQuizResult from '@/hooks/meca/useQuizResult';
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
  const { getQuizTypeRateResult, getAnswerRateResult, applyQuizKeyword, isApplyKeywordLoading, quizKeywords } =
    useQuizResult();
  const [{ avgTime, avgScore }] = useState(getAnswerRateResult());
  const [quizTypeRate] = useState(getQuizTypeRateResult());

  useEffect(() => {
    applyQuizKeyword();
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
              minHeights={['140px', '180px', '120px']}
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
              minHeights={['140px', '180px', '180px']}
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
              minHeights={['368px', '180px', '200px']}
            />
          </Card.Body>
        </Card>
      </QuizResultScoreRateBarArea>
      <QuizResultWordCloudArea>
        <Card>
          <Card.Title>Keyword Cloud</Card.Title>
          <Card.Body>
            {isApplyKeywordLoading || !quizKeywords ? (
              <LoadSpinner width="100%" height="80px" />
            ) : (
              <Chart.WordCloud
                words={Object.entries(quizKeywords.keywords).map(([text, value]) => ({ text, value }))}
                maxHeight="140px"
              />
            )}
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
