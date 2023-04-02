import { QuizCounterWrapper, QuizCurrentCounter, QuizMaxCounter } from './styled';

export interface QuizCounterProps {
  currentCount: number;
  maxCount: number;
}

const QuizCounter = ({ currentCount, maxCount }: QuizCounterProps) => (
  <QuizCounterWrapper>
    <QuizCurrentCounter isMoreThanHalf={currentCount / maxCount >= 0.5}>
      {Math.min(currentCount, maxCount)}
    </QuizCurrentCounter>
    <QuizMaxCounter>/</QuizMaxCounter>
    <QuizMaxCounter data-testid="id-quizcounter-maxcount">{maxCount}</QuizMaxCounter>
  </QuizCounterWrapper>
);

export default QuizCounter;
