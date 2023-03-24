import type { AppProps } from 'next/app';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import React, { useState } from 'react';

import ThemeProvider from '@/styles/ThemeProvider';
import { generateQueryClient } from '@/query/queryClient';
import Layout from '@/components/layout/Layout';
import '@/styles/font.css';
import 'react-toastify/dist/ReactToastify.css';
import commonTheme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => generateQueryClient());
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
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
