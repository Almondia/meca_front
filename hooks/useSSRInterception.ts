/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import SingletonRouter, { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';

const useSSRInterception = () => {
  const router = useRouter();
  const [ssrPageHistory, setSsrPageHistory] = useState<{ [key: string]: Record<string, any> }>({});

  const setLoadPage = useCallback(({ allowSSR }: { allowSSR: boolean }) => {
    const pageLoader = SingletonRouter.router?.pageLoader;
    if (!pageLoader) {
      return;
    }
    const { loadPage: originalLoadPage } = pageLoader;
    pageLoader.loadPage = async (...args) =>
      originalLoadPage.apply(pageLoader, args).then((pageCache) => ({
        ...pageCache,
        mod: {
          ...pageCache.mod,
          __N_SSP: allowSSR,
        },
      }));
  }, []);

  useEffect(() => {
    const props = SingletonRouter.router?.components[router.pathname].props;
    if (!props || !props.__N_SSP === undefined) {
      return;
    }
    delete SingletonRouter.router?.components[router.pathname];
    if (!ssrPageHistory[router.asPath]) {
      setSsrPageHistory((prev) => ({ ...prev, [router.asPath]: { ...props.pageProps } }));
    }
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (ssrPageHistory[url]) {
        setLoadPage({ allowSSR: false });
      }
      return true;
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const handle = () => {
      setLoadPage({ allowSSR: true });
    };

    router.events.on('routeChangeComplete', handle);
    return () => {
      router.events.off('routeChangeComplete', handle);
    };
  }, []);

  return { props: ssrPageHistory[router.asPath] };
};

export default useSSRInterception;
