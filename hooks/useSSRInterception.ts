/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import PageRouter, { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';

const useSSRInterception = () => {
  const router = useRouter();
  const [ssrPageHistory, setSsrPageHistory] = useState<{ [key: string]: Record<string, any> }>({});

  const setLoadPage = useCallback(({ isSSR }: { isSSR: boolean }) => {
    const pageLoader = PageRouter.router?.pageLoader;
    if (!pageLoader) {
      return;
    }
    const { loadPage: originalLoadPage } = pageLoader;
    pageLoader.loadPage = async (...args) =>
      originalLoadPage.apply(pageLoader, args).then((pageCache) => ({
        ...pageCache,
        mod: {
          ...pageCache.mod,
          __N_SSP: isSSR,
        },
      }));
  }, []);

  useEffect(() => {
    const props = PageRouter.router?.components[router.pathname].props;
    if (!ssrPageHistory[router.asPath]) {
      if (!props?.__N_SSP) {
        return;
      }
      setSsrPageHistory((prev) => ({ ...prev, [router.asPath]: props.pageProps }));
    }
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (ssrPageHistory[url]) {
        delete PageRouter.router?.components[url];
        setLoadPage({ isSSR: false });
      }
      return true;
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, ssrPageHistory]);

  useEffect(() => {
    const handle = () => {
      setLoadPage({ isSSR: true });
    };
    router.events.on('routeChangeComplete', handle);
    return () => {
      router.events.off('routeChangeComplete', handle);
    };
  }, []);

  return { props: ssrPageHistory[router.asPath] };
};

export default useSSRInterception;