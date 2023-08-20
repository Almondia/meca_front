import { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';

import { hasBrowser } from '@/utils/common';
import { createQueryString, parseQueryString } from '@/utils/queryStringHandler';

const useQueryRouter = <T extends string>(initialValue: Record<T, string>) => {
  const [queries, setQueries] = useState<Partial<Record<T, string>>>(initialValue);
  const router = useRouter();

  const areSameQueires = useCallback(
    (requestQueries: Partial<Record<T, string>>) =>
      !Object.keys(queries).some((rk) => queries[rk as T] !== (requestQueries[rk as T] ?? '')),
    [queries],
  );

  const replaceWithQuery = useCallback(
    (requestQueries: Partial<Record<T, string>>) => {
      if (areSameQueires(requestQueries)) {
        return;
      }
      if (hasBrowser()) {
        const qu = createQueryString(requestQueries as { [key: string]: string });
        const urlWithQueries = `${window.location.pathname}${qu}`;
        window.history.replaceState(
          { ...window.history.state, url: urlWithQueries, as: urlWithQueries },
          '',
          urlWithQueries,
        );
        setQueries(requestQueries);
      }
    },
    [areSameQueires],
  );

  useEffect(() => {
    const currentPathQueries = parseQueryString(router.asPath);
    if (!areSameQueires(currentPathQueries as Record<T, string>)) {
      setQueries(Object.keys(initialValue).reduce((acc, key) => ({ ...acc, [key]: currentPathQueries[key] }), {}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  return { ...queries, replaceWithQuery };
};

export default useQueryRouter;
