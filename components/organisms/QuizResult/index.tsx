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
  QuizResultFooterArea,
  QuizResultLowerContentArea,
  QuizResultSideArea,
  QuizResultUpperContentArea,
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
      <QuizResultSideArea>
        <Card>
          <Card.Title>전체 정답률</Card.Title>
          <Card.Body>
            <Chart.DoughnutChart
              labels={['오답률', '정답률']}
              fillColors={[COLOR.success, COLOR.error]}
              values={[avgScore, 1 - avgScore]}
            />
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>유형별 점수 비율</Card.Title>
          <Card.Body>
            <Chart.GroupBarChart
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
            <Chart.RadialChart value={avgTime} maxValue={maxQuizTime} label={{ pre: '평균', post: 'S' }} />
          </Card.Body>
        </Card>
      </QuizResultSideArea>
      <QuizResultUpperContentArea>
        <Card>
          <Card.Title>Keyword Cloud</Card.Title>
          <Card.Body>
            {isApplyKeywordLoading || !quizKeywords ? (
              <LoadSpinner width="100%" height="200px" />
            ) : (
              <Chart.WordCloud
                words={Object.entries(quizKeywords.keywords).map(([text, value]) => ({ text, value }))}
              />
            )}
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
        <Card>
          <Card.Title>추천 카테고리</Card.Title>
          <Card.Body>
            {/* TODO: 추천 카테고리 반영 */}
            <div style={{ height: '300px' }}>
              <p>준비즁</p>
            </div>
          </Card.Body>
        </Card>
      </QuizResultFooterArea>
    </QuizResulDashBoard>
  );
};

export default QuizResult;
