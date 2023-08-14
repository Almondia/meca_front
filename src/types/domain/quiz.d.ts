import type { Meca } from '@/types/domain/meca';

export type QuizPhase = 'progress' | 'done' | 'end' | 'result';

export interface QuizResult {
  cardId: string;
  userAnswer: string;
  score: number;
  spendTime: number;
}

export interface Quiz extends Meca {
  result?: Omit<QuizResult, 'cardId'>;
}

export interface QuizListRequest {
  categoryId: string;
  limit: number;
  score: number;
}

export interface QuizSucceedType {
  succeedText: string;
  succeedHandler: (...args: any[]) => void;
}

export interface QuizSimulationStateResponse {
  score: number;
  count: number;
}
