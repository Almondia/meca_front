import type { ExtractedKeywordsResponse } from '@/types/domain';

import { serverInstance } from './config/instance';

const statisticsApi = {
  postKeywordBySentence: (sentence: string) =>
    serverInstance.post<never, ExtractedKeywordsResponse>('/api/keywords', { sentence }),
  getAllKeyword: () => serverInstance.get<never, ExtractedKeywordsResponse>('/api/keywords'),
};

export default statisticsApi;
