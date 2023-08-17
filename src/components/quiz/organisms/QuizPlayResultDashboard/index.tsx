import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';

import Card from '@/components/@common/molecules/Card';
import ChartSkeleton from '@/components/@common/molecules/Chart/ChartSkeleton';
import useQuizKeyword from '@/hooks/quiz/useQuizKeyword';
import useQuizResult from '@/hooks/quiz/useQuizResult';
import { COLOR } from '@/styles/constants';

import {
  QuizPlayResultDashBoardWrapper,
  QuizResultAnswerRateDougnutArea,
  QuizResultScoreRateBarArea,
  QuizResultTimeRateDougnutArea,
  QuizResultWordCloudArea,
} from './styled';

const DonutChart = dynamic(() => import('@/components/@common/molecules/Chart/DonutChart'), {
  ssr: false,
  loading: () => <ChartSkeleton minHeights={['200px', '180px', '140px']} type="rounded" />,
});
const GroupBarChart = dynamic(() => import('@/components/@common/molecules/Chart/GroupBarChart'), {
  ssr: false,
  loading: () => <ChartSkeleton minHeights={['224px', '180px', '240px']} />,
});
const RadialChart = dynamic(() => import('@/components/@common/molecules/Chart/RadialChart'), {
  ssr: false,
  loading: () => <ChartSkeleton minHeights={['160px', '180px', '180px']} type="rounded" />,
});
const WordCloud = dynamic(() => import('@/components/@common/molecules/Chart/WordCloud'), {
  ssr: false,
  loading: () => <ChartSkeleton minHeights={['140px']} />,
});

interface QuizPlayResultDashboardProps {
  maxQuizTime: number;
}

const QuizPlayResultDashBoard = ({ maxQuizTime }: QuizPlayResultDashboardProps) => {
  const { getQuizTypeRateResult, getAnswerRateResult } = useQuizResult();
  const { quizPhaseKeywords: quizKeywords, isQuizPhaseKeywordsLoading, fetchQuizPhaseKeywords } = useQuizKeyword();
  const [{ avgTime, avgScore }] = useState(getAnswerRateResult());
  const [quizTypeRate] = useState(getQuizTypeRateResult());

  useEffect(() => {
    fetchQuizPhaseKeywords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizPlayResultDashBoardWrapper>
      <QuizResultAnswerRateDougnutArea>
        <Card>
          <Card.Title>전체 정답률</Card.Title>
          <Card.Body>
            <DonutChart
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
            <RadialChart
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
          <Card.Title>유형별 평균점수/문제 수</Card.Title>
          <Card.Body>
            <GroupBarChart
              legends={['평균 점수', '문제수']}
              axisNames={quizTypeRate.names}
              firstValues={quizTypeRate.answerRate}
              secondValues={quizTypeRate.count}
              minHeights={['224px', '180px', '240px']}
            />
          </Card.Body>
        </Card>
      </QuizResultScoreRateBarArea>
      <QuizResultWordCloudArea>
        <Card>
          <Card.Title>Keyword Cloud</Card.Title>
          <Card.Body>
            <WordCloud
              words={[...Object.entries(quizKeywords.keywords).map(([text, value]) => ({ text, value }))]}
              maxheight="140px"
              isLoading={isQuizPhaseKeywordsLoading}
            />
          </Card.Body>
        </Card>
      </QuizResultWordCloudArea>
    </QuizPlayResultDashBoardWrapper>
  );
};

export default QuizPlayResultDashBoard;
