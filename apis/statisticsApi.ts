import { serverInstance } from './config/instance';

export interface KeywordResponse {
  keywords: {
    [key: string]: number;
  };
}

const statisticsApi = {
  postKeywordBySentence: (sentence: string) =>
    serverInstance.post<any, KeywordResponse>('/api/statistics/keyword', { sentence }),
  getAllKeyword: () => serverInstance.get<any, KeywordResponse>('/api/statistics/keyword'),
};

export default statisticsApi;
