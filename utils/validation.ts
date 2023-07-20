import { MecaTagType } from '@/types/domain';

import { extractTextFromHTML } from './htmlTextHandler';
import { stringToJsonStringArrayConverter } from './jsonHandler';

export interface ContraintsResultType {
  message: string;
  isValid: boolean;
}

const isBlank = (value: string) => !value || !value.trim();

export const cardAnswerValidation: Record<
  MecaTagType,
  { validFn: (answer: string) => ContraintsResultType; maxLength: number }
> = {
  desc: {
    maxLength: 500,
    validFn: (answer) => ({ message: '500자 이내로 작성하세요', isValid: answer.length <= 500 }),
  },
  keyword: {
    maxLength: 100,
    validFn: (answer) => {
      const areAnswerNotEmpty = answer.split(',').every((a) => !isBlank(a));
      if (areAnswerNotEmpty) {
        return { message: '키워드를 100자 이내로 작성하세요', isValid: answer.length <= 100 };
      }
      return { message: '모든 정답을 입력했는지 확인해주세요!', isValid: areAnswerNotEmpty };
    },
  },
  select: {
    maxLength: 1,
    validFn: (answer) => ({
      message: '올바른 항목을 선택하세요',
      isValid: typeof parseInt(answer, 10) === 'number' && parseInt(answer, 10) <= 5,
    }),
  },
  ox: {
    maxLength: 1,
    validFn: (answer) => ({ message: '올바른 항목을 선택하세요', isValid: answer === 'O' || answer === 'X' }),
  },
};

export const Constraints: Record<string, (value: string, ...args: any[]) => ContraintsResultType> = {
  cardTitle: (title: string) => ({
    message: '제목을 2글자 이상 40글자이하로 작성해주세요',
    isValid: title.length >= 2 && title.length <= 40,
  }),
  cardQuestion: (question: string, mecaTag: MecaTagType) => {
    if (mecaTag === 'select') {
      const questions = stringToJsonStringArrayConverter(question);
      questions[0] = extractTextFromHTML(questions[0]);
      if (!isBlank(questions[0])) {
        return {
          message: '문항은 공백이거나 300자를 넘을 수 없습니다.',
          isValid: questions.slice(1).every((q) => !isBlank(q) && q.length <= 300),
        };
      }
      return {
        message: '문제를 입력했는지 확인해주세요!',
        isValid: false,
      };
    }
    return {
      message: '문제를 입력했는지 확인해주세요!',
      isValid: !isBlank(extractTextFromHTML(question)),
    };
  },
  cardAnswer: (answer: string, mecaTag: MecaTagType) => {
    if (isBlank(answer)) {
      return { message: '정답을 입력했는지 확인해주세요!', isValid: false };
    }
    return cardAnswerValidation[mecaTag].validFn(answer);
  },
  categoryTitle: (title: string) => ({
    message: '제목을 2글자 이상 40글자 이하로 작성해주세요',
    isValid: title.length >= 2 && title.length <= 40,
  }),
  username: (name: string) => ({
    message: '이름을 2글자 이상 10자 이하로 작성해주세요',
    isValid: name.length >= 2 && name.length <= 10,
  }),
};
