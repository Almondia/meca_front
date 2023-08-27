import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { useState } from 'react';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

import PageLayout from '@/components/@common/templates/PageLayout';
import FontProvider from '@/components/@util/FontProvider';
import GA from '@/components/@util/GA';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import { generateQueryClient } from '@/query/queryClient';
import commonTheme from '@/styles/theme';
import ThemeProvider from '@/styles/ThemeProvider';

const Unauthorized = dynamic(() => import('./401'), { ssr: false });
const NotFound = dynamic(() => import('./404'), { ssr: false });
const GlobalLoadSpinner = dynamic(() => import('@/components/@util/GlobalLoadSpinner'));
const ToastProvider = dynamic(() => import('@/components/@util/ToastProvider'));

interface ErrorProps {
  errorStatus?: 401 | 404;
  errorMessage?: string;
}

const errorPage = {
  401: Unauthorized,
  404: NotFound,
} as const;

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => generateQueryClient());
  const { errorStatus, errorMessage }: ErrorProps = pageProps;
  const ErrorPage = errorStatus && errorPage[errorStatus];
  useScrollRestoration();
  return (
    <>
      {!process.env.NEXT_PUBLIC_DEV && <GA />}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <FontProvider />
            <ThemeProvider theme={commonTheme}>
              <ToastProvider />
              <PageLayout>{ErrorPage ? <ErrorPage message={errorMessage} /> : <Component {...pageProps} />}</PageLayout>
              <div id="modal-root" />
              <div id="image-crop-root" />
              <GlobalLoadSpinner />
            </ThemeProvider>
          </RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
