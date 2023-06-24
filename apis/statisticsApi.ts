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
};

export default statisticsApi;
