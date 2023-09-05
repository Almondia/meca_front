/* eslint-disable @typescript-eslint/no-throw-literal */
import { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';

const useRouteChangeBlocking = (blockingCallback: () => void) => {
  const router = useRouter();
  const [requestedUrl, setRequestedUrl] = useState<string>('');

  const isSamePath = useCallback(
    (nextUrl: string) => router.asPath.split('?')[0] === nextUrl.split('?')[0],
    [router.asPath],
  );

  const syncUrlWithRouter = useCallback(() => {
    // if the user clicked on the browser back button then the url displayed in the browser gets incorrectly updated
    if (router.asPath !== window.location.pathname) {
      window.history.pushState(null, '', router.asPath);
    }
  }, [router.asPath]);

  const handleRouterChangeStart = useCallback(
    (url: string) => {
      if (isSamePath(url)) {
        return;
      }
      syncUrlWithRouter();
      setRequestedUrl(url);
      blockingCallback();
      router.events.emit('routeChangeError');
      throw 'OK, This is Not Error';
    },
    [router.events, syncUrlWithRouter, isSamePath, blockingCallback],
  );

  const offRouteChangeBlocking = useCallback(
    async (offBlockingCallback?: () => void) => {
      router.events.off('routeChangeStart', handleRouterChangeStart);
      await router.replace(requestedUrl);
      offBlockingCallback?.();
    },
    [handleRouterChangeStart, requestedUrl, router],
  );

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouterChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart);
    };
  }, [router.events, handleRouterChangeStart]);

  return { offRouteChangeBlocking };
};

export default useRouteChangeBlocking;
