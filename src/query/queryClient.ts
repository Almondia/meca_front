import { QueryClient } from '@tanstack/react-query';

import axiosErrorHandler from '@/apis/config/errorHandler';

function queryErrorHandler(error: unknown): void {
  axiosErrorHandler(error);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 20000,
        cacheTime: 360000,
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false,
        onError: undefined,
      },
      mutations: {
        onError: queryErrorHandler,
        mutationKey: ['default'],
        cacheTime: 0,
      },
    },
  });
}

export const queryClient = generateQueryClient();
