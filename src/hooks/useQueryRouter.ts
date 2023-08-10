import { useRouter } from 'next/router';

import { useCallback, useState } from 'react';

const useQueryRouter = <T extends string>(initialValue: Partial<Record<T, string>>) => {
  const [queries, setQueries] = useState<Partial<Record<T, string>>>(initialValue);
  const router = useRouter();

  // TODO: shallow routing(serverside rendering skip) 가능할지?
  // refernces: [vercel/next.js/discussions/18072, bamdadsabbagh/next-replace-url]
  const replaceWithQuery = useCallback(
    (queryString: Partial<Record<T, string>>) => {
      router.replace({
        pathname: router.asPath.split('?')[0],
        query: queryString,
      });
      setQueries(queryString);
    },
    [router],
  );
  return { ...queries, replaceWithQuery };
};

export default useQueryRouter;
