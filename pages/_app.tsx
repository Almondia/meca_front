import type { AppProps } from 'next/app';

import { useState } from 'react';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import '@/styles/font.css';
import Layout from '@/components/common/Layout';
import useSSRInterception from '@/hooks/useSSRInterception';
import { generateQueryClient } from '@/query/queryClient';
import commonTheme from '@/styles/theme';
import ThemeProvider from '@/styles/ThemeProvider';

import 'react-toastify/dist/ReactToastify.css';
import Unauthorized from './401';
import NotFound from './404';

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
          <ThemeProvider theme={commonTheme}>
            <ToastContainer
              closeOnClick
              autoClose={2000}
              position="top-center"
              rtl={false}
              theme="dark"
              limit={2}
              newestOnTop={false}
              hideProgressBar
            />
            <Layout>
              {ErrorPage ? <ErrorPage message={errorMessage} /> : <Component {...cachedProps} {...pageProps} />}
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
