import { stringToJsonStringArrayConverter } from './jsonHandler';

export interface ContraintsResultType {
  message: string;
  isValid: boolean;
}

const isBlank = (value: string) => !value || !value.trim();

export const Constraints: Record<string, (value: string) => ContraintsResultType> = {
  cardTitle: (title: string) => ({
    message: '제목을 2글자 이상 40글자이하로 작성해주세요',
    isValid: title.length >= 2 && title.length <= 40,
  }),
  cardQuestion: (question: string) => {
    try {
      const questions = stringToJsonStringArrayConverter(question);
      return {
        message: '문제 또는 문항이 공백인지 확인해주세요!',
        isValid: questions.every((q) => !isBlank(q)),
      };
    } catch {
      // TODO: 개선 필요
      return {
        message: '문제를 입력했는지 확인해주세요!',
        isValid: !isBlank(question),
      };
    }
  },
  cardAnswer: (answer: string) => ({ message: '정답을 입력했는지 확인해주세요!', isValid: !isBlank(answer) }),
  categoryTitle: (title: string) => ({
    message: '제목을 2글자 이상 40글자 이하로 작성해주세요',
    isValid: title.length >= 2 && title.length <= 40,
  }),
  username: (name: string) => ({
    message: '이름을 2글자 이상 10자 이하로 작성해주세요',
    isValid: name.length >= 2 && name.length <= 10,
  }),
};
