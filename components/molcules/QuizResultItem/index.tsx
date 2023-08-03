import React from 'react';

import { MecaTagType } from '@/types/domain';

import { QuizResultItemTitleGroup, QuizResultItemWrapper } from './styled';

import MecaTag from '../MecaTag';

export interface QuizResultItemProps {
  question: string;
  answer: string;
  userAnswer: string;
  quizType?: MecaTagType;
}

const QuizResultItem = ({ question, answer, userAnswer, quizType }: QuizResultItemProps) => (
  <QuizResultItemWrapper>
    <div>
      <QuizResultItemTitleGroup>
        <strong>[문제 질문]</strong>
        {quizType && <MecaTag tagName={quizType} scale={0.7} />}
      </QuizResultItemTitleGroup>
      <span>{question}</span>
    </div>
    <div>
      <QuizResultItemTitleGroup>
        <strong>[문제 정답]</strong>
      </QuizResultItemTitleGroup>
      <span>{answer}</span>
    </div>
    <div>
      <QuizResultItemTitleGroup>
        <strong>[제출 결과]</strong>
      </QuizResultItemTitleGroup>
      <span>{userAnswer}</span>
    </div>
  </QuizResultItemWrapper>
);

export default QuizResultItem;
