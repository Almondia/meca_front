import { useQueryClient } from '@tanstack/react-query';

const useCachedOrFetchQuery = () => {
  const queryClient = useQueryClient();
  const fetchOrGetQuery = async <T>(queryKey: string[], queryFn: () => Promise<T>) => {
    const result = queryClient.getQueryData<T>(queryKey);
    if (!result) {
      const fetched = await queryClient.fetchQuery<T>(queryKey, queryFn);
      return { data: fetched, isCachedData: false };
    }
    return { data: result, isCachedData: true };
  };

  return { fetchOrGetQuery };
};

export default useCachedOrFetchQuery;
