import type { ExtractedKeywordsResponse } from '@/types/domain';

import { serverInstance } from './config/instance';

const statisticsApi = {
  postKeywordBySentence: (sentence: string) =>
    serverInstance.post<never, ExtractedKeywordsResponse>('/api/keyword', { sentence }),
  getAllKeyword: () => serverInstance.get<never, ExtractedKeywordsResponse>('/api/keyword'),
};

export default statisticsApi;
