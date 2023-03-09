import type { AppProps } from 'next/app';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import { queryClient } from '@/query/queryClient';
import ThemeProvider from '@/styles/ThemeProvider';

import '@/styles/font.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ThemeProvider>
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
            <Component {...pageProps} />
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
