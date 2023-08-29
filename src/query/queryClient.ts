import { QueryClient } from '@tanstack/react-query';

import ApiError from '@/apis/error/ApiError';
import alertToast from '@/utils/toastHandler';

function mutationErrorHandler(error: unknown): void {
  if (!(error instanceof ApiError)) {
    alertToast('알 수 없는 오류 발생', 'warning');
    return;
  }
  alertToast(error.message, 'warning');
  error.status === 401 && window.location.assign('/');
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6000,
        cacheTime: 360000,
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false,
        onError: undefined,
      },
      mutations: {
        onError: mutationErrorHandler,
        mutationKey: ['default'],
        cacheTime: 0,
      },
    },
  });
}

export const queryClient = generateQueryClient();
