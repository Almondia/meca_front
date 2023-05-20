import { serverInstance } from './config/instance';

export interface KeywordResponse {
  keywords: {
    [key: string]: number;
  };
}

const statisticsApi = {
  postKeywordBySentence: (sentence: string) => serverInstance.post<any, KeywordResponse>('/api/keyword', { sentence }),
  getAllKeyword: () => serverInstance.get<any, KeywordResponse>('/api/keyword'),
};

export default statisticsApi;
