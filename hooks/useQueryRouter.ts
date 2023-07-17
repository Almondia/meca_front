import { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';

import { parseQueryString } from '@/utils/queryStringHandler';

const useQueryRouter = (initialValue?: {
  [key: string]: string;
}): [{ [key: string]: string }, (queryString: { [key: string]: string }) => void] => {
  const [queries, setQueries] = useState<{ [key: string]: string }>(initialValue ?? {});
  const router = useRouter();

  useEffect(() => {
    const parsedQueries = parseQueryString(router.asPath);
    setQueries(parsedQueries);
  }, [router]);

  // TODO: shallow routing(serverside rendering skip) 가능할지?
  // refernces: [vercel/next.js/discussions/18072, bamdadsabbagh/next-replace-url]
  const replace = useCallback(
    (queryString: { [key: string]: string }) => {
      router.replace({
        pathname: router.asPath.split('?')[0],
        query: queryString,
      });
    },
    [router],
  );
  return [queries, replace];
};

export default useQueryRouter;
