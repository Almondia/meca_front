import { QueryClient } from '@tanstack/react-query';

import axiosErrorHandler from '@/apis/config/errorHandler';

function queryErrorHandler(error: unknown): void {
  axiosErrorHandler(error);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
        refetchOnMount: false,
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
