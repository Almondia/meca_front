export interface QuizContentProps {
  cardId?: string;
  question: string;
  answer: string;
  isAnswerState: boolean;
  value: string;
  score?: number;
  invalidAnswerMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export type QuizContentComponentType = React.ComponentType<QuizContentProps>;
