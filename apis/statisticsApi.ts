import { serverInstance } from './config/instance';

export interface KeywordResponse {
  keywords: {
    [key: string]: number;
  };
}

const statisticsApi = {
  postKeywordBySentence: (sentence: string) =>
    serverInstance.post<never, KeywordResponse>('/api/keyword', { sentence }),
  getAllKeyword: () => serverInstance.get<never, KeywordResponse>('/api/keyword'),
  postScoreByAnswerInput: (inputValue: string, answer: string) =>
    serverInstance.post<never, { score: number }>('/api/score', { inputValue, answer }),
  getTotalScore: () => serverInstance.get<never, { totalScore: number; count: number }>('/api/score'),
};

export default statisticsApi;
