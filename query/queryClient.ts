import { QueryClient } from '@tanstack/react-query';

import axiosErrorHandler from '@/apis/config/errorHandler';

function queryErrorHandler(error: unknown): void {
  axiosErrorHandler(error);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 180000,
        cacheTime: 360000,
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false,
        onError: queryErrorHandler,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
}

export const queryClient = generateQueryClient();
