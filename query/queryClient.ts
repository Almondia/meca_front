import { QueryClient } from '@tanstack/react-query';

function queryErrorHandler(error: unknown): void {
  import('@/apis/config/errorHandler').then((module) => {
    module.default(error);
  });
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30000,
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
