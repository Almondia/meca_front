export interface QuizContentProps {
  question: string;
  answer: string;
  isAnswerState: boolean;
  value: string;
  invalidAnswerMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export type QuizContentComponentType = React.ComponentType<QuizContentProps>;
