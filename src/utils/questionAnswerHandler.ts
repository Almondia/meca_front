import type { MecaTag as MecaTagType } from '@/types/domain/meca';

import { stringToJsonStringArrayConverter } from './jsonHandler';

interface QuestionAnswerConverterProps {
  question: string;
  answer?: string;
  cardType: MecaTagType;
}

export const getQuestionAnswerByCardType = ({ question, answer, cardType }: QuestionAnswerConverterProps) => {
  const answerValue = answer || '미제출';
  if (cardType !== 'MULTI_CHOICE') {
    return { question, answer: answerValue };
  }
  try {
    const questions = stringToJsonStringArrayConverter(question);
    const parsedAnswer = parseInt(answerValue, 10);
    return { question: questions[0], answer: parsedAnswer < question.length ? questions[parsedAnswer] : answerValue };
  } catch {
    return { question: 'unknown', answer: 'unknown' };
  }
};
