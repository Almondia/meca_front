import type { MecaTag as MecaTagType } from '@/types/domain/meca';

import { InputValidations } from '@/utils/constants';

import { extractTextFromHTML } from './htmlTextHandler';
import { stringToJsonStringArrayConverter } from './jsonHandler';

export interface ContraintsResultType {
  message: string;
  isValid: boolean;
}

const isBlank = (value: string) => !value || !value.trim();

const {
  MAX_ESSAY_ANSWER,
  MAX_MULTICHOICE_QUESTION,
  MAX_MULTICHOICE_ANSWER,
  MAX_KEYWORD_ANSWER,
  MAX_TITLE,
  MAX_USERNAME,
  MIN_TITLE,
  MIN_USERNAME,
} = InputValidations;

const cardAnswerValidation: Record<
  MecaTagType,
  { validFn: (answer: string) => ContraintsResultType; maxLength: number }
> = {
  ESSAY: {
    maxLength: MAX_ESSAY_ANSWER,
    validFn: (answer) => ({
      message: `${MAX_ESSAY_ANSWER}자 이내로 작성하세요`,
      isValid: answer.length <= MAX_ESSAY_ANSWER,
    }),
  },
  KEYWORD: {
    maxLength: MAX_KEYWORD_ANSWER,
    validFn: (answer) => {
      const areAnswerNotEmpty = answer.split(',').every((a) => !isBlank(a));
      if (areAnswerNotEmpty) {
        return {
          message: `키워드 정답을 ${MAX_KEYWORD_ANSWER}자 이내로 작성하세요`,
          isValid: answer.length <= MAX_KEYWORD_ANSWER,
        };
      }
      return { message: '모든 정답을 입력했는지 확인해주세요!', isValid: areAnswerNotEmpty };
    },
  },
  MULTI_CHOICE: {
    maxLength: 1,
    validFn: (answer) => ({
      message: '올바른 항목을 선택하세요',
      isValid: typeof parseInt(answer, 10) === 'number' && parseInt(answer, 10) <= MAX_MULTICHOICE_ANSWER,
    }),
  },
  OX_QUIZ: {
    maxLength: 1,
    validFn: (answer) => ({ message: '올바른 항목을 선택하세요', isValid: answer === 'O' || answer === 'X' }),
  },
};

export const Constraints: Record<string, (value: string, ...args: any[]) => ContraintsResultType> = {
  cardTitle: (title: string) => ({
    message: `제목을 ${MIN_TITLE}글자 이상 ${MAX_TITLE}글자 이하로 작성해주세요`,
    isValid: title.length >= MIN_TITLE && title.length <= MAX_TITLE,
  }),
  cardQuestion: (question: string, mecaTag: MecaTagType) => {
    if (mecaTag === 'MULTI_CHOICE') {
      const questions = stringToJsonStringArrayConverter(question);
      questions[0] = extractTextFromHTML(questions[0]);
      if (!isBlank(questions[0])) {
        return {
          message: `문항은 공백이거나 ${MAX_MULTICHOICE_QUESTION}자를 넘을 수 없습니다.`,
          isValid: questions.slice(1).every((q) => !isBlank(q) && q.length <= MAX_MULTICHOICE_QUESTION),
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
    message: `제목을 ${MIN_TITLE}글자 이상 ${MAX_TITLE}글자 이하로 작성해주세요`,
    isValid: title.length >= MIN_TITLE && title.length <= MAX_TITLE,
  }),
  username: (name: string) => ({
    message: `이름을 ${MIN_USERNAME}글자 이상 ${MAX_USERNAME}자 이하로 작성해주세요`,
    isValid: name.length >= MIN_USERNAME && name.length <= MAX_USERNAME,
  }),
};
