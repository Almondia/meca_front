import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { useState } from 'react';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

import FontProvider from '@/components/common/FontProvider';
import Layout from '@/components/common/Layout';
import useSSRInterception from '@/hooks/useSSRInterception';
import { generateQueryClient } from '@/query/queryClient';
import commonTheme from '@/styles/theme';
import ThemeProvider from '@/styles/ThemeProvider';

const Unauthorized = dynamic(() => import('./401'), { ssr: false });
const NotFound = dynamic(() => import('./404'), { ssr: false });
const ToastProvider = dynamic(() => import('@/components/common/ToastProvider'), { ssr: false });
const GlobalLoadingSpinner = dynamic(() => import('@/components/molcules/GlobalLoadingSpinner'), { ssr: false });

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
  const { props: cachedProps } = useSSRInterception();
  const { errorStatus, errorMessage }: ErrorProps = pageProps;
  const ErrorPage = errorStatus && errorPage[errorStatus];
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <FontProvider />
          <ThemeProvider theme={commonTheme}>
            <ToastProvider />
            <Layout>
              {ErrorPage ? <ErrorPage message={errorMessage} /> : <Component {...cachedProps} {...pageProps} />}
            </Layout>
            <div id="modal-root" />
            <div id="image-crop-root" />
            <GlobalLoadingSpinner />
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
